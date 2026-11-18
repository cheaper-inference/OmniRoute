import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { DatabaseSync } from "node:sqlite";
import test from "node:test";
import { createNodeSqliteAdapterFromDatabase } from "../../../src/lib/db/adapters/nodeSqliteShared.ts";

// key_templates was published by PR #19311 in slots 228, 230, 231, 232 and 234 before the
// release claimed them. The canonical migration lives at 236; databases that
// recorded an earlier slot must be rehomed so the release migrations still run.
fs.mkdirSync(path.resolve("_artifacts"), { recursive: true });
const fixture = fs.mkdtempSync(path.resolve("_artifacts/key-templates-migration-"));
const originalEnv = { ...process.env };
for (const key of Object.keys(process.env)) delete process.env[key];
for (const key of ["PATH", "SystemRoot", "WINDIR", "COMSPEC", "PATHEXT", "NODE_TEST_CONTEXT"]) {
  if (originalEnv[key]) process.env[key] = originalEnv[key];
}
for (const key of ["DATA_DIR", "HOME", "USERPROFILE", "APPDATA", "LOCALAPPDATA", "TEMP", "TMP"]) {
  process.env[key] = fixture;
}
for (const key of ["SQLITE_FILE", "OMNIROUTE_SQLITE_FILE"]) {
  process.env[key] = path.join(fixture, "isolated.sqlite");
}
Object.assign(process.env, {
  APP_LOG_TO_FILE: "false",
  DISABLE_SQLITE_AUTO_BACKUP: "true",
  OMNIROUTE_SKIP_SYSTEM_TRUST: "1",
  OMNIROUTE_PLUGINS_DIR: path.join(fixture, "plugins"),
  OMNIROUTE_MIGRATIONS_DIR: fixture,
});

const PUBLISHED_SLOTS = ["228", "230", "231", "232", "234"] as const;
const CANONICAL_OCCUPANTS: Record<(typeof PUBLISHED_SLOTS)[number], string> = {
  "228": "purge_orphaned_provider_catalogs",
  "230": "call_logs_cache_write_tiers",
  "231": "daily_cached_input",
  "232": "proxy_payload_traffic",
  "234": "agent_sessions",
};
for (const [version, name] of Object.entries(CANONICAL_OCCUPANTS)) {
  fs.writeFileSync(
    path.join(fixture, `${version}_${name}.sql`),
    `CREATE TABLE incoming_${version} (id INTEGER PRIMARY KEY);`,
    "utf8"
  );
}
const templateSql = fs.readFileSync(
  new URL("../../../src/lib/db/migrations/236_key_templates.sql", import.meta.url),
  "utf8"
);
fs.writeFileSync(path.join(fixture, "236_key_templates.sql"), templateSql, "utf8");

const { runMigrations } = await import("../../../src/lib/db/migrationRunner.ts");

const makeDb = () => {
  const db = createNodeSqliteAdapterFromDatabase(new DatabaseSync(":memory:"), ":memory:");
  db.exec(`CREATE TABLE _omniroute_migrations (
    version TEXT PRIMARY KEY, name TEXT NOT NULL,
    applied_at TEXT NOT NULL DEFAULT (datetime('now'))
  );`);
  return db;
};

const ledger = (db: ReturnType<typeof makeDb>) =>
  db.prepare("SELECT version, name FROM _omniroute_migrations ORDER BY version").all();

const EXPECTED_LEDGER = [
  { version: "228", name: "purge_orphaned_provider_catalogs" },
  { version: "230", name: "call_logs_cache_write_tiers" },
  { version: "231", name: "daily_cached_input" },
  { version: "232", name: "proxy_payload_traffic" },
  { version: "234", name: "agent_sessions" },
  { version: "236", name: "key_templates" },
];

const assertCanonicalOccupantsRan = (db: ReturnType<typeof makeDb>) => {
  for (const version of PUBLISHED_SLOTS) {
    assert.ok(
      db
        .prepare("SELECT name FROM sqlite_master WHERE type='table' AND name=?")
        .get(`incoming_${version}`),
      `canonical migration ${version} must execute after key_templates is rehomed`
    );
  }
};

test("fresh database applies key_templates at 236 next to the canonical slots", () => {
  const db = makeDb();
  try {
    assert.equal(runMigrations(db, { isNewDb: true }), PUBLISHED_SLOTS.length + 1);
    assert.deepEqual(ledger(db), EXPECTED_LEDGER);
    assertCanonicalOccupantsRan(db);
    assert.equal(
      (db.prepare("SELECT count(*) AS n FROM key_templates").get() as { n: number }).n,
      0
    );
    assert.equal(runMigrations(db, { isNewDb: true }), 0);
  } finally {
    db.close();
  }
});

test("databases that applied key_templates in a published slot are rehomed to 236", () => {
  const subsets = Array.from({ length: (1 << PUBLISHED_SLOTS.length) - 1 }, (_, i) =>
    PUBLISHED_SLOTS.filter((_, index) => (i + 1) & (1 << index))
  );
  for (const versions of subsets) {
    const db = makeDb();
    try {
      db.exec(templateSql);
      db.prepare(
        "INSERT INTO key_templates (id, name, policy, created_at, updated_at) VALUES (?,?,?,?,?)"
      ).run("kept", "Production", '{"key":{}}', "fixture-created", "fixture-created");
      for (const version of versions) {
        db.prepare(
          "INSERT INTO _omniroute_migrations (version, name, applied_at) VALUES (?,?,?)"
        ).run(version, "key_templates", "fixture-applied");
      }

      assert.equal(
        runMigrations(db, { isNewDb: true }),
        PUBLISHED_SLOTS.length,
        `slots ${versions.join(",")}`
      );
      assert.deepEqual(ledger(db), EXPECTED_LEDGER, `slots ${versions.join(",")}`);
      assertCanonicalOccupantsRan(db);
      assert.equal(
        (
          db.prepare("SELECT applied_at FROM _omniroute_migrations WHERE version='236'").get() as {
            applied_at: string;
          }
        ).applied_at,
        "fixture-applied",
        "the rehomed ledger row keeps its original application time"
      );
      assert.deepEqual(db.prepare("SELECT id, name, policy FROM key_templates").all(), [
        { id: "kept", name: "Production", policy: '{"key":{}}' },
      ]);
      assert.equal(runMigrations(db, { isNewDb: true }), 0);
    } finally {
      db.close();
    }
  }
});
