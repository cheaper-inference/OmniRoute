import { getDbInstance } from "./core";

export function getRecentUsageRows(sinceIso: string, untilIso: string): unknown[] {
  return getDbInstance()
    .prepare(
      `
        SELECT
          strftime('%Y-%m-%dT%H:%M:00.000Z', timestamp) as minute,
          provider,
          model,
          COALESCE(service_tier, 'standard') as service_tier,
          COUNT(*) as request_count,
          SUM(CASE WHEN tokens_cache_read IS NULL THEN 1 ELSE 0 END) as cached_input_unknown_requests,
          COALESCE(SUM(tokens_input), 0) as tokens_input,
          COALESCE(SUM(tokens_output), 0) as tokens_output,
          SUM(tokens_cache_read) as tokens_cache_read,
          COALESCE(SUM(tokens_cache_creation), 0) as tokens_cache_creation,
          COALESCE(SUM(tokens_reasoning), 0) as tokens_reasoning,
          COALESCE(SUM(CASE WHEN COALESCE(provider_cost_usd, calculated_cost_usd) IS NULL THEN tokens_input ELSE 0 END), 0) as cost_tokens_input,
          COALESCE(SUM(CASE WHEN COALESCE(provider_cost_usd, calculated_cost_usd) IS NULL THEN tokens_output ELSE 0 END), 0) as cost_tokens_output,
          COALESCE(SUM(CASE WHEN COALESCE(provider_cost_usd, calculated_cost_usd) IS NULL THEN tokens_cache_read ELSE 0 END), 0) as cost_tokens_cache_read,
          COALESCE(SUM(CASE WHEN COALESCE(provider_cost_usd, calculated_cost_usd) IS NULL THEN tokens_cache_creation ELSE 0 END), 0) as cost_tokens_cache_creation,
          COALESCE(SUM(CASE WHEN COALESCE(provider_cost_usd, calculated_cost_usd) IS NULL THEN tokens_reasoning ELSE 0 END), 0) as cost_tokens_reasoning,
          COALESCE(SUM(COALESCE(provider_cost_usd, calculated_cost_usd)), 0.0) as stored_cost
        FROM usage_history
        WHERE timestamp >= ? AND timestamp <= ?
        GROUP BY minute, provider, model, service_tier
      `
    )
    .all(sinceIso, untilIso);
}
