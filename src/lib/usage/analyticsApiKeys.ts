import type { ApiKeyTotalsRow } from "../db/usageAnalytics";
import { roundCost, toStringValue } from "./analyticsPricing";

type UsageRow = Record<string, unknown>;
type KeyMetadata = { latestName: string; aliases: Set<string> };
type ApiKeyTotal = {
  apiKeyId: string;
  apiKeyName: string;
  requests: number;
  cost: number;
  lastUsed: string | null;
};

export function makeApiKeyUsageGroup(apiKeyId: string, fallbackName: string): string {
  return apiKeyId ? `id:${apiKeyId}` : `name:${fallbackName}`;
}

export function addApiKeyAlias(target: Set<string>, value: unknown): void {
  if (typeof value !== "string") return;
  const trimmed = value.trim();
  if (trimmed) target.add(trimmed);
}

/** Name-only legacy rows contribute last use, never another key's requests or cost. */
export function buildApiKeyTotals(
  rows: ApiKeyTotalsRow[],
  apiKeys: Array<{ id?: unknown; name?: unknown }>,
  rowCost: (row: ApiKeyTotalsRow) => number
): ApiKeyTotal[] {
  const totalsById = new Map<string, ApiKeyTotal>();
  const totalsByName = new Map<string, ApiKeyTotal[]>();
  for (const apiKey of apiKeys) {
    if (typeof apiKey.id !== "string" || typeof apiKey.name !== "string") continue;
    const totals: ApiKeyTotal = {
      apiKeyId: apiKey.id,
      apiKeyName: apiKey.name,
      requests: 0,
      cost: 0,
      lastUsed: null,
    };
    totalsById.set(apiKey.id, totals);
    totalsByName.set(apiKey.name, [...(totalsByName.get(apiKey.name) || []), totals]);
  }
  const noteLastUsed = (totals: ApiKeyTotal, lastUsed: string | null) => {
    if (lastUsed && (!totals.lastUsed || lastUsed > totals.lastUsed)) totals.lastUsed = lastUsed;
  };
  for (const row of rows) {
    if (!row.apiKeyId) {
      for (const totals of totalsByName.get(row.apiKeyName || "") || []) {
        noteLastUsed(totals, row.lastUsed);
      }
      continue;
    }
    const totals = totalsById.get(row.apiKeyId);
    if (!totals) continue;
    totals.requests += Number(row.requests) || 0;
    totals.cost += rowCost(row);
    noteLastUsed(totals, row.lastUsed);
  }
  return Array.from(totalsById.values(), (totals) => ({
    ...totals,
    cost: roundCost(totals.cost),
  }));
}

export function buildApiKeyUsage(
  rows: UsageRow[],
  metadata: Map<string, KeyMetadata>,
  currentNames: Map<string, string>,
  rowCost: (row: UsageRow) => number
) {
  const grouped = new Map<
    string,
    {
      apiKey: string;
      apiKeyId: string | null;
      apiKeyName: string;
      historicalApiKeyNames: string[];
      requests: number;
      promptTokens: number;
      completionTokens: number;
      totalTokens: number;
      cost: number;
    }
  >();
  for (const row of rows) {
    const apiKeyId = toStringValue(row.apiKeyId);
    const apiKeyGroupKey = toStringValue(row.apiKeyGroupKey, "unknown");
    const key = makeApiKeyUsageGroup(apiKeyId, apiKeyGroupKey);
    const info = metadata.get(key);
    const apiKeyName =
      (apiKeyId ? currentNames.get(apiKeyId) : undefined) ||
      info?.latestName ||
      apiKeyId ||
      apiKeyGroupKey ||
      "Unknown API key";
    const existing = grouped.get(key) || {
      apiKey: apiKeyId && apiKeyName !== apiKeyId ? `${apiKeyName} (${apiKeyId})` : apiKeyName,
      apiKeyId: apiKeyId || null,
      apiKeyName,
      historicalApiKeyNames: Array.from(info?.aliases || []),
      requests: 0,
      promptTokens: 0,
      completionTokens: 0,
      totalTokens: 0,
      cost: 0,
    };
    existing.requests += Number(row.requests);
    existing.promptTokens += Number(row.promptTokens);
    existing.completionTokens += Number(row.completionTokens);
    existing.totalTokens += Number(row.totalTokens);
    existing.cost += rowCost(row);
    grouped.set(key, existing);
  }
  return Array.from(grouped.values())
    .map((row) => ({ ...row, cost: roundCost(row.cost) }))
    .sort((left, right) => right.cost - left.cost);
}
