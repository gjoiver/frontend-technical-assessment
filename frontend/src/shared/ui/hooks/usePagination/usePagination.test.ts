// @vitest-environment jsdom
import { describe, it, expect } from "vitest";
import { act, renderHook } from "@testing-library/react";
import { usePagination } from "./usePagination";

const items = Array.from({ length: 25 }, (_, i) => i + 1);

describe("Feature: usePagination paginates a list on the client", () => {
  it(
    `
      Given 25 items with a page size of 10
      When the hook initializes
      Then it exposes 3 pages and the first 10 items
    `,
    () => {
      // Act
      const { result } = renderHook(() => usePagination(items, 10));

      // Assert
      expect(result.current.totalPages).toBe(3);
      expect(result.current.page).toBe(1);
      expect(result.current.pageItems).toEqual(items.slice(0, 10));
    },
  );

  it(
    `
      Given the hook on page 1
      When the page changes to 2
      Then it returns the second slice of items
    `,
    () => {
      // Arrange
      const { result } = renderHook(() => usePagination(items, 10));

      // Act
      act(() => result.current.setPage(2));

      // Assert
      expect(result.current.page).toBe(2);
      expect(result.current.pageItems).toEqual(items.slice(10, 20));
    },
  );

  it(
    `
      Given the hook on page 3
      When the page size changes to 20
      Then it resets to page 1 and recomputes the total pages
    `,
    () => {
      // Arrange
      const { result } = renderHook(() => usePagination(items, 10));
      act(() => result.current.setPage(3));

      // Act
      act(() => result.current.setPageSize(20));

      // Assert
      expect(result.current.page).toBe(1);
      expect(result.current.totalPages).toBe(2);
      expect(result.current.pageItems).toEqual(items.slice(0, 20));
    },
  );
});
