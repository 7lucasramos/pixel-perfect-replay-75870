import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { SHOW_MANUAL_SPECS } from "@/content/flags";

export type ManualSpecsResult = {
  specs: {
    subtotalWatts: number;
    spl: { incoerente: string; coerente: string; coerenteNota: string };
    moduleValues: { tw: string; mini: string };
  };
  preview: boolean;
} | null;

/** Returns restricted manual data only when published, or in the dev/preview server with ?preview=specs. */
export const getManualSpecs = createServerFn({ method: "GET" })
  .inputValidator((input: { slug: string; preview?: string }) =>
    z.object({ slug: z.string().max(80), preview: z.string().max(20).optional() }).parse(input),
  )
  .handler(async ({ data }): Promise<ManualSpecsResult> => {
    const published = SHOW_MANUAL_SPECS;
    const previewAllowed = import.meta.env.DEV && data.preview === "specs";
    if (!published && !previewAllowed) return null;
    const { readManualSpecs } = await import("./manual-specs.server");
    const specs = readManualSpecs(data.slug);
    return specs ? { specs, preview: !published } : null;
  });
