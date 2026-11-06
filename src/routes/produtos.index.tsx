import { createFileRoute } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { products } from "@/content/products";
import { ProductCard } from "@/components/products/ProductCard";
import { ContactCTA, PageIntro } from "@/components/institutional/Shared";
import { institutionalHead } from "@/hooks/useDocumentTitle";
export const Route = createFileRoute("/produtos/")({
  head: () => institutionalHead("Produtos | Bonzai System", "Sistemas profissionais Bonzai. Engenharia e som de alto padrão para projetos profissionais."),
  component: ProductsPage,
});
function ProductsPage() {
  return <main id="conteudo"><PageIntro eyebrow="PRODUTOS" title="Sistemas profissionais Bonzai" description="Engenharia e som de alto padrão para projetos profissionais." /><section className="container-bz pb-24"><div className="grid items-start gap-8 md:grid-cols-[1.4fr_1fr]">{products.map(product => <ProductCard key={product.slug} product={product} />)}<div className="product-coming"><Plus size={40} strokeWidth={1} className="text-bz-cyan" aria-hidden="true" /><p className="font-display text-2xl font-semibold">Novos sistemas Bonzai em breve</p></div></div></section><ContactCTA /></main>;
}