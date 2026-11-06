import logo from "@/assets/brand/bonzai-logo-preto-ciano.webp.asset.json";
import symbol from "@/assets/brand/bonzai-simbolo-ciano.png.asset.json";
import { HERO_HEADLINE } from "@/lib/site";

export function LogoReveal() {
  return (
    <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center px-6">
      <div className="hz-brand relative flex w-[78vw] max-w-[640px] flex-col items-center lg:w-[56vw]">
        <div className="relative aspect-[1920/594] w-full">
          <img
            src={logo.url}
            alt="Bonzai System"
            className="hz-logo absolute inset-0 h-full w-full object-contain"
            width={1920}
            height={594}
          />
          <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
            <svg className="absolute h-[180%] overflow-visible" viewBox="0 0 100 100">
              <circle className="hz-wave" cx="50" cy="50" r="30" fill="none" stroke="var(--bz-cyan)" strokeWidth="0.6" style={{ transformOrigin: "50% 50%" }} />
              <circle className="hz-wave" cx="50" cy="50" r="30" fill="none" stroke="var(--bz-cyan)" strokeWidth="0.6" style={{ transformOrigin: "50% 50%" }} />
            </svg>
            <img src={symbol.url} alt="" className="hz-symbol h-[90%] w-auto" width={427} height={523} />
          </div>
        </div>
        <h1 className="hz-headline mt-8 text-center font-display text-[clamp(14px,1.6vw,20px)] font-bold uppercase tracking-[0.12em] text-foreground">
          {HERO_HEADLINE}
        </h1>
        <span className="hz-line mt-4 block h-px w-24 origin-center bg-bz-cyan" />
      </div>
    </div>
  );
}
