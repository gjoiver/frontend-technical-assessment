import { Text } from "@shared/ui/atoms";
import { Wrapper, Accent } from "./SectionTitle.styles";
import type { SectionTitleProps } from "./SectionTitle.types";

export function SectionTitle({ children }: SectionTitleProps) {
  return (
    <Wrapper>
      <Text as="h2" size="xl" weight="bold">
        {children}
      </Text>
      <Accent />
    </Wrapper>
  );
}
