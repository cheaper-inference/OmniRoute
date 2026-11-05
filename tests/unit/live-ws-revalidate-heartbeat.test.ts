// R9-20 follow-up: timing and failure cases of the Live WS credential re-check, run on a
// mocked setInterval so the 15 s heartbeat is stepped exactly instead of waited for.
// - The re-check fires at 15 s, not later.
// - A key revoked or cut below `manage` by another process (a direct row write, so this
//   process's key cache still says valid) is refused on a new connection right away,
//   and the client closed for it cannot reconnect with it.
// - A database error during the re-check closes the connections that needed the
//   unreadable table (fail closed); they can connect again once the reads work.
// - An exception thrown by authorizeConnection() itself also closes the connection.
// - bypassCache lookups leave the per-process key cache alone.
// - A write lock held elsewhere when last_used_at is due does not close a valid key client.
// - A fresh loopback install's anonymous client stays open until a password is set.
import { after, before, describe, mock, test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import net from "node:net";
import os from "node:os";
import path from "node:path";
import { DatabaseSync } from "node:sqlite";

import { WebSocket } from "ws";

const ORIGINAL_ENV = {
  DATA_DIR: process.env.DATA_DIR,
  JWT_SECRET: process.env.JWT_SECRET,
  API_KEY_SECRET: process.env.API_KEY_SECRET,
  LIVE_WS_HOST: process.env.LIVE_WS_HOST,
  OMNIROUTE_API_KEY: process.env.OMNIROUTE_API_KEY,
  ROUTER_API_KEY: process.env.ROUTER_API_KEY,
  INITIAL_PASSWORD: process.env.INITIAL_PASSWORD,
};

// The DB layer fixes its data directory when it is first imported. In a shared process
// (--test-isolation=none) another file may have imported it first, with its own
// directory, so the tests use the directory the DB layer has (DB_DIR below), not
// OWN_DATA_DIR. The environment is set again in before(), since an earlier file's
// after() may have restored it in between.
const OWN_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-live-ws-heartbeat-"));
process.env.DATA_DIR = OWN_DATA_DIR;

function setTestEnv(): void {
  process.env.JWT_SECRET = "test-jwt-secret-live-ws-heartbeat";
  process.env.API_KEY_SECRET = "test-api-key-secret-live-ws-heartbeat";
  delete process.env.LIVE_WS_HOST;
  delete process.env.OMNIROUTE_API_KEY;
  delete process.env.ROUTER_API_KEY;
  // The fresh-install case needs no INITIAL_PASSWORD.
  delete process.env.INITIAL_PASSWORD;
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
const { updateSettings } = await import("../../src/lib/db/settings.ts");
const { invalidateDbCache } = await import("../../src/lib/db/readCache.ts");
const sessionTokens = await import("../../src/shared/utils/dashboardSessionToken.ts");
const { startLiveDashboardServer } = await import("../../src/server/ws/liveServer.ts");

const DB_DIR = path.dirname(core.SQLITE_FILE ?? "");

const HEARTBEAT_MS = 15_000;
// Real time allowed for the async re-check to finish after a mocked tick.
const SETTLE_MS = 5_000;

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

type Attempt = {
  accepted: boolean;
  ws: WebSocket;
  frames: Array<{ type: string; code?: string; message?: string }>;
  closed: Promise<number>;
};

/** Connect and subscribe; resolves on the welcome frame or on a close before it. */
function connect(port: number, headers: Record<string, string>): Promise<Attempt> {
  return new Promise((resolve) => {
    const ws = new WebSocket(`ws://127.0.0.1:${port}/live-ws`, {
      origin: "http://127.0.0.1:20128",
      headers,
    });
    opened.push(ws);
    const frames: Attempt["frames"] = [];
    const closed = new Promise<number>((res) => ws.once("close", (code) => res(code)));
    let settled = false;
    ws.once("open", () => ws.send(JSON.stringify({ type: "subscribe", channels: ["requests"] })));
    ws.on("message", (data) => {
      const frame = JSON.parse(String(data));
      frames.push(frame);
      if (frame.type === "welcome" && !settled) {
        settled = true;
        resolve({ accepted: true, ws, frames, closed });
      }
    });
    ws.on("error", () => {});
    closed.then(() => {
      if (!settled) {
        settled = true;
        resolve({ accepted: false, ws, frames, closed });
      }
    });
  });
}

async function connectAccepted(port: number, headers: Record<string, string>) {
  const attempt = await connect(port, headers);
  assert.equal(attempt.accepted, true, "connection was refused at connect");
  return attempt;
}

/** Close code, or "open" when the socket is still open after `ms` of real time. */
function closeCodeWithin(attempt: Attempt, ms: number): Promise<number | "open"> {
  let timer: NodeJS.Timeout;
  return Promise.race([
    attempt.closed.finally(() => clearTimeout(timer)),
    new Promise<"open">((resolve) => {
      timer = setTimeout(() => resolve("open"), ms);
    }),
  ]);
}

function assertRefused(attempt: Attempt, label: string) {
  assert.equal(attempt.accepted, false, `${label}: accepted`);
  assert.equal(attempt.frames.at(-1)?.code, "UNAUTHORIZED", `${label}: no UNAUTHORIZED frame`);
}

async function assertClosedUnauthorized(attempt: Attempt, label: string) {
  assert.equal(await closeCodeWithin(attempt, SETTLE_MS), 4001, `${label}: not closed with 4001`);
  const errors = attempt.frames.filter((f) => f.type === "error");
  assert.equal(errors.at(-1)?.code, "UNAUTHORIZED", `${label}: no UNAUTHORIZED frame`);
}

const bearer = (key: string) => ({ authorization: `Bearer ${key}` });
const mkKey = (name: string) =>
  apiKeysDb.createApiKey(name, "machine-live-ws-heartbeat", ["manage"]);

describe("LiveWS heartbeat re-check: timing and failures", () => {
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
    // Only setInterval is mocked: Date.now() stays real, so the 60 s key cache is warm.
    mock.timers.enable({ apis: ["setInterval"] });
    server = await startLiveDashboardServer(port, "127.0.0.1");
  });

  after(async () => {
    mock.timers.reset();
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

  // Each test advances the mocked clock by whole heartbeats, so every test starts on a
  // heartbeat boundary.

  test("a key changed by another process: refused at once, closed at 15 s, no reconnect", async () => {
    const revoked = await mkKey("revoked-elsewhere");
    const downgraded = await mkKey("downgraded-elsewhere");
    const control = await mkKey("control");
    const c = {
      revoked: await connectAccepted(port, bearer(revoked.key)),
      revokedTwin: await connectAccepted(port, bearer(revoked.key)),
      revokedAlt: await connectAccepted(port, { "x-live-ws-token": revoked.key }),
      downgraded: await connectAccepted(port, bearer(downgraded.key)),
      control: await connectAccepted(port, bearer(control.key)),
      controlAlt: await connectAccepted(port, { "x-live-ws-token": control.key }),
    };
    // One heartbeat with every key still valid, so any cache entry is fresh.
    mock.timers.tick(HEARTBEAT_MS);
    assert.equal(await closeCodeWithin(c.revoked, 300), "open");

    const db = core.getDbInstance();
    db.prepare("UPDATE api_keys SET revoked_at = ?, is_active = 0 WHERE id = ?").run(
      new Date().toISOString(),
      revoked.id
    );
    db.prepare("UPDATE api_keys SET scopes = ? WHERE id = ?").run(
      JSON.stringify(["read"]),
      downgraded.id
    );

    // A new connection with either key is refused before any heartbeat.
    assertRefused(await connect(port, bearer(revoked.key)), "new revoked connection");
    assertRefused(await connect(port, bearer(downgraded.key)), "new downgraded connection");

    // The open connections are closed at the next heartbeat, 15 s, and not before.
    mock.timers.tick(HEARTBEAT_MS - 1);
    assert.equal(await closeCodeWithin(c.revoked, 300), "open", "closed before 15 s");
    mock.timers.tick(1);
    await assertClosedUnauthorized(c.revoked, "revoked");
    await assertClosedUnauthorized(c.revokedTwin, "second Bearer connection, revoked key");
    await assertClosedUnauthorized(c.revokedAlt, "revoked on X-Live-WS-Token");
    await assertClosedUnauthorized(c.downgraded, "downgraded");

    // The closed clients cannot come back with the same key.
    assertRefused(await connect(port, bearer(revoked.key)), "revoked reconnect");
    assertRefused(await connect(port, bearer(downgraded.key)), "downgraded reconnect");
    assert.equal(c.control.ws.readyState, WebSocket.OPEN, "control was closed");
    assert.equal(c.controlAlt.ws.readyState, WebSocket.OPEN, "X-Live-WS-Token control was closed");
    c.control.ws.terminate();
    c.controlAlt.ws.terminate();
  });

  test("a database error during the re-check closes the connection; it reconnects after", async () => {
    const key = await mkKey("db-error");
    const client = await connectAccepted(port, bearer(key.key));
    const db = core.getDbInstance();
    db.exec("ALTER TABLE api_keys RENAME TO api_keys_hidden_for_test");
    try {
      mock.timers.tick(HEARTBEAT_MS);
      await assertClosedUnauthorized(client, "db-error");
      assert.equal(client.frames.at(-1)?.message, "Auth system unavailable");
    } finally {
      db.exec("ALTER TABLE api_keys_hidden_for_test RENAME TO api_keys");
    }
    const again = await connectAccepted(port, bearer(key.key));

    // Settings unreadable: the session check needs them, so session clients are
    // closed. Key clients only need settings for the "is login required" check, which
    // treats a read error as "required", so they stay.
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const token = await sessionTokens.mintDashboardSessionToken(secret);
    const session = await connectAccepted(port, { cookie: `auth_token=${token}` });
    db.exec("ALTER TABLE key_value RENAME TO key_value_hidden_for_test");
    // The session check reads settings through a 5 s cache; drop it as its expiry would.
    invalidateDbCache("settings");
    try {
      mock.timers.tick(HEARTBEAT_MS);
      await assertClosedUnauthorized(session, "session during settings error");
      assert.equal(again.ws.readyState, WebSocket.OPEN, "key client closed on a settings error");
      assertRefused(await connect(port, {}), "anonymous connection during settings error");
    } finally {
      db.exec("ALTER TABLE key_value_hidden_for_test RENAME TO key_value");
    }
    const sessionAgain = await connectAccepted(port, { cookie: `auth_token=${token}` });
    sessionAgain.ws.terminate();
    again.ws.terminate();

    // Open mode: an anonymous client is admitted without a credential, but a settings
    // read error makes login "required", so it is closed as well and gets back in later.
    await updateSettings({ requireLogin: false });
    try {
      const anonymous = await connectAccepted(port, {});
      db.exec("ALTER TABLE key_value RENAME TO key_value_hidden_for_test");
      try {
        mock.timers.tick(HEARTBEAT_MS);
        await assertClosedUnauthorized(anonymous, "open-mode client during settings error");
      } finally {
        db.exec("ALTER TABLE key_value_hidden_for_test RENAME TO key_value");
      }
      (await connectAccepted(port, {})).ws.terminate();
    } finally {
      await updateSettings({ requireLogin: true });
    }
  });

  test("an exception thrown by the re-check itself closes the connection", async () => {
    // Admitted in open mode with a cookie that decodeURIComponent() rejects. Once login
    // is required, the re-check reads that cookie and throws outside its own try/catch.
    await updateSettings({ requireLogin: false });
    const client = await connectAccepted(port, { cookie: "auth_token=%E0%A4%A" });
    await updateSettings({ requireLogin: true });
    mock.timers.tick(HEARTBEAT_MS);
    assert.equal(await closeCodeWithin(client, SETTLE_MS), 4001);
  });

  test("a connection that has not subscribed is re-checked too", async () => {
    // Nothing is streamed before a subscribe, but a later subscribe replays the backlog,
    // so an idle connection must not outlive its credential either.
    const key = await mkKey("never-subscribed");
    const ws = new WebSocket(`ws://127.0.0.1:${port}/live-ws`, {
      origin: "http://127.0.0.1:20128",
      headers: bearer(key.key),
    });
    opened.push(ws);
    const frames: Attempt["frames"] = [];
    const closed = new Promise<number>((res) => ws.once("close", (code) => res(code)));
    const ponged = new Promise<void>((res) =>
      ws.on("message", (data) => {
        const frame = JSON.parse(String(data));
        frames.push(frame);
        if (frame.type === "pong") res();
      })
    );
    ws.on("error", () => {});
    // An application ping is answered only after the connect-time check has passed.
    ws.once("open", () => ws.send(JSON.stringify({ type: "ping" })));
    await ponged;

    core
      .getDbInstance()
      .prepare("UPDATE api_keys SET revoked_at = ?, is_active = 0 WHERE id = ?")
      .run(new Date().toISOString(), key.id);
    mock.timers.tick(HEARTBEAT_MS);
    await assertClosedUnauthorized({ accepted: true, ws, frames, closed }, "never subscribed");
  });

  test("bypassCache lookups neither read nor fill this process's key cache", async () => {
    const key = await mkKey("bypass-cache");
    assert.equal(await apiKeysDb.validateApiKey(key.key, { bypassCache: true }), true);
    const before = await apiKeysDb.getApiKeyMetadata(key.key, { bypassCache: true });
    assert.deepEqual(before?.scopes, ["manage"]);
    const db = core.getDbInstance();
    db.prepare("UPDATE api_keys SET revoked_at = ?, scopes = ? WHERE id = ?").run(
      new Date().toISOString(),
      JSON.stringify(["read"]),
      key.id
    );
    // Nothing was cached above, so the default (cached) lookups read the new row.
    assert.equal(await apiKeysDb.validateApiKey(key.key), false);
    assert.deepEqual((await apiKeysDb.getApiKeyMetadata(key.key))?.scopes, ["read"]);

    // Entries cached by a default lookup (say, an HTTP request in this process) are not
    // used by a bypassCache lookup after the row changes elsewhere.
    const warm = await mkKey("warm-cache");
    assert.equal(await apiKeysDb.validateApiKey(warm.key), true);
    assert.deepEqual((await apiKeysDb.getApiKeyMetadata(warm.key))?.scopes, ["manage"]);
    db.prepare("UPDATE api_keys SET revoked_at = ?, scopes = ? WHERE id = ?").run(
      new Date().toISOString(),
      JSON.stringify(["read"]),
      warm.id
    );
    assert.equal(
      await apiKeysDb.validateApiKey(warm.key),
      true,
      "default lookup missed the cache entry it had just filled"
    );
    assert.equal(await apiKeysDb.validateApiKey(warm.key, { bypassCache: true }), false);
    const fresh = await apiKeysDb.getApiKeyMetadata(warm.key, { bypassCache: true });
    assert.deepEqual(fresh?.scopes, ["read"]);
  });

  test("a write lock held elsewhere does not close a valid key client", async () => {
    // The re-check also does the last_used_at update, at most once per 5 minutes. If
    // another process holds the write lock past busy_timeout at that moment, that
    // bookkeeping write fails; the key itself was read and is still valid. A key that
    // no longer passes is still closed, since its rows are read before any write.
    const key = await mkKey("write-locked");
    const revoked = await mkKey("write-locked-revoked");
    const client = await connectAccepted(port, bearer(key.key));
    const revokedClient = await connectAccepted(port, bearer(revoked.key));
    const db = core.getDbInstance();
    db.prepare("UPDATE api_keys SET revoked_at = ? WHERE id = ?").run(
      new Date().toISOString(),
      revoked.id
    );
    const lastUsed = () =>
      (
        db.prepare("SELECT last_used_at FROM api_keys WHERE id = ?").get(key.id) as {
          last_used_at: string | null;
        }
      ).last_used_at;
    const usedAtConnect = lastUsed();
    apiKeysDb.clearApiKeyCaches(); // the 5 minute last_used_at throttle has run out
    const holder = new DatabaseSync(core.SQLITE_FILE ?? "");
    holder.exec("BEGIN IMMEDIATE");
    try {
      mock.timers.tick(HEARTBEAT_MS);
      await assertClosedUnauthorized(revokedClient, "revoked key under a write lock");
      assert.equal(await closeCodeWithin(client, SETTLE_MS), "open", "closed by a write lock");
      assertRefused(await connect(port, bearer(revoked.key)), "revoked key under a write lock");
    } finally {
      holder.exec("ROLLBACK");
      holder.close();
    }
    // A blocked UPDATE either waits for the holder to roll back (busy_timeout) or
    // throws, and a thrown one is not recorded, so the next lookup retries it. Both
    // paths end with the usage recorded, which is the promise this asserts: the
    // bookkeeping write is never silently lost.
    assert.equal(await apiKeysDb.validateApiKey(key.key, { bypassCache: true }), true);
    assert.notEqual(
      lastUsed(),
      usedAtConnect,
      "last_used_at never recorded after the write lock cleared"
    );

    // The failed write did not start the throttle: the next re-check writes it.
    mock.timers.tick(HEARTBEAT_MS);
    const deadline = Date.now() + SETTLE_MS;
    while (lastUsed() === usedAtConnect && Date.now() < deadline) {
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
    assert.notEqual(lastUsed(), usedAtConnect, "last_used_at not retried after the lock");
    assert.equal(client.ws.readyState, WebSocket.OPEN, "valid client closed after the lock");
  });

  test("a fresh loopback install keeps its anonymous client until a password is set", async () => {
    // No password and setup not complete, on the default loopback bind: the upgrade lets
    // a local client in without a credential. The re-check runs on the stored upgrade
    // request, so it must still see the local peer and keep the client open.
    await updateSettings({ password: "" });
    try {
      const anonymous = await connectAccepted(port, {});
      mock.timers.tick(HEARTBEAT_MS);
      assert.equal(await closeCodeWithin(anonymous, 1_000), "open", "fresh-install client closed");
      await updateSettings({ password: "hashed-password-for-test" });
      mock.timers.tick(HEARTBEAT_MS);
      await assertClosedUnauthorized(anonymous, "fresh-install client after a password is set");
    } finally {
      await updateSettings({ password: "hashed-password-for-test" });
    }
  });
});
