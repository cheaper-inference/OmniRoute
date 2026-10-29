import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-opencode-free-retirement-"));
process.env.DATA_DIR = TEST_DATA_DIR;
const originalEncryptionKey = process.env.STORAGE_ENCRYPTION_KEY;
process.env.STORAGE_ENCRYPTION_KEY = "migration-207-isolated-test-key";

const core = await import("../../src/lib/db/core.ts");

test.after(() => {
  core.resetDbInstance();
  if (originalEncryptionKey === undefined) delete process.env.STORAGE_ENCRYPTION_KEY;
  else process.env.STORAGE_ENCRYPTION_KEY = originalEncryptionKey;
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("migration 207 removes stale OpenCode Free provider state, keeps opencode-zen, and is idempotent", () => {
  const db = core.getDbInstance();

  const applied = db
    .prepare("SELECT version FROM _omniroute_migrations WHERE version = 207")
    .get() as { version: number } | undefined;

  assert.ok(applied, "migration 207 must be recorded as applied");

  for (const provider of ["opencode", "oc"]) {
    db.prepare(
      "INSERT INTO provider_connections " +
        "(id, provider, auth_type, name, is_active, created_at, updated_at) " +
        "VALUES (?, ?, ?, ?, 1, datetime('now'), datetime('now'))"
    ).run(`${provider}-connection`, provider, "apikey", `${provider}-legacy`);

    db.prepare(
      "INSERT INTO registered_keys " +
        "(id, key, key_prefix, name, provider, account_id) " +
        "VALUES (?, ?, ?, ?, ?, ?)"
    ).run(
      `${provider}-key-id`,
      `${provider}-key-hash`,
      `${provider.slice(0, 8)}`,
      `${provider}-key`,
      provider,
      `${provider}-account`
    );

    db.prepare("INSERT INTO provider_key_limits (provider) VALUES (?)").run(provider);

    db.prepare(
      "INSERT INTO discovery_results " +
        "(provider_id, method, endpoint, auth_type) " +
        "VALUES (?, 'public_api', ?, 'api_key')"
    ).run(provider, `https://${provider}.example.invalid/v1`);

    db.prepare(
      "INSERT INTO key_value (namespace, key, value) " + "VALUES ('customModels', ?, '[]')"
    ).run(provider);

    for (const namespace of ["modelCompatOverrides", "providerAliases"]) {
      db.prepare("INSERT INTO key_value (namespace, key, value) VALUES (?, ?, '{}')").run(
        namespace,
        provider
      );
    }

    db.prepare(
      "INSERT INTO key_value (namespace, key, value) VALUES ('syncedAvailableModels', ?, '[]')"
    ).run(`${provider}:conn-1`);

    db.prepare(
      "INSERT INTO usage_history (provider, model, timestamp) " +
        "VALUES (?, 'legacy-model', datetime('now'))"
    ).run(provider);

    db.prepare(
      "INSERT INTO call_logs (id, timestamp, provider, model, status) " +
        "VALUES (?, datetime('now'), ?, 'legacy-model', 200)"
    ).run(`${provider}-historical-call`, provider);
  }

  db.prepare(
    "INSERT INTO provider_connections " +
      "(id, provider, auth_type, name, is_active, created_at, updated_at) " +
      "VALUES ('opencode-zen-control', 'opencode-zen', 'apikey', 'control', 1, datetime('now'), datetime('now'))"
  ).run();

  db.prepare(
    "INSERT INTO registered_keys " +
      "(id, key, key_prefix, name, provider, account_id) " +
      "VALUES ('opencode-zen-key-id', 'opencode-zen-key-hash', 'opencode-', 'control', 'opencode-zen', 'control-account')"
  ).run();

  db.prepare("INSERT INTO provider_key_limits (provider) VALUES ('opencode-zen')").run();

  db.prepare(
    "INSERT INTO discovery_results " +
      "(provider_id, method, endpoint, auth_type) " +
      "VALUES ('opencode-zen', 'public_api', 'https://opencode-zen.example.invalid/v1', 'api_key')"
  ).run();

  db.prepare(
    "INSERT INTO key_value (namespace, key, value) " +
      "VALUES ('customModels', 'opencode-zen', '[]')"
  ).run();

  db.prepare(
    "INSERT INTO key_value (namespace, key, value) " +
      "VALUES ('modelCompatOverrides', 'opencode-zen', '{}')"
  ).run();

  // A Zen key pasted into the old OpenCode Free card must survive as an
  // opencode-zen connection instead of being silently dropped.
  for (const provider of ["opencode", "oc"]) {
    db.prepare(
      "INSERT INTO provider_connections " +
        "(id, provider, auth_type, name, api_key, is_active, created_at, updated_at) " +
        "VALUES (?, ?, 'apikey', ?, ?, 1, datetime('now'), datetime('now'))"
    ).run(`${provider}-keyed`, provider, `${provider}-keyed`, `sk-zen-${provider}`);
  }

  db.prepare(
    "INSERT INTO provider_connections " +
      "(id, provider, auth_type, name, api_key, is_active, created_at, updated_at) " +
      "VALUES ('go-control', 'opencode-go', 'apikey', 'Go', 'test-go-key', 1, datetime('now'), datetime('now'))"
  ).run();

  // Preserve every credential representation accepted by the executor, plus
  // opaque provider metadata that SQL cannot safely classify as keyless.
  const credentialCases = [
    { id: "access-only", accessToken: "test-access-token" },
    { id: "encrypted-access", accessToken: "enc:v1:opaque-test-ciphertext" },
    { id: "refresh-only", refreshToken: "test-refresh-token" },
    { id: "id-token-only", idToken: "test-id-token" },
    { id: "extras-only", data: JSON.stringify({ extraApiKeys: ["test-extra-key"] }) },
    { id: "opaque-data", data: "opaque-legacy-provider-data" },
  ];
  for (const row of credentialCases) {
    db.prepare(
      "INSERT INTO provider_connections " +
        "(id, provider, auth_type, name, access_token, refresh_token, id_token, " +
        "provider_specific_data, is_active, created_at, updated_at) " +
        "VALUES (?, 'oc', 'apikey', ?, ?, ?, ?, ?, 1, datetime('now'), datetime('now'))"
    ).run(
      row.id,
      row.id,
      row.accessToken ?? null,
      row.refreshToken ?? null,
      row.idToken ?? null,
      row.data ?? null
    );
  }
  const originalCredentialRows = credentialCases.map(({ id }) =>
    db.prepare("SELECT * FROM provider_connections WHERE id = ?").get(id)
  ) as Record<string, unknown>[];

  const sql = fs.readFileSync(
    path.join(process.cwd(), "src/lib/db/migrations/207_remove_opencode_free_provider.sql"),
    "utf8"
  );

  db.exec(sql);
  db.exec(sql);
  for (const original of originalCredentialRows) {
    const migrated = db
      .prepare("SELECT * FROM provider_connections WHERE id = ?")
      .get(original.id) as Record<string, unknown> | undefined;
    assert.ok(migrated, `${original.id}: credential-bearing connection must survive`);
    assert.deepEqual(
      { ...migrated, updated_at: original.updated_at },
      { ...original, provider: "opencode-zen" },
      `${original.id}: preserve all fields except provider and update timestamp`
    );
  }
  assert.deepEqual(
    db.prepare("SELECT provider, api_key FROM provider_connections WHERE id = 'go-control'").get(),
    { provider: "opencode-go", api_key: "test-go-key" }
  );

  for (const provider of ["opencode", "oc"]) {
    assert.equal(
      db.prepare("SELECT id FROM provider_connections WHERE provider = ?").get(provider),
      undefined,
      `${provider} provider_connections rows must be deleted`
    );

    assert.equal(
      db.prepare("SELECT id FROM registered_keys WHERE provider = ?").get(provider),
      undefined,
      `${provider} registered_keys rows must be deleted`
    );

    assert.equal(
      db.prepare("SELECT provider FROM provider_key_limits WHERE provider = ?").get(provider),
      undefined,
      `${provider} provider_key_limits rows must be deleted`
    );

    assert.equal(
      db.prepare("SELECT id FROM discovery_results WHERE provider_id = ?").get(provider),
      undefined,
      `${provider} discovery_results rows must be deleted`
    );

    assert.equal(
      db
        .prepare("SELECT key FROM key_value WHERE namespace = 'customModels' AND key = ?")
        .get(provider),
      undefined,
      `${provider} custom models must be deleted`
    );

    for (const namespace of ["modelCompatOverrides", "providerAliases"]) {
      assert.equal(
        db
          .prepare("SELECT key FROM key_value WHERE namespace = ? AND key = ?")
          .get(namespace, provider),
        undefined,
        `${provider} ${namespace} rows must be deleted so they cannot leak onto opencode-zen`
      );
    }

    assert.equal(
      db
        .prepare("SELECT key FROM key_value WHERE namespace = 'syncedAvailableModels' AND key = ?")
        .get(`${provider}:conn-1`),
      undefined,
      `${provider} synced model rows must be deleted`
    );

    assert.ok(
      db.prepare("SELECT id FROM usage_history WHERE provider = ?").get(provider),
      `${provider} historical usage must be preserved`
    );

    assert.ok(
      db.prepare("SELECT id FROM call_logs WHERE provider = ?").get(provider),
      `${provider} historical call logs must be preserved`
    );
  }

  for (const provider of ["opencode", "oc"]) {
    const migrated = db
      .prepare("SELECT provider, api_key FROM provider_connections WHERE id = ?")
      .get(`${provider}-keyed`) as { provider: string; api_key: string } | undefined;
    assert.deepEqual(
      migrated,
      { provider: "opencode-zen", api_key: `sk-zen-${provider}` },
      `${provider} connection carrying a key must be moved to opencode-zen`
    );
  }

  assert.ok(
    db.prepare("SELECT id FROM provider_connections WHERE provider = 'opencode-zen'").get()
  );

  assert.ok(db.prepare("SELECT id FROM registered_keys WHERE provider = 'opencode-zen'").get());

  assert.ok(
    db.prepare("SELECT provider FROM provider_key_limits WHERE provider = 'opencode-zen'").get()
  );

  assert.ok(
    db.prepare("SELECT id FROM discovery_results WHERE provider_id = 'opencode-zen'").get()
  );

  assert.ok(
    db
      .prepare(
        "SELECT key FROM key_value WHERE namespace = 'customModels' AND key = 'opencode-zen'"
      )
      .get()
  );

  assert.ok(
    db
      .prepare(
        "SELECT key FROM key_value WHERE namespace = 'modelCompatOverrides' AND key = 'opencode-zen'"
      )
      .get()
  );
});

test("migration 207 preserves encrypted tokens and nested credentials through real provider reads", async () => {
  const { encryptConnectionFields } = await import("../../src/lib/db/encryption.ts");
  const connections = await import("../../src/lib/db/providers.ts");
  const { OpencodeExecutor } = await import("../../open-sse/executors/opencode.ts");
  const db = core.getDbInstance();
  const sql = fs.readFileSync(
    path.join(process.cwd(), "src/lib/db/migrations/207_remove_opencode_free_provider.sql"),
    "utf8"
  );
  const fixtures = ["opencode", "oc"].map((provider) => {
    const plaintext = {
      apiKey: `nested-api-${provider}`,
      accessToken: `nested-token-${provider}`,
      authCookie: `cookie-${provider}`,
      extraApiKeys: [`extra-key-${provider}`],
      workspaceId: `workspace-${provider}`,
    };
    const encrypted = encryptConnectionFields({
      accessToken: `top-token-${provider}`,
      providerSpecificData: plaintext,
    });
    assert.match(encrypted.accessToken, /^enc:v1:/);
    for (const field of ["apiKey", "accessToken", "authCookie"] as const) {
      assert.match(encrypted.providerSpecificData[field], /^enc:v1:/);
      assert.notEqual(encrypted.providerSpecificData[field], plaintext[field]);
    }
    const id = `encrypted-legacy-${provider}`;
    const tokenOnlyId = `encrypted-token-only-${provider}`;
    // Simulate stored legacy rows: current CRUD correctly rejects retired provider IDs.
    const insert = db.prepare(
      "INSERT INTO provider_connections " +
        "(id, provider, auth_type, name, access_token, provider_specific_data, is_active, created_at, updated_at) " +
        "VALUES (?, ?, 'apikey', ?, ?, ?, 1, datetime('now'), datetime('now'))"
    );
    insert.run(
      id,
      provider,
      id,
      encrypted.accessToken,
      JSON.stringify(encrypted.providerSpecificData)
    );
    insert.run(tokenOnlyId, provider, tokenOnlyId, encrypted.accessToken, null);
    const readRaw = (rowId: string) =>
      db
        .prepare(
          "SELECT id, provider, access_token, provider_specific_data FROM provider_connections WHERE id = ?"
        )
        .get(rowId) as {
        id: string;
        provider: string;
        access_token: string;
        provider_specific_data: string | null;
      };
    const before = readRaw(id);
    const tokenBefore = readRaw(tokenOnlyId);
    return { provider, plaintext, id, tokenOnlyId, readRaw, before, tokenBefore };
  });
  // A real upgrade migrates all stored rows before CRUD reads populate their cache.
  db.transaction(() => db.exec(sql))();
  for (const { provider, plaintext, id, tokenOnlyId, readRaw, before, tokenBefore } of fixtures) {
    assert.deepEqual(readRaw(id), { ...before, provider: "opencode-zen" });
    assert.deepEqual(readRaw(tokenOnlyId), { ...tokenBefore, provider: "opencode-zen" });
    const loaded = await connections.getProviderConnectionById(id);
    assert.equal(loaded?.id, id);
    assert.equal(loaded?.provider, "opencode-zen");
    assert.equal(loaded?.accessToken, `top-token-${provider}`);
    assert.deepEqual(loaded?.providerSpecificData, plaintext);
    const lazy = (await connections.getProviderConnections({ provider: "opencode-zen" })).find(
      (row) => row.id === id
    );
    assert.equal(lazy?.accessToken, `top-token-${provider}`);
    assert.deepEqual(lazy?.providerSpecificData, plaintext);
    const tokenOnly = await connections.getProviderConnectionById(tokenOnlyId);
    const headers = new OpencodeExecutor("opencode-zen").buildHeaders(
      {
        apiKey: null,
        accessToken: String(tokenOnly?.accessToken),
        connectionId: tokenOnlyId,
        providerSpecificData: {},
      },
      false,
      null,
      "gpt-5"
    );
    assert.equal(headers.Authorization, `Bearer top-token-${provider}`);
    const after = readRaw(id);
    db.transaction(() => db.exec(sql))();
    assert.deepEqual(readRaw(id), after, "repeat migration must preserve ciphertext bytes");
    assert.deepEqual(readRaw(tokenOnlyId), { ...tokenBefore, provider: "opencode-zen" });
  }
});
