import { isBuiltInAutoRoute } from "@omniroute/open-sse/services/autoCombo/builtinCatalog";
import { getCachedComboByName } from "@/lib/db/readCache";
import { isReservedComboName } from "./autoNames";

export async function getStoredAutoComboByName(name: string) {
  const exact = await getCachedComboByName(name);
  if (Array.isArray(exact?.models) && exact.models.length > 0) return exact;
  const { getComboByNameInsensitive } = await import("@/lib/db/combos");
  const insensitive = await getComboByNameInsensitive(name);
  return Array.isArray(insensitive?.models) && insensitive.models.length > 0 ? insensitive : null;
}

/** Resolve a reserved request that can still be served by a saved route. */
export async function resolveStoredAutoCombo(model: string) {
  if (!isReservedComboName(model) || isBuiltInAutoRoute(model)) return null;
  const exact = await getStoredAutoComboByName(model);
  if (exact) return exact;

  // The second legacy candidate, auto/<suffix>, is the exact name already tried.
  const suffix = model.slice("auto/".length);
  return getStoredAutoComboByName(`auto/best-${suffix}`);
}
