import { describe, it, expect, vi, afterEach } from "vitest";
import { createHttpClient } from "./HttpClient";
import { HttpError } from "./HttpError";

const BASE_URL = "https://api.test";

function stubFetch(impl: () => Promise<Response> | Response): void {
  vi.stubGlobal("fetch", vi.fn(impl));
}

function fakeResponse(body: unknown, ok: boolean, status: number): Response {
  return {
    ok,
    status,
    json: async () => body,
  } as unknown as Response;
}

describe("Feature: createHttpClient classifies HTTP outcomes into a typed HttpError", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it(
    `
      Given the server responds 200 with valid JSON
      When get() is called
      Then it resolves with the parsed body
    `,
    async () => {
      // Arrange
      stubFetch(() => fakeResponse({ id: 1 }, true, 200));
      const client = createHttpClient(BASE_URL);

      // Act
      const body = await client.get<{ id: number }>("/thing");

      // Assert
      expect(body).toEqual({ id: 1 });
    },
  );

  it.each([
    { status: 500, expectedType: "server" },
    { status: 503, expectedType: "server" },
    { status: 404, expectedType: "client" },
    { status: 400, expectedType: "client" },
  ])(
    `
      Given the server responds $status
      When get() is called
      Then it throws an HttpError of type "$expectedType" carrying the status
    `,
    async ({ status, expectedType }) => {
      // Arrange
      stubFetch(() => fakeResponse(null, false, status));
      const client = createHttpClient(BASE_URL);

      // Act
      const act = client.get("/thing");

      // Assert
      await expect(act).rejects.toBeInstanceOf(HttpError);
      await expect(act).rejects.toMatchObject({ type: expectedType, status });
    },
  );

  it(
    `
      Given fetch rejects because there is no connectivity
      When get() is called
      Then it throws an HttpError of type "network"
    `,
    async () => {
      // Arrange
      stubFetch(() => Promise.reject(new TypeError("Failed to fetch")));
      const client = createHttpClient(BASE_URL);

      // Act
      const act = client.get("/thing");

      // Assert
      await expect(act).rejects.toMatchObject({ type: "network" });
    },
  );

  it(
    `
      Given the response body is not valid JSON
      When get() is called
      Then it throws an HttpError of type "parse"
    `,
    async () => {
      // Arrange
      stubFetch(
        () =>
          ({
            ok: true,
            status: 200,
            json: async () => {
              throw new SyntaxError("Unexpected end of JSON input");
            },
          }) as unknown as Response,
      );
      const client = createHttpClient(BASE_URL);

      // Act
      const act = client.get("/thing");

      // Assert
      await expect(act).rejects.toMatchObject({ type: "parse" });
    },
  );
});
