import test from "node:test";
import assert from "node:assert/strict";
import { DatabaseSync } from "node:sqlite";
import { readFileSync } from "node:fs";

const migration = readFileSync(
  new URL("../../../src/lib/db/migrations/236_key_templates.sql", import.meta.url),
  "utf8"
);

test("key-template migration creates an idempotent table and unique case-insensitive names", () => {
  const db = new DatabaseSync(":memory:");
  db.exec(migration);
  db.prepare(
    "INSERT INTO key_templates (id, name, policy, created_at, updated_at) VALUES (?, ?, ?, ?, ?)"
  ).run("one", "Production", "{}", "now", "now");
  db.exec(migration);
  assert.equal(db.prepare("SELECT count(*) AS n FROM key_templates").get()?.n, 1);
  assert.throws(
    () =>
      db
        .prepare(
          "INSERT INTO key_templates (id, name, policy, created_at, updated_at) VALUES (?, ?, ?, ?, ?)"
        )
        .run("two", "production", "{}", "now", "now"),
    /UNIQUE/
  );
  db.close();
});

test("template storage upgrades alongside existing five-hour key data", () => {
  const db = new DatabaseSync(":memory:");
  db.exec("CREATE TABLE api_keys (id TEXT PRIMARY KEY)");
  db.exec(
    readFileSync(
      new URL("../../../src/lib/db/migrations/229_api_key_five_hour_limit.sql", import.meta.url),
      "utf8"
    )
  );
  db.prepare("INSERT INTO api_keys VALUES (?, ?)").run("existing", 0.125);
  db.exec(migration);
  const row = db.prepare("SELECT * FROM api_keys WHERE id = ?").get("existing");
  assert.equal(row?.five_hour_usage_limit_usd, 0.125);
  assert.equal(row?.id, "existing");
  assert.equal(db.prepare("SELECT count(*) AS n FROM key_templates").get()?.n, 0);
  db.close();
});
