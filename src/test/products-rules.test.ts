import { describe, expect, it } from "vitest";
import { findProduct, products, productContactDefaults } from "@/content/products";
import { SHOW_MANUAL_SPECS, specsVisible } from "@/content/flags";
import { cases, demoEnabled, authorizedTestimonial, type CaseStudy } from "@/content/cases";
describe("Phase 4 rules", () => {
  it("keeps the single authorized product", () => { expect(products.map(p => p.slug)).toEqual(["bonzai-mini"]); expect(findProduct("unknown")).toBeUndefined(); });
  it("preserves exact eight-module manual order", () => { expect(products[0]?.configuration?.modules).toEqual(["Bonzai Mini TW 45 W 91 dB", "Bonzai Mini 60 W 94 dB", "Bonzai Mini 60 W 94 dB", "Bonzai Mini 60 W 94 dB", "Bonzai Mini TW 45 W 91 dB", "Bonzai Mini 60 W 94 dB", "Bonzai Mini 60 W 94 dB", "Bonzai Mini 60 W 94 dB"]); });
  it("preserves manual values without interpretation", () => { expect(products[0]?.manualSpecs).toEqual({ subtotalWatts: 450, spl: { incoerente: "120,08 dB", coerente: "128,96 dB", coerenteNota: "Considera o acoplamento dos line arrays." } }); });
  it("hides unpublished specs unless explicitly previewed", () => { expect(SHOW_MANUAL_SPECS).toBe(false); expect(specsVisible()).toBe(false); expect(specsVisible("other")).toBe(false); expect(specsVisible("specs")).toBe(true); expect(specsVisible(undefined, true)).toBe(true); });
  it("prefills only whitelisted products", () => { expect(productContactDefaults("bonzai-mini")).toEqual({ tipo_projeto: "Sistema de sonorização", mensagem: "Tenho interesse no Bonzai Mini." }); expect(productContactDefaults("fake")).toEqual({ tipo_projeto: "", mensagem: "" }); });
  it("keeps real cases empty and demo development-only", () => { expect(cases).toEqual([]); expect(demoEnabled(false,"case")).toBe(false); expect(demoEnabled(true,"case")).toBe(true); expect(demoEnabled(true)).toBe(false); });
  it("never exposes an unauthorized testimonial", () => { const item = { slug: "test", title: "test", location: "", applicationType: "", systemUsed: "", description: "", testimonial: { quote: "test", author: "test", authorized: false } } as unknown as CaseStudy; expect(authorizedTestimonial(item)).toBeUndefined(); expect(authorizedTestimonial({ ...item, testimonial: { quote: "authorized", author: "test", authorized: true } })?.quote).toBe("authorized"); });
});