import type { UseCase } from "@shared/lib/usecases";
import type { ProductsView } from "../../entities";
import type { ProductRepository, PageRepository } from "../../repositories";

export class GetProductsPageUseCase implements UseCase<void, ProductsView> {
  private readonly productRepository: ProductRepository;
  private readonly pageRepository: PageRepository;

  constructor(productRepository: ProductRepository, pageRepository: PageRepository) {
    this.productRepository = productRepository;
    this.pageRepository = pageRepository;
  }

  public async execute(): Promise<ProductsView> {
    const [products, page] = await Promise.all([
      this.productRepository.getProducts(),
      this.pageRepository.getPage(),
    ]);

    return { page, products };
  }
}
