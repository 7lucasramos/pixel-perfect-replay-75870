import { AREA, DISTANCES, PX_PER_M } from "./sim-data";
import { counts, fanPath, GRID, SOURCES, TOP, topRays, type ViewProps } from "./scene-config";

export function TopView({ id, lite, selected, onSelect, interactive, distance }: ViewProps) {
  const n = counts(lite), { x0, y0, size } = TOP;
  const cy = (SOURCES[0]!.y + SOURCES[1]!.y) / 2;
  return <svg viewBox={`0 0 ${TOP.w} ${TOP.h}`} className="ac-svg" role="img" aria-label="Vista superior: dois lados do sistema a 8 m de distância em uma área de 30 por 30 metros, com cobertura real de 674 metros quadrados.">
    <defs>
      <clipPath id={`${id}-area`}><rect x={x0} y={y0} width={size} height={size} /></clipPath>
      <linearGradient id={`${id}-beam`}><stop stopColor="var(--bz-cyan)" stopOpacity=".9" /><stop offset="1" stopColor="var(--bz-cyan)" stopOpacity=".2" /></linearGradient>
      <linearGradient id={`${id}-fill`}><stop stopColor="var(--bz-cyan)" stopOpacity=".24" /><stop offset="1" stopColor="var(--bz-cyan)" stopOpacity=".05" /></linearGradient>
      {SOURCES.map((s, i) => <clipPath key={i} id={`${id}-fan-${i}`}><path d={fanPath(s.y)} /></clipPath>)}
    </defs>
    <g data-layer="grid" className="ac-grid"><rect x={x0} y={y0} width={size} height={size} fill="none" stroke="var(--bz-cyan)" strokeOpacity=".45" />{GRID.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r="1.8" fill="var(--bz-cyan)" opacity=".16" />)}</g>
    <g clipPath={`url(#${id}-area)`}>
      <g data-layer="coverage"><g data-coverage opacity="0">{SOURCES.map((s, i) => <path key={i} d={fanPath(s.y)} fill={`url(#${id}-fill)`} />)}</g></g>
      <g data-layer="beams">{SOURCES.map((s, source) => <g key={source} className={selected === null ? "ac-ray-group" : selected === source ? "ac-ray-group ac-highlight" : "ac-ray-group ac-dim"}>{topRays(n.beams, s.y).map((p, i) => <line key={i} data-beam data-index={i} data-count={n.beams} data-source={source} pathLength="1" strokeDasharray="1" strokeDashoffset="1" x1={s.x} y1={s.y} x2={p.x} y2={p.y} stroke={`url(#${id}-beam)`} />)}</g>)}</g>
      <g data-layer="waves">{SOURCES.map((s, source) => <g key={source} clipPath={`url(#${id}-fan-${source})`}>{Array.from({ length: n.waves }, (_, i) => <circle key={i} data-wave data-phase={i / n.waves} cx={s.x} cy={s.y} r="0" fill="none" stroke="var(--bz-cyan)" strokeWidth="1" opacity="0" />)}</g>)}</g>
    </g>
    <g data-layer="sources">{SOURCES.map((s, i) => <g key={i} transform={`translate(${s.x} ${s.y})`} className={`ac-source ${selected === i ? "ac-selected" : ""}`} role={interactive ? "button" : undefined} tabIndex={interactive ? 0 : undefined} aria-label={`${s.name} do sistema`} aria-pressed={interactive ? selected === i : undefined} onPointerEnter={e => { if (interactive && e.pointerType === "mouse") onSelect(i); }} onPointerLeave={e => { if (interactive && e.pointerType === "mouse") onSelect(null); }} onFocus={() => interactive && onSelect(i)} onBlur={() => interactive && onSelect(null)} onClick={e => { e.stopPropagation(); if (interactive) onSelect(selected === i ? null : i); }} onKeyDown={e => { if (interactive && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); onSelect(selected === i ? null : i); } }}>
      <rect className="ac-source-target" x="-30" y="-36" width="60" height="72" rx="6" /><rect x="-14" y="-22" width="22" height="44" rx="4" className="ac-source-box" /><path d="M12 -20 Q26 0 12 20" fill="none" stroke="var(--bz-cyan)" strokeWidth="3" />
    </g>)}</g>
    <g data-layer="numbers"><g data-labels opacity="0" className="ac-labels">
      <path d={`M${x0} ${y0 - 34} H${x0 + size}`} className="ac-dim-line" /><text x={x0 + size / 2} y={y0 - 44} textAnchor="middle">{AREA.width} m</text>
      <path d={`M${x0 - 78} ${y0} V${y0 + size}`} className="ac-dim-line" /><text transform={`translate(${x0 - 88} ${y0 + size / 2}) rotate(-90)`} textAnchor="middle">{AREA.depth} m</text>
      <path d={`M${x0 - 16} ${SOURCES[0]!.y} V${SOURCES[1]!.y}`} className="ac-dim-line" /><text x={x0 - 24} y={cy + 6} textAnchor="end">{AREA.sourceGap} m</text>
      <text x={x0 + 14} y={SOURCES[0]!.y - 44} className="ac-name">{SOURCES[0]!.name}</text><text x={x0 + 14} y={SOURCES[1]!.y + 62} className="ac-name">{SOURCES[1]!.name}</text>
      {DISTANCES.map(d => <g key={d} className={d === distance ? "ac-tick ac-tick-on" : "ac-tick"}><path d={`M${x0 + d * PX_PER_M} ${y0} V${y0 + size}`} className="ac-tick-line" /><text x={x0 + d * PX_PER_M} y={y0 + size + 28} textAnchor="middle">{d} m</text></g>)}
      <text x={x0} y={y0 + size + 72}>Área aprox. {AREA.site} m² · Cobertura real {AREA.coverage} m²</text>
      <text x={x0} y={y0 + size + 100}>{AREA.peoplePerSqm} pessoas por m² ({AREA.people} pessoas)</text>
    </g></g>
  </svg>;
}
