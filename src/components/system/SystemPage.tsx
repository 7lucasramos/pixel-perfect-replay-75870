import { Battery, Cpu, Plug, Volume2 } from "lucide-react";
import { AcousticScene } from "@/components/acoustics/AcousticScene";
import { ContactButtons, ContactCTA } from "@/components/institutional/Shared";
import { Reveal } from "@/components/institutional/Motion";
import { SPEC_GROUPS, SYSTEM } from "@/content/system";
import { LineArrayGraphic, LineArraySection } from "./LineArray";
import "./system.css";

const SECTIONS = [["visao-geral", "Visão geral"], ["sistema", "Sistema completo"], ["line-array", "Line array"], ["potencia", "Potência e nível"], ["sub", "Subgrave"], ["cobertura", "Cobertura"], ["dados", "Dados técnicos"]] as const;
const MSG = "Olá, quero saber mais sobre o sistema Bonzai Mini";

function Big({ value, unit, label, note }: { value: string; unit: string; label: string; note?: string }) {
  return <div data-reveal className="rounded-3xl bg-bz-ice p-8"><p className="text-sm text-muted-foreground">{label}</p><p className="mt-4 font-display text-5xl font-bold tracking-tight">{value}<span className="ml-2 text-2xl font-semibold text-muted-foreground">{unit}</span></p>{note && <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{note}</p>}</div>;
}

export function SystemPage() {
  return <main id="conteudo" className="system-page">
    <nav aria-label="Nesta página" className="sys-nav"><div className="container-bz sys-nav-inner">{SECTIONS.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}</div></nav>

    <section id="visao-geral" className="container-bz scroll-mt-28 pb-20 pt-32 lg:pb-28 lg:pt-44">
      <div className="grid items-center gap-12 md:grid-cols-2">
        <div><p className="eyebrow">SISTEMA</p><h1 className="bz-page-title mt-6">Bonzai Mini</h1><p className="mt-6 font-display text-2xl">Line array de 8 módulos por lado.</p><p className="mt-5 max-w-md text-lg leading-relaxed text-muted-foreground">Dois módulos TW e seis Mini em curva, com subgraves ativos BZ18B. Todos os dados abaixo vêm do manual do produto.</p><ContactButtons className="mt-9" message={MSG} subject="Interesse no sistema Bonzai Mini" /></div>
        <div className="flex justify-center"><LineArrayGraphic className="h-[340px] w-auto md:h-[460px]" /></div>
      </div>
    </section>

    <section id="sistema" className="scroll-mt-28 bg-bz-ice py-20 lg:py-28"><Reveal className="container-bz">
      <h2 data-reveal className="bz-section-title max-w-2xl">O sistema completo.</h2>
      <p data-reveal className="mt-5 max-w-xl text-lg text-muted-foreground">Dois lados, L e R, com 8 módulos cada, mais os subgraves.</p>
      <div data-reveal className="mt-12 grid items-end justify-items-center gap-8 rounded-3xl bg-background p-8 md:grid-cols-3 lg:p-12">
        {["Lado L", "Subgraves BZ18B", "Lado R"].map((t, i) => <figure key={t} className="text-center">{i === 1 ? <div className="mx-auto flex h-[150px] w-[190px] items-center justify-center rounded-2xl border-2 border-bz-ink bg-bz-ink/5"><Volume2 size={44} strokeWidth={1.25} className="text-bz-cyan" aria-hidden="true" /></div> : <LineArrayGraphic className="mx-auto h-[220px] w-auto" />}<figcaption className="mt-4 font-mono text-sm text-muted-foreground">{t}</figcaption></figure>)}
      </div>
      <div className="mt-10 grid gap-6 sm:grid-cols-3">
        <Big value="8" unit="módulos" label="Por lado" />
        <Big value={String(SYSTEM.side.watts)} unit="W" label="Potência por lado" />
        <Big value={String(SYSTEM.total.watts)} unit="W" label="Sistema completo (L + R)" />
      </div>
    </Reveal></section>

    <LineArraySection />

    <section id="potencia" className="scroll-mt-28 py-20 lg:py-28"><Reveal className="container-bz">
      <h2 data-reveal className="bz-section-title max-w-2xl">Potência e nível de pressão sonora.</h2>
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        <Big value={SYSTEM.side.splIncoherent} unit="dB SPL" label="Cada lado · SPL incoerente" />
        <Big value={SYSTEM.side.splCoherent} unit="dB SPL" label="Cada lado · SPL coerente" note={SYSTEM.side.couplingNote} />
        <Big value={String(SYSTEM.side.watts)} unit="W" label="Subtotal por lado" />
        <Big value={String(SYSTEM.total.watts)} unit="W" label="Subtotal do sistema" />
        <Big value={SYSTEM.total.spl} unit="dB SPL" label="Sistema" />
        <Big value={SYSTEM.total.splLR} unit="dB" label="Total do sistema L + R" />
      </div>
    </Reveal></section>

    <section id="sub" className="scroll-mt-28 bg-bz-ice py-20 lg:py-28"><Reveal className="container-bz">
      <p data-reveal className="font-mono text-xs uppercase text-bz-cyan">Subgrave</p>
      <h2 data-reveal className="bz-section-title mt-4">{SYSTEM.sub.name}</h2>
      <p data-reveal className="mt-5 max-w-xl text-lg text-muted-foreground">Subgrave ativo com amplificação e processamento embarcados.</p>
      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[[Battery, "Amplificação", SYSTEM.sub.amp], [Plug, "Alimentação", `${SYSTEM.sub.power} · operação ${SYSTEM.sub.voltage}`], [Cpu, "Processamento", SYSTEM.sub.dsp], [Volume2, "Alto-falante", `${SYSTEM.sub.driver} · ${SYSTEM.sub.pair}`]].map(([Icon, t, v]) => { const I = Icon as typeof Battery; return <article key={t as string} data-reveal className="rounded-3xl bg-background p-8"><I className="text-bz-cyan" size={28} strokeWidth={1.5} aria-hidden="true" /><h3 className="mt-6 text-sm text-muted-foreground">{t as string}</h3><p className="mt-3 text-lg font-medium leading-snug">{v as string}</p></article>; })}
      </div>
    </Reveal></section>

    <section id="cobertura" className="ac-explore scroll-mt-28 bg-bz-ink py-20 text-bz-white lg:py-28" aria-labelledby="cov-title"><div className="container-bz">
      <p className="font-mono text-xs uppercase text-bz-cyan">Cobertura</p>
      <h2 id="cov-title" className="bz-section-title mb-10 mt-4 max-w-2xl">Como o sistema cobre uma área de 30 × 30 m.</h2>
      <AcousticScene mode="full" />
    </div></section>

    <section id="dados" className="scroll-mt-28 py-20 lg:py-28"><div className="container-bz max-w-3xl">
      <h2 className="bz-section-title">Dados técnicos</h2>
      <div className="mt-10 divide-y divide-border border-y border-border">
        {SPEC_GROUPS.map((g, i) => <details key={g.title} className="sys-acc group" {...(i === 0 ? { open: true } : {})}><summary className="flex min-h-14 cursor-pointer list-none items-center justify-between py-4 font-display text-xl font-semibold">{g.title}<span aria-hidden="true" className="sys-acc-icon text-bz-cyan">+</span></summary><dl className="pb-6">{g.rows.map(([k, v]) => <div key={k} className="flex flex-wrap justify-between gap-x-6 gap-y-1 border-t border-border py-3 first:border-t-0"><dt className="text-muted-foreground">{k}</dt><dd className="font-mono text-sm sm:text-right">{v}</dd></div>)}</dl></details>)}
      </div>
    </div></section>

    <ContactCTA message={MSG} subject="Interesse no sistema Bonzai Mini" />
  </main>;
}
