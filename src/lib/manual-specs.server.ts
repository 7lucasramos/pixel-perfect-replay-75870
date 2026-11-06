// SERVER-ONLY. Restricted manual data — never import from client code.
export type ManualSpecs = {
  subtotalWatts: number;
  spl: { incoerente: string; coerente: string; coerenteNota: string };
  moduleValues: { tw: string; mini: string };
};

const MANUAL: Record<string, ManualSpecs> = {
  "bonzai-mini": {
    subtotalWatts: 450,
    spl: { incoerente: "120,08 dB", coerente: "128,96 dB", coerenteNota: "Considera o acoplamento dos line arrays." },
    moduleValues: { tw: "45 W 91 dB", mini: "60 W 94 dB" },
  },
};

export function readManualSpecs(slug: string): ManualSpecs | null {
  return MANUAL[slug] ?? null;
}
