// Unit tests for the self-service authentication gate shared by the /v1/me/quota and
// /v1/me/usage routes: flag, per-address lockout, header credentials, key metadata and scope.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-self-service-auth-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-secret-at-least-32-chars-long-0123456789";
delete process.env.OMNIROUTE_PEER_STAMP_TOKEN;

const core = await import("../../src/lib/db/core.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const { resetLoginGuardForTests } = await import("../../src/server/auth/loginGuard.ts");
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
  resetLoginGuardForTests();
});

const bearer = (k: string) => ({ Authorization: `Bearer ${k}` });
const req = (headers: Record<string, string> = {}, ip = "203.0.113.9") =>
  new Request("http://localhost/api/v1/me/usage", {
    headers: { "x-forwarded-for": ip, ...headers },
  });
const status = async (r: Request) => {
  const a = await authenticateSelfServiceRequest(r);
  return a.ok === true ? 200 : a.response.status;
};

test("flag off answers 404 before any credential is read", async () => {
  delete process.env.QUOTA_SELF_PANEL;
  const a = await authenticateSelfServiceRequest(req(bearer(scoped.key)));
  if (a.ok === true) assert.fail("expected refusal");
  assert.equal(a.response.status, 404);
  assert.equal((await a.response.json()).error.message, "Not found");
});

test("a missing key is 401 and never counts as a failed attempt", async () => {
  for (let i = 0; i < 7; i++) assert.equal(await status(req()), 401);
});

test("the fifth invalid key from one address is 429 with Retry-After; other addresses are unaffected", async () => {
  const seen: number[] = [];
  for (let i = 0; i < 6; i++) seen.push(await status(req(bearer(`sk-bad-${i}`))));
  assert.deepEqual(seen, [401, 401, 401, 401, 429, 429]);
  const locked = await authenticateSelfServiceRequest(req(bearer(scoped.key)));
  if (locked.ok === true) assert.fail("a locked address stays locked for a valid key");
  assert.ok(Number(locked.response.headers.get("Retry-After")) > 0);
  assert.equal(await status(req(bearer(scoped.key), "203.0.113.77")), 200);
});

test("a valid key does not reset the failure budget of its address", async () => {
  for (let i = 0; i < 4; i++) await status(req(bearer(`sk-bad-${i}`)));
  assert.equal(await status(req(bearer(scoped.key))), 200);
  assert.equal(await status(req(bearer("sk-bad-last"))), 429);
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

test("every refusal is a sanitized error body with Cache-Control: no-store", async () => {
  const a = await authenticateSelfServiceRequest(req(bearer("sk-bad")));
  if (a.ok === true) assert.fail("expected refusal");
  assert.equal(a.response.headers.get("Cache-Control"), "no-store");
  assert.equal((await a.response.json()).error.message, "Valid API key required");
});
