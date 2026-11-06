import { createFileRoute } from "@tanstack/react-router";
import { HeroScene } from "@/components/hero/HeroScene";
import { AboutOrigin } from "@/components/sections/AboutOrigin";

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
    <main>
      <HeroScene />
      <AboutOrigin />
    </main>
  );
}
