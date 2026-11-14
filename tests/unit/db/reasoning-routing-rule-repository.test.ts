import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import type { ReasoningRoutingRuleRepository } from "../../../src/domain/persistence/reasoningRoutingRuleRepository.ts";
import { ruleInput } from "./reasoning-routing-fixture.ts";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "reasoning-rule-repository-"));
process.env.DATA_DIR = dataDir;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
const core = await import("../../../src/lib/db/core.ts");
const { sqliteReasoningRoutingRuleRepository } =
  await import("../../../src/lib/db/repositories/sqliteReasoningRoutingRuleRepository.ts");
const facade = await import("../../../src/lib/db/reasoningRoutingRules.ts");
const repository: ReasoningRoutingRuleRepository = sqliteReasoningRoutingRuleRepository;

test.beforeEach(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
  fs.mkdirSync(dataDir, { recursive: true });
});
test.after(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
});

test("repository CRUD returns Promises, normalizes fields and returns independent values", async () => {
  const input = ruleInput({
    requestTags: [" CODING ", "coding", ""],
    targetEffort: "high",
    targetModel: "ignored/model",
    targetComboId: "ignored-combo",
    budgetTokens: 2048,
  });
  const pending = repository.create(input);
  assert.ok(pending instanceof Promise);
  const created = await pending;
  assert.deepEqual(created, {
    ...input,
    id: created.id,
    createdAt: created.createdAt,
    updatedAt: created.updatedAt,
    requestTags: ["coding"],
    targetEffort: null,
    targetModel: null,
    targetComboId: null,
    budgetTokens: null,
  });
  assert.match(created.id, /^[0-9a-f-]{36}$/);
  assert.equal(created.updatedAt, created.createdAt);
  input.requestTags.push("input mutation");
  created.requestTags.push("result mutation");
  const found = repository.findById(created.id);
  assert.ok(found instanceof Promise);
  assert.deepEqual((await found)?.requestTags, ["coding"]);
  const updated = repository.update(created.id, {
    effortMode: "force",
    targetEffort: "none",
    budgetAction: "preserve",
    requestTags: ["Changed"],
    targetKind: "model",
    targetModel: "openai/test",
  });
  assert.ok(updated instanceof Promise);
  const result = await updated;
  assert.ok(result);
  assert.equal(result.budgetAction, "remove");
  assert.equal(result.createdAt, created.createdAt);
  assert.equal(result.targetModel, "openai/test");
  const listed = repository.list();
  assert.ok(listed instanceof Promise);
  assert.deepEqual(await listed, [result]);
  result.requestTags.length = 0;
  assert.deepEqual((await repository.list())[0].requestTags, ["changed"]);
  assert.equal(await repository.update("missing", { scope: "combo", comboId: "missing" }), null);
  assert.equal(await repository.findById("missing"), null);
  const deleted = repository.deleteById(created.id);
  assert.ok(deleted instanceof Promise);
  assert.equal(await deleted, true);
  assert.equal(await repository.deleteById(created.id), false);
  assert.deepEqual(await repository.list(), []);
});

test("repository orders priority, creation time and id with disabled filtering", async () => {
  for (const [id, priority, createdAt, enabled] of [
    ["b", 1, "2026-01-01", true],
    ["a", 1, "2026-01-01", true],
    ["later", 1, "2026-01-02", true],
    ["disabled", 2, "2026-01-02", false],
  ] as const) {
    const row = await repository.create(ruleInput({ priority, enabled }));
    core
      .getDbInstance()
      .prepare("UPDATE reasoning_routing_rules SET id = ?, created_at = ? WHERE id = ?")
      .run(id, createdAt, row.id);
  }
  assert.deepEqual(
    (await repository.list()).map((row) => row.id),
    ["disabled", "a", "b", "later"]
  );
  assert.deepEqual(
    (await repository.list({ enabledOnly: true })).map((row) => row.id),
    ["a", "b", "later"]
  );
});

test("repository reads malformed and mixed tag JSON defensively", async () => {
  const row = await repository.create(ruleInput());
  for (const [raw, expected] of [
    ["not json", []],
    ['{"tag":"not an array"}', []],
    ['[" One ",null,3,"one","TWO",""]', ["one", "two"]],
  ] as const) {
    core
      .getDbInstance()
      .prepare("UPDATE reasoning_routing_rules SET request_tags = ? WHERE id = ?")
      .run(raw, row.id);
    assert.deepEqual((await repository.findById(row.id))?.requestTags, expected);
  }
});

test("repository rejects missing references on create and merged update without writing", async () => {
  const created = await repository.create(ruleInput());
  for (const [patch, message] of [
    [{ scope: "apiKey", apiKeyId: null }, "The referenced API key does not exist"],
    [{ scope: "combo", comboId: "missing" }, "The referenced source combo does not exist"],
    [
      { scope: "connection", connectionId: "missing" },
      "The referenced provider connection does not exist",
    ],
    [
      { targetKind: "combo", targetComboId: "missing" },
      "The referenced target combo does not exist",
    ],
  ] as const) {
    await assert.rejects(repository.create(ruleInput(patch)), { message });
    await assert.rejects(repository.update(created.id, patch), { message });
    assert.deepEqual(await repository.list(), [created]);
  }
});

test("retained repository survives reset/reopen and replacement at the same DATA_DIR", async () => {
  const created = await repository.create(ruleInput());
  core.resetDbInstance();
  assert.deepEqual(await repository.findById(created.id), created);
  assert.equal((await repository.update(created.id, { name: "reopened" }))?.name, "reopened");
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
  fs.mkdirSync(dataDir, { recursive: true });
  assert.deepEqual(await repository.list(), []);
  assert.equal(await repository.findById(created.id), null);
  const fresh = await repository.create(ruleInput());
  assert.equal(await repository.deleteById(fresh.id), true);
});

test("facade delegates every CRUD path to the repository and caches only list reads", async (t) => {
  const list = t.mock.method(repository, "list");
  const find = t.mock.method(repository, "findById");
  const create = t.mock.method(repository, "create");
  const update = t.mock.method(repository, "update");
  const remove = t.mock.method(repository, "deleteById");
  const input = ruleInput();
  const created = await facade.createReasoningRoutingRule(input);
  assert.equal(create.mock.callCount(), 1);
  assert.deepEqual(create.mock.calls[0].arguments, [input]);
  assert.deepEqual(await facade.getReasoningRoutingRuleById(created.id), created);
  assert.equal(find.mock.callCount(), 1);
  assert.deepEqual(find.mock.calls[0].arguments, [created.id]);
  assert.deepEqual(await facade.getReasoningRoutingRules(), [created]);
  await facade.getReasoningRoutingRules({ enabledOnly: true });
  assert.equal(list.mock.callCount(), 1);
  const patch = { enabled: false };
  await facade.updateReasoningRoutingRule(created.id, patch);
  assert.equal(update.mock.callCount(), 1);
  assert.deepEqual(update.mock.calls[0].arguments, [created.id, patch]);
  assert.deepEqual(await facade.getReasoningRoutingRules({ enabledOnly: true }), []);
  assert.equal(list.mock.callCount(), 2);
  assert.equal(await facade.deleteReasoningRoutingRule(created.id), true);
  assert.equal(remove.mock.callCount(), 1);
  assert.deepEqual(remove.mock.calls[0].arguments, [created.id]);
  assert.deepEqual(await facade.getReasoningRoutingRules(), []);
  assert.equal(list.mock.callCount(), 3);
});

test("overlapping list waits for a delayed repository write", async (t) => {
  assert.deepEqual(await facade.getReasoningRoutingRules(), []);
  const write = repository.create;
  const release = Promise.withResolvers<void>();
  t.mock.method(repository, "create", async (...args: Parameters<typeof write>) => {
    await release.promise;
    return write(...args);
  });
  const pending = facade.createReasoningRoutingRule(ruleInput());
  const during = facade.getReasoningRoutingRules();
  try {
    assert.deepEqual(await repository.list(), [], "write is still pending");
  } finally {
    release.resolve();
  }
  const created = await pending;
  assert.deepEqual(await during, [created]);
  assert.deepEqual(await facade.getReasoningRoutingRules(), [created]);
});

test("failed pending mutation does not reject an overlapping list or poison its cache", async (t) => {
  const created = await facade.createReasoningRoutingRule(ruleInput());
  assert.deepEqual(await facade.getReasoningRoutingRules(), [created]);
  const release = Promise.withResolvers<void>();
  t.mock.method(repository, "create", async () => {
    await release.promise;
    throw new Error("Persistence failed");
  });
  const pending = facade.createReasoningRoutingRule(ruleInput());
  const rejection = assert.rejects(pending, { message: "Persistence failed" });
  const during = facade.getReasoningRoutingRules();
  release.resolve();
  await rejection;
  assert.deepEqual(await during, [created]);
  assert.deepEqual(await facade.getReasoningRoutingRules(), [created]);
});

for (const invalidation of ["external", "reset"] as const) {
  test(`in-flight list cannot refill stale cache after ${invalidation} invalidation`, async (t) => {
    const created = await facade.createReasoningRoutingRule(ruleInput());
    const read = repository.list;
    const started = Promise.withResolvers<void>();
    const release = Promise.withResolvers<void>();
    let first = true;
    const list = t.mock.method(repository, "list", async () => {
      const rows = await read();
      if (first) {
        first = false;
        started.resolve();
        await release.promise;
      }
      return rows;
    });
    const pending = facade.getReasoningRoutingRules();
    await started.promise;
    core
      .getDbInstance()
      .prepare("DELETE FROM reasoning_routing_rules WHERE id = ?")
      .run(created.id);
    if (invalidation === "external") facade.invalidateReasoningRoutingRuleCache();
    else core.resetDbInstance();
    release.resolve();
    assert.deepEqual(await pending, []);
    assert.deepEqual(await facade.getReasoningRoutingRules(), []);
    assert.equal(list.mock.callCount(), 2);
  });
}
