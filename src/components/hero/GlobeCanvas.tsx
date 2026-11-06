import { useEffect, useState, type RefObject } from "react";
import { Canvas } from "@react-three/fiber";
import { PerformanceMonitor } from "@react-three/drei";
import { Globe } from "./Globe";
import type { HeroMode } from "./capabilities";

export default function GlobeCanvas({
  mode,
  heroRef,
  onFail,
}: {
  mode: HeroMode;
  heroRef: RefObject<HTMLElement | null>;
  onFail: () => void;
}) {
  const lite = mode === "lite";
  const [dpr, setDpr] = useState<[number, number]>(lite ? [1, 1.25] : [1, 2]);
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
        canvas.addEventListener("webglcontextlost", (e) => {
          e.preventDefault();
          timer = setTimeout(onFail, 3000);
        });
        canvas.addEventListener("webglcontextrestored", () => clearTimeout(timer));
      }}
    >
      <PerformanceMonitor bounds={() => [40, 120]} flipflops={2} onDecline={() => setDpr([1, 1])} />
      <Globe mode={mode} />
    </Canvas>
  );
}
