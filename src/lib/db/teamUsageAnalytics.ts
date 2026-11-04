import { getDbInstance } from "./core";
import { calculateCostDetailed } from "@/lib/usage/costCalculator";
import { toNumber } from "@/shared/utils/numeric";
import { parseShapeCounts } from "@/lib/usage/teamCostShapes";

export interface TeamUsageReport {
  teamId: string;
  range: { startIso: string | null; endIso: string | null };
  enforcementMode: "soft_committed_usage";
  summary: {
    requests: number;
    successfulRequests: number;
    inputTokens: number;
    outputTokens: number;
    estimatedListCostUsd: number;
    actualProviderCostUsd: null;
    subscriptionQuotaUsed: null;
    compressionSavingsUsd: null;
    hasUnpricedUsage: boolean;
  };
  byApiKey: Array<{
    apiKeyId: string;
    apiKeyName: string;
    requests: number;
    inputTokens: number;
    outputTokens: number;
    estimatedListCostUsd: number;
    hasUnpricedUsage: boolean;
  }>;
}

type TeamUsageCostRow = {
  apiKeyId: string;
  apiKeyName: string | null;
  provider: string;
  model: string;
  serviceTier: string;
  requests: number;
  successfulRequests: number;
  inputTokens: number;
  outputTokens: number;
  cacheReadTokens: number;
  cacheCreationTokens: number;
  reasoningTokens: number;
  tokenShapesJson?: string | null;
  retained?: number;
};

function roundUsd(value: number): number {
  return Math.round(value * 1_000_000) / 1_000_000;
}

async function rowCost(row: TeamUsageCostRow): Promise<{ costUsd: number; priced: boolean }> {
  if (row.provider === "__unknown_provider__" || row.model === "__unknown_model__") {
    return { costUsd: 0, priced: false };
  }
  const shapes = parseShapeCounts(row.tokenShapesJson, toNumber(row.requests));
  if (!shapes.length) {
    const result = await calculateCostDetailed(
      row.provider,
      row.model,
      {
        input: toNumber(row.inputTokens),
        output: toNumber(row.outputTokens),
        cacheRead: toNumber(row.cacheReadTokens),
        cacheCreation: toNumber(row.cacheCreationTokens),
        reasoning: toNumber(row.reasoningTokens),
      },
      { provider: row.provider, model: row.model, serviceTier: row.serviceTier }
    );
    return { costUsd: result.costUsd, priced: result.priced && !row.retained };
  }
  let costUsd = 0;
  let priced = true;
  for (const { shape, count } of shapes) {
    const result = await calculateCostDetailed(row.provider, row.model, shape, {
      provider: row.provider,
      model: row.model,
      serviceTier: row.serviceTier,
    });
    costUsd += result.costUsd * count;
    priced &&= result.priced;
  }
  return { costUsd, priced };
}

type ReportOptions = { startIso?: string | null; endIso?: string | null };

function buildReportBind(teamId: string, options: ReportOptions) {
  return {
    teamId,
    startIso: options.startIso || "0000-01-01T00:00:00.000Z",
    endIso: options.endIso || "9999-12-31T23:59:59.999Z",
    completeSummaryStartDate: (() => {
      const start = options.startIso;
      if (!start) return "0000-01-01";
      const date = start.slice(0, 10);
      return start === `${date}T00:00:00.000Z`
        ? date
        : new Date(Date.parse(`${date}T00:00:00.000Z`) + 86_400_000).toISOString().slice(0, 10);
    })(),
    completeSummaryEndDateExclusive: (() => {
      const end = options.endIso;
      if (!end) return "9999-12-31";
      const date = end.slice(0, 10);
      return end === `${date}T23:59:59.999Z`
        ? new Date(Date.parse(`${date}T00:00:00.000Z`) + 86_400_000).toISOString().slice(0, 10)
        : date;
    })(),
  };
}

function loadReportRows(
  db: ReturnType<typeof getDbInstance>,
  bind: ReturnType<typeof buildReportBind>
): TeamUsageCostRow[] {
  const rawRows = db
    .prepare(
      `SELECT
         COALESCE(NULLIF(api_key_id, ''), 'unknown') as apiKeyId,
         MAX(NULLIF(api_key_name, '')) as apiKeyName,
         COALESCE(NULLIF(LOWER(provider), ''), '__unknown_provider__') as provider,
         COALESCE(NULLIF(LOWER(model), ''), '__unknown_model__') as model,
         COALESCE(NULLIF(service_tier, ''), 'standard') as serviceTier,
         COUNT(*) as requests,
         COALESCE(SUM(CASE WHEN success = 1 THEN 1 ELSE 0 END), 0) as successfulRequests,
         COALESCE(SUM(tokens_input), 0) as inputTokens,
         COALESCE(SUM(tokens_output), 0) as outputTokens,
         COALESCE(SUM(tokens_cache_read), 0) as cacheReadTokens,
         COALESCE(SUM(tokens_cache_creation), 0) as cacheCreationTokens,
         COALESCE(SUM(tokens_reasoning), 0) as reasoningTokens
       FROM usage_history
       WHERE billing_team_id = @teamId
         AND team_rollup_processed_at IS NULL
         AND timestamp >= @startIso AND timestamp <= @endIso
       GROUP BY apiKeyId, LOWER(provider), LOWER(model), serviceTier,
         tokens_input, tokens_output, tokens_cache_read, tokens_cache_creation, tokens_reasoning`
    )
    .all(bind) as TeamUsageCostRow[];

  const summaryRows = db
    .prepare(
      `SELECT
         api_key_id as apiKeyId,
         MAX(NULLIF(api_key_name, '')) as apiKeyName,
         COALESCE(NULLIF(LOWER(provider), ''), '__unknown_provider__') as provider,
         COALESCE(NULLIF(LOWER(model), ''), '__unknown_model__') as model,
         COALESCE(NULLIF(service_tier, ''), 'standard') as serviceTier,
         COALESCE(SUM(total_requests), 0) as requests,
         COALESCE(SUM(successful_requests), 0) as successfulRequests,
         COALESCE(SUM(total_input_tokens), 0) as inputTokens,
         COALESCE(SUM(total_output_tokens), 0) as outputTokens,
         COALESCE(SUM(total_cache_read_tokens), 0) as cacheReadTokens,
         COALESCE(SUM(total_cache_creation_tokens), 0) as cacheCreationTokens,
         COALESCE(SUM(total_reasoning_tokens), 0) as reasoningTokens,
         MAX(token_shapes_json) as tokenShapesJson,
         1 as retained
       FROM daily_team_usage_summary
       WHERE team_id = @teamId
         AND date >= @completeSummaryStartDate
         AND date < @completeSummaryEndDateExclusive
       GROUP BY api_key_id, LOWER(provider), LOWER(model), serviceTier, date`
    )
    .all(bind) as TeamUsageCostRow[];

  return [...rawRows, ...summaryRows];
}

async function aggregateReportRows(rows: TeamUsageCostRow[]) {
  const byKey = new Map<
    string,
    {
      apiKeyId: string;
      apiKeyName: string;
      requests: number;
      inputTokens: number;
      outputTokens: number;
      estimatedListCostUsd: number;
      hasUnpricedUsage: boolean;
    }
  >();
  let requests = 0;
  let successfulRequests = 0;
  let inputTokens = 0;
  let outputTokens = 0;
  let estimatedListCostUsd = 0;
  let hasUnpricedUsage = false;

  for (const row of rows) {
    const { costUsd, priced } = await rowCost(row);
    requests += toNumber(row.requests);
    successfulRequests += toNumber(row.successfulRequests);
    inputTokens += toNumber(row.inputTokens);
    outputTokens += toNumber(row.outputTokens);
    estimatedListCostUsd += costUsd;
    hasUnpricedUsage ||= !priced;
    const current = byKey.get(row.apiKeyId) || {
      apiKeyId: row.apiKeyId,
      apiKeyName: row.apiKeyName || row.apiKeyId,
      requests: 0,
      inputTokens: 0,
      outputTokens: 0,
      estimatedListCostUsd: 0,
      hasUnpricedUsage: false,
    };
    current.requests += toNumber(row.requests);
    current.inputTokens += toNumber(row.inputTokens);
    current.outputTokens += toNumber(row.outputTokens);
    current.estimatedListCostUsd += costUsd;
    current.hasUnpricedUsage ||= !priced;
    byKey.set(row.apiKeyId, current);
  }

  return {
    requests,
    successfulRequests,
    inputTokens,
    outputTokens,
    estimatedListCostUsd,
    hasUnpricedUsage,
    byKey,
  };
}

export async function getTeamUsageReport(
  teamId: string,
  options: ReportOptions = {}
): Promise<TeamUsageReport> {
  const bind = buildReportBind(teamId, options);
  const rows = loadReportRows(getDbInstance(), bind);
  const {
    requests,
    successfulRequests,
    inputTokens,
    outputTokens,
    estimatedListCostUsd,
    hasUnpricedUsage,
    byKey,
  } = await aggregateReportRows(rows);

  return {
    teamId,
    range: { startIso: options.startIso || null, endIso: options.endIso || null },
    enforcementMode: "soft_committed_usage",
    summary: {
      requests,
      successfulRequests,
      inputTokens,
      outputTokens,
      estimatedListCostUsd: roundUsd(estimatedListCostUsd),
      actualProviderCostUsd: null,
      subscriptionQuotaUsed: null,
      compressionSavingsUsd: null,
      hasUnpricedUsage,
    },
    byApiKey: [...byKey.values()]
      .map((row) => ({ ...row, estimatedListCostUsd: roundUsd(row.estimatedListCostUsd) }))
      .sort((left, right) => right.estimatedListCostUsd - left.estimatedListCostUsd),
  };
}
