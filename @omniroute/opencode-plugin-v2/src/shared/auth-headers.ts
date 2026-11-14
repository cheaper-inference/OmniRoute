/**
 * Build request headers that always carry our bearer token.
 *
 * Header names are case-insensitive, but a plain object spread is not: a
 * caller-supplied `authorization` key would survive next to `Authorization`
 * and fetch would combine both values into one invalid header. `Headers.set`
 * replaces the value regardless of casing, so the token we own always wins
 * while every other caller header is preserved.
 */
export function buildAuthHeaders(
  extraHeaders: Record<string, string> | undefined,
  apiKey: string
): Headers {
  const headers = new Headers({ Accept: "application/json", ...(extraHeaders ?? {}) });
  headers.set("Authorization", `Bearer ${apiKey}`);
  return headers;
}

/**
 * The `headers` option without any `authorization` entry, compared
 * case-insensitively. Used where the headers are published for the host to
 * send (provider and model info), so a caller value can never sit next to,
 * or replace, the inference bearer token the host builds from `apiKey`.
 */
export function withoutAuthorizationHeader(
  extraHeaders: Record<string, string> | undefined
): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [name, value] of Object.entries(extraHeaders ?? {})) {
    if (name.trim().toLowerCase() !== "authorization") out[name] = value;
  }
  return out;
}
