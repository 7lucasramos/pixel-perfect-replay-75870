import { createFileRoute } from "@tanstack/react-router";
import { Cases } from "@/components/institutional/Cases";
import { PageIntro } from "@/components/institutional/Shared";
import { SEO } from "@/content/site";
import { institutionalHead, useDocumentTitle } from "@/hooks/useDocumentTitle";

export const Route = createFileRoute("/casos-de-sucesso")({
  head: () => institutionalHead(SEO.cases.title, SEO.cases.description),
  component: CasesPage,
});
function CasesPage() {
  useDocumentTitle(SEO.cases.title, SEO.cases.description);
  return <main id="conteudo"><PageIntro eyebrow="Bonzai System" title="Casos de sucesso" /><Cases /></main>;
}
