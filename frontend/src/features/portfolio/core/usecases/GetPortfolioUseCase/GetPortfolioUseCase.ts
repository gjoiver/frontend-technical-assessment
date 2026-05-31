import type { UseCase } from "@shared/lib/usecases";
import type { Portfolio } from "@portfolio/core/entities";
import type { PortfolioRepository } from "@portfolio/core/repositories";

export class GetPortfolioUseCase implements UseCase<void, Portfolio> {
  private readonly repository: PortfolioRepository;

  constructor(repository: PortfolioRepository) {
    this.repository = repository;
  }

  public execute(): Promise<Portfolio> {
    return this.repository.getPortfolio();
  }
}
