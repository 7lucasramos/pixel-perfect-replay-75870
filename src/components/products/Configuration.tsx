import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import type { ModuleConfig } from "@/content/products";
export function Configuration({ configuration, moduleValues }: { configuration: ModuleConfig; moduleValues: { tw: string; mini: string } | null }) {
  const label = (module: string) => moduleValues ? `${module} ${module.endsWith("TW") ? moduleValues.tw : moduleValues.mini}` : module;
  const [active, setActive] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => { gsap.from(".module-motion", { y: -24, opacity: 0, stagger: .07, duration: .5, scrollTrigger: { trigger: ref.current, start: "top 85%", once: true } }); }, ref);
    return () => ctx.revert();
  }, []);
  function key(event: KeyboardEvent, index: number) {
    if (!["ArrowDown", "ArrowUp", "ArrowRight", "ArrowLeft"].includes(event.key)) return;
    event.preventDefault();
    const next = (index + (event.key === "ArrowDown" || event.key === "ArrowRight" ? 1 : -1) + configuration.modules.length) % configuration.modules.length;
    setActive(next); ref.current?.querySelectorAll<HTMLButtonElement>(".module-row")[next]?.focus();
  }
  return <section id="configuracao" className="scroll-mt-28 bg-bz-graphite py-20 text-bz-white lg:py-28"><div className="container-bz"><p className="font-mono text-xs text-bz-cyan">BONZAI MINI</p><h2 className="bz-section-title mt-5">Configuração do arranjo</h2><div ref={ref} className="mt-12 grid items-center gap-10 md:grid-cols-[.8fr_1.2fr]"><svg className="module-diagram" viewBox="0 0 320 520" role="img" aria-label="Oito módulos de cima para baixo: TW, Mini, Mini, Mini, TW, Mini, Mini, Mini. Lista textual ao lado.">{configuration.modules.map((module, i) => <g key={i} className={`module-motion ${active === i ? "module-active" : ""}`} onPointerEnter={() => setActive(i)} onClick={() => setActive(i)}><g transform={`translate(${50+i*i*.9} ${20+i*59}) rotate(${i*2-5} 75 22)`}><rect width="150" height="47" rx="5" className={module.includes("TW") ? "module-tw" : "module-mini"} /><path d="M15 12H135M15 23H135M15 35H135" className="module-grille" /><text x="-24" y="30" className="module-number">{i+1}</text></g></g>)}</svg><ol className="space-y-2">{configuration.modules.map((module, i) => <li key={i}><Button variant="ghost" className={`module-row ${active === i ? "is-active" : ""}`} aria-pressed={active === i} onPointerEnter={() => setActive(i)} onFocus={() => setActive(i)} onClick={() => setActive(i)} onKeyDown={event => key(event,i)}><span className="font-mono text-bz-cyan">{String(i+1).padStart(2,"0")}</span><span>{label(module)}</span></Button></li>)}</ol></div><p className="mt-8 text-sm text-bz-white/85">Representação esquemática da disposição descrita no manual.</p><div className="mt-6 flex flex-wrap gap-3"><span className="module-chip">{configuration.twCount} × {label("Bonzai Mini TW")}</span><span className="module-chip">{configuration.miniCount} × {label("Bonzai Mini")}</span></div></div></section>;
}