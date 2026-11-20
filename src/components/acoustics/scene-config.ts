import { FAN_HALF_DEG, PX_PER_M, SOURCE_Y_M } from "./sim-data";
export type View = "top" | "side";
export type Layer = "sources" | "beams" | "coverage" | "waves" | "grid" | "numbers";
export const LAYERS: { key: Layer; label: string }[] = [
  { key: "sources", label: "Fontes" }, { key: "beams", label: "Feixes" },
  { key: "coverage", label: "Cobertura" }, { key: "waves", label: "Frentes de onda" },
  { key: "grid", label: "Grade" }, { key: "numbers", label: "Cotas e números" },
];
export const DEFAULT_LAYERS: Record<Layer, boolean> = { sources: true, beams: true, coverage: true, waves: true, grid: true, numbers: true };
export const DURATION = 6;
export const clamp = (n: number) => Math.max(0, Math.min(1, n));
export const stage = (p: number, start: number, end: number) => clamp((p - start) / (end - start));
export const counts = (lite: boolean) => ({ beams: lite ? 5 : 9, waves: lite ? 4 : 7 });
export function beamProgress(p: number, index: number, count: number, source: number) {
  const delay = index / Math.max(1, count - 1) * .16 + source * .05;
  return stage(p, delay, .45);
}
// ---- Top view: 1000 × 900 viewBox, 25 px per metre, 30 × 30 m area ----
export const TOP = { w: 1000, h: 900, x0: 120, y0: 100, size: 30 * PX_PER_M };
export const SOURCES = SOURCE_Y_M.map((m, i) => ({ x: TOP.x0, y: TOP.y0 + m * PX_PER_M, name: i === 0 ? "Lado L" : "Lado R" }));
export const fanPath = (y: number) => {
  const reach = 1200, t = Math.tan(FAN_HALF_DEG * Math.PI / 180) * reach;
  return `M${TOP.x0} ${y} L${TOP.x0 + reach} ${y - t} L${TOP.x0 + reach} ${y + t} Z`;
};
export function topRays(count: number, y: number) {
  return Array.from({ length: count }, (_, i) => {
    const angle = (-FAN_HALF_DEG + i * (2 * FAN_HALF_DEG) / (count - 1)) * Math.PI / 180;
    return { x: TOP.x0 + 1200, y: y + Math.tan(angle) * 1200 };
  });
}
export const GRID = Array.from({ length: 15 }, (_, row) => Array.from({ length: 15 }, (_, col) => ({ x: TOP.x0 + col * 2 * PX_PER_M + PX_PER_M, y: TOP.y0 + row * 2 * PX_PER_M + PX_PER_M }))).flat();
// ---- Side view: 1000 × 560 viewBox, ground y = 400, array top at 6 m ----
export const SIDE = { w: 1000, h: 560, ground: 400, sourceX: 100, top: 6 };
export const EMISSION_DEG = [5, 5.5, 6.5, 8, 11, 16, 23, 32];
export function sideRays(lite: boolean) {
  const mods = EMISSION_DEG.map((deg, i) => ({ deg, h: SIDE.top - 0.18 - i * 0.36 }));
  const all = lite ? mods : mods.flatMap((m, i) => { const n = mods[i + 1]; return n ? [m, { deg: (m.deg + n.deg) / 2, h: (m.h + n.h) / 2 }] : [m]; });
  return all.map(({ deg, h }) => {
    const y1 = SIDE.ground - h * PX_PER_M, rad = deg * Math.PI / 180, run = Math.min(900, h / Math.tan(rad) * PX_PER_M);
    return { x1: SIDE.sourceX, y1, x2: SIDE.sourceX + run, y2: y1 + Math.tan(rad) * run };
  });
}
export type ViewProps = { id: string; lite: boolean; reduced: boolean; selected: number | null; onSelect: (source: number | null) => void; interactive: boolean; distance: number };
