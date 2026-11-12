import { describe, it } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-anti-cheat-index-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../../src/lib/db/core.ts");
const { validateScoreChange } = await import("../../../src/lib/gamification/antiCheat.ts");

type PlanRow = { detail: string };

function seed(key: string, xp: number, minutesAgo: number) {
  core
    .getDbInstance()
    .prepare(
      "INSERT INTO xp_audit_log (api_key_id, action, xp_earned, created_at) VALUES (?, 'request', ?, datetime('now', ?))"
    )
    .run(key, xp, `-${minutesAgo} minutes`);
}

describe("anti-cheat hourly distribution query", () => {
  it("plans a bounded created_at range search, not a scan of every retained audit row", async () => {
    const db = core.getDbInstance();
    const realPrepare = db.prepare.bind(db);
    const statements: string[] = [];
    (db as { prepare: unknown }).prepare = (sql: string) => {
      statements.push(sql);
      return realPrepare(sql);
    };
    try {
      await validateScoreChange("plan-probe-key", "request", 1);
    } finally {
      (db as { prepare: unknown }).prepare = realPrepare;
    }
    const stats = statements.find((sql) => /AVG\(hourly_total\)/.test(sql));
    assert.ok(stats, "validateScoreChange must run the hourly distribution query");

    const plan = realPrepare(`EXPLAIN QUERY PLAN ${stats}`).all() as PlanRow[];
    const steps = plan.map((row) => row.detail).filter((detail) => /xp_audit_log/.test(detail));
    assert.equal(steps.length, 1, `unexpected plan: ${JSON.stringify(plan)}`);
    assert.match(steps[0], /^SEARCH xp_audit_log USING COVERING INDEX \w+ \(created_at>\?\)$/);
  });

  it("still flags a key whose hourly XP is far above the other keys", async () => {
    for (let i = 0; i < 20; i++) seed(`calm-key-${i}`, 10, 30);
    seed("loud-key", 5000, 30);
    const result = await validateScoreChange("loud-key", "request", 1);
    assert.equal(result.allowed, false);
    assert.match(result.reason ?? "", /Anomalous XP velocity/);
  });

  it("still allows a key that is close to the other keys", async () => {
    const result = await validateScoreChange("calm-key-1", "request", 1);
    assert.equal(result.allowed, true);
  });
});
