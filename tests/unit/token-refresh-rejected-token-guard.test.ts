// A refresh token the server rejected as dead (invalid_grant, ...) must not be sent upstream again.
// Re-presenting a dead token costs a round trip each sweep and can raise a reuse alarm at the issuer.
// A different token (re-login) must be tried at once, so the guard compares token values.
import test from "node:test";
import assert from "node:assert/strict";

const { PROVIDERS } = await import("../../open-sse/config/constants.ts");
const { getAccessToken } = await import("../../open-sse/services/tokenRefresh.ts");

const originalFetch = globalThis.fetch;
const PROBE = "refresh-guard-probe";
(PROVIDERS as Record<string, unknown>)[PROBE] = {
  refreshUrl: "https://auth.example.test/token",
  clientId: "client-id",
};
test.after(() => {
  globalThis.fetch = originalFetch;
  delete (PROVIDERS as Record<string, unknown>)[PROBE];
});

function stubFetch(respond: () => Response) {
  const calls: unknown[] = [];
  globalThis.fetch = (async (_url: unknown, init: { body?: unknown } = {}) => {
    calls.push(String(init.body));
    return respond();
  }) as never;
  return calls;
}

const dead = () =>
  new Response(JSON.stringify({ error: "invalid_grant" }), {
    status: 400,
    headers: { "content-type": "application/json" },
  });
const ok = () =>
  new Response(
    JSON.stringify({ access_token: "new-access", refresh_token: "new-refresh", expires_in: 3600 }),
    { status: 200, headers: { "content-type": "application/json" } }
  );

const log = { info() {}, warn() {}, error() {}, debug() {} };
const unrecoverable = { error: "unrecoverable_refresh_error", code: "invalid_grant" };
const creds = (refreshToken: string, connectionId?: string) => ({ refreshToken, connectionId });

test("a rejected refresh token is not sent upstream a second time", async () => {
  const calls = stubFetch(dead);
  const first = await getAccessToken(PROBE, creds("dead-token-1"), log);
  const second = await getAccessToken(PROBE, creds("dead-token-1"), log);
  assert.deepEqual(first, unrecoverable);
  assert.deepEqual(second, unrecoverable, "the later call still reports the rejection");
  assert.equal(calls.length, 1, "only the first call reaches the server");
});

test("the guard also holds on the per-connection path", async () => {
  const calls = stubFetch(dead);
  await getAccessToken(PROBE, creds("dead-token-2", "conn-guard-2"), log);
  const second = await getAccessToken(PROBE, creds("dead-token-2", "conn-guard-2"), log);
  assert.deepEqual(second, unrecoverable);
  assert.equal(calls.length, 1);
});

test("a different refresh token is tried at once", async () => {
  const calls = stubFetch(dead);
  await getAccessToken(PROBE, creds("dead-token-3"), log);
  stubFetch(ok);
  const relogin = await getAccessToken(PROBE, creds("fresh-token-3"), log);
  assert.equal((relogin as { accessToken?: string }).accessToken, "new-access");
  assert.equal(calls.length, 1);
});

test("a transient failure is not remembered", async () => {
  const calls = stubFetch(() => new Response("{}", { status: 503 }));
  assert.equal(await getAccessToken(PROBE, creds("flaky-token-4"), log), null);
  assert.equal(await getAccessToken(PROBE, creds("flaky-token-4"), log), null);
  assert.equal(calls.length, 2, "a retryable failure still reaches the server each time");
});

test("a rejection that may come from our own request is not remembered (invalid_request)", async () => {
  const calls = stubFetch(
    () =>
      new Response(JSON.stringify({ error: "invalid_request" }), {
        status: 400,
        headers: { "content-type": "application/json" },
      })
  );
  const first = await getAccessToken(PROBE, creds("request-token-6"), log);
  await getAccessToken(PROBE, creds("request-token-6"), log);
  assert.deepEqual(first, { error: "unrecoverable_refresh_error", code: "invalid_request" });
  assert.equal(calls.length, 2, "invalid_request can come from a bad client setting; retry it");
});

for (const kept of ["claude", "kimi-coding"]) {
  test(`${kept} keeps its token on purpose, so a rejected token is retried`, async () => {
    const calls = stubFetch(dead);
    const token = `kept-token-${kept}`;
    await getAccessToken(kept, creds(token), log);
    await getAccessToken(kept, creds(token), log);
    assert.equal(calls.length, 2, "the bounded health-check retry still reaches the server");
  });
}

test("the guard expires after 30 minutes so a fixed configuration is retried", async (t) => {
  const calls = stubFetch(dead);
  const realNow = Date.now();
  const clock = t.mock.method(Date, "now", () => realNow);
  await getAccessToken(PROBE, creds("dead-token-5"), log);
  clock.mock.mockImplementation(() => realNow + 31 * 60 * 1000);
  await getAccessToken(PROBE, creds("dead-token-5"), log);
  assert.equal(calls.length, 2);
});

test("the guard is bounded: the oldest rejected token is retried after 500 newer ones", async () => {
  const calls = stubFetch(dead);
  await getAccessToken(PROBE, creds("bounded-token-0"), log);
  for (let i = 1; i <= 500; i++) await getAccessToken(PROBE, creds(`bounded-token-${i}`), log);
  const before = calls.length;
  await getAccessToken(PROBE, creds("bounded-token-0"), log);
  assert.equal(calls.length, before + 1, "the evicted token reaches the server again");
  await getAccessToken(PROBE, creds("bounded-token-500"), log);
  assert.equal(calls.length, before + 1, "a recent rejected token is still guarded");
});
