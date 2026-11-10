/**
 * @file providerWindowCosts.ts
 * @description Provider weekly USD cost breakdown for the dashboard modal.
 *
 * @changes
 * - [2026-07-24] [Composer] - Aggregate usage_history in SQL instead of loading all rows into JS
 */

import { setImmediate as yieldToEventLoop } from "node:timers/promises";
import { getCostSummary } from "@/domain/costRules";
import { getApiKeys } from "@/lib/db/apiKeys";
import { getDbInstance } from "@/lib/db/core";
import { getAllProviderLimitsCache, getProviderLimitsCache } from "@/lib/db/providerLimits";
import { getProviderQuotaWindowStart } from "@/lib/db/quotaResetEvents";
import { calculateCostDetailed } from "@/lib/usage/costCalculator";
import { PROVIDER_ID_TO_ALIAS } from "@omniroute/open-sse/config/providerModels.ts";

const WEEK_MS = 7 * 24 * 60 * 60 * 1000;
const COST_BATCH_SIZE = 512;

type JsonRecord = Record<string, unknown>;

interface UsageHistoryFilter {
  whereSql: string;
  params: Record<string, unknown>;
}

interface AggregatedUsageCostRow {
  apiKeyId: string | null;
  apiKeyName: string | null;
  provider: string;
  model: string;
  serviceTier: string;
  requests: number;
  promptTokens: number;
  completionTokens: number;
  cacheReadTokens: number;
  cacheCreationTokens: number;
  reasoningTokens: number;
  totalTokens: number;
  lastUsed: string | null;
  /** Sum of provider-reported exact costs (`provider_cost_usd`) in the group. */
  storedCost: number;
  /** Token sums of the group's rows WITHOUT a reported cost — the only priceable ones. */
  costPromptTokens: number;
  costCompletionTokens: number;
  costCacheReadTokens: number;
  costCacheCreationTokens: number;
  costReasoningTokens: number;
  unreportedRequests: number;
}

interface ProviderWindowCostModelRow {
  model: string;
  provider: string;
  serviceTier: string;
  requests: number;
  totalTokens: number;
  costUsd: number;
  unpricedRequests: number;
}

export interface ProviderWindowCostBreakdownRow {
  apiKeyKey: string;
  apiKeyId: string | null;
  apiKeyName: string;
  requests: number;
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
  costUsd: number;
  limitUsd: number | null;
  unpricedRequests: number;
  limitPeriod: string | null;
  limitUsedPercent: number | null;
  budgetResetAt: string | null;
  lastUsed: string | null;
  models: ProviderWindowCostModelRow[];
}

interface ProviderWindowCostAggregateRow extends ProviderWindowCostBreakdownRow {
  modelMap: Map<string, ProviderWindowCostModelRow>;
}

export interface ProviderWindowCostBreakdown {
  provider: string;
  connectionId: string | null;
  windowStartAt: string;
  windowResetAt: string | null;
  windowSource: "provider_weekly_reset" | "fallback_rolling_7d";
  windowStartSource:
    | "recorded_reset_event"
    | "observed_snapshot_reset"
    | "inferred_from_reset_at"
    | "fallback_rolling_7d";
  quotaName: string | null;
  quotaUsedPercent: number | null;
  quotaRemainingPercent: number | null;
  totalCostUsd: number;
  unpricedRequests: number;
  estimatedFullQuotaUsd: number | null;
  rows: ProviderWindowCostBreakdownRow[];
}

function toRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

function toNumber(value: unknown, fallback = 0): number {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim().length > 0) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : fallback;
  }
  return fallback;
}

function toString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function roundUsd(value: number): number {
  return Math.round(value * 1_000_000) / 1_000_000;
}

function roundPercent(value: number): number {
  return Math.round(value * 10) / 10;
}

function parseResetAt(value: unknown, nowMs: number): number | null {
  const resetAt = toString(value);
  if (!resetAt) return null;
  const parsed = Date.parse(resetAt);
  if (!Number.isFinite(parsed) || parsed <= nowMs) return null;
  return parsed;
}

function getProviderWindowStart(
  connectionId: string | null,
  resetMs: number,
  nowMs: number
): { startMs: number; source: ProviderWindowCostBreakdown["windowStartSource"] } | null {
  if (!connectionId) return null;
  const resetIso = new Date(resetMs).toISOString();
  const start = getProviderQuotaWindowStart(connectionId, resetIso, nowMs);
  if (!start) return null;
  const startMs = Date.parse(start.windowStartIso);
  if (!Number.isFinite(startMs)) return null;
  if (startMs > nowMs || startMs >= resetMs) return null;
  return { startMs, source: start.source };
}

function getRemainingPercent(quota: JsonRecord): number | null {
  const explicit = toNumber(quota.remainingPercentage, Number.NaN);
  if (Number.isFinite(explicit)) return Math.max(0, Math.min(100, explicit));

  const total = toNumber(quota.total, 0);
  if (total <= 0) return null;
  const remaining = toNumber(quota.remaining, Number.NaN);
  if (Number.isFinite(remaining)) {
    return Math.max(0, Math.min(100, (remaining / total) * 100));
  }

  const used = toNumber(quota.used, Number.NaN);
  if (Number.isFinite(used)) {
    return Math.max(0, Math.min(100, ((total - used) / total) * 100));
  }

  return null;
}

function scoreWeeklyQuota(name: string): number {
  const normalized = name.trim().toLowerCase();
  if (!normalized.includes("weekly") && !normalized.includes("7d")) return Number.NEGATIVE_INFINITY;

  let score = 10;
  if (normalized === "weekly" || /^weekly\s*\(/.test(normalized)) score += 100;
  if (normalized.includes("7d") || normalized.includes("7 day")) score += 15;
  if (normalized.includes("sonnet")) score -= 30;
  if (/^(gpt|claude|o\d|gemini|opus|sonnet)\b/.test(normalized)) score -= 20;
  return score;
}

function selectWeeklyWindow(
  provider: string,
  connectionId: string | null,
  nowMs: number
): {
  startMs: number;
  resetMs: number | null;
  source: ProviderWindowCostBreakdown["windowSource"];
  quotaName: string | null;
  quotaUsedPercent: number | null;
  quotaRemainingPercent: number | null;
  windowStartSource: ProviderWindowCostBreakdown["windowStartSource"];
} {
  const cacheEntries = connectionId
    ? [[connectionId, getProviderLimitsCache(connectionId)] as const]
    : Object.entries(getAllProviderLimitsCache());

  let selected: {
    score: number;
    connectionId: string;
    resetMs: number;
    quotaName: string;
    quotaUsedPercent: number | null;
    quotaRemainingPercent: number | null;
  } | null = null;

  for (const [entryConnectionId, cache] of cacheEntries) {
    const quotas = toRecord(cache?.quotas);
    for (const [name, rawQuota] of Object.entries(quotas)) {
      const score = scoreWeeklyQuota(name);
      if (!Number.isFinite(score)) continue;
      const quota = toRecord(rawQuota);
      const resetMs = parseResetAt(quota.resetAt, nowMs);
      if (resetMs === null) continue;
      const remainingPercent = getRemainingPercent(quota);
      const usedPercent =
        remainingPercent === null ? null : Math.max(0, Math.min(100, 100 - remainingPercent));
      if (
        !selected ||
        score > selected.score ||
        (score === selected.score && resetMs < selected.resetMs)
      ) {
        selected = {
          score,
          connectionId: entryConnectionId,
          resetMs,
          quotaName: name,
          quotaUsedPercent: usedPercent,
          quotaRemainingPercent: remainingPercent,
        };
      }
    }
  }

  if (selected) {
    const providerWindowStart = getProviderWindowStart(
      selected.connectionId,
      selected.resetMs,
      nowMs
    );
    return {
      startMs: providerWindowStart?.startMs ?? selected.resetMs - WEEK_MS,
      resetMs: selected.resetMs,
      source: "provider_weekly_reset",
      windowStartSource: providerWindowStart?.source ?? "inferred_from_reset_at",
      quotaName: selected.quotaName,
      quotaUsedPercent: selected.quotaUsedPercent,
      quotaRemainingPercent: selected.quotaRemainingPercent,
    };
  }

  return {
    startMs: nowMs - WEEK_MS,
    resetMs: null,
    source: "fallback_rolling_7d",
    windowStartSource: "fallback_rolling_7d",
    quotaName: null,
    quotaUsedPercent: null,
    quotaRemainingPercent: null,
  };
}

function makeApiKeyKey(apiKeyId: string | null, apiKeyName: string | null): string {
  if (apiKeyId) return `id:${apiKeyId}`;
  if (apiKeyName) return `name:${apiKeyName}`;
  return "unattributed";
}

async function getCurrentApiKeyNames(): Promise<Map<string, string>> {
  const names = new Map<string, string>();
  try {
    const apiKeys = await getApiKeys();
    for (const apiKey of apiKeys) {
      if (typeof apiKey.id === "string" && typeof apiKey.name === "string") {
        names.set(apiKey.id, apiKey.name);
      }
    }
  } catch {
    // Usage rows carry historical names, so current API key names are an enhancement only.
  }
  return names;
}

function buildUsageHistoryFilter(
  providerKey: string,
  windowStartAt: string,
  nowIso: string,
  windowResetAt: string | null,
  connectionId: string | null
): UsageHistoryFilter {
  const where = [
    "LOWER(provider) = @provider",
    "timestamp >= @since",
    "timestamp <= @nowIso",
    "COALESCE(success, 1) = 1",
  ];
  const params: Record<string, unknown> = {
    provider: providerKey,
    since: windowStartAt,
    nowIso,
  };
  if (windowResetAt) {
    where.push("timestamp < @resetAt");
    params.resetAt = windowResetAt;
  }
  if (connectionId) {
    where.push("connection_id = @connectionId");
    params.connectionId = connectionId;
  }
  return { whereSql: where.join(" AND "), params };
}

function fetchAggregatedUsageRows(filter: UsageHistoryFilter): AggregatedUsageCostRow[] {
  return getDbInstance()
    .prepare<AggregatedUsageCostRow>(
      `
      SELECT
        NULLIF(api_key_id, '') as apiKeyId,
        NULLIF(api_key_name, '') as apiKeyName,
        LOWER(provider) as provider,
        LOWER(model) as model,
        COALESCE(NULLIF(service_tier, ''), 'standard') as serviceTier,
        COUNT(*) as requests,
        COALESCE(SUM(tokens_input), 0) as promptTokens,
        COALESCE(SUM(tokens_output), 0) as completionTokens,
        COALESCE(SUM(tokens_cache_read), 0) as cacheReadTokens,
        COALESCE(SUM(tokens_cache_creation), 0) as cacheCreationTokens,
        COALESCE(SUM(tokens_reasoning), 0) as reasoningTokens,
        COALESCE(SUM(tokens_input + tokens_output), 0) as totalTokens,
        MAX(timestamp) as lastUsed,
        COALESCE(SUM(provider_cost_usd), 0) as storedCost,
        SUM(CASE WHEN provider_cost_usd IS NULL THEN 1 ELSE 0 END) as unreportedRequests,
        COALESCE(SUM(CASE WHEN provider_cost_usd IS NULL THEN tokens_input ELSE 0 END), 0) as costPromptTokens,
        COALESCE(SUM(CASE WHEN provider_cost_usd IS NULL THEN tokens_output ELSE 0 END), 0) as costCompletionTokens,
        COALESCE(SUM(CASE WHEN provider_cost_usd IS NULL THEN tokens_cache_read ELSE 0 END), 0) as costCacheReadTokens,
        COALESCE(SUM(CASE WHEN provider_cost_usd IS NULL THEN tokens_cache_creation ELSE 0 END), 0) as costCacheCreationTokens,
        COALESCE(SUM(CASE WHEN provider_cost_usd IS NULL THEN tokens_reasoning ELSE 0 END), 0) as costReasoningTokens
      FROM usage_history
      WHERE ${filter.whereSql}
      GROUP BY
        COALESCE(NULLIF(api_key_id, ''), ''),
        COALESCE(NULLIF(api_key_name, ''), ''),
        LOWER(provider),
        LOWER(model),
        COALESCE(NULLIF(service_tier, ''), 'standard'),
        COALESCE(tokens_input, 0),
        COALESCE(tokens_output, 0),
        COALESCE(tokens_cache_read, 0),
        COALESCE(tokens_cache_creation, 0),
        COALESCE(tokens_reasoning, 0),
        provider_cost_usd IS NULL
      ORDER BY totalTokens DESC
      `
    )
    .all(filter.params);
}

async function buildApiKeyCostAllocations(args: {
  groups: AggregatedUsageCostRow[];
}): Promise<{ costs: number[]; unpriced: number[] }> {
  const calculatedCosts: number[] = [];
  const unpriced: number[] = [];
  for (const group of args.groups) {
    // Price ONE request: thresholds and clipping are request-local, not window-wide.
    const count = toNumber(group.unreportedRequests);
    let costUsd = toNumber(group.storedCost);
    let missing = 0;
    if (count > 0) {
      const tokens = {
        input: toNumber(group.costPromptTokens) / count,
        output: toNumber(group.costCompletionTokens) / count,
        cacheRead: toNumber(group.costCacheReadTokens) / count,
        cacheCreation: toNumber(group.costCacheCreationTokens) / count,
        reasoning: toNumber(group.costReasoningTokens) / count,
      };
      const options = { serviceTier: group.serviceTier };
      let estimate = await calculateCostDetailed(group.provider, group.model, tokens, options);
      // Partial provider-id tables can hide models in their declared alias table.
      // Retry only a missing model: explicit zero prices and lookup failures win.
      const alias = PROVIDER_ID_TO_ALIAS[group.provider];
      if (!estimate.priced && !estimate.failed && alias && alias !== group.provider) {
        estimate = await calculateCostDetailed(alias, group.model, tokens, options);
      }
      costUsd += estimate.costUsd * count;
      missing = estimate.priced ? 0 : count;
    }
    calculatedCosts.push(costUsd);
    unpriced.push(missing);
    if (calculatedCosts.length % COST_BATCH_SIZE === 0) await yieldToEventLoop();
  }
  return { costs: calculatedCosts, unpriced };
}

export async function getProviderWindowCostBreakdown({
  provider,
  connectionId = null,
  now = Date.now(),
}: {
  provider: string;
  connectionId?: string | null;
  now?: number;
}): Promise<ProviderWindowCostBreakdown> {
  const providerKey = provider.trim().toLowerCase();
  const nowMs = Number.isFinite(now) ? now : Date.now();
  const window = selectWeeklyWindow(providerKey, connectionId, nowMs);
  const windowStartAt = new Date(window.startMs).toISOString();
  const windowResetAt = window.resetMs ? new Date(window.resetMs).toISOString() : null;
  const nowIso = new Date(nowMs).toISOString();
  const filter = buildUsageHistoryFilter(
    providerKey,
    windowStartAt,
    nowIso,
    windowResetAt,
    connectionId
  );

  const aggregatedRows = fetchAggregatedUsageRows(filter);
  const currentApiKeyNames = await getCurrentApiKeyNames();
  const byApiKey = new Map<string, ProviderWindowCostAggregateRow>();

  const groupsByApiKey = new Map<string, AggregatedUsageCostRow[]>();
  for (const row of aggregatedRows) {
    const apiKeyKey = makeApiKeyKey(row.apiKeyId, row.apiKeyName);
    const list = groupsByApiKey.get(apiKeyKey) ?? [];
    list.push(row);
    groupsByApiKey.set(apiKeyKey, list);
  }

  for (const [apiKeyKey, groups] of groupsByApiKey.entries()) {
    const first = groups[0];
    const apiKeyId = first.apiKeyId || null;
    const apiKeyName = first.apiKeyName || null;
    const displayName =
      (apiKeyId ? currentApiKeyNames.get(apiKeyId) : null) ||
      apiKeyName ||
      apiKeyId ||
      "Unattributed";
    const groupCosts = await buildApiKeyCostAllocations({ groups });

    let limitUsd: number | null = null;
    let limitPeriod: string | null = null;
    let budgetResetAt: string | null = null;
    if (apiKeyId) {
      const summary = getCostSummary(apiKeyId);
      if (summary.activeLimitUsd > 0) {
        limitUsd = summary.activeLimitUsd;
        limitPeriod = summary.resetInterval;
        budgetResetAt =
          typeof summary.nextResetAt === "number" && Number.isFinite(summary.nextResetAt)
            ? new Date(summary.nextResetAt).toISOString()
            : null;
      }
    }

    const aggregate: ProviderWindowCostAggregateRow = {
      apiKeyKey,
      apiKeyId,
      apiKeyName: displayName,
      requests: 0,
      promptTokens: 0,
      completionTokens: 0,
      totalTokens: 0,
      costUsd: 0,
      limitUsd,
      unpricedRequests: 0,
      limitPeriod,
      limitUsedPercent: null,
      budgetResetAt,
      lastUsed: null,
      models: [],
      modelMap: new Map(),
    };

    groups.forEach((row, index) => {
      const costUsd = groupCosts.costs[index] ?? 0;
      const unpricedRequests = groupCosts.unpriced[index] ?? 0;
      aggregate.unpricedRequests += unpricedRequests;
      aggregate.requests += toNumber(row.requests);
      aggregate.promptTokens += toNumber(row.promptTokens);
      aggregate.completionTokens += toNumber(row.completionTokens);
      aggregate.totalTokens += toNumber(row.totalTokens);
      aggregate.costUsd += costUsd;
      if (!aggregate.lastUsed || (row.lastUsed && row.lastUsed > aggregate.lastUsed)) {
        aggregate.lastUsed = row.lastUsed || aggregate.lastUsed;
      }

      const modelKey = `${row.provider}\0${row.model}\0${row.serviceTier}`;
      const model = aggregate.modelMap.get(modelKey) ?? {
        model: row.model,
        provider: row.provider,
        serviceTier: row.serviceTier,
        requests: 0,
        totalTokens: 0,
        costUsd: 0,
        unpricedRequests: 0,
      };
      model.requests += toNumber(row.requests);
      model.totalTokens += toNumber(row.totalTokens);
      model.costUsd += costUsd;
      model.unpricedRequests += unpricedRequests;
      aggregate.modelMap.set(modelKey, model);
    });

    byApiKey.set(apiKeyKey, aggregate);
  }

  const breakdownRows = Array.from(byApiKey.values())
    .map((row) => {
      const limitUsedPercent =
        row.limitUsd && row.limitUsd > 0 ? roundPercent((row.costUsd / row.limitUsd) * 100) : null;
      const models = Array.from(row.modelMap.values())
        .map((model) => ({ ...model, costUsd: roundUsd(model.costUsd) }))
        .sort((left, right) => right.costUsd - left.costUsd);
      const { modelMap, ...publicRow } = row;
      void modelMap;
      return {
        ...publicRow,
        costUsd: roundUsd(row.costUsd),
        limitUsedPercent,
        models,
      };
    })
    .sort((left, right) => right.costUsd - left.costUsd);

  const totalCostUsd = roundUsd(breakdownRows.reduce((sum, row) => sum + row.costUsd, 0));
  const unpricedRequests = breakdownRows.reduce((sum, row) => sum + row.unpricedRequests, 0);
  const estimatedFullQuotaUsd =
    unpricedRequests === 0 &&
    totalCostUsd > 0 &&
    window.quotaUsedPercent &&
    window.quotaUsedPercent > 0
      ? roundUsd(totalCostUsd / (window.quotaUsedPercent / 100))
      : null;

  return {
    provider: providerKey,
    connectionId,
    windowStartAt,
    windowResetAt,
    windowSource: window.source,
    windowStartSource: window.windowStartSource,
    quotaName: window.quotaName,
    quotaUsedPercent:
      window.quotaUsedPercent === null ? null : roundPercent(window.quotaUsedPercent),
    quotaRemainingPercent:
      window.quotaRemainingPercent === null ? null : roundPercent(window.quotaRemainingPercent),
    totalCostUsd,
    unpricedRequests,
    estimatedFullQuotaUsd,
    rows: breakdownRows,
  };
}
