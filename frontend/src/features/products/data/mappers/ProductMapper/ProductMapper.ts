import { Mapper } from "@shared/lib/mappers";
import type { Product } from "@products/core";
import type { ProductDto } from "@products/data/dto";

export class ProductMapper extends Mapper<ProductDto, Product> {
  public from(dto: ProductDto): Product {
    return {
      id: dto.id,
      title: dto.title,
      price: dto.price,
      category: dto.category,
      image: dto.image,
    };
  }
}

export const productMapper = new ProductMapper();
