import { Text } from "@shared/ui/atoms";
import { Card, Expandable, SectionTitle } from "@shared/ui/molecules";
import { portfolioI18n } from "@portfolio/presentation/i18n";
import { RichTextRenderer } from "../RichTextRenderer";
import { List, Meta } from "./ExperienceList.styles";
import type { ExperienceListProps } from "./ExperienceList.types";

export function ExperienceList({ experience }: ExperienceListProps) {
  if (experience.length === 0) return null;

  return (
    <section id="experience">
      <SectionTitle>{portfolioI18n.sections.experience}</SectionTitle>
      <List>
        {experience.map((item) => (
          <Card key={`${item.company}-${item.title}`}>
            <Text variant="h3">{item.title}</Text>
            <Meta>
              <Text variant="body">{item.company}</Text>
              {item.duration && (
                <Text variant="caption" muted>
                  {item.duration}
                </Text>
              )}
            </Meta>
            {item.responsibilities && (
              <Expandable
                moreLabel={portfolioI18n.actions.showMore}
                lessLabel={portfolioI18n.actions.showLess}
              >
                <RichTextRenderer value={item.responsibilities} />
              </Expandable>
            )}
          </Card>
        ))}
      </List>
    </section>
  );
}
