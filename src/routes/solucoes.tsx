import { createFileRoute } from "@tanstack/react-router";
import { UnderConstruction, pageHead } from "@/components/layout/UnderConstruction";

export const Route = createFileRoute("/solucoes")({
  head: () => pageHead("Soluções"),
  component: () => <UnderConstruction title="Soluções" />,
});
