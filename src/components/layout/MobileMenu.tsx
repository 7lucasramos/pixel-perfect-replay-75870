import { useEffect, useRef } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { NAV } from "@/lib/site";
import { waLink } from "@/content/site";
import { Logo } from "@/components/brand/Logo";

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { pathname } = useLocation();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const root = ref.current;
    const focusables = () =>
      Array.from(root?.querySelectorAll<HTMLElement>("a[href], button") ?? []);
    focusables()[0]?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return onClose();
      if (e.key !== "Tab") return;
      const f = focusables();
      const first = f[0];
      const last = f[f.length - 1];
      if (!first || !last) return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      id="mobile-menu"
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      className="fixed inset-0 z-[60] flex flex-col bg-background lg:hidden"
    >
      <div className="container-bz flex h-16 items-center justify-between">
        <Link to="/" onClick={onClose} aria-label="Bonzai System — início"><Logo className="h-6" /></Link>
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar menu"
          className="flex h-12 w-12 items-center justify-center rounded-full text-2xl"
        >
          <span aria-hidden="true">×</span>
        </button>
      </div>
      <nav aria-label="Menu móvel" className="container-bz flex flex-1 flex-col gap-5 pt-6">
        {NAV.map((n, i) => (
          <Link
            key={n.to}
            to={n.to}
            onClick={onClose}
            activeOptions={{ exact: n.to === "/" }}
            aria-current={(pathname === n.to || (n.to !== "/" && pathname.startsWith(`${n.to}/`))) ? "page" : undefined}
            className="animate-menu-in font-display text-[28px] font-bold tracking-tight text-foreground data-[status=active]:text-bz-cyan"
            style={{ animationDelay: `${60 + i * 50}ms` }}
          >
            {n.label}
          </Link>
        ))}
        <a
          href={waLink()}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onClose}
          className="btn-bz animate-menu-in mt-6 self-start"
          style={{ animationDelay: `${60 + NAV.length * 50}ms` }}
        >
          Falar no WhatsApp
        </a>
      </nav>
    </div>
  );
}
