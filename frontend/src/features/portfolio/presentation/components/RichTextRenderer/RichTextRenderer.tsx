import { BlocksRenderer, type BlocksContent } from "@strapi/blocks-react-renderer";
import type { RichTextRendererProps } from "./RichTextRenderer.types";

/**
 * Wraps Strapi's official blocks renderer so the Strapi dependency is
 * contained to this single file. The rest of the presentation layer renders
 * rich text via this component using the domain `RichText` type.
 */
export function RichTextRenderer({ value }: RichTextRendererProps) {
  return <BlocksRenderer content={value as unknown as BlocksContent} />;
}
