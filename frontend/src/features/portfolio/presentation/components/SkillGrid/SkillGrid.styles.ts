import styled, { keyframes } from "styled-components";
import type { SkillLevel } from "@portfolio/core/entities";
import { media } from "@shared/ui/theme/media";

const LEVEL_WIDTH: Record<SkillLevel, string> = {
  Beginner: "33%",
  Intermediate: "66%",
  Advanced: "100%",
};

const fill = keyframes`
  from { width: 0; }
  to { width: var(--target); }
`;

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
  flex-direction: column;
  gap: ${({ theme }) => theme.space.sm};
  padding: ${({ theme }) => theme.space.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.surface};
`;

export const Head = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space.sm};
`;

export const Name = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.sm};
  min-width: 0;
  color: ${({ theme }) => theme.colors.muted};
`;

export const Meter = styled.div`
  height: 4px;
  border-radius: ${({ theme }) => theme.radius.pill};
  background: ${({ theme }) => theme.colors.border};
  overflow: hidden;
`;

export const MeterFill = styled.div<{ $level: SkillLevel }>`
  --target: ${({ $level }) => LEVEL_WIDTH[$level]};
  height: 100%;
  width: var(--target);
  border-radius: inherit;
  background: ${({ theme, $level }) => theme.level[$level]};
  animation: ${fill} ${({ theme }) => theme.motion.duration.slow}
    ${({ theme }) => theme.motion.ease.out} both;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;
