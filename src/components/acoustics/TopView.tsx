import { counts, GRID, SOURCES, topRays, type ViewProps } from "./scene-config";

export function TopView({ id, lite, reduced, selected, onSelect, interactive }: ViewProps) {
  const n = counts(lite);
  return <svg viewBox="0 0 1000 760" className="ac-svg" aria-label="Vista superior da distribuição sonora conceitual">
    <defs>
      <clipPath id={`${id}-audience`}><rect x="170" y="70" width="790" height="620" rx="12" /></clipPath>
      <linearGradient id={`${id}-beam`}><stop stopColor="var(--bz-cyan)" stopOpacity=".9" /><stop offset="1" stopColor="var(--bz-cyan)" stopOpacity=".25" /></linearGradient>
      <linearGradient id={`${id}-fill`}><stop stopColor="var(--bz-cyan)" stopOpacity=".18" /><stop offset="1" stopColor="var(--bz-cyan)" stopOpacity=".04" /></linearGradient>
      {SOURCES.map((s, i) => <clipPath key={i} id={`${id}-fan-${i}`}><path d={`M150 ${s.y} L1100 ${s.y - 665} L1100 ${s.y + 665} Z`} /></clipPath>)}
    </defs>
    <g data-layer="grid" className="ac-grid"><rect x="170" y="70" width="790" height="620" rx="12" fill="none" stroke="var(--bz-cyan)" strokeOpacity=".4" />{GRID.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r="1.8" fill="var(--bz-cyan)" opacity=".1" />)}</g>
    <g clipPath={`url(#${id}-audience)`}>
      <g data-layer="coverage"><g data-coverage opacity="0">{SOURCES.map((s, i) => <path key={i} d={`M150 ${s.y} L1100 ${s.y - 665} L1100 ${s.y + 665} Z`} fill={`url(#${id}-fill)`} />)}</g><path data-overlap opacity="0" d="M307 380 L960 70 L960 690 Z" className="ac-overlap" /></g>
      <g data-layer="beams">{SOURCES.map((s, source) => <g key={source} className={selected === null ? "ac-ray-group" : selected === source ? "ac-ray-group ac-highlight" : "ac-ray-group ac-dim"}>{topRays(n.beams, s.y).map((p, i) => <line key={i} data-beam data-index={i} data-count={n.beams} data-source={source} pathLength="1" strokeDasharray="1" strokeDashoffset="1" x1={s.x} y1={s.y} x2={p.x} y2={p.y} stroke={`url(#${id}-beam)`} />)}</g>)}</g>
      <g data-layer="waves">{SOURCES.map((s, source) => <g key={source} clipPath={`url(#${id}-fan-${source})`}>{Array.from({ length: reduced ? 3 : n.waves }, (_, i) => <circle key={i} data-wave data-phase={i / (reduced ? 3 : n.waves)} cx={s.x} cy={s.y} r="0" fill="none" stroke="var(--bz-cyan)" strokeWidth="1" opacity="0" />)}</g>)}</g>
    </g>
    <g data-layer="sources">{SOURCES.map((s, i) => <g key={i} transform={`translate(${s.x} ${s.y})`} className={`ac-source ${selected === i ? "ac-selected" : ""}`} role={interactive ? "button" : undefined} tabIndex={interactive ? 0 : undefined} aria-label={`${s.name}: origem do som neste cenário ilustrativo`} aria-pressed={interactive ? selected === i : undefined} onPointerEnter={e => { if (interactive && e.pointerType === "mouse") onSelect(i); }} onPointerLeave={e => { if (interactive && e.pointerType === "mouse") onSelect(null); }} onFocus={() => interactive && onSelect(i)} onBlur={() => interactive && onSelect(null)} onClick={e => { e.stopPropagation(); if (interactive) onSelect(selected === i ? null : i); }} onKeyDown={e => { if (interactive && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); onSelect(selected === i ? null : i); } }}>
      <rect className="ac-source-target" x="-36" y="-40" width="72" height="80" rx="6" /><rect x="-22" y="-22" width="28" height="44" rx="4" className="ac-source-box" /><path d="M10 -20 Q24 0 10 20" fill="none" stroke="var(--bz-cyan)" strokeWidth="3" />
    </g>)}</g>
    <g data-layer="labels"><g data-labels opacity="0" className="ac-labels"><text x="185" y="110">Área de público</text><text x="98" y="235">Fonte A</text><text x="98" y="540">Fonte B</text><text x="560" y="380">Zona de sobreposição</text></g></g>
  </svg>;
}