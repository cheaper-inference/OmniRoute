import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { NextRequest } from "next/server";

/**
 * With login turned off (requireLogin=false) the management plane admits anonymous
 * callers. Non-browser clients (CLI, curl) send no Origin and keep working, but a web
 * page the operator visits must not be able to drive the management API: neither a
 * cross-site page posting to the loopback port, nor a DNS-rebinding page whose Host and
 * Origin both carry the attacker's domain. The browser-origin check used to run only for
 * dashboard sessions; it now runs for anonymous management mutations too.
 */

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omr-anon-mgmt-origin-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-secret";

const core = await import("../../../src/lib/db/core.ts");
const apiKeysDb = await import("../../../src/lib/db/apiKeys.ts");
const settingsDb = await import("../../../src/lib/db/settings.ts");
const pipeline = await import("../../../src/server/authz/pipeline.ts");

const STAMP = "anon-mgmt-origin-stamp-token";
const SAVED_ENV = Object.fromEntries(
  [
    "JWT_SECRET",
    "INITIAL_PASSWORD",
    "REQUIRE_API_KEY",
    "OMNIROUTE_PUBLIC_BASE_URL",
    "NEXT_PUBLIC_BASE_URL",
    "NEXT_PUBLIC_APP_URL",
    "OMNIROUTE_TRUST_PROXY",
    "OMNIROUTE_PEER_STAMP_TOKEN",
  ].map((name) => [name, process.env[name]])
);

async function openMode() {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  process.env.JWT_SECRET = "anon-mgmt-origin-jwt-secret";
  // getSettings() forces requireLogin back on while INITIAL_PASSWORD is set and setup is
  // not complete, so it must be unset for the open-mode override to stick.
  delete process.env.INITIAL_PASSWORD;
  process.env.REQUIRE_API_KEY = "true";
  delete process.env.OMNIROUTE_PUBLIC_BASE_URL;
  delete process.env.NEXT_PUBLIC_BASE_URL;
  delete process.env.NEXT_PUBLIC_APP_URL;
  delete process.env.OMNIROUTE_TRUST_PROXY;
  process.env.OMNIROUTE_PEER_STAMP_TOKEN = STAMP;
  globalThis.__omnirouteShutdown = { init: false, shuttingDown: false, activeRequests: 0 };
  await settingsDb.updateSettings({ requireLogin: false });
}

test.beforeEach(openMode);

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  for (const [name, value] of Object.entries(SAVED_ENV)) {
    if (value === undefined) delete process.env[name];
    else process.env[name] = value;
  }
});

// The custom server stamps the real TCP peer; here it is the loopback socket a browser
// on the operator's machine (or a rebound DNS name) connects through.
function fromLoopback(url: string, method: string, headers: Record<string, string> = {}) {
  return pipeline.runAuthzPipeline(
    new NextRequest(url, {
      method,
      headers: {
        "x-omniroute-peer-ip": `${STAMP}|127.0.0.1`,
        "x-omniroute-via-proxy": `${STAMP}|0`,
        "content-type": "text/plain",
        ...headers,
      },
      body: method === "GET" ? undefined : "{}",
    }),
    { enforce: true }
  );
}

test("open mode refuses an anonymous management mutation from a cross-site page", async () => {
  const response = await fromLoopback("http://127.0.0.1:20128/api/combos", "POST", {
    host: "127.0.0.1:20128",
    origin: "https://evil.example",
    "sec-fetch-site": "cross-site",
  });

  assert.equal(response.status, 403);
  assert.equal((await response.json()).error.code, "INVALID_ORIGIN");
});

test("open mode refuses an anonymous management mutation from a DNS-rebinding page", async () => {
  // The rebound page is same-origin with itself: Host and Origin carry the attacker's
  // domain, while the socket is the loopback one.
  const response = await fromLoopback("http://localhost:20128/api/combos", "POST", {
    host: "rebind.attacker.example:20128",
    origin: "http://rebind.attacker.example:20128",
    "sec-fetch-site": "same-origin",
  });

  assert.equal(response.status, 403);
  assert.equal((await response.json()).error.code, "INVALID_ORIGIN");
});

test("open mode refuses cross-site skill install and plugin install from loopback", async () => {
  for (const route of ["/api/skills/install", "/api/plugins"]) {
    const response = await fromLoopback(`http://127.0.0.1:20128${route}`, "POST", {
      host: "127.0.0.1:20128",
      origin: "https://evil.example",
      "sec-fetch-site": "cross-site",
    });
    assert.ok(
      response.status === 401 || response.status === 403,
      `${route}: a cross-site page must not reach the handler, got ${response.status}`
    );
  }
});

test("open mode still admits anonymous management mutations with no Origin (CLI, curl)", async () => {
  const response = await fromLoopback("http://127.0.0.1:20128/api/combos", "POST", {
    host: "127.0.0.1:20128",
  });

  assert.equal(response.status, 200);
  assert.equal(response.headers.get("x-omniroute-route-class"), "MANAGEMENT");
});

test("open mode still admits anonymous management mutations from the dashboard origin", async () => {
  const response = await fromLoopback("http://localhost:20128/api/combos", "POST", {
    host: "localhost:20128",
    origin: "http://localhost:20128",
    "sec-fetch-site": "same-origin",
  });

  assert.equal(response.status, 200);
});

test("open mode still admits anonymous management mutations from a direct LAN IP origin", async () => {
  const response = await pipeline.runAuthzPipeline(
    new NextRequest("http://localhost:20128/api/combos", {
      method: "POST",
      headers: {
        "x-omniroute-peer-ip": `${STAMP}|192.168.0.20`,
        "x-omniroute-via-proxy": `${STAMP}|0`,
        "content-type": "text/plain",
        host: "192.168.0.15:20128",
        origin: "http://192.168.0.15:20128",
        "sec-fetch-site": "same-origin",
      },
      body: "{}",
    }),
    { enforce: true }
  );

  assert.equal(response.status, 200);
});

test("open mode leaves anonymous management reads alone", async () => {
  const response = await fromLoopback("http://127.0.0.1:20128/api/combos", "GET", {
    host: "127.0.0.1:20128",
    origin: "https://evil.example",
  });

  assert.equal(response.status, 200);
});

test("open mode still refuses localhost:6274 on a management route outside MCP", async () => {
  // localhost on any port is an MCP-only allowance; the dashboard rule still applies here.
  const response = await fromLoopback("http://127.0.0.1:20128/api/combos", "POST", {
    host: "127.0.0.1:20128",
    origin: "http://localhost:6274",
    "sec-fetch-site": "cross-site",
  });

  assert.equal(response.status, 403);
  assert.equal((await response.json()).error.code, "INVALID_ORIGIN");
});

test("open mode lets the MCP Origin guard decide anonymous MCP mutations", async () => {
  // A local MCP tool (e.g. the Inspector) on another localhost port is admitted by the MCP
  // guard, so the dashboard rule must not refuse it on top.
  const admitted = await fromLoopback("http://127.0.0.1:20128/api/mcp/stream", "POST", {
    host: "127.0.0.1:20128",
    origin: "http://localhost:6274",
    "sec-fetch-site": "cross-site",
  });
  assert.equal(admitted.status, 200);

  // The MCP guard still refuses a DNS-rebinding page and a non-localhost origin.
  const rebound = await fromLoopback("http://127.0.0.1:20128/api/mcp/stream", "POST", {
    host: "rebind.attacker.example:20128",
    origin: "http://rebind.attacker.example:20128",
    "sec-fetch-site": "same-origin",
  });
  assert.equal(rebound.status, 403);
  assert.equal((await rebound.json()).error.data.code, "INVALID_ORIGIN");

  const crossSite = await fromLoopback("http://127.0.0.1:20128/api/mcp/stream", "POST", {
    host: "127.0.0.1:20128",
    origin: "https://evil.example",
    "sec-fetch-site": "cross-site",
  });
  assert.equal(crossSite.status, 403);
  assert.equal((await crossSite.json()).error.data.code, "INVALID_ORIGIN");
});
