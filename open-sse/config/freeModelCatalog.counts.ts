// Canonical counts of the free catalog, by access type. Every public "N providers / N models /
// N pools" figure comes from computeFreeCatalogCounts(); nothing counts the catalog by hand.
// Pure: it never imports src/ — callers pass how each provider id is reached (membershipOf),
// read from the provider constants (scripts/release/lib/code-facts-probe.mjs does that).
import {
  FREE_MODEL_BUDGETS,
  freeTypesInBucket,
  grantsFreeAccess,
  isCountingGated,
  isSocialGated,
  type FreeModelBudget,
} from "./freeModelCatalog.ts";

/** How a free row is reached: an API key, no key at all, a tool account login, a web chat. */
export type FreeAccessType = "api-key" | "keyless" | "tool-account" | "web-chat";

export const FREE_ACCESS_TYPES: readonly FreeAccessType[] = [
  "api-key",
  "keyless",
  "tool-account",
  "web-chat",
];

/** The access collections the provider constants put a provider id in. */
export interface ProviderAccessMembership {
  noAuth: boolean;
  oauth: boolean;
  webCookie: boolean;
}

export function resolveFreeAccessType(
  row: Pick<FreeModelBudget, "freeType">,
  m: ProviderAccessMembership
): FreeAccessType {
  if (row.freeType === "keyless" || m.noAuth) return "keyless";
  if (m.webCookie) return "web-chat";
  if (m.oauth) return "tool-account";
  return "api-key";
}

export interface FreeCatalogCounts {
  providersWithFreeOffer: { total: number; byAccess: Record<FreeAccessType, number> };
  /** Distinct model ids among the rows that grant access, without ToS-avoid rows. */
  freeModels: number;
  /** Rows that grant access (grantsFreeAccess), without ToS-avoid rows. */
  accessRows: number;
  /**
   * Recurring pools with a published quota, without gates or ToS-avoid rows: a poolKey counts
   * once, a row without a poolKey is its own cap.
   */
  publishedQuotaPools: number;
}

const STEADY_MONTHLY = freeTypesInBucket("steady-monthly");

export function computeFreeCatalogCounts(opts: {
  entries?: Array<FreeModelBudget & { enabled?: boolean }>;
  membershipOf: (providerId: string) => ProviderAccessMembership;
  /** Access types to count; default all four. */
  includeAccess?: FreeAccessType[];
}): FreeCatalogCounts {
  const entries: ReadonlyArray<FreeModelBudget & { enabled?: boolean }> =
    opts.entries ?? FREE_MODEL_BUDGETS;
  const include = new Set<FreeAccessType>(opts.includeAccess ?? FREE_ACCESS_TYPES);

  const rows = entries
    .filter((m) => m.enabled !== false && grantsFreeAccess(m.freeType) && m.tos !== "avoid")
    .map((m) => ({ m, access: resolveFreeAccessType(m, opts.membershipOf(m.provider)) }))
    .filter((r) => include.has(r.access));

  const byAccessSets = Object.fromEntries(
    FREE_ACCESS_TYPES.map((t) => [t, new Set<string>()])
  ) as Record<FreeAccessType, Set<string>>;
  for (const { m, access } of rows) byAccessSets[access].add(m.provider);

  const pools = new Set<string>();
  let poolLessCaps = 0;
  for (const { m } of rows) {
    if (!STEADY_MONTHLY.has(m.freeType) || !(m.monthlyTokens > 0)) continue;
    if (isCountingGated(m) || isSocialGated(m)) continue;
    if (m.poolKey) pools.add(m.poolKey);
    else poolLessCaps += 1;
  }

  return {
    providersWithFreeOffer: {
      total: new Set(rows.map((r) => r.m.provider)).size,
      byAccess: Object.fromEntries(
        FREE_ACCESS_TYPES.map((t) => [t, byAccessSets[t].size])
      ) as Record<FreeAccessType, number>,
    },
    freeModels: new Set(rows.map((r) => r.m.modelId)).size,
    accessRows: rows.length,
    publishedQuotaPools: pools.size + poolLessCaps,
  };
}
