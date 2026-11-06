import { createFileRoute } from "@tanstack/react-router";
import { HeroScene } from "@/components/hero/HeroScene";
import { AboutOrigin } from "@/components/sections/AboutOrigin";
import { AboutStory } from "@/components/institutional/AboutStory";
import { TransitionBand } from "@/components/institutional/Motion";
import { TechTeaser, ProductsTeaser, CasesTeaser } from "@/components/institutional/Teasers";
import { Solutions } from "@/components/institutional/Solutions";
import { ContactCTA } from "@/components/institutional/Shared";
import { absoluteUrl, institutionalHead } from "@/hooks/useDocumentTitle";
import { GLOBE_DATA } from "@/components/hero/landPoints";
import productsCss from "../products.css?url";

const TITLE = "Bonzai System | Sistemas profissionais de sonorização";
const DESC = "Bonzai System: engenharia e sistemas profissionais de sonorização de alto padrão.";

export const Route = createFileRoute("/")({
  head: () => ({
    ...institutionalHead(TITLE, DESC, "/"),
    links: [
      ...institutionalHead(TITLE, DESC, "/").links,
      { rel: "stylesheet", href: productsCss },
      { rel: "preload", href: GLOBE_DATA.land, as: "fetch", crossOrigin: "anonymous" },
      { rel: "preload", href: GLOBE_DATA.ocean, as: "fetch", crossOrigin: "anonymous" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({ "@context": "https://schema.org", "@type": "Organization", name: "Bonzai System", url: absoluteUrl("/"), logo: absoluteUrl("/logo-bonzai.png") }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main id="conteudo">
      <HeroScene />
      <AboutOrigin />
      <TransitionBand kind="ice-white" />
      <AboutStory home />
      <TransitionBand kind="white-ink" />
      <TechTeaser />
      <TransitionBand kind="ink-white" />
      <Solutions />
      <TransitionBand kind="white-ice" />
      <ProductsTeaser />
      <TransitionBand kind="ice-white" />
      <CasesTeaser />
      <TransitionBand kind="white-ink" />
      <ContactCTA />
    </main>
  );
}
