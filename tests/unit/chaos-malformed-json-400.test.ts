/**
 * Regression tests: POST /api/chaos/run and POST /api/skills/collect/chaos must answer 400
 * (not 500) when the request body is not JSON.
 *
 * Before the fix both handlers read the body with `await request.json()` inside the try whose
 * catch answers 500, so a body that is not JSON came back as a 500 that carried the parser's
 * message. A well-formed body keeps its existing behavior.
 *
 * Setup mirrors tests/unit/chaos-api-routes.test.ts: a temp DATA_DIR, no configured password so
 * the management routes are not gated, Chaos Mode enabled in the stored config, and an API key
 * with `chaosModeEnabled` for the external route.
 */
import test, { mock } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-chaos-json-400-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
const ORIGINAL_API_KEY_SECRET = process.env.API_KEY_SECRET;
const ORIGINAL_INITIAL_PASSWORD = process.env.INITIAL_PASSWORD;

process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET ?? "chaos-json-400-test-secret";

const core = await import("../../src/lib/db/core.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const chaosConfig = await import("../../src/lib/chaos/chaosConfig.ts");
const runRoute = await import("../../src/app/api/chaos/run/route.ts");
const skillsChaosRoute = await import("../../src/app/api/skills/collect/chaos/route.ts");

async function resetStorage() {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  chaosConfig.invalidateChaosConfigCache();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  delete process.env.INITIAL_PASSWORD;
}

function postRequest(url: string, body: string, headers: Record<string, string> = {}) {
  return new Request(url, {
    method: "POST",
    headers: { "content-type": "application/json", ...headers },
    body,
  });
}

async function enableChaos() {
  await chaosConfig.setChaosConfig({
    enabled: true,
    defaultMode: "parallel",
    providerOverrides: [],
    timeoutMs: 120_000,
    maxTokens: 4096,
  });
}

async function chaosKeyHeader() {
  const created = await apiKeysDb.createApiKey("Chaos Key", "machine-chaos-json-400");
  await apiKeysDb.updateApiKeyPermissions(created.id, { chaosModeEnabled: true });
  apiKeysDb.clearApiKeyCaches();
  return { Authorization: `Bearer ${created.key}` };
}

test.beforeEach(async () => {
  await resetStorage();
});

test.afterEach(() => {
  mock.restoreAll();
});

test.after(() => {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  if (ORIGINAL_DATA_DIR === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  if (ORIGINAL_API_KEY_SECRET === undefined) delete process.env.API_KEY_SECRET;
  else process.env.API_KEY_SECRET = ORIGINAL_API_KEY_SECRET;
  if (ORIGINAL_INITIAL_PASSWORD === undefined) delete process.env.INITIAL_PASSWORD;
  else process.env.INITIAL_PASSWORD = ORIGINAL_INITIAL_PASSWORD;
});

test("POST /api/chaos/run — a body that is not JSON answers 400", async () => {
  await enableChaos();
  const res = await runRoute.POST(postRequest("http://localhost/api/chaos/run", "not-json"));
  assert.equal(res.status, 400);
  const body = (await res.json()) as { error: { message: string } };
  assert.equal(body.error.message, "Invalid JSON body");
});

test("POST /api/chaos/run — a well-formed but invalid body still answers 400", async () => {
  await enableChaos();
  const res = await runRoute.POST(postRequest("http://localhost/api/chaos/run", "{}"));
  assert.equal(res.status, 400);
});

test("POST /api/skills/collect/chaos — a body that is not JSON answers 400", async () => {
  await enableChaos();
  const res = await skillsChaosRoute.POST(
    postRequest("http://localhost/api/skills/collect/chaos", "not-json", await chaosKeyHeader())
  );
  assert.equal(res.status, 400);
  const body = (await res.json()) as { error: { message: string } };
  assert.equal(body.error.message, "Invalid JSON body");
});

test("POST /api/skills/collect/chaos — a well-formed but invalid body still answers 400", async () => {
  await enableChaos();
  const res = await skillsChaosRoute.POST(
    postRequest("http://localhost/api/skills/collect/chaos", "{}", await chaosKeyHeader())
  );
  assert.equal(res.status, 400);
});
