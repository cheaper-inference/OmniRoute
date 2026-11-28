/**
 * Buffered legacy semantic-cache telemetry must reach SQLite before graceful shutdown closes the
 * database, so a normal restart loses no counts.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import Database from "better-sqlite3";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-semantic-metrics-shutdown-"));
process.env.DATA_DIR = dataDir;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
process.env.OMNIROUTE_SKIP_DB_HEALTHCHECK = "1";
process.env.OMNIROUTE_SEMANTIC_CACHE_PRUNE_INTERVAL_MS = "0";

const core = await import("../../src/lib/db/core.ts");
const cache = await import("../../src/lib/semanticCache.ts");
const shutdown = await import("../../src/lib/gracefulShutdown.ts");

test.after(() => {
  core.closeDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("graceful shutdown flushes buffered cache metrics before the database closes", async () => {
  cache.setCachedResponse("sig-shutdown", "gpt-4.1", { choices: [] }, 6);
  assert.ok(cache.getCachedResponse("sig-shutdown"));
  assert.equal(cache.getCachedResponse("sig-shutdown-miss"), null);
  const dbFile = (core.getDbInstance() as unknown as { name: string }).name;

  const log = console.log;
  console.log = () => {};
  try {
    await shutdown.requestGracefulShutdown("test");
  } finally {
    console.log = log;
  }

  const reader = new Database(dbFile, { readonly: true });
  try {
    const read = (key: string) =>
      (
        reader.prepare("SELECT value FROM cache_metrics WHERE key = ?").get(key) as {
          value: number;
        }
      ).value;
    assert.equal(read("hits"), 1);
    assert.equal(read("misses"), 1);
    assert.equal(read("tokens_saved"), 6);
    const row = reader
      .prepare("SELECT hit_count FROM semantic_cache WHERE signature = 'sig-shutdown'")
      .get() as { hit_count: number } | undefined;
    assert.equal(row?.hit_count ?? 0, 0, "a memory hit does not touch the entry's hit_count");
  } finally {
    reader.close();
  }
});
