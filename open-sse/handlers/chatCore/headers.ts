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
 * Global no-log: the `noLogPayloads` settings key (default true = log payloads).
 * `false` = withhold request/response message content GLOBALLY. `true` or
 * absent = log payloads (today's behaviour). Pure; takes the settings record.
 */
export function isGlobalNoLogEnabled(settings: unknown): boolean {
  if (!settings || typeof settings !== "object") return false;
  const record = settings as Record<string, unknown>;
  // Either alias false opts out globally. Default true (logging ON).
  return record.noLogPayloads === false || record.loggingEnabled === false;
}

/**
 * Resolve the effective no-log decision for one request.
 *
 * Precedence (any true wins — monotonic, never un-logged by a lower tier):
 *   1. per-API-key `no_log` flag (true = withhold)
 *   2. per-request `x-omniroute-no-log` header (true = withhold)
 *   3. global `noLogPayloads` / `loggingEnabled` settings (default true = log
 *      payloads; false on either alias = withhold globally)
 *   4. per-connection `providerSpecificData.noLog` (true = withhold;
 *      false = allow logging unless another tier disables it)
 *   5. per-model flag `getModelNoLog(...)` (true = withhold;
 *      undefined = unset, falls through)
 *
 * The first two originals are kept as a positional overload so existing
 * callers/tests are untouched; the new tiered call passes an options object.
 * Pure so the OR matrix stays unit-testable without the chat handler.
 */
export function resolveNoLogEnabled(
  apiKeyInfo: { noLog?: unknown } | null | undefined,
  headers: Record<string, unknown> | Headers | null | undefined
): boolean;
export function resolveNoLogEnabled(options: {
  apiKeyInfo?: { noLog?: unknown } | null;
  headers?: Record<string, unknown> | Headers | null;
  /** Resolved global no-log (true = withhold). */
  globalNoLog?: boolean;
  /** Resolved per-connection no-log (true = withhold). */
  connectionNoLog?: boolean;
  /** Resolved per-model no-log (true = withhold; undefined = unset). */
  modelNoLog?: boolean | undefined;
}): boolean;
export function resolveNoLogEnabled(
  apiKeyOrOptions:
    | { noLog?: unknown }
    | {
        apiKeyInfo?: { noLog?: unknown } | null;
        headers?: Record<string, unknown> | Headers | null;
        globalNoLog?: boolean;
        connectionNoLog?: boolean;
        modelNoLog?: boolean | undefined;
      }
    | null
    | undefined,
  headers?: Record<string, unknown> | Headers | null | undefined
): boolean {
  const tiered = readTieredNoLogOptions(apiKeyOrOptions);
  if (tiered) return resolveTieredNoLog(tiered, headers);
  return (
    (apiKeyOrOptions as { noLog?: unknown } | null | undefined)?.noLog === true ||
    isNoLogRequested(headers)
  );
}

type TieredNoLogSource = {
  apiKeyInfo?: { noLog?: unknown } | null;
  headers?: Record<string, unknown> | Headers | null;
  globalNoLog?: boolean;
  connectionNoLog?: boolean;
  modelNoLog?: boolean | undefined;
};

function readTieredNoLogOptions(
  apiKeyOrOptions: { noLog?: unknown } | TieredNoLogSource | null | undefined
): TieredNoLogSource | null {
  if (!apiKeyOrOptions || typeof apiKeyOrOptions !== "object") return null;
  const record = apiKeyOrOptions as Record<string, unknown>;
  const isTiered = ["apiKeyInfo", "headers", "globalNoLog", "connectionNoLog", "modelNoLog"].some(
    (key) => key in record
  );
  return isTiered ? (apiKeyOrOptions as TieredNoLogSource) : null;
}

function resolveTieredNoLog(
  opts: TieredNoLogSource,
  _headers: Record<string, unknown> | Headers | null | undefined
): boolean {
  return (
    opts.apiKeyInfo?.noLog === true ||
    isNoLogRequested(opts.headers ?? null) ||
    opts.globalNoLog === true ||
    opts.connectionNoLog === true ||
    opts.modelNoLog === true
  );
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
