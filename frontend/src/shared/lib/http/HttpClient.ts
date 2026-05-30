import type { HttpClient } from "../entities/HttpClient";
import { HttpError } from "./HttpError";

export function createHttpClient(baseUrl: string): HttpClient {
  return {
    async get<T>(path: string): Promise<T> {
      let response: Response;

      try {
        response = await fetch(`${baseUrl}${path}`);
      } catch {
        throw new HttpError("Network error", "network");
      }

      if (!response.ok) {
        const type = response.status >= 500 ? "server" : "client";
        throw new HttpError(
          `Request failed (${response.status})`,
          type,
          response.status,
        );
      }

      try {
        return (await response.json()) as T;
      } catch {
        throw new HttpError("Invalid JSON response", "parse");
      }
    },
  };
}
