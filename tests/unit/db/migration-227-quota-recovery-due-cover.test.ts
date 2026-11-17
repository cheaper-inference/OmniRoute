// Migration 227 rebuilds idx_quota_recovery_due so it also holds expires_at and api_key_id.
// The query plans this index serves are checked in
// tests/unit/quota-recovery-per-key-limits.test.ts.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { SqliteAdapter } from "../../../src/lib/db/adapters/types.ts";
import { openMemorySqliteAdapter } from "../_helpers/memorySqliteAdapter.ts";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-migration-227-data-"));
process.env.DATA_DIR = dataDir;

const repoMigrations = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "../../../src/lib/db/migrations"
);
const MIGRATION_217 = "217_quota_recovery_tickets.sql";
const MIGRATION_227 = "227_quota_recovery_due_cover.sql";
const migrationsDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-migration-227-"));
const originalMigrationsDir = process.env.OMNIROUTE_MIGRATIONS_DIR;
process.env.OMNIROUTE_MIGRATIONS_DIR = migrationsDir;

const { runMigrations } = await import("../../../src/lib/db/migrationRunner.ts");

test.after(() => {
  for (const dir of [migrationsDir, dataDir]) {
    fs.rmSync(dir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
  if (originalMigrationsDir === undefined) delete process.env.OMNIROUTE_MIGRATIONS_DIR;
  else process.env.OMNIROUTE_MIGRATIONS_DIR = originalMigrationsDir;
});

/** Make the runner's migrations directory hold exactly `files`. */
function useMigrations(files: string[]): void {
  for (const file of fs.readdirSync(migrationsDir)) fs.rmSync(path.join(migrationsDir, file));
  for (const file of files) {
    fs.copyFileSync(path.join(repoMigrations, file), path.join(migrationsDir, file));
  }
}

function dueIndexColumns(db: SqliteAdapter): string[] {
  return (
    db.prepare("PRAGMA index_info(idx_quota_recovery_due)").all() as Array<{
      seqno: number;
      name: string;
    }>
  )
    .sort((a, b) => a.seqno - b.seqno)
    .map((row) => row.name);
}

const COVER_COLUMNS = ["state", "next_attempt_at", "expires_at", "api_key_id"];

test("migration 227 rebuilds the due index under the same name", () => {
  const db = openMemorySqliteAdapter();
  try {
    useMigrations([MIGRATION_217, MIGRATION_227]);
    assert.equal(runMigrations(db, { isNewDb: true }), 2);
    assert.deepEqual(dueIndexColumns(db), COVER_COLUMNS);
    assert.equal(runMigrations(db, { isNewDb: true }), 0, "second run is a no-op");
  } finally {
    db.close();
  }
});

test("migration 227 SQL can run again on a database that already has it", () => {
  // The runner skips applied versions, so this executes the file directly.
  const db = openMemorySqliteAdapter();
  try {
    useMigrations([MIGRATION_217, MIGRATION_227]);
    assert.equal(runMigrations(db, { isNewDb: true }), 2);
    const sql = fs.readFileSync(path.join(repoMigrations, MIGRATION_227), "utf8");
    assert.doesNotThrow(() => db.exec(sql));
    assert.deepEqual(dueIndexColumns(db), COVER_COLUMNS);
  } finally {
    db.close();
  }
});

test("upgrading a database that already has tickets keeps every row", () => {
  const db = openMemorySqliteAdapter();
  try {
    useMigrations([MIGRATION_217]);
    assert.equal(runMigrations(db, { isNewDb: true }), 1);
    assert.deepEqual(dueIndexColumns(db), ["state", "next_attempt_at"]);
    const insert = db.prepare(
      `INSERT INTO quota_recovery_tickets
        (id, api_key_id, turn_key, request_hash, endpoint, request_ciphertext, state,
         next_attempt_at, expires_at, created_at, updated_at)
       VALUES (?, ?, ?, 'hash', 'responses', 'payload', ?, ?, ?, ?, ?)`
    );
    for (let i = 0; i < 200; i++) {
      const at = `2026-09-${10 + (i % 9)}T00:00:00.000Z`;
      insert.run(
        `ticket-${i}`,
        `key-${i % 4}`,
        `turn-${i}`,
        i % 5 === 0 ? "completed" : "pending",
        at,
        "2026-10-01T00:00:00.000Z",
        at,
        at
      );
    }

    useMigrations([MIGRATION_217, MIGRATION_227]);
    assert.equal(runMigrations(db, { isNewDb: false }), 1, "only 227 is pending");
    assert.deepEqual(dueIndexColumns(db), COVER_COLUMNS);
    const row = db
      .prepare(
        `SELECT COUNT(*) AS n FROM quota_recovery_tickets INDEXED BY idx_quota_recovery_due
         WHERE api_key_id = 'key-1' AND state = 'pending'`
      )
      .get() as { n: number };
    assert.equal(row.n, 40);
    assert.equal(
      (db.prepare("PRAGMA integrity_check").get() as Record<string, string>).integrity_check,
      "ok"
    );
  } finally {
    db.close();
  }
});
