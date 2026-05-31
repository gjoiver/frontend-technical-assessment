import { useEffect, useState } from "react";
import type { ProductsInteractor } from "@products/core";
import type { UseProductsPageState } from "./useProductsPage.types";

export function useProductsPage(
  interactor: ProductsInteractor,
): UseProductsPageState {
  const [state, setState] = useState<UseProductsPageState>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let active = true;

    const load = async () => {
      try {
        const data = await interactor.getProductsPage();
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

    void load();

    return () => {
      active = false;
    };
  }, [interactor]);

  return state;
}
