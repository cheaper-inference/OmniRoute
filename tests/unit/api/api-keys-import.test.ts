import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { randomUUID } from "node:crypto";
import Ajv2020, { type AnySchemaObject } from "ajv/dist/2020.js";
import addFormats from "ajv-formats";
import { load } from "js-yaml";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "key-import-route-"));
Object.assign(process.env, {
  DATA_DIR: dataDir,
  JWT_SECRET: "synthetic-import-jwt-secret-long",
  API_KEY_SECRET: "synthetic-import-api-key-secret",
  STORAGE_ENCRYPTION_KEY: "synthetic-import-storage-encryption-key",
  OMNIROUTE_DISABLE_REDIS_AUTH_CACHE: "1",
  DISABLE_SQLITE_AUTO_BACKUP: "true",
  INITIAL_PASSWORD: "synthetic-import-password",
  CLOUD_URL: "http://cloud.example.invalid",
});
delete process.env.OMNIROUTE_API_KEY;
delete process.env.ROUTER_API_KEY;
const core = await import("../../../src/lib/db/core.ts");
const keys = await import("../../../src/lib/db/apiKeys.ts");
const settings = await import("../../../src/lib/db/settings.ts");
const tokens = await import("../../../src/lib/db/accessTokens.ts");
const models = await import("../../../src/app/api/v1/models/route.ts");
const route = await import("../../../src/app/api/keys/import/route.ts");
const { opaqueTokenFingerprint } =
  await import("../../../open-sse/utils/opaqueTokenFingerprint.ts");
let admin: string;
let manager: string;
const originalFetch = globalThis.fetch;
const openapi = load(
  fs.readFileSync(new URL("../../../docs/openapi.yaml", import.meta.url), "utf8")
) as {
  components: { schemas: { ImportedApiKey: AnySchemaObject } };
};
const validateResponse = addFormats(new Ajv2020({ allowUnionTypes: true })).compile(
  openapi.components.schemas.ImportedApiKey
);

function secret() {
  return `sk-${randomUUID().replaceAll("-", "")}`;
}
function row(id: string) {
  return core.getDbInstance().prepare("SELECT * FROM api_keys WHERE id = ?").get(id);
}
function request(body: unknown, credential: string | null = admin) {
  return new Request("http://localhost/api/keys/import", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      ...(credential ? { authorization: `Bearer ${credential}` } : {}),
    },
    body: JSON.stringify(body),
  });
}
async function send(body: unknown, credential: string | null = admin) {
  return route.POST(request(body, credential));
}
async function modelStatus(key: string) {
  return (
    await models.GET(
      new Request("http://localhost/v1/models", {
        headers: { authorization: `Bearer ${key}` },
      })
    )
  ).status;
}

test.before(async () => {
  globalThis.fetch = async () => {
    throw new Error("Outbound network forbidden in import tests");
  };
  await settings.updateSettings({
    requireLogin: true,
    requireAuthForModels: true,
    cloudEnabled: false,
  });
  admin = tokens.createAccessToken({ name: "synthetic-import-admin", scope: "admin" }).secret;
  manager = (await keys.createApiKey("synthetic-manager", "synthetic-machine", ["manage"])).key;
});
test.after(() => {
  globalThis.fetch = originalFetch;
  keys.resetApiKeyState();
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
});

test("admin imports caller secret encrypted with complete policy; real models handler authenticates", async () => {
  const id = randomUUID();
  const key = secret();
  const body = {
    id,
    key,
    name: "imported",
    allowedModels: [" openai/gpt-4o "],
    allowedCombos: [],
    allowedConnections: [randomUUID()],
    scopes: ["mcp:connect", "mcp:connect"],
    noLog: true,
    allowUsageCommand: true,
    usageLimitEnabled: true,
    dailyUsageLimitUsd: "2.5",
    weeklyUsageLimitUsd: 10,
    chaosModeEnabled: true,
    expiresAt: "2099-01-01T00:00:00.000Z",
  };
  const response = await send(body);
  assert.equal(response.status, 201, await response.clone().text());
  const value = await response.json();
  assert.equal(validateResponse(value), true, JSON.stringify(validateResponse.errors));
  assert.equal(value.id, id);
  assert.equal(value.name, body.name);
  assert.notEqual(value.key, key);
  assert.equal(JSON.stringify(value).includes(key), false);
  assert.equal(JSON.stringify(value).includes(opaqueTokenFingerprint(key)), false);
  assert.equal("keyHash" in value || "key_hash" in value || "machineId" in value, false);
  assert.deepEqual(value.scopes, ["mcp:connect", "self:usage"]);
  assert.equal(value.modelAccessMode, "restricted");
  assert.deepEqual(value.allowedModels, ["openai/gpt-4o"]);
  assert.deepEqual(value.allowedCombos, []);
  assert.deepEqual(value.allowedConnections, body.allowedConnections);
  for (const field of ["noLog", "allowUsageCommand", "usageLimitEnabled", "chaosModeEnabled"]) {
    assert.equal(value[field], true, field);
  }
  assert.equal(value.dailyUsageLimitUsd, 2.5);
  assert.equal(value.weeklyUsageLimitUsd, 10);
  assert.equal(value.expiresAt, body.expiresAt);
  const stored = row(id) as Record<string, unknown>;
  assert.match(String(stored.key), /^enc:v1:/);
  assert.equal(stored.key_hash, opaqueTokenFingerprint(key));
  assert.equal(stored.key_prefix, key.slice(0, 12));
  assert.equal(await modelStatus(key), 200);
  assert.equal(await modelStatus(secret()), 401);
});

test("manage API key imports with generated UUID, create defaults, and zero/null limit semantics", async () => {
  const response = await send(
    {
      key: secret(),
      name: "defaults",
      dailyUsageLimitUsd: 0,
      weeklyUsageLimitUsd: null,
      isActive: false,
    },
    manager
  );
  assert.equal(response.status, 201);
  const value = await response.json();
  assert.match(value.id, /^[0-9a-f-]{36}$/);
  assert.equal(value.isActive, true, "isActive is not a create-schema input");
  assert.deepEqual(value.allowedCombos, ["combo/*"]);
  assert.deepEqual(value.allowedModels, []);
  assert.deepEqual(value.scopes, ["self:usage"]);
  assert.equal(value.modelAccessMode, "all");
  assert.equal(value.dailyUsageLimitUsd, null);
  assert.equal(value.weeklyUsageLimitUsd, null);
});

test("same id/hash retry is 200 without any row mutation, including disabled/expired policy", async () => {
  const id = randomUUID();
  const key = secret();
  assert.equal((await send({ id, key, name: "original", noLog: true })).status, 201);
  await keys.updateApiKeyPermissions(id, {
    isActive: false,
    expiresAt: "2000-01-01T00:00:00.000Z",
  });
  const before = row(id);
  const response = await send({
    id,
    key,
    name: "overwrite",
    noLog: false,
    scopes: ["admin"],
    allowedModels: ["other/model"],
    dailyUsageLimitUsd: 123,
  });
  assert.equal(response.status, 200);
  const value = await response.json();
  assert.deepEqual(row(id), before);
  assert.equal(value.name, "original");
  assert.equal(value.noLog, true);
  assert.equal(value.isActive, false);
  assert.equal(value.expiresAt, "2000-01-01T00:00:00.000Z");
  assert.deepEqual(value.allowedModels, []);
  assert.deepEqual(value.scopes, ["self:usage"]);
  assert.equal(await modelStatus(key), 401);
});

test("expired imported key is rejected independently of active flag", async () => {
  const key = secret();
  assert.equal(
    (await send({ key, name: "expired", expiresAt: "2000-01-01T00:00:00.000Z" })).status,
    201
  );
  assert.equal(await modelStatus(key), 401);
});

test("all three conflicts are 409, never leak other id, and never rekey or mutate", async () => {
  const id = randomUUID();
  const key = secret();
  await send({ id, key, name: "conflict-source" });
  const before = row(id);
  for (const payload of [{ id, key: secret() }, { id: randomUUID(), key }, { key }]) {
    const response = await send({ ...payload, name: "conflict" });
    assert.equal(response.status, 409);
    const text = await response.text();
    assert.equal(
      text.includes(id) || text.includes(key) || text.includes(opaqueTokenFingerprint(key)),
      false
    );
    assert.deepEqual(row(id), before);
  }
});

test("missing, inference-only, read/write oma tokens cannot import; admin and manage can", async () => {
  const inference = (await keys.createApiKey("inference", "synthetic-machine")).key;
  for (const [credential, status] of [
    [null, 401],
    [inference, 403],
    [tokens.createAccessToken({ name: "reader", scope: "read" }).secret, 403],
    [tokens.createAccessToken({ name: "writer", scope: "write" }).secret, 403],
  ] as const) {
    assert.equal((await send({ key: secret(), name: "denied" }, credential)).status, status);
  }
});

test("open-mode inference import stays open; management mint/retry needs real credential", async () => {
  await settings.updateSettings({ requireLogin: false });
  try {
    assert.equal((await send({ key: secret(), name: "open" }, null)).status, 201);
    assert.equal(
      (await send({ key: secret(), name: "no-mint", scopes: ["manage"] }, null)).status,
      401
    );
    const id = randomUUID();
    const key = secret();
    assert.equal((await send({ id, key, name: "managed", scopes: ["manage"] })).status, 201);
    const before = row(id);
    assert.equal((await send({ id, key, name: "retry", scopes: [] }, null)).status, 401);
    assert.deepEqual(row(id), before);
  } finally {
    await settings.updateSettings({ requireLogin: true });
  }
});

test("configured env credentials cannot be imported or shadowed", async () => {
  for (const variable of ["OMNIROUTE_API_KEY", "ROUTER_API_KEY"]) {
    const key = secret();
    process.env[variable] = key;
    try {
      assert.equal((await send({ key, name: "collision" })).status, 409);
    } finally {
      delete process.env[variable];
    }
  }
});

for (const length of [32, 256]) {
  test(`ASCII key boundary ${length} accepted without machine/CRC checks`, async () => {
    assert.equal(
      (await send({ key: `sk-${"A_-9".repeat(64)}`.slice(0, length), name: "boundary" })).status,
      201
    );
  });
}
const invalid = [
  { key: `sk-${"x".repeat(28)}` },
  { key: `sk-${"x".repeat(254)}` },
  { key: `SK-${"x".repeat(32)}` },
  { key: `sk-${"x".repeat(32)} ` },
  { key: `sk-${"x".repeat(32)}\n` },
  { key: `sk-${"x".repeat(32)}é` },
  { key: `sk-${"x".repeat(32)}+` },
  { key: null },
  { id: "not-uuid" },
  { name: "" },
  { name: "n".repeat(201) },
  { dailyUsageLimitUsd: -1 },
  { weeklyUsageLimitUsd: "bad" },
  { noLog: "yes" },
  { expiresAt: "tomorrow" },
  { scopes: ["lease:exclusive"] },
  { modelAccessMode: "all", allowedModels: ["model"] },
  { scopes: [" "] },
  { scopes: ["x".repeat(65)] },
  { scopes: Array(33).fill("x") },
  { allowedConnections: [] },
  { allowedConnections: ["bad"] },
  { allowedModels: Array(1001).fill("m") },
  { allowedCombos: Array(501).fill("c") },
];
invalid.forEach((overrides, index) => {
  test(`invalid schema case ${index} is 400 with no insert`, async () => {
    const before = keys.getApiKeysCount();
    assert.equal((await send({ key: secret(), name: "invalid", ...overrides })).status, 400);
    assert.equal(keys.getApiKeysCount(), before);
  });
});

test("malformed JSON is 400 and cannot leak details", async () => {
  const response = await route.POST(
    new Request("http://localhost/api/keys/import", {
      method: "POST",
      headers: { authorization: `Bearer ${admin}` },
      body: "{broken",
    })
  );
  assert.equal(response.status, 400);
  assert.equal((await response.text()).includes("SyntaxError"), false);
});

test("maximum create-policy boundaries and exclusive-lease refinement are preserved", async () => {
  const response = await send({
    key: secret(),
    name: "n".repeat(200),
    scopes: ["lease:exclusive", ...Array.from({ length: 31 }, (_, i) => `scope:${i}`)],
    allowedConnections: Array.from({ length: 100 }, () => randomUUID()),
    allowedModels: Array(1000).fill("model"),
    allowedCombos: Array(500).fill("c".repeat(200)),
  });
  assert.equal(response.status, 201, await response.clone().text());
  const value = await response.json();
  assert.equal(value.scopes.length, 33, "self:usage is added after validating the input limit");
  assert.equal(value.allowedConnections.length, 100);
  assert.equal(value.allowedModels.length, 1000);
  assert.equal(value.allowedCombos.length, 500);
});

test("route storage failures are sanitized and leave no partially configured key", async () => {
  const id = randomUUID();
  const key = secret();
  const db = core.getDbInstance();
  db.exec(`CREATE TRIGGER import_route_failure AFTER INSERT ON api_keys
    WHEN NEW.name = 'route-rollback' BEGIN SELECT RAISE(FAIL, 'synthetic private SQL detail'); END`);
  try {
    const response = await send({ id, key, name: "route-rollback", noLog: true });
    assert.equal(response.status, 500);
    const text = await response.text();
    assert.equal(
      text.includes(key) || text.includes("private SQL") || text.includes("stack"),
      false
    );
    assert.equal(row(id), undefined);
  } finally {
    db.exec("DROP TRIGGER import_route_failure");
  }
});

test("retry readback never backfills unrelated legacy rows, even after resetting key state", async () => {
  const id = randomUUID();
  const key = secret();
  await send({ id, key, name: "retry-readonly" });
  const legacyId = randomUUID();
  core
    .getDbInstance()
    .prepare("INSERT INTO api_keys (id, name, key, machine_id, created_at) VALUES (?, ?, ?, ?, ?)")
    .run(legacyId, "legacy-readonly", secret(), "synthetic-machine", "2020-01-01");
  const before = row(legacyId);
  keys.resetApiKeyState();
  assert.equal((await send({ id, key, name: "ignored" })).status, 200);
  assert.deepEqual(row(legacyId), before);
});

test("import cloud sync is fire-and-forget and retries do not schedule it", async () => {
  await settings.updateSettings({ cloudEnabled: true });
  let calls = 0;
  const saved = globalThis.fetch;
  globalThis.fetch = () => {
    calls++;
    return new Promise<Response>(() => {});
  };
  const id = randomUUID();
  const key = secret();
  try {
    const response = await Promise.race([
      send({ id, key, name: "cloud-nohang" }),
      new Promise<never>((_, reject) => setTimeout(() => reject(new Error("import hung")), 2000)),
    ]);
    assert.equal(response.status, 201);
    await new Promise((resolve) => setTimeout(resolve, 50));
    assert.ok(calls > 0);
    const before = calls;
    assert.equal((await send({ id, key, name: "ignored" })).status, 200);
    await new Promise((resolve) => setTimeout(resolve, 50));
    assert.equal(calls, before);
  } finally {
    globalThis.fetch = saved;
    await settings.updateSettings({ cloudEnabled: false });
  }
});

test("settings, connections, combos and sessions are unchanged", async () => {
  const providers = await import("../../../src/lib/db/providers.ts");
  const combos = await import("../../../src/lib/db/combos.ts");
  await providers.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "synthetic-preserved-connection",
    apiKey: "synthetic-provider-not-a-real-credential",
    isActive: false,
  });
  await combos.createCombo({ name: "synthetic-preserved-combo", models: ["openai/synthetic"] });
  await settings.updateSettings({
    sessionsValidAfter: 1_900_000_000,
    revokedDashboardSessions: [{ jti: "synthetic-revoked-session", exp: 4_000_000_000 }],
  });
  const snapshot = () =>
    ["key_value", "provider_connections", "combos"].map((table) =>
      core.getDbInstance().prepare(`SELECT * FROM ${table}`).all()
    );
  const before = snapshot();
  assert.equal(
    (
      await send({
        key: secret(),
        name: "isolated",
        settings: { requireLogin: false },
        providerConnections: [{ id: "injected" }],
        sessionsValidAfter: 0,
      })
    ).status,
    201
  );
  assert.deepEqual(snapshot(), before);
});
