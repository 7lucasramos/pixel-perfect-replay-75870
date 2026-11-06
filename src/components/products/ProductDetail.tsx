import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowDown, ArrowUpRight, Layers, Waves, GitMerge, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContactCTA, SiteLink } from "@/components/institutional/Shared";
import { Reveal } from "@/components/institutional/Motion";
import type { Product } from "@/content/products";
import type { ManualSpecsResult } from "@/lib/manual-specs.functions";
import { ProductStage } from "./ProductStage";
import { Configuration } from "./Configuration";
import { Gallery } from "./Gallery";
function RequestLink({ slug, className = "" }: { slug: string; className?: string }) {
  return <Button asChild className={`bz-action ${className}`}><Link to="/contato" search={{ produto: slug }}>Solicitar projeto<ArrowUpRight aria-hidden="true" /></Link></Button>;
}
export function ProductDetail({ product, manual }: { product: Product; manual: ManualSpecsResult }) {
  const specs = manual?.specs ?? null, preview = !!manual?.preview;
  const cta = useRef<HTMLDivElement>(null), [ctaVisible, setCtaVisible] = useState(false);
  useEffect(() => { const node = cta.current; if (!node) return; const observer = new IntersectionObserver(([entry]) => setCtaVisible(entry?.isIntersecting ?? false)); observer.observe(node); return () => observer.disconnect(); }, []);
  const icons = [Layers, GitMerge, Waves];
  return <main id="conteudo" className={`product-detail ${preview ? "product-preview-page" : ""}`}>
    {preview && <aside className="product-preview" role="status">Pré-visualização: dados técnicos em validação com a marca. Não publicar.</aside>}
    <section className="product-detail-hero container-bz grid items-center gap-12 lg:grid-cols-2"><div><p className="eyebrow">SISTEMA</p><h1 className="bz-page-title mt-6">{product.name}</h1><p className="mt-6 font-display text-2xl">{product.tagline}</p><p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">{product.summary}</p><div className="mt-9 flex flex-wrap gap-4"><RequestLink slug={product.slug} /><Button variant="outline" className="bz-action bz-action-secondary" onClick={() => document.getElementById("configuracao")?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" })}>Ver a configuração<ArrowDown aria-hidden="true" /></Button></div></div><ProductStage image={product.heroImage} name={product.name} priority /></section>
    {product.configuration && <Configuration configuration={product.configuration} moduleValues={specs?.moduleValues ?? null} />}
    <section className="container-bz py-20 lg:py-28"><h2 className="bz-section-title">Dados do manual</h2>{specs ? <><div className="mt-10 grid gap-6 md:grid-cols-3">{[["Subtotal em watts", `${specs.subtotalWatts} W`], ["SPL incoerente", specs.spl.incoerente], ["SPL coerente", specs.spl.coerente]].map(([label,value],i) => <article key={label} className="rounded-lg border border-border bg-bz-ice p-7"><h3 className="text-sm text-muted-foreground">{label}</h3><p className="mt-5 font-mono text-3xl">{value}</p>{i === 2 && <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{specs.spl.coerenteNota}</p>}</article>)}</div><p className="mt-6 text-sm text-muted-foreground">Valores informados no manual do produto, sem condições de medição detalhadas.</p></> : <div className="mt-10 rounded-lg border border-dashed border-border bg-bz-ice p-9">Dados técnicos oficiais: em validação</div>}</section>
    <section className="bg-bz-ice py-20 lg:py-28"><Reveal className="container-bz"><h2 data-reveal className="bz-section-title">Destaques de engenharia</h2><div className="mt-10 grid gap-6 md:grid-cols-3">{product.highlights.map((highlight,i) => { const Icon = icons[i % icons.length] ?? Layers; return <article key={highlight} data-reveal className="rounded-lg border border-border bg-background p-8"><Icon className="text-bz-cyan" size={28} strokeWidth={1.5} aria-hidden="true" /><h3 className="mt-7 text-lg leading-relaxed">{highlight}</h3></article>; })}</div></Reveal></section>
    <section className="container-bz py-20 lg:py-28"><h2 className="bz-section-title mb-10">Galeria</h2><Gallery images={product.gallery} name={product.name} /></section>
    <section className="bg-bz-ice py-20"><div className="container-bz"><h2 className="bz-section-title">Veja a distribuição sonora</h2><div className="mt-8"><SiteLink to="/tecnologia">Explorar a representação conceitual</SiteLink></div>{product.manualUrl && <Button asChild variant="outline" className="bz-action mt-6"><a href={product.manualUrl} download><Download aria-hidden="true" />Baixar manual</a></Button>}</div></section>
    <div ref={cta}><ContactCTA /></div>{!ctaVisible && <div className="product-mobile-cta"><RequestLink slug={product.slug} className="w-full" /></div>}
  </main>;
}