import type { Portfolio } from "../entities";

export interface PortfolioRepository {
  getPortfolio(): Promise<Portfolio>;
}
