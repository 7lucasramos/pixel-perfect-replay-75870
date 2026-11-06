import photo from "@/assets/products/bonzai-mini.png.asset.json";
// Public product data only. Restricted manual values live in src/lib/manual-specs.server.ts.
export type ModuleType = "Bonzai Mini TW" | "Bonzai Mini";
export type ModuleConfig = { modules: ModuleType[]; twCount: number; miniCount: number };
export type Product = { slug: string; name: string; tagline: string; summary: string; heroImage?: string; gallery: string[]; configuration?: ModuleConfig; highlights: string[]; manualUrl?: string };
const tw: ModuleType = "Bonzai Mini TW", mini: ModuleType = "Bonzai Mini";
export const products: Product[] = [{
  slug: "bonzai-mini", name: "Bonzai Mini", tagline: "Sistema em arranjo de módulos",
  summary: "Sistema de sonorização da linha Bonzai, apresentado aqui com a configuração descrita em seu manual.",
  heroImage: photo.url, gallery: [],
  configuration: { modules: [tw, mini, mini, mini, tw, mini, mini, mini], twCount: 2, miniCount: 6 },
  highlights: ["Arranjo de 8 módulos em coluna curva", "Dois tipos de módulo no mesmo arranjo: Bonzai Mini TW e Bonzai Mini", "Configuração descrita no manual do produto"],
}];
export function findProduct(slug?: string) { return products.find(product => product.slug === slug); }
export function productContactDefaults(slug?: string) {
  const product = findProduct(slug);
  return product ? { tipo_projeto: "Sistema de sonorização", mensagem: `Tenho interesse no ${product.name}.` } : { tipo_projeto: "", mensagem: "" };
}
