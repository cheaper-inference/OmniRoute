/**
 * Unit coverage for the per-connection discovery outcome store.
 *
 * The store keeps one entry per connection (namespace `discoveryState`, key
 * `<providerId>:<connectionId>`), so a repeated discovery replaces the entry
 * instead of piling up rows, and a deleted connection leaves nothing behind.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-discovery-state-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../../src/lib/db/core.ts");
const discoveryState = await import("../../../src/lib/db/discoveryState.ts");

function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

function storedRows(): Array<{ key: string; value: string }> {
  const db = core.getDbInstance();
  return db
    .prepare("SELECT key, value FROM key_value WHERE namespace = 'discoveryState'")
    .all() as Array<{ key: string; value: string }>;
}

test.beforeEach(resetStorage);

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("the outcome is stored under the provider and connection key", () => {
  discoveryState.saveDiscoveryState("aimlapi", "conn-1", { status: "degraded", cause: "HTTP 500" });

  const rows = storedRows();
  assert.equal(rows.length, 1);
  assert.equal(rows[0].key, "aimlapi:conn-1");

  const stored = JSON.parse(rows[0].value) as {
    status: string;
    cause: string;
    at: string;
  };
  assert.equal(stored.status, "degraded");
  assert.equal(stored.cause, "HTTP 500");
  assert.ok(Number.isFinite(Date.parse(stored.at)));
});

test("a repeated discovery replaces the entry instead of adding a row", () => {
  for (let attempt = 0; attempt < 25; attempt++) {
    discoveryState.saveDiscoveryState("aimlapi", "conn-1", {
      status: "degraded",
      cause: "HTTP 500",
    });
  }

  assert.equal(storedRows().length, 1);
});

test("the outcome is read back per connection", () => {
  discoveryState.saveDiscoveryState("aimlapi", "conn-1", { status: "degraded", cause: "HTTP 500" });
  discoveryState.saveDiscoveryState("aimlapi", "conn-2", { status: "healthy", cause: null });

  const states = discoveryState.getDiscoveryStatesForConnections([
    { provider: "aimlapi", id: "conn-1" },
    { provider: "aimlapi", id: "conn-2" },
  ]);

  assert.equal(states.size, 2);
  assert.equal(states.get("aimlapi:conn-1")?.status, "degraded");
  assert.equal(states.get("aimlapi:conn-1")?.cause, "HTTP 500");
  assert.equal(states.get("aimlapi:conn-2")?.status, "healthy");
  assert.equal(states.get("aimlapi:conn-2")?.cause, null);
});

test("a connection without a stored outcome reads as unknown", () => {
  discoveryState.saveDiscoveryState("aimlapi", "conn-1", { status: "degraded", cause: "HTTP 500" });

  const states = discoveryState.getDiscoveryStatesForConnections([
    { provider: "aimlapi", id: "conn-1" },
    { provider: "aimlapi", id: "conn-unknown" },
  ]);

  assert.equal(states.size, 1);
  assert.equal(states.has("aimlapi:conn-unknown"), false);
});

test("an unreadable entry reads as absent, never as healthy", () => {
  const db = core.getDbInstance();
  db.prepare("INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES (?, ?, ?)").run(
    "discoveryState",
    "aimlapi:conn-broken",
    "{not json"
  );

  const states = discoveryState.getDiscoveryStatesForConnections([
    { provider: "aimlapi", id: "conn-broken" },
  ]);

  assert.equal(states.size, 0);
});

test("deleting a connection drops its stored outcome", () => {
  discoveryState.saveDiscoveryState("aimlapi", "conn-1", { status: "degraded", cause: "HTTP 500" });
  discoveryState.saveDiscoveryState("aimlapi", "conn-2", { status: "healthy", cause: null });

  const removed = discoveryState.deleteDiscoveryStatesForConnections([
    { provider: "aimlapi", id: "conn-1" },
  ]);

  assert.equal(removed, 1);
  const rows = storedRows();
  assert.equal(rows.length, 1);
  assert.equal(rows[0].key, "aimlapi:conn-2");
});

test("deleting a provider drops every connection it owned", () => {
  discoveryState.saveDiscoveryState("aimlapi", "conn-1", { status: "degraded", cause: "HTTP 500" });
  discoveryState.saveDiscoveryState("aimlapi", "conn-2", { status: "healthy", cause: null });
  discoveryState.saveDiscoveryState("poe", "conn-3", { status: "degraded", cause: "HTTP 500" });

  const removed = discoveryState.deleteDiscoveryStatesForProvider("aimlapi");

  assert.equal(removed, 2);
  const rows = storedRows();
  assert.equal(rows.length, 1);
  assert.equal(rows[0].key, "poe:conn-3");
});

test("the store holds one entry per connection and nothing after the deletion", () => {
  discoveryState.saveDiscoveryState("aimlapi", "conn-1", { status: "degraded", cause: "HTTP 500" });
  for (let attempt = 0; attempt < 10; attempt++) {
    discoveryState.saveDiscoveryState("aimlapi", "conn-1", {
      status: "degraded",
      cause: "HTTP 500",
    });
  }
  assert.equal(storedRows().length, 1);

  discoveryState.deleteDiscoveryStatesForConnections([{ provider: "aimlapi", id: "conn-1" }]);
  assert.equal(storedRows().length, 0);
});
