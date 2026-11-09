import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-models-unreachable-4843-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const providerModelsRoute = await import("../../src/app/api/providers/[id]/models/route.ts");

const originalFetch = globalThis.fetch;

function resetStorage() {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

async function seedConnection(provider: string, apiKey: string) {
  return providersDb.createProviderConnection({
    provider,
    authType: "apikey",
    name: `${provider}-${Math.random().toString(16).slice(2, 8)}`,
    apiKey,
    isActive: true,
    testStatus: "active",
    providerSpecificData: { autoFetchModels: true },
  });
}

async function callRoute(connectionId: string) {
  return providerModelsRoute.GET(
    new Request(`http://localhost/api/providers/${connectionId}/models`),
    { params: { id: connectionId } }
  );
}

function networkFailure(code: string) {
  return Object.assign(new TypeError("fetch failed"), {
    cause: Object.assign(new Error(`connect ${code} 203.0.113.7:443`), { code }),
  });
}

function assertNoLeak(raw: string) {
  assert.doesNotMatch(raw, /\n\s+at\s/, "response must not carry a stack trace");
  assert.doesNotMatch(raw, /"stack"|"cause"/, "response must not carry stack/cause fields");
  assert.doesNotMatch(raw, /203\.0\.113\.7/, "response must not carry the raw socket cause");
}

test.beforeEach(() => {
  resetStorage();
});

test.after(() => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("#4843 unreachable upstream without a fallback catalog answers 502 UPSTREAM_UNREACHABLE", async () => {
  // clarifai has a remote /models endpoint and no registry/static catalog,
  // so a network failure has nothing to degrade to.
  for (const code of ["ECONNREFUSED", "ENOTFOUND", "CERT_HAS_EXPIRED"]) {
    const connection = await seedConnection("clarifai", "clarifai-key");
    let calls = 0;
    globalThis.fetch = async () => {
      calls++;
      throw networkFailure(code);
    };

    const response = await callRoute(connection.id);
    const raw = await response.text();

    assert.ok(calls >= 1, `${code}: upstream should have been attempted`);
    assert.equal(response.status, 502, `${code}: expected 502, got ${response.status} ${raw}`);
    const body = JSON.parse(raw);
    assert.equal(body.code, "UPSTREAM_UNREACHABLE");
    assert.match(body.error, /^Failed to fetch models/);
    assertNoLeak(raw);
  }
});

test("#4843 upstream timeout without a fallback catalog still answers 504", async () => {
  const connection = await seedConnection("clarifai", "clarifai-key");
  globalThis.fetch = async () => {
    throw Object.assign(new Error("The operation was aborted"), { name: "AbortError" });
  };

  const response = await callRoute(connection.id);
  const raw = await response.text();

  assert.equal(response.status, 504, raw);
  assert.ok(JSON.parse(raw).error);
  assertNoLeak(raw);
});

test("#4843 timeout response does not echo the query-string API key", async () => {
  // gemini passes the key as `?key=` — the timeout message embeds the URL.
  const connection = await seedConnection("gemini", "gm-secret-4843");
  globalThis.fetch = async () => {
    throw Object.assign(new Error("The operation was aborted"), { name: "AbortError" });
  };

  const response = await callRoute(connection.id);
  const raw = await response.text();

  assert.equal(response.status, 504, raw);
  assert.doesNotMatch(raw, /gm-secret-4843/);
  assertNoLeak(raw);
});

test("#4843 unreachable upstream still degrades to the local catalog when one exists", async () => {
  const connection = await seedConnection("groq", "groq-key");
  globalThis.fetch = async () => {
    throw networkFailure("ECONNREFUSED");
  };

  const response = await callRoute(connection.id);
  const body = (await response.json()) as { source?: string; warning?: string; models?: unknown[] };

  assert.equal(response.status, 200);
  assert.equal(body.source, "local_catalog");
  assert.match(String(body.warning), /local catalog/i);
  assert.ok(Array.isArray(body.models));
  assert.notEqual(body.models.length, 0);
});
