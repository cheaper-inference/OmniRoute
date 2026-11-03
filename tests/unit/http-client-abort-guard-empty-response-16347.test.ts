// 2026-10-11 production exit 7 — `empty_response` (#16347). The Claude stream
// transform errors its controller with `markPendingRequestCleared()` in
// open-sse/utils/stream.ts::emitClaudeEmptyStreamErrorAndAbort once the empty
// upstream output has already been reported (502 error event + combo failover).
// While the combo loop sits in its retry wait, nothing consumes the errored
// stream, so the error escapes as an uncaughtException / unhandledRejection
// carrying:
//   Error: Claude returned an empty response (no content block)
//     code: 'empty_response',
//     __omniroutePendingRequestCleared: true
// The crash guard re-threw it because neither shape is one of its benign
// classes. Same escape class as #15339 (RELAY_TIMEOUT) and #15706
// (RATE_LIMIT_QUEUE_TIMEOUT): the request layer already accounted for the
// failure, so a stray copy delivered to nobody must never be process-fatal.
import test from "node:test";
import assert from "node:assert/strict";
import {
  isClientAbortError,
  isHandledStreamLifecycleError,
  shouldSwallowUncaught,
} from "../../src/shared/utils/httpClientAbortGuard.mjs";

function emptyResponseError(): Error & {
  code?: string;
  __omniroutePendingRequestCleared?: boolean;
} {
  // Exact production shape (open-sse/utils/stream.ts
  // emitClaudeEmptyStreamErrorAndAbort: message + code + cleared marker).
  return Object.assign(new Error("Claude returned an empty response (no content block)"), {
    code: "empty_response",
    __omniroutePendingRequestCleared: true,
  });
}

test("isHandledStreamLifecycleError recognizes the #16347 production shape", () => {
  assert.equal(isHandledStreamLifecycleError(emptyResponseError()), true);
});

test("isHandledStreamLifecycleError accepts the pending-request-cleared marker alone", () => {
  // markPendingRequestCleared (open-sse/utils/stream.ts PENDING_REQUEST_CLEARED_MARKER)
  // stamps every stream error whose pending-request entry was already cleared —
  // the empty-stream flush, the upstream-start timeout and the empty-choices
  // flush alike. The marker alone means the request layer accounted for it.
  const stampedTimeout = Object.assign(new Error("Upstream did not start in time"), {
    __omniroutePendingRequestCleared: true,
  });
  assert.equal(isHandledStreamLifecycleError(stampedTimeout), true);
});

test("isHandledStreamLifecycleError accepts a bare empty_response code", () => {
  // Older builds / alternative emitters may carry only the code.
  assert.equal(
    isHandledStreamLifecycleError(
      Object.assign(new Error("Claude returned an empty response"), { code: "empty_response" })
    ),
    true
  );
  // A bare-string reject reason (abort() / reject() with a string) too.
  assert.equal(isHandledStreamLifecycleError("empty_response"), true);
});

test("isHandledStreamLifecycleError rejects unrelated errors", () => {
  assert.equal(isHandledStreamLifecycleError(new Error("boom")), false);
  assert.equal(
    isHandledStreamLifecycleError(
      Object.assign(new Error("x"), { code: "upstream_empty_response" })
    ),
    false
  );
  assert.equal(
    isHandledStreamLifecycleError(
      Object.assign(new Error("x"), { __omniroutePendingRequestCleared: false })
    ),
    false
  );
  assert.equal(isHandledStreamLifecycleError(null), false);
  assert.equal(isHandledStreamLifecycleError(undefined), false);
  assert.equal(isHandledStreamLifecycleError(42), false);
  assert.equal(isHandledStreamLifecycleError("empty_respons"), false);
});

test("isHandledStreamLifecycleError does not overlap with isClientAbortError", () => {
  const empty = emptyResponseError();
  assert.equal(isClientAbortError(empty), false);
  assert.equal(isHandledStreamLifecycleError(empty), true);

  const abort = { code: "ECONNRESET" };
  assert.equal(isClientAbortError(abort), true);
  assert.equal(isHandledStreamLifecycleError(abort), false);
});

test("shouldSwallowUncaught swallows the empty_response escape for both origins", () => {
  const err = emptyResponseError();
  assert.equal(shouldSwallowUncaught(err, "uncaughtException"), true);
  assert.equal(shouldSwallowUncaught(err, "unhandledRejection"), true);
  assert.equal(shouldSwallowUncaught(err, undefined), true);
});

test("shouldSwallowUncaught still surfaces genuine errors after the extension", () => {
  const genuineBug = new TypeError("Cannot read properties of undefined");
  assert.equal(shouldSwallowUncaught(genuineBug, "uncaughtException"), false);
  assert.equal(shouldSwallowUncaught(genuineBug, "unhandledRejection"), false);

  const unknownCode = Object.assign(new Error("mystery"), { code: "empty_respons" });
  assert.equal(shouldSwallowUncaught(unknownCode, "unhandledRejection"), false);
});

test("shouldSwallowUncaught still swallows the pre-existing benign classes (no regression)", () => {
  assert.equal(shouldSwallowUncaught(new Error("aborted"), "uncaughtException"), true);
  assert.equal(
    shouldSwallowUncaught(
      Object.assign(new Error("[ProxyFetch] Relay timed out"), { code: "RELAY_TIMEOUT" }),
      "uncaughtException"
    ),
    true
  );
  assert.equal(
    shouldSwallowUncaught(
      Object.assign(new Error("Direct response did not start within 30000ms"), {
        code: "DIRECT_RESPONSE_START_TIMEOUT",
      }),
      "unhandledRejection"
    ),
    true
  );
  assert.equal(
    shouldSwallowUncaught(Object.assign(new TypeError("fetch failed"), {}), "unhandledRejection"),
    true
  );
});
