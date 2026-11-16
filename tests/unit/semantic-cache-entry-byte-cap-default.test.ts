import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-semantic-entry-cap-def-"));
process.env.DATA_DIR = dataDir;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
process.env.OMNIROUTE_SEMANTIC_CACHE_PRUNE_INTERVAL_MS = "0";
delete process.env.SEMANTIC_CACHE_MAX_BYTES;
delete process.env.SEMANTIC_CACHE_MAX_ENTRY_BYTES;

const core = await import("../../src/lib/db/core.ts");
const cache = await import("../../src/lib/semanticCache.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

const body = (chars: number) => ({ choices: [{ message: { content: "y".repeat(chars) } }] });

test("default cap keeps an answer of about 1.5 MB out of the 2 MB memory cache", () => {
  cache.clearMemoryCache();
  cache.setCachedResponse("sig-default-small", "gpt-4.1", body(100), 1);
  cache.setCachedResponse("sig-default-big", "gpt-4.1", body(750_000), 1);
  assert.equal(cache.getMemoryCacheStats().size, 1);
  assert.equal(cache.getMemoryCacheStats().evictions, 0);
});

test("default cap lets an answer of about 200 KB into memory", () => {
  cache.clearMemoryCache();
  cache.setCachedResponse("sig-default-mid", "gpt-4.1", body(100_000), 1);
  assert.equal(cache.getMemoryCacheStats().size, 1);
});
