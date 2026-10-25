/**
 * GHSA-p42h-25v7-99v5 — restoring a JSON settings backup must not resurrect revoked, expired or
 * banned API keys, drop their restrictions, or store provider credentials in plaintext.
 *
 * The test exports through the same readers the export-json route uses (getApiKeys /
 * getProviderConnections), wipes the tables, and re-imports through runJsonMigration.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-ghsa-p42h-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.STORAGE_ENCRYPTION_KEY = "ghsa-p42h-synthetic-storage-encryption-key-0123456789";
process.env.API_KEY_SECRET = "ghsa-p42h-synthetic-api-key-secret";
process.env.OMNIROUTE_DISABLE_REDIS_AUTH_CACHE = "1";

const core = await import("../../src/lib/db/core.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const { runJsonMigration } = await import("../../src/lib/db/jsonMigration.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test.beforeEach(() => {
  apiKeysDb.clearApiKeyCaches();
});

type Row = Record<string, unknown>;

async function roundTripKeys(): Promise<Row[]> {
  const exported = (await apiKeysDb.getApiKeys()) as Row[];
  const backup = JSON.parse(JSON.stringify(exported)) as Row[];
  const db = core.getDbInstance();
  db.prepare("DELETE FROM api_keys").run();
  runJsonMigration(db, { apiKeys: backup });
  apiKeysDb.clearApiKeyCaches();
  return backup;
}

test("a revoked key stays revoked after export -> import", async () => {
  const created = await apiKeysDb.createApiKey("revoked", "machine-1");
  assert.equal(await apiKeysDb.validateApiKey(created.key), true);
  assert.equal(await apiKeysDb.revokeApiKey(created.id), true);
  assert.equal(await apiKeysDb.validateApiKey(created.key), false);

  await roundTripKeys();

  assert.equal(await apiKeysDb.validateApiKey(created.key), false);
  const restored = (await apiKeysDb.getApiKeyById(created.id)) as Row;
  assert.ok(restored.revokedAt, "revokedAt must be preserved");
});

test("an expired key stays expired after export -> import", async () => {
  const created = await apiKeysDb.createApiKey("expired", "machine-1", [], {
    expiresAt: new Date(Date.now() - 60_000).toISOString(),
  });
  assert.equal(await apiKeysDb.validateApiKey(created.key), false);

  await roundTripKeys();

  assert.equal(await apiKeysDb.validateApiKey(created.key), false);
});

test("a banned / deactivated key keeps its state, scopes and ip allowlist", async () => {
  const created = await apiKeysDb.createApiKey("banned", "machine-1", ["chat"]);
  const db = core.getDbInstance();
  db.prepare("UPDATE api_keys SET is_banned = 1, is_active = 0, ip_allowlist = ? WHERE id = ?").run(
    JSON.stringify(["10.0.0.0/8"]),
    created.id
  );
  apiKeysDb.clearApiKeyCaches();
  assert.equal(await apiKeysDb.validateApiKey(created.key), false);

  await roundTripKeys();

  assert.equal(await apiKeysDb.validateApiKey(created.key), false);
  const row = db.prepare("SELECT * FROM api_keys WHERE id = ?").get(created.id) as Row;
  assert.equal(row.is_banned, 1);
  assert.equal(row.is_active, 0);
  assert.deepEqual(JSON.parse(String(row.scopes)), ["chat"]);
  assert.ok(String(row.ip_allowlist).includes("10.0.0.0/8"), "ip_allowlist must be preserved");
});

test("a restricted key keeps connections, combos, rate limits and usage limits", async () => {
  const created = await apiKeysDb.createApiKey("restricted", "machine-1", [], {
    allowedConnections: ["conn-a"],
    allowedCombos: ["combo-a"],
  });
  const db = core.getDbInstance();
  db.prepare(
    `UPDATE api_keys SET max_requests_per_minute = 7, max_requests_per_day = 99,
       usage_limit_enabled = 1, daily_usage_limit_usd = 1.5, weekly_usage_limit_usd = 9.25,
       max_sessions = 2, throttle_delay_ms = 250, rate_limits = ?, allowed_endpoints = ?
     WHERE id = ?`
  ).run(
    JSON.stringify([{ limit: 3, window: 60 }]),
    JSON.stringify(["/v1/chat/completions"]),
    created.id
  );

  await roundTripKeys();

  const row = db.prepare("SELECT * FROM api_keys WHERE id = ?").get(created.id) as Row;
  assert.deepEqual(JSON.parse(String(row.allowed_connections)), ["conn-a"]);
  assert.deepEqual(JSON.parse(String(row.allowed_combos)), ["combo-a"]);
  assert.equal(row.max_requests_per_minute, 7);
  assert.equal(row.max_requests_per_day, 99);
  assert.equal(row.usage_limit_enabled, 1);
  assert.equal(row.daily_usage_limit_usd, 1.5);
  assert.equal(row.weekly_usage_limit_usd, 9.25);
  assert.equal(row.max_sessions, 2);
  assert.equal(row.throttle_delay_ms, 250);
  assert.deepEqual(JSON.parse(String(row.rate_limits)), [{ limit: 3, window: 60 }]);
  assert.deepEqual(JSON.parse(String(row.allowed_endpoints)), ["/v1/chat/completions"]);
  assert.equal(await apiKeysDb.validateApiKey(created.key), true, "still valid by key/hash");
});

test("an older backup without lifecycle fields still imports with safe defaults", async () => {
  const db = core.getDbInstance();
  db.prepare("DELETE FROM api_keys").run();
  runJsonMigration(db, {
    apiKeys: [{ id: "legacy-1", name: "legacy", key: "sk-legacy-synthetic", machineId: "m" }],
  });
  assert.equal(await apiKeysDb.validateApiKey("sk-legacy-synthetic"), true);
});

test("connections keep max_concurrent/group/proxy flags and are stored encrypted", async () => {
  const db = core.getDbInstance();
  db.prepare("DELETE FROM provider_connections").run();
  runJsonMigration(db, {
    providerConnections: [
      {
        id: "conn-ghsa-1",
        provider: "openai",
        authType: "oauth",
        name: "synthetic",
        accessToken: "synthetic-access-token",
        refreshToken: "synthetic-refresh-token",
        idToken: "synthetic-id-token",
        apiKey: "synthetic-api-key",
        group: "team-a",
        maxConcurrent: 3,
        proxyEnabled: false,
        perKeyProxyEnabled: true,
        quotaVisible: false,
      },
    ],
  });

  const raw = db
    .prepare("SELECT * FROM provider_connections WHERE id = ?")
    .get("conn-ghsa-1") as Row;
  for (const col of ["access_token", "refresh_token", "id_token", "api_key"]) {
    assert.ok(String(raw[col]).startsWith("enc:v1:"), `${col} must be stored encrypted`);
  }
  assert.equal(raw.group, "team-a");
  assert.equal(raw.max_concurrent, 3);
  assert.equal(raw.proxy_enabled, 0);
  assert.equal(raw.per_key_proxy_enabled, 1);
  assert.equal(raw.quota_visible, 0);

  const [conn] = (await providersDb.getProviderConnections({ provider: "openai" })) as Row[];
  assert.equal(conn.accessToken, "synthetic-access-token");
  assert.equal(conn.refreshToken, "synthetic-refresh-token");
  assert.equal(conn.idToken, "synthetic-id-token");
  assert.equal(conn.apiKey, "synthetic-api-key");
  assert.equal(conn.maxConcurrent, 3);
});
