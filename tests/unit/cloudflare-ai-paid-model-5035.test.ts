// Cloudflare Workers AI answers HTTP 403 + code 5035 when a Free-plan account
// calls a model gated to Workers Paid ("Model X is not available on the Workers
// Free plan"). The gate is per MODEL: the same token keeps serving every free
// model. Without a model-scoped classification the generic apikey-403 branch
// cools down the whole connection, so one request to a paid model blocks the
// free models of that account too.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-cf-5035-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const auth = await import("../../src/sse/services/auth.ts");
const accountFallback = await import("../../open-sse/services/accountFallback.ts");
const { getProviderErrorRuleMatch } = await import("../../open-sse/config/providerErrorRules.ts");

const PAID_MODEL = "@cf/zai-org/glm-5.3";
const FREE_MODEL = "@cf/openai/gpt-oss-120b";
// Verbatim upstream body (2026-11-16, /ai/v1/chat/completions, HTTP 403).
const PAID_PLAN_403 = JSON.stringify({
  errors: [
    {
      message:
        "AiError: Model @cf/zai-org/glm-5.3 is not available on the Workers Free plan: Model @cf/zai-org/glm-5.3 is not available on the Workers Free plan. Upgrade to access this model: https://dash.cloudflare.com/?to=/:account/workers/plans (1c940681-4f1f-4f76-9c2b-354d706fe32b)",
      code: 5035,
    },
  ],
  success: false,
  result: {},
  messages: [],
});

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

async function seedConnection(): Promise<string> {
  const conn = await providersDb.createProviderConnection({
    provider: "cloudflare-ai",
    authType: "apikey",
    apiKey: "cloudflare-ai-key",
    isActive: true,
    testStatus: "active",
    providerSpecificData: { accountId: "acc" },
  });
  return (conn as Record<string, unknown>).id as string;
}

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("rule: 403 code 5035 matches as a model-scoped lock", () => {
  const match = getProviderErrorRuleMatch("cloudflare-ai", 403, {}, JSON.parse(PAID_PLAN_403));
  assert.ok(match, "expected the paid-plan rule to match");
  assert.equal(match!.scope, "model");
});

test("rule: an unrelated 403 does not match the paid-plan rule", () => {
  const match = getProviderErrorRuleMatch(
    "cloudflare-ai",
    403,
    {},
    { errors: [{ code: 10000, message: "Authentication error" }] }
  );
  assert.equal(match, null);
});

test("403 code 5035 -> model lockout, connection stays active for free models", async () => {
  await resetStorage();
  const connId = await seedConnection();

  const result = await auth.markAccountUnavailable(
    connId,
    403,
    PAID_PLAN_403,
    "cloudflare-ai",
    PAID_MODEL
  );
  assert.equal(result.shouldFallback, true);

  const after = await providersDb.getProviderConnectionById(connId);
  assert.equal(after.testStatus, "active");
  assert.ok(!after.rateLimitedUntil, "a paid-model 403 must not cool down the whole connection");

  const lockout = accountFallback.getModelLockoutInfo("cloudflare-ai", connId, PAID_MODEL);
  assert.ok(lockout, "the paid model must be locked on this connection");
  assert.equal(
    accountFallback.getModelLockoutInfo("cloudflare-ai", connId, FREE_MODEL),
    null,
    "free models of the same connection must stay routable"
  );
});

test("a non-5035 403 (real auth failure) still takes the connection out", async () => {
  await resetStorage();
  const connId = await seedConnection();

  await auth.markAccountUnavailable(
    connId,
    403,
    JSON.stringify({ errors: [{ code: 10000, message: "Authentication error" }], success: false }),
    "cloudflare-ai",
    FREE_MODEL
  );

  const after = await providersDb.getProviderConnectionById(connId);
  assert.notEqual(after.testStatus, "active", "an auth 403 must keep the connection-level handling");
  assert.equal(accountFallback.getModelLockoutInfo("cloudflare-ai", connId, FREE_MODEL), null);
});
