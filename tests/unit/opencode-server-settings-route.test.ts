import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { makeManagementSessionRequest } from "../helpers/managementSession.ts";

// PATCH /api/settings must reject an invalid opencode server URL before anything
// is written: the saved URL reaches the executor through applyRuntimeSettings().
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-opencode-settings-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const settingsRoute = await import("../../src/app/api/settings/route.ts");

test.beforeEach(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  delete process.env.INITIAL_PASSWORD;
});
test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

type Stored = { opencode_server_url?: string; hideAutoCombos?: boolean };

test("PATCH /api/settings rejects a private opencode server URL without saving the request", async () => {
  const before = (await settingsDb.getSettings()) as unknown as Stored;
  assert.equal(before.hideAutoCombos, false);

  const response = await settingsRoute.PATCH(
    await makeManagementSessionRequest("http://localhost/api/settings", {
      method: "PATCH",
      body: { opencode_server_url: "http://10.0.0.5:4096", hideAutoCombos: true },
    })
  );
  assert.equal(response.status, 400);
  const payload = (await response.json()) as { error?: unknown };
  assert.match(String(payload.error), /Invalid opencode server URL/);

  const after = (await settingsDb.getSettings()) as unknown as Stored;
  assert.notEqual(after.opencode_server_url, "http://10.0.0.5:4096");
  assert.equal(after.hideAutoCombos, false, "no key of a rejected request is persisted");
});

test("PATCH /api/settings saves a loopback opencode server URL", async () => {
  const response = await settingsRoute.PATCH(
    await makeManagementSessionRequest("http://localhost/api/settings", {
      method: "PATCH",
      body: { opencode_server_url: "http://127.0.0.1:4096" },
    })
  );
  assert.equal(response.status, 200);
  const after = (await settingsDb.getSettings()) as unknown as Stored;
  assert.equal(after.opencode_server_url, "http://127.0.0.1:4096");
});
