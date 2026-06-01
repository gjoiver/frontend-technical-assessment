import styled from "styled-components";
import { media } from "@shared/ui/theme/media";

export const Bar = styled.header<{ $scrolled: boolean }>`
  position: sticky;
  top: 0;
  z-index: ${({ theme }) => theme.zIndex.header};
  background: ${({ theme }) => theme.colors.surface};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme, $scrolled }) => ($scrolled ? theme.shadow.md : "none")};
  transition: box-shadow ${({ theme }) => theme.motion.duration.base}
    ${({ theme }) => theme.motion.ease.out};
`;

export const Progress = styled.div<{ $progress: number }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  z-index: ${({ theme }) => theme.zIndex.progress};
  background: ${({ theme }) => theme.gradient.primary};
  transform: scaleX(${({ $progress }) => $progress});
  transform-origin: left;
`;

export const Inner = styled.div`
  max-width: ${({ theme }) => theme.layout.maxWidth};
  margin: 0 auto;
  padding: ${({ theme }) => `${theme.space.md} ${theme.layout.gutter}`};
  display: flex;
  align-items: center;
`;

export const Toggle = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.font.size.lg};
  line-height: 1;
  cursor: pointer;
  padding: 0;

  ${media.tablet} {
    display: none;
  }
`;

export const Nav = styled.nav<{ $open: boolean }>`
  display: ${({ $open }) => ($open ? "flex" : "none")};
  flex-direction: column;
  gap: ${({ theme }) => theme.space.sm};
  position: absolute;
  left: 0;
  right: 0;
  top: 100%;
  padding: ${({ theme }) => `${theme.space.md} ${theme.space.lg}`};
  background: ${({ theme }) => theme.colors.surface};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  ${media.tablet} {
    display: flex;
    flex-direction: row;
    gap: ${({ theme }) => theme.space.md};
    position: static;
    padding: 0;
    background: none;
    border: none;
  }
`;

export const NavLink = styled.a<{ $active: boolean }>`
  color: ${({ theme, $active }) =>
    $active ? theme.colors.text : theme.colors.muted};
  font-size: ${({ theme }) => theme.font.size.sm};
  font-weight: ${({ theme }) => theme.font.weight.medium};
  transition: color ${({ theme }) => theme.motion.duration.fast}
    ${({ theme }) => theme.motion.ease.out};

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;
