/**
 * Provider-level "combos only" default.
 *
 * An operator can mark a whole provider (`settings.combosOnlyProviders`) instead of every one
 * of its models. Any model of that provider with no explicit visibility override inherits
 * `combos_only`; an explicit `visible` override on the model is the positive exception.
 *
 * Entries accept the same forms `blockedProviders` does — canonical provider id, provider
 * alias, or a compatible-provider node id/prefix — so a stored value keeps matching after a
 * node is renamed or a catalog alias is added.
 *
 * Pure: no DB, no provider registry import. Callers pass the identifiers a model can be
 * resolved under (see `keysForProvider` in the `/v1/models` catalog, which builds that list
 * from the alias maps and the node-prefix map).
 */

import { normalizeVisibilityMode } from "./modelVisibility";

/** Normalize `settings.combosOnlyProviders` into a lookup set (mirrors normalizeBlockedProviderSet). */
export function normalizeCombosOnlyProviderSet(value: unknown): Set<string> {
  const entries = value instanceof Set ? Array.from(value) : value;
  return new Set(
    Array.isArray(entries)
      ? entries.filter(
          (provider): provider is string => typeof provider === "string" && provider.trim() !== ""
        )
      : []
  );
}

/**
 * True when any of the identifiers a model resolves under names a combos-only provider.
 * `keys` must include the raw provider key, its canonical id, its alias, and any compatible
 * node id/prefix it can be addressed by.
 */
export function isProviderCombosOnly(
  combosOnlyProviders: unknown,
  keys: ReadonlyArray<string | null | undefined>
): boolean {
  const set =
    combosOnlyProviders instanceof Set
      ? (combosOnlyProviders as Set<string>)
      : normalizeCombosOnlyProviderSet(combosOnlyProviders);
  if (set.size === 0) return false;
  return keys.some((key) => typeof key === "string" && key.length > 0 && set.has(key));
}

/**
 * Resolve the effective visibility of one model given its explicit override and the
 * provider-level default. Kept here (rather than in the React layer) so the catalog, the
 * dispatch gate, and the dashboard all agree.
 */
export function resolveVisibilityWithProviderDefault(
  explicitMode: string | null | undefined,
  providerCombosOnly: boolean
): "visible" | "combos_only" | "hidden" {
  const explicit = normalizeVisibilityMode(explicitMode);
  if (explicit) return explicit;
  return providerCombosOnly ? "combos_only" : "visible";
}
