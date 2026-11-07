import test from "node:test";
import assert from "node:assert/strict";
import os from "node:os";
import path from "node:path";
import fs from "node:fs";

// Isolate the DB so `getSettings()` reads defaults from a clean store.
const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "quota-alerts-schema-"));
process.env.DATA_DIR = dataDir;

const { updateSettingsSchema } = await import("../../src/shared/validation/settingsSchemas.ts");
const { getSettings } = await import("../../src/lib/db/settings.ts");
const core = await import("../../src/lib/db/core.ts");

test.after(() => {
  const instance = core.getDbInstance() as unknown as { close?: () => void };
  instance?.close?.();
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
});

const schema = updateSettingsSchema;

function accepts(value: unknown) {
  return schema.safeParse({ codexQuotaAlerts: value }).success;
}

test("the setting is off by default", async () => {
  const settings = await getSettings();
  assert.equal(settings.codexQuotaAlerts?.enabled, false);
});

test("accepts an explicit enable/disable", () => {
  assert.equal(accepts({ enabled: true }), true);
  assert.equal(accepts({ enabled: false }), true);
});

test("accepts an omitted enabled flag (partial PATCH)", () => {
  assert.equal(accepts({}), true);
});

test("rejects a malformed value instead of silently dropping the PATCH", () => {
  // A silently-dropped PATCH would leave the operator believing alerts are on.
  assert.equal(accepts({ enabled: "yes" }), false);
  assert.equal(accepts({ enabled: 1 }), false);
  assert.equal(accepts({ enabled: null }), false);
});
