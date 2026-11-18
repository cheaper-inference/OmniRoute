/**
 * Restart survival for in-memory model lockouts.
 *
 * `modelLockouts` / `modelFailureState` (open-sse/services/accountFallback.ts)
 * are module-level Maps — every restart (deploy, crash, container recycle)
 * wiped them, so the first request after boot re-entered each still-cooling
 * target once (a guaranteed wasted upstream call per locked target) and
 * re-learned cooldowns from scratch, with escalation reset to failureCount 1.
 * Connection-level cooldowns already survive restarts via the DB-persisted
 * `rate_limited_until` column (see clearStaleCrashCooldowns, #3625); this
 * gives the model-level lockouts the same survival.
 *
 * Mechanism: a JSON snapshot of both maps is kept in the `key_value` table
 * (single row, namespace "resilience"), refreshed by an unref'd interval and
 * re-applied at boot — expired entries are dropped at restore time. A crash
 * can lose at most one interval's worth of state; everything older restores.
 *
 * Kill-switch: OMNIROUTE_PERSIST_MODEL_LOCKOUTS=0 disables both the periodic
 * snapshot and the boot restore (back to the pre-persistence behavior).
 */
import { getDbInstance } from "@/lib/db/core";
import {
  exportModelLockoutStateForPersistence,
  restoreModelLockoutStateForPersistence,
} from "@omniroute/open-sse/services/accountFallback.ts";
import {
  parsePersistedModelLockoutState,
  serializeModelLockoutState,
} from "@omniroute/open-sse/services/accountFallback/lockoutPersistence.ts";

const KEY_VALUE_NAMESPACE = "resilience";
const KEY_VALUE_KEY = "modelLockoutState";
const SNAPSHOT_INTERVAL_MS = 60_000;

function persistenceEnabled(): boolean {
  return process.env.OMNIROUTE_PERSIST_MODEL_LOCKOUTS !== "0";
}

/**
 * Write the current lockout state to key_value (full replace, one row).
 * Best-effort: a failed snapshot only costs freshness, never a request.
 * @returns true when a snapshot was written
 */
export function saveModelLockoutSnapshotToDb(): boolean {
  if (!persistenceEnabled()) return false;
  try {
    const state = serializeModelLockoutState(exportModelLockoutStateForPersistence());
    getDbInstance()
      .prepare("INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES (?, ?, ?)")
      .run(KEY_VALUE_NAMESPACE, KEY_VALUE_KEY, JSON.stringify(state));
    return true;
  } catch {
    return false;
  }
}

/**
 * Restore lockout state persisted before this boot. Malformed or future
 * snapshots parse to null and are ignored (never half-applied).
 * @returns number of still-active lockouts re-armed
 */
export function restoreModelLockoutsFromDb(now: number = Date.now()): number {
  if (!persistenceEnabled()) return 0;
  try {
    const row = getDbInstance()
      .prepare("SELECT value FROM key_value WHERE namespace = ? AND key = ?")
      .get(KEY_VALUE_NAMESPACE, KEY_VALUE_KEY) as { value: string } | undefined;
    if (!row?.value) return 0;
    let parsed: ReturnType<typeof parsePersistedModelLockoutState> = null;
    try {
      parsed = parsePersistedModelLockoutState(JSON.parse(row.value));
    } catch {
      return 0; // corrupt JSON — ignore, keep boot going
    }
    if (!parsed) return 0;
    return restoreModelLockoutStateForPersistence(parsed.lockouts, parsed.failures, now);
  } catch {
    return 0;
  }
}

let _snapshotTimer: ReturnType<typeof setInterval> | null = null;

/**
 * Start the periodic snapshot refresh (unref'd: never keeps the process
 * alive). Idempotent: a second call is a no-op.
 * @returns true when the interval was started by this call
 */
export function startModelLockoutSnapshotInterval(): boolean {
  if (!persistenceEnabled() || _snapshotTimer) return false;
  try {
    _snapshotTimer = setInterval(() => {
      saveModelLockoutSnapshotToDb();
    }, SNAPSHOT_INTERVAL_MS);
    if (typeof _snapshotTimer === "object" && "unref" in _snapshotTimer) {
      (_snapshotTimer as { unref?: () => void }).unref?.(); // Don't prevent process exit (Node.js only)
    }
  } catch {
    // Runtimes without setInterval (e.g. Workers) simply get no periodic refresh.
    return false;
  }
  return true;
}
