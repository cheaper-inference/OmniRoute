/**
 * The dashboard decides, before its first request, whether the session can use local-only
 * features (`resolveDashboardLocalAccess`, called from the dashboard layout). That decision
 * reads the authz pipeline's peer-locality stamp from the PAGE request's headers.
 *
 * This pins the contract the layout depends on: for a dashboard page request the pipeline
 * forwards the stamp as a request-header override, and the helper reads it as remote / local.
 * Without the stamp reaching the page the feature silently degrades to "undecided" (one
 * rejected request per session before the notice), which no UI test would notice.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { SignJWT } from "jose";
import { NextRequest } from "next/server";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omr-page-locality-stamp-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-secret";
process.env.OMNIROUTE_DISABLE_REDIS_AUTH_CACHE = "1";

const core = await import("../../../src/lib/db/core.ts");
const apiKeysDb = await import("../../../src/lib/db/apiKeys.ts");
const settingsDb = await import("../../../src/lib/db/settings.ts");
const pipeline = await import("../../../src/server/authz/pipeline.ts");
const { AUTHZ_HEADER_PEER_LOCALITY } = await import("../../../src/server/authz/headers.ts");
const { resolveDashboardLocalAccess } =
  await import("../../../src/lib/security/dashboardLocalAccess.ts");

const STAMP_TOKEN = "page-locality-stamp-token";
const SAVED_ENV = {
  JWT_SECRET: process.env.JWT_SECRET,
  INITIAL_PASSWORD: process.env.INITIAL_PASSWORD,
  OMNIROUTE_TRUST_PROXY: process.env.OMNIROUTE_TRUST_PROXY,
  OMNIROUTE_PEER_STAMP_TOKEN: process.env.OMNIROUTE_PEER_STAMP_TOKEN,
};

test.beforeEach(async () => {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  process.env.JWT_SECRET = "page-locality-jwt-secret";
  process.env.INITIAL_PASSWORD = "page-locality-initial-password";
  process.env.OMNIROUTE_PEER_STAMP_TOKEN = STAMP_TOKEN;
  delete process.env.OMNIROUTE_TRUST_PROXY;
  await settingsDb.updateSettings({ requireLogin: true });
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  for (const [key, value] of Object.entries(SAVED_ENV)) {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
});

async function dashboardCookie(): Promise<string> {
  const token = await new SignJWT({ authenticated: true })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("1h")
    .sign(new TextEncoder().encode(process.env.JWT_SECRET));
  return `auth_token=${token}`;
}

/**
 * The request headers a server component reads through `headers()`: Next carries the
 * overrides of `NextResponse.next({ request: { headers } })` on the proxy response as
 * `x-middleware-override-headers` plus one `x-middleware-request-<name>` per header.
 */
function headersThePageSees(response: Response): Headers {
  const names = (response.headers.get("x-middleware-override-headers") || "")
    .split(",")
    .filter(Boolean);
  const seen = new Headers();
  for (const name of names) {
    const value = response.headers.get(`x-middleware-request-${name}`);
    if (value !== null) seen.set(name, value);
  }
  return seen;
}

async function pageRequest(pathname: string, peerIp: string, viaProxy: boolean) {
  const headers: Record<string, string> = {
    cookie: await dashboardCookie(),
    "x-omniroute-peer-ip": `${STAMP_TOKEN}|${peerIp}`,
  };
  if (viaProxy) headers["x-omniroute-via-proxy"] = `${STAMP_TOKEN}|1`;
  const response = await pipeline.runAuthzPipeline(
    new NextRequest(`http://gateway.example.test${pathname}`, { headers }),
    { enforce: true }
  );
  assert.equal(response.status, 200);
  return headersThePageSees(response);
}

for (const pathname of ["/dashboard/plugins", "/dashboard/resilience/connections", "/home"]) {
  test(`a remote request for ${pathname} carries the stamp and reads as remote`, async () => {
    const seen = await pageRequest(pathname, "203.0.113.8", true);

    assert.equal(seen.get(AUTHZ_HEADER_PEER_LOCALITY), "remote");
    const access = resolveDashboardLocalAccess(seen);
    assert.equal(access.locality, "remote");
    // Spawn-capable reads stay blocked for a remote session…
    assert.ok(access.remoteBlockedPaths.includes("/api/plugins"));
    assert.ok(access.remoteBlockedPaths.includes("/api/db/health"));
    // …while a read the guard exempts is never reported as blocked.
    assert.equal(access.remoteBlockedPaths.includes("/api/services/cliproxy/status"), false);
  });
}

test("a loopback page request carries the stamp and reads as local", async () => {
  const seen = await pageRequest("/dashboard/plugins", "127.0.0.1", false);

  assert.equal(seen.get(AUTHZ_HEADER_PEER_LOCALITY), "loopback");
  assert.equal(resolveDashboardLocalAccess(seen).locality, "local");
});

test("a private-network page request reads as local", async () => {
  const seen = await pageRequest("/dashboard/plugins", "192.168.0.44", false);

  assert.equal(seen.get(AUTHZ_HEADER_PEER_LOCALITY), "lan");
  assert.equal(resolveDashboardLocalAccess(seen).locality, "local");
});
