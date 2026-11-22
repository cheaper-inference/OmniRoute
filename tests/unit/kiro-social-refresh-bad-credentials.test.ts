// Regression: Kiro's social token endpoint answers 401 {"message":"Bad credentials"}
// once the refresh token itself is dead. Production evidence (2026-11-11): the first
// automatic refresh ran while the account's proxies were the dead 1proxy pool, so the
// token never rotated; every later attempt got "Bad credentials". The refresh helper
// used to return null there, which the health check treated as a transient failure and
// retried every cycle forever. It must be reported as unrecoverable so the connection
// asks for re-authentication instead of hammering the proxy pool.
import test from "node:test";
import assert from "node:assert/strict";

import { refreshKiroToken } from "../../open-sse/services/tokenRefresh/providers/kiro.ts";

type FetchArgs = Parameters<typeof fetch>;

function stubFetch(
  handler: (url: string, init?: RequestInit) => Response | Promise<Response>
): () => void {
  const original = globalThis.fetch;
  globalThis.fetch = ((input: FetchArgs[0], init?: FetchArgs[1]) =>
    Promise.resolve(handler(String(input), init as RequestInit))) as typeof fetch;
  return () => {
    globalThis.fetch = original;
  };
}

const silentLog = { info: () => {}, warn: () => {}, error: () => {}, debug: () => {} };

async function refreshWith(handler: Parameters<typeof stubFetch>[0]) {
  const restore = stubFetch(handler);
  try {
    // No clientId/clientSecret -> the social-auth path is taken.
    return await refreshKiroToken("dead-refresh-token", { authMethod: "imported" }, silentLog);
  } finally {
    restore();
  }
}

test("401 Bad credentials from the social refresh endpoint is unrecoverable", async () => {
  const result = await refreshWith(
    () => new Response(JSON.stringify({ message: "Bad credentials" }), { status: 401 })
  );

  assert.equal(result?.error, "unrecoverable_refresh_error");
  assert.equal(result?.code, "bad_credentials");
  assert.equal(result?.status, 401);
});

test("400/403 carrying Bad credentials is unrecoverable too", async () => {
  for (const status of [400, 403]) {
    const result = await refreshWith(
      () => new Response(JSON.stringify({ message: "Bad credentials" }), { status })
    );
    assert.equal(result?.error, "unrecoverable_refresh_error", `status ${status}`);
  }
});

test("a server-side failure stays retryable (returns null, not a terminal error)", async () => {
  const result = await refreshWith(
    () => new Response(JSON.stringify({ message: "Internal error" }), { status: 500 })
  );

  assert.equal(result, null, "a 500 must not disable the connection");
});

test("a successful refresh still returns the rotated tokens", async () => {
  const result = await refreshWith(
    () =>
      new Response(JSON.stringify({ accessToken: "new-access", refreshToken: "new-refresh" }), {
        status: 200,
      })
  );

  assert.equal(result?.accessToken, "new-access");
  assert.equal(result?.refreshToken, "new-refresh");
});
