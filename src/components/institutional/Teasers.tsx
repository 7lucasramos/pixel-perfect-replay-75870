import { COPY } from "@/content/site";
import { Reveal } from "./Motion";
import { DotCanvas } from "./Visuals";
import { products } from "@/content/products";
import { cases } from "@/content/cases";
import { ProductCard } from "@/components/products/ProductCard";
import { CaseCard } from "@/components/cases/CaseCard";
import { AcousticScene } from "@/components/acoustics/AcousticScene";
import { SiteLink } from "./Shared";
export function TechTeaser() {
  return <section className="relative overflow-hidden bg-bz-ink py-20 text-bz-white lg:py-28"><DotCanvas /><div className="bz-tech-backdrop pointer-events-none absolute inset-0" /><div className="container-bz relative grid items-center gap-12 lg:grid-cols-2"><Reveal><p data-reveal className="font-mono text-xs uppercase text-bz-white/85">{COPY.techEyebrow}</p><h2 data-reveal className="bz-section-title mt-6">{COPY.techTitle}</h2><p data-reveal className="mt-6 max-w-lg text-lg leading-relaxed text-bz-white/85">{COPY.techText}</p><div data-reveal className="mt-10"><SiteLink to="/tecnologia" dark secondary>{COPY.techButton}</SiteLink></div></Reveal><AcousticScene mode="compact" /></div></section>;
}
export function ProductsTeaser() {
  return <section className="bg-bz-ice py-20 lg:py-28"><Reveal className="container-bz"><h2 data-reveal className="bz-section-title mb-12">{COPY.productsTitle}</h2><div className="max-w-3xl">{products.map(product => <ProductCard key={product.slug} product={product} />)}</div><div className="mt-10"><SiteLink to="/produtos" secondary>{COPY.productsButton}</SiteLink></div></Reveal></section>;
}
export function CasesTeaser() {
  return <section className="bg-background py-20 lg:py-28"><Reveal className="container-bz"><h2 data-reveal className="bz-section-title mb-12">{COPY.casesTitle}</h2><div className="grid gap-6 md:grid-cols-3">{cases.length ? cases.slice(0,3).map(item => <CaseCard key={item.slug} item={item} />) : [0,1,2].map(i => <article key={i} className="bz-case-skeleton"><div aria-hidden="true" className="mb-8 aspect-video bg-bz-ice" /><p className="text-sm leading-relaxed text-muted-foreground">{COPY.casesSoon}</p></article>)}</div><div className="mt-10"><SiteLink to="/casos-de-sucesso" secondary>{COPY.casesButton}</SiteLink></div></Reveal></section>;
}
