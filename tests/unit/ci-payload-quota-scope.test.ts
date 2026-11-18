import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const directory = fs.mkdtempSync(path.join(os.tmpdir(), "omni-ci-upload-quota-"));
process.env.DATA_DIR = directory;
process.env.API_KEY_SECRET ||= "ci-upload-quota-scope-test-secret";
const core = await import("../../src/lib/db/core.ts");
const providers = await import("../../src/lib/db/providers.ts");
const auth = await import("../../src/sse/services/auth.ts");
const fallback = await import("../../open-sse/services/accountFallback.ts");
test.after(() => {
  core.resetDbInstance();
  fs.rmSync(directory, { recursive: true, force: true });
});

test("CI upload quota preserves the request error without benching a healthy model", async () => {
  const connection = await providers.createProviderConnection({
    provider: "cheaperinference",
    authType: "apikey",
    name: "upload-quota-fixture",
    apiKey: "fixture",
    isActive: true,
    testStatus: "valid",
  });
  const result = await auth.markAccountUnavailable(
    connection.id,
    429,
    "Too many payload uploads. Wait for an upload to finish or expire.",
    "cheaperinference",
    "claude-opus-5.5",
    null,
    { structuredError: { code: "payload_upload_quota", type: "rate_limit_error" } }
  );
  assert.deepEqual(result, { shouldFallback: false, cooldownMs: 0 });
  assert.equal(fallback.isModelLocked("cheaperinference", connection.id, "claude-opus-5.5"), false);
  const after = await providers.getProviderConnectionById(connection.id);
  assert.equal(after.isActive, true);
  assert.ok(!after.rateLimitedUntil);
});

test("only the structured CI transport quota bypasses model health tracking", async () => {
  const { isCIPayloadQuotaFailure } =
    await import("../../src/sse/services/ciPayloadQuotaFailure.ts");
  assert.equal(isCIPayloadQuotaFailure("cinf", 429, "payload_upload_quota"), true);
  assert.equal(isCIPayloadQuotaFailure("openai", 429, "payload_upload_quota"), false);
  assert.equal(isCIPayloadQuotaFailure("cheaperinference", 503, "payload_upload_quota"), false);
  assert.equal(isCIPayloadQuotaFailure("cheaperinference", 429, "rate_limit_exceeded"), false);
  assert.equal(isCIPayloadQuotaFailure("cheaperinference", 429, undefined), false);
});
