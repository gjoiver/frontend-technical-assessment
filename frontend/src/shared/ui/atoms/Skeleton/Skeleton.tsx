import styled, { keyframes } from "styled-components";

const shimmer = keyframes`
  from { background-position: 200% 0; }
  to { background-position: -200% 0; }
`;

export const Skeleton = styled.div`
  width: 100%;
  height: 1rem;
  border-radius: ${({ theme }) => theme.radius.sm};
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.surface} 25%,
    ${({ theme }) => theme.colors.surfaceHover} 37%,
    ${({ theme }) => theme.colors.surface} 63%
  );
  background-size: 200% 100%;
  animation: ${shimmer} 1.4s ease infinite;
`;
