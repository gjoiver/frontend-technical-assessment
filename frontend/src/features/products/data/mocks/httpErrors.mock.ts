import { HttpError } from "@shared/lib/http/HttpError";

export const serverHttpError = new HttpError("Internal Server Error", "server", 500);
export const clientHttpError = new HttpError("Not Found", "client", 404);
export const networkHttpError = new HttpError("Failed to fetch", "network");
export const parseHttpError = new HttpError("Unexpected end of JSON input", "parse");

export const nonHttpError = new Error("Something totally unexpected");
