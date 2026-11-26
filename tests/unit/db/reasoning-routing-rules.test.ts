import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { ruleInput } from "./reasoning-routing-fixture.ts";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "reasoning-rules-facade-"));
process.env.DATA_DIR = dataDir;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
process.env.API_KEY_SECRET = "reasoning-rules-test-only-secret";
const core = await import("../../../src/lib/db/core.ts");
const rules = await import("../../../src/lib/db/reasoningRoutingRules.ts");
const apiKeys = await import("../../../src/lib/db/apiKeys.ts");
const combos = await import("../../../src/lib/db/combos.ts");
const providers = await import("../../../src/lib/db/providers.ts");

test.beforeEach(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
  fs.mkdirSync(dataDir, { recursive: true });
});
test.after(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
});

test("list preserves disabled rows, priority/date/id order and isolated requestTags", async () => {
  for (const [id, priority, createdAt, enabled] of [
    ["b", 5, "2026-01-01", true],
    ["a", 5, "2026-01-01", true],
    ["later", 5, "2026-01-02", true],
    ["disabled", 10, "2026-01-03", false],
    ["low", 0, "2025-01-01", true],
  ] as const) {
    const row = await rules.createReasoningRoutingRule(
      ruleInput({ priority, enabled, requestTags: [" CODING ", "coding", "", "Internal"] })
    );
    core
      .getDbInstance()
      .prepare("UPDATE reasoning_routing_rules SET id = ?, created_at = ? WHERE id = ?")
      .run(id, createdAt, row.id);
  }
  rules.invalidateReasoningRoutingRuleCache();
  const all = await rules.getReasoningRoutingRules();
  assert.deepEqual(
    all.map((row) => row.id),
    ["disabled", "a", "b", "later", "low"]
  );
  assert.deepEqual(all[0].requestTags, ["coding", "internal"]);
  all[0].name = "mutated";
  all[0].requestTags.push("mutated");
  all.splice(1);
  const enabled = await rules.getReasoningRoutingRules({ enabledOnly: true });
  assert.deepEqual(
    enabled.map((row) => row.id),
    ["a", "b", "later", "low"]
  );
  enabled[0].requestTags.length = 0;
  const again = await rules.getReasoningRoutingRules();
  assert.equal(again[0].name, "Repository rule");
  assert.deepEqual(again[0].requestTags, ["coding", "internal"]);
  assert.deepEqual(again[1].requestTags, ["coding", "internal"]);
});

test("CRUD refreshes warm cache and preserves missing-row results", async () => {
  assert.deepEqual(await rules.getReasoningRoutingRules(), []);
  const created = await rules.createReasoningRoutingRule(ruleInput({ requestTags: ["one"] }));
  assert.deepEqual(await rules.getReasoningRoutingRules(), [created]);
  const updated = await rules.updateReasoningRoutingRule(created.id, {
    enabled: false,
    requestTags: [" TWO ", "two"],
    priority: 9,
  });
  assert.ok(updated);
  assert.equal(updated.createdAt, created.createdAt);
  assert.deepEqual(updated.requestTags, ["two"]);
  assert.deepEqual(await rules.getReasoningRoutingRules(), [updated]);
  assert.deepEqual(await rules.getReasoningRoutingRules({ enabledOnly: true }), []);
  assert.equal(await rules.updateReasoningRoutingRule("missing", { name: "absent" }), null);
  assert.equal(await rules.getReasoningRoutingRuleById("missing"), null);
  assert.equal(await rules.deleteReasoningRoutingRule("missing"), false);
  assert.equal(await rules.deleteReasoningRoutingRule(created.id), true);
  assert.deepEqual(await rules.getReasoningRoutingRules(), []);
});

test("warm cache reflects overlapping create", async () => {
  assert.deepEqual(await rules.getReasoningRoutingRules(), []);
  const pending = rules.createReasoningRoutingRule(ruleInput());
  const during = await rules.getReasoningRoutingRules();
  const created = await pending;
  assert.deepEqual(during, [created]);
});

test("warm cache reflects overlapping update", async () => {
  const created = await rules.createReasoningRoutingRule(ruleInput());
  assert.deepEqual(await rules.getReasoningRoutingRules(), [created]);
  const pending = rules.updateReasoningRoutingRule(created.id, {
    name: "Updated during read",
    requestTags: ["changed"],
  });
  const during = await rules.getReasoningRoutingRules();
  const updated = await pending;
  assert.ok(updated);
  assert.deepEqual(during, [updated]);
});

test("warm cache reflects overlapping delete", async () => {
  const created = await rules.createReasoningRoutingRule(ruleInput());
  assert.deepEqual(await rules.getReasoningRoutingRules(), [created]);
  const pending = rules.deleteReasoningRoutingRule(created.id);
  const during = await rules.getReasoningRoutingRules();
  assert.equal(await pending, true);
  assert.deepEqual(during, []);
});

test("reference diagnostics stay synchronous, ordered and identical to CRUD errors", async () => {
  for (const [patch, message] of [
    [{ scope: "apiKey", apiKeyId: "missing" }, "The referenced API key does not exist"],
    [{ scope: "combo", comboId: "missing" }, "The referenced source combo does not exist"],
    [
      { scope: "connection", connectionId: "missing" },
      "The referenced provider connection does not exist",
    ],
  ] as const) {
    const input = ruleInput({ ...patch, targetKind: "combo", targetComboId: "missing" });
    const errors = [message, "The referenced target combo does not exist"];
    assert.deepEqual(rules.getReasoningRoutingRuleReferenceErrors(input), errors);
    await assert.rejects(rules.createReasoningRoutingRule(input), { message: errors.join("; ") });
    const valid = await rules.createReasoningRoutingRule(ruleInput());
    await assert.rejects(rules.updateReasoningRoutingRule(valid.id, input), {
      message: errors.join("; "),
    });
    assert.deepEqual(await rules.getReasoningRoutingRuleById(valid.id), valid);
  }
  assert.deepEqual(rules.getReasoningRoutingRuleReferenceErrors(ruleInput()), []);
});

test("external invalidation reloads raw writes; reset reopens the same configured path", async () => {
  const created = await rules.createReasoningRoutingRule(ruleInput());
  await rules.getReasoningRoutingRules();
  core
    .getDbInstance()
    .prepare("UPDATE reasoning_routing_rules SET name = ? WHERE id = ?")
    .run("raw write", created.id);
  assert.equal((await rules.getReasoningRoutingRules())[0].name, created.name);
  rules.invalidateReasoningRoutingRuleCache();
  assert.equal((await rules.getReasoningRoutingRules())[0].name, "raw write");
  core
    .getDbInstance()
    .prepare("UPDATE reasoning_routing_rules SET name = ? WHERE id = ?")
    .run("before reset", created.id);
  core.resetDbInstance();
  assert.equal((await rules.getReasoningRoutingRules())[0].name, "before reset");
  assert.equal((await rules.getReasoningRoutingRuleById(created.id))?.name, "before reset");
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
  fs.mkdirSync(dataDir, { recursive: true });
  assert.deepEqual(await rules.getReasoningRoutingRules(), []);
  const fresh = await rules.createReasoningRoutingRule(ruleInput());
  assert.equal(await rules.deleteReasoningRoutingRule(fresh.id), true);
});

test("API-key and combo source/target deletions each invalidate a warm rule cache", async () => {
  const key = await apiKeys.createApiKey("Rule owner", "test-machine");
  await rules.createReasoningRoutingRule(ruleInput({ scope: "apiKey", apiKeyId: String(key.id) }));
  assert.equal((await rules.getReasoningRoutingRules()).length, 1);
  await apiKeys.deleteApiKey(String(key.id));
  assert.deepEqual(await rules.getReasoningRoutingRules(), []);
  for (const source of [true, false]) {
    const combo = await combos.createCombo({ name: `owner-${source}`, models: ["openai/test"] });
    await rules.createReasoningRoutingRule(
      ruleInput(
        source
          ? { scope: "combo", comboId: String(combo.id) }
          : { targetKind: "combo", targetComboId: String(combo.id) }
      )
    );
    assert.equal((await rules.getReasoningRoutingRules()).length, 1);
    await combos.deleteCombo(String(combo.id));
    assert.deepEqual(await rules.getReasoningRoutingRules(), []);
  }
});

for (const deletion of ["single", "batch", "provider"] as const) {
  test(`provider ${deletion} deletion invalidates a warm rule cache`, async () => {
    const connection = await providers.createProviderConnection({
      provider: "openai",
      authType: "apikey",
      name: "Rule owner",
    });
    const id = String(connection.id);
    await rules.createReasoningRoutingRule(ruleInput({ scope: "connection", connectionId: id }));
    assert.equal((await rules.getReasoningRoutingRules()).length, 1);
    if (deletion === "single") await providers.deleteProviderConnection(id);
    else if (deletion === "batch") await providers.deleteProviderConnections([id]);
    else await providers.deleteProviderConnectionsByProvider("openai");
    assert.deepEqual(await rules.getReasoningRoutingRules(), []);
  });
}
