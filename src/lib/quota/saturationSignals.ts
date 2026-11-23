/**
 * saturationSignals.ts — Read the current global saturation signal (0..1)
 * for a provider/connection/dimension combination.
 *
 * Strategy (per provider):
 *   codex            → codexQuotaFetcher (dual 5h + weekly window)
 *   bailian          → bailianQuotaFetcher (triple 5h + weekly + monthly window)
 *   anthropic/claude → REAL plan-window utilization from GET /api/oauth/usage
 *                      (the same path usage.ts already uses): window "5h" →
 *                      five_hour.utilization, "weekly" → seven_day.utilization.
 *                      Falls back to the per-minute REQUEST rate-limit headers
 *                      (anthropic-ratelimit-requests-*) only when no OAuth plan
 *                      window is available (e.g. API-key Claude connections).
 *   default          → getUsageForProvider (open-sse/services/usage.ts)
 *
 * Cache: in-memory Map, TTL = 30 seconds. The 30s TTL is what keeps the
 * NON-OFFICIAL, rate-limited oauth/usage endpoint from being polled per
 * request (it returns 429 under load) — never call it on the hot path without
 * this cache. usage.ts adds its own 429 cooldown on top.
 * Fail-open: on any error, return 0 (generous mode) and log pino.warn.
 * Hard Rule #12: no stack traces propagated to return values.
 *
 * Part of: Group B — Quota Sharing Engine (plan 22, frente F6).
 */

import { createLogger } from "@/shared/utils/logger";
import { normalizeHeaders } from "@omniroute/open-sse/utils/headers";
import { boundedMap } from "./boundedMap";
import { updateAccountBuckets, type ClaudeUsageResult } from "./accountBuckets";
import type { QuotaUnit, QuotaWindow } from "./dimensions";
import { claudePlanReading, claudeUsageDataTime, codexPlanReading } from "./planWindowReading";
import type { PlanWindowReading } from "./types";

const log = createLogger("quota:saturation");

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface DimensionSpec {
  unit: QuotaUnit;
  window: QuotaWindow;
}

// ---------------------------------------------------------------------------
// In-memory cache (boundedMap<cacheKey, SaturationEntry>, 30s TTL). Caps are
// generous (one entry per connection/provider/dimension or provider/connection):
// an evicted entry only costs one extra read, and normal deployments never hit them.
// ---------------------------------------------------------------------------

const CACHE_TTL_MS = 30_000; // 30 seconds

/**
 * One cached read: the saturation value getSaturation returns, and the plan-window
 * reading of the same payload (null whenever the value is not that window's own
 * fresh figure). `plan.fetchedAt` is fixed when the entry is built, so every call
 * served by one entry sees the same reading.
 */
interface SaturationEntry {
  value: number;
  plan: PlanWindowReading | null;
}

const _cache = boundedMap<SaturationEntry>("saturation-cache", 4096, "ttl", CACHE_TTL_MS);

// Pending miss fetches, keyed like _cache. Concurrent getSaturation calls for
// the same key share the promise instead of firing one upstream read each.
const _inflight = new Map<string, Promise<SaturationEntry>>();

// ---------------------------------------------------------------------------
// Rate-limit header cache (populated by response handlers)
// ---------------------------------------------------------------------------

interface RateLimitHeaderEntry {
  limit: number;
  remaining: number;
  ts: number;
}

/**
 * TOKEN rate-limit header snapshot. Unlike the per-minute REQUEST headers, the
 * token headers ride on EVERY upstream response (success too), so they enable
 * proactive throttling before a 429. `resetAt` is the upstream reset normalized
 * to epoch ms (Anthropic RFC3339 → Date.parse; OpenAI duration → now + secs),
 * or null when the upstream sent no reset header.
 */
interface TokenHeaderEntry {
  limit: number;
  remaining: number;
  resetAt: number | null; // epoch ms, normalized; null when unknown
  ts: number;
}

const RL_HEADER_TTL_MS = 5 * 60 * 1000; // 5 minutes
const _rateLimitHeaders = boundedMap<RateLimitHeaderEntry>(
  "saturation-rl-headers",
  4096,
  "ttl",
  RL_HEADER_TTL_MS
);
const _tokenHeaders = boundedMap<TokenHeaderEntry>(
  "saturation-token-headers",
  4096,
  "ttl",
  RL_HEADER_TTL_MS
);

/** Test-only: clear the rate-limit + token header caches between asserts. */
export function _clearRateLimitHeaders(): void {
  _rateLimitHeaders.clear();
  _tokenHeaders.clear();
}

/**
 * Parse an OpenAI rate-limit reset DURATION string into milliseconds.
 * OpenAI reports token/request resets as Go-style durations, e.g. "6m0s",
 * "1s", "1h30m15s", "1.5s". Returns null when unparseable.
 */
function parseDurationMs(raw: string): number | null {
  const s = raw.trim();
  if (!s) return null;
  // Bounded, non-overlapping segments to avoid ReDoS (PII learning #1).
  const re = /(\d+(?:\.\d+)?)(ms|h|m|s)/g;
  let total = 0;
  let matched = false;
  let m: RegExpExecArray | null;
  while ((m = re.exec(s)) !== null) {
    matched = true;
    const value = Number(m[1]);
    if (!Number.isFinite(value)) return null;
    switch (m[2]) {
      case "h":
        total += value * 3_600_000;
        break;
      case "m":
        total += value * 60_000;
        break;
      case "s":
        total += value * 1000;
        break;
      case "ms":
        total += value;
        break;
    }
  }
  return matched ? total : null;
}

/**
 * Normalize a token-reset header value to epoch ms.
 *   - Anthropic: RFC3339 timestamp ("2026-01-01T00:00:30Z") → Date.parse.
 *   - OpenAI: duration ("6m0s") → now + parsed ms.
 * Returns null when absent or unparseable.
 */
function normalizeTokenReset(raw: string | undefined, nowMs: number): number | null {
  if (!raw) return null;
  const s = raw.trim();
  if (!s) return null;
  // RFC3339 / ISO-8601 if it looks like a date (YYYY-MM-DD with a time sep).
  if (/\d{4}-\d{2}-\d{2}/.test(s) && /[T:]/.test(s)) {
    const t = Date.parse(s);
    if (Number.isFinite(t)) return t;
  }
  // Otherwise treat as an OpenAI-style duration relative to now.
  const durMs = parseDurationMs(s);
  return durMs === null ? null : nowMs + durMs;
}

/**
 * Pick the first present {limit, remaining[, reset]} triple from a list of
 * header-key candidates, in priority order. Returns null when none are usable
 * (missing keys, non-finite, or limit <= 0).
 */
function pickTokenTriple(
  headers: Record<string, string>,
  candidates: Array<{ limit: string; remaining: string; reset: string }>
): { limit: number; remaining: number; reset: string | undefined } | null {
  for (const c of candidates) {
    const limitStr = headers[c.limit];
    const remainingStr = headers[c.remaining];
    if (limitStr === undefined || remainingStr === undefined) continue;
    const limit = Number(limitStr);
    const remaining = Number(remainingStr);
    if (Number.isFinite(limit) && limit > 0 && Number.isFinite(remaining)) {
      return { limit, remaining, reset: headers[c.reset] };
    }
  }
  return null;
}

/**
 * Store rate-limit headers from an upstream response for saturation signal use.
 * Called by the response handler for every upstream response, including error
 * responses such as a 429.
 *
 * Captures two independent signals, both keyed `${provider}:${connectionId}`:
 *   - REQUEST headers (per-minute RPM burst) — legacy, anthropic fallback.
 *   - TOKEN headers (per-window TPM) — universal proactive saturation; present
 *     on EVERY response, so we can throttle before the 429.
 *
 * Accepts the `Headers` of a `fetch` response or a plain object; names are compared in lower case.
 */
export function storeRateLimitHeaders(
  connectionId: string,
  provider: string,
  rawHeaders: Headers | Record<string, string>
): void {
  const headers = normalizeHeaders(rawHeaders);
  const key = `${provider}:${connectionId}`;

  // ── REQUEST headers (legacy path, unchanged) ──────────────────────────────
  // Anthropic: anthropic-ratelimit-requests-limit / anthropic-ratelimit-requests-remaining
  const limitStr =
    headers["anthropic-ratelimit-requests-limit"] ??
    headers["x-ratelimit-limit-requests"] ??
    headers["x-ratelimit-limit"];
  const remainingStr =
    headers["anthropic-ratelimit-requests-remaining"] ??
    headers["x-ratelimit-remaining-requests"] ??
    headers["x-ratelimit-remaining"];

  if (limitStr && remainingStr) {
    const limit = Number(limitStr);
    const remaining = Number(remainingStr);
    if (Number.isFinite(limit) && limit > 0 && Number.isFinite(remaining)) {
      _rateLimitHeaders.set(key, { limit, remaining, ts: Date.now() });
    }
  }

  // ── TOKEN headers (universal proactive saturation) ────────────────────────
  // Anthropic base tokens, then OpenAI x-ratelimit-*-tokens, then anthropic
  // input/output variants as a fallback. First usable triple wins.
  const tokenTriple = pickTokenTriple(headers, [
    {
      limit: "anthropic-ratelimit-tokens-limit",
      remaining: "anthropic-ratelimit-tokens-remaining",
      reset: "anthropic-ratelimit-tokens-reset",
    },
    {
      limit: "x-ratelimit-limit-tokens",
      remaining: "x-ratelimit-remaining-tokens",
      reset: "x-ratelimit-reset-tokens",
    },
    {
      limit: "anthropic-ratelimit-input-tokens-limit",
      remaining: "anthropic-ratelimit-input-tokens-remaining",
      reset: "anthropic-ratelimit-input-tokens-reset",
    },
    {
      limit: "anthropic-ratelimit-output-tokens-limit",
      remaining: "anthropic-ratelimit-output-tokens-remaining",
      reset: "anthropic-ratelimit-output-tokens-reset",
    },
  ]);

  if (tokenTriple) {
    const now = Date.now();
    _tokenHeaders.set(key, {
      limit: tokenTriple.limit,
      remaining: tokenTriple.remaining,
      resetAt: normalizeTokenReset(tokenTriple.reset, now),
      ts: now,
    });
  }
}

/**
 * Token-header saturation signal for a (provider, connectionId).
 * Returns `{ saturation, resetAt }` where saturation = 1 − remaining/limit
 * (clamped 0..1) and resetAt is the normalized epoch-ms reset (or null), or
 * null when no fresh token-header data exists.
 */
export function getTokenHeaderSaturation(
  provider: string,
  connectionId: string
): { saturation: number; resetAt: number | null } | null {
  const entry = _tokenHeaders.get(`${provider}:${connectionId}`);
  if (!entry) return null;
  if (!(entry.limit > 0)) return null;
  const used = entry.limit - entry.remaining;
  const saturation = Math.min(1, Math.max(0, used / entry.limit));
  return { saturation, resetAt: entry.resetAt };
}

function cacheKey(connectionId: string, provider: string, dim: DimensionSpec): string {
  return `${provider}:${connectionId}:${dim.unit}:${dim.window}`;
}

// Exported for test reset
export function _clearSaturationCache(): void {
  _cache.clear();
  _inflight.clear();
}

// ---------------------------------------------------------------------------
// Provider-specific extractors
// ---------------------------------------------------------------------------

/**
 * Map QuotaWindow to the Codex window keys returned by the fetcher.
 */
function codexWindowKey(window: QuotaWindow): string {
  switch (window) {
    case "5h":
      return "session"; // CODEX_WINDOW_SESSION
    case "weekly":
      return "weekly"; // CODEX_WINDOW_WEEKLY
    default:
      return "session";
  }
}

async function fetchCodexSaturation(
  connectionId: string,
  dim: DimensionSpec,
  connection?: Record<string, unknown>
): Promise<SaturationEntry> {
  // Dynamic import — codexQuotaFetcher lives in open-sse workspace
  const mod = await import("@omniroute/open-sse/services/codexQuotaFetcher");
  // #6379: pass the loaded connection snapshot through so fetchCodexQuota can
  // read its accessToken/workspaceId even when this connection was never
  // registered via registerCodexConnection() (e.g. during headroom ranking,
  // which runs BEFORE any request is dispatched for the candidate). Without
  // this, fetchCodexQuota returns null for every candidate and saturation
  // fails open to 0 across the board — headroom then can't tell accounts
  // apart and keeps the original combo order.
  const quota = await mod.fetchCodexQuota(connectionId, connection);
  if (!quota) return { value: 0, plan: null };
  const now = Date.now();
  const reading = codexPlanReading(quota, dim.window, now);
  // The fetcher can serve a cached figure from before the window's reset. It does not describe
  // the current window, so it is no plan reading.
  const plan = reading && reading.resetAt !== null && reading.resetAt <= now ? null : reading;

  const winKey = codexWindowKey(dim.window);
  const windows = quota.windows as Record<string, { percentUsed: number } | undefined>;
  const win = windows[winKey];
  if (win && typeof win.percentUsed === "number") {
    return { value: Math.min(1, Math.max(0, win.percentUsed)), plan };
  }
  // fallback to overall percentUsed
  return { value: Math.min(1, Math.max(0, quota.percentUsed ?? 0)), plan };
}

async function fetchBailianSaturation(
  connectionId: string,
  dim: DimensionSpec
): Promise<SaturationEntry> {
  const mod = await import("@omniroute/open-sse/services/bailianQuotaFetcher");
  const quota = await mod.fetchBailianQuota(connectionId);
  if (!quota) return { value: 0, plan: null };

  const q = quota as unknown as Record<string, unknown>;
  let pct = 0;
  switch (dim.window) {
    case "5h":
      pct = ((q.window5h as Record<string, unknown>)?.percentUsed as number) ?? 0;
      break;
    case "weekly":
      pct = ((q.windowWeekly as Record<string, unknown>)?.percentUsed as number) ?? 0;
      break;
    case "monthly":
      pct = ((q.windowMonthly as Record<string, unknown>)?.percentUsed as number) ?? 0;
      break;
    default:
      pct = (q.percentUsed as number) ?? 0;
  }
  // No plan-window reading: Bailian's figure never drives an attribution book.
  return { value: Math.min(1, Math.max(0, pct)), plan: null };
}

/**
 * Per-minute REQUEST rate-limit headers fallback. Used only when the OAuth
 * plan-window utilization is unavailable (e.g. API-key Claude connections that
 * have no /api/oauth/usage data). This signal reflects TPM/RPM bursts, NOT the
 * 5h/weekly plan window, so it is a weak last resort.
 */
function anthropicHeaderSaturation(connectionId: string): number {
  const entry = _rateLimitHeaders.get(`anthropic:${connectionId}`);
  if (!entry) return 0;

  const used = entry.limit - entry.remaining;
  return Math.min(1, Math.max(0, used / entry.limit));
}

/**
 * Injectable seam (DB lookup + usage fetch) so the oauth/usage plan-window path
 * is unit-testable without touching the DB or the network. Defaults are wired
 * lazily to the real implementations inside fetchAnthropicSaturation.
 */
interface AnthropicSaturationDeps {
  /** Resolve a connection (with decrypted accessToken/authType) by id. */
  loadConnection: (connectionId: string) => Promise<Record<string, unknown> | null>;
  /** Fetch usage for the connection (delegates to getUsageForProvider). */
  fetchUsage: (conn: Record<string, unknown>) => Promise<unknown>;
  /** Epoch ms of the usage endpoint read kept for the connection's credential, or null. */
  endpointReadAt?: (conn: Record<string, unknown>) => number | null;
}

let _anthropicDepsOverride: AnthropicSaturationDeps | null = null;

/** Test-only: inject ({loadConnection, fetchUsage}); pass null to restore. */
export function __setAnthropicSaturationDepsForTests(deps: AnthropicSaturationDeps | null): void {
  _anthropicDepsOverride = deps;
}

async function defaultAnthropicDeps(): Promise<AnthropicSaturationDeps> {
  const [localDbMod, usageMod] = await Promise.all([
    import("@/lib/db/readCache"),
    import("@omniroute/open-sse/services/usage"),
  ]);
  return {
    loadConnection: (connectionId) =>
      localDbMod.getCachedProviderConnectionById(connectionId) as Promise<Record<
        string,
        unknown
      > | null>,
    fetchUsage: (conn) =>
      usageMod.getUsageForProvider(conn as Parameters<typeof usageMod.getUsageForProvider>[0]),
    endpointReadAt: (conn) =>
      usageMod.getClaudeUsageEndpointReadAt(
        typeof conn.accessToken === "string" ? conn.accessToken : undefined
      ),
  };
}

/** The endpoint read time from the seam; any failure is "unknown", never a saturation error. */
function endpointReadAtOf(
  deps: AnthropicSaturationDeps,
  conn: Record<string, unknown>
): number | null {
  try {
    return deps.endpointReadAt?.(conn) ?? null;
  } catch {
    return null;
  }
}

/**
 * Map a QuotaWindow to the Claude usage quota key produced by getClaudeUsage
 * (usage.ts). "session (5h)" carries five_hour.utilization and "weekly (7d)"
 * carries seven_day.utilization.
 */
function claudeUsageKeyForWindow(window: QuotaWindow): string | null {
  switch (window) {
    case "5h":
      return "session (5h)";
    case "weekly":
    case "monthly":
      // Anthropic exposes a 7-day plan window, not a monthly one — treat the
      // longer requested window as the weekly plan saturation.
      return "weekly (7d)";
    default:
      return null;
  }
}

/**
 * Extract the plan utilization (0..1) for the requested window from a
 * getClaudeUsage() result, or null when the OAuth plan window is unavailable
 * (e.g. legacy/admin API-key shape with no per-window quotas).
 */
function planUtilizationFromUsage(usage: unknown, window: QuotaWindow): number | null {
  if (!usage || typeof usage !== "object") return null;
  const quotas = (usage as Record<string, unknown>).quotas;
  if (!quotas || typeof quotas !== "object" || Array.isArray(quotas)) return null;

  const key = claudeUsageKeyForWindow(window);
  if (!key) return null;
  const entry = (quotas as Record<string, unknown>)[key];
  if (!entry || typeof entry !== "object") return null;

  // getClaudeUsage stores `used` = utilization (% used, 0..100).
  const used = (entry as Record<string, unknown>).used;
  if (typeof used !== "number" || !Number.isFinite(used)) return null;
  return Math.min(1, Math.max(0, used / 100));
}

async function fetchAnthropicSaturation(
  connectionId: string,
  dim: DimensionSpec
): Promise<SaturationEntry> {
  // Try the REAL plan-window utilization first (5h / weekly), via the same
  // /api/oauth/usage path usage.ts already uses. This is the signal fairShare
  // actually needs for Claude Pro/Max — the per-minute request headers do not
  // reflect the plan window. Any failure here falls back to the header path,
  // and ultimately fails open (0).
  try {
    const deps = _anthropicDepsOverride ?? (await defaultAnthropicDeps());
    const conn = await deps.loadConnection(connectionId);
    // Only OAuth connections have plan-window usage; API-key Claude does not.
    const hasOauthToken =
      !!conn &&
      typeof conn.accessToken === "string" &&
      conn.accessToken.length > 0 &&
      (conn.authType === undefined || conn.authType === "oauth");
    if (hasOauthToken) {
      const usage = await deps.fetchUsage(conn as Record<string, unknown>);
      // Update the per-window saturating buckets (Phase 3 #3) off the request
      // hot path — this runs behind the 30s saturation cache. Fail-open: any
      // bucket error must never affect the primary 0..1 saturation signal.
      try {
        updateAccountBuckets(connectionId, usage as ClaudeUsageResult, Date.now());
      } catch {
        // intentionally swallowed — buckets are additive, never gate-breaking
      }
      const util = planUtilizationFromUsage(usage, dim.window);
      if (util !== null) {
        const readAt = endpointReadAtOf(deps, conn as Record<string, unknown>);
        const dataTime = claudeUsageDataTime(usage, readAt, Date.now());
        return { value: util, plan: claudePlanReading(usage, dim.window, dataTime) };
      }
    }
  } catch (err) {
    log.warn(
      { err: (err as Error)?.message, connectionId },
      "anthropic oauth/usage saturation failed — falling back to rate-limit headers"
    );
  }

  // Fallback: per-minute REQUEST rate-limit headers (weak, TPM/RPM only).
  return { value: anthropicHeaderSaturation(connectionId), plan: null };
}

/**
 * Injectable seam for the generic usage fetch so the token-header
 * complement/fallback is unit-testable without the open-sse usage service.
 * Defaults to getUsageForProvider; pass null to restore.
 */
type GenericUsageFetcher = (connectionId: string, provider: string) => Promise<unknown>;
let _genericUsageFetcherOverride: GenericUsageFetcher | null = null;

/** Test-only: inject the generic usage fetcher; pass null to restore. */
export function __setGenericUsageFetcherForTests(fetcher: GenericUsageFetcher | null): void {
  _genericUsageFetcherOverride = fetcher;
}

async function defaultGenericUsageFetch(connectionId: string, provider: string): Promise<unknown> {
  const mod = await import("@omniroute/open-sse/services/usage");
  const conn = { id: connectionId, provider } as Parameters<typeof mod.getUsageForProvider>[0];
  return mod.getUsageForProvider(conn);
}

async function fetchGenericSaturation(connectionId: string, provider: string): Promise<number> {
  // 1. Real usage percent is authoritative when present (a provider that
  //    actually reports utilization beats the burst-window token headers).
  try {
    const fetcher = _genericUsageFetcherOverride ?? defaultGenericUsageFetch;
    const result = await fetcher(connectionId, provider);
    if (result && typeof result === "object") {
      const obj = result as Record<string, unknown>;

      // Prefer the normalized quota shape (handles nested `quotas` map for
      // Antigravity / Claude / etc.). Fall back to legacy top-level fields.
      const { convertUsageToQuotaInfo } =
        await import("@omniroute/open-sse/services/genericQuotaFetcher");
      const quota = convertUsageToQuotaInfo(result);
      // An unlimited snapshot (#15347) has percentUsed 0 but is "no cap", not "0% used":
      // fall through to the token-header complement exactly as a null conversion did.
      if (quota && !quota.unlimited && Number.isFinite(quota.percentUsed)) {
        return Math.min(1, Math.max(0, quota.percentUsed));
      }

      const pct =
        typeof obj.percentUsed === "number"
          ? obj.percentUsed
          : typeof obj.used_percent === "number"
            ? obj.used_percent
            : null;
      if (pct !== null && Number.isFinite(pct)) {
        return Math.min(1, Math.max(0, pct));
      }
    }
  } catch {
    // fall through to the token-header complement
  }

  // 2. Complement/fallback: proactive TOKEN-header saturation (universal, rides
  //    on every response). Fail-open to 0 when no fresh token-header data.
  return getTokenHeaderSaturation(provider, connectionId)?.saturation ?? 0;
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/** Read one cache entry from the provider. The generic path never has a plan reading. */
async function loadSaturationEntry(
  connectionId: string,
  provider: string,
  dim: DimensionSpec,
  connection?: Record<string, unknown>
): Promise<SaturationEntry> {
  switch (provider) {
    case "codex":
      return fetchCodexSaturation(connectionId, dim, connection);
    case "bailian":
      return fetchBailianSaturation(connectionId, dim);
    case "anthropic":
    case "claude":
      return fetchAnthropicSaturation(connectionId, dim);
    default:
      return { value: await fetchGenericSaturation(connectionId, provider), plan: null };
  }
}

/** The cached entry for a connection+dim, read once per TTL and shared by concurrent callers. */
async function getSaturationEntry(
  connectionId: string,
  provider: string,
  dim: DimensionSpec,
  connection?: Record<string, unknown>
): Promise<SaturationEntry> {
  const key = cacheKey(connectionId, provider, dim);
  const cached = _cache.get(key);
  if (cached !== undefined) {
    return cached;
  }

  const pending = _inflight.get(key);
  if (pending !== undefined) return pending;
  const task = (async (): Promise<SaturationEntry> => {
    let entry: SaturationEntry;
    try {
      entry = await loadSaturationEntry(connectionId, provider, dim, connection);
    } catch (err) {
      log.warn(
        { err: (err as Error)?.message, connectionId, provider },
        "saturation fetch failed — failing open with 0"
      );
      entry = { value: 0, plan: null };
    }
    _cache.set(key, entry);
    return entry;
  })();
  _inflight.set(key, task);
  try {
    return await task;
  } finally {
    _inflight.delete(key);
  }
}

/**
 * Return the current global saturation signal (0..1) for a connection+dim.
 *
 * A value of 0 means "no saturation detected" (generous/borrowing mode allowed).
 * A value >= saturationThreshold triggers strict mode in fairShare.ts.
 *
 * Always fail-open: returns 0 on any error.
 */
export async function getSaturation(
  connectionId: string,
  provider: string,
  dim: DimensionSpec,
  connection?: Record<string, unknown>
): Promise<number> {
  return (await getSaturationEntry(connectionId, provider, dim, connection)).value;
}

/**
 * Return the plan-window reading behind the same cached read as getSaturation,
 * or null when that value is not the requested window's own fresh figure
 * (another window, the worst case across windows, rate-limit headers, a failed
 * read, a stale response, or a provider without plan windows). Never throws.
 */
export async function getPlanWindowReading(
  connectionId: string,
  provider: string,
  dim: { unit: QuotaUnit; window: QuotaWindow },
  connection?: Record<string, unknown>
): Promise<PlanWindowReading | null> {
  try {
    const { plan } = await getSaturationEntry(connectionId, provider, dim, connection);
    return plan ? { ...plan } : null;
  } catch {
    return null;
  }
}

/**
 * The plan-window reading the cache already holds for a connection+dim, as a copy, or null when
 * nothing is cached or the cached entry has no plan reading. Never reads the provider, never
 * fills the cache and never joins a pending fetch.
 */
export function peekPlanWindowReading(
  connectionId: string,
  provider: string,
  dim: { unit: QuotaUnit; window: QuotaWindow }
): PlanWindowReading | null {
  const plan = _cache.get(cacheKey(connectionId, provider, dim))?.plan;
  return plan ? { ...plan } : null;
}
