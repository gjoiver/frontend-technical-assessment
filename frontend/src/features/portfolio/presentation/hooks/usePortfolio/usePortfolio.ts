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
    let active = true;

    const getPortfolio = async () => {
      try {
        const data = await interactor.getPortfolio();
        if (active) setState({ data, loading: false, error: null });
      } catch (error) {
        if (active) {
          setState({
            data: null,
            loading: false,
            error: error instanceof Error ? error : new Error("Unknown error"),
          });
        }
      }
    };

    void getPortfolio();

    return () => {
      active = false;
    };
  }, [interactor]);

  return state;
}
