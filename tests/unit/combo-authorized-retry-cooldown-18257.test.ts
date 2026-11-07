import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-retry-18257-"));
process.env.DATA_DIR = dataDir;
const { handleComboChat } = await import("../../open-sse/services/combo.ts");
const { invalidateDbCache } = await import("../../src/lib/db/readCache.ts");
const { clearCooldownState } = await import("../../open-sse/services/providerCooldownTracker.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");
const {
  createProviderConnection,
  updateProviderConnection,
  getProviderConnectionById,
  deleteProviderConnection,
} = await import("../../src/lib/db/providers.ts");
const { resolvePersistedRetryCooldown } =
  await import("../../open-sse/services/combo/persistedConnectionCooldown.ts");
const { clearAllModelLockouts } = await import("../../open-sse/services/accountFallback.ts");
const { resetAllComboMetrics } = await import("../../open-sse/services/comboMetrics.ts");
const { resetAllCircuitBreakers } = await import("../../src/shared/utils/circuitBreaker.ts");
const {
  CREDENTIAL_GATE_AUTH_DIAGNOSES_ONLY_FLAG: credentialGateFlag,
  __test_resetCredentialHealthCache,
  getCredentialHealth,
  setCredentialHealth,
} = await import("../../src/lib/credentialHealth/cache.ts");

const originalCredentialGateFlag = process.env[credentialGateFlag];
function restoreCredentialGateFlag() {
  if (originalCredentialGateFlag === undefined) delete process.env[credentialGateFlag];
  else process.env[credentialGateFlag] = originalCredentialGateFlag;
}

let fixture = 0;
const primary = "openai/gpt-4o";
const secondary = "anthropic/claude-sonnet-4";
const failure =
  'event: response.failed\ndata: {"type":"response.failed","response":{"status":"failed","error":{"code":"no_capacity","type":"server_error","message":"peak capacity"}}}\n\n';
function stream(body: string) {
  return new Response(body, { headers: { "content-type": "text/event-stream" } });
}
function success() {
  return stream('data: {"choices":[{"delta":{"content":"success"}}]}\n\ndata: [DONE]\n\n');
}

// #18668: the retry delay uses full jitter. These scenarios write a cooldown while the
// retry sleeps, so pin the RNG at 0.5: the first retry then sleeps exactly retryDelayMs.
const originalRandom = Math.random;
test.beforeEach(() => {
  Math.random = () => 0.5;
  __test_resetCredentialHealthCache();
  clearAllModelLockouts();
  clearCooldownState();
  invalidateDbCache("connections");
  resetAllComboMetrics();
  resetAllCircuitBreakers();
});
test.afterEach(() => {
  Math.random = originalRandom;
  __test_resetCredentialHealthCache();
  restoreCredentialGateFlag();
});
test.after(async () => {
  await new Promise<void>((resolve) => setImmediate(resolve));
  clearAllModelLockouts();
  resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
});

// Every duration below is written in "base" milliseconds and multiplied by TIME_SCALE inside
// run(), so the ordering margins (retry delay < cooldown end < fresh mutation, etc.) stay
// proportional but are wide enough to survive a starved event loop on a loaded CI runner.
const TIME_SCALE = 4;
const TIGHT_BUDGET_MS = 150;
// Budget scenarios need two waits once scaled (the 50 ms safety margin in production is NOT
// scaled): ~600 ms for the original cooldown (700 ms) and ~450 ms for a fresh extension that
// lands at 260 ms and runs to ~1160 ms. normalizeComboCooldownWait floors budgetMs at maxWaitMs,
// so the tight budget is effectively the 800 ms ceiling: it fits the first wait but not the
// second, while the 1800 ms budget fits both with the same ceiling.
// Guard scenarios (abort, deadline, removal) fire at 65-80 ms (x TIME_SCALE) into a cooldown:
// a long cooldown keeps the trigger well inside the wait even when timers slip under load.
const LONG_COOLDOWN_MS = 250;
const LONG_COOLDOWN_SETTLE_MS = 300;
const LONG_EXTENSION = { cooldownMs: 175, changeAfterMs: 65, extendMs: 225 };
const LONG_EXTENSION_MAX_WAIT_MS = 200;
const SCALED_CONFIG_KEYS = ["comboTimeoutMs", "hedgeDelayMs", "retryDelayMs"];
const SCALED_WAIT_KEYS = ["maxWaitMs", "budgetMs"];
const SCALED_OPTION_KEYS = [
  "cooldownMs",
  "abortAfterMs",
  "changeAfterMs",
  "removeAfterMs",
  "extendMs",
  "settleMs",
];

function scaleKeys<T extends Record<string, unknown> | undefined>(source: T, keys: string[]): T {
  if (!source) return source;
  const scaled: Record<string, unknown> = { ...source };
  for (const key of keys) {
    if (typeof scaled[key] === "number") scaled[key] = (scaled[key] as number) * TIME_SCALE;
  }
  return scaled as T;
}

async function run(
  rawOptions: {
    cooldownMs?: number;
    row?: Record<string, unknown>;
    config?: Record<string, unknown>;
    waitSettings?: Record<string, unknown>;
    fallback?: boolean;
    coolingFallback?: boolean;
    retryFails?: boolean;
    signal?: AbortSignal;
    abortAfterMs?: number;
    changeAfterMs?: number;
    removeAfterMs?: number;
    change?: Record<string, unknown>;
    extendMs?: number;
    settleMs?: number;
    initialBody?: string;
    abortBeforeRetryDispatch?: boolean;
    credentialProbe?: "active" | "network_error" | "upstream_auth_error";
  } = {}
) {
  const options = {
    ...scaleKeys(rawOptions, SCALED_OPTION_KEYS),
    config: scaleKeys(rawOptions.config, SCALED_CONFIG_KEYS),
    waitSettings: scaleKeys(rawOptions.waitSettings, SCALED_WAIT_KEYS),
  };
  const connection = await createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: `offline-retry-fixture-${fixture}`,
    apiKey: `fixture-not-a-real-key-${++fixture}`,
    isActive: true,
    testStatus: "active",
  });
  const fallbackConnection = options.coolingFallback
    ? await createProviderConnection({
        provider: "anthropic",
        authType: "apikey",
        name: `offline-fallback-${fixture}`,
        apiKey: `fixture-fallback-key-${fixture}`,
        isActive: true,
        testStatus: "active",
      })
    : null;
  invalidateDbCache("connections");
  if (options.credentialProbe === "active") {
    setCredentialHealth(connection.id, "openai", "active");
  } else if (options.credentialProbe) {
    setCredentialHealth(
      connection.id,
      "openai",
      "error",
      "Synthetic probe failure",
      options.credentialProbe,
      "upstream"
    );
  }
  const seededProbe = getCredentialHealth(connection.id);
  const credentialSkips: string[] = [];
  const calls: Array<{ model: string; at: number; connectionId?: string | null }> = [];
  let until = 0;
  let extendedUntil = 0;
  const controller = new AbortController();
  const updates: Promise<unknown>[] = [];
  const writes: Promise<unknown>[] = [];
  const timers: ReturnType<typeof setTimeout>[] = [];
  try {
    const response = await handleComboChat({
      body: { stream: true, messages: [{ role: "user", content: "hello" }] },
      combo: {
        name: `authorized-retry-18257-${connection.id}`,
        strategy: "priority",
        models: [
          { model: primary, connectionId: connection.id },
          ...(fallbackConnection
            ? [{ model: secondary, connectionId: fallbackConnection.id }]
            : options.fallback
              ? [secondary]
              : []),
        ],
        config: {
          maxRetries: 1,
          maxSetRetries: 0,
          maxGlobalAttempts: 2,
          retryDelayMs: 40 * TIME_SCALE,
          fallbackDelayMs: 0,
          ...options.config,
        },
      },
      handleSingleModel: async (_body, model, target) => {
        calls.push({
          model,
          at: Date.now(),
          connectionId: target && "connectionId" in target ? target.connectionId : undefined,
        });
        const firstFallbackFailure =
          options.coolingFallback &&
          model === secondary &&
          calls.filter((call) => call.model === secondary).length === 1;
        return (model === primary && (calls.length === 1 || options.retryFails)) ||
          firstFallbackFailure
          ? stream(options.initialBody ?? failure)
          : success();
      },
      isModelAvailable: async () => true,
      log: {
        info: (tag, message) => {
          if (tag === "CREDENTIAL_GATE") credentialSkips.push(String(message));
          if (options.abortBeforeRetryDispatch && String(message).includes("(retry 1)"))
            controller.abort();
          const cooledConnection = String(message).startsWith(`Retrying ${primary} in `)
            ? connection
            : String(message).startsWith(`Retrying ${secondary} in `)
              ? fallbackConnection
              : null;
          // A second request writes AFTER the retry delay starts; the initial cached row is healthy.
          if (cooledConnection) {
            timers.push(
              setTimeout(() => {
                until = Date.now() + (options.cooldownMs ?? 120 * TIME_SCALE);
                writes.push(
                  updateProviderConnection(cooledConnection.id, {
                    testStatus: "unavailable",
                    lastErrorType: "server_error",
                    errorCode: "503",
                    lastErrorAt: new Date().toISOString(),
                    rateLimitedUntil: new Date(until).toISOString(),
                    ...options.row,
                  })
                );
                if (options.abortAfterMs !== undefined) {
                  timers.push(setTimeout(() => controller.abort(), options.abortAfterMs));
                }
                if (options.removeAfterMs !== undefined) {
                  timers.push(
                    setTimeout(() => {
                      updates.push(deleteProviderConnection(cooledConnection.id));
                    }, options.removeAfterMs)
                  );
                }
                if (options.changeAfterMs !== undefined) {
                  timers.push(
                    setTimeout(() => {
                      extendedUntil = Date.now() + (options.extendMs ?? 0);
                      updates.push(
                        updateProviderConnection(cooledConnection.id, {
                          ...options.change,
                          ...(options.extendMs
                            ? { rateLimitedUntil: new Date(extendedUntil).toISOString() }
                            : {}),
                        })
                      );
                    }, options.changeAfterMs)
                  );
                }
              }, 5)
            );
          }
        },
        warn() {},
        error() {},
        debug() {},
      },
      signal: options.signal ?? controller.signal,
      settings: {
        modelLockout: { enabled: false },
        resilienceSettings: {
          comboCooldownWait: {
            enabled: true,
            maxWaitMs: 1000 * TIME_SCALE,
            maxAttempts: 3,
            budgetMs: 1000 * TIME_SCALE,
            ...options.waitSettings,
          },
        },
      },
      allCombos: null,
    });
    await Promise.all(writes);
    const responseBody = await response.text();
    if (options.settleMs) await new Promise((resolve) => setTimeout(resolve, options.settleMs));
    await Promise.all(updates);
    return {
      response,
      calls,
      until: extendedUntil || until,
      connection: await getProviderConnectionById(connection.id),
      responseBody,
      seededProbe,
      cachedProbe: getCredentialHealth(connection.id),
      credentialSkips,
    };
  } finally {
    for (const timer of timers) clearTimeout(timer);
    await Promise.allSettled([...writes, ...updates]);
  }
}

test("an authorized retry waits for a concurrent cooldown, retaining the unavailable label", async () => {
  const { response, calls, until, connection } = await run();
  assert.equal(response.status, 200);
  assert.deepEqual(
    calls.map(({ model }) => model),
    [primary, primary]
  );
  assert.ok(calls[1].at >= until, "the authorized retry must dispatch only after expiry");
  assert.equal(connection?.testStatus, "unavailable", "no background recovery clears the label");
});

for (const flag of ["false", "true"]) {
  test(`a cached network_error permits the same cooldown-delayed retry, auth-only flag=${flag}`, async () => {
    process.env[credentialGateFlag] = flag;
    const { response, responseBody, calls, until, connection, seededProbe, cachedProbe } =
      await run({
        credentialProbe: "network_error",
        config: { comboTimeoutMs: 1000 },
        waitSettings: { maxAttempts: 1, maxWaitMs: 250, budgetMs: 250 },
      });
    assert.equal(response.status, 200);
    assert.match(responseBody, /success/);
    assert.deepEqual(
      calls.map(({ model, connectionId }) => [model, connectionId]),
      [
        [primary, connection?.id],
        [primary, connection?.id],
      ]
    );
    assert.ok(until > calls[0].at, "the other request persisted cooldown after initial dispatch");
    assert.ok(calls[1].at >= until, "the single authorized retry waited for persisted expiry");
    assert.equal(connection?.testStatus, "unavailable");
    assert.equal(connection?.lastErrorType, "server_error");
    assert.equal(connection?.rateLimitedUntil, new Date(until).toISOString());
    assert.equal(cachedProbe?.status, "error");
    assert.equal(cachedProbe?.lastErrorType, "network_error");
    assert.equal(cachedProbe?.consecutiveFailures, 1);
    assert.deepEqual(cachedProbe, seededProbe, "successful routing must retain the failed probe");
  });

  test(`cached confirmed auth failure blocks initial combo dispatch, auth-only flag=${flag}`, async () => {
    process.env[credentialGateFlag] = flag;
    const { response, calls, until, connection, credentialSkips, cachedProbe } = await run({
      credentialProbe: "upstream_auth_error",
    });
    assert.equal(response.status, 503);
    assert.equal(calls.length, 0);
    assert.equal(until, 0, "no dispatch means no retry or concurrent cooldown write");
    assert.equal(connection?.testStatus, "active");
    assert.equal(credentialSkips.length, 1);
    assert.match(credentialSkips[0], /known-bad credentials.*diagnosis: upstream_auth_error/);
    assert.equal(cachedProbe?.lastErrorType, "upstream_auth_error");
  });
}

test("a positive cached probe remains visible after a persisted-cooldown retry", async () => {
  const { response, calls, connection, seededProbe, cachedProbe } = await run({
    credentialProbe: "active",
  });
  assert.equal(response.status, 200);
  assert.equal(calls.length, 2);
  assert.equal(connection?.testStatus, "unavailable");
  assert.equal(cachedProbe?.status, "active");
  assert.equal(cachedProbe?.consecutiveFailures, 0);
  assert.deepEqual(cachedProbe, seededProbe);
});

test("a cached network_error cannot increase the existing cooldown wait budget", async () => {
  const GENEROUS_BUDGET_MS = 450;
  for (const budgetMs of [TIGHT_BUDGET_MS, GENEROUS_BUDGET_MS]) {
    const generous = budgetMs === GENEROUS_BUDGET_MS;
    const { response, calls, until, connection, cachedProbe } = await run({
      credentialProbe: "network_error",
      ...LONG_EXTENSION,
      config: { comboTimeoutMs: 1000 },
      waitSettings: { maxWaitMs: LONG_EXTENSION_MAX_WAIT_MS, budgetMs },
    });
    assert.equal(response.status, generous ? 200 : 502);
    assert.equal(calls.length, generous ? 2 : 1);
    assert.ok(until > calls[0].at);
    assert.equal(connection?.testStatus, "unavailable");
    assert.equal(cachedProbe?.lastErrorType, "network_error");
    if (generous) {
      assert.ok(
        calls[1].at >= until,
        "the same wait ceiling and deadline permit a larger total budget"
      );
    }
  }
});

for (const guard of [
  { name: "client cancellation", flag: "false", abortAfterMs: 65, status: 499 },
  { name: "the original deadline", flag: "true", comboTimeoutMs: 80, status: 504 },
]) {
  test(`${guard.name} prevents late cooldown retry dispatch with a cached network_error`, async () => {
    process.env[credentialGateFlag] = guard.flag;
    const { response, calls, until, connection, cachedProbe } = await run({
      credentialProbe: "network_error",
      abortAfterMs: guard.abortAfterMs,
      config: { comboTimeoutMs: guard.comboTimeoutMs },
      cooldownMs: LONG_COOLDOWN_MS,
      settleMs: LONG_COOLDOWN_SETTLE_MS,
    });
    assert.equal(response.status, guard.status);
    assert.equal(calls.length, 1, "waiting past expiry must not dispatch after cancellation");
    assert.ok(until > calls[0].at);
    assert.equal(connection?.testStatus, "unavailable");
    assert.equal(cachedProbe?.lastErrorType, "network_error");
  });
}

test("fresh cooldown extensions are reread without spending another logical retry", async () => {
  const { response, calls, until } = await run({ changeAfterMs: 65, extendMs: 220 });
  assert.equal(response.status, 200);
  assert.deepEqual(
    calls.map(({ model }) => model),
    [primary, primary]
  );
  assert.ok(calls[1].at >= until);
});

for (const change of [
  { testStatus: "banned" },
  { testStatus: "credits_exhausted", lastErrorType: "quota_exhausted" },
  { lastErrorType: "auth_error", errorCode: "401" },
  { isActive: false },
]) {
  test(`a fresh prohibition during the wait prevents retry: ${JSON.stringify(change)}`, async () => {
    const { response, calls } = await run({ changeAfterMs: 65, change });
    assert.equal(response.status, 502);
    assert.equal(calls.length, 1);
  });
}

for (const waitSettings of [{ enabled: false }, { maxWaitMs: 50 }, { maxAttempts: 0 }]) {
  test(`existing wait controls prevent a cooldown wait: ${JSON.stringify(waitSettings)}`, async () => {
    const { response, calls } = await run({ waitSettings });
    assert.equal(response.status, 502);
    assert.equal(calls.length, 1);
  });
}

for (const waitSettings of [
  { maxAttempts: 1 },
  { maxWaitMs: LONG_EXTENSION_MAX_WAIT_MS, budgetMs: TIGHT_BUDGET_MS },
]) {
  test(`extensions respect the shared request limits: ${JSON.stringify(waitSettings)}`, async () => {
    const { response, calls } = await run({ ...LONG_EXTENSION, waitSettings });
    assert.equal(response.status, 502);
    assert.equal(calls.length, 1);
  });
}

for (const row of [
  { lastErrorType: "unknown" },
  { lastErrorType: null },
  { lastErrorType: "auth_error", errorCode: "401" },
  { lastErrorType: "unauthorized" },
  { lastErrorType: "oauth_invalid_token" },
  { lastErrorType: "quota_exhausted" },
  { errorCode: "401" },
  { testStatus: "expired" },
  { isActive: false },
  { rateLimitedUntil: null },
  { rateLimitedUntil: "invalid" },
]) {
  test(`unconfirmed transient state never authorizes waiting or a bypass: ${JSON.stringify(row)}`, async () => {
    const { response, calls } = await run({ row });
    assert.equal(response.status, 502);
    assert.equal(calls.length, 1);
  });
}

for (const abortAfterMs of [10, 65]) {
  test(`client abort during retry waiting prevents delayed dispatch (${abortAfterMs}ms)`, async () => {
    const { response, calls } = await run({
      abortAfterMs,
      cooldownMs: LONG_COOLDOWN_MS,
      settleMs: LONG_COOLDOWN_SETTLE_MS,
    });
    assert.equal(response.status, 499);
    assert.equal(calls.length, 1);
  });
}

for (const hedgeDelayMs of [10, 70]) {
  test(`a winning sibling aborts the waiting target without delayed dispatch (${hedgeDelayMs}ms)`, async () => {
    const { response, calls } = await run({
      fallback: true,
      settleMs: 220,
      config: {
        maxGlobalAttempts: 3,
        zeroLatencyOptimizationsEnabled: true,
        hedging: true,
        hedgeDelayMs,
      },
    });
    assert.equal(response.status, 200);
    assert.deepEqual(
      calls.map(({ model }) => model),
      [primary, secondary]
    );
  });
}

for (const comboTimeoutMs of [20, 80]) {
  test(`the original combo deadline cancels a retry delay or cooldown wait (${comboTimeoutMs}ms)`, async () => {
    const { response, calls } = await run({
      config: { comboTimeoutMs },
      cooldownMs: LONG_COOLDOWN_MS,
      settleMs: LONG_COOLDOWN_SETTLE_MS,
    });
    assert.equal(response.status, 504);
    assert.equal(calls.length, 1);
  });
}

for (const config of [{ maxRetries: 0 }, { maxGlobalAttempts: 1 }]) {
  test(`waiting cannot reset retry or global attempt limits: ${JSON.stringify(config)}`, async () => {
    const { response, calls } = await run({ config });
    assert.equal(response.status, config.maxGlobalAttempts === 1 ? 503 : 502);
    assert.equal(calls.length, 1);
  });
}

test("the same target finishes its authorized retry before ordinary fallback", async () => {
  const { response, calls, until } = await run({
    fallback: true,
    retryFails: true,
    config: { maxGlobalAttempts: 3 },
  });
  assert.equal(response.status, 200);
  assert.deepEqual(
    calls.map(({ model }) => model),
    [primary, primary, secondary]
  );
  assert.ok(calls[1].at >= until);
});

test("useful SSE output followed by an error never grants a replay", async () => {
  const { response, calls } = await run({
    initialBody: 'data: {"choices":[{"delta":{"content":"already visible"}}]}\n\n' + failure,
  });
  assert.equal(response.status, 200);
  assert.equal(calls.length, 1);
});

test("an explicit transient deadline expired during the fixed delay recovers unavailable lazily", async () => {
  const { response, calls, until, connection } = await run({ cooldownMs: 10 });
  assert.equal(response.status, 200);
  assert.deepEqual(
    calls.map(({ model }) => model),
    [primary, primary]
  );
  assert.ok(calls[1].at >= until);
  assert.equal(connection?.testStatus, "unavailable");
});

test("a connection removed during the confirmed cooldown wait cannot dispatch", async () => {
  const { response, calls, connection } = await run({
    removeAfterMs: 65,
    cooldownMs: LONG_COOLDOWN_MS,
  });
  assert.equal(response.status, 502);
  assert.equal(calls.length, 1);
  assert.equal(connection, null);
});

test("missing/read-failed rows preserve ordinary fallthrough but cannot reopen a waited cooldown", async () => {
  const target = { modelStr: primary, connectionId: "missing-fixture" };
  for (const fetchConnection of [
    async () => null,
    async () => {
      throw new Error("fixture DB read failure");
    },
  ]) {
    assert.equal((await resolvePersistedRetryCooldown(target, fetchConnection)).skipReason, null);
    assert.ok((await resolvePersistedRetryCooldown(target, fetchConnection, true)).skipReason);
  }
});

// normalizeComboCooldownWait floors budgetMs at maxWaitMs, so keep maxWaitMs (x TIME_SCALE = 480)
// just under budgetMs (x TIME_SCALE = 520): one ~375 ms wait fits, a second one cannot.
for (const waitSettings of [{ maxAttempts: 1 }, { maxWaitMs: 120, budgetMs: 130 }]) {
  test(`different targets share the existing request wait allowance: ${JSON.stringify(waitSettings)}`, async () => {
    const { response, calls } = await run({
      coolingFallback: true,
      retryFails: true,
      config: { maxGlobalAttempts: 4 },
      waitSettings,
    });
    assert.equal(response.status, 502);
    assert.deepEqual(
      calls.map(({ model }) => model),
      [primary, primary, secondary]
    );
  });
}

test("client cancellation after the cooldown read still prevents retry dispatch", async () => {
  const { response, calls } = await run({ abortBeforeRetryDispatch: true });
  assert.equal(response.status, 499);
  assert.equal(calls.length, 1);
});

test("persisted rate_limited classifier state resumes the authorized retry after expiry", async () => {
  const { response, calls, until, connection } = await run({
    row: { testStatus: "rate_limited", lastErrorType: "rate_limited", errorCode: "429" },
  });
  assert.equal(response.status, 200);
  assert.deepEqual(
    calls.map(({ model }) => model),
    [primary, primary]
  );
  assert.ok(calls[1].at >= until);
  assert.equal(connection?.testStatus, "rate_limited");
});

async function runInheritedTransientRetry(
  status: string,
  rateLimitedUntil: string | null,
  preContent: boolean,
  options: { retryRow?: Record<string, unknown>; expectRetry?: boolean } = {}
) {
  const seed = await createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: `transient-seed-${fixture}`,
    apiKey: `fixture-transient-seed-${++fixture}`,
    isActive: true,
    testStatus: "active",
  });
  const later = await createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: `transient-later-${fixture}`,
    apiKey: `fixture-transient-later-${++fixture}`,
    isActive: true,
    testStatus: "active",
  });
  invalidateDbCache("connections");
  const firstModel = "openai/gpt-4o-mini";
  const calls: string[] = [];
  const response = await handleComboChat({
    body: { stream: preContent, messages: [{ role: "user", content: "hello" }] },
    combo: {
      name: `inherited-transient-retry-${later.id}`,
      strategy: "priority",
      models: [
        { model: firstModel, connectionId: seed.id },
        { model: primary, connectionId: later.id },
      ],
      config: {
        maxRetries: 1,
        maxSetRetries: 0,
        maxGlobalAttempts: 3,
        retryDelayMs: 0,
        fallbackDelayMs: 0,
        failoverBeforeRetry: true,
      },
    },
    handleSingleModel: async (_body, model) => {
      calls.push(model);
      if (model === firstModel) {
        await updateProviderConnection(later.id, {
          testStatus: status,
          lastErrorType: "rate_limited",
          errorCode: "429",
          lastErrorAt: new Date().toISOString(),
          rateLimitedUntil,
        });
        return Response.json(
          { error: { message: "Too many requests, slow down", type: "rate_limit_error" } },
          { status: 429 }
        );
      }
      if (calls.length === 2) {
        if (options.retryRow) await updateProviderConnection(later.id, options.retryRow);
        return preContent
          ? stream(failure)
          : Response.json({ error: { message: "Temporarily unavailable" } }, { status: 503 });
      }
      return preContent
        ? success()
        : Response.json({ choices: [{ message: { content: "success" } }] });
    },
    isModelAvailable: async () => true,
    log: { info() {}, warn() {}, error() {}, debug() {} },
    settings: {
      modelLockout: { enabled: false },
      resilienceSettings: { comboCooldownWait: { enabled: false } },
    },
    allCombos: null,
  });
  await response.text();
  if (options.expectRetry === false) {
    assert.equal(response.ok, false);
    assert.deepEqual(calls, [firstModel, primary]);
  } else {
    assert.equal(response.status, 200);
    assert.deepEqual(calls, [firstModel, primary, primary]);
    assert.equal((await getProviderConnectionById(later.id))?.testStatus, status);
  }
}

for (const status of ["unavailable", "rate_limited"]) {
  for (const rateLimitedUntil of [null, "invalid"]) {
    for (const preContent of [false, true]) {
      test(`existing transient-provider retry allowance survives status-only ${status}/${rateLimitedUntil}, preContent=${preContent}`, async () => {
        await runInheritedTransientRetry(status, rateLimitedUntil, preContent);
      });
    }
  }
}

for (const retryRow of [
  { rateLimitedUntil: new Date(Date.now() + 60_000).toISOString() },
  { testStatus: "banned" },
  { isActive: false },
  { lastErrorType: "auth_error", errorCode: "401" },
  { lastErrorType: "quota_exhausted" },
  { lastErrorType: "unknown" },
  { errorCode: "401" },
]) {
  for (const preContent of [false, true]) {
    test(`existing transient-provider allowance cannot bypass fresh protection ${JSON.stringify(retryRow)}, preContent=${preContent}`, async () => {
      await runInheritedTransientRetry("unavailable", null, preContent, {
        retryRow,
        expectRetry: false,
      });
    });
  }
}
