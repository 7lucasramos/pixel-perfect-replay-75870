import { createFileRoute } from "@tanstack/react-router";
import { UnderConstruction, pageHead } from "@/components/layout/UnderConstruction";

export const Route = createFileRoute("/produtos")({
  head: () => pageHead("Produtos"),
  component: () => <UnderConstruction title="Produtos" />,
});
