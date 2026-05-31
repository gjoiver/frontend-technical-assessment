import type { HttpErrorType } from "@shared/lib/constants";

export const productsI18n = {
  title: "Productos",
  pagination: {
    perPage: "por página",
    prev: "Página anterior",
    next: "Página siguiente",
  },
  page: (current: number, total: number) => `Página ${current} de ${total}`,
  errors: {
    server: "Error del servidor, intenta más tarde",
    client: "No pudimos cargar los productos",
    network: "Revisa tu conexión a internet",
    parse: "Respuesta inesperada del servidor",
    unknown: "Algo salió mal",
  } satisfies Record<HttpErrorType | "unknown", string>,
} as const;
