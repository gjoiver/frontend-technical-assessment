import styled from "styled-components";
import type { TextProps } from "./Text.types";

export const Text = styled.p<TextProps>`
  font-size: ${({ theme, size = "md" }) => theme.font.size[size]};
  font-weight: ${({ theme, weight = "regular" }) => theme.font.weight[weight]};
  color: ${({ theme, muted }) =>
    muted ? theme.colors.muted : theme.colors.text};
`;
