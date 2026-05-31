import styled from "styled-components";

export const Wrapper = styled.div`
  margin-bottom: ${({ theme }) => theme.space.lg};
`;

export const Accent = styled.span`
  display: block;
  width: 2.5rem;
  height: 0.25rem;
  margin-top: ${({ theme }) => theme.space.sm};
  background: ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.radius.sm};
`;
