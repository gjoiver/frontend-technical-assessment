import type { ProductsView } from "@products/core";

export interface UseProductsPageState {
  data: ProductsView | null;
  loading: boolean;
  error: Error | null;
}
