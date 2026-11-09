import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { SignJWT } from "jose";

/**
 * Regression tests for the uppercase-path auth bypass.
 *
 * The authz proxy (src/proxy.ts) matcher patterns with custom regex groups
 * (e.g. `/:v1seg([vV]1)/:path*`) do not reliably match uppercase path variants
 * in production, so requests like `POST /V1/chat/completions` skip the proxy
 * and reach the route handler. The handlers must therefore enforce
 * authentication independently via `enforceClientApiRouteAuth` — these tests
 * pin that handler-level safety net.
 */

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omr-handler-auth-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-api-key-secret-for-handler-auth-tests-0001";

const apiKeysDb = await import("../../../src/lib/db/apiKeys.ts");
const core = await import("../../../src/lib/db/core.ts");
const { enforceClientApiRouteAuth } =
  await import("../../../src/shared/utils/clientApiRouteAuth.ts");

const ORIGINAL_REQUIRE_API_KEY = process.env.REQUIRE_API_KEY;
const ORIGINAL_JWT_SECRET = process.env.JWT_SECRET;

function resetStorage() {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  delete process.env.JWT_SECRET;
  process.env.REQUIRE_API_KEY = "true";
}

test.beforeEach(() => {
  resetStorage();
});

test.after(() => {
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  if (ORIGINAL_REQUIRE_API_KEY === undefined) delete process.env.REQUIRE_API_KEY;
  else process.env.REQUIRE_API_KEY = ORIGINAL_REQUIRE_API_KEY;
  if (ORIGINAL_JWT_SECRET === undefined) delete process.env.JWT_SECRET;
  else process.env.JWT_SECRET = ORIGINAL_JWT_SECRET;
});

function routeRequest(pathname: string, headers?: HeadersInit): Request {
  return new Request(`http://localhost${pathname}`, {
    method: "POST",
    headers: new Headers(headers),
  });
}

async function dashboardCookie(): Promise<string> {
  process.env.JWT_SECRET = "test-jwt-secret-for-handler-auth-tests-0002";
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const token = await new SignJWT({ authenticated: true })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("1h")
    .sign(secret);
  return `auth_token=${token}`;
}

test("handler guard rejects keyless inference requests (proxy-bypass safety net)", async () => {
  for (const p of ["/api/v1/chat/completions", "/api/v1/responses", "/api/v1/messages"]) {
    const rejection = await enforceClientApiRouteAuth(await routeRequest(p));
    assert.ok(rejection, `keyless ${p} must be rejected at the handler`);
    assert.equal(rejection.status, 401);
  }
});

test("handler guard accepts a valid API key", async () => {
  const created = await apiKeysDb.createApiKey("handler-test-key", "machine-handler-1");
  assert.ok(created?.key, "createApiKey must return a key");
  const rejection = await enforceClientApiRouteAuth(
    await routeRequest("/api/v1/chat/completions", {
      authorization: `Bearer ${created.key}`,
    })
  );
  assert.equal(rejection, null);
});

test("handler guard rejects an invalid API key", async () => {
  const rejection = await enforceClientApiRouteAuth(
    await routeRequest("/api/v1/chat/completions", {
      authorization: "Bearer invalid-key-xyz",
    })
  );
  assert.ok(rejection, "invalid key must be rejected");
  assert.equal(rejection.status, 401);
});

test("handler guard accepts a dashboard session (existing behavior preserved)", async () => {
  const rejection = await enforceClientApiRouteAuth(
    await routeRequest("/api/v1/chat/completions", { cookie: await dashboardCookie() })
  );
  assert.equal(rejection, null);
});

test("handler guard allows anonymous when REQUIRE_API_KEY is off", async () => {
  process.env.REQUIRE_API_KEY = "false";
  const rejection = await enforceClientApiRouteAuth(await routeRequest("/api/v1/chat/completions"));
  assert.equal(rejection, null);
});
