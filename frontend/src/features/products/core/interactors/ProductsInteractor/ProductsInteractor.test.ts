import { describe, it, expect } from "vitest";
import type { PageRepository, ProductRepository } from "@products/core/repositories";
import { HttpError } from "@shared/lib/http/HttpError";
import {
  pageContentMock,
  productMock,
  serverHttpError,
} from "@products/data/mocks";
import { ProductsInteractor } from "./ProductsInteractor";

function buildInteractor(
  productRepo: Partial<ProductRepository>,
  pageRepo: Partial<PageRepository>,
): ProductsInteractor {
  return new ProductsInteractor(
    { getProducts: async () => [productMock], ...productRepo } as ProductRepository,
    { getPage: async () => pageContentMock, ...pageRepo } as PageRepository,
  );
}

describe("Feature: ProductsInteractor combines products + page and surfaces repository failures", () => {
  it(
    `
      Given both repositories resolve
      When getProductsPage() runs
      Then it returns the combined products + page view
    `,
    async () => {
      // Arrange
      const interactor = buildInteractor({}, {});

      // Act
      const view = await interactor.getProductsPage();

      // Assert
      expect(view).toEqual({ page: pageContentMock, products: [productMock] });
    },
  );

  it(
    `
      Given the product repository rejects with an HttpError
      When getProductsPage() runs
      Then the same HttpError propagates unchanged
    `,
    async () => {
      // Arrange
      const interactor = buildInteractor(
        { getProducts: () => Promise.reject(serverHttpError) },
        {},
      );

      // Act
      const act = interactor.getProductsPage();

      // Assert
      await expect(act).rejects.toBe(serverHttpError);
      await expect(act).rejects.toBeInstanceOf(HttpError);
    },
  );

  it(
    `
      Given the page repository rejects with an HttpError
      When getProductsPage() runs
      Then the same HttpError propagates unchanged
    `,
    async () => {
      // Arrange
      const interactor = buildInteractor(
        {},
        { getPage: () => Promise.reject(serverHttpError) },
      );

      // Act
      const act = interactor.getProductsPage();

      // Assert
      await expect(act).rejects.toBe(serverHttpError);
    },
  );
});
