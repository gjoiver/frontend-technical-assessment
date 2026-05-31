import {
  BlocksRenderer,
  type BlocksContent,
} from "@strapi/blocks-react-renderer";
import type { RichTextRendererProps } from "./RichTextRenderer.types";

export function RichTextRenderer({ value }: RichTextRendererProps) {
  return <BlocksRenderer content={value as unknown as BlocksContent} />;
}
