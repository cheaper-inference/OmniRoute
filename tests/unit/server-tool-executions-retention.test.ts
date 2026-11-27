// server_tool_executions is a replay fence, not a log. Rows past the replay horizon must be
// deleted and the table must stay bounded, but a running claim and any recent row (inside the
// replay horizon) must survive, or a client retry could run a side-effecting tool twice.
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { createRequire } from "node:module";

const require_ = createRequire(import.meta.url);
const BetterSqlite3 = require_("better-sqlite3") as typeof import("better-sqlite3");

import { createBetterSqliteAdapter } from "../../src/lib/db/adapters/betterSqliteAdapter";
import type { SqliteAdapter } from "../../src/lib/db/adapters/types";
import { claimServerToolExecution } from "../../src/lib/db/skillExecutionFence";

const SCHEMA = `
  CREATE TABLE server_tool_executions (
    id TEXT PRIMARY KEY,
    api_key_id TEXT NOT NULL,
    request_identity TEXT NOT NULL,
    tool_call_id TEXT NOT NULL,
    tool_name TEXT NOT NULL,
    input_digest TEXT NOT NULL,
    output TEXT,
    status TEXT NOT NULL CHECK(status IN ('running', 'success', 'error', 'timeout')),
    error_message TEXT,
    duration_ms INTEGER,
    claim_expires_at TEXT NOT NULL,
    completed_at TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    UNIQUE(api_key_id, request_identity, tool_call_id)
  );
  CREATE INDEX idx_server_tool_executions_created ON server_tool_executions(created_at);
`;

const DAY_MS = 86_400_000;

function sqliteTime(ms: number): string {
  return new Date(ms).toISOString().slice(0, 19).replace("T", " ");
}

function makeDb() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "tool-exec-retention-"));
  const raw = new BetterSqlite3(path.join(dir, "test.db"));
  raw.exec(SCHEMA);
  const adapter: SqliteAdapter = createBetterSqliteAdapter(raw);
  return { adapter, raw, dir };
}

function insert(
  raw: import("better-sqlite3").Database,
  id: string,
  status: string,
  ageMs: number,
  leaseOffsetMs = -ageMs + 60_000
) {
  raw
    .prepare(
      `INSERT INTO server_tool_executions
       (id, api_key_id, request_identity, tool_call_id, tool_name, input_digest, status, claim_expires_at, created_at)
       VALUES (?, 'k', ?, ?, 't', 'd', ?, ?, ?)`
    )
    .run(
      id,
      `req-${id}`,
      `call-${id}`,
      status,
      new Date(Date.now() + leaseOffsetMs).toISOString(),
      sqliteTime(Date.now() - ageMs)
    );
}

function ids(raw: import("better-sqlite3").Database): string[] {
  return (
    raw.prepare("SELECT id FROM server_tool_executions ORDER BY id").all() as { id: string }[]
  )
    .map((r) => r.id)
    .sort();
}

function triggerClaim(adapter: SqliteAdapter) {
  return claimServerToolExecution(
    {
      apiKeyId: "k",
      requestIdentity: "req-new",
      toolCallId: "call-new",
      toolName: "t",
      inputDigest: "d",
      leaseExpiresAt: new Date(Date.now() + 60_000).toISOString(),
    },
    adapter
  );
}

test("a claim deletes terminal rows older than the replay horizon and keeps recent ones", () => {
  const { adapter, raw, dir } = makeDb();
  try {
    insert(raw, "old-success", "success", 45 * DAY_MS);
    insert(raw, "old-error", "error", 45 * DAY_MS);
    insert(raw, "old-timeout", "timeout", 45 * DAY_MS);
    insert(raw, "recent-success", "success", 2 * DAY_MS);
    const claim = triggerClaim(adapter);
    assert.equal(claim.kind, "claimed");
    const left = ids(raw).filter((id) => id !== claim.executionId);
    assert.deepEqual(left, ["recent-success"]);
  } finally {
    raw.close();
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test("a running claim with a live lease is never deleted, however old its row", () => {
  const { adapter, raw, dir } = makeDb();
  try {
    insert(raw, "live-running", "running", 45 * DAY_MS, 5 * 60_000);
    insert(raw, "dead-running", "running", 45 * DAY_MS);
    triggerClaim(adapter);
    const left = ids(raw);
    assert.ok(left.includes("live-running"), "a live lease must survive");
    assert.ok(!left.includes("dead-running"), "an expired running claim past the horizon goes");
  } finally {
    raw.close();
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test("the row count is capped, but rows inside the last day are never cut", () => {
  const { adapter, raw, dir } = makeDb();
  try {
    const insertRow = raw.prepare(
      `INSERT INTO server_tool_executions
       (id, api_key_id, request_identity, tool_call_id, tool_name, input_digest, status, claim_expires_at, created_at)
       VALUES (?, 'k', ?, ?, 't', 'd', 'success', ?, ?)`
    );
    raw.transaction(() => {
      for (let i = 0; i < 10_050; i++) {
        // 10,050 rows spread over days 2..12 (inside the age horizon, outside the last day)
        const age = 2 * DAY_MS + (i * 10 * DAY_MS) / 10_050;
        insertRow.run(
          `bulk-${i}`,
          `req-${i}`,
          `call-${i}`,
          new Date().toISOString(),
          sqliteTime(Date.now() - age)
        );
      }
    })();
    insert(raw, "fresh-1", "success", 60_000);
    insert(raw, "fresh-2", "success", 3_600_000);
    triggerClaim(adapter);
    const count = (
      raw.prepare("SELECT COUNT(*) AS n FROM server_tool_executions").get() as { n: number }
    ).n;
    assert.ok(count <= 10_000 + 3, `table holds ${count} rows`);
    const left = ids(raw);
    assert.ok(left.includes("fresh-1") && left.includes("fresh-2"), "rows from the last day stay");
  } finally {
    raw.close();
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test("a retry of a recent finished call still replays after the sweep", () => {
  const { adapter, raw, dir } = makeDb();
  try {
    insert(raw, "replay-me", "success", DAY_MS);
    raw.prepare("UPDATE server_tool_executions SET output = '\"ok\"' WHERE id = 'replay-me'").run();
    insert(raw, "ancient", "success", 90 * DAY_MS);
    const claim = claimServerToolExecution(
      {
        apiKeyId: "k",
        requestIdentity: "req-replay-me",
        toolCallId: "call-replay-me",
        toolName: "t",
        inputDigest: "d",
        leaseExpiresAt: new Date(Date.now() + 60_000).toISOString(),
      },
      adapter
    );
    assert.equal(claim.kind, "replay");
    assert.ok(!ids(raw).includes("ancient"));
  } finally {
    raw.close();
    fs.rmSync(dir, { recursive: true, force: true });
  }
});
