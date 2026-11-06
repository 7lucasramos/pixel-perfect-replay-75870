import { createFileRoute } from "@tanstack/react-router";
import { AboutStory } from "@/components/institutional/AboutStory";
import { PageIntro, ContactCTA } from "@/components/institutional/Shared";
import { COPY, SEO } from "@/content/site";
import { institutionalHead, useDocumentTitle } from "@/hooks/useDocumentTitle";

export const Route = createFileRoute("/sobre")({
  head: () => institutionalHead(SEO.about.title, SEO.about.description, "/sobre"),
  component: AboutPage,
});
function AboutPage() {
  useDocumentTitle(SEO.about.title, SEO.about.description);
  return <main id="conteudo"><PageIntro eyebrow={COPY.storyEyebrow} title={COPY.aboutTitle} /><AboutStory /><ContactCTA /></main>;
}
