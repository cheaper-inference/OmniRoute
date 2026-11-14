/**
 * accountFallback/lockoutPersistence.ts — serialize/validate model-lockout map
 * state for restart persistence.
 *
 * `modelLockouts` / `modelFailureState` in accountFallback.ts are in-memory
 * Maps: every restart (deploy, crash, container recycle) wiped them, so the
 * first request after boot re-entered each still-cooling target once and
 * re-learned cooldowns from scratch. The DB I/O lives in
 * src/sse/services/modelLockoutPersistence.ts (boot restore + periodic
 * snapshot); this module holds only the pure, independently testable half —
 * mirroring the lockoutEviction.ts extraction style (#6923): no module state,
 * operates only on the data passed in by the caller.
 *
 * Keys are stored verbatim: they are opaque composite strings built by
 * buildExactKey()/getModelLockKey(), and re-inserting them raw avoids having
 * to reconstruct (and risk drifting from) the live key format.
 */
import type { ModelFailureState, ModelLockoutEntry } from "../accountFallback.ts";

export const MODEL_LOCKOUT_SNAPSHOT_VERSION = 1;

export type PersistedModelLockoutState = {
  version: number;
  savedAt: number;
  lockouts: Array<[string, ModelLockoutEntry]>;
  failures: Array<[string, ModelFailureState]>;
};

export type ModelLockoutStateSnapshot = {
  lockouts: Array<[string, ModelLockoutEntry]>;
  failures: Array<[string, ModelFailureState]>;
};

/**
 * Serialize live map entries into the persisted shape. A full dump: expired
 * entries may still be present (the 15s cleanup timer prunes them lazily) and
 * are dropped at restore time, not here.
 */
export function serializeModelLockoutState(
  snapshot: ModelLockoutStateSnapshot,
  now: number = Date.now()
): PersistedModelLockoutState {
  return {
    version: MODEL_LOCKOUT_SNAPSHOT_VERSION,
    savedAt: now,
    lockouts: snapshot.lockouts.map(
      ([key, entry]) => [key, { ...entry }] as [string, ModelLockoutEntry]
    ),
    failures: snapshot.failures.map(
      ([key, state]) => [key, { ...state }] as [string, ModelFailureState]
    ),
  };
}

function isFiniteNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

function coerceLockoutEntry(raw: unknown): ModelLockoutEntry | null {
  if (!raw || typeof raw !== "object") return null;
  const entry = raw as Partial<ModelLockoutEntry>;
  if (
    !isFiniteNumber(entry.until) ||
    !isFiniteNumber(entry.lockedAt) ||
    !isFiniteNumber(entry.failureCount) ||
    !isFiniteNumber(entry.lastFailureAt) ||
    !isFiniteNumber(entry.resetAfterMs)
  ) {
    return null;
  }
  return {
    until: entry.until,
    lockedAt: entry.lockedAt,
    failureCount: entry.failureCount,
    lastFailureAt: entry.lastFailureAt,
    resetAfterMs: entry.resetAfterMs,
  };
}

function coerceFailureState(raw: unknown): ModelFailureState | null {
  if (!raw || typeof raw !== "object") return null;
  const state = raw as Partial<ModelFailureState>;
  if (
    !isFiniteNumber(state.failureCount) ||
    !isFiniteNumber(state.lastFailureAt) ||
    !isFiniteNumber(state.resetAfterMs)
  ) {
    return null;
  }
  const coerced: ModelFailureState = {
    failureCount: state.failureCount,
    lastFailureAt: state.lastFailureAt,
    resetAfterMs: state.resetAfterMs,
  };
  if (isFiniteNumber(state.lastCooldownMs)) coerced.lastCooldownMs = state.lastCooldownMs;
  return coerced;
}

function coerceEntries<T>(
  raw: unknown,
  coerce: (entry: unknown) => T | null
): Array<[string, T]> | null {
  if (!Array.isArray(raw)) return null;
  const out: Array<[string, T]> = [];
  for (const item of raw) {
    if (!Array.isArray(item) || item.length < 2 || typeof item[0] !== "string") return null;
    const coerced = coerce(item[1]);
    if (coerced === null) continue; // drop malformed entries, keep valid siblings
    out.push([item[0], coerced]);
  }
  return out;
}

/**
 * Parse and shape-validate a persisted snapshot (e.g. read back from the
 * key_value table). Returns null for wrong payloads entirely (wrong version,
 * non-object, non-array sections) so a future or corrupt format is never
 * half-applied; individually malformed entries are dropped, valid siblings
 * survive.
 */
export function parsePersistedModelLockoutState(raw: unknown): PersistedModelLockoutState | null {
  if (!raw || typeof raw !== "object") return null;
  const candidate = raw as Partial<PersistedModelLockoutState> & { version?: unknown };
  if (candidate.version !== MODEL_LOCKOUT_SNAPSHOT_VERSION) return null;
  const lockouts = coerceEntries(candidate.lockouts, coerceLockoutEntry);
  const failures = coerceEntries(candidate.failures, coerceFailureState);
  if (lockouts === null || failures === null) return null;
  return {
    version: MODEL_LOCKOUT_SNAPSHOT_VERSION,
    savedAt: isFiniteNumber(candidate.savedAt) ? (candidate.savedAt as number) : 0,
    lockouts,
    failures,
  };
}
