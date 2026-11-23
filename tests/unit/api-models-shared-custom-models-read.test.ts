import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// #16929 follow-up: /api/models must bulk-read the `customModels` namespace once per
// request. The capability snapshot owns that read and the live listing reuses it.
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-shared-custom-read-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.SQLITE_FILE = path.join(TEST_DATA_DIR, "storage.sqlite");

const core = await import("../../src/lib/db/core.ts");
const modelsDb = await import("../../src/lib/db/models.ts");
const activeSynced = await import("../../src/lib/db/models/activeSyncedCatalog.ts");
const snapshotModule = await import("../../src/lib/modelCapabilityResolutionSnapshot.ts");

const CUSTOM_MODELS_SQL = "FROM key_value WHERE namespace = 'customModels'";

function countCustomModelReads<T>(run: () => Promise<T>): Promise<{ result: T; reads: number }> {
  const db = core.getDbInstance();
  const originalPrepare = db.prepare;
  const callPrepare = originalPrepare.bind(db);
  let reads = 0;
  (db as unknown as { prepare: typeof db.prepare }).prepare = ((sql: string) => {
    if (String(sql).replace(/\s+/g, " ").includes(CUSTOM_MODELS_SQL)) reads++;
    return callPrepare(sql);
  }) as typeof db.prepare;
  return run()
    .then((result) => ({ result, reads }))
    .finally(() => {
      (db as unknown as { prepare: typeof db.prepare }).prepare = originalPrepare;
    });
}

test.before(() => {
  const db = core.getDbInstance();
  const insert = db.prepare(
    "INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES ('customModels', ?, ?)"
  );
  insert.run(
    "openai",
    JSON.stringify([
      { id: "gpt-4o", supportsVision: false },
      { id: "no-flag" },
      { id: "vision-on", supportsVision: true },
    ])
  );
  insert.run("broken", "{not json");
  insert.run("empty", JSON.stringify([]));
});

test.after(() => {
  core.resetDbInstance();
  try {
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  } catch {
    /* best-effort */
  }
});

test("readCustomModelsByProvider parses every row once and skips malformed JSON", () => {
  const rows = modelsDb.readCustomModelsByProvider();
  assert.deepEqual(Object.keys(rows).sort(), ["empty", "openai"]);
  assert.equal((rows.openai as unknown[]).length, 3);
});

test("buildCustomModelVisionOverrides from pre-read rows equals the direct bulk read", () => {
  const direct = modelsDb.listCustomModelVisionOverrides();
  const derived = modelsDb.buildCustomModelVisionOverrides(modelsDb.readCustomModelsByProvider());
  assert.deepEqual(
    [...derived].map(([p, m]) => [p, [...m]]),
    [...direct].map(([p, m]) => [p, [...m]])
  );
  assert.equal(derived.get("openai")?.get("gpt-4o"), false);
  assert.equal(derived.get("openai")?.get("vision-on"), true);
  assert.equal(derived.get("openai")?.has("no-flag"), false);
});

test("the capability snapshot reads customModels once and exposes the rows", async () => {
  const { result: snapshot, reads } = await countCustomModelReads(async () =>
    snapshotModule.createModelCapabilityResolutionSnapshot()
  );
  assert.equal(reads, 1, "one bulk read per snapshot");
  assert.ok(snapshot.customModelsByProvider, "snapshot must expose the rows it read");
  assert.equal(snapshot.customVisionOverrides.get("openai")?.get("gpt-4o"), false);
  assert.equal((snapshot.customModelsByProvider?.openai as unknown[]).length, 3);
});

test("getAllActiveSyncedModels reuses the snapshot rows instead of re-reading", async () => {
  const snapshot = snapshotModule.createModelCapabilityResolutionSnapshot();
  const shared = await countCustomModelReads(() =>
    activeSynced.getAllActiveSyncedModels({
      customModelsByProvider: snapshot.customModelsByProvider,
    })
  );
  assert.equal(shared.reads, 0, "a pre-read map must suppress the second namespace read");

  const standalone = await countCustomModelReads(() => activeSynced.getAllActiveSyncedModels());
  assert.equal(standalone.reads, 1, "without a caller snapshot the listing still bulk-reads once");
  assert.deepEqual(shared.result, standalone.result);
});
