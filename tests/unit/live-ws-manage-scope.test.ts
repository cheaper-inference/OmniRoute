// The live dashboard WebSocket sidecar streams operator telemetry (requests, combo
// routing, credential health, proxy, compression, agents) for every tenant of the
// instance. A Bearer API key on the upgrade must therefore carry a management scope —
// an inference-only key handed to an end user is not an operator credential. Matrix:
//   - dashboard session cookie                       → welcome;
//   - API key with `manage` (or `admin`) scope       → welcome;
//   - API key with `read` / `write` / no scope       → UNAUTHORIZED (same close as an
//                                                       invalid key);
//   - unknown key                                    → UNAUTHORIZED (unchanged).
//
// Importing liveServer.ts is safe: the module-level auto-start guard is short-circuited
// because the Node test runner passes "--test" in process.argv (see #14256's test).
import { after, before, describe, test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import net from "node:net";
import os from "node:os";
import path from "node:path";

import { WebSocket } from "ws";

import { createManagementSessionToken } from "../helpers/managementSession.ts";

// ── Env setup ─────────────────────────────────────────────────────────────
// Must happen before importing the DB, which reads DATA_DIR at import time.
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-live-ws-manage-scope-"));
const ORIGINAL_ENV = {
  DATA_DIR: process.env.DATA_DIR,
  JWT_SECRET: process.env.JWT_SECRET,
  API_KEY_SECRET: process.env.API_KEY_SECRET,
  LIVE_WS_HOST: process.env.LIVE_WS_HOST,
  OMNIROUTE_API_KEY: process.env.OMNIROUTE_API_KEY,
  ROUTER_API_KEY: process.env.ROUTER_API_KEY,
};

process.env.DATA_DIR = TEST_DATA_DIR;
process.env.JWT_SECRET = "test-jwt-secret-live-ws-manage-scope";
process.env.API_KEY_SECRET = "test-api-key-secret-live-ws-manage-scope";
delete process.env.LIVE_WS_HOST; // keep the default loopback bind (127.0.0.1)
// The env master key is materialised with `manage` scope and would make every bearer
// valid — keep it out of this matrix.
delete process.env.OMNIROUTE_API_KEY;
delete process.env.ROUTER_API_KEY;

// Import DB modules after DATA_DIR is set.
const core = await import("../../src/lib/db/core.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const { updateSettings } = await import("../../src/lib/db/settings.ts");
const { startLiveDashboardServer } = await import("../../src/server/ws/liveServer.ts");

// ── Helpers ───────────────────────────────────────────────────────────────

function getFreePort(host: string): Promise<number> {
  return new Promise((resolve, reject) => {
    const srv = net.createServer();
    srv.once("error", reject);
    srv.listen(0, host, () => {
      const addr = srv.address();
      const port = addr && typeof addr === "object" ? addr.port : null;
      srv.close(() => {
        if (port) resolve(port);
        else reject(new Error("Could not allocate a port"));
      });
    });
  });
}

type FirstMessage = { type: string; code?: string; message?: string };

/**
 * Open ws://127.0.0.1:<port>/live-ws with the given upgrade headers, subscribe to
 * the operator "requests" channel and resolve with the first server frame
 * ("welcome" on success, "error" with code UNAUTHORIZED on rejection).
 */
function connectAndWait(port: number, headers: Record<string, string>): Promise<FirstMessage> {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(`ws://127.0.0.1:${port}/live-ws`, {
      origin: "http://127.0.0.1:20128",
      headers,
    });
    const timer = setTimeout(() => {
      ws.terminate();
      reject(new Error("Timed out waiting for WebSocket message"));
    }, 5000);

    ws.once("open", () => {
      ws.send(JSON.stringify({ type: "subscribe", channels: ["requests"] }));
    });

    ws.once("message", (data) => {
      clearTimeout(timer);
      try {
        resolve(JSON.parse(String(data)) as FirstMessage);
      } catch {
        reject(new Error("Invalid JSON from server"));
      } finally {
        ws.close();
      }
    });

    ws.once("error", (err) => {
      clearTimeout(timer);
      reject(err);
    });
  });
}

function describeFrame(msg: FirstMessage): string {
  return `type=${msg.type} code=${msg.code ?? ""} message=${msg.message ?? ""}`;
}

// ── Tests ─────────────────────────────────────────────────────────────────

describe("LiveWS authorizeConnection — bearer keys need a management scope", () => {
  let server: import("http").Server | null = null;
  let port = 0;
  let readKey = "";
  let writeKey = "";
  let unscopedKey = "";
  let manageKey = "";
  let adminKey = "";

  before(async () => {
    core.resetDbInstance();
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
    fs.mkdirSync(TEST_DATA_DIR, { recursive: true });

    // Login enforced with a password set, so no anonymous bypass applies.
    await updateSettings({ requireLogin: true, password: "hashed-password-for-test" });

    readKey = (await apiKeysDb.createApiKey("inference-read", "machine-live-ws", ["read"])).key;
    writeKey = (await apiKeysDb.createApiKey("inference-write", "machine-live-ws", ["write"])).key;
    unscopedKey = (await apiKeysDb.createApiKey("inference-unscoped", "machine-live-ws")).key;
    manageKey = (await apiKeysDb.createApiKey("operator-manage", "machine-live-ws", ["manage"]))
      .key;
    adminKey = (await apiKeysDb.createApiKey("operator-admin", "machine-live-ws", ["admin"])).key;

    port = await getFreePort("127.0.0.1");
    server = await startLiveDashboardServer(port, "127.0.0.1");
  });

  after(async () => {
    if (server) {
      await new Promise<void>((resolve) => server!.close(() => resolve()));
      server = null;
    }
    apiKeysDb.resetApiKeyState();
    core.resetDbInstance();
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
    for (const [key, value] of Object.entries(ORIGINAL_ENV)) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  });

  test("a `read` (inference-only) key is rejected", async () => {
    const msg = await connectAndWait(port, { authorization: `Bearer ${readKey}` });
    assert.equal(msg.type, "error", `Expected error but got ${describeFrame(msg)}`);
    assert.equal(msg.code, "UNAUTHORIZED");
  });

  test("a `write` key is rejected", async () => {
    const msg = await connectAndWait(port, { authorization: `Bearer ${writeKey}` });
    assert.equal(msg.type, "error", `Expected error but got ${describeFrame(msg)}`);
    assert.equal(msg.code, "UNAUTHORIZED");
  });

  test("a key with no scopes is rejected", async () => {
    const msg = await connectAndWait(port, { authorization: `Bearer ${unscopedKey}` });
    assert.equal(msg.type, "error", `Expected error but got ${describeFrame(msg)}`);
    assert.equal(msg.code, "UNAUTHORIZED");
  });

  test("a `manage` key is accepted", async () => {
    const msg = await connectAndWait(port, { authorization: `Bearer ${manageKey}` });
    assert.equal(msg.type, "welcome", `Expected welcome but got ${describeFrame(msg)}`);
  });

  test("an `admin` key is accepted (superset of manage)", async () => {
    const msg = await connectAndWait(port, { authorization: `Bearer ${adminKey}` });
    assert.equal(msg.type, "welcome", `Expected welcome but got ${describeFrame(msg)}`);
  });

  test("a `manage` key is also accepted through the X-Live-WS-Token header", async () => {
    const msg = await connectAndWait(port, { "x-live-ws-token": manageKey });
    assert.equal(msg.type, "welcome", `Expected welcome but got ${describeFrame(msg)}`);
  });

  test("a dashboard session cookie is accepted (UI path unchanged)", async () => {
    const token = await createManagementSessionToken(process.env.JWT_SECRET);
    const msg = await connectAndWait(port, { cookie: `auth_token=${token}` });
    assert.equal(msg.type, "welcome", `Expected welcome but got ${describeFrame(msg)}`);
  });

  test("an unknown key is still rejected", async () => {
    const msg = await connectAndWait(port, { authorization: "Bearer sk-not-a-real-key" });
    assert.equal(msg.type, "error", `Expected error but got ${describeFrame(msg)}`);
    assert.equal(msg.code, "UNAUTHORIZED");
  });

  test("no credential at all is still rejected", async () => {
    const msg = await connectAndWait(port, {});
    assert.equal(msg.type, "error", `Expected error but got ${describeFrame(msg)}`);
    assert.equal(msg.code, "UNAUTHORIZED");
  });
});
