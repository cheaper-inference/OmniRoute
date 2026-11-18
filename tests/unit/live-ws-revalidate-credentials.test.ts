// R9-20: the live dashboard WebSocket checked its credential only on the upgrade. A
// connection opened with a `manage` key or a dashboard session cookie kept receiving
// operator telemetry after the key was revoked, disabled, expired, deleted or cut below
// `manage`, or after the session was signed out or cut off by a password change. The
// heartbeat now re-runs the upgrade check against SQLite (not this process's key
// cache), so such a connection is closed with 4001 within one heartbeat interval while
// a still-valid connection stays open.
//
// Real `ws` clients against a real server on 127.0.0.1. The heartbeat interval is
// 15 s and is not shortened here; the close deadline below leaves ample slack for a
// slow CI runner. Importing liveServer.ts is safe: its auto-start guard is
// short-circuited under the Node test runner.
import { after, before, describe, test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import net from "node:net";
import os from "node:os";
import path from "node:path";

import { jwtVerify } from "jose";
import { WebSocket } from "ws";

const ORIGINAL_ENV = {
  DATA_DIR: process.env.DATA_DIR,
  JWT_SECRET: process.env.JWT_SECRET,
  API_KEY_SECRET: process.env.API_KEY_SECRET,
  LIVE_WS_HOST: process.env.LIVE_WS_HOST,
  OMNIROUTE_API_KEY: process.env.OMNIROUTE_API_KEY,
  ROUTER_API_KEY: process.env.ROUTER_API_KEY,
};

// The DB layer fixes its data directory when it is first imported. In a shared process
// (--test-isolation=none) another file may have imported it first, with its own
// directory, so the tests use the directory the DB layer has (DB_DIR below), not
// OWN_DATA_DIR. The environment is set again in before(), since an earlier file's
// after() may have restored it in between.
const OWN_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-live-ws-revalidate-"));
process.env.DATA_DIR = OWN_DATA_DIR;

function setTestEnv(): void {
  process.env.JWT_SECRET = "test-jwt-secret-live-ws-revalidate";
  process.env.API_KEY_SECRET = "test-api-key-secret-live-ws-revalidate";
  delete process.env.LIVE_WS_HOST;
  delete process.env.OMNIROUTE_API_KEY;
  delete process.env.ROUTER_API_KEY;
}
setTestEnv();

function restoreEnv(): void {
  for (const [key, value] of Object.entries(ORIGINAL_ENV)) {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
}

function removeDbDir(): void {
  assert.ok(
    path.resolve(DB_DIR).startsWith(path.resolve(os.tmpdir()) + path.sep),
    `refusing to remove ${DB_DIR}: not under the temp dir`
  );
  fs.rmSync(DB_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
}

const core = await import("../../src/lib/db/core.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const { getSettings, updateSettings } = await import("../../src/lib/db/settings.ts");
const { emit } = await import("../../src/lib/events/eventBus.ts");
const sessionTokens = await import("../../src/shared/utils/dashboardSessionToken.ts");
const { startLiveDashboardServer } = await import("../../src/server/ws/liveServer.ts");

const DB_DIR = path.dirname(core.SQLITE_FILE ?? "");

// One heartbeat (15 s) plus generous slack for a loaded runner.
const CLOSE_DEADLINE_MS = 40_000;

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

const opened: WebSocket[] = [];

type LiveClient = {
  ws: WebSocket;
  frames: Array<{ type: string; code?: string; event?: string }>;
  closed: Promise<{ code: number; afterMs: number }>;
  markChanged: () => void;
};

/** Connect, subscribe to "requests" and resolve once the welcome frame arrives. */
function openSubscribed(port: number, headers: Record<string, string>): Promise<LiveClient> {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(`ws://127.0.0.1:${port}/live-ws`, {
      origin: "http://127.0.0.1:20128",
      headers,
    });
    opened.push(ws);
    const frames: LiveClient["frames"] = [];
    let changedAt = 0;
    const closed = new Promise<{ code: number; afterMs: number }>((res) => {
      ws.once("close", (code) => res({ code, afterMs: Date.now() - changedAt }));
    });
    const timer = setTimeout(() => {
      ws.terminate();
      reject(new Error("Timed out waiting for welcome"));
    }, 10_000);
    ws.once("open", () => ws.send(JSON.stringify({ type: "subscribe", channels: ["requests"] })));
    ws.on("message", (data) => {
      const frame = JSON.parse(String(data));
      frames.push(frame);
      if (frame.type === "welcome") {
        clearTimeout(timer);
        resolve({ ws, frames, closed, markChanged: () => (changedAt = Date.now()) });
      } else if (frame.type === "error" && frames.length === 1) {
        clearTimeout(timer);
        reject(new Error(`Rejected at connect: ${frame.code}`));
      }
    });
    ws.once("error", (err) => {
      clearTimeout(timer);
      reject(err);
    });
  });
}

function withDeadline<T>(promise: Promise<T>, label: string): Promise<T> {
  let timer: NodeJS.Timeout;
  return Promise.race([
    promise.finally(() => clearTimeout(timer)),
    new Promise<T>((_, reject) => {
      timer = setTimeout(
        () => reject(new Error(`${label}: still open ${CLOSE_DEADLINE_MS} ms after the change`)),
        CLOSE_DEADLINE_MS
      );
    }),
  ]);
}

describe("LiveWS re-checks the credential of an open connection", () => {
  let server: import("http").Server | null = null;
  let port = 0;

  before(async () => {
    setTestEnv();
    process.env.DATA_DIR = DB_DIR;
    core.resetDbInstance();
    removeDbDir();
    fs.mkdirSync(DB_DIR, { recursive: true });
    await updateSettings({ requireLogin: true, password: "hashed-password-for-test" });
    port = await getFreePort();
    server = await startLiveDashboardServer(port, "127.0.0.1");
  });

  after(async () => {
    // A still-open socket would keep server.close() from ever calling back.
    for (const ws of opened) ws.terminate();
    if (server) {
      await new Promise<void>((resolve) => server!.close(() => resolve()));
      server = null;
    }
    apiKeysDb.resetApiKeyState();
    core.resetDbInstance();
    removeDbDir();
    fs.rmSync(OWN_DATA_DIR, { recursive: true, force: true });
    restoreEnv();
  });

  test("ended credentials are closed with 4001 on every heartbeat, valid ones stay", async (t) => {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const mk = async (name: string) =>
      apiKeysDb.createApiKey(name, "machine-live-ws-revalidate", ["manage"]);
    const keys = {
      revoked: await mk("revoked"),
      disabled: await mk("disabled"),
      expired: await mk("expired"),
      deleted: await mk("deleted"),
      downgraded: await mk("downgraded"),
      revokedElsewhere: await mk("revoked-elsewhere"),
      downgradedElsewhere: await mk("downgraded-elsewhere"),
      control: await mk("control"),
    };
    const signedOutToken = await sessionTokens.mintDashboardSessionToken(secret);
    const passwordChangedToken = await sessionTokens.mintDashboardSessionToken(secret);

    const bearer = (name: keyof typeof keys) => ({ authorization: `Bearer ${keys[name].key}` });
    const c = {
      revoked: await openSubscribed(port, bearer("revoked")),
      disabled: await openSubscribed(port, bearer("disabled")),
      expired: await openSubscribed(port, bearer("expired")),
      deleted: await openSubscribed(port, bearer("deleted")),
      downgraded: await openSubscribed(port, bearer("downgraded")),
      revokedElsewhere: await openSubscribed(port, bearer("revokedElsewhere")),
      downgradedElsewhere: await openSubscribed(port, bearer("downgradedElsewhere")),
      signedOut: await openSubscribed(port, { cookie: `auth_token=${signedOutToken}` }),
      passwordChanged: await openSubscribed(port, { cookie: `auth_token=${passwordChangedToken}` }),
      control: await openSubscribed(port, bearer("control")),
    };

    const round2 = [
      "revoked",
      "disabled",
      "expired",
      "deleted",
      "downgraded",
      "passwordChanged",
    ] as const;
    const expectClosed = async (names: Array<keyof typeof c>) => {
      const results = await Promise.all(names.map((name) => withDeadline(c[name].closed, name)));
      results.forEach((result, i) => {
        t.diagnostic(`${names[i]}: closed ${result.code} after ${result.afterMs} ms`);
        assert.equal(result.code, 4001, `${names[i]} closed with ${result.code}`);
        const errors = c[names[i]].frames.filter((f) => f.type === "error");
        assert.equal(errors.at(-1)?.code, "UNAUTHORIZED", `${names[i]} got no UNAUTHORIZED frame`);
      });
    };

    // Round 1: revoke one key and cut another to `read` by writing their rows
    // directly, which is what a change made by another process looks like here: no
    // cache in this process is cleared (every in-process key change clears it, so
    // nothing else that touches keys may happen in this round). Also sign one session
    // out.
    for (const client of Object.values(c)) client.markChanged();
    const db = core.getDbInstance();
    db.prepare("UPDATE api_keys SET revoked_at = ?, is_active = 0 WHERE id = ?").run(
      new Date().toISOString(),
      keys.revokedElsewhere.id
    );
    db.prepare("UPDATE api_keys SET scopes = ? WHERE id = ?").run(
      JSON.stringify(["read"]),
      keys.downgradedElsewhere.id
    );
    const { payload } = await jwtVerify(signedOutToken, secret);
    const settings = (await getSettings()) as Record<string, unknown>;
    await updateSettings({
      [sessionTokens.REVOKED_SESSIONS_SETTING]: sessionTokens.addRevokedSession(
        settings[sessionTokens.REVOKED_SESSIONS_SETTING],
        { jti: String(payload.jti), exp: Number(payload.exp) },
        Math.floor(Date.now() / 1000)
      ),
    });
    await expectClosed(["revokedElsewhere", "downgradedElsewhere", "signedOut"]);
    for (const name of [...round2, "control"] as const) {
      assert.equal(c[name].ws.readyState, WebSocket.OPEN, `${name} was closed in round 1`);
    }

    // Round 2: the check repeats on later heartbeats, not only the first one.
    for (const client of Object.values(c)) client.markChanged();
    assert.equal(await apiKeysDb.revokeApiKey(keys.revoked.id), true);
    await apiKeysDb.updateApiKeyPermissions(keys.disabled.id, { isActive: false });
    const past = new Date(Date.now() - 1000).toISOString();
    assert.equal(await apiKeysDb.setApiKeyExpiry(keys.expired.id, past), true);
    assert.equal(await apiKeysDb.deleteApiKey(keys.deleted.id), true);
    await apiKeysDb.updateApiKeyPermissions(keys.downgraded.id, { scopes: ["read"] });
    await updateSettings({
      [sessionTokens.SESSIONS_VALID_AFTER_SETTING]: Math.floor(Date.now() / 1000) + 1,
    });
    await expectClosed([...round2]);

    // The still-valid connection survived both rounds and still gets events.
    assert.equal(c.control.ws.readyState, WebSocket.OPEN, "control was closed");
    const seen = new Promise<void>((resolve) => {
      c.control.ws.on("message", (data) => {
        if (JSON.parse(String(data)).event === "request.started") resolve();
      });
    });
    emit("request.started", { requestId: "after-revalidation" } as never);
    await withDeadline(seen, "control receiving events");
  });
});
