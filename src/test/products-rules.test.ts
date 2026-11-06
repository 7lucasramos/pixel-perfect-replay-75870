import { describe, expect, it } from "vitest";
import { findProduct, products, productContactDefaults } from "@/content/products";
import { SHOW_MANUAL_SPECS } from "@/content/flags";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { cases, demoEnabled, authorizedTestimonial, type CaseStudy } from "@/content/cases";
describe("Phase 4 rules", () => {
  it("keeps the single authorized product", () => { expect(products.map(p => p.slug)).toEqual(["bonzai-mini"]); expect(findProduct("unknown")).toBeUndefined(); });
  it("preserves exact eight-module manual order", () => { expect(products[0]?.configuration?.modules).toEqual(["Bonzai Mini TW", "Bonzai Mini", "Bonzai Mini", "Bonzai Mini", "Bonzai Mini TW", "Bonzai Mini", "Bonzai Mini", "Bonzai Mini"]); });
  it("prefills only whitelisted products", () => { expect(productContactDefaults("bonzai-mini")).toEqual({ tipo_projeto: "Sistema de sonorização", mensagem: "Tenho interesse no Bonzai Mini." }); expect(productContactDefaults("fake")).toEqual({ tipo_projeto: "", mensagem: "" }); });
  it("keeps real cases empty and demo development-only", () => { expect(cases).toEqual([]); expect(demoEnabled(false,"case")).toBe(false); expect(demoEnabled(true,"case")).toBe(true); expect(demoEnabled(true)).toBe(false); });
  it("never exposes an unauthorized testimonial", () => { const item = { slug: "test", title: "test", location: "", applicationType: "", systemUsed: "", description: "", testimonial: { quote: "test", author: "test", authorized: false } } as unknown as CaseStudy; expect(authorizedTestimonial(item)).toBeUndefined(); expect(authorizedTestimonial({ ...item, testimonial: { quote: "authorized", author: "test", authorized: true } })?.quote).toBe("authorized"); });
  it("keeps manual publication off", () => { expect(SHOW_MANUAL_SPECS).toBe(false); });
  it("keeps restricted manual values out of every client file", () => {
    // Patterns assembled from parts so this test file itself holds no restricted value.
    const banned = [["12","0,08"], ["12","8,96"], ["4","5 W"], ["6","0 W"], ["9","1 dB"], ["9","4 dB"]].map(p => p.join(""));
    const walk = (dir: string): string[] => readdirSync(dir).flatMap(n => { const f = join(dir, n); return statSync(f).isDirectory() ? walk(f) : [f]; });
    const files = walk("src").filter(f => !f.includes(".server.") && !f.includes("/test/") && !f.endsWith("routeTree.gen.ts"));
    const hits = files.flatMap(f => { const text = readFileSync(f, "utf8"); return banned.filter(b => text.includes(b)).map(b => `${f}: ${b}`); });
    expect(hits).toEqual([]);
  });
});
