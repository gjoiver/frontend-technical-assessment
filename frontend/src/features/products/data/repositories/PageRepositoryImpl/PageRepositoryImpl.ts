import type { PageContent, PageRepository } from "@products/core";
import type { StrapiPageDataSource } from "@products/data/datasources";
import { pageMapper } from "@products/data/mappers";

export class PageRepositoryImpl implements PageRepository {
  private readonly dataSource: StrapiPageDataSource;

  constructor(dataSource: StrapiPageDataSource) {
    this.dataSource = dataSource;
  }

  public async getPage(): Promise<PageContent> {
    const response = await this.dataSource.getPage();
    return pageMapper.from(response);
  }
}
