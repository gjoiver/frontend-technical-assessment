import styled from "styled-components";

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.sm};
`;

export const Social = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space.md};
  margin-top: ${({ theme }) => theme.space.md};
`;

export const Link = styled.a`
  position: relative;
  color: ${({ theme }) => theme.colors.primary};

  &::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: -2px;
    height: 1px;
    background: currentColor;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform ${({ theme }) => theme.motion.duration.fast}
      ${({ theme }) => theme.motion.ease.out};
  }
  &:hover::after {
    transform: scaleX(1);
  }

  @media (prefers-reduced-motion: reduce) {
    &::after {
      transition: none;
    }
  }
`;

export const SocialLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.space.sm};
  color: ${({ theme }) => theme.colors.muted};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.sm};
  transition:
    transform ${({ theme }) => theme.motion.duration.fast}
      ${({ theme }) => theme.motion.ease.spring},
    color ${({ theme }) => theme.motion.duration.fast}
      ${({ theme }) => theme.motion.ease.out},
    background ${({ theme }) => theme.motion.duration.fast}
      ${({ theme }) => theme.motion.ease.out},
    border-color ${({ theme }) => theme.motion.duration.fast}
      ${({ theme }) => theme.motion.ease.out};

  &:hover {
    color: ${({ theme }) => theme.colors.white};
    background: ${({ theme }) => theme.colors.primary};
    border-color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-2px) rotate(-6deg);
  }

  @media (prefers-reduced-motion: reduce) {
    &:hover {
      transform: none;
    }
  }
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.sm};
`;

export const CopyButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.space.xs};
  color: ${({ theme }) => theme.colors.muted};
  background: none;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.sm};
  cursor: pointer;
  transition:
    color ${({ theme }) => theme.motion.duration.fast}
      ${({ theme }) => theme.motion.ease.out},
    background ${({ theme }) => theme.motion.duration.fast}
      ${({ theme }) => theme.motion.ease.out},
    border-color ${({ theme }) => theme.motion.duration.fast}
      ${({ theme }) => theme.motion.ease.out};

  &:hover {
    color: ${({ theme }) => theme.colors.white};
    background: ${({ theme }) => theme.colors.primary};
    border-color: ${({ theme }) => theme.colors.primary};
  }

  &:active {
    transform: scale(0.97);
  }
`;
