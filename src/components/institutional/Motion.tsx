import { useEffect, useRef, type ReactNode } from "react";
import { loadGsap, motionReduced, MOTION } from "@/lib/motion";

export function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (motionReduced()) return;
    let cancelled = false, revert: (() => void) | undefined;
    loadGsap().then(({ gsap }) => {
      const targets = ref.current?.querySelectorAll("[data-reveal]");
      if (cancelled || !targets?.length) return;
      const ctx = gsap.context(() => {
        gsap.from(targets, { opacity: 0, y: 24, stagger: MOTION.stagger, duration: .7, ease: "power2.out", scrollTrigger: { trigger: ref.current, start: "top 88%", once: true } });
      }, ref);
      revert = () => ctx.revert();
    });
    return () => { cancelled = true; revert?.(); };
  }, []);
  return <div ref={ref} className={className}>{children}</div>;
}
export function TransitionBand({ kind }: { kind: "ice-white" | "white-ink" | "ink-white" | "white-ice" | "ice-ink" }) {
  return <div aria-hidden="true" className={`bz-transition bz-transition-${kind}`} />;
}
