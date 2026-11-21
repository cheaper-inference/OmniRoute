import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-auth-pool-reasons-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "auth-pool-reasons-test-secret";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const auth = await import("../../src/sse/services/auth.ts");

async function resetStorage() {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

async function seed(name: string, overrides: Record<string, unknown> = {}) {
  const created = await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name,
    apiKey: `sk-${name}`,
    isActive: true,
    testStatus: "active",
    providerSpecificData: {},
  });
  if (Object.keys(overrides).length > 0) {
    await providersDb.updateProviderConnection(created.id, overrides);
  }
  return created.id as string;
}

test.beforeEach(resetStorage);
test.after(async () => {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("an empty pool reports how many connections each filter class removed", async () => {
  await seed("cooled", { rateLimitedUntil: new Date(Date.now() + 60_000).toISOString() });
  await seed("cooled-too", { rateLimitedUntil: new Date(Date.now() + 90_000).toISOString() });
  await seed("banned", { testStatus: "banned" });
  const skipped = await seed("skipped");

  const result = await auth.getProviderCredentials("openai", skipped);

  assert.equal(result.allRateLimited, true);
  assert.deepEqual(result.rejectReasons, { excluded: 1, rateLimited: 2, terminalStatus: 1 });
});

test("reject reasons carry class names and counts only", async () => {
  const id = await seed("cooled", {
    rateLimitedUntil: new Date(Date.now() + 60_000).toISOString(),
  });

  const result = await auth.getProviderCredentials("openai");

  assert.deepEqual(result.rejectReasons, { rateLimited: 1 });
  assert.ok(!JSON.stringify(result.rejectReasons).includes(id), "no connection id in the summary");
});
