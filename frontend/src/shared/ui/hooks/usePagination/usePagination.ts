import { useState } from "react";

export function usePagination<T>(items: T[], initialPageSize = 10) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);

  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * pageSize;
  const pageItems = items.slice(start, start + pageSize);

  const changePageSize = (size: number) => {
    setPageSize(size);
    setPage(1);
  };

  return {
    pageItems,
    page: safePage,
    pageSize,
    totalPages,
    total: items.length,
    setPage,
    setPageSize: changePageSize,
  };
}
