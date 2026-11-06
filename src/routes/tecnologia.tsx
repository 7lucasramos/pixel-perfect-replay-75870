import { createFileRoute } from "@tanstack/react-router";
import { UnderConstruction, pageHead } from "@/components/layout/UnderConstruction";

export const Route = createFileRoute("/tecnologia")({
  head: () => pageHead("Tecnologia"),
  component: () => <UnderConstruction title="Tecnologia" />,
});
