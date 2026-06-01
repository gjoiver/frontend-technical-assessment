import { Text } from "@shared/ui/atoms";
import { Expandable, RichTextRenderer, SectionTitle } from "@shared/ui/molecules";
import { portfolioI18n } from "@portfolio/presentation/i18n";
import { List, Item, Meta, Company } from "./ExperienceList.styles";
import type { ExperienceListProps } from "./ExperienceList.types";

export function ExperienceList({ experience }: ExperienceListProps) {
  if (experience.length === 0) return null;

  return (
    <section id="experience">
      <SectionTitle>{portfolioI18n.sections.experience}</SectionTitle>
      <List>
        {experience.map((item) => (
          <Item key={`${item.company}-${item.title}`}>
            <Text variant="h3">{item.title}</Text>
            <Meta>
              <Company>{item.company}</Company>
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
          </Item>
        ))}
      </List>
    </section>
  );
}
