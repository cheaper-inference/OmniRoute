import test from "node:test";
import assert from "node:assert/strict";
import {
  isModelScopedAccessDenial,
  KILO_PAID_MODEL_AUTH_REQUIRED,
} from "../../open-sse/services/accountFallback/modelScopedAccessDenial.ts";
import {
  classifyProviderError,
  PROVIDER_ERROR_TYPES,
} from "../../open-sse/services/errorClassifier.ts";
import {
  applyComboTargetExhaustion,
  type ComboExhaustionSets,
} from "../../open-sse/services/combo/targetExhaustion.ts";
import { shouldRecordProviderBreakerFailure } from "../../open-sse/services/combo/comboPredicates.ts";

// Kilo refuses a paid model for a caller without an account with the code
// PAID_MODEL_AUTH_REQUIRED. The live body was not captured (no provider network in
// this environment), so the three envelope shapes the gateway family uses are all
// covered: top-level `error_type`, `error.code` and `error.type`.
const CODE = "PAID_MODEL_AUTH_REQUIRED";
const MESSAGE = "Authentication is required to use this model.";
const TOP = { error_type: CODE, message: MESSAGE };
const NESTED_CODE = { error: { code: CODE, message: MESSAGE } };
const NESTED_TYPE = { error: { type: CODE, message: MESSAGE } };

test("the exported code constant matches the wire value", () => {
  assert.equal(KILO_PAID_MODEL_AUTH_REQUIRED, CODE);
});

test("kilo PAID_MODEL_AUTH_REQUIRED is a model-scoped denial on both Kilo providers", () => {
  for (const provider of ["kilo-gateway", "kilocode"]) {
    for (const status of [401, 402, 403]) {
      assert.equal(isModelScopedAccessDenial(provider, status, MESSAGE, null, TOP), true);
      assert.equal(isModelScopedAccessDenial(provider, status, MESSAGE, { code: CODE }), true);
      assert.equal(isModelScopedAccessDenial(provider, status, MESSAGE, { type: CODE }), true);
      assert.equal(isModelScopedAccessDenial(provider, status, JSON.stringify(NESTED_CODE)), true);
      assert.equal(isModelScopedAccessDenial(provider, status, JSON.stringify(NESTED_TYPE)), true);
      assert.equal(isModelScopedAccessDenial(provider, status, JSON.stringify(TOP)), true);
      assert.equal(isModelScopedAccessDenial(provider, status, MESSAGE, null, NESTED_CODE), true);
      assert.equal(
        isModelScopedAccessDenial(provider, status, MESSAGE, null, JSON.stringify(NESTED_TYPE)),
        true
      );
    }
  }
});

test("the code match is exact and case-insensitive", () => {
  assert.equal(
    isModelScopedAccessDenial("kilo-gateway", 403, MESSAGE, { code: CODE.toLowerCase() }),
    true
  );
  assert.equal(
    isModelScopedAccessDenial("kilo-gateway", 403, MESSAGE, { code: `${CODE}_V2` }),
    false
  );
  assert.equal(
    isModelScopedAccessDenial("kilo-gateway", 403, MESSAGE, null, { error_type: `X_${CODE}` }),
    false
  );
});

test("classifier maps it to MODEL_NOT_FOUND, never FORBIDDEN/UNAUTHORIZED", () => {
  assert.equal(
    classifyProviderError(403, MESSAGE, "kilo-gateway", TOP),
    PROVIDER_ERROR_TYPES.MODEL_NOT_FOUND
  );
  assert.equal(
    classifyProviderError(401, MESSAGE, "kilo-gateway", TOP),
    PROVIDER_ERROR_TYPES.MODEL_NOT_FOUND
  );
  assert.equal(
    classifyProviderError(402, MESSAGE, "kilocode", TOP),
    PROVIDER_ERROR_TYPES.MODEL_NOT_FOUND
  );
  assert.equal(
    classifyProviderError(403, JSON.stringify(NESTED_CODE), "kilocode"),
    PROVIDER_ERROR_TYPES.MODEL_NOT_FOUND
  );
});

test("guards: other providers, other codes and real credential errors keep their path", () => {
  assert.equal(isModelScopedAccessDenial("openrouter", 401, "x", null, TOP), false);
  assert.equal(isModelScopedAccessDenial("kilo-gateway", 401, "Invalid API key"), false);
  assert.equal(
    isModelScopedAccessDenial("kilo-gateway", 401, "Invalid API key", { code: CODE }),
    false
  );
  assert.equal(isModelScopedAccessDenial("kilo-gateway", 401, "Invalid API key", null, TOP), false);
  assert.equal(isModelScopedAccessDenial("kilo-gateway", 429, "x", null, TOP), false);
  assert.equal(isModelScopedAccessDenial("kilo-gateway", 500, "x", null, TOP), false);
  // The free-text message alone never decides: only the code does.
  assert.equal(isModelScopedAccessDenial("kilo-gateway", 403, MESSAGE), false);
  assert.equal(
    classifyProviderError(403, "Forbidden", "kilo-gateway"),
    PROVIDER_ERROR_TYPES.FORBIDDEN
  );
  assert.equal(
    classifyProviderError(401, "Invalid API key", "kilo-gateway", TOP),
    PROVIDER_ERROR_TYPES.UNAUTHORIZED
  );
  assert.equal(classifyProviderError(403, "Forbidden", "kilocode"), PROVIDER_ERROR_TYPES.FORBIDDEN);
  // Another provider carrying the same code keeps whatever it classified to before.
  assert.equal(
    classifyProviderError(403, MESSAGE, "openrouter", TOP),
    classifyProviderError(403, MESSAGE, "openrouter")
  );
});

test("combo keeps the connection and the provider for sibling models", () => {
  const sets: ComboExhaustionSets = {
    exhaustedProviders: new Set(),
    exhaustedConnections: new Set(),
    transientRateLimitedProviders: new Set(),
  };
  const target = {
    kind: "model",
    executionKey: "kilo-gateway/paid-model",
    modelStr: "kilo-gateway/paid-model",
    provider: "kilo-gateway",
    providerId: null,
    connectionId: "conn-kilo",
  } as Parameters<typeof applyComboTargetExhaustion>[0];
  const log = { info() {}, warn() {}, error() {}, debug() {} };
  const base = {
    fallbackResult: {},
    rawModel: "paid-model",
    isTokenLimitBreach: false,
    allAccountsRateLimited: false,
    requestScopedFailure: false,
    sets,
    log,
    tag: "COMBO",
    exhaustedLogLevel: "info" as const,
  };
  // A Kilo 403 is already model-scoped in a combo (passthrough models, #14136); the
  // 401 is the status the code has to rescue from auth-level exhaustion.
  for (const status of [401, 403]) {
    for (let attempt = 0; attempt < 5; attempt++) {
      const decision = applyComboTargetExhaustion(target, {
        ...base,
        result: { status },
        errorText: MESSAGE,
        upstreamErrorBody: TOP,
      });
      assert.equal(decision.providerExhausted, false);
      assert.equal(sets.exhaustedConnections.size, 0);
      assert.equal(sets.exhaustedProviders.size, 0);
    }
  }
  const auth = applyComboTargetExhaustion(target, {
    ...base,
    result: { status: 401 },
    errorText: "Invalid API key",
  });
  assert.equal(auth.providerExhausted, true);
  assert.equal(sets.exhaustedConnections.has("kilo-gateway:conn-kilo"), true);
});

test("a Kilo 4xx never trips the provider breaker", () => {
  for (const status of [401, 402, 403]) {
    assert.equal(
      shouldRecordProviderBreakerFailure({
        isStreamReadinessFailure: false,
        status,
        sameProviderNext: false,
      }),
      false
    );
  }
});
