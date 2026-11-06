import { useEffect, useRef } from "react";
import { motionReduced, onMotionPausedChange } from "@/lib/motion";

/** 24 px wave ring following a fine pointer with lerp; grows 1.6x over clickable elements. Native cursor stays visible. */
export function WaveCursor() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    let raf = 0, x = -100, y = -100, tx = -100, ty = -100, enabled = !motionReduced();
    const loop = () => {
      x += (tx - x) * 0.2; y += (ty - y) * 0.2;
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      raf = Math.abs(tx - x) + Math.abs(ty - y) > 0.1 ? requestAnimationFrame(loop) : 0;
    };
    const move = (e: PointerEvent) => {
      if (!enabled || e.pointerType !== "mouse") return;
      tx = e.clientX; ty = e.clientY;
      el.classList.add("is-visible");
      el.classList.toggle("is-hover", !!(e.target as Element | null)?.closest?.("a, button, [role=button], select, label, summary"));
      if (!raf) raf = requestAnimationFrame(loop);
    };
    const leave = () => el.classList.remove("is-visible");
    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    const off = onMotionPausedChange(() => { enabled = !motionReduced(); if (!enabled) leave(); });
    return () => { cancelAnimationFrame(raf); window.removeEventListener("pointermove", move); document.documentElement.removeEventListener("pointerleave", leave); off(); };
  }, []);
  return <div ref={ref} className="bz-cursor" aria-hidden="true" />;
}
