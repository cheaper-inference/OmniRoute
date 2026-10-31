import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-startup-cleanup-fold-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../src/lib/db/core.ts");
const compliance = await import("../../src/lib/compliance/index.ts");
const databaseSettings = await import("../../src/lib/db/databaseSettings.ts");

const OriginalDate = globalThis.Date;

function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

/**
 * `cleanupExpiredLogs` runs on every start (`instrumentation-node.ts`), and it
 * trims `usage_history` by retention cutoff. It is a second place where raw
 * usage rows leave the database, so it needs the same fold the daily cleanup
 * does - otherwise a startup pass drops Team usage that was never summarised.
 * These tests drive `cleanupExpiredLogs` itself; calling the fold helper
 * directly would stay green with the call site deleted.
 */

function seedTeam(teamId: string) {
  core
    .getDbInstance()
    .prepare(
      `INSERT INTO teams (id, name, created_at, updated_at)
       VALUES (?, ?, '2026-01-01T00:00:00.000Z', '2026-01-01T00:00:00.000Z')`
    )
    .run(teamId, teamId);
}

function insertTeamUsage(row: { timestamp: string; teamId?: string | null; tokens?: number }) {
  const teamId = row.teamId === undefined ? "team-a" : row.teamId;
  core
    .getDbInstance()
    .prepare(
      `INSERT INTO usage_history
        (provider, model, connection_id, tokens_input, tokens_output,
         tokens_cache_read, tokens_cache_creation, tokens_reasoning,
         provider_cost_usd, service_tier, success, latency_ms, timestamp,
         billing_team_id, team_rollup_processed_at)
       VALUES (?, ?, ?, ?, 40, 0, 0, 0, NULL, 'standard', 1, 200, ?, ?, NULL)`
    )
    .run("anthropic", "claude", "conn-1", row.tokens ?? 100, row.timestamp, teamId);
}

function teamSummaryRows(teamId: string) {
  return core
    .getDbInstance()
    .prepare(
      "SELECT team_id, total_requests, total_input_tokens FROM daily_team_usage_summary WHERE team_id = ?"
    )
    .all(teamId) as Array<{ team_id: string; total_requests: number; total_input_tokens: number }>;
}

function usageRowsAt(timestamp: string) {
  return core
    .getDbInstance()
    .prepare("SELECT COUNT(*) AS n FROM usage_history WHERE timestamp = ?")
    .get(timestamp) as { n: number };
}

function rawTeamRows(teamId: string) {
  return core
    .getDbInstance()
    .prepare("SELECT COUNT(*) AS n FROM usage_history WHERE billing_team_id = ?")
    .get(teamId) as { n: number };
}

async function runStartupCleanup(nowIso: string, retentionDays: number) {
  const now = new Date(nowIso);
  class FrozenDate extends OriginalDate {
    constructor(...args: unknown[]) {
      if (args.length === 0) super(now.getTime());
      else super(...(args as ConstructorParameters<typeof Date>));
    }
    static now() {
      return now.getTime();
    }
  }
  globalThis.Date = FrozenDate as DateConstructor;
  try {
    databaseSettings.updateDatabaseSettings({
      retention: {
        ...databaseSettings.getUserDatabaseSettings().retention,
        usageHistory: retentionDays,
      },
    });
    return await compliance.cleanupExpiredLogs();
  } finally {
    globalThis.Date = OriginalDate;
  }
}

test("a startup pass folds Team usage before retention deletes it", async () => {
  resetStorage();
  seedTeam("team-a");
  insertTeamUsage({ timestamp: "2026-01-01T12:00:00.000Z", tokens: 100 });
  insertTeamUsage({ timestamp: "2026-01-01T13:00:00.000Z", tokens: 100 });

  await runStartupCleanup("2026-01-03T12:00:00.000Z", 1);

  const rows = teamSummaryRows("team-a");
  assert.equal(rows.length, 1, "the startup pass must not drop Team usage uncounted");
  assert.equal(rows[0].total_requests, 2);
  assert.equal(rows[0].total_input_tokens, 200);
  assert.equal(rawTeamRows("team-a").n, 0, "folded rows are past retention and go");
});

test("usage with no billing team is not fabricated into a Team summary", async () => {
  resetStorage();
  seedTeam("team-a");
  insertTeamUsage({ timestamp: "2026-01-01T12:00:00.000Z", teamId: null });

  await runStartupCleanup("2026-01-03T12:00:00.000Z", 1);

  assert.deepEqual(teamSummaryRows("team-a"), []);
  assert.equal(usageRowsAt("2026-01-01T12:00:00.000Z").n, 0, "no team, no summary, row still goes");
});

test("a failed fold keeps its rows and does not stop the delete", async () => {
  resetStorage();
  seedTeam("team-a");
  insertTeamUsage({ timestamp: "2026-01-01T12:00:00.000Z", teamId: "team-a" });
  insertTeamUsage({ timestamp: "2026-01-01T13:00:00.000Z", teamId: null });

  // The fold writes here; without the table it throws.
  core.getDbInstance().exec("DROP TABLE daily_team_usage_summary");

  const result = await runStartupCleanup("2026-01-03T12:00:00.000Z", 1);

  assert.equal(result.deletedUsage, 1, "retention still deletes what it can");
  assert.equal(
    usageRowsAt("2026-01-01T12:00:00.000Z").n,
    1,
    "the Team row the fold never marked is kept, not deleted uncounted"
  );
  assert.equal(usageRowsAt("2026-01-01T13:00:00.000Z").n, 0, "the plain row is gone");
});

test("rows inside the retention window are left alone", async () => {
  resetStorage();
  seedTeam("team-a");
  insertTeamUsage({ timestamp: "2026-01-01T12:00:00.000Z", tokens: 100 });

  await runStartupCleanup("2026-01-03T12:00:00.000Z", 365);

  assert.equal(rawTeamRows("team-a").n, 1, "the row is younger than retention");
  assert.deepEqual(teamSummaryRows("team-a"), [], "and is not summarised early");
});
