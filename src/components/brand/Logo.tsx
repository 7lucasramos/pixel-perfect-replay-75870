import logoDark from "@/assets/brand/bonzai-logo-preto-ciano.webp.asset.json";
import logoLight from "@/assets/brand/bonzai-logo-branco-ciano.webp.asset.json";
import logoDarkSm from "@/assets/brand/bonzai-logo-preto-ciano-480.webp.asset.json";
import logoLightSm from "@/assets/brand/bonzai-logo-branco-ciano-480.webp.asset.json";
import markDark from "@/assets/brand/bonzai-simbolo-B.png.asset.json";
import markLight from "@/assets/brand/bonzai-simbolo-B-branco.png.asset.json";

/** tone = background tone: "light" background → dark artwork; "dark" background → white artwork. */
type Props = {
  variant?: "full" | "mark";
  tone?: "light" | "dark";
  className?: string;
  decorative?: boolean;
  loading?: "lazy" | "eager";
  /** CSS sizes hint for the full logo's srcset (default: small UI placement). */
  sizes?: string;
  priority?: boolean;
};

export function Logo({ variant = "full", tone = "light", className = "", decorative = false, loading, sizes = "200px", priority = false }: Props) {
  const full = variant === "full";
  const dark = tone === "dark";
  const src = full ? (dark ? logoLight : logoDark).url : (dark ? markLight : markDark).url;
  const srcSet = full ? `${(dark ? logoLightSm : logoDarkSm).url} 480w, ${src} 1920w` : undefined;
  return (
    <img
      src={src}
      srcSet={srcSet}
      sizes={full ? sizes : undefined}
      alt={decorative ? "" : full ? "Bonzai System" : "Bonzai"}
      width={full ? 1920 : 408}
      height={full ? 594 : 701}
      loading={loading}
      decoding="async"
      fetchPriority={priority ? "high" : undefined}
      className={`w-auto object-contain ${className}`}
    />
  );
}
