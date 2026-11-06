import { after, beforeEach, test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { MockAgent, getGlobalDispatcher, setGlobalDispatcher } from "undici";
import { makeManagementSessionRequest } from "../../helpers/managementSession.ts";

const fixtureRoot = path.resolve("_artifacts/new-connection-proxy-default");
fs.mkdirSync(fixtureRoot, { recursive: true });
const dataDir = fs.mkdtempSync(path.join(fixtureRoot, "db-"));
const originalEnv = { ...process.env };
const originalFetch = globalThis.fetch;
const originalDispatcher = getGlobalDispatcher();
const network = new MockAgent();
network.disableNetConnect();
setGlobalDispatcher(network);
process.env.DATA_DIR = dataDir;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
process.env.APP_LOG_TO_FILE = "false";
process.env.API_KEY_SECRET = "new-proxy-default-test-secret";
process.env.JWT_SECRET = "new-proxy-default-session-secret";
process.env.STORAGE_ENCRYPTION_KEY = "new-proxy-default-storage-secret";
process.env.OMNIROUTE_DISABLE_REDIS_AUTH_CACHE = "1";
process.env.OMNIROUTE_DISABLE_BACKGROUND_SERVICES = "true";
process.env.PROXY_AUTO_SELECT_ENABLED = "true";
delete process.env.INITIAL_PASSWORD;
delete process.env.REDIS_URL;
// A fallback-only fixture must not inherit the executor's outbound proxy.
for (const key of [
  "HTTP_PROXY",
  "HTTPS_PROXY",
  "ALL_PROXY",
  "NO_PROXY",
  "http_proxy",
  "https_proxy",
  "all_proxy",
  "no_proxy",
])
  delete process.env[key];
globalThis.fetch = async () => {
  throw new Error("External requests are forbidden in this fixture");
};

const paths = await import("../../../src/lib/dataPaths.ts");
assert.equal(paths.resolveDataDir(), dataDir);
const core = await import("../../../src/lib/db/core.ts");
const settings = await import("../../../src/lib/db/settings.ts");
const providers = await import("../../../src/lib/db/providers.ts");
const settingsRoute = await import("../../../src/app/api/settings/route.ts");
const { updateSettingsSchema } = await import("../../../src/shared/validation/settingsSchemas.ts");
const { createProviderSchema, updateProviderConnectionSchema } =
  await import("../../../src/shared/validation/schemas/provider.ts");
const cli = await import("../../../bin/cli/provider-store.mjs");
const { readNewConnectionProxyDefault } =
  await import("../../../src/lib/db/newConnectionProxy.mjs");
const { runJsonMigration } = await import("../../../src/lib/db/jsonMigration.ts");
const transfer = await import("../../../src/lib/transfer/providerTransfer.ts");
const { sealJson } = await import("../../../src/lib/transfer/sealedPayload.ts");
const bulkRoute = await import("../../../src/app/api/providers/bulk/route.ts");
const { createAccessToken } = await import("../../../src/lib/db/accessTokens.ts");
const transferImportRoute = await import("../../../src/app/api/settings/transfer/import/route.ts");
const backupExportRoute = await import("../../../src/app/api/db-backups/export/route.ts");
const backupImportRoute = await import("../../../src/app/api/db-backups/import/route.ts");
const proxyRegistry = await import("../../../src/lib/db/proxies.ts");
const proxyFallback = await import("../../../open-sse/utils/proxyFallback.ts");
const { getAuditLog } = await import("../../../src/lib/compliance/index.ts");

beforeEach(async () => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
  fs.mkdirSync(dataDir, { recursive: true });
  await settings.setProxyConfig({ global: null, providers: {}, combos: {}, keys: {} });
  proxyFallback.clearProxyFallbackCache();
});

after(async () => {
  core.resetDbInstance();
  await network.close();
  setGlobalDispatcher(originalDispatcher);
  globalThis.fetch = originalFetch;
  fs.rmSync(dataDir, { recursive: true, force: true });
  for (const key of Object.keys(process.env)) {
    if (!(key in originalEnv)) delete process.env[key];
  }
  Object.assign(process.env, originalEnv);
});

async function create(overrides: Record<string, unknown> = {}) {
  const connection = await providers.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "synthetic",
    apiKey: "sk-synthetic-only",
    ...overrides,
  });
  assert.ok(connection);
  return connection;
}

function stored(id: unknown) {
  return core
    .getDbInstance()
    .prepare("SELECT proxy_enabled FROM provider_connections WHERE id = ?")
    .get(id) as { proxy_enabled: number };
}

function rawPolicy(value: string) {
  core
    .getDbInstance()
    .prepare(
      "INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES ('settings', 'defaultNewConnectionProxyEnabled', ?)"
    )
    .run(value);
}

async function patch(body: Record<string, unknown>, headers?: HeadersInit) {
  return settingsRoute.PATCH(
    await makeManagementSessionRequest("http://localhost/api/settings", {
      method: "PATCH",
      body,
      headers,
    })
  );
}

test("absent preference preserves ON in settings, returned connection and SQLite", async () => {
  assert.equal((await settings.getSettings()).defaultNewConnectionProxyEnabled, true);
  const row = await create();
  assert.equal(row.proxyEnabled, true);
  assert.equal(stored(row.id).proxy_enabled, 1);
});

for (const saved of [false, true]) {
  for (const explicit of [undefined, false, true]) {
    test(`new row: default=${saved}, explicit=${explicit}`, async () => {
      await settings.updateSettings({ defaultNewConnectionProxyEnabled: saved });
      const row = await create({ proxyEnabled: explicit });
      const expected = explicit ?? saved;
      assert.equal(row.proxyEnabled, expected);
      assert.equal(stored(row.id).proxy_enabled, expected ? 1 : 0);
      assert.equal(
        (await providers.getProviderConnectionById(String(row.id)))?.proxyEnabled,
        expected
      );
    });
  }
}

for (const authType of ["oauth", "cookie", "access_token", "apikey"]) {
  test(`shared persistence applies OFF to ${authType} and compatible providers`, async () => {
    rawPolicy("false");
    const row = await create({
      provider: "openai-compatible-synthetic",
      authType,
      email: "synthetic@example.test",
    });
    assert.equal(row.proxyEnabled, false);
    assert.equal(stored(row.id).proxy_enabled, 0);
  });
}

for (const enabled of [false, true]) {
  for (const authType of ["apikey", "oauth"]) {
    test(`dedup/reconnect ${authType} preserves ${enabled} despite changed or invalid preference`, async () => {
      const identity = { authType, email: "reconnect@example.test", proxyEnabled: enabled };
      const first = await create(identity);
      rawPolicy(JSON.stringify(!enabled));
      const duplicate = await create({ authType, email: identity.email });
      assert.equal(duplicate.id, first.id);
      assert.equal(duplicate.proxyEnabled, enabled);
      rawPolicy('"malformed-policy"');
      const reconnect = await create({ authType, email: identity.email, proxyEnabled: undefined });
      assert.equal(reconnect.id, first.id);
      assert.equal(stored(first.id).proxy_enabled, enabled ? 1 : 0);
      await providers.updateProviderConnection(String(first.id), {
        name: "renamed",
        priority: 3,
        isActive: false,
        accessToken: "synthetic-refreshed",
      });
      assert.equal(stored(first.id).proxy_enabled, enabled ? 1 : 0);
      await providers.updateProviderConnection(String(first.id), { proxyEnabled: !enabled });
      assert.equal(stored(first.id).proxy_enabled, enabled ? 0 : 1);
    });
  }
}

test("PATCH -> GET -> create -> PATCH -> create, revision conflicts and reopen", async () => {
  const get = () => settingsRoute.GET(new Request("http://localhost/api/settings"));
  const initial = await (await get()).json();
  const off = await patch({
    defaultNewConnectionProxyEnabled: false,
    expectedRevision: initial.settingsRevision,
  });
  assert.equal(off.status, 200);
  assert.equal((await off.json()).defaultNewConnectionProxyEnabled, false);
  assert.equal((await (await get()).json()).defaultNewConnectionProxyEnabled, false);
  assert.equal(
    core
      .getDbInstance()
      .prepare("SELECT value FROM key_value WHERE key = 'defaultNewConnectionProxyEnabled'")
      .get()?.value,
    "false"
  );
  const a = await create();
  assert.equal(a.proxyEnabled, false);
  const stale = await patch({
    defaultNewConnectionProxyEnabled: true,
    expectedRevision: initial.settingsRevision,
  });
  assert.equal(stale.status, 409);
  assert.equal((await settings.getSettings()).defaultNewConnectionProxyEnabled, false);
  assert.equal((await patch({ theme: "dark" })).status, 200);
  assert.equal((await settings.getSettings()).defaultNewConnectionProxyEnabled, false);
  core.resetDbInstance();
  const reopened = await create({ name: "after-reopen", apiKey: "sk-after-reopen" });
  assert.equal(reopened.proxyEnabled, false);
  const revision = await settings.getSettingsRevision();
  assert.equal(
    (await patch({ defaultNewConnectionProxyEnabled: true }, { "If-Match": String(revision) }))
      .status,
    200
  );
  const b = await create({ name: "second", apiKey: "sk-second-synthetic" });
  assert.equal(b.proxyEnabled, true);
  assert.equal(stored(a.id).proxy_enabled, 0);
  assert.equal(stored(reopened.id).proxy_enabled, 0);
});

for (const invalid of [null, "false", 0, 1, [], {}]) {
  test(`HTTP contracts reject invalid boolean ${JSON.stringify(invalid)}`, async () => {
    assert.equal(
      updateSettingsSchema.safeParse({ defaultNewConnectionProxyEnabled: invalid }).success,
      false
    );
    const response = await patch({ defaultNewConnectionProxyEnabled: invalid });
    assert.equal(response.status, 400);
    assert.equal(
      createProviderSchema.safeParse({
        provider: "openai",
        name: "test",
        apiKey: "sk-test",
        proxyEnabled: invalid,
      }).success,
      false
    );
    assert.equal(
      updateProviderConnectionSchema.safeParse({ proxyEnabled: invalid }).success,
      false
    );
  });
}

for (const invalid of ["null", '"false"', "0", "[]", "{}", "not-json"]) {
  test(`invalid persisted policy ${invalid} fails without a partial row; explicit choice stays independent`, async () => {
    rawPolicy(invalid);
    await assert.rejects(create(), /new.connection proxy default/i);
    assert.equal(
      core.getDbInstance().prepare("SELECT count(*) AS n FROM provider_connections").get()?.n,
      0
    );
    const explicit = await create({ proxyEnabled: false });
    assert.equal(explicit.proxyEnabled, false);
  });
}

test("policy reader treats every driver's no-row result as missing and still rejects bad rows", () => {
  const dbReturning = (row: unknown) => ({ prepare: () => ({ get: () => row }) });
  // better-sqlite3 reports no row as undefined; the CLI's bun:sqlite wrapper reports it as null.
  assert.equal(readNewConnectionProxyDefault(dbReturning(undefined)), true);
  assert.equal(readNewConnectionProxyDefault(dbReturning(null)), true);
  assert.equal(readNewConnectionProxyDefault(dbReturning({ value: "false" })), false);
  for (const malformed of [{}, { value: 0 }, { value: null }, "false", 0, false]) {
    assert.throws(
      () => readNewConnectionProxyDefault(dbReturning(malformed)),
      /new.connection proxy default/i
    );
  }
});

test("database policy read failure fails closed before implicit insertion", async () => {
  core.getDbInstance().exec("DROP TABLE key_value");
  await assert.rejects(create(), /new.connection proxy default/i);
  assert.equal(
    core.getDbInstance().prepare("SELECT count(*) AS n FROM provider_connections").get()?.n,
    0
  );
});

test("CLI writer uses destination default and preserves existing connection state", () => {
  const db = core.getDbInstance();
  rawPolicy("false");
  const row = cli.upsertApiKeyProviderConnection(db, {
    provider: "openai",
    name: "CLI synthetic",
    apiKey: "sk-cli-synthetic",
  });
  assert.equal(stored(row.id).proxy_enabled, 0);
  rawPolicy("true");
  cli.upsertApiKeyProviderConnection(db, {
    provider: "openai",
    name: "CLI synthetic",
    apiKey: "sk-cli-new",
  });
  assert.equal(stored(row.id).proxy_enabled, 0);
});

test("Settings-to-bulk HTTP handlers persist OFF then ON without changing the first account", async () => {
  await settings.updateSettings({ requireLogin: true, setupComplete: true });
  const add = async (name: string) => {
    const response = await bulkRoute.POST(
      await makeManagementSessionRequest("http://localhost/api/providers/bulk", {
        method: "POST",
        body: {
          provider: "openai",
          entries: [{ name, apiKey: `sk-synthetic-${name}` }],
          validateKeys: false,
        },
      })
    );
    assert.equal(response.status, 200);
    const body = await response.json();
    assert.equal(body.success, 1);
    assert.equal(body.failed, 0);
    return body.created[0] as Record<string, unknown>;
  };
  assert.equal((await patch({ defaultNewConnectionProxyEnabled: false })).status, 200);
  const a = await add("first");
  assert.equal(a.proxyEnabled, false);
  assert.equal((await patch({ defaultNewConnectionProxyEnabled: true })).status, 200);
  const b = await add("second");
  assert.equal(b.proxyEnabled, true);
  assert.equal(stored(a.id).proxy_enabled, 0);
  assert.equal(stored(b.id).proxy_enabled, 1);
});

test("unauthenticated and insufficient-scope settings writes cannot change the preference", async () => {
  await settings.updateSettings({
    requireLogin: true,
    setupComplete: true,
    defaultNewConnectionProxyEnabled: false,
  });
  const writeToken = createAccessToken({ name: "synthetic-write-only", scope: "write" });
  for (const headers of [{}, { authorization: `Bearer ${writeToken.token}` }]) {
    const response = await settingsRoute.PATCH(
      new Request("http://localhost/api/settings", {
        method: "PATCH",
        headers: { "content-type": "application/json", ...headers },
        body: JSON.stringify({ defaultNewConnectionProxyEnabled: true }),
      })
    );
    assert.ok([401, 403].includes(response.status));
    assert.equal((await settings.getSettings()).defaultNewConnectionProxyEnabled, false);
  }
});

test("failed settings persistence keeps the committed preference and existing rows", async () => {
  rawPolicy("false");
  const existing = await create();
  const db = core.getDbInstance();
  db.exec(
    "CREATE TRIGGER fail_creation_policy BEFORE INSERT ON key_value WHEN NEW.key = 'defaultNewConnectionProxyEnabled' BEGIN SELECT RAISE(ABORT, 'Synthetic storage failure'); END"
  );
  const response = await patch({ defaultNewConnectionProxyEnabled: true });
  assert.equal(response.status, 500);
  assert.equal((await settings.getSettings()).defaultNewConnectionProxyEnabled, false);
  assert.equal(stored(existing.id).proxy_enabled, 0);
});

test("new OFF bypasses assigned proxy sources; manual ON restores selection; global OFF stays independent", async () => {
  await settings.updateSettings({
    defaultNewConnectionProxyEnabled: false,
    proxyEnabled: true,
  });
  const proxy = { type: "http", host: "127.0.0.1", port: 19999 };
  await settings.setProxyForLevel("global", null, proxy);
  await settings.setProxyForLevel("provider", "openai", proxy);
  const off = await create();
  await settings.setProxyForLevel("key", String(off.id), proxy);
  assert.equal((await settings.resolveProxyForConnection(String(off.id))).level, "direct");
  await providers.updateProviderConnection(String(off.id), { proxyEnabled: true });
  const enabled = await settings.resolveProxyForConnection(String(off.id));
  assert.notEqual(enabled.proxy, null);
  const beforeAssignments = await settings.getProxyConfig();
  await settings.updateSettings({ defaultNewConnectionProxyEnabled: true, proxyEnabled: false });
  const on = await create({ name: "globally-disabled", apiKey: "sk-globally-disabled" });
  assert.equal(on.proxyEnabled, true);
  assert.equal((await settings.resolveProxyForConnection(String(on.id))).level, "direct");
  assert.deepEqual(await settings.getProxyConfig(), beforeAssignments);
  assert.equal((await settings.getSettings()).proxyEnabled, false);
});

test("selective transfer uses destination default, strips hand-edited proxy fields and preserves replacements", async () => {
  const passphrase = "synthetic transfer passphrase";
  const source = await create({ proxyEnabled: true });
  const bundle = await transfer.exportProviderTransferBundle({
    connectionIds: [String(source.id)],
    passphrase,
  });
  const payload = await transfer.openProviderTransferBundle(bundle, passphrase);
  assert.equal(payload.providerConnections[0].proxyEnabled, undefined);
  // A hand-edited sealed payload still passes through the portable-field allowlist.
  const tampered = {
    ...payload,
    providerConnections: payload.providerConnections.map((row) => ({
      ...row,
      proxyEnabled: true,
      perKeyProxyEnabled: true,
    })),
  };
  const editedBundle = {
    ...bundle,
    sealed: await sealJson(tampered, passphrase, "omniroute-provider-transfer:v1"),
  };
  await providers.deleteProviderConnection(String(source.id));
  rawPolicy("false");
  const imported = await transfer.applyProviderTransfer(editedBundle, passphrase, {
    [`connection:${source.id}`]: "add",
  });
  assert.equal(imported.applied.providerConnections, 1);
  const destination = (await providers.getProviderConnections())[0];
  assert.equal(destination.proxyEnabled, false);
  const changedPayload = {
    ...tampered,
    providerConnections: tampered.providerConnections.map((row) => ({
      ...row,
      apiKey: "sk-replacement-only",
    })),
  };
  const replacementBundle = {
    ...bundle,
    sealed: await sealJson(changedPayload, passphrase, "omniroute-provider-transfer:v1"),
  };
  rawPolicy("true");
  const replaced = await transfer.applyProviderTransfer(replacementBundle, passphrase, {
    [`connection:${source.id}`]: "replace",
  });
  assert.equal(replaced.applied.providerConnections, 1);
  assert.equal(stored(destination.id).proxy_enabled, 0);
});

test("historical JSON restore preserves explicit rows and does not reinterpret legacy defaults", async () => {
  rawPolicy("false");
  runJsonMigration(core.getDbInstance(), {
    providerConnections: [
      { id: "restored-on", provider: "openai", proxyEnabled: true },
      { id: "restored-off", provider: "openai", proxyEnabled: false },
      { id: "legacy-default", provider: "openai" },
    ],
  });
  assert.equal(stored("restored-on").proxy_enabled, 1);
  assert.equal(stored("restored-off").proxy_enabled, 0);
  assert.equal(stored("legacy-default").proxy_enabled, 1);
  assert.equal((await settings.getSettings()).defaultNewConnectionProxyEnabled, false);
});

for (const enabled of [false, true]) {
  test(`mixed transfer skips existing ${!enabled} and adds new default ${enabled}`, async () => {
    const existing = await create({ name: "retained", proxyEnabled: !enabled });
    const source = await create({ name: "incoming", apiKey: "sk-incoming-only" });
    const passphrase = "synthetic mixed transfer passphrase";
    const bundle = await transfer.exportProviderTransferBundle({
      connectionIds: [String(existing.id), String(source.id)],
      passphrase,
    });
    await providers.deleteProviderConnection(String(source.id));
    await settings.updateSettings({ defaultNewConnectionProxyEnabled: enabled });
    const response = await transferImportRoute.POST(
      await makeManagementSessionRequest("http://localhost/api/settings/transfer/import", {
        method: "POST",
        body: {
          bundle,
          passphrase,
          decisions: {
            [`connection:${existing.id}`]: "skip",
            [`connection:${source.id}`]: "add",
          },
        },
      })
    );
    assert.equal(response.status, 200);
    const result = await response.json();
    assert.deepEqual(result.applied, { providerConnections: 1, providerNodes: 0, skipped: 1 });
    assert.equal(
      result.items.find((item: { key: string }) => item.key === `connection:${existing.id}`)
        .outcome,
      "skipped"
    );
    const rows = await providers.getProviderConnections();
    assert.equal(rows.length, 2);
    assert.equal(rows.find((row) => row.id === existing.id)?.proxyEnabled, !enabled);
    const added = rows.find((row) => row.id !== existing.id);
    assert.ok(added);
    assert.equal(added.name, "incoming");
    assert.equal(added.proxyEnabled, enabled);
    assert.equal(stored(existing.id).proxy_enabled, enabled ? 0 : 1);
    assert.equal(stored(added.id).proxy_enabled, enabled ? 1 : 0);
  });

  test(`full SQLite export/import replaces destination policy with ${enabled} and preserves independent rows`, async () => {
    await settings.updateSettings({ defaultNewConnectionProxyEnabled: enabled, theme: "dark" });
    const on = await create({ name: "backup-on", proxyEnabled: true });
    const off = await create({ name: "backup-off", apiKey: "sk-backup-off", proxyEnabled: false });
    await settings.setProxyForLevel("key", String(off.id), {
      type: "http",
      host: "127.0.0.1",
      port: 19998,
    });
    const assignments = await settings.getProxyConfig();
    const response = await backupExportRoute.GET(
      await makeManagementSessionRequest("http://localhost/api/db-backups/export")
    );
    assert.equal(response.status, 200);
    const bytes = await response.arrayBuffer();
    assert.ok(bytes.byteLength >= 4096);
    // The supported upload replaces the isolated destination wholesale, rather
    // than merging credentials or resolving restored rows against its preference.
    await settings.updateSettings({ defaultNewConnectionProxyEnabled: !enabled, theme: "light" });
    await providers.deleteProviderConnection(String(on.id));
    await settings.setProxyConfig({});
    const destinationOnly = await create({
      name: "destination-only",
      apiKey: "sk-destination-only",
    });
    const headers = await makeManagementSessionRequest("http://localhost/api/db-backups/import");
    const restored = await backupImportRoute.POST(
      new Request("http://localhost/api/db-backups/import?filename=synthetic.sqlite", {
        method: "POST",
        headers: headers.headers,
        body: bytes,
      })
    );
    assert.equal(restored.status, 200);
    assert.equal((await restored.json()).connectionCount, 2);
    assert.equal((await settings.getSettings()).defaultNewConnectionProxyEnabled, enabled);
    assert.equal((await settings.getSettings()).theme, "dark");
    assert.deepEqual(await settings.getProxyConfig(), assignments);
    assert.equal(await providers.getProviderConnectionById(String(destinationOnly.id)), null);
    assert.equal(stored(on.id).proxy_enabled, 1);
    assert.equal(stored(off.id).proxy_enabled, 0);
    core.resetDbInstance();
    assert.equal((await settings.getSettings()).defaultNewConnectionProxyEnabled, enabled);
    assert.equal(stored(on.id).proxy_enabled, 1);
    assert.equal(stored(off.id).proxy_enabled, 0);
    const next = await create({ name: "after-full-restore", apiKey: "sk-after-full-restore" });
    assert.equal(stored(next.id).proxy_enabled, enabled ? 1 : 0);
  });

  test(`repeated identical ${enabled} PATCH accepts latest revision without changing accounts or unrelated settings`, async () => {
    const existing = await create({ proxyEnabled: !enabled });
    await settings.updateSettings({ theme: "dark", perKeyProxyEnabled: true });
    const assignments = await settings.getProxyConfig();
    for (let index = 0; index < 2; index++) {
      const revision = await settings.getSettingsRevision();
      const response = await patch({
        defaultNewConnectionProxyEnabled: enabled,
        expectedRevision: revision,
      });
      assert.equal(response.status, 200);
      const body = await response.json();
      // updateSettings advances the revision on every accepted transaction.
      assert.equal(body.settingsRevision, revision + 1);
      assert.equal(body.defaultNewConnectionProxyEnabled, enabled);
      const get = await settingsRoute.GET(new Request("http://localhost/api/settings"));
      assert.equal((await get.json()).defaultNewConnectionProxyEnabled, enabled);
      assert.equal(
        core
          .getDbInstance()
          .prepare(
            "SELECT value FROM key_value WHERE namespace='settings' AND key='defaultNewConnectionProxyEnabled'"
          )
          .get()?.value,
        JSON.stringify(enabled)
      );
      const next = await create({ name: `repeated-${index}`, apiKey: `sk-repeat-${index}` });
      assert.equal(stored(next.id).proxy_enabled, enabled ? 1 : 0);
      assert.equal(stored(existing.id).proxy_enabled, enabled ? 0 : 1);
      assert.equal((await settings.getSettings()).theme, "dark");
      assert.equal((await settings.getSettings()).perKeyProxyEnabled, true);
      assert.deepEqual(await settings.getProxyConfig(), assignments);
      assert.equal(
        (await patch({ defaultNewConnectionProxyEnabled: !enabled, expectedRevision: revision }))
          .status,
        409
      );
    }
  });
}

test("policy failures redact stored values and database diagnostics at the real bulk boundary", async (t) => {
  const canaries = [
    "synthetic-policy-canary-7d2",
    "synthetic-diagnostic-canary-9a4",
    "sk-synthetic-credential-canary-8b3",
  ];
  const output: unknown[][] = [];
  for (const method of ["log", "warn", "error", "info", "debug"] as const) {
    t.mock.method(console, method, (...args: unknown[]) => {
      output.push(args);
    });
  }
  const db = core.getDbInstance();
  const prepare = db.prepare.bind(db);
  let failRead = false;
  t.mock.method(db, "prepare", (sql: string) => {
    if (
      failRead &&
      sql.includes("SELECT value FROM key_value") &&
      sql.includes("defaultNewConnectionProxyEnabled")
    ) {
      throw new Error(canaries[1]);
    }
    return prepare(sql);
  });
  for (const failure of ["malformed", "read"]) {
    rawPolicy(JSON.stringify(canaries[0]));
    failRead = failure === "read";
    const response = await bulkRoute.POST(
      await makeManagementSessionRequest("http://localhost/api/providers/bulk", {
        method: "POST",
        body: {
          provider: "openai",
          validateKeys: false,
          entries: [{ name: "redaction", apiKey: canaries[2] }],
        },
      })
    );
    assert.equal(response.status, 200);
    const body = await response.json();
    assert.equal(body.failed, 1);
    assert.equal(body.success, 0);
    assert.match(body.errors[0].message, /new.connection proxy default/i);
    const captured = JSON.stringify({ body, output, audit: getAuditLog() });
    assert.ok(
      canaries.every((canary) => !captured.includes(canary)),
      "feature errors and captured logs must omit private canaries"
    );
    assert.ok(!captured.includes("auth_token="));
    assert.equal(prepare("SELECT count(*) AS n FROM provider_connections").get()?.n, 0);
  }
});

test("fallback-only registry is effective for ON but OFF never enters selection or probing", async (t) => {
  await settings.updateSettings({ defaultNewConnectionProxyEnabled: false, proxyEnabled: true });
  const candidate = await proxyRegistry.createProxy({
    name: "fallback-only",
    type: "http",
    host: "127.0.0.1",
    port: 19997,
    status: "active",
  });
  assert.ok(candidate);
  assert.deepEqual(await proxyRegistry.getProxyAssignments(), []);
  assert.equal((await settings.getProxyConfig()).global, null);
  proxyFallback.clearProxyFallbackCache();
  const probes: string[] = [];
  proxyFallback.__setProxyFallbackTestHooks({
    testSingleProxy: async (url) => {
      probes.push(url);
      return { ok: true, latencyMs: 1 };
    },
  });
  // Observe the real candidate-list query, without replacing the resolver,
  // selection, registry or candidate collection. Only transport is stubbed.
  let candidateReads = 0;
  const db = core.getDbInstance();
  const prepare = db.prepare.bind(db);
  t.mock.method(db, "prepare", (sql: string) => {
    if (sql.includes("FROM proxy_registry ORDER BY")) candidateReads++;
    return prepare(sql);
  });
  try {
    const off = await create();
    assert.equal(stored(off.id).proxy_enabled, 0);
    assert.equal((await settings.resolveProxyForConnection(String(off.id))).level, "direct");
    assert.equal(candidateReads, 0);
    assert.deepEqual(probes, []);
    const on = await create({
      name: "eligible",
      apiKey: "sk-fallback-eligible",
      proxyEnabled: true,
    });
    const result = await settings.resolveProxyForConnection(String(on.id));
    assert.equal(result.level, "autoSelect");
    assert.ok(result.proxy && typeof result.proxy === "object");
    assert.equal(result.proxy.host, "127.0.0.1");
    assert.equal(result.proxy.port, 19997);
    assert.ok(candidateReads > 0);
    assert.deepEqual(probes, ["http://127.0.0.1:19997"]);
  } finally {
    proxyFallback.__setProxyFallbackTestHooks(null);
    proxyFallback.clearProxyFallbackCache();
  }
});

test("ON without configured proxy remains direct and creates no assignments", async () => {
  await settings.updateSettings({ defaultNewConnectionProxyEnabled: true, proxyEnabled: true });
  const before = await settings.getProxyConfig();
  const assignments = await proxyRegistry.getProxyAssignments();
  const row = await create();
  assert.equal(row.proxyEnabled, true);
  assert.equal((await settings.resolveProxyForConnection(String(row.id))).level, "direct");
  assert.deepEqual(await settings.getProxyConfig(), before);
  assert.deepEqual(await proxyRegistry.getProxyAssignments(), assignments);
});
