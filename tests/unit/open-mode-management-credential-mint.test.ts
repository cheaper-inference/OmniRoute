// A key carrying a management scope (`manage` / `admin`) and an `oma_` CLI access token are both
// accepted by the always-protected tier — the credential-export, log-export and shutdown routes
// that stay authenticated when login is disabled. Handing one out anonymously would walk straight
// past that tier, so with requireLogin=false:
//   - creating a management-scoped key, granting the scope to an existing key, and regenerating or
//     revealing a management-scoped key need a real credential (401 for an anonymous caller);
//   - minting a CLI access token needs a real credential at any scope, and the machine-credential
//     ceiling (manage-scoped keys top out at `write`) holds exactly as it does with login on;
//   - inference-only keys keep the open-mode behaviour, and the dashboard session and the local
//     CLI keep doing all of the above.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { makeManagementSessionRequest } from "../helpers/managementSession.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-open-mode-mgmt-mint-"));
const ORIGINAL_ENV = {
  DATA_DIR: process.env.DATA_DIR,
  API_KEY_SECRET: process.env.API_KEY_SECRET,
  INITIAL_PASSWORD: process.env.INITIAL_PASSWORD,
  ALLOW_API_KEY_REVEAL: process.env.ALLOW_API_KEY_REVEAL,
};

process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "test-open-mode-mgmt-mint-secret";
process.env.INITIAL_PASSWORD = "open-mode-mgmt-mint-password";

const core = await import("../../src/lib/db/core.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const accessTokensDb = await import("../../src/lib/db/accessTokens.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const keysRoute = await import("../../src/app/api/keys/route.ts");
const keyByIdRoute = await import("../../src/app/api/keys/[id]/route.ts");
const regenerateRoute = await import("../../src/app/api/keys/[id]/regenerate/route.ts");
const revealRoute = await import("../../src/app/api/keys/[id]/reveal/route.ts");
const cliTokensRoute = await import("../../src/app/api/cli/tokens/route.ts");
const { AUTHZ_HEADER_AUTH_KIND, AUTHZ_HEADER_AUTH_LABEL } =
  await import("../../src/server/authz/headers.ts");

const KEYS_URL = "http://localhost/api/keys";
const TOKENS_URL = "http://localhost/api/cli/tokens";
const MACHINE_ID = "machine-open-mode-mint";
const ctx = (id: string) => ({ params: Promise.resolve({ id }) });

function resetStorage() {
  apiKeysDb.resetApiKeyState();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  resetStorage();
  delete process.env.ALLOW_API_KEY_REVEAL;
  // setupComplete: with INITIAL_PASSWORD set, an unfinished setup forces requireLogin back on.
  await settingsDb.updateSettings({ setupComplete: true, requireLogin: false });
  assert.equal((await settingsDb.getSettings()).requireLogin, false, "open mode must stick");
});

test.after(() => {
  apiKeysDb.resetApiKeyState();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  for (const [name, value] of Object.entries(ORIGINAL_ENV)) {
    if (value === undefined) delete process.env[name];
    else process.env[name] = value;
  }
});

function anonymous(url: string, method = "GET", body?: Record<string, unknown>) {
  return new Request(url, {
    method,
    headers: body ? { "content-type": "application/json" } : {},
    body: body ? JSON.stringify(body) : undefined,
  });
}

function withBearer(url: string, token: string, method = "GET", body?: Record<string, unknown>) {
  const request = anonymous(url, method, body);
  request.headers.set("authorization", `Bearer ${token}`);
  return request;
}

function localCli(url: string, method = "GET", body?: Record<string, unknown>) {
  const request = anonymous(url, method, body);
  request.headers.set(AUTHZ_HEADER_AUTH_KIND, "management_key");
  request.headers.set(AUTHZ_HEADER_AUTH_LABEL, "local-cli-token");
  return request;
}

async function assertUnauthenticated(response: Response, secret?: string) {
  const text = await response.text();
  assert.equal(response.status, 401, `expected 401, got ${response.status}: ${text}`);
  assert.ok(!text.includes("oma_live_"), "a refused call must not return an access token");
  if (secret) assert.ok(!text.includes(secret), "a refused call must not return the key");
  assert.ok(!text.includes("at /"), "401 body must not leak a stack trace");
}

async function managementKeyCount() {
  const keys = await apiKeysDb.getApiKeys();
  return keys.filter((k) => k.scopes?.includes("manage") || k.scopes?.includes("admin")).length;
}

for (const scope of ["manage", "admin"]) {
  test(`with login disabled, an anonymous caller cannot create a '${scope}'-scoped key`, async () => {
    await assertUnauthenticated(
      await keysRoute.POST(anonymous(KEYS_URL, "POST", { name: "anon", scopes: [scope] }))
    );
    assert.equal(await managementKeyCount(), 0, "nothing may be persisted");
  });
}

test("with login disabled, inference-only keys are still created anonymously", async () => {
  const response = await keysRoute.POST(anonymous(KEYS_URL, "POST", { name: "inference" }));
  assert.equal(response.status, 201);
  const body = (await response.json()) as { key?: string };
  assert.ok(body.key, "the new key is returned once");
});

test("with login disabled, the dashboard session and the local CLI still create management keys", async () => {
  const viaSession = await keysRoute.POST(
    await makeManagementSessionRequest(KEYS_URL, {
      method: "POST",
      body: { name: "session-manage", scopes: ["manage"] },
    })
  );
  assert.equal(viaSession.status, 201);
  const viaCli = await keysRoute.POST(
    localCli(KEYS_URL, "POST", { name: "cli-manage", scopes: ["manage"] })
  );
  assert.equal(viaCli.status, 201);
  assert.equal(await managementKeyCount(), 2);
});

test("with login disabled, an anonymous caller cannot grant a management scope to a key", async () => {
  const key = await apiKeysDb.createApiKey("inference", MACHINE_ID, []);
  await assertUnauthenticated(
    await keyByIdRoute.PATCH(
      anonymous(`${KEYS_URL}/${key.id}`, "PATCH", { scopes: ["manage"] }),
      ctx(key.id)
    )
  );
  const after = await apiKeysDb.getApiKeyById(key.id);
  assert.ok(!after?.scopes?.includes("manage"), "the scope must not be granted");
});

test("with login disabled, other edits of an inference key stay anonymous", async () => {
  const key = await apiKeysDb.createApiKey("inference", MACHINE_ID, []);
  const response = await keyByIdRoute.PATCH(
    anonymous(`${KEYS_URL}/${key.id}`, "PATCH", { name: "renamed" }),
    ctx(key.id)
  );
  assert.equal(response.status, 200);
  assert.equal((await apiKeysDb.getApiKeyById(key.id))?.name, "renamed");
});

test("with login disabled, an anonymous caller cannot regenerate a management key", async () => {
  const key = await apiKeysDb.createApiKey("automation", MACHINE_ID, ["manage"]);
  await assertUnauthenticated(
    await regenerateRoute.POST(anonymous(`${KEYS_URL}/${key.id}/regenerate`, "POST"), ctx(key.id))
  );
  assert.equal((await apiKeysDb.getApiKeyById(key.id))?.key, key.key, "the key is not rotated");
});

test("with login disabled, inference keys are still regenerated anonymously", async () => {
  const key = await apiKeysDb.createApiKey("inference", MACHINE_ID, []);
  const response = await regenerateRoute.POST(
    anonymous(`${KEYS_URL}/${key.id}/regenerate`, "POST"),
    ctx(key.id)
  );
  assert.equal(response.status, 200);
});

test("with login disabled, an anonymous caller cannot reveal a management key", async () => {
  process.env.ALLOW_API_KEY_REVEAL = "true";
  const key = await apiKeysDb.createApiKey("automation", MACHINE_ID, ["manage"]);
  await assertUnauthenticated(
    await revealRoute.GET(anonymous(`${KEYS_URL}/${key.id}/reveal`), ctx(key.id)),
    key.key
  );
  const viaSession = await revealRoute.GET(
    await makeManagementSessionRequest(`${KEYS_URL}/${key.id}/reveal`),
    ctx(key.id)
  );
  assert.equal(viaSession.status, 200);
  assert.equal(((await viaSession.json()) as { key?: string }).key, key.key);
});

test("with login disabled, inference keys are still revealed anonymously", async () => {
  process.env.ALLOW_API_KEY_REVEAL = "true";
  const key = await apiKeysDb.createApiKey("inference", MACHINE_ID, []);
  const response = await revealRoute.GET(anonymous(`${KEYS_URL}/${key.id}/reveal`), ctx(key.id));
  assert.equal(response.status, 200);
});

for (const scope of ["read", "write", "admin"]) {
  test(`with login disabled, an anonymous caller cannot mint a '${scope}' CLI token`, async () => {
    await assertUnauthenticated(
      await cliTokensRoute.POST(anonymous(TOKENS_URL, "POST", { name: `anon-${scope}`, scope }))
    );
    assert.equal(accessTokensDb.listAccessTokens().length, 0, "nothing may be persisted");
  });
}

test("with login disabled, the dashboard session and the local CLI still mint admin CLI tokens", async () => {
  const viaSession = await cliTokensRoute.POST(
    await makeManagementSessionRequest(TOKENS_URL, {
      method: "POST",
      body: { name: "session-admin", scope: "admin" },
    })
  );
  assert.equal(viaSession.status, 200);
  const viaCli = await cliTokensRoute.POST(
    localCli(TOKENS_URL, "POST", { name: "cli-admin", scope: "admin" })
  );
  assert.equal(viaCli.status, 200);
  assert.equal(((await viaCli.json()) as { scope?: string }).scope, "admin");
});

test("with login disabled, a manage-scoped key keeps the machine ceiling: write yes, admin no", async () => {
  const key = await apiKeysDb.createApiKey("automation", MACHINE_ID, ["manage"]);
  const write = await cliTokensRoute.POST(
    withBearer(TOKENS_URL, key.key, "POST", { name: "machine-write", scope: "write" })
  );
  assert.equal(write.status, 200);
  const admin = await cliTokensRoute.POST(
    withBearer(TOKENS_URL, key.key, "POST", { name: "machine-admin", scope: "admin" })
  );
  assert.equal(admin.status, 403);
  const minted = accessTokensDb.listAccessTokens().map((t) => t.scope);
  assert.deepEqual(minted, ["write"]);
});

test("creating a key still applies its create-time permission flags", async () => {
  const response = await keysRoute.POST(
    anonymous(KEYS_URL, "POST", {
      name: "flags",
      noLog: true,
      allowUsageCommand: true,
      usageLimitEnabled: true,
      dailyUsageLimitUsd: 5,
      weeklyUsageLimitUsd: 20,
      chaosModeEnabled: true,
    })
  );
  assert.equal(response.status, 201);
  const stored = await apiKeysDb.getApiKeyById(((await response.json()) as { id: string }).id);
  assert.equal(Boolean(stored?.noLog), true);
  assert.equal(Boolean(stored?.allowUsageCommand), true);
  assert.equal(Boolean(stored?.usageLimitEnabled), true);
  assert.equal(Number(stored?.dailyUsageLimitUsd), 5);
  assert.equal(Number(stored?.weeklyUsageLimitUsd), 20);
  assert.equal(Boolean(stored?.chaosModeEnabled), true);

  const plain = await keysRoute.POST(anonymous(KEYS_URL, "POST", { name: "plain" }));
  const defaults = await apiKeysDb.getApiKeyById(((await plain.json()) as { id: string }).id);
  assert.equal(Boolean(defaults?.noLog), false);
  assert.equal(Boolean(defaults?.usageLimitEnabled), false);
  assert.equal(Boolean(defaults?.chaosModeEnabled), false);
});
