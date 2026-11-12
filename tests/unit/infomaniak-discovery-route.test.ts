import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// Infomaniak discovery: a connection stored under the alias (imk) must take the live /models
// branch, and a non-https Base URL must be refused before any request carries the key.

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-infomaniak-models-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const modelsRoute = await import("../../src/app/api/providers/[id]/models/route.ts");

const BASE_URL = "https://api.infomaniak.com/2/ai/12345/openai/v1";
const originalFetch = globalThis.fetch;

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.afterEach(() => {
  globalThis.fetch = originalFetch;
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

for (const provider of ["infomaniak", "imk"]) {
  test(`infomaniak discovery fetches <baseUrl>/models for a connection stored as ${provider}`, async () => {
    await resetStorage();
    const connection = await providersDb.createProviderConnection({
      provider,
      authType: "apikey",
      name: `imk-${provider}`,
      apiKey: `key-${provider}`,
      providerSpecificData: { baseUrl: BASE_URL, autoFetchModels: true },
    });
    const urls: string[] = [];
    globalThis.fetch = (async (url: unknown) => {
      urls.push(String(url));
      return Response.json({ data: [{ id: "google/gemma-4-31B-it" }] });
    }) as typeof fetch;

    const response = await modelsRoute.GET(
      new Request(`http://localhost/api/providers/${connection.id}/models`),
      { params: { id: connection.id } }
    );

    assert.equal(response.status, 200);
    assert.deepEqual(urls, [`${BASE_URL}/models`]);
  });
}

test("infomaniak discovery refuses an http Base URL without a request", async () => {
  await resetStorage();
  const connection = await providersDb.createProviderConnection({
    provider: "imk",
    authType: "apikey",
    name: "imk-http",
    apiKey: "key-http",
    providerSpecificData: {
      baseUrl: BASE_URL.replace("https://", "http://"),
      autoFetchModels: true,
    },
  });
  let calls = 0;
  globalThis.fetch = (async () => {
    calls += 1;
    return Response.json({ data: [] });
  }) as typeof fetch;

  const response = await modelsRoute.GET(
    new Request(`http://localhost/api/providers/${connection.id}/models`),
    { params: { id: connection.id } }
  );

  assert.equal(response.status, 400);
  assert.equal(calls, 0);
});
