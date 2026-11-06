import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(ref.current?.querySelectorAll("[data-reveal]") ?? [], { opacity: 0, y: 24, stagger: .08, duration: .7, ease: "power2.out", scrollTrigger: { trigger: ref.current, start: "top 88%", once: true } });
    }, ref);
    return () => ctx.revert();
  }, []);
  return <div ref={ref} className={className}>{children}</div>;
}
export function TransitionBand({ kind }: { kind: "ice-white" | "white-ink" | "ink-white" | "white-ice" | "ice-ink" }) {
  return <div aria-hidden="true" className={`bz-transition bz-transition-${kind}`} />;
}
