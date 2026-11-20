import { getDbInstance } from "./core";
import { hasColumn } from "./schemaColumns";

interface UsageCostRow {
  decisionEndpoint?: number;
  storedCost: number | null;
  unmeteredRequests: number | null;
  unpricedUnitRequests: number | null;
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

/** Cost snapshots take precedence over token repricing, without double charging. */
export function getApiKeySpendRows(apiKeyId: string, sinceIso: string): UsageCostRow[] {
  const db = getDbInstance();
  // Decision endpoints are priced per endpoint, never from chat tokens (#18838). The cloud
  // bootstrap schema has no usage_history.endpoint column, so none of its rows is a decision.
  const decisionEndpoint = hasColumn(db, "usage_history", "endpoint")
    ? "CASE WHEN endpoint IN ('/v1/decisions', '/v1/systemone') THEN 1 ELSE 0 END"
    : "0";
  return db
    .prepare(
      `
      SELECT
        LOWER(provider) as provider,
        LOWER(model) as model,
        ${decisionEndpoint} as decisionEndpoint,
        COALESCE(NULLIF(service_tier, ''), 'standard') as serviceTier,
        COALESCE(SUM(COALESCE(provider_cost_usd, calculated_cost_usd)), 0) as storedCost,
        SUM(CASE WHEN billing_unit IS NOT NULL AND COALESCE(provider_cost_usd, calculated_cost_usd) IS NULL THEN 1 ELSE 0 END) as unpricedUnitRequests,
        COALESCE(SUM(CASE WHEN COALESCE(provider_cost_usd, calculated_cost_usd) IS NULL THEN 1 ELSE 0 END), 0) as unmeteredRequests,
        COALESCE(SUM(CASE WHEN COALESCE(provider_cost_usd, calculated_cost_usd) IS NULL THEN tokens_input ELSE 0 END), 0) as promptTokens,
        COALESCE(SUM(CASE WHEN COALESCE(provider_cost_usd, calculated_cost_usd) IS NULL THEN tokens_output ELSE 0 END), 0) as completionTokens,
        COALESCE(SUM(CASE WHEN COALESCE(provider_cost_usd, calculated_cost_usd) IS NULL THEN tokens_cache_read ELSE 0 END), 0) as cacheReadTokens,
        COALESCE(SUM(CASE WHEN COALESCE(provider_cost_usd, calculated_cost_usd) IS NULL THEN tokens_cache_creation ELSE 0 END), 0) as cacheCreationTokens,
        COALESCE(SUM(CASE WHEN COALESCE(provider_cost_usd, calculated_cost_usd) IS NULL THEN tokens_reasoning ELSE 0 END), 0) as reasoningTokens,
        MIN(timestamp) as oldestTimestamp
      FROM usage_history
      WHERE api_key_id = @apiKeyId
        AND timestamp >= @sinceIso
        AND (success = 1 OR COALESCE(provider_cost_usd, calculated_cost_usd) IS NOT NULL)
      GROUP BY LOWER(provider), LOWER(model), serviceTier, decisionEndpoint
    `
    )
    .all({ apiKeyId, sinceIso }) as UsageCostRow[];
}
