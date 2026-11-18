/**
 * #18603 — the Cursor login poll route must hand the machine id to syncToCloud().
 *
 * The route used to call syncToCloud() bare, so the cloud sync went out to
 * `${CLOUD_URL}/sync/undefined` and failed silently (the helper swallows errors).
 * mock.module() is not usable under this tsx/ESM runner, so the test drives the real
 * route with a stubbed global fetch and inspects the URL of the cloud sync request.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omni-cursor-poll-sync-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "cursor-poll-sync-api-key-secret";
process.env.JWT_SECRET = "cursor-poll-sync-jwt-secret";
// cloudSync.ts reads CLOUD_URL once at import time, so set it before the imports below.
process.env.CLOUD_URL = "https://cloud.example.test";

const core = await import("../../src/lib/db/core.ts");
const { updateSettings } = await import("../../src/lib/db/settings.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const { getConsistentMachineId } = await import("../../src/shared/utils/machineId.ts");
const cursorLogin = await import("../../src/lib/oauth/services/cursorLogin.ts");
const cursorPollRoute = await import("../../src/app/api/oauth/cursor/login/poll/route.ts");

const originalFetch = globalThis.fetch;
let syncUrls: string[] = [];

await updateSettings({
  requireLogin: true,
  password: "configured-password-hash",
  cloudEnabled: true,
});
const manageKey = await apiKeysDb.createApiKey("manage", "machine1234567890", ["manage"]);

test.beforeEach(() => {
  syncUrls = [];
  cursorLogin.clearCursorLoginSessions();
  globalThis.fetch = (async (input: RequestInfo | URL) => {
    const url = String(input instanceof Request ? input.url : input);
    if (url.startsWith("https://api2.cursor.sh/auth/poll")) {
      return Response.json({ accessToken: "cursor-access-token", refreshToken: "cursor-refresh" });
    }
    if (url.startsWith("https://cloud.example.test/sync/")) {
      syncUrls.push(url);
      return new Response("{}", { status: 500 });
    }
    return new Response("{}", { status: 404 });
  }) as typeof fetch;
});

test.afterEach(() => {
  globalThis.fetch = originalFetch;
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("a successful Cursor login syncs to the cloud under the real machine id", async () => {
  const { sessionId } = cursorLogin.createCursorLoginSession({
    verifier: "verifier",
    challenge: "challenge",
    uuid: "uuid-18603",
    loginUrl: "https://cursor.com/loginDeepControl",
  });

  const response = await cursorPollRoute.POST(
    new Request("http://omniroute.example/api/oauth/cursor/login/poll", {
      method: "POST",
      headers: { authorization: `Bearer ${manageKey.key}`, "content-type": "application/json" },
      body: JSON.stringify({ sessionId }),
    })
  );
  assert.equal(response.status, 200);

  const machineId = await getConsistentMachineId();
  assert.ok(machineId && machineId !== "undefined");
  assert.deepEqual(syncUrls, [`https://cloud.example.test/sync/${machineId}`]);
});
