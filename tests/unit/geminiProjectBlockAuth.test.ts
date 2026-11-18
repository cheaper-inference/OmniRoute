import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-gemini-project-block-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET ||= "gemini-project-block-ci-secret";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const auth = await import("../../src/sse/services/auth.ts");
const { runAsProbe } = await import("../../src/shared/utils/probeOrigin.ts");

const SIX_HOURS_MS = 6 * 60 * 60 * 1000;

const FREE_TIER_REFUSAL =
  "The Gemini API free tier is not available for this project. To use the Gemini API, please set up billing.";

async function createConnection(
  existingCooldownMs = 0,
  overrides: { provider?: string; providerSpecificData?: Record<string, unknown> } = {}
) {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });

  const connection = await providersDb.createProviderConnection({
    provider: "gemini",
    authType: "apikey",
    apiKey: "gemini-project-block-test-key",
    isActive: true,
    testStatus: "active",
    ...overrides,
  });
  if (existingCooldownMs > 0) {
    await providersDb.updateProviderConnection(connection.id, {
      rateLimitedUntil: new Date(Date.now() + existingCooldownMs).toISOString(),
      testStatus: "unavailable",
    });
  }
  return connection.id;
}

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("Gemini prepay refusal persists a six-hour unavailable connection and fallback", async () => {
  const id = await createConnection();
  const before = Date.now();
  const result = await auth.markAccountUnavailable(
    id,
    402,
    "Your prepayment credits are depleted.",
    "gemini",
    "gemini-3.5-flash"
  );
  const after = await providersDb.getProviderConnectionById(id);

  assert.ok(after);
  assert.equal(result.shouldFallback, true);
  assert.equal(result.cooldownMs, SIX_HOURS_MS);
  assert.equal(after.lastErrorType, "gemini_prepay_depleted");
  assert.equal(after.testStatus, "unavailable");
  assert.equal(Number(after.errorCode), 402);
  const expiry = Date.parse(String(after.rateLimitedUntil));
  assert.ok(expiry >= before + SIX_HOURS_MS, "must persist at least six hours");
  assert.ok(expiry <= Date.now() + SIX_HOURS_MS + 1000, "must not overcool");
});

test("Gemini project-level refusal extends an earlier short cooldown", async () => {
  const id = await createConnection(60_000);
  const before = Date.now();
  const result = await auth.markAccountUnavailable(
    id,
    429,
    "Your project has exceeded its monthly spending cap.",
    "gemini",
    "gemini-3.5-flash"
  );
  const after = await providersDb.getProviderConnectionById(id);

  assert.ok(after);
  assert.equal(result.shouldFallback, true);
  assert.equal(result.cooldownMs, SIX_HOURS_MS);
  assert.equal(after.lastErrorType, "gemini_monthly_spend_cap");
  assert.ok(Date.parse(String(after.rateLimitedUntil)) >= before + SIX_HOURS_MS);
});

test("Gemini project-level refusal does not shorten a pre-existing longer cooldown", async () => {
  const id = await createConnection(8 * 60 * 60 * 1000);
  const before = Date.now();
  const result = await auth.markAccountUnavailable(
    id,
    402,
    "Your prepayment credits are depleted.",
    "gemini",
    "gemini-3.5-flash"
  );
  const after = await providersDb.getProviderConnectionById(id);

  assert.ok(after);
  assert.equal(result.shouldFallback, true);
  assert.ok(result.cooldownMs >= 7 * 60 * 60 * 1000);
  assert.ok(Date.parse(String(after.rateLimitedUntil)) > before + 7 * 60 * 60 * 1000);
});

test("Gemini 403 free-tier refusal parks the whole connection for six hours", async () => {
  const id = await createConnection();
  const before = Date.now();
  const result = await auth.markAccountUnavailable(
    id,
    403,
    FREE_TIER_REFUSAL,
    "gemini",
    "gemini-3.5-flash"
  );
  const after = await providersDb.getProviderConnectionById(id);

  assert.ok(after);
  assert.equal(result.shouldFallback, true);
  assert.equal(result.cooldownMs, SIX_HOURS_MS);
  assert.equal(after.lastErrorType, "gemini_free_tier_ineligible");
  assert.equal(after.testStatus, "unavailable");
  assert.equal(Number(after.errorCode), 403);
  const expiry = Date.parse(String(after.rateLimitedUntil));
  assert.ok(expiry >= before + SIX_HOURS_MS, "must persist at least six hours");
  assert.ok(expiry <= Date.now() + SIX_HOURS_MS + 1000, "must not overcool");
});

test("Gemini project block honours the #2997 disableCooling opt-out", async () => {
  const id = await createConnection(0, { providerSpecificData: { disableCooling: true } });
  const result = await auth.markAccountUnavailable(
    id,
    403,
    FREE_TIER_REFUSAL,
    "gemini",
    "gemini-3.5-flash"
  );
  const after = await providersDb.getProviderConnectionById(id);

  assert.ok(after);
  assert.equal(result.shouldFallback, true);
  assert.notEqual(result.cooldownMs, SIX_HOURS_MS);
  assert.ok(!after.rateLimitedUntil, "disableCooling must keep the connection unparked");
  assert.notEqual(after.testStatus, "unavailable");
  assert.notEqual(after.lastErrorType, "gemini_free_tier_ineligible");
});

test("The Gemini project block does not apply to other providers", async () => {
  const id = await createConnection(0, { provider: "antigravity" });
  const before = Date.now();
  const result = await auth.markAccountUnavailable(
    id,
    403,
    FREE_TIER_REFUSAL,
    "antigravity",
    "gemini-3.5-flash"
  );
  const after = await providersDb.getProviderConnectionById(id);

  assert.ok(after);
  assert.ok(result.cooldownMs < SIX_HOURS_MS);
  assert.notEqual(after.lastErrorType, "gemini_free_tier_ineligible");
  const expiry = after.rateLimitedUntil ? Date.parse(String(after.rateLimitedUntil)) : 0;
  assert.ok(expiry < before + SIX_HOURS_MS, "must not park the connection for six hours");
});

test("A probe-origin Gemini project block leaves routing state untouched", async () => {
  const id = await createConnection();
  const result = await runAsProbe(() =>
    auth.markAccountUnavailable(id, 403, FREE_TIER_REFUSAL, "gemini", "gemini-3.5-flash")
  );
  const after = await providersDb.getProviderConnectionById(id);

  assert.ok(after);
  assert.equal(result.cooldownMs, 0);
  assert.ok(!after.rateLimitedUntil, "a probe must not park the connection");
  assert.equal(after.testStatus, "active");
});
