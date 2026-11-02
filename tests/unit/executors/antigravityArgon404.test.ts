import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-argon-404-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-argon-404-secret";

const core = await import("../../../src/lib/db/core.ts");
const { AntigravityExecutor } = await import("../../../open-sse/executors/antigravity.ts");
const { markAccountUnavailable } = await import("../../../src/sse/services/auth.ts");
const { createProviderConnection, getProviderConnectionById } =
  await import("../../../src/lib/db/providers.ts");
const { isModelLocked, clearAllModelLockouts } =
  await import("../../../open-sse/services/accountFallback.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("AntigravityExecutor.shouldRetry returns false on 404 for Argon models", () => {
  const executor = new AntigravityExecutor();

  assert.equal(executor.shouldRetry(404, 0, "gemini-4-argon"), false);
  assert.equal(executor.shouldRetry(404, 0, "antigravity/gemini-4-argon-high"), false);
  assert.equal(executor.shouldRetry(404, 0, "gemini-4-argon-low"), false);
});

test("AntigravityExecutor.shouldRetry returns true on 429 for Argon models when fallback URLs exist", () => {
  const executor = new AntigravityExecutor();

  assert.equal(executor.shouldRetry(429, 0, "gemini-4-argon"), true);
});

test("AntigravityExecutor.shouldRetry returns true on 404 for non-Argon models when fallback URLs exist", () => {
  const executor = new AntigravityExecutor();

  assert.equal(executor.shouldRetry(404, 0, "gemini-3.8-flash"), true);
  assert.equal(executor.shouldRetry(404, 0), true);
});

test("markAccountUnavailable on 404 for Antigravity Argon model uses normal model-only lockout without permanent PSD exclusion", async () => {
  clearAllModelLockouts();

  const created = await createProviderConnection({
    provider: "antigravity",
    authType: "oauth",
    name: "argon-404-test-acct",
    email: "argon404@example.com",
    accessToken: "fake-access-token",
    refreshToken: "fake-refresh-token",
    isActive: true,
    providerSpecificData: {
      plan: "Pro",
      hasArgon: true,
      excludedModels: ["claude-3-haiku*"],
    },
  });
  const connectionId = String(created.id);

  const result = await markAccountUnavailable(
    connectionId,
    404,
    "Requested entity was not found.",
    "antigravity",
    "gemini-4-argon"
  );
  await new Promise((r) => setTimeout(r, 25));

  assert.equal(result.shouldFallback, true);
  assert.ok(result.cooldownMs > 0);
  assert.equal(isModelLocked("antigravity", connectionId, "gemini-4-argon"), true);
  assert.equal(isModelLocked("antigravity", connectionId, "gemini-3.8-flash"), false);

  const updated = await getProviderConnectionById(connectionId);
  assert.ok(updated);
  assert.equal(updated.backoffLevel || 0, 0);
  assert.equal(updated.rateLimitedUntil ?? null, null);
  assert.equal(Number(updated.errorCode), 404);
  assert.equal(updated.lastErrorType, "not_found");

  // Single 404 uses normal model lockout and does not permanently rewrite excludedModels
  const psd = (updated.providerSpecificData || {}) as Record<string, unknown>;
  assert.equal(psd.hasArgon, true);
  assert.equal(psd.plan, "Pro");
  assert.deepEqual(psd.excludedModels, ["claude-3-haiku*"]);
});
