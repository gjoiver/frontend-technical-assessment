import { SectionTitle } from "@shared/ui/molecules";
import { portfolioI18n } from "@portfolio/presentation/i18n";
import { RichTextRenderer } from "../RichTextRenderer";
import type { AboutSectionProps } from "./AboutSection.types";

export function AboutSection({ aboutMe }: AboutSectionProps) {
  if (!aboutMe) return null;

  return (
    <section id="about">
      <SectionTitle>{portfolioI18n.sections.about}</SectionTitle>
      <RichTextRenderer value={aboutMe} />
    </section>
  );
}
