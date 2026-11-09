// Account-semaphore capacity rejections (#17229). `rateLimitSemaphore` rejects
// with `SEMAPHORE_TIMEOUT` (queue wait expired) or `SEMAPHORE_QUEUE_FULL`
// (admission refused) when an account is saturated. The request layer already
// maps both to a 429 (chatCore/streamErrorResult.ts::isSemaphoreCapacityError),
// so a stray copy of the rejection that reaches the process-level handlers is
// a capacity signal for a request that was already answered — never a reason to
// take the whole gateway down. Same escape class as RELAY_TIMEOUT (#15339),
// RATE_LIMIT_QUEUE_TIMEOUT (#15706) and empty_response (#16347).
import test from "node:test";
import assert from "node:assert/strict";
import { shouldSwallowUncaught } from "../../src/shared/utils/httpClientAbortGuard.mjs";

function semaphoreError(code: string, message: string): Error & { code: string } {
  return Object.assign(new Error(message), { code });
}

for (const origin of ["unhandledRejection", "uncaughtException"]) {
  test(`SEMAPHORE_TIMEOUT is swallowed (${origin})`, () => {
    const err = semaphoreError(
      "SEMAPHORE_TIMEOUT",
      "Semaphore timeout after 30000ms for nvidia:c1"
    );
    assert.equal(shouldSwallowUncaught(err, origin), true);
  });

  test(`SEMAPHORE_QUEUE_FULL is swallowed (${origin})`, () => {
    const err = semaphoreError("SEMAPHORE_QUEUE_FULL", "Semaphore queue full for nvidia:c1");
    assert.equal(shouldSwallowUncaught(err, origin), true);
  });
}

test("SEMAPHORE_TIMEOUT is swallowed when the origin is absent (plain rejection)", () => {
  const err = semaphoreError("SEMAPHORE_TIMEOUT", "Semaphore timeout");
  assert.equal(shouldSwallowUncaught(err, undefined), true);
});

test("a semaphore code from a foreign origin keeps the crash semantics", () => {
  const err = semaphoreError("SEMAPHORE_TIMEOUT", "Semaphore timeout");
  assert.equal(shouldSwallowUncaught(err, "someOtherOrigin"), false);
});

test("unrelated and non-capacity semaphore codes are NOT swallowed", () => {
  for (const code of ["SEMAPHORE_RESET", "ERR_UNRELATED", "semaphore_timeout"]) {
    assert.equal(
      shouldSwallowUncaught(semaphoreError(code, "boom"), "unhandledRejection"),
      false,
      `code ${code} must still crash`
    );
  }
  assert.equal(shouldSwallowUncaught(new Error("plain bug"), "uncaughtException"), false);
});

test("non-object rejection reasons are NOT swallowed by the semaphore class", () => {
  assert.equal(shouldSwallowUncaught("SEMAPHORE_TIMEOUT", "unhandledRejection"), false);
  assert.equal(shouldSwallowUncaught(null, "unhandledRejection"), false);
});
