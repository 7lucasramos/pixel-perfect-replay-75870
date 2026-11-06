import { Link } from "@tanstack/react-router";
import { Logo } from "@/components/brand/Logo";
import { NAV, HERO_HEADLINE, visibleChannels } from "@/content/site";
import { ContactChannels } from "@/components/institutional/Shared";

export function Footer() {
  return (
    <footer className="bg-bz-ink py-16 text-bz-white">
      <div className="container-bz flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-xs"><Logo tone="dark" className="h-10 self-start" loading="lazy" /><p className="mt-6 text-sm leading-relaxed text-bz-white/85">{HERO_HEADLINE}</p></div>
        <nav aria-label="Rodapé" className="grid grid-cols-2 gap-x-10 gap-y-3 text-sm sm:grid-cols-3">
          {NAV.map((n) => (
            <Link key={n.to} to={n.to} activeOptions={{ exact: true }} className="flex min-h-12 items-center text-bz-white/85 transition-colors hover:text-bz-cyan">
              {n.label}
            </Link>
          ))}
        </nav>
        {visibleChannels().length > 0 && <div className="text-bz-white/85"><ContactChannels /></div>}
      </div>
      <div className="container-bz mt-12 border-t border-bz-white/10 pt-6 text-xs text-bz-white/85">
        © Bonzai System
      </div>
    </footer>
  );
}
