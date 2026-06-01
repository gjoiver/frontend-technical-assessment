import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  *, *::before, *::after { box-sizing: border-box; }
  * { margin: 0; }
  html { scroll-behavior: smooth; }
  html, body { height: 100%; }
  body {
    font-family: ${({ theme }) => theme.font.family};
    background-color: ${({ theme }) => theme.colors.background};
    background-image: radial-gradient(
      55rem 55rem at 50% -22rem,
      rgba(108, 92, 231, 0.2),
      transparent 70%
    );
    background-attachment: fixed;
    color: ${({ theme }) => theme.colors.text};
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
  }
  img, picture { max-width: 100%; display: block; }
  a { color: inherit; text-decoration: none; }
  section[id] { scroll-margin-top: 5rem; }

  ::selection {
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};
  }
  :focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
    border-radius: ${({ theme }) => theme.radius.sm};
  }
`;
