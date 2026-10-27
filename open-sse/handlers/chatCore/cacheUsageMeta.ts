/**
 * chatCore cache-usage log meta helpers (Quality Gate v2 / Fase 9 — chatCore god-file decomposition,
 * #3501).
 *
 * Pure helpers extracted from chatCore: coerce an unknown to a positive number, derive cache
 * read/creation token counts from a usage object (handling both top-level and prompt_tokens_details
 * shapes), and attach an `_omniroute` meta blob to a log payload. Side-effect-free; behaviour is
 * byte-identical to the previous module-level functions.
 */

export type GeminiPromptCacheMode = "off" | "implicit";
export type GeminiPromptCacheEvidence = "hit" | "miss" | "unreported" | "invalid";

export type GeminiPromptCacheLogOptions = {
  mode: GeminiPromptCacheMode;
  evidence?: GeminiPromptCacheEvidence;
  compressionTokens?: number | null;
  timing?: { ttftMs?: number | null; itlMs?: number | null };
};

export function toPositiveNumber(value: unknown) {
  return typeof value === "number" && Number.isFinite(value) && value > 0 ? value : 0;
}

function toNonNegativeNumber(value: unknown) {
  return typeof value === "number" && Number.isFinite(value) && value >= 0 ? value : null;
}

function isGeminiCacheEvidence(value: unknown): value is GeminiPromptCacheEvidence {
  return value === "hit" || value === "miss" || value === "unreported" || value === "invalid";
}

function resolveGeminiCacheEvidence(
  rawEvidence: unknown,
  providerCachedTokens: number | null,
  hasCacheFields: boolean
): GeminiPromptCacheEvidence {
  if (isGeminiCacheEvidence(rawEvidence)) return rawEvidence;
  if (providerCachedTokens !== null) return providerCachedTokens > 0 ? "hit" : "miss";
  return hasCacheFields ? "invalid" : "unreported";
}

function buildGeminiTimingMeta(timing: GeminiPromptCacheLogOptions["timing"]) {
  const ttftMs = toNonNegativeNumber(timing?.ttftMs);
  const itlMs = toNonNegativeNumber(timing?.itlMs);
  if (ttftMs === null && itlMs === null) return {};
  return {
    timing: {
      ...(ttftMs !== null ? { ttftMs } : {}),
      ...(itlMs !== null ? { itlMs } : {}),
    },
  };
}

function buildGeminiPromptCacheMeta(
  usageRecord: Record<string, unknown>,
  promptTokenDetails: Record<string, unknown> | undefined,
  hasCacheFields: boolean,
  geminiOptions: GeminiPromptCacheLogOptions
) {
  const providerCachedTokens = toNonNegativeNumber(
    usageRecord.cached_tokens ?? promptTokenDetails?.cached_tokens
  );
  const evidence = resolveGeminiCacheEvidence(
    geminiOptions.evidence ?? usageRecord.cache_evidence,
    providerCachedTokens,
    hasCacheFields
  );
  const compressionTokens = toPositiveNumber(geminiOptions.compressionTokens);
  return {
    schemaVersion: 1,
    mode: geminiOptions.mode,
    evidence,
    providerCounters: {
      ...(providerCachedTokens !== null ? { cachedContentTokenCount: providerCachedTokens } : {}),
    },
    prefixBoundary: "unknown",
    prefixMethod: "unavailable",
    ...(compressionTokens > 0
      ? { compressionDecision: { applied: true, tokens: compressionTokens } }
      : {}),
    ...buildGeminiTimingMeta(geminiOptions.timing),
  };
}

function hasCacheUsageFields(
  usageRecord: Record<string, unknown>,
  promptTokenDetails: Record<string, unknown> | undefined
): boolean {
  // `cache_write_tokens` is the cache-creation alias emitted by OpenRouter, Devin
  // Desktop and the codex-chatgpt-web bridge; without it an OpenAI-shaped usage
  // payload logged a cache write of 0 for a model that actually reported one.
  return (
    "cache_read_input_tokens" in usageRecord ||
    "cached_tokens" in usageRecord ||
    "cache_creation_input_tokens" in usageRecord ||
    "cache_write_tokens" in usageRecord ||
    (!!promptTokenDetails &&
      ("cached_tokens" in promptTokenDetails ||
        "cache_creation_tokens" in promptTokenDetails ||
        "cache_write_tokens" in promptTokenDetails))
  );
}

export function buildCacheUsageLogMeta(
  usage: Record<string, unknown> | null | undefined,
  geminiOptions?: GeminiPromptCacheLogOptions
) {
  const usageRecord = usage && typeof usage === "object" ? usage : {};
  const promptTokenDetails =
    usageRecord.prompt_tokens_details && typeof usageRecord.prompt_tokens_details === "object"
      ? (usageRecord.prompt_tokens_details as Record<string, unknown>)
      : undefined;
  const hasCacheFields = hasCacheUsageFields(usageRecord, promptTokenDetails);
  const cacheReadTokens = toPositiveNumber(
    usageRecord.cache_read_input_tokens ??
      usageRecord.cached_tokens ??
      promptTokenDetails?.cached_tokens
  );
  const cacheCreationTokens = toPositiveNumber(
    usageRecord.cache_creation_input_tokens ??
      promptTokenDetails?.cache_creation_tokens ??
      promptTokenDetails?.cache_write_tokens ??
      usageRecord.cache_write_tokens
  );

  const geminiPromptCache = geminiOptions
    ? buildGeminiPromptCacheMeta(usageRecord, promptTokenDetails, hasCacheFields, geminiOptions)
    : null;

  if (!hasCacheFields && !geminiPromptCache) return null;
  return {
    ...(hasCacheFields ? { cacheReadTokens, cacheCreationTokens } : {}),
    ...(geminiPromptCache ? { geminiPromptCache } : {}),
  };
}

export function attachLogMeta(
  payload: Record<string, unknown> | null | undefined,
  meta: Record<string, unknown> | null | undefined
) {
  if (!meta || typeof meta !== "object") return payload;
  const compactMeta = Object.fromEntries(
    Object.entries(meta).filter(([, value]) => value !== null && value !== undefined)
  );
  if (Object.keys(compactMeta).length === 0) return payload;
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return { _omniroute: compactMeta, _payload: payload ?? null };
  }
  const existing =
    payload._omniroute &&
    typeof payload._omniroute === "object" &&
    !Array.isArray(payload._omniroute)
      ? payload._omniroute
      : {};
  return {
    ...payload,
    _omniroute: {
      ...existing,
      ...compactMeta,
    },
  };
}
