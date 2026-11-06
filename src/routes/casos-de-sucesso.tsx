import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/casos-de-sucesso")({
  component: () => <Outlet />,
});
