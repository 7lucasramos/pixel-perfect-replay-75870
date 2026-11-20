import { createFileRoute } from "@tanstack/react-router";
import { Mail, MessageCircle } from "lucide-react";
import { CONTACT, COPY, SEO, mailLink, waLink } from "@/content/site";
import { institutionalHead } from "@/hooks/useDocumentTitle";

export const Route = createFileRoute("/contato")({
  head: () => institutionalHead(SEO.contact.title, SEO.contact.description, "/contato"),
  component: ContactPage,
});
function ContactPage() {
  const cards = [
    { icon: MessageCircle, title: "WhatsApp", value: CONTACT.whatsappDisplay, href: waLink(), cta: "Abrir conversa", external: true },
    { icon: Mail, title: "E-mail", value: CONTACT.email, href: mailLink(), cta: "Enviar e-mail", external: false },
  ];
  return <main id="conteudo" className="container-bz pb-24 pt-36 lg:pt-44">
    <p className="eyebrow">Contato</p><h1 className="bz-page-title mt-6 max-w-3xl">{COPY.contactTitle}</h1><p className="mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground">{COPY.contactText}</p>
    <div className="mt-14 grid gap-6 md:grid-cols-2">{cards.map(({ icon: Icon, title, value, href, cta, external }) => <a key={title} href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="group block rounded-3xl bg-bz-ice p-8 transition-colors hover:bg-bz-white lg:p-10"><Icon className="text-bz-cyan" size={32} strokeWidth={1.5} aria-hidden="true" /><h2 className="mt-8 font-display text-2xl font-bold">{title}</h2><p className="mt-2 break-all text-lg text-muted-foreground">{value}</p><span className="mt-8 inline-flex min-h-12 items-center rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground group-hover:bg-bz-electric">{cta}</span></a>)}</div>
  </main>;
}
