import { useEffect, useRef, type ReactNode } from "react";
import { useLocation } from "@tanstack/react-router";
export function RouteTransition({ children }: { children: ReactNode }) {
 const { pathname } = useLocation(); const last = useRef(pathname); const ref = useRef<HTMLDivElement>(null);
 useEffect(() => {
  if (last.current === pathname) return;
  last.current = pathname;
  window.scrollTo({ top: 0, behavior: "instant" });
  const element = ref.current; if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  element.classList.remove("bz-route-enter"); void element.offsetWidth; element.classList.add("bz-route-enter");
 }, [pathname]);
 return <div ref={ref}>{children}</div>;
}
