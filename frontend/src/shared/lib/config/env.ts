function required(value: string | undefined, name: string): string {
  if (!value) {
    throw new Error(
      `Missing environment variable ${name}. Copy .env.example to .env (see README).`,
    );
  }
  return value;
}

export const env = {
  apiUrl: required(import.meta.env.VITE_API_URL, "VITE_API_URL"),
  fakeStoreUrl: required(import.meta.env.VITE_FAKESTORE_URL, "VITE_FAKESTORE_URL"),
} as const;
