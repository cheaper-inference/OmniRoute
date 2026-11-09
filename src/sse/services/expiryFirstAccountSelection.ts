/**
 * `expiry-first` per-provider ACCOUNT fallback strategy (#14533), extracted from
 * auth.ts as a leaf so the frozen god-file `auth.ts` only carries the wiring.
 *
 * Spends the quota that is closest to being lost: each account is ranked by how
 * much it must burn PER HOUR to avoid wasting its leftover at the next reset, so
 * a full account whose window closes soon outranks an equally full one that
 * holds for days. fill-first drains the top-priority account and lets the rest
 * roll over unspent; that lost quota is the whole reason this strategy exists.
 *
 * This module never imports auth.ts (no cycle); it reads the same per-connection
 * quota cache auth.ts reads (hydrated from `quota_snapshots` on a miss) and
 * reuses the combo quota scorer. Optional scope narrows multi-window quotas to
 * the requested model family before scoring.
 */

import { getQuotaCacheOrSnapshot } from "@/domain/quotaCache";
import { toNumber } from "@/shared/utils/numeric";
import {
  expiryFirstQuotaProvider,
  expiryFirstWindowName,
  getExpiryFirstQuotaMetrics,
  getExpiryFirstPlan,
  selectExpiryFirstQuotaWindowNames,
  type ExpiryFirstScope,
} from "./expiryFirstMetrics.ts";
import {
  resolveExpiryFirstConfig,
  resolveExpiryFirstDeadline,
  scoreExpiryFirstQuota,
} from "@omniroute/open-sse/services/combo/quotaScoring.ts";

interface QuotaCacheView {
  provider?: string;
  quotas?: Record<
    string,
    { remainingPercentage?: number; resetAt?: string | null; fractionReported?: boolean }
  >;
}

interface ExpiryFirstCandidate {
  id: string;
  priority?: number | null;
  backoffLevel?: number | null;
  lastUsedAt?: string | null;
  providerSpecificData?: Record<string, unknown> | null;
}

function toStringOrNull(value: unknown): string | null {
  return typeof value === "string" && value.trim().length > 0 ? value : null;
}

/**
 * Adapts the per-connection quota cache to the shape the combo quota scorers read.
 * The cache stores `{ quotas: { <window>: { remainingPercentage, resetAt } } }`
 * (percent REMAINING, 0-100); the scorers read `{ windows: { <window>:
 * { percentUsed, resetAt } } }` (fraction USED, 0-1). Converting rather than
 * re-fetching keeps account selection free of any upstream quota call.
 *
 * Returns null when no window carries a usable percentage, so the caller can
 * tell "no telemetry" apart from "telemetry says empty".
 */
export function buildConnectionQuotaWindowsView(
  connectionId: string,
  scope?: ExpiryFirstScope
): Record<string, unknown> | null {
  const entry = getQuotaCacheOrSnapshot(connectionId) as QuotaCacheView | null;
  const quotas = entry?.quotas;
  if (!quotas) return null;

  const windows: Record<
    string,
    { percentUsed: number | null; resetAt: string | null; fractionReported?: false }
  > = {};
  let hasReportedWindow = false;
  const quotaNames = Object.keys(quotas);
  const provider = expiryFirstQuotaProvider(entry?.provider, scope?.provider);
  const windowNames = scope ? selectExpiryFirstQuotaWindowNames(quotaNames, scope) : quotaNames;
  for (const windowName of windowNames) {
    const quota = quotas[windowName];
    if (!quota) continue;
    if (quota.fractionReported === false) {
      // Keep reset telemetry without turning the cache's sentinel zero into an
      // exhausted fraction (or promoting a short session to the deadline).
      windows[expiryFirstWindowName(provider, windowName, quotaNames)] = {
        percentUsed: null,
        resetAt: toStringOrNull(quota.resetAt),
        fractionReported: false,
      };
      continue;
    }
    const remainingPercent = toNumber(quota?.remainingPercentage, Number.NaN);
    if (!Number.isFinite(remainingPercent)) continue;
    hasReportedWindow = true;
    windows[expiryFirstWindowName(provider, windowName, quotaNames)] = {
      percentUsed: Math.min(1, Math.max(0, 1 - remainingPercent / 100)),
      resetAt: toStringOrNull(quota?.resetAt),
    };
  }

  return hasReportedWindow ? { windows } : null;
}

/**
 * Orders accounts for `expiry-first` and returns the winner.
 *
 * Pure and quota-source agnostic (`resolveQuotaView` is injected) so the ranking
 * is testable without a database or an upstream call.
 *
 * Accounts within `expiryFirstTieBandPercent` of the leader — compared
 * RELATIVELY, since the score is a rate and not a 0-1 value — are equivalent and
 * rotate least-recently-used. Without the band a rounding difference would pin
 * every request to one account and the strategy would degenerate into fill-first
 * for a pool of equivalent accounts.
 */
export function selectExpiryFirstConnection<T extends ExpiryFirstCandidate>(
  connections: readonly T[],
  settings: Record<string, unknown> | null,
  resolveQuotaView: (connectionId: string) => Record<string, unknown> | null,
  nowMs: number = Date.now(),
  scope?: ExpiryFirstScope,
  resolveMetrics: (
    connection: T,
    scope: ExpiryFirstScope,
    nowMs: number
  ) => ReturnType<typeof getExpiryFirstQuotaMetrics> = (connection, metricsScope) =>
    getExpiryFirstQuotaMetrics(
      connection.id,
      getExpiryFirstPlan(connection.providerSpecificData),
      metricsScope
    )
): T | null {
  if (connections.length === 0) return null;

  const config = resolveExpiryFirstConfig(settings);
  if (config.order === "deadline") {
    const winner = selectByNearestDeadline(connections, config, resolveQuotaView, nowMs);
    if (winner) return winner;
    // No account reports both quota and a reset: rank on the rate below instead.
  }
  const scored = connections.map((candidate) => ({
    candidate,
    score: scoreExpiryFirstQuota(
      resolveQuotaView(candidate.id),
      config,
      nowMs,
      scope ? resolveMetrics(candidate, scope, nowMs) : undefined
    ).score,
  }));
  scored.sort((a, b) => {
    if (a.score !== b.score) return b.score - a.score; // most urgent first
    return (a.candidate.priority || 999) - (b.candidate.priority || 999);
  });

  const bestScore = scored[0].score;
  // Every account scored zero (no telemetry, or all exhausted): fall through to
  // the priority order the pool arrived in rather than picking arbitrarily.
  if (bestScore <= 0) return connections[0];

  const tied = scored.filter((entry) => (bestScore - entry.score) / bestScore <= config.tieBand);
  if (tied.length <= 1) return scored[0].candidate;
  return pickLeastRecentlyUsed(tied.map((entry) => entry.candidate));
}

/** Tie-break inside a band of equivalent accounts: lowest backoff, then least recently used. */
function pickLeastRecentlyUsed<T extends ExpiryFirstCandidate>(tied: readonly T[]): T {
  return [...tied].sort((a, b) => {
    const aBackoff = a.backoffLevel || 0;
    const bBackoff = b.backoffLevel || 0;
    if (aBackoff !== bBackoff) return aBackoff - bBackoff;
    if (!a.lastUsedAt && !b.lastUsedAt) return (a.priority || 999) - (b.priority || 999);
    if (!a.lastUsedAt) return -1;
    if (!b.lastUsedAt) return 1;
    return new Date(a.lastUsedAt).getTime() - new Date(b.lastUsedAt).getTime();
  })[0];
}

/**
 * `expiryFirstOrder: "deadline"`: spend the account whose quota is lost first,
 * for as long as it has quota. Accounts whose deadlines fall within
 * `deadlineTieMs` of the nearest one are equivalent and rotate least-recently-used.
 * Returns null when no account reports both usable quota and a reset.
 */
function selectByNearestDeadline<T extends ExpiryFirstCandidate>(
  connections: readonly T[],
  config: ReturnType<typeof resolveExpiryFirstConfig>,
  resolveQuotaView: (connectionId: string) => Record<string, unknown> | null,
  nowMs: number
): T | null {
  const eligible = connections
    .map((candidate) => ({
      candidate,
      deadline: resolveExpiryFirstDeadline(resolveQuotaView(candidate.id), config, nowMs),
    }))
    .filter(
      (entry): entry is { candidate: T; deadline: { usable: number; msUntilDeadline: number } } =>
        entry.deadline !== null && Number.isFinite(entry.deadline.msUntilDeadline)
    );
  if (eligible.length === 0) return null;
  const nearest = Math.min(...eligible.map((entry) => entry.deadline.msUntilDeadline));
  const tied = eligible.filter(
    (entry) => entry.deadline.msUntilDeadline - nearest <= config.deadlineTieMs
  );
  return pickLeastRecentlyUsed(tied.map((entry) => entry.candidate));
}

/**
 * The `getProviderCredentials` entry point: ranks the ordered pool against the
 * live quota cache and falls back to the first connection when the pool yields
 * no winner. The caller commits `lastUsedAt` afterwards (same as least-used,
 * #10945) because the tie band reads that field.
 */
/**
 * True when the settings ask expiry-first for `deadline` order. That order is an
 * explicit "spend this account first" decision, so callers must not move the
 * request to another account afterwards (e.g. OAuth session spreading).
 */
export function isExpiryFirstDeadlineOrder(settings: unknown): boolean {
  return resolveExpiryFirstConfig(settings as Record<string, unknown> | null).order === "deadline";
}

export function pickExpiryFirstConnection<T extends ExpiryFirstCandidate>(
  orderedConnections: readonly T[],
  settings: unknown,
  scope?: ExpiryFirstScope
): T {
  const resolveScopedView = (connectionId: string) =>
    buildConnectionQuotaWindowsView(connectionId, scope);

  return (
    selectExpiryFirstConnection(
      orderedConnections,
      settings as Record<string, unknown> | null,
      resolveScopedView,
      Date.now(),
      scope
    ) ?? orderedConnections[0]
  );
}
