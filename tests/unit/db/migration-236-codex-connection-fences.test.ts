import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import Database from "better-sqlite3";

const migration = fs.readFileSync(
  new URL("../../../src/lib/db/migrations/236_codex_connection_fences.sql", import.meta.url),
  "utf8"
);
const schema = `CREATE TABLE provider_connections (
  id TEXT PRIMARY KEY, provider TEXT, auth_type TEXT, email TEXT, project_id TEXT,
  access_token TEXT, refresh_token TEXT, is_active INTEGER DEFAULT 1,
  proxy_enabled INTEGER DEFAULT 1, per_key_proxy_enabled INTEGER DEFAULT 0,
  provider_specific_data TEXT, last_error_at TEXT, last_error TEXT, test_status TEXT,
  rate_limited_until TEXT, name TEXT, priority INTEGER, synced_models_at TEXT
);
CREATE TABLE key_value (namespace TEXT, key TEXT, value TEXT, PRIMARY KEY(namespace, key))`;
test("owner fences keep a distinct slot after Teams, quota recovery and proxy mirrors", () => {
  const files = fs.readdirSync(new URL("../../../src/lib/db/migrations/", import.meta.url));
  assert.deepEqual(files.filter((name) => /^(215|216|217|218|236)_/.test(name)).sort(), [
    "215_team_cost_centers.sql",
    "216_team_cost_shapes.sql",
    "217_quota_recovery_tickets.sql",
    "218_proxy_subscription_mirror_urls.sql",
    "236_codex_connection_fences.sql",
  ]);
});

type Fence = { owner_epoch: string; credential_revision: number; failure_revision: number };
function snapshot(db: Database.Database): Fence {
  return db
    .prepare(
      "SELECT owner_epoch, credential_revision, failure_revision FROM codex_connection_fences WHERE connection_id = 'a'"
    )
    .get() as Fence;
}
function insert(db: Database.Database, provider = "codex") {
  db.prepare(
    "INSERT INTO provider_connections (id, provider, access_token, refresh_token, provider_specific_data) VALUES ('a', ?, 'synthetic-a', 'synthetic-refresh-a', '{}')"
  ).run(provider);
}

for (const upgrade of [false, true]) {
  test(`migration 236 is idempotent on ${upgrade ? "upgrade with existing connections" : "a fresh schema"}`, () => {
    const db = new Database(":memory:");
    try {
      db.exec(schema);
      if (upgrade) insert(db);
      db.transaction(() => db.exec(migration))();
      if (!upgrade) insert(db);
      const before = snapshot(db);
      assert.match(before.owner_epoch, /^[0-9a-f]{32}$/);
      assert.equal(before.credential_revision, 0);
      db.transaction(() => db.exec(migration))();
      assert.deepEqual(snapshot(db), before);
      const stored = JSON.stringify(db.prepare("SELECT * FROM codex_connection_fences").all());
      assert.ok(!stored.includes("synthetic-a") && !stored.includes("synthetic-refresh-a"));
    } finally {
      db.close();
    }
  });
}

test("credential ABA, owner ABA and delete/recreate cannot reuse an old operation version", () => {
  const db = new Database(":memory:");
  try {
    db.exec(schema);
    db.exec(migration);
    insert(db);
    const before = snapshot(db);
    db.prepare("UPDATE provider_connections SET access_token = ? WHERE id = 'a'").run(
      "synthetic-b"
    );
    db.prepare("UPDATE provider_connections SET access_token = ? WHERE id = 'a'").run(
      "synthetic-a"
    );
    const credentialAba = snapshot(db);
    assert.equal(credentialAba.credential_revision, before.credential_revision + 2);
    assert.equal(credentialAba.owner_epoch, before.owner_epoch);
    db.prepare("UPDATE provider_connections SET provider_specific_data = ? WHERE id = 'a'").run(
      '{"workspaceId":"b"}'
    );
    db.prepare("UPDATE provider_connections SET provider_specific_data = ? WHERE id = 'a'").run(
      "{}"
    );
    const ownerAba = snapshot(db);
    assert.notEqual(ownerAba.owner_epoch, before.owner_epoch);
    db.prepare("DELETE FROM provider_connections WHERE id = 'a'").run();
    insert(db);
    assert.notEqual(snapshot(db).owner_epoch, ownerAba.owner_epoch);
  } finally {
    db.close();
  }
});

test("health and quota failures advance only failure ordering; unrelated updates do not invalidate credentials", () => {
  const db = new Database(":memory:");
  try {
    db.exec(schema);
    db.exec(migration);
    insert(db);
    const before = snapshot(db);
    db.prepare(
      "UPDATE provider_connections SET name = 'renamed', priority = 7 WHERE id = 'a'"
    ).run();
    assert.deepEqual(snapshot(db), before);
    db.prepare(
      "UPDATE provider_connections SET test_status = 'banned', last_error = 'new hard stop' WHERE id = 'a'"
    ).run();
    const failure = snapshot(db);
    assert.equal(failure.credential_revision, before.credential_revision);
    assert.ok(failure.failure_revision > before.failure_revision);
    db.prepare("UPDATE provider_connections SET provider_specific_data = ? WHERE id = 'a'").run(
      '{"codexScopeRateLimitedUntil":{"spark":"2099-01-01"}}'
    );
    const scoped = snapshot(db);
    assert.ok(scoped.failure_revision > failure.failure_revision);
    db.prepare(
      "UPDATE provider_connections SET provider_specific_data = '{}' WHERE id = 'a'"
    ).run();
    assert.deepEqual(snapshot(db), scoped, "clearing a cooldown is not a new failure");
  } finally {
    db.close();
  }
});

test("non-Codex rows and malformed metadata stay usable across provider transitions", () => {
  const db = new Database(":memory:");
  try {
    db.exec(schema);
    db.exec(migration);
    insert(db, "openai");
    assert.equal(db.prepare("SELECT count(*) n FROM codex_connection_fences").get().n, 0);
    db.prepare(
      "UPDATE provider_connections SET provider = 'codex', provider_specific_data = 'malformed' WHERE id = 'a'"
    ).run();
    assert.match(snapshot(db).owner_epoch, /^[0-9a-f]{32}$/);
    db.prepare("UPDATE provider_connections SET provider = 'openai' WHERE id = 'a'").run();
    assert.equal(db.prepare("SELECT count(*) n FROM codex_connection_fences").get().n, 0);
  } finally {
    db.close();
  }
});

test("the column healer gives a legacy provider_connections table every column the fence triggers read", async () => {
  const { tryOpenSync } = await import("../../../src/lib/db/adapters/driverFactory.ts");
  const { ensureProviderConnectionsColumns } = await import("../../../src/lib/db/schemaColumns.ts");
  const db = tryOpenSync(":memory:");
  assert.ok(db, "expected a synchronous sqlite adapter for :memory:");
  try {
    // A pre-001 lineage: CREATE TABLE IF NOT EXISTS never added the 001 credential columns.
    db.exec(`CREATE TABLE provider_connections (
      id TEXT PRIMARY KEY, provider TEXT NOT NULL, is_active INTEGER DEFAULT 1,
      created_at TEXT, updated_at TEXT
    );
    CREATE TABLE key_value (namespace TEXT, key TEXT, value TEXT, PRIMARY KEY(namespace, key))`);
    ensureProviderConnectionsColumns(db);
    db.exec(
      fs.readFileSync(
        new URL(
          "../../../src/lib/db/migrations/177_provider_connection_synced_models_at.sql",
          import.meta.url
        ),
        "utf8"
      )
    );
    db.exec(migration);
    db.prepare("INSERT INTO provider_connections (id, provider) VALUES ('a', 'codex')").run();
    db.prepare("INSERT INTO provider_connections (id, provider) VALUES ('b', 'openai')").run();
    assert.doesNotThrow(() =>
      db
        .prepare("UPDATE provider_connections SET access_token = 'synthetic-a' WHERE id = 'a'")
        .run()
    );
    assert.doesNotThrow(() =>
      db.prepare("UPDATE provider_connections SET is_active = 0 WHERE id = 'b'").run()
    );
    const fence = db
      .prepare("SELECT credential_revision FROM codex_connection_fences WHERE connection_id = 'a'")
      .get() as { credential_revision: number };
    assert.equal(fence.credential_revision, 1);
  } finally {
    db.close?.();
  }
});
