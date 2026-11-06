import { createFileRoute } from "@tanstack/react-router";
import { HeroScene } from "@/components/hero/HeroScene";
import { AboutOrigin } from "@/components/sections/AboutOrigin";
import { AboutStory } from "@/components/institutional/AboutStory";
import { TransitionBand } from "@/components/institutional/Motion";
import { TechTeaser, ProductsTeaser, CasesTeaser } from "@/components/institutional/Teasers";
import { Solutions } from "@/components/institutional/Solutions";
import { ContactCTA } from "@/components/institutional/Shared";

const TITLE = "Bonzai System | Sistemas profissionais de sonorização";
const DESC = "Bonzai System: engenharia e sistemas profissionais de sonorização de alto padrão.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:image", content: "https://pixel-perfect-replay-75870.lovable.app/og-image.png" },
      { name: "twitter:image", content: "https://pixel-perfect-replay-75870.lovable.app/og-image.png" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({ "@context": "https://schema.org", "@type": "Organization", name: "Bonzai System" }),
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
