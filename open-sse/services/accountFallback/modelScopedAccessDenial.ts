/**
 * ModelScope lists models that individual keys cannot access in its public catalog.
 * Its `401 { error: { code: "invalid_model" } }` reports a MODEL denial, not a
 * revoked credential. Scope this exception to known ModelScope wire signatures;
 * an ordinary 401/403 must still expire or cool the credentials as usual.
 */
const MODELSCOPE_MODEL_MESSAGE =
  /the model does not exist or you do not have access to it(?:[.!?\s]|$)/i;
const MODELSCOPE_JSON_CODE = /["']code["']\s*:\s*["']invalid_model["']/i;
const INVALID_CREDENTIAL_MESSAGE =
  /\b(?:invalid|expired|revoked|missing)\s+(?:api[ -]?key|access[ -]?token|bearer[ -]?token)\b|\bauthentication expired\b/i;

export function isModelScopedAccessDenial(
  provider: string | null | undefined,
  status: number,
  errorText: unknown,
  structuredError?: { code?: unknown; message?: unknown } | null
): boolean {
  if (provider?.toLowerCase() !== "modelscope" || (status !== 401 && status !== 403)) {
    return false;
  }
  let text = "";
  if (typeof errorText === "string") text = errorText;
  else {
    try {
      text = JSON.stringify(errorText ?? "");
    } catch {
      return false;
    }
  }
  const structuredMessage =
    typeof structuredError?.message === "string" ? structuredError.message : "";
  if (INVALID_CREDENTIAL_MESSAGE.test([text, structuredMessage].join(" "))) return false;
  return (
    (typeof structuredError?.code === "string" &&
      structuredError.code.toLowerCase() === "invalid_model") ||
    MODELSCOPE_JSON_CODE.test(text) ||
    MODELSCOPE_MODEL_MESSAGE.test(text)
  );
}
