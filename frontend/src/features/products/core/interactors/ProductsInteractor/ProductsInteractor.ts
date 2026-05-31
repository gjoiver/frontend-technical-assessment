import type { ProductsView } from "../../entities";
import type { ProductRepository, PageRepository } from "../../repositories";
import { GetProductsPageUseCase } from "../../usecases";

export class ProductsInteractor {
  private readonly getProductsPageUseCase: GetProductsPageUseCase;

  constructor(productRepository: ProductRepository, pageRepository: PageRepository) {
    this.getProductsPageUseCase = new GetProductsPageUseCase(
      productRepository,
      pageRepository,
    );
  }

  public getProductsPage(): Promise<ProductsView> {
    return this.getProductsPageUseCase.execute();
  }
}
