/**
 * Write buffer for the legacy semantic cache's telemetry (cache_metrics and the per-entry
 * hit_count). A cache hit used to run one UPDATE per counter on the request path (two on a memory
 * hit, three on a disk hit). The deltas now collect in memory and reach SQLite in one transaction
 * on a short timer, on a stats read, on clearCache and at shutdown.
 *
 * Kept free of side effects on import so graceful shutdown can flush it without starting the
 * cache prune job. Only a crash that skips shutdown can lose the last interval of counts.
 */

import { getDbInstance } from "./db/core";
import { registerDbStateResetter } from "./db/stateReset";

export type CacheMetric = "hits" | "misses" | "tokens_saved";

const FLUSH_INTERVAL_MS = 1000;

let pendingMetrics = new Map<CacheMetric, number>();
let pendingHitCounts = new Map<string, number>();
let flushTimer: ReturnType<typeof setTimeout> | null = null;
let exitHookInstalled = false;

function schedule(): void {
  if (!exitHookInstalled) {
    exitHookInstalled = true;
    // Last resort for exits that skip graceful shutdown; SQLite writes are synchronous here.
    process.once("exit", () => flushSemanticCacheMetrics());
  }
  if (flushTimer) return;
  flushTimer = setTimeout(() => {
    flushTimer = null;
    flushSemanticCacheMetrics();
  }, FLUSH_INTERVAL_MS);
  flushTimer.unref?.();
}

export function bufferCacheMetric(metric: CacheMetric, amount = 1): void {
  if (!(amount > 0)) return;
  pendingMetrics.set(metric, (pendingMetrics.get(metric) ?? 0) + amount);
  schedule();
}

export function bufferCacheHitCount(signature: string): void {
  pendingHitCounts.set(signature, (pendingHitCounts.get(signature) ?? 0) + 1);
  schedule();
}

/** Drop buffered deltas without writing them (clearCache zeroes the counters anyway). */
export function discardSemanticCacheMetrics(): void {
  if (flushTimer) {
    clearTimeout(flushTimer);
    flushTimer = null;
  }
  pendingMetrics = new Map();
  pendingHitCounts = new Map();
}

/** Persist every buffered delta now, in one transaction. A failed write drops that batch. */
export function flushSemanticCacheMetrics(): void {
  const metrics = [...pendingMetrics];
  const hitCounts = [...pendingHitCounts];
  discardSemanticCacheMetrics();
  if (metrics.length === 0 && hitCounts.length === 0) return;
  try {
    const db = getDbInstance();
    const addMetric = db.prepare(
      `UPDATE cache_metrics SET value = value + ?, updated_at = datetime('now') WHERE key = ?`
    );
    const addHitCount = db.prepare(
      "UPDATE semantic_cache SET hit_count = hit_count + ? WHERE signature = ?"
    );
    db.transaction(() => {
      for (const [metric, amount] of metrics) addMetric.run(amount, metric);
      for (const [signature, hits] of hitCounts) addHitCount.run(hits, signature);
    })();
  } catch {
    // DB not available — telemetry only; the response path never depends on it.
  }
}

// A reset or restore swaps the database: deltas buffered for the old one must not land in the new.
registerDbStateResetter(discardSemanticCacheMetrics);
