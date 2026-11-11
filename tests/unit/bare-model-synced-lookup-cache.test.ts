/**
 * Bare-model resolution asked the database which active providers carry a model
 * with two json_each scans over every connection's model catalog, on every
 * request. The answer only changes when a catalog or connection is written, so a
 * repeat lookup must not reach the database, and a write must still show at once.
 */
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-bare-model-cache-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../src/lib/db/core.ts");
const modelsDb = await import("../../src/lib/db/models.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const { getModelInfoCore } = await import("../../open-sse/services/model.ts");

const MODEL = "orion-preview-2027";

async function seed(provider: string, isActive = true) {
  const connection = await providersDb.createProviderConnection({
    provider,
    authType: "apikey",
    name: `${provider}-cache-test`,
    apiKey: `key-${provider}-cache-test`,
    isActive,
  });
  await modelsDb.replaceSyncedAvailableModelsForConnection(provider, String(connection.id), [
    { id: MODEL, name: MODEL, supportedEndpoints: ["chat"] },
  ]);
  return connection;
}

/** Count prepared statements that scan model catalogs with json_each. */
async function countCatalogScans(fn: () => Promise<unknown>): Promise<number> {
  const db = core.getDbInstance() as unknown as { prepare: (sql: string) => unknown };
  const original = db.prepare;
  let count = 0;
  db.prepare = function (this: unknown, sql: string) {
    if (/json_each/.test(sql)) count++;
    return original.call(this, sql);
  };
  try {
    await fn();
  } finally {
    db.prepare = original;
  }
  return count;
}

test.beforeEach(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("a repeated bare-model lookup does not scan the model catalogs again", async () => {
  await seed("anthropic");

  const first = await getModelInfoCore(MODEL, null);
  assert.equal(first.provider, "anthropic");

  const scans = await countCatalogScans(() => getModelInfoCore(MODEL, null));
  assert.equal(scans, 0, "second lookup must be served from the cache");
});

test("a catalog write is visible to the next bare-model lookup", async () => {
  await seed("anthropic");
  assert.equal((await getModelInfoCore(MODEL, null)).provider, "anthropic");

  await modelsDb.deleteSyncedAvailableModelsForProvider("anthropic");
  await seed("openai");

  assert.equal((await getModelInfoCore(MODEL, null)).provider, "openai");
});

test("deactivating a connection is visible to the next bare-model lookup", async () => {
  await seed("anthropic");
  const openai = await seed("openai");
  // openai is the historical default when both providers carry the model.
  assert.equal((await getModelInfoCore(MODEL, null)).provider, "openai");

  await providersDb.updateProviderConnection(String(openai.id), { isActive: false });

  assert.equal((await getModelInfoCore(MODEL, null)).provider, "anthropic");
});
