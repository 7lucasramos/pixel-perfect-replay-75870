import { Link } from "@tanstack/react-router";
import logo from "@/assets/brand/bonzai-logo-branco-ciano.webp.asset.json";
import { NAV } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-bz-ink py-16 text-bz-white">
      <div className="container-bz flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
        <img src={logo.url} alt="Bonzai System" className="h-10 w-auto self-start" width={1920} height={594} />
        <nav aria-label="Rodapé" className="grid grid-cols-2 gap-x-10 gap-y-3 text-sm sm:grid-cols-3">
          {NAV.map((n) => (
            <Link key={n.to} to={n.to} className="text-bz-white/70 transition-colors hover:text-bz-cyan">
              {n.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="container-bz mt-12 border-t border-bz-white/10 pt-6 text-xs text-bz-white/60">
        © Bonzai System
      </div>
    </footer>
  );
}
