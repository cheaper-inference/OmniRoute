import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import BetterSqlite from "better-sqlite3";
import { createBetterSqliteAdapter } from "../../src/lib/db/adapters/betterSqliteAdapter.ts";
import { applyMigrationSkippingExistingColumns } from "../../src/lib/db/migrationRunner/schemaState.ts";
import test from "node:test";
import { getDbInstance, resetDbInstance } from "../../src/lib/db/core.ts";
import {
  getConfirmedModelUnavailability,
  recordModelAvailabilityObservation,
} from "../../src/lib/db/modelAvailability.ts";
import {
  createProviderConnection,
  getProviderConnectionById,
  updateProviderConnection,
} from "../../src/lib/db/providers.ts";

const day = 86_400_000;
const start = 2_000_000_000_000;

test.after(() => resetDbInstance());

async function createScope() {
  const { id } = await createProviderConnection({
    provider: "openai",
    name: crypto.randomUUID(),
    authType: "apikey",
    apiKey: `test-key-${crypto.randomUUID()}`,
  });
  return {
    providerId: "openai",
    connectionId: String(id),
    connectionRevision: readRevision(String(id)),
    endpointKind: "chat_completions" as const,
    modelId: "demo-model",
  };
}

function readRevision(id: string) {
  const row = getDbInstance()
    .prepare(
      "SELECT model_availability_revision AS revision FROM provider_connections WHERE id = ?"
    )
    .get(id) as { revision: string };
  assert.ok(row.revision);
  return row.revision;
}

function failure(
  scope: Awaited<ReturnType<typeof createScope>>,
  requestId: string,
  observedAtMs: number,
  startedAtMs = observedAtMs - 1
) {
  recordModelAvailabilityObservation(scope, {
    kind: "explicit_model_not_found",
    requestId,
    startedAtMs,
    observedAtMs,
  });
}

test("persists confirmation across reopen, deduplicates and never extends the deadline", async () => {
  const scope = await createScope();
  const confirmedAtMs = start + day;
  failure(scope, "a", start);
  failure(scope, "a", start + 10);
  assert.equal(getConfirmedModelUnavailability(scope, start + 10), null);
  failure(scope, "b", confirmedAtMs);
  failure(scope, "c", confirmedAtMs + 10);
  resetDbInstance();
  assert.deepEqual(getConfirmedModelUnavailability(scope, confirmedAtMs + 10), {
    reason: "explicit_model_not_found",
    confirmedAtMs,
    expiresAtMs: confirmedAtMs + 30 * day,
  });
  assert.equal(
    getConfirmedModelUnavailability({ ...scope, endpointKind: "responses" }, confirmedAtMs + 10),
    null
  );
  assert.equal(getConfirmedModelUnavailability(scope, confirmedAtMs + 30 * day), null);
});

test("an expired first observation and failures already in flight at success do not count", async () => {
  const scope = await createScope();
  failure(scope, "a", start);
  const next = start + day + 1;
  failure(scope, "b", next);
  assert.equal(getConfirmedModelUnavailability(scope, next), null);
  recordModelAvailabilityObservation(scope, {
    kind: "accepted",
    startedAtMs: next - 1,
    observedAtMs: next + 2,
  });
  failure(scope, "late", next + 3, next);
  failure(scope, "c", next + 4);
  assert.equal(getConfirmedModelUnavailability(scope, next + 4), null);
  failure(scope, "d", next + 5);
  assert.ok(getConfirmedModelUnavailability(scope, next + 5));
  recordModelAvailabilityObservation(scope, {
    kind: "accepted",
    startedAtMs: next + 6,
    observedAtMs: next + 7,
  });
  assert.equal(getConfirmedModelUnavailability(scope, next + 7), null);
});

test("health updates keep the revision, credential and endpoint changes invalidate it", async () => {
  const scope = await createScope();
  failure(scope, "a", start);
  await updateProviderConnection(scope.connectionId, {
    testStatus: "active",
    lastError: null,
    providerSpecificData: { apiKeyHealth: { primary: { status: "active" } } },
  });
  assert.equal(readRevision(scope.connectionId), scope.connectionRevision);
  await updateProviderConnection(scope.connectionId, { apiKey: "replacement-key" });
  const connectionRevision = readRevision(scope.connectionId);
  assert.notEqual(connectionRevision, scope.connectionRevision);
  failure(scope, "old", start + 1);
  failure({ ...scope, connectionRevision }, "new", start + 2);
  assert.equal(getConfirmedModelUnavailability(scope, start + 2), null);
  assert.equal(getConfirmedModelUnavailability({ ...scope, connectionRevision }, start + 2), null);
  await updateProviderConnection(scope.connectionId, {
    providerSpecificData: { baseUrl: "https://example.invalid/v1" },
  });
  assert.notEqual(readRevision(scope.connectionId), connectionRevision);
});

test("seeding an unrelated Codex connection preserves its existing scope cooldown", async () => {
  const cooldown = { spark: new Date(Date.now() + 90_000).toISOString() };
  const { id } = await createProviderConnection({
    provider: "codex",
    authType: "oauth",
    name: crypto.randomUUID(),
    accessToken: "test-access",
    providerSpecificData: { codexScopeRateLimitedUntil: cooldown },
  });

  const connection = await getProviderConnectionById(String(id));
  assert.deepEqual(
    (connection?.providerSpecificData as Record<string, unknown>)?.codexScopeRateLimitedUntil,
    cooldown
  );
});

test("the migration gives an existing connection a revision and replays without replacing it", () => {
  const migrations = new URL("../../src/lib/db/migrations/", import.meta.url);
  const file = readdirSync(migrations).find((name) =>
    name.endsWith("_model_availability_evidence.sql")
  );
  assert.ok(file);
  const version = file.split("_")[0];
  const name = "model_availability_evidence";
  const sql = readFileSync(new URL(file, migrations), "utf8");
  const db = createBetterSqliteAdapter(new BetterSqlite(":memory:"));
  try {
    db.exec(`CREATE TABLE provider_connections (
      id TEXT PRIMARY KEY, provider TEXT, auth_type TEXT, api_key TEXT,
      access_token TEXT, refresh_token TEXT, id_token TEXT, project_id TEXT,
      default_model TEXT, provider_specific_data TEXT
    );
    CREATE TABLE _omniroute_migrations (version TEXT PRIMARY KEY, name TEXT NOT NULL);
    INSERT INTO provider_connections (id, provider, auth_type, api_key)
      VALUES ('existing', 'openai', 'apikey', 'legacy-key');`);
    db.exec(sql);
    const read = () =>
      db
        .prepare<{ revision: string }>(
          "SELECT model_availability_revision AS revision FROM provider_connections WHERE id = 'existing'"
        )
        .get()?.revision;
    const existing = read();
    assert.match(existing ?? "", /^[a-f0-9]{32}$/);
    applyMigrationSkippingExistingColumns(db, { version, name }, sql);
    assert.equal(read(), existing);
    db.exec("UPDATE provider_connections SET api_key = 'rotated' WHERE id = 'existing'");
    assert.notEqual(read(), existing);
  } finally {
    db.close();
  }
});
