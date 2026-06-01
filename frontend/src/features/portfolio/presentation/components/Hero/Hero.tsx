import { Wrapper, Title, Subtitle } from "./Hero.styles";
import type { HeroProps } from "./Hero.types";

export function Hero({ title, subtitle }: HeroProps) {
  return (
    <Wrapper>
      <Title>{title}</Title>
      {subtitle ? <Subtitle>{subtitle}</Subtitle> : null}
    </Wrapper>
  );
}
