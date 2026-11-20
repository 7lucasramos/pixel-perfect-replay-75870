import { useEffect, useId, useRef, useState } from "react";
import { gsap } from "gsap";
import { detectHeroMode } from "@/components/hero/capabilities";
import { TopView } from "./TopView";
import { SideView } from "./SideView";
import { Controls } from "./Controls";
import { DEFAULT_LAYERS, type Layer, type View } from "./scene-config";
import { DISTANCES, SIM, SIM_FOOTNOTE, type Distance } from "./sim-data";
import { useSceneProgress } from "./useSceneProgress";
import "./acoustics.css";

export function AcousticScene({ mode }: { mode: "full" | "compact" }) {
  const id = useId().replace(/:/g, "");
  const root = useRef<HTMLDivElement>(null), visual = useRef<HTMLDivElement>(null), slider = useRef<HTMLInputElement>(null);
  const transition = useRef<gsap.core.Tween | null>(null);
  const [view, setView] = useState<View>("top");
  const [layers, setLayers] = useState({ ...DEFAULT_LAYERS });
  const [selected, setSelected] = useState<number | null>(null);
  const [distance, setDistance] = useState<Distance>(15);
  const [capabilities, setCapabilities] = useState({ ready: false, lite: true, reduced: false });
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => { const mode = detectHeroMode(); setCapabilities({ ready: true, lite: mode !== "full", reduced: media.matches }); };
    sync(); media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);
  const playback = useSceneProgress(root, slider, view, capabilities.reduced, capabilities.ready, mode === "compact");
  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const ctx = gsap.context(() => {
      Object.entries(layers).forEach(([key, enabled]) => {
        gsap.to(element.querySelectorAll(`[data-layer="${key}"]`), { opacity: enabled ? 1 : 0, duration: capabilities.reduced ? 0 : .2, overwrite: true });
        element.querySelectorAll<SVGElement>(`[data-layer="${key}"]`).forEach(el => {
          el.style.pointerEvents = enabled ? "" : "none";
          el.querySelectorAll("[role=button]").forEach(source => source.setAttribute("tabindex", enabled && mode === "full" ? "0" : "-1"));
        });
      });
    }, element);
    return () => ctx.revert();
  }, [layers, view, capabilities.reduced, mode]);
  useEffect(() => {
    const element = visual.current;
    if (!element) return;
    const ctx = gsap.context(() => { gsap.fromTo(element, { opacity: capabilities.reduced ? 1 : 0, scale: capabilities.reduced ? 1 : .96 }, { opacity: 1, scale: 1, duration: capabilities.reduced ? 0 : .35 }); }, element);
    return () => ctx.revert();
  }, [view, capabilities.reduced]);
  useEffect(() => () => { transition.current?.kill(); }, []);
  const changeView = (next: View) => {
    if (next === view) return;
    transition.current?.kill(); setSelected(null);
    if (capabilities.reduced || !visual.current) { setView(next); return; }
    transition.current = gsap.to(visual.current, { opacity: 0, scale: .96, duration: .35, onComplete: () => setView(next) });
  };
  const toggleLayer = (layer: Layer) => { if (layer === "sources") setSelected(null); setLayers(prev => ({ ...prev, [layer]: !prev[layer] })); };
  const props = { id, lite: capabilities.lite, reduced: capabilities.reduced, selected, onSelect: setSelected, interactive: mode === "full", distance };
  const v = SIM[distance];
  return <div className={`ac-layout ${mode === "compact" ? "ac-compact" : ""}`}>
    <div className="ac-main">
      <div ref={root} className={`ac-canvas ac-canvas-${view}`} onClick={() => setSelected(null)}>
        <div ref={visual} className="ac-visual">{view === "top" ? <TopView {...props} /> : <SideView {...props} />}</div>
        {selected !== null && layers.sources && <div className="ac-tooltip" role="tooltip">{selected === 0 ? "Lado L" : "Lado R"} do sistema Bonzai Mini</div>}
      </div>
      <div className="ac-values" aria-label="Níveis de pressão sonora por distância">
        <div className="ac-chips" role="group" aria-label="Distância">{DISTANCES.map(d => <button key={d} type="button" className="ac-chip" aria-pressed={d === distance} onClick={() => setDistance(d)}>{d} m</button>)}</div>
        <div className="ac-card" aria-live="polite">
          <div><p className="ac-card-k">Nível superior</p><p className="ac-card-v">RMS <b>{v.upper.rms}</b> dB</p><p className="ac-card-v">PEAK <b>{v.upper.peak}</b> dB</p></div>
          <div><p className="ac-card-k">Nível inferior</p><p className="ac-card-v">RMS <b>{v.lower.rms}</b> dB</p><p className="ac-card-v">PEAK <b>{v.lower.peak}</b> dB</p></div>
        </div>
      </div>
      <p className="ac-foot">{SIM_FOOTNOTE}</p>
    </div>
    {mode === "full" && <Controls view={view} onView={changeView} layers={layers} onLayer={toggleLayer} slider={slider} playing={playback.playing} seek={playback.seek} toggle={playback.toggle} restart={playback.restart} />}
  </div>;
}
