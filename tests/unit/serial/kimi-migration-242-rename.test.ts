import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { createTempDataDir } from "../../_setup/tempDataDir.ts";
const { cleanup } = createTempDataDir("kimi-slot-");
const { createNodeSqliteAdapter } =
  await import("../../../src/lib/db/adapters/nodeSqliteAdapter.ts");
const migrationsDir = fs.mkdtempSync(path.join(os.tmpdir(), "kimi-migrations-242-"));
const upstream = [
  ["239", "call_logs_pending_detail_index"],
  ["240", "provider_node_custom_json_config"],
  ["241", "seen_models"],
] as const;
for (const name of [
  ...upstream.map(([version, name]) => version + "_" + name + ".sql"),
  "242_canonical_kimi_provider.sql",
]) {
  fs.copyFileSync(path.join("src/lib/db/migrations", name), path.join(migrationsDir, name));
}
const previousDir = process.env.OMNIROUTE_MIGRATIONS_DIR;
process.env.OMNIROUTE_MIGRATIONS_DIR = migrationsDir;
const { runMigrations } = await import("../../../src/lib/db/migrationRunner.ts");
const appliedAt = "2026-11-12 12:00:00";
test.after(async () => {
  if (previousDir === undefined) delete process.env.OMNIROUTE_MIGRATIONS_DIR;
  else process.env.OMNIROUTE_MIGRATIONS_DIR = previousDir;
  fs.rmSync(migrationsDir, { recursive: true, force: true });
  await cleanup();
});
async function createDb() {
  const db = await createNodeSqliteAdapter(":memory:");
  db.exec(`
    CREATE TABLE _omniroute_migrations (version TEXT PRIMARY KEY, name TEXT NOT NULL, applied_at TEXT NOT NULL DEFAULT (datetime('now')));
    CREATE TABLE call_logs (id TEXT PRIMARY KEY, detail_state TEXT, detail_pending_until INTEGER);
    CREATE TABLE provider_nodes (id TEXT PRIMARY KEY);
    CREATE TABLE provider_connections (id TEXT PRIMARY KEY, provider TEXT);
    INSERT INTO provider_connections VALUES ('saved', 'kimi');
  `);
  return db;
}

for (const oldVersion of ["239", "240"])
  for (const appliedOthers of [false, true]) {
    test(
      "published Kimi " + oldVersion + " moves directly to 242; applied upstream=" + appliedOthers,
      async () => {
        const db = await createDb();
        try {
          db.prepare(
            "INSERT INTO _omniroute_migrations VALUES (?, 'canonical_kimi_provider', ?)"
          ).run(oldVersion, appliedAt);
          if (appliedOthers)
            for (const [version, name] of upstream) {
              if (version === oldVersion) continue;
              db.exec(
                fs.readFileSync(path.join(migrationsDir, version + "_" + name + ".sql"), "utf8")
              );
              db.prepare("INSERT INTO _omniroute_migrations VALUES (?, ?, ?)").run(
                version,
                name,
                appliedAt
              );
            }
          assert.equal(runMigrations(db), appliedOthers ? 1 : 3);
          assert.deepEqual(
            db.prepare("SELECT version, name FROM _omniroute_migrations ORDER BY version").all(),
            [
              ...upstream.map(([version, name]) => ({ version, name })),
              { version: "242", name: "canonical_kimi_provider" },
            ]
          );
          assert.equal(
            db.prepare("SELECT applied_at FROM _omniroute_migrations WHERE version='242'").get()
              ?.applied_at,
            appliedAt
          );
          if (appliedOthers)
            for (const [version] of upstream)
              if (version !== oldVersion)
                assert.equal(
                  db
                    .prepare("SELECT applied_at FROM _omniroute_migrations WHERE version=?")
                    .get(version)?.applied_at,
                  appliedAt
                );
          assert.ok(
            db.prepare("SELECT 1 FROM sqlite_master WHERE name='idx_cl_detail_pending'").get()
          );
          assert.ok(
            db
              .prepare("PRAGMA table_info(provider_nodes)")
              .all()
              .some((row) => row.name === "custom_json_config_json")
          );
          assert.ok(db.prepare("SELECT 1 FROM sqlite_master WHERE name='seen_models'").get());
          assert.deepEqual(db.prepare("SELECT * FROM provider_connections").all(), [
            { id: "saved", provider: "kimi" },
          ]);
          const before = db.prepare("SELECT * FROM _omniroute_migrations ORDER BY version").all();
          assert.equal(runMigrations(db), 0);
          assert.deepEqual(
            db.prepare("SELECT * FROM _omniroute_migrations ORDER BY version").all(),
            before
          );
        } finally {
          db.close();
        }
      }
    );
  }

test("canonical upstream 239/240/241 and Kimi 242 markers retain their identities", async () => {
  const db = await createDb();
  try {
    for (const [version, name] of upstream) {
      db.exec(fs.readFileSync(path.join(migrationsDir, version + "_" + name + ".sql"), "utf8"));
      db.prepare("INSERT INTO _omniroute_migrations VALUES (?, ?, ?)").run(
        version,
        name,
        appliedAt
      );
    }
    db.prepare(
      "INSERT INTO _omniroute_migrations VALUES ('242', 'canonical_kimi_provider', ?)"
    ).run(appliedAt);
    const before = db.prepare("SELECT * FROM _omniroute_migrations ORDER BY version").all();
    assert.equal(runMigrations(db), 0);
    assert.deepEqual(
      db.prepare("SELECT * FROM _omniroute_migrations ORDER BY version").all(),
      before
    );
  } finally {
    db.close();
  }
});
