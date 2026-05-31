import type { Product } from "../entities";

export interface ProductRepository {
  getProducts(): Promise<Product[]>;
}
