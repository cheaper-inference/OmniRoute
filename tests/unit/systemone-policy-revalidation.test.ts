import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { after, beforeEach, test } from "node:test";
import { SignJWT } from "jose";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-native-revalidation-"));
process.env.DATA_DIR = dataDir;
process.env.API_KEY_SECRET = "native-revalidation-fixture-only";
process.env.JWT_SECRET = "native-revalidation-fixture-jwt-only";
process.env.USAGE_LIMIT_IGNORE_UNPRICED = "false";

const db = await import("../../src/lib/db/core.ts");
const keys = await import("../../src/lib/db/apiKeys.ts");
const costs = await import("../../src/domain/costRules.ts");
const quota = await import("../../src/lib/db/keyQuota.ts");
const tokenLimits = await import("../../src/lib/db/tokenLimits.ts");
const tokens = await import("../../open-sse/services/tokenLimitCounter.ts");
const usage = await import("../../src/lib/usage/usageHistory.ts");
const rateLimiter = await import("../../src/shared/utils/rateLimiter.ts");
const policy = await import("../../src/shared/utils/apiKeyPolicy.ts");
const { resolveSelfLoopBearer } =
  await import("../../src/shared/middleware/chatAdmissionIdentity.ts");

const model = "openrouter/typesafe/jev-1.14";

function request(key?: string): Request {
  return new Request("http://localhost/v1/systemone", {
    method: "POST",
    headers: key ? { Authorization: `Bearer ${key}` } : {},
  });
}

async function admittedKey() {
  const key = await keys.createApiKey("Synthetic native admission", "native-revalidation");
  assert.equal((await policy.enforceApiKeyPolicy(request(key.key), model)).rejection, null);
  return key;
}

beforeEach(() => {
  keys.resetApiKeyState();
  costs.resetCostData();
  tokens.clearTokenLimitCache();
  db.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
  fs.mkdirSync(dataDir, { recursive: true });
  rateLimiter.setRateLimiterTestMode(true);
});

after(() => {
  keys.resetApiKeyState();
  costs.resetCostData();
  tokens.clearTokenLimitCache();
  db.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
});

test("revalidation does not consume the admitted request's client rate allowance again", async () => {
  const key = await keys.createApiKey("One request fixture", "native-revalidation");
  await keys.updateApiKeyPermissions(key.id, { rateLimits: [{ limit: 1, window: 3600 }] });
  const incoming = request(key.key);
  assert.equal((await policy.enforceApiKeyPolicy(incoming, model)).rejection, null);
  for (let index = 0; index < 3; index++) {
    assert.equal((await policy.revalidateApiKeyPolicy(incoming, model)).rejection, null);
  }
  const secondAdmission = await policy.enforceApiKeyPolicy(incoming, model);
  assert.equal(secondAdmission.rejection?.status, 429);
  assert.equal((await secondAdmission.rejection?.json()).error.code, "rate_limit_exceeded");
});

test("an unknown presented key cannot become local-mode authorization during revalidation", async () => {
  assert.equal(
    (await policy.revalidateApiKeyPolicy(request("synthetic-key-not-in-db"), model)).rejection
      ?.status,
    401
  );
  assert.equal((await policy.revalidateApiKeyPolicy(request(), model)).rejection, null);
});

test("deleting an admitted key closes later attempts rather than trusting stale metadata", async () => {
  const key = await admittedKey();
  await keys.deleteApiKey(key.id);
  assert.equal(
    (await policy.revalidateApiKeyPolicy(request(key.key), model)).rejection?.status,
    401
  );
});

test("revoking an admitted key closes later attempts", async () => {
  const key = await admittedKey();
  await keys.revokeApiKey(key.id);
  const response = (await policy.revalidateApiKeyPolicy(request(key.key), model)).rejection;
  assert.ok(response && [401, 403].includes(response.status));
});

test("disabled status is read afresh after admission", async () => {
  const key = await admittedKey();
  await keys.updateApiKeyPermissions(key.id, { isActive: false });
  assert.equal(
    (await policy.revalidateApiKeyPolicy(request(key.key), model)).rejection?.status,
    403
  );
});

test("warm policy caches cannot hide another writer's disabled status or model ACL", async () => {
  const disabled = await admittedKey();
  // Deliberately bypass the local CRUD cache invalidator, as another worker's
  // already-committed SQLite write would. No actual account or provider is used.
  db.getDbInstance().prepare("UPDATE api_keys SET is_active = 0 WHERE id = ?").run(disabled.id);
  assert.equal(
    (await policy.revalidateApiKeyPolicy(request(disabled.key), model)).rejection?.status,
    403
  );

  const restricted = await admittedKey();
  db.getDbInstance()
    .prepare(
      "UPDATE api_keys SET model_access_mode = 'restricted', allowed_models = ? WHERE id = ?"
    )
    .run(JSON.stringify(["typesafe/another-model"]), restricted.id);
  assert.equal(
    (await policy.revalidateApiKeyPolicy(request(restricted.key), model)).rejection?.status,
    403
  );
});

test("changed canonical-model and endpoint permissions are read afresh", async () => {
  const key = await admittedKey();
  await keys.updateApiKeyPermissions(key.id, { allowedModels: ["typesafe/another-model"] });
  assert.equal(
    (await policy.revalidateApiKeyPolicy(request(key.key), model)).rejection?.status,
    403
  );
  await keys.updateApiKeyPermissions(key.id, { allowedModels: [], allowedEndpoints: ["chat"] });
  assert.equal(
    (await policy.revalidateApiKeyPolicy(request(key.key), model)).rejection?.status,
    403
  );
});

test("changed schedule and expiry stop later attempts", async () => {
  const key = await admittedKey();
  await keys.updateApiKeyPermissions(key.id, {
    accessSchedule: {
      enabled: true,
      from: "00:00",
      until: "00:00",
      days: [0, 1, 2, 3, 4, 5, 6],
      tz: "UTC",
    },
  });
  assert.equal(
    (await policy.revalidateApiKeyPolicy(request(key.key), model)).rejection?.status,
    403
  );
  await keys.updateApiKeyPermissions(key.id, { accessSchedule: null });
  await keys.setApiKeyExpiry(key.id, new Date(Date.now() - 60_000).toISOString());
  assert.equal(
    (await policy.revalidateApiKeyPolicy(request(key.key), model)).rejection?.status,
    403
  );
});

test("USD usage consumed after admission stops the next physical attempt", async () => {
  const key = await admittedKey();
  await keys.updateApiKeyPermissions(key.id, {
    usageLimitEnabled: true,
    dailyUsageLimitUsd: 0.01,
  });
  await usage.saveRequestUsage({
    provider: "openrouter",
    model: "typesafe/jev-1.14",
    apiKeyId: key.id,
    endpoint: "/v1/systemone",
    success: true,
    tokens: { input: 10, output: 1, cost_usd: 0.02 },
  });
  assert.equal(
    (await policy.revalidateApiKeyPolicy(request(key.key), model)).rejection?.status,
    429
  );
});

test("budget consumed after admission is not deferred by revalidation", async () => {
  const key = await admittedKey();
  costs.setBudget(key.id, { dailyLimitUsd: 0.01 });
  costs.recordCost(key.id, 0.02);
  const rejection = (await policy.revalidateApiKeyPolicy(request(key.key), model)).rejection;
  assert.equal(rejection?.status, 429);
  assert.equal((await rejection?.json()).error.code, "budget_exceeded");
});

test("warm budget config cannot hide another writer's reduced limit during revalidation", async () => {
  const key = await admittedKey();
  costs.setBudget(key.id, { dailyLimitUsd: 10 });
  costs.recordCost(key.id, 0.02);
  assert.equal((await policy.revalidateApiKeyPolicy(request(key.key), model)).rejection, null);
  assert.equal(costs.getBudget(key.id)?.dailyLimitUsd, 10);

  // Simulate another worker's committed edit without invoking this process's
  // budget writer/cache invalidation. Only this disposable fixture DB is used.
  db.getDbInstance()
    .prepare("UPDATE domain_budgets SET daily_limit_usd = ? WHERE api_key_id = ?")
    .run(0.01, key.id);
  assert.equal(costs.getBudget(key.id)?.dailyLimitUsd, 10, "the ordinary cache stays warm");

  const rejection = (await policy.revalidateApiKeyPolicy(request(key.key), model)).rejection;
  assert.equal(rejection?.status, 429);
  assert.equal((await rejection?.json()).error.code, "budget_exceeded");
  assert.equal(costs.getBudget(key.id)?.dailyLimitUsd, 0.01);
  assert.equal(costs.getDailyTotal(key.id), 0.02, "refreshing config must not erase spend");
});

test("budget cache invalidation evicts only config for its key without deleting durable state", async () => {
  const selected = await admittedKey();
  const unrelated = await admittedKey();
  costs.setBudget(selected.id, { dailyLimitUsd: 10 });
  costs.setBudget(unrelated.id, { dailyLimitUsd: 20 });
  costs.recordCost(selected.id, 0.02);
  costs.recordCost(unrelated.id, 0.03);
  const database = db.getDbInstance();
  database
    .prepare("UPDATE domain_budgets SET daily_limit_usd = ? WHERE api_key_id = ?")
    .run(1, selected.id);
  database
    .prepare("UPDATE domain_budgets SET daily_limit_usd = ? WHERE api_key_id = ?")
    .run(2, unrelated.id);

  costs.invalidateBudgetCache(selected.id);
  assert.equal(costs.getBudget(selected.id)?.dailyLimitUsd, 1);
  assert.equal(costs.getBudget(unrelated.id)?.dailyLimitUsd, 20, "other config stays cached");
  assert.equal(costs.getDailyTotal(selected.id), 0.02);
  assert.equal(costs.getDailyTotal(unrelated.id), 0.03);
  assert.deepEqual(
    database
      .prepare(
        "SELECT daily_limit_usd FROM domain_budgets WHERE api_key_id IN (?, ?) ORDER BY daily_limit_usd"
      )
      .all(selected.id, unrelated.id),
    [{ daily_limit_usd: 1 }, { daily_limit_usd: 2 }]
  );
});

test("token limits and request quotas remain enforced without another rate admission", async () => {
  const key = await admittedKey();
  tokenLimits.upsertTokenLimit({ apiKeyId: key.id, scopeType: "global", tokenLimit: 1 });
  tokens.recordTokenUsage(key.id, "openrouter", "typesafe/jev-1.14", 1);
  await new Promise((resolve) => setImmediate(resolve));
  const tokenRejection = (await policy.revalidateApiKeyPolicy(request(key.key), model)).rejection;
  assert.equal(tokenRejection?.status, 429);
  assert.equal((await tokenRejection?.json()).error.code, "token_limit_exceeded");

  const quotaKey = await admittedKey();
  quota.upsertKeyQuotaLimits(quotaKey.id, { rpmLimit: 1 });
  quota.recordKeyQuotaUsage(quotaKey.id, 0);
  assert.equal(
    (await policy.revalidateApiKeyPolicy(request(quotaKey.key), model)).rejection?.status,
    429
  );
});

test("a scoped internal identity gets full fresh budget checks only on revalidation", async () => {
  const key = await admittedKey();
  costs.setBudget(key.id, { dailyLimitUsd: 0.01 });
  costs.recordCost(key.id, 0.02);
  const incoming = new Request("http://localhost/v1/systemone", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resolveSelfLoopBearer()}`,
      "x-omniroute-self-loop-key-id": key.id,
    },
  });
  assert.equal((await policy.enforceApiKeyPolicy(incoming, model)).rejection, null);
  const result = await policy.revalidateApiKeyPolicy(incoming, model);
  assert.equal(result.rejection?.status, 429);
  assert.equal((await result.rejection?.json()).error.code, "budget_exceeded");
});

test("initial admission cannot broaden a missing or deleted selected playground key", async () => {
  const token = await new SignJWT({ authenticated: true, sub: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("1h")
    .sign(new TextEncoder().encode(process.env.JWT_SECRET));
  const selected = await admittedKey();
  const scoped = new Request("http://localhost/v1/systemone", {
    method: "POST",
    headers: { cookie: `auth_token=${token}`, "x-omniroute-playground-key-id": selected.id },
  });
  assert.equal((await policy.enforceApiKeyPolicy(scoped, model)).rejection, null);
  await keys.deleteApiKey(selected.id);
  assert.equal((await policy.enforceApiKeyPolicy(scoped, model)).rejection?.status, 403);
  const absent = new Request("http://localhost/v1/systemone", {
    method: "POST",
    headers: { cookie: `auth_token=${token}`, "x-omniroute-playground-key-id": "missing-fixture" },
  });
  assert.equal((await policy.enforceApiKeyPolicy(absent, model)).rejection?.status, 403);
  assert.equal((await policy.enforceApiKeyPolicy(request(), model)).rejection, null);

  const bearer = await admittedKey();
  const bearerWins = new Request("http://localhost/v1/systemone", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${bearer.key}`,
      "x-omniroute-playground-key-id": "missing-fixture",
    },
  });
  assert.equal((await policy.enforceApiKeyPolicy(bearerWins, model)).rejection, null);
});
