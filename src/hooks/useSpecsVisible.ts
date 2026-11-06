import { useLocation } from "@tanstack/react-router";
import { specsVisible } from "@/content/flags";
export function useSpecsVisible() {
  const { searchStr } = useLocation();
  return specsVisible(new URLSearchParams(searchStr).get("preview") ?? undefined);
}