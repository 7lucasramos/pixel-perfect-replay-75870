import { Link } from "@tanstack/react-router";

export function UnderConstruction({ title }: { title: string }) {
  return (
    <main id="conteudo" className="relative flex min-h-[80svh] items-center pt-24">
      <div className="dot-grid absolute inset-0" aria-hidden="true" />
      <div className="container-bz relative">
        <p className="eyebrow">Em construção</p>
        <h1 className="mt-4 text-[clamp(40px,6vw,80px)] font-extrabold leading-none text-foreground">{title}</h1>
        <p className="mt-6 text-lg text-muted-foreground">Esta seção está em construção.</p>
        <Link to="/" className="btn-bz mt-10">
          Voltar ao início
        </Link>
      </div>
    </main>
  );
}

export function pageHead(title: string) {
  const t = `${title} | Bonzai System`;
  const d = `${title} — Bonzai System, sistemas profissionais de sonorização. Página em construção.`;
  return {
    meta: [
      { title: t },
      { name: "description", content: d },
      { property: "og:title", content: t },
      { property: "og:description", content: d },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  };
}
