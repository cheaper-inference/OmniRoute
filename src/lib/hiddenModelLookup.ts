import { resolveCanonicalProviderModel } from "@omniroute/open-sse/services/modelCanonicalization.ts";
import { PROVIDER_ID_TO_ALIAS } from "@omniroute/open-sse/config/providerModels.ts";
import {
  isProviderNodePrefixReserved,
  selectCompatibleNodeForPrefix,
  type CompatibleNodeLike,
} from "./providerNodePrefixes";
import {
  isProviderCombosOnly,
  normalizeCombosOnlyProviderSet,
} from "@/shared/utils/providerCombosOnly";

type HiddenModels = ReadonlyMap<string, ReadonlySet<string>>;

/** Normalize both persisted keys and requests, retaining independent provider/node ownership. */
export function createHiddenModelLookup(
  hiddenModels: HiddenModels,
  nodes: CompatibleNodeLike[] = [],
  modality = "chat"
): (provider: string | null | undefined, model: string) => boolean {
  if (hiddenModels.size === 0) return () => false;
  const nodeByPrefix = new Map<string, string>();
  for (const node of nodes) {
    if (!node.prefix || isProviderNodePrefixReserved(node.prefix)) continue;
    const winner = selectCompatibleNodeForPrefix(nodes, node.prefix);
    if (winner?.id) nodeByPrefix.set(node.prefix, winner.id);
  }
  const resolve = (provider: string | null | undefined, model: string) => {
    const identity = nodeByPrefix.get(provider || "") || provider;
    const resolved = resolveCanonicalProviderModel(identity, model);
    // Stored/resolved IDs are authoritative: e.g. opencode (oc) and opencode-zen
    // are distinct, even though the public opencode/ prefix redirects to the latter.
    const canonical = identity && identity in PROVIDER_ID_TO_ALIAS ? identity : resolved.provider;
    return { provider: canonical, model: modality === "chat" ? resolved.model : model };
  };
  const normalized = new Map<string, Set<string>>();
  for (const [provider, models] of hiddenModels) {
    for (const model of models) {
      const target = resolve(provider, model);
      if (!target.provider || !target.model) continue;
      const entries = normalized.get(target.provider) || new Set<string>();
      entries.add(target.model);
      normalized.set(target.provider, entries);
    }
  }
  return (provider, model) => {
    const target = resolve(provider, model);
    return Boolean(
      target.provider && target.model && normalized.get(target.provider)?.has(target.model)
    );
  };
}

export type ModelVisibilitySnapshot = {
  hidden: HiddenModels;
  combosOnly: HiddenModels;
  /** Explicit `visible` overrides — the positive exception over a combos-only provider. */
  explicitVisible: HiddenModels;
  combosOnlyProviders: ReadonlySet<string>;
};

/**
 * Build the two predicates the runtime needs from one visibility snapshot:
 *
 *  - `isHiddenInCombo` — a stored combo (or any nested target) may not dispatch it.
 *  - `isBlockedFromDirectUse` — the public catalog, `/v1/models/{id}` and a direct call must
 *    treat it as nonexistent (`combos_only` included).
 *
 * Precedence per model: explicit `hidden` → explicit `combos_only` → explicit `visible`
 * (positive exception) → provider-level `combos_only` → visible.
 */
export function createModelVisibilityLookup(
  snapshot: ModelVisibilitySnapshot,
  nodes: CompatibleNodeLike[] = [],
  modality = "chat"
): {
  isHiddenInCombo: (provider: string | null | undefined, model: string) => boolean;
  isBlockedFromDirectUse: (provider: string | null | undefined, model: string) => boolean;
  isCombosOnlyProvider: (provider: string | null | undefined) => boolean;
} {
  const hasHidden = snapshot.hidden.size > 0;
  const isHidden = hasHidden
    ? createHiddenModelLookup(snapshot.hidden, nodes, modality)
    : () => false;
  const isCombosOnly =
    snapshot.combosOnly.size > 0
      ? createHiddenModelLookup(snapshot.combosOnly, nodes, modality)
      : () => false;
  const isExplicitVisible =
    snapshot.explicitVisible.size > 0
      ? createHiddenModelLookup(snapshot.explicitVisible, nodes, modality)
      : () => false;
  const combosOnlyProviders = normalizeCombosOnlyProviderSet(snapshot.combosOnlyProviders);

  const providerKeys = (provider: string | null | undefined): string[] => {
    if (!provider) return [];
    const keys = new Set<string>([provider]);
    for (const node of nodes) {
      if (node.prefix === provider && node.id) keys.add(node.id);
      if (node.id === provider && node.prefix) keys.add(node.prefix);
    }
    const alias = PROVIDER_ID_TO_ALIAS[provider];
    if (typeof alias === "string" && alias) keys.add(alias);
    for (const [id, value] of Object.entries(PROVIDER_ID_TO_ALIAS)) {
      if (value === provider) keys.add(id);
    }
    return [...keys];
  };

  const isCombosOnlyProvider = (provider: string | null | undefined): boolean => {
    if (combosOnlyProviders.size === 0 || !provider) return false;
    return isProviderCombosOnly(combosOnlyProviders, providerKeys(provider));
  };

  return {
    isHiddenInCombo: (provider, model) => isHidden(provider, model),
    isBlockedFromDirectUse: (provider, model) => {
      if (isHidden(provider, model)) return true;
      if (isCombosOnly(provider, model)) return true;
      if (isExplicitVisible(provider, model)) return false;
      return isCombosOnlyProvider(provider);
    },
    isCombosOnlyProvider,
  };
}
