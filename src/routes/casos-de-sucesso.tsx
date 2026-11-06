import { createFileRoute } from "@tanstack/react-router";
import { UnderConstruction, pageHead } from "@/components/layout/UnderConstruction";

export const Route = createFileRoute("/casos-de-sucesso")({
  head: () => pageHead("Casos de sucesso"),
  component: () => <UnderConstruction title="Casos de sucesso" />,
});
