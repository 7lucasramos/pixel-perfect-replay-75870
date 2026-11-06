import { useCallback, useEffect, useRef, useState, type RefObject } from "react";
import { gsap } from "gsap";
import { beamProgress, clamp, DURATION, stage, type View } from "./scene-config";

export function paintScene(root: HTMLElement, p: number, phase: number, reduced: boolean) {
  root.querySelectorAll<SVGLineElement>("[data-beam]").forEach(line => {
    const amount = beamProgress(p, Number(line.dataset.index), Number(line.dataset.count), Number(line.dataset.source));
    line.setAttribute("stroke-dashoffset", String(1 - amount));
  });
  root.querySelectorAll("[data-coverage]").forEach(el => el.setAttribute("opacity", String(stage(p, .35, .8))));
  root.querySelectorAll("[data-overlap], [data-labels]").forEach(el => el.setAttribute("opacity", String(stage(p, .6, 1))));
  root.querySelectorAll<SVGCircleElement>("[data-wave]").forEach(el => {
    const offset = Number(el.dataset.phase);
    const travel = reduced ? .18 + offset * .8 : (phase + offset) % 1;
    el.setAttribute("r", String(travel * 1050));
    el.setAttribute("opacity", String(p > .05 ? (1 - travel) * .32 : 0));
  });
}

export function useSceneProgress(root: RefObject<HTMLDivElement | null>, slider: RefObject<HTMLInputElement | null>, view: View, reduced: boolean, ready: boolean, loop: boolean) {
  const progress = useRef(0), phase = useRef(0), visible = useRef(false), started = useRef(false);
  const [playing, setPlaying] = useState(false);
  const playingRef = useRef(false);
  const update = useCallback(() => {
    if (root.current) paintScene(root.current, progress.current, phase.current, reduced);
    if (slider.current) {
      slider.current.value = String(progress.current);
      slider.current.setAttribute("aria-valuetext", `${Math.round(progress.current * 100)} por cento`);
    }
  }, [root, slider, reduced]);
  const setPlay = useCallback((value: boolean) => { playingRef.current = value; setPlaying(value); }, []);
  const seek = useCallback((value: number) => { progress.current = clamp(value); started.current = true; setPlay(false); update(); }, [setPlay, update]);
  const restart = useCallback(() => { progress.current = 0; phase.current = 0; started.current = true; setPlay(!reduced); update(); }, [setPlay, update, reduced]);
  const toggle = useCallback(() => {
    started.current = true;
    if (!playingRef.current && progress.current >= 1) progress.current = 0;
    setPlay(!playingRef.current); update();
  }, [setPlay, update]);
  useEffect(() => { update(); }, [view, update]);
  useEffect(() => {
    const element = root.current;
    if (!element || !ready) return;
    if (reduced) { progress.current = 1; setPlay(false); update(); }
    let hidden = document.hidden;
    const visibility = () => { hidden = document.hidden; };
    document.addEventListener("visibilitychange", visibility);
    const observer = new IntersectionObserver(([entry]) => {
      visible.current = (entry?.intersectionRatio ?? 0) >= .6;
      if (visible.current && !started.current && !reduced) { started.current = true; setPlay(true); }
    }, { threshold: [0, .6] });
    observer.observe(element);
    const ctx = gsap.context(() => { update(); }, element);
    const tick = (_time: number, delta: number) => {
      if (!visible.current || hidden || !playingRef.current || reduced) return;
      const dt = Math.min(delta / 1000, .05);
      progress.current = clamp(progress.current + dt / DURATION);
      phase.current = (phase.current + dt / 3.5) % 1;
      if (loop && progress.current >= 1) progress.current = 0;
      update();
    };
    gsap.ticker.add(tick);
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", visibility); gsap.ticker.remove(tick); ctx.revert(); };
  }, [ready, reduced, loop, root, setPlay, update]);
  return { playing, seek, restart, toggle, progress, update };
}