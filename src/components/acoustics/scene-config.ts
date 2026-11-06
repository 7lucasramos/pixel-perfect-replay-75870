// Coordinates are illustration units only, never acoustic specifications.
export type View = "top" | "side";
export type Layer = "sources" | "beams" | "coverage" | "waves" | "grid" | "labels";
export const LAYERS: { key: Layer; label: string }[] = [
  { key: "sources", label: "Fontes" }, { key: "beams", label: "Feixes" },
  { key: "coverage", label: "Cobertura" }, { key: "waves", label: "Frentes de onda" },
  { key: "grid", label: "Grade" }, { key: "labels", label: "Rótulos" },
];
export const DEFAULT_LAYERS: Record<Layer, boolean> = { sources: true, beams: true, coverage: true, waves: true, grid: true, labels: true };
export const SOURCES = [{ x: 150, y: 270, name: "Fonte A" }, { x: 150, y: 490, name: "Fonte B" }];
export const DURATION = 6;
export const clamp = (n: number) => Math.max(0, Math.min(1, n));
export const stage = (p: number, start: number, end: number) => clamp((p - start) / (end - start));
export const counts = (lite: boolean) => ({ beams: lite ? 5 : 9, waves: lite ? 4 : 7 });
export function beamProgress(p: number, index: number, count: number, source: number) {
  const delay = index / Math.max(1, count - 1) * .16 + source * .05;
  return stage(p, delay, .45);
}
export function topRays(count: number, y: number) {
  return Array.from({ length: count }, (_, i) => {
    const angle = (-35 + i * 70 / (count - 1)) * Math.PI / 180;
    return { x: 1100, y: y + Math.tan(angle) * 950 };
  });
}
export const GRID = Array.from({ length: 14 }, (_, row) => Array.from({ length: 28 }, (_, col) => ({ x: 192 + col * 27, y: 98 + row * 43 }))).flat();
export type ViewProps = { id: string; lite: boolean; reduced: boolean; selected: number | null; onSelect: (source: number | null) => void; interactive: boolean };