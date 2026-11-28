/**
 * `combos_only` mirror for the `auto/*` candidate pool.
 *
 * An operator marks a model (or a whole provider) "combos only": it must stay reachable from
 * combos the operator compiled by hand, while `/v1/models` stops advertising it and a direct
 * call 404s. `auto/*` is a *virtual* combo the operator never compiled, so it must not be a
 * back door into those models — the same trap #6512 fixed once for `hidePaidModels` and #11481
 * for the exposure allow/deny list (a catalog-only filter always leaks into combo routing).
 *
 * Kept pure so it is unit-testable without the DB-backed virtual factory; the caller passes the
 * visibility snapshot and the provider-level default set.
 */

export type CombosOnlyCandidate = {
  provider: string;
  model: string;
  modelStr?: string;
};

export type CombosOnlyFilterInput = {
  /** Explicit `combos_only` overrides, per provider → model ids. */
  combosOnly: ReadonlyMap<string, ReadonlySet<string>>;
  /** Explicit `visible` overrides — the positive exception over a combos-only provider. */
  explicitVisible?: ReadonlyMap<string, ReadonlySet<string>>;
  /** Providers marked combos-only by default (`settings.combosOnlyProviders`). */
  combosOnlyProviders?: ReadonlySet<string>;
  /** Extra identifiers the provider may be addressed by (alias, node id/prefix). */
  providerAliases?: ReadonlyMap<string, readonly string[]>;
};

/**
 * Every identifier a candidate can be marked under: its own key plus the full alias group it
 * belongs to. `providerAliases` is keyed by the canonical provider, but a candidate arrives
 * addressed by whichever key the pool happens to carry (alias, node id, node prefix) — so the
 * group has to be resolvable in both directions, otherwise a mark stored under `node-1` would
 * only match a candidate already addressed as `node-1`.
 */
function providerKeys(
  provider: string,
  aliases?: ReadonlyMap<string, readonly string[]>
): string[] {
  const keys = new Set<string>([provider]);
  const direct = aliases?.get(provider);
  if (direct) for (const key of direct) keys.add(key);
  if (aliases) {
    for (const [canonical, group] of aliases) {
      if (!group.includes(provider)) continue;
      keys.add(canonical);
      for (const key of group) keys.add(key);
    }
  }
  return [...keys];
}

/**
 * Return the pool without any candidate whose effective visibility is `combos_only`.
 * An explicit `visible` override keeps the candidate even when its provider is combos-only.
 * Returns the SAME array reference when nothing is filtered (identity, the default path).
 */
export function filterCombosOnlyCandidates<T extends CombosOnlyCandidate>(
  pool: T[],
  input: CombosOnlyFilterInput
): T[] {
  const hasOverrides = input.combosOnly.size > 0 || (input.explicitVisible?.size ?? 0) > 0;
  const hasProviderDefault = (input.combosOnlyProviders?.size ?? 0) > 0;
  if (!hasOverrides && !hasProviderDefault) return pool;

  const filtered = pool.filter((candidate) => {
    const keys = providerKeys(candidate.provider, input.providerAliases);
    const isExplicitVisible = keys.some((key) =>
      input.explicitVisible?.get(key)?.has(candidate.model)
    );
    if (isExplicitVisible) return true;
    const isExplicitCombosOnly = keys.some((key) =>
      input.combosOnly.get(key)?.has(candidate.model)
    );
    if (isExplicitCombosOnly) return false;
    return !keys.some((key) => input.combosOnlyProviders?.has(key));
  });
  return filtered.length === pool.length ? pool : filtered;
}
