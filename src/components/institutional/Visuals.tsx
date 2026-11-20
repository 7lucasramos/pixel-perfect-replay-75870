import { useEffect, useRef } from "react";
import { loadGsap, motionReduced } from "@/lib/motion";

export function DotCanvas({ metamorphosis = false }: { metamorphosis?: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const reduced = motionReduced();
    const fine = window.matchMedia("(pointer: fine)").matches;
    let progress = reduced ? 1 : 0, active = false, frame = 0, width = 0, height = 0;
    const cursor = { x: -999, y: -999 };
    const colors = getComputedStyle(canvas);
    const cyan = colors.getPropertyValue("--bz-cyan").trim();
    const graphite = colors.getPropertyValue("--bz-graphite").trim();
    const draw = () => {
      frame = 0;
      ctx.clearRect(0, 0, width, height);
      const cols = width < 500 ? 16 : 24, rows = width < 500 ? 10 : 14;
      for (let row = 0; row < rows; row++) for (let col = 0; col < cols; col++) {
        let x = (col + 1) * width / (cols + 1);
        const gridY = (row + 1) * height / (rows + 1);
        const waveY = height / 2 + Math.sin(col / (cols - 1) * Math.PI * 3) * height * .18 + (row - rows / 2) * height * .024;
        let y = metamorphosis ? gridY + (waveY - gridY) * progress : gridY;
        if (fine && !reduced && !metamorphosis) {
          const dx = x - cursor.x, dy = y - cursor.y, distance = Math.hypot(dx, dy);
          if (distance > 0 && distance < 90) { x += dx / distance * (1 - distance / 90) * 12; y += dy / distance * (1 - distance / 90) * 12; }
        }
        ctx.fillStyle = metamorphosis && (row + col) % 3 === 0 ? graphite : cyan;
        ctx.globalAlpha = metamorphosis ? .65 : .24;
        ctx.beginPath(); ctx.arc(x, y, metamorphosis ? 2 : 1.2, 0, Math.PI * 2); ctx.fill();
      }
      ctx.globalAlpha = 1;
    };
    const schedule = () => { if (active && !frame) frame = requestAnimationFrame(draw); };
    const resize = () => {
      const rect = canvas.getBoundingClientRect(); width = rect.width; height = rect.height;
      const dpr = Math.min(devicePixelRatio, 2); canvas.width = width * dpr; canvas.height = height * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); schedule();
    };
    const observer = new IntersectionObserver(([entry]) => { active = entry?.isIntersecting ?? false; if (active) schedule(); else { cancelAnimationFrame(frame); frame = 0; } });
    observer.observe(canvas);
    const resizeObserver = new ResizeObserver(resize); resizeObserver.observe(canvas); resize();
    const move = (event: PointerEvent) => { const rect = canvas.getBoundingClientRect(); cursor.x = event.clientX - rect.left; cursor.y = event.clientY - rect.top; schedule(); };
    const leave = () => { cursor.x = -999; cursor.y = -999; schedule(); };
    const surface = canvas.parentElement;
    if (fine && !reduced) { surface?.addEventListener("pointermove", move); surface?.addEventListener("pointerleave", leave); }
    const state = { progress: 0 };
    let cancelled = false, tween: { kill: () => void; scrollTrigger?: { kill: () => void } } | null = null;
    if (metamorphosis && !reduced) loadGsap().then(({ gsap }) => { if (cancelled) return; tween = gsap.to(state, { progress: 1, ease: "none", onUpdate: () => { progress = state.progress; schedule(); }, scrollTrigger: { trigger: canvas.closest("article"), start: "top 85%", end: "bottom 30%", scrub: true } }); });
    return () => { cancelled = true; observer.disconnect(); resizeObserver.disconnect(); cancelAnimationFrame(frame); surface?.removeEventListener("pointermove", move); surface?.removeEventListener("pointerleave", leave); tween?.scrollTrigger?.kill(); tween?.kill(); };
  }, [metamorphosis]);
  return <canvas ref={ref} aria-hidden="true" className={metamorphosis ? "aspect-[4/3] w-full bg-bz-ice" : "pointer-events-none absolute inset-0 h-full w-full"} />;
}

export function WaveRings({ className = "" }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null);
  useEffect(() => {
    const svg = ref.current; if (!svg) return;
    const observer = new IntersectionObserver(([entry]) => svg.classList.toggle("bz-in-view", entry?.isIntersecting ?? false)); observer.observe(svg);
    return () => observer.disconnect();
  }, []);
  return <svg ref={ref} viewBox="0 0 600 450" aria-hidden="true" className={`bz-wave-rings ${className}`}><g fill="none" stroke="currentColor" strokeWidth="1">{[45, 80, 115, 150, 185, 220].map(r => <circle key={r} cx="300" cy="225" r={r} />)}</g></svg>;
}
