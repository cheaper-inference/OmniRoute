// Unit tests for the self-service authentication gate shared by the /v1/me/quota and
// /v1/me/usage routes: flag, header credentials, key validation, key metadata and scope.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-self-service-auth-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-secret-at-least-32-chars-long-0123456789";

const core = await import("../../src/lib/db/core.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const { SELF_USAGE_SCOPE } = await import("../../src/shared/constants/selfServiceScopes.ts");
const { authenticateSelfServiceRequest } = await import("../../src/server/selfService/auth.ts");

test.after(() => {
  delete process.env.QUOTA_SELF_PANEL;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

let scoped = { id: "", key: "" };
let unscoped = { id: "", key: "" };

test.before(async () => {
  const a = await apiKeysDb.createApiKey("self-service-scoped", "test-machine", [SELF_USAGE_SCOPE]);
  const b = await apiKeysDb.createApiKey("self-service-unscoped", "test-machine", []);
  scoped = { id: a.id, key: a.key };
  unscoped = { id: b.id, key: b.key };
});

test.beforeEach(() => {
  process.env.QUOTA_SELF_PANEL = "true";
});

const bearer = (k: string) => ({ Authorization: `Bearer ${k}` });
const req = (headers: Record<string, string> = {}, ip = "203.0.113.9") =>
  new Request("http://localhost/api/v1/me/usage", {
    headers: { "x-forwarded-for": ip, ...headers },
  });
const status = async (r: Request) => {
  const a = await authenticateSelfServiceRequest(r);
  return a.ok ? 200 : a.response.status;
};

async function assertRefusal(r: Request, expectedStatus: number, expectedMessage: string) {
  const a = await authenticateSelfServiceRequest(r);
  if (a.ok) assert.fail(`expected ${expectedStatus}`);
  assert.equal(a.response.status, expectedStatus);
  assert.equal(a.response.headers.get("Cache-Control"), "no-store");
  const raw = await a.response.text();
  assert.equal(JSON.parse(raw).error.message, expectedMessage);
  assert.ok(!raw.includes("at /"), `stack trace leaked: ${raw}`);
}

test("flag off answers 404 before any credential is read", async () => {
  delete process.env.QUOTA_SELF_PANEL;
  await assertRefusal(req(bearer(scoped.key)), 404, "Not found");
  await assertRefusal(req(), 404, "Not found");
});

test("a missing key is 401", async () => {
  assert.equal(await status(req()), 401);
});

test("an invalid key is 401 no matter how many times one address sends it", async () => {
  const seen: number[] = [];
  for (let i = 0; i < 7; i++) seen.push(await status(req(bearer("sk-bad-repeated"))));
  assert.deepEqual(seen, [401, 401, 401, 401, 401, 401, 401]);
  assert.equal(await status(req(bearer(scoped.key))), 200);
});

test("a valid scoped Bearer key authenticates as that key", async () => {
  const a = await authenticateSelfServiceRequest(req(bearer(scoped.key)));
  if (!a.ok) assert.fail(`expected success, got ${a.response.status}`);
  assert.equal(a.key.id, scoped.id);
  assert.deepEqual(a.key.scopes, [SELF_USAGE_SCOPE]);
});

test("the environment key and a key without self:usage are refused", async () => {
  process.env.OMNIROUTE_API_KEY = "sk-env-self-service-test";
  try {
    assert.equal(await status(req(bearer("sk-env-self-service-test"))), 401);
  } finally {
    delete process.env.OMNIROUTE_API_KEY;
  }
  assert.equal(await status(req(bearer(unscoped.key))), 403);
});

test("an invalid Bearer next to a valid x-api-key authenticates as the x-api-key key", async () => {
  const a = await authenticateSelfServiceRequest(
    req({ ...bearer("not-ours"), "x-api-key": scoped.key })
  );
  assert.ok(a.ok && a.key.id === scoped.id);
});

test("an invalid Bearer next to an invalid x-api-key is one 401", async () => {
  await assertRefusal(
    req({ ...bearer("not-ours"), "x-api-key": "also-not-ours" }),
    401,
    "Valid API key required"
  );
});

test("every refusal is a sanitized error body with Cache-Control: no-store", async () => {
  await assertRefusal(req(bearer("sk-bad")), 401, "Valid API key required");
  await assertRefusal(req(bearer(unscoped.key)), 403, "API key lacks the self:usage scope");
  delete process.env.QUOTA_SELF_PANEL;
  await assertRefusal(req(bearer("sk-bad")), 404, "Not found");
});
