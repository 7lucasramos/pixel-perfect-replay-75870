import logoDark from "@/assets/brand/bonzai-logo-preto-ciano.webp.asset.json";
import logoLight from "@/assets/brand/bonzai-logo-branco-ciano.webp.asset.json";
import markDark from "@/assets/brand/bonzai-simbolo-B.png.asset.json";
import markLight from "@/assets/brand/bonzai-simbolo-B-branco.png.asset.json";

/** tone = background tone: "light" background → dark artwork; "dark" background → white artwork. */
type Props = {
  variant?: "full" | "mark";
  tone?: "light" | "dark";
  className?: string;
  decorative?: boolean;
  loading?: "lazy" | "eager";
};

export function Logo({ variant = "full", tone = "light", className = "", decorative = false, loading }: Props) {
  const full = variant === "full";
  const src = full ? (tone === "dark" ? logoLight : logoDark).url : (tone === "dark" ? markLight : markDark).url;
  return (
    <img
      src={src}
      alt={decorative ? "" : full ? "Bonzai System" : "Bonzai"}
      width={full ? 1920 : 408}
      height={full ? 594 : 701}
      loading={loading}
      className={`w-auto object-contain ${className}`}
    />
  );
}
