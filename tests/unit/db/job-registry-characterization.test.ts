/**
 * Characterization of the job registry storage through the public exports of
 * src/lib/db/jobRegistryDb.ts only, so the same file passes against the
 * pre-repository module and against the repository-backed facade. Pins the raw
 * column values (not just the mapped objects): datetime('now') vs ISO strings,
 * the enabled / created_at preservation of the upsert, finishedAt derivation,
 * prune boundaries, orphan repair scope, ordering and limits, and the
 * synchronous return shape.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "job-registry-characterization-"));
process.env.DATA_DIR = dataDir;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../../src/lib/db/core.ts");
const jr = await import("../../../src/lib/db/jobRegistryDb.ts");

const SQL_NOW = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;
const ISO = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;

test.beforeEach(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(dataDir, { recursive: true });
});
test.after(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

type JobRow = {
  id: string;
  type: string;
  cron: string | null;
  interval_ms: number | null;
  enabled: number;
  env_flag: string | null;
  config: string;
  created_at: string;
  updated_at: string;
};

type RunRow = {
  id: number;
  job_id: string;
  started_at: string;
  finished_at: string | null;
  status: string;
  error_message: string | null;
  records_affected: number | null;
  duration_ms: number | null;
};

function jobRow(id: string): JobRow | undefined {
  return core.getDbInstance().prepare("SELECT * FROM jobs WHERE id = ?").get(id) as
    JobRow | undefined;
}

function runRows(jobId: string): RunRow[] {
  return core
    .getDbInstance()
    .prepare("SELECT * FROM job_runs WHERE job_id = ? ORDER BY id")
    .all(jobId) as RunRow[];
}

function job(id: string, over: Record<string, unknown> = {}) {
  return {
    id,
    type: "interval" as const,
    cron: null,
    intervalMs: 1000,
    enabled: true,
    envFlag: null,
    config: {},
    createdAt: "2026-01-02T03:04:05.000Z",
    updatedAt: "2026-01-02T03:04:05.000Z",
    ...over,
  };
}

test("exports are synchronous and return plain values", () => {
  assert.equal(jr.upsertJob(job("s")), undefined);
  assert.ok(Array.isArray(jr.getAllJobs()));
  assert.equal(jr.getJob("s")?.id, "s");
  assert.equal(jr.getJob("missing"), null);
  assert.equal(jr.updateJobEnabled("s", false), undefined);
  assert.equal(jr.recordRun("s", "success"), undefined);
  assert.equal(jr.pruneRuns("s"), undefined);
  assert.ok(Array.isArray(jr.getRuns("s")));
  assert.equal(jr.cleanupOrphanedRuns(), undefined);
});

test("upsertJob insert: created_at is the caller value, updated_at is SQL datetime('now')", () => {
  jr.upsertJob(
    job("a", {
      type: "cron",
      cron: "*/5 * * * *",
      intervalMs: null,
      enabled: false,
      envFlag: "SOME_FLAG",
      config: { timezone: "UTC", n: 2 },
      updatedAt: "ignored",
    })
  );
  const row = jobRow("a")!;
  assert.equal(row.type, "cron");
  assert.equal(row.cron, "*/5 * * * *");
  assert.equal(row.interval_ms, null);
  assert.equal(row.enabled, 0, "a new row takes the caller's enabled flag");
  assert.equal(row.env_flag, "SOME_FLAG");
  assert.equal(row.config, '{"timezone":"UTC","n":2}');
  assert.equal(row.created_at, "2026-01-02T03:04:05.000Z");
  assert.match(row.updated_at, SQL_NOW, "updatedAt from the caller is not written");

  const mapped = jr.getJob("a")!;
  assert.deepEqual(mapped, {
    id: "a",
    type: "cron",
    cron: "*/5 * * * *",
    intervalMs: null,
    enabled: false,
    envFlag: "SOME_FLAG",
    config: { timezone: "UTC", n: 2 },
    createdAt: "2026-01-02T03:04:05.000Z",
    updatedAt: row.updated_at,
  });
});

test("upsertJob conflict: refreshes scheduling fields, keeps enabled and created_at", () => {
  jr.upsertJob(job("a", { enabled: false }));
  core.getDbInstance().prepare("UPDATE jobs SET updated_at = 'old' WHERE id = 'a'").run();
  jr.upsertJob(
    job("a", {
      type: "cron",
      cron: "0 * * * *",
      intervalMs: null,
      enabled: true,
      envFlag: "F",
      config: { x: 1 },
      createdAt: "2030-01-01T00:00:00.000Z",
    })
  );
  const row = jobRow("a")!;
  assert.equal(row.type, "cron");
  assert.equal(row.cron, "0 * * * *");
  assert.equal(row.interval_ms, null);
  assert.equal(row.env_flag, "F");
  assert.equal(row.config, '{"x":1}');
  assert.equal(row.enabled, 0, "enabled is never overwritten");
  assert.equal(row.created_at, "2026-01-02T03:04:05.000Z", "created_at is never overwritten");
  assert.match(row.updated_at, SQL_NOW);
});

test("upsertJob: a missing config is stored as {}", () => {
  jr.upsertJob(job("a", { config: undefined }));
  assert.equal(jobRow("a")!.config, "{}");
  assert.deepEqual(jr.getJob("a")!.config, {});
});

test("mapping: empty config text maps to {} and enabled is strictly === 1", () => {
  jr.upsertJob(job("a"));
  core.getDbInstance().prepare("UPDATE jobs SET config = '', enabled = 2 WHERE id = 'a'").run();
  const mapped = jr.getJob("a")!;
  assert.deepEqual(mapped.config, {});
  assert.equal(mapped.enabled, false);
});

test("mapping: malformed config JSON throws from getJob and getAllJobs", () => {
  jr.upsertJob(job("a"));
  core.getDbInstance().prepare("UPDATE jobs SET config = '{bad' WHERE id = 'a'").run();
  assert.throws(() => jr.getJob("a"), SyntaxError);
  assert.throws(() => jr.getAllJobs(), SyntaxError);
});

test("getAllJobs: ordered by id, includes the migration seeds", () => {
  jr.upsertJob(job("zz"));
  jr.upsertJob(job("aa"));
  const ids = jr.getAllJobs().map((j) => j.id);
  assert.deepEqual(ids, [...ids].sort());
  assert.ok(ids.includes("aa") && ids.includes("zz") && ids.includes("budget_reset"));
});

test("updateJobEnabled: writes 0/1 and SQL datetime('now'); unknown id is a no-op", () => {
  jr.upsertJob(job("a"));
  core.getDbInstance().prepare("UPDATE jobs SET updated_at = 'old' WHERE id = 'a'").run();
  jr.updateJobEnabled("a", false);
  let row = jobRow("a")!;
  assert.equal(row.enabled, 0);
  assert.match(row.updated_at, SQL_NOW);
  jr.updateJobEnabled("a", true);
  row = jobRow("a")!;
  assert.equal(row.enabled, 1);
  const before = jr.getAllJobs().length;
  jr.updateJobEnabled("missing", true);
  assert.equal(jr.getAllJobs().length, before);
  assert.equal(jr.getJob("missing"), null);
});

test("recordRun: finished run with startedAt + durationMs derives finishedAt", () => {
  jr.upsertJob(job("j"));
  jr.recordRun("j", "failure", {
    startedAt: "2026-01-01T00:00:00.000Z",
    durationMs: 1500,
    errorMessage: "boom",
    recordsAffected: 4,
  });
  const [row] = runRows("j");
  assert.equal(row.started_at, "2026-01-01T00:00:00.000Z");
  assert.equal(row.finished_at, "2026-01-01T00:00:01.500Z");
  assert.equal(row.status, "failure");
  assert.equal(row.error_message, "boom");
  assert.equal(row.records_affected, 4);
  assert.equal(row.duration_ms, 1500);
});

test("recordRun: durationMs 0 still derives finishedAt from startedAt", () => {
  jr.upsertJob(job("j"));
  jr.recordRun("j", "success", { startedAt: "2026-01-01T00:00:00.000Z", durationMs: 0 });
  assert.equal(runRows("j")[0].finished_at, "2026-01-01T00:00:00.000Z");
});

test("recordRun: without durationMs (or without startedAt) finishedAt is now, ISO", () => {
  jr.upsertJob(job("j"));
  const before = Date.now();
  jr.recordRun("j", "success", { startedAt: "2026-01-01T00:00:00.000Z" });
  jr.recordRun("j", "success", { durationMs: 99 });
  jr.recordRun("j", "success");
  const after = Date.now();
  const rows = runRows("j");
  assert.equal(rows.length, 3);
  for (const row of rows) {
    assert.match(row.finished_at!, ISO);
    const t = Date.parse(row.finished_at!);
    assert.ok(t >= before && t <= after, "finishedAt is the current time");
  }
  assert.equal(rows[0].started_at, "2026-01-01T00:00:00.000Z");
  for (const row of rows.slice(1)) {
    assert.match(row.started_at, ISO);
    const t = Date.parse(row.started_at);
    assert.ok(t >= before && t <= after, "startedAt defaults to now");
  }
  assert.equal(rows[1].duration_ms, 99);
  assert.equal(rows[2].duration_ms, null);
  assert.equal(rows[2].error_message, null);
  assert.equal(rows[2].records_affected, 0);
});

test("recordRun: running leaves finishedAt NULL even with a duration", () => {
  jr.upsertJob(job("j"));
  jr.recordRun("j", "running", { startedAt: "2026-01-01T00:00:00.000Z", durationMs: 10 });
  const [row] = runRows("j");
  assert.equal(row.status, "running");
  assert.equal(row.finished_at, null);
  assert.equal(row.duration_ms, 10);
});

test("getRuns: newest started_at first, default limit 20, null records_affected maps to 0", () => {
  jr.upsertJob(job("j"));
  jr.upsertJob(job("other"));
  for (let i = 0; i < 25; i++) {
    jr.recordRun("j", "success", {
      startedAt: new Date(Date.UTC(2026, 0, 1, 0, 0, i)).toISOString(),
      durationMs: 1,
    });
  }
  jr.recordRun("other", "success");
  const runs = jr.getRuns("j");
  assert.equal(runs.length, 20);
  assert.equal(runs[0].startedAt, "2026-01-01T00:00:24.000Z");
  assert.equal(runs[19].startedAt, "2026-01-01T00:00:05.000Z");
  assert.ok(runs.every((r) => r.jobId === "j"));
  assert.equal(jr.getRuns("j", 3).length, 3);

  core
    .getDbInstance()
    .prepare("UPDATE job_runs SET records_affected = NULL WHERE job_id = 'other'")
    .run();
  const [other] = jr.getRuns("other");
  assert.equal(other.recordsAffected, 0);
  assert.deepEqual(Object.keys(other).sort(), [
    "durationMs",
    "errorMessage",
    "finishedAt",
    "id",
    "jobId",
    "recordsAffected",
    "startedAt",
    "status",
  ]);
});

test("pruneRuns: custom bounds, strict age boundary, other jobs untouched", () => {
  jr.upsertJob(job("j"));
  jr.upsertJob(job("other"));
  const now = Date.now();
  const day = 86_400_000;
  // 6 runs: ages 10, 9, 8, 3, 2, 1 days.
  for (const age of [10, 9, 8, 3, 2, 1]) {
    jr.recordRun("j", "success", { startedAt: new Date(now - age * day).toISOString() });
    jr.recordRun("other", "success", { startedAt: new Date(now - age * day).toISOString() });
  }
  jr.pruneRuns("j", 2, 5);
  const left = runRows("j").map((r) => Math.round((now - Date.parse(r.started_at)) / day));
  assert.deepEqual(
    left.sort((a, b) => a - b),
    [1, 2, 3],
    "old AND outside newest-2 are deleted"
  );
  assert.equal(runRows("other").length, 6);

  jr.pruneRuns("j", 0, 0);
  assert.equal(runRows("j").length, 0, "maxRuns 0 / maxDays 0 deletes every past run");
});

test("pruneRuns: defaults are 100 runs / 30 days", () => {
  jr.upsertJob(job("j"));
  const now = Date.now();
  for (let i = 0; i < 105; i++) {
    jr.recordRun("j", "success", {
      startedAt: new Date(now - 30.5 * 86_400_000 - i * 1000).toISOString(),
    });
  }
  jr.recordRun("j", "success", { startedAt: new Date(now - 29 * 86_400_000).toISOString() });
  jr.pruneRuns("j");
  assert.equal(runRows("j").length, 100);
});

test("cleanupOrphanedRuns: every job, only running rows older than the timeout", () => {
  jr.upsertJob(job("a"));
  jr.upsertJob(job("b"));
  const now = Date.now();
  jr.recordRun("a", "running", { startedAt: new Date(now - 10 * 60_000).toISOString() });
  jr.recordRun("b", "running", { startedAt: new Date(now - 6 * 60_000).toISOString() });
  jr.recordRun("b", "running", { startedAt: new Date(now - 4 * 60_000).toISOString() });
  jr.recordRun("a", "success", {
    startedAt: new Date(now - 60 * 60_000).toISOString(),
    durationMs: 1,
  });

  jr.cleanupOrphanedRuns();
  const [aOld, aDone] = runRows("a");
  const [bOld, bFresh] = runRows("b");
  for (const row of [aOld, bOld]) {
    assert.equal(row.status, "failure");
    assert.equal(row.error_message, "orphaned: exceeded timeout");
    assert.match(row.finished_at!, SQL_NOW, "finished_at uses SQL datetime('now')");
  }
  assert.equal(bFresh.status, "running");
  assert.equal(bFresh.finished_at, null);
  assert.equal(aDone.status, "success");
  assert.equal(aDone.error_message, null);

  jr.cleanupOrphanedRuns(3);
  assert.equal(runRows("b")[1].status, "failure", "custom timeout in minutes");
});

test("pruneRuns / cleanupOrphanedRuns: a run exactly at the threshold is kept (strict <)", (t) => {
  jr.upsertJob(job("j"));
  const now = Date.parse("2026-06-01T12:00:00.000Z");
  t.mock.timers.enable({ apis: ["Date"], now });
  const pruneEdge = new Date(now - 30 * 86_400_000).toISOString();
  const orphanEdge = new Date(now - 5 * 60_000).toISOString();
  jr.recordRun("j", "success", { startedAt: pruneEdge, durationMs: 1 });
  jr.recordRun("j", "success", {
    startedAt: new Date(now - 30 * 86_400_000 - 1).toISOString(),
    durationMs: 1,
  });
  jr.recordRun("j", "running", { startedAt: orphanEdge });
  jr.recordRun("j", "running", { startedAt: new Date(now - 5 * 60_000 - 1).toISOString() });

  jr.pruneRuns("j", 0);
  const starts = runRows("j").map((r) => r.started_at);
  assert.ok(starts.includes(pruneEdge), "started_at == threshold survives the prune");
  assert.equal(starts.length, 3, "one millisecond older is pruned");

  jr.cleanupOrphanedRuns();
  const running = runRows("j").filter((r) => r.status === "running");
  assert.deepEqual(
    running.map((r) => r.started_at),
    [orphanEdge],
    "started_at == threshold stays running; one millisecond older is repaired"
  );
});
