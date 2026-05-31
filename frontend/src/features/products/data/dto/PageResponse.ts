import type { PageDataDto } from "./PageDataDto";

export interface PageResponse {
  data: PageDataDto | null;
  meta: unknown;
}
