// KEA-9514: off loopback the dashboard now opens `/live-ws` on its own origin, and the
// production server relays that upgrade to the live server with the browser's headers
// unchanged (scripts/dev/standalone-server-ws.mjs::proxyLiveWs). These tests send what the
// relay delivers (the browser's Host and Origin, the reverse proxy's x-forwarded-* headers)
// straight to a real live server and check that:
//   - the dashboard's own origin with a dashboard session is welcomed;
//   - a foreign Origin is still refused, session cookie or not (cross-site hijacking);
//   - a same-origin socket without a credential is refused, also in the anonymous
//     requireLogin=false mode (a DNS-rebinding page gets no cookie of this instance).
import { after, before, describe, test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import net from "node:net";
import os from "node:os";
import path from "node:path";

import { WebSocket } from "ws";

const ORIGINAL_ENV = {
  DATA_DIR: process.env.DATA_DIR,
  JWT_SECRET: process.env.JWT_SECRET,
  API_KEY_SECRET: process.env.API_KEY_SECRET,
  LIVE_WS_HOST: process.env.LIVE_WS_HOST,
  LIVE_WS_ALLOWED_ORIGINS: process.env.LIVE_WS_ALLOWED_ORIGINS,
  LIVE_WS_ALLOWED_HOSTS: process.env.LIVE_WS_ALLOWED_HOSTS,
  OMNIROUTE_TRUST_PROXY: process.env.OMNIROUTE_TRUST_PROXY,
};

// The DB layer fixes its data directory when it is first imported; in a shared process
// another file may have imported it first, so the tests use the directory it has (DB_DIR).
const OWN_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-live-ws-same-origin-"));
process.env.DATA_DIR = OWN_DATA_DIR;

function setTestEnv(): void {
  process.env.JWT_SECRET = "test-jwt-secret-live-ws-same-origin-kea-9514";
  process.env.API_KEY_SECRET = "test-api-key-secret-live-ws-same-origin";
  delete process.env.LIVE_WS_HOST;
  delete process.env.LIVE_WS_ALLOWED_ORIGINS;
  delete process.env.LIVE_WS_ALLOWED_HOSTS;
  delete process.env.OMNIROUTE_TRUST_PROXY;
}
setTestEnv();

const core = await import("../../src/lib/db/core.ts");
const { updateSettings } = await import("../../src/lib/db/settings.ts");
const sessionTokens = await import("../../src/shared/utils/dashboardSessionToken.ts");
const { startLiveDashboardServer } = await import("../../src/server/ws/liveServer.ts");

const DB_DIR = path.dirname(core.SQLITE_FILE ?? "");

function resetDb(): void {
  core.resetDbInstance();
  assert.ok(
    path.resolve(DB_DIR).startsWith(path.resolve(os.tmpdir()) + path.sep),
    `refusing to remove ${DB_DIR}: not under the temp dir`
  );
  fs.rmSync(DB_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(DB_DIR, { recursive: true });
}

function getFreePort(): Promise<number> {
  return new Promise((resolve, reject) => {
    const srv = net.createServer();
    srv.once("error", reject);
    srv.listen(0, "127.0.0.1", () => {
      const addr = srv.address();
      srv.close(() => {
        if (addr && typeof addr === "object") resolve(addr.port);
        else reject(new Error("Could not allocate a port"));
      });
    });
  });
}

type FirstFrame = { type: string; code?: string; closeCode?: number };

/** Headers the main-port relay forwards for a page served at https://dash.example.com. */
function relayedHeaders(extra: Record<string, string> = {}): Record<string, string> {
  return {
    host: "dash.example.com",
    "x-forwarded-for": "203.0.113.7",
    "x-forwarded-proto": "https",
    "x-forwarded-host": "dash.example.com",
    ...extra,
  };
}

/** Upgrade with `origin` + `headers`, subscribe, and return the first frame and close code. */
function firstFrame(
  port: number,
  origin: string,
  headers: Record<string, string>
): Promise<FirstFrame> {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(`ws://127.0.0.1:${port}/live-ws`, { origin, headers });
    let frame: FirstFrame | null = null;
    const timer = setTimeout(() => {
      ws.terminate();
      reject(new Error("Timed out waiting for the live server"));
    }, 10_000);
    ws.once("open", () => ws.send(JSON.stringify({ type: "subscribe", channels: ["requests"] })));
    ws.once("message", (data) => {
      frame = JSON.parse(String(data));
      if (frame?.type === "welcome") {
        clearTimeout(timer);
        ws.close();
        resolve(frame);
      }
    });
    ws.once("close", (code) => {
      clearTimeout(timer);
      if (frame?.type === "welcome") return;
      resolve({ ...(frame ?? { type: "none" }), closeCode: code });
    });
    ws.once("error", (err) => {
      clearTimeout(timer);
      reject(err);
    });
  });
}

describe("LiveWS same-origin upgrades relayed by the main port (KEA-9514)", () => {
  let server: import("http").Server | null = null;
  let port = 0;
  let session = "";

  before(async () => {
    setTestEnv();
    process.env.DATA_DIR = DB_DIR;
    resetDb();
    await updateSettings({ requireLogin: true, password: "hashed-password-for-test" });
    session = await sessionTokens.mintDashboardSessionToken(
      new TextEncoder().encode(process.env.JWT_SECRET)
    );
    port = await getFreePort();
    server = await startLiveDashboardServer(port, "127.0.0.1");
  });

  after(async () => {
    if (server) {
      await new Promise<void>((resolve) => server!.close(() => resolve()));
      server = null;
    }
    core.resetDbInstance();
    fs.rmSync(DB_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
    fs.rmSync(OWN_DATA_DIR, { recursive: true, force: true });
    for (const [key, value] of Object.entries(ORIGINAL_ENV)) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  });

  test("welcomes the dashboard's own origin with a dashboard session", async () => {
    const frame = await firstFrame(
      port,
      "https://dash.example.com",
      relayedHeaders({ cookie: `theme=dark; auth_token=${session}` })
    );
    assert.equal(frame.type, "welcome", JSON.stringify(frame));
  });

  test("still refuses a foreign Origin, even with the victim's session cookie", async () => {
    for (const origin of ["https://evil.example", "https://dash.example.com.evil.example"]) {
      const frame = await firstFrame(
        port,
        origin,
        relayedHeaders({ cookie: `auth_token=${session}` })
      );
      assert.equal(frame.code, "FORBIDDEN_ORIGIN", `${origin}: ${JSON.stringify(frame)}`);
      assert.equal(frame.closeCode, 4003);
    }
  });

  test("refuses the right Origin when the Host names another site", async () => {
    const frame = await firstFrame(
      port,
      "https://dash.example.com",
      relayedHeaders({ host: "other.example", cookie: `auth_token=${session}` })
    );
    assert.equal(frame.code, "FORBIDDEN_ORIGIN", JSON.stringify(frame));
  });

  test("refuses a same-origin socket that carries no credential", async () => {
    const frame = await firstFrame(port, "https://dash.example.com", relayedHeaders());
    assert.equal(frame.code, "UNAUTHORIZED", JSON.stringify(frame));
    assert.equal(frame.closeCode, 4001);
  });

  test("does not let the anonymous mode open a same-origin socket", async () => {
    await updateSettings({ requireLogin: false });
    try {
      const frame = await firstFrame(port, "https://dash.example.com", relayedHeaders());
      assert.equal(frame.code, "FORBIDDEN_ORIGIN", JSON.stringify(frame));
      assert.equal(frame.closeCode, 4003);

      // Control: an allow-listed origin keeps the anonymous mode it had (#14256).
      const control = await firstFrame(port, "http://127.0.0.1:20128", {});
      assert.equal(control.type, "welcome", JSON.stringify(control));
    } finally {
      await updateSettings({ requireLogin: true });
    }
  });
});
