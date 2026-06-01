import styled from "styled-components";
import { Skeleton } from "@shared/ui/atoms";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.xl};
  padding: ${({ theme }) => `${theme.space.xxl} 0`};
`;

export const Hero = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.md};
`;

export const Title = styled(Skeleton)`
  height: 3rem;
  width: 60%;
`;

export const Subtitle = styled(Skeleton)`
  height: 1.25rem;
  width: 85%;
`;

export const Block = styled(Skeleton)`
  height: 8rem;
`;
