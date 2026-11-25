import type { FreeModelBudget } from "./freeModelCatalog.ts";

// Last quota of free rows retired from FREE_MODEL_BUDGETS since RETIRED_LEDGER_SINCE.
// Read only by computeRowSumMirror (the row-sum reading, ended offers included). Never routes,
// never counts in the real figure. Rows older than 12 months drop out of the sum by themselves.
// A provider listed in docs/reference/REMOVED_PROVIDERS.md never appears here.
// The catalog row of a retired offer stays in FREE_MODEL_BUDGETS as `discontinued` with
// `monthlyTokens: 0` and `creditTokens: 0` for at least one release cycle; its last quota lives
// only here. Invariants: tests/unit/free-catalog-retired-ledger.test.ts.

export interface RetiredFreeRow {
  provider: string;
  modelId: string;
  poolKey: string | null;
  /** The last monthly quota the catalog listed for this row, in its published unit. */
  lastListedMonthlyTokens: number;
  /** ISO date (YYYY-MM-DD) the row left the live catalog. */
  retiredAt: string;
  reason: "ended" | "no-models" | "paid-only" | "id-retired" | "unverifiable";
  /** Where the end of the offer was seen (URL or evidence class), reopened on the retirement day. */
  evidence: string;
}

export const RETIRED_LEDGER_SINCE = "2026-11-18";

export const RETIRED_FREE_ROWS: RetiredFreeRow[] = [];

// Retired keyless offers had no published quota for the numeric ledger.
export const RETIRED_KEYLESS_OFFERS: FreeModelBudget[] = [
  // 2026-11-25 (#19385), upstream HTTP 401: "The public beta is closed for now.
  // This endpoint needs an API key, and key registration is closed".
  {
    provider: "uncloseai",
    modelId: "turboderp/Qwen3.8-27B-exl3",
    displayName: "Qwen3.8 27B exl3 (UncloseAI)",
    monthlyTokens: 0,
    creditTokens: 0,
    freeType: "discontinued",
    poolKey: null,
    tos: "caution",
  },
];
