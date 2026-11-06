import { createFileRoute } from "@tanstack/react-router";
import { UnderConstruction, pageHead } from "@/components/layout/UnderConstruction";

export const Route = createFileRoute("/contato")({
  head: () => pageHead("Contato"),
  component: () => <UnderConstruction title="Contato" />,
});
