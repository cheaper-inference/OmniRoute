import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import Database from "better-sqlite3";

const migrationPath = path.resolve("src/lib/db/migrations/215_team_cost_centers.sql");

test("migration 215 enforces one active billing team per API key", () => {
  const db = new Database(":memory:");
  db.exec(`
    PRAGMA foreign_keys = ON;
    CREATE TABLE api_keys (id TEXT PRIMARY KEY);
    CREATE TABLE usage_history (
      id INTEGER PRIMARY KEY,
      billing_team_id TEXT,
      team_rollup_processed_at TEXT,
      timestamp TEXT
    );
    ${fs.readFileSync(migrationPath, "utf8")}
  `);
  db.prepare("INSERT INTO api_keys (id) VALUES (?)").run("key-1");
  db.prepare(
    "INSERT INTO teams (id, name, status, created_at, updated_at) VALUES (?, ?, 'active', ?, ?)"
  ).run("team-a", "Team A", "2026-08-14T00:00:00Z", "2026-08-14T00:00:00Z");
  db.prepare(
    "INSERT INTO teams (id, name, status, created_at, updated_at) VALUES (?, ?, 'active', ?, ?)"
  ).run("team-b", "Team B", "2026-08-14T00:00:00Z", "2026-08-14T00:00:00Z");
  db.prepare(
    "INSERT INTO api_key_billing_team_history (id, api_key_id, team_id, valid_from, created_at) VALUES (?, ?, ?, ?, ?)"
  ).run("bind-a", "key-1", "team-a", "2026-08-14T00:00:00Z", "2026-08-14T00:00:00Z");
  assert.throws(
    () =>
      db
        .prepare(
          "INSERT INTO api_key_billing_team_history (id, api_key_id, team_id, valid_from, created_at) VALUES (?, ?, ?, ?, ?)"
        )
        .run("bind-b", "key-1", "team-b", "2026-08-14T01:00:00Z", "2026-08-14T01:00:00Z"),
    /UNIQUE constraint failed/
  );
  db.close();
});
