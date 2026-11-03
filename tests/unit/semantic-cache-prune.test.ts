import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "semantic-cache-prune-"));
process.env.DATA_DIR = dataDir;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
const core = await import("../../src/lib/db/core.ts");
const { pruneSemanticCache } = await import("../../src/lib/db/semanticCache.ts");
const db = core.getDbInstance();
const now = new Date("2030-01-02T00:00:00.000Z");
const expired = "2030-01-01T00:00:00.000Z";
const future = "2030-01-03T00:00:00.000Z";
const options = { batchSize: 2, maxBatches: 50, maxRows: 0 };

function insert(id: string, expiresAt = expired, createdAt = expired) {
  db.prepare(
    `INSERT INTO semantic_cache
     (id, signature, model, prompt_hash, response, created_at, expires_at)
     VALUES (?, ?, 'test-model', 'test-hash', '{}', ?, ?)`
  ).run(id, id, createdAt, expiresAt);
}
function ids(): string[] {
  return (db.prepare("SELECT id FROM semantic_cache ORDER BY rowid").all() as { id: string }[]).map(
    (row) => row.id
  );
}
function seed(count: number, expiresAt = expired) {
  for (let i = 0; i < count; i++) insert(`entry-${i}`, expiresAt);
}

test.beforeEach(() => db.prepare("DELETE FROM semantic_cache").run());
test.after(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
});

test("expiry deletes past and equal-to-now rows but never future rows", async () => {
  insert("past");
  insert("boundary", now.toISOString());
  insert("future", future);
  assert.deepEqual(await pruneSemanticCache(options, now), {
    expiredDeleted: 2,
    capDeleted: 0,
    batches: 2,
  });
  assert.deepEqual(ids(), ["future"]);
});

test("a short batch stops expiry without an extra delete", async () => {
  seed(5);
  assert.deepEqual(await pruneSemanticCache(options, now), {
    expiredDeleted: 5,
    capDeleted: 0,
    batches: 3,
  });
  assert.deepEqual(ids(), []);
});

test("batch size and the shared per-run batch budget bound deletes", async () => {
  seed(7);
  assert.deepEqual(await pruneSemanticCache({ ...options, maxBatches: 2, maxRows: 1 }, now), {
    expiredDeleted: 4,
    capDeleted: 0,
    batches: 2,
  });
  assert.equal(ids().length, 3);
});

test("multi-batch expiry yields to a previously queued immediate", async () => {
  seed(5);
  let yielded = false;
  setImmediate(() => {
    yielded = true;
  });
  const run = pruneSemanticCache(options, now);
  assert.equal(yielded, false);
  await run;
  assert.equal(yielded, true);
});

test("MAX_ROWS evicts oldest created_at, breaking ties by rowid, and keeps newest", async () => {
  insert("newest", future, "2030-01-02T00:00:00.000Z");
  insert("tie-first", future);
  insert("tie-second", future);
  insert("oldest", future, "2029-12-31T00:00:00.000Z");
  insert("expired", expired);
  assert.deepEqual(await pruneSemanticCache({ ...options, maxRows: 2 }, now), {
    expiredDeleted: 1,
    capDeleted: 2,
    batches: 2,
  });
  assert.deepEqual(ids(), ["newest", "tie-second"]);
});

test("cap pass shares budget, yields, and rechecks remaining row count", async () => {
  seed(7, future);
  let yielded = false;
  setImmediate(() => {
    yielded = true;
  });
  assert.deepEqual(await pruneSemanticCache({ ...options, maxRows: 1, maxBatches: 3 }, now), {
    expiredDeleted: 0,
    capDeleted: 4,
    batches: 3,
  });
  assert.equal(yielded, true);
  assert.deepEqual(ids(), ["entry-4", "entry-5", "entry-6"]);
});

test("default zero cap preserves every live row", async () => {
  seed(7, future);
  assert.deepEqual(await pruneSemanticCache(options, now), {
    expiredDeleted: 0,
    capDeleted: 0,
    batches: 1,
  });
  assert.equal(ids().length, 7);
});

test("cap at or above row count removes nothing", async () => {
  seed(2, future);
  assert.deepEqual(await pruneSemanticCache({ ...options, maxRows: 2 }, now), {
    expiredDeleted: 0,
    capDeleted: 0,
    batches: 1,
  });
});

test("migration creates the expiry index idempotently and both range queries use it", () => {
  const migration = fs.readFileSync(
    new URL("../../src/lib/db/migrations/219_semantic_cache_expires_at_index.sql", import.meta.url),
    "utf8"
  );
  db.exec("DROP INDEX IF EXISTS idx_semantic_cache_expires_at");
  db.exec(migration);
  db.exec(migration);
  assert.ok(
    db
      .prepare(
        "SELECT name FROM sqlite_master WHERE type = 'index' AND name = 'idx_semantic_cache_expires_at'"
      )
      .get()
  );
  for (const query of [
    "SELECT rowid FROM semantic_cache WHERE expires_at <= ? LIMIT 2",
    "SELECT COUNT(*) FROM semantic_cache WHERE expires_at > ?",
  ]) {
    const plan = db.prepare(`EXPLAIN QUERY PLAN ${query}`).all(now.toISOString()) as {
      detail: string;
    }[];
    assert.match(
      plan.map((row) => row.detail).join("\n"),
      /SEARCH .*USING COVERING INDEX idx_semantic_cache_expires_at/
    );
  }
});
