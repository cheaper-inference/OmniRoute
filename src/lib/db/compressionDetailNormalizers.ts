// Normalizers for the compression engine DETAIL settings sub-objects that persist to a
// single key_value row each (settings.sessionDedup / settings.ccr / settings.contextRollover).
// Extracted out of
// src/lib/db/compression.ts (frozen at cap by file-size-baseline.json — see
// scripts/check/check-file-size.mjs) rather than growing that file inline.
//
// #8388: session-dedup and ccr detail fields (minBlockChars/fuzzy, minChars/
// retrievalRampFactor) were editable on the EngineConfigPage detail form but had no
// persisted sub-object — mirrors the #8056 headroom/minRows fix (normalizeHeadroomConfig
// in compression.ts), extended to the two engines #8056 left uncovered.
import {
  DEFAULT_CCR_CONFIG,
  DEFAULT_CONTEXT_ROLLOVER_CONFIG,
  DEFAULT_SESSION_DEDUP_CONFIG,
  type CcrConfig,
  type CompressionConfig,
  type ContextRolloverConfig,
  type SessionDedupConfig,
} from "@omniroute/open-sse/services/compression/types.ts";

function toRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" ? (value as Record<string, unknown>) : {};
}

function boundedInt(value: unknown, fallback: number, min: number, max: number): number {
  if (typeof value !== "number" || !Number.isFinite(value)) return fallback;
  return Math.min(max, Math.max(min, Math.floor(value)));
}

function boundedNumber(value: unknown, fallback: number, min: number, max: number): number {
  if (typeof value !== "number" || !Number.isFinite(value)) return fallback;
  return Math.min(max, Math.max(min, value));
}

/** Matches SESSION_DEDUP_SCHEMA bounds (engines/session-dedup/index.ts). */
export function normalizeSessionDedupConfig(value: unknown): SessionDedupConfig {
  const record = toRecord(value);
  return {
    ...DEFAULT_SESSION_DEDUP_CONFIG,
    minBlockChars: boundedInt(
      record.minBlockChars,
      DEFAULT_SESSION_DEDUP_CONFIG.minBlockChars,
      1,
      100000
    ),
    fuzzy: typeof record.fuzzy === "boolean" ? record.fuzzy : DEFAULT_SESSION_DEDUP_CONFIG.fuzzy,
  };
}

/** Matches CCR_SCHEMA bounds (engines/ccr/index.ts). */
export function normalizeCcrConfig(value: unknown): CcrConfig {
  const record = toRecord(value);
  return {
    ...DEFAULT_CCR_CONFIG,
    minChars: boundedInt(record.minChars, DEFAULT_CCR_CONFIG.minChars, 100, 1_000_000),
    // Fractional by design: CCR_SCHEMA has no .int() and effectiveMinChars() ramps on
    // fractions — flooring here would turn any factor in [1, 2) into 1, disabling the ramp.
    retrievalRampFactor: boundedNumber(
      record.retrievalRampFactor,
      DEFAULT_CCR_CONFIG.retrievalRampFactor,
      1,
      100
    ),
  };
}

function normalizeKeyList(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  const keys = value
    .filter((item): item is string => typeof item === "string")
    .map((item) => item.trim())
    .filter(Boolean);
  return [...new Set(keys)];
}

/** Matches the append-preserving-ccr engine bounds (engines/appendPreservingCcr/index.ts). */
export function normalizeContextRolloverConfig(value: unknown): ContextRolloverConfig {
  const record = toRecord(value);
  const d = DEFAULT_CONTEXT_ROLLOVER_CONFIG;
  return {
    ...d,
    enabled: typeof record.enabled === "boolean" ? record.enabled : d.enabled,
    triggerPercent: boundedInt(record.triggerPercent, d.triggerPercent, 1, 100),
    preserveRecentPercent: boundedInt(record.preserveRecentPercent, d.preserveRecentPercent, 1, 90),
    minArchiveChars: boundedInt(record.minArchiveChars, d.minArchiveChars, 1, 1_000_000),
    minRetainedMessages: boundedInt(record.minRetainedMessages, d.minRetainedMessages, 1, 100),
    maxArchiveSectionChars: boundedInt(
      record.maxArchiveSectionChars,
      d.maxArchiveSectionChars,
      1_000,
      1_000_000
    ),
    excludedModelKeys: normalizeKeyList(record.excludedModelKeys),
    currentPromptPipeline: normalizeKeyList(record.currentPromptPipeline),
  };
}

/** Default sub-objects spread into getCompressionSettings' seed config. */
export function buildDetailConfigDefaults(): Pick<CompressionConfig, "sessionDedup" | "ccr"> {
  return {
    sessionDedup: normalizeSessionDedupConfig(undefined),
    ccr: normalizeCcrConfig(undefined),
  };
}

/** Applies a stored detail row onto config during getCompressionSettings' row scan. */
export function applyDetailConfigUpdate(
  config: CompressionConfig,
  key: "sessionDedup" | "ccr" | "contextRollover",
  parsed: unknown
): void {
  if (key === "sessionDedup") config.sessionDedup = normalizeSessionDedupConfig(parsed);
  else if (key === "contextRollover")
    config.contextRollover = normalizeContextRolloverConfig(parsed);
  else config.ccr = normalizeCcrConfig(parsed);
}
