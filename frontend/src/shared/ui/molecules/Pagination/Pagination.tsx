import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Text } from "@shared/ui/atoms";
import {
  Wrapper,
  Sizes,
  SizeButton,
  Pager,
  NavButton,
} from "./Pagination.styles";
import type { PaginationProps } from "./Pagination.types";

const DEFAULT_OPTIONS = [10, 20, 50];

function visibleSizeOptions(options: number[], total: number): number[] {
  const smaller = options.filter((option) => option < total);
  const firstCovering = options.find((option) => option >= total);
  return firstCovering ? [...smaller, firstCovering] : options;
}

export function Pagination({
  page,
  totalPages,
  pageSize,
  total,
  pageSizeOptions = DEFAULT_OPTIONS,
  onPageChange,
  onPageSizeChange,
  perPageLabel,
  label = (current, pages) => `${current} / ${pages}`,
  prevLabel = "Previous",
  nextLabel = "Next",
}: PaginationProps) {
  const sizeOptions = visibleSizeOptions(pageSizeOptions, total);
  const showSizes = sizeOptions.length > 1;
  const showPager = totalPages > 1;

  if (!showSizes && !showPager) return null;

  return (
    <Wrapper>
      {showSizes && (
        <Sizes>
          {sizeOptions.map((size) => (
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
      )}

      {showPager && (
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
      )}
    </Wrapper>
  );
}
