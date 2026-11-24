import { getDbInstance } from "./core";

interface UsageCostRow {
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
  return db
    .prepare(
      `
      SELECT
        LOWER(provider) as provider,
        LOWER(model) as model,
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
      GROUP BY LOWER(provider), LOWER(model), serviceTier
    `
    )
    .all({ apiKeyId, sinceIso }) as UsageCostRow[];
}
