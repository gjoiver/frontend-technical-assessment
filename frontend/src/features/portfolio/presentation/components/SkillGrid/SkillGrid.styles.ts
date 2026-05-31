import styled from "styled-components";
import { media } from "@shared/ui/theme/media";

export const Grid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space.md};
  grid-template-columns: 1fr;

  ${media.tablet} {
    grid-template-columns: repeat(2, 1fr);
  }
  ${media.desktop} {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const Item = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space.sm};
  padding: ${({ theme }) => theme.space.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.surface};
`;
