import { createFileRoute } from "@tanstack/react-router";
import { AcousticScene } from "@/components/acoustics/AcousticScene";
import { ContactCTA, PageIntro } from "@/components/institutional/Shared";
import { Reveal } from "@/components/institutional/Motion";

const TITLE = "Tecnologia | Bonzai System";
const DESCRIPTION = "Representação visual da distribuição sonora em sistemas de sonorização profissionais.";

export const Route = createFileRoute("/tecnologia")({
  head: () => ({ meta: [{ title: TITLE }, { name: "description", content: DESCRIPTION }, { property: "og:title", content: TITLE }, { property: "og:description", content: DESCRIPTION }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: Technology,
});

function Technology() {
  return <main id="conteudo">
    <PageIntro eyebrow="TECNOLOGIA E ENGENHARIA ACÚSTICA" title="Como o som ganha direção" description="Uma representação visual de como um sistema de sonorização pode distribuir o som sobre uma área." />
    <section className="ac-explore bg-bz-ink py-16 text-bz-white lg:py-20" aria-labelledby="ac-title"><div className="container-bz"><h2 id="ac-title" className="bz-section-title mb-10">Explore a distribuição sonora</h2><AcousticScene mode="full" /></div></section>
    <section className="bg-background py-20 lg:py-28"><Reveal className="container-bz"><div className="grid gap-6 md:grid-cols-3">{[
      ["Fontes", "Tudo começa em fontes sonoras posicionadas com intenção."],
      ["Direção", "O som é direcionado para onde o público está, e não para todos os lados."],
      ["Cobertura", "A combinação de fontes define como o som se distribui pela área."],
    ].map(([title, text]) => <article key={title} data-reveal className="rounded-lg border border-border p-8"><h3 className="font-display text-2xl font-bold">{title}</h3><p className="mt-5 leading-relaxed text-muted-foreground">{text}</p></article>)}</div><div data-reveal className="mt-12 border border-dashed border-border bg-bz-ice p-8"><p className="max-w-3xl leading-relaxed">Esta é uma representação conceitual para explicar ideias de distribuição sonora. Não substitui projeto acústico nem apresenta medições.</p><p className="mt-6 font-mono text-xs text-muted-foreground">Dados técnicos oficiais: em breve</p></div></Reveal></section>
    <ContactCTA />
  </main>;
}
