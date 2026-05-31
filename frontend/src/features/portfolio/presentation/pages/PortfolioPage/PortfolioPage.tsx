import { Spinner, Text } from "@shared/ui/atoms";
import {
  Header,
  AboutSection,
  ProjectList,
  SkillGrid,
  ExperienceList,
  ContactCard,
} from "@portfolio/presentation/components";
import { usePortfolio } from "@portfolio/presentation/hooks/usePortfolio";
import { portfolioI18n } from "@portfolio/presentation/i18n";
import { Container, Centered } from "./PortfolioPage.styles";
import type { PortfolioPageProps } from "./PortfolioPage.types";

export function PortfolioPage({ interactor }: PortfolioPageProps) {
  const { data, loading, error } = usePortfolio(interactor);

  if (loading) {
    return (
      <Centered>
        <Spinner />
      </Centered>
    );
  }

  if (error || !data) {
    return (
      <Centered>
        <Text variant="body" muted>
          {portfolioI18n.states.error}
        </Text>
      </Centered>
    );
  }

  return (
    <>
      <Header />
      <Container>
        <AboutSection aboutMe={data.aboutMe} />
        <SkillGrid skills={data.skills} />
        <ExperienceList experience={data.experience} />
        <ProjectList projects={data.projects} />
        <ContactCard contact={data.contact} />
      </Container>
    </>
  );
}
