import { COPY } from "@/content/site";
import { SYSTEM } from "@/content/system";
import { Reveal } from "./Motion";
import { DotCanvas } from "./Visuals";
import { AcousticScene } from "@/components/acoustics/AcousticScene";
import { LineArrayGraphic } from "@/components/system/LineArray";
import { SiteLink } from "./Shared";
export function TechTeaser() {
  return <section className="relative overflow-hidden bg-bz-ink py-20 text-bz-white lg:py-28"><DotCanvas /><div className="bz-tech-backdrop pointer-events-none absolute inset-0" /><div className="container-bz relative grid items-center gap-12 lg:grid-cols-2"><Reveal><p data-reveal className="font-mono text-xs uppercase text-bz-white/85">{COPY.techEyebrow}</p><h2 data-reveal className="bz-section-title mt-6">{COPY.techTitle}</h2><p data-reveal className="mt-6 max-w-lg text-lg leading-relaxed text-bz-white/85">{COPY.techText}</p><div data-reveal className="mt-10"><SiteLink to="/tecnologia" dark secondary>{COPY.techButton}</SiteLink></div></Reveal><AcousticScene mode="compact" /></div></section>;
}
export function SystemTeaser() {
  const stats: [string, string][] = [["8", "módulos por lado"], [`${SYSTEM.side.watts} W`, "por lado"], [`${SYSTEM.total.watts} W`, "sistema completo"], ["BZ18B", "subgrave ativo"]];
  return <section className="bg-bz-ice py-20 lg:py-28"><Reveal className="container-bz grid items-center gap-12 md:grid-cols-[1.1fr_.9fr]"><div><p data-reveal className="eyebrow">{COPY.systemEyebrow}</p><h2 data-reveal className="bz-section-title mt-5">{COPY.systemTitle}</h2><p data-reveal className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">{COPY.systemText}</p><dl data-reveal className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">{stats.map(([v, l]) => <div key={l}><dt className="sr-only">{l}</dt><dd className="font-display text-3xl font-bold">{v}</dd><dd className="mt-1 text-sm text-muted-foreground">{l}</dd></div>)}</dl><div data-reveal className="mt-10"><SiteLink to="/produtos/bonzai-mini">{COPY.systemButton}</SiteLink></div></div><div data-reveal className="flex justify-center"><LineArrayGraphic className="h-[320px] w-auto md:h-[420px]" /></div></Reveal></section>;
}
