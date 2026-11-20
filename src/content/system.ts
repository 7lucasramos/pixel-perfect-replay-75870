// Technical data supplied and authorised for publication by Bonzai (Manual — "Cada lado do sistema Bonzai Mini").
export type ModuleKind = "TW" | "M";
export const MODULES: { n: number; kind: ModuleKind; name: string; watts: number; spl: number }[] = [
  { n: 1, kind: "TW", name: "Bonzai Mini TW", watts: 45, spl: 91 },
  { n: 2, kind: "M", name: "Bonzai Mini", watts: 60, spl: 94 },
  { n: 3, kind: "M", name: "Bonzai Mini", watts: 60, spl: 94 },
  { n: 4, kind: "M", name: "Bonzai Mini", watts: 60, spl: 94 },
  { n: 5, kind: "TW", name: "Bonzai Mini TW", watts: 45, spl: 91 },
  { n: 6, kind: "M", name: "Bonzai Mini", watts: 60, spl: 94 },
  { n: 7, kind: "M", name: "Bonzai Mini", watts: 60, spl: 94 },
  { n: 8, kind: "M", name: "Bonzai Mini", watts: 60, spl: 94 },
];
export const SYSTEM = {
  name: "Bonzai Mini",
  modulesPerSide: 8,
  side: { watts: 450, splIncoherent: "120,08", splCoherent: "128,96", couplingNote: "O SPL coerente considera o acoplamento dos line arrays." },
  total: { watts: 900, spl: "131,96", splLR: "133,12" },
  sub: {
    name: "Bonzai Sub BZ18B",
    amp: "Ativo, 4 canais de 2000 W",
    power: "AC 100–240 V, 50/60 Hz",
    voltage: "AC 90–264 V",
    dsp: "DSP com 4 presets",
    driver: "1 × 18″, 1600 W AES, 97 dB",
    pair: "Par (×2): 129 dB",
  },
} as const;
export const SPEC_GROUPS = [
  { title: "Módulos do line array", rows: [["Bonzai Mini TW", "45 W · 91 dB"], ["Bonzai Mini", "60 W · 94 dB"], ["Configuração por lado", "8 módulos: 2 × TW + 6 × Mini"]] },
  { title: "Cada lado", rows: [["Potência", "450 W"], ["SPL incoerente", "120,08 dB"], ["SPL coerente", "128,96 dB"]] },
  { title: "Sistema completo (L + R)", rows: [["Potência", "900 W"], ["SPL do sistema", "131,96 dB"], ["Total L+R", "133,12 dB"]] },
  { title: "Bonzai Sub BZ18B", rows: [["Amplificação", "Ativo, 4 canais de 2000 W"], ["Alimentação nominal", "AC 100–240 V, 50/60 Hz"], ["Tensão de operação", "AC 90–264 V"], ["Processamento", "DSP com 4 presets"], ["Alto-falante", "1 × 18″, 1600 W AES, 97 dB"], ["Par (×2)", "129 dB"]] },
] as const;
