import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const folder = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-billing-"));
process.env.DATA_DIR = folder;
process.env.STORAGE_ENCRYPTION_KEY = "billing-test-encryption-key-not-a-real-secret";
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
const core = await import("../../src/lib/db/core.ts");
const billing = await import("../../src/lib/db/openaiBilling.ts");
test.after(() => {
  core.resetDbInstance();
  fs.rmSync(folder, { recursive: true, force: true });
});

test("encrypts Admin keys, replaces the same organization and never writes request costs", () => {
  const db = core.getDbInstance();
  const before = db.prepare("SELECT COUNT(*) AS n FROM request_cost_ledger").get();
  billing.saveOpenAIBillingKey("org-test", "test-admin-key-one");
  const row = db
    .prepare("SELECT value FROM key_value WHERE namespace = 'openai-billing' AND key = 'org-test'")
    .get() as { value: string };
  assert.ok(row.value.includes("enc:v1:"));
  assert.ok(!row.value.includes("test-admin-key-one"));
  billing.saveOpenAIBillingKey("org-test", "test-admin-key-two");
  assert.deepEqual(billing.listOpenAIBillingOrganizations(), ["org-test"]);
  assert.equal(billing.getOpenAIBillingKey("org-test"), "test-admin-key-two");
  assert.deepEqual(db.prepare("SELECT COUNT(*) AS n FROM request_cost_ledger").get(), before);
  billing.deleteOpenAIBillingKey("org-test");
  assert.equal(billing.getOpenAIBillingKey("org-test"), null);
});
