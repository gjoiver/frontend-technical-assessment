import { Text } from "@shared/ui/atoms";
import { formatCurrency } from "@shared/utils";
import { Grid, ProductCard, Image, Body, Category, Price } from "./ProductGrid.styles";
import type { ProductGridProps } from "./ProductGrid.types";

export function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) return null;

  return (
    <Grid>
      {products.map((product) => (
        <ProductCard key={product.id}>
          <Image src={product.image} alt={product.title} loading="lazy" />
          <Body>
            <Category>{product.category}</Category>
            <Text variant="body">{product.title}</Text>
          </Body>
          <Price>{formatCurrency(product.price)}</Price>
        </ProductCard>
      ))}
    </Grid>
  );
}
