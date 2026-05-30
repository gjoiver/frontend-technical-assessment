export type TextSize = "sm" | "md" | "lg" | "xl";
export type TextWeight = "regular" | "medium" | "bold";

export interface TextProps {
  size?: TextSize;
  weight?: TextWeight;
  muted?: boolean;
}
