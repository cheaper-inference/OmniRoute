import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-audit-redact-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const compliance = await import("../../src/lib/compliance/index.ts");

// Built at run time: the value only has to be recognisable, it is not a credential.
const SECRET = ["not", "a", "real", "secret", "value"].join("-");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function rawRow(action: string) {
  return core
    .getDbInstance()
    .prepare("SELECT details, metadata FROM audit_log WHERE action = ?")
    .get(action) as { details: string | null; metadata: string | null };
}

test("a pre-serialized JSON string cannot smuggle a secret into the stored row", () => {
  compliance.logAuditEvent({
    action: "t.string-details",
    details: JSON.stringify({ name: "n", apiKey: SECRET, nested: { password: SECRET } }),
  });
  const row = rawRow("t.string-details");
  assert.equal(String(row.details).includes(SECRET), false, "details column");
  assert.equal(String(row.metadata).includes(SECRET), false, "metadata column");
  const entry = compliance.getAuditLog({ action: "t.string-details" })[0];
  assert.deepEqual(entry.details, {
    name: "n",
    apiKey: "[redacted]",
    nested: { password: "[redacted]" },
  });
});

test("rows stored before redaction existed are redacted when read", () => {
  compliance.initAuditLog();
  core
    .getDbInstance()
    .prepare(
      "INSERT INTO audit_log (action, actor, details, metadata) VALUES ('t.legacy', 'admin', ?, ?)"
    )
    .run(JSON.stringify({ token: SECRET, keep: 1 }), JSON.stringify({ clientSecret: SECRET }));
  const entry = compliance.getAuditLog({ action: "t.legacy" })[0];
  assert.deepEqual(entry.details, { token: "[redacted]", keep: 1 });
  assert.deepEqual(entry.metadata, { clientSecret: "[redacted]" });
});

test("plain text details and object details keep their current shape", () => {
  compliance.logAuditEvent({ action: "t.text", details: "manual note" });
  compliance.logAuditEvent({ action: "t.object", details: { changed: ["theme"], apiKey: SECRET } });
  assert.equal(compliance.getAuditLog({ action: "t.text" })[0].details, "manual note");
  assert.deepEqual(compliance.getAuditLog({ action: "t.object" })[0].details, {
    changed: ["theme"],
    apiKey: "[redacted]",
  });
});
