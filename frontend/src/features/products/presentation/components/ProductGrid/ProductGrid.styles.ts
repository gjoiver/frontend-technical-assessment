import styled from "styled-components";
import { Tag } from "@shared/ui/atoms";
import { Card } from "@shared/ui/molecules";
import { media } from "@shared/ui/theme/media";

export const Grid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space.lg};
  grid-template-columns: 1fr;

  ${media.tablet} {
    grid-template-columns: repeat(2, 1fr);
  }
  ${media.desktop} {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const ProductCard = styled(Card)`
  display: flex;
  flex-direction: column;
`;

export const Image = styled.img`
  width: 100%;
  height: 11.25rem;
  object-fit: contain;
  background: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.radius.sm};
  padding: ${({ theme }) => theme.space.sm};
`;

export const Body = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${({ theme }) => theme.space.xs};
  margin-top: ${({ theme }) => theme.space.sm};
`;

export const Category = styled(Tag)`
  text-transform: capitalize;
`;

export const Price = styled.span`
  align-self: flex-start;
  margin-top: ${({ theme }) => theme.space.md};
  font-weight: ${({ theme }) => theme.font.weight.bold};
  color: ${({ theme }) => theme.colors.primary};
`;
