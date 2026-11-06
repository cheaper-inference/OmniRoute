/**
 * tests/unit/17186-migration-name-contract-no-numeric-prefix.test.ts
 *
 * Issue #17186 — dead branch in runMigrations.
 *
 * `runMigrations()` ended with a guard `appliedRecords.some((m) =>
 * m.name.startsWith("051_"))` that could never be true: migration records are
 * built from the filename regex `^(\d+)_(.+)\.sql$`, and `name` is the SECOND
 * capture group — the text AFTER the numeric prefix. The guard made
 * `insertDefaultDatabaseSettings()` and its `DEFAULT_DATABASE_SETTINGS` import
 * unreachable dead code, both removed in the accompanying fix.
 *
 * This test pins the invariant the fix relies on (a "repaired" guard that
 * started seeding rows would be a behavior change — the read path
 * merges DEFAULT_DATABASE_SETTINGS on read, so absent rows are the normal
 * case). It exercises the REAL migrations directory with the SAME regex the
 * runner uses. See Hard Rule #18 — this is a subtractive chore, so the pin is
 * an invariant, not a failing-then-passing repro.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const MIGRATIONS_DIR = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../../src/lib/db/migrations"
);

// Same regex as src/lib/db/migrationRunner.ts (loadMigrationsFromDir).
const MIGRATION_FILENAME_RE = /^(\d+)_(.+)\.sql$/;

test("#17186: migration record names never carry the numeric prefix", () => {
  const files = fs.readdirSync(MIGRATIONS_DIR).filter((f) => f.endsWith(".sql"));
  assert.ok(files.length > 0, "migrations directory must contain .sql files");

  for (const filename of files) {
    const match = filename.match(MIGRATION_FILENAME_RE);
    assert.ok(match, `migration filename must match NNN_name.sql: ${filename}`);
    // `name` is what the runner stores in the applied record (match[2]).
    const name = match[2];
    assert.ok(
      !/^\d/.test(name),
      `record name must not start with a digit (that is the version prefix): ${filename} → ${name}`
    );
    assert.ok(
      !name.startsWith("051_"),
      `no record name can start with "051_" — the removed guard was unreachable: ${filename}`
    );
  }
});

test("#17186: migrationRunner no longer references the dead default-settings seeder", () => {
  const source = fs.readFileSync(path.resolve(MIGRATIONS_DIR, "../migrationRunner.ts"), "utf-8");
  // Strip comments before scanning: the fix's own tombstone comment explains
  // what was removed and legitimately names the dead symbols.
  const code = source
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .split("\n")
    .filter((line) => !/^\s*\/\//.test(line))
    .join("\n");
  assert.ok(
    !code.includes("insertDefaultDatabaseSettings"),
    "insertDefaultDatabaseSettings must be fully removed (only caller was the dead 051_ guard)"
  );
  assert.ok(
    !code.includes("DEFAULT_DATABASE_SETTINGS"),
    "DEFAULT_DATABASE_SETTINGS import must be removed from migrationRunner.ts"
  );
});
