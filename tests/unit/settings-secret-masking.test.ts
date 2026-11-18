/**
 * Management read endpoints must not hand stored credentials back to the caller.
 *
 * - GET /api/settings (and the PATCH response) returns a fixed mask for every stored secret
 *   setting instead of its value; an unset secret stays empty so the dashboard can tell
 *   "configured" from "not configured".
 * - A PATCH that sends the mask back unchanged keeps the stored secret.
 * - GET /api/version-manager/status does not serialize the service API/management keys.
 * - GET /api/services/9router/status?reveal=key needs a real management credential even when
 *   login is disabled; the confirmation header alone is not enough.
 *
 * Run with:
 *   node --import tsx/esm --test tests/unit/settings-secret-masking.test.ts
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { makeManagementSessionRequest } from "../helpers/managementSession.ts";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-settings-secret-mask-"));
process.env.DATA_DIR = dataDir;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
process.env.API_KEY_SECRET = "settings-secret-mask-api-key-secret";
process.env.JWT_SECRET = "settings-secret-mask-jwt-secret";
delete process.env.INITIAL_PASSWORD;

const core = await import("../../src/lib/db/core.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const versionManagerDb = await import("../../src/lib/db/versionManager.ts");
const settingsRoute = await import("../../src/app/api/settings/route.ts");
const versionStatusRoute = await import("../../src/app/api/version-manager/status/route.ts");
const nineRouterStatusRoute = await import("../../src/app/api/services/9router/status/route.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

const MASK = "********";
const SECRETS = {
  oidcClientSecret: "oidc-client-secret-value-1234",
  entraGraphClientSecret: "entra-graph-secret-value-5678",
  skillsmpApiKey: "skillsmp-marketplace-key-9012",
  cliproxyapi_api_key: "cliproxyapi-dedicated-key-3456",
  qdrantApiKey: "qdrant-api-key-value-7890",
  ngrokAuthToken: "ngrok-authtoken-value-2468",
} as const;
// The keys PATCH /api/settings accepts; the others are written by dedicated routes.
const PATCHABLE = [
  "oidcClientSecret",
  "entraGraphClientSecret",
  "skillsmpApiKey",
  "cliproxyapi_api_key",
] as const;

test.beforeEach(async () => {
  await settingsDb.updateSettings({ requireLogin: false, setupComplete: true, ...SECRETS });
});

async function getSettingsBody(): Promise<{ text: string; body: Record<string, unknown> }> {
  const response = await settingsRoute.GET(
    await makeManagementSessionRequest("http://localhost/api/settings")
  );
  assert.equal(response.status, 200);
  const text = await response.text();
  return { text, body: JSON.parse(text) as Record<string, unknown> };
}

test("GET /api/settings masks every stored secret setting", async () => {
  const { text, body } = await getSettingsBody();
  for (const [key, value] of Object.entries(SECRETS)) {
    assert.equal(text.includes(value), false, `${key} value must not appear in the response`);
    assert.equal(body[key], MASK, `${key} is reported as configured`);
  }
});

test("GET /api/settings keeps an unset secret empty", async () => {
  await settingsDb.updateSettings({ oidcClientSecret: "", skillsmpApiKey: "" });
  const { body } = await getSettingsBody();
  assert.equal(body.oidcClientSecret, "");
  assert.equal(body.skillsmpApiKey, "");
  assert.equal(body.entraGraphClientSecret, MASK);
});

test("PATCH with the masked value keeps the stored secret and masks the response", async () => {
  const response = await settingsRoute.PATCH(
    await makeManagementSessionRequest("http://localhost/api/settings", {
      method: "PATCH",
      body: Object.fromEntries(PATCHABLE.map((key) => [key, MASK])),
    })
  );
  const text = await response.text();
  assert.equal(response.status, 200, text);
  const stored = (await settingsDb.getSettings()) as Record<string, unknown>;
  for (const key of PATCHABLE) {
    assert.equal(stored[key], SECRETS[key], `${key} must keep its stored value`);
    assert.equal(text.includes(SECRETS[key]), false, `${key} value must not be echoed`);
  }
  const body = JSON.parse(text) as Record<string, unknown>;
  assert.equal(body.oidcClientSecret, MASK);
  assert.equal("ignoredKeys" in body, false, "an unchanged secret is not an ignored key");
});

test("PATCH with a new value still replaces the secret", async () => {
  const response = await settingsRoute.PATCH(
    await makeManagementSessionRequest("http://localhost/api/settings", {
      method: "PATCH",
      body: { skillsmpApiKey: "replacement-marketplace-key" },
    })
  );
  assert.equal(response.status, 200);
  const stored = (await settingsDb.getSettings()) as Record<string, unknown>;
  assert.equal(stored.skillsmpApiKey, "replacement-marketplace-key");
});

test("GET /api/version-manager/status does not serialize the service keys", async () => {
  await versionManagerDb.upsertVersionManagerTool({
    tool: "cliproxyapi",
    status: "stopped",
    apiKey: "version-manager-api-key-secret",
    managementKey: "version-manager-management-key-secret",
  });
  const response = await versionStatusRoute.GET(
    await makeManagementSessionRequest("http://localhost/api/version-manager/status")
  );
  assert.equal(response.status, 200);
  const text = await response.text();
  assert.equal(text.includes("version-manager-api-key-secret"), false);
  assert.equal(text.includes("version-manager-management-key-secret"), false);
  const entry = (JSON.parse(text) as Array<Record<string, unknown>>).find(
    (row) => row.tool === "cliproxyapi"
  );
  assert.ok(entry, "the tool row is still reported");
  assert.equal(entry.status, "stopped");
});

test("9router reveal needs a management credential even with login disabled", async () => {
  await versionManagerDb.upsertVersionManagerTool({ tool: "9router", status: "stopped" });
  const url = "http://localhost/api/services/9router/status?reveal=key";

  const anonymous = await nineRouterStatusRoute.GET(
    new Request(url, { headers: { "X-Reveal-Confirm": "yes" } })
  );
  const anonymousText = await anonymous.text();
  assert.equal(anonymous.status, 401, anonymousText);
  assert.equal(anonymousText.includes("apiKeyPlain"), false);

  const signedIn = await nineRouterStatusRoute.GET(
    await makeManagementSessionRequest(url, { headers: { "X-Reveal-Confirm": "yes" } })
  );
  assert.equal(signedIn.status, 200);
  const body = (await signedIn.json()) as Record<string, unknown>;
  assert.equal(typeof body.apiKeyPlain, "string");
});
