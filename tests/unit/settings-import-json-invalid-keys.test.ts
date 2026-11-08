/**
 * `POST /api/settings/import-json` must validate each imported settings key with the same schema
 * as `PATCH /api/settings`. A key whose value fails validation is dropped and named in the answer
 * (`ignoredKeys`), so one bad value cannot poison the stored settings. The other keys still import.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-import-invalid-keys-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.OMNIROUTE_DISABLE_REDIS_AUTH_CACHE = "1";
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../src/lib/db/core.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const importJsonRoute = await import("../../src/app/api/settings/import-json/route.ts");

test.beforeEach(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

async function importSettings(settings: Record<string, unknown>) {
  const response = await importJsonRoute.POST(
    new Request("http://localhost:20128/api/settings/import-json", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ settings }),
    })
  );
  assert.equal(response.status, 200, await response.clone().text());
  return (await response.json()) as Record<string, unknown>;
}

test("import-json drops a key whose value fails the settings schema and names it", async () => {
  const body = await importSettings({
    hidePaidModels: "yes", // schema: boolean
    requestRetry: 99, // schema: integer 0..10
    showQuickStartOnHome: false,
  });

  assert.deepEqual(body.ignoredKeys, ["hidePaidModels", "requestRetry"]);
  const stored = (await settingsDb.getSettings()) as Record<string, unknown>;
  assert.notEqual(stored.hidePaidModels, "yes", "the invalid value is not stored");
  assert.notEqual(stored.requestRetry, 99, "the invalid value is not stored");
  assert.equal(stored.showQuickStartOnHome, false, "valid keys still import");
  assert.equal(JSON.stringify(body).includes("yes"), false, "values are never echoed back");
});

test("import-json adds no ignoredKeys field when every key is valid", async () => {
  const body = await importSettings({ hidePaidModels: true, showQuickStartOnHome: false });
  assert.equal("ignoredKeys" in body, false);
  const stored = (await settingsDb.getSettings()) as Record<string, unknown>;
  assert.equal(stored.hidePaidModels, true);
});

test("import-json keeps keys outside the PATCH schema that other routes write", async () => {
  const body = await importSettings({ tailscaleUrl: "https://example.ts.net", hidePaidModels: 1 });
  assert.deepEqual(body.ignoredKeys, ["hidePaidModels"]);
  const stored = (await settingsDb.getSettings()) as Record<string, unknown>;
  assert.equal(stored.tailscaleUrl, "https://example.ts.net");
});
