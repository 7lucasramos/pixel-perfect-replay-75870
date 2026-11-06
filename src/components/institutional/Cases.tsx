import { useState } from "react";
import { COPY } from "@/content/site";
import { cases } from "@/content/cases";
import { CaseCard } from "@/components/cases/CaseCard";
import { Button } from "@/components/ui/button";
import { PhotoPlaceholder } from "./Visuals";
export function Cases() {
 const [filter, setFilter] = useState("");
 const types = [...new Set(cases.map(item => item.applicationType))];
 return <section className="container-bz pb-24">{types.length >= 2 && <div className="mb-10 flex flex-wrap gap-3" role="group" aria-label="Filtrar por aplicação">{["",...types].map(type => <Button key={type} variant={filter === type ? "default" : "outline"} aria-pressed={filter === type} onClick={() => setFilter(type)}>{type || "Todos"}</Button>)}</div>}<div className="grid gap-8 md:grid-cols-2">{cases.length ? cases.filter(item => !filter || item.applicationType === filter).map(item => <CaseCard key={item.slug} item={item} />) : <article className="bz-case-skeleton md:col-span-2"><p className="mb-6 font-mono text-xs text-bz-graphite">{COPY.casesModel}</p><PhotoPlaceholder label="Foto (a enviar)" wide /><dl className="mt-8 grid gap-6 sm:grid-cols-2">{["Local", "Tipo de aplicação", "Sistema utilizado", "Descrição", "Resultado/depoimento autorizado"].map(field => <div key={field}><dt className="text-sm font-medium">{field}</dt><dd className="mt-2 text-sm text-muted-foreground">Em construção</dd></div>)}</dl></article>}</div>{!cases.length && <p className="mt-8 text-lg text-muted-foreground">{COPY.casesFuture}</p>}</section>;
}
