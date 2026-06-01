import { useEffect, useState } from "react";
import type { PortfolioInteractor } from "@portfolio/core";
import type { UsePortfolioState } from "./usePortfolio.types";

export function usePortfolio(
  interactor: PortfolioInteractor,
): UsePortfolioState {
  const [state, setState] = useState<UsePortfolioState>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const controller = new AbortController();

    const getPortfolio = async () => {
      try {
        const data = await interactor.getPortfolio();
        if (!controller.signal.aborted) {
          setState({ data, loading: false, error: null });
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          setState({
            data: null,
            loading: false,
            error: error instanceof Error ? error : new Error("Unknown error"),
          });
        }
      }
    };

    void getPortfolio();

    return () => controller.abort();
  }, [interactor]);

  return state;
}
