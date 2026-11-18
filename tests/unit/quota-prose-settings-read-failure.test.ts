/**
 * recordCoreOwnedAntigravityQuotaState reads the model-lockout settings before it records the
 * lock. When that read fails, the lock must still be recorded with the resolver defaults
 * instead of the whole helper rejecting and losing the 429's quota state.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const scratch = fs.mkdtempSync(path.join(os.tmpdir(), "quota-prose-settings-"));
const dataDir = path.join(scratch, "data");
const originalDataDir = process.env.DATA_DIR;
process.env.DATA_DIR = dataDir;

const { recordCoreOwnedAntigravityQuotaState, getModelLockoutInfo, getProviderProfile } =
  await import("../../open-sse/services/accountFallback.ts");

// Lock the data directory before the database is first opened, so the settings read rejects.
fs.mkdirSync(dataDir, { recursive: true });
fs.chmodSync(dataDir, 0o000);

test.after(() => {
  fs.chmodSync(dataDir, 0o700);
  if (originalDataDir === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = originalDataDir;
  fs.rmSync(scratch, { recursive: true, force: true });
});

test("a settings read failure still records the quota lock", async () => {
  const { getCachedSettings } = await import("../../src/lib/db/readCache.ts");
  await assert.rejects(getCachedSettings(), "the fixture must make the settings read fail");

  await recordCoreOwnedAntigravityQuotaState({
    provider: "antigravity",
    connectionId: "conn-settings-down",
    model: "gemini-3.8-flash",
    status: 429,
    errorText:
      "[429]: Individual quota reached. Contact your administrator to enable overages. Resets in 5h.",
    headers: null,
    profileOverride: getProviderProfile("antigravity"),
  });

  const info = getModelLockoutInfo("antigravity", "conn-settings-down", "gemini-3.8-flash");
  assert.ok(info, "the quota lock must be recorded");
  assert.ok(info.remainingMs > 0);
});
