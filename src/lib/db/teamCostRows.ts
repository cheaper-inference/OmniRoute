import { getDbInstance } from "./core";
import { parseBillingShapeCounts, type TeamCostShape } from "@/lib/usage/teamCostShapes";

export interface TeamCostRow {
  apiKeyId: string;
  apiKeyName: string | null;
  provider: string;
  model: string;
  serviceTier: string;
  requests: number;
  successfulRequests: number;
  inputTokens: number;
  outputTokens: number;
  entries: Array<{ shape: TeamCostShape; count: number }>;
  unpricedRequests: number;
  legacyTokens?: TeamCostShape;
  hasAccountingFailure?: boolean;
}

type RawRow = Omit<TeamCostRow, "entries" | "unpricedRequests"> & {
  cacheReadTokens: number;
  cacheCreationTokens: number;
  reasoningTokens: number;
  providerCostUsd: number | null;
  calculatedCostUsd: number | null;
  endpoint: string | null;
  billingUnit: string | null;
};
type RetainedRow = Omit<TeamCostRow, "entries" | "unpricedRequests"> & {
  tokenShapesJson: string | null;
  cacheReadTokens: number;
  cacheCreationTokens: number;
  reasoningTokens: number;
};

function completeDates(start: string, end: string) {
  const first = start.slice(0, 10),
    last = end.slice(0, 10);
  return {
    firstDate:
      start === first + "T00:00:00.000Z"
        ? first
        : new Date(Date.parse(first + "T00:00:00.000Z") + 86400000).toISOString().slice(0, 10),
    lastDate:
      last !== "9999-12-31" && end === last + "T23:59:59.999Z"
        ? new Date(Date.parse(last + "T00:00:00.000Z") + 86400000).toISOString().slice(0, 10)
        : last,
  };
}

/** Shared report/admission projection; each source request contributes exactly once. */
export function loadTeamCostRows(
  teamId: string,
  options: {
    startIso?: string | null;
    endIso?: string | null;
    successfulOnly?: boolean;
    endExclusive?: boolean;
  } = {}
): TeamCostRow[] {
  const db = getDbInstance(),
    successful = options.successfulOnly === true;
  const start = options.startIso || "0000-01-01T00:00:00.000Z";
  const end = options.endIso || "9999-12-31T23:59:59.999Z";
  const bind = { teamId, start, end, ...completeDates(start, end) };
  const rows = db
    .prepare(
      `
    SELECT COALESCE(NULLIF(api_key_id,''),'unknown') as apiKeyId,
      MAX(NULLIF(api_key_name,'')) as apiKeyName,
      COALESCE(NULLIF(LOWER(provider),''),'__unknown_provider__') as provider,
      COALESCE(NULLIF(LOWER(model),''),'__unknown_model__') as model,
      COALESCE(NULLIF(service_tier,''),'standard') as serviceTier,
      COUNT(*) as requests, SUM(CASE WHEN success=1 THEN 1 ELSE 0 END) as successfulRequests,
      COALESCE(tokens_input,0) as inputTokens, COALESCE(tokens_output,0) as outputTokens,
      COALESCE(tokens_cache_read,0) as cacheReadTokens,
      COALESCE(tokens_cache_creation,0) as cacheCreationTokens,
      COALESCE(tokens_reasoning,0) as reasoningTokens,
      provider_cost_usd as providerCostUsd, calculated_cost_usd as calculatedCostUsd,
      endpoint, billing_unit as billingUnit
    FROM usage_history WHERE billing_team_id=@teamId AND team_rollup_processed_at IS NULL
      AND timestamp>=@start AND timestamp ${options.endExclusive ? "<" : "<="} @end
      ${successful ? "AND success=1" : ""}
    GROUP BY apiKeyId, LOWER(provider), LOWER(model), serviceTier,
      tokens_input,tokens_output,tokens_cache_read,tokens_cache_creation,tokens_reasoning,
      provider_cost_usd,calculated_cost_usd,endpoint,billing_unit
  `
    )
    .all(bind) as RawRow[];
  const raw = rows.map((row) => ({
    ...row,
    inputTokens: row.inputTokens * row.requests,
    outputTokens: row.outputTokens * row.requests,
    unpricedRequests: 0,
    entries: [
      {
        count: row.requests,
        shape: {
          input: row.inputTokens,
          output: row.outputTokens,
          cacheRead: row.cacheReadTokens,
          cacheCreation: row.cacheCreationTokens,
          reasoning: row.reasoningTokens,
          ...(row.providerCostUsd !== null ? { providerCostUsd: row.providerCostUsd } : {}),
          ...(row.calculatedCostUsd !== null ? { calculatedCostUsd: row.calculatedCostUsd } : {}),
          endpoint: row.endpoint,
          billingUnit: row.billingUnit,
        },
      },
    ],
  }));
  const prefix = successful ? "successful" : "total";
  const retained = db
    .prepare(
      `
    SELECT api_key_id as apiKeyId, api_key_name as apiKeyName, provider, model,
      service_tier as serviceTier, ${prefix === "total" ? "total_requests" : "successful_requests"} as requests,
      successful_requests as successfulRequests,
      ${prefix}_input_tokens as inputTokens, ${prefix}_output_tokens as outputTokens,
      ${prefix}_cache_read_tokens as cacheReadTokens,
      ${prefix}_cache_creation_tokens as cacheCreationTokens,
      ${prefix}_reasoning_tokens as reasoningTokens,
      ${successful ? "successful_token_shapes_json" : "token_shapes_json"} as tokenShapesJson
    FROM daily_team_usage_summary
    WHERE team_id=@teamId AND date>=@firstDate AND date<@lastDate
      ${successful ? "AND successful_requests>0" : ""}
  `
    )
    .all(bind) as RetainedRow[];
  return [
    ...raw,
    ...retained.map((row) => {
      const parsed = parseBillingShapeCounts(row.tokenShapesJson, row.requests);
      return {
        ...row,
        ...parsed,
        hasAccountingFailure: parsed.invalid === true,
        ...(!parsed.entries.length && parsed.unpricedRequests > 0
          ? {
              legacyTokens: {
                input: row.inputTokens,
                output: row.outputTokens,
                cacheRead: row.cacheReadTokens,
                cacheCreation: row.cacheCreationTokens,
                reasoning: row.reasoningTokens,
              },
            }
          : {}),
      };
    }),
  ];
}
