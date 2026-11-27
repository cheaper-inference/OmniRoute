import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { setImmediate } from "node:timers/promises";
import { makeManagementSessionRequest } from "../helpers/managementSession.ts";

const TEST_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-api-keys-route-"));
const TEST_DATA_DIR = path.join(TEST_DIR, "data");
const STORAGE_PATH = path.join(TEST_DATA_DIR, "storage.sqlite");
const TEMPLATE_PATH = path.join(TEST_DIR, "template.sqlite");
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-api-key-secret";
process.env.CLOUD_URL = "http://cloud.example";
process.env.APP_LOG_FILE_PATH = path.join(TEST_DIR, "app.log");

const core = await import("../../src/lib/db/core.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const combosDb = await import("../../src/lib/db/combos.ts");
const apiKeyPolicy = await import("../../src/shared/utils/apiKeyPolicy.ts");
const { updateSettings } = await import("@/lib/db/settings");
const localDb = { updateSettings };
const compliance = await import("../../src/lib/compliance/index.ts");
const listRoute = await import("../../src/app/api/keys/route.ts");
const keyRoute = await import("../../src/app/api/keys/[id]/route.ts");
const revealRoute = await import("../../src/app/api/keys/[id]/reveal/route.ts");
const { closeLogRotation } = await import("../../src/lib/logRotation.ts");
const { closeSharedLoggerResource } = await import("../../src/shared/utils/loggerResource.ts");

const MACHINE_ID = "1234567890abcdef";

function resetStorageState() {
  delete process.env.ALLOW_API_KEY_REVEAL;
  delete process.env.INITIAL_PASSWORD;
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
}

function resetStorage() {
  resetStorageState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  fs.copyFileSync(TEMPLATE_PATH, STORAGE_PATH);
}

async function waitForCloudSync(fetchCalled: Promise<void>) {
  let deadline: NodeJS.Timeout | undefined;
  try {
    await Promise.race([
      fetchCalled,
      new Promise<never>((_, reject) => {
        deadline = setTimeout(() => {
          reject(new Error("Timed out after 10 seconds waiting for the cloud sync fetch stub"));
        }, 10_000);
      }),
    ]);
    // Let the background task consume the stub response or catch its rejection.
    await setImmediate();
  } finally {
    clearTimeout(deadline);
  }
}

async function enableManagementAuth() {
  process.env.INITIAL_PASSWORD = "bootstrap-password";
  await localDb.updateSettings({ requireLogin: true, password: "" });
}

async function createManagementKey() {
  return apiKeysDb.createApiKey("management", MACHINE_ID);
}

function makeRequest(
  url: string | URL,
  { method = "GET", token, body }: { method?: string; token?: string; body?: unknown } = {}
) {
  const headers = new Headers();
  if (token) {
    headers.set("authorization", `Bearer ${token}`);
  }
  if (body !== undefined) {
    headers.set("content-type", "application/json");
  }

  return new Request(url, {
    method,
    headers,
    body: body === undefined ? undefined : JSON.stringify(body),
  });
}

test.before(() => {
  core.getDbInstance();
  // Closing checkpoints the WAL so the template only needs the main SQLite file.
  resetStorageState();
  fs.copyFileSync(STORAGE_PATH, TEMPLATE_PATH);
});

test.beforeEach(resetStorage);

test.after(async () => {
  try {
    resetStorageState();
  } finally {
    closeLogRotation();
    await closeSharedLoggerResource().finally(() => {
      fs.rmSync(TEST_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
    });
  }
});

test("API keys routes require management auth when login protection is enabled", async () => {
  await enableManagementAuth();

  const unauthenticated = await listRoute.GET(new Request("http://localhost/api/keys"));
  const invalidToken = await listRoute.GET(
    new Request("http://localhost/api/keys", {
      headers: { authorization: "Bearer sk-invalid" },
    })
  );

  const unauthenticatedBody = (await unauthenticated.json()) as any;
  const invalidTokenBody = (await invalidToken.json()) as any;

  assert.equal(unauthenticated.status, 401);
  assert.equal(unauthenticatedBody.error.message, "Authentication required");
  assert.equal(invalidToken.status, 403);
  assert.equal(invalidTokenBody.error.message, "Invalid management token");
});

test("API keys POST also requires management auth when login protection is enabled", async () => {
  await enableManagementAuth();

  const unauthenticated = await listRoute.POST(
    makeRequest("http://localhost/api/keys", {
      method: "POST",
      body: { name: "Blocked Create" },
    })
  );
  const invalidToken = await listRoute.POST(
    makeRequest("http://localhost/api/keys", {
      method: "POST",
      token: "sk-invalid",
      body: { name: "Blocked Create" },
    })
  );

  const unauthenticatedBody = (await unauthenticated.json()) as any;
  const invalidTokenBody = (await invalidToken.json()) as any;

  assert.equal(unauthenticated.status, 401);
  assert.equal(unauthenticatedBody.error.message, "Authentication required");
  assert.equal(invalidToken.status, 403);
  assert.equal(invalidTokenBody.error.message, "Invalid management token");
});

test("POST /api/keys creates a key, preserves special characters, and persists noLog", async () => {
  await enableManagementAuth();
  await createManagementKey();
  const response = await listRoute.POST(
    await makeManagementSessionRequest("http://localhost/api/keys", {
      method: "POST",
      body: { name: "Key / Prod #1", noLog: true },
    })
  );
  const body = (await response.json()) as any;
  const stored = await apiKeysDb.getApiKeyById(body.id);

  assert.equal(response.status, 201);
  assert.equal(body.name, "Key / Prod #1");
  assert.equal(body.noLog, true);
  assert.equal(body.compressionEnabled, true);
  assert.match(body.key, /^sk-[a-z0-9-]+/i);
  assert.equal(stored?.noLog, true);
  assert.equal(stored?.compressionEnabled, true);
  assert.equal(compliance.isNoLog(body.id), true);
});

test("POST /api/keys preserves creation-time ACL and enforces it (#12275)", async () => {
  await enableManagementAuth();
  await createManagementKey();

  const response = await listRoute.POST(
    await makeManagementSessionRequest("http://localhost/api/keys", {
      method: "POST",
      body: {
        name: "Restricted Create",
        modelAccessMode: "restricted",
        allowedModels: ["openai/gpt-4.1-mini"],
        allowedCombos: ["focused-chat"],
      },
    })
  );
  const body = (await response.json()) as {
    id: string;
    key: string;
    modelAccessMode: string;
    allowedModels: string[];
    allowedCombos: string[];
  };
  const stored = await apiKeysDb.getApiKeyById(body.id);

  await combosDb.createCombo({
    name: "focused-chat",
    strategy: "priority",
    config: { maxRetries: 0, retryDelayMs: 0 },
    models: ["openai/gpt-4.1-mini"],
  });
  await combosDb.createCombo({
    name: "blocked-chat",
    strategy: "priority",
    config: { maxRetries: 0, retryDelayMs: 0 },
    models: ["anthropic/claude-sonnet-4-5"],
  });

  assert.equal(response.status, 201);
  assert.equal(body.modelAccessMode, "restricted");
  assert.deepEqual(body.allowedModels, ["openai/gpt-4.1-mini"]);
  assert.deepEqual(body.allowedCombos, ["focused-chat"]);
  assert.equal(stored?.modelAccessMode, "restricted");
  assert.deepEqual(stored?.allowedModels, ["openai/gpt-4.1-mini"]);
  assert.deepEqual(stored?.allowedCombos, ["focused-chat"]);

  const allowed = await apiKeyPolicy.enforceApiKeyPolicy(
    makeRequest("http://localhost/api/v1/chat/completions", { token: body.key }),
    "openai/gpt-4.1-mini"
  );
  const denied = await apiKeyPolicy.enforceApiKeyPolicy(
    makeRequest("http://localhost/api/v1/chat/completions", { token: body.key }),
    "anthropic/claude-sonnet-4-5"
  );
  const allowedCombo = await apiKeyPolicy.enforceApiKeyPolicy(
    makeRequest("http://localhost/api/v1/chat/completions", { token: body.key }),
    "focused-chat"
  );
  const deniedCombo = await apiKeyPolicy.enforceApiKeyPolicy(
    makeRequest("http://localhost/api/v1/chat/completions", { token: body.key }),
    "blocked-chat"
  );

  assert.equal(allowed.rejection, null);
  assert.equal(denied.rejection?.status, 403);
  assert.equal(allowedCombo.rejection, null);
  assert.equal(deniedCombo.rejection?.status, 403);
});

test("POST /api/keys validates missing and oversized names", async () => {
  await enableManagementAuth();
  await createManagementKey();

  const missingName = await listRoute.POST(
    await makeManagementSessionRequest("http://localhost/api/keys", {
      method: "POST",
      body: {},
    })
  );
  const oversizedName = await listRoute.POST(
    await makeManagementSessionRequest("http://localhost/api/keys", {
      method: "POST",
      body: { name: "x".repeat(201) },
    })
  );

  assert.equal(missingName.status, 400);
  assert.equal(oversizedName.status, 400);
});

test("POST /api/keys returns a server error for malformed JSON payloads", async () => {
  await enableManagementAuth();
  await createManagementKey();

  const response = await listRoute.POST(
    await makeManagementSessionRequest("http://localhost/api/keys", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: "{",
    })
  );
  const body = (await response.json()) as any;

  assert.equal(response.status, 500);
  assert.equal(body.error, "Failed to create key");
});

test("GET /api/keys lists masked keys with pagination and GET /api/keys/[id] stays masked", async () => {
  await enableManagementAuth();
  await createManagementKey();
  const createdA = await apiKeysDb.createApiKey("Alpha", MACHINE_ID);
  const createdB = await apiKeysDb.createApiKey("Beta", MACHINE_ID);

  const listResponse = await listRoute.GET(
    await makeManagementSessionRequest("http://localhost/api/keys?limit=1&offset=1")
  );
  const getResponse = await keyRoute.GET(
    await makeManagementSessionRequest(`http://localhost/api/keys/${createdB.id}`),
    { params: Promise.resolve({ id: createdB.id }) }
  );

  const listBody = (await listResponse.json()) as any;
  const getBody = (await getResponse.json()) as any;

  assert.equal(listResponse.status, 200);
  assert.equal(listBody.total, 3);
  assert.equal(listBody.keys.length, 1);
  assert.equal(listBody.keys[0].id, createdA.id);
  assert.notEqual(listBody.keys[0].key, createdA.key);
  assert.match(listBody.keys[0].key, /\*{4}/);

  assert.equal(getResponse.status, 200);
  assert.equal(getBody.id, createdB.id);
  assert.notEqual(getBody.key, createdB.key);
  assert.match(getBody.key, /\*{4}/);
});

test("GET /api/keys falls back to default pagination for invalid query params", async () => {
  await enableManagementAuth();
  await createManagementKey();
  await apiKeysDb.createApiKey("Alpha", MACHINE_ID);
  await apiKeysDb.createApiKey("Beta", MACHINE_ID);

  const response = await listRoute.GET(
    await makeManagementSessionRequest("http://localhost/api/keys?limit=0&offset=-25")
  );
  const body = (await response.json()) as any;

  assert.equal(response.status, 200);
  assert.equal(body.total, 3);
  assert.equal(body.keys.length, 3);
  assert.equal(body.keys[0].name, "management");
});

test("GET /api/keys treats non-numeric pagination params as defaults", async () => {
  await enableManagementAuth();
  await createManagementKey();
  await apiKeysDb.createApiKey("Alpha", MACHINE_ID);
  await apiKeysDb.createApiKey("Beta", MACHINE_ID);

  const response = await listRoute.GET(
    await makeManagementSessionRequest("http://localhost/api/keys?limit=abc&offset=xyz")
  );
  const body = (await response.json()) as any;

  assert.equal(response.status, 200);
  assert.equal(body.total, 3);
  assert.equal(body.keys.length, 3);
  assert.deepEqual(
    body.keys.map((entry) => entry.name),
    ["management", "Alpha", "Beta"]
  );
});

test("GET /api/keys uses default pagination when query params are absent and reports reveal support", async () => {
  await enableManagementAuth();
  process.env.ALLOW_API_KEY_REVEAL = "true";
  const authKey = await createManagementKey();
  const createdA = await apiKeysDb.createApiKey("Alpha", MACHINE_ID);
  const createdB = await apiKeysDb.createApiKey("Beta", MACHINE_ID);

  const response = await listRoute.GET(
    await makeManagementSessionRequest("http://localhost/api/keys")
  );
  const body = (await response.json()) as any;

  assert.equal(response.status, 200);
  assert.equal(body.total, 3);
  assert.equal(body.allowKeyReveal, true);
  assert.equal(body.keys.length, 3);
  assert.deepEqual(
    body.keys.map((entry) => entry.id).sort(),
    [authKey.id, createdA.id, createdB.id].sort()
  );
  assert.ok(body.keys.every((entry) => entry.key !== undefined && entry.key !== ""));
});

test("POST /api/keys triggers cloud sync when cloud mode is enabled", async () => {
  await enableManagementAuth();
  await localDb.updateSettings({ cloudEnabled: true });
  await createManagementKey();
  const originalFetch = globalThis.fetch;
  const calls = [];
  const { promise: fetchCalled, resolve: signalFetchCalled } = Promise.withResolvers<void>();
  globalThis.fetch = async (url, options = {}) => {
    calls.push({ url, options });
    signalFetchCalled();
    return Response.json({ changes: { apiKeys: 1 } });
  };

  try {
    const response = await listRoute.POST(
      await makeManagementSessionRequest("http://localhost/api/keys", {
        method: "POST",
        body: { name: "Cloud Synced Key" },
      })
    );
    await waitForCloudSync(fetchCalled);
    const body = (await response.json()) as any;

    assert.equal(response.status, 201);
    assert.equal(body.name, "Cloud Synced Key");

    const syncPayload = JSON.parse(calls[0].options.body);
    assert.equal(calls.length, 1);
    assert.match(String(calls[0].url), /^http:\/\/cloud\.example\/sync\//);
    assert.ok(Array.isArray(syncPayload.providers));
    assert.ok(Array.isArray(syncPayload.apiKeys));
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("GET /api/keys returns 500 when the key store throws unexpectedly", async () => {
  await apiKeysDb.createApiKey("Alpha", MACHINE_ID);

  const db = core.getDbInstance();
  const originalPrepare = db.prepare.bind(db);
  const originalLog = console.log;
  const originalError = console.error;

  db.prepare = (sql) => {
    if (String(sql).includes("FROM api_keys")) {
      throw new Error("api keys offline");
    }
    return originalPrepare(sql);
  };
  apiKeysDb.resetApiKeyState();
  // Suppress Pino structured log output during test
  console.log = () => {};
  console.error = () => {};

  try {
    const response = await listRoute.GET(new Request("http://localhost/api/keys"));
    const body = (await response.json()) as any;

    assert.equal(response.status, 500);
    assert.equal(body.error, "Failed to fetch keys");
  } finally {
    db.prepare = originalPrepare;
    apiKeysDb.resetApiKeyState();
    console.log = originalLog;
    console.error = originalError;
  }
});

test("POST /api/keys still succeeds when cloud sync fails after creation", async () => {
  await enableManagementAuth();
  await localDb.updateSettings({ cloudEnabled: true });
  await createManagementKey();
  const originalFetch = globalThis.fetch;
  let syncAttempts = 0;
  const { promise: fetchCalled, resolve: signalFetchCalled } = Promise.withResolvers<void>();

  globalThis.fetch = async () => {
    syncAttempts += 1;
    signalFetchCalled();
    throw new Error("cloud sync offline");
  };

  try {
    const response = await listRoute.POST(
      await makeManagementSessionRequest("http://localhost/api/keys", {
        method: "POST",
        body: { name: "Cloud Failure Tolerated" },
      })
    );
    await waitForCloudSync(fetchCalled);
    const body = (await response.json()) as any;
    const stored = await apiKeysDb.getApiKeyById(body.id);

    assert.equal(response.status, 201);
    assert.equal(body.name, "Cloud Failure Tolerated");
    assert.equal(stored?.name, "Cloud Failure Tolerated");

    assert.equal(syncAttempts, 1);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("GET /api/keys/[id] returns 404 for an unknown key and reveal is gated by the feature flag", async () => {
  await enableManagementAuth();
  await createManagementKey();
  const created = await apiKeysDb.createApiKey("Reveal Target", MACHINE_ID);

  const missingResponse = await keyRoute.GET(
    await makeManagementSessionRequest("http://localhost/api/keys/missing"),
    { params: Promise.resolve({ id: "missing" }) }
  );
  const revealDisabled = await revealRoute.GET(
    await makeManagementSessionRequest(`http://localhost/api/keys/${created.id}/reveal`),
    { params: Promise.resolve({ id: created.id }) }
  );

  process.env.ALLOW_API_KEY_REVEAL = "true";
  const revealEnabled = await revealRoute.GET(
    await makeManagementSessionRequest(`http://localhost/api/keys/${created.id}/reveal`),
    { params: Promise.resolve({ id: created.id }) }
  );

  const missingBody = (await missingResponse.json()) as any;
  const revealDisabledBody = (await revealDisabled.json()) as any;
  const revealEnabledBody = (await revealEnabled.json()) as any;

  assert.equal(missingResponse.status, 404);
  assert.equal(missingBody.error, "Key not found");
  assert.equal(revealDisabled.status, 403);
  assert.equal(revealDisabledBody.error, "API key reveal is disabled");
  assert.equal(revealEnabled.status, 200);
  assert.equal(revealEnabledBody.key, created.key);
});

test("PATCH /api/keys/[id] updates permissions and rejects invalid payloads", async () => {
  await enableManagementAuth();
  await createManagementKey();
  const created = await apiKeysDb.createApiKey("Mutable", MACHINE_ID);
  const patchResponse = await keyRoute.PATCH(
    await makeManagementSessionRequest(`http://localhost/api/keys/${created.id}`, {
      method: "PATCH",
      body: {
        noLog: true,
        allowedModels: ["gpt-4.1-mini"],
        allowedConnections: [],
        isActive: false,
        maxSessions: 2,
        compressionEnabled: false,
      },
    }),
    { params: Promise.resolve({ id: created.id }) }
  );
  const invalidJsonResponse = await keyRoute.PATCH(
    await makeManagementSessionRequest(`http://localhost/api/keys/${created.id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: "{",
    }),
    { params: Promise.resolve({ id: created.id }) }
  );
  const missingKeyResponse = await keyRoute.PATCH(
    await makeManagementSessionRequest("http://localhost/api/keys/missing", {
      method: "PATCH",
      body: { noLog: false },
    }),
    { params: Promise.resolve({ id: "missing" }) }
  );

  const patchBody = (await patchResponse.json()) as any;
  const invalidJsonBody = (await invalidJsonResponse.json()) as any;
  const missingKeyBody = (await missingKeyResponse.json()) as any;
  const updated = await apiKeysDb.getApiKeyById(created.id);

  assert.equal(patchResponse.status, 200);
  assert.equal(patchBody.noLog, true);
  assert.equal(patchBody.isActive, false);
  assert.equal(patchBody.maxSessions, 2);
  assert.equal(patchBody.compressionEnabled, false);
  assert.deepEqual(updated?.allowedModels, ["gpt-4.1-mini"]);
  assert.equal(updated?.noLog, true);
  assert.equal(updated?.isActive, false);
  assert.equal(updated?.compressionEnabled, false);
  assert.equal(invalidJsonResponse.status, 400);
  assert.equal(invalidJsonBody.error.message, "Invalid request");
  assert.equal(missingKeyResponse.status, 404);
  assert.equal(missingKeyBody.error, "Key not found");
});

test("PATCH /api/keys/[id] renames a key and rejects invalid names", async () => {
  await enableManagementAuth();
  await createManagementKey();
  const created = await apiKeysDb.createApiKey("Original Name", MACHINE_ID);

  // Valid rename
  const renameResponse = await keyRoute.PATCH(
    await makeManagementSessionRequest(`http://localhost/api/keys/${created.id}`, {
      method: "PATCH",
      body: { name: "Renamed Key" },
    }),
    { params: Promise.resolve({ id: created.id }) }
  );
  const renameBody = (await renameResponse.json()) as any;
  const renamed = await apiKeysDb.getApiKeyById(created.id);

  assert.equal(renameResponse.status, 200);
  assert.equal(renameBody.name, "Renamed Key");
  assert.equal(renamed?.name, "Renamed Key");

  // Empty name should be rejected by Zod schema (min(1))
  const emptyNameResponse = await keyRoute.PATCH(
    await makeManagementSessionRequest(`http://localhost/api/keys/${created.id}`, {
      method: "PATCH",
      body: { name: "   " },
    }),
    { params: Promise.resolve({ id: created.id }) }
  );
  assert.equal(emptyNameResponse.status, 400);

  // Name too long should be rejected (max 200)
  const longNameResponse = await keyRoute.PATCH(
    await makeManagementSessionRequest(`http://localhost/api/keys/${created.id}`, {
      method: "PATCH",
      body: { name: "x".repeat(201) },
    }),
    { params: Promise.resolve({ id: created.id }) }
  );
  assert.equal(longNameResponse.status, 400);
});

test("DELETE /api/keys/[id] removes keys and reports missing resources", async () => {
  await enableManagementAuth();
  await createManagementKey();
  const created = await apiKeysDb.createApiKey("Disposable", MACHINE_ID);

  const deleteResponse = await keyRoute.DELETE(
    await makeManagementSessionRequest(`http://localhost/api/keys/${created.id}`, {
      method: "DELETE",
    }),
    { params: Promise.resolve({ id: created.id }) }
  );
  const missingDeleteResponse = await keyRoute.DELETE(
    await makeManagementSessionRequest("http://localhost/api/keys/missing", {
      method: "DELETE",
    }),
    { params: Promise.resolve({ id: "missing" }) }
  );

  const deleteBody = (await deleteResponse.json()) as any;
  const missingDeleteBody = (await missingDeleteResponse.json()) as any;

  assert.equal(deleteResponse.status, 200);
  assert.equal(deleteBody.message, "Key deleted successfully");
  assert.equal(await apiKeysDb.getApiKeyById(created.id), null);
  assert.equal(missingDeleteResponse.status, 404);
  assert.equal(missingDeleteBody.error, "Key not found");
});
