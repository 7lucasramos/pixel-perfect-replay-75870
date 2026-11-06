import { describe, expect, it } from "vitest";
import { contactSchema } from "@/lib/contact-schema";
import { CONTACT, visibleChannels, cases } from "@/content/site";
const valid = { nome: "Teste Bonzai", empresa: "", email: "teste@example.com", telefone: "", perfil: "", tipo_projeto: "", mensagem: "Projeto de teste", consentimento: true, website: "" };
describe("Institutional rules", () => {
 it("hides every empty contact channel", () => { expect(visibleChannels(CONTACT)).toEqual([]); expect(visibleChannels({ ...CONTACT, email: "contato@example.com" })).toEqual([["email", "contato@example.com"]]); });
 it("requires name", () => { expect(contactSchema.safeParse({ ...valid, nome: "" }).success).toBe(false); });
 it("requires valid email", () => { expect(contactSchema.safeParse({ ...valid, email: "invalido" }).success).toBe(false); });
 it("requires message", () => { expect(contactSchema.safeParse({ ...valid, mensagem: " " }).success).toBe(false); });
 it("requires LGPD consent", () => { expect(contactSchema.safeParse({ ...valid, consentimento: false }).success).toBe(false); });
 it("rejects a filled honeypot", () => { expect(contactSchema.safeParse({ ...valid, website: "spam" }).success).toBe(false); });
 it("accepts the requested profile and project choices", () => { expect(contactSchema.safeParse({ ...valid, perfil: "Integrador", tipo_projeto: "Instalação permanente" }).success).toBe(true); });
 it("does not fabricate real case studies", () => { expect(cases).toEqual([]); });
});
