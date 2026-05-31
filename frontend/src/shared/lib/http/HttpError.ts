import type { HttpErrorType } from "../constants";

export class HttpError extends Error {
  public readonly type: HttpErrorType;
  public readonly status?: number;
  constructor(message: string, type: HttpErrorType, status?: number) {
    super(message);
    this.name = "HttpError";
    this.type = type;
    this.status = status;
  }
}
