/**
 * Quota snapshot retention for the quota-cache background tick (#17094).
 *
 * The tick runs from `setInterval`, which drops the returned promise, so any
 * error thrown here would surface as an unhandled rejection and stop the
 * server. A locked database (SQLITE_BUSY) is retried a bounded number of
 * times with a short backoff; any final failure is logged and reported to the
 * caller, which skips the rest of the tick. `cleanupOldSnapshots` only moves
 * its throttle forward on success, so the next tick tries again.
 */

import { cleanupOldSnapshots } from "@/lib/db/quotaSnapshots";
import { isWriteLockError } from "@/lib/usage/usageWriteRetry";

/** Waits before the second and third attempt. Each attempt also waits up to busy_timeout. */
export const SNAPSHOT_CLEANUP_BACKOFF_MS = [250, 1000] as const;

type CleanupDeps = {
  cleanup?: () => number;
  sleep?: (ms: number) => Promise<void>;
};

const defaultSleep = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms).unref?.());

/** Returns false when the cleanup still failed after the last attempt. Never throws. */
export async function runQuotaSnapshotCleanup(deps: CleanupDeps = {}): Promise<boolean> {
  const cleanup = deps.cleanup ?? cleanupOldSnapshots;
  const sleep = deps.sleep ?? defaultSleep;
  for (let attempt = 0; ; attempt++) {
    try {
      cleanup();
      return true;
    } catch (error) {
      const delay = SNAPSHOT_CLEANUP_BACKOFF_MS[attempt];
      if (isWriteLockError(error) && delay !== undefined) {
        await sleep(delay);
        continue;
      }
      console.warn(
        "[QuotaCache] Snapshot cleanup failed, skipping this tick:",
        error instanceof Error ? error.message : error
      );
      return false;
    }
  }
}
