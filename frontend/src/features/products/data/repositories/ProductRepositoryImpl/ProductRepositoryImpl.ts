import type { Product, ProductRepository } from "@products/core";
import type { FakeStoreProductDataSource } from "@products/data/datasources";
import { productMapper } from "@products/data/mappers";

export class ProductRepositoryImpl implements ProductRepository {
  private readonly dataSource: FakeStoreProductDataSource;

  constructor(dataSource: FakeStoreProductDataSource) {
    this.dataSource = dataSource;
  }

  public async getProducts(): Promise<Product[]> {
    const dtos = await this.dataSource.getProducts();
    return dtos.map((dto) => productMapper.from(dto));
  }
}
