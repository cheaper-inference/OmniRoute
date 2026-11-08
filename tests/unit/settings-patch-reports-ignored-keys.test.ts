import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { makeManagementSessionRequest } from "../helpers/managementSession.ts";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-settings-ignored-keys-"));
process.env.DATA_DIR = dataDir;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
delete process.env.INITIAL_PASSWORD;

const core = await import("../../src/lib/db/core.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const settingsRoute = await import("../../src/app/api/settings/route.ts");
const { updateSettingsSchema } = await import("../../src/shared/validation/settingsSchemas.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

async function patch(body: Record<string, unknown>) {
  const response = await settingsRoute.PATCH(
    await makeManagementSessionRequest("http://localhost/api/settings", { method: "PATCH", body })
  );
  assert.equal(response.status, 200);
  return (await response.json()) as Record<string, unknown>;
}

test("PATCH names the keys it dropped and still saves the known ones", async () => {
  const body = await patch({
    hidePaidModels: true,
    hideAutoComboz: true, // typo of a real key
    someFutureSetting: { nested: 1 },
  });

  assert.deepEqual(body.ignoredKeys, ["hideAutoComboz", "someFutureSetting"]);
  const stored = (await settingsDb.getSettings()) as Record<string, unknown>;
  assert.equal(stored.hidePaidModels, true, "known keys still persist");
  assert.equal(stored.hideAutoComboz, undefined, "unknown keys are still not stored");
  assert.equal(JSON.stringify(body).includes('"nested"'), false, "values are never echoed back");
});

test("PATCH with only known keys adds no ignoredKeys field", async () => {
  const body = await patch({ hidePaidModels: false });
  assert.equal("ignoredKeys" in body, false);
});

test("the password and revision fields are known keys, not reported as ignored", async () => {
  const body = await patch({ hidePaidModels: true, expectedRevision: undefined });
  assert.equal("ignoredKeys" in body, false);
});

// Keys that getSettings() returns but that dedicated routes write, so PATCH /api/settings
// strips them on purpose. Any other key must be in updateSettingsSchema, or PATCH answers 200
// and drops it (the #13562 / #13800 / #4852 bug class). Add a new key to the schema, not here.
const WRITTEN_BY_OTHER_ROUTES = [
  "cloudEnabled", // cloud sync routes
  "tailscaleEnabled", // tailscale tunnel enable/disable
  "tailscaleUrl", // tailscale tunnel enable/disable
  "idempotencyWindowMs", // /api/settings/cache-config
  "autoDisableBannedScope", // /api/settings/auto-disable-accounts
  "cliVersionOverrides", // runtime settings
  "call_log_pipeline_enabled", // database settings
];

test("every key getSettings() returns is accepted by PATCH or written by another route", async () => {
  const emitted = Object.keys(await settingsDb.getSettings());
  const accepted = new Set(Object.keys(updateSettingsSchema.shape));
  const missing = emitted.filter(
    (key) => !accepted.has(key) && !WRITTEN_BY_OTHER_ROUTES.includes(key)
  );
  assert.deepEqual(missing, [], "add these keys to updateSettingsSchema");
  for (const key of WRITTEN_BY_OTHER_ROUTES) {
    assert.equal(accepted.has(key), false, `${key} is in the schema now: drop it from the list`);
  }
});
