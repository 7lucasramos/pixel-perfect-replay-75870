import { useEffect } from "react";
import { SITE_URL } from "@/content/flags";
export function useDocumentTitle(title: string, description: string) {
  useEffect(() => {
    document.title = title;
    const meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (meta) meta.content = description;
  }, [title, description]);
}
export const absoluteUrl = (path: string) => `${SITE_URL.replace(/\/$/, "")}${path}`;
export const OG_IMAGE = absoluteUrl("/og-image.png");
/** Per-route head: title, description, canonical, Open Graph and Twitter card. */
export function institutionalHead(title: string, description: string, path = "/", image = OG_IMAGE) {
  const url = absoluteUrl(path);
  return {
    meta: [
      { title }, { name: "description", content: description },
      { property: "og:title", content: title }, { property: "og:description", content: description },
      { property: "og:type", content: "website" }, { property: "og:locale", content: "pt_BR" },
      { property: "og:site_name", content: "Bonzai System" }, { property: "og:url", content: url },
      { property: "og:image", content: image }, { property: "og:image:width", content: "1200" }, { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" }, { name: "twitter:title", content: title },
      { name: "twitter:description", content: description }, { name: "twitter:image", content: image },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}
