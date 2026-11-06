import { createFileRoute } from "@tanstack/react-router";
import { PageIntro } from "@/components/institutional/Shared";
import { institutionalHead } from "@/hooks/useDocumentTitle";

const TITLE = "Privacidade | Bonzai System";
const DESCRIPTION = "Como a Bonzai System trata os dados enviados pelo formulário de contato. Conteúdo em elaboração.";
const SECTIONS = ["Quais dados coletamos", "Para que usamos", "Com quem compartilhamos", "Seus direitos", "Contato do controlador"];
const PENDING = "Conteúdo em elaboração: será revisado pelo responsável jurídico da Bonzai System antes da publicação.";

export const Route = createFileRoute("/privacidade")({
  head: () => institutionalHead(TITLE, DESCRIPTION, "/privacidade"),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <main id="conteudo">
      <PageIntro eyebrow="LGPD" title="Política de privacidade" description="Esta página está em elaboração." />
      <section className="container-bz max-w-3xl space-y-12 pb-24">
        {SECTIONS.map((title) => (
          <article key={title}>
            <h2 className="font-display text-2xl font-bold">{title}</h2>
            <p className="mt-4 rounded-lg border border-dashed border-border bg-bz-ice p-6 leading-relaxed text-muted-foreground">{PENDING}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
