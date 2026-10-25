/**
 * Cost Rules — Domain Layer (T-19)
 *
 * Business rules for cost management: budget thresholds,
 * scheduled reset windows, and cost summaries per API key.
 *
 * State is persisted in SQLite via domainState.ts.
 *
 * @module domain/costRules
 */

import {
  deleteAllCostData,
  deleteBudget as dbDeleteBudget,
  deleteBudgetUnpricedPeriodStart,
  deleteCostEntries,
  loadAllBudgets,
  loadBudget,
  loadBudgetUnpricedPeriodStart,
  loadCostEntries,
  loadCostEntriesInRange,
  loadCostTotal,
  saveBudget,
  saveBudgetResetLog,
  saveBudgetUnpricedPeriodStart,
} from "../lib/db/domainState";
import {
  discardSpendBatchEntries,
  resetSpendBatchWriterForTests,
  spendBatchWriter,
} from "@/lib/spend/batchWriter";
import { recordLedgerFromCost } from "@/lib/usage/costLedgerRecorder";
import { isFeatureFlagEnabled } from "@/shared/utils/featureFlags";
import { recordUnpricedKeyQuotaUsage } from "@/domain/keyQuota";
import { isFlatRateProvider } from "@/lib/usage/flatRateProviders";

export type BudgetResetInterval = "daily" | "weekly" | "monthly";

interface BudgetConfig {
  dailyLimitUsd?: number;
  weeklyLimitUsd?: number;
  monthlyLimitUsd?: number;
  warningThreshold?: number;
  resetInterval?: BudgetResetInterval;
  resetTime?: string;
  budgetResetAt?: number | null;
  lastBudgetResetAt?: number | null;
  warningEmittedAt?: number | null;
  warningPeriodStart?: number | null;
}

interface NormalizedBudgetConfig {
  dailyLimitUsd: number;
  weeklyLimitUsd: number;
  monthlyLimitUsd: number;
  warningThreshold: number;
  resetInterval: BudgetResetInterval;
  resetTime: string;
  budgetResetAt: number | null;
  lastBudgetResetAt: number | null;
  warningEmittedAt: number | null;
  warningPeriodStart: number | null;
}

interface CostEntry {
  cost: number;
  timestamp: number;
}

interface BudgetWindow {
  periodStartAt: number;
  nextResetAt: number;
}

interface SyncBudgetScheduleOptions {
  logReset?: boolean;
  persist?: boolean;
}

interface BudgetSummary {
  dailyTotal: number;
  monthlyTotal: number;
  totalEntries: number;
  budget: NormalizedBudgetConfig | null;
  totalCostToday: number;
  totalCostMonth: number;
  totalCostPeriod: number;
  activeLimitUsd: number;
  resetInterval: BudgetResetInterval | null;
  resetTime: string | null;
  budgetResetAt: number | null;
  lastBudgetResetAt: number | null;
  periodStartAt: number | null;
  nextResetAt: number | null;
  dailyLimitUsd: number;
  weeklyLimitUsd: number;
  monthlyLimitUsd: number;
  warningThreshold: number | null;
}

const VALID_RESET_INTERVALS = new Set<BudgetResetInterval>(["daily", "weekly", "monthly"]);
const RESET_TIME_REGEX = /^(\d{2}):(\d{2})$/;

/** @type {Map<string, NormalizedBudgetConfig>} In-memory cache for budgets */
const budgets = new Map<string, NormalizedBudgetConfig>();

function toNumber(value: unknown, fallback = 0): number {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim().length > 0) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : fallback;
  }
  return fallback;
}

function toCostEntries(value: unknown): CostEntry[] {
  if (!Array.isArray(value)) return [];
  const entries: CostEntry[] = [];
  for (const item of value) {
    if (!item || typeof item !== "object" || Array.isArray(item)) continue;
    const record = item as Record<string, unknown>;
    const cost = toNumber(record.cost, Number.NaN);
    const timestamp = toNumber(record.timestamp, Number.NaN);
    if (!Number.isFinite(cost) || !Number.isFinite(timestamp)) continue;
    entries.push({ cost, timestamp });
  }
  return entries;
}

function sumEntries(entries: CostEntry[]): number {
  return entries.reduce((sum, entry) => sum + entry.cost, 0);
}

function normalizeResetInterval(value: unknown): BudgetResetInterval {
  if (typeof value === "string") {
    const normalized = value.trim().toLowerCase() as BudgetResetInterval;
    if (VALID_RESET_INTERVALS.has(normalized)) {
      return normalized;
    }
  }
  return "daily";
}

function normalizeResetTime(value: unknown): string {
  if (typeof value === "string") {
    const match = value.trim().match(RESET_TIME_REGEX);
    if (match) {
      const hours = Math.min(Math.max(parseInt(match[1], 10), 0), 23);
      const minutes = Math.min(Math.max(parseInt(match[2], 10), 0), 59);
      return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
    }
  }
  return "00:00";
}

function normalizeTimestamp(value: unknown): number | null {
  const numeric = toNumber(value, Number.NaN);
  return Number.isFinite(numeric) && numeric > 0 ? numeric : null;
}

function normalizeBudgetConfig(config: BudgetConfig): NormalizedBudgetConfig {
  return {
    dailyLimitUsd: Math.max(0, toNumber(config.dailyLimitUsd)),
    weeklyLimitUsd: Math.max(0, toNumber(config.weeklyLimitUsd)),
    monthlyLimitUsd: Math.max(0, toNumber(config.monthlyLimitUsd)),
    warningThreshold: Math.min(Math.max(toNumber(config.warningThreshold, 0.8), 0), 1),
    resetInterval: normalizeResetInterval(config.resetInterval),
    resetTime: normalizeResetTime(config.resetTime),
    budgetResetAt: normalizeTimestamp(config.budgetResetAt),
    lastBudgetResetAt: normalizeTimestamp(config.lastBudgetResetAt),
    warningEmittedAt: normalizeTimestamp(config.warningEmittedAt),
    warningPeriodStart: normalizeTimestamp(config.warningPeriodStart),
  };
}

function getResetTimeParts(resetTime: string): [number, number] {
  const match = resetTime.match(RESET_TIME_REGEX);
  if (!match) return [0, 0];
  return [parseInt(match[1], 10), parseInt(match[2], 10)];
}

function getUtcDateMs(year: number, month: number, day: number, hours: number, minutes: number) {
  return Date.UTC(year, month, day, hours, minutes, 0, 0);
}

export function getBudgetWindow(
  resetInterval: BudgetResetInterval,
  resetTime = "00:00",
  now = Date.now()
): BudgetWindow {
  const current = new Date(now);
  const [hours, minutes] = getResetTimeParts(normalizeResetTime(resetTime));
  const year = current.getUTCFullYear();
  const month = current.getUTCMonth();
  const day = current.getUTCDate();

  if (resetInterval === "weekly") {
    const daysSinceMonday = (current.getUTCDay() + 6) % 7;
    const thisWeekReset = getUtcDateMs(year, month, day - daysSinceMonday, hours, minutes);
    return now >= thisWeekReset
      ? {
          periodStartAt: thisWeekReset,
          nextResetAt: getUtcDateMs(year, month, day - daysSinceMonday + 7, hours, minutes),
        }
      : {
          periodStartAt: getUtcDateMs(year, month, day - daysSinceMonday - 7, hours, minutes),
          nextResetAt: thisWeekReset,
        };
  }

  if (resetInterval === "monthly") {
    const thisMonthReset = getUtcDateMs(year, month, 1, hours, minutes);
    return now >= thisMonthReset
      ? {
          periodStartAt: thisMonthReset,
          nextResetAt: getUtcDateMs(year, month + 1, 1, hours, minutes),
        }
      : {
          periodStartAt: getUtcDateMs(year, month - 1, 1, hours, minutes),
          nextResetAt: thisMonthReset,
        };
  }

  const todayReset = getUtcDateMs(year, month, day, hours, minutes);
  return now >= todayReset
    ? {
        periodStartAt: todayReset,
        nextResetAt: getUtcDateMs(year, month, day + 1, hours, minutes),
      }
    : {
        periodStartAt: getUtcDateMs(year, month, day - 1, hours, minutes),
        nextResetAt: todayReset,
      };
}

function getActiveBudgetLimit(budget: NormalizedBudgetConfig): number {
  if (budget.resetInterval === "monthly") {
    return budget.monthlyLimitUsd > 0 ? budget.monthlyLimitUsd : budget.dailyLimitUsd;
  }
  if (budget.resetInterval === "weekly") {
    return budget.weeklyLimitUsd > 0 ? budget.weeklyLimitUsd : budget.dailyLimitUsd;
  }
  return budget.dailyLimitUsd;
}

/** Start of the period in which this key's budget recorded unpriced usage, or null. */
function getUnpricedPeriodStart(apiKeyId: string): number | null {
  try {
    return loadBudgetUnpricedPeriodStart(apiKeyId);
  } catch {
    // DB may not be ready.
    return null;
  }
}

function clearUnpricedPeriodStart(apiKeyId: string) {
  try {
    deleteBudgetUnpricedPeriodStart(apiKeyId);
  } catch {
    // Non-critical.
  }
}

/**
 * Why the budget refuses more metered spend in this period, or null. Spend over
 * the limit comes first. Otherwise a period that used a metered model with no
 * price fails closed: its total is undercounted and cannot be trusted against a
 * hard cap — the policy the per-key usage limit applies (#12341) — unless
 * USAGE_LIMIT_IGNORE_UNPRICED counts that usage as $0.
 */
function getBudgetRefusalReason(
  apiKeyId: string,
  budget: NormalizedBudgetConfig,
  window: BudgetWindow,
  projectedTotal: number
): string | null {
  const activeLimitUsd = getActiveBudgetLimit(budget);
  if (activeLimitUsd <= 0) return null;
  const interval = `${budget.resetInterval[0].toUpperCase()}${budget.resetInterval.slice(1)}`;
  if (projectedTotal > activeLimitUsd) {
    return `${interval} budget exceeded: $${projectedTotal.toFixed(4)} / $${activeLimitUsd.toFixed(2)}`;
  }
  if (
    getUnpricedPeriodStart(apiKeyId) === window.periodStartAt &&
    !isFeatureFlagEnabled("USAGE_LIMIT_IGNORE_UNPRICED")
  ) {
    return `${interval} budget cannot be enforced: a model without a price was used this period`;
  }
  return null;
}

function getBudgetWindowTotal(apiKeyId: string, periodStartAt: number): number {
  try {
    return (
      loadCostTotal(apiKeyId, periodStartAt) +
      spendBatchWriter.getPendingCostTotal(apiKeyId, periodStartAt)
    );
  } catch {
    return 0;
  }
}

function getBudgetWindowRangeTotal(
  apiKeyId: string,
  periodStartAt: number,
  periodEndAt: number
): number {
  try {
    return (
      sumEntries(toCostEntries(loadCostEntriesInRange(apiKeyId, periodStartAt, periodEndAt))) +
      spendBatchWriter.getPendingCostTotal(apiKeyId, periodStartAt, periodEndAt)
    );
  } catch {
    return 0;
  }
}

function emitBudgetWarning(
  apiKeyId: string,
  budget: NormalizedBudgetConfig,
  projectedTotal: number,
  activeLimitUsd: number,
  nextResetAt: number
) {
  const percentage =
    activeLimitUsd > 0 ? ((projectedTotal / activeLimitUsd) * 100).toFixed(1) : "0.0";
  console.warn(
    `[BudgetWarning] ${apiKeyId} reached ${percentage}% of ${budget.resetInterval} budget ($${projectedTotal.toFixed(4)} / $${activeLimitUsd.toFixed(2)}) — next reset ${new Date(nextResetAt).toISOString()}`
  );
}

function syncBudgetSchedule(
  apiKeyId: string,
  config: BudgetConfig,
  now = Date.now(),
  options: SyncBudgetScheduleOptions = {}
): NormalizedBudgetConfig {
  const normalized = normalizeBudgetConfig(config);
  const window = getBudgetWindow(normalized.resetInterval, normalized.resetTime, now);
  const resetRolled =
    normalized.lastBudgetResetAt !== null && window.periodStartAt > normalized.lastBudgetResetAt;

  if (resetRolled && options.logReset !== false) {
    const previousSpend = getBudgetWindowRangeTotal(
      apiKeyId,
      normalized.lastBudgetResetAt as number,
      window.periodStartAt
    );
    try {
      saveBudgetResetLog({
        apiKeyId,
        resetInterval: normalized.resetInterval,
        previousSpend,
        resetAt: window.periodStartAt,
        nextResetAt: window.nextResetAt,
        periodStart: window.periodStartAt,
        periodEnd: window.nextResetAt,
      });
    } catch {
      // Non-fatal: budget logic still proceeds even if logging fails.
    }
  }

  const updated: NormalizedBudgetConfig = {
    ...normalized,
    budgetResetAt: window.nextResetAt,
    lastBudgetResetAt: window.periodStartAt,
    warningEmittedAt: resetRolled ? null : normalized.warningEmittedAt,
    warningPeriodStart: resetRolled ? null : normalized.warningPeriodStart,
  };

  const changed =
    normalized.budgetResetAt !== updated.budgetResetAt ||
    normalized.lastBudgetResetAt !== updated.lastBudgetResetAt ||
    normalized.warningEmittedAt !== updated.warningEmittedAt ||
    normalized.warningPeriodStart !== updated.warningPeriodStart ||
    normalized.dailyLimitUsd !== updated.dailyLimitUsd ||
    normalized.weeklyLimitUsd !== updated.weeklyLimitUsd ||
    normalized.monthlyLimitUsd !== updated.monthlyLimitUsd ||
    normalized.warningThreshold !== updated.warningThreshold ||
    normalized.resetInterval !== updated.resetInterval ||
    normalized.resetTime !== updated.resetTime;

  if (changed && options.persist !== false) {
    try {
      saveBudget(apiKeyId, updated);
    } catch {
      // Non-critical: in-memory cache still works.
    }
  }

  budgets.set(apiKeyId, updated);
  return updated;
}

/**
 * Set budget for an API key.
 *
 * @param {string} apiKeyId
 * @param {BudgetConfig} config
 */
export function setBudget(apiKeyId: string, config: BudgetConfig) {
  // Saving the budget is an operator decision about it: like the warning state,
  // a period closed by unpriced usage starts over.
  clearUnpricedPeriodStart(apiKeyId);
  return syncBudgetSchedule(apiKeyId, config, Date.now(), { logReset: false, persist: true });
}

/**
 * Get budget config for an API key.
 *
 * @param {string} apiKeyId
 * @returns {NormalizedBudgetConfig | null}
 */
export function getBudget(apiKeyId: string): NormalizedBudgetConfig | null {
  const cached = budgets.get(apiKeyId);
  if (cached) {
    return syncBudgetSchedule(apiKeyId, cached);
  }

  try {
    const fromDb = loadBudget(apiKeyId) as BudgetConfig | null;
    if (fromDb) {
      return syncBudgetSchedule(apiKeyId, fromDb);
    }
  } catch {
    // DB may not be ready.
  }

  return null;
}

/**
 * Delete budget config and recorded spend for an API key.
 *
 * @param {string} apiKeyId
 */
export function deleteBudget(apiKeyId: string) {
  budgets.delete(apiKeyId);
  discardSpendBatchEntries(apiKeyId);
  try {
    dbDeleteBudget(apiKeyId);
    deleteCostEntries(apiKeyId);
  } catch {
    // Non-critical.
  }
}

/**
 * Record a cost for an API key.
 *
 * When `details` is provided, the same call is appended to the per-request cost
 * ledger (`request_cost_ledger`) with the full breakdown so the amount is
 * traceable to provider/model/tokens — used by the chat paths. Bare calls
 * (web-search cost, etc.) write an amount-only ledger row with unknown
 * provider/model.
 *
 * @param {string} apiKeyId
 * @param {number} cost - Cost in USD
 * @param {RecordCostDetails} [details] - Optional per-request breakdown.
 */
export function recordCost(apiKeyId: string, cost: number, details?: RecordCostDetails): void {
  try {
    spendBatchWriter.increment(apiKeyId, cost, Date.now());
    if (details) {
      // Fire-and-forget — never block the response on ledger I/O.
      void recordLedgerFromCost({
        apiKeyId,
        provider: details.provider,
        model: details.model,
        tokens: details.tokens,
        amountUsd: cost,
        serviceTier: details.serviceTier,
        success: details.success,
        timestamp: details.timestamp,
        requestId: details.requestId,
      });
    }
  } catch {
    // Non-critical.
  }
}

/**
 * Optional per-request breakdown passed to {@link recordCost} for ledger
 * traceability. `tokens` is the raw provider/normalized usage object — the
 * same shape `saveRequestUsage` accepts.
 */
export interface RecordCostDetails {
  provider?: string | null;
  model?: string | null;
  tokens?: unknown;
  serviceTier?: string | null;
  success?: boolean;
  timestamp?: string;
  requestId?: string | null;
}

/**
 * Build the provider/model/tokens/serviceTier/requestId breakdown shared by
 * both {@link recordChatCallCost} call sites in chatCore.ts (built once,
 * kept out of that file to stay under its frozen file-size ratchet).
 */
export function buildCostCtx(
  provider: string | null | undefined,
  model: string | null | undefined,
  tokens: unknown,
  serviceTier: string | null | undefined,
  requestId: string | null | undefined
): RecordCostDetails {
  return { provider, model, tokens, serviceTier, requestId };
}

/**
 * Record a chat-path cost when there is a real amount to log — the shared
 * `apiKeyInfo?.id && estimatedCost > 0` guard used at both chatCore.ts
 * `recordCost` call sites. `context` (see {@link buildCostCtx}) is
 * built once by the caller; only `success` varies per call site. `unpriced`
 * marks a metered call whose $0 has no price behind it, which closes the
 * budget period instead of being dropped (see {@link recordUnpricedBudgetUsage}).
 */
export function recordChatCallCost(
  apiKeyInfo: { id?: string | null } | null | undefined,
  estimatedCost: number,
  context: RecordCostDetails,
  success: boolean,
  unpriced = false
): void {
  if (!apiKeyInfo?.id) return;
  if (unpriced) recordUnpricedBudgetUsage(apiKeyInfo.id, context);
  if (estimatedCost <= 0) return;
  recordCost(apiKeyInfo.id, estimatedCost, { ...context, success });
}

/**
 * Charge a priced non-chat call (image, speech, video/music, rerank) to the key's
 * dollar budget and cost ledger. These routes already price each successful call
 * for the X-OmniRoute cost header; only the metered share draws the budget down,
 * as on the chat path. Never throws.
 */
export function recordModalCallCost(
  apiKeyId: string | null | undefined,
  call: { provider: string; model?: string | null; costUsd: number }
): void {
  if (!apiKeyId) return;
  // Same rule as meteredBudgetCost(): flat-rate plans are not paid from the budget.
  if (isFlatRateProvider(call.provider)) return;
  if (!Number.isFinite(call.costUsd) || call.costUsd <= 0) return;
  recordCost(apiKeyId, call.costUsd, { provider: call.provider, model: call.model, success: true });
}

/**
 * Record that a completed call used a metered model whose cost could not be
 * priced (no pricing row and no provider-reported cost). That $0 is not free
 * usage, so the key's budget fails closed for the rest of the current period —
 * see {@link checkBudget}. Saving the budget again reopens it; a key with no
 * budget, or a zero (no-limit) budget, is unaffected.
 */
export function recordUnpricedBudgetUsage(
  apiKeyId: string,
  details: Pick<RecordCostDetails, "provider" | "model"> = {}
): void {
  // The monthly USD key quota sums the same priced ledger, so it fails closed too.
  recordUnpricedKeyQuotaUsage(apiKeyId, details);
  const budget = getBudget(apiKeyId);
  if (!budget || getActiveBudgetLimit(budget) <= 0) return;
  const window = getBudgetWindow(budget.resetInterval, budget.resetTime);
  if (getUnpricedPeriodStart(apiKeyId) === window.periodStartAt) return;
  try {
    saveBudgetUnpricedPeriodStart(apiKeyId, window.periodStartAt);
  } catch {
    // Non-critical, like every other budget write.
    return;
  }
  console.warn(
    `[BudgetWarning] ${apiKeyId} used ${details.provider || "?"}/${details.model || "?"}, which has no price — its ${budget.resetInterval} budget fails closed until ${new Date(window.nextResetAt).toISOString()} unless USAGE_LIMIT_IGNORE_UNPRICED is on (#12341)`
  );
}

/**
 * Sync all budgets against the current clock so overdue resets get persisted.
 */
export function syncAllBudgetSchedules(now = Date.now()) {
  let processed = 0;
  let resetCount = 0;

  try {
    const allBudgets = loadAllBudgets();
    for (const [apiKeyId, budget] of Object.entries(allBudgets)) {
      processed += 1;
      const synced = syncBudgetSchedule(apiKeyId, budget, now, { logReset: true, persist: true });
      if (budget.lastBudgetResetAt !== synced.lastBudgetResetAt) {
        resetCount += 1;
      }
    }
  } catch {
    // Non-critical.
  }

  return { processed, resetCount };
}

/**
 * Check if an API key has remaining budget.
 *
 * @param {string} apiKeyId
 * @param {number} [additionalCost=0] - Projected cost to check
 * @returns {{ allowed: boolean, reason?: string, dailyUsed: number, dailyLimit: number, warningReached: boolean, remaining: number, periodUsed: number, activeLimitUsd: number, resetInterval: BudgetResetInterval | null, resetTime: string | null, budgetResetAt: number | null, lastBudgetResetAt: number | null, periodStartAt: number | null }}
 */
export function checkBudget(apiKeyId: string, additionalCost = 0) {
  const budget = getBudget(apiKeyId);
  if (!budget) {
    return {
      allowed: true,
      dailyUsed: 0,
      dailyLimit: 0,
      warningReached: false,
      remaining: 0,
      periodUsed: 0,
      activeLimitUsd: 0,
      resetInterval: null,
      resetTime: null,
      budgetResetAt: null,
      lastBudgetResetAt: null,
      periodStartAt: null,
    };
  }

  const window = getBudgetWindow(budget.resetInterval, budget.resetTime);
  const periodUsed = getBudgetWindowTotal(apiKeyId, window.periodStartAt);
  const projectedTotal = periodUsed + additionalCost;
  const activeLimitUsd = getActiveBudgetLimit(budget);
  const warningReached =
    activeLimitUsd > 0 && projectedTotal >= activeLimitUsd * budget.warningThreshold;
  const remaining = Math.max(activeLimitUsd - projectedTotal, 0);

  if (warningReached && budget.warningPeriodStart !== window.periodStartAt) {
    const updatedBudget = {
      ...budget,
      warningEmittedAt: Date.now(),
      warningPeriodStart: window.periodStartAt,
    };
    budgets.set(apiKeyId, updatedBudget);
    try {
      saveBudget(apiKeyId, updatedBudget);
      emitBudgetWarning(
        apiKeyId,
        updatedBudget,
        projectedTotal,
        activeLimitUsd,
        window.nextResetAt
      );
    } catch {
      // Non-critical.
    }
  }

  const refusalReason = getBudgetRefusalReason(apiKeyId, budget, window, projectedTotal);
  if (refusalReason) {
    return {
      allowed: false,
      reason: refusalReason,
      dailyUsed: periodUsed,
      dailyLimit: activeLimitUsd,
      warningReached: true,
      remaining,
      periodUsed,
      activeLimitUsd,
      resetInterval: budget.resetInterval,
      resetTime: budget.resetTime,
      budgetResetAt: window.nextResetAt,
      lastBudgetResetAt: window.periodStartAt,
      periodStartAt: window.periodStartAt,
    };
  }

  return {
    allowed: true,
    dailyUsed: periodUsed,
    dailyLimit: activeLimitUsd,
    warningReached,
    remaining,
    periodUsed,
    activeLimitUsd,
    resetInterval: budget.resetInterval,
    resetTime: budget.resetTime,
    budgetResetAt: window.nextResetAt,
    lastBudgetResetAt: window.periodStartAt,
    periodStartAt: window.periodStartAt,
  };
}

/**
 * Get daily total cost for an API key.
 *
 * @param {string} apiKeyId
 * @returns {number} Total cost today in USD
 */
export function getDailyTotal(apiKeyId: string): number {
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  try {
    return (
      sumEntries(toCostEntries(loadCostEntries(apiKeyId, todayStart.getTime()))) +
      spendBatchWriter.getPendingCostTotal(apiKeyId, todayStart.getTime())
    );
  } catch {
    return 0;
  }
}

/**
 * Get cost summary for an API key.
 *
 * @param {string} apiKeyId
 * @returns {BudgetSummary}
 */
export function getCostSummary(apiKeyId: string): BudgetSummary {
  const now = new Date();
  const todayStart = new Date(now);
  todayStart.setHours(0, 0, 0, 0);
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

  const budget = getBudget(apiKeyId);
  const window = budget ? getBudgetWindow(budget.resetInterval, budget.resetTime) : null;

  try {
    const dailyEntries = [
      ...toCostEntries(loadCostEntries(apiKeyId, todayStart.getTime())),
      ...spendBatchWriter.getBufferedEntries(apiKeyId, todayStart.getTime()),
    ];
    const monthlyEntries = [
      ...toCostEntries(loadCostEntries(apiKeyId, monthStart.getTime())),
      ...spendBatchWriter.getBufferedEntries(apiKeyId, monthStart.getTime()),
    ];
    const periodEntries =
      window !== null
        ? [
            ...toCostEntries(loadCostEntries(apiKeyId, window.periodStartAt)),
            ...spendBatchWriter.getBufferedEntries(apiKeyId, window.periodStartAt),
          ]
        : [];

    const dailyTotal = sumEntries(dailyEntries);
    const monthlyTotal = sumEntries(monthlyEntries);
    const periodTotal = sumEntries(periodEntries);
    const activeLimitUsd = budget ? getActiveBudgetLimit(budget) : 0;

    return {
      dailyTotal,
      monthlyTotal,
      totalEntries: monthlyEntries.length,
      budget,
      totalCostToday: dailyTotal,
      totalCostMonth: monthlyTotal,
      totalCostPeriod: periodTotal,
      activeLimitUsd,
      resetInterval: budget?.resetInterval ?? null,
      resetTime: budget?.resetTime ?? null,
      budgetResetAt: window?.nextResetAt ?? budget?.budgetResetAt ?? null,
      lastBudgetResetAt: window?.periodStartAt ?? budget?.lastBudgetResetAt ?? null,
      periodStartAt: window?.periodStartAt ?? null,
      nextResetAt: window?.nextResetAt ?? null,
      dailyLimitUsd: budget?.dailyLimitUsd ?? 0,
      weeklyLimitUsd: budget?.weeklyLimitUsd ?? 0,
      monthlyLimitUsd: budget?.monthlyLimitUsd ?? 0,
      warningThreshold: budget?.warningThreshold ?? null,
    };
  } catch {
    return {
      dailyTotal: 0,
      monthlyTotal: 0,
      totalEntries: 0,
      budget,
      totalCostToday: 0,
      totalCostMonth: 0,
      totalCostPeriod: 0,
      activeLimitUsd: budget ? getActiveBudgetLimit(budget) : 0,
      resetInterval: budget?.resetInterval ?? null,
      resetTime: budget?.resetTime ?? null,
      budgetResetAt: budget?.budgetResetAt ?? null,
      lastBudgetResetAt: budget?.lastBudgetResetAt ?? null,
      periodStartAt: budget?.lastBudgetResetAt ?? null,
      nextResetAt: budget?.budgetResetAt ?? null,
      dailyLimitUsd: budget?.dailyLimitUsd ?? 0,
      weeklyLimitUsd: budget?.weeklyLimitUsd ?? 0,
      monthlyLimitUsd: budget?.monthlyLimitUsd ?? 0,
      warningThreshold: budget?.warningThreshold ?? null,
    };
  }
}

/**
 * Clear all cost data (for testing).
 */
export function resetCostData() {
  budgets.clear();
  resetSpendBatchWriterForTests();
  try {
    deleteAllCostData();
  } catch {
    // Non-critical.
  }
}
