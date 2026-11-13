import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// Invariant tests for cleanup.ts fixes (mostly source-level; call_logs runs the cleanup).
// These verify the critical column name fixes that were causing silent cleanup failures.

const CLEANUP_PATH = path.resolve(import.meta.dirname, "../../src/lib/db/cleanup.ts");
const RECLAIM_PATH = path.resolve(import.meta.dirname, "../../src/lib/db/reclaimFreedPages.ts");
const source = fs.readFileSync(CLEANUP_PATH, "utf-8");
// Post-cleanup space reclamation (#12821) lives in its own module, kept out of
// cleanup.ts to stay under the file-size cap — scan both for the invariants below.
const reclaimSource = fs.readFileSync(RECLAIM_PATH, "utf-8");

test("cleanup: compression_analytics uses 'timestamp' column (not 'created_at')", () => {
  // The bug: cleanup used WHERE created_at < ? but the table has 'timestamp' column.
  // This caused silent failures — 600K+ rows accumulated over 52 days.
  assert.ok(
    /table: "compression_analytics",\s*column: "timestamp"/.test(source),
    "compression_analytics cleanup must use 'timestamp' column, not 'created_at'"
  );
  assert.ok(
    !source.includes("DELETE FROM compression_analytics WHERE created_at"),
    "must NOT use created_at for compression_analytics (column doesn't exist)"
  );
});

test("cleanup: call_logs retention prunes by 'timestamp' (not 'created_at')", async () => {
  // Same bug as compression_analytics. Checked by running the cleanup: call_logs
  // has no created_at column, so a query on it would fail and report an error
  // instead of deleting the expired row.
  const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-cleanup-column-"));
  process.env.DATA_DIR = dataDir;
  const core = await import("../../src/lib/db/core.ts");
  const { cleanupCallLogs } = await import("../../src/lib/db/cleanup.ts");
  const { getUserDatabaseSettings } = await import("../../src/lib/db/databaseSettings.ts");
  try {
    const db = core.getDbInstance();
    const days = getUserDatabaseSettings().retention.callLogs;
    const expired = new Date(Date.now() - (days + 1) * 86_400_000).toISOString();
    const insert = db.prepare("INSERT INTO call_logs (id, timestamp) VALUES (?, ?)");
    insert.run("expired", expired);
    insert.run("recent", new Date().toISOString());

    assert.deepEqual(await cleanupCallLogs(), { deleted: 1, errors: 0 });
    assert.deepEqual(
      db
        .prepare("SELECT id FROM call_logs")
        .all()
        .map((row) => row.id),
      ["recent"]
    );
  } finally {
    core.resetDbInstance();
    fs.rmSync(dataDir, { recursive: true, force: true });
  }
});

test("cleanup: has proxy_logs cleanup function", () => {
  assert.ok(
    source.includes("cleanupProxyLogs"),
    "must have cleanupProxyLogs function for the proxy_logs table"
  );
  assert.ok(
    /table: "proxy_logs",\s*column: "timestamp"/.test(source),
    "proxy_logs cleanup must use timestamp column"
  );
});

test("cleanup: proxy_logs is included in runAutoCleanup", () => {
  assert.ok(
    source.includes("proxyLogs: await cleanupProxyLogs()"),
    "runAutoCleanup must include proxyLogs cleanup"
  );
});

test("cleanup: has background scheduler (startCleanupScheduler)", () => {
  assert.ok(
    source.includes("startCleanupScheduler"),
    "must export startCleanupScheduler for periodic background cleanup"
  );
  assert.ok(source.includes("CLEANUP_INTERVAL_MS"), "must have a cleanup interval constant");
  // #12821: reclaim freed pages without a blocking full VACUUM on the serving thread.
  assert.ok(
    reclaimSource.includes("incremental_vacuum("),
    "reclaimFreedPages() must reclaim freed pages via PRAGMA incremental_vacuum after deletes"
  );
  assert.ok(
    !/\b(exec|run|prepare)\s*\(\s*[`'"]\s*VACUUM\b/i.test(source) &&
      !/\b(exec|run|prepare)\s*\(\s*[`'"]\s*VACUUM\b/i.test(reclaimSource),
    "scheduler must never run a blocking full VACUUM — defer to vacuumScheduler (#12821)"
  );
});

test("cleanup: scheduler is wired into instrumentation-node.ts", () => {
  const instrumentationPath = path.resolve(
    import.meta.dirname,
    "../../src/instrumentation-node.ts"
  );
  const instrumentation = fs.readFileSync(instrumentationPath, "utf-8");
  assert.ok(
    instrumentation.includes("startCleanupScheduler"),
    "instrumentation-node.ts must import startCleanupScheduler"
  );
  assert.ok(
    instrumentation.includes("startCleanupScheduler()"),
    "instrumentation-node.ts must call startCleanupScheduler() at startup"
  );
});

test("cleanup: mcp_tool_audit uses correct table name (not 'mcp_audit_log')", () => {
  assert.ok(
    source.includes("DELETE FROM mcp_tool_audit WHERE created_at < ?"),
    "mcp_tool_audit cleanup must use its created_at column"
  );
  assert.ok(
    !source.includes("DELETE FROM mcp_audit_log WHERE"),
    "must NOT use non-existent table name mcp_audit_log"
  );
  assert.ok(
    !source.includes("DELETE FROM mcp_tool_audit WHERE timestamp"),
    "must NOT use timestamp for mcp_tool_audit"
  );
});

test("cleanup: a2a_task_events uses correct table name (not 'a2a_events')", () => {
  assert.ok(
    source.includes("DELETE FROM a2a_task_events WHERE created_at < ?"),
    "a2a_task_events cleanup must use its created_at column"
  );
  assert.ok(
    !source.includes("DELETE FROM a2a_events WHERE"),
    "must NOT use non-existent table name a2a_events"
  );
  assert.ok(
    !source.includes("DELETE FROM a2a_task_events WHERE timestamp"),
    "must NOT use timestamp for a2a_task_events"
  );
});

test("cleanup: memories uses correct table name (not 'memory_entries')", () => {
  assert.ok(source.includes("DELETE FROM memories WHERE"), "must use correct table name memories");
  assert.ok(
    !source.includes("DELETE FROM memory_entries WHERE"),
    "must NOT use non-existent table name memory_entries"
  );
});

test("cleanup: mcp_tool_audit prunes by created_at (existing column), not timestamp", () => {
  // mcp_tool_audit has created_at (see 002_mcp_a2a_tables.sql); timestamp does
  // not exist, so WHERE timestamp < ? raised SqliteError "no such column" at
  // every boot-time cleanup and the retention pruning never ran.
  assert.ok(
    source.includes("DELETE FROM mcp_tool_audit WHERE created_at < ?"),
    "mcp_tool_audit cleanup must use created_at column"
  );
  assert.ok(
    !source.includes("DELETE FROM mcp_tool_audit WHERE timestamp"),
    "must NOT use timestamp for mcp_tool_audit (column doesn't exist)"
  );
});

test("cleanup: a2a_task_events prunes by created_at (existing column), not timestamp", () => {
  // Same schema fact for a2a_task_events (created_at, no timestamp column).
  assert.ok(
    source.includes("DELETE FROM a2a_task_events WHERE created_at < ?"),
    "a2a_task_events cleanup must use created_at column"
  );
  assert.ok(
    !source.includes("DELETE FROM a2a_task_events WHERE timestamp"),
    "must NOT use timestamp for a2a_task_events (column doesn't exist)"
  );
});
