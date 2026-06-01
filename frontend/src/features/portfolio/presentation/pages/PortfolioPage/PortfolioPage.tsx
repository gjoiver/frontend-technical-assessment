import { Text } from "@shared/ui/atoms";
import { Seo } from "@shared/ui/Seo";
import {
  Header,
  Hero,
  PortfolioSkeleton,
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
      <Container>
        <PortfolioSkeleton />
      </Container>
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
      {data.seo ? (
        <Seo
          title={data.seo.metaTitle}
          description={data.seo.metaDescription}
          keywords={data.seo.keywords}
        />
      ) : null}
      <Header />
      <Container>
        {data.seo ? (
          <Hero
            title={data.seo.metaTitle}
            subtitle={data.seo.metaDescription}
          />
        ) : null}
        <AboutSection aboutMe={data.aboutMe} />
        <SkillGrid skills={data.skills} />
        <ExperienceList experience={data.experience} />
        <ProjectList projects={data.projects} />
        <ContactCard contact={data.contact} />
      </Container>
    </>
  );
}
