/**
 * Pure, stateless helpers extracted from usageHistory.ts.
 * No DB access, no module-level state — safe to import anywhere.
 */

// #7879: re-export the canonical helper so existing consumers of this module
// keep importing `toNumber` from here unchanged.
export { toNumber } from "@/shared/utils/numeric";
// #13130: shared TPS math (generation-time denominator, reasoning-aware numerator).
import { resolveGenerationMs, resolveTpsOutputTokens } from "@/shared/utils/logTps";
import { toNumber as toNumberValue } from "@/shared/utils/numeric";

type JsonRecord = Record<string, unknown>;

export function asRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

export function toStringOrNull(value: unknown): string | null {
  return typeof value === "string" && value.trim().length > 0 ? value : null;
}

export function normalizeServiceTier(value: unknown): string {
  const tier = typeof value === "string" ? value.trim().toLowerCase() : "";
  if (tier === "priority" || tier === "fast") return "priority";
  if (tier === "flex") return "flex";
  return "standard";
}

/** One `usage_history` row as returned by getUsageDb / getUsageHistory. */
export function mapUsageHistoryRow(row: unknown) {
  const r = asRecord(row);
  return {
    provider: toStringOrNull(r.provider),
    model: toStringOrNull(r.model),
    connectionId: toStringOrNull(r.connection_id),
    apiKeyId: toStringOrNull(r.api_key_id),
    apiKeyName: toStringOrNull(r.api_key_name),
    serviceTier: normalizeServiceTier(r.service_tier),
    providerCredits: r.provider_credits ?? null,
    providerCostUsd: r.provider_cost_usd ?? null,
    tokens: {
      input: r.tokens_input === null ? null : toNumberValue(r.tokens_input),
      output: r.tokens_output === null ? null : toNumberValue(r.tokens_output),
      cacheRead: toNumberValue(r.tokens_cache_read),
      cacheCreation: toNumberValue(r.tokens_cache_creation),
      reasoning: toNumberValue(r.tokens_reasoning),
    },
    status: toStringOrNull(r.status),
    success: toNumberValue(r.success) === 1,
    latencyMs: toNumberValue(r.latency_ms),
    timeToFirstTokenMs: toNumberValue(r.ttft_ms),
    errorCode: toStringOrNull(r.error_code),
    timestamp: toStringOrNull(r.timestamp),
    cpaAuthIndex: toStringOrNull(r.cpa_auth_index),
    cpaAccountLabel: null as string | null,
  };
}

export function percentile(sortedValues: number[], p: number): number {
  if (sortedValues.length === 0) return 0;
  if (sortedValues.length === 1) return sortedValues[0];
  const bounded = Math.max(0, Math.min(1, p));
  const idx = Math.round((sortedValues.length - 1) * bounded);
  return sortedValues[idx] ?? sortedValues[sortedValues.length - 1];
}

export function stdDev(values: number[], avg: number): number {
  if (values.length <= 1) return 0;
  const variance = values.reduce((acc, v) => acc + (v - avg) ** 2, 0) / values.length;
  return Math.sqrt(Math.max(0, variance));
}

export function mean(values: number[]): number {
  return values.length > 0 ? values.reduce((acc, n) => acc + n, 0) / values.length : 0;
}

/** Resolve a positive-numeric option, falling back when unset/non-finite/<=0. */
export function resolvePositiveOption(value: unknown, fallback: number): number {
  const n = Number(value);
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

/** Per-key accumulator buckets used by getModelLatencyStats() (#6875). */
export interface LatencySampleBuckets {
  successfulLatencies: number[];
  allLatencies: number[];
  successfulTtfts: number[];
  allTtfts: number[];
  successfulTps: number[];
  allTps: number[];
}

/**
 * Push one usage_history row's latency/TTFT/tokens-per-second sample into the
 * accumulator buckets. Guards divide-by-zero by only deriving a tokens/sec
 * sample when both latencyMs and tokensOutput are positive; rows with
 * latencyMs <= 0 are skipped entirely, mirroring the pre-existing
 * allLatencies/successfulLatencies guard.
 *
 * #13130: the TPS sample measures GENERATION throughput, per the rule in
 * open-sse/utils/generationThroughput.ts ("tok/s MUST exclude TTFT"):
 *   - denominator: latencyMs - ttftMs when TTFT is known and sane, else the
 *     full latency (a degraded denominator is better than no sample);
 *   - numerator: max(tokensOutput, tokensReasoning) — providers are expected
 *     to fold reasoning into output tokens, but a provider that excludes them
 *     while still reporting tokens_reasoning would otherwise undercount.
 */
export function accumulateLatencySample(
  buckets: LatencySampleBuckets,
  latencyMs: number,
  ttftMs: number,
  tokensOutput: number,
  isSuccess: boolean,
  tokensReasoning = 0
): void {
  if (latencyMs <= 0) return;
  buckets.allLatencies.push(latencyMs);
  if (ttftMs > 0) buckets.allTtfts.push(ttftMs);
  const tpsTokens = resolveTpsOutputTokens(tokensOutput, tokensReasoning);
  const generationMs = resolveGenerationMs(latencyMs, ttftMs);
  const tps =
    tpsTokens > 0 && generationMs !== null && generationMs > 0
      ? tpsTokens / (generationMs / 1000)
      : null;
  if (tps !== null) buckets.allTps.push(tps);
  if (!isSuccess) return;
  buckets.successfulLatencies.push(latencyMs);
  if (ttftMs > 0) buckets.successfulTtfts.push(ttftMs);
  if (tps !== null) buckets.successfulTps.push(tps);
}

/** Per-provider/model accumulator for getModelLatencyStats() (#6875). */
export interface LatencyBucket extends LatencySampleBuckets {
  provider: string;
  model: string;
  totalRequests: number;
  successfulRequests: number;
}

export function createLatencyBucket(provider: string, model: string): LatencyBucket {
  return {
    provider,
    model,
    totalRequests: 0,
    successfulRequests: 0,
    successfulLatencies: [],
    allLatencies: [],
    successfulTtfts: [],
    allTtfts: [],
    successfulTps: [],
    allTps: [],
  };
}

/** Aggregate view returned per provider/model key by getModelLatencyStats(). */
export interface ModelLatencyStatsEntry {
  provider: string;
  model: string;
  key: string;
  totalRequests: number;
  successfulRequests: number;
  successRate: number; // 0..1
  avgLatencyMs: number;
  p50LatencyMs: number;
  p95LatencyMs: number;
  p99LatencyMs: number;
  latencyStdDev: number;
  windowHours: number;
  /** Mean time-to-first-token (ms) across the same sample set as avgLatencyMs. */
  avgTtftMs: number;
  /**
   * End-to-end latency (ms). Aliases avgLatencyMs: usage_history has no
   * distinct second latency column beyond latency_ms/ttft_ms, so latency_ms
   * already represents the full request wall-clock time (#6875).
   */
  avgE2ELatencyMs: number;
  /** Mean output tokens/sec across successful rows (tokens_output / (latency_ms/1000)). */
  avgTokensPerSecond: number;
}

/**
 * Reduce one accumulator bucket into its final ModelLatencyStatsEntry, or
 * null when the effective sample count is below minSamples. Falls back from
 * successful-only to all-sample data for latency/TTFT/tokens-per-second
 * consistently (mirrors the pre-existing avgLatencyMs fallback behavior).
 */
export function buildLatencyStatsEntry(
  key: string,
  bucket: LatencyBucket,
  minSamples: number,
  windowHours: number
): ModelLatencyStatsEntry | null {
  const useSuccessful = bucket.successfulLatencies.length >= minSamples;
  const baseLatencies = useSuccessful ? bucket.successfulLatencies : bucket.allLatencies;
  if (baseLatencies.length < minSamples) return null;

  const baseTtfts = useSuccessful ? bucket.successfulTtfts : bucket.allTtfts;
  const baseTps = useSuccessful ? bucket.successfulTps : bucket.allTps;

  const sorted = [...baseLatencies].sort((a, b) => a - b);
  const avg = mean(sorted);
  const successRate =
    bucket.totalRequests > 0 ? bucket.successfulRequests / bucket.totalRequests : 0;

  return {
    provider: bucket.provider,
    model: bucket.model,
    key,
    totalRequests: bucket.totalRequests,
    successfulRequests: bucket.successfulRequests,
    successRate,
    avgLatencyMs: Math.round(avg),
    p50LatencyMs: Math.round(percentile(sorted, 0.5)),
    p95LatencyMs: Math.round(percentile(sorted, 0.95)),
    p99LatencyMs: Math.round(percentile(sorted, 0.99)),
    latencyStdDev: Math.round(stdDev(sorted, avg)),
    windowHours,
    avgTtftMs: Math.round(mean(baseTtfts)),
    avgE2ELatencyMs: Math.round(avg),
    avgTokensPerSecond: Math.round(mean(baseTps) * 100) / 100,
  };
}

/** One usage_history row as read by getConnectionSpeedStats(), newest first. */
export interface ConnectionSpeedRow {
  model: unknown;
  latency_ms: unknown;
  ttft_ms: unknown;
  tokens_output: unknown;
  tokens_reasoning: unknown;
}

export interface ConnectionSpeedSummary {
  /** Mean decode tokens/sec (generation window: latency - TTFT). */
  avgTps: number;
  /** Decode tokens/sec of the newest usable row. */
  lastTps: number;
  medianTps: number;
  /** Mean TTFT over the rows that recorded one; null when none did. */
  avgTtftMs: number | null;
  samples: number;
}

export interface ConnectionSpeedStats extends ConnectionSpeedSummary {
  /** Per-model breakdown, most-sampled first. */
  byModel: Array<ConnectionSpeedSummary & { model: string }>;
}

/** Shorter generation windows are dominated by overhead/jitter, so they are skipped. */
export const MIN_SPEED_WINDOW_MS = 300;

interface SpeedSample {
  tps: number;
  ttftMs: number;
}

function summarizeSpeedSamples(samples: SpeedSample[]): ConnectionSpeedSummary {
  const sorted = samples.map((s) => s.tps).sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  const median = sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
  const ttfts = samples.map((s) => s.ttftMs).filter((ms) => ms > 0);
  const round2 = (n: number) => Math.round(n * 100) / 100;
  return {
    avgTps: round2(mean(sorted)),
    lastTps: round2(samples[0].tps),
    medianTps: round2(median),
    avgTtftMs: ttfts.length > 0 ? Math.round(mean(ttfts)) : null,
    samples: samples.length,
  };
}

/**
 * Reduce one connection's recent rows (newest first) into decode-speed stats,
 * using the same TPS math as the request logger (#13130 helpers), or null when
 * no row yields a usable sample.
 */
export function summarizeConnectionSpeed(rows: ConnectionSpeedRow[]): ConnectionSpeedStats | null {
  const all: SpeedSample[] = [];
  const byModel = new Map<string, SpeedSample[]>();
  for (const row of rows) {
    const tokens = resolveTpsOutputTokens(Number(row.tokens_output), Number(row.tokens_reasoning));
    const ttftMs = Number(row.ttft_ms) || 0;
    const windowMs = resolveGenerationMs(Number(row.latency_ms), ttftMs);
    if (tokens <= 0 || windowMs === null || windowMs < MIN_SPEED_WINDOW_MS) continue;
    const sample = { tps: (tokens * 1000) / windowMs, ttftMs };
    all.push(sample);
    const model = toStringOrNull(row.model) ?? "unknown";
    const list = byModel.get(model);
    if (list) list.push(sample);
    else byModel.set(model, [sample]);
  }
  if (all.length === 0) return null;
  return {
    ...summarizeSpeedSamples(all),
    byModel: [...byModel.entries()]
      .map(([model, list]) => ({ model, ...summarizeSpeedSamples(list) }))
      .sort((a, b) => b.samples - a.samples),
  };
}

export const MAX_PREVIEW_DEPTH = 6;
export const MAX_PREVIEW_STRING = 1200;
export const MAX_PREVIEW_ARRAY_ITEMS = 12;
export const MAX_PREVIEW_OBJECT_KEYS = 24;

function slicePrefixWithoutSplitSurrogate(value: string, end: number): string {
  const code = end > 0 ? value.charCodeAt(end - 1) : 0;
  // A cut that keeps a high surrogate (U+D800–U+DBFF) without its pair becomes
  // U+FFFD in the Buffer round-trip below. Shorten by one code unit instead.
  const cut = code >= 0xd800 && code <= 0xdbff ? end - 1 : end;
  return value.slice(0, cut);
}

function truncatePreviewString(value: string): string {
  if (value.length <= MAX_PREVIEW_STRING) return value;
  // Detach the preview from its source. A bare String#slice() returns a V8
  // SlicedString that keeps the whole parent string alive, so the pending pool
  // would retain full multi-megabyte request bodies while only accounting for
  // the visible preview. Pull the cut off a trailing high surrogate first.
  const head = slicePrefixWithoutSplitSurrogate(value, MAX_PREVIEW_STRING);
  return Buffer.from(`${head}...`, "utf8").toString("utf8");
}

function previewTree(value: unknown, depth: number, cutStrings: boolean): unknown {
  if (depth >= MAX_PREVIEW_DEPTH) {
    return "[TRUNCATED_DEPTH]";
  }

  if (typeof value === "string") {
    return cutStrings ? truncatePreviewString(value) : value;
  }

  if (Array.isArray(value)) {
    const preview = value
      .slice(0, MAX_PREVIEW_ARRAY_ITEMS)
      .map((item) => previewTree(item, depth + 1, cutStrings));
    if (value.length > MAX_PREVIEW_ARRAY_ITEMS) {
      preview.push({ _truncatedItems: value.length - MAX_PREVIEW_ARRAY_ITEMS });
    }
    return preview;
  }

  if (!value || typeof value !== "object" || ArrayBuffer.isView(value)) {
    return value;
  }

  const entries = Object.entries(value as JsonRecord);
  const truncatedEntries = entries
    .slice(0, MAX_PREVIEW_OBJECT_KEYS)
    .map(([key, entryValue]) => [key, previewTree(entryValue, depth + 1, cutStrings)]);
  const preview = Object.fromEntries(truncatedEntries);

  if (entries.length > MAX_PREVIEW_OBJECT_KEYS) {
    preview._truncatedKeys = entries.length - MAX_PREVIEW_OBJECT_KEYS;
  }

  return preview;
}

export function truncatePendingPreview(value: unknown): unknown {
  return previewTree(value, 0, true);
}

export function prunePendingPreview(value: unknown): unknown {
  return previewTree(value, 0, false);
}

export function truncatePendingPreviewStrings(value: unknown): unknown {
  if (typeof value === "string") return truncatePreviewString(value);
  if (Array.isArray(value)) return value.map(truncatePendingPreviewStrings);
  if (!value || typeof value !== "object") return value;
  return Object.fromEntries(
    Object.entries(value as JsonRecord).map(([key, entryValue]) => [
      key,
      truncatePendingPreviewStrings(entryValue),
    ])
  );
}
