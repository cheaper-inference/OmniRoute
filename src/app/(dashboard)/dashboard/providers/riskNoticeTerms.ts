/**
 * Terms-of-Service links surfaced in the pre-connect risk notice.
 *
 * Kept as a zero-dependency leaf so the dashboard can resolve the link without
 * importing a client component and unit tests can assert it without React.
 */

const RISK_NOTICE_TERMS_URLS: Readonly<Record<string, string>> = {
  "gemini-app": "https://policies.google.com/terms",
};

/** Returns the provider-specific ToS URL, or undefined when none applies. */
export function getRiskNoticeTermsUrl(providerId: string): string | undefined {
  return RISK_NOTICE_TERMS_URLS[providerId];
}

/**
 * Detects the Gemini App "accept current ToS" precondition from the fields that
 * survive sanitization: the HTTP status and the actionable error message. The
 * public error identifier is intentionally not used here — `buildErrorBody()`
 * projects unknown `NATIVE_*` codes to an empty string.
 */
export function isGeminiAppTosPreconditionError(
  status: number | null,
  message: string | null,
  model?: string
): boolean {
  const nativeModel =
    typeof model === "string" && /gemini-(neon|hydrogen|flash-lite|argon)/.test(model);
  return /Terms of Service/i.test(message ?? "") || (status === 428 && nativeModel);
}

/** Extract an in-band SSE error message without relying on a public error code. */
export function extractSseErrorMessage(payload: unknown, isErrorEvent: boolean): string | null {
  if (payload === null || typeof payload !== "object") return null;
  const record = payload as { error?: { message?: unknown }; message?: unknown };
  const candidate = record.error?.message ?? (isErrorEvent ? record.message : undefined);
  return typeof candidate === "string" && candidate.trim() ? candidate : null;
}
