/**
 * #16836: credential metadata must be encrypted in real SQLite rows while
 * provider reads and mutation responses continue to expose usable plaintext.
 */
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-secrets-16836-"));
const envSnapshot = {
  DATA_DIR: process.env.DATA_DIR,
  STORAGE_ENCRYPTION_KEY: process.env.STORAGE_ENCRYPTION_KEY,
  DISABLE_SQLITE_AUTO_BACKUP: process.env.DISABLE_SQLITE_AUTO_BACKUP,
};
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.STORAGE_ENCRYPTION_KEY = "provider-specific-secrets-db-16836-test-key";
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../src/lib/db/core.ts");
const connections = await import("../../src/lib/db/providers.ts");

function readStoredProviderMetadata(id: string): Record<string, unknown> {
  const row = core
    .getDbInstance()
    .prepare("SELECT provider_specific_data FROM provider_connections WHERE id = ?")
    .get(id) as { provider_specific_data: string | null } | undefined;
  assert.ok(row?.provider_specific_data, "connection metadata must exist on disk");
  return JSON.parse(row.provider_specific_data) as Record<string, unknown>;
}

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  for (const [key, value] of Object.entries(envSnapshot)) {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
});

test("#16836 SQLite encrypts metadata secrets without breaking reads and updates", async () => {
  const initialSecret = "console-secret-16836-db";
  const created = await connections.createProviderConnection({
    provider: "agentrouter",
    authType: "apikey",
    name: "Console Secret DB Test",
    apiKey: "sk-secret-db-test-16836",
    providerSpecificData: { consoleApiKey: initialSecret, workspaceId: "ws-16836" },
  });
  const id = typeof created?.id === "string" ? created.id : "";
  assert.ok(id, "provider connection was created");

  const stored = readStoredProviderMetadata(id);
  assert.match(String(stored.consoleApiKey), /^enc:v1:/);
  assert.ok(!JSON.stringify(stored).includes(initialSecret));
  assert.equal(stored.workspaceId, "ws-16836");

  const loaded = await connections.getProviderConnectionById(id);
  assert.equal(
    (loaded?.providerSpecificData as Record<string, unknown>).consoleApiKey,
    initialSecret
  );

  const lazy = (await connections.getProviderConnections({ provider: "agentrouter" })).find(
    (item) => item.id === id
  );
  assert.ok(lazy, "lazy connection exists");
  assert.equal((lazy.providerSpecificData as Record<string, unknown>).consoleApiKey, initialSecret);

  // A metadata-only update must not send encrypted JSON back to the dashboard.
  const updated = await connections.updateProviderConnection(id, {
    name: "Console Secret DB Test Updated",
  });
  assert.ok(updated);
  assert.equal(
    (updated.providerSpecificData as Record<string, unknown>).consoleApiKey,
    initialSecret
  );
  assert.equal(readStoredProviderMetadata(id).consoleApiKey, stored.consoleApiKey);

  // Existing databases may contain plaintext console credentials. Reading and
  // editing any other field should transparently migrate them on the next write.
  const legacySecret = "legacy-console-secret-16836-db";
  core
    .getDbInstance()
    .prepare("UPDATE provider_connections SET provider_specific_data = ? WHERE id = ?")
    .run(JSON.stringify({ consoleApiKey: legacySecret, workspaceId: "ws-16836" }), id);
  const legacyRead = await connections.getProviderConnectionById(id);
  assert.equal(
    (legacyRead?.providerSpecificData as Record<string, unknown>).consoleApiKey,
    legacySecret
  );
  const migrated = await connections.updateProviderConnection(id, { name: "Migrated DB Test" });
  assert.equal(
    (migrated?.providerSpecificData as Record<string, unknown>).consoleApiKey,
    legacySecret
  );
  const migratedOnDisk = readStoredProviderMetadata(id);
  assert.match(String(migratedOnDisk.consoleApiKey), /^enc:v1:/);
  assert.ok(!JSON.stringify(migratedOnDisk).includes(legacySecret));
  assert.equal(migratedOnDisk.workspaceId, "ws-16836");
});

test("#16836 Qwen and Volcengine cookies are encrypted through connection CRUD", async () => {
  for (const [provider, field] of [
    ["qwen-cloud-token-plan", "qwenCloudCookie"],
    ["volcengine-coding-plan", "volcConsoleCookie"],
  ] as const) {
    const secret = `console-cookie-${provider}`;
    const connection = await connections.createProviderConnection({
      provider,
      authType: "apikey",
      apiKey: `sk-16836-${provider}`,
      name: `Console cookie ${provider}`,
      providerSpecificData: {
        [field]: secret,
        workspaceId: "visible-identity",
      },
    });
    const id = typeof connection?.id === "string" ? connection.id : "";
    assert.ok(id, `${provider}: create should return a connection`);
    const stored = readStoredProviderMetadata(id);
    assert.match(String(stored[field]), /^enc:v1:/, provider);
    assert.ok(!JSON.stringify(stored).includes(secret), provider);
    assert.equal(stored.workspaceId, "visible-identity");

    const byId = await connections.getProviderConnectionById(id);
    assert.equal((byId?.providerSpecificData as Record<string, unknown>)[field], secret);
    const updated = await connections.updateProviderConnection(id, {
      name: `Updated console cookie ${provider}`,
    });
    assert.equal((updated?.providerSpecificData as Record<string, unknown>)[field], secret);
    assert.equal(readStoredProviderMetadata(id)[field], stored[field]);

    const lazy = (await connections.getProviderConnections({ provider })).find(
      (item) => item.id === id
    );
    assert.ok(lazy);
    assert.equal((lazy.providerSpecificData as Record<string, unknown>)[field], secret);
  }
});

test("#16836 cookie-session dedup compares plaintext despite encrypted metadata", async () => {
  for (const [provider, field] of [
    ["qwen-cloud-token-plan", "qwenCloudCookie"],
    ["volcengine-coding-plan", "volcConsoleCookie"],
  ] as const) {
    const sameCookie = `same-session-${provider}-16836`;
    const first = await connections.createProviderConnection({
      provider,
      authType: "cookie",
      name: `First label for ${provider}`,
      providerSpecificData: { [field]: sameCookie },
    });
    assert.ok(first?.id, `${provider}: initial connection must be created`);
    assert.match(String(readStoredProviderMetadata(String(first.id))[field]), /^enc:v1:/);

    // AES-GCM uses a different nonce per encryption, so comparing the newly
    // imported plaintext with a stored ciphertext always misses the same user.
    const same = await connections.createProviderConnection({
      provider,
      authType: "cookie",
      name: `Different label for ${provider}`,
      providerSpecificData: { [field]: sameCookie },
    });
    assert.equal(same?.id, first.id, `${provider}: identical cookie must reuse the row`);

    const distinct = await connections.createProviderConnection({
      provider,
      authType: "cookie",
      name: `First label for ${provider}`,
      providerSpecificData: { [field]: `different-session-${provider}-16836` },
    });
    assert.ok(distinct?.id);
    assert.notEqual(distinct?.id, first.id, `${provider}: distinct sessions must not merge`);
  }
});

test("#16836 Ollama Cloud quota cookies survive encrypted SQLite CRUD", async () => {
  const secrets = {
    ollamaUsageCookie: "legacy-ollama-cookie-16836",
    ollamaCloudUsageCookie: "primary-ollama-cookie-16836",
    ollamaCloudCookie: "cloud-ollama-cookie-16836",
    usageCookie: "alternate-ollama-cookie-16836",
  };
  const created = await connections.createProviderConnection({
    provider: "ollama-cloud",
    authType: "apikey",
    apiKey: "sk-ollama-16836",
    name: "Ollama quota cookie",
    providerSpecificData: { ...secrets, workspaceId: "visible-workspace" },
  });
  const id = String(created?.id || "");
  assert.ok(id);
  const stored = readStoredProviderMetadata(id);
  for (const [field, plaintext] of Object.entries(secrets)) {
    assert.match(String(stored[field]), /^enc:v1:/, field);
    assert.ok(!JSON.stringify(stored).includes(plaintext), field);
  }
  assert.equal(stored.workspaceId, "visible-workspace");

  const loaded = await connections.getProviderConnectionById(id);
  for (const [field, plaintext] of Object.entries(secrets)) {
    assert.equal((loaded?.providerSpecificData as Record<string, unknown>)[field], plaintext);
  }
  const updated = await connections.updateProviderConnection(id, {
    name: "Ollama quota cookie updated",
  });
  for (const [field, plaintext] of Object.entries(secrets)) {
    assert.equal((updated?.providerSpecificData as Record<string, unknown>)[field], plaintext);
    assert.equal(readStoredProviderMetadata(id)[field], stored[field]);
  }
  const lazy = (await connections.getProviderConnections({ provider: "ollama-cloud" })).find(
    (item) => item.id === id
  );
  assert.ok(lazy);
  for (const [field, plaintext] of Object.entries(secrets)) {
    assert.equal((lazy.providerSpecificData as Record<string, unknown>)[field], plaintext);
  }
});

test("#16836 nested access/session credentials remain opaque on disk", async () => {
  const secrets = {
    accessToken: "secret-accessToken-16836",
    refreshToken: "secret-refreshToken-16836",
    idToken: "secret-idToken-16836",
    apiKey: "secret-apiKey-16836",
    secretAccessKey: "secret-secretAccessKey-16836",
    awsSecretAccessKey: "secret-awsSecretAccessKey-16836",
    sessionToken: "secret-sessionToken-16836",
    awsSessionToken: "secret-awsSessionToken-16836",
    openCodeGoAuthCookie: "secret-openCodeGoAuthCookie-16836",
    opencodeGoAuthCookie: "secret-opencodeGoAuthCookie-16836",
    authCookie: "secret-authCookie-16836",
  };
  const connection = await connections.createProviderConnection({
    provider: "agentrouter",
    authType: "apikey",
    apiKey: "sk-nested-credentials-16836",
    name: "Nested credential metadata",
    providerSpecificData: {
      ...secrets,
      workspaceId: "visible-workspace-16836",
      chatgptUserId: "visible-user-16836",
    },
  });
  const id = String(connection?.id || "");
  assert.ok(id);

  const stored = readStoredProviderMetadata(id);
  for (const [field, plaintext] of Object.entries(secrets)) {
    assert.match(String(stored[field]), /^enc:v1:/, field);
    assert.ok(!JSON.stringify(stored).includes(plaintext), field);
  }
  assert.equal(stored.workspaceId, "visible-workspace-16836");
  assert.equal(stored.chatgptUserId, "visible-user-16836");

  const loaded = await connections.getProviderConnectionById(id);
  const updated = await connections.updateProviderConnection(id, { name: "Renamed nested secrets" });
  const lazy = (await connections.getProviderConnections({ provider: "agentrouter" })).find(
    (entry) => entry.id === id
  );
  assert.ok(lazy);
  for (const [field, plaintext] of Object.entries(secrets)) {
    assert.equal((loaded?.providerSpecificData as Record<string, unknown>)[field], plaintext);
    assert.equal((updated?.providerSpecificData as Record<string, unknown>)[field], plaintext);
    assert.equal((lazy.providerSpecificData as Record<string, unknown>)[field], plaintext);
    assert.equal(readStoredProviderMetadata(id)[field], stored[field]);
  }
});

test("#16836 imported authCookie sessions still deduplicate after encryption", async () => {
  const cookie = "hyperagent-auth-cookie-16836";
  const first = await connections.createProviderConnection({
    provider: "hyperagent",
    authType: "cookie",
    name: "Original HyperAgent session",
    providerSpecificData: { authCookie: cookie },
  });
  const firstId = String(first?.id || "");
  assert.ok(firstId);
  assert.match(String(readStoredProviderMetadata(firstId).authCookie), /^enc:v1:/);

  const same = await connections.createProviderConnection({
    provider: "hyperagent",
    authType: "cookie",
    name: "Renamed imported HyperAgent session",
    providerSpecificData: { authCookie: cookie },
  });
  assert.equal(same?.id, firstId, "same cookie must reuse the existing connection");

  const second = await connections.createProviderConnection({
    provider: "hyperagent",
    authType: "cookie",
    name: "Different HyperAgent session",
    providerSpecificData: { authCookie: "different-hyperagent-auth-cookie-16836" },
  });
  assert.ok(second?.id);
  assert.notEqual(second?.id, firstId, "different sessions must stay isolated");
});

test("#16836 does not conflate different cookie sessions with the same base URL", async () => {
  for (const [provider, field] of [
    ["qwen-cloud-token-plan", "qwenCloudCookie"],
    ["volcengine-coding-plan", "volcConsoleCookie"],
  ] as const) {
    const baseUrl = "https://shared-console.example.test";
    const makeSession = (cookie: string, name: string) =>
      connections.createProviderConnection({
        provider,
        authType: "cookie",
        name,
        providerSpecificData: { baseUrl, [field]: cookie },
      });

    const first = await makeSession("account-one-cookie", "Account one");
    const second = await makeSession("account-two-cookie", "Account two");
    assert.ok(first?.id && second?.id, provider);
    assert.notEqual(first.id, second.id, `${provider}: distinct cookies must never merge`);

    const storedFirst = readStoredProviderMetadata(String(first.id));
    const storedSecond = readStoredProviderMetadata(String(second.id));
    assert.match(String(storedFirst[field]), /^enc:v1:/);
    assert.match(String(storedSecond[field]), /^enc:v1:/);
    assert.equal(storedFirst.baseUrl, baseUrl);
    assert.equal(storedSecond.baseUrl, baseUrl);

    const repeated = await makeSession("account-two-cookie", "Renamed second account");
    assert.equal(repeated?.id, second.id, `${provider}: matching cookie should reuse its row`);
  }
});
