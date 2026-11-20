import { createFileRoute } from "@tanstack/react-router";
import { SystemPage } from "@/components/system/SystemPage";
import { SEO } from "@/content/site";
import { absoluteUrl, institutionalHead } from "@/hooks/useDocumentTitle";

export const Route = createFileRoute("/produtos/bonzai-mini")({
  head: () => {
    const h = institutionalHead(SEO.system.title, SEO.system.description, "/produtos/bonzai-mini");
    return { ...h, scripts: [{ type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "Product", name: "Bonzai Mini", brand: { "@type": "Brand", name: "Bonzai System" }, description: SEO.system.description, url: absoluteUrl("/produtos/bonzai-mini") }) }] };
  },
  component: SystemPage,
});
