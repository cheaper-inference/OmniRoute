import test from "node:test";
import assert from "node:assert/strict";
import {
  getDefaultComboConfig,
  resolveComboConfig,
  resolveComboSetupConfig,
} from "../../open-sse/services/comboConfig.ts";
import { shouldRecordProviderBreakerFailure } from "../../open-sse/services/combo/comboPredicates.ts";
import { comboRuntimeConfigSchema } from "../../src/shared/validation/schemas/combo.ts";

const ENV_KEY = "OMNIROUTE_CIRCUIT_BREAKER_TRACK_STREAM_TIMEOUT";

function withEnv(value: string | undefined, fn: () => void): void {
  const prev = process.env[ENV_KEY];
  if (value === undefined) {
    delete process.env[ENV_KEY];
  } else {
    process.env[ENV_KEY] = value;
  }
  try {
    fn();
  } finally {
    if (prev === undefined) {
      delete process.env[ENV_KEY];
    } else {
      process.env[ENV_KEY] = prev;
    }
  }
}

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
