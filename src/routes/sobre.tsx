import { createFileRoute } from "@tanstack/react-router";
import { UnderConstruction, pageHead } from "@/components/layout/UnderConstruction";

export const Route = createFileRoute("/sobre")({
  head: () => pageHead("Sobre a Bonzai"),
  component: () => <UnderConstruction title="Sobre a Bonzai" />,
});
