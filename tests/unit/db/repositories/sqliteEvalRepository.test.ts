/**
 * Contract tests for the SQLite eval repositories and their composition root:
 * the async repositories and the synchronous facade share the same tables, the
 * Promise contract resolves to the same records, and the legacy synchronous
 * helpers return plain values in the caller's turn.
 */
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-eval-repo-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../../../src/lib/db/core.ts");
const evalsDb = await import("../../../../src/lib/db/evals.ts");
const { evalRepositories } =
  await import("../../../../src/lib/db/repositories/evalRepositories.ts");
const { sqliteEvalLegacySync, sqliteEvalRunRepository, sqliteEvalSuiteRepository } =
  await import("../../../../src/lib/db/repositories/sqliteEvalRepository.ts");
const domain = await import("../../../../src/domain/persistence/evalRepository.ts");

test.beforeEach(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  delete process.env.DATA_DIR;
});

const RUN = {
  suiteId: "golden-set",
  suiteName: "Golden",
  target: { type: "model" as const, id: "m-a", label: "Model A" },
  summary: { total: 2, passed: 1, failed: 1, passRate: 50 },
  results: [{ caseId: "c1", passed: true }],
  createdAt: "2026-02-01T00:00:00.000Z",
};

const SUITE = {
  id: "s1",
  name: "Suite",
  cases: [
    {
      id: "k1",
      name: "case",
      input: { messages: [{ role: "user", content: "hi" }] },
      expected: { strategy: "contains" as const, value: "hello" },
    },
  ],
};

test("composition root is SQLite-only and wires the shared implementation", () => {
  assert.deepEqual(Object.keys(evalRepositories).sort(), ["legacySync", "runs", "suites"]);
  assert.equal(evalRepositories.runs, sqliteEvalRunRepository);
  assert.equal(evalRepositories.suites, sqliteEvalSuiteRepository);
  assert.equal(evalRepositories.legacySync, sqliteEvalLegacySync);
  assert.equal(evalsDb.getEvalRunRepository(), sqliteEvalRunRepository);
  assert.equal(evalsDb.getEvalSuiteRepository(), sqliteEvalSuiteRepository);
  assert.equal(evalsDb.serializeEvalTargetKey, domain.serializeEvalTargetKey);
});

test("run repository methods resolve to Promises over the same table as the facade", async () => {
  const pending = sqliteEvalRunRepository.save(RUN);
  assert.ok(pending instanceof Promise);
  const saved = await pending;
  assert.deepEqual(evalsDb.listEvalRuns(), [saved]);
  const listed = sqliteEvalRunRepository.list({ suiteId: "golden-set" });
  assert.ok(listed instanceof Promise);
  assert.deepEqual(await listed, [saved]);
  const viaFacade = evalsDb.saveEvalRun({ ...RUN, createdAt: "2026-02-02T00:00:00.000Z" });
  assert.deepEqual(
    (await sqliteEvalRunRepository.list()).map((r) => r.id),
    [viaFacade.id, saved.id]
  );
  const routed = sqliteEvalRunRepository.listModelRunsForRouting({ targetIds: ["m-a"] });
  assert.ok(routed instanceof Promise);
  assert.deepEqual(await routed, evalsDb.listModelEvalRunsForRouting({ targetIds: ["m-a"] }));
  assert.deepEqual(await sqliteEvalRunRepository.listModelRunsForRouting({ targetIds: [] }), []);
});

test("suite repository methods resolve to Promises over the same tables as the facade", async () => {
  const pending = sqliteEvalSuiteRepository.save(SUITE);
  assert.ok(pending instanceof Promise);
  const saved = await pending;
  assert.deepEqual(evalsDb.getCustomEvalSuite("s1"), saved);
  assert.deepEqual(await sqliteEvalSuiteRepository.list(), evalsDb.listCustomEvalSuites());
  assert.deepEqual(await sqliteEvalSuiteRepository.findById(" s1 "), saved);
  assert.equal(await sqliteEvalSuiteRepository.findById("  "), null);
  assert.equal(await sqliteEvalSuiteRepository.deleteById("s1"), true);
  assert.equal(evalsDb.getCustomEvalSuite("s1"), null);
  assert.equal(await sqliteEvalSuiteRepository.deleteById("s1"), false);
});

test("suite repository save rejects (not throws) on invalid input and leaves storage unchanged", async () => {
  await sqliteEvalSuiteRepository.save(SUITE);
  const pending = sqliteEvalSuiteRepository.save({ ...SUITE, name: "  " });
  assert.ok(pending instanceof Promise);
  await assert.rejects(pending, { message: "Suite name is required" });
  await assert.rejects(sqliteEvalSuiteRepository.save({ ...SUITE, cases: [] }), {
    message: "At least one eval case is required",
  });
  assert.equal((await sqliteEvalSuiteRepository.findById("s1"))?.name, "Suite");
});

test("legacy synchronous helpers return plain values and match the facade exports", () => {
  const saved = sqliteEvalLegacySync.saveRun(RUN);
  assert.ok(!(saved instanceof Promise));
  assert.deepEqual(sqliteEvalLegacySync.listRuns(), evalsDb.listEvalRuns());
  assert.deepEqual(
    sqliteEvalLegacySync.listModelRunsForRouting({ targetIds: ["m-a"] }),
    evalsDb.listModelEvalRunsForRouting({ targetIds: ["m-a"] })
  );
  const suite = sqliteEvalLegacySync.saveSuite(SUITE);
  assert.ok(!(suite instanceof Promise));
  assert.deepEqual(sqliteEvalLegacySync.listSuites(), evalsDb.listCustomEvalSuites());
  assert.deepEqual(sqliteEvalLegacySync.findSuiteById("s1"), suite);
  assert.equal(sqliteEvalLegacySync.deleteSuite("s1"), true);
  assert.deepEqual(Object.keys(sqliteEvalLegacySync).sort(), [
    "deleteSuite",
    "findSuiteById",
    "listModelRunsForRouting",
    "listRuns",
    "listSuites",
    "saveRun",
    "saveSuite",
  ]);
});

test("the facade scorecard is derived from repository-listed runs", async () => {
  await sqliteEvalRunRepository.save(RUN);
  await sqliteEvalRunRepository.save({
    ...RUN,
    createdAt: "2026-02-03T00:00:00.000Z",
    summary: { total: 2, passed: 2, failed: 0, passRate: 100 },
  });
  assert.deepEqual(evalsDb.getEvalScorecard(), {
    suites: 1,
    totalCases: 2,
    totalPassed: 2,
    overallPassRate: 100,
    perSuite: [{ id: "golden-set:model:m-a", name: "Golden · Model A", passRate: 100 }],
  });
});
