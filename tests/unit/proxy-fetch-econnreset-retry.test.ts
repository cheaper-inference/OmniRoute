// tests/unit/proxy-fetch-econnreset-retry.test.ts
// Covers the proxyFetch transport-retry policy (CodeRabbit review 18948):
// ECONNRESET/EPIPE are retried ONLY for idempotent methods (RFC 9110 §9.2.2),
// because they can fire after the upstream accepted the request — replaying a
// non-idempotent request could repeat the upstream side effect. Legacy codes
// (fetch failed, ECONNREFUSED, ETIMEDOUT, UND_ERR_*) keep the pre-existing
// unconditional behavior since they fire at/before connection establishment.
//
// The behavioral tests drive the REAL `proxyFetch` direct/relay retry paths
// with injected fetch implementations, so dropping the idempotency gate or
// moving the `tagProxyUnreachable` call in front of the classification fails
// here. A mirror of the gate would not catch either regression.
import test from "node:test";
import assert from "node:assert/strict";

import {
  isTransportRetryableError,
  proxyFetch,
  runWithProxyContext,
} from "../../open-sse/utils/proxyFetch.ts";

const target = "https://econnreset-policy.invalid/v1/messages";
const relay = {
  type: "vercel" as const,
  host: "econnreset-fixture.vercel.app",
  relayAuth: "synthetic-test-only-relay-auth",
};

function codeOnly(message: string, code: string): Error {
  const err = new Error(message) as Error & { code?: string };
  err.code = code;
  return err;
}

/**
 * Drive one `proxyFetch` call on the given route and report how many upstream
 * dispatches it made. `failures` is the number of leading attempts that throw
 * `failure`; after that the dispatch returns a successful response.
 */
async function dispatchCount(
  route: "direct" | "relay",
  init: RequestInit,
  failure: Error,
  failures = 1
): Promise<{ dispatches: number; nativeCalls: number }> {
  let dispatches = 0;
  let nativeCalls = 0;
  const perform = () =>
    proxyFetch(target, init, {
      undiciFetch: async () => {
        dispatches++;
        if (dispatches <= failures) throw failure;
        return new Response("recovered", { status: 200 });
      },
      nativeFetch: async () => {
        nativeCalls++;
        return new Response("native-fallback", { status: 200 });
      },
    });
  // A refused retry surfaces as a thrown error; that is the expected outcome
  // for the non-idempotent cases, so swallow it and assert on dispatch counts.
  await (route === "relay" ? runWithProxyContext(relay, perform) : perform()).catch(() => {
    /* expected for the non-retryable cases */
  });
  return { dispatches, nativeCalls };
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

for (const route of ["direct", "relay"] as const) {
  test(`${route}: code-only ECONNRESET retries for an idempotent GET`, async () => {
    // The error carries the code but no matching message token: this only
    // retries if the code is classified BEFORE tagProxyUnreachable rewrites it.
    const { dispatches, nativeCalls } = await dispatchCount(
      route,
      { method: "GET" },
      codeOnly("socket closed by peer", "ECONNRESET")
    );
    assert.equal(dispatches, 2, "idempotent GET keeps its single fresh-socket retry");
    assert.equal(nativeCalls, 0);
  });

  test(`${route}: code-only ECONNRESET does NOT retry a POST sent as a string URL`, async () => {
    // The review's exact case: a string URL plus options.method. The method must
    // come from options, not from the string-URL GET default.
    const { dispatches, nativeCalls } = await dispatchCount(
      route,
      { method: "POST", body: JSON.stringify({ messages: [] }) },
      codeOnly("read ECONNRESET", "ECONNRESET")
    );
    assert.equal(dispatches, 1, "a POST must not be replayed after a mid-connection reset");
    assert.equal(nativeCalls, 0, "the native fallback is another delivery attempt too");
  });

  test(`${route}: EPIPE does NOT retry a POST`, async () => {
    const { dispatches } = await dispatchCount(
      route,
      { method: "post", body: "payload" },
      codeOnly("write failed", "EPIPE")
    );
    assert.equal(dispatches, 1);
  });

  test(`${route}: legacy pre-send codes still retry a POST`, async () => {
    const { dispatches } = await dispatchCount(
      route,
      { method: "POST", body: "payload" },
      codeOnly("fetch failed", "ECONNREFUSED")
    );
    assert.equal(dispatches, 2, "stale-pool recovery for pre-send codes is unchanged");
  });
}
