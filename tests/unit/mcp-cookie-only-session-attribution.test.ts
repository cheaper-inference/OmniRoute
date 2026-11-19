/**
 * A cookie-only MCP HTTP call carries a dashboard session cookie but no API-key
 * header. The caller resolver only looked at Authorization / x-api-key, so the
 * audit row got a null apiKeyId even though the session gate had authenticated
 * the request. The session source now travels in the ambient HTTP auth context
 * and is resolved before the stdio env-key fallback.
 */
import { after, test } from "node:test";
import assert from "node:assert/strict";

const ORIGINAL_ENV_KEY = process.env.OMNIROUTE_API_KEY;
const REQUEST_URL = "http://localhost/api/mcp/stream";

const { withMcpHttpAuthContext } = await import("../../open-sse/mcp-server/httpAuthContext.ts");
const { resolveMcpCallerApiKeyId } = await import("../../open-sse/mcp-server/mcpCallerIdentity.ts");

after(() => {
  if (ORIGINAL_ENV_KEY === undefined) delete process.env.OMNIROUTE_API_KEY;
  else process.env.OMNIROUTE_API_KEY = ORIGINAL_ENV_KEY;
});

function restoreEnvKey(): void {
  if (ORIGINAL_ENV_KEY === undefined) delete process.env.OMNIROUTE_API_KEY;
  else process.env.OMNIROUTE_API_KEY = ORIGINAL_ENV_KEY;
}

function cookieOnlyRequest(): Request {
  return new Request(REQUEST_URL, {
    method: "POST",
    headers: { Cookie: "auth_token=session-token" },
  });
}

test("a cookie-only HTTP call resolves to the dashboard session principal", async () => {
  const principal = await withMcpHttpAuthContext(cookieOnlyRequest(), () =>
    resolveMcpCallerApiKeyId()
  );
  assert.equal(principal, "dashboard-session");
});

test("a cookie-only HTTP call keeps the dashboard session principal when an env key is set", async (t) => {
  process.env.OMNIROUTE_API_KEY = "sk-env-principal-test";
  t.after(restoreEnvKey);

  const principal = await withMcpHttpAuthContext(cookieOnlyRequest(), () =>
    resolveMcpCallerApiKeyId()
  );
  assert.equal(principal, "dashboard-session");
});

test("an HTTP call with no auth headers resolves to no principal", async () => {
  const principal = await withMcpHttpAuthContext(new Request(REQUEST_URL, { method: "POST" }), () =>
    resolveMcpCallerApiKeyId()
  );
  assert.equal(principal, undefined);
});

test("an Authorization header takes precedence over the session cookie", async (t) => {
  process.env.OMNIROUTE_API_KEY = "sk-env-principal-test";
  t.after(restoreEnvKey);

  const request = new Request(REQUEST_URL, {
    method: "POST",
    headers: {
      Authorization: "Bearer sk-env-principal-test",
      Cookie: "auth_token=session-token",
    },
  });
  const principal = await withMcpHttpAuthContext(request, () => resolveMcpCallerApiKeyId());
  assert.equal(principal, "env-key");
});
