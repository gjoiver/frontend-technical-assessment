import styled from "styled-components";
import { Skeleton } from "@shared/ui/atoms";
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

export const SkeletonCard = styled(Card)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.sm};

  &:hover {
    transform: none;
    border-color: ${({ theme }) => theme.colors.border};
    box-shadow: ${({ theme }) => theme.shadow.sm};
  }
`;

export const Image = styled(Skeleton)`
  height: 11.25rem;
`;

export const Line = styled(Skeleton)<{ $width?: string }>`
  width: ${({ $width }) => $width ?? "100%"};
`;
