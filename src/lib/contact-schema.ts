import { z } from "zod";
import { PROFILES, PROJECT_TYPES } from "@/content/site";
/** Minimum time between showing the form and submitting it. */
export const MIN_FILL_MS = 3000;
const selection = (options: readonly string[]) => z.string().refine(value => value === "" || options.includes(value), "Selecione uma opção válida.");
export const contactSchema = z.object({
 nome: z.string().trim().min(2, "Informe seu nome.").max(120, "Use até 120 caracteres."),
 empresa: z.string().trim().max(160, "Use até 160 caracteres."),
 email: z.string().trim().email("Informe um e-mail válido.").max(254, "E-mail muito longo."),
 telefone: z.string().trim().max(40, "Use até 40 caracteres."),
 perfil: selection(PROFILES), tipo_projeto: selection(PROJECT_TYPES),
 mensagem: z.string().trim().min(1, "Conte um pouco sobre seu projeto.").max(5000, "Use até 5.000 caracteres."),
 consentimento: z.boolean().refine(value => value === true, "É necessário concordar com o contato para enviar o pedido."),
 website: z.string().max(200),
 iniciado_em: z.number().int().nonnegative(),
});
export type ContactInput = z.infer<typeof contactSchema>;
/** Honeypot filled or form sent faster than MIN_FILL_MS (or with an implausible timestamp) = spam. */
export function looksLikeSpam(input: { website: string; iniciado_em: number }, now = Date.now()) {
  const elapsed = now - input.iniciado_em;
  return input.website.length > 0 || !(elapsed >= MIN_FILL_MS && elapsed < 24 * 60 * 60 * 1000);
}
