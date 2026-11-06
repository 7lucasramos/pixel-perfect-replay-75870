import { geoContains } from "d3-geo";
import { feature } from "topojson-client";
import type { Topology, GeometryCollection } from "topojson-specification";

/** Fibonacci-sphere samples kept when they fall on land. Unit-radius xyz. */
export async function computeLandPoints(candidates: number): Promise<Float32Array> {
  const mod = (await import("world-atlas/land-110m.json")) as unknown as {
    default: Topology<{ land: GeometryCollection }>;
  };
  const topo = mod.default;
  const land = feature(topo, topo.objects.land);
  const out: number[] = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < candidates; i++) {
    const y = 1 - (i / (candidates - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    const x = Math.cos(theta) * r;
    const z = Math.sin(theta) * r;
    const lat = (Math.asin(y) * 180) / Math.PI;
    const lon = (Math.atan2(x, z) * 180) / Math.PI;
    if (geoContains(land, [lon, lat])) out.push(x, y, z);
  }
  return new Float32Array(out);
}

export function latLonToVec(lat: number, lon: number, r = 1): [number, number, number] {
  const la = (lat * Math.PI) / 180;
  const lo = (lon * Math.PI) / 180;
  return [Math.cos(la) * Math.sin(lo) * r, Math.sin(la) * r, Math.cos(la) * Math.cos(lo) * r];
}
