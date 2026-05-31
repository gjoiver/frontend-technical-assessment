import type { PageContent } from "./PageContent";
import type { Product } from "./Product";

export interface ProductsView {
  page: PageContent;
  products: Product[];
}
