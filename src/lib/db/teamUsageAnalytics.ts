import { loadTeamCostRows } from "./teamCostRows";
import {
  addTeamCosts,
  emptyTeamCosts,
  priceTeamCostRow,
  roundTeamUsd,
  type TeamCostTotals,
  type TeamPricingMemo,
} from "@/lib/usage/teamCostAccounting";

type KeyUsage = TeamCostTotals & {
  apiKeyId: string;
  apiKeyName: string;
  requests: number;
  inputTokens: number;
  outputTokens: number;
};
export interface TeamUsageReport {
  teamId: string;
  range: { startIso: string | null; endIso: string | null };
  enforcementMode: "soft_committed_usage";
  summary: TeamCostTotals & {
    requests: number;
    successfulRequests: number;
    inputTokens: number;
    outputTokens: number;
    subscriptionQuotaUsed: null;
    compressionSavingsUsd: null;
  };
  byApiKey: KeyUsage[];
}
function rounded<T extends TeamCostTotals>(costs: T): T {
  return {
    ...costs,
    estimatedListCostUsd: roundTeamUsd(costs.estimatedListCostUsd),
    accountedCostUsd: roundTeamUsd(costs.accountedCostUsd),
    actualProviderCostUsd:
      costs.actualProviderCostUsd === null ? null : roundTeamUsd(costs.actualProviderCostUsd),
  };
}
export async function getTeamUsageReport(
  teamId: string,
  options: { startIso?: string | null; endIso?: string | null } = {}
): Promise<TeamUsageReport> {
  const summary = {
    ...emptyTeamCosts(),
    requests: 0,
    successfulRequests: 0,
    inputTokens: 0,
    outputTokens: 0,
    subscriptionQuotaUsed: null,
    compressionSavingsUsd: null,
  };
  const byKey = new Map<string, KeyUsage>();
  const memo: TeamPricingMemo = new Map();
  // Reports retain failed attempts; admission deliberately counts successful usage only.
  for (const row of loadTeamCostRows(teamId, options)) {
    const cost = await priceTeamCostRow(row, memo);
    addTeamCosts(summary, cost);
    summary.requests += row.requests;
    summary.successfulRequests += row.successfulRequests;
    summary.inputTokens += row.inputTokens;
    summary.outputTokens += row.outputTokens;
    const key = byKey.get(row.apiKeyId) ?? {
      ...emptyTeamCosts(),
      apiKeyId: row.apiKeyId,
      apiKeyName: row.apiKeyName || row.apiKeyId,
      requests: 0,
      inputTokens: 0,
      outputTokens: 0,
    };
    addTeamCosts(key, cost);
    key.requests += row.requests;
    key.inputTokens += row.inputTokens;
    key.outputTokens += row.outputTokens;
    byKey.set(row.apiKeyId, key);
  }
  return {
    teamId,
    range: { startIso: options.startIso || null, endIso: options.endIso || null },
    enforcementMode: "soft_committed_usage",
    summary: rounded(summary),
    byApiKey: [...byKey.values()]
      .map(rounded)
      .sort((a, b) => b.estimatedListCostUsd - a.estimatedListCostUsd),
  };
}
