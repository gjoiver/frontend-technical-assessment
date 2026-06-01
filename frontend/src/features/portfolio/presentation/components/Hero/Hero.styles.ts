import styled from "styled-components";

export const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.md};
  padding: ${({ theme }) => `${theme.space.xxl} 0 ${theme.space.xl}`};
`;

export const Title = styled.h1`
  font-size: clamp(2.25rem, 6vw, 3.75rem);
  font-weight: ${({ theme }) => theme.font.weight.bold};
  line-height: 1.1;
  letter-spacing: -0.02em;
  background: ${({ theme }) => theme.gradient.primary};
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;

export const Subtitle = styled.p`
  max-width: 60ch;
  font-size: ${({ theme }) => theme.font.size.lg};
  color: ${({ theme }) => theme.colors.muted};
`;
