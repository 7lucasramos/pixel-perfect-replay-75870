import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const PARAGRAPHS = [
  "Em 1970, Juan Alberola criou um sistema de som para que a orquestra de seu pai pudesse ouvir discos de artistas estrangeiros e, assim, adquirir novos conhecimentos.",
  "Esse modelo, sem nome nem logotipo, nasceu com um único objetivo: ajudar seu pai nos projetos dele.",
  "Dali nasceu a paixão de Juan pelo mundo do som. Com o tempo, essa vocação deu origem a uma empresa que segue fiel às suas raízes: próxima, apaixonada e dedicada ao som.",
];

export function AboutOrigin() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".ao-reveal", {
        opacity: 0,
        y: 24,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.08,
        scrollTrigger: { trigger: ref.current, start: "top 75%", once: true },
      });
      gsap.from(".ao-line", {
        scaleX: 0,
        scaleY: 0,
        duration: 1.2,
        ease: "power2.inOut",
        scrollTrigger: { trigger: ".ao-timeline", start: "top 85%", once: true },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="conteudo" ref={ref} className="bg-bz-ice py-[72px] lg:py-[120px]" aria-labelledby="ao-title">
      <div className="container-bz">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="ao-reveal eyebrow">Sobre a Bonzai</p>
            <h2 id="ao-title" className="ao-reveal mt-5 text-[clamp(40px,6vw,88px)] font-extrabold leading-[0.95] text-foreground">
              A origem de um <span className="text-bz-cyan">legado</span>
            </h2>
          </div>
          <div className="flex flex-col gap-5 text-lg leading-relaxed text-muted-foreground lg:pt-10">
            {PARAGRAPHS.map((p) => (
              <p key={p.slice(0, 20)} className="ao-reveal">
                {p}
              </p>
            ))}
          </div>
        </div>

        <ol className="ao-timeline relative mt-20 grid gap-10 pl-8 lg:grid-cols-2 lg:pl-0 lg:pt-10">
          <span className="ao-line absolute left-[7px] top-2 bottom-2 w-px origin-top bg-bz-cyan lg:left-0 lg:right-0 lg:top-[7px] lg:bottom-auto lg:h-px lg:w-auto lg:origin-left" aria-hidden="true" />
          {[
            { y: "1970", t: "O primeiro sistema de som" },
            { y: "Hoje", t: "Uma empresa dedicada ao som" },
          ].map((n, i) => (
            <li key={n.y} className={`ao-reveal relative ${i === 1 ? "lg:text-right" : ""}`}>
              <span
                className={`absolute -left-8 top-1 h-3.5 w-3.5 rounded-full border-2 border-bz-cyan bg-bz-ice lg:-top-10 lg:left-0 ${i === 1 ? "lg:left-auto lg:right-0" : ""}`}
                aria-hidden="true"
              />
              <p className="font-mono text-sm text-bz-cyan">{n.y}</p>
              <p className="mt-1 font-display text-xl font-semibold text-foreground">{n.t}</p>
            </li>
          ))}
        </ol>

        <div className="ao-reveal mt-20 flex aspect-[4/3] w-full max-w-3xl items-center justify-center rounded-3xl bg-bz-graphite text-sm text-bz-white/70">
          Foto institucional (a enviar)
        </div>
      </div>
    </section>
  );
}
