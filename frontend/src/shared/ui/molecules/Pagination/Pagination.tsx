import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Text } from "@shared/ui/atoms";
import { Wrapper, Sizes, SizeButton, Pager, NavButton } from "./Pagination.styles";
import type { PaginationProps } from "./Pagination.types";

const DEFAULT_OPTIONS = [10, 20, 50];

export function Pagination({
  page,
  totalPages,
  pageSize,
  pageSizeOptions = DEFAULT_OPTIONS,
  onPageChange,
  onPageSizeChange,
  perPageLabel,
  label = (current, total) => `${current} / ${total}`,
  prevLabel = "Previous",
  nextLabel = "Next",
}: PaginationProps) {
  return (
    <Wrapper>
      <Sizes>
        {pageSizeOptions.map((size) => (
          <SizeButton
            key={size}
            type="button"
            $active={size === pageSize}
            onClick={() => onPageSizeChange(size)}
          >
            {size}
          </SizeButton>
        ))}
        {perPageLabel && (
          <Text variant="caption" muted>
            {perPageLabel}
          </Text>
        )}
      </Sizes>

      <Pager>
        <NavButton
          type="button"
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          aria-label={prevLabel}
        >
          <FiChevronLeft />
        </NavButton>
        <Text variant="caption">{label(page, totalPages)}</Text>
        <NavButton
          type="button"
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
          aria-label={nextLabel}
        >
          <FiChevronRight />
        </NavButton>
      </Pager>
    </Wrapper>
  );
}
