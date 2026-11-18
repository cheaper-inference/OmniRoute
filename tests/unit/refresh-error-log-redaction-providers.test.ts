// A failed token refresh must not put the upstream error body into logs raw:
// OAuth servers can echo the refresh token, client secret or a bearer value.
// Codex is covered by codex-refresh-error-log-redaction.test.ts; this file covers the rest.
import test from "node:test";
import assert from "node:assert/strict";

const { PROVIDERS, OAUTH_ENDPOINTS } = await import("../../open-sse/config/constants.ts");
const {
  refreshAccessToken,
  refreshClineToken,
  refreshQoderToken,
  refreshCodebuddyCnToken,
  refreshOpenferenceToken,
} = await import("../../open-sse/services/tokenRefresh.ts");
const { refreshWorkbuddyToken } =
  await import("../../open-sse/services/tokenRefresh/providers/workbuddy.ts");

const originalFetch = globalThis.fetch;
test.after(() => {
  globalThis.fetch = originalFetch;
});

const JWT =
  "eyJhbGciOiJIUzI1NiJ9" + "." + "eyJzdWIiOiJ1c2VyMTIzNDU2In0" + "." + "c2lnbmF0dXJlMTIzNDU2Nzg5MA";
const BEARER = "abcDEF1234567890abcDEF1234567890";
const RT = "rt_Zq83kLmP0aXy9TuVw12345";

const LEAKY_BODIES: Array<[string, string, string[]]> = [
  [
    "labeled JSON fields",
    JSON.stringify({ error: "server_error", refresh_token: RT, client_secret: "cs_" + RT }),
    [RT, "cs_" + RT],
  ],
  [
    "bearer value and JWT",
    `upstream echoed Authorization: Bearer ${BEARER} and ${JWT}`,
    [BEARER, JWT],
  ],
];

function patch<T extends object>(target: T, values: Record<string, unknown>) {
  const saved = Object.fromEntries(Object.keys(values).map((k) => [k, (target as never)[k]]));
  Object.assign(target, values);
  return () => Object.assign(target, saved);
}

const PROVIDER_CASES: Array<[string, (log: unknown) => Promise<unknown>]> = [
  [
    "generic refreshAccessToken",
    async (log) => {
      const undo = patch(PROVIDERS as never, {
        "refresh-redaction-probe": { refreshUrl: "https://auth.example.test/token", clientId: "c" },
      });
      try {
        return await refreshAccessToken("refresh-redaction-probe", RT, {}, log);
      } finally {
        delete (PROVIDERS as never)["refresh-redaction-probe"];
        undo();
      }
    },
  ],
  ["cline", (log) => refreshClineToken(RT, log)],
  [
    "qoder",
    async (log) => {
      const undoP = patch(PROVIDERS.qoder as never, { clientId: "qc", clientSecret: "qs" });
      const undoE = patch(OAUTH_ENDPOINTS.qoder as never, {
        token: "https://qoder.example.test/t",
      });
      try {
        return await refreshQoderToken(RT, log);
      } finally {
        undoE();
        undoP();
      }
    },
  ],
  ["codebuddy shared (CN)", (log) => refreshCodebuddyCnToken(RT, log as never)],
  ["workbuddy", (log) => refreshWorkbuddyToken(RT, log as never)],
  ["openference", (log) => refreshOpenferenceToken(RT, log)],
];

async function refreshFailing(
  call: (log: unknown) => Promise<unknown>,
  status: number,
  body: string
) {
  globalThis.fetch = (async () =>
    new Response(body, { status, headers: { "content-type": "application/json" } })) as never;
  const logged: unknown[][] = [];
  const log = {
    error: (...args: unknown[]) => logged.push(args),
    info: () => {},
    warn: () => {},
    debug: () => {},
  };
  const result = await call(log);
  return { result, logged: JSON.stringify(logged) };
}

for (const [provider, call] of PROVIDER_CASES) {
  for (const [name, body, secrets] of LEAKY_BODIES) {
    test(`${provider}: 500 refresh failure does not log secrets (${name})`, async () => {
      const { result, logged } = await refreshFailing(call, 500, body);
      assert.equal(result, null, "a transient 500 stays retryable (null)");
      assert.match(logged, /500/);
      for (const secret of secrets) {
        assert.ok(!logged.includes(secret), `log leaked ${secret.slice(0, 12)}...`);
      }
    });
  }
}

test("a 500 body without secrets is still logged as a summary", async () => {
  const { logged } = await refreshFailing(
    (log) => refreshClineToken(RT, log),
    500,
    JSON.stringify({ error: "server_error" })
  );
  assert.match(logged, /server_error/);
});

test("invalid_grant is still unrecoverable and its code survives (cline, generic)", async () => {
  const body = JSON.stringify({ error: "invalid_grant" });
  const expected = { error: "unrecoverable_refresh_error", code: "invalid_grant" };
  assert.deepEqual(
    (await refreshFailing((l) => refreshClineToken(RT, l), 400, body)).result,
    expected
  );
  assert.deepEqual((await refreshFailing(PROVIDER_CASES[0][1], 400, body)).result, expected);
});
