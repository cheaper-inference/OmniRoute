/**
 * The `qtSd/` virtual model IDs an API key would see in /v1/models, using the
 * same approach as catalog.ts:
 *   resolveQuotaKeyScope(allowedQuotas) → scope.poolSlugs
 *   filterModelsToQuotaPools(candidates, scope.poolSlugs)
 *
 * Candidates are the combo names from getCombos() mapped to { id: combo.name }
 * (the shape catalog.ts passes to filterModelsToQuotaPools).
 *
 * Defaults are loaded with dynamic import() so tests can inject `deps`.
 */

export interface QuotaKeyModelsDeps {
  resolveQuotaKeyScope?: (allowedQuotas: string[]) => Promise<{ poolSlugs: string[] }>;
  getCombos?: () => Promise<Array<{ name?: unknown }>>;
}

async function defaultResolveQuotaKeyScope(
  allowedQuotas: string[]
): Promise<{ poolSlugs: string[] }> {
  const { resolveQuotaKeyScope } = await import("@/lib/quota/quotaKey");
  return resolveQuotaKeyScope(allowedQuotas);
}

async function defaultGetCombos(): Promise<Array<{ name?: unknown }>> {
  const { getCombos } = await import("@/lib/db/combos");
  return getCombos();
}

/** Same algorithm /v1/models uses for a quota key; a failed combo read yields []. */
export async function listQuotaKeyModels(
  allowedQuotas: string[] | null | undefined,
  deps: QuotaKeyModelsDeps = {}
): Promise<string[]> {
  const resolveScope = deps.resolveQuotaKeyScope ?? defaultResolveQuotaKeyScope;
  const readCombos = deps.getCombos ?? defaultGetCombos;

  const scope = await resolveScope(Array.isArray(allowedQuotas) ? allowedQuotas : []);

  let allCombos: Array<{ name?: unknown }> = [];
  try {
    allCombos = await readCombos();
  } catch {
    // DB unavailable — treat as an empty combo list; models will be [].
  }

  const candidates = allCombos
    .filter((c) => typeof c.name === "string" && c.name.length > 0)
    .map((c) => ({ id: c.name as string }));

  const { filterModelsToQuotaPools } = await import("@/lib/quota/quotaCombos");
  return filterModelsToQuotaPools(candidates, scope.poolSlugs).map((m) => m.id);
}
