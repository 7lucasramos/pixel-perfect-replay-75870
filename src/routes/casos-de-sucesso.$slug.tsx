import { createFileRoute, notFound } from "@tanstack/react-router";
import { cases } from "@/content/cases";
import { CaseDetail } from "@/components/cases/CaseDetail";
import { SiteNotFound } from "@/components/layout/SiteNotFound";
import { institutionalHead } from "@/hooks/useDocumentTitle";
import productsCss from "../products.css?url";
export const Route = createFileRoute("/casos-de-sucesso/$slug")({
  loader: ({ params }) => { const item = cases.find(item => item.slug === params.slug); if (!item) throw notFound(); return item; },
  head: ({ loaderData, params }) => {
    const head = institutionalHead(loaderData ? `${loaderData.title} | Bonzai System` : "Caso não encontrado | Bonzai System", loaderData?.description ?? "Este caso não está disponível.", `/casos-de-sucesso/${params.slug}`, loaderData?.heroImage?.startsWith("https://") ? loaderData.heroImage : undefined);
    return { meta: [...head.meta, ...(!loaderData ? [{ name: "robots", content: "noindex" }] : [])], links: [...head.links, { rel: "stylesheet", href: productsCss }] };
  },
  notFoundComponent: () => <SiteNotFound kind="case" />,
  component: CasePage,
});
function CasePage() { const item = Route.useLoaderData(); return <CaseDetail item={item} />; }