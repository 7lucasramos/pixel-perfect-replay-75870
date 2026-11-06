import { useEffect, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { Logo } from "@/components/brand/Logo";
import { NAV } from "@/lib/site";
import { useHeroRevealed } from "@/components/hero/useHeroProgress";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const revealed = useHeroRevealed();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const showLogo = !isHome || revealed;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 h-16 transition-colors duration-300 lg:h-[72px] ${
        scrolled ? "border-b border-border bg-background/80 backdrop-blur-md" : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="container-bz flex h-full items-center justify-between gap-6">
        <Link to="/" className="flex items-center gap-3" aria-label="Bonzai System — início">
          <Logo className={`h-6 transition-opacity duration-500 lg:h-7 ${showLogo ? "opacity-100" : "opacity-0"}`} />
        </Link>

        <nav aria-label="Principal" className="hidden items-center gap-7 lg:flex">
          {NAV.map((n) => (
            <Link key={n.to} to={n.to} className="nav-link" activeOptions={{ exact: n.to === "/" }} aria-current={(pathname === n.to || (n.to !== "/" && pathname.startsWith(`${n.to}/`))) ? "page" : undefined}>
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link to="/contato" className="btn-bz hidden lg:inline-flex">
            Solicitar projeto
          </Link>
          <button
            type="button"
            className="flex h-12 w-12 items-center justify-center rounded-full lg:hidden"
            aria-label="Abrir menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(true)}
          >
            <span className="flex w-6 flex-col gap-1.5" aria-hidden="true">
              <span className="block h-0.5 w-full bg-bz-ink" />
              <span className="block h-0.5 w-full bg-bz-ink" />
            </span>
          </button>
        </div>
      </div>
      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </header>
  );
}
