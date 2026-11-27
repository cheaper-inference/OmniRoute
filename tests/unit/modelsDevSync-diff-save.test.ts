/**
 * Diff-based save tests for modelsDevSync.ts
 *
 * saveModelsDevPricing / saveModelsDevCapabilities used to be full replaces
 * (table-wide DELETE + INSERT) on every boot and every 6h cycle, pinning the
 * event loop behind pre-write DB file backups for zero semantic change.
 * These tests pin the diff contract:
 *   - a no-op sync (identical data) must not write anything at all
 *     (last_synced unchanged, changed=false, pricing memo not invalidated)
 *   - a changed sync applies only the delta (add/update/remove)
 *   - rows for providers dropped upstream are removed (full-replace parity)
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";

process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-models-dev-diff-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");

const modulePath = path.join(process.cwd(), "src/lib/modelsDevSync.ts");
const loadedModules = new Set();

async function importFresh(label) {
  const mod = await import(
    `${pathToFileURL(modulePath).href}?case=${label}-${Date.now()}-${Math.random()}`
  );
  loadedModules.add(mod);
  return mod;
}

function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

const RAW = {
  openai: {
    id: "openai",
    models: {
      "gpt-4o": {
        id: "gpt-4o",
        name: "GPT-4o",
        tool_call: true,
        reasoning: false,
        attachment: true,
        structured_output: true,
        temperature: true,
        release_date: "2024-05-13",
        last_updated: "2024-10-01",
        cost: { input: 2.5, output: 10, cache_read: 1.25, cache_write: 2.5 },
        limit: { context: 128000, output: 16384 },
        modalities: { input: ["text", "image"], output: ["text"] },
      },
      "gpt-4o-mini": {
        id: "gpt-4o-mini",
        name: "GPT-4o mini",
        tool_call: true,
        reasoning: false,
        structured_output: true,
        temperature: true,
        cost: { input: 0.15, output: 0.6 },
        limit: { context: 128000, output: 16384 },
        modalities: { input: ["text", "image"], output: ["text"] },
      },
    },
  },
  anthropic: {
    id: "anthropic",
    models: {
      "claude-sonnet-4": {
        id: "claude-sonnet-4",
        name: "Claude Sonnet 4",
        tool_call: true,
        reasoning: true,
        structured_output: true,
        temperature: true,
        cost: { input: 3, output: 15 },
        limit: { context: 200000, output: 64000 },
        modalities: { input: ["text"], output: ["text"] },
      },
    },
  },
};

function maxLastSynced(db) {
  const r = db
    .prepare("SELECT max(last_synced) AS m FROM model_capabilities")
    .get();
  return r.m;
}

test("first save on an empty DB inserts every row and reports added", async () => {
  resetStorage();
  const modelsDev = await importFresh("diff-first");
  const pricing = modelsDev.transformModelsDevToPricing(RAW);
  const capabilities = modelsDev.transformModelsDevToCapabilities(RAW);

  const pricingSave = modelsDev.saveModelsDevPricing(pricing);
  assert.equal(pricingSave.changed, true);
  assert.equal(pricingSave.added, Object.keys(pricing).length);
  assert.equal(pricingSave.updated, 0);
  assert.equal(pricingSave.removed, 0);

  const expectedCapRows = Object.values(capabilities).reduce(
    (n, models) => n + Object.keys(models).length,
    0
  );
  const capsSave = modelsDev.saveModelsDevCapabilities(capabilities);
  assert.equal(capsSave.changed, true);
  assert.equal(capsSave.added, expectedCapRows);
  assert.equal(capsSave.updated, 0);
  assert.equal(capsSave.removed, 0);

  const db = core.getDbInstance();
  assert.equal(
    db.prepare("SELECT count(*) AS n FROM model_capabilities").get().n,
    expectedCapRows
  );
  assert.equal(
    db.prepare("SELECT count(*) AS n FROM key_value WHERE namespace='models_dev_pricing'").get().n,
    Object.keys(pricing).length
  );
});

test("an identical re-save is a full no-op (no writes, last_synced unchanged)", async () => {
  resetStorage();
  const modelsDev = await importFresh("diff-noop");
  const pricing = modelsDev.transformModelsDevToPricing(RAW);
  const capabilities = modelsDev.transformModelsDevToCapabilities(RAW);
  modelsDev.saveModelsDevPricing(pricing);
  modelsDev.saveModelsDevCapabilities(capabilities);

  const db = core.getDbInstance();
  const syncedBefore = maxLastSynced(db);
  const rowsBefore = db
    .prepare("SELECT count(*) AS n FROM model_capabilities")
    .get().n;

  const capsSave = modelsDev.saveModelsDevCapabilities(capabilities);
  assert.deepEqual(capsSave, { changed: false, added: 0, updated: 0, removed: 0 });

  const pricingSave = modelsDev.saveModelsDevPricing(pricing);
  assert.deepEqual(pricingSave, { changed: false, added: 0, updated: 0, removed: 0 });

  assert.equal(maxLastSynced(db), syncedBefore, "last_synced must not be refreshed by a no-op save");
  assert.equal(db.prepare("SELECT count(*) AS n FROM model_capabilities").get().n, rowsBefore);
});

test("a changed save applies only the delta", async () => {
  resetStorage();
  const modelsDev = await importFresh("diff-delta");
  const pricing = modelsDev.transformModelsDevToPricing(RAW);
  const capabilities = modelsDev.transformModelsDevToCapabilities(RAW);
  modelsDev.saveModelsDevPricing(pricing);
  modelsDev.saveModelsDevCapabilities(capabilities);

  const db = core.getDbInstance();
  const untouchedSynced = db
    .prepare(
      "SELECT last_synced FROM model_capabilities WHERE provider='openai' AND model_id='gpt-4o-mini'"
    )
    .get().last_synced;

  // Flip one field, add one model, drop one provider.
  const modified = {
    openai: {
      models: {
        "gpt-4o": {
          ...RAW.openai.models["gpt-4o"],
          tool_call: false, // updated
        },
        "gpt-4o-mini": RAW.openai.models["gpt-4o-mini"], // untouched
        "gpt-4o-new": {
          id: "gpt-4o-new",
          name: "GPT-4o New",
          tool_call: true,
          reasoning: false,
          structured_output: true,
          temperature: true,
          cost: { input: 1, output: 2 },
          limit: { context: 64000, output: 8192 },
          modalities: { input: ["text"], output: ["text"] },
        }, // added
      },
    },
    // anthropic dropped → its rows removed
  };
  const modifiedPricing = modelsDev.transformModelsDevToPricing(modified);
  const modifiedCaps = modelsDev.transformModelsDevToCapabilities(modified);

  const pricingSave = modelsDev.saveModelsDevPricing(modifiedPricing);
  assert.equal(pricingSave.changed, true);
  // The transform derives alias providers (e.g. `cx` mirrors `openai`), so one
  // logical change fans out to multiple pricing rows.
  assert.ok(pricingSave.updated >= 1, "changed provider blobs must be rewritten");
  assert.ok(pricingSave.removed >= 1, "dropped provider rows must be removed");

  const capsSave = modelsDev.saveModelsDevCapabilities(modifiedCaps);
  assert.equal(capsSave.changed, true);
  assert.ok(capsSave.added >= 1, "gpt-4o-new must be added");
  assert.ok(capsSave.updated >= 1, "gpt-4o tool_call flip must be persisted");
  assert.ok(capsSave.removed >= 1, "anthropic provider rows must be removed");

  const rows = db
    .prepare("SELECT provider, model_id, tool_call, last_synced FROM model_capabilities")
    .all();

  const gpt4o = rows.find((r) => r.model_id === "gpt-4o");
  assert.equal(gpt4o.tool_call, 0, "flipped tool_call must be persisted");
  assert.notEqual(gpt4o.last_synced, untouchedSynced, "changed row must be re-synced");

  const mini = rows.find((r) => r.model_id === "gpt-4o-mini");
  assert.equal(mini.last_synced, untouchedSynced, "untouched row must keep its original last_synced");

  assert.equal(
    db.prepare("SELECT count(*) AS n FROM model_capabilities WHERE provider='anthropic'").get().n,
    0,
    "dropped provider rows must be removed"
  );
});

test("pricing memo is not invalidated by a no-op save", async () => {
  resetStorage();
  const modelsDev = await importFresh("diff-memo");
  const pricing = modelsDev.transformModelsDevToPricing(RAW);
  modelsDev.saveModelsDevPricing(pricing);
  const first = modelsDev.getModelsDevPricing();

  // Identical save must leave the memo untouched (same object identity).
  modelsDev.saveModelsDevPricing(pricing);
  assert.equal(modelsDev.getModelsDevPricing(), first, "no-op save must not churn the pricing cache");

  // A changed save must invalidate it.
  const changed = modelsDev.transformModelsDevToPricing({
    openai: RAW.openai,
  });
  modelsDev.saveModelsDevPricing(changed);
  assert.notEqual(modelsDev.getModelsDevPricing(), first, "changed save must refresh the memo");
});

test("rows under providers absent from models.dev are removed (full-replace parity)", async () => {
  resetStorage();
  const modelsDev = await importFresh("diff-parity");
  const pricing = modelsDev.transformModelsDevToPricing(RAW);
  const capabilities = modelsDev.transformModelsDevToCapabilities(RAW);
  modelsDev.saveModelsDevPricing(pricing);
  modelsDev.saveModelsDevCapabilities(capabilities);

  const db = core.getDbInstance();
  db.prepare(
    "INSERT INTO model_capabilities (provider, model_id, tool_call, last_synced) VALUES (?, ?, ?, ?)"
  ).run("live-only", "some-live-model", 1, new Date().toISOString());

  const capsSave = modelsDev.saveModelsDevCapabilities(capabilities);
  assert.equal(capsSave.changed, true);
  assert.equal(capsSave.removed, 1, "full-replace parity: foreign rows are removed");

  assert.equal(
    db.prepare("SELECT count(*) AS n FROM model_capabilities WHERE provider='live-only'").get().n,
    0,
    "rows under providers absent from models.dev must be removed (parity with the old full replace)"
  );
});
