import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import { registerAuditLogRepositoryConformance } from "../../../helpers/persistence/auditLogRepositoryConformance.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-audit-repository-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../../../src/lib/db/core.ts");
test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

const { sqliteAuditLogRepository: auditLog } =
  await import("../../../../src/lib/db/repositories/sqliteAuditLogRepository.ts");
const { auditRepositories } =
  await import("../../../../src/lib/db/repositories/auditRepositories.ts");
const compliance = await import("../../../../src/lib/compliance/index.ts");

async function resetStorage(): Promise<void> {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

registerAuditLogRepositoryConformance(async () => ({
  auditLog,
  reset: resetStorage,
  async seed(rows) {
    for (const row of rows) {
      compliance.logAuditEvent({
        createdAt: row.timestamp,
        action: row.action,
        actor: row.actor,
        target: row.target ?? undefined,
        status: row.status ?? undefined,
        resourceType: row.resourceType ?? undefined,
        requestId: row.requestId ?? undefined,
      });
    }
  },
}));

test("composition root exposes the SQLite repository and its legacy helpers", () => {
  assert.equal(auditRepositories.auditLog, auditLog);
  assert.equal(typeof auditRepositories.legacySync.listAuditLogRows, "function");
});

test("schema setup adds the columns an older audit_log table lacks", async () => {
  await resetStorage();
  const db = core.getDbInstance();
  db.exec(`
    DROP TABLE IF EXISTS audit_log;
    CREATE TABLE audit_log (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      timestamp TEXT NOT NULL DEFAULT (datetime('now')),
      action TEXT NOT NULL,
      actor TEXT NOT NULL DEFAULT 'system',
      target TEXT,
      details TEXT,
      ip_address TEXT
    );
  `);
  await auditLog.ensureSchema();
  const columns = (db.prepare("PRAGMA table_info(audit_log)").all() as Array<{ name: string }>)
    .map((column) => column.name)
    .sort();
  for (const name of ["metadata", "request_id", "resource_type", "status"]) {
    assert.ok(columns.includes(name), `missing column ${name}`);
  }
  const indexes = (db.prepare("PRAGMA index_list(audit_log)").all() as Array<{ name: string }>).map(
    (index) => index.name
  );
  assert.ok(indexes.includes("idx_audit_action"));
});

// The compliance facade keeps its public functions and routes storage through the
// repository: breaking a delegated helper must change what the facade returns.
test("compliance facade reads, counts and prunes through the audit repository", async () => {
  await resetStorage();
  compliance.logAuditEvent({ action: "a.one", createdAt: "2000-01-01T00:00:00.000Z" });
  compliance.logAuditEvent({ action: "a.two" });

  const legacy = auditRepositories.legacySync;
  const original = { ...legacy };
  const calls: string[] = [];
  legacy.listAuditLogRows = (...args) => {
    calls.push("list");
    return original.listAuditLogRows(...args);
  };
  legacy.countAuditLogRows = (...args) => {
    calls.push("count");
    return original.countAuditLogRows(...args);
  };
  legacy.listAuditLogRowsByActionSince = (...args) => {
    calls.push("since");
    return original.listAuditLogRowsByActionSince(...args);
  };
  legacy.deleteAuditLogRowsBefore = (...args) => {
    calls.push("delete");
    return original.deleteAuditLogRowsBefore(...args);
  };
  try {
    assert.equal(compliance.getAuditLog().length, 2);
    assert.equal(compliance.countAuditLog(), 2);
    assert.equal(compliance.getAuditLogByActionSince("a.two", "2001-01-01").length, 1);
    const cleanup = await compliance.cleanupExpiredLogs();
    assert.equal(cleanup.deletedAuditLogs, 1);
  } finally {
    Object.assign(legacy, original);
  }
  assert.deepEqual(calls, ["list", "count", "since", "delete"]);
});

// ANALYZE can make SQLite pick idx_audit_action without a hint, so the plan alone does
// not prove the pin is still there: check the statement text of the hot-path read.
test("the exact-action history read pins idx_audit_action", async () => {
  await resetStorage();
  const db = core.getDbInstance();
  await auditLog.ensureSchema();
  const seen: string[] = [];
  const original = db.prepare.bind(db);
  (db as { prepare: typeof db.prepare }).prepare = ((sql: string) => {
    seen.push(sql);
    return original(sql);
  }) as typeof db.prepare;
  try {
    auditRepositories.legacySync.listAuditLogRowsByActionSince(db, "x", "2000-01-01");
  } finally {
    (db as { prepare: typeof db.prepare }).prepare = original;
  }
  assert.equal(seen.length, 1);
  assert.match(
    seen[0],
    /FROM audit_log INDEXED BY idx_audit_action\s+WHERE action = \? AND timestamp >= \?/
  );
});
