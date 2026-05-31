export interface RichTextNode {
  type: string;
  text?: string;
  children?: RichTextNode[];
  [key: string]: unknown;
}

export type RichText = RichTextNode[];
