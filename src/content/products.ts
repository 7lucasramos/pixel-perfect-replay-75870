import photo from "@/assets/products/bonzai-mini.png.asset.json";
import { SHOW_MANUAL_SPECS } from "./flags";
export type ModuleConfig = { modules: string[]; twCount: number; miniCount: number };
export type ManualSpecs = { subtotalWatts: number; spl: { incoerente: string; coerente: string; coerenteNota: string } };
export type Product = { slug: string; name: string; tagline: string; summary: string; heroImage?: string; gallery: string[]; configuration?: ModuleConfig; manualSpecs?: ManualSpecs; highlights: string[]; manualUrl?: string; publishedSpecs: boolean };
const tw = "Bonzai Mini TW 45 W 91 dB", mini = "Bonzai Mini 60 W 94 dB";
export const products: Product[] = [{
  slug: "bonzai-mini", name: "Bonzai Mini", tagline: "Sistema em arranjo de módulos",
  summary: "Sistema de sonorização da linha Bonzai, apresentado aqui com a configuração descrita em seu manual.",
  heroImage: photo.url, gallery: [],
  configuration: { modules: [tw, mini, mini, mini, tw, mini, mini, mini], twCount: 2, miniCount: 6 },
  manualSpecs: { subtotalWatts: 450, spl: { incoerente: "120,08 dB", coerente: "128,96 dB", coerenteNota: "Considera o acoplamento dos line arrays." } },
  highlights: ["Arranjo de 8 módulos em coluna curva", "Dois tipos de módulo no mesmo arranjo: TW e 60 W", "SPL coerente considera o acoplamento dos line arrays"],
  publishedSpecs: SHOW_MANUAL_SPECS,
}];
export function findProduct(slug?: string) { return products.find(product => product.slug === slug); }
export function productContactDefaults(slug?: string) {
  const product = findProduct(slug);
  return product ? { tipo_projeto: "Sistema de sonorização", mensagem: `Tenho interesse no ${product.name}.` } : { tipo_projeto: "", mensagem: "" };
}