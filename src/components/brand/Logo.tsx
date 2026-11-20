
const A = (name: string) => ({ url: `/brand/${name}` });
const logoDark = A("bonzai-logo-preto-ciano.webp"), logoLight = A("bonzai-logo-branco-ciano.webp");
const logoDarkSm = A("bonzai-logo-preto-ciano-480.webp"), logoLightSm = A("bonzai-logo-branco-ciano-480.webp");
const markDark = A("bonzai-simbolo-B.png"), markLight = A("bonzai-simbolo-B-branco.png");

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
