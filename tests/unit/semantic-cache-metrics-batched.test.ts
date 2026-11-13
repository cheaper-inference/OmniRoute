/**
 * A legacy semantic-cache hit used to run one SQLite UPDATE per counter on the request path:
 * hits and tokens_saved on a memory hit, plus hit_count on a disk hit; a miss ran one for misses.
 * The deltas now collect in memory and reach SQLite in one transaction on a short timer, on a
 * stats read, on clearCache and at shutdown. The stats totals stay exact; only a crash can lose
 * the last interval.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-semantic-metrics-batch-"));
process.env.DATA_DIR = dataDir;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
process.env.OMNIROUTE_SEMANTIC_CACHE_PRUNE_INTERVAL_MS = "0";

const core = await import("../../src/lib/db/core.ts");
const cache = await import("../../src/lib/semanticCache.ts");
const { flushSemanticCacheMetrics } = await import("../../src/lib/semanticCacheMetrics.ts");

const response = { choices: [{ message: { content: "cached answer" } }] };

type Write = { sql: string; inTransaction: boolean };
type SpyDb = {
  prepare: (sql: string) => { run: (...args: unknown[]) => unknown };
  inTransaction?: boolean;
};

/** Runs fn and returns every metric or hit_count UPDATE it executed. */
function recordWrites(fn: () => void): Write[] {
  const db = core.getDbInstance() as unknown as SpyDb;
  const prepare = db.prepare.bind(db);
  const writes: Write[] = [];
  db.prepare = (sql: string) => {
    const statement = prepare(sql);
    if (!/^\s*UPDATE (cache_metrics|semantic_cache SET hit_count)/i.test(sql)) return statement;
    const run = statement.run.bind(statement);
    statement.run = (...args: unknown[]) => {
      writes.push({ sql, inTransaction: db.inTransaction === true });
      return run(...args);
    };
    return statement;
  };
  try {
    fn();
  } finally {
    db.prepare = prepare;
  }
  return writes;
}

function storedMetric(key: string): number {
  const row = core
    .getDbInstance()
    .prepare("SELECT value FROM cache_metrics WHERE key = ?")
    .get(key) as { value: number } | undefined;
  return row?.value ?? 0;
}

function storedHitCount(signature: string): number {
  const row = core
    .getDbInstance()
    .prepare("SELECT hit_count FROM semantic_cache WHERE signature = ?")
    .get(signature) as { hit_count: number } | undefined;
  return row?.hit_count ?? -1;
}

test.beforeEach(() => {
  cache.clearCache();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("memory hits write no metric row until the batch is flushed", () => {
  cache.setCachedResponse("sig-mem", "gpt-4.1", response, 7);

  const writes = recordWrites(() => {
    for (let i = 0; i < 20; i++) assert.ok(cache.getCachedResponse("sig-mem"));
  });

  assert.deepEqual(writes, [], "20 memory hits must not run an UPDATE each");
  const stats = cache.getCacheStats();
  assert.equal(stats.hits, 20);
  assert.equal(stats.tokensSaved, 140);
});

test("disk hits write no row until the flush, then hit_count and totals are exact", () => {
  cache.setCachedResponse("sig-disk", "gpt-4.1", response, 4);

  const writes = recordWrites(() => {
    for (let i = 0; i < 5; i++) {
      cache.clearMemoryCache();
      assert.ok(cache.getCachedResponse("sig-disk"));
    }
  });

  assert.deepEqual(writes, [], "5 disk hits must not run an UPDATE each");
  const stats = cache.getCacheStats();
  assert.equal(stats.hits, 5);
  assert.equal(stats.tokensSaved, 20);
  assert.equal(storedHitCount("sig-disk"), 5);
});

test("misses write no metric row until the flush", () => {
  const writes = recordWrites(() => {
    for (let i = 0; i < 10; i++) assert.equal(cache.getCachedResponse(`sig-missing-${i}`), null);
  });

  assert.deepEqual(writes, [], "10 misses must not run an UPDATE each");
  assert.equal(cache.getCacheStats().misses, 10);
});

test("the flush writes every pending delta inside one transaction", () => {
  cache.setCachedResponse("sig-tx", "gpt-4.1", response, 2);
  cache.getCachedResponse("sig-tx");
  cache.clearMemoryCache();
  cache.getCachedResponse("sig-tx");
  cache.getCachedResponse("sig-tx-missing");

  const writes = recordWrites(() => {
    cache.getCacheStats();
  });

  assert.ok(writes.length >= 3, "hits, misses, tokens_saved and hit_count are written");
  assert.ok(
    writes.every((write) => write.inTransaction),
    "every delta shares one commit"
  );
});

test("flushSemanticCacheMetrics persists the pending deltas at once", () => {
  cache.setCachedResponse("sig-flush", "gpt-4.1", response, 3);
  cache.getCachedResponse("sig-flush");

  flushSemanticCacheMetrics();

  assert.equal(storedMetric("hits"), 1);
  assert.equal(storedMetric("tokens_saved"), 3);
});

test("pending deltas reach SQLite by themselves within the flush interval", async () => {
  cache.setCachedResponse("sig-timer", "gpt-4.1", response, 1);
  cache.getCachedResponse("sig-timer");

  await new Promise((resolve) => setTimeout(resolve, 1600));

  assert.equal(storedMetric("hits"), 1, "the timer flush is what bounds the lost telemetry");
});

test("clearCache zeroes the counters and leaves no buffered delta behind", async () => {
  cache.setCachedResponse("sig-clear", "gpt-4.1", response, 5);
  cache.getCachedResponse("sig-clear");

  cache.clearCache();
  await new Promise((resolve) => setTimeout(resolve, 1300));

  assert.equal(cache.getCacheStats().hits, 0);
  assert.equal(storedMetric("tokens_saved"), 0);
});
