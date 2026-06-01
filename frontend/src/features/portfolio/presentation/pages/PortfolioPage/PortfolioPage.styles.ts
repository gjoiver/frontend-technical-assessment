import styled from "styled-components";
import { media } from "@shared/ui/theme/media";

export const Container = styled.main`
  max-width: ${({ theme }) => theme.layout.maxWidth};
  margin: 0 auto;
  padding: ${({ theme }) => `${theme.space.lg} ${theme.layout.gutter}`};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.xl};

  ${media.tablet} {
    padding: ${({ theme }) => `${theme.space.xl} ${theme.space.xl}`};
  }
`;

export const Centered = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
`;
