// #16380 — a 401 whose body attributes the failure to the MODEL ("Model X is
// not supported", e.g. an opencode/OpenAI-compat upstream that delisted the
// model) must lock only that model, not cool the whole connection — and it
// must lock it at all, so the auto-combo candidate filters (isModelLocked)
// stop re-selecting the dead member on the next request. Mirrors the #15633
// 404 model_not_found precedent (tests/unit/15633-groq-404-model-scope.test.ts).
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-16380-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const auth = await import("../../src/sse/services/auth.ts");
const { isModelUnsupported401 } =
  await import("../../open-sse/services/accountFallback/perModelFailureScope.ts");
const { isModelLocked, clearAllModelLockouts } =
  await import("../../open-sse/services/accountFallback.ts");

const NOT_SUPPORTED =
  '{"error":{"message":"Model deepseek-v4-flash-free is not supported","type":"invalid_request_error"}}';
const MODEL = "deepseek-v4-flash-free";

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

async function makeConn() {
  core.resetDbInstance();
  // The lockout registry is module-level and outlives resetDbInstance(), and a
  // fresh DB re-issues the same connection id — clear it or test 1's lock
  // bleeds into the later tests' fresh connections.
  clearAllModelLockouts();
  return (await providersDb.createProviderConnection({
    provider: "opencode",
    authType: "apikey",
    apiKey: "oc-key",
    isActive: true,
    testStatus: "active",
  })) as { id: string };
}

test("a 401 model-not-supported locks the model and keeps the connection active", async () => {
  const conn = await makeConn();
  await auth.markAccountUnavailable(conn.id, 401, NOT_SUPPORTED, "opencode", MODEL);

  const after = await providersDb.getProviderConnectionById(conn.id);
  assert.ok(!after.rateLimitedUntil, `connection cooled until ${after.rateLimitedUntil}`);
  assert.equal(after.testStatus, "active", "the key itself is fine — only the model is gone");
  assert.equal(
    isModelLocked("opencode", conn.id, MODEL),
    true,
    "the dead model must be locked so auto-combo candidate filters exclude it"
  );
});

test("the same connection still serves its sibling models", async () => {
  const conn = await makeConn();
  await auth.markAccountUnavailable(conn.id, 401, NOT_SUPPORTED, "opencode", MODEL);

  const sibling = await auth.getProviderCredentials("opencode", null, null, "openai/glm-5.3");
  assert.ok(
    sibling && !("allRateLimited" in (sibling as object)),
    "sibling model must get credentials on the same connection"
  );
});

test("a 401 without model wording keeps today's connection-level handling (unchanged)", async () => {
  const conn = await makeConn();
  await auth.markAccountUnavailable(conn.id, 401, '{"error":"invalid api key"}', "opencode", MODEL);

  const after = await providersDb.getProviderConnectionById(conn.id);
  assert.equal(
    after.testStatus,
    "expired",
    "an auth-key 401 keeps the existing connection-level handling"
  );
  assert.equal(isModelLocked("opencode", conn.id, MODEL), false);
});

test("isModelUnsupported401 matches model wording only on 401", () => {
  assert.equal(isModelUnsupported401(401, NOT_SUPPORTED), true);
  assert.equal(
    isModelUnsupported401(401, "Model qwen3.x-32b is not supported for format oa-compat"),
    true
  );
  assert.equal(isModelUnsupported401(401, '{"error":"invalid api key"}'), false);
  assert.equal(isModelUnsupported401(400, NOT_SUPPORTED), false);
  assert.equal(isModelUnsupported401(403, NOT_SUPPORTED), false);
  assert.equal(isModelUnsupported401(undefined, NOT_SUPPORTED), false);
});
