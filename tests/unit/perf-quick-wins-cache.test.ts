import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-perf-quick-wins-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const readCache = await import("../../src/lib/db/readCache.ts");
const combosDb = await import("../../src/lib/db/combos.ts");
const mappingsDb = await import("../../src/lib/db/modelComboMappings.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");

const SETTINGS_READ = "SELECT key, value FROM key_value WHERE namespace = 'settings'";
const COMBO_BY_NAME_READ =
  "SELECT id, data, sort_order, context_cache_protection FROM combos WHERE name = ?";
const MAPPING_RESOLVE_READ = /FROM model_combo_mappings m/;

function countReads(db: ReturnType<typeof core.getDbInstance>, sql: string | RegExp) {
  const original = db.prepare.bind(db);
  const counter = { reads: 0 };
  db.prepare = ((candidate: string) => {
    const matches = typeof sql === "string" ? candidate === sql : sql.test(candidate);
    if (matches) counter.reads++;
    return original(candidate);
  }) as typeof db.prepare;
  return {
    counter,
    restore: () => {
      db.prepare = original;
    },
  };
}

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  await resetStorage();
  readCache.invalidateDbCache();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

async function createCombo(name: string, model: string) {
  return combosDb.createCombo({
    name,
    models: [{ provider: "openai", model }],
    strategy: "priority",
    config: { temperature: 0 },
  });
}

test("getCachedSettings serves repeat reads from one query and refreshes on updateSettings", async () => {
  const db = core.getDbInstance();
  await settingsDb.updateSettings({ perfCacheLabel: "one" });

  const spy = countReads(db, SETTINGS_READ);
  try {
    const first = await readCache.getCachedSettings();
    const second = await readCache.getCachedSettings();
    assert.equal(first.perfCacheLabel, "one");
    assert.equal(spy.counter.reads, 1);
    assert.strictEqual(first, second);
  } finally {
    spy.restore();
  }

  await settingsDb.updateSettings({ perfCacheLabel: "two" });

  const afterWrite = countReads(db, SETTINGS_READ);
  try {
    const fresh = await readCache.getCachedSettings();
    assert.equal(afterWrite.counter.reads, 1);
    assert.equal(fresh.perfCacheLabel, "two");
  } finally {
    afterWrite.restore();
  }
});

test("getCachedComboByName caches positive and negative lookups, busts on combo write", async () => {
  const db = core.getDbInstance();
  await createCombo("perf-cache-a", "gpt-4o");

  const spy = countReads(db, COMBO_BY_NAME_READ);
  try {
    const first = await readCache.getCachedComboByName("perf-cache-a");
    const second = await readCache.getCachedComboByName("perf-cache-a");
    assert.equal(first?.name, "perf-cache-a");
    assert.strictEqual(first, second);

    const miss1 = await readCache.getCachedComboByName("no-such-combo");
    const miss2 = await readCache.getCachedComboByName("no-such-combo");
    assert.equal(miss1, null);
    assert.equal(miss2, null);
    assert.equal(spy.counter.reads, 2);
  } finally {
    spy.restore();
  }

  const combo = (await combosDb.getCombos()).find((entry) => entry.name === "perf-cache-a");
  await combosDb.updateCombo(combo!.id, { name: "perf-cache-a-renamed" });

  const afterWrite = countReads(db, COMBO_BY_NAME_READ);
  try {
    assert.equal(await readCache.getCachedComboByName("perf-cache-a"), null);
    const renamed = await readCache.getCachedComboByName("perf-cache-a-renamed");
    assert.equal(renamed?.name, "perf-cache-a-renamed");
    assert.equal(afterWrite.counter.reads, 2);
  } finally {
    afterWrite.restore();
  }
});

test("getCachedComboForModel refreshes immediately after mapping update and delete", async () => {
  const db = core.getDbInstance();
  const comboA = await createCombo("perf-map-a", "gpt-4o");
  const comboB = await createCombo("perf-map-b", "gpt-4o-mini");
  const mapping = await mappingsDb.createModelComboMapping({
    pattern: "gpt-*",
    comboId: comboA.id,
    priority: 1,
  });

  const spy = countReads(db, MAPPING_RESOLVE_READ);
  try {
    const first = await readCache.getCachedComboForModel("gpt-4o");
    const second = await readCache.getCachedComboForModel("gpt-4o");
    assert.equal(first?.name, "perf-map-a");
    assert.strictEqual(first, second);
    assert.equal(spy.counter.reads, 1);
  } finally {
    spy.restore();
  }

  await mappingsDb.updateModelComboMapping(mapping.id, { comboId: comboB.id });

  const afterUpdate = countReads(db, MAPPING_RESOLVE_READ);
  try {
    const updated = await readCache.getCachedComboForModel("gpt-4o");
    assert.equal(updated?.name, "perf-map-b");
    assert.equal(afterUpdate.counter.reads, 1);
  } finally {
    afterUpdate.restore();
  }

  await mappingsDb.deleteModelComboMapping(mapping.id);

  const afterDelete = countReads(db, MAPPING_RESOLVE_READ);
  try {
    assert.equal(await readCache.getCachedComboForModel("gpt-4o"), null);
    assert.equal(afterDelete.counter.reads, 1);
  } finally {
    afterDelete.restore();
  }
});

test("hot-path callers read settings and combo lookups through the read cache", () => {
  const read = (relativePath: string) =>
    fs.readFileSync(new URL(`../../${relativePath}`, import.meta.url), "utf-8");

  const usageTracking = read("open-sse/utils/usageTracking.ts");
  assert.match(usageTracking, /getCachedSettings\(\)/);
  assert.doesNotMatch(usageTracking, /\bgetSettings\b/);

  const rateLimitManager = read("open-sse/services/rateLimitManager.ts");
  assert.match(rateLimitManager, /getCachedSettings\(\)/);
  assert.doesNotMatch(rateLimitManager, /\bgetSettings\b/);

  const apiKeyPolicy = read("src/shared/utils/apiKeyPolicy.ts");
  assert.match(apiKeyPolicy, /getCachedComboByName\(/);
  assert.match(apiKeyPolicy, /getCachedComboForModel\(/);
  assert.doesNotMatch(apiKeyPolicy, /from "@\/lib\/db\/combos"/);
  assert.doesNotMatch(apiKeyPolicy, /from "@\/lib\/db\/modelComboMappings"/);

  const modelService = read("src/sse/services/model.ts");
  assert.match(modelService, /getCachedComboByName\(/);
});
