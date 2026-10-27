/**
 * Settings JSON import must restore API keys and provider connections without
 * losing state: a restore of an export from the same instance is lossless, it
 * never re-activates a revoked / banned / expired / inactive key, and connection
 * credentials go through the same at-rest encryption normal writes use.
 */
import test from "node:test";
import assert from "node:assert/strict";

// Synthetic key — must be set before the encryption module derives its key.
process.env.STORAGE_ENCRYPTION_KEY = "synthetic-test-storage-key-json-import-roundtrip-0001";
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "synthetic-json-import-roundtrip-secret";

const core = await import("../../src/lib/db/core.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const { runJsonMigration } = await import("../../src/lib/db/jsonMigration.ts");
const exportRoute = await import("../../src/app/api/settings/export-json/route.ts");

type Row = Record<string, unknown>;

const SYNTHETIC_ACCESS = "synthetic-access-token-not-a-real-credential";
const SYNTHETIC_REFRESH = "synthetic-refresh-token-not-a-real-credential";

function resetTables() {
  const db = core.getDbInstance();
  db.prepare("DELETE FROM api_keys").run();
  db.prepare("DELETE FROM provider_connections").run();
  apiKeysDb.clearApiKeyCaches();
}

async function exportBackup(): Promise<Record<string, unknown>> {
  const response = await exportRoute.GET(new Request("http://localhost/api/settings/export-json"));
  assert.equal(response.status, 200);
  return JSON.parse(await response.text());
}

function keyRow(id: string): Row {
  const row = core.getDbInstance().prepare("SELECT * FROM api_keys WHERE id = ?").get(id) as
    Row | undefined;
  assert.ok(row, `api key ${id} must exist`);
  return row;
}

function connRow(id: string): Row {
  const row = core
    .getDbInstance()
    .prepare("SELECT * FROM provider_connections WHERE id = ?")
    .get(id) as Row | undefined;
  assert.ok(row, `connection ${id} must exist`);
  return row;
}

async function seedInstance() {
  const conn = (await providersDb.createProviderConnection({
    provider: "claude",
    authType: "oauth",
    name: "pool account",
    email: "synthetic-roundtrip@example.test",
    accessToken: SYNTHETIC_ACCESS,
    refreshToken: SYNTHETIC_REFRESH,
    maxConcurrent: 2,
    group: "pool-a",
    proxyEnabled: false,
  })) as Row;
  const connId = String(conn.id);

  const keyA = await apiKeysDb.createApiKey("key-a", "machine-a", [], {
    allowedConnections: [connId],
  });
  await apiKeysDb.updateApiKeyPermissions(keyA.id, {
    maxRequestsPerMinute: 7,
    usageLimitEnabled: true,
    weeklyUsageLimitUsd: 3.5,
  });
  assert.equal(await apiKeysDb.revokeApiKey(keyA.id), true);

  const keyB = await apiKeysDb.createApiKey("key-b", "machine-b", [], {
    expiresAt: "2020-01-01T00:00:00.000Z",
  });

  const keyC = await apiKeysDb.createApiKey("key-c", "machine-c", ["read:usage"]);
  await apiKeysDb.updateApiKeyPermissions(keyC.id, { isBanned: true });

  apiKeysDb.clearApiKeyCaches();
  return { connId, keyA, keyB, keyC };
}

test.beforeEach(() => resetTables());

test.after(() => {
  try {
    resetTables();
  } finally {
    core.resetDbInstance();
  }
});

test("export -> import round-trips API key lifecycle and restrictions losslessly", async () => {
  const { connId, keyA, keyB, keyC } = await seedInstance();
  const before = await apiKeysDb.getApiKeys();

  const backup = await exportBackup();
  runJsonMigration(core.getDbInstance(), backup);
  apiKeysDb.clearApiKeyCaches();

  assert.equal(await apiKeysDb.validateApiKey(keyA.key), false, "revoked key must stay invalid");
  assert.equal(await apiKeysDb.validateApiKey(keyB.key), false, "expired key must stay invalid");
  assert.equal(await apiKeysDb.validateApiKey(keyC.key), false, "banned key must stay invalid");

  const a = keyRow(keyA.id);
  assert.ok(a.revoked_at, "revoked_at must survive the restore");
  assert.equal(a.is_active, 0);
  assert.deepEqual(JSON.parse(String(a.allowed_connections)), [connId]);
  assert.equal(a.max_requests_per_minute, 7);
  assert.equal(a.usage_limit_enabled, 1);
  assert.equal(a.weekly_usage_limit_usd, 3.5);

  assert.equal(keyRow(keyB.id).expires_at, "2020-01-01T00:00:00.000Z");

  const c = keyRow(keyC.id);
  assert.equal(c.is_banned, 1);
  assert.deepEqual(JSON.parse(String(c.scopes)), ["read:usage"]);

  // Every persisted key field round-trips unchanged (compared through the same
  // normalized view the export is built from).
  assert.deepEqual(await apiKeysDb.getApiKeys(), before);
});

test("export -> import preserves connection columns and keeps credentials encrypted", async () => {
  const { connId } = await seedInstance();
  const backup = await exportBackup();
  const exportedConn = (backup.providerConnections as Row[]).find((c) => c.id === connId);
  assert.ok(exportedConn, "connection must be exported");

  // Simulate restoring into a fresh instance (no existing row).
  core.getDbInstance().prepare("DELETE FROM provider_connections").run();
  runJsonMigration(core.getDbInstance(), backup);

  const row = connRow(connId);
  assert.equal(row.max_concurrent, 2);
  assert.equal(row.group, "pool-a");
  assert.equal(row.proxy_enabled, 0);
  assert.match(String(row.access_token), /^enc:v1:/, "access token must be stored encrypted");
  assert.match(String(row.refresh_token), /^enc:v1:/, "refresh token must be stored encrypted");

  const restored = (await providersDb.getProviderConnectionById(connId)) as Row;
  assert.equal(restored.accessToken, SYNTHETIC_ACCESS);
  assert.equal(restored.refreshToken, SYNTHETIC_REFRESH);
});

test("restoring an older backup never re-activates a key revoked or banned since", async () => {
  const keyA = await apiKeysDb.createApiKey("key-a", "machine-a", []);
  const keyC = await apiKeysDb.createApiKey("key-c", "machine-c", ["read:usage"]);
  const keyD = await apiKeysDb.createApiKey("key-d", "machine-d", []);
  const olderBackup = await exportBackup(); // all three keys active here

  await apiKeysDb.revokeApiKey(keyA.id);
  await apiKeysDb.updateApiKeyPermissions(keyC.id, { isBanned: true });
  await apiKeysDb.setApiKeyExpiry(keyD.id, "2021-06-01T00:00:00.000Z");
  apiKeysDb.clearApiKeyCaches();

  runJsonMigration(core.getDbInstance(), olderBackup);
  apiKeysDb.clearApiKeyCaches();

  assert.equal(await apiKeysDb.validateApiKey(keyA.key), false, "revoked key re-activated");
  assert.equal(await apiKeysDb.validateApiKey(keyC.key), false, "banned key re-activated");
  assert.equal(await apiKeysDb.validateApiKey(keyD.key), false, "expired key re-activated");
  assert.ok(keyRow(keyA.id).revoked_at);
  assert.equal(keyRow(keyA.id).is_active, 0);
  assert.equal(keyRow(keyC.id).is_banned, 1);
  assert.equal(keyRow(keyD.id).expires_at, "2021-06-01T00:00:00.000Z");
});

test("a legacy backup missing newer fields does not reset existing key restrictions", async () => {
  const key = await apiKeysDb.createApiKey("key-legacy", "machine-l", ["read:usage"], {
    allowedConnections: ["conn-x"],
  });
  await apiKeysDb.updateApiKeyPermissions(key.id, { maxRequestsPerMinute: 3 });

  runJsonMigration(core.getDbInstance(), {
    apiKeys: [
      {
        id: key.id,
        name: "key-legacy-renamed",
        key: key.key,
        machineId: "machine-l",
        allowedModels: [],
        noLog: false,
        createdAt: "2024-01-01T00:00:00.000Z",
      },
    ],
  });

  const row = keyRow(key.id);
  assert.equal(row.name, "key-legacy-renamed");
  assert.deepEqual(JSON.parse(String(row.allowed_connections)), ["conn-x"]);
  assert.deepEqual(JSON.parse(String(row.scopes)), ["read:usage"]);
  assert.equal(row.max_requests_per_minute, 3);
});

test("a legacy backup still imports new keys and connections", async () => {
  runJsonMigration(core.getDbInstance(), {
    providerConnections: [{ id: "legacy-conn", provider: "openai", apiKey: "sk-synthetic-x" }],
    apiKeys: [
      {
        id: "legacy-key",
        name: "legacy",
        key: "sk-synthetic-legacy-key",
        allowedModels: ["openai/gpt-4o"],
      },
    ],
  });
  apiKeysDb.clearApiKeyCaches();

  const conn = connRow("legacy-conn");
  assert.equal(conn.auth_type, "oauth");
  assert.match(String(conn.api_key), /^enc:v1:/);

  const key = keyRow("legacy-key");
  assert.equal(key.model_access_mode, "restricted");
  assert.deepEqual(JSON.parse(String(key.allowed_models)), ["openai/gpt-4o"]);
  assert.equal(key.is_active, 1);
  assert.equal(await apiKeysDb.validateApiKey("sk-synthetic-legacy-key"), true);
});

test("import into a database that lacks lazily-added key columns still keeps a ban", async () => {
  // Simulate a fresh database where the api-keys module has not yet added its
  // fallback columns (they are created lazily on first use).
  core.getDbInstance().exec("ALTER TABLE api_keys DROP COLUMN is_banned");

  runJsonMigration(core.getDbInstance(), {
    apiKeys: [
      {
        id: "fresh-banned-key",
        name: "fresh banned",
        key: "sk-synthetic-fresh-banned-key",
        isBanned: true,
      },
    ],
  });
  apiKeysDb.clearApiKeyCaches();

  assert.equal(keyRow("fresh-banned-key").is_banned, 1);
  assert.equal(await apiKeysDb.validateApiKey("sk-synthetic-fresh-banned-key"), false);
});

test("restoring an older backup never brings back a rotated key secret", async () => {
  const key = await apiKeysDb.createApiKey("key-rotated", "machine-r", []);
  const olderBackup = await exportBackup();

  const rotated = await apiKeysDb.regenerateApiKey(key.id);
  assert.ok(rotated);
  apiKeysDb.clearApiKeyCaches();

  runJsonMigration(core.getDbInstance(), olderBackup);
  apiKeysDb.clearApiKeyCaches();

  assert.equal(await apiKeysDb.validateApiKey(key.key), false, "rotated-away secret is valid");
  assert.equal(await apiKeysDb.validateApiKey(rotated.key), true, "current secret must work");
});

test("a legacy connection backup keeps newer connection columns on an existing row", async () => {
  const { connId } = await seedInstance();

  runJsonMigration(core.getDbInstance(), {
    providerConnections: [{ id: connId, provider: "claude", accessToken: SYNTHETIC_ACCESS }],
  });

  const row = connRow(connId);
  assert.equal(row.max_concurrent, 2);
  assert.equal(row.group, "pool-a");
  assert.equal(row.proxy_enabled, 0);
  assert.match(String(row.access_token), /^enc:v1:/);
  assert.match(String(row.refresh_token), /^enc:v1:/);
});
