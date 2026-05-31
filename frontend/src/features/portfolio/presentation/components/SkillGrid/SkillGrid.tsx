import { Text, Tag } from "@shared/ui/atoms";
import { SectionTitle } from "@shared/ui/molecules";
import { portfolioI18n } from "@portfolio/presentation/i18n";
import { Grid, Item } from "./SkillGrid.styles";
import type { SkillGridProps } from "./SkillGrid.types";

export function SkillGrid({ skills }: SkillGridProps) {
  if (skills.length === 0) return null;

  return (
    <section>
      <SectionTitle>{portfolioI18n.sections.skills}</SectionTitle>
      <Grid>
        {skills.map((skill) => (
          <Item key={skill.name}>
            <Text variant="body">{skill.name}</Text>
            {skill.level && <Tag>{skill.level}</Tag>}
          </Item>
        ))}
      </Grid>
    </section>
  );
}
