import { Grid, SkeletonCard, Image, Line } from "./ProductsSkeleton.styles";

const PLACEHOLDERS = Array.from({ length: 6 }, (_, i) => i);

export function ProductsSkeleton() {
  return (
    <Grid aria-hidden="true">
      {PLACEHOLDERS.map((key) => (
        <SkeletonCard key={key}>
          <Image />
          <Line $width="40%" />
          <Line $width="80%" />
          <Line $width="30%" />
        </SkeletonCard>
      ))}
    </Grid>
  );
}
