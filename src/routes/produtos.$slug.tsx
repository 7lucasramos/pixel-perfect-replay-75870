import { createFileRoute, notFound } from "@tanstack/react-router";
import { findProduct } from "@/content/products";
import { ProductDetail } from "@/components/products/ProductDetail";
import { SiteNotFound } from "@/components/layout/SiteNotFound";
import { absoluteUrl, institutionalHead, useDocumentTitle } from "@/hooks/useDocumentTitle";
import { getManualSpecs } from "@/lib/manual-specs.functions";
import productsCss from "../products.css?url";
const description = "Sistema de sonorização Bonzai Mini: configuração em arranjo de módulos.";
export const Route = createFileRoute("/produtos/$slug")({
  validateSearch: (search: Record<string, unknown>): { preview?: string } => (import.meta.env.DEV && search["preview"] === "specs" ? { preview: "specs" } : {}),
  loaderDeps: ({ search }) => ({ preview: search.preview }),
  loader: async ({ params, deps }) => {
    if (!findProduct(params.slug)) throw notFound();
    const manual = await getManualSpecs({ data: { slug: params.slug, ...(deps.preview ? { preview: deps.preview } : {}) } });
    return { slug: params.slug, manual };
  },
  head: ({ loaderData, params }) => {
    const product = findProduct(loaderData?.slug);
    const links = [{ rel: "stylesheet", href: productsCss }];
    if (!product) { const h = institutionalHead("Produto não encontrado | Bonzai System", "Este produto não está disponível.", `/produtos/${params.slug}`); return { meta: [...h.meta, { name: "robots", content: "noindex" }], links }; }
    const h = institutionalHead(`${product.name} | Bonzai System`, description, `/produtos/${product.slug}`);
    return { ...h, links: [...h.links, ...links], scripts: [{ type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "Product", name: product.name, brand: { "@type": "Brand", name: "Bonzai System" }, description, url: absoluteUrl(`/produtos/${product.slug}`), ...(product.heroImage?.startsWith("http") ? { image: product.heroImage } : {}) }) }] };
  },
  notFoundComponent: () => <SiteNotFound kind="product" />,
  component: ProductPage,
});
function ProductPage() {
  const { slug } = Route.useParams(), product = findProduct(slug);
  const { manual } = Route.useLoaderData();
  useDocumentTitle(`${product?.name ?? "Produto"} | Bonzai System`, description);
  if (!product) return <SiteNotFound kind="product" />;
  return <ProductDetail product={product} manual={manual} />;
}
