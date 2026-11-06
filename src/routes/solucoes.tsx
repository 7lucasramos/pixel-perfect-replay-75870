import { createFileRoute } from "@tanstack/react-router";
import { Solutions } from "@/components/institutional/Solutions";
import { PageIntro, ContactCTA } from "@/components/institutional/Shared";
import { COPY, SEO } from "@/content/site";
import { institutionalHead, useDocumentTitle } from "@/hooks/useDocumentTitle";

export const Route = createFileRoute("/solucoes")({
  head: () => institutionalHead(SEO.solutions.title, SEO.solutions.description, "/solucoes"),
  component: SolutionsPage,
});
function SolutionsPage() {
  useDocumentTitle(SEO.solutions.title, SEO.solutions.description);
  return <main id="conteudo"><PageIntro eyebrow="Soluções" title={COPY.solutionsPageTitle} /><Solutions page /><ContactCTA /></main>;
}
