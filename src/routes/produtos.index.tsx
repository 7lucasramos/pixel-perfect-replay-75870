import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/produtos/")({
  beforeLoad: () => { throw redirect({ to: "/produtos/bonzai-mini", statusCode: 301 }); },
});
