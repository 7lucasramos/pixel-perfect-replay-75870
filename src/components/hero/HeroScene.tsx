import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { detectHeroMode, type HeroMode } from "./capabilities";
import { initMotionPreference, isMotionPaused, onMotionPausedChange } from "@/lib/motion";
import { heroProgress, setHeroRevealed } from "./useHeroProgress";
import { LogoReveal } from "./LogoReveal";
import { HERO_EYEBROW } from "@/lib/site";

const GlobeCanvas = lazy(() => import("./GlobeCanvas"));

function SvgPlanet({ className = "opacity-40" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={`absolute left-1/2 top-1/2 h-[38svh] w-[38svh] -translate-x-1/2 -translate-y-1/2 overflow-visible ${className}`} aria-hidden="true">
      <defs>
        <radialGradient id="bzp" cx="35%" cy="30%" r="75%">
          <stop offset="0%" stopColor="var(--bz-white)" />
          <stop offset="100%" stopColor="var(--bz-ice)" />
        </radialGradient>
        <radialGradient id="bzhalo" cx="50%" cy="50%" r="50%">
          <stop offset="70%" stopColor="var(--bz-cyan)" stopOpacity="0.22" />
          <stop offset="100%" stopColor="var(--bz-cyan)" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="100" cy="100" r="112" fill="url(#bzhalo)" />
      <circle cx="100" cy="100" r="80" fill="url(#bzp)" stroke="var(--bz-cyan)" strokeOpacity="0.5" />
      {[-50, -25, 0, 25, 50].map((y) => (
        <ellipse key={y} cx="100" cy={100 + y} rx={Math.sqrt(6400 - y * y)} ry="6" fill="none" stroke="var(--bz-cyan)" strokeOpacity="0.25" />
      ))}
      {[20, 45, 70].map((rx) => (
        <ellipse key={rx} cx="100" cy="100" rx={rx} ry="80" fill="none" stroke="var(--bz-cyan)" strokeOpacity="0.2" />
      ))}
      <ellipse cx="100" cy="100" rx="98" ry="30" fill="none" stroke="var(--bz-cyan)" strokeOpacity="0.35" transform="rotate(-20 100 100)" />
    </svg>
  );
}

export function HeroScene() {
  const heroRef = useRef<HTMLElement>(null);
  const [mode, setMode] = useState<HeroMode | null>(null);
  const [globeReady, setGlobeReady] = useState(false);
  const isStatic = mode === "reduced" || mode === "nowebgl";

  useEffect(() => {
    const paused = initMotionPreference();
    const detected = detectHeroMode();
    setMode(paused && detected !== "nowebgl" ? "reduced" : detected);
    return onMotionPausedChange((p) => setMode(p ? (detected === "nowebgl" ? "nowebgl" : "reduced") : detected));
  }, []);

  // Globe data is ready: wait for idle, resync ScrollTrigger with the restored scroll position, then fade the canvas in.
  const onGlobeReady = () => {
    const show = () => {
      if (!isStatic) { ScrollTrigger.refresh(); ScrollTrigger.update(); }
      requestAnimationFrame(() => setGlobeReady(true));
    };
    const ric = (window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number }).requestIdleCallback;
    if (ric) ric(show, { timeout: 600 }); else setTimeout(show, 50);
  };

  useEffect(() => {
    if (!mode || !heroRef.current) return;
    if (isStatic) {
      heroProgress.value = 0.6;
      setHeroRevealed(true);
      return () => setHeroRevealed(false);
    }
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.config({ ignoreMobileResize: true });
    const lite = mode === "lite";
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ paused: true, defaults: { ease: "none" } });
      tl.to([".hz-eyebrow", ".hz-scroll"], { opacity: 0, y: -10, duration: 0.1 }, 0.15)
        // Phase A: only the complete B of the official logo (clipped), centred.
        .fromTo(
          ".hz-logo",
          { opacity: 0, scale: 0.7, xPercent: 40.8, transformOrigin: "9.2% 50%", clipPath: "inset(0 81.5% 0 0)", filter: lite ? "none" : "blur(12px)" },
          { opacity: 1, scale: 1, filter: lite ? "none" : "blur(0px)", duration: 0.11, ease: "power2.out" },
          0.55,
        )
        .fromTo(".hz-wave", { opacity: 0.7, scale: 0.6 }, { opacity: 0, scale: 2.4, duration: 0.12, stagger: 0.04, ease: "power1.out", immediateRender: false }, 0.56)
        // Phase B: reveal ONZAI / SYSTEM from the B while recentring the full logo.
        .to(".hz-logo", { clipPath: "inset(0 0% 0 0)", xPercent: 0, duration: 0.10, ease: "power3.out" }, 0.66)
        .fromTo(".hz-headline", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.08, ease: "power2.out" }, 0.72)
        .fromTo(".hz-line", { opacity: 0, scaleX: 0 }, { opacity: 1, scaleX: 1, duration: 0.06 }, 0.74)
        .to(".hz-grid-dense", { opacity: 1, duration: 0.2 }, 0.8)
        .to(".hz-brand", { opacity: 0, y: -40, duration: 0.1 }, 0.9)
        .set({}, {}, 1);

      ScrollTrigger.create({
        trigger: heroRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.6,
        animation: tl,
        onUpdate: (self) => {
          heroProgress.value = self.progress;
          setHeroRevealed(self.progress > 0.82);
        },
      });
    }, heroRef);

    document.fonts?.ready.then(() => ScrollTrigger.refresh());
    const onOrient = () => ScrollTrigger.refresh();
    window.addEventListener("orientationchange", onOrient);
    return () => {
      window.removeEventListener("orientationchange", onOrient);
      ctx.revert();
      heroProgress.value = 0;
      setHeroRevealed(false);
    };
  }, [mode, isStatic]);

  return (
    <section
      id="hero"
      ref={heroRef}
      aria-label="Abertura"
      className={isStatic ? "hero-static relative h-[100svh]" : "relative h-[420svh] lg:h-[500svh]"}
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden bg-background">
        <div className="dot-grid absolute inset-0 z-0" aria-hidden="true" />
        <div className="hz-grid-dense dot-grid-dense absolute inset-0 z-0 opacity-0" aria-hidden="true" />

        <div className="absolute inset-0 z-10" aria-hidden="true">
          {/* Server-rendered planet: visible before JS/WebGL, cross-faded out once the globe is ready. */}
          {mode !== "nowebgl" && <div className="hz-planet-ssr absolute inset-0" style={{ opacity: globeReady ? 0 : 1 }}><SvgPlanet className="opacity-60" /></div>}
          {mode === "nowebgl" ? (
            <SvgPlanet />
          ) : mode ? (
            <div className={`hz-canvas absolute inset-0 ${globeReady ? "is-ready" : ""}`}>
              <Suspense fallback={null}>
                <GlobeCanvas mode={mode} heroRef={heroRef} onFail={() => setMode("nowebgl")} onReady={onGlobeReady} />
              </Suspense>
            </div>
          ) : null}
        </div>

        <p className="hz-eyebrow eyebrow absolute inset-x-0 top-28 z-20 text-center lg:top-32">{HERO_EYEBROW}</p>

        <div className="hz-legibility pointer-events-none absolute inset-0 z-[15]" aria-hidden="true" />
        <LogoReveal />

        <div className="hz-scroll absolute inset-x-0 bottom-8 z-20 flex flex-col items-center gap-3">
          <span className="text-xs font-medium text-muted-foreground">Role para explorar</span>
          <span className="animate-pulse-line block h-10 w-px bg-bz-ink" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
