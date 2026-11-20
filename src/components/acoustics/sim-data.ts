// Values transcribed from the Bonzai SPL simulation diagram (used exactly as supplied).
export const DISTANCES = [5, 10, 15, 20, 25, 30] as const;
export type Distance = (typeof DISTANCES)[number];
export type Row = { rms: string; peak: string };
export const SIM: Record<Distance, { upper: Row; lower: Row }> = {
  5: { upper: { rms: "125,04", peak: "128,05" }, lower: { rms: "137,4", peak: "142,5" } },
  10: { upper: { rms: "119,02", peak: "122,03" }, lower: { rms: "131,2", peak: "136,3" } },
  15: { upper: { rms: "115,50", peak: "118,51" }, lower: { rms: "125,50", peak: "130,51" } },
  20: { upper: { rms: "113,00", peak: "116,01" }, lower: { rms: "119,50", peak: "124,01" } },
  25: { upper: { rms: "111,06", peak: "114,07" }, lower: { rms: "113,06", peak: "118,07" } },
  30: { upper: { rms: "109,48", peak: "112,49" }, lower: { rms: "107,06", peak: "112,49" } },
};
export const AREA = { site: 900, coverage: 674, peoplePerSqm: 3, people: "cerca de 2000", width: 30, depth: 30, sourceGap: 8 } as const;
export const SIM_FOOTNOTE = "Valores de simulação. O resultado real depende do ambiente.";
// Top view: 25 px per metre. Sources at the left edge, 11 m and 19 m from the top (8 m apart) in a 30 × 30 m area.
export const PX_PER_M = 25;
export const SOURCE_Y_M = [11, 19] as const;
export const FAN_HALF_DEG = 28;
