import { useEffect, useRef } from "react";
import { loadGsap, motionReduced } from "@/lib/motion";
import { STORY } from "@/content/site";
import { Reveal } from "./Motion";
import { DotCanvas, PhotoPlaceholder, WaveRings } from "./Visuals";

export function AboutStory({ home = false }: { home?: boolean }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const reduced = motionReduced();
    let cancelled = false, revert: (() => void) | undefined;
    loadGsap().then(({ gsap, ScrollTrigger }) => {
    if (cancelled || !ref.current) return;
    const ctx = gsap.context(() => {
      if (!reduced) gsap.fromTo(".bz-story-progress", { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: { trigger: ref.current, start: "top 65%", end: "bottom 65%", scrub: true } });
      ref.current?.querySelectorAll("article").forEach(article => {
        ScrollTrigger.create({ trigger: article, start: "top 70%", end: "bottom 30%", toggleClass: { targets: article, className: "bz-story-active" } });
      });
    }, ref);
    revert = () => ctx.revert();
    });
    return () => { cancelled = true; revert?.(); };
  }, []);
  return <section ref={ref} className="bz-story bg-background py-12 lg:py-20" aria-label="História da Bonzai"><div className="container-bz relative"><div className="bz-story-track" aria-hidden="true"><div className="bz-story-progress" /></div>{STORY.filter(item => !home || item.number !== "01").map((item, index) => <article key={item.number} className={`bz-story-block relative ${index % 2 ? "bz-story-reverse" : ""}`}><span className="bz-story-node" aria-hidden="true" /><Reveal className="bz-story-copy"><p data-reveal className="font-mono text-sm text-bz-cyan">{item.number}</p><h2 data-reveal className="bz-section-title mt-5">{item.title}</h2><div className="mt-7 space-y-5 text-base leading-relaxed text-muted-foreground lg:text-lg">{item.paragraphs.map(p => <p data-reveal key={p}>{p}</p>)}</div></Reveal><div className="bz-story-visual">{item.visual === "metamorphosis" ? <DotCanvas metamorphosis /> : item.visual === "waves" ? <div className="aspect-[4/3] bg-bz-ice text-bz-cyan"><WaveRings className="h-full w-full" /></div> : <PhotoPlaceholder parallax={item.visual === "roots"} />}</div></article>)}</div></section>;
}
