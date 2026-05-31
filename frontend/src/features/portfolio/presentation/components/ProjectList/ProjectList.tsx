import { Text, Tag } from "@shared/ui/atoms";
import { Card, Expandable, SectionTitle } from "@shared/ui/molecules";
import { portfolioI18n } from "@portfolio/presentation/i18n";
import { Grid, Technologies } from "./ProjectList.styles";
import type { ProjectListProps } from "./ProjectList.types";
import { RichTextRenderer } from "../RichTextRenderer";

export function ProjectList({ projects }: ProjectListProps) {
  if (projects.length === 0) return null;

  return (
    <section id="projects">
      <SectionTitle>{portfolioI18n.sections.projects}</SectionTitle>
      <Grid>
        {projects.map((project) => (
          <Card key={project.title}>
            <Text variant="h3">{project.title}</Text>
            {project.description && (
              <Expandable
                moreLabel={portfolioI18n.actions.showMore}
                lessLabel={portfolioI18n.actions.showLess}
              >
                <RichTextRenderer value={project.description} />
              </Expandable>
            )}
            {project.technologies.length > 0 && (
              <Technologies>
                {project.technologies.map((tech) => (
                  <Tag key={tech}>{tech}</Tag>
                ))}
              </Technologies>
            )}
          </Card>
        ))}
      </Grid>
    </section>
  );
}
