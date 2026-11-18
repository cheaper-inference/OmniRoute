// Migration 194 adds BOTH headers_ms and first_chunk_ms. The boot-time
// schema guard may independently add either column; a half-upgraded DB must
// never record 194 as complete when only one physical column exists.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import Database from "better-sqlite3";

const repoMigrations = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "../../src/lib/db/migrations"
);
const migrationsDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-migration-194-"));
fs.copyFileSync(
  path.join(repoMigrations, "194_proxy_logs_attempt_timing.sql"),
  path.join(migrationsDir, "194_proxy_logs_attempt_timing.sql")
);
const originalMigrationsDir = process.env.OMNIROUTE_MIGRATIONS_DIR;
process.env.OMNIROUTE_MIGRATIONS_DIR = migrationsDir;

const { runMigrations } = await import("../../src/lib/db/migrationRunner.ts");

test.after(() => {
  fs.rmSync(migrationsDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  if (originalMigrationsDir === undefined) delete process.env.OMNIROUTE_MIGRATIONS_DIR;
  else process.env.OMNIROUTE_MIGRATIONS_DIR = originalMigrationsDir;
});

function columns(db: Database.Database): string[] {
  return (db.prepare("PRAGMA table_info(proxy_logs)").all() as Array<{ name: string }>).map(
    (column) => column.name
  );
}

for (const preexistingColumns of [
  [] as string[],
  ["headers_ms"],
  ["first_chunk_ms"],
  ["headers_ms", "first_chunk_ms"],
]) {
  test(`194 repairs partially added timing columns: ${preexistingColumns.join(",") || "neither"}`, () => {
    const db = new Database(":memory:");
    try {
      db.exec("CREATE TABLE proxy_logs (id TEXT PRIMARY KEY)");
      for (const name of preexistingColumns) {
        // Known columns only, no dynamic untrusted identifier content.
        db.exec(`ALTER TABLE proxy_logs ADD COLUMN ${name} INTEGER DEFAULT NULL`);
      }
      assert.equal(runMigrations(db, { isNewDb: true }), 1);
      assert.ok(columns(db).includes("headers_ms"), "headers latency must exist");
      assert.ok(columns(db).includes("first_chunk_ms"), "first-chunk latency must exist");
      assert.deepEqual(
        db.prepare("SELECT version,name FROM _omniroute_migrations ORDER BY version").all(),
        [{ version: "194", name: "proxy_logs_attempt_timing" }]
      );
      assert.equal(runMigrations(db, { isNewDb: true }), 0, "repeat startup is idempotent");
    } finally {
      db.close();
    }
  });
}
