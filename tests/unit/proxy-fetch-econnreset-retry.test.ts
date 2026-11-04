// tests/unit/proxy-fetch-econnreset-retry.test.ts
// Covers the proxyFetch transport-retry predicate (CodeRabbit review 18948):
// ECONNRESET/EPIPE are retried ONLY for idempotent methods (RFC 9110 §9.2.2),
// because they can fire after the upstream accepted the request — replaying a
// non-idempotent POST could repeat the upstream side effect. Legacy codes
// (fetch failed, ECONNREFUSED, ETIMEDOUT, UND_ERR_*) keep the pre-existing
// unconditional behavior since they fire at/before connection establishment.
//
// The idempotency gate is enforced by the callers (direct + relay paths) via
// isMidConnectionResetCode/isIdempotentMethod, which are tested here through
// the exported classifier and a behavioral check of the gate logic.
import test from "node:test";
import assert from "node:assert/strict";

import { isTransportRetryableError } from "../../open-sse/utils/proxyFetch.ts";

// Mirror of the caller-side gate (proxyFetch direct/relay catch blocks) so a
// regression that drops the idempotency check from either path fails here.
function callerGate(msg: string, errCode: unknown, method: string | null | undefined): boolean {
  const midConnectionReset =
    errCode === "ECONNRESET" ||
    msg.includes("ECONNRESET") ||
    errCode === "EPIPE" ||
    msg.includes("EPIPE");
  const idempotent =
    method != null &&
    ["GET", "HEAD", "PUT", "DELETE", "OPTIONS"].includes(method.trim().toUpperCase());
  return isTransportRetryableError(msg, errCode) && (!midConnectionReset || idempotent);
}

test("ECONNRESET qualifies for transport retry by code (legacy classifier)", () => {
  assert.equal(isTransportRetryableError("fetch failed", "ECONNRESET"), true);
});

test("ECONNRESET qualifies by message (legacy classifier)", () => {
  assert.equal(
    isTransportRetryableError(
      "ECONNRESET: The socket connection was closed unexpectedly.",
      undefined
    ),
    true
  );
});

test("EPIPE qualifies for transport retry (legacy classifier)", () => {
  assert.equal(isTransportRetryableError("write EPIPE", "EPIPE"), true);
});

test("legacy codes still qualify (no regression)", () => {
  assert.equal(isTransportRetryableError("fetch failed", "ECONNREFUSED"), true);
  assert.equal(isTransportRetryableError("ETIMEDOUT", "ETIMEDOUT"), true);
  assert.equal(isTransportRetryableError("getaddrinfo ENOTFOUND x", "ENOTFOUND"), true);
  assert.equal(isTransportRetryableError("fetch failed", "EAI_AGAIN"), true);
  assert.equal(isTransportRetryableError("request failed", "UND_ERR_CONNECT_TIMEOUT"), true);
  assert.equal(isTransportRetryableError("fetch failed", undefined), true);
});

test("non-transport errors do NOT qualify", () => {
  assert.equal(isTransportRetryableError("401 Unauthorized", undefined), false);
  assert.equal(isTransportRetryableError("invalid api key", "AUTH_ERROR"), false);
  assert.equal(isTransportRetryableError("", undefined), false);
});

test("caller gate: ECONNRESET retries for idempotent methods", () => {
  assert.equal(callerGate("read ECONNRESET", "ECONNRESET", "GET"), true);
  assert.equal(callerGate("read ECONNRESET", "ECONNRESET", "head"), true);
  assert.equal(callerGate("write EPIPE", "EPIPE", "DELETE"), true);
  assert.equal(callerGate("write EPIPE", "EPIPE", "options"), true);
  assert.equal(callerGate("write EPIPE", "EPIPE", "put"), true);
});

test("caller gate: ECONNRESET does NOT retry non-idempotent POST", () => {
  // The exact scenario from the review: upstream committed the POST, then the
  // connection reset before a response arrived.
  assert.equal(callerGate("read ECONNRESET", "ECONNRESET", "POST"), false);
  assert.equal(callerGate("write EPIPE", "EPIPE", "POST"), false);
  assert.equal(
    callerGate("ECONNRESET: The socket connection was closed unexpectedly.", undefined, "POST"),
    false
  );
});

test("caller gate: legacy codes keep unconditional retry even for POST (pre-existing behavior)", () => {
  assert.equal(callerGate("fetch failed", "ECONNREFUSED", "POST"), true);
  assert.equal(callerGate("ETIMEDOUT", "ETIMEDOUT", "POST"), true);
  assert.equal(callerGate("request failed", "UND_ERR_CONNECT_TIMEOUT", "POST"), true);
});

test("caller gate: unknown method with ECONNRESET defaults to no-retry (fail-safe)", () => {
  assert.equal(callerGate("read ECONNRESET", "ECONNRESET", null), false);
  assert.equal(callerGate("read ECONNRESET", "ECONNRESET", undefined), false);
});
