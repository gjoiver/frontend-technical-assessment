import styled from "styled-components";
import type { TextVariant } from "./Text.types";

const SIZE: Record<TextVariant, "sm" | "md" | "lg" | "xl"> = {
  h1: "xl",
  h2: "lg",
  h3: "md",
  body: "md",
  caption: "sm",
};

const WEIGHT: Record<TextVariant, "regular" | "medium" | "bold"> = {
  h1: "bold",
  h2: "bold",
  h3: "bold",
  body: "regular",
  caption: "regular",
};

export const StyledText = styled.p<{ $variant: TextVariant; $muted?: boolean }>`
  font-size: ${({ theme, $variant }) => theme.font.size[SIZE[$variant]]};
  font-weight: ${({ theme, $variant }) => theme.font.weight[WEIGHT[$variant]]};
  color: ${({ theme, $muted }) =>
    $muted ? theme.colors.muted : theme.colors.text};
`;
