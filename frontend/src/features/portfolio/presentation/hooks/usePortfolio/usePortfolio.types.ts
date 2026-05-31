import type { Portfolio } from "@portfolio/core";

export interface UsePortfolioState {
  data: Portfolio | null;
  loading: boolean;
  error: Error | null;
}
