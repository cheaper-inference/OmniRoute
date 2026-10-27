import { modelPatternMatches } from "@/lib/db/apiKeys/modelPermissions";
import { isComboNameAllowedForKey, type ApiKeyMetadata } from "@/shared/utils/apiKeyPolicy";

type CatalogKeyFilterDeps = {
  isModelAllowedForKey: (key: string, modelId: string) => Promise<boolean>;
  isModelBlockedByPatterns: (
    blockedModels: string[] | null | undefined,
    modelId: string
  ) => Promise<boolean>;
};

/**
 * Decide whether a provider-model catalog row is visible to a restricted API key.
 *
 * The row's `id` is the authoritative identifier. Its `root` is also consulted so a
 * bare allowlist entry (e.g. `gpt-4o`) keeps matching `openai/gpt-4o` (#781) — but
 * only when the root is bare. `root` is a raw upstream string with no owning-provider
 * namespace: an aggregator row such as `cline/deepseek/deepseek-v4-flash` carries
 * `root = deepseek/deepseek-v4-flash`, which the permission check would read as the
 * deepseek provider's model and list for a key that never allowed cline (#15409).
 * A row whose `id` is blocked is never brought back through its root.
 *
 * The root fallback also requires a bare allowlist entry that matches the root. The
 * permission check expands a bare `claude-*` name to `cc/<name>` when unprefixed
 * Claude models prefer Claude Code, so without this a `cc/*` key listed every other
 * provider's `claude-*` row (`dva/claude-opus-5-high`), and each of them was refused
 * at dispatch, which checks only the requested id.
 */
export async function isCatalogModelAllowedForKey(
  apiKey: string,
  model: { id?: unknown; root?: unknown },
  keyMeta: Pick<ApiKeyMetadata, "allowedModels" | "blockedModels">,
  deps?: CatalogKeyFilterDeps
): Promise<boolean> {
  deps ??= await import("@/lib/db/apiKeys");
  const id = typeof model.id === "string" ? model.id : "";
  if (await deps.isModelAllowedForKey(apiKey, id)) return true;

  const root = typeof model.root === "string" ? model.root : "";
  if (!root || root === id || root.includes("/")) return false;
  if (!hasBareAllowlistMatch(keyMeta.allowedModels, root)) return false;
  if (await deps.isModelBlockedByPatterns(keyMeta.blockedModels, id)) return false;
  return deps.isModelAllowedForKey(apiKey, root);
}

function hasBareAllowlistMatch(allowedModels: string[] | null | undefined, root: string): boolean {
  return (
    allowedModels?.some(
      (pattern) => !pattern.includes("/") && modelPatternMatches(pattern, [root])
    ) ?? false
  );
}

/** Filter the ordered catalog using one permission module and the builder's yield cadence. */
export async function filterCatalogModelsForKey<
  T extends { id?: unknown; root?: unknown; owned_by?: unknown },
>(
  apiKey: string,
  models: T[],
  keyMeta: Pick<
    ApiKeyMetadata,
    "catalogScope" | "allowedCombos" | "allowedModels" | "blockedModels" | "forcedModel"
  >,
  deps: CatalogKeyFilterDeps,
  maybeYieldCatalogBuild: () => Promise<void>
): Promise<T[]> {
  // Per-key catalog scope: `combos` advertises only combo rows, `models`
  // only provider models, `all` (the default) both. This is a listing
  // preference, not an access control — dispatch is unaffected either way.
  const catalogScope = keyMeta.catalogScope ?? "all";
  // A key pinned to one routing target (forcedModel) is routed there whatever it
  // asks for, so the catalog advertises only that id. Still subject to the
  // checks below: the pin never lists a model the key may not call.
  const forcedModel = keyMeta.forcedModel || null;
  const filtered: T[] = [];
  for (const m of models) {
    // Awaiting cached permission Promises alone does not let timers or
    // unrelated requests run. Share the catalog's cooperative cadence.
    await maybeYieldCatalogBuild();
    if (forcedModel && m.id !== forcedModel) continue;
    const isComboRow = m.owned_by === "combo";
    if (catalogScope === "combos" && !isComboRow) continue;
    if (catalogScope === "models" && isComboRow) continue;
    // A combo is gated by `allowedCombos`, not by the model allow/deny lists:
    // those govern provider models. Without this branch a `restricted` key with
    // an empty `allowedModels` gets an EMPTY catalog even though every combo in
    // its `allowedCombos` dispatches fine — the catalog contradicted the key.
    // Listing a combo the key can already dispatch grants no new access.
    // auto/* rows are exempt: they fail open at dispatch (they resolve to no
    // stored combo), and `allowAutoCombos` already gated their synthesis above.
    if (m.owned_by === "combo" && !String(m.id).startsWith("auto/")) {
      if (isComboNameAllowedForKey(keyMeta.allowedCombos, String(m.id))) {
        filtered.push(m);
      }
      continue;
    }
    // m.id decides; a bare m.root also matches a bare allowlist entry (#781, #15409).
    if (await isCatalogModelAllowedForKey(apiKey, m, keyMeta, deps)) {
      filtered.push(m);
    }
  }
  return filtered;
}
