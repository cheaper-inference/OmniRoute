// The sidecar's internal event endpoint (POST /__omniroute_event) has no shared secret:
// it trusts the caller because the TCP peer is loopback. A same-host reverse proxy that
// forwards arbitrary paths also connects from loopback, so a request that carries a
// proxy-hop header (x-forwarded-*, x-real-ip, forwarded, via) did NOT come from the local
// publisher and must be refused with the same 403 a non-loopback peer gets. The legitimate
// publisher (open-sse/handlers/chatCore/telemetryHelpers.ts) posts straight to
// 127.0.0.1 without such headers and keeps working.
//
// Importing liveServer.ts is safe: the module-level auto-start guard is short-circuited
// because the Node test runner passes "--test" in process.argv (see #14256's test).
import { after, before, describe, test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import http from "node:http";
import net from "node:net";
import os from "node:os";
import path from "node:path";

// ── Env setup ─────────────────────────────────────────────────────────────
// Must happen before importing the DB, which reads DATA_DIR at import time.
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-live-ws-event-hop-"));
const ORIGINAL_ENV = {
  DATA_DIR: process.env.DATA_DIR,
  JWT_SECRET: process.env.JWT_SECRET,
  LIVE_WS_HOST: process.env.LIVE_WS_HOST,
};

process.env.DATA_DIR = TEST_DATA_DIR;
process.env.JWT_SECRET = "test-jwt-secret-live-ws-event-hop";
delete process.env.LIVE_WS_HOST; // keep the default loopback bind (127.0.0.1)

const core = await import("../../src/lib/db/core.ts");
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

const VALID_EVENT = JSON.stringify({
  event: "request.started",
  payload: { requestId: "evt-test", model: "test/model" },
  timestamp: Date.now(),
});

/** POST a dashboard event to the sidecar from loopback with the given extra headers. */
function postEvent(
  port: number,
  headers: Record<string, string>
): Promise<{ status: number; body: string }> {
  return new Promise((resolve, reject) => {
    const req = http.request(
      {
        host: "127.0.0.1",
        port,
        method: "POST",
        path: "/__omniroute_event",
        headers: {
          "content-type": "application/json",
          "content-length": Buffer.byteLength(VALID_EVENT),
          ...headers,
        },
      },
      (res) => {
        let body = "";
        res.setEncoding("utf8");
        res.on("data", (chunk) => (body += chunk));
        res.on("end", () => resolve({ status: res.statusCode ?? 0, body }));
      }
    );
    req.setTimeout(5000, () => req.destroy(new Error("Timed out waiting for the sidecar")));
    req.once("error", reject);
    req.end(VALID_EVENT);
  });
}

// ── Tests ─────────────────────────────────────────────────────────────────

describe("LiveWS POST /__omniroute_event — proxied loopback peers are not the publisher", () => {
  let server: import("http").Server | null = null;
  let port = 0;

  before(async () => {
    core.resetDbInstance();
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
    fs.mkdirSync(TEST_DATA_DIR, { recursive: true });

    port = await getFreePort("127.0.0.1");
    server = await startLiveDashboardServer(port, "127.0.0.1");
  });

  after(async () => {
    if (server) {
      await new Promise<void>((resolve) => server!.close(() => resolve()));
      server = null;
    }
    core.resetDbInstance();
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
    for (const [key, value] of Object.entries(ORIGINAL_ENV)) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  });

  test("a direct loopback publisher without proxy headers is accepted (202)", async () => {
    const res = await postEvent(port, {});
    assert.equal(res.status, 202, `Expected 202 but got ${res.status} ${res.body}`);
    assert.deepEqual(JSON.parse(res.body), { ok: true });
  });

  for (const header of ["x-forwarded-for", "x-real-ip", "forwarded", "via", "x-forwarded-proto"]) {
    test(`a loopback request carrying ${header} is refused like a remote peer (403)`, async () => {
      const res = await postEvent(port, { [header]: "203.0.113.7" });
      assert.equal(res.status, 403, `Expected 403 but got ${res.status} ${res.body}`);
      assert.deepEqual(JSON.parse(res.body), { ok: false });
    });
  }

  test("the publisher path keeps working after refused proxied attempts", async () => {
    const res = await postEvent(port, {});
    assert.equal(res.status, 202, `Expected 202 but got ${res.status} ${res.body}`);
  });
});
