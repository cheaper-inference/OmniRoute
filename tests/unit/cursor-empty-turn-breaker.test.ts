import assert from "node:assert/strict";
import test from "node:test";

const { resolveCursorEmptyTurnError } =
  await import("../../open-sse/executors/cursor/cursorErrors.ts");
const { shouldTripProviderBreakerForResult } =
  await import("../../src/sse/handlers/chatPredicates.ts");
const { hasPerModelFailureScope } =
  await import("../../open-sse/services/accountFallback/perModelFailureScope.ts");
const { classifyProviderError, PROVIDER_ERROR_TYPES } =
  await import("../../open-sse/services/errorClassifier.ts");

function bareEmptyTurnResult() {
  const out = resolveCursorEmptyTurnError({});
  const body = { error: { message: out.message, type: out.type } };
  return { out, body, result: { status: out.status, errorType: out.type, error: out.message } };
}

test("bare Cursor empty turn never counts toward the whole-provider breaker", () => {
  const { result } = bareEmptyTurnResult();
  assert.equal(shouldTripProviderBreakerForResult(result, false, false, "cursor"), false);
});

test("85 consecutive empty turns do not open the cursor breaker predicate", () => {
  const { result } = bareEmptyTurnResult();
  const trips = Array.from({ length: 85 }, () =>
    shouldTripProviderBreakerForResult(result, false, false, "cursor")
  ).filter(Boolean);
  assert.equal(trips.length, 0);
});

test("bare Cursor empty turn is model-scoped so sibling models keep routing", () => {
  const { out, body } = bareEmptyTurnResult();
  assert.equal(out.status, 404);
  assert.equal(
    classifyProviderError(out.status, body, "cursor"),
    PROVIDER_ERROR_TYPES.MODEL_NOT_FOUND
  );
  assert.equal(
    hasPerModelFailureScope("cursor", "some-model", false, out.status, JSON.stringify(body)),
    true
  );
});

test("empty turn error still tells the client what to do", () => {
  const { out } = bareEmptyTurnResult();
  assert.match(out.message, /empty turn/i);
  assert.match(out.message, /quota/i);
  assert.match(out.message, /auto/);
});
