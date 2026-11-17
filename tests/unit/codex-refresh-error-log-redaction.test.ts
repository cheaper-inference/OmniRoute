// Codex refresh failures must not put the upstream error body into logs raw:
// OAuth servers can echo the refresh token, client secret or a bearer value.
import test from "node:test";
import assert from "node:assert/strict";

const { refreshCodexToken } =
  await import("../../open-sse/services/tokenRefresh/providers/codex.ts");

const originalFetch = globalThis.fetch;
test.after(() => {
  globalThis.fetch = originalFetch;
});

const JWT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0.dozjgNryP4J3jVmNHl0w5N_XgL0n3I9PlFUP0THsR8U";

async function refreshWith(status: number, body: string) {
  globalThis.fetch = (async () =>
    new Response(body, { status, headers: { "content-type": "application/json" } })) as never;
  const logged: unknown[][] = [];
  const log = {
    error: (...args: unknown[]) => logged.push(args),
    info: () => {},
    warn: () => {},
    debug: () => {},
  };
  const result = await refreshCodexToken("rt-input", log);
  return { result, logged: JSON.stringify(logged) };
}

const LEAKY_BODIES: Array<[string, string, string[]]> = [
  [
    "labeled JSON fields",
    JSON.stringify({
      error: "server_error",
      refresh_token: "rt_Zq83kLmP0aXy9TuVw12345",
      client_secret: "cs_Zq83kLmP0aXy9TuVw12345",
    }),
    ["rt_Zq83kLmP0aXy9TuVw12345", "cs_Zq83kLmP0aXy9TuVw12345"],
  ],
  [
    "form-style pairs in a message",
    JSON.stringify({
      error: "server_error",
      error_description:
        "bad request: refresh_token=rt_Zq83kLmP0aXy9TuVw12345&code_verifier=cv_Zq83kLmP0aXy9TuVw12345",
    }),
    ["rt_Zq83kLmP0aXy9TuVw12345", "cv_Zq83kLmP0aXy9TuVw12345"],
  ],
  [
    "bearer value and JWT",
    `upstream echoed Authorization: Bearer abcDEF1234567890abcDEF1234567890 and ${JWT}`,
    ["abcDEF1234567890abcDEF1234567890", JWT],
  ],
];

for (const [name, body, secrets] of LEAKY_BODIES) {
  test(`500 refresh failure does not log secrets: ${name}`, async () => {
    const { result, logged } = await refreshWith(500, body);
    assert.equal(result, null, "a transient 500 stays retryable (null)");
    assert.match(logged, /Failed to refresh Codex token/);
    for (const secret of secrets) {
      assert.ok(!logged.includes(secret), `log leaked ${secret.slice(0, 12)}...`);
    }
  });
}

test("500 refresh failure still logs the status and a non-empty error summary", async () => {
  const { logged } = await refreshWith(500, JSON.stringify({ error: "server_error" }));
  assert.match(logged, /500/);
  assert.match(logged, /server_error/);
});

test("invalid_grant is still unrecoverable and its code survives", async () => {
  const { result } = await refreshWith(400, JSON.stringify({ error: "invalid_grant" }));
  assert.deepEqual(result, { error: "unrecoverable_refresh_error", code: "invalid_grant" });
});
