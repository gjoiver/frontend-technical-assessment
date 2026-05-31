import { HttpError } from "@shared/lib/http/HttpError";
import { productsI18n } from "./products.i18n";

export function resolveProductsError(error: unknown): string {
  if (error instanceof HttpError) {
    return productsI18n.errors[error.type] ?? productsI18n.errors.unknown;
  }
  return productsI18n.errors.unknown;
}
