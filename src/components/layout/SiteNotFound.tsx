import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
export function SiteNotFound({ kind }: { kind?: "product" | "case" }) {
  return <main id="conteudo" className="container-bz min-h-[70svh] pb-24 pt-44"><p className="eyebrow">Página não encontrada</p><h1 className="bz-page-title mt-6">Este endereço não está disponível.</h1><p className="mt-6 text-muted-foreground">{kind === "product" ? "O produto que você procura não foi encontrado." : kind === "case" ? "O caso que você procura não foi encontrado." : "Confira o endereço ou volte ao início."}</p><Button asChild className="bz-action mt-10"><Link to={kind === "product" ? "/produtos" : kind === "case" ? "/casos-de-sucesso" : "/"}><ArrowLeft aria-hidden="true" />{kind === "product" ? "Ver produtos" : kind === "case" ? "Ver casos" : "Voltar ao início"}</Link></Button></main>;
}