import { createFileRoute } from "@tanstack/react-router";
import { AcousticScene } from "@/components/acoustics/AcousticScene";
import { ContactCTA, PageIntro } from "@/components/institutional/Shared";
import { Reveal } from "@/components/institutional/Motion";
import { SEO } from "@/content/site";
import { AREA } from "@/components/acoustics/sim-data";
import { institutionalHead } from "@/hooks/useDocumentTitle";

export const Route = createFileRoute("/tecnologia")({
  head: () => institutionalHead(SEO.tech.title, SEO.tech.description, "/tecnologia"),
  component: Technology,
});

function Technology() {
  const facts: [string, string][] = [[`${AREA.site} m²`, "área aproximada do local"], [`${AREA.coverage} m²`, "cobertura real"], [`${AREA.people}`, `pessoas, com ${AREA.peoplePerSqm} por m²`], [`${AREA.sourceGap} m`, "entre os dois lados do sistema"]];
  return <main id="conteudo">
    <PageIntro eyebrow="TECNOLOGIA E ENGENHARIA ACÚSTICA" title="Como o som ganha direção" description="Simulação de cobertura e de níveis de pressão sonora do sistema Bonzai Mini em uma área de 30 × 30 metros." />
    <section className="ac-explore bg-bz-ink py-16 text-bz-white lg:py-20" aria-labelledby="ac-title"><div className="container-bz"><h2 id="ac-title" className="bz-section-title mb-10">Explore a distribuição sonora</h2><AcousticScene mode="full" /></div></section>
    <section className="bg-background py-20 lg:py-28"><Reveal className="container-bz"><dl className="grid grid-cols-2 gap-8 lg:grid-cols-4">{facts.map(([v, l]) => <div key={l} data-reveal><dt className="sr-only">{l}</dt><dd className="font-display text-4xl font-bold lg:text-5xl">{v}</dd><dd className="mt-2 text-muted-foreground">{l}</dd></div>)}</dl><div className="mt-16 grid gap-6 md:grid-cols-3">{[
      ["Fontes", "Dois lados do sistema, cada um com um line array de 8 módulos."],
      ["Direção", "O som é direcionado para onde o público está, e não para todos os lados."],
      ["Cobertura", "A combinação dos dois lados define como o som se distribui pela área."],
    ].map(([title, text]) => <article key={title} data-reveal className="rounded-2xl bg-bz-ice p-8"><h3 className="font-display text-2xl font-bold">{title}</h3><p className="mt-5 leading-relaxed text-muted-foreground">{text}</p></article>)}</div></Reveal></section>
    <ContactCTA message="Olá, vi a simulação de cobertura e quero saber mais sobre o sistema Bonzai" />
  </main>;
}
