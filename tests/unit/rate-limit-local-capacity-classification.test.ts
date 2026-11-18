import assert from "node:assert/strict";
import test from "node:test";

const {
  isAccountSemaphoreCapacityFailure,
  isLocalQueueCapacityErrorBody,
  isRequestScopedUpstreamFailure,
  shouldSkipConnDisable,
} = await import("../../open-sse/services/combo/comboPredicates.ts");
const { handleComboChat } = await import("../../open-sse/services/combo.ts");
const { clearAllModelLockouts, getAllModelLockouts, isModelLocked } =
  await import("../../open-sse/services/accountFallback.ts");
const { clearCooldownState, getCooldownEntryCount } =
  await import("../../open-sse/services/providerCooldownTracker.ts");

function localQueueResponse() {
  return new Response(
    JSON.stringify({
      error: {
        message: "Local rate-limit queue wait exceeded",
        code: "RATE_LIMIT_QUEUE_TIMEOUT",
        type: "local_queue_capacity",
      },
    }),
    { status: 429, headers: { "content-type": "application/json" } }
  );
}

function createLog() {
  return { info: () => {}, warn: () => {}, error: () => {}, debug: () => {} };
}

test("local queue capacity is request-scoped and never disables a healthy connection", () => {
  assert.equal(
    isRequestScopedUpstreamFailure({
      code: "RATE_LIMIT_QUEUE_TIMEOUT",
      type: "local_queue_capacity",
    }),
    true
  );
  assert.equal(
    shouldSkipConnDisable(
      {
        status: 429,
        errorCode: "RATE_LIMIT_QUEUE_TIMEOUT",
        errorType: "local_queue_capacity",
      },
      false,
      false,
      "nvidia"
    ),
    true
  );
  assert.equal(
    isLocalQueueCapacityErrorBody({
      error: { code: "RATE_LIMIT_QUEUE_TIMEOUT", type: "local_queue_capacity" },
    }),
    true
  );
});

test("combo returns a local queue capacity response without retrying or rotating targets", async () => {
  let calls = 0;
  const response = await handleComboChat({
    body: { model: "openai/gpt-4" },
    combo: {
      name: `local-queue-capacity-${Math.random().toString(16).slice(2)}`,
      strategy: "priority",
      models: ["openai/gpt-4", "openai/gpt-4o-mini"],
      config: { maxRetries: 2, maxSetRetries: 1, retryDelayMs: 0, fallbackDelayMs: 0 },
    },
    handleSingleModel: async () => {
      calls += 1;
      return localQueueResponse();
    },
    isModelAvailable: async () => true,
    log: createLog() as never,
    settings: {},
    allCombos: null,
  });

  assert.equal(response.status, 429);
  assert.equal(calls, 1, "a local queue limit must not amplify into retries or fallback calls");
  const body = await response.json();
  assert.equal(body.error.code, "RATE_LIMIT_QUEUE_TIMEOUT");
  assert.equal(body.error.type, "local_queue_capacity");
});

function semaphoreResponse() {
  return new Response(
    JSON.stringify({ error: { message: "Account at capacity", code: "SEMAPHORE_TIMEOUT" } }),
    { status: 429, headers: { "content-type": "application/json" } }
  );
}

function okResponse() {
  return new Response(
    JSON.stringify({
      choices: [{ message: { role: "assistant", content: "served" }, finish_reason: "stop" }],
    }),
    { status: 200, headers: { "content-type": "application/json" } }
  );
}

async function runSemaphoreCombo(
  strategy: string,
  models: string[],
  maxRetries = 0,
  settings: Record<string, unknown> = {}
) {
  const calls: string[] = [];
  const response = await handleComboChat({
    body: { model: models[0] },
    combo: {
      name: `semaphore-${strategy}-${Math.random().toString(16).slice(2)}`,
      strategy,
      models,
      config: { maxRetries, maxSetRetries: 0, retryDelayMs: 0, fallbackDelayMs: 0 },
    },
    handleSingleModel: async (_body: unknown, modelStr: string) => {
      calls.push(modelStr);
      return modelStr === models[0] ? semaphoreResponse() : okResponse();
    },
    isModelAvailable: async () => true,
    log: createLog() as never,
    settings,
    allCombos: null,
  });
  return { response, calls };
}

test("account-semaphore capacity is request-scoped: no lockout, cooldown or conn disable", () => {
  // The per-account concurrency gate being momentarily full is local capacity,
  // not a provider or connection health signal: the same account is serving
  // other requests right now.
  assert.equal(
    isRequestScopedUpstreamFailure({
      code: "SEMAPHORE_TIMEOUT",
      type: "account_semaphore_capacity",
    }),
    true
  );
  assert.equal(isRequestScopedUpstreamFailure({ code: "SEMAPHORE_QUEUE_FULL" }), true);
  assert.equal(isRequestScopedUpstreamFailure({ type: "account_semaphore_capacity" }), true);
  assert.equal(
    shouldSkipConnDisable(
      {
        status: 429,
        errorCode: "SEMAPHORE_TIMEOUT",
        errorType: "account_semaphore_capacity",
      },
      false,
      false,
      "nvidia"
    ),
    true
  );
  // And it is not over-broad: an unrelated code/type stays a health signal.
  assert.equal(isRequestScopedUpstreamFailure({ code: "RATE_LIMITED", type: "rate_limit" }), false);
  assert.equal(isAccountSemaphoreCapacityFailure({ code: "RATE_LIMITED" }), false);
});

test("account-semaphore capacity is not a terminal local-queue stop", () => {
  // isLocalQueueCapacityErrorBody ends the whole combo. A full gate on one
  // account says nothing about the other targets, so it must stay false here.
  for (const error of [
    { code: "SEMAPHORE_TIMEOUT", type: "account_semaphore_capacity" },
    { code: "SEMAPHORE_QUEUE_FULL" },
    { type: "account_semaphore_capacity" },
  ]) {
    assert.equal(isLocalQueueCapacityErrorBody({ error }), false);
  }
});

for (const strategy of ["priority", "round-robin"]) {
  test(`${strategy} combo falls through to a healthy target when a semaphore is full`, async () => {
    const models = ["openai/gpt-semaphore-a", "anthropic/claude-semaphore-b"];
    const { response, calls } = await runSemaphoreCombo(strategy, models);
    assert.equal(response.status, 200);
    assert.deepEqual(calls, models);
    await response.body?.cancel();
  });

  test(`${strategy} combo keeps its same-target retry for a full semaphore`, async () => {
    const models = ["openai/gpt-semaphore-retry", "anthropic/claude-semaphore-retry"];
    const { response, calls } = await runSemaphoreCombo(strategy, models, 2);
    assert.equal(response.status, 200);
    assert.deepEqual(calls, [models[0], models[0], models[0], models[1]]);
    await response.body?.cancel();
  });
}

test("a full semaphore in a combo records no model lockout and no provider cooldown", async () => {
  clearAllModelLockouts();
  const models = ["openai/gpt-semaphore-lockout", "anthropic/claude-semaphore-lockout"];
  clearCooldownState();
  const lockoutsBefore = getAllModelLockouts().length;
  // Both are operator opt-ins, so this enables them to prove the failure feeds neither.
  const { response } = await runSemaphoreCombo("priority", models, 0, {
    modelLockout: { enabled: true },
    resilienceSettings: { providerCooldown: { enabled: true } },
  });
  assert.equal(response.status, 200);
  await response.body?.cancel();
  assert.equal(getAllModelLockouts().length, lockoutsBefore);
  assert.equal(isModelLocked("openai", "", "gpt-semaphore-lockout"), false);
  assert.equal(getCooldownEntryCount(), 0);
  clearAllModelLockouts();
});
