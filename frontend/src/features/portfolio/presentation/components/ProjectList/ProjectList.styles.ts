import styled from "styled-components";
import { media } from "@shared/ui/theme/media";

export const Grid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space.lg};
  grid-template-columns: 1fr;

  ${media.tablet} {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const Technologies = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space.sm};
  margin-top: ${({ theme }) => theme.space.md};
`;
