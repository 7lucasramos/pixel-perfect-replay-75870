import { useSyncExternalStore } from "react";

/** Shared, non-React progress (0-1) written by ScrollTrigger and read in useFrame. */
export const heroProgress = { value: 0 };

let revealed = false;
const listeners = new Set<() => void>();

export function setHeroRevealed(v: boolean) {
  if (v === revealed) return;
  revealed = v;
  listeners.forEach((l) => l());
}

export function useHeroRevealed() {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => revealed,
    () => false,
  );
}
