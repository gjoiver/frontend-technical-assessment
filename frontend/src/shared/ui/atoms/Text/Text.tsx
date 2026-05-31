import type { ElementType } from "react";
import { StyledText } from "./Text.styles";
import type { TextProps, TextVariant } from "./Text.types";

const ELEMENT: Record<TextVariant, ElementType> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  body: "p",
  caption: "span",
};

export function Text({ variant = "body", muted, children, className }: TextProps) {
  return (
    <StyledText
      as={ELEMENT[variant]}
      $variant={variant}
      $muted={muted}
      className={className}
    >
      {children}
    </StyledText>
  );
}
