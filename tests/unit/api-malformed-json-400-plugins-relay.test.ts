/**
 * Regression tests: POST /api/plugins and PATCH /api/relay/tokens/[id] must return 400
 * (not an unhandled error) on a malformed JSON request body.
 *
 * Before the fix both handlers called `await request.json()` with no try/catch, so a
 * body that is not JSON made the handler reject instead of answering. A malformed body
 * must surface as a clean 400, while a well-formed body keeps its existing behavior.
 *
 * DB setup mirrors tests/unit/api-malformed-json-400.test.ts: a temp DATA_DIR with no
 * configured password, so POST /api/plugins needs no login. PATCH /api/relay/tokens/[id]
 * always requires management auth, so its requests carry a manage-scoped API key, as in
 * tests/unit/relay-tokens-always-protected.test.ts, and target a seeded token. DB handles
 * are released in test.after (resetDbInstance), as unreleased SQLite handles hang the runner.
 */

import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-malformed-json-plugins-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
const ORIGINAL_API_KEY_SECRET = process.env.API_KEY_SECRET;
const ORIGINAL_INITIAL_PASSWORD = process.env.INITIAL_PASSWORD;

process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET ?? "malformed-json-plugins-test-secret";
delete process.env.INITIAL_PASSWORD;

const core = await import("../../src/lib/db/core.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const relayDb = await import("../../src/lib/db/relayProxies.ts");
const pluginsRoute = await import("../../src/app/api/plugins/route.ts");
const relayTokenRoute = await import("../../src/app/api/relay/tokens/[id]/route.ts");

function jsonRequest(url: string, method: string, body: string): Request {
  return new Request(url, {
    method,
    headers: { "content-type": "application/json" },
    body,
  });
}

const manageKey = await apiKeysDb.createApiKey("manage-malformed-json", "machine-relay", [
  "manage",
]);
const relayTokenId = relayDb.createRelayToken({ name: "malformed-json-target" }).id;
const relayUrl = `http://localhost/api/relay/tokens/${relayTokenId}`;
const relayParams = () => ({ params: Promise.resolve({ id: relayTokenId }) });

function managedJsonRequest(url: string, method: string, body: string): Request {
  const request = jsonRequest(url, method, body);
  request.headers.set("authorization", `Bearer ${manageKey.key}`);
  return request;
}

test.after(() => {
  apiKeysDb.resetApiKeyState();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  if (ORIGINAL_DATA_DIR === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  if (ORIGINAL_API_KEY_SECRET === undefined) delete process.env.API_KEY_SECRET;
  else process.env.API_KEY_SECRET = ORIGINAL_API_KEY_SECRET;
  if (ORIGINAL_INITIAL_PASSWORD !== undefined)
    process.env.INITIAL_PASSWORD = ORIGINAL_INITIAL_PASSWORD;
});

test("POST /api/plugins — malformed JSON body returns 400", async () => {
  const res = await pluginsRoute.POST(
    jsonRequest("http://localhost/api/plugins", "POST", "not-json") as never
  );
  assert.equal(res.status, 400);
});

test("POST /api/plugins — well-formed but invalid body still returns 400", async () => {
  const res = await pluginsRoute.POST(
    jsonRequest("http://localhost/api/plugins", "POST", JSON.stringify({})) as never
  );
  assert.equal(res.status, 400);
  const body = (await res.json()) as { error?: string };
  assert.equal(body.error, "Invalid request");
});

test("PATCH /api/relay/tokens/[id] — malformed JSON body returns 400", async () => {
  const res = await relayTokenRoute.PATCH(
    managedJsonRequest(relayUrl, "PATCH", "not-json") as never,
    relayParams()
  );
  assert.equal(res.status, 400);
  const body = (await res.json()) as { error?: string };
  assert.equal(body.error, "Invalid JSON body");
  assert.equal(relayDb.getRelayToken(relayTokenId)?.name, "malformed-json-target");
});

test("PATCH /api/relay/tokens/[id] — well-formed but empty update still returns 400", async () => {
  const res = await relayTokenRoute.PATCH(
    managedJsonRequest(relayUrl, "PATCH", JSON.stringify({})) as never,
    relayParams()
  );
  assert.equal(res.status, 400);
});

test("PATCH /api/relay/tokens/[id] — malformed JSON without credentials is still 401", async () => {
  const res = await relayTokenRoute.PATCH(
    jsonRequest(relayUrl, "PATCH", "not-json") as never,
    relayParams()
  );
  assert.equal(res.status, 401);
});
