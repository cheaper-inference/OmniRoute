import assert from "node:assert/strict";
import test from "node:test";
import {
  codexPlanFromUsage,
  syncCodexPlanFromUsage,
} from "../../src/lib/usage/codexPlanSync.ts";
import { isCodexPlanEligibleForModel } from "../../open-sse/services/codexPlanEligibility.ts";

const paidModel = "gpt-6-sol";

test("live Free -> Plus upgrades both OAuth plan fields and unlocks paid Codex routing", async () => {
  const connection = {
    id: "codex-1",
    provider: "codex",
    providerSpecificData: {
      chatgptPlanType: "free",
      workspacePlanType: "free",
      workspaceId: "workspace-1",
      codexLimitPolicy: { use5h: true },
    },
  };
  assert.equal(isCodexPlanEligibleForModel(connection.providerSpecificData, paidModel), false);
  const writes: Array<{ id: string; fields: Record<string, unknown> }> = [];
  const updated = await syncCodexPlanFromUsage(
    connection,
    { plan: " PLUS ", quotas: { session: { remainingPercentage: 80 } } },
    async (id, fields) => {
      writes.push({ id, fields });
    }
  );

  assert.deepEqual(writes, [
    { id: "codex-1", fields: { chatgptPlanType: "plus", workspacePlanType: "plus" } },
  ]);
  assert.equal(updated.providerSpecificData.chatgptPlanType, "plus");
  assert.equal(updated.providerSpecificData.workspacePlanType, "plus");
  assert.equal(updated.providerSpecificData.workspaceId, "workspace-1");
  assert.deepEqual(updated.providerSpecificData.codexLimitPolicy, { use5h: true });
  assert.equal(isCodexPlanEligibleForModel(updated.providerSpecificData, paidModel), true);
  assert.equal(connection.providerSpecificData.chatgptPlanType, "free", "input stays unchanged");
});

test("live Plus -> Free downgrades routing eligibility", async () => {
  const updated = await syncCodexPlanFromUsage(
    { id: "codex-2", provider: "codex", providerSpecificData: { chatgptPlanType: "plus" } },
    { plan: "free" },
    async () => undefined
  );
  assert.equal(updated.providerSpecificData.chatgptPlanType, "free");
  assert.equal(isCodexPlanEligibleForModel(updated.providerSpecificData, paidModel), false);
});

test("do not overwrite a valid plan on missing, invalid, stale or failed usage", async () => {
  let writes = 0;
  const initial = { id: "codex-3", provider: "codex", providerSpecificData: { chatgptPlanType: "plus" } };
  for (const usage of [
    null,
    {},
    { plan: "unknown" },
    { plan: "" },
    { plan: 123 },
    { plan: "free", message: "Codex API error: 401" },
    { plan: "free", _stale: true },
    { plan: "plus<script>" },
  ]) {
    const updated = await syncCodexPlanFromUsage(initial, usage, async () => { writes += 1; });
    assert.equal(updated, initial);
  }
  assert.equal(writes, 0);
  assert.equal(codexPlanFromUsage({ plan: "self_serve_business_prolite" }), "self_serve_business_prolite");
});

test("no DB write for unchanged or differently-cased existing plans", async () => {
  let writes = 0;
  const connection = {
    id: "codex-4",
    provider: "codex",
    providerSpecificData: { chatgptPlanType: "Plus", workspacePlanType: "PLUS" },
  };
  const updated = await syncCodexPlanFromUsage(connection, { plan: "plus" }, async () => { writes += 1; });
  assert.equal(updated, connection);
  assert.equal(writes, 0);
});

test("does not rewrite unrelated providers or missing workspace field", async () => {
  let writes = 0;
  const other = { id: "other", provider: "claude", providerSpecificData: { chatgptPlanType: "free" } };
  assert.equal(
    await syncCodexPlanFromUsage(other, { plan: "plus" }, async () => { writes += 1; }),
    other
  );
  const codex = { id: "codex-5", provider: "codex", providerSpecificData: { chatgptPlanType: "free", priority: 9 } };
  const updated = await syncCodexPlanFromUsage(codex, { plan: "plus" }, async (_id, fields) => {
    assert.deepEqual(fields, { chatgptPlanType: "plus" });
    writes += 1;
  });
  assert.equal(writes, 1);
  assert.deepEqual(updated.providerSpecificData, { chatgptPlanType: "plus", priority: 9 });
});

test("metadata persistence failures do not break successful quota reads", async (t) => {
  t.mock.method(console, "warn", () => undefined);
  const connection = { id: "codex-6", provider: "codex", providerSpecificData: { chatgptPlanType: "free" } };
  const updated = await syncCodexPlanFromUsage(connection, { plan: "plus" }, async () => {
    throw new Error("database locked");
  });
  assert.equal(updated, connection);
});
