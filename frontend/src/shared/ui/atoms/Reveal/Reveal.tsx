import { useReveal } from "@shared/ui/hooks";
import { RevealWrapper } from "./Reveal.styles";
import type { RevealProps } from "./Reveal.types";

export function Reveal({ children, delay = 0 }: RevealProps) {
  const { ref, revealed } = useReveal<HTMLDivElement>();

  return (
    <RevealWrapper ref={ref} $revealed={revealed} $delay={delay}>
      {children}
    </RevealWrapper>
  );
}
