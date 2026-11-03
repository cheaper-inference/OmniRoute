// tests/unit/proxy-fetch-econnreset-retry.test.ts
// Covers Fix 4: ECONNRESET/EPIPE must qualify for proxyFetch's retry-once-on-
// fresh-socket recovery like the other transport codes (ECONNREFUSED,
// ETIMEDOUT, UND_ERR_*). Previously a stale pooled socket the server
// half-closed surfaced as an immediate client-visible error ("ECONNRESET: The
// socket connection was closed unexpectedly") instead of the transparent retry.
//
// The retry predicate is exercised through the exported pure classifier
// (isTransportRetryableError); the direct/relay egress paths call exactly this
// function, so a regression that drops a code from the predicate IS the
// regression that drops it from the retry paths.
import test from "node:test";
import assert from "node:assert/strict";

import { isTransportRetryableError } from "../../open-sse/utils/proxyFetch.ts";

test("ECONNRESET qualifies for transport retry (by code)", () => {
  assert.equal(isTransportRetryableError("fetch failed", "ECONNRESET"), true);
});

test("ECONNRESET qualifies for transport retry (by message)", () => {
  assert.equal(
    isTransportRetryableError(
      "ECONNRESET: The socket connection was closed unexpectedly.",
      undefined
    ),
    true
  );
});

test("EPIPE qualifies for transport retry", () => {
  assert.equal(isTransportRetryableError("write EPIPE", "EPIPE"), true);
});

test("previously-retryable codes still qualify (no regression)", () => {
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
