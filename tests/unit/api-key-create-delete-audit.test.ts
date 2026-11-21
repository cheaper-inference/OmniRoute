// API key create and delete must each leave one audit row (action, target id, no key value).
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-key-audit-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "a".repeat(64);

const core = await import("../../src/lib/db/core.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const compliance = await import("../../src/lib/compliance/index.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("creating and deleting an API key each write one audit row without the key value", async () => {
  const created = await apiKeysDb.createApiKey("audited-key", "machine1234567890");
  const createRows = compliance.getAuditLog({ action: "apiKey.create" });
  assert.equal(createRows.length, 1);
  assert.equal(createRows[0].target, created.id);
  assert.equal(
    JSON.stringify(createRows[0]).includes(created.key),
    false,
    "key value must not be logged"
  );

  assert.equal(await apiKeysDb.deleteApiKey(created.id), true);
  const deleteRows = compliance.getAuditLog({ action: "apiKey.delete" });
  assert.equal(deleteRows.length, 1);
  assert.equal(deleteRows[0].target, created.id);
  assert.deepEqual(deleteRows[0].details, { name: "audited-key" });
});

test("deleting a key that does not exist writes no audit row", async () => {
  const before = compliance.getAuditLog({ action: "apiKey.delete" }).length;
  assert.equal(await apiKeysDb.deleteApiKey("missing-id"), false);
  assert.equal(compliance.getAuditLog({ action: "apiKey.delete" }).length, before);
});
