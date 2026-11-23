import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-cb-readiness-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;

const {
  getDefaultComboConfig,
  resolveComboConfig,
  resolveComboSetupConfig,
  resolveTrackStreamReadinessForProvider,
} = await import("../../open-sse/services/comboConfig.ts");
const { shouldRecordProviderBreakerFailure } =
  await import("../../open-sse/services/combo/comboPredicates.ts");
const { handleComboChat } = await import("../../open-sse/services/combo.ts");
const rrState = await import("../../open-sse/services/combo/rrState.ts");
const semaphore = await import("../../open-sse/services/rateLimitSemaphore.ts");
const { getCircuitBreaker, resetAllCircuitBreakers } =
  await import("../../src/shared/utils/circuitBreaker.ts");
const { connectionCircuitBreakerName } =
  await import("../../open-sse/services/connectionCircuitBreaker.ts");
const { comboRuntimeConfigSchema } = await import("../../src/shared/validation/schemas/combo.ts");
const dbCore = await import("../../src/lib/db/core.ts");

const ENV_KEY = "OMNIROUTE_CIRCUIT_BREAKER_TRACK_STREAM_TIMEOUT";

function withEnv(value: string | undefined, fn: () => void): void;
function withEnv(value: string | undefined, fn: () => Promise<void>): Promise<void>;
function withEnv(value: string | undefined, fn: () => void | Promise<void>): void | Promise<void> {
  const prev = process.env[ENV_KEY];
  if (value === undefined) {
    delete process.env[ENV_KEY];
  } else {
    process.env[ENV_KEY] = value;
  }
  const restore = () => {
    if (prev === undefined) {
      delete process.env[ENV_KEY];
    } else {
      process.env[ENV_KEY] = prev;
    }
  };
  try {
    const res = fn();
    if (res && typeof (res as Promise<void>).then === "function") {
      return (res as Promise<void>).finally(restore);
    }
    restore();
    return res;
  } catch (err) {
    restore();
    throw err;
  }
}

test.beforeEach(() => {
  resetAllCircuitBreakers();
  semaphore.resetAll();
  rrState.rrCounters.clear();
  rrState.rrStickyTargets.clear();
});

test.after(() => {
  try {
    dbCore.resetDbInstance?.();
  } catch {
    /* ignore */
  }
  if (ORIGINAL_DATA_DIR === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("comboConfig defaults trackStreamReadinessInCircuitBreaker to false", () => {
  withEnv(undefined, () => {
    assert.equal(getDefaultComboConfig().trackStreamReadinessInCircuitBreaker, false);
    assert.equal(resolveComboConfig({}, {}).trackStreamReadinessInCircuitBreaker, false);
    assert.equal(resolveComboSetupConfig({}, null).trackStreamReadinessInCircuitBreaker, false);
  });
});

test("comboConfig enables trackStreamReadinessInCircuitBreaker via combo config, settings cascade, or env", () => {
  withEnv(undefined, () => {
    assert.equal(
      resolveComboConfig({ config: { trackStreamReadinessInCircuitBreaker: true } }, {})
        .trackStreamReadinessInCircuitBreaker,
      true
    );
    assert.equal(
      resolveComboSetupConfig({ config: { trackStreamReadinessInCircuitBreaker: true } }, null)
        .trackStreamReadinessInCircuitBreaker,
      true
    );
    assert.equal(
      resolveComboConfig({}, { comboDefaults: { trackStreamReadinessInCircuitBreaker: true } })
        .trackStreamReadinessInCircuitBreaker,
      true
    );
    assert.equal(
      resolveComboConfig(
        {},
        { providerOverrides: { openai: { trackStreamReadinessInCircuitBreaker: true } } },
        "openai"
      ).trackStreamReadinessInCircuitBreaker,
      true
    );
  });

  withEnv("true", () => {
    assert.equal(getDefaultComboConfig().trackStreamReadinessInCircuitBreaker, true);
    assert.equal(resolveComboConfig({}, {}).trackStreamReadinessInCircuitBreaker, true);
    assert.equal(resolveComboSetupConfig({}, null).trackStreamReadinessInCircuitBreaker, true);
    assert.equal(
      resolveComboSetupConfig({ config: { trackStreamReadinessInCircuitBreaker: undefined } }, null)
        .trackStreamReadinessInCircuitBreaker,
      true
    );
  });

  withEnv("false", () => {
    assert.equal(getDefaultComboConfig().trackStreamReadinessInCircuitBreaker, false);
    assert.equal(resolveComboConfig({}, {}).trackStreamReadinessInCircuitBreaker, false);
  });
});

test("comboConfig allows explicit false opt-out even when env var is true", () => {
  withEnv("true", () => {
    assert.equal(
      resolveComboConfig({ config: { trackStreamReadinessInCircuitBreaker: false } }, {})
        .trackStreamReadinessInCircuitBreaker,
      false
    );
    assert.equal(
      resolveComboConfig({}, { comboDefaults: { trackStreamReadinessInCircuitBreaker: false } })
        .trackStreamReadinessInCircuitBreaker,
      false
    );
    assert.equal(
      resolveComboConfig(
        {},
        { providerOverrides: { openai: { trackStreamReadinessInCircuitBreaker: false } } },
        "openai"
      ).trackStreamReadinessInCircuitBreaker,
      false
    );
    assert.equal(
      resolveComboSetupConfig({ config: { trackStreamReadinessInCircuitBreaker: false } }, null)
        .trackStreamReadinessInCircuitBreaker,
      false
    );
  });
});

test("comboRuntimeConfigSchema accepts optional trackStreamReadinessInCircuitBreaker boolean", () => {
  assert.equal(
    comboRuntimeConfigSchema.parse({ trackStreamReadinessInCircuitBreaker: true })
      .trackStreamReadinessInCircuitBreaker,
    true
  );
  assert.equal(
    comboRuntimeConfigSchema.parse({ trackStreamReadinessInCircuitBreaker: false })
      .trackStreamReadinessInCircuitBreaker,
    false
  );
  assert.equal(comboRuntimeConfigSchema.parse({}).trackStreamReadinessInCircuitBreaker, undefined);
});

test("shouldRecordProviderBreakerFailure skips stream readiness timeout by default", () => {
  assert.equal(
    shouldRecordProviderBreakerFailure({
      isStreamReadinessFailure: true,
      isStreamEarlyEof: false,
      status: 504,
      sameProviderNext: false,
      skipProviderBreaker: false,
      requestScopedFailure: false,
      error: "Stream readiness timeout",
    }),
    false
  );

  assert.equal(
    shouldRecordProviderBreakerFailure({
      isStreamReadinessFailure: true,
      isStreamEarlyEof: false,
      trackStreamReadinessInCircuitBreaker: false,
      status: 502,
      sameProviderNext: false,
      skipProviderBreaker: false,
      requestScopedFailure: false,
      error: "Stream readiness timeout",
    }),
    false
  );
});

test("shouldRecordProviderBreakerFailure records stream readiness timeout when opted in", () => {
  for (const status of [502, 504]) {
    assert.equal(
      shouldRecordProviderBreakerFailure({
        isStreamReadinessFailure: true,
        isStreamEarlyEof: false,
        trackStreamReadinessInCircuitBreaker: true,
        status,
        sameProviderNext: false,
        skipProviderBreaker: false,
        requestScopedFailure: false,
        error: "Stream readiness timeout",
      }),
      true
    );
  }
});

test("shouldRecordProviderBreakerFailure still respects veto gates when trackStreamReadinessInCircuitBreaker is true", () => {
  const base = {
    isStreamReadinessFailure: true,
    isStreamEarlyEof: false,
    trackStreamReadinessInCircuitBreaker: true,
    status: 504,
    sameProviderNext: false,
    skipProviderBreaker: false,
    requestScopedFailure: false,
    error: "Stream readiness timeout",
  };

  assert.equal(shouldRecordProviderBreakerFailure({ ...base, providerCircuitOpen: true }), false);
  assert.equal(shouldRecordProviderBreakerFailure({ ...base, sameProviderNext: true }), false);
  assert.equal(shouldRecordProviderBreakerFailure({ ...base, skipProviderBreaker: true }), false);
  assert.equal(shouldRecordProviderBreakerFailure({ ...base, requestScopedFailure: true }), false);
  assert.equal(shouldRecordProviderBreakerFailure({ ...base, status: 429 }), false);
  assert.equal(
    shouldRecordProviderBreakerFailure({
      ...base,
      error: "Client disconnected: request_signal_aborted",
    }),
    false
  );
});

test("recordRoundRobinFailureTracking preserves upstream semaphore-only behavior when opt-in is off", async () => {
  const { recordRoundRobinFailureTracking } =
    await import("../../open-sse/services/combo/roundRobinBreaker.ts");
  const log = makeLog();

  // Non-stream-readiness 503 with opt-in OFF must NOT record provider breaker failure,
  // and MUST apply semaphore cooldown when targetCooldownMs > 0.
  recordRoundRobinFailureTracking({
    provider: "glm",
    nextProvider: "openai",
    isStreamReadinessFailure: false,
    isStreamEarlyEof: false,
    trackStreamReadiness: false,
    result: new Response("Service unavailable", { status: 503 }),
    skipProviderBreaker: false,
    requestScopedFailure: false,
    isTokenLimitBreach: false,
    errorText: "Service unavailable",
    connectionId: "conn-1",
    profile: { circuitBreakerThreshold: 3, circuitBreakerResetMs: 30000 },
    targetCooldownMs: 4000,
    semaphoreKey: "glm/m-a",
    modelStr: "glm/m-a",
    log,
  });
  assert.equal(getCircuitBreaker("glm").getStatus().failureCount, 0);
  assert.equal(
    getCircuitBreaker(connectionCircuitBreakerName("glm", "conn-1")).getStatus().failureCount,
    0
  );
  assert.ok(
    Date.parse(semaphore.getStats("glm/m-a")["glm/m-a"]?.rateLimitedUntil ?? "") > Date.now()
  );

  semaphore.resetAll();

  // Stream readiness timeout with opt-in OFF must neither record breaker nor mark semaphore.
  recordRoundRobinFailureTracking({
    provider: "glm",
    nextProvider: "openai",
    isStreamReadinessFailure: true,
    isStreamEarlyEof: false,
    trackStreamReadiness: false,
    result: streamReadinessTimeoutResponse(),
    skipProviderBreaker: false,
    requestScopedFailure: false,
    isTokenLimitBreach: false,
    errorText: "Stream readiness timeout",
    connectionId: "conn-1",
    profile: { circuitBreakerThreshold: 3, circuitBreakerResetMs: 30000 },
    targetCooldownMs: 0,
    semaphoreKey: "glm/m-a",
    modelStr: "glm/m-a",
    log,
  });
  assert.equal(getCircuitBreaker("glm").getStatus().failureCount, 0);
  assert.equal(
    getCircuitBreaker(connectionCircuitBreakerName("glm", "conn-1")).getStatus().failureCount,
    0
  );
  assert.equal(semaphore.getStats("glm/m-a")["glm/m-a"]?.rateLimitedUntil ?? null, null);
});

test("recordRoundRobinFailureTracking records breaker and semaphore cooldown for stream readiness timeout only when opted in", async () => {
  const { recordRoundRobinFailureTracking } =
    await import("../../open-sse/services/combo/roundRobinBreaker.ts");
  const log = makeLog();

  // Non-stream-readiness 503 even with opt-in ON keeps upstream semaphore-only behavior.
  recordRoundRobinFailureTracking({
    provider: "glm",
    nextProvider: "openai",
    isStreamReadinessFailure: false,
    isStreamEarlyEof: false,
    trackStreamReadiness: true,
    result: new Response("Service unavailable", { status: 503 }),
    skipProviderBreaker: false,
    requestScopedFailure: false,
    isTokenLimitBreach: false,
    errorText: "Service unavailable",
    connectionId: "conn-1",
    profile: { circuitBreakerThreshold: 3, circuitBreakerResetMs: 30000 },
    targetCooldownMs: 3000,
    semaphoreKey: "glm/m-a",
    modelStr: "glm/m-a",
    log,
  });
  assert.equal(getCircuitBreaker("glm").getStatus().failureCount, 0);
  assert.equal(
    getCircuitBreaker(connectionCircuitBreakerName("glm", "conn-1")).getStatus().failureCount,
    0
  );
  assert.ok(
    Date.parse(semaphore.getStats("glm/m-a")["glm/m-a"]?.rateLimitedUntil ?? "") > Date.now()
  );

  semaphore.resetAll();

  // Stream readiness timeout with opt-in ON records breaker failure and applies 5000ms fallback semaphore cooldown.
  recordRoundRobinFailureTracking({
    provider: "glm",
    nextProvider: "openai",
    isStreamReadinessFailure: true,
    isStreamEarlyEof: false,
    trackStreamReadiness: true,
    result: streamReadinessTimeoutResponse(),
    skipProviderBreaker: false,
    requestScopedFailure: false,
    isTokenLimitBreach: false,
    errorText: "Stream readiness timeout",
    connectionId: "conn-1",
    profile: { circuitBreakerThreshold: 3, circuitBreakerResetMs: 30000 },
    targetCooldownMs: 0,
    semaphoreKey: "glm/m-a",
    modelStr: "glm/m-a",
    log,
  });
  assert.equal(
    getCircuitBreaker(connectionCircuitBreakerName("glm", "conn-1")).getStatus().failureCount,
    1
  );
  assert.ok(
    Date.parse(semaphore.getStats("glm/m-a")["glm/m-a"]?.rateLimitedUntil ?? "") > Date.now()
  );
});

function streamReadinessTimeoutResponse(): Response {
  return new Response(
    JSON.stringify({
      error: {
        message: "Stream readiness timeout",
        type: "stream_timeout",
        code: "STREAM_READINESS_TIMEOUT",
      },
    }),
    {
      status: 504,
      headers: { "Content-Type": "application/json" },
    }
  );
}

function makeLog() {
  return { info() {}, warn() {}, debug() {}, error() {} };
}

async function runComboWithReadinessTimeout(
  strategy: "priority" | "round-robin",
  comboName: string,
  trackFlag: boolean | undefined,
  firstResponseFactory: () => Response = streamReadinessTimeoutResponse,
  settings: Record<string, unknown> | null = null
) {
  const combo = {
    name: comboName,
    strategy,
    config: {
      maxRetries: 0,
      disableSessionStickiness: true,
      ...(trackFlag !== undefined ? { trackStreamReadinessInCircuitBreaker: trackFlag } : {}),
    },
    models: ["glm/m-a", "openai/m-b"],
  };
  const res = await handleComboChat({
    body: { model: comboName, messages: [{ role: "user", content: "hi" }], stream: true },
    combo,
    allCombos: [combo],
    isModelAvailable: async () => true,
    relayOptions: undefined,
    signal: undefined,
    settings,
    log: makeLog(),
    handleSingleModel: async (_b: unknown, modelStr: string) => {
      if (modelStr.startsWith("glm/")) {
        return firstResponseFactory();
      }
      return Response.json({ choices: [{ message: { role: "assistant", content: "ok" } }] });
    },
  });
  assert.equal(res.ok, true);
}

test("priority and round-robin combos record provider breaker failure on stream readiness timeout only when opted in", async () => {
  for (const strategy of ["priority", "round-robin"] as const) {
    // Default (unset): stream readiness timeout does not increment provider breaker failureCount.
    await withEnv(undefined, async () => {
      await runComboWithReadinessTimeout(strategy, `${strategy}-readiness-unset`, undefined);
      assert.equal(getCircuitBreaker("glm").getStatus().failureCount, 0);
    });

    resetAllCircuitBreakers();
    semaphore.resetAll();

    // Explicit false: does not increment provider breaker failureCount.
    await withEnv(undefined, async () => {
      await runComboWithReadinessTimeout(strategy, `${strategy}-readiness-off`, false);
      assert.equal(getCircuitBreaker("glm").getStatus().failureCount, 0);
    });

    resetAllCircuitBreakers();
    semaphore.resetAll();

    // Opt-in (true): stream readiness timeout increments provider breaker failureCount.
    await withEnv(undefined, async () => {
      await runComboWithReadinessTimeout(strategy, `${strategy}-readiness-on`, true);
      assert.equal(getCircuitBreaker("glm").getStatus().failureCount, 1);
    });

    resetAllCircuitBreakers();
    semaphore.resetAll();

    // Explicit opt-out (false) overrides env=true.
    await withEnv("true", async () => {
      await runComboWithReadinessTimeout(strategy, `${strategy}-readiness-optout`, false);
      assert.equal(getCircuitBreaker("glm").getStatus().failureCount, 0);
    });

    resetAllCircuitBreakers();
    semaphore.resetAll();

    // Env opt-in (true) applies when settings are absent and combo flag is undefined.
    await withEnv("true", async () => {
      await runComboWithReadinessTimeout(strategy, `${strategy}-readiness-env-on`, undefined);
      assert.equal(getCircuitBreaker("glm").getStatus().failureCount, 1);
    });

    resetAllCircuitBreakers();
    semaphore.resetAll();
  }
});

test("round-robin combo does not record provider breaker failure for non-stream-readiness 503 when opt-in is off", async () => {
  await withEnv(undefined, async () => {
    await runComboWithReadinessTimeout(
      "round-robin",
      "rr-non-readiness-503-off",
      false,
      () =>
        new Response(JSON.stringify({ error: { message: "Upstream unavailable" } }), {
          status: 503,
          headers: { "Content-Type": "application/json" },
        })
    );
    assert.equal(getCircuitBreaker("glm").getStatus().failureCount, 0);
  });
});

test("resolveComboSetupConfig and resolveTrackStreamReadinessForProvider preserve combo > provider > global > env precedence", () => {
  withEnv("true", () => {
    const settings = {
      comboDefaults: { trackStreamReadinessInCircuitBreaker: true },
      providerOverrides: {
        glm: { trackStreamReadinessInCircuitBreaker: false },
        openai: { trackStreamReadinessInCircuitBreaker: true },
      },
    };
    assert.equal(
      resolveComboSetupConfig({}, settings, "glm").trackStreamReadinessInCircuitBreaker,
      false
    );
    assert.equal(resolveTrackStreamReadinessForProvider({}, settings, "glm"), false);
    assert.equal(resolveTrackStreamReadinessForProvider({}, settings, "openai"), true);
    assert.equal(
      resolveTrackStreamReadinessForProvider(
        { config: { trackStreamReadinessInCircuitBreaker: true } },
        settings,
        "glm"
      ),
      true
    );
    assert.equal(resolveTrackStreamReadinessForProvider({}, null, "glm", true), true);
    assert.equal(resolveTrackStreamReadinessForProvider({}, null, "glm", false), false);
  });
});

test("priority and round-robin setup paths honor providerOverrides opt-in, opt-out, and combo precedence", async () => {
  for (const strategy of ["priority", "round-robin"] as const) {
    // 1. Provider-only opt-in via settings.providerOverrides (env unset, combo unset)
    await withEnv(undefined, async () => {
      await runComboWithReadinessTimeout(
        strategy,
        `${strategy}-provider-optin`,
        undefined,
        streamReadinessTimeoutResponse,
        { providerOverrides: { glm: { trackStreamReadinessInCircuitBreaker: true } } }
      );
      assert.equal(getCircuitBreaker("glm").getStatus().failureCount, 1);
    });

    resetAllCircuitBreakers();
    semaphore.resetAll();

    // 2. Explicit provider opt-out overrides env=true and global comboDefaults=true
    await withEnv("true", async () => {
      await runComboWithReadinessTimeout(
        strategy,
        `${strategy}-provider-optout`,
        undefined,
        streamReadinessTimeoutResponse,
        {
          comboDefaults: { trackStreamReadinessInCircuitBreaker: true },
          providerOverrides: { glm: { trackStreamReadinessInCircuitBreaker: false } },
        }
      );
      assert.equal(getCircuitBreaker("glm").getStatus().failureCount, 0);
    });

    resetAllCircuitBreakers();
    semaphore.resetAll();

    // 3a. Combo override true beats providerOverrides false
    await withEnv(undefined, async () => {
      await runComboWithReadinessTimeout(
        strategy,
        `${strategy}-combo-true-beats-provider-false`,
        true,
        streamReadinessTimeoutResponse,
        { providerOverrides: { glm: { trackStreamReadinessInCircuitBreaker: false } } }
      );
      assert.equal(getCircuitBreaker("glm").getStatus().failureCount, 1);
    });

    resetAllCircuitBreakers();
    semaphore.resetAll();

    // 3b. Combo override false beats providerOverrides true
    await withEnv("true", async () => {
      await runComboWithReadinessTimeout(
        strategy,
        `${strategy}-combo-false-beats-provider-true`,
        false,
        streamReadinessTimeoutResponse,
        { providerOverrides: { glm: { trackStreamReadinessInCircuitBreaker: true } } }
      );
      assert.equal(getCircuitBreaker("glm").getStatus().failureCount, 0);
    });

    resetAllCircuitBreakers();
    semaphore.resetAll();
  }
});
