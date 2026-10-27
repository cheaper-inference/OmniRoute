/**
 * MCP Streamable HTTP spec (2025-11-25 and 2026-07-28): servers MUST validate the
 * `Origin` header on all incoming connections, and answer 403 when it is present
 * and invalid. Before this guard OmniRoute checked `Origin` only for dashboard-
 * session writes, so an API key, the local CLI token or an anonymous loopback
 * caller (requireLogin=false) reached `/api/mcp/*` whatever its `Origin` said.
 *
 * Also locks the Host / reverse-proxy properties the allowlist relies on: a forged
 * Host never becomes a trusted origin, forwarded headers count only from a trusted
 * proxy, and LOCAL_ONLY locality is decided by the stamped socket peer.
 *
 * Hard Rules #12, #15, #18.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { SignJWT } from "jose";
import { NextRequest } from "next/server";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omr-mcp-origin-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-secret";
process.env.OMNIROUTE_DISABLE_REDIS_AUTH_CACHE = "1";

const core = await import("../../src/lib/db/core.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const pipeline = await import("../../src/server/authz/pipeline.ts");
const csrf = await import("../../src/server/authz/csrf.ts");
const { DASHBOARD_CSRF_HEADER } = await import("../../src/shared/constants/dashboardCsrf.ts");
const { CLI_TOKEN_HEADER, PEER_IP_HEADER, VIA_PROXY_HEADER } =
  await import("../../src/server/authz/headers.ts");
const { MCP_CONNECT_SCOPE } = await import("../../src/shared/constants/managementScopes.ts");
const { getMachineTokenSync } = await import("../../src/lib/machineToken.ts");
const { validateMcpRequestOrigin, isMcpOriginGuardedPath, buildMcpInvalidOriginBody } =
  await import("../../src/server/origin/mcpOrigin.ts");

const MANAGED_ENV = [
  "JWT_SECRET",
  "INITIAL_PASSWORD",
  "REQUIRE_API_KEY",
  "OMNIROUTE_PUBLIC_BASE_URL",
  "NEXT_PUBLIC_BASE_URL",
  "NEXT_PUBLIC_APP_URL",
  "OMNIROUTE_TRUST_PROXY",
  "OMNIROUTE_PEER_STAMP_TOKEN",
  "OMNIROUTE_DISABLE_CLI_TOKEN",
] as const;
const ORIGINAL_ENV = Object.fromEntries(MANAGED_ENV.map((name) => [name, process.env[name]]));

const MCP_TRANSPORT_PATHS = ["/api/mcp/stream", "/api/mcp/sse"] as const;
const BASE = "http://localhost:20128";

function resetEnvironment() {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  for (const name of MANAGED_ENV) delete process.env[name];
  process.env.JWT_SECRET = "mcp-origin-jwt-secret";
  process.env.INITIAL_PASSWORD = "mcp-origin-initial-password";
  process.env.REQUIRE_API_KEY = "true";
  process.env.OMNIROUTE_PEER_STAMP_TOKEN = randomUUID();
  globalThis.__omnirouteShutdown = { init: false, shuttingDown: false, activeRequests: 0 };
}

test.beforeEach(() => {
  resetEnvironment();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  for (const [name, value] of Object.entries(ORIGINAL_ENV)) {
    if (value === undefined) delete process.env[name];
    else process.env[name] = value;
  }
  globalThis.__omnirouteShutdown = { init: false, shuttingDown: false, activeRequests: 0 };
});

async function requireLogin(enabled: boolean) {
  // getSettings() forces requireLogin back on while INITIAL_PASSWORD is set and
  // setup is incomplete (headless auto-onboarding), so login-off needs it unset.
  if (!enabled) delete process.env.INITIAL_PASSWORD;
  await settingsDb.updateSettings({ requireLogin: enabled });
}

/** Token-stamped TCP peer, as scripts/dev/peer-stamp.mjs writes it. */
function peer(ip: string, { viaProxy = false } = {}): Record<string, string> {
  const token = process.env.OMNIROUTE_PEER_STAMP_TOKEN as string;
  return {
    [PEER_IP_HEADER]: `${token}|${ip}`,
    [VIA_PROXY_HEADER]: `${token}|${viaProxy ? "1" : "0"}`,
  };
}

async function mcpConnectKeyHeader(): Promise<Record<string, string>> {
  const created = await apiKeysDb.createApiKey("mcp-origin-test", "machine-mcp-origin", [
    MCP_CONNECT_SCOPE,
  ]);
  return { authorization: `Bearer ${created.key}` };
}

async function dashboardCookie(): Promise<string> {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const token = await new SignJWT({ authenticated: true })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("1h")
    .sign(secret);
  return `auth_token=${token}`;
}

function run(pathname: string, method: string, headers: Record<string, string>, base = BASE) {
  const init: RequestInit = { method, headers };
  if (method === "POST") {
    init.body = JSON.stringify({ jsonrpc: "2.0", id: 1, method: "ping" });
    (init.headers as Record<string, string>)["content-type"] = "application/json";
  }
  return pipeline.runAuthzPipeline(new NextRequest(`${base}${pathname}`, init), { enforce: true });
}

/** The pipeline let the request through to the route handler. */
function assertPassedThrough(response: Response, label: string) {
  assert.equal(response.status, 200, label);
  assert.equal(response.headers.get("x-middleware-next"), "1", label);
}

async function assertInvalidOrigin(response: Response, label: string) {
  assert.equal(response.status, 403, label);
  assert.equal(response.headers.get("x-omniroute-route-class"), "MANAGEMENT", label);
  const requestId = response.headers.get("x-request-id");
  assert.ok(requestId, label);
  const body = await response.json();
  assert.equal(body.jsonrpc, "2.0", label);
  assert.equal(body.id, null, label);
  assert.equal(body.error.code, -32000, label);
  assert.equal(body.error.data.code, "INVALID_ORIGIN", label);
  assert.equal(body.error.data.correlation_id, requestId, label);
  return body;
}

// ─── every caller kind is checked ───────────────────────────────────────────

test("invalid Origin + mcp:connect API key → 403 on stream and sse, GET and POST", async () => {
  await requireLogin(true);
  const auth = await mcpConnectKeyHeader();

  for (const pathname of MCP_TRANSPORT_PATHS) {
    for (const method of ["GET", "POST"]) {
      const label = `${method} ${pathname}`;
      const response = await run(pathname, method, { ...auth, origin: "https://evil.example" });
      await assertInvalidOrigin(response, label);
    }
  }
});

test("the same API key without Origin, or with a localhost Origin, still passes", async () => {
  await requireLogin(true);
  const auth = await mcpConnectKeyHeader();

  for (const pathname of MCP_TRANSPORT_PATHS) {
    assertPassedThrough(await run(pathname, "POST", { ...auth }), `${pathname} no Origin`);
    assertPassedThrough(
      await run(pathname, "POST", { ...auth, origin: "http://localhost:6274" }),
      `${pathname} MCP Inspector origin`
    );
  }
});

test("invalid Origin + loopback CLI token → 403; without Origin the CLI token passes", async () => {
  await requireLogin(true);
  const cliToken = getMachineTokenSync();
  assert.ok(cliToken, "machine token must resolve for this test to mean anything");
  const cli = { ...peer("127.0.0.1"), [CLI_TOKEN_HEADER]: cliToken };

  for (const pathname of MCP_TRANSPORT_PATHS) {
    await assertInvalidOrigin(
      await run(pathname, "POST", { ...cli, origin: "https://evil.example" }),
      `${pathname} CLI token + evil Origin`
    );
    assertPassedThrough(await run(pathname, "POST", cli), `${pathname} CLI token`);
  }
});

test("invalid Origin + dashboard session → 403, including safe methods", async () => {
  await requireLogin(true);
  const cookie = await dashboardCookie();

  for (const method of ["GET", "POST"]) {
    await assertInvalidOrigin(
      await run("/api/mcp/stream", method, { cookie, origin: "https://evil.example" }),
      `${method} dashboard session`
    );
  }
});

test("a dashboard session that proves same-origin with its CSRF token keeps the fallback", async () => {
  await requireLogin(true);
  const cookie = await dashboardCookie();
  const issued = csrf.issueDashboardCsrfToken(
    new NextRequest(`${BASE}/api/auth/csrf`, { headers: { cookie } })
  );
  assert.ok(issued);

  // Tunnel-served dashboard without OMNIROUTE_PUBLIC_BASE_URL: the browser Origin
  // matches no candidate, but the CSRF token proves the call came from the dashboard.
  const response = await run("/api/mcp/restart", "POST", {
    cookie,
    origin: "https://random-tunnel.example.test",
    "sec-fetch-site": "same-origin",
    [DASHBOARD_CSRF_HEADER]: issued.token,
  });
  assertPassedThrough(response, "dashboard + CSRF");

  // The CSRF fallback is a dashboard-session property only.
  const auth = await mcpConnectKeyHeader();
  await assertInvalidOrigin(
    await run("/api/mcp/stream", "POST", {
      ...auth,
      origin: "https://random-tunnel.example.test",
      [DASHBOARD_CSRF_HEADER]: issued.token,
    }),
    "API key + stray CSRF header"
  );
});

test("anonymous loopback caller (requireLogin=false) is checked too", async () => {
  await requireLogin(false);
  const loopback = peer("127.0.0.1");

  assertPassedThrough(await run("/api/mcp/stream", "POST", loopback), "no Origin");
  await assertInvalidOrigin(
    await run("/api/mcp/stream", "POST", { ...loopback, origin: "https://evil.example" }),
    "evil Origin"
  );
});

test("`null`, opaque and non-http(s) Origins are rejected", async () => {
  await requireLogin(true);
  const auth = await mcpConnectKeyHeader();

  for (const origin of ["null", "file://", "chrome-extension://abcdefghijklmnop", "not a url"]) {
    await assertInvalidOrigin(await run("/api/mcp/stream", "POST", { ...auth, origin }), origin);
  }
});

test("the guard covers every /api/mcp/* route, not only the transports", async () => {
  await requireLogin(true);
  const auth = await mcpConnectKeyHeader();

  for (const [method, pathname] of [
    ["GET", "/api/mcp/status"],
    ["GET", "/api/mcp/tools"],
    ["GET", "/api/mcp/audit"],
    ["POST", "/api/mcp/restart"],
  ] as const) {
    await assertInvalidOrigin(
      await run(pathname, method, { ...auth, origin: "https://evil.example" }),
      `${method} ${pathname}`
    );
  }
});

test("the 403 body does not echo the rejected Origin", async () => {
  await requireLogin(true);
  const auth = await mcpConnectKeyHeader();
  const marker = "https://reflected-marker-7f3a.example";

  const response = await run("/api/mcp/stream", "POST", { ...auth, origin: marker });
  const body = await assertInvalidOrigin(response, "marker");
  assert.doesNotMatch(JSON.stringify(body), /reflected-marker-7f3a/);
});

test("non-MCP routes keep their existing Origin behaviour", async () => {
  await requireLogin(true);
  const auth = await mcpConnectKeyHeader();

  // /v1/* is CLIENT_API; it is not an MCP transport and must not start 403ing on Origin.
  const response = await run("/v1/models", "GET", { ...auth, origin: "https://evil.example" });
  assert.notEqual(response.status, 403);
});

// ─── Host / reverse-proxy regressions ───────────────────────────────────────

test("(a) DNS rebinding: forged Host + matching Origin from a loopback peer → 403", async () => {
  await requireLogin(false);
  const response = await run("/api/mcp/stream", "POST", {
    ...peer("127.0.0.1"),
    host: "evil.test:20128",
    origin: "http://evil.test:20128",
  });
  await assertInvalidOrigin(response, "rebinding");
});

test("(b) forged loopback Host from a public peer stays LOCAL_ONLY", async () => {
  await requireLogin(false);
  for (const origin of [undefined, "http://127.0.0.1:20128"]) {
    const headers: Record<string, string> = { ...peer("203.0.113.7"), host: "127.0.0.1:20128" };
    if (origin) headers.origin = origin;
    const response = await run("/api/mcp/stream", "POST", headers, "http://127.0.0.1:20128");
    assert.equal(response.status, 403, `origin=${origin}`);
    const body = await response.json();
    assert.equal(body.error.code, "LOCAL_ONLY", `origin=${origin}`);
  }
});

test("(c) trusted reverse proxy: forwarded origin is accepted, any other Origin is not", async () => {
  await requireLogin(true);
  process.env.OMNIROUTE_TRUST_PROXY = "loopback";
  const auth = await mcpConnectKeyHeader();
  const viaProxy = {
    ...peer("127.0.0.1", { viaProxy: true }),
    ...auth,
    "x-forwarded-for": "198.51.100.20",
    "x-forwarded-proto": "https",
    "x-forwarded-host": "mcp.example.test",
  };

  assertPassedThrough(
    await run("/api/mcp/stream", "POST", { ...viaProxy, origin: "https://mcp.example.test" }),
    "forwarded origin"
  );
  await assertInvalidOrigin(
    await run("/api/mcp/stream", "POST", { ...viaProxy, origin: "https://other.example.test" }),
    "other origin"
  );
});

test("(c) a configured public base URL wins over a trusted proxy's forwarded host", async () => {
  await requireLogin(true);
  process.env.OMNIROUTE_TRUST_PROXY = "loopback";
  process.env.OMNIROUTE_PUBLIC_BASE_URL = "https://gateway.example.test";
  const auth = await mcpConnectKeyHeader();
  const viaProxy = {
    ...peer("127.0.0.1", { viaProxy: true }),
    ...auth,
    "x-forwarded-for": "198.51.100.20",
    "x-forwarded-proto": "https",
    "x-forwarded-host": "attacker.example.test",
  };

  assertPassedThrough(
    await run("/api/mcp/stream", "POST", { ...viaProxy, origin: "https://gateway.example.test" }),
    "configured origin"
  );
  await assertInvalidOrigin(
    await run("/api/mcp/stream", "POST", {
      ...viaProxy,
      origin: "https://attacker.example.test",
    }),
    "forwarded host is ignored once a public origin is configured"
  );
});

test("(d) forwarded headers from an untrusted source are ignored", async () => {
  await requireLogin(true);
  const auth = await mcpConnectKeyHeader();
  const forwarded = {
    ...auth,
    "x-forwarded-proto": "https",
    "x-forwarded-host": "evil.example.test",
    origin: "https://evil.example.test",
  };

  // Proxy trust disabled (the default), loopback socket.
  await assertInvalidOrigin(
    await run("/api/mcp/stream", "POST", {
      ...peer("127.0.0.1", { viaProxy: true }),
      ...forwarded,
    }),
    "OMNIROUTE_TRUST_PROXY unset"
  );

  // Proxy trust enabled, but the peer is a public address, not a proxy we trust.
  process.env.OMNIROUTE_TRUST_PROXY = "private";
  await assertInvalidOrigin(
    await run("/api/mcp/stream", "POST", { ...peer("203.0.113.7"), ...forwarded }),
    "untrusted public peer"
  );
});

test("direct LAN access by IP keeps working; a different LAN Origin does not", async () => {
  await requireLogin(true);
  const auth = await mcpConnectKeyHeader();
  const lan = { ...peer("192.168.0.20"), ...auth, host: "192.168.0.15:20128" };

  assertPassedThrough(
    await run("/api/mcp/stream", "POST", { ...lan, origin: "http://192.168.0.15:20128" }),
    "same LAN host"
  );
  await assertInvalidOrigin(
    await run("/api/mcp/stream", "POST", { ...lan, origin: "http://192.168.0.99:20128" }),
    "other LAN host"
  );
});

// ─── validateMcpRequestOrigin unit contract ─────────────────────────────────

test("validateMcpRequestOrigin: absent / empty Origin is allowed", () => {
  assert.deepEqual(validateMcpRequestOrigin(new Request(`${BASE}/api/mcp/stream`)), { ok: true });
  assert.deepEqual(
    validateMcpRequestOrigin(new Request(`${BASE}/api/mcp/stream`, { headers: { origin: "" } })),
    { ok: true }
  );
});

test("validateMcpRequestOrigin: localhost origins on any port, case-insensitively", () => {
  for (const origin of [
    "http://localhost:6274",
    "https://localhost",
    "http://127.0.0.1:3000",
    "http://[::1]:6274",
    "HTTP://LOCALHOST:6274",
  ]) {
    const request = new Request("http://omniroute:20128/api/mcp/stream", { headers: { origin } });
    assert.deepEqual(validateMcpRequestOrigin(request), { ok: true }, origin);
  }
});

test("validateMcpRequestOrigin: lookalike localhost hosts are not localhost", () => {
  for (const origin of [
    "http://localhost.evil.example",
    "http://127.0.0.1.nip.io",
    "http://evil.example#localhost",
  ]) {
    const request = new Request("http://omniroute:20128/api/mcp/stream", { headers: { origin } });
    assert.deepEqual(
      validateMcpRequestOrigin(request),
      { ok: false, reason: "invalid-origin" },
      origin
    );
  }
});

test("validateMcpRequestOrigin: the request URL origin is a candidate", () => {
  const request = new Request("http://omniroute:20128/api/mcp/stream", {
    headers: { origin: "http://omniroute:20128" },
  });
  assert.deepEqual(validateMcpRequestOrigin(request), { ok: true });
});

test("isMcpOriginGuardedPath covers /api/mcp/* only", () => {
  assert.equal(isMcpOriginGuardedPath("/api/mcp/stream"), true);
  assert.equal(isMcpOriginGuardedPath("/api/mcp/sse"), true);
  assert.equal(isMcpOriginGuardedPath("/api/mcp/audit/stats"), true);
  assert.equal(isMcpOriginGuardedPath("/api/mcpx"), false);
  assert.equal(isMcpOriginGuardedPath("/api/keys"), false);
  assert.equal(isMcpOriginGuardedPath("/v1/models"), false);
});

test("buildMcpInvalidOriginBody keeps its guidance intact through sanitization", () => {
  const body = buildMcpInvalidOriginBody("req_123");
  assert.equal(body.error.data.correlation_id, "req_123");
  assert.match(body.error.message, /^Invalid request origin for the MCP endpoint\./);
  assert.match(body.error.message, /OMNIROUTE_PUBLIC_BASE_URL/);
});
