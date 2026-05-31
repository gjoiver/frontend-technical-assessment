import { tokens } from "./tokens";

export const media = {
  tablet: `@media (min-width: ${tokens.breakpoints.tablet})`,
  desktop: `@media (min-width: ${tokens.breakpoints.desktop})`,
} as const;
