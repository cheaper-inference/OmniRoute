import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { serveAnalyticsCached } from "@/lib/usage/analyticsResponseCache";
import { getApiKeys } from "@/lib/db/apiKeys";
import { getUserDatabaseSettings } from "@/lib/db/databaseSettings";
import {
  buildUnifiedSource,
  buildPresetUnifiedSource,
  getUsageSummary,
  getDailyUsage,
  getDailyCostRows,
  getHeatmapRows,
  getModelUsageRows,
  getProviderCostRows,
  getProviderUsageRows,
  getAccountCostRows,
  getAccountUsageRows,
  getApiKeyUsageRows,
  getApiKeyTotalsRows,
  getServiceTierUsageRows,
  getApiKeyMetadataRows,
  getWeeklyPatternRows,
  getPresetCostModelRows,
} from "@/lib/db/usageAnalytics";
import { getFallbackStats, getErrorTypeBreakdown } from "@/lib/db/callLogStats";
import { buildByProviderRows } from "@/lib/usage/providerDisplayNames";
import {
  toStringValue,
  roundCost,
  normalizeServiceTier,
  getServiceTierLabelId,
  computeUsageRowCost,
  computeUsageRowStandardCost,
  computeUsageSavingsTokens,
  type PricingResolutionContext,
} from "@/lib/usage/analyticsPricing";
import { getCachedInputAnalytics } from "@/lib/db/cachedInputAnalytics";
import {
  addApiKeyAlias,
  buildApiKeyTotals,
  buildApiKeyUsage,
  makeApiKeyUsageGroup,
} from "@/lib/usage/analyticsApiKeys";

function getRangeStartIso(range: string): string | null {
  const end = new Date();
  const start = new Date(end);

  switch (range) {
    case "1d":
      start.setDate(start.getDate() - 1);
      break;
    case "7d":
      start.setDate(start.getDate() - 7);
      break;
    case "30d":
      start.setDate(start.getDate() - 30);
      break;
    case "90d":
      start.setDate(start.getDate() - 90);
      break;
    case "180d":
      start.setDate(start.getDate() - 180);
      break;
    case "365d":
      start.setDate(start.getDate() - 365);
      break;
    case "ytd":
      start.setMonth(0, 1);
      start.setHours(0, 0, 0, 0);
      break;
    case "all":
    default:
      return null;
  }

  return start.toISOString();
}

const WEEKDAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

type PricingByProvider = Record<string, Record<string, Record<string, unknown>>>;
type UsageRows = Array<Record<string, unknown>>;
function appendWhereCondition(whereClause: string, condition: string): string {
  return whereClause ? `${whereClause} AND (${condition})` : `WHERE (${condition})`;
}

function formatUtcDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function computeActivityStreak(activityMap: Record<string, number>): number {
  const cursor = new Date();
  let streak = 0;

  while ((activityMap[formatUtcDate(cursor)] || 0) > 0) {
    streak += 1;
    cursor.setUTCDate(cursor.getUTCDate() - 1);
  }

  return streak;
}

export async function GET(request: Request, testContext?: unknown) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  const misses =
    typeof testContext === "object" &&
    testContext !== null &&
    "misses" in testContext &&
    typeof (testContext as { misses?: unknown }).misses === "object" &&
    (testContext as { misses?: unknown }).misses !== null
      ? (testContext as { misses: { count: number } }).misses
      : undefined;
  return serveAnalyticsCached(new URL(request.url).search, () =>
    computeAnalyticsResponse(request, misses)
  );
}

async function computeAnalyticsResponse(
  request: Request,
  misses?: { count: number }
): Promise<Response> {
  try {
    const { searchParams } = new URL(request.url);
    const range = searchParams.get("range") || "30d";
    const startDate = searchParams.get("startDate") || undefined;
    const endDate = searchParams.get("endDate") || undefined;
    const apiKeyIdsParam = searchParams.get("apiKeyIds") || "";
    const apiKeyIds = apiKeyIdsParam ? apiKeyIdsParam.split(",").filter(Boolean) : [];
    // Flat-rate subscriptions are $0 in billed-cost analytics by default. The
    // dedicated costs page opts into their token-price equivalent so subscription
    // consumption can be compared with metered providers without changing budgets.
    const includeFlatRateEstimates = searchParams.get("includeFlatRateEstimates") === "true";

    const sinceIso = startDate || getRangeStartIso(range);
    const untilIso = endDate || null;
    const presetsParam = searchParams.get("presets");

    const apiKeys = await getApiKeys();
    const currentApiKeyNames = new Map<string, string>();
    for (const apiKey of apiKeys) {
      if (typeof apiKey.id === "string" && typeof apiKey.name === "string") {
        currentApiKeyNames.set(apiKey.id, apiKey.name);
      }
    }

    // Raw-data cutoff: must match cleanupUsageHistory's rollup/delete boundary —
    // retention.usageHistory (src/lib/db/cleanup.ts), NOT aggregation.rawDataRetentionDays.
    const dbSettings = getUserDatabaseSettings();
    const rawRetentionDays = dbSettings.retention?.usageHistory ?? 30;
    const rawCutoff = new Date();
    rawCutoff.setDate(rawCutoff.getDate() - rawRetentionDays);
    const rawCutoffIso = rawCutoff.toISOString();

    const conditions = [];
    const params: Record<string, string> = {};

    if (sinceIso) {
      conditions.push("timestamp >= @since");
      params.since = sinceIso;
    }
    if (untilIso) {
      conditions.push("timestamp <= @until");
      params.until = untilIso;
    }

    let apiKeyWhere = "";
    if (apiKeyIds.length > 0) {
      const placeholders = apiKeyIds.map((_, i) => `@apiKey${i}`);
      apiKeyIds.forEach((key, i) => {
        params[`apiKey${i}`] = key;
      });
      apiKeyWhere = `(api_key_name IN (${placeholders.join(",")}) OR api_key_id IN (${placeholders.join(",")}))`;
      conditions.push(apiKeyWhere);
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

    // Build the UNION data source that merges recent raw rows with older aggregated history.
    // SQL is encapsulated in usageAnalytics.ts — the route only supplies filter parameters.
    const rawCutoffDate = rawCutoffIso.split("T")[0];
    const apiKeyParamEntries: Record<string, string> = {};
    apiKeyIds.forEach((key, i) => {
      apiKeyParamEntries[`apiKey${i}`] = key;
    });

    const { unifiedSource, unifiedParams } = buildUnifiedSource({
      sinceIso: sinceIso ?? null,
      untilIso: untilIso ?? null,
      rawCutoffDate,
      apiKeyWhere,
      apiKeyParams: apiKeyParamEntries,
    });

    // Fetch pricing data for cost calculation (no rows loaded)
    const { getPricing } = await import("@/lib/db/settings");
    const rawPricingByProvider = (await getPricing()) as PricingByProvider;

    // Pre-process pricing data to lowercase keys for O(1) lookups
    const pricingByProvider: PricingByProvider = {};
    for (const [providerKey, providerVal] of Object.entries(rawPricingByProvider || {})) {
      const lowerProvider = {};
      for (const [modelKey, modelVal] of Object.entries(providerVal || {})) {
        (lowerProvider as any)[modelKey.toLowerCase()] = modelVal;
      }
      pricingByProvider[providerKey.toLowerCase()] = lowerProvider;
    }
    const { computeCostFromPricing, getCodexFastCostMultiplier, normalizeModelName } =
      await import("@/lib/usage/costCalculator");
    const { PROVIDER_ID_TO_ALIAS } = await import("@omniroute/open-sse/config/providerModels");
    const pricingContext: PricingResolutionContext = {
      cache: new Map(),
      reverseAlias: { ...PROVIDER_ID_TO_ALIAS },
      ...(misses ? { misses } : {}),
    };

    const apiKeyWhereClause = appendWhereCondition(
      whereClause,
      "(api_key_id IS NOT NULL AND api_key_id != '') OR (api_key_name IS NOT NULL AND api_key_name != '')"
    );
    if (searchParams.get("view") === "apiKeys") {
      const byApiKey = buildApiKeyTotals(
        getApiKeyTotalsRows(apiKeyWhereClause, params),
        apiKeys,
        (row) =>
          computeUsageRowCost(
            row as unknown as Record<string, unknown>,
            pricingByProvider,
            PROVIDER_ID_TO_ALIAS,
            normalizeModelName,
            computeCostFromPricing,
            !includeFlatRateEstimates,
            pricingContext
          )
      );
      return NextResponse.json({ byApiKey });
    }

    const summaryRow = getUsageSummary(unifiedSource, unifiedParams) as Record<string, unknown>;

    const dailyRows = getDailyUsage(unifiedSource, unifiedParams) as UsageRows;
    const dailyCostRows = getDailyCostRows(unifiedSource, unifiedParams) as UsageRows;

    const heatmapStart = new Date();
    heatmapStart.setUTCDate(heatmapStart.getUTCDate() - 364);
    // Custom date range might need a wider heatmap window
    if (startDate) {
      const customStart = new Date(startDate);
      if (customStart.getTime() < heatmapStart.getTime()) {
        heatmapStart.setTime(customStart.getTime());
      }
    }

    // Heatmap needs its own whereClause if api keys are filtered
    const heatmapConditions = ["timestamp >= @heatmapStart"];
    if (apiKeyWhere) heatmapConditions.push(apiKeyWhere);
    const heatmapParams: Record<string, string> = { heatmapStart: heatmapStart.toISOString() };
    if (apiKeyIds.length > 0) {
      apiKeyIds.forEach((key, i) => {
        heatmapParams[`apiKey${i}`] = key;
      });
    }

    const heatmapRows = getHeatmapRows(heatmapConditions, heatmapParams) as UsageRows;

    const modelRows = getModelUsageRows(unifiedSource, unifiedParams) as UsageRows;

    const providerCostRows = getProviderCostRows(unifiedSource, unifiedParams) as UsageRows;

    const providerRows = getProviderUsageRows(unifiedSource, unifiedParams) as UsageRows;

    const accountCostWhereClause = whereClause
      .replace(/timestamp/g, "usage_history.timestamp")
      .replace(/api_key_/g, "usage_history.api_key_");
    const accountCostRows = getAccountCostRows(accountCostWhereClause, params) as UsageRows;

    const accountRows = getAccountUsageRows(accountCostWhereClause, params) as UsageRows;

    const apiKeyRows = getApiKeyUsageRows(apiKeyWhereClause, params) as UsageRows;

    const serviceTierRows = getServiceTierUsageRows(unifiedSource, unifiedParams) as UsageRows;

    const apiKeyMetadataRows = getApiKeyMetadataRows(apiKeyWhereClause, params) as UsageRows;

    const apiKeyMetadata = new Map<string, { latestName: string; aliases: Set<string> }>();
    for (const row of apiKeyMetadataRows) {
      const apiKeyId = toStringValue(row.apiKeyId);
      const apiKeyGroupKey = toStringValue(row.apiKeyGroupKey, "unknown");
      const groupKey = makeApiKeyUsageGroup(apiKeyId, apiKeyGroupKey);
      const existing = apiKeyMetadata.get(groupKey) || {
        latestName: "",
        aliases: new Set<string>(),
      };
      const apiKeyName = toStringValue(row.apiKeyName);
      if (!existing.latestName && apiKeyName) existing.latestName = apiKeyName;
      addApiKeyAlias(existing.aliases, apiKeyName);
      apiKeyMetadata.set(groupKey, existing);
    }

    const weeklyRows = getWeeklyPatternRows(unifiedSource, unifiedParams) as UsageRows;

    const fallbackRow = getFallbackStats(whereClause, params) as Record<string, unknown>;
    const errorBreakdown = getErrorTypeBreakdown(whereClause, params);

    const cachedInput = getCachedInputAnalytics(
      {
        sinceIso: sinceIso ?? null,
        untilIso: untilIso ?? null,
        rawCutoffDate,
        apiKeyWhere,
        apiKeyParams: apiKeyParamEntries,
      },
      normalizeModelName
    );
    const summary = {
      ...cachedInput.summary,
      totalRequests: Number(summaryRow?.totalRequests || 0),
      promptTokens: Number(summaryRow?.promptTokens || 0),
      completionTokens: Number(summaryRow?.completionTokens || 0),
      totalTokens: Number(summaryRow?.totalTokens || 0),
      uniqueModels: Number(summaryRow?.uniqueModels || 0),
      uniqueAccounts: Number(summaryRow?.uniqueAccounts || 0),
      uniqueApiKeys: Number(summaryRow?.uniqueApiKeys || 0),
      successfulRequests: Number(summaryRow?.successfulRequests || 0),
      successRatePct:
        Number(summaryRow?.totalRequests || 0) > 0
          ? Number(
              (
                (Number(summaryRow?.successfulRequests || 0) /
                  Number(summaryRow?.totalRequests || 1)) *
                100
              ).toFixed(2)
            )
          : 0,
      avgLatencyMs: Math.round(Number(summaryRow?.avgLatencyMs || 0)),
      totalCost: 0,
      firstRequest: summaryRow?.firstRequest || "",
      lastRequest: summaryRow?.lastRequest || "",
      fallbackCount: Number(fallbackRow?.fallbacks || 0),
      fastRequests: 0,
      standardRequests: 0,
      flexRequests: 0,
      fastCost: 0,
      standardCost: 0,
      flexCost: 0,
      flexSavings: 0,
      flexUsageSavingsTokens: 0,
      fastRequestSharePct: 0,
      fallbackRatePct:
        Number(fallbackRow?.fallback_eligible || 0) > 0
          ? Number(
              (
                (Number(fallbackRow?.fallbacks || 0) /
                  Number(fallbackRow?.fallback_eligible || 1)) *
                100
              ).toFixed(2)
            )
          : 0,
      requestedModelCoveragePct:
        Number(fallbackRow?.total || 0) > 0
          ? Number(
              (
                (Number(fallbackRow?.with_requested || 0) / Number(fallbackRow?.total || 1)) *
                100
              ).toFixed(2)
            )
          : 0,
      streak: 0,
    };

    const dailyByModelMap: Record<string, Record<string, number>> = {};
    const allModels = new Set<string>();

    const dailyCostByDate = new Map<string, number>();
    for (const row of dailyCostRows) {
      const date = toStringValue(row.date);
      if (!date) continue;

      // Calculate costs
      const cost = computeUsageRowCost(
        row,
        pricingByProvider,
        PROVIDER_ID_TO_ALIAS,
        normalizeModelName,
        computeCostFromPricing,
        !includeFlatRateEstimates,
        pricingContext
      );
      dailyCostByDate.set(date, (dailyCostByDate.get(date) || 0) + cost);

      // Group tokens by model for the day
      const model = normalizeModelName(row.model as string);
      const tokens = Number(row.promptTokens) + Number(row.completionTokens);

      if (!dailyByModelMap[date]) dailyByModelMap[date] = {};
      dailyByModelMap[date][model] = (dailyByModelMap[date][model] || 0) + tokens;
      allModels.add(model);
    }

    const dailyTrend = dailyRows.map((row) => ({
      date: row.date,
      requests: Number(row.requests),
      promptTokens: Number(row.promptTokens),
      completionTokens: Number(row.completionTokens),
      totalTokens: Number(row.totalTokens),
      cost: roundCost(dailyCostByDate.get(toStringValue(row.date)) || 0),
    }));

    const activityMap: Record<string, number> = {};
    for (const row of heatmapRows) {
      activityMap[row.date as string] = Number(row.totalTokens);
    }
    summary.streak = computeActivityStreak(activityMap);

    const modelMap = new Map<string, Record<string, unknown>>();
    for (const row of modelRows) {
      const model = row.model as string;
      const provider = row.provider as string;
      const short = normalizeModelName(model);
      const cost = computeUsageRowCost(
        row,
        pricingByProvider,
        PROVIDER_ID_TO_ALIAS,
        normalizeModelName,
        computeCostFromPricing,
        !includeFlatRateEstimates,
        pricingContext
      );
      // Keyed by model name alone (not provider) — the table renders one row per
      // model, so the same model served via multiple provider connections/accounts
      // must be merged here rather than producing duplicate `key={m.model}` rows.
      const key = short;
      const existing = modelMap.get(key) || {
        model: short,
        provider,
        rawModel: model,
        requests: 0,
        promptTokens: 0,
        completionTokens: 0,
        totalTokens: 0,
        latencyWeightedTotal: 0,
        successfulRequests: 0,
        lastUsed: "",
        cost: 0,
      };
      const requests = Number(row.requests) || 0;
      existing.requests = Number(existing.requests || 0) + requests;
      existing.promptTokens = Number(existing.promptTokens || 0) + Number(row.promptTokens || 0);
      existing.completionTokens =
        Number(existing.completionTokens || 0) + Number(row.completionTokens || 0);
      existing.totalTokens = Number(existing.totalTokens || 0) + Number(row.totalTokens || 0);
      existing.latencyWeightedTotal =
        Number(existing.latencyWeightedTotal || 0) + Number(row.avgLatencyMs || 0) * requests;
      existing.successfulRequests =
        Number(existing.successfulRequests || 0) + Number(row.successfulRequests || 0);
      if (!existing.lastUsed || String(row.lastUsed || "") > String(existing.lastUsed || "")) {
        existing.lastUsed = row.lastUsed;
      }
      existing.cost = Number(existing.cost || 0) + cost;
      modelMap.set(key, existing);
    }

    const byModel = Array.from(modelMap.values())
      .map((row) => ({
        ...cachedInput.byModel.find((item) => normalizeModelName(item.model) === row.model),
        model: row.model,
        provider: row.provider,
        rawModel: row.rawModel,
        requests: Number(row.requests),
        promptTokens: Number(row.promptTokens),
        completionTokens: Number(row.completionTokens),
        totalTokens: Number(row.totalTokens),
        avgLatencyMs:
          Number(row.requests) > 0
            ? Math.round(Number(row.latencyWeightedTotal || 0) / Number(row.requests))
            : 0,
        successRatePct:
          Number(row.requests) > 0
            ? Number((Number(row.successfulRequests || 0) / Number(row.requests)) * 100).toFixed(2)
            : 0,
        lastUsed: row.lastUsed,
        cost: roundCost(Number(row.cost || 0)),
      }))
      .sort((left, right) => Number(right.requests) - Number(left.requests))
      .slice(0, 50);

    const totalCost = Array.from(dailyCostByDate.values()).reduce((sum, cost) => sum + cost, 0);
    summary.totalCost = roundCost(totalCost);

    const providerCostByProvider = new Map<string, number>();
    for (const row of providerCostRows) {
      const provider = toStringValue(row.provider);
      if (!provider) continue;
      const cost = computeUsageRowCost(
        row,
        pricingByProvider,
        PROVIDER_ID_TO_ALIAS,
        normalizeModelName,
        computeCostFromPricing,
        !includeFlatRateEstimates,
        pricingContext
      );
      providerCostByProvider.set(provider, (providerCostByProvider.get(provider) || 0) + cost);
    }

    const byProvider = await buildByProviderRows(providerRows, providerCostByProvider);

    const accountCostByAccount = new Map<string, number>();
    for (const row of accountCostRows) {
      const accountKey = toStringValue(row.accountKey, "unknown");
      const cost = computeUsageRowCost(
        row,
        pricingByProvider,
        PROVIDER_ID_TO_ALIAS,
        normalizeModelName,
        computeCostFromPricing,
        !includeFlatRateEstimates,
        pricingContext
      );
      accountCostByAccount.set(accountKey, (accountCostByAccount.get(accountKey) || 0) + cost);
    }

    const byAccount = accountRows.map((row) => ({
      account: toStringValue(row.account, "unknown"),
      requests: Number(row.requests),
      promptTokens: Number(row.promptTokens),
      completionTokens: Number(row.completionTokens),
      totalTokens: Number(row.totalTokens),
      avgLatencyMs: Math.round(Number(row.avgLatencyMs)),
      lastUsed: row.lastUsed,
      cost: roundCost(accountCostByAccount.get(toStringValue(row.accountKey, "unknown")) || 0),
    }));

    const byApiKey = buildApiKeyUsage(apiKeyRows, apiKeyMetadata, currentApiKeyNames, (row) =>
      computeUsageRowCost(
        row,
        pricingByProvider,
        PROVIDER_ID_TO_ALIAS,
        normalizeModelName,
        computeCostFromPricing,
        !includeFlatRateEstimates,
        pricingContext
      )
    );

    const serviceTierMap = new Map<
      string,
      {
        serviceTier: "standard" | "priority" | "flex";
        label: string;
        requests: number;
        promptTokens: number;
        completionTokens: number;
        totalTokens: number;
        cost: number;
        savings: number;
        usageSavingsTokens: number;
      }
    >();
    for (const row of serviceTierRows) {
      const serviceTier = normalizeServiceTier(row.serviceTier);
      const existing = serviceTierMap.get(serviceTier) || {
        serviceTier,
        label: getServiceTierLabelId(serviceTier),
        requests: 0,
        promptTokens: 0,
        completionTokens: 0,
        totalTokens: 0,
        cost: 0,
        savings: 0,
        usageSavingsTokens: 0,
      };
      existing.requests += Number(row.requests || 0);
      existing.promptTokens += Number(row.promptTokens || 0);
      existing.completionTokens += Number(row.completionTokens || 0);
      existing.totalTokens += Number(row.totalTokens || 0);
      const actualCost = computeUsageRowCost(
        row,
        pricingByProvider,
        PROVIDER_ID_TO_ALIAS,
        normalizeModelName,
        computeCostFromPricing,
        !includeFlatRateEstimates,
        pricingContext
      );
      existing.cost += actualCost;
      if (serviceTier === "flex") {
        const standardCost = computeUsageRowStandardCost(
          row,
          pricingByProvider,
          PROVIDER_ID_TO_ALIAS,
          normalizeModelName,
          computeCostFromPricing,
          !includeFlatRateEstimates,
          pricingContext
        );
        existing.savings += Math.max(0, standardCost - actualCost);
        existing.usageSavingsTokens += computeUsageSavingsTokens(
          row,
          serviceTier,
          getCodexFastCostMultiplier
        );
      }
      serviceTierMap.set(serviceTier, existing);
    }
    const byServiceTier = Array.from(serviceTierMap.values())
      .map((row) => ({
        ...row,
        cost: roundCost(row.cost),
        savings: roundCost(row.savings),
        usageSavingsTokens: Math.round(row.usageSavingsTokens),
      }))
      .sort((left, right) => {
        const order = { priority: 0, flex: 1, standard: 2 } as const;
        return order[left.serviceTier] - order[right.serviceTier];
      });
    const fastTier = serviceTierMap.get("priority");
    const flexTier = serviceTierMap.get("flex");
    const standardTier = serviceTierMap.get("standard");
    summary.fastRequests = fastTier?.requests || 0;
    summary.fastCost = roundCost(fastTier?.cost || 0);
    summary.flexRequests = flexTier?.requests || 0;
    summary.flexCost = roundCost(flexTier?.cost || 0);
    summary.flexSavings = roundCost(flexTier?.savings || 0);
    summary.flexUsageSavingsTokens = Math.round(flexTier?.usageSavingsTokens || 0);
    summary.standardRequests = standardTier?.requests || 0;
    summary.standardCost = roundCost(standardTier?.cost || 0);
    summary.fastRequestSharePct =
      summary.totalRequests > 0
        ? Number(((Number(summary.fastRequests) / Number(summary.totalRequests)) * 100).toFixed(2))
        : 0;

    const weeklyTokens = [0, 0, 0, 0, 0, 0, 0];
    const weeklyCounts = [0, 0, 0, 0, 0, 0, 0];
    const weeklyPattern = WEEKDAY_LABELS.map((day) => ({
      day,
      avgTokens: 0,
      totalTokens: 0,
    }));
    for (const row of weeklyRows) {
      const dayIdx = Number(row.dayOfWeek);
      if (dayIdx >= 0 && dayIdx <= 6) {
        const totalTokens = Number(row.totalTokens);
        const days = Number(row.days);
        weeklyTokens[dayIdx] = totalTokens;
        weeklyCounts[dayIdx] = Number(row.requests);
        weeklyPattern[dayIdx] = {
          day: WEEKDAY_LABELS[dayIdx],
          avgTokens: days > 0 ? Math.round(totalTokens / days) : 0,
          totalTokens,
        };
      }
    }

    const modelNames = Array.from(allModels);
    const dailyByModel = Object.keys(dailyByModelMap)
      .sort()
      .map((date) => ({
        date,
        ...Object.fromEntries(
          modelNames.map((model) => [model, dailyByModelMap[date][model] || 0])
        ),
      }));

    const analytics = {
      summary,
      dailyTrend,
      activityMap,
      byModel,
      byProvider,
      byApiKey,
      byAccount,
      byServiceTier,
      weeklyPattern,
      weeklyTokens,
      weeklyCounts,
      dailyByModel,
      modelNames,
      errorBreakdown,
      range,
      includesFlatRateEstimates: includeFlatRateEstimates,
    } as any;

    if (presetsParam) {
      const allowedRanges = new Set(["1d", "7d", "30d", "90d", "ytd", "all"]);
      const presetRanges = presetsParam
        .split(",")
        .map((preset) => preset.trim())
        .filter((preset) => allowedRanges.has(preset));
      const presetSummaries: Record<string, { totalCost: number }> = {};

      for (const presetRange of presetRanges) {
        if (presetRange === range) {
          presetSummaries[presetRange] = {
            totalCost: Number(analytics.summary?.totalCost || 0),
          };
          continue;
        }

        const presetSinceIso = getRangeStartIso(presetRange);
        const { unifiedSource: pSrc, unifiedParams: pParams } = buildPresetUnifiedSource({
          sinceIso: presetSinceIso ?? null,
          untilIso: null,
          rawCutoffDate,
          apiKeyWhere,
          apiKeyParams: apiKeyParamEntries,
        });

        const presetModelRows = getPresetCostModelRows(pSrc, pParams) as UsageRows;

        let presetTotalCost = 0;
        for (const row of presetModelRows) {
          presetTotalCost += computeUsageRowCost(
            row,
            pricingByProvider,
            PROVIDER_ID_TO_ALIAS,
            normalizeModelName,
            computeCostFromPricing,
            !includeFlatRateEstimates,
            pricingContext
          );
        }

        presetSummaries[presetRange] = {
          totalCost: roundCost(presetTotalCost),
        };
      }

      analytics.presetSummaries = presetSummaries;
    }

    return NextResponse.json(analytics);
  } catch (error) {
    console.error("Error computing analytics:", error);
    // Surface the real (sanitized) reason so the dashboard can show it instead of a
    // generic placeholder (#3356). buildErrorBody strips stacks/absolute paths.
    const { buildErrorBody } = await import("@omniroute/open-sse/utils/error");
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json(buildErrorBody(500, message || "Failed to compute analytics"), {
      status: 500,
    });
  }
}
