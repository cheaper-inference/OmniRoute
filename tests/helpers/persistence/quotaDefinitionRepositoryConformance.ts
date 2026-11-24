import assert from "node:assert/strict";
import test from "node:test";

import type {
  QuotaGroupRepository,
  QuotaModelCapRepository,
  QuotaScheduleRepository,
  ScheduleInput,
} from "../../../src/domain/persistence/quotaDefinitionRepositories.ts";

export interface QuotaDefinitionRepositoryHarness {
  groups: QuotaGroupRepository;
  modelCaps: QuotaModelCapRepository;
  schedules: QuotaScheduleRepository;
  reset(): Promise<void>;
  /** Attaches a pool to the group so deletion must be refused. */
  addPoolToGroup(poolId: string, groupId: string): Promise<void>;
  /** Makes the schedule store unavailable (for example, the table is missing). */
  breakScheduleStore(): Promise<void>;
}

function promised<T>(value: Promise<T>): Promise<T> {
  assert.ok(value instanceof Promise, "every repository operation returns a Promise");
  return value;
}

function schedule(over: Partial<ScheduleInput> = {}): ScheduleInput {
  return {
    days: [1, 2, 3, 4, 5],
    startMinute: 540,
    endMinute: 1080,
    timezone: "UTC",
    mode: "allow",
    reserves: [],
    budgetWindow: "daily",
    priority: 0,
    enabled: true,
    ...over,
  };
}

export function registerQuotaDefinitionRepositoryConformance(
  createHarness: () => Promise<QuotaDefinitionRepositoryHarness>
): void {
  test("group repository: Promise CRUD, seed group, ordering and missing rows", async () => {
    const harness = await createHarness();
    await harness.reset();
    const { groups } = harness;

    const seeded = await promised(groups.list());
    assert.deepEqual(
      seeded.map((g) => [g.id, g.name]),
      [["group-demo", "GroupDemo"]]
    );
    assert.equal(await promised(groups.findById("missing")), null);
    assert.equal(await promised(groups.findNameById("missing")), null);
    assert.equal(await promised(groups.rename("missing", "Ghost")), false);
    assert.equal(await promised(groups.deleteById("missing")), false);

    const first = await promised(groups.create("First"));
    assert.match(
      first.id,
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
    );
    assert.ok(!Number.isNaN(Date.parse(first.createdAt)));
    assert.deepEqual(await promised(groups.findById(first.id)), first);
    assert.equal(await promised(groups.findNameById(first.id)), "First");
    const second = await groups.create("Second");
    assert.deepEqual(
      (await groups.list()).map((g) => g.id),
      ["group-demo", first.id, second.id]
    );

    assert.equal(await promised(groups.rename(first.id, "Renamed")), true);
    assert.deepEqual(await groups.findById(first.id), { ...first, name: "Renamed" });
    assert.equal(await promised(groups.deleteById(first.id)), true);
    assert.equal(await groups.deleteById(first.id), false);
    assert.equal(await groups.findById(first.id), null);
  });

  test("group repository: refuses the seed group and groups still holding pools", async () => {
    const harness = await createHarness();
    await harness.reset();
    const { groups } = harness;

    await assert.rejects(promised(groups.deleteById("group-demo")), /protected seed group/);
    const held = await groups.create("Held");
    await harness.addPoolToGroup("pool-held", held.id);
    await assert.rejects(promised(groups.deleteById(held.id)), /has pools/);
    assert.deepEqual(await groups.findById(held.id), held);
  });

  test("model cap repository: missing triple, upsert insert and replace", async () => {
    const harness = await createHarness();
    await harness.reset();
    const { modelCaps } = harness;
    const cap = {
      poolId: "p",
      apiKeyId: "k",
      model: "m",
      capValue: 10,
      capUnit: "tokens" as const,
    };

    assert.equal(await promised(modelCaps.find("p", "k", "m")), null);
    assert.equal(await promised(modelCaps.upsert(cap)), undefined);
    assert.deepEqual(await modelCaps.find("p", "k", "m"), cap);
    await modelCaps.upsert({ ...cap, capValue: 0.5, capUnit: "usd" });
    assert.deepEqual(await modelCaps.find("p", "k", "m"), {
      ...cap,
      capValue: 0.5,
      capUnit: "usd",
    });
    assert.equal(await modelCaps.find("p", "k", "other"), null);
    assert.equal(await modelCaps.find("p", "other", "m"), null);
  });

  test("model cap repository: lists one key's caps in one pool, model ascending", async () => {
    const harness = await createHarness();
    await harness.reset();
    const { modelCaps } = harness;
    const cap = (poolId: string, apiKeyId: string, model: string, capValue: number) => ({
      poolId,
      apiKeyId,
      model,
      capValue,
      capUnit: "requests" as const,
    });

    assert.deepEqual(await promised(modelCaps.listForApiKey("p", "k")), []);
    await modelCaps.upsert(cap("p", "k", "zeta", 1));
    await modelCaps.upsert(cap("p", "k", "alpha", 2));
    await modelCaps.upsert(cap("p", "other", "beta", 3));
    await modelCaps.upsert(cap("q", "k", "gamma", 4));
    assert.deepEqual(await promised(modelCaps.listForApiKey("p", "k")), [
      cap("p", "k", "alpha", 2),
      cap("p", "k", "zeta", 1),
    ]);
  });

  test("schedule repository: whole-set replace, resolution order and field round-trip", async () => {
    const harness = await createHarness();
    await harness.reset();
    const { schedules } = harness;

    assert.deepEqual(await promised(schedules.listForPool("pool-1")), []);
    const saved = await promised(
      schedules.replaceForPool("pool-1", [
        schedule({ id: "b", priority: 1, days: [5, 1, 1, 9], timezone: "Asia/Tokyo" }),
        schedule({ id: "a", priority: 1, label: "A", timezone: null, budgetWindow: "5h" }),
        schedule({
          id: "z",
          priority: 7,
          mode: "block",
          enabled: false,
          reserves: [{ window: "any", percent: 2.5 }],
          budgetValue: 3,
          budgetUnit: "usd",
        }),
      ])
    );
    assert.deepEqual(
      saved.map((s) => s.id),
      ["z", "a", "b"]
    );
    assert.deepEqual(saved[2], {
      id: "b",
      poolId: "pool-1",
      days: [1, 5],
      startMinute: 540,
      endMinute: 1080,
      timezone: "Asia/Tokyo",
      mode: "allow",
      reserves: [],
      budgetWindow: "daily",
      priority: 1,
      enabled: true,
    });
    assert.equal(saved[1].label, "A");
    assert.equal(saved[1].timezone, null);
    assert.equal(saved[1].budgetWindow, "5h");
    assert.deepEqual(saved[0].reserves, [{ window: "any", percent: 2.5 }]);
    assert.equal(saved[0].budgetValue, 3);
    assert.equal(saved[0].budgetUnit, "usd");
    assert.equal(saved[0].enabled, false);
    assert.deepEqual(await schedules.listForPool("pool-1"), saved);

    const generated = await schedules.replaceForPool("pool-2", [schedule()]);
    assert.match(generated[0].id, /^sched-/);
    assert.equal((await schedules.listForPool("pool-1")).length, 3, "pools stay isolated");

    const replaced = await schedules.replaceForPool("pool-1", [schedule({ id: "only" })]);
    assert.deepEqual(
      replaced.map((s) => s.id),
      ["only"]
    );
    assert.equal(await promised(schedules.deleteForPool("pool-1")), 1);
    assert.equal(await schedules.deleteForPool("pool-1"), 0);
    assert.deepEqual(await schedules.listForPool("pool-1"), []);
    assert.equal((await schedules.listForPool("pool-2")).length, 1);
  });

  test("schedule repository: an unavailable store reads empty and deletes nothing", async () => {
    const harness = await createHarness();
    await harness.reset();
    await harness.schedules.replaceForPool("pool-1", [schedule({ id: "s" })]);
    await harness.breakScheduleStore();
    assert.deepEqual(await promised(harness.schedules.listForPool("pool-1")), []);
    assert.equal(await promised(harness.schedules.deleteForPool("pool-1")), 0);
  });
}
