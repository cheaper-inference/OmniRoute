/**
 * Contract of the job registry repository (Promise-based, SQLite implementation)
 * and of the facade wiring: the facade hands out the composition-root repository,
 * its synchronous exports go through legacySync, and Promise and synchronous
 * access share one store. The repository does not catch errors; the scheduler
 * keeps its own containment.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "job-registry-repositories-"));
process.env.DATA_DIR = dataDir;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../../src/lib/db/core.ts");
const { jobRegistryRepositories } =
  await import("../../../src/lib/db/repositories/jobRegistryRepositories.ts");
const facade = await import("../../../src/lib/db/jobRegistryDb.ts");

const { jobs, legacySync } = jobRegistryRepositories;

test.beforeEach(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(dataDir, { recursive: true });
});
test.after(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function promised<T>(value: Promise<T>): Promise<T> {
  assert.ok(value instanceof Promise, "every repository operation returns a Promise");
  return value;
}

const record = {
  id: "c",
  type: "interval" as const,
  cron: null,
  intervalMs: 500,
  enabled: true,
  envFlag: null,
  config: { k: "v" },
  createdAt: "2026-01-01T00:00:00.000Z",
  updatedAt: "2026-01-01T00:00:00.000Z",
};

test("facade hands out the composition-root repository", () => {
  assert.equal(facade.getJobRegistryRepository(), jobs);
});

test("jobs: upsert / find / list / setJobEnabled through Promises", async () => {
  assert.equal(await promised(jobs.findJob("c")), null);
  assert.equal(await promised(jobs.upsertJob(record)), undefined);
  const found = await jobs.findJob("c");
  assert.equal(found?.intervalMs, 500);
  assert.deepEqual(found?.config, { k: "v" });
  assert.equal(found?.enabled, true);

  assert.equal(await promised(jobs.setJobEnabled("c", false)), undefined);
  await jobs.upsertJob({ ...record, intervalMs: 700, enabled: true });
  const after = await jobs.findJob("c");
  assert.equal(after?.intervalMs, 700);
  assert.equal(after?.enabled, false, "upsert keeps the toggle");
  assert.equal(after?.createdAt, "2026-01-01T00:00:00.000Z");

  const listed = await promised(jobs.listJobs());
  assert.deepEqual(listed, facade.getAllJobs(), "same rows as the synchronous facade");
  const ids = listed.map((j) => j.id);
  assert.deepEqual(ids, [...ids].sort());
  assert.ok(ids.includes("c"));
});

test("runs: record / list / prune / failOrphanedRuns through Promises", async () => {
  await jobs.upsertJob(record);
  const now = Date.now();
  assert.equal(
    await promised(
      jobs.recordRun("c", "success", {
        startedAt: new Date(now - 40 * 86_400_000).toISOString(),
        durationMs: 5,
      })
    ),
    undefined
  );
  await jobs.recordRun("c", "running", { startedAt: new Date(now - 10 * 60_000).toISOString() });
  await jobs.recordRun("c", "success", { startedAt: new Date(now).toISOString(), durationMs: 1 });

  let runs = await promised(jobs.listRuns("c"));
  assert.equal(runs.length, 3);
  assert.equal(runs[0].status, "success");
  assert.equal(runs[2].durationMs, 5);
  assert.equal((await jobs.listRuns("c", 1)).length, 1);

  assert.equal(await promised(jobs.failOrphanedRuns()), undefined);
  runs = await jobs.listRuns("c");
  assert.equal(runs[1].status, "failure");
  assert.equal(runs[1].errorMessage, "orphaned: exceeded timeout");

  assert.equal(await promised(jobs.pruneRuns("c", 1, 50)), undefined);
  assert.equal((await jobs.listRuns("c")).length, 3, "maxDays is honoured (40 < 50 days)");
  await jobs.pruneRuns("c", 1, 30);
  runs = await jobs.listRuns("c");
  assert.equal(runs.length, 2, "only the run older than 30 days outside the newest 1 goes");
});

test("repository defaults: listRuns 20, failOrphanedRuns 5 minutes, pruneRuns 100 / 30 days", async () => {
  await jobs.upsertJob(record);
  const now = Date.now();
  for (let i = 0; i < 21; i++) {
    await jobs.recordRun("c", "success", {
      startedAt: new Date(now - 60 * 60_000 - i * 1000).toISOString(),
      durationMs: 1,
    });
  }
  assert.equal((await jobs.listRuns("c")).length, 20);

  await jobs.recordRun("c", "running", { startedAt: new Date(now - 5.5 * 60_000).toISOString() });
  await jobs.failOrphanedRuns();
  assert.equal((await jobs.listRuns("c", 1))[0].status, "failure", "5.5 minutes is past 5");

  for (let i = 0; i < 100; i++) {
    await jobs.recordRun("c", "success", {
      startedAt: new Date(now - 30.5 * 86_400_000 - i * 1000).toISOString(),
      durationMs: 1,
    });
  }
  await jobs.pruneRuns("c");
  assert.equal((await jobs.listRuns("c", 500)).length, 100);
});

test("Promise and legacy sync access share one store", async () => {
  legacySync.upsertJob(record);
  assert.equal((await jobs.findJob("c"))?.id, "c");
  await jobs.recordRun("c", "success", { startedAt: "2026-01-01T00:00:00.000Z", durationMs: 1 });
  assert.equal(legacySync.getRuns("c").length, 1);
  assert.equal(facade.getRuns("c").length, 1);
  facade.updateJobEnabled("c", false);
  assert.equal((await jobs.findJob("c"))?.enabled, false);
});

test("repository errors surface as rejected Promises, not swallowed", async () => {
  await jobs.upsertJob(record);
  core.getDbInstance().prepare("UPDATE jobs SET config = '{bad' WHERE id = 'c'").run();
  await assert.rejects(jobs.findJob("c"), SyntaxError);
  await assert.rejects(jobs.listJobs(), SyntaxError);
  await assert.rejects(
    jobs.recordRun("no-such-job", "success"),
    /FOREIGN KEY/i,
    "job_runs.job_id references jobs(id)"
  );
});
