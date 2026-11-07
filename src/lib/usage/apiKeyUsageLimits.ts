import { getDbInstance } from "@/lib/db/core";
import type { ProviderLimitsCacheEntry } from "@/lib/db/providerLimits";
import { getProviderQuotaWindowStartIso } from "@/lib/db/quotaResetEvents";
import { getOldestSearchLedgerSpendSince, sumSearchLedgerSpendSince } from "@/lib/db/costLedger";
import { calculateCostDetailed } from "./costCalculator";
import { isAnthropicMessagesRequest } from "@/shared/utils/anthropicErrorEnvelope";

import {
  calendarWeekWindowMs,
  isValidIanaTimeZone,
} from "@omniroute/open-sse/services/dailyQuotaReset.ts";
import {
  buildErrorBody,
  errorResponse,
  resolveRetryAfterInstant,
  sanitizeErrorMessage,
} from "@omniroute/open-sse/utils/error.ts";
import {
  getUnpricedUsageBudgetPolicy,
  type UnpricedUsageBudgetPolicy,
} from "@/shared/utils/featureFlags";

const FORTALEZA_UTC_OFFSET_MS = 3 * 60 * 60 * 1000;
const DAY_MS = 24 * 60 * 60 * 1000;
const WEEK_MS = 7 * 24 * 60 * 60 * 1000;
export const FIVE_HOUR_WINDOW_MS = 5 * 60 * 60 * 1000;

export interface ApiKeyUsageLimitMetadata {
  id: string;
  allowedConnections?: string[] | null;
  preferredProvider?: string | null;
  usageLimitEnabled?: boolean;
  dailyUsageLimitUsd?: number | null;
  weeklyUsageLimitUsd?: number | null;
  fiveHourUsageLimitUsd?: number | null;
}

export interface ApiKeyUsageLimitStatus {
  enabled: boolean;
  dailyLimitUsd: number | null;
  weeklyLimitUsd: number | null;
  dailySpentUsd: number;
  weeklySpentUsd: number;
  dailyWindowStartIso: string;
  dailyResetAtIso: string;
  weeklyWindowStartIso: string;
  weeklyResetAtIso: string | null;
  dailyExceeded: boolean;
  weeklyExceeded: boolean;
  /**
   * True when at least one usage_history row in the daily/weekly window could not
   * be priced at all (no pricing row for the provider+model — e.g. a routing
   * alias such as `auto`, #12341). Under the default `fail_closed` policy an
   * unpriced row forces `*Exceeded = true` rather than silently contributing $0
   * to spend, since a real cost may be hiding behind it. Under `count_as_zero`
   * the row counts as $0 and only the priced spend is enforced.
   */
  dailyHasUnpricedUsage?: boolean;
  weeklyHasUnpricedUsage?: boolean;
  /** `provider/model` labels of the unpriced usage in each window (sorted, deduplicated). */
  dailyUnpricedModels?: string[];
  weeklyUnpricedModels?: string[];
  /**
   * True when a cost lookup threw in that window (pricing store unreadable,
   * malformed row). The real spend is unknown, so the window blocks under every
   * UNPRICED_USAGE_BUDGET_POLICY value.
   */
  dailyPricingFailure?: boolean;
  weeklyPricingFailure?: boolean;
  /** Effective UNPRICED_USAGE_BUDGET_POLICY used to compute `*Exceeded`. */
  unpricedUsagePolicy?: UnpricedUsageBudgetPolicy;
  /**
   * Rolling 5-hour window (mirrors the Claude/Codex session window), enforced with the
   * same unpriced/pricing-failure rules as daily and weekly. Spend frees up as requests
   * older than 5 h age out, so the reset is the oldest in-window spend + 5 h (now + 5 h
   * when the window is empty). That frees the oldest spend only: a key far over its limit
   * can still be over it at that instant, and is then told the next reset. Only queried
   * when a 5 h limit is configured.
   */
  fiveHourLimitUsd?: number | null;
  fiveHourSpentUsd?: number;
  fiveHourWindowStartIso?: string;
  fiveHourResetAtIso?: string | null;
  fiveHourExceeded?: boolean;
  fiveHourHasUnpricedUsage?: boolean;
  fiveHourUnpricedModels?: string[];
  fiveHourPricingFailure?: boolean;
}

export interface ApiKeyUsageLimitDeps {
  now?: () => number;
  getProviderConnectionById?: (connectionId: string) => Promise<unknown>;
  getProviderConnections?: (filter?: Record<string, unknown>) => Promise<unknown[]>;
  getProviderLimitsCache?: (connectionId: string) => ProviderLimitsCacheEntry | null;
  getAllProviderLimitsCache?: () => Record<string, ProviderLimitsCacheEntry>;
  getUnpricedUsagePolicy?: () => UnpricedUsageBudgetPolicy;
}

interface UsageCostRow {
  storedCost: number | null;
  unmeteredRequests: number | null;
  provider: string | null;
  model: string | null;
  serviceTier: string | null;
  promptTokens: number | null;
  completionTokens: number | null;
  cacheReadTokens: number | null;
  cacheCreationTokens: number | null;
  reasoningTokens: number | null;
  oldestTimestamp: string | null;
}

interface WeeklyResetCandidate {
  connectionId: string;
  provider: string;
  resetAtIso: string;
  observedWindowStartIso: string | null;
}

interface QuotaSnapshotRow {
  remainingPercentage: number | null;
  nextResetAt: string | null;
  createdAt: string | null;
}

function toNumber(value: unknown): number {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim()) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : 0;
  }
  return 0;
}

function asRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function normalizeLimitUsd(value: unknown): number | null {
  const numeric = toNumber(value);
  return numeric > 0 ? numeric : null;
}

function roundUsd(value: number): number {
  return Math.round(value * 1_000_000) / 1_000_000;
}

function clampPercent(value: number): number {
  return Math.max(0, Math.min(100, value));
}

function formatUsd(value: number | null): string {
  if (value === null || !Number.isFinite(value)) return "Not configured";
  return `$${value.toFixed(2)}`;
}

function getUsagePercent(spentUsd: number, limitUsd: number | null): number | null {
  if (limitUsd === null || !Number.isFinite(limitUsd) || limitUsd <= 0) return null;
  return (spentUsd / limitUsd) * 100;
}

function formatUsagePercent(percent: number | null): string {
  if (percent === null || !Number.isFinite(percent)) return "Unavailable";
  return `${Math.round(percent)}%`;
}

function formatLeftPercent(percent: number | null): string {
  if (percent === null || !Number.isFinite(percent)) return "Unavailable";
  return `${Math.round(100 - clampPercent(percent))}% left`;
}

function formatResetIn(resetAt: string | null, now = Date.now()): string {
  if (!resetAt) return "unknown";
  const resetMs = Date.parse(resetAt);
  if (!Number.isFinite(resetMs)) return "unknown";

  const deltaMs = resetMs - now;
  if (deltaMs <= 0) return "now";

  const minuteMs = 60_000;
  const totalMinutes = Math.max(1, Math.ceil(deltaMs / minuteMs));
  const dayMinutes = 24 * 60;
  const days = Math.floor(totalMinutes / dayMinutes);
  const hours = Math.floor((totalMinutes % dayMinutes) / 60);
  const minutes = totalMinutes % 60;

  if (days > 0) return `${days}d ${hours}h ${minutes}m`;
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
}

function resetDay(value: string | null): string | null {
  if (!value) return null;
  const parsed = Date.parse(value);
  if (!Number.isFinite(parsed)) return null;
  return new Date(parsed).toISOString().slice(0, 10);
}

export function getFortalezaDayStartIso(nowMs = Date.now()): string {
  const fortalezaLocal = new Date(nowMs - FORTALEZA_UTC_OFFSET_MS);
  return new Date(
    Date.UTC(
      fortalezaLocal.getUTCFullYear(),
      fortalezaLocal.getUTCMonth(),
      fortalezaLocal.getUTCDate(),
      3,
      0,
      0,
      0
    )
  ).toISOString();
}

export function getFortalezaDayResetIso(nowMs = Date.now()): string {
  return new Date(Date.parse(getFortalezaDayStartIso(nowMs)) + DAY_MS).toISOString();
}

export function getRollingWeekStartIso(nowMs = Date.now()): string {
  return new Date(nowMs - WEEK_MS).toISOString();
}

function normalizeQuotaName(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function normalizeProvider(value: unknown): string {
  if (typeof value !== "string") return "";
  const normalized = value.trim().toLowerCase();
  if (normalized === "cc" || normalized === "claude-code") return "claude";
  return normalized;
}

function findWeeklyQuotaResetAt(quotas: unknown, nowMs: number): string | null {
  const quotaEntries: Array<[string, Record<string, unknown>]> = [];
  if (Array.isArray(quotas)) {
    for (const item of quotas) {
      const quota = asRecord(item);
      if (!quota) continue;
      const name = typeof quota.name === "string" ? quota.name : "";
      quotaEntries.push([name, quota]);
    }
  } else {
    const quotaMap = asRecord(quotas);
    if (quotaMap) {
      for (const [name, value] of Object.entries(quotaMap)) {
        const quota = asRecord(value);
        if (quota) quotaEntries.push([name, quota]);
      }
    }
  }

  for (const [name, quota] of quotaEntries) {
    const label = normalizeQuotaName(`${name} ${typeof quota.name === "string" ? quota.name : ""}`);
    if (!label) continue;
    const isWeekly = label.includes("weekly") || label.includes("7d");
    if (!isWeekly || label.includes("sonnet")) continue;
    const resetAt = typeof quota.resetAt === "string" && quota.resetAt.trim() ? quota.resetAt : "";
    const resetMs = Date.parse(resetAt);
    if (Number.isFinite(resetMs) && resetMs > nowMs) {
      return new Date(resetMs).toISOString();
    }
  }

  return null;
}

function connectionFromValue(value: unknown): { id: string; provider: string } | null {
  const record = asRecord(value);
  if (!record) return null;
  const id = typeof record.id === "string" ? record.id : "";
  const provider = typeof record.provider === "string" ? record.provider : "";
  if (!id || !provider || record.isActive === false) return null;
  return { id, provider };
}

function isWeeklyQuotaResetSnapshot(row: QuotaSnapshotRow, targetResetAtIso: string): boolean {
  const targetDay = resetDay(targetResetAtIso);
  if (!targetDay) return false;
  return resetDay(row.nextResetAt) === targetDay;
}

function getObservedWeeklyWindowStartIso(
  connectionId: string,
  targetResetAtIso: string,
  nowMs: number
): string | null {
  if (!connectionId || !targetResetAtIso) return null;

  try {
    const rows = getDbInstance()
      .prepare(
        `
        SELECT
          remaining_percentage as remainingPercentage,
          next_reset_at as nextResetAt,
          created_at as createdAt
        FROM quota_snapshots
        WHERE connection_id = @connectionId
          AND LOWER(window_key) LIKE '%weekly%'
          AND LOWER(window_key) NOT LIKE '%sonnet%'
          AND created_at <= @nowIso
        ORDER BY created_at ASC, id ASC
      `
      )
      .all({ connectionId, nowIso: new Date(nowMs).toISOString() }) as QuotaSnapshotRow[];

    let observedStartIso: string | null = null;
    let previousUsedPercent: number | null = null;

    for (const row of rows) {
      if (!row.createdAt || !isWeeklyQuotaResetSnapshot(row, targetResetAtIso)) continue;
      const remaining = toNumber(row.remainingPercentage);
      const usedPercent = clampPercent(100 - remaining);

      if (!observedStartIso) {
        observedStartIso = row.createdAt;
      } else if (previousUsedPercent !== null) {
        const droppedToResetFloor = usedPercent <= 1 && previousUsedPercent > usedPercent;
        const significantDrop = previousUsedPercent - usedPercent >= 5;
        if (droppedToResetFloor || significantDrop) {
          observedStartIso = row.createdAt;
        }
      }

      previousUsedPercent = usedPercent;
    }

    return observedStartIso;
  } catch {
    return null;
  }
}

// Prefer the persisted, provider-observed window start (recorded by
// quotaResetEvents on real reset transitions); fall back to inferring it from
// historical snapshots when no observed event is available yet.
function getWeeklyWindowStartIso(
  connectionId: string,
  targetResetAtIso: string,
  nowMs: number
): string | null {
  return (
    getProviderQuotaWindowStartIso(connectionId, targetResetAtIso, nowMs) ??
    getObservedWeeklyWindowStartIso(connectionId, targetResetAtIso, nowMs)
  );
}

async function resolveDeps(deps: ApiKeyUsageLimitDeps): Promise<Required<ApiKeyUsageLimitDeps>> {
  const providers =
    deps.getProviderConnectionById && deps.getProviderConnections
      ? null
      : await import("@/lib/db/providers");
  const providerLimits =
    deps.getProviderLimitsCache && deps.getAllProviderLimitsCache
      ? null
      : await import("@/lib/db/providerLimits");

  return {
    now: deps.now ?? Date.now,
    getProviderConnectionById:
      deps.getProviderConnectionById ?? providers!.getProviderConnectionById,
    getProviderConnections: deps.getProviderConnections ?? providers!.getProviderConnections,
    getProviderLimitsCache: deps.getProviderLimitsCache ?? providerLimits!.getProviderLimitsCache,
    getAllProviderLimitsCache:
      deps.getAllProviderLimitsCache ?? providerLimits!.getAllProviderLimitsCache,
    getUnpricedUsagePolicy: deps.getUnpricedUsagePolicy ?? getUnpricedUsageBudgetPolicy,
  };
}

async function getProviderWeeklyWindow(
  metadata: ApiKeyUsageLimitMetadata,
  deps: Required<ApiKeyUsageLimitDeps>,
  nowMs: number
): Promise<{ resetAtIso: string | null; windowStartIso: string | null }> {
  const allowedConnections = Array.isArray(metadata.allowedConnections)
    ? metadata.allowedConnections.filter((id) => typeof id === "string" && id.trim())
    : [];

  const resetCandidates: WeeklyResetCandidate[] = [];
  if (allowedConnections.length > 0) {
    for (const connectionId of allowedConnections) {
      const connection = connectionFromValue(await deps.getProviderConnectionById(connectionId));
      if (!connection) continue;
      const resetAt = findWeeklyQuotaResetAt(
        deps.getProviderLimitsCache(connection.id)?.quotas,
        nowMs
      );
      if (resetAt) {
        resetCandidates.push({
          connectionId: connection.id,
          provider: connection.provider,
          resetAtIso: resetAt,
          observedWindowStartIso: getWeeklyWindowStartIso(connection.id, resetAt, nowMs),
        });
      }
    }
  } else {
    const caches = deps.getAllProviderLimitsCache();
    const connections = await deps.getProviderConnections({ isActive: true });
    for (const rawConnection of connections) {
      const connection = connectionFromValue(rawConnection);
      if (!connection) continue;
      const resetAt = findWeeklyQuotaResetAt(caches[connection.id]?.quotas, nowMs);
      if (resetAt) {
        resetCandidates.push({
          connectionId: connection.id,
          provider: connection.provider,
          resetAtIso: resetAt,
          observedWindowStartIso: getWeeklyWindowStartIso(connection.id, resetAt, nowMs),
        });
      }
    }
  }

  const preferredProvider = normalizeProvider(metadata.preferredProvider);
  const scopedCandidates = preferredProvider
    ? resetCandidates.filter(
        (candidate) => normalizeProvider(candidate.provider) === preferredProvider
      )
    : [];
  const candidates = scopedCandidates.length > 0 ? scopedCandidates : resetCandidates;
  const selected =
    candidates
      .sort((left, right) => Date.parse(left.resetAtIso) - Date.parse(right.resetAtIso))
      .at(0) ?? null;
  return {
    resetAtIso: selected?.resetAtIso ?? null,
    windowStartIso: selected?.observedWindowStartIso ?? null,
  };
}

export type ApiKeyWeeklyWindowMode = "provider" | "calendar";

export interface ApiKeyWeeklyWindowSetting {
  mode: ApiKeyWeeklyWindowMode;
  timeZone: string;
}

const warnedWeeklyWindowValues = new Set<string>();

function warnWeeklyWindowValueOnce(message: string): void {
  if (warnedWeeklyWindowValues.has(message)) return;
  warnedWeeklyWindowValues.add(message);
  console.warn(`[apiKeyUsageLimits] ${message}`);
}

function getProcessTimeZone(): string {
  return Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
}

/**
 * Weekly window used by per-key USD limits.
 * - `provider` (default): end at the earliest weekly reset among the upstream
 *   connections the key can reach; rolling 7 days when none is known.
 * - `calendar`: the local week starting Monday 00:00 in
 *   OMNIROUTE_API_KEY_WEEKLY_WINDOW_TIMEZONE, or in the process timezone when unset.
 */
export function getApiKeyWeeklyWindowSetting(
  env: Record<string, string | undefined> = process.env
): ApiKeyWeeklyWindowSetting {
  const rawMode = (env.OMNIROUTE_API_KEY_WEEKLY_WINDOW ?? "").trim().toLowerCase();
  if (rawMode && rawMode !== "provider" && rawMode !== "calendar") {
    warnWeeklyWindowValueOnce(
      `OMNIROUTE_API_KEY_WEEKLY_WINDOW="${rawMode}" is not provider|calendar; using provider`
    );
  }
  const rawTimeZone = (env.OMNIROUTE_API_KEY_WEEKLY_WINDOW_TIMEZONE ?? "").trim();
  if (rawTimeZone && !isValidIanaTimeZone(rawTimeZone)) {
    warnWeeklyWindowValueOnce(
      `OMNIROUTE_API_KEY_WEEKLY_WINDOW_TIMEZONE="${rawTimeZone}" is not an IANA timezone; using the process timezone`
    );
  }
  return {
    mode: rawMode === "calendar" ? "calendar" : "provider",
    timeZone: rawTimeZone && isValidIanaTimeZone(rawTimeZone) ? rawTimeZone : getProcessTimeZone(),
  };
}

function getCalendarWeeklyWindow(
  timeZone: string,
  nowMs: number
): { resetAtIso: string; windowStartIso: string } {
  const { startMs, resetMs } = calendarWeekWindowMs(timeZone, nowMs);
  return {
    resetAtIso: new Date(resetMs).toISOString(),
    windowStartIso: new Date(startMs).toISOString(),
  };
}

interface ApiKeyUsdSpend {
  totalUsd: number;
  /** True when at least one (provider, model) group had no pricing row at all (#12341). */
  hasUnpricedUsage: boolean;
  /** Sorted, deduplicated `provider/model` labels of those unpriced groups. */
  unpricedModels: string[];
  /**
   * True when a cost lookup threw (pricing store unreadable, malformed row).
   * Always blocks a limited window, independent of UNPRICED_USAGE_BUDGET_POLICY.
   */
  hasPricingFailure: boolean;
  /** Oldest counted usage_history row in the window; only the 5 h reset reads it. */
  oldestUsageAtIso: string | null;
}

const EMPTY_SPEND: ApiKeyUsdSpend = {
  totalUsd: 0,
  hasUnpricedUsage: false,
  unpricedModels: [],
  hasPricingFailure: false,
  oldestUsageAtIso: null,
};

/** Oldest row across the groups the total counts; a group without provider/model is skipped. */
function getOldestCountedUsageIso(rows: UsageCostRow[]): string | null {
  const oldestTimes = rows
    .filter((row) => row.provider && row.model)
    .map((row) => Date.parse(row.oldestTimestamp ?? ""))
    .filter(Number.isFinite);
  return oldestTimes.length > 0 ? new Date(Math.min(...oldestTimes)).toISOString() : null;
}

async function getApiKeyUsdSpendSince(apiKeyId: string, sinceIso: string): Promise<ApiKeyUsdSpend> {
  if (!apiKeyId) return EMPTY_SPEND;
  const db = getDbInstance();
  const rows = db
    .prepare(
      `
      SELECT
        LOWER(provider) as provider,
        LOWER(model) as model,
        COALESCE(NULLIF(service_tier, ''), 'standard') as serviceTier,
        COALESCE(SUM(provider_cost_usd), 0) as storedCost,
        COALESCE(SUM(CASE WHEN provider_cost_usd IS NULL THEN 1 ELSE 0 END), 0) as unmeteredRequests,
        COALESCE(SUM(CASE WHEN provider_cost_usd IS NULL THEN tokens_input ELSE 0 END), 0) as promptTokens,
        COALESCE(SUM(CASE WHEN provider_cost_usd IS NULL THEN tokens_output ELSE 0 END), 0) as completionTokens,
        COALESCE(SUM(CASE WHEN provider_cost_usd IS NULL THEN tokens_cache_read ELSE 0 END), 0) as cacheReadTokens,
        COALESCE(SUM(CASE WHEN provider_cost_usd IS NULL THEN tokens_cache_creation ELSE 0 END), 0) as cacheCreationTokens,
        COALESCE(SUM(CASE WHEN provider_cost_usd IS NULL THEN tokens_reasoning ELSE 0 END), 0) as reasoningTokens,
        MIN(timestamp) as oldestTimestamp
      FROM usage_history
      WHERE api_key_id = @apiKeyId
        AND timestamp >= @sinceIso
        AND (success = 1 OR provider_cost_usd IS NOT NULL)
      GROUP BY LOWER(provider), LOWER(model), serviceTier
    `
    )
    .all({ apiKeyId, sinceIso }) as UsageCostRow[];

  let total = 0;
  const unpriced = new Set<string>();
  let hasPricingFailure = false;
  for (const row of rows) {
    const provider = typeof row.provider === "string" ? row.provider : "";
    const model = typeof row.model === "string" ? row.model : "";
    if (!provider || !model) continue;

    // A provider-reported exact cost is the billed amount (credit-metered providers,
    // xAI). Those rows' tokens are excluded above, and they never make the group
    // unpriced: only rows without a stored cost are priced from tokens.
    total += toNumber(row.storedCost);
    if (toNumber(row.unmeteredRequests) === 0) continue;

    const { costUsd, priced, failed } = await calculateCostDetailed(
      provider,
      model,
      {
        input: toNumber(row.promptTokens),
        output: toNumber(row.completionTokens),
        cacheRead: toNumber(row.cacheReadTokens),
        cacheCreation: toNumber(row.cacheCreationTokens),
        reasoning: toNumber(row.reasoningTokens),
      },
      {
        provider,
        model,
        serviceTier: row.serviceTier || "standard",
      }
    );
    if (failed) {
      hasPricingFailure = true;
      console.warn(
        `[apiKeyUsageLimits] cost lookup failed for ${provider}/${model} — failing closed (#12341)`
      );
    } else if (!priced) {
      unpriced.add(`${provider}/${model}`);
      console.warn(
        `[apiKeyUsageLimits] no pricing found for ${provider}/${model} — usage counted as $0; ` +
          "a configured USD quota fails closed unless the unpriced-usage policy opts out (#12341)"
      );
    }
    total += costUsd;
  }

  // Web search spend is not in usage_history; it lives in request_cost_ledger
  // under the search-only service_tier marker, so chat rows are never re-counted.
  total += sumSearchLedgerSpendSince(apiKeyId, sinceIso);
  return {
    totalUsd: roundUsd(total),
    hasUnpricedUsage: unpriced.size > 0,
    unpricedModels: [...unpriced].sort(),
    hasPricingFailure,
    oldestUsageAtIso: getOldestCountedUsageIso(rows),
  };
}

interface FiveHourWindow {
  windowStartIso: string;
  resetAtIso: string | null;
  spend: ApiKeyUsdSpend;
}

async function getFiveHourWindow(
  apiKeyId: string,
  limitUsd: number | null,
  nowMs: number
): Promise<FiveHourWindow> {
  const windowStartIso = new Date(nowMs - FIVE_HOUR_WINDOW_MS).toISOString();
  // Skipped without a 5 h limit: no extra usage_history scan per request.
  if (limitUsd === null) return { windowStartIso, resetAtIso: null, spend: EMPTY_SPEND };

  const spend = await getApiKeyUsdSpendSince(apiKeyId, windowStartIso);
  // Web search spend counts toward the window but lives in the ledger, so it ages out too.
  const oldestMs = Math.min(
    ...[spend.oldestUsageAtIso, getOldestSearchLedgerSpendSince(apiKeyId, windowStartIso)]
      .map((iso) => Date.parse(iso ?? ""))
      .filter(Number.isFinite)
  );
  const resetMs = Number.isFinite(oldestMs) ? oldestMs : nowMs;
  return {
    windowStartIso,
    resetAtIso: new Date(resetMs + FIVE_HOUR_WINDOW_MS).toISOString(),
    spend,
  };
}

/** 5 h status fields, with the same unpriced and pricing-failure rules as daily/weekly. */
function fiveHourStatusFields(
  window: FiveHourWindow,
  limitUsd: number | null,
  enabled: boolean,
  failClosed: boolean
) {
  const { totalUsd, hasUnpricedUsage, unpricedModels, hasPricingFailure } = window.spend;
  const blocksOnUnknown = hasPricingFailure || (failClosed && hasUnpricedUsage);
  return {
    fiveHourLimitUsd: limitUsd,
    fiveHourSpentUsd: totalUsd,
    fiveHourWindowStartIso: window.windowStartIso,
    fiveHourResetAtIso: window.resetAtIso,
    fiveHourExceeded: enabled && limitUsd !== null && (totalUsd >= limitUsd || blocksOnUnknown),
    fiveHourHasUnpricedUsage: hasUnpricedUsage,
    fiveHourUnpricedModels: unpricedModels,
    fiveHourPricingFailure: hasPricingFailure,
  };
}

export async function getApiKeyUsageLimitStatus(
  metadata: ApiKeyUsageLimitMetadata,
  deps: ApiKeyUsageLimitDeps = {}
): Promise<ApiKeyUsageLimitStatus> {
  const resolvedDeps = await resolveDeps(deps);
  const now = resolvedDeps.now();
  const dailyWindowStartIso = getFortalezaDayStartIso(now);
  const dailyResetAtIso = getFortalezaDayResetIso(now);
  const weeklySetting = getApiKeyWeeklyWindowSetting();
  const weeklyWindow =
    weeklySetting.mode === "calendar"
      ? getCalendarWeeklyWindow(weeklySetting.timeZone, now)
      : await getProviderWeeklyWindow(metadata, resolvedDeps, now);
  const weeklyResetAtIso = weeklyWindow.resetAtIso;
  const weeklyWindowStartIso = weeklyWindow.windowStartIso
    ? weeklyWindow.windowStartIso
    : weeklyResetAtIso
      ? new Date(Date.parse(weeklyResetAtIso) - WEEK_MS).toISOString()
      : getRollingWeekStartIso(now);
  const dailyLimitUsd = normalizeLimitUsd(metadata.dailyUsageLimitUsd);
  const weeklyLimitUsd = normalizeLimitUsd(metadata.weeklyUsageLimitUsd);
  const fiveHourLimitUsd = normalizeLimitUsd(metadata.fiveHourUsageLimitUsd);
  const enabled = metadata.usageLimitEnabled === true;

  const [dailySpend, weeklySpend, fiveHour] = await Promise.all([
    getApiKeyUsdSpendSince(metadata.id, dailyWindowStartIso),
    getApiKeyUsdSpendSince(metadata.id, weeklyWindowStartIso),
    getFiveHourWindow(metadata.id, fiveHourLimitUsd, now),
  ]);
  const dailySpentUsd = dailySpend.totalUsd;
  const weeklySpentUsd = weeklySpend.totalUsd;

  // Unpriced usage (#12341) — e.g. a provider's `auto` routing alias or a newly
  // added model with no catalog price. Under the default `fail_closed` policy a
  // window with a configured limit that also contains such usage is treated as
  // exceeded rather than trusting an undercounted spend total. Operators who
  // prefer availability over a strict cap can set UNPRICED_USAGE_BUDGET_POLICY
  // to `count_as_zero`: the usage then counts as $0 and only priced spend is
  // enforced. A window with no configured limit was never enforced, so unpriced
  // usage there is only logged, not blocking. A cost lookup that *threw* is not
  // "unpriced" — the true spend is unknown — so it blocks under every policy.
  const unpricedUsagePolicy = resolvedDeps.getUnpricedUsagePolicy();
  const failClosed = unpricedUsagePolicy !== "count_as_zero";
  const dailyBlocksOnUnknown =
    dailySpend.hasPricingFailure || (failClosed && dailySpend.hasUnpricedUsage);
  const weeklyBlocksOnUnknown =
    weeklySpend.hasPricingFailure || (failClosed && weeklySpend.hasUnpricedUsage);
  const dailyExceeded =
    enabled && dailyLimitUsd !== null && (dailySpentUsd >= dailyLimitUsd || dailyBlocksOnUnknown);
  const weeklyExceeded =
    enabled &&
    weeklyLimitUsd !== null &&
    (weeklySpentUsd >= weeklyLimitUsd || weeklyBlocksOnUnknown);

  return {
    enabled,
    dailyLimitUsd,
    weeklyLimitUsd,
    dailySpentUsd,
    weeklySpentUsd,
    dailyWindowStartIso,
    dailyResetAtIso,
    weeklyWindowStartIso,
    weeklyResetAtIso,
    dailyExceeded,
    weeklyExceeded,
    dailyHasUnpricedUsage: dailySpend.hasUnpricedUsage,
    weeklyHasUnpricedUsage: weeklySpend.hasUnpricedUsage,
    dailyUnpricedModels: dailySpend.unpricedModels,
    weeklyUnpricedModels: weeklySpend.unpricedModels,
    dailyPricingFailure: dailySpend.hasPricingFailure,
    weeklyPricingFailure: weeklySpend.hasPricingFailure,
    unpricedUsagePolicy,
    ...fiveHourStatusFields(fiveHour, fiveHourLimitUsd, enabled, failClosed),
  };
}

function hasFiveHourLimit(status: ApiKeyUsageLimitStatus): boolean {
  return typeof status.fiveHourLimitUsd === "number" && status.fiveHourLimitUsd > 0;
}

function fiveHourTextLines(status: ApiKeyUsageLimitStatus, now: number): string[] {
  if (!hasFiveHourLimit(status)) return [];
  const spentUsd = status.fiveHourSpentUsd ?? 0;
  return [
    "5-hour quota",
    formatUsd(status.fiveHourLimitUsd ?? null),
    "5-hour spent",
    formatUsd(spentUsd),
    "5-hour used",
    formatUsagePercent(getUsagePercent(spentUsd, status.fiveHourLimitUsd ?? null)),
    `Resets in ${formatResetIn(status.fiveHourResetAtIso ?? null, now)}`,
    "",
  ];
}

function fiveHourPercentLines(status: ApiKeyUsageLimitStatus, now: number): string[] {
  if (!hasFiveHourLimit(status)) return [];
  return [
    "5-hour",
    formatLeftPercent(
      getUsagePercent(status.fiveHourSpentUsd ?? 0, status.fiveHourLimitUsd ?? null)
    ),
    `⏱ reset in ${formatResetIn(status.fiveHourResetAtIso ?? null, now)}`,
    "",
  ];
}

export function buildApiKeyUsageLimitText(
  status: ApiKeyUsageLimitStatus,
  now = Date.now()
): string {
  return [
    ...fiveHourTextLines(status, now),
    "Daily quota",
    formatUsd(status.dailyLimitUsd),
    "Daily spent",
    formatUsd(status.dailySpentUsd),
    "Daily used",
    formatUsagePercent(getUsagePercent(status.dailySpentUsd, status.dailyLimitUsd)),
    `Resets in ${formatResetIn(status.dailyResetAtIso, now)}`,
    "",
    "Weekly quota",
    formatUsd(status.weeklyLimitUsd),
    "Weekly spent",
    formatUsd(status.weeklySpentUsd),
    "Weekly used",
    formatUsagePercent(getUsagePercent(status.weeklySpentUsd, status.weeklyLimitUsd)),
    `Resets in ${formatResetIn(status.weeklyResetAtIso, now)}`,
  ].join("\n");
}

export function buildApiKeyUsageLimitPercentText(
  status: ApiKeyUsageLimitStatus,
  now = Date.now()
): string {
  return [
    ...fiveHourPercentLines(status, now),
    "Daily",
    formatLeftPercent(getUsagePercent(status.dailySpentUsd, status.dailyLimitUsd)),
    `⏱ reset in ${formatResetIn(status.dailyResetAtIso, now)}`,
    "",
    "Weekly",
    formatLeftPercent(getUsagePercent(status.weeklySpentUsd, status.weeklyLimitUsd)),
    `⏱ reset in ${formatResetIn(status.weeklyResetAtIso, now)}`,
  ].join("\n");
}

interface UsageWindowView {
  label: "daily" | "weekly" | "5-hour";
  exceeded: boolean;
  limit: number | null;
  spent: number;
  resetAtIso: string | null;
  models: string[] | undefined;
  failed: boolean;
}

/** Every per-key window, in the order they are reported when several are over. */
function usageWindowViews(status: ApiKeyUsageLimitStatus): UsageWindowView[] {
  return [
    {
      label: "daily",
      exceeded: status.dailyExceeded,
      limit: status.dailyLimitUsd,
      spent: status.dailySpentUsd,
      resetAtIso: status.dailyResetAtIso,
      models: status.dailyUnpricedModels,
      failed: status.dailyPricingFailure === true,
    },
    {
      label: "weekly",
      exceeded: status.weeklyExceeded,
      limit: status.weeklyLimitUsd,
      spent: status.weeklySpentUsd,
      resetAtIso: status.weeklyResetAtIso,
      models: status.weeklyUnpricedModels,
      failed: status.weeklyPricingFailure === true,
    },
    {
      label: "5-hour",
      exceeded: status.fiveHourExceeded === true,
      limit: status.fiveHourLimitUsd ?? null,
      spent: status.fiveHourSpentUsd ?? 0,
      resetAtIso: status.fiveHourResetAtIso ?? null,
      models: status.fiveHourUnpricedModels,
      failed: status.fiveHourPricingFailure === true,
    },
  ];
}

/**
 * A window is over on priced spend when its spend alone reaches the limit, as
 * opposed to being exceeded only because of unpriced or unknown usage.
 */
function isPricedOverLimit(window: UsageWindowView): boolean {
  return window.exceeded && window.limit !== null && window.spent >= window.limit;
}

/** "daily", "daily and weekly", "daily, weekly and 5-hour". */
function joinWindowLabels(labels: string[]): string {
  if (labels.length < 2) return labels.join("");
  return `${labels.slice(0, -1).join(", ")} and ${labels.at(-1)}`;
}

const MAX_UNPRICED_MODELS_IN_MESSAGE = 3;

function formatUnpricedModelList(models: string[] | undefined): string {
  const list = Array.isArray(models) ? models : [];
  if (list.length === 0) return "unknown models";
  const shown = list.slice(0, MAX_UNPRICED_MODELS_IN_MESSAGE).join(", ");
  const hidden = list.length - MAX_UNPRICED_MODELS_IN_MESSAGE;
  return hidden > 0 ? `${shown} and ${hidden} more` : shown;
}

/**
 * When the key is blocked only because its spend cannot be determined (no
 * window is over its limit on priced spend alone), say why instead of reporting
 * a low "quota reached" percentage the caller cannot act on (#12341):
 *   - a cost lookup that threw is a transient pricing-store problem → retry;
 *   - otherwise name the models that have no configured price.
 * A genuine priced overage in any window always wins and keeps the regular
 * quota message.
 */
function buildUnpricedUsageBlockedMessage(status: ApiKeyUsageLimitStatus): string | null {
  const windows = usageWindowViews(status);
  const pricedOverage = windows.some(isPricedOverLimit);
  if (pricedOverage) return null;
  const failedWindow = windows.find((w) => w.exceeded && w.limit !== null && w.failed);
  if (failedWindow) {
    return `This API key's ${failedWindow.label} usage cost could not be calculated right now, so its usage quota cannot be enforced. Try again shortly; if this persists, ask an administrator to check the pricing configuration.`;
  }
  const blocked = windows.find(
    (w) => w.exceeded && w.limit !== null && (w.models?.length ?? 0) > 0
  );
  if (!blocked) return null;
  const exceededWindows = windows.filter((w) => w.exceeded);
  const label =
    exceededWindows.length > 1
      ? joinWindowLabels(exceededWindows.map((w) => w.label))
      : blocked.label;
  const models =
    exceededWindows.length > 1
      ? [...new Set(exceededWindows.flatMap((w) => w.models ?? []))].sort()
      : blocked.models;
  // A second blocking window can outlive the first one's reset. Missing
  // pricing also needs an operator action, so no reset is a recovery promise.
  return `This API key's ${label} usage includes models with no configured price (${formatUnpricedModelList(models)}), so its usage quota cannot be enforced. Ask an administrator to add pricing for these models.`;
}

/**
 * Report the window that is genuinely over on priced spend first; a window that
 * is exceeded only because of unpriced/unknown usage must not mask it.
 */
function selectReportedWindow(status: ApiKeyUsageLimitStatus): UsageWindowView | null {
  const windows = usageWindowViews(status);
  return windows.find(isPricedOverLimit) ?? windows.find((w) => w.exceeded) ?? null;
}

function buildNextStep(reported: UsageWindowView, others: UsageWindowView[], now: number): string {
  if (others.length === 0) {
    return `Resets in ${formatResetIn(reported.resetAtIso, now)}. Choose another allowed model after reset.`;
  }
  const blockers = others.length === 1 ? "window also blocks" : "windows also block";
  return `The ${joinWindowLabels(others.map((w) => w.label))} ${blockers} this key; its ${reported.label} reset alone will not restore access.`;
}

function buildUsageLimitExceededMessage(
  status: ApiKeyUsageLimitStatus,
  now = Date.now(),
  options: { showUsd?: boolean } = {}
): string {
  const unpricedMessage = buildUnpricedUsageBlockedMessage(status);
  if (unpricedMessage) return unpricedMessage;
  const showUsd = options.showUsd !== false;
  const reported = selectReportedWindow(status);
  if (reported && reported.limit !== null) {
    const percent = formatUsagePercent(getUsagePercent(reported.spent, reported.limit));
    const others = usageWindowViews(status).filter((w) => w.exceeded && w.label !== reported.label);
    const nextStep = buildNextStep(reported, others, now);
    if (!showUsd) {
      return `This API key reached its ${reported.label} usage quota (${percent}). ${nextStep}`;
    }
    return `This API key reached its ${reported.label} USD usage quota (${formatUsd(reported.spent)} of ${formatUsd(reported.limit)}, ${percent}). ${nextStep}`;
  }
  return showUsd
    ? "This API key reached its USD usage quota. Choose another allowed model or wait for quota reset."
    : "This API key reached its usage quota. Choose another allowed model or wait for quota reset.";
}

export function buildApiKeyUsageLimitRejection(
  request: Request,
  status: ApiKeyUsageLimitStatus,
  now = Date.now(),
  options: { showUsd?: boolean } = {}
): Response {
  const unpricedMessage = buildUnpricedUsageBlockedMessage(status);
  const message = sanitizeErrorMessage(
    unpricedMessage ?? buildUsageLimitExceededMessage(status, now, options)
  );
  // A reset is only actionable if that single priced window caused the
  // rejection. Another blocked window (or missing pricing) may outlive it.
  const severalWindowsBlocked = usageWindowViews(status).filter((w) => w.exceeded).length > 1;
  const trippedResetAtIso =
    unpricedMessage || severalWindowsBlocked
      ? null
      : (selectReportedWindow(status)?.resetAtIso ?? null);
  if (isAnthropicMessagesRequest(request)) {
    // Claude Code treats a non-400 /v1/messages error as an auth failure and triggers
    // a re-login prompt — this branch's status MUST stay 400 (see the "does not trigger
    // login" regression test). The reset timing is still worth surfacing, so it rides
    // along as extra fields on the same Anthropic-shaped error envelope.
    const resolved = resolveRetryAfterInstant(trippedResetAtIso);
    return new Response(
      JSON.stringify({
        type: "error",
        error: {
          type: "invalid_request_error",
          message,
          ...resolved,
        },
      }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  // Missing pricing or a failed lookup needs an administrator or a recovered
  // pricing store, not a timed quota reset. Do not trigger automatic 429 retries.
  if (unpricedMessage) {
    return new Response(JSON.stringify(buildErrorBody(400, message)), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Priced quota overages retain the current 429 + reset timing contract.
  return errorResponse(429, message, {
    code: "usage_limit_exceeded",
    retryAfter: trippedResetAtIso,
  });
}

export async function buildApiKeyUsageLimitPolicyRejection(
  request: Request,
  metadata: ApiKeyUsageLimitMetadata
): Promise<Response | null> {
  const status = await getApiKeyUsageLimitStatus(metadata);
  if (
    !status.enabled ||
    (!status.dailyExceeded && !status.weeklyExceeded && !status.fiveHourExceeded)
  ) {
    return null;
  }
  return buildApiKeyUsageLimitRejection(request, status, Date.now(), {
    showUsd: false,
  });
}
