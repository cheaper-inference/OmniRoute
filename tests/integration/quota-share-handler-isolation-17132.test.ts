import test from "node:test";
import assert from "node:assert/strict";
import { createChatPipelineHarness } from "./_chatPipelineHarness.ts";

const harness = await createChatPipelineHarness("quota-share-handler-17132");
const providers = await import("../../src/lib/db/providers.ts");
const pools = await import("../../src/lib/db/quotaPools.ts");
const plans = await import("../../src/lib/db/providerPlans.ts");
const caps = await import("../../src/lib/db/quotaModelCaps.ts");
const schedules = await import("../../src/lib/db/quotaSchedules.ts");
const quotaCache = await import("../../src/domain/quotaCache.ts");
const { getQuotaStore } = await import("../../src/lib/quota/QuotaStore.ts");
const { enforceQuotaShare } = await import("../../src/lib/quota/enforce.ts");
const { isComboRequestScopedFailure } =
  await import("../../open-sse/services/combo/comboPredicates.ts");
const { isModelLocked, clearAllModelLockouts } =
  await import("../../open-sse/services/accountFallback.ts");
const { getCircuitBreaker, resetAllCircuitBreakers } =
  await import("../../src/shared/utils/circuitBreaker.ts");

const MODEL = "claude-haiku-5-5";
const SECOND_MODEL = "claude-sonnet-5-5";
let dispatchedModels: string[] = [];

test.before(async () => {
  await harness.settingsDb.updateSettings({
    requestRetry: 0,
    maxRetryIntervalSec: 0,
    modelLockout: { enabled: true, errorCodes: [429], baseCooldownMs: 120000 },
  });
});

test.beforeEach(() => {
  resetAllCircuitBreakers();
  clearAllModelLockouts();
  quotaCache.__clearForTests();
  dispatchedModels = [];
  globalThis.fetch = async (_url, init) => {
    const body = JSON.parse(String(init?.body ?? "{}"));
    assert.equal(typeof body.model, "string", "only mocked model dispatch is expected");
    dispatchedModels.push(body.model);
    return harness.buildClaudeResponse("served fixture", body.model);
  };
});

test.after(async () => {
  await harness.cleanup();
});

async function fixture(absoluteCap = false) {
  const connection = await providers.createProviderConnection({
    provider: "claude",
    authType: "oauth",
    name: `quota-fixture-${crypto.randomUUID()}`,
    accessToken: "synthetic-claude-access-token",
    refreshToken: "synthetic-claude-refresh-token",
    expiresAt: new Date(Date.now() + 86_400_000).toISOString(),
    isActive: true,
    testStatus: "active",
  });
  const a = await harness.seedApiKey({ allowedConnections: [connection.id] });
  const b = await harness.seedApiKey({ allowedConnections: [connection.id] });
  plans.upsertPlan(
    connection.id,
    "claude",
    [{ unit: "tokens", window: "hourly", limit: 10000 }],
    "manual"
  );
  const pool = pools.createPool({
    connectionId: connection.id,
    name: `quota-pool-${connection.id}`,
    allocations: [
      {
        apiKeyId: a.id,
        weight: 50,
        policy: "hard",
        ...(absoluteCap ? { capValue: 1, capUnit: "tokens" as const } : {}),
      },
      { apiKeyId: b.id, weight: 50, policy: "hard" },
    ],
  });
  const store = await getQuotaStore();
  if (absoluteCap)
    await store.consume(a.id, { poolId: pool.id, unit: "tokens", window: "hourly" }, 1);
  quotaCache.setQuotaCache(connection.id, "claude", {});
  return { connection, a, b, pool, store };
}

async function health(connectionId: string) {
  const connection = await providers.getProviderConnectionById(connectionId);
  assert.ok(connection);
  return {
    rateLimitedUntil: connection.rateLimitedUntil,
    backoffLevel: connection.backoffLevel,
    testStatus: connection.testStatus,
    lastError: connection.lastError,
    errorCode: connection.errorCode,
    quota: structuredClone(quotaCache.getQuotaCache(connectionId)),
  };
}

function request(key: string, connectionId: string, model: string) {
  return harness.handleChat(
    harness.buildRequest({
      authKey: key,
      headers: { "x-omniroute-connection": connectionId },
      body: {
        model,
        stream: false,
        messages: [{ role: "user", content: `fixture-${crypto.randomUUID()}` }],
      },
    })
  );
}

test("absolute cap returns a clean 429; another key immediately uses the same OAuth connection", async () => {
  const { connection, a, b } = await fixture(true);
  const before = await health(connection.id);
  const response = await request(a.key, connection.id, `claude/${MODEL}`);
  assert.equal(response.status, 429);
  const body = await response.json();
  assert.equal(
    isComboRequestScopedFailure(response, body.error.message, body.error),
    true,
    "the serialized handler response must retain the per-key classification used by combos"
  );
  assert.match(body.error.message, /Absolute quota cap reached for your API key on claude/);
  assert.equal(response.headers.get("x-omniroute-selected-connection-id"), connection.id);
  assert.equal(response.headers.get("retry-after"), null, "absolute caps provide no reset hint");
  assert.deepEqual(dispatchedModels, [], "blocked key must never reach upstream");
  assert.deepEqual(await health(connection.id), before);
  assert.equal(getCircuitBreaker("claude").getStatus().failureCount, 0);

  const allowed = await request(b.key, connection.id, `claude/${MODEL}`);
  assert.equal(allowed.status, 200, await allowed.clone().text());
  assert.match(JSON.stringify(await allowed.json()), /served fixture/);
  assert.equal(dispatchedModels.length, 1);
});

test("a model cap skips only that combo target and dispatches the next model on the same connection", async () => {
  const { connection, a, pool, store } = await fixture();
  caps.setModelCap({
    poolId: pool.id,
    apiKeyId: a.id,
    model: MODEL,
    capValue: 1,
    capUnit: "requests",
  });
  await store.consume(
    a.id,
    { poolId: `${pool.id}:model:${MODEL}`, unit: "requests", window: "hourly" },
    1
  );
  const name = `quota-fallback-${connection.id}`;
  await harness.combosDb.createCombo({
    name,
    strategy: "priority",
    models: [MODEL, SECOND_MODEL].map((model) => ({
      kind: "model",
      providerId: "claude",
      model: `claude/${model}`,
      connectionId: connection.id,
      weight: 1,
    })),
  });
  const before = await health(connection.id);
  const response = await request(a.key, connection.id, name);
  assert.equal(response.status, 200, await response.clone().text());
  assert.deepEqual(dispatchedModels, [SECOND_MODEL]);
  const after = await health(connection.id);
  assert.equal(after.rateLimitedUntil, before.rateLimitedUntil);
  assert.equal(after.backoffLevel, before.backoffLevel);
  assert.equal(after.testStatus, "active");
  assert.equal(quotaCache.isAccountQuotaExhausted(connection.id), false);
  assert.equal(isModelLocked("claude", connection.id, MODEL), false);
  assert.equal(getCircuitBreaker("claude").getStatus().failureCount, 0);
});

test("a fully capped two-model combo reports 429 without poisoning the shared connection", async () => {
  const { connection, a, b } = await fixture(true);
  const name = `quota-all-blocked-${connection.id}`;
  await harness.combosDb.createCombo({
    name,
    strategy: "priority",
    models: [MODEL, SECOND_MODEL].map((model) => ({
      kind: "model",
      providerId: "claude",
      model: `claude/${model}`,
      connectionId: connection.id,
      weight: 1,
    })),
  });
  const before = await health(connection.id);
  const response = await request(a.key, connection.id, name);
  assert.equal(response.status, 429, await response.clone().text());
  assert.match(await response.text(), /Absolute quota cap reached/);
  assert.deepEqual(dispatchedModels, []);
  assert.deepEqual(await health(connection.id), before);
  assert.equal(isModelLocked("claude", connection.id, MODEL), false);
  assert.equal(isModelLocked("claude", connection.id, SECOND_MODEL), false);
  assert.equal(getCircuitBreaker("claude").getStatus().failureCount, 0);
  const allowed = await request(b.key, connection.id, `claude/${MODEL}`);
  assert.equal(allowed.status, 200, await allowed.clone().text());
});

test("a real closed quota schedule preserves its Retry-After through handleChat", async () => {
  const { connection, a, pool } = await fixture();
  schedules.replaceSchedules(pool.id, [
    {
      days: [(new Date().getUTCDay() + 1) % 7],
      startMinute: 0,
      endMinute: 1440,
      timezone: "UTC",
      mode: "allow",
      reserves: [],
      budgetWindow: "hourly",
      priority: 0,
      enabled: true,
    },
  ]);
  const decision = await enforceQuotaShare({
    apiKeyId: a.id,
    connectionId: connection.id,
    provider: "claude",
    model: MODEL,
    estimatedCost: {},
  });
  assert.equal(decision.kind, "block");
  if (decision.kind !== "block") return;
  assert.ok(decision.retryAfterSeconds && decision.retryAfterSeconds > 0);
  const before = await health(connection.id);
  const response = await request(a.key, connection.id, `claude/${MODEL}`);
  assert.equal(response.status, 429);
  assert.match(await response.text(), /outside its permitted quota window/);
  const retryAfter = Number(response.headers.get("retry-after"));
  assert.ok(retryAfter > 0 && retryAfter <= decision.retryAfterSeconds);
  assert.ok(
    decision.retryAfterSeconds - retryAfter < 30,
    "seconds must not be multiplied by 1000 on the wire"
  );
  assert.deepEqual(dispatchedModels, []);
  assert.deepEqual(await health(connection.id), before);
});
