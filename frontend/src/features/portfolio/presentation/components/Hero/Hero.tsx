import { portfolioI18n } from "@portfolio/presentation/i18n";
import {
  Wrapper,
  Aurora,
  Eyebrow,
  Title,
  Subtitle,
  Actions,
  PrimaryCta,
  SecondaryCta,
} from "./Hero.styles";
import type { HeroProps } from "./Hero.types";

export function Hero({ title, subtitle }: HeroProps) {
  return (
    <Wrapper>
      <Aurora aria-hidden="true" />
      <Eyebrow>{portfolioI18n.hero.eyebrow}</Eyebrow>
      <Title>{title}</Title>
      {subtitle ? <Subtitle>{subtitle}</Subtitle> : null}
      <Actions>
        <PrimaryCta href="#projects">{portfolioI18n.hero.ctaProjects}</PrimaryCta>
        <SecondaryCta href="#contact">{portfolioI18n.hero.ctaContact}</SecondaryCta>
      </Actions>
    </Wrapper>
  );
}
