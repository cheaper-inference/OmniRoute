import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import { registerQuotaDefinitionRepositoryConformance } from "../../../helpers/persistence/quotaDefinitionRepositoryConformance.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-quota-definition-repo-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../../../src/lib/db/core.ts");
test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

const { sqliteQuotaGroupRepository: groups } =
  await import("../../../../src/lib/db/repositories/sqliteQuotaGroupRepository.ts");
const { sqliteQuotaModelCapRepository: modelCaps } =
  await import("../../../../src/lib/db/repositories/sqliteQuotaModelCapRepository.ts");
const { sqliteQuotaScheduleRepository: schedules } =
  await import("../../../../src/lib/db/repositories/sqliteQuotaScheduleRepository.ts");
const { quotaDefinitionRepositories } =
  await import("../../../../src/lib/db/repositories/quotaDefinitionRepositories.ts");
const readCache = await import("../../../../src/lib/db/readCache.ts");
const groupsFacade = await import("../../../../src/lib/db/quotaGroups.ts");
const capsFacade = await import("../../../../src/lib/db/quotaModelCaps.ts");
const schedulesFacade = await import("../../../../src/lib/db/quotaSchedules.ts");

async function resetStorage(): Promise<void> {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

registerQuotaDefinitionRepositoryConformance(async () => ({
  groups,
  modelCaps,
  schedules,
  reset: resetStorage,
  async addPoolToGroup(poolId, groupId) {
    core
      .getDbInstance()
      .prepare(
        "INSERT INTO quota_pools (id, connection_id, name, group_id, created_at) VALUES (?, 'c', ?, ?, ?)"
      )
      .run(poolId, poolId, groupId, new Date().toISOString());
  },
  async breakScheduleStore() {
    core.getDbInstance().prepare("DROP TABLE quota_schedules").run();
  },
}));

function synchronous<T>(value: T): T {
  assert.equal(value instanceof Promise, false, "legacy helpers must not return Promises");
  return value;
}

test("composition root binds the SQLite repositories with no backend selection", () => {
  assert.equal(quotaDefinitionRepositories.groups, groups);
  assert.equal(quotaDefinitionRepositories.modelCaps, modelCaps);
  assert.equal(quotaDefinitionRepositories.schedules, schedules);
  assert.equal(capsFacade.getQuotaModelCapRepository(), modelCaps);
  assert.equal(schedulesFacade.getQuotaScheduleRepository(), schedules);
});

test("group facade: sync helpers and async entry point share data in both directions", async () => {
  await resetStorage();
  const repository = groupsFacade.getQuotaGroupRepository();
  const created = synchronous(groupsFacade.createGroup("Sync"));
  assert.deepEqual(await repository.findById(created.id), created);
  assert.equal(await repository.findNameById(created.id), "Sync");
  const asyncCreated = await repository.create("Async");
  assert.deepEqual(synchronous(groupsFacade.getGroup(asyncCreated.id)), asyncCreated);
  assert.equal(synchronous(groupsFacade.getGroupName(asyncCreated.id)), "Async");
  assert.deepEqual(synchronous(groupsFacade.listGroups()), await repository.list());
  assert.equal(synchronous(groupsFacade.deleteGroup(created.id)), true);
  assert.equal(await repository.deleteById(asyncCreated.id), true);
  assert.throws(() => groupsFacade.deleteGroup("group-demo"), /protected seed group/);
});

test("group facade: both rename paths invalidate the model catalog only when a row changed", async () => {
  await resetStorage();
  const repository = groupsFacade.getQuotaGroupRepository();
  const group = groupsFacade.createGroup("Catalog");
  let version = readCache.getModelCatalogCacheVersion();

  assert.equal(synchronous(groupsFacade.renameGroup(group.id, "Sync rename")), true);
  assert.equal(readCache.getModelCatalogCacheVersion(), ++version);
  assert.equal(await repository.rename(group.id, "Async rename"), true);
  assert.equal(readCache.getModelCatalogCacheVersion(), ++version);
  assert.equal(groupsFacade.getGroupName(group.id), "Async rename");

  assert.equal(groupsFacade.renameGroup("missing", "x"), false);
  assert.equal(await repository.rename("missing", "x"), false);
  assert.equal(readCache.getModelCatalogCacheVersion(), version);

  const createdVersion = readCache.getModelCatalogCacheVersion();
  await repository.create("No invalidation");
  groupsFacade.createGroup("No invalidation either");
  assert.equal(readCache.getModelCatalogCacheVersion(), createdVersion);
});

test("model cap and schedule facades stay synchronous and share data with the repositories", async () => {
  await resetStorage();
  const cap = { poolId: "p", apiKeyId: "k", model: "m", capValue: 2, capUnit: "requests" as const };
  synchronous(capsFacade.setModelCap(cap));
  assert.deepEqual(await modelCaps.find("p", "k", "m"), cap);
  await modelCaps.upsert({ ...cap, capValue: 3 });
  assert.deepEqual(synchronous(capsFacade.getModelCap("p", "k", "m")), { ...cap, capValue: 3 });
  await modelCaps.upsert({ ...cap, model: "a" });
  assert.deepEqual(
    synchronous(capsFacade.listModelCapsForApiKey("p", "k")),
    await modelCaps.listForApiKey("p", "k")
  );
  assert.deepEqual(
    capsFacade.listModelCapsForApiKey("p", "k").map((c) => c.model),
    ["a", "m"]
  );

  const input = {
    id: "s",
    days: [1],
    startMinute: 0,
    endMinute: 60,
    timezone: "Europe/Berlin",
    mode: "allow" as const,
    reserves: [],
    budgetWindow: "daily" as const,
    priority: 0,
    enabled: false,
  };
  const saved = synchronous(schedulesFacade.replaceSchedules("pool", [input]));
  assert.deepEqual(await schedules.listForPool("pool"), saved);
  assert.deepEqual(synchronous(schedulesFacade.listEnabledSchedules("pool")), []);
  await schedules.replaceForPool("pool", [{ ...input, enabled: true }]);
  assert.equal(synchronous(schedulesFacade.listEnabledSchedules("pool")).length, 1);
  assert.equal(synchronous(schedulesFacade.deleteSchedulesForPool("pool")), 1);
  assert.deepEqual(synchronous(schedulesFacade.listSchedules("pool")), []);
  assert.deepEqual(schedulesFacade.parseDays("3,1"), [1, 3]);
  assert.deepEqual(schedulesFacade.parseReserves('[{"window":"daily","percent":5}]'), [
    { window: "daily", percent: 5 },
  ]);
});

test("both boundaries reopen a recreated same-DATA_DIR database without stale handles", async () => {
  await resetStorage();
  const repository = groupsFacade.getQuotaGroupRepository();
  const oldGroup = await repository.create("Old");
  await schedules.replaceForPool("pool", [
    {
      id: "old",
      days: [1],
      startMinute: 0,
      endMinute: 60,
      reserves: [],
      mode: "allow",
      budgetWindow: "daily",
      priority: 0,
      enabled: true,
    },
  ]);
  await resetStorage();
  assert.equal(await repository.findById(oldGroup.id), null);
  assert.equal(groupsFacade.getGroup(oldGroup.id), null);
  assert.deepEqual(await schedules.listForPool("pool"), []);
  assert.deepEqual(schedulesFacade.listSchedules("pool"), []);
  const fresh = groupsFacade.createGroup("Fresh");
  assert.deepEqual(await repository.findById(fresh.id), fresh);
});
