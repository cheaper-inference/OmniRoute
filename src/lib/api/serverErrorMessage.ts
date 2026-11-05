/**
 * Extract a human-readable message from a parsed API error body.
 *
 * OmniRoute API error bodies follow the shape produced by
 * `comboErrorResponse`/`buildErrorBody`:
 *
 *   { error: { message: string, details?: Array<{ message?: string }> } }
 *
 * Field-level validation errors (e.g. COMBO_002) carry the most specific
 * text in `error.details[0].message` or in `error.details.firstMessage` /
 * `error.details.issues.details[0]`; other errors carry it in `error.message`.
 * This helper prefers the most specific available message and falls back to a
 * caller-supplied default when the body is missing, malformed, or not an
 * object — so a failed `fetch().json()` (which may be `null`) never throws at
 * the call site.
 */
export function resolveServerErrorMessage(body: unknown, fallback: string): string {
  if (!body || typeof body !== "object") return fallback;
  const error = (body as { error?: unknown }).error;
  if (!error || typeof error !== "object") return fallback;

  const details = (error as { details?: unknown }).details;
  if (Array.isArray(details) && details.length > 0) {
    const first = details[0];
    if (first && typeof first === "object") {
      const detailMessage = (first as { message?: unknown }).message;
      if (typeof detailMessage === "string" && detailMessage.length > 0) {
        return detailMessage;
      }
    }
  }

  if (details && typeof details === "object" && !Array.isArray(details)) {
    const rec = details as Record<string, unknown>;
    if (typeof rec.firstMessage === "string" && rec.firstMessage.length > 0) {
      const prefix =
        typeof rec.firstField === "string" && rec.firstField.length > 0
          ? `${rec.firstField}: `
          : "";
      return `${prefix}${rec.firstMessage}`;
    }
    const issues = rec.issues as
      { details?: Array<{ field?: string; message?: string }> } | undefined;
    if (Array.isArray(issues?.details) && issues.details.length > 0) {
      const first = issues.details[0];
      if (first && typeof first.message === "string" && first.message.length > 0) {
        const prefix =
          typeof first.field === "string" && first.field.length > 0 ? `${first.field}: ` : "";
        return `${prefix}${first.message}`;
      }
    }
  }

  const message = (error as { message?: unknown }).message;
  if (typeof message === "string" && message.length > 0) return message;

  return fallback;
}
