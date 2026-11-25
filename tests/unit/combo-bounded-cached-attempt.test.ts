import assert from "node:assert/strict";
import test from "node:test";

/**
 * A combo whose every target is skipped only because of a cached quota-exhaustion
 * snapshot gets exactly one bounded upstream attempt instead of answering
 * ALL_TARGETS_SKIPPED with zero upstream calls. Only the cached verdict is ignored:
 * disabled/banned/expired accounts, future cooldowns, open circuits and generic
 * unavailability are never bypassed, and the attempt is never retried.
 */

const { getProviderCredentials } = await import("../../src/sse/services/auth.ts");
const { getComboCredentialAvailability } =
  await import("../../src/sse/handlers/comboCredentialAvailability.ts");
const { createProviderConnection } = await import("../../src/lib/db/providers.ts");
const { setQuotaCache } = await import("../../src/domain/quotaCache.ts");
const { resetAllCircuitBreakers, getCircuitBreaker } =
  await import("../../src/shared/utils/circuitBreaker.ts");
const { clearAllModelLockouts } = await import("../../open-sse/services/accountFallback.ts");
const { clearCooldownState } = await import("../../open-sse/services/providerCooldownTracker.ts");
const { handleComboChat } = await import("../../open-sse/services/combo.ts");

const log = { info() {}, warn() {}, debug() {} };
type RecoveryTarget = { ignoreCachedQuotaExhaustion?: boolean } | undefined;
type Availability = ReturnType<typeof getComboCredentialAvailability>;
type ComboOptions = Parameters<typeof handleComboChat>[0];

test.beforeEach(() => {
  resetAllCircuitBreakers();
  clearAllModelLockouts();
  clearCooldownState();
});

type RunOptions = {
  status?: number;
  connection?: Record<string, unknown>;
  available?: Availability;
  circuitOpen?: boolean;
};

async function run({
  status = 200,
  connection = {},
  available,
  circuitOpen = false,
}: RunOptions = {}) {
  const row = await createProviderConnection({
    provider: "cursor",
    authType: "apikey",
    apiKey: `test-key-${crypto.randomUUID()}`,
    isActive: true,
    testStatus: "active",
    ...connection,
  });
  const id = String(row.id);
  const quota = {
    remainingPercentage: 0,
    resetAt: new Date(Date.now() + 3_600_000).toISOString(),
  };
  setQuotaCache(id, "cursor", { Total: quota, API: quota });
  if (circuitOpen) for (let i = 0; i < 20; i++) getCircuitBreaker("cursor")._onFailure();

  const calls: string[] = [];
  const select = (target?: { ignoreCachedQuotaExhaustion?: boolean }) =>
    getProviderCredentials("cursor", null, [id], "auto", {
      forcedConnectionId: id,
      ignoreCachedQuotaExhaustion: target?.ignoreCachedQuotaExhaustion === true,
    });

  const response = await handleComboChat({
    body: { messages: [{ role: "user", content: "hello" }], stream: false },
    combo: {
      name: "bounded",
      strategy: "priority",
      models: [
        { model: "cursor/auto", connectionId: id },
        { model: "cursor/default", connectionId: id },
      ],
      config: { maxRetries: 3, maxSetRetries: 2, setRetryDelayMs: 0, retryDelayMs: 0 },
    },
    log,
    settings: { resilienceSettings: { comboCooldownWait: { enabled: false } } },
    hiddenModelsByProvider: new Map(),
    isModelAvailable: async (_model: string, target?: RecoveryTarget) =>
      available ?? getComboCredentialAvailability(await select(target)),
    handleSingleModel: async (_body: unknown, model: string, target?: RecoveryTarget) => {
      // The dispatched target must carry the recovery flag so dispatch-time
      // credential selection reaches the same cached-exhausted account.
      assert.equal(getComboCredentialAvailability(await select(target)), true);
      calls.push(model);
      const payload =
        status === 200
          ? {
              choices: [
                {
                  message: { content: "A complete response with useful content." },
                  finish_reason: "stop",
                },
              ],
            }
          : { error: { message: "upstream unavailable" } };
      return new Response(JSON.stringify(payload), {
        status,
        headers: {
          "content-type": "application/json",
          "X-OmniRoute-Selected-Connection-Id": id,
        },
      });
    },
  } as unknown as ComboOptions);
  await response.text();
  return { response, calls };
}

test("cached quota exhaustion alone is reported as a flagged connection cooldown", () => {
  const retryAfter = new Date(Date.now() + 60_000).toISOString();
  const flagged = getComboCredentialAvailability({
    allRateLimited: true,
    retryAfter,
    cachedQuotaExhausted: true,
  });
  assert.ok(typeof flagged === "object");
  assert.equal(flagged.reason, "connection_cooldown");
  assert.equal(flagged.cachedQuotaExhausted, true);
  const plain = getComboCredentialAvailability({ allRateLimited: true, retryAfter });
  assert.ok(typeof plain === "object");
  assert.equal(plain.cachedQuotaExhausted, undefined);
});

test("cached exhaustion dispatches exactly once", async () => {
  const { response, calls } = await run();
  assert.equal(response.status, 200);
  assert.deepEqual(calls, ["cursor/auto"]);
});

test("an upstream failure in the recovery attempt is not retried", async () => {
  const { response, calls } = await run({ status: 503 });
  assert.notEqual(response.status, 200);
  assert.deepEqual(calls, ["cursor/auto"]);
});

for (const connection of [
  { isActive: false },
  { testStatus: "banned" },
  { testStatus: "expired" },
  { rateLimitedUntil: new Date(Date.now() + 3_600_000).toISOString() },
]) {
  test(`safety state is never bypassed: ${JSON.stringify(Object.keys(connection))}`, async () => {
    assert.equal((await run({ connection })).calls.length, 0);
  });
}

test("generic unavailability is never bypassed", async () => {
  assert.equal((await run({ available: false })).calls.length, 0);
});

test("a plain connection cooldown is not enrolled", async () => {
  const available: Availability = {
    available: false,
    reason: "connection_cooldown",
    retryAfterMs: 60_000,
  };
  assert.equal((await run({ available })).calls.length, 0);
});

test("an open circuit is not bypassed", async () => {
  assert.equal((await run({ circuitOpen: true })).calls.length, 0);
});

test("an invalid success body still fails quality without a retry", async () => {
  const { response, calls } = await run({ status: 201 });
  assert.notEqual(response.status, 200);
  assert.equal(calls.length, 1);
});
