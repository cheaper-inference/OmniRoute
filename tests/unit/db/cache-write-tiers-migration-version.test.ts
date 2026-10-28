import assert from "node:assert/strict";
import { after, test } from "node:test";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { openMemorySqliteAdapter } from "../_helpers/memorySqliteAdapter.ts";

// The cache-write tier migration was renumbered (213 -> 217) because 213 belongs to
// api_key_preferred_connections on the release. Its isSchemaAlreadyApplied guard must follow
// the file: left on "213", a DB that already carries the cache-write columns would skip the
// unrelated api_keys migration.
const sourceDir = fileURLToPath(new URL("../../../src/lib/db/migrations/", import.meta.url));
const cacheWriteFile = fs
  .readdirSync(sourceDir)
  .find((name) => name.endsWith("_call_logs_cache_write_tiers.sql"));
const migrationsDir = fs.mkdtempSync(path.join(os.tmpdir(), "cache-write-version-"));
for (const name of ["213_api_key_preferred_connections.sql", cacheWriteFile!]) {
  fs.copyFileSync(path.join(sourceDir, name), path.join(migrationsDir, name));
}
const old = process.env.OMNIROUTE_MIGRATIONS_DIR;
process.env.OMNIROUTE_MIGRATIONS_DIR = migrationsDir;
const { runMigrations } = await import("../../../src/lib/db/migrationRunner.ts");
after(() => {
  if (old === undefined) delete process.env.OMNIROUTE_MIGRATIONS_DIR;
  else process.env.OMNIROUTE_MIGRATIONS_DIR = old;
  fs.rmSync(migrationsDir, { recursive: true, force: true });
});

test("cache-write tiers migration does not reuse the api_key_preferred_connections version", () => {
  assert.ok(cacheWriteFile, "cache-write tiers migration file is present");
  assert.notEqual(cacheWriteFile!.split("_")[0], "213");
});

test("existing cache-write columns never skip the api_keys preferred_connections migration", () => {
  const db = openMemorySqliteAdapter();
  try {
    db.exec(
      "CREATE TABLE api_keys (id TEXT PRIMARY KEY);" +
        "CREATE TABLE call_logs (id TEXT PRIMARY KEY, tokens_cache_creation_5m REAL," +
        " tokens_cache_creation_1h REAL, cache_creation_tier_status TEXT," +
        " cache_write_cost_usd REAL, cache_write_priced_tokens REAL);"
    );
    runMigrations(db);
    const columns = (
      db.prepare("PRAGMA table_info(api_keys)").all() as Array<{ name: string }>
    ).map((column) => column.name);
    assert.ok(columns.includes("preferred_connections"), columns.join(","));
  } finally {
    db.close();
  }
});
