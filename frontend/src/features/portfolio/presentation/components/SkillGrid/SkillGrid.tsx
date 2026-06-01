import { Text, Tag, TechIcon } from "@shared/ui/atoms";
import { SectionTitle } from "@shared/ui/molecules";
import { portfolioI18n } from "@portfolio/presentation/i18n";
import { Grid, Item, Head, Name, Meter, MeterFill } from "./SkillGrid.styles";
import type { SkillGridProps } from "./SkillGrid.types";

export function SkillGrid({ skills }: SkillGridProps) {
  if (skills.length === 0) return null;

  return (
    <section id="skills">
      <SectionTitle>{portfolioI18n.sections.skills}</SectionTitle>
      <Grid>
        {skills.map((skill) => (
          <Item key={skill.name}>
            <Head>
              <Name>
                <TechIcon name={skill.name} />
                <Text variant="body">{skill.name}</Text>
              </Name>
              {skill.level && <Tag>{skill.level}</Tag>}
            </Head>
            {skill.level && (
              <Meter>
                <MeterFill $level={skill.level} />
              </Meter>
            )}
          </Item>
        ))}
      </Grid>
    </section>
  );
}
