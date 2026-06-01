import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const Bar = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.background};
`;

export const Nav = styled.nav`
  max-width: ${({ theme }) => theme.layout.maxWidth};
  margin: 0 auto;
  padding: ${({ theme }) => `${theme.space.md} ${theme.layout.gutter}`};
  display: flex;
  gap: ${({ theme }) => theme.space.lg};
`;

export const Item = styled(NavLink)`
  color: ${({ theme }) => theme.colors.muted};
  font-weight: ${({ theme }) => theme.font.weight.medium};
  transition: color 0.15s ease;

  &.active {
    color: ${({ theme }) => theme.colors.text};
  }
`;
