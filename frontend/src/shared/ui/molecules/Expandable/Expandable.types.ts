import type { ReactNode } from "react";

export interface ExpandableProps {
  children: ReactNode;
  lines?: number;
  moreLabel: string;
  lessLabel: string;
}
