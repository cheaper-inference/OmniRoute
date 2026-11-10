import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-jzstoken-catalog-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const modelsDb = await import("../../src/lib/db/models.ts");
const providerModelsRoute = await import("../../src/app/api/providers/[id]/models/route.ts");

const originalFetch = globalThis.fetch;

async function resetStorage() {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

async function seedConnection(name: string) {
  return providersDb.createProviderConnection({
    provider: "jzstoken",
    authType: "apikey",
    name,
    apiKey: `${name}-key`,
    isActive: true,
    testStatus: "active",
    providerSpecificData: { autoFetchModels: false },
  });
}

async function callSelector(connectionId: string) {
  return providerModelsRoute.GET(
    new Request(
      `http://localhost/api/providers/${connectionId}/models?chatOnly=true&refresh=false`
    ),
    { params: { id: connectionId } }
  );
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("jzstoken connection-test selector does not borrow another key's synced models", async () => {
  const standard = await seedConnection("standard");
  const dedicated = await seedConnection("dedicated");
  await modelsDb.replaceSyncedAvailableModelsForConnection("jzstoken", standard.id, [
    { id: "gpt-5.6-terra", name: "GPT 5.6 Terra" },
  ]);
  let fetches = 0;
  globalThis.fetch = async () => {
    fetches += 1;
    throw new Error("jzstoken selector must not fetch");
  };

  const empty = await callSelector(dedicated.id);
  const emptyBody = await empty.json();
  const stored = await providersDb.getProviderConnectionById(dedicated.id);

  assert.equal(empty.status, 200);
  assert.equal(emptyBody.source, "local_catalog");
  assert.equal(emptyBody.intentional, true);
  assert.deepEqual(emptyBody.models, []);
  assert.match(String(emptyBody.warning), /Auto-fetch disabled/);
  assert.equal(emptyBody.degraded, undefined);
  assert.equal(fetches, 0);
  assert.equal(stored?.providerSpecificData?.autoFetchModels, false);

  const cached = await callSelector(standard.id);
  const cachedBody = await cached.json();
  assert.equal(cached.status, 200);
  assert.equal(cachedBody.source, "cache");
  assert.deepEqual(
    cachedBody.models.map((model: { id: string }) => model.id),
    ["gpt-5.6-terra"]
  );
  assert.equal(fetches, 0);
});
