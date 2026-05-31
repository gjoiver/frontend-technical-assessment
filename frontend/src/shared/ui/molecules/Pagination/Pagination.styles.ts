import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space.md};
`;

export const Sizes = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.xs};
`;

export const SizeButton = styled.button<{ $active: boolean }>`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.sm};
  padding: ${({ theme }) => `${theme.space.xs} ${theme.space.sm}`};
  background: ${({ theme, $active }) =>
    $active ? theme.colors.primary : "transparent"};
  color: ${({ theme, $active }) =>
    $active ? theme.colors.white : theme.colors.muted};
  font: inherit;
  font-size: ${({ theme }) => theme.font.size.sm};
  cursor: pointer;
`;

export const Pager = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.sm};
`;

export const NavButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.sm};
  padding: ${({ theme }) => theme.space.xs};
  background: transparent;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;
