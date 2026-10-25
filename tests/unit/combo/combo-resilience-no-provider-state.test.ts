/**
 * Combo-level resilience: an upstream cancellation stays request-scoped, and our
 * own shutdown leaves NO provider state behind.
 *
 * Behaviour map (the four behaviours this PR protects):
 *  - B2 request-scoped: a cancelled attempt records no model lockout, no
 *    provider circuit-breaker failure and no provider cooldown, and it does not
 *    poison the connection — the combo still falls back to the next leg.
 *  - B3 our own shutdown: a failure raised while the instance is draining
 *    records no model lockout, no provider circuit-breaker failure and no
 *    provider cooldown — in the priority dispatcher AND in the round-robin one.
 *
 * The decision seam is the same composition handleComboChat uses:
 *   isComboRequestScopedFailure → shouldRecordProviderBreakerFailure(requestScopedFailure)
 *   → shouldRecordModelLockoutForComboFailure(requestScopedFailure)
 *   → recordProviderCooldown(!requestScopedFailure)
 * The orchestration is exercised through the public handleComboChat with an
 * injected handleSingleModel (not private mocks), so the assertions cover the
 * real failover path.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { createTempDataDir } from "../../_setup/tempDataDir.ts";

// Both knobs are read at module load, so they must be set before the imports
// below. The provider cooldown tracker is opt-in (default OFF), and the
// provider-level cooldown needs N failures inside the window before the
// provider actually cools down.
process.env.PROVIDER_COOLDOWN_ENABLED = "true";
process.env.OMNIROUTE_PROVIDER_BREAKER_API_KEY_FAILURE_THRESHOLD = "2";

const { cleanup } = createTempDataDir("omniroute-combo-resilience-");
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "combo-resilience-secret";

const { handleComboChat } = await import("../../../open-sse/services/combo.ts");
const {
  clearAllModelLockouts,
  clearProviderFailure,
  getModelLockoutInfo,
  getProviderBreakerState,
} = await import("../../../open-sse/services/accountFallback.ts");
const { clearCooldownState, getCooldownEntryCount, isProviderInCooldown } =
  await import("../../../open-sse/services/providerCooldownTracker.ts");
const { getCircuitBreaker, resetAllCircuitBreakers } =
  await import("../../../src/shared/utils/circuitBreaker.ts");
const { connectionCircuitBreakerName } =
  await import("../../../open-sse/services/connectionCircuitBreaker.ts");
const { resolveProviderId } = await import("../../../src/shared/constants/providers.ts");

const noop = () => {};
const log = { info: noop, warn: noop, debug: noop, error: noop };

type Body = Record<string, unknown>;

const CANCELLED_CODE = "upstream_request_cancelled";

const resilienceSettings = {
  providerCooldown: {
    enabled: true,
    minRetryCooldownMs: 5_000,
    maxRetryCooldownMs: 300_000,
  },
} as unknown as Parameters<typeof isProviderInCooldown>[2];

/** Model lockout is disabled by default — the operator turns it on explicitly. */
const settings = {
  modelLockout: {
    enabled: true,
    errorCodes: [502],
    baseCooldownMs: 60_000,
    maxCooldownMs: 120_000,
  },
  resilienceSettings,
};

/** A failed target, as the combo layer sees it. */
type Scenario = { provider: string; model: string; connectionId: string };

/** A cancelled ZCode attempt: the provider is healthy, only THIS attempt died. */
const ZCODE: Scenario = {
  provider: "zcode",
  model: "glm-5.3-flash",
  connectionId: "conn-zcode-cancelled",
};

/** A provider-level failure: no connection, so the whole-provider records apply. */
const OPENAI: Scenario = { provider: "openai", model: "gpt-4o-mini", connectionId: "" };

/** The exact shape `isDraining()` reads (src/lib/gracefulShutdown.ts). */
function setDraining(shuttingDown: boolean) {
  globalThis.__omnirouteShutdown = { init: false, shuttingDown, activeRequests: 0 };
}

function okResponse(content: string) {
  return new Response(JSON.stringify({ choices: [{ message: { role: "assistant", content } }] }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

function upstreamError(
  status: number,
  error: { message: string; type: string; code: string },
  connectionId?: string
) {
  return new Response(JSON.stringify({ error }), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...(connectionId ? { "x-omniroute-selected-connection-id": connectionId } : {}),
    },
  });
}

/** The ZCode app-server's attempt-level cancellation, as the executor re-tags it. */
function cancelledResponse() {
  return upstreamError(
    502,
    { message: "Model request was cancelled.", type: CANCELLED_CODE, code: CANCELLED_CODE },
    ZCODE.connectionId
  );
}

/** A genuine upstream 502 from the same provider — not a cancellation. */
function genuineFailureResponse(scenario: Scenario) {
  return upstreamError(
    502,
    {
      message: "Upstream service returned an invalid response",
      type: "server_error",
      code: "bad_gateway",
    },
    scenario.connectionId || undefined
  );
}

/**
 * Run a two-target combo whose FIRST dispatched target fails. The second target
 * always succeeds, so the combo itself is a success and only the recorded
 * resilience state differs.
 *
 * The round-robin dispatcher rotates its start index between turns, so the
 * failing target is chosen by call order instead of by model name — the
 * assertion is about the provider-level record, not about one target.
 */
async function runComboWithFailingFirstTarget(options: {
  name: string;
  models: unknown[];
  failingResponse: () => Response;
  strategy?: "round-robin";
}) {
  const calls: string[] = [];
  const combo = {
    name: options.name,
    strategy: options.strategy ?? "priority",
    models: options.models,
    config: {
      maxRetries: 0,
      retryDelayMs: 0,
      fallbackDelayMs: 0,
      targetTimeoutMs: 60_000,
    },
  };
  const res = await handleComboChat({
    body: { model: options.name, messages: [{ role: "user", content: "ping" }], stream: false },
    combo,
    handleSingleModel: async (_b: Body, modelStr: string) => {
      calls.push(modelStr);
      if (calls.length === 1) return options.failingResponse();
      return okResponse("recovered-after-failed-attempt");
    },
    isModelAvailable: async () => true,
    log,
    settings,
    allCombos: options.strategy === "round-robin" ? [combo] : null,
  });
  assert.equal(res.status, 200, "the combo must still fall over to the second target");
  return { res, calls };
}

/** Everything a failed combo attempt could have recorded, as one snapshot. */
function recordedState(scenario: Scenario) {
  // A failure that carries a connection id is recorded against the
  // connection-scoped breaker (one connection's failures must not open the
  // breaker for every account of the provider).
  const connectionBreaker = scenario.connectionId
    ? connectionCircuitBreakerName(resolveProviderId(scenario.provider), scenario.connectionId)
    : null;
  return {
    lockout: getModelLockoutInfo(scenario.provider, scenario.connectionId, scenario.model),
    connectionBreakerFailures: connectionBreaker
      ? getCircuitBreaker(connectionBreaker).getStatus().failureCount
      : 0,
    providerBreakerFailures:
      getProviderBreakerState(resolveProviderId(scenario.provider))?.failureCount ?? 0,
    cooldownEntries: getCooldownEntryCount(),
    inCooldown: isProviderInCooldown(
      scenario.provider,
      scenario.connectionId || undefined,
      resilienceSettings
    ),
  };
}

test.beforeEach(() => {
  resetAllCircuitBreakers();
  // recordProviderFailure dedups rapid failures per provider:connection for 5s,
  // so the dedup entries must be cleared too — otherwise a later test that
  // expects a breaker failure would be silently deduped by an earlier one.
  clearProviderFailure(resolveProviderId(ZCODE.provider));
  clearProviderFailure(resolveProviderId(OPENAI.provider));
  clearCooldownState();
  clearAllModelLockouts();
  setDraining(false);
});

test.after(async () => {
  delete globalThis.__omnirouteShutdown;
  await cleanup();
});

// ── B2: an upstream cancellation stays request-scoped ───────────────────────

test("cancelled attempt falls through to the next leg without answering 499", async () => {
  const { res, calls } = await runComboWithFailingFirstTarget({
    name: "zcode-cancelled-failover",
    models: ["zcode/glm-5.3-flash", "openai/gpt-4o-mini"],
    failingResponse: cancelledResponse,
  });

  assert.deepEqual(calls, ["zcode/glm-5.3-flash", "openai/gpt-4o-mini"]);
  assert.equal(
    res.status,
    200,
    "the combo must continue to the next leg after a cancelled attempt"
  );
  const body = (await res.json()) as { choices: Array<{ message: { content: string } }> };
  assert.equal(body.choices[0].message.content, "recovered-after-failed-attempt");
});

test("cancelled attempt records no model lockout, no breaker failure and no cooldown", async () => {
  await runComboWithFailingFirstTarget({
    name: "zcode-cancelled-no-state",
    models: ["zcode/glm-5.3-flash", "openai/gpt-4o-mini"],
    failingResponse: cancelledResponse,
  });

  const state = recordedState(ZCODE);
  assert.equal(
    state.lockout,
    null,
    "a cancelled attempt must not lock the model out of every combo"
  );
  assert.equal(
    state.connectionBreakerFailures,
    0,
    "a cancelled attempt must not trip the whole-provider circuit breaker"
  );
  assert.equal(
    state.providerBreakerFailures,
    0,
    "a cancelled attempt must not trip the provider-level circuit breaker either"
  );
  assert.equal(state.cooldownEntries, 0, "a cancelled attempt must not cool the provider down");
  assert.equal(state.inCooldown, false, "a cancelled attempt must not cool the provider down");
});

test("cancelled attempt does not poison the connection — a same-connection leg is still tried", async () => {
  const { res, calls } = await runComboWithFailingFirstTarget({
    name: "zcode-cancelled-same-connection",
    // Both legs pin the SAME connection, so a cancelled attempt that marked the
    // connection exhausted (#1731v2) would skip the second leg.
    models: [
      {
        kind: "model",
        provider: "zcode",
        providerId: "zcode",
        model: "glm-5.3-flash",
        connectionId: ZCODE.connectionId,
        id: "zcode-cancelled-same-connection-0",
      },
      {
        kind: "model",
        provider: "zcode",
        providerId: "zcode",
        model: "glm-5.2",
        connectionId: ZCODE.connectionId,
        id: "zcode-cancelled-same-connection-1",
      },
    ],
    failingResponse: cancelledResponse,
  });

  assert.deepEqual(
    calls,
    ["zcode/glm-5.3-flash", "zcode/glm-5.2"],
    "a cancelled attempt must not mark the connection exhausted (#1731v2) — the next leg must run"
  );
  assert.equal(res.status, 200);
});

test("genuine upstream 502 still records the model lockout and the breaker failure", async () => {
  const { res, calls } = await runComboWithFailingFirstTarget({
    name: "zcode-genuine-failure",
    models: ["zcode/glm-5.3-flash", "openai/gpt-4o-mini"],
    failingResponse: () => genuineFailureResponse(ZCODE),
  });

  assert.deepEqual(calls, ["zcode/glm-5.3-flash", "openai/gpt-4o-mini"]);
  assert.equal(res.status, 200, "a genuine failure still falls through to the next leg");

  const state = recordedState(ZCODE);
  assert.ok(state.lockout, "a genuine upstream 502 must keep locking the model out");
  assert.ok(
    state.connectionBreakerFailures >= 1,
    "a genuine upstream 502 must keep recording a provider breaker failure"
  );
});

// ── B3: our own shutdown leaves no provider state behind ────────────────────

test("combo: a 502 during shutdown drain records no model lockout, no breaker failure and no cooldown", async () => {
  setDraining(true);
  await runComboWithFailingFirstTarget({
    name: "drain-no-provider-state",
    models: ["openai/gpt-4o-mini", "anthropic/claude-3-5-haiku"],
    failingResponse: () => genuineFailureResponse(OPENAI),
  });

  const state = recordedState(OPENAI);
  assert.equal(
    state.lockout,
    null,
    "a self-inflicted shutdown failure must not lock the model out of every later combo"
  );
  assert.equal(
    state.providerBreakerFailures,
    0,
    "a self-inflicted shutdown failure must not open the provider circuit breaker"
  );
  assert.equal(
    state.cooldownEntries,
    0,
    "a self-inflicted shutdown failure must not record a provider cooldown"
  );
  assert.equal(
    state.inCooldown,
    false,
    "the provider must not be in cooldown after a shutdown-induced failure"
  );
});

test("combo: the same 502 outside a drain records the model lockout, the breaker failure and the cooldown", async () => {
  const run = () =>
    runComboWithFailingFirstTarget({
      name: "genuine-provider-state",
      models: ["openai/gpt-4o-mini", "anthropic/claude-3-5-haiku"],
      failingResponse: () => genuineFailureResponse(OPENAI),
    });

  await run();
  // The model lockout would skip the failing target on the second run, so the
  // provider-level cooldown (which needs N failures in the window) is measured
  // on a freshly unlocked model.
  clearAllModelLockouts();
  await run();

  const state = recordedState(OPENAI);
  assert.ok(state.lockout, "a genuine upstream 502 must keep locking the model out");
  assert.ok(
    state.providerBreakerFailures >= 1,
    "a genuine upstream 502 must still record a provider breaker failure"
  );
  assert.ok(
    state.cooldownEntries >= 1,
    "a genuine upstream 502 must still record a provider cooldown entry"
  );
  assert.equal(state.inCooldown, true, "a genuine upstream 502 must still cool the provider down");
});

test("combo: the drain verdict is not latched — the records work again once draining ends", async () => {
  const run = () =>
    runComboWithFailingFirstTarget({
      name: "drain-then-live",
      models: ["openai/gpt-4o-mini", "anthropic/claude-3-5-haiku"],
      failingResponse: () => genuineFailureResponse(OPENAI),
    });

  setDraining(true);
  await run();
  assert.equal(recordedState(OPENAI).lockout, null, "nothing may be recorded while draining");
  assert.equal(recordedState(OPENAI).providerBreakerFailures, 0);
  assert.equal(recordedState(OPENAI).cooldownEntries, 0);

  clearAllModelLockouts();
  resetAllCircuitBreakers();
  clearCooldownState();
  setDraining(false);
  await run();

  const state = recordedState(OPENAI);
  assert.ok(
    state.lockout,
    "draining must not disable the model lockout for the whole process lifetime"
  );
  assert.ok(
    state.providerBreakerFailures >= 1,
    "draining must not disable the provider breaker for the whole process lifetime"
  );
  assert.ok(
    state.cooldownEntries >= 1,
    "draining must not disable the provider cooldown for the whole process lifetime"
  );
});

// ── B3 in the round-robin dispatcher (its own provider-cooldown record) ──────

const ROUND_ROBIN_MODELS = [
  {
    kind: "model",
    provider: "codex",
    providerId: "codex",
    model: "m-a",
    connectionId: "conn-A",
    id: "rr-0",
  },
  {
    kind: "model",
    provider: "glm-cn",
    providerId: "glm-cn",
    model: "m-b",
    connectionId: "conn-B",
    id: "rr-1",
  },
];

function roundRobinFailure() {
  return upstreamError(502, {
    message: "Bad Gateway",
    type: "server_error",
    code: "bad_gateway",
  });
}

test("round-robin: a 502 during shutdown drain records no provider cooldown", async () => {
  setDraining(true);
  const { calls } = await runComboWithFailingFirstTarget({
    name: "rr-drain-no-cooldown",
    models: ROUND_ROBIN_MODELS,
    failingResponse: roundRobinFailure,
    strategy: "round-robin",
  });

  assert.equal(calls.length, 2, "the second target must have been tried");
  assert.equal(
    getCooldownEntryCount(),
    0,
    "a self-inflicted shutdown failure must not record a provider cooldown in the round-robin path"
  );
});

test("round-robin: the same 502 outside a drain records the provider cooldown", async () => {
  await runComboWithFailingFirstTarget({
    name: "rr-no-drain-cooldown",
    models: ROUND_ROBIN_MODELS,
    failingResponse: roundRobinFailure,
    strategy: "round-robin",
  });

  assert.ok(
    getCooldownEntryCount() >= 1,
    "a genuine upstream 502 must still record a provider cooldown entry"
  );
});
