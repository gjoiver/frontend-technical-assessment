import { describe, it, expect } from "vitest";
import {
  serverHttpError,
  clientHttpError,
  networkHttpError,
  parseHttpError,
  nonHttpError,
} from "@products/data/mocks";
import { resolveProductsError } from "./resolveProductsError";
import { productsI18n } from "./products.i18n";

describe("Feature: resolveProductsError maps a failure to a localized message by its HttpError type", () => {
  it.each([
    { type: "server", error: serverHttpError, expected: productsI18n.errors.server },
    { type: "client", error: clientHttpError, expected: productsI18n.errors.client },
    { type: "network", error: networkHttpError, expected: productsI18n.errors.network },
    { type: "parse", error: parseHttpError, expected: productsI18n.errors.parse },
  ])(
    `
      Given an HttpError of type "$type"
      When resolveProductsError maps it
      Then it returns the localized message for that type
    `,
    ({ error, expected }) => {
      // Act
      const message = resolveProductsError(error);

      // Assert
      expect(message).toBe(expected);
    },
  );

  it(
    `
      Given an error that is not an HttpError
      When resolveProductsError maps it
      Then it falls back to the unknown message
    `,
    () => {
      // Arrange
      const error = nonHttpError;

      // Act
      const message = resolveProductsError(error);

      // Assert
      expect(message).toBe(productsI18n.errors.unknown);
    },
  );
});
