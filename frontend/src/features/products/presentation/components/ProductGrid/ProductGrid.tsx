import { Text, Tag } from "@shared/ui/atoms";
import { Card } from "@shared/ui/molecules";
import { Grid, Image, Info, Price } from "./ProductGrid.styles";
import type { ProductGridProps } from "./ProductGrid.types";

export function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) return null;

  return (
    <Grid>
      {products.map((product) => (
        <Card key={product.id}>
          <Image src={product.image} alt={product.title} loading="lazy" />
          <Info>
            <Tag>{product.category}</Tag>
            <Text variant="body">{product.title}</Text>
            <Price>${product.price.toFixed(2)}</Price>
          </Info>
        </Card>
      ))}
    </Grid>
  );
}
