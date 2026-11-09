/** Per-combo account tiers. Missing entries are normal; never an authorization grant. */
export type AccountPreference = "preferred" | "normal" | "reserve" | "excluded";
export type AccountPreferences = Record<string, AccountPreference>;

/** Reserve means fallback, never speculative parallel dispatch. Request-local copy only. */
export function accountPreferenceAttemptConfig<T extends { hedging?: boolean }>(
  config: T,
  enabled: boolean
): T {
  return enabled ? { ...config, hedging: false } : config;
}

export function readAccountPreferences(value: unknown): AccountPreferences {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  return Object.fromEntries(
    Object.entries(value).filter(
      ([id, tier]) => id.length > 0 && ["preferred", "reserve", "excluded"].includes(String(tier))
    )
  ) as AccountPreferences;
}

export function accountPreferenceRank(id: string | null | undefined, prefs: AccountPreferences) {
  const tier = id ? prefs[id] : undefined;
  return tier === "preferred" ? 0 : tier === "reserve" ? 2 : tier === "excluded" ? 3 : 1;
}

/** Stable within each tier: retain the strategy's score/exploration ordering.
 * With configured preferences, only concrete accounts may dispatch: an unbound
 * provider fallback could otherwise silently select an excluded account.
 */
export function orderAccountPreferences<
  T extends { connectionId?: string | null; allowedConnectionIds?: string[] | null },
>(targets: T[], prefs: AccountPreferences, preserveFirst = false): T[] {
  if (Object.keys(prefs).length === 0) return targets;
  const allowed = targets.filter(
    (target) => target.connectionId && accountPreferenceRank(target.connectionId, prefs) < 3
  );
  const pinned = preserveFirst && allowed[0] === targets[0] ? allowed[0] : undefined;
  return allowed
    .sort((a, b) => {
      if (a === pinned) return -1;
      if (b === pinned) return 1;
      return (
        accountPreferenceRank(a.connectionId, prefs) - accountPreferenceRank(b.connectionId, prefs)
      );
    })
    .map((target) => ({ ...target, allowedConnectionIds: [target.connectionId!] }));
}

/** Exploration and explicit routers may only select inside the first usable tier. */
export function firstAccountPreferenceTier<T extends { connectionId?: string | null }>(
  candidates: T[],
  prefs: AccountPreferences
): T[] {
  if (Object.keys(prefs).length === 0) return candidates;
  const ordered = orderAccountPreferences(candidates, prefs);
  const rank = accountPreferenceRank(ordered[0]?.connectionId, prefs);
  return ordered.filter(
    (candidate) => accountPreferenceRank(candidate.connectionId, prefs) === rank
  );
}
