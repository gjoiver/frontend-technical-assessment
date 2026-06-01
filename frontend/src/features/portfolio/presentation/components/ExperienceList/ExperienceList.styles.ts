import styled from "styled-components";

export const List = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.lg};
  padding-left: ${({ theme }) => theme.space.lg};

  &::before {
    content: "";
    position: absolute;
    left: 6px;
    top: 6px;
    bottom: 6px;
    width: 2px;
    background: ${({ theme }) => theme.colors.border};
  }
`;

export const Item = styled.div`
  position: relative;

  &::before {
    content: "";
    position: absolute;
    left: calc(${({ theme }) => theme.space.lg} * -1 + 1px);
    top: 0.4rem;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 4px ${({ theme }) => theme.colors.background};
  }
`;

export const Meta = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space.sm};
  margin: ${({ theme }) => `${theme.space.xs} 0 ${theme.space.sm}`};
`;

export const Company = styled.span`
  color: ${({ theme }) => theme.colors.accent};
  font-weight: ${({ theme }) => theme.font.weight.medium};
`;
