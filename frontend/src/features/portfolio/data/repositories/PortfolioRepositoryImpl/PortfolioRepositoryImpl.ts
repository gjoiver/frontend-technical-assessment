import type { Portfolio, PortfolioRepository } from "@portfolio/core";
import type { StrapiPortfolioDataSource } from "@portfolio/data/datasources";
import { portfolioMapper } from "@portfolio/data/mappers";

export class PortfolioRepositoryImpl implements PortfolioRepository {
  private readonly dataSource: StrapiPortfolioDataSource;

  constructor(dataSource: StrapiPortfolioDataSource) {
    this.dataSource = dataSource;
  }

  public async getPortfolio(): Promise<Portfolio> {
    const response = await this.dataSource.getPortfolio();
    return portfolioMapper.from(response);
  }
}
