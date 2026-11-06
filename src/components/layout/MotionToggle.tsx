import { useEffect, useState } from "react";
import { Pause, Play } from "lucide-react";
import { initMotionPreference, onMotionPausedChange, setMotionPaused } from "@/lib/motion";

/** Footer switch that pauses non-essential motion; preference kept in memory and localStorage (guarded). */
export function MotionToggle() {
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    setPaused(initMotionPreference());
    return onMotionPausedChange(setPaused);
  }, []);
  return (
    <button
      type="button"
      aria-pressed={paused}
      onClick={() => setMotionPaused(!paused)}
      className="inline-flex min-h-11 items-center gap-2 rounded-full border border-bz-white/20 px-4 text-bz-white/85 transition-colors hover:border-bz-cyan hover:text-bz-cyan focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bz-electric"
    >
      {paused ? <Play size={14} aria-hidden="true" /> : <Pause size={14} aria-hidden="true" />}
      {paused ? "Retomar animações" : "Pausar animações"}
    </button>
  );
}
