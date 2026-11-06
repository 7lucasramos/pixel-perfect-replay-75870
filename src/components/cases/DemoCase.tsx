import { CaseDetail } from "./CaseDetail";
// This module is dynamically imported only behind import.meta.env.DEV; production never renders demo data.
export function DemoCase() {
  return <CaseDetail demo item={{ slug: "demonstracao", title: "Caso fictício para validação", location: "Local de demonstração", applicationType: "Aplicação de demonstração", systemUsed: "bonzai-mini", description: "Conteúdo fictício de teste para validação do layout. Não representa um projeto, cliente ou resultado real.", results: ["Resultado fictício de teste — não representa desempenho real."], testimonial: { quote: "Depoimento fictício para validação do layout, sem vínculo com cliente real.", author: "Pessoa fictícia de demonstração", role: "Papel de teste", authorized: true } }} />;
}