import type { Portfolio } from "../../entities";
import type { PortfolioRepository } from "../../repositories";
import { GetPortfolioUseCase } from "../../usecases";

export class PortfolioInteractor {
  private readonly getPortfolioUseCase: GetPortfolioUseCase;

  constructor(repository: PortfolioRepository) {
    this.getPortfolioUseCase = new GetPortfolioUseCase(repository);
  }

  public getPortfolio(): Promise<Portfolio> {
    return this.getPortfolioUseCase.execute();
  }
}
