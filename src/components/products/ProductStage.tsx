import { useRef, type PointerEvent } from "react";
import { Box } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ProductStage({ image, name, priority = false }: { image?: string; name: string; priority?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  function move(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse" || !window.matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)").matches) return;
    const node = ref.current; if (!node) return;
    const bounds = node.getBoundingClientRect(), x = (event.clientX - bounds.left) / bounds.width, y = (event.clientY - bounds.top) / bounds.height;
    node.style.setProperty("--stage-rx", `${(0.5 - y) * 8}deg`);
    node.style.setProperty("--stage-ry", `${(x - 0.5) * 8}deg`);
    node.style.setProperty("--stage-x", `${x * 100}%`); node.style.setProperty("--stage-y", `${y * 100}%`);
  }
  function reset() { ref.current?.style.setProperty("--stage-rx", "0deg"); ref.current?.style.setProperty("--stage-ry", "0deg"); }
  return <div ref={ref} className="product-stage" onPointerMove={move} onPointerLeave={reset}>
    <div className="product-floor" aria-hidden="true" />
    {image ? <img className="product-stage-image" src={image} alt={name} width={768} height={1024} loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : "auto"} /> : <div className="product-stage-placeholder"><svg width="100" height="180" viewBox="0 0 100 180" aria-hidden="true">{[0,1,2,3,4,5,6,7].map(i => <rect key={i} x={20+i*i*.4} y={8+i*20} width="50" height="17" rx="3" fill="none" stroke="currentColor" transform={`rotate(${i*2} 50 ${i*20+16})`} />)}</svg><p>Foto profissional a enviar</p></div>}
    <Button variant="outline" disabled aria-disabled="true" className="product-stage-slot"><Box size={16} aria-hidden="true" />Visualização 3D em breve</Button>
  </div>;
}