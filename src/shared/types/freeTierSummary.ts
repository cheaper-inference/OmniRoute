import type { FreeModelBudget, FreeModelTotals } from "@omniroute/open-sse/config/freeModelCatalog";

export interface FreeTierSummarySource {
  kind: "release" | "radar";
  version: string | null;
  generatedAt: string | null;
  servedAt: string;
}

export interface FreeTierSummaryRowSum {
  method: "row-sum-v1";
  liveTokens: number;
  retiredTokens: number;
  totalTokens: number;
  retiredShare: number;
}

export interface FreeTierActivePromotions {
  tokens: number;
  count: number;
  nextExpiry: string | null;
  asOf: string;
}

export interface FreeTierPriceReference {
  yearlyUsd: number;
  lifetimeUsd: number;
  checkedAt: string;
}

export interface FreeTierSummaryRow extends FreeModelBudget {
  enabled?: boolean;
  inRelease: boolean;
  routable: boolean;
}

export interface FreeTierSummary extends Omit<FreeModelTotals, "perModel"> {
  perModel: FreeTierSummaryRow[];
  usedThisMonth: number | null;
  remaining: number | null;
  catalogUpdatedAt: string | null;
  catalogSource: "baseline" | "radar-overlay";
  noCredentialProviders: string[];
  source: FreeTierSummarySource;
  rowSum: FreeTierSummaryRowSum;
  rowSumSource: FreeTierSummarySource["kind"];
  realTokens: number;
  socialGatedTokens: number;
  activePromotions: FreeTierActivePromotions | null;
  priceReference: FreeTierPriceReference | null;
}
