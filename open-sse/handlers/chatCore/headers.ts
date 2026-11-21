export function getHeaderValueCaseInsensitive(
  headers: Record<string, unknown> | Headers | null | undefined,
  targetName: string
) {
  if (!headers || typeof headers !== "object") return null;
  if (headers instanceof Headers) {
    return headers.get(targetName);
  }
  const lowered = targetName.toLowerCase();
  for (const [key, value] of Object.entries(headers)) {
    if (key.toLowerCase() === lowered && typeof value === "string" && value.trim()) {
      return value.trim();
    }
  }
  return null;
}

/**
 * Per-request opt-out of memory (and skills) injection via the
 * `x-omniroute-no-memory` header. Mirrors the existing `x-omniroute-no-cache`
 * convention. Truthy values: `true` / `1` / `yes` (case-insensitive). Clients that
 * manage their own context (RAG/memory) send this to avoid the gateway injecting
 * up to `memorySettings.maxTokens` (~2k) tokens — and being billed for them — on
 * every chat call. See _tasks/PRD-2026-06-19-no-memory-header.md.
 */
export function isNoMemoryRequested(
  headers: Record<string, unknown> | Headers | null | undefined
): boolean {
  const value = (getHeaderValueCaseInsensitive(headers, "x-omniroute-no-memory") || "")
    .trim()
    .toLowerCase();
  return value === "true" || value === "1" || value === "yes";
}

/**
 * Per-request opt-out of call-log payload persistence via the
 * `x-omniroute-no-log` header. Truthy values: `true` / `1` / `yes`
 * (case-insensitive). The request still produces a call-log row with its
 * timestamp, model, provider, status, duration and token counts, but the
 * request/response bodies and pipeline artifacts are not stored.
 *
 * This complements the per-API-key `no_log` flag: the key flag applies to every
 * request made with that key, while this header lets a client opt out for a
 * single request without creating a separate key. It does not affect Memory
 * extraction or the semantic cache; combine it with `x-omniroute-no-memory`
 * and `x-omniroute-no-cache` when a request must leave no content anywhere.
 */
export function isNoLogRequested(
  headers: Record<string, unknown> | Headers | null | undefined
): boolean {
  const value = (getHeaderValueCaseInsensitive(headers, "x-omniroute-no-log") || "")
    .trim()
    .toLowerCase();
  return value === "true" || value === "1" || value === "yes";
}

/**
 * Resolve the effective no-log decision for one request: the API key's persisted
 * `no_log` flag OR the per-request `x-omniroute-no-log` header. Pure so the
 * precedence stays testable without invoking the chat handler.
 */
export function resolveNoLogEnabled(
  apiKeyInfo: { noLog?: unknown } | null | undefined,
  headers: Record<string, unknown> | Headers | null | undefined
): boolean {
  return apiKeyInfo?.noLog === true || isNoLogRequested(headers);
}

/**
 * Per-request compression override via the `x-omniroute-compression` header. Mirrors the
 * `x-omniroute-no-memory` convention (#4290). Returns the raw trimmed value, or null when
 * absent/blank. The resolver (planFromHeader) owns interpretation and casing rules; this
 * helper only reads the wire.
 */
export function resolveCompressionHeader(
  headers: Record<string, unknown> | Headers | null | undefined
): string | null {
  const value = (getHeaderValueCaseInsensitive(headers, "x-omniroute-compression") || "").trim();
  return value || null;
}

/**
 * Per-request opt-in to unconditionally strip `reasoning_content` from the
 * non-streaming JSON response via the `x-omniroute-strip-reasoning` header.
 * Some clients (e.g. Firecrawl AI SDK) have JSON parsers that break on this
 * non-standard OpenAI extension even though it's syntactically valid, and even
 * on reasoning-only messages that the default sanitizer keeps. Truthy values:
 * `true` / `1` / `yes` (case-insensitive). Ported from upstream 9router#517
 * (closes upstream #509). Reasoning is still captured for the replay cache
 * before this header is consulted, so the cache feature is unaffected.
 */
export function isStripReasoningRequested(
  headers: Record<string, unknown> | Headers | null | undefined
): boolean {
  const value = (getHeaderValueCaseInsensitive(headers, "x-omniroute-strip-reasoning") || "")
    .trim()
    .toLowerCase();
  return value === "true" || value === "1" || value === "yes";
}
