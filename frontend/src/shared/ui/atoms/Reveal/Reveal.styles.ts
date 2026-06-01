import styled from "styled-components";

export const RevealWrapper = styled.div<{ $revealed: boolean; $delay: number }>`
  opacity: ${({ $revealed }) => ($revealed ? 1 : 0)};
  transform: translateY(${({ $revealed }) => ($revealed ? "0" : "24px")});
  transition:
    opacity ${({ theme }) => theme.motion.duration.slow}
      ${({ theme }) => theme.motion.ease.out},
    transform ${({ theme }) => theme.motion.duration.slow}
      ${({ theme }) => theme.motion.ease.out};
  transition-delay: ${({ $delay }) => `${$delay * 70}ms`};

  @media (prefers-reduced-motion: reduce) {
    opacity: 1;
    transform: none;
    transition: none;
  }
`;
