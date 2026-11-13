import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// The merged release/v3.8.54 base (bf8a11df) ends at 238_codex_connection_fences.
// Bootstrap its real migration files, not a hand-written approximation of its schema.
const scratch = fs.mkdtempSync(path.join(os.tmpdir(), "truthful-migration-upgrade-"));
const migrations = path.join(scratch, "migrations");
const data = path.join(scratch, "data");
fs.mkdirSync(migrations);
process.env.DATA_DIR = data;
process.env.OMNIROUTE_MIGRATIONS_DIR = migrations;
const source = new URL("../../../src/lib/db/migrations/", import.meta.url);
for (const filename of fs.readdirSync(source)) {
  if (
    /^\d+_.*\.sql$/.test(filename) &&
    Number(filename.split("_")[0]) <= 238 &&
    !filename.includes("truthful_usage_evidence")
  ) {
    fs.copyFileSync(new URL(filename, source), path.join(migrations, filename));
  }
}
const core = await import("../../../src/lib/db/core.ts");
const { runMigrations } = await import("../../../src/lib/db/migrationRunner.ts");
const evidenceFile = "239_truthful_usage_evidence.sql";
const dailyFile = "240_daily_usage_evidence.sql";
const evidence = JSON.stringify({ input: { source: "estimated", method: "fixture" } });

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(scratch, { recursive: true, force: true });
});

for (const lineage of [
  "release-base",
  "partial-columns",
  "preexisting-columns",
  "published-pr",
] as const) {
  test(`truthful usage upgrade from ${lineage} preserves data and is idempotent`, () => {
    core.resetDbInstance();
    fs.rmSync(data, { recursive: true, force: true });
    fs.mkdirSync(data, { recursive: true });
    for (const filename of [evidenceFile, dailyFile])
      fs.rmSync(path.join(migrations, filename), { force: true });
    const db = core.getDbInstance();
    assert.deepEqual(
      db.prepare("SELECT version,name FROM _omniroute_migrations WHERE version >= '238'").all(),
      [{ version: "238", name: "codex_connection_fences" }]
    );
    db.prepare(
      "INSERT INTO usage_history(provider,model,tokens_cache_read,tokens_cache_creation,timestamp) VALUES ('synthetic','fixture',0,NULL,'2026-01-01')"
    ).run();
    db.prepare(
      "INSERT INTO daily_usage_summary(provider,model,date,total_requests) VALUES ('synthetic','fixture','2026-01-01',1)"
    ).run();
    const evidenceSql = fs.readFileSync(new URL(evidenceFile, source), "utf8");
    const dailySql = fs.readFileSync(new URL(dailyFile, source), "utf8");
    const hasPriorEvidence = lineage === "preexisting-columns" || lineage === "published-pr";
    if (lineage === "partial-columns")
      db.exec("ALTER TABLE call_logs ADD COLUMN usage_evidence TEXT");
    if (hasPriorEvidence) {
      db.exec(evidenceSql);
      db.exec(dailySql);
      db.prepare("UPDATE usage_history SET usage_evidence=?,usage_provenance='estimated'").run(
        evidence
      );
      db.exec(
        "UPDATE daily_usage_summary SET estimated_requests=1,unknown_evidence_requests=0,cached_input_unknown_requests=1"
      );
    }
    if (lineage === "published-pr") {
      // Previous published PR head used slots 238/239 before upstream claimed 238.
      db.exec(
        "DELETE FROM _omniroute_migrations WHERE version='238'; DROP TABLE codex_connection_fences;"
      );
      db.prepare("INSERT INTO _omniroute_migrations(version,name) VALUES (?,?)").run(
        "238",
        "truthful_usage_evidence"
      );
      db.prepare("INSERT INTO _omniroute_migrations(version,name) VALUES (?,?)").run(
        "239",
        "daily_usage_evidence"
      );
    }
    for (const filename of [evidenceFile, dailyFile])
      fs.copyFileSync(new URL(filename, source), path.join(migrations, filename));
    assert.equal(runMigrations(db), lineage === "published-pr" ? 1 : 2);
    assert.deepEqual(
      db
        .prepare(
          "SELECT version,name FROM _omniroute_migrations WHERE version >= '238' ORDER BY version"
        )
        .all(),
      [
        { version: "238", name: "codex_connection_fences" },
        { version: "239", name: "truthful_usage_evidence" },
        { version: "240", name: "daily_usage_evidence" },
      ]
    );
    assert.ok(
      db
        .prepare(
          "SELECT name FROM sqlite_master WHERE type='table' AND name='codex_connection_fences'"
        )
        .get()
    );
    const row = db
      .prepare("SELECT tokens_cache_read,tokens_cache_creation,usage_evidence FROM usage_history")
      .get();
    assert.deepEqual(row, {
      tokens_cache_read: 0,
      tokens_cache_creation: null,
      usage_evidence: hasPriorEvidence ? evidence : null,
    });
    const daily = db
      .prepare(
        "SELECT estimated_requests,unknown_evidence_requests,cached_input_unknown_requests FROM daily_usage_summary"
      )
      .get();
    assert.deepEqual(
      daily,
      hasPriorEvidence
        ? { estimated_requests: 1, unknown_evidence_requests: 0, cached_input_unknown_requests: 1 }
        : {
            estimated_requests: null,
            unknown_evidence_requests: null,
            cached_input_unknown_requests: null,
          }
    );
    assert.equal(runMigrations(db), 0);
  });
}
