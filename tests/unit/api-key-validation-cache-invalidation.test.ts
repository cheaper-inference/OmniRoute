import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { cleanupTempDataDir } from "../_setup/tempDataDir.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omr-apikey-cache-inval-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-secret";

const core = await import("../../src/lib/db/core.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const { setSsoKeyActive } = await import("../../src/lib/db/ssoIdentities.ts");

test.beforeEach(() => {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
});

test.after(async () => {
  await cleanupTempDataDir(TEST_DATA_DIR);
});

// Prime the 60 s validation cache with a passing check, change the key, check again.
async function primedKey() {
  const created = await apiKeysDb.createApiKey("cache-inval", "machine-cache-inval");
  assert.equal(await apiKeysDb.validateApiKey(created.key), true);
  return created;
}

test("revokeApiKey drops a cached pass", async () => {
  const created = await primedKey();
  await apiKeysDb.revokeApiKey(created.id);
  assert.equal(await apiKeysDb.validateApiKey(created.key), false);
});

test("deleteApiKey drops a cached pass", async () => {
  const created = await primedKey();
  await apiKeysDb.deleteApiKey(created.id);
  assert.equal(await apiKeysDb.validateApiKey(created.key), false);
});

test("updateApiKeyPermissions isActive:false drops a cached pass", async () => {
  const created = await primedKey();
  await apiKeysDb.updateApiKeyPermissions(created.id, { isActive: false });
  assert.equal(await apiKeysDb.validateApiKey(created.key), false);
});

test("updateApiKeyPermissions isBanned:true drops a cached pass", async () => {
  const created = await primedKey();
  await apiKeysDb.updateApiKeyPermissions(created.id, { isBanned: true });
  assert.equal(await apiKeysDb.validateApiKey(created.key), false);
});

test("setApiKeyExpiry in the past drops a cached pass", async () => {
  const created = await primedKey();
  await apiKeysDb.setApiKeyExpiry(created.id, new Date(Date.now() - 60_000).toISOString());
  assert.equal(await apiKeysDb.validateApiKey(created.key), false);
});

test("regenerateApiKey drops a cached pass for the old secret", async () => {
  const created = await primedKey();
  await apiKeysDb.regenerateApiKey(created.id);
  assert.equal(await apiKeysDb.validateApiKey(created.key), false);
});

test("setSsoKeyActive(false) drops a cached pass", async () => {
  const created = await primedKey();
  assert.equal(setSsoKeyActive(created.id, false), true);
  assert.equal(await apiKeysDb.validateApiKey(created.key), false);
});
