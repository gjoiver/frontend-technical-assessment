import type { ReactNode } from "react";

export type TextVariant = "h1" | "h2" | "h3" | "body" | "caption";

export interface TextProps {
  variant?: TextVariant;
  muted?: boolean;
  children?: ReactNode;
  className?: string;
}
