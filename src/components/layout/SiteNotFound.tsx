import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SiteNotFound({ kind }: { kind?: "product" }) {
  return <main id="conteudo" className="container-bz min-h-[70svh] pb-24 pt-44"><p className="eyebrow">Página não encontrada</p><h1 className="bz-page-title mt-6">Este endereço não está disponível.</h1><p className="mt-6 text-muted-foreground">{kind === "product" ? "O sistema que você procura não foi encontrado." : "Confira o endereço ou volte ao início."}</p><Button asChild className="bz-action mt-10"><Link to={kind === "product" ? "/produtos/bonzai-mini" : "/"}><ArrowLeft aria-hidden="true" />{kind === "product" ? "Ver o sistema Bonzai Mini" : "Voltar ao início"}</Link></Button></main>;
}
