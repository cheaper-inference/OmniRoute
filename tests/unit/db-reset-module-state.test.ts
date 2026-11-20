// TDD — 6A.1 triage of compression-preview-auth.test.ts orphan (503 instead of 403).
// Root cause: resetDbInstance()/closeDbInstance() did NOT trigger the resetters
// registry stateReset.ts (only backup.ts restore triggered). Stateful modules
// tied to the connection (e.g.: apiKeys.ts `_schemaChecked` + prepared statements)
// kept pointing to the old schema/connection: after a second reset with DB
// recreated from scratch, ensureApiKeysColumns was skipped (process memo) and the
// re-prepare explodia com "no such column: is_active" → 503 em vez de 403.
// The same path reaches production via restore of old DB without fallback columns.
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-db-reset-state-"));
const originalDataDir = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const { isValidApiKey } = await import("../../src/sse/services/auth.ts");

async function recreateDataDirFromScratch(): Promise<void> {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  // Primeiro acesso recria o DB do zero (migrations + colunas-fallback).
  await settingsDb.updateSettings({ requireLogin: true, setupComplete: true });
}

test("api-key validation survives a second resetDbInstance with a recreated DB (module state resetters fire)", async () => {
  await recreateDataDirFromScratch();
  assert.equal(await isValidApiKey("not-a-real-key"), false);

  // Second cycle: without wiring resetDbInstance→resetAllDbModuleState, the memo
  // apiKeys.ts schema survives reset and prepare throws "no such column".
  await recreateDataDirFromScratch();
  assert.equal(await isValidApiKey("not-a-real-key"), false);
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  if (originalDataDir === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = originalDataDir;
});
