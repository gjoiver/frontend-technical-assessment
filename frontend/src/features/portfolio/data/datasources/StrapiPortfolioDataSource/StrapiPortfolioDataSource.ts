import type { HttpClient } from "@shared/lib/entities/HttpClient";
import type { PortfolioResponse } from "@portfolio/data/dto";

export class StrapiPortfolioDataSource {
  private readonly http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  public getPortfolio(): Promise<PortfolioResponse> {
    return this.http.get<PortfolioResponse>("/api/portfolio");
  }
}
