/**
 * The embedded-services WebSocket proxy (initEmbedWsProxy, default :20131) tunnels a
 * client into an embedded service and adds that service's own Authorization header to
 * the tunnel. It must therefore apply the same decision as the HTTP embed route
 * (`/dashboard/providers/services/<name>/embed/`, LOCAL_ONLY + management auth) before
 * it opens the tunnel:
 *
 *   - the TCP peer is loopback and no reverse-proxy hop header is present;
 *   - a browser Origin, when sent, is one of the dashboard origins;
 *   - the caller holds a dashboard session or a management-scope API key, unless the
 *     dashboard itself runs without login (then loopback + Origin is the same bar the
 *     HTTP embed route applies).
 *
 * A rejected upgrade never reaches the upstream service, so the service credential is
 * never sent for an unauthorized caller.
 *
 * The test drives the real server (initEmbedWsProxy) over TCP against a fake upstream
 * that records what it receives.
 */
import { after, before, describe, test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import net from "node:net";
import os from "node:os";
import path from "node:path";

import { createManagementSessionToken } from "../../helpers/managementSession.ts";

const ENV_KEYS = [
  "DATA_DIR",
  "JWT_SECRET",
  "API_KEY_SECRET",
  "OMNIROUTE_API_KEY",
  "ROUTER_API_KEY",
  "INITIAL_PASSWORD",
  "EMBED_WS_PROXY_HOST",
  "EMBED_WS_PROXY_PORT",
  "LIVE_WS_HOST",
  "LIVE_WS_ALLOWED_ORIGINS",
  "LIVE_WS_ALLOWED_HOSTS",
  "PORT",
  "DASHBOARD_PORT",
] as const;
const ORIGINAL_ENV = Object.fromEntries(ENV_KEYS.map((k) => [k, process.env[k]]));

function getFreePort(): Promise<number> {
  return new Promise((resolve, reject) => {
    const srv = net.createServer();
    srv.once("error", reject);
    srv.listen(0, "127.0.0.1", () => {
      const addr = srv.address();
      const port = addr && typeof addr === "object" ? addr.port : null;
      srv.close(() => (port ? resolve(port) : reject(new Error("no port"))));
    });
  });
}

const PROXY_PORT = await getFreePort();

// Own database directory: another test file may share the inherited DATA_DIR.
const TEST_DATA_DIR = fs.mkdtempSync(
  path.join(process.env.DATA_DIR || os.tmpdir(), "embed-ws-upgrade-auth-")
);
process.env.DATA_DIR = TEST_DATA_DIR;

process.env.JWT_SECRET = "test-jwt-secret-embed-ws-upgrade-auth";
process.env.API_KEY_SECRET = "test-api-key-secret-embed-ws-upgrade-auth";
// The env master key is materialised with `manage` scope — keep it out of the matrix.
delete process.env.OMNIROUTE_API_KEY;
delete process.env.ROUTER_API_KEY;
delete process.env.INITIAL_PASSWORD;
delete process.env.LIVE_WS_HOST;
delete process.env.LIVE_WS_ALLOWED_ORIGINS;
delete process.env.LIVE_WS_ALLOWED_HOSTS;
delete process.env.PORT;
delete process.env.DASHBOARD_PORT;
// Bind every interface so the test can also reach the proxy from a non-loopback
// address of this machine (the documented LIVE_WS_HOST=0.0.0.0 exposure).
process.env.EMBED_WS_PROXY_HOST = "0.0.0.0";
process.env.EMBED_WS_PROXY_PORT = String(PROXY_PORT);

const core = await import("../../../src/lib/db/core.ts");
const apiKeysDb = await import("../../../src/lib/db/apiKeys.ts");
const { updateSettings } = await import("../../../src/lib/db/settings.ts");
const { upsertVersionManagerTool } = await import("../../../src/lib/db/versionManager.ts");
const { getOrCreateApiKey } = await import("../../../src/lib/services/apiKey.ts");
const { registerSupervisor, unregisterSupervisor } =
  await import("../../../src/lib/services/registry.ts");
const embedWsProxy = await import("../../../src/lib/services/embedWsProxy.ts");

const DASHBOARD_ORIGIN = "http://127.0.0.1:20128";
const FOREIGN_ORIGIN = "https://attacker.example";

/** First non-internal IPv4 address of this machine, if any. */
function lanAddress(): string | null {
  for (const list of Object.values(os.networkInterfaces())) {
    for (const iface of list ?? []) {
      if (iface.family === "IPv4" && !iface.internal) return iface.address;
    }
  }
  return null;
}

// ── fake upstream service ──────────────────────────────────────────────────

const upstreamRequests: string[] = [];
const upstream = net.createServer((sock) => {
  let buf = "";
  let answered = false;
  sock.on("data", (chunk) => {
    buf += chunk.toString("latin1");
    if (!answered && buf.includes("\r\n\r\n")) {
      answered = true;
      upstreamRequests.push(buf);
      sock.write(
        "HTTP/1.1 101 Switching Protocols\r\nUpgrade: websocket\r\nConnection: Upgrade\r\n\r\n"
      );
    }
  });
  sock.on("error", () => {});
});

/**
 * Send a raw WebSocket upgrade for /9router/ws to the proxy and resolve with the
 * response status code (0 when the connection closed without a status line).
 */
function attemptUpgrade(host: string, extraHeaders: Record<string, string> = {}): Promise<number> {
  return new Promise((resolve, reject) => {
    const sock = net.connect(PROXY_PORT, host);
    let buf = "";
    const timer = setTimeout(() => {
      sock.destroy();
      reject(new Error("timed out waiting for the upgrade response"));
    }, 8000);
    const finish = () => {
      clearTimeout(timer);
      const m = /^HTTP\/1\.1 (\d{3})/.exec(buf);
      sock.destroy();
      resolve(m ? Number(m[1]) : 0);
    };
    sock.on("connect", () => {
      const lines = [
        "GET /9router/ws HTTP/1.1",
        `Host: ${host}:${PROXY_PORT}`,
        "Connection: Upgrade",
        "Upgrade: websocket",
        "Sec-WebSocket-Version: 13",
        "Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==",
        ...Object.entries(extraHeaders).map(([k, v]) => `${k}: ${v}`),
      ];
      sock.write(`${lines.join("\r\n")}\r\n\r\n`);
    });
    sock.on("data", (chunk) => {
      buf += chunk.toString("latin1");
      if (buf.includes("\r\n\r\n")) finish();
    });
    sock.on("close", finish);
    sock.on("error", () => {});
  });
}

/** Run one upgrade and report the status plus how many requests reached upstream. */
async function probe(host: string, headers: Record<string, string> = {}) {
  const before = upstreamRequests.length;
  const status = await attemptUpgrade(host, headers);
  const forwarded = upstreamRequests.slice(before);
  return { status, forwarded };
}

async function waitForProxy(): Promise<void> {
  const deadline = Date.now() + 10_000;
  while (!globalThis.__omnirouteEmbedWsStarted) {
    if (Date.now() > deadline) throw new Error("embed WS proxy did not start");
    await new Promise((r) => setTimeout(r, 20));
  }
}

let proxyServer: { close: (cb?: () => void) => unknown } | undefined;
let serviceKey = "";
let manageKey = "";
let readKey = "";
let sessionCookie = "";

before(async () => {
  core.resetDbInstance();
  await new Promise<void>((resolve) => upstream.listen(0, "127.0.0.1", () => resolve()));
  const upstreamPort = (upstream.address() as net.AddressInfo).port;

  await upsertVersionManagerTool({ tool: "9router", status: "installed", port: upstreamPort });
  serviceKey = await getOrCreateApiKey("9router");
  registerSupervisor({
    getStatus: () => ({
      tool: "9router",
      state: "running",
      port: upstreamPort,
      pid: null,
      health: "healthy",
      startedAt: null,
      lastError: null,
    }),
  } as never);

  manageKey = (await apiKeysDb.createApiKey("operator", "machine-embed-ws", ["manage"])).key;
  readKey = (await apiKeysDb.createApiKey("inference", "machine-embed-ws", ["read"])).key;
  sessionCookie = `auth_token=${await createManagementSessionToken()}`;

  globalThis.__omnirouteEmbedWsStarted = undefined;
  proxyServer = embedWsProxy.initEmbedWsProxy() as typeof proxyServer;
  await waitForProxy();
});

after(async () => {
  unregisterSupervisor("9router");
  await new Promise<void>((resolve) => upstream.close(() => resolve()));
  if (proxyServer) await new Promise<void>((resolve) => proxyServer!.close(() => resolve()));
  globalThis.__omnirouteEmbedWsStarted = undefined;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  for (const k of ENV_KEYS) {
    if (ORIGINAL_ENV[k] === undefined) delete process.env[k];
    else process.env[k] = ORIGINAL_ENV[k];
  }
});

describe("embed WS proxy — login required", () => {
  before(async () => {
    await updateSettings({ requireLogin: true, password: "hashed-password-for-test" });
  });

  test("an upgrade without any credential is rejected and never reaches the service", async () => {
    const { status, forwarded } = await probe("127.0.0.1", { Origin: DASHBOARD_ORIGIN });
    assert.equal(status, 401);
    assert.equal(forwarded.length, 0, "the service must not see the upgrade");
  });

  test("an API key without a management scope is rejected", async () => {
    const { status, forwarded } = await probe("127.0.0.1", {
      Origin: DASHBOARD_ORIGIN,
      Authorization: `Bearer ${readKey}`,
    });
    assert.equal(status, 403);
    assert.equal(forwarded.length, 0);
  });

  test("a management key opens the tunnel and only the service credential is forwarded", async () => {
    const { status, forwarded } = await probe("127.0.0.1", {
      Origin: DASHBOARD_ORIGIN,
      Authorization: `Bearer ${manageKey}`,
    });
    assert.equal(status, 101);
    assert.equal(forwarded.length, 1);
    const sent = forwarded[0];
    assert.match(sent, new RegExp(`\\r\\nAuthorization: Bearer ${serviceKey}\\r\\n`));
    assert.ok(!sent.includes(manageKey), "the caller's own key must not reach the service");
    assert.ok(!/\r\norigin:/i.test(sent), "Origin is not forwarded");
  });

  test("a dashboard session cookie opens the tunnel and the cookie is not forwarded", async () => {
    const { status, forwarded } = await probe("127.0.0.1", {
      Origin: DASHBOARD_ORIGIN,
      Cookie: sessionCookie,
    });
    assert.equal(status, 101);
    assert.equal(forwarded.length, 1);
    assert.ok(!/\r\ncookie:/i.test(forwarded[0]));
  });

  test("a foreign Origin is rejected even with a valid management key", async () => {
    const { status, forwarded } = await probe("127.0.0.1", {
      Origin: FOREIGN_ORIGIN,
      Authorization: `Bearer ${manageKey}`,
    });
    assert.equal(status, 403);
    assert.equal(forwarded.length, 0);
  });

  test("a request relayed by a reverse proxy is not treated as local", async () => {
    const { status, forwarded } = await probe("127.0.0.1", {
      Origin: DASHBOARD_ORIGIN,
      Authorization: `Bearer ${manageKey}`,
      "X-Forwarded-For": "203.0.113.9",
    });
    assert.equal(status, 403);
    assert.equal(forwarded.length, 0);
  });

  test("a non-loopback peer is rejected even with a valid management key", async (t) => {
    const lan = lanAddress();
    if (!lan) {
      t.skip("no non-loopback IPv4 interface on this machine");
      return;
    }
    const { status, forwarded } = await probe(lan, {
      Origin: DASHBOARD_ORIGIN,
      Authorization: `Bearer ${manageKey}`,
    });
    assert.equal(status, 403);
    assert.equal(forwarded.length, 0);
  });
});

describe("embed WS proxy — dashboard login disabled", () => {
  before(async () => {
    await updateSettings({ requireLogin: false });
  });

  test("a loopback upgrade from the dashboard origin is accepted, as on the HTTP embed route", async () => {
    const { status, forwarded } = await probe("127.0.0.1", { Origin: DASHBOARD_ORIGIN });
    assert.equal(status, 101);
    assert.equal(forwarded.length, 1);
  });

  test("a foreign Origin is still rejected", async () => {
    const { status, forwarded } = await probe("127.0.0.1", { Origin: FOREIGN_ORIGIN });
    assert.equal(status, 403);
    assert.equal(forwarded.length, 0);
  });

  test("a non-loopback peer is still rejected", async (t) => {
    const lan = lanAddress();
    if (!lan) {
      t.skip("no non-loopback IPv4 interface on this machine");
      return;
    }
    const { status, forwarded } = await probe(lan, { Origin: DASHBOARD_ORIGIN });
    assert.equal(status, 403);
    assert.equal(forwarded.length, 0);
  });
});
