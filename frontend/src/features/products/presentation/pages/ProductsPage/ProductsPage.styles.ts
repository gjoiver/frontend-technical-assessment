import styled from "styled-components";
import { media } from "@shared/ui/theme/media";

export const Container = styled.main`
  max-width: 960px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.space.lg};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.lg};

  ${media.tablet} {
    padding: ${({ theme }) => theme.space.xl};
  }
`;

export const Centered = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
`;
