import { createServerFn } from "@tanstack/react-start";
import { getRequestHeader } from "@tanstack/react-start/server";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import { contactSchema, looksLikeSpam, type ContactInput } from "./contact-schema";

export type ContactResult = { ok: true } | { ok: false; reason: "rate" | "error" };

async function sha256Hex(text: string) {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, "0")).join("");
}

export const submitContact = createServerFn({ method: "POST" })
  .inputValidator((input: ContactInput) => contactSchema.parse(input))
  .handler(async ({ data }): Promise<ContactResult> => {
    const { website, iniciado_em, ...request } = data;
    // (a) honeypot and (b) too-fast submissions: silently rejected as generic errors.
    if (looksLikeSpam({ website, iniciado_em })) return { ok: false, reason: "error" };

    const url = process.env["SUPABASE_URL"];
    const key = process.env["SUPABASE_PUBLISHABLE_KEY"];
    const salt = process.env["IP_HASH_SALT"];
    if (!url || !key) { console.error(JSON.stringify({ evt: "contact_insert_failed", cause: "missing_backend_env" })); return { ok: false, reason: "error" }; }
    if (!salt) console.error(JSON.stringify({ evt: "contact_config", cause: "missing_ip_hash_salt" }));

    const client = createClient<Database>(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
      global: { fetch: (input, init) => {
        const headers = new Headers(init?.headers);
        if (key.startsWith("sb_") && headers.get("Authorization") === `Bearer ${key}`) headers.delete("Authorization");
        headers.set("apikey", key); return fetch(input, { ...init, headers });
      } },
    });

    // (c) per-IP limit via salted hash (raw IP never stored) and (d) global circuit breaker.
    const ip = getRequestHeader("cf-connecting-ip") ?? getRequestHeader("x-forwarded-for")?.split(",")[0]?.trim() ?? "";
    const ipHash = salt && ip ? await sha256Hex(`${salt}:${ip}`) : null;
    const { data: status, error: rateError } = await client.rpc("contact_rate_status", { _ip_hash: ipHash as string });
    if (rateError) { console.error(JSON.stringify({ evt: "contact_rate_check_failed", code: rateError.code })); return { ok: false, reason: "error" }; }
    if (status !== "ok") { console.error(JSON.stringify({ evt: "contact_rate_limited", scope: status })); return { ok: false, reason: "rate" }; }

    const { error } = await client.from("contact_requests").insert({ ...request, ip_hash: ipHash });
    if (error) { console.error(JSON.stringify({ evt: "contact_insert_failed", code: error.code, message: error.message })); return { ok: false, reason: "error" }; }
    return { ok: true };
  });
