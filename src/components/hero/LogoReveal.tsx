import { Logo } from "@/components/brand/Logo";
import { HERO_HEADLINE } from "@/lib/site";

// The B occupies the first ~17.5% of the official logo file (centre ≈ 9.2%).
export function LogoReveal() {
  return (
    <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center px-6">
      <div className="hz-brand relative flex w-[78vw] max-w-[640px] flex-col items-center lg:w-[56vw]">
        <div className="relative aspect-[1920/594] w-full">
          <div className="absolute inset-y-0 flex items-center justify-center" style={{ left: "50%", width: 0 }} aria-hidden="true">
            <svg className="absolute h-[180%] overflow-visible" viewBox="0 0 100 100" style={{ aspectRatio: "1" }}>
              <circle className="hz-wave" cx="50" cy="50" r="30" fill="none" stroke="var(--bz-cyan)" strokeWidth="0.6" style={{ transformOrigin: "50% 50%" }} />
              <circle className="hz-wave" cx="50" cy="50" r="30" fill="none" stroke="var(--bz-cyan)" strokeWidth="0.6" style={{ transformOrigin: "50% 50%" }} />
            </svg>
          </div>
          <Logo className="hz-logo absolute inset-0 h-full w-full" loading="eager" sizes="(min-width: 1024px) min(56vw, 640px), 78vw" />
        </div>
        <h1 className="hz-headline mt-8 text-center font-display text-[clamp(14px,1.6vw,20px)] font-bold uppercase tracking-[0.12em] text-foreground">
          {HERO_HEADLINE}
        </h1>
        <span className="hz-line mt-4 block h-px w-24 origin-center bg-bz-cyan" />
      </div>
    </div>
  );
}
