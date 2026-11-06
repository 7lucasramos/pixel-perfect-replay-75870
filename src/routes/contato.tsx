import { createFileRoute } from "@tanstack/react-router";
import { ContactForm } from "@/components/institutional/ContactForm";
import { ContactChannels } from "@/components/institutional/Shared";
import { COPY, SEO } from "@/content/site";
import { institutionalHead, useDocumentTitle } from "@/hooks/useDocumentTitle";
import { findProduct } from "@/content/products";

export const Route = createFileRoute("/contato")({
  validateSearch: (search: Record<string, unknown>): { produto?: string } => ({ produto: typeof search.produto === "string" && findProduct(search.produto) ? search.produto : undefined }),
  head: () => institutionalHead(SEO.contact.title, SEO.contact.description),
  component: ContactPage,
});
function ContactPage() {
  const { produto } = Route.useSearch();
  useDocumentTitle(SEO.contact.title, SEO.contact.description);
  return <main id="conteudo" className="container-bz grid gap-16 pb-24 pt-36 lg:grid-cols-[.85fr_1.15fr] lg:gap-20 lg:pt-44"><div><p className="eyebrow">Contato</p><h1 className="bz-page-title mt-6">{COPY.contactTitle}</h1><p className="mt-7 text-lg leading-relaxed text-muted-foreground">{COPY.contactText}</p><div className="mt-10"><ContactChannels /></div></div><ContactForm key={produto ?? "general"} productSlug={produto} /></main>;
}
