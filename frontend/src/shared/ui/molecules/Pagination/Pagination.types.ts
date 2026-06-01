export interface PaginationProps {
  page: number;
  totalPages: number;
  pageSize: number;
  total: number;
  pageSizeOptions?: number[];
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  perPageLabel?: string;
  label?: (page: number, totalPages: number) => string;
  prevLabel?: string;
  nextLabel?: string;
}
