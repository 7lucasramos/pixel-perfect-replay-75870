import { Mail, MessageCircle } from "lucide-react";
import { mailLink, waLink } from "@/content/site";

/** Mobile-only bottom bar with the two primary contact actions. */
export function StickyContactBar() {
  return <div className="bz-sticky-cta lg:hidden" role="region" aria-label="Contato rápido">
    <a className="bz-sticky-wa" href={waLink()} target="_blank" rel="noopener noreferrer"><MessageCircle size={18} aria-hidden="true" />Falar no WhatsApp</a>
    <a className="bz-sticky-mail" href={mailLink()} aria-label="Enviar e-mail"><Mail size={18} aria-hidden="true" /></a>
  </div>;
}
