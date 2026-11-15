import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(
  path.join(os.tmpdir(), "omniroute-sync-models-management-auth-")
);
process.env.DATA_DIR = TEST_DATA_DIR;
if (!process.env.API_KEY_SECRET) {
  process.env.API_KEY_SECRET = "test-sync-auth-secret-" + Date.now();
}

const core = await import("../../src/lib/db/core.ts");
const { updateSettings } = await import("@/lib/db/settings");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const modelSyncRoute = await import("../../src/app/api/providers/[id]/sync-models/route.ts");

async function resetStorage() {
  delete process.env.INITIAL_PASSWORD;
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.after(() => {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

async function enableAuth() {
  process.env.INITIAL_PASSWORD = "bootstrap-password";
  await updateSettings({ requireLogin: true, password: "" });
}

test("model sync route accepts validated management subjects (management_key / local-cli-token)", async () => {
  await resetStorage();
  await enableAuth();

  const response = await modelSyncRoute.POST(
    new Request("http://localhost/api/providers/non-existent-id/sync-models", {
      method: "POST",
      headers: {
        "x-omniroute-auth-kind": "management_key",
        "x-omniroute-auth-label": "local-cli-token",
      },
    }),
    { params: Promise.resolve({ id: "non-existent-id" }) }
  );

  // Authentication passes, reaches connection lookup which returns 404
  assert.equal(response.status, 404);
  assert.deepEqual(await response.json(), { error: "Connection not found" });
});

test("model sync route accepts API key with manage scope and rejects inference-only key with 403", async () => {
  await resetStorage();
  await enableAuth();

  const manageKey = await apiKeysDb.createApiKey("Manage Key", "machine-manage", ["manage"]);
  const inferenceKey = await apiKeysDb.createApiKey("Inference Key", "machine-inference", ["chat"]);

  // Inference-only key is rejected with 403
  const forbiddenRes = await modelSyncRoute.POST(
    new Request("http://localhost/api/providers/non-existent-id/sync-models", {
      method: "POST",
      headers: {
        authorization: `Bearer ${inferenceKey.key}`,
      },
    }),
    { params: Promise.resolve({ id: "non-existent-id" }) }
  );
  assert.equal(forbiddenRes.status, 403);
  const forbiddenBody = (await forbiddenRes.json()) as {
    error: { message: string; type: string };
  };
  assert.equal(forbiddenBody.error.type, "invalid_request");
  assert.ok(forbiddenBody.error.message.includes("lacks 'manage' scope"));

  // Manage-scoped key passes auth and reaches connection lookup (404)
  const allowedRes = await modelSyncRoute.POST(
    new Request("http://localhost/api/providers/non-existent-id/sync-models", {
      method: "POST",
      headers: {
        authorization: `Bearer ${manageKey.key}`,
      },
    }),
    { params: Promise.resolve({ id: "non-existent-id" }) }
  );
  assert.equal(allowedRes.status, 404);
  assert.deepEqual(await allowedRes.json(), { error: "Connection not found" });
});
