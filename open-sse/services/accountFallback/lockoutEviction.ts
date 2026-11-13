/**
 * accountFallback/lockoutEviction.ts — model-lockout map eviction (cap enforcement).
 *
 * Extracted from services/accountFallback.ts (file-size gate, #6923): the bounded-growth
 * eviction sweep for the in-memory `modelLockouts` / `modelFailureState` maps. Pure w.r.t.
 * module state — operates only on the maps passed in by the caller — so it is independently
 * testable and reusable outside accountFallback.ts, which wraps evictLockoutOverflow() with
 * its own private map instances and re-exports MODEL_LOCKOUT_EVICTION_CAP.
 */

import type { ModelLockoutEntry, ModelFailureState } from "../accountFallback.ts";

// Cap prevents unbounded growth under sustained load. Entries beyond this limit
// are evicted (oldest first, in insertion order) during the periodic cleanup.
export const MODEL_LOCKOUT_EVICTION_CAP = 1000;

/**
 * Evict oldest (insertion-order) entries once a map exceeds the cap — but NEVER a
 * still-active (until > now) lockout: cleanupModelLockKey() has already run on every
 * key this tick, so anything active left here is a real, in-progress cooldown, and
 * dropping it would wrongly let routing resume to it. If a map is still over cap
 * purely from active entries, the cap is a soft bound in that rare case rather than
 * a correctness trade-off.
 */
export function evictLockoutOverflow(
  modelLockouts: Map<string, ModelLockoutEntry>,
  modelFailureState: Map<string, ModelFailureState>,
  cap: number = MODEL_LOCKOUT_EVICTION_CAP,
  hardCap: number = resolveActiveLockoutHardCap()
): void {
  if (modelLockouts.size > cap) {
    const overflow = modelLockouts.size - cap;
    const now = Date.now();
    // Only expired entries are eviction candidates (oldest-first, up to the
    // overflow count) — active ones never appear in this list at all.
    const evictableKeys = [...modelLockouts.entries()]
      .filter(([, entry]) => entry.until <= now)
      .slice(0, overflow)
      .map(([key]) => key);
    for (const key of evictableKeys) {
      modelLockouts.delete(key);
      modelFailureState.delete(key);
    }
  }
  evictActiveOverHardCap(modelLockouts, Math.max(hardCap, cap), hardCap > 0);
  if (modelFailureState.size > cap) {
    const overflow = modelFailureState.size - cap;
    let evicted = 0;
    for (const key of modelFailureState.keys()) {
      if (evicted >= overflow) break;
      if (!modelLockouts.has(key)) {
        modelFailureState.delete(key);
        evicted++;
      }
    }
  }
}

/**
 * Opt-in hard cap on ACTIVE lockouts (OMNIROUTE_MODEL_LOCKOUT_HARD_CAP, a positive integer;
 * unset, 0 or anything else = off). Off is the default and keeps the #6923 rule above: an
 * active lockout is never evicted, so the map is a soft bound. With a hard cap, a map that is
 * still over it after the expired entries went loses the active lockouts that are closest to
 * expiring: those would have cooled off first anyway, so dropping them lets routing try a
 * model that is about to be free, never one with a long cooldown ahead. The escalation state
 * (`modelFailureState`) is kept, so a model that fails again keeps escalating.
 */
export function resolveActiveLockoutHardCap(
  env: Record<string, string | undefined> = process.env
): number {
  const raw = (env.OMNIROUTE_MODEL_LOCKOUT_HARD_CAP ?? "").trim();
  return /^[1-9]\d*$/.test(raw) ? Number(raw) : 0;
}

function evictActiveOverHardCap(
  modelLockouts: Map<string, ModelLockoutEntry>,
  limit: number,
  enabled: boolean
): void {
  if (!enabled || modelLockouts.size <= limit) return;
  const soonest = [...modelLockouts.entries()]
    .sort((a, b) => a[1].until - b[1].until)
    .slice(0, modelLockouts.size - limit);
  for (const [key] of soonest) modelLockouts.delete(key);
}
