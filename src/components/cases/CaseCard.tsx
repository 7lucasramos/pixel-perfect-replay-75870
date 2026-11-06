import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { CaseStudy } from "@/content/cases";
import { ProductStage } from "@/components/products/ProductStage";
export function CaseCard({ item }: { item: CaseStudy }) {
  return <article className="overflow-hidden rounded-lg border border-border">{item.heroImage ? <img decoding="async" src={item.heroImage} alt={item.title} width={800} height={500} loading="lazy" className="aspect-[16/10] w-full object-cover" /> : <ProductStage name={item.title} />}<div className="p-7"><p className="eyebrow">{item.location}</p><h2 className="mt-4 text-2xl font-bold">{item.title}</h2><dl className="mt-5 text-sm"><dt>Tipo de aplicação</dt><dd className="mt-1 text-muted-foreground">{item.applicationType}</dd><dt className="mt-4">Sistema utilizado</dt><dd className="mt-1 text-muted-foreground">{item.systemUsed}</dd></dl><Button asChild className="bz-action mt-7"><Link to="/casos-de-sucesso/$slug" params={{ slug: item.slug }}>Ver este caso<ArrowUpRight aria-hidden="true" /></Link></Button></div></article>;
}