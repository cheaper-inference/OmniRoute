/**
 * "Auto-apply banked resets" — the cap history read (readBankedResetAuditRows).
 *
 * It runs synchronously on every Claude wall and every job tick, so it must seek the
 * `bankedReset.redeem` rows through idx_audit_action instead of scanning the whole audit
 * log, and it must return every row of the window (no 500-row page cap), or the caps
 * undercount. The timestamp bound is a plain text compare, which is only correct because
 * logAuditEvent writes ISO-8601 UTC timestamps — checked here against the real writer.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import type { SqliteAdapter } from "../../src/lib/db/adapters/types.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-banked-reset-history-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const compliance = await import("../../src/lib/compliance/index.ts");
const audit = await import("../../src/lib/usage/bankedResetAudit.ts");

const HOUR_MS = 3_600_000;
const ISO_UTC = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;

test.beforeEach(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function db(): SqliteAdapter {
  return core.getDbInstance() as SqliteAdapter;
}

function insertRows(rows: { timestamp: string; action: string; target?: string }[]) {
  compliance.initAuditLog();
  const insert = db().prepare(
    "INSERT INTO audit_log (timestamp, action, actor, target, status, details) VALUES (?, ?, 'system', ?, 'success', ?)"
  );
  db().exec("BEGIN");
  try {
    for (const row of rows) {
      insert.run(
        row.timestamp,
        row.action,
        row.target ?? "conn-a",
        JSON.stringify({ provider: "codex", creditType: "codexCredits" })
      );
    }
    db().exec("COMMIT");
  } catch (error) {
    db().exec("ROLLBACK");
    throw error;
  }
}

/** Run `fn` and return every audit_log statement it executed, with its parameters. */
function captureAuditReads<T>(fn: () => T) {
  const instance = db();
  const original = instance.prepare;
  const captured: { sql: string; params: unknown[] }[] = [];
  instance.prepare = function (sql: string) {
    const stmt = original.call(this, sql);
    if (!/\bFROM audit_log\b/.test(sql)) return stmt;
    const record =
      (method: "get" | "all" | "run") =>
      (...params: unknown[]) => {
        captured.push({ sql, params });
        return (stmt[method] as (...args: unknown[]) => unknown)(...params);
      };
    return { ...stmt, run: record("run"), get: record("get"), all: record("all") } as typeof stmt;
  };
  try {
    return { result: fn(), captured };
  } finally {
    instance.prepare = original;
  }
}

function planOf(read: { sql: string; params: unknown[] }): string[] {
  return (
    db()
      .prepare(`EXPLAIN QUERY PLAN ${read.sql}`)
      .all(...read.params) as { detail: string }[]
  ).map((row) => row.detail);
}

test("the real writer stamps bankedReset rows with ISO-8601 UTC timestamps", () => {
  audit.recordBankedResetOutcome(
    {
      connectionId: "conn-a",
      provider: "claude",
      creditType: "claudeSessionReset",
      mode: "eager",
      trigger: "walled-session",
      reason: "walled-session",
      status: "unknown",
    },
    audit.createDefaultBankedResetSinks()
  );
  const rows = audit.readBankedResetAuditRows(new Date(Date.now() - HOUR_MS).toISOString());
  assert.equal(rows.length, 1);
  assert.match(rows[0].timestamp, ISO_UTC);
  assert.deepEqual(
    { target: rows[0].target, status: rows[0].status, creditType: rows[0].creditType },
    { target: "conn-a", status: "unknown", creditType: "claudeSessionReset" }
  );
});

test("every row of the window is returned — no 500-row cap — matched on the exact action", () => {
  const now = Date.now();
  const iso = (ms: number) => new Date(ms).toISOString();
  insertRows([
    ...Array.from({ length: 650 }, (_, i) => ({
      timestamp: iso(now - i * 60_000),
      action: audit.BANKED_RESET_AUDIT_ACTION,
    })),
    // Outside the window, or a different action that a LIKE match would also catch.
    { timestamp: iso(now - 25 * HOUR_MS), action: audit.BANKED_RESET_AUDIT_ACTION },
    { timestamp: iso(now - 60_000), action: `${audit.BANKED_RESET_AUDIT_ACTION}.preview` },
    { timestamp: iso(now - 60_000), action: "auth.login" },
  ]);
  const rows = audit.readBankedResetAuditRows(iso(now - 24 * HOUR_MS));
  assert.equal(rows.length, 650);
  assert.ok(rows.every((row) => row.action === audit.BANKED_RESET_AUDIT_ACTION));
  assert.ok(rows.every((row) => row.creditType === "codexCredits"));
  assert.equal(
    audit.summarizeBankedResetHistory(rows, { connectionId: "conn-a", mode: "eager", now })
      .accountRedemptions24h,
    650
  );
});

test("the cap history read seeks idx_audit_action, with or without ANALYZE statistics", () => {
  const now = Date.now();
  const iso = (ms: number) => new Date(ms).toISOString();
  // A busy audit log: the redemption rows are a sliver of a day full of other actions.
  insertRows(
    Array.from({ length: 5_000 }, (_, i) => ({
      timestamp: iso(now - i * 10_000),
      action: i % 500 === 0 ? audit.BANKED_RESET_AUDIT_ACTION : "auth.login",
    }))
  );
  const since = iso(now - 24 * HOUR_MS);

  for (const phase of ["no statistics", "after ANALYZE"]) {
    if (phase === "after ANALYZE") db().exec("ANALYZE");
    const { result, captured } = captureAuditReads(() => audit.readBankedResetAuditRows(since));
    assert.equal(result.length, 10, phase);
    assert.equal(captured.length, 1, `${phase}: one audit_log read`);
    const [read] = captured;
    assert.doesNotMatch(read.sql, /\bLIKE\b|datetime\(/i, `${phase}: no LIKE / datetime() scan`);
    assert.doesNotMatch(read.sql, /\bLIMIT\b/i, `${phase}: no page cap`);
    const plan = planOf(read);
    assert.ok(
      plan.some((detail) =>
        /^SEARCH audit_log USING INDEX idx_audit_action \(action=\?\)/.test(detail)
      ),
      `${phase}: expected an idx_audit_action seek, got ${JSON.stringify(plan)}`
    );
    assert.ok(
      plan.every((detail) => !/^SCAN audit_log\b/.test(detail)),
      `${phase}: no table scan, got ${JSON.stringify(plan)}`
    );
  }
});
