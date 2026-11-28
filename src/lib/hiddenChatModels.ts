import { getModelVisibilityMap } from "./db/models";
import { getCachedProviderNodes } from "./db/readCache";
import { getSettings } from "./db/settings";
import { normalizeCombosOnlyProviderSet } from "@/shared/utils/providerCombosOnly";
import {
  isProviderNodePrefixReserved,
  selectCompatibleNodeForPrefix,
} from "./providerNodePrefixes";
import type { ModelVisibilitySnapshot } from "./hiddenModelLookup";

/** One DB visibility snapshot, shared by nested combos and their target filters. */
export async function getHiddenChatModels(): Promise<Map<string, Set<string>>> {
  const hidden = getModelVisibilityMap("chat").hidden;
  if (hidden.size === 0) return hidden;
  const nodes = (await getCachedProviderNodes()).flatMap((node) => {
    if (!node || typeof node.id !== "string" || typeof node.type !== "string") return [];
    return [
      {
        id: node.id,
        type: node.type,
        prefix: typeof node.prefix === "string" ? node.prefix : null,
      },
    ];
  });
  for (const node of nodes) {
    const prefix = typeof node?.prefix === "string" ? node.prefix : "";
    if (!prefix || isProviderNodePrefixReserved(prefix)) continue;
    const winner = selectCompatibleNodeForPrefix(nodes, prefix);
    if (!winner?.id) continue;
    const models = new Set([...(hidden.get(prefix) || []), ...(hidden.get(winner.id) || [])]);
    if (models.size === 0) continue;
    hidden.set(prefix, models);
    hidden.set(winner.id, models);
  }
  return hidden;
}

/**
 * The full three-state visibility snapshot: per-model overrides plus the provider-level
 * `combos_only` default. `getChatVisibilityLookup` (hiddenModelLookup.ts) turns it into the
 * two runtime predicates; `getHiddenChatModels` above stays the narrow "hidden only" view the
 * combo executors consume, so a `combos_only` model is never filtered out of a stored combo.
 */
export async function getChatVisibilitySnapshot(): Promise<ModelVisibilitySnapshot> {
  const map = getModelVisibilityMap("chat");
  let combosOnlyProviders = new Set<string>();
  try {
    const settings = await getSettings();
    combosOnlyProviders = normalizeCombosOnlyProviderSet(settings.combosOnlyProviders);
  } catch {
    // A settings read failure must not hide everything: fall back to no provider default.
  }
  return {
    hidden: map.hidden,
    combosOnly: map.combosOnly,
    explicitVisible: map.explicitVisible,
    combosOnlyProviders,
  };
}
