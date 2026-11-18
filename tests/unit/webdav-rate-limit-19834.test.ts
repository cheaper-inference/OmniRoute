import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import http from "node:http";
import { EventEmitter } from "node:events";
import { createRequire } from "node:module";
import {
  checkWebdavRateLimit,
  recordWebdavAuthFailure,
  resetWebdavAuthFailures,
  clearWebdavRateLimits,
  getWebdavAuthFailureStateSize,
  maybeHandleWebdav,
  normalizeWebdavClientIp,
  getWebdavClientIp,
  WEBDAV_AUTH_MAX_FAILURES,
  WEBDAV_AUTH_WINDOW_MS,
  WEBDAV_AUTH_LOCKOUT_MS,
  WEBDAV_AUTH_SWEEP_INTERVAL_MS,
} from "../../scripts/dev/webdav-handler.mjs";

const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omr-webdav-rate-limit-"));
const TEST_VAULT_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omr-webdav-rate-limit-vault-"));

test.beforeEach(() => {
  clearWebdavRateLimits();
});

test.after(() => {
  clearWebdavRateLimits();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.rmSync(TEST_VAULT_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  if (ORIGINAL_DATA_DIR === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = ORIGINAL_DATA_DIR;
});

/** Seed the obsidian WebDAV settings the handler reads straight from storage.sqlite. */
function seedWebdavConfig(username: string, password: string) {
  const Database = createRequire(import.meta.url)("better-sqlite3");
  const db = new Database(path.join(TEST_DATA_DIR, "storage.sqlite"));
  try {
    db.exec(
      "CREATE TABLE IF NOT EXISTS key_value (namespace TEXT NOT NULL, key TEXT NOT NULL, value TEXT NOT NULL, PRIMARY KEY (namespace, key))"
    );
    const upsert = db.prepare(
      "INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES (?, ?, ?)"
    );
    upsert.run("obsidian", "webdav_enabled", JSON.stringify(true));
    upsert.run("obsidian", "webdav_username", JSON.stringify(username));
    upsert.run("obsidian", "webdav_password", JSON.stringify(password));
    upsert.run("obsidian", "vault_path", JSON.stringify(TEST_VAULT_DIR));
  } finally {
    db.close();
  }
}

/** Run one request through the real handler and return the response status. */
function webdavStatus(headers: Record<string, string>, peer: string): Promise<number> {
  const req = Object.assign(new EventEmitter(), {
    method: "PROPFIND",
    url: "/api/v1/webdav/",
    headers,
    socket: { remoteAddress: peer },
  }) as unknown as http.IncomingMessage;
  setImmediate(() => req.emit("end"));
  return new Promise((resolve) => {
    let status = 200;
    const res = {
      headersSent: false,
      writeHead(code: number) {
        status = code;
        this.headersSent = true;
      },
      write() {},
      end() {
        resolve(status);
      },
      destroy() {
        resolve(status);
      },
      on() {
        return this;
      },
    } as unknown as http.ServerResponse;
    void maybeHandleWebdav(req, res);
  });
}

test("normalizeWebdavClientIp strips IPv4-mapped IPv6 prefix and trims whitespace", () => {
  assert.equal(normalizeWebdavClientIp("::ffff:192.168.1.10"), "192.168.1.10");
  assert.equal(normalizeWebdavClientIp("  10.0.0.1  "), "10.0.0.1");
  assert.equal(normalizeWebdavClientIp(null), "unknown");
  assert.equal(normalizeWebdavClientIp(""), "unknown");
});

test("getWebdavClientIp extracts IP from x-forwarded-for, x-real-ip or socket", () => {
  const reqXff = {
    headers: { "x-forwarded-for": "203.0.113.195, 70.41.3.18" },
    socket: { remoteAddress: "127.0.0.1" },
  } as unknown as http.IncomingMessage;
  // Behind a trusted proxy the client is the right-most hop that is not a proxy; the left-most
  // entries are whatever the client itself sent.
  assert.equal(getWebdavClientIp(reqXff), "70.41.3.18");

  const reqXRealIp = {
    headers: { "x-real-ip": "198.51.100.42" },
    socket: { remoteAddress: "127.0.0.1" },
  } as unknown as http.IncomingMessage;
  assert.equal(getWebdavClientIp(reqXRealIp), "198.51.100.42");

  const reqSocket = {
    headers: {},
    socket: { remoteAddress: "::ffff:192.168.1.50" },
  } as unknown as http.IncomingMessage;
  assert.equal(getWebdavClientIp(reqSocket), "192.168.1.50");
});

test("recordWebdavAuthFailure tracks attempts and triggers lockout at threshold", () => {
  const ip = "192.168.1.100";
  const t0 = 1_000_000;

  // First 9 failures are allowed
  for (let i = 1; i < WEBDAV_AUTH_MAX_FAILURES; i++) {
    const res = recordWebdavAuthFailure(ip, t0 + i * 100);
    assert.equal(res.allowed, true, `attempt ${i} should be allowed`);
    assert.equal(checkWebdavRateLimit(ip, t0 + i * 100).allowed, true);
  }

  // 10th failure triggers lockout
  const tenth = recordWebdavAuthFailure(ip, t0 + 1000);
  assert.equal(tenth.allowed, false, "10th failure must trigger lockout");
  assert.equal(tenth.retryAfter, Math.ceil(WEBDAV_AUTH_LOCKOUT_MS / 1000));

  // Subsequent check is locked
  const lockedCheck = checkWebdavRateLimit(ip, t0 + 2000);
  assert.equal(lockedCheck.allowed, false);
  assert.ok(lockedCheck.retryAfter && lockedCheck.retryAfter > 0);

  // After lockout duration expires, access is restored
  const postLockout = checkWebdavRateLimit(ip, t0 + 1000 + WEBDAV_AUTH_LOCKOUT_MS + 10);
  assert.equal(postLockout.allowed, true, "after lockout expires, requests should be allowed");
});

test("resetWebdavAuthFailures clears tracked failures on successful authentication", () => {
  const ip = "192.168.1.101";
  const t0 = 2_000_000;

  // 5 failures
  for (let i = 0; i < 5; i++) {
    recordWebdavAuthFailure(ip, t0 + i * 100);
  }

  // Reset
  resetWebdavAuthFailures(ip);

  // Now an attempt starts fresh (attempt 1 again, not 6)
  const fresh = recordWebdavAuthFailure(ip, t0 + 1000);
  assert.equal(fresh.allowed, true);
});

test("window expiration resets count if lockout threshold was not reached", () => {
  const ip = "192.168.1.102";
  const t0 = 3_000_000;

  // 5 failures at t0
  for (let i = 0; i < 5; i++) {
    recordWebdavAuthFailure(ip, t0);
  }

  // Advance time past the sliding window
  const pastWindow = t0 + WEBDAV_AUTH_WINDOW_MS + 1000;
  assert.equal(checkWebdavRateLimit(ip, pastWindow).allowed, true);

  // A new failure starts count at 1 instead of reaching 6
  const next = recordWebdavAuthFailure(ip, pastWindow);
  assert.equal(next.allowed, true);
});

test("a direct client cannot pick its own rate-limit key with forwarding headers", () => {
  // A public peer that is not a trusted proxy writes X-Forwarded-For / X-Real-IP itself.
  const spoofed = {
    headers: { "x-forwarded-for": "198.51.100.7", "x-real-ip": "198.51.100.8" },
    socket: { remoteAddress: "203.0.113.50" },
  } as unknown as http.IncomingMessage;
  assert.equal(getWebdavClientIp(spoofed), "203.0.113.50");
});

test("rotating X-Forwarded-For from one direct client still reaches the lockout", () => {
  const t0 = 2_000_000;
  let last = { allowed: true } as { allowed: boolean; retryAfter?: number };
  for (let i = 1; i <= WEBDAV_AUTH_MAX_FAILURES; i++) {
    const req = {
      headers: { "x-forwarded-for": `198.51.100.${i}` },
      socket: { remoteAddress: "203.0.113.51" },
    } as unknown as http.IncomingMessage;
    last = recordWebdavAuthFailure(getWebdavClientIp(req), t0 + i * 100);
  }
  assert.equal(last.allowed, false, "the peer is locked out whatever header it sends");
  assert.equal(checkWebdavRateLimit("203.0.113.51", t0 + 2_000).allowed, false);
});

test("a request without credentials gets the 401 challenge but does not spend an attempt", async () => {
  process.env.DATA_DIR = TEST_DATA_DIR;
  seedWebdavConfig("obsidian", "right-password");
  const peer = "203.0.113.60";
  const basic = (pass: string) => `Basic ${Buffer.from(`obsidian:${pass}`).toString("base64")}`;

  // WebDAV clients probe without credentials to read the challenge; those probes are not guesses.
  for (let i = 0; i < WEBDAV_AUTH_MAX_FAILURES + 5; i++) {
    assert.equal(await webdavStatus({}, peer), 401, `credential-less probe ${i + 1} gets 401`);
  }
  assert.equal(checkWebdavRateLimit(peer).allowed, true);

  // A wrong password still counts, and the right one still gets in.
  assert.equal(await webdavStatus({ authorization: basic("wrong") }, peer), 401);
  assert.equal(getWebdavAuthFailureStateSize(), 1);
  assert.equal(
    await webdavStatus({ authorization: basic("right-password"), depth: "0" }, peer),
    207
  );
});

test("expired failure entries are swept at most once per interval, not on every failure", () => {
  const t0 = 10_000_000;
  // More than the sweep threshold of distinct clients, all inside one window.
  for (let i = 0; i < 300; i++) recordWebdavAuthFailure(`10.1.${i >> 8}.${i & 255}`, t0);
  assert.equal(getWebdavAuthFailureStateSize(), 300);

  // Once the window has passed, the next failure sweeps the expired entries.
  const t1 = t0 + WEBDAV_AUTH_WINDOW_MS + 1;
  recordWebdavAuthFailure("10.2.0.1", t1);
  assert.equal(getWebdavAuthFailureStateSize(), 1);

  // Entries that expire right after that sweep are not re-scanned by every later failure...
  for (let i = 0; i < 300; i++) {
    recordWebdavAuthFailure(`10.3.${i >> 8}.${i & 255}`, t1 - WEBDAV_AUTH_WINDOW_MS - 10);
  }
  recordWebdavAuthFailure("10.2.0.2", t1 + 1);
  assert.equal(getWebdavAuthFailureStateSize(), 302, "no sweep inside the interval");

  // ...but they go on the first failure after the interval.
  recordWebdavAuthFailure("10.2.0.3", t1 + WEBDAV_AUTH_SWEEP_INTERVAL_MS);
  assert.equal(getWebdavAuthFailureStateSize(), 3);
});

test("the sweep never drops an active lockout", () => {
  const t0 = 20_000_000;
  const locked = "198.51.100.200";
  for (let i = 0; i < WEBDAV_AUTH_MAX_FAILURES; i++) recordWebdavAuthFailure(locked, t0);
  for (let i = 0; i < 300; i++) recordWebdavAuthFailure(`10.4.${i >> 8}.${i & 255}`, t0);

  const afterWindow = t0 + WEBDAV_AUTH_WINDOW_MS + WEBDAV_AUTH_SWEEP_INTERVAL_MS;
  recordWebdavAuthFailure("10.5.0.1", afterWindow);
  assert.equal(getWebdavAuthFailureStateSize(), 2);
  assert.equal(checkWebdavRateLimit(locked, afterWindow).allowed, false);
});
