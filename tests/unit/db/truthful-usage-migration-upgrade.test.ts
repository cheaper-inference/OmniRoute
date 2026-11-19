import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// Upgrades into the two timestamped evidence migrations, bootstrapped from the real migration
// files (not a hand-written approximation of the schema). The old 001-241 series is frozen;
// builds of #20054 ran the same SQL as 238/239 (earlier heads) and then 239/240, slots that
// now hold canonical base migrations. RENAMED_MIGRATION_COMPATIBILITY moves those rows.
const scratch = fs.mkdtempSync(path.join(os.tmpdir(), "truthful-migration-upgrade-"));
const migrations = path.join(scratch, "migrations");
const data = path.join(scratch, "data");
fs.mkdirSync(migrations);
process.env.DATA_DIR = data;
process.env.OMNIROUTE_MIGRATIONS_DIR = migrations;
const source = new URL("../../../src/lib/db/migrations/", import.meta.url);
const evidenceFile = "20261115112344_truthful_usage_evidence.sql";
const dailyFile = "20261115112345_daily_usage_evidence.sql";
const legacy = fs.readdirSync(source).filter((f) => /^\d{3}_.*\.sql$/.test(f));

/** Leave exactly the legacy files up to `max` (and, when asked, the two evidence files). */
function stage(max: number, withEvidence: boolean) {
  for (const f of fs.readdirSync(migrations)) fs.rmSync(path.join(migrations, f));
  for (const f of legacy) {
    if (Number(f.slice(0, 3)) <= max) fs.copyFileSync(new URL(f, source), path.join(migrations, f));
  }
  if (withEvidence) {
    for (const f of [evidenceFile, dailyFile])
      fs.copyFileSync(new URL(f, source), path.join(migrations, f));
  }
}

const core = await import("../../../src/lib/db/core.ts");
const { runMigrations } = await import("../../../src/lib/db/migrationRunner.ts");
const evidence = JSON.stringify({ input: { source: "estimated", method: "fixture" } });
const byNumber = "CAST(version AS INTEGER)";

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(scratch, { recursive: true, force: true });
});

// bootMax: the newest legacy migration the database ran before the upgrade.
// prRows: the ledger rows a build of the PR left (with its SQL already applied).
const lineages = [
  { name: "release-base", bootMax: 241, prRows: null, applied: 2 },
  { name: "partial-columns", bootMax: 241, prRows: null, applied: 2 },
  { name: "preexisting-columns", bootMax: 241, prRows: null, applied: 2 },
  { name: "published-pr-238-239", bootMax: 237, prRows: ["238", "239"], applied: 4 },
  { name: "published-pr-239-240", bootMax: 238, prRows: ["239", "240"], applied: 3 },
] as const;

for (const lineage of lineages) {
  test(`truthful usage upgrade from ${lineage.name} preserves data and is idempotent`, () => {
    core.resetDbInstance();
    fs.rmSync(data, { recursive: true, force: true });
    fs.mkdirSync(data, { recursive: true });
    stage(lineage.bootMax, false);
    const db = core.getDbInstance();
    assert.deepEqual(
      db.prepare(`SELECT MAX(${byNumber}) AS top FROM _omniroute_migrations`).get(),
      { top: lineage.bootMax }
    );
    db.prepare(
      "INSERT INTO usage_history(provider,model,tokens_cache_read,tokens_cache_creation,timestamp) VALUES ('synthetic','fixture',0,NULL,'2026-01-01')"
    ).run();
    db.prepare(
      "INSERT INTO daily_usage_summary(provider,model,date,total_requests) VALUES ('synthetic','fixture','2026-01-01',1)"
    ).run();
    const evidenceSql = fs.readFileSync(new URL(evidenceFile, source), "utf8");
    const dailySql = fs.readFileSync(new URL(dailyFile, source), "utf8");
    const hasPriorEvidence = lineage.name === "preexisting-columns" || lineage.prRows !== null;
    if (lineage.name === "partial-columns")
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
    if (lineage.prRows) {
      const insert = db.prepare("INSERT INTO _omniroute_migrations(version,name) VALUES (?,?)");
      insert.run(lineage.prRows[0], "truthful_usage_evidence");
      insert.run(lineage.prRows[1], "daily_usage_evidence");
    }
    stage(241, true);
    assert.equal(runMigrations(db), lineage.applied);
    assert.deepEqual(
      db
        .prepare(
          `SELECT version,name FROM _omniroute_migrations WHERE ${byNumber} >= 238 ORDER BY ${byNumber}`
        )
        .all(),
      [
        { version: "238", name: "codex_connection_fences" },
        { version: "239", name: "call_logs_pending_detail_index" },
        { version: "240", name: "provider_node_custom_json_config" },
        { version: "241", name: "seen_models" },
        { version: "20261115112344", name: "truthful_usage_evidence" },
        { version: "20261115112345", name: "daily_usage_evidence" },
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
