/**
 * The dashboard decides, before its first request, whether the session can use local-only
 * features (`resolveDashboardLocalAccess`, called from the dashboard layout). That decision
 * reads the authz pipeline's LOCAL_ONLY verdict from the PAGE request's headers.
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
const { stampPeerIp } = await import("../../../scripts/dev/peer-stamp.mjs");
const { AUTHZ_HEADER_DASHBOARD_LOCAL_ACCESS, AUTHZ_HEADER_PEER_LOCALITY } =
  await import("../../../src/server/authz/headers.ts");
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

async function inboundHeaders(peerIp: string | null, extra: Record<string, string> = {}) {
  const headers = { cookie: await dashboardCookie(), ...extra };
  if (peerIp) stampPeerIp({ headers, socket: { remoteAddress: peerIp } });
  return headers;
}

function request(pathname: string, headers: Record<string, string>) {
  return pipeline.runAuthzPipeline(
    new NextRequest(`http://gateway.example.test${pathname}`, { headers }),
    { enforce: true }
  );
}

async function pageRequest(pathname: string, peerIp: string, viaProxy: boolean) {
  const headers = await inboundHeaders(peerIp, viaProxy ? { via: "1.1 proxy" } : {});
  const response = await request(pathname, headers);
  assert.equal(response.status, 200);
  return headersThePageSees(response);
}

for (const pathname of [
  "/dashboard/plugins",
  "/dashboard/resilience/connections",
  "/dashboard/onboarding",
  "/home",
]) {
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

async function assertDashboardAndGuardAgree(
  expected: "local" | "remote",
  headers: Record<string, string>
) {
  const page = await request("/dashboard/plugins", headers);
  assert.equal(page.status, 200);
  const api = await request("/api/plugins", headers);
  if (expected === "remote") {
    assert.equal(api.status, 403);
    assert.equal((await api.json()).error.code, "LOCAL_ONLY");
  } else {
    assert.equal(api.status, 200);
    assert.equal(headersThePageSees(api).has(AUTHZ_HEADER_DASHBOARD_LOCAL_ACCESS), false);
  }
  assert.equal(resolveDashboardLocalAccess(headersThePageSees(page)).locality, expected);
}

test("a Via hop on loopback looks remote to both the page and the API guard", async () => {
  await assertDashboardAndGuardAgree(
    "remote",
    await inboundHeaders("127.0.0.1", { via: "1.1 proxy" })
  );
  await assertDashboardAndGuardAgree("local", await inboundHeaders("127.0.0.1"));
});

test("without a stamping server the localhost Host cannot turn the remote verdict into local", async () => {
  delete process.env.OMNIROUTE_PEER_STAMP_TOKEN;
  await assertDashboardAndGuardAgree(
    "remote",
    await inboundHeaders(null, {
      host: "localhost",
      via: "1.1 proxy",
      [AUTHZ_HEADER_PEER_LOCALITY]: "loopback",
      [AUTHZ_HEADER_DASHBOARD_LOCAL_ACCESS]: "local",
      "x-omniroute-peer-ip": "forged|127.0.0.1",
      "x-omniroute-via-proxy": "forged|0",
    })
  );
});

test("private proxy mode still denies remote clients and allows a stamped private-LAN client", async () => {
  process.env.OMNIROUTE_TRUST_PROXY = "private";
  await assertDashboardAndGuardAgree(
    "remote",
    await inboundHeaders("127.0.0.1", {
      "x-forwarded-for": "203.0.113.8",
      [AUTHZ_HEADER_PEER_LOCALITY]: "loopback",
      [AUTHZ_HEADER_DASHBOARD_LOCAL_ACCESS]: "local",
      "x-omniroute-peer-ip": "forged|127.0.0.1",
      "x-omniroute-via-proxy": "forged|0",
      "x-omniroute-client-ip": "forged|192.168.0.44",
    })
  );
  await assertDashboardAndGuardAgree(
    "local",
    await inboundHeaders("127.0.0.1", { "x-forwarded-for": "192.168.0.44" })
  );
});

test("embedded-service requests do not receive the dashboard layout verdict", async () => {
  const pathname = "/dashboard/providers/services/9router/embed/";
  const local = await request(pathname, await inboundHeaders("127.0.0.1"));
  assert.equal(local.status, 200);
  assert.equal(headersThePageSees(local).has(AUTHZ_HEADER_DASHBOARD_LOCAL_ACCESS), false);

  const relayed = await request(pathname, await inboundHeaders("127.0.0.1", { via: "1.1 proxy" }));
  assert.equal(relayed.status, 307);
  assert.equal(new URL(relayed.headers.get("location")!).pathname, "/login");
  assert.equal(headersThePageSees(relayed).has(AUTHZ_HEADER_DASHBOARD_LOCAL_ACCESS), false);
});
