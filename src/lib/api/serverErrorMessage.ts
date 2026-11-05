/**
 * Extract a human-readable message from a parsed API error body.
 *
 * OmniRoute API error bodies follow the shape produced by
 * `comboErrorResponse`/`buildErrorBody`:
 *
 *   { error: { message: string, details?: Array<{ message?: string }> } }
 *
 * As well as plain `{ error: string }` bodies emitted by simple routes (e.g.
 * "Combo name already exists" on POST /api/combos).
 *
 * Field-level validation errors (e.g. COMBO_002 or validateBody envelopes) carry
 * the most specific text in `error.details[0].message` or in
 * `error.details.firstMessage` / `error.details.issues.details[0]`.
 * This helper prefers the most specific available message, prefixes the
 * offending field name when present, and falls back to a caller-supplied
 * default when the body is missing, malformed, or not an object.
 */
export function resolveServerErrorMessage(body: unknown, fallback: string): string {
  if (!body || typeof body !== "object") return fallback;
  const error = (body as { error?: unknown }).error;
  if (typeof error === "string" && error.trim().length > 0) return error.trim();
  if (!error || typeof error !== "object") return fallback;

  const details = (error as { details?: unknown }).details;
  if (Array.isArray(details) && details.length > 0) {
    const first = details[0];
    if (first && typeof first === "object") {
      const rec = first as { field?: unknown; message?: unknown };
      const detailMessage = typeof rec.message === "string" ? rec.message : "";
      if (detailMessage.length > 0) {
        const prefix =
          typeof rec.field === "string" && rec.field.length > 0 ? `${rec.field}: ` : "";
        return `${prefix}${detailMessage}`;
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
