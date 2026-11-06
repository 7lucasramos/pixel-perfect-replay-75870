import { createFileRoute, notFound } from "@tanstack/react-router";
import { findProduct } from "@/content/products";
import { ProductDetail } from "@/components/products/ProductDetail";
import { SiteNotFound } from "@/components/layout/SiteNotFound";
import { institutionalHead, useDocumentTitle } from "@/hooks/useDocumentTitle";
const description = "Sistema de sonorização Bonzai Mini: configuração em arranjo de módulos.";
export const Route = createFileRoute("/produtos/$slug")({
  validateSearch: (search: Record<string, unknown>): { preview?: string } => (search["preview"] === "specs" ? { preview: "specs" } : {}),
  loader: ({ params }) => { if (!findProduct(params.slug)) throw notFound(); return { slug: params.slug }; },
  head: ({ loaderData }) => {
    const product = findProduct(loaderData?.slug);
    if (!product) return { ...institutionalHead("Produto não encontrado | Bonzai System", "Este produto não está disponível."), meta: [...institutionalHead("Produto não encontrado | Bonzai System", "Este produto não está disponível.").meta, { name: "robots", content: "noindex" }] };
    return { ...institutionalHead(`${product.name} | Bonzai System`, description), scripts: [{ type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "Product", name: product.name, brand: { "@type": "Brand", name: "Bonzai System" }, description }) }] };
  },
  notFoundComponent: () => <SiteNotFound kind="product" />,
  component: ProductPage,
});
function ProductPage() {
  const { slug } = Route.useParams(), product = findProduct(slug);
  useDocumentTitle(`${product?.name ?? "Produto"} | Bonzai System`, description);
  if (!product) return <SiteNotFound kind="product" />;
  return <ProductDetail product={product} />;
}