import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.space.sm};
  min-height: 40vh;
  padding: ${({ theme }) => theme.space.lg};
  text-align: center;
  color: ${({ theme }) => theme.colors.muted};
`;
