import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-storm-reconcile-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "storm-reconcile-test-secret";

const core = await import("../../src/lib/db/core.ts");
const persistence = await import("../../src/lib/db/models/syncedAvailableModelPersistence.ts");
const resolver = await import("../../src/lib/contextWindowResolver.ts");

function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(() => {
  resetStorage();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function normalizeModels(models: unknown) {
  return Array.isArray(models) ? (models as Array<{ id: string; contextWindow?: number }>) : [];
}

test("context-window-reconcile does not trigger per-model vision rebuilds or redundant writes", async () => {
  // Insert 5 models for a custom provider with non-catalog context windows
  const modelCount = 5;
  const models = Array.from({ length: modelCount }, (_, i) => ({
    id: `storm-model-${i}`,
    contextWindow: 50000 + i,
  }));

  persistence.persistCanonicalSyncedAvailableModels("custom-prov:conn-1", models, normalizeModels);

  // Spy on db.prepare to count full-table queries for syncedAvailableModels
  const db = core.getDbInstance();
  const origPrepare = db.prepare.bind(db);
  let syncedAvailableModelQueries = 0;
  db.prepare = (sql: string) => {
    if (sql.includes("FROM key_value WHERE namespace = 'syncedAvailableModels'")) {
      syncedAvailableModelQueries++;
    }
    return origPrepare(sql);
  };

  try {
    // Run 1: initial reconcile pass
    const result1 = await resolver.runContextWindowReconcile();

    // 1 query for getAllSyncedAvailableModels + 1 bulk query for snapshot.
    // In unpatched code, this was 1 + modelCount (6 queries) because every model
    // re-scanned and re-parsed the syncedAvailableModels table.
    assert.equal(result1.scanned, modelCount);
    assert.equal(result1.written, modelCount);
    assert.equal(
      syncedAvailableModelQueries,
      2,
      `Expected exactly 2 syncedAvailableModels queries (1 getAll + 1 bulk snapshot), got ${syncedAvailableModelQueries}`
    );

    // Run 2: second reconcile pass with identical discovery data
    const queriesBeforeRun2 = syncedAvailableModelQueries;
    const result2 = await resolver.runContextWindowReconcile();
    const run2Queries = syncedAvailableModelQueries - queriesBeforeRun2;

    assert.equal(result2.scanned, modelCount);
    // Unchanged auto:discovery overrides must not be rewritten
    assert.equal(
      result2.written,
      0,
      `Expected 0 writes on unchanged run 2, but wrote ${result2.written}`
    );
    assert.equal(
      result2.removed,
      0,
      `Expected 0 removals on unchanged run 2, but removed ${result2.removed}`
    );
    assert.equal(
      run2Queries,
      2,
      `Expected exactly 2 queries on run 2, got ${run2Queries}`
    );
  } finally {
    db.prepare = origPrepare;
  }
});

test("runContextWindowReconcile respects persistedOverrides: false so existing auto:discovery overrides are not fed back into baseline catalog resolution", async () => {
  const modelCaps = await import("../../src/lib/modelCapabilities.ts");
  const overrides = await import("../../src/lib/db/modelContextOverrides.ts");

  // Choose a model with a known static catalog window (gpt-4o static is 128000)
  const baseCaps = modelCaps.getResolvedModelCapabilities(
    { provider: "openai", model: "gpt-4o" },
    { persistedOverrides: false }
  );
  const baselineCatalogWindow = baseCaps.contextWindow;
  assert.ok(
    typeof baselineCatalogWindow === "number" && baselineCatalogWindow > 0,
    "Expected baseline static catalog window for gpt-4o"
  );

  // Discovery reports a different context window (e.g. 200,000)
  const discoveredWindow = 200000;
  assert.notEqual(discoveredWindow, baselineCatalogWindow);

  persistence.persistCanonicalSyncedAvailableModels(
    "openai:conn-1",
    [{ id: "gpt-4o", contextWindow: discoveredWindow }],
    normalizeModels
  );

  // Run 1: initial reconcile writes the auto:discovery override
  const result1 = await resolver.runContextWindowReconcile();
  assert.equal(result1.scanned, 1);
  assert.equal(result1.written, 1);
  assert.equal(result1.removed, 0);

  const override1 = overrides.getModelContextOverrideRecord("openai", "gpt-4o");
  assert.equal(override1?.realContext, discoveredWindow);
  assert.equal(override1?.source, "auto:discovery");

  // Run 2: second reconcile pass.
  // If persistedOverrides: false is respected during catalog resolution,
  // getCatalogWindow resolves baselineCatalogWindow (128000), which !== discoveredWindow (200000).
  // Because discoveredWindow !== catalogWindow, the override is NOT deleted.
  // Because existing override already matches discoveredWindow, redundant write is skipped.
  // (If persistedOverrides: false were missing, catalogWindow would resolve to 200000 from the override,
  // falsely matching discoveredWindow, which would delete the override!)
  const result2 = await resolver.runContextWindowReconcile();
  assert.equal(result2.scanned, 1);
  assert.equal(result2.written, 0, "Redundant write must be skipped");
  assert.equal(
    result2.removed,
    0,
    "Override must NOT be removed (persistedOverrides: false must be respected during baseline catalog lookup)"
  );

  const override2 = overrides.getModelContextOverrideRecord("openai", "gpt-4o");
  assert.equal(override2?.realContext, discoveredWindow, "Override realContext must be preserved");
  assert.equal(override2?.source, "auto:discovery", "Override source must remain auto:discovery");
});
