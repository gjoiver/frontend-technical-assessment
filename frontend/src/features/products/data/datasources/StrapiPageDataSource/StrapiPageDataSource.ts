import type { HttpClient } from "@shared/lib/entities/HttpClient";
import type { PageResponse } from "@products/data/dto";

export class StrapiPageDataSource {
  private readonly http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  public getPage(): Promise<PageResponse> {
    return this.http.get<PageResponse>("/api/page");
  }
}
