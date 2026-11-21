/**
 * Opt-in batching of `usage_history` inserts (OMNIROUTE_USAGE_BATCH_WRITE=1, default off).
 *
 * Each saved request normally costs one transaction. With the flag on, rows queue in memory and
 * commit together in ONE transaction: after 20 ms, or at once when 256 rows are waiting. Each row
 * still runs through the same dedup + insert as before (`attemptWrite`), inside a savepoint of the
 * shared transaction, so a failing row is logged and dropped alone and its batch survives.
 *
 * Tradeoff, and why it is opt-in: rows that are queued but not committed are lost on a hard kill
 * (SIGKILL, power loss). A normal stop (SIGTERM) flushes the queue first (see gracefulShutdown).
 * A busy database does not lose the batch: every row of it goes back to the per-row path, which
 * has the deferred retry.
 */

import { getDbInstance } from "../db/core";
import { attemptWrite, isWriteLockError, scheduleWriteRetry } from "./usageWriteRetry";
import type { UsageWriteOptions } from "./usageWriteRetry";
import type { UsageEntry } from "./usageHistory";

export const USAGE_BATCH_FLUSH_MS = 20;
export const USAGE_BATCH_MAX_ROWS = 256;

type Queued = { entry: UsageEntry; options: UsageWriteOptions };

const queue: Queued[] = [];
let timer: ReturnType<typeof setTimeout> | null = null;
const stats = { queued: 0, written: 0, failed: 0, batches: 0 };

export function isUsageBatchWriteEnabled(env = process.env): boolean {
  return ["1", "true", "yes"].includes(String(env.OMNIROUTE_USAGE_BATCH_WRITE).trim());
}

export function getUsageBatchStats() {
  return { ...stats, pending: queue.length };
}

/** Queue one row. A full queue flushes at once; otherwise a short timer does. */
export function enqueueUsageWrite(entry: UsageEntry, options: UsageWriteOptions): void {
  queue.push({ entry, options });
  stats.queued++;
  if (queue.length >= USAGE_BATCH_MAX_ROWS) {
    void flushUsageBatch();
    return;
  }
  if (!timer) {
    timer = setTimeout(() => void flushUsageBatch(), USAGE_BATCH_FLUSH_MS);
    // Never keep the process alive for a stray flush; a normal stop flushes explicitly.
    timer.unref?.();
  }
}

/** The unbatched behaviour for one row: retry a lock once later, log anything else. */
function rowFallback(item: Queued, error: unknown): void {
  if (isWriteLockError(error)) {
    scheduleWriteRetry(item.entry, item.options);
    return;
  }
  stats.failed++;
  console.error("Failed to save usage stats:", error);
}

/** Write every queued row in one transaction. Returns the number of rows written. */
export async function flushUsageBatch(): Promise<number> {
  if (timer) {
    clearTimeout(timer);
    timer = null;
  }
  const batch = queue.splice(0, queue.length);
  if (batch.length === 0) return 0;
  stats.batches++;
  let written = 0;
  const failed: Array<{ item: Queued; error: unknown }> = [];
  try {
    const db = getDbInstance();
    db.transaction(() => {
      for (const item of batch) {
        try {
          // A savepoint per row: a failing row rolls back only itself.
          db.transaction(() => attemptWrite(item.entry, item.options))();
          written++;
        } catch (error) {
          failed.push({ item, error });
        }
      }
    })();
  } catch (error) {
    // The shared transaction failed (lock, disk): nothing committed. Use the per-row path.
    for (const item of batch) rowFallback(item, error);
    return 0;
  }
  stats.written += written;
  for (const { item, error } of failed) rowFallback(item, error);
  return written;
}
