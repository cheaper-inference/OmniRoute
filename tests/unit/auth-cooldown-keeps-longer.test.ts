import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-auth-cooldown-max-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "auth-cooldown-max-test-secret";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const auth = await import("../../src/sse/services/auth.ts");

const FIVE_HOURS_S = 5 * 60 * 60;

async function resetStorage() {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

/** A connection that a shorter transient failure already cooled for `shortMs`. */
async function seedCooled(shortMs: number) {
  const created = await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "cooled",
    apiKey: "sk-cooled",
    isActive: true,
    testStatus: "active",
    providerSpecificData: {},
  });
  await providersDb.updateProviderConnection(created.id, {
    rateLimitedUntil: new Date(Date.now() + shortMs).toISOString(),
    backoffLevel: 1,
    testStatus: "unavailable",
  });
  return created.id as string;
}

const remainingMs = async (id: string) => {
  const row = await providersDb.getProviderConnectionById(id);
  return new Date(row.rateLimitedUntil).getTime() - Date.now();
};

test.beforeEach(resetStorage);
test.after(async () => {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("a 429 with a long upstream reset replaces a shorter active cooldown", async () => {
  const id = await seedCooled(5_000);

  const result = await auth.markAccountUnavailable(
    id,
    429,
    "rate limit exceeded",
    "openai",
    "gpt-4o",
    null,
    { headers: new Headers({ "retry-after": String(FIVE_HOURS_S) }) }
  );

  assert.ok(result.cooldownMs > 4 * 60 * 60 * 1000, `returned cooldown ${result.cooldownMs}`);
  assert.ok((await remainingMs(id)) > 4 * 60 * 60 * 1000, "stored cooldown grew to the 5 h reset");
  const row = await providersDb.getProviderConnectionById(id);
  assert.equal(row.backoffLevel, 1, "growing the cooldown does not bump the backoff level");
});

test("a shorter transient failure never shrinks a longer active cooldown", async () => {
  const id = await seedCooled(2 * 60 * 60 * 1000);

  await auth.markAccountUnavailable(id, 429, "rate limit exceeded", "openai", "gpt-4o", null, {
    headers: new Headers({ "retry-after": "10" }),
  });
  await auth.markAccountUnavailable(id, 500, "boom", "openai", "gpt-4o");

  assert.ok((await remainingMs(id)) > 90 * 60 * 1000, "the 2 h cooldown is kept");
  const row = await providersDb.getProviderConnectionById(id);
  assert.equal(row.backoffLevel, 1);
});

test("a transient failure does not extend an active cooldown", async () => {
  const id = await seedCooled(1_000);

  await auth.markAccountUnavailable(id, 500, "boom", "openai", "gpt-4o");

  assert.ok((await remainingMs(id)) <= 1_000, "no upstream reset hint, so the window is unchanged");
  const row = await providersDb.getProviderConnectionById(id);
  assert.equal(row.backoffLevel, 1, "no double backoff increment");
});
