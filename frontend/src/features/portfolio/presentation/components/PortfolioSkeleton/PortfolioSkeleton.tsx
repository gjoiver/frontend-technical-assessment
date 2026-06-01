import { Wrapper, Hero, Title, Subtitle, Block } from "./PortfolioSkeleton.styles";

const BLOCKS = Array.from({ length: 3 }, (_, i) => i);

export function PortfolioSkeleton() {
  return (
    <Wrapper aria-hidden="true">
      <Hero>
        <Title />
        <Subtitle />
      </Hero>
      {BLOCKS.map((key) => (
        <Block key={key} />
      ))}
    </Wrapper>
  );
}
