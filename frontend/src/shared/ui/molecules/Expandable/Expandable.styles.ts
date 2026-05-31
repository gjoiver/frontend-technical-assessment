import styled, { css } from "styled-components";

export const Content = styled.div<{ $expanded: boolean; $lines: number }>`
  overflow: hidden;
  ${({ $expanded, $lines }) =>
    !$expanded &&
    css`
      max-height: ${$lines * 1.5}em;
    `}
`;

export const ToggleRow = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: ${({ theme }) => theme.space.sm};
`;

export const Toggle = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  font: inherit;
  font-size: ${({ theme }) => theme.font.size.sm};
  font-weight: ${({ theme }) => theme.font.weight.medium};
  color: ${({ theme }) => theme.colors.primary};

  &:hover {
    text-decoration: underline;
  }
`;
