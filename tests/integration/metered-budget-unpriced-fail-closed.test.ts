// tests/integration/metered-budget-unpriced-fail-closed.test.ts
//
// The per-key dollar budget must not admit a metered model for free just because
// the model has no pricing row. The chat path charged the budget with
// meteredBudgetCost(provider, calculateCost(...)): an unpriced model is priced at
// $0, a zero charge is never recorded, and the budget gate kept admitting the model
// while the operator paid the upstream for every token. The per-key usage limit
// already fails closed on the same usage (#12341 / #13257); the dollar budget now
// follows the same policy and the same USAGE_LIMIT_IGNORE_UNPRICED opt-out.
//
// These tests drive the real chat pipeline (non-streaming and streaming) against a
// recording upstream and assert on what was actually dispatched.
import test from "node:test";
import assert from "node:assert/strict";
import { createComboRoutingHarness } from "./_comboRoutingHarness.ts";

const h = await createComboRoutingHarness("metered-budget-unpriced");
const { BaseExecutor, handleChat, buildRequest, seedApiKey, seedConnection, resetStorage } = h;
const costRules = await import("../../src/domain/costRules.ts");

// A fresh database has no synced catalog, so no pricing row exists for this id.
const UNPRICED_MODEL_ID = "gpt-budget-unpriced-test";
const UNPRICED_MODEL = `openai/${UNPRICED_MODEL_ID}`;
const PRICED_MODEL = "openai/gpt-4o-mini";
// Two million tokens: far above a $1 budget at any real price.
const BIG_USAGE = {
  prompt_tokens: 1_000_000,
  completion_tokens: 1_000_000,
  total_tokens: 2_000_000,
};

function chatBody(model: string, stream = false) {
  return { model, stream, messages: [{ role: "user", content: "ping" }] };
}

async function keyWithDailyBudget(limitUsd: number) {
  const key = await seedApiKey({ name: "budgeted" });
  costRules.setBudget(key.id, { dailyLimitUsd: limitUsd, resetInterval: "daily" });
  return key;
}

function openAIStreamWithUsage(model: string, usage: Record<string, number>) {
  const chunk = (payload: Record<string, unknown>) =>
    `data: ${JSON.stringify({ id: "chatcmpl_stream", object: "chat.completion.chunk", model, ...payload })}\n\n`;
  return new Response(
    chunk({ choices: [{ index: 0, delta: { role: "assistant", content: "ok" } }] }) +
      chunk({ choices: [{ index: 0, delta: {}, finish_reason: "stop" }] }) +
      chunk({ choices: [], usage }) +
      "data: [DONE]\n\n",
    { status: 200, headers: { "Content-Type": "text/event-stream" } }
  );
}

async function errorCode(response: Response): Promise<unknown> {
  const payload = await response.json();
  return payload?.error?.code;
}

test.beforeEach(async () => {
  BaseExecutor.RETRY_CONFIG.delayMs = 0;
  await resetStorage();
  costRules.resetCostData();
});
test.afterEach(async () => {
  BaseExecutor.RETRY_CONFIG.delayMs = h.originalRetryDelayMs;
  costRules.resetCostData();
  await resetStorage();
});
test.after(async () => {
  await h.cleanup();
});

test("U1: a completed non-streaming call to an unpriced metered model closes the dollar budget", async () => {
  await seedConnection("openai", { apiKey: "sk-openai-unpriced" });
  const key = await keyWithDailyBudget(1);
  h.installRecordingFetch(() => h.buildOpenAIResponse("ok", UNPRICED_MODEL_ID, BIG_USAGE));

  const first = await handleChat(
    buildRequest({ body: chatBody(UNPRICED_MODEL), authKey: key.key })
  );
  assert.equal(first.status, 200, await first.clone().text());

  const second = await handleChat(
    buildRequest({ body: chatBody(UNPRICED_MODEL), authKey: key.key })
  );
  assert.equal(second.status, 429, await second.clone().text());
  assert.equal(await errorCode(second), "BUDGET_EXCEEDED");
  assert.deepEqual(h.providersSeen(), ["openai"], "the refused call must not reach the upstream");
});

test("U2: a completed streaming call to an unpriced metered model closes the dollar budget", async () => {
  await seedConnection("openai", { apiKey: "sk-openai-unpriced-stream" });
  const key = await keyWithDailyBudget(1);
  h.installRecordingFetch(() => openAIStreamWithUsage(UNPRICED_MODEL_ID, BIG_USAGE));

  const first = await handleChat(
    buildRequest({ body: chatBody(UNPRICED_MODEL, true), authKey: key.key })
  );
  assert.equal(first.status, 200);
  await first.text();

  // The streaming charge is settled after the stream completes (fire-and-forget).
  const closed = await h.waitFor(() => costRules.checkBudget(key.id).allowed === false, 5000);
  assert.ok(closed, "the budget must close once the unpriced stream has completed");

  const second = await handleChat(
    buildRequest({ body: chatBody(UNPRICED_MODEL, true), authKey: key.key })
  );
  assert.equal(second.status, 429, await second.clone().text());
  assert.deepEqual(h.providersSeen(), ["openai"], "the refused call must not reach the upstream");
});

test("U3: priced traffic under the limit keeps flowing (control)", async () => {
  await seedConnection("openai", { apiKey: "sk-openai-priced" });
  const key = await keyWithDailyBudget(1);
  h.installRecordingFetch();

  for (let i = 0; i < 2; i++) {
    const r = await handleChat(buildRequest({ body: chatBody(PRICED_MODEL), authKey: key.key }));
    assert.equal(r.status, 200, await r.clone().text());
  }
  assert.deepEqual(h.providersSeen(), ["openai", "openai"]);
  assert.equal(costRules.checkBudget(key.id).allowed, true);
});

test("U4: USAGE_LIMIT_IGNORE_UNPRICED=true counts unpriced usage as $0, as it does for the usage limit", async () => {
  const previous = process.env.USAGE_LIMIT_IGNORE_UNPRICED;
  process.env.USAGE_LIMIT_IGNORE_UNPRICED = "true";
  try {
    await seedConnection("openai", { apiKey: "sk-openai-opt-out" });
    const key = await keyWithDailyBudget(1);
    h.installRecordingFetch(() => h.buildOpenAIResponse("ok", UNPRICED_MODEL_ID, BIG_USAGE));

    for (let i = 0; i < 2; i++) {
      const r = await handleChat(
        buildRequest({ body: chatBody(UNPRICED_MODEL), authKey: key.key })
      );
      assert.equal(r.status, 200, await r.clone().text());
    }
    assert.deepEqual(h.providersSeen(), ["openai", "openai"]);
  } finally {
    if (previous === undefined) delete process.env.USAGE_LIMIT_IGNORE_UNPRICED;
    else process.env.USAGE_LIMIT_IGNORE_UNPRICED = previous;
  }
});

test("U5: a key without a dollar budget is untouched by unpriced usage", async () => {
  await seedConnection("openai", { apiKey: "sk-openai-no-budget" });
  const key = await seedApiKey({ name: "unbudgeted" });
  h.installRecordingFetch(() => h.buildOpenAIResponse("ok", UNPRICED_MODEL_ID, BIG_USAGE));

  for (let i = 0; i < 2; i++) {
    const r = await handleChat(buildRequest({ body: chatBody(UNPRICED_MODEL), authKey: key.key }));
    assert.equal(r.status, 200, await r.clone().text());
  }
  assert.deepEqual(h.providersSeen(), ["openai", "openai"]);
});
