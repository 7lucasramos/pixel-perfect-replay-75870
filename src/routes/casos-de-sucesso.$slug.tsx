import { createFileRoute, notFound } from "@tanstack/react-router";
import { cases } from "@/content/cases";
import { CaseDetail } from "@/components/cases/CaseDetail";
import { SiteNotFound } from "@/components/layout/SiteNotFound";
import { institutionalHead } from "@/hooks/useDocumentTitle";
export const Route = createFileRoute("/casos-de-sucesso/$slug")({
  loader: ({ params }) => { const item = cases.find(item => item.slug === params.slug); if (!item) throw notFound(); return item; },
  head: ({ loaderData }) => {
    const head = institutionalHead(loaderData ? `${loaderData.title} | Bonzai System` : "Caso não encontrado | Bonzai System", loaderData?.description ?? "Este caso não está disponível.");
    return { meta: [...head.meta, ...(!loaderData ? [{ name: "robots", content: "noindex" }] : []), ...(loaderData?.heroImage?.startsWith("https://") ? [{ property: "og:image", content: loaderData.heroImage }, { name: "twitter:image", content: loaderData.heroImage }] : [])] };
  },
  notFoundComponent: () => <SiteNotFound kind="case" />,
  component: CasePage,
});
function CasePage() { const item = Route.useLoaderData(); return <CaseDetail item={item} />; }