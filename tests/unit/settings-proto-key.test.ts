/**
 * A `settings` row whose key is `__proto__` must survive as an OWN settings key.
 *
 * Two things conspire against it on the read path: the key starts with `_`, so
 * the internal-row filter drops it, and a plain `settings[key] = value` would
 * run the `__proto__` setter and make the row the object's prototype instead
 * of a property (invisible to `Object.entries`, so an export loses it).
 *
 * Reachable through `POST /api/settings/import-json`, whose body is parsed JSON
 * — an object literal `{ __proto__: … }` does not create the key either.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-settings-proto-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.OMNIROUTE_DISABLE_REDIS_AUTH_CACHE = "1";
process.env.JWT_SECRET = "settings-proto-jwt-secret";

const core = await import("../../src/lib/db/core.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const { invalidateDbCache } = await import("../../src/lib/db/readCache.ts");
const importJsonRoute = await import("../../src/app/api/settings/import-json/route.ts");

test.beforeEach(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  invalidateDbCache();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

/** Import a `settings` object that already carries `__proto__` as an own key. */
async function importParsedSettings(settingsJson: string) {
  const response = await importJsonRoute.POST(
    new Request("http://localhost:20128/api/settings/import-json", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: `{"settings":${settingsJson}}`,
    })
  );
  assert.equal(response.status, 200, await response.clone().text());
  invalidateDbCache();
}

test("a __proto__ settings row survives as an own key", async () => {
  await importParsedSettings('{"__proto__":{"sessionsValidAfter":9999999999}}');

  const settings = (await settingsDb.getSettings()) as Record<string, unknown>;

  assert.equal(Object.hasOwn(settings, "__proto__"), true);
  assert.deepEqual(settings.__proto__, { sessionsValidAfter: 9999999999 });
});

test("a __proto__ row does not become the settings prototype", async () => {
  await importParsedSettings('{"__proto__":{"requireLogin":false}}');

  const settings = (await settingsDb.getSettings()) as Record<string, unknown>;

  assert.equal(Object.getPrototypeOf(settings), Object.prototype);
  // `requireLogin` is a default, so its own value keeps winning either way.
  assert.equal(settings.requireLogin, true);
  // ...and the imported row is data, not an inherited override.
  assert.deepEqual(settings.__proto__, { requireLogin: false });
});

test("an internal _ row is still dropped", async () => {
  await importParsedSettings('{"_revision":42,"systemPrompt":{"prefixPrompt":"hello"}}');

  const settings = (await settingsDb.getSettings()) as Record<string, unknown>;

  assert.equal(Object.hasOwn(settings, "_revision"), false);
  assert.deepEqual(settings.systemPrompt, { prefixPrompt: "hello" });
});
