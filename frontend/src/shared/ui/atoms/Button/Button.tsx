import styled from "styled-components";

export const Button = styled.button`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.sm};
  padding: ${({ theme }) => `${theme.space.sm} ${theme.space.lg}`};
  border: none;
  border-radius: ${({ theme }) => theme.radius.sm};
  background: ${({ theme }) => theme.gradient.primary};
  color: ${({ theme }) => theme.colors.white};
  font: inherit;
  font-weight: ${({ theme }) => theme.font.weight.medium};
  cursor: pointer;
  box-shadow: ${({ theme }) => theme.shadow.sm};
  transition:
    transform ${({ theme }) => theme.motion.duration.fast}
      ${({ theme }) => theme.motion.ease.out},
    box-shadow ${({ theme }) => theme.motion.duration.fast}
      ${({ theme }) => theme.motion.ease.out};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadow.md};
  }
  &:active {
    transform: scale(0.97);
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }

  @media (prefers-reduced-motion: reduce) {
    &:hover,
    &:active {
      transform: none;
    }
  }
`;
