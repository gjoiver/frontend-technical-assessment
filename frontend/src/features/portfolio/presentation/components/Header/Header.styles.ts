import styled from "styled-components";
import { media } from "@shared/ui/theme/media";

export const Bar = styled.header`
  position: sticky;
  top: 0;
  z-index: 10;
  background: ${({ theme }) => theme.colors.surface};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

export const Inner = styled.div`
  max-width: 960px;
  margin: 0 auto;
  padding: ${({ theme }) => `${theme.space.md} ${theme.space.lg}`};
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

export const NavLink = styled.a`
  color: ${({ theme }) => theme.colors.muted};
  font-size: ${({ theme }) => theme.font.size.sm};
  font-weight: ${({ theme }) => theme.font.weight.medium};
  transition: color 0.15s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;
