import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Mail, Phone, MapPin, Instagram, Linkedin, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { COPY, visibleChannels } from "@/content/site";
import { DotCanvas, WaveRings } from "./Visuals";
import { Reveal } from "./Motion";

export function PageIntro({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return <section className="container-bz pb-16 pt-36 lg:pb-24 lg:pt-44"><Reveal><p data-reveal className="eyebrow">{eyebrow}</p><h1 data-reveal className="bz-page-title mt-6 max-w-4xl">{title}</h1>{description && <p data-reveal className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">{description}</p>}</Reveal></section>;
}
export function SiteLink({ to, children, secondary = false, dark = false }: { to: "/contato" | "/tecnologia" | "/produtos" | "/solucoes" | "/casos-de-sucesso"; children: React.ReactNode; secondary?: boolean; dark?: boolean }) {
  return <Button asChild variant={secondary ? "outline" : "default"} className={`bz-action ${dark ? "bz-action-dark" : ""} ${secondary ? "bz-action-secondary" : ""}`}><Link to={to}>{children}<ArrowUpRight aria-hidden="true" /></Link></Button>;
}
export function ContactCTA() {
  return <section className="relative overflow-hidden bg-bz-ink py-24 text-bz-white lg:py-32" aria-labelledby="contact-cta-title"><DotCanvas /><WaveRings className="pointer-events-none absolute -right-40 top-0 h-full w-[600px] text-bz-cyan/40" /><Reveal className="container-bz relative"><h2 id="contact-cta-title" data-reveal className="bz-section-title max-w-3xl">{COPY.ctaTitle}</h2><p data-reveal className="mt-6 max-w-xl text-lg leading-relaxed text-bz-white/85">{COPY.ctaText}</p><div data-reveal className="mt-10 flex flex-wrap gap-4"><SiteLink to="/contato" dark>{COPY.request}</SiteLink><SiteLink to="/contato" dark secondary>{COPY.talk}</SiteLink></div></Reveal></section>;
}
const channelDetails = {
 email: { label: "E-mail", icon: Mail }, whatsapp: { label: "WhatsApp", icon: MessageCircle }, phone: { label: "Telefone", icon: Phone }, address: { label: "Endereço", icon: MapPin }, instagram: { label: "Instagram", icon: Instagram }, linkedin: { label: "LinkedIn", icon: Linkedin },
};
export function ContactChannels() {
  const channels = visibleChannels(); if (!channels.length) return null;
  return <ul className="space-y-4">{channels.map(([key, value]) => {
    const detail = channelDetails[key as keyof typeof channelDetails]; const Icon = detail.icon;
    const href = key === "email" ? `mailto:${value}` : key === "phone" ? `tel:${value.replace(/[^+\d]/g, "")}` : key === "whatsapp" ? `https://wa.me/${value.replace(/\D/g, "")}` : /^(https:\/\/)/.test(value) ? value : undefined;
    return <li key={key} className="flex items-start gap-3"><Icon size={18} className="mt-1 shrink-0 text-bz-cyan" aria-hidden="true" /><div><p className="text-xs opacity-85">{detail.label}</p>{href ? <a className="inline-flex min-h-12 items-center break-all" href={href}>{value}</a> : <p className="mt-2 break-words">{value}</p>}</div></li>;
  })}</ul>;
}
