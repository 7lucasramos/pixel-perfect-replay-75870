export type HeroMode = "full" | "lite" | "reduced" | "nowebgl";

/** Large touch tablets with enough cores (e.g. iPad Pro) get the full globe at a capped DPR. */
export function isLargeCapableTouch(): boolean {
  if (typeof window === "undefined") return false;
  const coarse = window.matchMedia("(pointer: coarse)").matches;
  return coarse && Math.min(window.innerWidth, window.innerHeight) >= 768 && (navigator.hardwareConcurrency || 0) >= 6;
}

export function detectHeroMode(): HeroMode {
  if (typeof window === "undefined") return "lite";
  try {
    const c = document.createElement("canvas");
    const gl = c.getContext("webgl2") || c.getContext("webgl");
    if (!gl) return "nowebgl";
  } catch {
    return "nowebgl";
  }
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return "reduced";
  if (isLargeCapableTouch()) return "full";
  const coarse = window.matchMedia("(pointer: coarse)").matches;
  const cores = navigator.hardwareConcurrency || 8;
  const mem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8;
  if (coarse || cores <= 4 || mem <= 4) return "lite";
  return "full";
}
