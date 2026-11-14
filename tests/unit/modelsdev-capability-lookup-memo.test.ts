import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// With models.dev sync off (the default) the all-row capability cache is never
// primed, so every getSyncedCapability() call used to prepare a SELECT and
// re-run the CREATE TABLE guard, hits and misses alike. One chat request makes
// about nine such calls. A lookup result, miss included, must be remembered
// until a capability write bumps the catalog version.
const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-test-capability-memo-"));
process.env.DATA_DIR = tmpDir;

const core = await import("../../src/lib/db/core.ts");
const sync = await import("../../src/lib/modelsDevSync.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(tmpDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

const entry = {
  tool_call: true,
  reasoning: false,
  attachment: false,
  structured_output: true,
  temperature: true,
  modalities_input: '["text"]',
  modalities_output: '["text"]',
  knowledge_cutoff: null,
  release_date: null,
  last_updated: null,
  status: null,
  family: null,
  open_weights: null,
  limit_context: 64000,
  limit_input: null,
  limit_output: 4096,
  interleaved_field: null,
};

/** Count SQL the cold lookup path sends to SQLite while `run` executes. */
function countSql(run: () => void) {
  const db = core.getDbInstance() as unknown as {
    prepare: (sql: string) => unknown;
    exec: (sql: string) => unknown;
  };
  const counts = { prepare: 0, exec: 0 };
  const prepare = db.prepare;
  const exec = db.exec;
  db.prepare = function (this: unknown, sql: string) {
    counts.prepare++;
    return prepare.call(this, sql);
  };
  db.exec = function (this: unknown, sql: string) {
    counts.exec++;
    return exec.call(this, sql);
  };
  try {
    run();
  } finally {
    db.prepare = prepare;
    db.exec = exec;
  }
  return counts;
}

test("repeated cold lookups of a missing model touch SQLite once", () => {
  core.getDbInstance();
  const counts = countSql(() => {
    for (let i = 0; i < 9; i++) assert.equal(sync.getSyncedCapability("nope", "missing"), null);
  });
  assert.deepEqual(counts, { prepare: 1, exec: 1 });
});

test("a memoized miss is dropped when a capability write lands", () => {
  assert.equal(sync.getSyncedCapability("late", "model-a"), null);
  sync.upsertSyncedCapabilities("late", { "model-a": entry });
  assert.equal(sync.getSyncedCapability("late", "model-a")?.limit_context, 64000);
});

test("a memoized hit follows a later edit of the same row", () => {
  sync.upsertSyncedCapabilities("edit", { "model-b": entry });
  assert.equal(sync.getSyncedCapability("edit", "model-b")?.limit_context, 64000);
  sync.upsertSyncedCapabilities("edit", { "model-b": { ...entry, limit_context: 99000 } });
  assert.equal(sync.getSyncedCapability("edit", "model-b")?.limit_context, 99000);
});

test("a flood of distinct unknown model names cannot pin the memo forever", () => {
  // Model names come from request bodies, so the memo must have a ceiling: after a flood far
  // beyond any sane cap, an early miss is looked up in SQLite again.
  assert.equal(sync.getSyncedCapability("flood", "first"), null);
  for (let i = 0; i < 20000; i++) sync.getSyncedCapability("flood", `m-${i}`);
  const counts = countSql(() => {
    sync.getSyncedCapability("flood", "first");
  });
  assert.equal(counts.prepare, 1);
});

test("a database swap drops the memo", () => {
  sync.upsertSyncedCapabilities("swap", { "model-c": entry });
  assert.ok(sync.getSyncedCapability("swap", "model-c"));
  core.resetDbInstance();
  fs.rmSync(path.join(tmpDir, "storage.sqlite"), { force: true });
  assert.equal(sync.getSyncedCapability("swap", "model-c"), null);
});
