import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Mail, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { COPY, CONTACT, mailLink, waLink } from "@/content/site";
import { DotCanvas, WaveRings } from "./Visuals";
import { Reveal } from "./Motion";

export function PageIntro({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return <section className="container-bz pb-16 pt-36 lg:pb-24 lg:pt-44"><Reveal><p data-reveal className="eyebrow">{eyebrow}</p><h1 data-reveal className="bz-page-title mt-6 max-w-4xl">{title}</h1>{description && <p data-reveal className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">{description}</p>}</Reveal></section>;
}
export function SiteLink({ to, children, secondary = false, dark = false }: { to: "/contato" | "/tecnologia" | "/produtos/bonzai-mini" | "/solucoes"; children: React.ReactNode; secondary?: boolean; dark?: boolean }) {
  return <Button asChild variant={secondary ? "outline" : "default"} className={`bz-action ${dark ? "bz-action-dark" : ""} ${secondary ? "bz-action-secondary" : ""}`}><Link to={to}>{children}<ArrowUpRight aria-hidden="true" /></Link></Button>;
}
/** External contact buttons (WhatsApp primary, e-mail secondary). */
export function ContactButtons({ dark = false, message, subject, className = "" }: { dark?: boolean; message?: string | undefined; subject?: string | undefined; className?: string }) {
  return <div className={`flex flex-wrap gap-4 ${className}`}>
    <Button asChild className={`bz-action ${dark ? "bz-action-dark" : ""}`}><a href={waLink(message)} target="_blank" rel="noopener noreferrer"><MessageCircle aria-hidden="true" />WhatsApp</a></Button>
    <Button asChild variant="outline" className={`bz-action bz-action-secondary ${dark ? "bz-action-dark" : ""}`}><a href={mailLink(subject)}><Mail aria-hidden="true" />E-mail</a></Button>
  </div>;
}
export function ContactCTA({ message, subject }: { message?: string | undefined; subject?: string | undefined }) {
  return <section className="relative overflow-hidden bg-bz-ink py-24 text-bz-white lg:py-32" aria-labelledby="contact-cta-title"><DotCanvas /><WaveRings className="pointer-events-none absolute -right-40 top-0 h-full w-[600px] text-bz-cyan/40" /><Reveal className="container-bz relative"><h2 id="contact-cta-title" data-reveal className="bz-section-title max-w-3xl">{COPY.ctaTitle}</h2><p data-reveal className="mt-6 max-w-xl text-lg leading-relaxed text-bz-white/85">{COPY.ctaText}</p><div data-reveal className="mt-10"><ContactButtons dark message={message} subject={subject} /></div><p data-reveal className="mt-6 font-mono text-sm text-bz-white/70">{CONTACT.whatsappDisplay} · {CONTACT.email}</p></Reveal></section>;
}
export function ContactChannels() {
  return <ul className="space-y-4">
    <li className="flex items-start gap-3"><MessageCircle size={18} className="mt-1 shrink-0 text-bz-cyan" aria-hidden="true" /><div><p className="text-xs opacity-85">WhatsApp</p><a className="inline-flex min-h-12 items-center" href={waLink()} target="_blank" rel="noopener noreferrer">{CONTACT.whatsappDisplay}</a></div></li>
    <li className="flex items-start gap-3"><Mail size={18} className="mt-1 shrink-0 text-bz-cyan" aria-hidden="true" /><div><p className="text-xs opacity-85">E-mail</p><a className="inline-flex min-h-12 items-center break-all" href={mailLink()}>{CONTACT.email}</a></div></li>
  </ul>;
}
