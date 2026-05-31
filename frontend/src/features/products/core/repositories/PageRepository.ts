import type { PageContent } from "../entities";

export interface PageRepository {
  getPage(): Promise<PageContent>;
}
