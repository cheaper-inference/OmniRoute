/**
 * Which provider spellings write to the SAME in-memory lock keys (#20343).
 *
 * A quota-family lock is not always one key. Antigravity's family cooldown is installed
 * under BOTH `agy` and `antigravity` (`lockAntigravityFamilyModel` in
 * `antigravityFamilyCooldown.ts`) because a request can arrive through either spelling,
 * so for one quota there are two lock entries. Every reader that clears, refreshes or
 * throttles such a lock has to treat that pair as ONE entity:
 *
 *   - the daily sweep probes it once, not once per spelling (two probes a day for one
 *     question would also eat the per-sweep cap before every family was covered);
 *   - a refresh writes both, or the sibling spelling keeps the stale deadline;
 *   - a recovery clears both, or the family stays parked.
 *
 * The pair itself is owned by the module that writes the locks; this module only maps a
 * provider to its lock set so no caller re-types the list.
 */
import { ANTIGRAVITY_LOCK_PROVIDERS } from "@omniroute/open-sse/services/antigravityFamilyCooldown.ts";

/**
 * One lock set per provider spelling. The canonical spelling comes first in each list so
 * a caller can use `[0]` as the dedupe key without losing determinism.
 */
const LOCK_PROVIDER_ALIASES: Record<string, readonly string[]> = Object.fromEntries(
  ANTIGRAVITY_LOCK_PROVIDERS.map((provider) => [provider, ANTIGRAVITY_LOCK_PROVIDERS])
);

/**
 * Every lock-provider spelling `provider` writes to — itself when the provider has no
 * shared lock set. An unknown or empty provider yields an empty list; callers that must
 * always have one key should fall back to the provider they were given.
 */
export function lockProviderAliases(provider: string | null | undefined): readonly string[] {
  const key = String(provider ?? "")
    .trim()
    .toLowerCase();
  if (!key) return [];
  return LOCK_PROVIDER_ALIASES[key] ?? [key];
}
