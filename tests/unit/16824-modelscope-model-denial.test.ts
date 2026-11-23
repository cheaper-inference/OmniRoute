import test from "node:test";
import assert from "node:assert/strict";
import { isModelScopedAccessDenial } from "../../open-sse/services/accountFallback/modelScopedAccessDenial.ts";
import { classifyProviderError, PROVIDER_ERROR_TYPES } from "../../open-sse/services/errorClassifier.ts";
import { applyComboTargetExhaustion, type ComboExhaustionSets } from "../../open-sse/services/combo/targetExhaustion.ts";

test("#16824: ModelScope invalid_model does not mark a valid credential expired", () => {
  const body = '{"error":{"code":"invalid_model","type":"invalid_request_error","message":"The model does not exist or you do not have access to it."}}';
  assert.equal(isModelScopedAccessDenial("modelscope", 401, body), true);
  assert.equal(classifyProviderError(401, body, "modelscope"), PROVIDER_ERROR_TYPES.MODEL_NOT_FOUND);
  assert.equal(isModelScopedAccessDenial("modelscope", 403, "upstream", { code: "invalid_model" }), true);
  assert.equal(isModelScopedAccessDenial("modelscope", 401, "Invalid API key"), false);
  assert.equal(isModelScopedAccessDenial("anthropic", 401, body), false);
  assert.equal(isModelScopedAccessDenial("modelscope", 401, "Invalid API key: invalid_model"), false);
  assert.equal(
    isModelScopedAccessDenial("modelscope", 403, "generic upstream error", {
      code: "invalid_model",
      message: "Invalid API key",
    }),
    false,
    "structured authentication failures must not be mistaken for model-only access errors"
  );
  assert.equal(classifyProviderError(401, "Invalid API key", "modelscope"), PROVIDER_ERROR_TYPES.UNAUTHORIZED);
});

test("#16824: combo preserves sibling models when ModelScope denies one model", () => {
  const sets: ComboExhaustionSets = {
    exhaustedProviders: new Set(),
    exhaustedConnections: new Set(),
    transientRateLimitedProviders: new Set(),
  };
  const target = {
    kind: "model",
    executionKey: "modelscope/model-a",
    modelStr: "modelscope/model-a",
    provider: "modelscope",
    providerId: null,
    connectionId: "conn-modelscope",
  } as Parameters<typeof applyComboTargetExhaustion>[0];
  const log = { info() {}, warn() {}, error() {}, debug() {} };
  const base = {
    fallbackResult: {},
    rawModel: "model-a",
    isTokenLimitBreach: false,
    allAccountsRateLimited: false,
    requestScopedFailure: false,
    sets,
    log,
    tag: "COMBO",
    exhaustedLogLevel: "info" as const,
  };
  for (let attempt = 0; attempt < 5; attempt++) {
    const decision = applyComboTargetExhaustion(target, {
      ...base,
      result: { status: 401 },
      errorText: '{"error":{"code":"invalid_model"}}',
      structuredError: { code: "invalid_model", type: "invalid_request_error" },
    });
    assert.equal(decision.providerExhausted, false);
    assert.equal(sets.exhaustedConnections.size, 0);
    assert.equal(sets.exhaustedProviders.size, 0);
  }
  const auth = applyComboTargetExhaustion(target, {
    ...base,
    result: { status: 401 },
    errorText: "Invalid API key",
  });
  assert.equal(auth.providerExhausted, true);
  assert.equal(sets.exhaustedConnections.has("modelscope:conn-modelscope"), true);
});
