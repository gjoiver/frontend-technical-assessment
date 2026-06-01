import { Reveal, Text } from "@shared/ui/atoms";
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
        <Reveal delay={0}>
          <AboutSection aboutMe={data.aboutMe} />
        </Reveal>
        <Reveal delay={1}>
          <SkillGrid skills={data.skills} />
        </Reveal>
        <Reveal delay={2}>
          <ExperienceList experience={data.experience} />
        </Reveal>
        <Reveal delay={3}>
          <ProjectList projects={data.projects} />
        </Reveal>
        <Reveal delay={4}>
          <ContactCard contact={data.contact} />
        </Reveal>
      </Container>
    </>
  );
}
