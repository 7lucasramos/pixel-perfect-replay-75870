import { DISTANCES, PX_PER_M, SIM } from "./sim-data";
import { counts, SIDE, sideRays, type ViewProps } from "./scene-config";
import { LA_POLYS, LA_TOP_FRONT } from "@/components/system/la-geometry";

const Person = ({ x }: { x: number }) => <g transform={`translate(${x} ${SIDE.ground})`} fill="none" stroke="var(--bz-white)" opacity=".5" strokeWidth="1.5"><circle cy="-44" r="5" /><path d="M0 -38 V-18 M-8 -30 H8 M0 -18 L-6 0 M0 -18 L6 0" /></g>;
export function SideView({ id, lite, distance }: ViewProps) {
  const rays = sideRays(lite), n = counts(lite), scale = PX_PER_M / 100;
  const ax = SIDE.sourceX - LA_TOP_FRONT[0] * scale, ay = SIDE.ground - SIDE.top * PX_PER_M - LA_TOP_FRONT[1] * scale;
  const fan = rays.length ? `M${SIDE.sourceX} ${SIDE.ground - 5.2 * PX_PER_M} L${SIDE.sourceX + 880} ${SIDE.ground} L${SIDE.sourceX + 40} ${SIDE.ground} Z` : "";
  return <svg viewBox={`0 0 ${SIDE.w} ${SIDE.h}`} className="ac-svg" role="img" aria-label="Vista lateral: line array a 6 metros de altura projetando o som até 30 metros de distância, com níveis RMS e PEAK em cada distância.">
    <defs><linearGradient id={`${id}-sb`}><stop stopColor="var(--bz-cyan)" stopOpacity=".9" /><stop offset="1" stopColor="var(--bz-cyan)" stopOpacity=".25" /></linearGradient><linearGradient id={`${id}-sf`}><stop stopColor="var(--bz-cyan)" stopOpacity=".2" /><stop offset="1" stopColor="var(--bz-cyan)" stopOpacity=".04" /></linearGradient><clipPath id={`${id}-sfan`}><path d={fan} /></clipPath></defs>
    <g data-layer="grid" className="ac-grid"><path d={`M60 ${SIDE.ground} H960`} stroke="var(--bz-cyan)" strokeOpacity=".5" />{DISTANCES.map(d => <path key={d} d={`M${SIDE.sourceX + d * PX_PER_M} ${SIDE.ground} v6`} stroke="var(--bz-cyan)" strokeOpacity=".5" />)}</g>
    <g data-layer="coverage"><path data-coverage opacity="0" d={fan} fill={`url(#${id}-sf)`} /></g>
    <g data-layer="beams" className="ac-ray-group">{rays.map((r, i) => <line key={i} data-beam data-index={i} data-count={n.beams} data-source="0" pathLength="1" strokeDasharray="1" strokeDashoffset="1" x1={r.x1} y1={r.y1} x2={r.x2} y2={r.y2} stroke={`url(#${id}-sb)`} />)}</g>
    <g data-layer="waves" clipPath={`url(#${id}-sfan)`}>{Array.from({ length: n.waves }, (_, i) => <circle key={i} data-wave data-phase={i / n.waves} cx={SIDE.sourceX} cy={SIDE.ground - 4.6 * PX_PER_M} r="0" fill="none" stroke="var(--bz-cyan)" opacity="0" />)}</g>
    <g data-layer="sources"><g transform={`translate(${ax} ${ay}) scale(${scale})`}>{LA_POLYS.map(m => <g key={m.n}><polygon points={m.points} fill={m.kind === "TW" ? "#1b3a4a" : "#252932"} stroke="var(--bz-cyan)" strokeWidth="5" strokeLinejoin="round" /></g>)}</g><path d={`M${SIDE.sourceX - 4} ${SIDE.ground - SIDE.top * PX_PER_M - 6} V${SIDE.ground - SIDE.top * PX_PER_M - 40}`} stroke="var(--bz-white)" opacity=".4" /></g>
    <g data-layer="numbers"><g data-labels opacity="0" className="ac-labels">
      <path d={`M${SIDE.sourceX - 46} ${SIDE.ground - 6 * PX_PER_M} V${SIDE.ground}`} className="ac-dim-line" /><text x={SIDE.sourceX - 54} y={SIDE.ground - 3 * PX_PER_M + 5} textAnchor="end">6 m</text>
      {DISTANCES.map(d => { const x = SIDE.sourceX + d * PX_PER_M, on = d === distance, v = SIM[d]; return <g key={d} className={on ? "ac-tick ac-tick-on" : "ac-tick"}>
        <Person x={x} /><path d={`M${x} 60 V${SIDE.ground}`} className="ac-tick-line" />
        <g className="ac-sv-text"><text x={x} y="40" textAnchor="middle" className="ac-up">RMS {v.upper.rms}</text><text x={x} y="58" textAnchor="middle" className="ac-up">PEAK {v.upper.peak}</text>
        <text x={x} y={SIDE.ground + 34} textAnchor="middle">{d} m</text><text x={x} y={SIDE.ground + 56} textAnchor="middle" className="ac-low">RMS {v.lower.rms}</text><text x={x} y={SIDE.ground + 76} textAnchor="middle" className="ac-low">PEAK {v.lower.peak}</text></g>
        {!on ? null : <circle cx={x} cy={SIDE.ground} r="5" fill="var(--bz-cyan)" />}</g>; })}
    </g></g>
  </svg>;
}
