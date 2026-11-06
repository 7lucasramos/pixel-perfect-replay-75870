import { useEffect, useRef, useState, type RefObject } from "react";
import { Canvas } from "@react-three/fiber";
import { PerformanceMonitor } from "@react-three/drei";
import { Globe } from "./Globe";
import { isLargeCapableTouch, type HeroMode } from "./capabilities";

export default function GlobeCanvas({
  mode,
  heroRef,
  onFail,
  onReady,
}: {
  mode: HeroMode;
  heroRef: RefObject<HTMLElement | null>;
  onFail: () => void;
  onReady?: () => void;
}) {
  const lite = mode === "lite";
  const [dpr, setDpr] = useState<[number, number]>(lite ? [1, 1.25] : isLargeCapableTouch() ? [1, 1.5] : [1, 2]);
  const cleanup = useRef<(() => void) | null>(null);
  useEffect(() => () => cleanup.current?.(), []);
  const [active, setActive] = useState(true);

  // Pause rendering when the hero is off-screen or the tab is hidden.
  useEffect(() => {
    let inView = true;
    const update = () => setActive(inView && !document.hidden);
    const io = new IntersectionObserver(([e]) => {
      inView = !!e?.isIntersecting;
      update();
    });
    if (heroRef.current) io.observe(heroRef.current);
    document.addEventListener("visibilitychange", update);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", update);
    };
  }, [heroRef]);

  return (
    <Canvas
      aria-hidden="true"
      frameloop={active ? "always" : "never"}
      dpr={dpr}
      camera={{ fov: 35, position: [0, 0, 6], near: 0.1, far: 100 }}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0);
        const canvas = gl.domElement;
        let timer: ReturnType<typeof setTimeout> | undefined;
        const lost = (e: Event) => {
          e.preventDefault();
          timer = setTimeout(onFail, 3000);
        };
        const restored = () => clearTimeout(timer);
        canvas.addEventListener("webglcontextlost", lost);
        canvas.addEventListener("webglcontextrestored", restored);
        cleanup.current = () => {
          clearTimeout(timer);
          canvas.removeEventListener("webglcontextlost", lost);
          canvas.removeEventListener("webglcontextrestored", restored);
        };
      }}
    >
      <PerformanceMonitor bounds={() => [40, 120]} flipflops={2} onDecline={() => setDpr([1, 1])} />
      <Globe mode={mode} {...(onReady ? { onReady } : {})} />
    </Canvas>
  );
}
