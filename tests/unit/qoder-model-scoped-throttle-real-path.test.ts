// #18572 — a Qoder queue throttle (`503 upstream_busy`) must lock only the queued model through the
// real persisted-cooldown path (markAccountUnavailable), not park the whole connection.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-18572-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const auth = await import("../../src/sse/services/auth.ts");
const { clearAllModelLockouts } = await import("../../open-sse/services/accountFallback.ts");

const QUEUED_MODEL = "qwen3.8-max-preview";
const SIBLING_MODEL = "kimi-k3";
const QUEUED_BODY = JSON.stringify({
  error: {
    message: "Qoder queued the request for qwen3.8-max-preview — retry after 30s",
    type: "provider_error",
    code: "upstream_busy",
  },
});

test.after(() => {
  clearAllModelLockouts();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

async function makeConn() {
  core.resetDbInstance();
  clearAllModelLockouts();
  return (await providersDb.createProviderConnection({
    provider: "qoder",
    authType: "apikey",
    apiKey: "qoder-key",
    isActive: true,
    testStatus: "active",
  })) as { id: string };
}

test("qoder 503 upstream_busy does not cool the whole connection", async () => {
  const conn = await makeConn();
  await auth.markAccountUnavailable(conn.id, 503, QUEUED_BODY, "qoder", QUEUED_MODEL);

  const after = await providersDb.getProviderConnectionById(conn.id);
  assert.ok(!after.rateLimitedUntil, `connection cooled until ${after.rateLimitedUntil}`);
  assert.equal(after.testStatus, "active");

  const sibling = await auth.getProviderCredentials("qoder", null, null, SIBLING_MODEL);
  assert.ok(
    sibling && !("allRateLimited" in (sibling as object)),
    "a sibling model on the same Qoder connection must still get credentials"
  );
});

test("qoder 429 queue throttle also stays model-scoped", async () => {
  const conn = await makeConn();
  await auth.markAccountUnavailable(conn.id, 429, QUEUED_BODY, "qoder", QUEUED_MODEL);

  const after = await providersDb.getProviderConnectionById(conn.id);
  assert.ok(!after.rateLimitedUntil, `connection cooled until ${after.rateLimitedUntil}`);

  const sibling = await auth.getProviderCredentials("qoder", null, null, SIBLING_MODEL);
  assert.ok(sibling && !("allRateLimited" in (sibling as object)));
});
