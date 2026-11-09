/**
 * Model-unavailable classification for the Codex SSE peek
 * (`peekCodexSseTransientError()` in ../codex.ts).
 *
 * ChatGPT-plan Codex accounts can reject a model with an HTTP 200
 * text/event-stream whose first meaningful event is `response.failed` / `error`
 * saying "The configured model is unavailable from the provider — it may have
 * been renamed, retired, or is not offered on this account." That failure is
 * model + account scoped, so the executor turns it into a model-scoped 400
 * (combo advances, the model is locked on this connection) instead of the 503
 * used for capacity errors (a provider-breaker status).
 *
 * Only the error message of complete error frames is matched — output text that
 * happens to quote the phrase is never classified.
 */

export const CODEX_SSE_MODEL_UNAVAILABLE_PATTERNS = [
  "configured model is unavailable from the provider",
  "not offered on this account",
] as const;
