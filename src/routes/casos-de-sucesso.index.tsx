import { lazy, Suspense } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Cases } from "@/components/institutional/Cases";
import { PageIntro } from "@/components/institutional/Shared";
import { SEO } from "@/content/site";
import { demoEnabled } from "@/content/cases";
import productsCss from "../products.css?url";
import { institutionalHead, useDocumentTitle } from "@/hooks/useDocumentTitle";
const Demo = import.meta.env.DEV ? lazy(() => import("@/components/cases/DemoCase").then(module => ({ default: module.DemoCase }))) : null;
export const Route = createFileRoute("/casos-de-sucesso/")({
  validateSearch: (search: Record<string, unknown>): { demo?: string } => (search["demo"] === "case" ? { demo: "case" } : {}),
  head: () => { const h = institutionalHead(SEO.cases.title, SEO.cases.description, "/casos-de-sucesso"); return { ...h, links: [...h.links, { rel: "stylesheet", href: productsCss }] }; },
  component: CasesPage,
});
function CasesPage() {
  const { demo } = Route.useSearch();
  useDocumentTitle(SEO.cases.title, SEO.cases.description);
  if (demoEnabled(import.meta.env.DEV, demo) && Demo) return <Suspense fallback={<main id="conteudo" className="container-bz py-44">Carregando…</main>}><Demo /></Suspense>;
  return <main id="conteudo"><PageIntro eyebrow="Bonzai System" title="Casos de sucesso" /><Cases /></main>;
}