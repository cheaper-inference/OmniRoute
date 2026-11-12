import assert from "node:assert/strict";
import test from "node:test";
import { createChatPipelineHarness } from "../../integration/_chatPipelineHarness.ts";

const h = await createChatPipelineHarness("kimi-quota-owner");
const { runMigrations } = await import("../../../src/lib/db/migrationRunner.ts");
const quota = await import("../../../src/lib/quota/providerQuotaState.ts");
const originalFetch = globalThis.fetch;
const originalQuotaFlag = process.env.OMNIROUTE_QUOTA_AWARE_ROUTING;
test.after(async () => {
  globalThis.fetch = originalFetch;
  if (originalQuotaFlag === undefined) delete process.env.OMNIROUTE_QUOTA_AWARE_ROUTING;
  else process.env.OMNIROUTE_QUOTA_AWARE_ROUTING = originalQuotaFlag;
  await h.cleanup();
});
function seedLedger(connectionId: string, model: string, tokens: number, offset = 0) {
  const now = Date.now();
  h.core
    .getDbInstance()
    .prepare(
      "INSERT INTO provider_quota_state(connection_id,model,tokens_used,token_limit,window_start,window_reset,updated_at) VALUES(?,?,?,?,?,?,?)"
    )
    .run(
      connectionId,
      model,
      tokens,
      1000000,
      now - 1000 - offset,
      now + 60000 + offset,
      "original-" + model
    );
}
function rows(connectionId: string) {
  return h.core
    .getDbInstance()
    .prepare("SELECT * FROM provider_quota_state WHERE connection_id=? ORDER BY model")
    .all(connectionId);
}
function migrate() {
  const db = h.core.getDbInstance();
  db.prepare("DELETE FROM _omniroute_migrations WHERE version='239'").run();
  runMigrations(db);
}

test("E explicit OpenRouter combo passes each literal wire to executor and keeps distinct real quota reservations", async () => {
  await h.resetStorage();
  process.env.OMNIROUTE_QUOTA_AWARE_ROUTING = "1";
  const connection = await h.seedConnection("openrouter", { apiKey: "passthrough-secret" });
  for (const wire of ["moonshot/custom", "kimi/custom"]) seedLedger(connection.id, wire, 0);
  const received: string[] = [];
  globalThis.fetch = (async (input, init) => {
    assert.match(String(input), /openrouter/);
    const wire = JSON.parse(String(init?.body)).model;
    received.push(wire);
    return h.buildOpenAIResponse("wire reservation", wire, {
      prompt_tokens: 2,
      completion_tokens: 1,
      total_tokens: 3,
    });
  }) as typeof fetch;
  for (const [index, wire] of ["moonshot/custom", "kimi/custom"].entries()) {
    const combo = await h.combosDb.createCombo({
      name: "wire-quota-" + index,
      strategy: "round-robin",
      models: [
        {
          kind: "model",
          providerId: "openrouter",
          model: wire,
          connectionId: connection.id,
          weight: 100,
        },
      ],
    });
    const response = await h.handleChat(
      h.buildRequest({
        body: {
          model: combo.name,
          stream: false,
          max_tokens: 1,
          messages: [{ role: "user", content: wire }],
        },
      })
    );
    assert.equal(response.status, 200, await response.clone().text());
    await response.text();
  }
  assert.deepEqual(received, ["moonshot/custom", "kimi/custom"]);
  const ledger = rows(connection.id);
  assert.deepEqual(
    ledger.map((entry) => entry.model),
    ["kimi/custom", "moonshot/custom"]
  );
  assert.ok(
    ledger.every((entry) => Number(entry.tokens_used) > 0),
    JSON.stringify(ledger)
  );
});

test("E unrelated and unowned conflicting wire windows survive migration while verified API aliases merge", async () => {
  await h.resetStorage();
  delete process.env.OMNIROUTE_QUOTA_AWARE_ROUTING;
  const foreign = await h.seedConnection("openrouter");
  const native = await h.seedConnection("moonshot");
  for (const owner of [foreign.id, "deleted-account"]) {
    seedLedger(owner, "moonshot/custom", 2, 0);
    seedLedger(owner, "kimi/custom", 3, 5000);
  }
  // Native aliases represent local routing keys and retain the additive contract.
  const now = Date.now();
  const db = h.core.getDbInstance();
  for (const [model, used] of [
    ["moonshot/custom", 2],
    ["kimi/custom", 3],
  ])
    db.prepare(
      "INSERT INTO provider_quota_state(connection_id,model,tokens_used,token_limit,window_start,window_reset,updated_at) VALUES(?,?,?,10,?,?,'native')"
    ).run(native.id, model, used, now - 1000, now + 60000);
  const before = [rows(foreign.id), rows("deleted-account")];
  assert.doesNotThrow(() => migrate());
  assert.deepEqual([rows(foreign.id), rows("deleted-account")], before);
  assert.equal(rows(native.id).length, 1);
  assert.equal(rows(native.id)[0].model, "kimi/custom");
  assert.equal(rows(native.id)[0].tokens_used, 5);
  assert.equal(quota.getProviderQuota(native.id, "moonshot/custom")?.tokensUsed, 5);
  const once = db.prepare("SELECT * FROM provider_quota_state ORDER BY connection_id,model").all();
  migrate();
  assert.deepEqual(
    db.prepare("SELECT * FROM provider_quota_state ORDER BY connection_id,model").all(),
    once
  );
});

test("E live ledger lookup/recording requires verified API ownership for alias equivalence", async () => {
  await h.resetStorage();
  const foreign = await h.seedConnection("openrouter");
  const native = await h.seedConnection("kimi");
  for (const owner of [foreign.id, "deleted-account"]) {
    quota.recordProviderQuotaUsage(owner, "moonshot/custom", 2, { tokenLimit: 20 });
    quota.recordProviderQuotaUsage(owner, "kimi/custom", 3, { tokenLimit: 30 });
    assert.equal(rows(owner).length, 2);
    assert.equal(quota.getProviderQuota(owner, "moonshot/custom")?.tokensUsed, 2);
    assert.equal(quota.getProviderQuota(owner, "kimi/custom")?.tokensUsed, 3);
  }
  quota.recordProviderQuotaUsage(native.id, "moonshot/custom", 2, { tokenLimit: 20 });
  quota.recordProviderQuotaUsage(native.id, "kimi/custom", 3, { tokenLimit: 20 });
  assert.equal(rows(native.id).length, 1);
  assert.equal(quota.getProviderQuota(native.id, "moonshot/custom")?.tokensUsed, 5);
});

test("E verified native API ownership retains migration and runtime alias normalization", async () => {
  await h.resetStorage();
  const connection = await h.seedConnection("moonshot");
  const now = Date.now();
  for (const [model, used] of [
    ["moonshot/custom", 2],
    ["kimi/custom", 3],
  ])
    h.core
      .getDbInstance()
      .prepare(
        "INSERT INTO provider_quota_state(connection_id,model,tokens_used,token_limit,window_start,window_reset,updated_at) VALUES(?,?,?,20,?,?,'native-control')"
      )
      .run(connection.id, model, used, now - 1000, now + 60000);
  migrate();
  assert.equal(rows(connection.id).length, 1);
  assert.equal(quota.getProviderQuota(connection.id, "moonshot/custom")?.tokensUsed, 5);
  quota.recordProviderQuotaUsage(connection.id, "moonshot/custom", 2);
  assert.equal(quota.getProviderQuota(connection.id, "kimi/custom")?.tokensUsed, 7);
});

test("case-variant native quota model retains distinct recorded wire rows", async () => {
  await h.resetStorage();
  const connection = await h.seedConnection("kimi");
  quota.recordProviderQuotaUsage(connection.id, "MOONSHOT/custom", 7, { tokenLimit: 20 });
  quota.recordProviderQuotaUsage(connection.id, "moonshot/custom", 3, { tokenLimit: 20 });
  const before = rows(connection.id);
  assert.deepEqual(
    before.map((row) => row.model),
    ["MOONSHOT/custom", "kimi/custom"]
  );
  migrate();
  assert.deepEqual(rows(connection.id), before);
  assert.equal(quota.getProviderQuota(connection.id, "MOONSHOT/custom")?.tokensUsed, 7);
  assert.equal(quota.getProviderQuota(connection.id, "moonshot/custom")?.tokensUsed, 3);
  migrate();
  assert.deepEqual(rows(connection.id), before);
});
