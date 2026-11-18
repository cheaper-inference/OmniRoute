/**
 * isSemanticCacheEnabled() runs for every eligible chat request. It must answer the database
 * toggle from the cached flag, not reload both settings namespaces each time, and a dashboard
 * write must still take effect on the next call.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-sc-enabled-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const settingsDb = await import("../../src/lib/db/databaseSettings.ts");
const { isSemanticCacheEnabled } =
  await import("../../open-sse/handlers/chatCore/semanticCache.ts");

function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(() => {
  resetStorage();
});

test.after(() => {
  resetStorage();
});

test("repeated enabled checks run no SQL after the first", () => {
  assert.equal(isSemanticCacheEnabled({}, null), true);

  const db = core.getDbInstance() as unknown as { prepare: (sql: string) => unknown };
  const realPrepare = db.prepare.bind(db);
  let prepared = 0;
  db.prepare = (sql: string) => {
    prepared += 1;
    return realPrepare(sql);
  };
  try {
    for (let i = 0; i < 100; i++) isSemanticCacheEnabled({}, null);
  } finally {
    db.prepare = realPrepare;
  }

  assert.equal(prepared, 0, "each request re-queried the settings tables");
});

test("a dashboard toggle takes effect on the next enabled check", () => {
  assert.equal(isSemanticCacheEnabled({}, null), true);

  settingsDb.updateDatabaseSettings({ cache: { semanticCacheEnabled: false } } as never);
  assert.equal(isSemanticCacheEnabled({}, null), false, "a disabled cache stayed enabled");

  settingsDb.updateDatabaseSettings({ cache: { semanticCacheEnabled: true } } as never);
  assert.equal(isSemanticCacheEnabled({}, null), true);
});

test("the general setting and a bypass key still turn the cache off", () => {
  assert.equal(isSemanticCacheEnabled({ semanticCacheEnabled: false }, null), false);
  assert.equal(isSemanticCacheEnabled({}, { cacheDefaultMode: "bypass" }), false);
});
