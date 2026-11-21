import { computeCostFromPricing, resolvePricingRow } from "./costCalculator";
import type { TeamCostRow } from "@/lib/db/teamCostRows";
import type { TeamCostShape } from "./teamCostShapes";
import { isCreditMeteredProvider } from "./creditMeteredProviders";

export interface TeamCostTotals {
  estimatedListCostUsd: number;
  accountedCostUsd: number;
  actualProviderCostUsd: number | null;
  hasUnpricedUsage: boolean;
  hasUnpricedListUsage: boolean;
  hasPricingFailure: boolean;
  unpricedModels: string[];
}
type PriceResult = { pricing: Record<string, unknown> | null; failed: boolean };
export type TeamPricingMemo = Map<string, Promise<PriceResult>>;
const known = (n: unknown): n is number => typeof n === "number" && Number.isFinite(n) && n >= 0;
export const roundTeamUsd = (n: number) => Math.round(n * 1e6) / 1e6;
export const emptyTeamCosts = (): TeamCostTotals => ({
  estimatedListCostUsd: 0,
  accountedCostUsd: 0,
  actualProviderCostUsd: null,
  hasUnpricedUsage: false,
  hasUnpricedListUsage: false,
  hasPricingFailure: false,
  unpricedModels: [],
});
export function addTeamCosts(total: TeamCostTotals, value: TeamCostTotals) {
  total.estimatedListCostUsd += value.estimatedListCostUsd;
  total.accountedCostUsd += value.accountedCostUsd;
  if (value.actualProviderCostUsd !== null)
    total.actualProviderCostUsd = (total.actualProviderCostUsd ?? 0) + value.actualProviderCostUsd;
  total.hasUnpricedUsage ||= value.hasUnpricedUsage;
  total.hasUnpricedListUsage ||= value.hasUnpricedListUsage;
  total.hasPricingFailure ||= value.hasPricingFailure;
  total.unpricedModels = [...new Set([...total.unpricedModels, ...value.unpricedModels])].sort();
}
async function listCost(row: TeamCostRow, shape: TeamCostShape, memo: TeamPricingMemo) {
  if (
    row.provider === "__unknown_provider__" ||
    row.model === "__unknown_model__" ||
    isCreditMeteredProvider(row.provider) ||
    (shape.billingUnit && shape.billingUnit !== "token")
  )
    return { cost: 0, priced: false, failed: false };
  const key = JSON.stringify([row.provider, row.model]);
  let lookup = memo.get(key);
  if (!lookup) {
    lookup = resolvePricingRow(row.provider, row.model).then(
      (pricing) => ({ pricing, failed: false }),
      () => ({ pricing: null, failed: true })
    );
    memo.set(key, lookup);
  }
  const { pricing, failed } = await lookup;
  if (!pricing) return { cost: 0, priced: false, failed };
  try {
    // Only token fields enter the catalogue estimate. Exact costs are a separate basis.
    const { input, output, cacheRead, cacheCreation, reasoning } = shape;
    const cost = computeCostFromPricing(
      pricing,
      { input, output, cacheRead, cacheCreation, reasoning },
      { provider: row.provider, model: row.model, serviceTier: row.serviceTier }
    );
    return { cost: known(cost) ? cost : 0, priced: known(cost), failed: !known(cost) };
  } catch {
    return { cost: 0, priced: false, failed: true };
  }
}
export async function priceTeamCostRow(
  row: TeamCostRow,
  memo: TeamPricingMemo
): Promise<TeamCostTotals> {
  const result = emptyTeamCosts();
  result.hasUnpricedUsage = row.unpricedRequests > 0;
  result.hasPricingFailure = row.hasAccountingFailure === true;
  result.hasUnpricedListUsage = row.unpricedRequests > 0;
  if (row.legacyTokens) {
    // Preserve the old display-only aggregate estimate. It is not precise enough
    // for enforcement and never erases the legacy unknown-usage marker.
    const legacy = await listCost(row, row.legacyTokens, memo);
    result.estimatedListCostUsd += legacy.cost;
    result.hasPricingFailure ||= legacy.failed;
  }
  for (const { shape, count } of row.entries) {
    const list = await listCost(row, shape, memo);
    result.estimatedListCostUsd += list.cost * count;
    result.hasUnpricedListUsage ||= !list.priced;
    const reported = known(shape.providerCostUsd) ? shape.providerCostUsd : null;
    const snapshot = known(shape.calculatedCostUsd) ? shape.calculatedCostUsd : null;
    const accounted = reported ?? snapshot ?? (list.priced ? list.cost : null);
    if (reported !== null)
      result.actualProviderCostUsd = (result.actualProviderCostUsd ?? 0) + reported * count;
    if (accounted === null) {
      result.hasUnpricedUsage = true;
      result.hasPricingFailure ||= list.failed;
    } else result.accountedCostUsd += accounted * count;
  }
  if (result.hasUnpricedUsage) result.unpricedModels = [row.provider + "/" + row.model];
  return result;
}
