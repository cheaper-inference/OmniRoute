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
} = await import("../../open-sse/services/comboConfig.ts");
const { shouldRecordProviderBreakerFailure } = await import(
  "../../open-sse/services/combo/comboPredicates.ts"
);
const { handleComboChat } = await import("../../open-sse/services/combo.ts");
const rrState = await import("../../open-sse/services/combo/rrState.ts");
const { getCircuitBreaker, resetAllCircuitBreakers } = await import(
  "../../src/shared/utils/circuitBreaker.ts"
);
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

test("round-robin combo records provider breaker failure on stream readiness timeout only when opted in", async () => {
  const runRoundRobin = async (comboName: string, trackFlag: boolean | undefined) => {
    const combo = {
      name: comboName,
      strategy: "round-robin",
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
      settings: null,
      log: makeLog(),
      handleSingleModel: async (_b: unknown, modelStr: string) => {
        if (modelStr.startsWith("glm/")) {
          return streamReadinessTimeoutResponse();
        }
        return Response.json({ choices: [{ message: { role: "assistant", content: "ok" } }] });
      },
    });
    assert.equal(res.ok, true);
  };

  // Default (false): stream readiness timeout does not increment provider breaker failureCount.
  await withEnv(undefined, async () => {
    await runRoundRobin("rr-readiness-off", false);
    assert.equal(getCircuitBreaker("glm").getStatus().failureCount, 0);
  });

  resetAllCircuitBreakers();

  // Opt-in (true): stream readiness timeout increments provider breaker failureCount.
  await withEnv(undefined, async () => {
    await runRoundRobin("rr-readiness-on", true);
    assert.equal(getCircuitBreaker("glm").getStatus().failureCount, 1);
  });

  resetAllCircuitBreakers();

  // Explicit opt-out (false) overrides env=true on round-robin path too.
  await withEnv("true", async () => {
    await runRoundRobin("rr-readiness-optout", false);
    assert.equal(getCircuitBreaker("glm").getStatus().failureCount, 0);
  });

  resetAllCircuitBreakers();

  // Env opt-in (true) applies when settings are absent and combo flag is undefined.
  await withEnv("true", async () => {
    await runRoundRobin("rr-readiness-env-on", undefined);
    assert.equal(getCircuitBreaker("glm").getStatus().failureCount, 1);
  });
});
