import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(
  path.join(os.tmpdir(), "omniroute-context-reconcile-runtime-")
);
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const models = await import("../../src/lib/db/models.ts");
const overrides = await import("../../src/lib/db/modelContextOverrides.ts");
const readCache = await import("../../src/lib/db/readCache.ts");
const { runContextWindowReconcile } = await import("../../src/lib/contextWindowResolver.ts");

test.beforeEach(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("runContextWindowReconcile retains an auto override across repeated synced discovery", async () => {
  // gpt-4o's static catalog window is 128K; discovery reports a real 372K.
  // This uses the live DB discovery and resolver seams, not injected pure deps.
  await models.replaceSyncedAvailableModelsForConnection("openai", "reconcile-test", [
    { id: "gpt-4o", inputTokenLimit: 372000 },
  ]);

  const first = await runContextWindowReconcile();
  assert.deepEqual(first, { scanned: 1, written: 1, removed: 0, skippedManual: 0 });
  assert.deepEqual(
    (() => {
      const record = overrides.getModelContextOverrideRecord("openai", "gpt-4o");
      return record && { realContext: record.realContext, source: record.source };
    })(),
    { realContext: 372000, source: "auto:discovery" }
  );

  const second = await runContextWindowReconcile();
  assert.deepEqual(second, { scanned: 1, written: 0, removed: 0, skippedManual: 0 });
  assert.deepEqual(
    (() => {
      const record = overrides.getModelContextOverrideRecord("openai", "gpt-4o");
      return record && { realContext: record.realContext, source: record.source };
    })(),
    { realContext: 372000, source: "auto:discovery" },
    "the persisted auto override remains rather than being removed after its first write"
  );
});

test("runContextWindowReconcile bumps the model catalog cache once per pass, not per override", async () => {
  // Every bump invalidates catalog-version memos (e.g. the synced vision verdict
  // map), so a per-override bump rebuilt them once per written model: with
  // thousands of synced models that blocked the event loop for 10-20 s per pass.
  await models.replaceSyncedAvailableModelsForConnection("openai", "reconcile-test", [
    { id: "gpt-4o", inputTokenLimit: 371001 },
    { id: "gpt-4o-mini", inputTokenLimit: 371002 },
    { id: "o3", inputTokenLimit: 371003 },
  ]);

  const before = readCache.getModelCatalogCacheVersion();
  const first = await runContextWindowReconcile();
  assert.equal(first.written, 3);
  assert.equal(readCache.getModelCatalogCacheVersion() - before, 1);

  const unchanged = readCache.getModelCatalogCacheVersion();
  const second = await runContextWindowReconcile();
  assert.equal(second.written, 0);
  assert.equal(
    readCache.getModelCatalogCacheVersion(),
    unchanged,
    "a pass that changes nothing leaves the catalog cache alone"
  );
});
