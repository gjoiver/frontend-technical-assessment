import { Text } from "@shared/ui/atoms";
import { usePagination } from "@shared/ui/hooks";
import { Pagination, SectionTitle } from "@shared/ui/molecules";
import { productsI18n } from "@products/presentation/i18n";
import { ProductGrid } from "../ProductGrid";
import type { ProductsContentProps } from "./ProductsContent.types";

export function ProductsContent({ data }: ProductsContentProps) {
  const { pageItems, page, pageSize, totalPages, setPage, setPageSize } =
    usePagination(data.products, 10);

  return (
    <>
      <SectionTitle>{data.page.title || productsI18n.title}</SectionTitle>
      {data.page.intro && <Text variant="body">{data.page.intro}</Text>}
      <ProductGrid products={pageItems} />
      <Pagination
        page={page}
        totalPages={totalPages}
        pageSize={pageSize}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        perPageLabel={productsI18n.pagination.perPage}
        label={productsI18n.page}
        prevLabel={productsI18n.pagination.prev}
        nextLabel={productsI18n.pagination.next}
      />
    </>
  );
}
