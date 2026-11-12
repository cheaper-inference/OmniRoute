import { tokenPriceableUsageSql } from "../usageCostSql";

/** The same split for queries that read usage_history directly. */
export function rawCostSums(table: string): string {
  const priceable = (column: string) =>
    `COALESCE(SUM(CASE WHEN ${tokenPriceableUsageSql(table)} THEN ${table}.${column} ELSE 0 END), 0)`;
  return `
        COALESCE(SUM(COALESCE(${table}.provider_cost_usd, ${table}.calculated_cost_usd)), 0.0) as storedCost,
        0 as isAggregated,
        ${priceable("tokens_input")} as costPromptTokens,
        ${priceable("tokens_output")} as costCompletionTokens,
        ${priceable("tokens_cache_read")} as costCacheReadTokens,
        ${priceable("tokens_cache_creation")} as costCacheCreationTokens,
        ${priceable("tokens_reasoning")} as costReasoningTokens`;
}
