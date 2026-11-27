import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-20615-"));
process.env.DATA_DIR = DIR;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../src/lib/db/core.ts");
const databaseSettings = await import("../../src/lib/db/databaseSettings.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(DIR, { recursive: true, force: true });
});

test("#20615: getDatabaseSettings() must not run per-table COUNT(*) / dbstat scans", () => {
  const db = core.getDbInstance() as unknown as {
    prepare: (sql: string) => unknown;
  };
  const original = db.prepare.bind(db);
  const scans: string[] = [];
  db.prepare = (sql: string) => {
    if (/COUNT\(\*\)\s+as\s+count\s+FROM\s+"/i.test(sql) || /FROM\s+dbstat/i.test(sql)) {
      scans.push(sql.replace(/\s+/g, " ").trim());
    }
    return (original as (s: string) => unknown)(sql);
  };
  let settings;
  try {
    settings = databaseSettings.getDatabaseSettings();
  } finally {
    db.prepare = original;
  }
  assert.equal(scans.length, 0, `ran ${scans.length} scans, e.g. ${scans.slice(0, 2).join(" | ")}`);
  assert.ok(settings.stats.databaseSizeBytes > 0);
  assert.ok(settings.stats.pageCount > 0);
});
