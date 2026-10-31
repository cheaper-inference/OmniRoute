import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
const dir = fs.mkdtempSync(path.join(os.tmpdir(), "usage-cleanup-team-rollup-"));
process.env.DATA_DIR = dir;
process.env.API_KEY_SECRET = "usage-cleanup-team-rollup";
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
const core = await import("../../src/lib/db/core.ts");
const keys = await import("../../src/lib/db/apiKeys.ts");
const teams = await import("../../src/lib/db/teams.ts");
const usage = await import("../../src/lib/usage/usageHistory.ts");
const cleanup = await import("../../src/lib/db/cleanup.ts");
test.after(() => {
  core.resetDbInstance();
  fs.rmSync(dir, { recursive: true, force: true });
});
test("cleanup folds Team rows into daily_team_usage_summary before deleting raw rows", async () => {
  const team = teams.createTeam({ name: "P" });
  const a = await keys.createApiKey("a", "cleanup-team-a");
  teams.assignApiKeyBillingTeam(a.id, team.id, "2019-01-01T00:00:00.000Z");
  for (const ts of [
    "2020-01-02T12:00:00.000Z",
    "2020-01-02T13:00:00.000Z",
    "2020-01-03T01:00:00.000Z",
  ])
    await usage.saveRequestUsage({
      provider: "openai",
      model: "m",
      apiKeyId: a.id,
      success: true,
      tokens: { input: 10, output: 1 },
      timestamp: ts,
    });
  const db = core.getDbInstance();
  assert.equal(
    (
      db
        .prepare("SELECT COUNT(*) n FROM usage_history WHERE billing_team_id IS NOT NULL")
        .get() as { n: number }
    ).n,
    3
  );
  const r = await cleanup.cleanupUsageHistory();
  assert.equal(r.errors, 0);
  assert.equal(r.deleted, 3);
  const rows = db
    .prepare(
      "SELECT date, total_requests, total_input_tokens FROM daily_team_usage_summary ORDER BY date"
    )
    .all();
  assert.deepEqual(
    rows.map((row) => ({ ...(row as object) })),
    [
      { date: "2020-01-02", total_requests: 2, total_input_tokens: 20 },
      { date: "2020-01-03", total_requests: 1, total_input_tokens: 10 },
    ]
  );
  // A second run finds nothing to fold and must not count the rows again.
  assert.equal((await cleanup.cleanupUsageHistory()).errors, 0);
  assert.equal(
    (
      db.prepare("SELECT SUM(total_requests) n FROM daily_team_usage_summary").get() as {
        n: number;
      }
    ).n,
    3
  );
});

test("cleanup keeps a Team row with a non-UTC offset until it is folded", async () => {
  // DATE() reads this as 2020-02-02 (21:00 UTC), but as a string it sorts after
  // 2020-02-03, so the fold for 2020-02-02 alone does not reach it.
  const timestamp = "2020-02-03T02:00:00+05:00";
  const team = teams.createTeam({ name: "Offset" });
  const key = await keys.createApiKey("offset", "cleanup-team-offset");
  teams.assignApiKeyBillingTeam(key.id, team.id, "2019-01-01T00:00:00.000Z");
  await usage.saveRequestUsage({
    provider: "openai",
    model: "m",
    apiKeyId: key.id,
    success: true,
    tokens: { input: 7, output: 1 },
    timestamp,
  });
  const db = core.getDbInstance();
  assert.equal((await cleanup.cleanupUsageHistory()).errors, 0);
  const folded = db
    .prepare(
      "SELECT COALESCE(SUM(total_requests), 0) n FROM daily_team_usage_summary WHERE team_id = ?"
    )
    .get(team.id) as { n: number };
  const left = db
    .prepare(
      "SELECT COUNT(*) n FROM usage_history WHERE timestamp = ? AND team_rollup_processed_at IS NULL"
    )
    .get(timestamp) as { n: number };
  // Every Team row is either folded into the summary or still on disk.
  assert.equal(folded.n + left.n, 1);
  // The guard keeps the row; a wider fold cutoff alone would fold and delete it.
  assert.equal(left.n, 1);

  // A later Team day moves the fold cutoff past the offset row: it is folded
  // once, and the next run can delete it without counting it again.
  await usage.saveRequestUsage({
    provider: "openai",
    model: "m",
    apiKeyId: key.id,
    success: true,
    tokens: { input: 1, output: 1 },
    timestamp: "2020-02-05T12:00:00.000Z",
  });
  const offsetDay = db.prepare(
    "SELECT COALESCE(SUM(total_requests), 0) n FROM daily_team_usage_summary WHERE team_id = ? AND date = ?"
  );
  const offsetRows = db.prepare("SELECT COUNT(*) n FROM usage_history WHERE timestamp = ?");
  assert.equal((await cleanup.cleanupUsageHistory()).errors, 0);
  assert.equal((offsetDay.get(team.id, "2020-02-02") as { n: number }).n, 1);
  assert.equal((await cleanup.cleanupUsageHistory()).errors, 0);
  assert.equal((offsetRows.get(timestamp) as { n: number }).n, 0);
  assert.equal((offsetDay.get(team.id, "2020-02-02") as { n: number }).n, 1);
});
