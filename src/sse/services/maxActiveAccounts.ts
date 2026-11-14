// Opt-in PROVIDER_MAX_ACTIVE_ACCOUNTS ("claude=2,codex=1"): keep only the first N usable accounts
// of a provider, by priority, as active. The rest are reserves: they take requests only when
// fewer than N accounts are usable. Some vendors ban accounts when many log in from one address.
// The cap applies to the candidates that already passed cooldown, quota and model filters, so
// an unusable active account is replaced by the next reserve at once.

/** Returns the limit for `provider`, or 0 (no limit) when it is unset, invalid or not listed. */
export function parseMaxActiveAccounts(raw: string | undefined, provider: string): number {
  const wanted = provider.trim().toLowerCase();
  for (const pair of (raw || "").split(",")) {
    const [name, value] = pair.split("=");
    if (name?.trim().toLowerCase() !== wanted) continue;
    const n = Number.parseInt((value || "").trim(), 10);
    return Number.isFinite(n) && n > 0 ? n : 0;
  }
  return 0;
}

export function applyMaxActiveAccounts<T extends { id: string; priority?: number | null }>(
  candidates: T[],
  provider: string
): T[] {
  const limit = parseMaxActiveAccounts(process.env.PROVIDER_MAX_ACTIVE_ACCOUNTS, provider);
  if (!limit || candidates.length <= limit) return candidates;
  return [...candidates].sort((a, b) => (a.priority || 999) - (b.priority || 999)).slice(0, limit);
}
