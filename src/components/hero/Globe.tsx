import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { heroProgress } from "./useHeroProgress";
import { loadGlobePoints, latLonToVec } from "./landPoints";
import type { HeroMode } from "./capabilities";

const CYAN = new THREE.Color("#12B3F0");
const GRAPHITE = new THREE.Color("#252932");
const TILT = (23 * Math.PI) / 180;
const DEG = Math.PI / 180;

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const seg = (p: number, a: number, b: number) => clamp01((p - a) / (b - a));
const inOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/* ---------- shaders ---------- */
const dotVert = /* glsl */ `
uniform float uSize; uniform float uScale;
varying float vFacing;
void main(){
  vec4 mv = modelViewMatrix * vec4(position,1.0);
  vec3 n = normalize(normalMatrix * position);
  vFacing = dot(n, normalize(-mv.xyz));
  gl_PointSize = uSize * uScale / -mv.z;
  gl_Position = projectionMatrix * mv;
}`;
const dotFrag = /* glsl */ `
uniform vec3 uCyan; uniform vec3 uGraphite; uniform float uOpacity; uniform float uBase;
varying float vFacing;
void main(){
  float d = length(gl_PointCoord - 0.5);
  if (d > 0.5) discard;
  float a = smoothstep(0.5, 0.32, d);
  float fres = 1.0 - clamp(vFacing, 0.0, 1.0);
  vec3 col = mix(uGraphite, uCyan, 0.35 + 0.65 * fres);
  float side = mix(0.15, 1.0, smoothstep(-0.08, 0.08, vFacing));
  gl_FragColor = vec4(col, a * side * uOpacity * uBase);
}`;

const sphereVert = /* glsl */ `
varying vec3 vN; varying vec3 vV;
void main(){
  vec4 mv = modelViewMatrix * vec4(position,1.0);
  vN = normalize(normalMatrix * normal);
  vV = normalize(-mv.xyz);
  gl_Position = projectionMatrix * mv;
}`;
const sphereFrag = /* glsl */ `
uniform float uOpacity; uniform vec3 uCyan;
varying vec3 vN; varying vec3 vV;
void main(){
  vec3 L = normalize(vec3(-0.6,0.7,0.8));
  float diff = clamp(dot(vN, L), 0.0, 1.0);
  vec3 col = mix(vec3(0.902,0.945,0.98), vec3(1.0), diff);
  float fres = pow(1.0 - clamp(dot(vN, vV),0.0,1.0), 3.0);
  col = mix(col, uCyan, fres * 0.35);
  gl_FragColor = vec4(col, 0.94 * uOpacity);
}`;
const atmoFrag = /* glsl */ `
uniform float uOpacity; uniform vec3 uCyan; uniform float uStrength; uniform float uPow;
varying vec3 vN; varying vec3 vV;
void main(){
  float f = pow(clamp(abs(dot(vN, vV)), 0.0, 1.0), uPow);
  gl_FragColor = vec4(uCyan, f * uStrength * uOpacity);
}`;

const partVert = /* glsl */ `
uniform float uTime; uniform float uSize; uniform float uScale;
attribute vec3 color; attribute float seed;
varying vec3 vColor;
void main(){
  vec3 p = position;
  p.y += sin(uTime * 0.8 + seed * 6.283) * 0.03;
  vec4 mv = modelViewMatrix * vec4(p,1.0);
  vColor = color;
  gl_PointSize = uSize * uScale / -mv.z;
  gl_Position = projectionMatrix * mv;
}`;
const partFrag = /* glsl */ `
uniform float uOpacity; varying vec3 vColor;
void main(){
  float d = length(gl_PointCoord - 0.5);
  if (d > 0.5) discard;
  gl_FragColor = vec4(vColor, smoothstep(0.5,0.25,d) * uOpacity * 0.7);
}`;

/* ---------- helpers ---------- */
function circlePoints(r: number, seg = 160) {
  const arr = new Float32Array((seg + 1) * 3);
  for (let i = 0; i <= seg; i++) {
    const a = (i / seg) * Math.PI * 2;
    arr[i * 3] = Math.cos(a) * r;
    arr[i * 3 + 2] = Math.sin(a) * r;
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.BufferAttribute(arr, 3));
  return g;
}

function graticule() {
  const pts: number[] = [];
  const step = 4;
  for (let lat = -60; lat <= 60; lat += 30) {
    for (let lon = -180; lon < 180; lon += step) {
      pts.push(...latLonToVec(lat, lon, 1.002), ...latLonToVec(lat, lon + step, 1.002));
    }
  }
  for (let lon = -180; lon < 180; lon += 30) {
    for (let lat = -90; lat < 90; lat += step) {
      pts.push(...latLonToVec(lat, lon, 1.002), ...latLonToVec(lat + step, lon, 1.002));
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3));
  return g;
}

function labelTexture(text: string) {
  const c = document.createElement("canvas");
  c.width = 128;
  c.height = 48;
  const ctx = c.getContext("2d")!;
  ctx.font = "400 30px 'JetBrains Mono', ui-monospace, monospace";
  ctx.fillStyle = "#252932";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, 64, 24);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  return t;
}

// Decorative marker positions (deterministic, not tied to any real office).
const MARKERS: [number, number][] = [
  [38, -20], [12, 30], [-22, -48], [48, 70], [-30, 120], [24, -95],
  [60, 10], [-8, 70], [30, 140], [-40, -10], [5, -60], [52, -120],
];
const ARCS: [number, number][] = [
  [0, 1], [1, 3], [2, 5], [0, 6], [4, 8], [7, 4], [9, 2], [10, 5], [11, 6], [3, 8], [9, 1],
];

function arcGeometry(a: [number, number], b: [number, number]) {
  const va = new THREE.Vector3(...latLonToVec(a[0], a[1], 1.0));
  const vb = new THREE.Vector3(...latLonToVec(b[0], b[1], 1.0));
  const lift = 1.08 + va.distanceTo(vb) * 0.32;
  const mid = va.clone().add(vb).normalize().multiplyScalar(lift);
  const curve = new THREE.QuadraticBezierCurve3(va, mid, vb);
  return new THREE.BufferGeometry().setFromPoints(curve.getPoints(64));
}

/* ---------- component ---------- */
export function Globe({ mode }: { mode: HeroMode }) {
  const lite = mode === "lite";
  const reduced = mode === "reduced";
  const { camera, size, gl } = useThree();
  const isMobile = size.width < 768;

  const root = useRef<THREE.Group>(null);
  const tilt = useRef<THREE.Group>(null);
  const spin = useRef<THREE.Group>(null);
  const system = useRef<THREE.Group>(null);
  const markerRefs = useRef<(THREE.Group | null)[]>([]);
  const smooth = useRef(reduced ? 0.6 : heroProgress.value);
  const pointer = useRef({ x: 0, y: 0, tx: 0, ty: 0 });

  const [points, setPoints] = useState<{ land: Float32Array; ocean: Float32Array | null } | null>(null);
  const land = points?.land ?? null;

  useEffect(() => {
    let cancelled = false;
    loadGlobePoints(lite).then((p) => { if (!cancelled) setPoints(p); }).catch((e) => console.error("globe data", e));
    return () => { cancelled = true; };
  }, [lite]);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine || reduced) return;
    const onMove = (e: PointerEvent) => {
      pointer.current.tx = (e.clientX / window.innerWidth - 0.5) * 2;
      pointer.current.ty = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduced]);

  const uScale = useMemo(
    () => ({ value: (size.height * gl.getPixelRatio()) / (2 * Math.tan((35 * DEG) / 2)) }),
    [size.height, gl],
  );

  const landMat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: dotVert,
        fragmentShader: dotFrag,
        transparent: true,
        depthWrite: false,
        uniforms: {
          uSize: { value: 0.03 },
          uScale,
          uOpacity: { value: 1 },
          uBase: { value: 1 },
          uCyan: { value: CYAN },
          uGraphite: { value: GRAPHITE },
        },
      }),
    [uScale],
  );
  const oceanMat = useMemo(() => {
    const m = landMat.clone();
    m.uniforms = { ...landMat.uniforms, uSize: { value: 0.012 }, uBase: { value: 0.08 }, uOpacity: { value: 1 } };
    m.uniforms["uScale"] = uScale;
    return m;
  }, [landMat, uScale]);

  const landGeo = useMemo(() => {
    if (!land) return null;
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(land, 3));
    return g;
  }, [land]);

  const oceanGeo = useMemo(() => {
    if (lite || !points?.ocean) return null;
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(points.ocean, 3));
    return g;
  }, [lite, points]);

  const sphereMat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: sphereVert,
        fragmentShader: sphereFrag,
        transparent: true,
        depthWrite: false,
        uniforms: { uOpacity: { value: 1 }, uCyan: { value: CYAN } },
      }),
    [],
  );
  const atmoMats = useMemo(
    () =>
      [
        { s: 0.55, p: 1.2 },
        { s: 0.35, p: 3.0 },
      ].map(
        ({ s, p }) =>
          new THREE.ShaderMaterial({
            vertexShader: sphereVert,
            fragmentShader: atmoFrag,
            transparent: true,
            depthWrite: false,
            side: THREE.BackSide,
            uniforms: {
              uOpacity: { value: 1 },
              uCyan: { value: CYAN },
              uStrength: { value: s },
              uPow: { value: p },
            },
          }),
      ),
    [],
  );
  const sphereGeo = useMemo(() => new THREE.SphereGeometry(1, 64, 48), []);
  const gratGeo = useMemo(() => graticule(), []);
  const gratMat = useMemo(
    () => new THREE.LineBasicMaterial({ color: CYAN, transparent: true, opacity: 0.12, depthWrite: false }),
    [],
  );

  // Orbits
  const orbits = useMemo(
    () =>
      [
        { r: 1.6, tilt: 20 },
        { r: 2.2, tilt: -35 },
        { r: 3.0, tilt: 60 },
      ].map((o) => ({
        ...o,
        geo: circlePoints(o.r),
        mat: new THREE.LineBasicMaterial({ color: CYAN, transparent: true, opacity: 0, depthWrite: false }),
      })).map((x) => ({ ...x, line: new THREE.Line(x.geo, x.mat) })),
    [],
  );

  // Coordinate ring
  const ring = useMemo(() => {
    const geo = circlePoints(1.3);
    const ticks: number[] = [];
    for (let d = 0; d < 360; d += 15) {
      const a = d * DEG;
      const l = d % 45 === 0 ? 0.07 : 0.035;
      ticks.push(Math.cos(a) * 1.3, 0, Math.sin(a) * 1.3, Math.cos(a) * (1.3 + l), 0, Math.sin(a) * (1.3 + l));
    }
    const tickGeo = new THREE.BufferGeometry();
    tickGeo.setAttribute("position", new THREE.Float32BufferAttribute(ticks, 3));
    const mat = new THREE.LineBasicMaterial({ color: GRAPHITE, transparent: true, opacity: 0, depthWrite: false });
    const labels = [] as { pos: [number, number, number]; mat: THREE.SpriteMaterial }[];
    for (let d = 0; d < 360; d += 45) {
      const a = d * DEG;
      labels.push({
        pos: [Math.cos(a) * 1.48, 0, Math.sin(a) * 1.48],
        mat: new THREE.SpriteMaterial({ map: labelTexture(`${d}°`), transparent: true, opacity: 0, depthWrite: false }),
      });
    }
    return { geo, tickGeo, mat, labels };
  }, []);

  // Particle network
  const particles = useMemo(() => {
    const n = lite || isMobile ? 600 : 1500;
    const pos = new Float32Array(n * 3);
    const col = new Float32Array(n * 3);
    const seed = new Float32Array(n);
    const rings = 9;
    for (let i = 0; i < n; i++) {
      const ringI = i % rings;
      const r = 1.4 + ringI * 0.22 + (Math.random() - 0.5) * 0.03;
      const a = Math.random() * Math.PI * 2;
      pos.set([Math.cos(a) * r, (Math.random() - 0.5) * 0.02, Math.sin(a) * r], i * 3);
      const c = Math.random() < 0.55 ? CYAN : GRAPHITE;
      col.set([c.r, c.g, c.b], i * 3);
      seed[i] = Math.random();
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(col, 3));
    geo.setAttribute("seed", new THREE.BufferAttribute(seed, 1));
    const mat = new THREE.ShaderMaterial({
      vertexShader: partVert,
      fragmentShader: partFrag,
      transparent: true,
      depthWrite: false,
      uniforms: { uTime: { value: 0 }, uSize: { value: 0.022 }, uScale, uOpacity: { value: 0 } },
    });
    return { geo, mat };
  }, [lite, isMobile, uScale]);

  // Arcs + markers
  const arcs = useMemo(() => {
    const list = ARCS.slice(0, lite ? 6 : 11);
    return list.map(([a, b]) => ({
      geo: arcGeometry(MARKERS[a]!, MARKERS[b]!),
      mat: new THREE.LineBasicMaterial({ color: CYAN, transparent: true, opacity: 0, depthWrite: false }),
    })).map((x) => ({ ...x, line: new THREE.Line(x.geo, x.mat) }));
  }, [lite]);
  const markers = useMemo(() => {
    const dotGeo = new THREE.CircleGeometry(0.018, 20);
    const ringGeo = new THREE.RingGeometry(0.03, 0.036, 40);
    return MARKERS.map(([la, lo], i) => {
      const p = new THREE.Vector3(...latLonToVec(la, lo, 1.004));
      const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), p.clone().normalize());
      return {
        p,
        q,
        phase: i * 0.37,
        dotGeo,
        ringGeo,
        dotMat: new THREE.MeshBasicMaterial({ color: CYAN, transparent: true, opacity: 0, depthWrite: false }),
        ringMats: [0, 1].map(
          () => new THREE.MeshBasicMaterial({ color: CYAN, transparent: true, opacity: 0, depthWrite: false, side: THREE.DoubleSide }),
        ),
      };
    });
  }, []);

  // Dispose
  useEffect(
    () => () => {
      [landMat, oceanMat, sphereMat, gratMat, ring.mat, particles.mat, ...atmoMats].forEach((m) => m.dispose());
      [sphereGeo, gratGeo, ring.geo, ring.tickGeo, particles.geo].forEach((g) => g.dispose());
      orbits.forEach((o) => (o.geo.dispose(), o.mat.dispose()));
      arcs.forEach((a) => (a.geo.dispose(), a.mat.dispose()));
      ring.labels.forEach((l) => (l.mat.map?.dispose(), l.mat.dispose()));
      markers.forEach((m) => (m.dotMat.dispose(), m.ringMats.forEach((r) => r.dispose())));
      markers[0]?.dotGeo.dispose();
      markers[0]?.ringGeo.dispose();
    },
    [landMat, oceanMat, sphereMat, gratMat, ring, particles, atmoMats, sphereGeo, gratGeo, orbits, arcs, markers],
  );
  useEffect(() => () => landGeo?.dispose(), [landGeo]);
  useEffect(() => () => oceanGeo?.dispose(), [oceanGeo]);

  useFrame((state, rawDt) => {
    const dt = Math.min(rawDt, 0.05);
    const t = state.clock.elapsedTime;
    const target = reduced ? 0.6 : heroProgress.value;
    smooth.current += (target - smooth.current) * 0.08;
    const p = smooth.current;

    // viewport at the initial camera distance (world units)
    const vh = 2 * 6 * Math.tan((35 * DEG) / 2);
    const vw = vh * (size.width / size.height);
    const R = isMobile ? 0.7 * vw : Math.min(0.75 * vh, 0.7 * vw);

    const s2 = inOut(seg(p, 0.15, 0.55));
    camera.position.z = 6 + 5 * s2;

    const yStart = -vh / 2 - R / 3;
    const yEnd = 0.05 * vh;
    const scale = R * (1 - 0.68 * s2);
    const g = root.current;
    if (g) {
      g.position.y = lerp(yStart, yEnd, s2);
      g.scale.setScalar(scale);
    }

    // rotation
    if (!reduced && spin.current) spin.current.rotation.y += (0.06 + 0.08 * s2) * dt;

    // cursor tilt
    const pt = pointer.current;
    pt.x += (pt.tx - pt.x) * 0.05;
    pt.y += (pt.ty - pt.y) * 0.05;
    if (tilt.current) {
      tilt.current.rotation.x = pt.y * 6 * DEG;
      tilt.current.rotation.y = pt.x * 6 * DEG;
    }

    const fadeOut = 1 - seg(p, 0.8, 0.97);
    const planetOp = lerp(1, 0.35, seg(p, 0.55, 0.7)) * fadeOut;
    landMat.uniforms["uOpacity"]!.value = planetOp;
    landMat.uniforms["uSize"]!.value = 0.028 * scale;
    oceanMat.uniforms["uOpacity"]!.value = planetOp;
    oceanMat.uniforms["uSize"]!.value = 0.012 * scale;
    sphereMat.uniforms["uOpacity"]!.value = planetOp;
    atmoMats.forEach((m) => (m.uniforms["uOpacity"]!.value = planetOp));
    gratMat.opacity = 0.12 * planetOp;

    // orbits
    orbits.forEach((o, i) => {
      const k = reduced ? 1 : seg(p, 0.2 + i * 0.06, 0.45 + i * 0.06);
      o.mat.opacity = 0.35 * Math.min(1, k * 3) * fadeOut;
      o.geo.setDrawRange(0, Math.floor(161 * k));
      if (!reduced) o.line.rotation.y += (0.02 + i * 0.01) * dt;
    });
    if (system.current && !reduced) system.current.rotation.y += 0.015 * dt;

    const ringK = seg(p, 0.3, 0.45) * fadeOut;
    ring.mat.opacity = 0.5 * ringK;
    ring.labels.forEach((l) => (l.mat.opacity = 0.5 * ringK));

    particles.mat.uniforms["uOpacity"]!.value = seg(p, 0.3, 0.5) * fadeOut;
    particles.mat.uniforms["uTime"]!.value = reduced ? 0 : t;
    particles.mat.uniforms["uSize"]!.value = 0.022 * scale;

    // arcs: staggered; in lite they never overlap
    const n = arcs.length;
    arcs.forEach((a, i) => {
      let k: number;
      if (reduced) k = 1;
      else if (lite) k = seg(p, 0.3 + (i * 0.25) / n, 0.3 + ((i + 1) * 0.25) / n);
      else k = seg(p, 0.28 + i * 0.018, 0.4 + i * 0.018);
      a.geo.setDrawRange(0, Math.floor(65 * k));
      a.mat.opacity = 0.7 * Math.min(1, k * 4) * fadeOut;
    });

    const mk = seg(p, 0.22, 0.36) * fadeOut;
    markers.forEach((m, i) => {
      const ph = ((t + m.phase) % 1.4) / 1.4;
      const pulse = reduced ? 0.5 : 0.5 + 0.5 * Math.sin(ph * Math.PI * 2);
      m.dotMat.opacity = mk * (0.6 + 0.4 * pulse);
      const grp = markerRefs.current[i];
      if (grp) {
        const dot = grp.children[0];
        if (dot) dot.scale.setScalar(0.85 + 0.3 * pulse);
        m.ringMats.forEach((rm, j) => {
          const w = reduced ? 0.5 : (ph + j * 0.5) % 1;
          const child = grp.children[1 + j];
          if (child) child.scale.setScalar(1 + w * 2.5);
          rm.opacity = mk * (1 - w) * 0.6;
        });
      }
    });
  });

  return (
    <group ref={root}>
      <group ref={tilt}>
        <group rotation={[0, 0, TILT]}>
          <group ref={spin}>
            <mesh geometry={sphereGeo} material={sphereMat} scale={0.985} renderOrder={0} />
            <lineSegments geometry={gratGeo} material={gratMat} renderOrder={1} />
            {oceanGeo && <points geometry={oceanGeo} material={oceanMat} renderOrder={2} />}
            {landGeo && <points geometry={landGeo} material={landMat} renderOrder={3} />}
            {arcs.map((a, i) => (
              <primitive key={`arc-${i}`} object={a.line} />
            ))}
            {markers.map((m, i) => (
              <group
                key={`mk-${i}`}
                position={m.p}
                quaternion={m.q}
                ref={(el) => {
                  markerRefs.current[i] = el;
                }}
              >
                <mesh geometry={m.dotGeo} material={m.dotMat} renderOrder={5} />
                {m.ringMats.map((rm, j) => (
                  <mesh key={j} geometry={m.ringGeo} material={rm} renderOrder={5} />
                ))}
              </group>
            ))}
          </group>
          <mesh geometry={sphereGeo} material={atmoMats[1]!} scale={1.04} renderOrder={-1} />
          <mesh geometry={sphereGeo} material={atmoMats[0]!} scale={1.12} renderOrder={-2} />
        </group>
        <group ref={system} rotation={[0.32, 0, -0.12]}>
          <points geometry={particles.geo} material={particles.mat} renderOrder={4} />
          <lineLoop geometry={ring.geo} material={ring.mat} />
          <lineSegments geometry={ring.tickGeo} material={ring.mat} />
          {ring.labels.map((l, i) => (
            <sprite key={`lb-${i}`} position={l.pos} material={l.mat} scale={[0.16, 0.06, 1]} />
          ))}
          {orbits.map((o, i) => (
            <group key={`orb-${i}`} rotation={[o.tilt * DEG, 0, 0]}>
              <primitive object={o.line} />
            </group>
          ))}
        </group>
      </group>
    </group>
  );
}
