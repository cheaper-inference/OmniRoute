import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import Database from "better-sqlite3";

const dir = new URL("../../../src/lib/db/migrations/", import.meta.url);
const read = (name: string) => fs.readFileSync(new URL(name, dir), "utf8");

// The real table definition: 016 creates it, 027 adds the mode and source columns.
function makeDb() {
  const db = new Database(":memory:");
  db.pragma("foreign_keys = ON");
  db.exec(read("016_create_skills.sql"));
  db.exec(read("027_skill_mode_and_metadata.sql"));
  return db;
}

function addSkill(
  db: Database.Database,
  id: string,
  key: string,
  updatedAt: string,
  name = "echo"
) {
  db.prepare(
    `INSERT INTO skills (id, api_key_id, name, version, schema, handler, created_at, updated_at)
     VALUES (?, ?, ?, '1.0.0', '{}', 'h', ?, ?)`
  ).run(id, key, name, updatedAt, updatedAt);
}

function addRun(db: Database.Database, id: string, skillId: string) {
  db.prepare(
    `INSERT INTO skill_executions (id, skill_id, api_key_id, input, status)
     VALUES (?, ?, 'k1', '{}', 'success')`
  ).run(id, skillId);
}

const migrate = (db: Database.Database) =>
  db.transaction(() => db.exec(read("240_skills_unique_owner_name_version.sql")))();

test("migration 240 keeps the newest row per owner, name and version", () => {
  const db = makeDb();
  try {
    addSkill(db, "old", "k1", "2026-01-01T00:00:00.000Z");
    addSkill(db, "new", "k1", "2026-03-01T00:00:00.000Z");
    addSkill(db, "mid", "k1", "2026-02-01T00:00:00.000Z");
    addSkill(db, "other-key", "k2", "2026-01-01T00:00:00.000Z");
    addSkill(db, "other-name", "k1", "2026-01-01T00:00:00.000Z", "summarize");
    migrate(db);
    const ids = db.prepare("SELECT id FROM skills ORDER BY id").all();
    assert.deepEqual(ids, [{ id: "new" }, { id: "other-key" }, { id: "other-name" }]);
  } finally {
    db.close();
  }
});

test("migration 240 moves run history of removed rows to the kept row", () => {
  const db = makeDb();
  try {
    addSkill(db, "old", "k1", "2026-01-01T00:00:00.000Z");
    addSkill(db, "new", "k1", "2026-03-01T00:00:00.000Z");
    addRun(db, "run-old", "old");
    addRun(db, "run-new", "new");
    migrate(db);
    assert.deepEqual(db.prepare("SELECT id, skill_id FROM skill_executions ORDER BY id").all(), [
      { id: "run-new", skill_id: "new" },
      { id: "run-old", skill_id: "new" },
    ]);
  } finally {
    db.close();
  }
});

test("migration 240 adds a unique index and is safe to run twice", () => {
  const db = makeDb();
  try {
    addSkill(db, "a", "k1", "2026-01-01T00:00:00.000Z");
    migrate(db);
    migrate(db);
    assert.throws(() => addSkill(db, "b", "k1", "2026-02-01T00:00:00.000Z"), /UNIQUE/);
    addSkill(db, "c", "k2", "2026-02-01T00:00:00.000Z");
    assert.equal(db.prepare("SELECT COUNT(*) AS n FROM skills").get().n, 2);
  } finally {
    db.close();
  }
});
