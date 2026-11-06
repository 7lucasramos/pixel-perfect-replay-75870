import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Product } from "@/content/products";
import { ProductStage } from "./ProductStage";
export function ProductCard({ product }: { product: Product }) {
  return <article className="product-card"><ProductStage image={product.heroImage} name={product.name} /><div className="px-1 pb-2 pt-7"><h2 className="font-display text-3xl font-bold">{product.name}</h2><p className="mt-3 text-sm font-medium">{product.tagline}</p><p className="mt-4 line-clamp-2 max-w-xl leading-relaxed text-muted-foreground">{product.summary}</p><Button asChild className="bz-action mt-7"><Link to="/produtos/$slug" params={{ slug: product.slug }}>Conhecer detalhes<ArrowUpRight aria-hidden="true" /></Link></Button></div></article>;
}