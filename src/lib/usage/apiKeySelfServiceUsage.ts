/**
 * GET /v1/me/usage — usage and cost series of the calling API key over a closed window.
 *
 * Every query reads the source of `buildApiKeyOwnedSource` (rows whose `api_key_id` is the
 * calling key's id, nothing else). Days are UTC days, as SQLite's DATE() reads the stored
 * ISO-8601 UTC timestamps. The window runs from `now - range` to `now`, both from the injected
 * clock, so a row stamped after `now` is not counted. Five grouped queries run per build;
 * apiKeySelfServiceUsageCache.ts reuses a built series for 60 seconds.
 *
 * Two costs are reported side by side, both summed row by row and rounded by `roundCost`:
 * - `costUsd`: the billed cost, as the usage analytics show it by default. Flat-rate
 *   subscription providers (see flatRateProviders.ts, e.g. the Claude Code plan) count $0, so
 *   a pool on such an account shows no billed cost.
 * - `listPriceUsd`: the same usage priced at list price, subscriptions included.
 * A row whose model has no price row counts its stored cost (reported by the provider or
 * calculated when recorded). Only a row with neither counts 0, with no marker.
 *
 * Provider is returned as recorded for the key's own requests. Model is the recorded string after
 * `normalizeModelName`, which keeps the part after the last "/", and rows are grouped by it. A
 * combo request whose every target was refused carries the routing label as provider and the
 * client's model string. `retentionDays` is the operator's raw usage-history retention setting
 * (`retention.usageHistory`). The reused queries also return `uniqueAccounts`, `uniqueApiKeys`,
 * `serviceTier` and the raw cost inputs; they are read here and never copied into the result.
 * No SQL lives in this module.
 */

import { getUserDatabaseSettings } from "@/lib/db/databaseSettings";
import {
  getDailyCostRows,
  getDailyUsage,
  getProviderUsageRows,
  getUsageSummary,
  type DailyCostRow,
  type DailyUsageRow,
  type ProviderUsageRow,
  type UsageSummaryRow,
} from "@/lib/db/usageAnalytics";
import { buildApiKeyOwnedSource } from "@/lib/db/usageAnalytics/apiKeyScope";
import { hasSelfUsageScope } from "@/shared/constants/selfServiceScopes";
import type { SelfUsageRange, SelfUsageResponse } from "@/shared/schemas/selfUsage";
import { toNumber } from "@/shared/utils/numeric";

import {
  computeUsageRowCost,
  roundCost,
  toStringValue,
  type PricingResolutionContext,
} from "./analyticsPricing";
import { computeCostFromPricing, normalizeModelName } from "./costCalculator";

const DAY_MS = 86_400_000;
const RANGE_DAYS: Record<SelfUsageRange, number> = { "1d": 1, "7d": 7, "30d": 30, "90d": 90 };
/** Fallback for a missing or invalid setting only. The stored setting is what applies. */
const DEFAULT_RETENTION_DAYS = 30;
const BY_MODEL_LIMIT = 50;
const MISSING_SCOPE_ERROR = "missing_self_usage_scope";

type PriceRow = (row: object, flatRateAsZero: boolean) => number;
type PricingByProvider = Record<string, Record<string, Record<string, unknown>>>;

export interface SelfServiceUsageDeps {
  now?: () => number;
  retentionDays?: () => number;
  queries?: {
    summary: typeof getUsageSummary;
    daily: typeof getDailyUsage;
    /** One grouped scan per day, provider, model and tier: the cost series and `byModel` share it. */
    dailyCost: typeof getDailyCostRows;
    providers: typeof getProviderUsageRows;
  };
  /** Cost of one query row; the default wraps computeUsageRowCost with the stored pricing. */
  priceRow?: PriceRow;
}

const DEFAULT_QUERIES: NonNullable<SelfServiceUsageDeps["queries"]> = {
  summary: getUsageSummary,
  daily: getDailyUsage,
  dailyCost: getDailyCostRows,
  providers: getProviderUsageRows,
};

interface Money {
  costUsd: number;
  listPriceUsd: number;
}

type Totals = SelfUsageResponse["summary"];
type DailyByModel = SelfUsageResponse["dailyByModel"][number];

const zeroMoney = (): Money => ({ costUsd: 0, listPriceUsd: 0 });

function addMoney(target: Money, add: Money): Money {
  target.costUsd += add.costUsd;
  target.listPriceUsd += add.listPriceUsd;
  return target;
}

function roundMoney(money: Money | undefined): Money {
  return {
    costUsd: roundCost(money?.costUsd ?? 0),
    listPriceUsd: roundCost(money?.listPriceUsd ?? 0),
  };
}

function priceBoth(priceRow: PriceRow, row: object): Money {
  return { costUsd: priceRow(row, true), listPriceUsd: priceRow(row, false) };
}

function percent(part: number, total: number): number {
  return total > 0 ? Number(((part / total) * 100).toFixed(2)) : 0;
}

function readRetentionDays(): number {
  const days = Number(getUserDatabaseSettings().retention?.usageHistory ?? DEFAULT_RETENTION_DAYS);
  return Number.isFinite(days) && days > 0 ? days : DEFAULT_RETENTION_DAYS;
}

function resolveWindow(range: SelfUsageRange, nowMs: number, retentionDays: number) {
  const days = RANGE_DAYS[range];
  const from = new Date(nowMs - days * DAY_MS).toISOString();
  const to = new Date(nowMs).toISOString();
  return {
    sinceIso: from,
    untilIso: to,
    rawCutoffDate: new Date(nowMs - retentionDays * DAY_MS).toISOString().slice(0, 10),
    coverage: { from, to, retentionDays, truncatedByRetention: days > retentionDays },
  };
}

/** Lower-cases provider and model keys of the stored pricing, as the analytics route does. */
function lowerCasePricing(raw: unknown): PricingByProvider {
  const pricing: PricingByProvider = {};
  for (const [provider, models] of Object.entries((raw ?? {}) as PricingByProvider)) {
    const lowered: Record<string, Record<string, unknown>> = {};
    for (const [model, row] of Object.entries(models ?? {})) lowered[model.toLowerCase()] = row;
    pricing[provider.toLowerCase()] = lowered;
  }
  return pricing;
}

async function loadPricer(): Promise<PriceRow> {
  const { getPricing } = await import("@/lib/db/settings");
  const { PROVIDER_ID_TO_ALIAS } = await import("@omniroute/open-sse/config/providerModels");
  const pricingByProvider = lowerCasePricing(await getPricing());
  const context: PricingResolutionContext = {
    cache: new Map(),
    reverseAlias: { ...PROVIDER_ID_TO_ALIAS },
  };
  return (row, flatRateAsZero) =>
    computeUsageRowCost(
      row,
      pricingByProvider,
      PROVIDER_ID_TO_ALIAS,
      normalizeModelName,
      computeCostFromPricing,
      flatRateAsZero,
      context
    );
}

/** Prices the day x provider x model rows once and spreads the cost over every series. */
function priceCostRows(rows: DailyCostRow[], priceRow: PriceRow) {
  const total = zeroMoney();
  const byDate = new Map<string, Money>();
  const byProvider = new Map<string, Money>();
  const byDateModel = new Map<string, DailyByModel>();
  for (const row of rows) {
    const date = toStringValue(row.date);
    if (!date) continue;
    const money = priceBoth(priceRow, row);
    addMoney(total, money);
    byDate.set(date, addMoney(byDate.get(date) ?? zeroMoney(), money));
    const provider = toStringValue(row.provider);
    byProvider.set(provider, addMoney(byProvider.get(provider) ?? zeroMoney(), money));
    const model = normalizeModelName(toStringValue(row.model));
    const key = JSON.stringify([date, model]);
    const entry = byDateModel.get(key) ?? { date, model, totalTokens: 0, ...zeroMoney() };
    entry.totalTokens += toNumber(row.promptTokens) + toNumber(row.completionTokens);
    byDateModel.set(key, addMoney(entry, money) as DailyByModel);
  }
  const dailyByModel = [...byDateModel.values()].map((entry) => ({
    ...entry,
    ...roundMoney(entry),
  }));
  return { total, byDate, byProvider, dailyByModel };
}

function buildSummary(row: UsageSummaryRow, total: Money): Totals {
  const requests = toNumber(row?.totalRequests);
  const successfulRequests = toNumber(row?.successfulRequests);
  return {
    requests,
    promptTokens: toNumber(row?.promptTokens),
    completionTokens: toNumber(row?.completionTokens),
    totalTokens: toNumber(row?.totalTokens),
    ...roundMoney(total),
    successfulRequests,
    successRatePct: percent(successfulRequests, requests),
    uniqueModels: toNumber(row?.uniqueModels),
    avgLatencyMs: Math.round(toNumber(row?.avgLatencyMs)),
    firstRequest: toStringValue(row?.firstRequest) || null,
    lastRequest: toStringValue(row?.lastRequest) || null,
  };
}

function buildDaily(rows: DailyUsageRow[], costByDate: Map<string, Money>) {
  return rows.map((row) => ({
    date: toStringValue(row.date),
    requests: toNumber(row.requests),
    promptTokens: toNumber(row.promptTokens),
    completionTokens: toNumber(row.completionTokens),
    totalTokens: toNumber(row.totalTokens),
    ...roundMoney(costByDate.get(toStringValue(row.date))),
  }));
}

/**
 * Merges the per-day model rows by provider and model name and keeps the 50 pairs with most
 * requests. `byModelTruncated` is true when more pairs existed than the list keeps.
 */
function buildByModel(rows: DailyCostRow[], priceRow: PriceRow) {
  type Entry = Money & {
    model: string;
    provider: string;
    requests: number;
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
    latencyWeighted: number;
    successfulRequests: number;
    lastUsed: string;
  };
  const merged = new Map<string, Entry>();
  for (const row of rows) {
    const model = normalizeModelName(toStringValue(row.model));
    const provider = toStringValue(row.provider);
    const key = JSON.stringify([provider, model]);
    const entry: Entry = merged.get(key) ?? {
      model,
      provider,
      requests: 0,
      promptTokens: 0,
      completionTokens: 0,
      totalTokens: 0,
      latencyWeighted: 0,
      successfulRequests: 0,
      lastUsed: "",
      ...zeroMoney(),
    };
    const requests = toNumber(row.requests);
    entry.requests += requests;
    entry.promptTokens += toNumber(row.promptTokens);
    entry.completionTokens += toNumber(row.completionTokens);
    entry.totalTokens += toNumber(row.totalTokens);
    entry.latencyWeighted += toNumber(row.avgLatencyMs) * requests;
    entry.successfulRequests += toNumber(row.successfulRequests);
    const lastUsed = toStringValue(row.lastUsed);
    if (lastUsed > entry.lastUsed) entry.lastUsed = lastUsed;
    merged.set(key, addMoney(entry, priceBoth(priceRow, row)) as Entry);
  }
  const rowsOut = [...merged.values()]
    .sort((left, right) => right.requests - left.requests)
    .slice(0, BY_MODEL_LIMIT)
    .map((entry) => ({
      model: entry.model,
      provider: entry.provider,
      requests: entry.requests,
      promptTokens: entry.promptTokens,
      completionTokens: entry.completionTokens,
      totalTokens: entry.totalTokens,
      ...roundMoney(entry),
      avgLatencyMs: entry.requests > 0 ? Math.round(entry.latencyWeighted / entry.requests) : 0,
      successRatePct: percent(entry.successfulRequests, entry.requests),
      lastUsed: entry.lastUsed || null,
    }));
  return { byModel: rowsOut, byModelTruncated: merged.size > BY_MODEL_LIMIT };
}

function buildByProvider(rows: ProviderUsageRow[], costByProvider: Map<string, Money>) {
  return rows.map((row) => {
    const provider = toStringValue(row.provider);
    const requests = toNumber(row.requests);
    return {
      provider,
      requests,
      promptTokens: toNumber(row.promptTokens),
      completionTokens: toNumber(row.completionTokens),
      totalTokens: toNumber(row.totalTokens),
      ...roundMoney(costByProvider.get(provider)),
      avgLatencyMs: Math.round(toNumber(row.avgLatencyMs)),
      successRatePct: percent(toNumber(row.successfulRequests), requests),
    };
  });
}

/**
 * Builds the usage view of one key. Throws `missing_self_usage_scope` when the key lacks
 * `self:usage`. The caller parses the result with `selfUsageResponseSchema`.
 */
export async function buildApiKeySelfServiceUsage(
  key: { id: string; scopes: string[] },
  range: SelfUsageRange,
  deps: SelfServiceUsageDeps = {}
): Promise<SelfUsageResponse> {
  if (!hasSelfUsageScope(key.scopes)) throw new Error(MISSING_SCOPE_ERROR);

  const nowMs = (deps.now ?? Date.now)();
  const window = resolveWindow(range, nowMs, (deps.retentionDays ?? readRetentionDays)());
  const { unifiedSource, unifiedParams } = buildApiKeyOwnedSource({
    apiKeyId: key.id,
    sinceIso: window.sinceIso,
    untilIso: window.untilIso,
    rawCutoffDate: window.rawCutoffDate,
  });
  const queries = deps.queries ?? DEFAULT_QUERIES;
  const priceRow = deps.priceRow ?? (await loadPricer());
  const dailyCostRows = queries.dailyCost(unifiedSource, unifiedParams);
  const costs = priceCostRows(dailyCostRows, priceRow);
  const models = buildByModel(dailyCostRows, priceRow);

  return {
    range,
    generatedAt: window.coverage.to,
    coverage: window.coverage,
    summary: buildSummary(queries.summary(unifiedSource, unifiedParams), costs.total),
    daily: buildDaily(queries.daily(unifiedSource, unifiedParams), costs.byDate),
    dailyByModel: costs.dailyByModel,
    byModel: models.byModel,
    byModelTruncated: models.byModelTruncated,
    byProvider: buildByProvider(queries.providers(unifiedSource, unifiedParams), costs.byProvider),
  };
}
