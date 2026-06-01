import styled from "styled-components";

export const Card = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: ${({ theme }) => theme.space.lg};
  box-shadow: ${({ theme }) => theme.shadow.sm};
  transition:
    transform 0.18s ease,
    box-shadow 0.18s ease,
    border-color 0.18s ease;

  &:hover {
    transform: translateY(-3px);
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: ${({ theme }) => theme.shadow.md};
  }
`;
