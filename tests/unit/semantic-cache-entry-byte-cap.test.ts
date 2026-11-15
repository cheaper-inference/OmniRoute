import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-semantic-entry-cap-"));
process.env.DATA_DIR = dataDir;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
process.env.OMNIROUTE_SEMANTIC_CACHE_PRUNE_INTERVAL_MS = "0";
// Total 100 KB, one entry at most 20 KB (the in-memory size estimate is 2 bytes per character).
process.env.SEMANTIC_CACHE_MAX_BYTES = "100000";
process.env.SEMANTIC_CACHE_MAX_ENTRY_BYTES = "20000";

const core = await import("../../src/lib/db/core.ts");
const cache = await import("../../src/lib/semanticCache.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

const small = (n: number) => ({ choices: [{ message: { content: `small answer ${n}` } }] });
const long = { choices: [{ message: { content: "x".repeat(60_000) } }] }; // about 120 KB in memory, more than the whole 100 KB cache

test("one long answer does not evict the small entries", () => {
  cache.clearMemoryCache();
  for (let i = 0; i < 5; i++) cache.setCachedResponse(`sig-small-${i}`, "gpt-4.1", small(i), 1);
  assert.equal(cache.getMemoryCacheStats().size, 5);

  cache.setCachedResponse("sig-long", "gpt-4.1", long, 1);

  const stats = cache.getMemoryCacheStats();
  assert.equal(stats.size, 5, "the long answer stays out of memory and evicts nothing");
  assert.equal(stats.evictions, 0);
});

test("a long answer still lives in the SQLite tier and does not enter memory on a hit", () => {
  cache.clearMemoryCache();
  cache.setCachedResponse("sig-long-2", "gpt-4.1", long, 1);
  assert.equal(cache.getMemoryCacheStats().size, 0);

  assert.deepEqual(cache.getCachedResponse("sig-long-2"), long);
  assert.equal(cache.getMemoryCacheStats().size, 0, "no promotion of an oversized entry");
});

test("entries under the cap are cached in memory as before", () => {
  cache.clearMemoryCache();
  cache.setCachedResponse("sig-small-only", "gpt-4.1", small(1), 1);
  assert.equal(cache.getMemoryCacheStats().size, 1);
  assert.deepEqual(cache.getCachedResponse("sig-small-only"), small(1));
});
