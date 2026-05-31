import type { HttpClient } from "@shared/lib/entities/HttpClient";
import type { ProductDto } from "@products/data/dto";

export class FakeStoreProductDataSource {
  private readonly http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  public getProducts(): Promise<ProductDto[]> {
    return this.http.get<ProductDto[]>("/products");
  }
}
