import type { RichText } from "@shared/types";

export interface PageDataDto {
  id: number;
  documentId: string;
  title: string;
  intro?: RichText | null;
}
