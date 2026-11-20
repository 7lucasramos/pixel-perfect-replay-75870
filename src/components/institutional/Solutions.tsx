import { useRef, type PointerEvent } from "react";
import { AudioLines, Building2, SlidersHorizontal, Radio, Presentation } from "lucide-react";
import { SOLUTIONS, COPY } from "@/content/site";
import { Reveal } from "./Motion";
import { SiteLink } from "./Shared";
const icons = [AudioLines, Radio, Building2, SlidersHorizontal, Presentation];
function SolutionCard({ index }: { index: number }) {
  const ref = useRef<HTMLElement>(null); const solution = SOLUTIONS[index]; const Icon = icons[index];
  if (!solution || !Icon) return null;
  const reset = () => { ref.current?.style.removeProperty("transform"); ref.current?.style.removeProperty("--cursor-x"); ref.current?.style.removeProperty("--cursor-y"); };
  const move = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = event.currentTarget.getBoundingClientRect(); const x = (event.clientX - rect.left) / rect.width; const y = (event.clientY - rect.top) / rect.height;
    event.currentTarget.style.transform = `perspective(1000px) rotateX(${(0.5-y)*10}deg) rotateY(${(x-0.5)*10}deg)`;
    event.currentTarget.style.setProperty("--cursor-x", `${x*100}%`); event.currentTarget.style.setProperty("--cursor-y", `${y*100}%`);
  };
  return <article ref={ref} className="bz-solution-card" onPointerMove={move} onPointerLeave={reset} onPointerUp={reset}><div className="p-7 lg:p-9"><Icon className="mb-6 text-bz-cyan" size={28} strokeWidth={1.25} aria-hidden="true" /><h3 className="font-display text-xl font-bold leading-snug">{solution.title}</h3><p className="mt-4 text-sm leading-relaxed text-muted-foreground">{solution.description}</p></div></article>;
}
export function Solutions({ page = false }: { page?: boolean }) {
  return <section className="bg-background pb-24 pt-16 lg:pb-32" aria-label="Aplicações dos sistemas Bonzai"><Reveal className="container-bz">{!page && <h2 data-reveal className="bz-section-title mb-12 max-w-2xl">{COPY.solutionsTitle}</h2>}<div className={`grid gap-6 ${page ? "md:grid-cols-2" : "md:grid-cols-2 lg:grid-cols-3"}`}>{SOLUTIONS.map((s,i) => <SolutionCard key={s.title} index={i} />)}</div>{!page && <div className="mt-10"><SiteLink to="/solucoes" secondary>{COPY.solutionsButton}</SiteLink></div>}</Reveal></section>;
}
