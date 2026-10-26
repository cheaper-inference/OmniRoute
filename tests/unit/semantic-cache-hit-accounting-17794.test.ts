import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omni-cache-hit-accounting-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { clearCache, generateSignature, getCacheStats, recordSemanticCacheHit, setCachedResponse } =
  await import("../../src/lib/semanticCache.ts");

function readEntries() {
  return core
    .getDbInstance()
    .prepare("SELECT signature, prompt_hash, hit_count FROM semantic_cache ORDER BY signature")
    .all() as Array<{ signature: string; prompt_hash: string; hit_count: number }>;
}

function store(signature: string) {
  setCachedResponse(signature, "synthetic-model", {
    choices: [{ message: { content: "cached" } }],
  });
}

test.beforeEach(() => {
  clearCache();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("#17794 a hit increments only the exact entry in a shared API-key namespace", () => {
  const signatures = ["prompt-a", "prompt-b"].map((content) =>
    generateSignature(
      "synthetic-model",
      [{ role: "user", content }],
      0,
      1,
      "synthetic-key-namespace"
    )
  );
  signatures.forEach(store);
  const before = readEntries();
  assert.equal(before.length, 2);
  assert.notEqual(signatures[0], signatures[1]);
  assert.equal(before[0].prompt_hash, before[1].prompt_hash);
  assert.ok(before.every((entry) => entry.hit_count === 0));

  recordSemanticCacheHit(signatures[0], 7);

  assert.deepEqual(
    readEntries(),
    before.map((entry) => ({ ...entry, hit_count: entry.signature === signatures[0] ? 1 : 0 }))
  );
  assert.equal(getCacheStats().hits, 1);
  assert.equal(getCacheStats().tokensSaved, 7);
});

test("#17794 an unnamespaced signature does not increment another row sharing its prefix", () => {
  const signature = "a".repeat(64);
  const sibling = "a".repeat(16) + "b".repeat(48);
  store(signature);
  store(sibling);
  const before = readEntries();
  assert.equal(before.length, 2);
  assert.equal(before[0].prompt_hash, before[1].prompt_hash);

  recordSemanticCacheHit(signature);

  assert.deepEqual(
    readEntries(),
    before.map((entry) => ({ ...entry, hit_count: entry.signature === signature ? 1 : 0 }))
  );
  assert.equal(getCacheStats().hits, 1);
  assert.equal(getCacheStats().tokensSaved, 0);
});

test("#17794 an unmatched Layer-1 hash changes no row but still increments global metrics", () => {
  const target = "c".repeat(64);
  store(target.slice(0, 16) + "d".repeat(48));
  store("synthetic-other-key." + "e".repeat(64));
  const before = readEntries();
  assert.equal(before.length, 2);
  assert.ok(before.every((entry) => entry.signature !== target));
  assert.ok(before.some((entry) => entry.prompt_hash === target.slice(0, 16)));

  recordSemanticCacheHit(target, 11);

  assert.deepEqual(readEntries(), before);
  assert.equal(getCacheStats().hits, 1);
  assert.equal(getCacheStats().tokensSaved, 11);
});

test("#17794 the executed hit statement searches the signature index without scanning", (t) => {
  const signature = "synthetic-plan-key." + "f".repeat(64);
  store(signature);
  const db = core.getDbInstance();
  const prepare = db.prepare.bind(db);
  let hitSql = "";
  const spy = t.mock.method(db, "prepare", (sql: string) => {
    if (sql.startsWith("UPDATE semantic_cache SET hit_count")) hitSql = sql;
    return prepare(sql);
  });
  try {
    recordSemanticCacheHit(signature);
  } finally {
    spy.mock.restore();
  }
  assert.ok(hitSql, "capture the production statement, not a duplicated test query");
  const params = Array.from(hitSql.matchAll(/\?/g), () => signature);
  const plan = db.prepare(`EXPLAIN QUERY PLAN ${hitSql}`).all(...params) as Array<{
    detail: string;
  }>;
  const details = plan.map((step) => step.detail).join("\n");
  t.diagnostic(details);
  assert.match(details, /SEARCH semantic_cache USING (?:COVERING )?INDEX \S+ \(signature=\?\)/);
  assert.doesNotMatch(details, /\bSCAN\b/);
});
