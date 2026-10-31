/**
 * Request-shape rejections: an upstream 4xx that describes the SHAPE of this request
 * (schema mismatch / unsupported argument), not the health of the account.
 *
 * Single source of truth shared by `markAccountUnavailable` (no cooldown) and the chat
 * handler (return the error instead of cooling the connection down).
 */

const REQUEST_SHAPE_ERROR_RE =
  /failed to deserialize the json body|unknown variant `|missing field `|argument not supported|unknown content type|invalid request content/i;

/** xAI reports auth/quota as 401/403/429 — its 400/422 are always about the request body. */
const REQUEST_SHAPE_ALL_4XX_PROVIDERS = new Set(["xai", "xai-oauth", "xao"]);

/**
 * - xAI family: every 400/422 is a request-shape error.
 * - Any other provider: only a 422 whose body is a deserialization/schema message
 *   (a generic 400 stays on the normal fallback/cooldown path).
 */
export function isRequestShapeError(
  status: unknown,
  errorText: unknown,
  provider: string | null = null
): boolean {
  const code = Number(status);
  if (code !== 400 && code !== 422) return false;
  if (provider && REQUEST_SHAPE_ALL_4XX_PROVIDERS.has(provider)) return true;
  if (code !== 422) return false;
  return REQUEST_SHAPE_ERROR_RE.test(typeof errorText === "string" ? errorText : "");
}
