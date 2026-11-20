import type { RefObject } from "react";
import { Camera, Layers, Pause, Play, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { LAYERS, type Layer, type View } from "./scene-config";

type Props = { view: View; onView: (view: View) => void; layers: Record<Layer, boolean>; onLayer: (layer: Layer) => void; slider: RefObject<HTMLInputElement | null>; playing: boolean; seek: (p: number) => void; toggle: () => void; restart: () => void };
export function Controls({ view, onView, layers, onLayer, slider, playing, seek, toggle, restart }: Props) {
  const layerButtons = <div className="ac-layer-list">{LAYERS.map(l => <Button key={l.key} variant="ghost" className="ac-control ac-layer-button" aria-pressed={layers[l.key]} onClick={() => onLayer(l.key)}><span className="ac-check" aria-hidden="true">{layers[l.key] ? "✓" : ""}</span>{l.label}</Button>)}</div>;
  return <aside className="ac-controls" aria-label="Controles da simulação">
    <div className="ac-view-block"><h3 className="ac-control-heading">Vista</h3><div className="ac-segment" role="group" aria-label="Vista">{([{ key: "top", label: "Superior" }, { key: "side", label: "Lateral" }] as const).map(v => <Button variant="ghost" key={v.key} className="ac-control" aria-pressed={view === v.key} onClick={() => onView(v.key)}><Camera size={16} />{v.label}</Button>)}</div></div>
    <div className="ac-desktop-layers"><h3 className="ac-control-heading">Camadas</h3>{layerButtons}</div>
    <div className="ac-mobile-layers"><Dialog><DialogTrigger asChild><Button variant="ghost" className="ac-control" aria-label="Abrir camadas"><Layers /></Button></DialogTrigger><DialogContent className="ac-layer-sheet"><DialogHeader><DialogTitle>Camadas</DialogTitle></DialogHeader>{layerButtons}</DialogContent></Dialog></div>
    <div className="ac-progress-block"><label htmlFor="ac-progress" className="ac-control-heading">Progressão da simulação</label><input ref={slider} id="ac-progress" className="ac-slider" type="range" min="0" max="1" step="0.01" defaultValue="0" aria-valuetext="0 por cento" onChange={e => seek(Number(e.target.value))} /><div className="ac-playback"><Button variant="ghost" className="ac-control" onClick={toggle} aria-label={playing ? "Pausar" : "Reproduzir"} title={playing ? "Pausar" : "Reproduzir"}>{playing ? <Pause /> : <Play />}</Button><Button variant="ghost" className="ac-control" onClick={restart} aria-label="Reiniciar" title="Reiniciar"><RotateCcw /></Button></div></div>
  </aside>;
}