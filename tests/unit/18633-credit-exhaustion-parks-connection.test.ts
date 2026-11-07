import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-18633-credit-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const auth = await import("../../src/sse/services/auth.ts");
const accountFallback = await import("../../open-sse/services/accountFallback.ts");
const { classify429 } = await import("../../src/shared/utils/classify429.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("combo 429 insufficient account balance parks the zai connection across models", async () => {
  const empty = await providersDb.createProviderConnection({
    provider: "zai",
    authType: "apikey",
    apiKey: "test-empty-account",
    isActive: true,
    testStatus: "active",
  });
  const live = await providersDb.createProviderConnection({
    provider: "zai",
    authType: "apikey",
    apiKey: "test-live-account",
    isActive: true,
    testStatus: "active",
  });
  const errorText = JSON.stringify({
    error: { code: "1113", message: "Insufficient account balance" },
  });
  const failureKind = classify429({ status: 429, body: errorText });

  // Mirror chat.ts: combos do not persist transient 429 connection cooldowns.
  const result = await auth.markAccountUnavailable(
    empty.id,
    429,
    errorText,
    "zai",
    "glm-4.7",
    null,
    {
      isCombo: true,
      persistUnavailableState: !(failureKind === "rate_limit" || failureKind === "transient"),
    }
  );

  assert.equal(result.shouldFallback, true);
  const after = await providersDb.getProviderConnectionById(empty.id);
  assert.equal(after.testStatus, "credits_exhausted");
  assert.equal(
    after.rateLimitedUntil == null,
    true,
    "terminal exhaustion must not expire as a cooldown"
  );
  assert.equal(accountFallback.getModelLockoutInfo("zai", empty.id, "glm-4.7"), null);

  const selected = await auth.getProviderCredentials("zai", null, null, "glm-5.1");
  assert.ok(selected);
  assert.equal(selected.connectionId, live.id, "sibling models must skip the empty account");
});
