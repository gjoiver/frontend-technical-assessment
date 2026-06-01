import styled, { keyframes } from "styled-components";

const drift = keyframes`
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(8%, -6%) scale(1.12); }
`;

const shimmer = keyframes`
  to { background-position: 200% center; }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.35; transform: scale(0.8); }
`;

export const Wrapper = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.md};
  padding: ${({ theme }) => `${theme.space.xxl} 0 ${theme.space.xl}`};
`;

export const Aurora = styled.div`
  position: absolute;
  top: -6rem;
  left: 50%;
  width: 100vw;
  height: 26rem;
  transform: translateX(-50%);
  z-index: -1;
  pointer-events: none;
  filter: blur(90px);
  opacity: 0.5;

  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 0;
    width: 30rem;
    max-width: 45vw;
    height: 22rem;
    border-radius: 50%;
    animation: ${drift} 14s ${({ theme }) => theme.motion.ease.out} infinite;
  }
  &::before {
    left: 12%;
    background: ${({ theme }) => theme.colors.primary};
  }
  &::after {
    right: 12%;
    background: ${({ theme }) => theme.colors.accent};
    animation-delay: -7s;
  }

  @media (prefers-reduced-motion: reduce) {
    &::before,
    &::after {
      animation: none;
    }
  }
`;

export const Eyebrow = styled.p`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.sm};
  font-size: ${({ theme }) => theme.font.size.sm};
  color: ${({ theme }) => theme.colors.muted};

  &::before {
    content: "";
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background: ${({ theme }) => theme.level.Advanced};
    animation: ${pulse} 2s ${({ theme }) => theme.motion.ease.out} infinite;
  }

  @media (prefers-reduced-motion: reduce) {
    &::before {
      animation: none;
    }
  }
`;

export const Title = styled.h1`
  font-size: clamp(2.25rem, 6vw, 3.75rem);
  font-weight: ${({ theme }) => theme.font.weight.bold};
  line-height: 1.1;
  letter-spacing: -0.02em;
  background: linear-gradient(
    110deg,
    ${({ theme }) => theme.colors.primary},
    ${({ theme }) => theme.colors.accent},
    ${({ theme }) => theme.colors.primary}
  );
  background-size: 200% auto;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: ${shimmer} 6s linear infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    background: ${({ theme }) => theme.gradient.primary};
    background-clip: text;
    -webkit-background-clip: text;
  }
`;

export const Subtitle = styled.p`
  max-width: 60ch;
  font-size: ${({ theme }) => theme.font.size.lg};
  color: ${({ theme }) => theme.colors.muted};
`;

export const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space.md};
  margin-top: ${({ theme }) => theme.space.sm};
`;

export const PrimaryCta = styled.a`
  display: inline-flex;
  align-items: center;
  padding: ${({ theme }) => `${theme.space.sm} ${theme.space.lg}`};
  border-radius: ${({ theme }) => theme.radius.sm};
  background: ${({ theme }) => theme.gradient.primary};
  color: ${({ theme }) => theme.colors.white};
  font-weight: ${({ theme }) => theme.font.weight.medium};
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

  @media (prefers-reduced-motion: reduce) {
    &:hover,
    &:active {
      transform: none;
    }
  }
`;

export const SecondaryCta = styled.a`
  display: inline-flex;
  align-items: center;
  padding: ${({ theme }) => `${theme.space.sm} ${theme.space.lg}`};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.sm};
  color: ${({ theme }) => theme.colors.text};
  font-weight: ${({ theme }) => theme.font.weight.medium};
  transition: border-color ${({ theme }) => theme.motion.duration.fast}
    ${({ theme }) => theme.motion.ease.out};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;
