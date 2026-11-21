import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omr-mcp-goog-identity-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-secret";
// Without this, key validation stalls on a Redis-backed cache timeout in the local test loop.
process.env.OMNIROUTE_DISABLE_REDIS_AUTH_CACHE = "1";

const core = await import("../../src/lib/db/core.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const { resolveMcpCallerAuthInfo, withMcpHttpAuthContext, getMcpHttpAuthHeadersForInternalFetch } =
  await import("../../open-sse/mcp-server/httpAuthContext.ts");
const { resolvePrincipalFromHeaders, resolveMcpCallerApiKeyId } =
  await import("../../open-sse/mcp-server/mcpCallerIdentity.ts");

function reset() {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(() => {
  reset();
});

test.after(() => {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

async function forwardedHeaders(request: Request): Promise<Record<string, string>> {
  return withMcpHttpAuthContext(request, async () => getMcpHttpAuthHeadersForInternalFetch());
}

function recordingLookup(resultByKey: Record<string, { id?: string | number | null } | null>) {
  const calls: string[] = [];
  const lookup = async (rawKey: string) => {
    calls.push(rawKey);
    return resultByKey[rawKey] ?? null;
  };
  return { lookup, calls };
}

test("x-goog-api-key alone resolves authInfo and is re-emitted for internal fetches", async () => {
  const created = await apiKeysDb.createApiKey("goog-only-caller", "machine-goog-only", [
    "read:health",
  ]);
  const request = new Request("http://localhost/api/mcp/stream", {
    headers: { "x-goog-api-key": created.key },
  });

  const authInfo = await resolveMcpCallerAuthInfo(request);
  assert.ok(authInfo, "expected authInfo to resolve for a valid Google API key");
  assert.equal(authInfo.clientId, created.id);
  assert.equal(authInfo.token, created.key);
  assert.deepEqual([...(authInfo.scopes ?? [])].sort(), ["read:health"]);

  const headers = await forwardedHeaders(request);
  assert.equal(headers["x-goog-api-key"], created.key);
});

test("x-goog-api-key alone resolves the caller principal from the forwarded headers", async () => {
  const request = new Request("http://localhost/api/mcp/stream", {
    headers: { "x-goog-api-key": "sk-tenant-b" },
  });
  const headers = await forwardedHeaders(request);
  const { lookup, calls } = recordingLookup({ "sk-tenant-b": { id: "tenant-b" } });

  const principal = await resolvePrincipalFromHeaders(headers, lookup);
  assert.equal(principal, "tenant-b");
  assert.deepEqual(calls, ["sk-tenant-b"]);
});

test("an unresolved Google API key yields no principal", async () => {
  const request = new Request("http://localhost/api/mcp/stream", {
    headers: { "x-goog-api-key": "sk-unknown" },
  });
  const headers = await forwardedHeaders(request);
  const { lookup, calls } = recordingLookup({});

  const principal = await resolvePrincipalFromHeaders(headers, lookup);
  assert.equal(principal, undefined);
  assert.deepEqual(calls, ["sk-unknown"]);
});

test("a failing Google API key lookup fails closed without a substitute identity", async () => {
  const request = new Request("http://localhost/api/mcp/stream", {
    headers: { "x-goog-api-key": "sk-broken" },
  });
  const headers = await forwardedHeaders(request);
  const calls: string[] = [];
  const lookup = async (rawKey: string) => {
    calls.push(rawKey);
    throw new Error("lookup unavailable");
  };

  const principal = await resolvePrincipalFromHeaders(headers, lookup);
  assert.equal(principal, undefined);
  assert.deepEqual(calls, ["sk-broken"]);
});

test("bearer takes precedence when both headers are present", async () => {
  const bearer = await apiKeysDb.createApiKey("bearer-caller", "machine-bearer", ["read:health"]);
  const goog = await apiKeysDb.createApiKey("goog-caller", "machine-goog", ["read:health"]);
  const request = new Request("http://localhost/api/mcp/stream", {
    headers: {
      authorization: `Bearer ${bearer.key}`,
      "x-goog-api-key": goog.key,
    },
  });

  const headers = await forwardedHeaders(request);
  assert.equal(headers.Authorization, `Bearer ${bearer.key}`);
  assert.equal(headers["x-goog-api-key"], goog.key);

  const { lookup, calls } = recordingLookup({ [bearer.key]: { id: "bearer-principal" } });
  const principal = await resolvePrincipalFromHeaders(headers, lookup);
  assert.equal(principal, "bearer-principal");
  assert.deepEqual(calls, [bearer.key]);
});

test("an unresolved Google key with an auth_token cookie yields no substitute principal", async () => {
  const request = new Request("http://localhost/api/mcp/stream", {
    headers: {
      "x-goog-api-key": "sk-unresolved-with-cookie",
      Cookie: "auth_token=session-token",
    },
  });

  const principal = await withMcpHttpAuthContext(request, () => resolveMcpCallerApiKeyId());
  assert.equal(principal, undefined);
});

test("a cookie-only request keeps the dashboard-session label through the caller resolver", async () => {
  const request = new Request("http://localhost/api/mcp/stream", {
    headers: { Cookie: "auth_token=session-token" },
  });

  const principal = await withMcpHttpAuthContext(request, () => resolveMcpCallerApiKeyId());
  assert.equal(principal, "dashboard-session");
});
