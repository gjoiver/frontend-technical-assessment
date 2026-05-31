import { Mapper } from "@shared/lib/mappers";
import type { PageContent } from "@products/core";
import type { PageResponse } from "@products/data/dto";

export class PageMapper extends Mapper<PageResponse, PageContent> {
  public from(response: PageResponse): PageContent {
    const data = response.data;
    return {
      title: data?.title ?? "",
      intro: data?.intro ?? undefined,
    };
  }
}

export const pageMapper = new PageMapper();
