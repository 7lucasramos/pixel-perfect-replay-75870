/** Shared motion tokens and helpers (Phase 5B). */
export const MOTION = { fast: 0.2, base: 0.4, slow: 0.8, ease: "power3.out", stagger: 0.08 } as const;

const PAUSE_KEY = "bz-motion-paused";
type Listener = (paused: boolean) => void;
const listeners = new Set<Listener>();
let paused = false;

/** True when the OS asks for reduced motion or the visitor pressed "Pausar animações". */
export function motionReduced(): boolean {
  if (typeof window === "undefined") return false;
  return paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
export function isMotionPaused() { return paused; }
export function initMotionPreference() {
  try { paused = window.localStorage.getItem(PAUSE_KEY) === "1"; } catch { paused = false; }
  document.documentElement.classList.toggle("bz-motion-paused", paused);
  return paused;
}
export function setMotionPaused(next: boolean) {
  paused = next;
  try { window.localStorage.setItem(PAUSE_KEY, next ? "1" : "0"); } catch { /* storage unavailable */ }
  document.documentElement.classList.toggle("bz-motion-paused", next);
  listeners.forEach((l) => l(next));
}
export function onMotionPausedChange(listener: Listener) {
  listeners.add(listener);
  return () => { listeners.delete(listener); };
}

/** Loads GSAP + ScrollTrigger on demand so shared components don't pull them into every route's entry chunk. */
let gsapPromise: Promise<{ gsap: typeof import("gsap").gsap; ScrollTrigger: typeof import("gsap/ScrollTrigger").ScrollTrigger }> | null = null;
export function loadGsap() {
  gsapPromise ??= Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([g, s]) => {
    g.gsap.registerPlugin(s.ScrollTrigger);
    return { gsap: g.gsap, ScrollTrigger: s.ScrollTrigger };
  });
  return gsapPromise;
}
