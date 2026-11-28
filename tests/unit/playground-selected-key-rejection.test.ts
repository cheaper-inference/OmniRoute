import assert from "node:assert/strict";
import test, { type TestContext } from "node:test";
import { createTempDataDir } from "../_setup/tempDataDir.ts";
import { CALL_LOG_SETTLE_TIMEOUT_MS } from "../helpers/callLogSettle.ts";

const { cleanup } = createTempDataDir("playground-selected-key-");
process.env.API_KEY_SECRET = "playground-selector-test-api-secret";
process.env.JWT_SECRET = "playground-selector-test-session-secret";
process.env.REQUIRE_API_KEY = "false";
process.env.IMAGE_GENERATION_LONG_JOBS = "false";

const db = await import("@/lib/db/core");
const keys = await import("@/lib/db/apiKeys");
const { createProviderConnection } = await import("@/lib/db/providers");
const { POST } = await import("@/app/api/v1/images/generations/route");
const { closeCallLogSaves, getCallLogs, waitForCallLogSaves } =
  await import("@/lib/usage/callLogs");
const { mintDashboardSessionToken } = await import("@/shared/utils/dashboardSessionToken");
const { enforceApiKeyPolicy } = await import("@/shared/utils/apiKeyPolicy");

const MODEL = "openai/gpt-image-2";
const token = await mintDashboardSessionToken(new TextEncoder().encode(process.env.JWT_SECRET));

function mediaRequest(keyId: string, withSession = true) {
  const headers = new Headers({
    "Content-Type": "application/json",
    "x-omniroute-playground-key-id": keyId,
  });
  if (withSession) headers.set("cookie", `auth_token=${token}`);
  return new Request("http://localhost/api/v1/images/generations", {
    method: "POST",
    headers,
    body: JSON.stringify({ model: MODEL, prompt: "A watercolor landscape" }),
  });
}

function stubProvider(t: TestContext) {
  return t.mock.method(globalThis, "fetch", async () =>
    Response.json({ created: 123, data: [{ url: "https://images.example.test/example.png" }] })
  );
}

test.before(async () => {
  await createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "Test image provider",
    apiKey: "synthetic-image-provider-key",
    isActive: true,
    testStatus: "active",
  });
});

test.after(async () => {
  try {
    await closeCallLogSaves(CALL_LOG_SETTLE_TIMEOUT_MS);
  } finally {
    await cleanup();
  }
});

test("deleted selected key rejects before provider dispatch with a real session", async (t) => {
  const key = await keys.createApiKey("Deleted selector key", "test");
  const request = mediaRequest(key.id);
  await keys.deleteApiKey(key.id);
  const provider = stubProvider(t);

  const response = await POST(request);
  assert.deepEqual(
    { status: response.status, dispatches: provider.mock.callCount() },
    { status: 403, dispatches: 0 }
  );
});

test("revoked selected key rejects with REQUIRE_API_KEY disabled", async () => {
  const key = await keys.createApiKey("Revoked selector key", "test");
  await keys.revokeApiKey(key.id);
  // Revocation still applies if the active flag is later re-enabled.
  await keys.updateApiKeyPermissions(key.id, { isActive: true });

  const policy = await enforceApiKeyPolicy(mediaRequest(key.id), MODEL);
  assert.equal(policy.rejection?.status, 403);
  assert.equal(policy.apiKeyInfo, null);
});

test("selector without a dashboard session rejects and explains the login requirement", async () => {
  const key = await keys.createApiKey("Session-owned selector key", "test");
  const policy = await enforceApiKeyPolicy(mediaRequest(key.id, false), MODEL);
  assert.ok(policy.rejection);
  assert.equal(policy.rejection.status, 403);
  const { error } = await policy.rejection.json();
  assert.equal(
    error.message,
    "Testing with a selected API key requires a signed-in dashboard session"
  );
  assert.equal(policy.apiKeyInfo, null);
});

test("key removed between selection and metadata lookup rejects", async (t) => {
  const key = await keys.createApiKey("Concurrent deletion selector key", "test");
  const connection = db.getDbInstance();
  const prepare = connection.prepare.bind(connection);
  const remove = prepare("DELETE FROM api_keys WHERE id = ?");
  keys.resetApiKeyState();

  // Simulate another process deleting the key without invalidating our local cache.
  t.mock.method(connection, "prepare", (sql: string) => {
    const statement = prepare(sql);
    if (sql === "SELECT * FROM api_keys WHERE id = ?") {
      const get = statement.get.bind(statement);
      t.mock.method(statement, "get", (id: string) => {
        const selected = get(id);
        if (id === key.id) remove.run(id);
        return selected;
      });
    }
    return statement;
  });

  assert.equal((await keys.getApiKeyMetadata(key.key))?.id, key.id);
  const policy = await enforceApiKeyPolicy(mediaRequest(key.id), MODEL);
  assert.equal(policy.rejection?.status, 403);
  assert.equal(policy.apiKeyInfo, null);
});

test("storage failure in selected-key lookup rejects", async (t) => {
  const key = await keys.createApiKey("Unavailable selector storage", "test");
  const connection = db.getDbInstance();
  const prepare = connection.prepare.bind(connection);
  keys.resetApiKeyState();
  t.mock.method(connection, "prepare", (sql: string) => {
    if (sql === "SELECT * FROM api_keys WHERE id = ?") {
      throw new Error("synthetic database failure");
    }
    return prepare(sql);
  });

  const policy = await enforceApiKeyPolicy(mediaRequest(key.id), MODEL);
  assert.ok(policy.rejection);
  assert.equal(policy.rejection.status, 503);
  assert.doesNotMatch(await policy.rejection.text(), /synthetic database failure/);
});

test("valid Media selection still enforces policy and attributes the selected key", async (t) => {
  const key = await keys.createApiKey("Media gallery selector key", "test");
  const provider = stubProvider(t);

  await keys.updateApiKeyPermissions(key.id, { blockedModels: [MODEL] });
  assert.equal((await POST(mediaRequest(key.id))).status, 403);
  assert.equal(provider.mock.callCount(), 0);

  await keys.updateApiKeyPermissions(key.id, { blockedModels: [], allowedEndpoints: ["images"] });
  const response = await POST(mediaRequest(key.id));
  assert.equal(response.status, 200);
  await response.json();
  assert.equal(provider.mock.callCount(), 1);

  assert.equal(await waitForCallLogSaves(CALL_LOG_SETTLE_TIMEOUT_MS), true);
  const [logged] = await getCallLogs({ apiKey: key.id, limit: 1 });
  assert.equal(logged?.apiKeyId, key.id);
  assert.equal(logged.apiKeyName, key.name);
});
