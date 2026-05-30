import type { Portfolio } from "../../entities";
import type { PortfolioRepository } from "../../repositories";

export class GetPortfolioUseCase {
  private readonly repository: PortfolioRepository;

  constructor(repository: PortfolioRepository) {
    this.repository = repository;
  }

  public execute(): Promise<Portfolio> {
    return this.repository.getPortfolio();
  }
}
