import assert from "node:assert/strict";
import { after, test } from "node:test";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { openMemorySqliteAdapter } from "../_helpers/memorySqliteAdapter.ts";

const migrationsDir = fs.mkdtempSync(path.join(os.tmpdir(), "cache-write-migration-"));
fs.copyFileSync(
  fileURLToPath(
    new URL("../../../src/lib/db/migrations/217_call_logs_cache_write_tiers.sql", import.meta.url)
  ),
  path.join(migrationsDir, "217_call_logs_cache_write_tiers.sql")
);
const old = process.env.OMNIROUTE_MIGRATIONS_DIR;
process.env.OMNIROUTE_MIGRATIONS_DIR = migrationsDir;
const { runMigrations } = await import("../../../src/lib/db/migrationRunner.ts");
after(() => {
  if (old === undefined) delete process.env.OMNIROUTE_MIGRATIONS_DIR;
  else process.env.OMNIROUTE_MIGRATIONS_DIR = old;
  fs.rmSync(migrationsDir, { recursive: true, force: true });
});

for (const partial of [false, true]) {
  test(`cache-write migration preserves legacy rows and replays safely (partial=${partial})`, () => {
    const db = openMemorySqliteAdapter();
    try {
      db.exec(
        "CREATE TABLE call_logs (id TEXT PRIMARY KEY, tokens_cache_creation INTEGER); INSERT INTO call_logs VALUES ('legacy',100);"
      );
      if (partial) db.exec("ALTER TABLE call_logs ADD COLUMN tokens_cache_creation_5m REAL");
      runMigrations(db);
      runMigrations(db);
      const row = db.prepare("SELECT * FROM call_logs WHERE id = 'legacy'").get();
      assert.deepEqual(row, {
        id: "legacy",
        tokens_cache_creation: 100,
        tokens_cache_creation_5m: null,
        tokens_cache_creation_1h: null,
        cache_creation_tier_status: null,
        cache_write_cost_usd: null,
        cache_write_priced_tokens: null,
      });
      db.prepare(
        "UPDATE call_logs SET tokens_cache_creation_5m=30, tokens_cache_creation_1h=70, cache_creation_tier_status='reported' WHERE id='legacy'"
      ).run();
      db.prepare("DELETE FROM _omniroute_migrations WHERE version='217'").run();
      runMigrations(db);
      assert.equal(
        (db.prepare("SELECT tokens_cache_creation_1h AS n FROM call_logs").get() as { n: number })
          .n,
        70
      );
    } finally {
      db.close();
    }
  });
}
