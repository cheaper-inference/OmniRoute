/**
 * The semantic-cache enabled flag is read for every chat request. Reading it through
 * getUserDatabaseSettings() clones all defaults, runs two namespace SELECTs and decrypts the
 * cache secrets just to learn one boolean. isSemanticCacheDbEnabled() answers from memory,
 * and a dashboard write or a database reset must still take effect at once.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-sc-flag-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const settingsDb = await import("../../src/lib/db/databaseSettings.ts");

function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

function writeFlagDirectly(value: boolean) {
  core
    .getDbInstance()
    .prepare("INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES (?, ?, ?)")
    .run("databaseSettings", "cache.semanticCacheEnabled", JSON.stringify(value));
}

test.beforeEach(() => {
  resetStorage();
});

test.after(() => {
  resetStorage();
});

test("the flag defaults to enabled", () => {
  assert.equal(settingsDb.isSemanticCacheDbEnabled(), true);
});

test("repeated reads run no SQL after the first", () => {
  settingsDb.isSemanticCacheDbEnabled();

  const db = core.getDbInstance() as unknown as { prepare: (sql: string) => unknown };
  const realPrepare = db.prepare.bind(db);
  let prepared = 0;
  db.prepare = (sql: string) => {
    prepared += 1;
    return realPrepare(sql);
  };
  try {
    for (let i = 0; i < 100; i++) settingsDb.isSemanticCacheDbEnabled();
  } finally {
    db.prepare = realPrepare;
  }

  assert.equal(prepared, 0, "each read re-queried the settings tables");
});

test("a dashboard toggle takes effect on the next read", () => {
  assert.equal(settingsDb.isSemanticCacheDbEnabled(), true);

  settingsDb.updateDatabaseSettings({ cache: { semanticCacheEnabled: false } } as never);
  assert.equal(settingsDb.isSemanticCacheDbEnabled(), false, "a disabled cache stayed enabled");

  settingsDb.updateDatabaseSettings({ cache: { semanticCacheEnabled: true } } as never);
  assert.equal(settingsDb.isSemanticCacheDbEnabled(), true);
});

test("a database reset drops the cached flag", () => {
  settingsDb.updateDatabaseSettings({ cache: { semanticCacheEnabled: false } } as never);
  assert.equal(settingsDb.isSemanticCacheDbEnabled(), false);

  // Another database is swapped in (restore, tests). The cached value belongs to the old one.
  writeFlagDirectly(true);
  core.resetDbInstance();

  assert.equal(settingsDb.isSemanticCacheDbEnabled(), true);
});

test("an out-of-band write is picked up once the cache window ends", (t) => {
  t.mock.timers.enable({ apis: ["Date"], now: Date.now() });
  assert.equal(settingsDb.isSemanticCacheDbEnabled(), true);

  writeFlagDirectly(false);
  t.mock.timers.tick(5_001);

  assert.equal(settingsDb.isSemanticCacheDbEnabled(), false);
});
