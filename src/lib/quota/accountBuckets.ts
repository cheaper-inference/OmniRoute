/**
 * accountBuckets.ts — Saturating per-connection, per-window buckets.
 *
 * Tracks whether a connection has hit 100 % of a quota window (5h / 7d), or
 * whether Claude reports a model-scoped weekly window as exhausted (7d:<label>).
 * Each bucket is lazily reset: on read, if now >= resetsAtMs the entry is
 * cleared and the connection is eligible again. No cron needed — the reset is
 * probed on the read path.
 *
 * Fail-open: missing entry → not saturated. All time input is injectable
 * (the `nowMs` param) so unit tests drive the clock deterministically — the
 * tested path never calls Date.now() implicitly.
 *
 * Complementary to connectionRecovery.ts: that module recovers DB-backed
 * request-error cooldowns (testStatus 'unavailable' + rateLimitedUntil); this
 * module tracks in-process plan-window utilization. Orthogonal concerns.
 *
 * Part of: Quota Sharing Engine — Phase 3 (#3 multi-window buckets).
 */
import {
  claudeQuotaMatchesModel,
  isActiveClaudeExhaustion,
  isClaudeQuotaMetadata,
  type ClaudeQuotaWindow,
} from "@omniroute/open-sse/services/usage/claudeQuota.ts";
import type { ClaudeQuotaMetadata } from "@omniroute/open-sse/services/usage/quota.ts";
import { boundedMap } from "./boundedMap";
import { isCompleteUsageReading } from "../usage/usageReading";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** In-process state for one (connectionId, windowKey) pair. */
interface BucketEntry {
  saturated: boolean;
  resetsAtMs: number; // 0 when the reset instant is unknown
  /** Set only on model-scoped weekly buckets ("7d:<label>"). */
  claudeQuota?: ClaudeQuotaMetadata;
}

/**
 * Minimal shape of a parsed UsageQuota entry, as produced by getClaudeUsage in
 * open-sse/services/usage.ts. `used` = % consumed (0..100); `total` = 100 for
 * percent-based windows; `resetAt` = ISO 8601 string or null (already
 * normalized upstream by parseResetTime).
 */
export interface UsageQuotaSlim {
  used: number;
  total: number;
  resetAt: string | null;
}

/**
 * Partial shape of the getClaudeUsage() return value this module needs. Only
 * `quotas` and `modelQuotas` are consumed; other fields (plan, extraUsage,
 * bootstrap) are ignored.
 */
export interface ClaudeUsageResult {
  quotas?: Record<string, UsageQuotaSlim | undefined>;
  /** Model-scoped weekly windows, as getClaudeUsage reports them. */
  modelQuotas?: Record<string, ClaudeQuotaWindow | undefined>;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/**
 * Utilization threshold (0..100) at/above which a window is considered
 * saturated. 100 = exhausted. Named so it can be tuned globally if Anthropic
 * ever soft-throttles below the hard cap.
 */
export const SATURATION_THRESHOLD_PCT = 100;

// ---------------------------------------------------------------------------
// In-process store
// ---------------------------------------------------------------------------

/**
 * Soft cap on stored buckets. Only SATURATED buckets are ever stored (a
 * below-threshold observation deletes the entry), so evicting a live one would
 * silently turn "saturated" into "eligible" — the fail-open this store exists to
 * prevent. Over the cap only buckets whose reset instant already passed (stale
 * saturation the next read would drop anyway) are evicted; live saturated
 * buckets are never evicted and the store grows past the cap instead. 4096 ≈
 * 1000+ connections × their 5h/7d/7d:<label> windows all saturated at once.
 */
export const ACCOUNT_BUCKETS_SOFT_CAP = 4096;

/** Window-key prefix of the model-scoped weekly buckets ("7d:<label>"). */
const MODEL_WINDOW_PREFIX = "7d:";

/** Key: `${connectionId}::${windowKey}`. */
const _buckets = boundedMap<BucketEntry>("account-buckets", ACCOUNT_BUCKETS_SOFT_CAP, "lru", 0, {
  shouldEvict: (entry, _key, nowMs) => entry.resetsAtMs > 0 && nowMs >= entry.resetsAtMs,
});

function storeKey(connectionId: string, windowKey: string): string {
  return `${connectionId}::${windowKey}`;
}

/**
 * Parse an ISO 8601 `resetAt` string to epoch ms. Returns 0 on any failure
 * (unknown reset time → the lazy reset cannot fire for that bucket).
 */
function parseResetAtMs(resetAt: string | null | undefined): number {
  if (!resetAt) return 0;
  const ms = Date.parse(resetAt);
  return Number.isFinite(ms) && ms > 0 ? ms : 0;
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Check whether the bucket for (connectionId, windowKey) is currently
 * saturated.
 *
 * Lazy reset: if `nowMs >= entry.resetsAtMs` (and resetsAtMs > 0) the entry is
 * cleared and `false` is returned — the connection is eligible again without
 * any background sweep.
 *
 * Fail-open: a missing entry returns false (not saturated).
 *
 * @param connectionId  Opaque string identifier for the connection.
 * @param windowKey     One of: "5h", "7d", "7d:<label>" (e.g. "7d:designer").
 * @param nowMs         Current epoch ms; defaults to Date.now() (off-path only).
 */
export function isBucketSaturated(
  connectionId: string,
  windowKey: string,
  nowMs: number = Date.now()
): boolean {
  if (!connectionId || !windowKey) return false; // fail-open
  const key = storeKey(connectionId, windowKey);
  const entry = _buckets.get(key, nowMs);
  if (!entry) return false; // fail-open

  // Lazy reset: the window rolled over → the saturation is stale.
  if (entry.resetsAtMs > 0 && nowMs >= entry.resetsAtMs) {
    _buckets.delete(key);
    return false;
  }

  return entry.saturated;
}

/**
 * Record a usage observation for one (connectionId, windowKey) pair.
 *
 * Marks the bucket saturated when `usedPct >= SATURATION_THRESHOLD_PCT` and the
 * window has NOT already rolled over. When the observation is below the
 * threshold (or already past its reset), any existing entry is cleared so the
 * connection's eligibility is restored promptly. When `resetAt` is a valid ISO
 * string, the reset epoch is stored so lazy reset can fire later.
 *
 * @param connectionId  Opaque connection identifier.
 * @param windowKey     "5h", "7d", or "7d:<label>".
 * @param usedPct       Utilization percentage (0..100).
 * @param resetAt       ISO 8601 string (or null) for when this window resets.
 * @param nowMs         Current epoch ms; defaults to Date.now() (off-path only).
 */
export function recordUsage(
  connectionId: string,
  windowKey: string,
  usedPct: number,
  resetAt: string | null,
  nowMs: number = Date.now()
): void {
  if (!connectionId || !windowKey) return;
  const key = storeKey(connectionId, windowKey);

  const resetsAtMs = parseResetAtMs(resetAt);

  // Stale signal: the window already reset — discard any state and bail.
  if (resetsAtMs > 0 && nowMs >= resetsAtMs) {
    _buckets.delete(key);
    return;
  }

  const saturated = Number.isFinite(usedPct) && usedPct >= SATURATION_THRESHOLD_PCT;
  if (!saturated) {
    // Below threshold → clear any stale saturation so the bucket is eligible.
    _buckets.delete(key);
    return;
  }

  _buckets.set(key, { saturated: true, resetsAtMs }, nowMs);
}

/**
 * Record the windows of a getClaudeUsage() result into their buckets.
 *
 * Window key mapping:
 *   quotas["session (5h)"]               → "5h"
 *   quotas["weekly (7d)"]                → "7d"
 *   modelQuotas["weekly <label> (7d)"]   → "7d:<label>" (e.g. "weekly designer (7d)" → "7d:designer")
 *
 * The model-scoped weekly windows come from `modelQuotas` and saturate only when
 * Claude reports them as an active exhaustion (the same rule credential
 * selection applies). A listed window that is no longer exhausted clears its bucket.
 * A model bucket the reading does not list is cleared only by a complete reading.
 *
 * Fail-open: a null/undefined result, a missing `quotas` map, or any malformed
 * quota entry is silently skipped.
 *
 * @param connectionId  Connection identifier.
 * @param usageResult   getClaudeUsage() return value (`quotas` and `modelQuotas` are read).
 * @param nowMs         Current epoch ms; defaults to Date.now() (off-path only).
 */
export function updateAccountBuckets(
  connectionId: string,
  usageResult: ClaudeUsageResult | null | undefined,
  nowMs: number = Date.now()
): void {
  if (!connectionId || !usageResult?.quotas) return;
  const { quotas } = usageResult;

  // Fixed windows.
  processQuotaEntry(connectionId, "5h", quotas["session (5h)"], nowMs);
  processQuotaEntry(connectionId, "7d", quotas["weekly (7d)"], nowMs);

  const reported = new Set<string>();
  if (quotas["session (5h)"]) reported.add("5h");
  if (quotas["weekly (7d)"]) reported.add("7d");

  for (const windowKey of recordModelWindows(connectionId, usageResult.modelQuotas, nowMs)) {
    reported.add(windowKey);
  }
  // A complete reading lists every window the account has: a saturation kept for a window it no
  // longer reports (a removed session window, say) must not keep the account saturated.
  if (isCompleteUsageReading(usageResult)) {
    const prefix = storeKey(connectionId, "");
    for (const key of [..._buckets.keys()]) {
      if (key.startsWith(prefix) && !reported.has(key.slice(prefix.length))) _buckets.delete(key);
    }
  }
}

/**
 * True when a saturated model-scoped weekly bucket of this connection covers `modelStr`
 * ("<provider>/<model>" or a bare model id). Fail-open: no such bucket → false.
 */
export function isModelWindowSaturated(
  connectionId: string,
  modelStr: string,
  nowMs: number = Date.now()
): boolean {
  if (!connectionId || !modelStr) return false;
  const base = storeKey(connectionId, "");
  const prefix = storeKey(connectionId, MODEL_WINDOW_PREFIX);
  // Collect first: isBucketSaturated may delete or reorder entries, which must
  // not happen while the store is being iterated.
  const matched: string[] = [];
  for (const [key, entry] of _buckets) {
    if (!key.startsWith(prefix) || !entry.claudeQuota) continue;
    if (claudeQuotaMatchesModel(entry.claudeQuota, modelStr)) matched.push(key);
  }
  // isBucketSaturated applies the lazy reset at the window's own reset time.
  return matched.some((key) => isBucketSaturated(connectionId, key.slice(base.length), nowMs));
}

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

/**
 * Record the exhausted model-scoped weekly windows of one reading and drop this
 * connection's model buckets for the windows the reading lists as not exhausted.
 * A bucket the reading does not list is left to the complete-reading sweep of the caller.
 * A reading without `modelQuotas` carries no model evidence. Returns the window keys written.
 */
function recordModelWindows(
  connectionId: string,
  modelQuotas: ClaudeUsageResult["modelQuotas"],
  nowMs: number
): Set<string> {
  const written = new Set<string>();
  if (!modelQuotas || typeof modelQuotas !== "object" || Array.isArray(modelQuotas)) {
    return written;
  }
  const listed = new Set<string>();
  for (const [name, window] of Object.entries(modelQuotas)) {
    const metadata = window?.claudeQuota;
    if (!window || !isClaudeQuotaMetadata(metadata) || metadata.kind !== "weekly_scoped") continue;
    const label = /^weekly (.+) \(7d\)$/.exec(name)?.[1] ?? name;
    const windowKey = `${MODEL_WINDOW_PREFIX}${label}`;
    listed.add(windowKey);
    if (!isActiveClaudeExhaustion(window, nowMs)) continue;
    _buckets.set(
      storeKey(connectionId, windowKey),
      { saturated: true, resetsAtMs: parseResetAtMs(window.resetAt), claudeQuota: { ...metadata } },
      nowMs
    );
    written.add(windowKey);
  }
  for (const windowKey of listed) {
    if (!written.has(windowKey)) _buckets.delete(storeKey(connectionId, windowKey));
  }
  return written;
}

function processQuotaEntry(
  connectionId: string,
  windowKey: string,
  entry: UsageQuotaSlim | undefined | null,
  nowMs: number
): void {
  if (!entry || typeof entry.used !== "number") return;
  recordUsage(connectionId, windowKey, entry.used, entry.resetAt ?? null, nowMs);
}

// ---------------------------------------------------------------------------
// Test helpers (never call in production code)
// ---------------------------------------------------------------------------

/** Clear all bucket entries. Tests only — keeps state isolation between cases. */
export function _clearBucketsForTest(): void {
  _buckets.clear();
}

/** Return the current bucket count. Tests only — black-box size assertion. */
export function _bucketCountForTest(): number {
  return _buckets.size;
}
