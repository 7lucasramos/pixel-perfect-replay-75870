import { useEffect, useRef, useState } from "react";
import { MODULES } from "@/content/system";
import { motionReduced } from "@/lib/motion";
import { LA_POLYS, LA_VIEWBOX } from "./la-geometry";

const clamp = (n: number, a = 0, b = 1) => Math.max(a, Math.min(b, n));

/** J-shaped 8-module line array. `reveal` is 0..8 (fractional = the module currently arriving). */
export function LineArrayGraphic({ reveal = 8, active = null, className = "", tone = "light" }: { reveal?: number; active?: number | null; className?: string; tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  return (
    <svg viewBox={LA_VIEWBOX} className={className} role="img" aria-label="Line array Bonzai Mini com 8 módulos em curva em J: módulos 1 e 5 são TW, os demais são Mini.">
      {LA_POLYS.map((m) => {
        const o = clamp(reveal - (m.n - 1));
        const isActive = active === m.n;
        const tw = m.kind === "TW";
        return (
          <g key={m.n} style={{ opacity: o, transform: `translateY(${(1 - o) * -14}px)`, transition: "opacity .15s linear" }}>
            <polygon points={m.points} fill={isActive ? "#12B3F0" : tw ? (dark ? "#1b3a4a" : "#E8F6FD") : dark ? "#252932" : "#F2F4F7"} fillOpacity={isActive ? 0.28 : 1} stroke={dark ? "#E6EAF0" : "#101114"} strokeWidth="2" strokeLinejoin="round" />
            <line x1={m.front[0]} y1={m.front[1]} x2={m.front[2]} y2={m.front[3]} stroke={tw || isActive ? "#12B3F0" : dark ? "#E6EAF0" : "#101114"} strokeWidth="5" strokeLinecap="round" />
          </g>
        );
      })}
    </svg>
  );
}

/** Sticky, scroll-scrubbed assembly of the array with the module data. */
export function LineArraySection() {
  const wrap = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(1);
  const [reduced, setReduced] = useState(true);
  useEffect(() => {
    const r = motionReduced();
    setReduced(r);
    if (r) { setP(1); return; }
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = wrap.current; if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      setP(total > 0 ? clamp(-rect.top / total) : 1);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); if (raf) cancelAnimationFrame(raf); };
  }, []);
  const reveal = reduced ? 8 : clamp(p / 0.8) * 8;
  const current = reduced ? null : Math.min(8, Math.max(1, Math.ceil(reveal - 0.001))) ;
  const done = reduced || p > 0.82;
  const mod = current ? MODULES[current - 1] : null;
  return (
    <section ref={wrap} id="line-array" aria-labelledby="la-title" className={`scroll-mt-20 bg-background ${reduced ? "" : "h-[420svh] max-md:h-[360svh]"}`}>
      <div className={reduced ? "container-bz py-20" : "sticky top-0 flex h-svh items-center pb-24 pt-32 md:pb-8"}>
        <div className="container-bz grid items-center gap-4 md:grid-cols-2 md:gap-16">
          <div className="order-2 md:order-1">
            <p className="font-mono text-xs uppercase text-bz-cyan">Line array</p>
            <h2 id="la-title" className="bz-section-title mt-4">8 módulos, uma única curva.</h2>
            <p className="mt-5 hidden max-w-md text-lg leading-relaxed text-muted-foreground md:block">Cada lado do sistema reúne dois módulos Bonzai Mini TW e seis Bonzai Mini, na ordem definida no manual.</p>
            <div className="mt-4 min-h-[104px] rounded-2xl border border-border bg-bz-ice p-5 md:mt-8 md:p-6" aria-live="polite">
              {done ? (
                <><p className="font-mono text-xs text-muted-foreground">Por lado</p><p className="mt-2 font-display text-3xl font-bold">450 W</p><p className="mt-1 text-sm text-muted-foreground">2 × Bonzai Mini TW (45 W · 91 dB) + 6 × Bonzai Mini (60 W · 94 dB)</p></>
              ) : mod ? (
                <><p className="font-mono text-xs text-muted-foreground">Módulo {mod.n} de 8</p><p className="mt-2 font-display text-3xl font-bold">{mod.name}</p><p className="mt-1 text-sm text-muted-foreground">{mod.watts} W · {mod.spl} dB</p></>
              ) : (
                <p className="text-sm text-muted-foreground">Role para montar o arranjo.</p>
              )}
            </div>
            {reduced && (
              <ol className="mt-6 grid gap-2 text-sm">{MODULES.map((m) => <li key={m.n} className="flex justify-between border-b border-border py-2"><span className="font-mono text-muted-foreground">{String(m.n).padStart(2, "0")}</span><span>{m.name}</span><span className="text-muted-foreground">{m.watts} W · {m.spl} dB</span></li>)}</ol>
            )}
          </div>
          <div className="order-1 flex justify-center md:order-2">
            <LineArrayGraphic reveal={reveal} active={done ? null : current} className="h-[32svh] w-auto md:h-[62svh]" />
          </div>
        </div>
      </div>
    </section>
  );
}
