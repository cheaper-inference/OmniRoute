/**
 * validateApiKey(): an unknown key is remembered for a short time, so a client that loops on a
 * bad key does not cost one SQLite lookup (plus the legacy backfill scan) per request.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-apikey-negcache-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "synthetic-apikey-negcache-api-key-secret";
process.env.OMNIROUTE_DISABLE_REDIS_AUTH_CACHE = "1";

const core = await import("../../src/lib/db/core.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const { importApiKey } = await import("../../src/lib/db/apiKeyImport.ts");

const NEGATIVE_TTL_MS = 30_000;

type Stmt = { get: (...args: unknown[]) => unknown };
type PrepareDb = { prepare: (sql: string) => Stmt };

// Count reads of the auth statement (`... FROM api_keys WHERE key_hash = ?`).
let lookups = 0;
function countAuthLookups() {
  apiKeysDb.resetApiKeyState();
  const db = core.getDbInstance() as unknown as PrepareDb;
  const prepare = db.prepare.bind(db);
  db.prepare = (sql: string) => {
    const stmt = prepare(sql);
    if (sql.includes("is_banned FROM api_keys WHERE key_hash = ?")) {
      const get = stmt.get.bind(stmt);
      stmt.get = (...args: unknown[]) => {
        lookups++;
        return get(...args);
      };
    }
    return stmt;
  };
}

function unknownKey(n: number | string): string {
  return `sk-${"unknown"}${String(n).padStart(40, "0")}`;
}

await apiKeysDb.getApiKeys(); // first use creates the lazily-added columns
countAuthLookups();

test.beforeEach(() => {
  lookups = 0;
  apiKeysDb.clearApiKeyCaches();
});

test.after(() => {
  apiKeysDb.resetApiKeyState();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("an unknown key hits SQLite once, then is answered from memory", async () => {
  const key = unknownKey("a");
  assert.equal(await apiKeysDb.validateApiKey(key), false);
  const afterFirst = lookups;
  assert.ok(afterFirst > 0, "the first miss must read SQLite");

  for (let i = 0; i < 5; i++) assert.equal(await apiKeysDb.validateApiKey(key), false);
  assert.equal(lookups, afterFirst, "repeat checks must not read SQLite");
});

test("the unknown-key entry expires after 30 seconds", async () => {
  const key = unknownKey("b");
  const realNow = Date.now;
  let now = realNow();
  Date.now = () => now;
  try {
    assert.equal(await apiKeysDb.validateApiKey(key), false);
    const afterFirst = lookups;
    now += NEGATIVE_TTL_MS - 1;
    await apiKeysDb.validateApiKey(key);
    assert.equal(lookups, afterFirst, "still cached just before the TTL");
    now += 2;
    await apiKeysDb.validateApiKey(key);
    assert.ok(lookups > afterFirst, "re-checked after the TTL");
  } finally {
    Date.now = realNow;
  }
});

test("importing a key that was seen as unknown makes it valid at once", async () => {
  const key = `sk-${"imported"}${"1".repeat(40)}`;
  assert.equal(await apiKeysDb.validateApiKey(key), false);
  importApiKey({ name: "negcache-import", key } as never, "machine-negcache");
  assert.equal(await apiKeysDb.validateApiKey(key), true);
});

test("bypassCache neither reads nor writes the unknown-key entry", async () => {
  const key = unknownKey("c");
  assert.equal(await apiKeysDb.validateApiKey(key), false);
  const afterFirst = lookups;
  assert.equal(await apiKeysDb.validateApiKey(key, { bypassCache: true }), false);
  assert.ok(lookups > afterFirst, "bypassCache must read SQLite");
});

test("a flood of unknown keys does not evict a cached valid key", async () => {
  const created = await apiKeysDb.createApiKey("negcache-valid", "machine-negcache", []);
  assert.equal(await apiKeysDb.validateApiKey(created.key), true);

  for (let i = 0; i < 1500; i++) await apiKeysDb.validateApiKey(unknownKey(i));

  const before = lookups;
  assert.equal(await apiKeysDb.validateApiKey(created.key), true);
  assert.equal(lookups, before, "the valid key is still served from memory");
});
