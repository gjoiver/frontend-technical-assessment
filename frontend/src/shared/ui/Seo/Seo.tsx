import type { SeoProps } from "./Seo.types";

export function Seo({ title, description, keywords }: SeoProps) {
  return (
    <>
      {title ? <title>{title}</title> : null}
      {description ? <meta name="description" content={description} /> : null}
      {keywords ? <meta name="keywords" content={keywords} /> : null}
      {title ? <meta property="og:title" content={title} /> : null}
      {description ? (
        <meta property="og:description" content={description} />
      ) : null}
      <meta property="og:type" content="website" />
    </>
  );
}
