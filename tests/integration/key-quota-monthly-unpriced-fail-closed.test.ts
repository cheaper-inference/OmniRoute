// tests/integration/key-quota-monthly-unpriced-fail-closed.test.ts
//
// The per-key monthly USD quota must not admit a metered model for free just because
// the model has no pricing row. The quota sums request_cost_ledger, which only ever
// receives a positive priced amount, so unpriced usage never reached it. The quota now
// fails closed for the rest of the month, like the dollar budget (#17162) and the usage
// limit (#12341), with the same USAGE_LIMIT_IGNORE_UNPRICED opt-out.
//
// These tests drive the real chat pipeline (non-streaming and streaming) against a
// recording upstream and assert on what was actually dispatched.
import test from "node:test";
import assert from "node:assert/strict";
import { createComboRoutingHarness } from "./_comboRoutingHarness.ts";

const h = await createComboRoutingHarness("key-quota-monthly-unpriced");
const { BaseExecutor, handleChat, buildRequest, seedApiKey, seedConnection, resetStorage } = h;
const costRules = await import("../../src/domain/costRules.ts");
const keyQuotaDb = await import("../../src/lib/db/keyQuota.ts");

// A fresh database has no synced catalog, so no pricing row exists for this id.
const UNPRICED_MODEL_ID = "gpt-quota-unpriced-test";
const UNPRICED_MODEL = `openai/${UNPRICED_MODEL_ID}`;
const PRICED_MODEL = "openai/gpt-4o-mini";
const BIG_USAGE = {
  prompt_tokens: 1_000_000,
  completion_tokens: 1_000_000,
  total_tokens: 2_000_000,
};

function chatBody(model: string, stream = false) {
  return { model, stream, messages: [{ role: "user", content: "ping" }] };
}

async function keyWithMonthlyQuota(limitUsd: number) {
  const key = await seedApiKey({ name: "monthly-capped" });
  keyQuotaDb.upsertKeyQuotaLimits(key.id, { monthlyAmountUsd: limitUsd });
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

test("Q1: a completed non-streaming call to an unpriced metered model closes the monthly quota", async () => {
  await seedConnection("openai", { apiKey: "sk-openai-quota-unpriced" });
  const key = await keyWithMonthlyQuota(1);
  h.installRecordingFetch(() => h.buildOpenAIResponse("ok", UNPRICED_MODEL_ID, BIG_USAGE));

  const first = await handleChat(
    buildRequest({ body: chatBody(UNPRICED_MODEL), authKey: key.key })
  );
  assert.equal(first.status, 200, await first.clone().text());

  const second = await handleChat(
    buildRequest({ body: chatBody(UNPRICED_MODEL), authKey: key.key })
  );
  assert.equal(second.status, 429, await second.clone().text());
  assert.match(await second.text(), /without a price/i);
  assert.deepEqual(h.providersSeen(), ["openai"], "the refused call must not reach the upstream");
});

test("Q2: a completed streaming call to an unpriced metered model closes the monthly quota", async () => {
  await seedConnection("openai", { apiKey: "sk-openai-quota-unpriced-stream" });
  const key = await keyWithMonthlyQuota(1);
  h.installRecordingFetch(() => openAIStreamWithUsage(UNPRICED_MODEL_ID, BIG_USAGE));

  const first = await handleChat(
    buildRequest({ body: chatBody(UNPRICED_MODEL, true), authKey: key.key })
  );
  assert.equal(first.status, 200);
  await first.text();

  // The streaming charge is settled after the stream completes (fire-and-forget).
  const { checkKeyQuota } = await import("../../src/domain/keyQuota.ts");
  const closed = await h.waitFor(() => checkKeyQuota(key.id).allowed === false, 5000);
  assert.ok(closed, "the monthly quota must close once the unpriced stream has completed");

  const second = await handleChat(
    buildRequest({ body: chatBody(UNPRICED_MODEL, true), authKey: key.key })
  );
  assert.equal(second.status, 429, await second.clone().text());
  assert.deepEqual(h.providersSeen(), ["openai"], "the refused call must not reach the upstream");
});

test("Q3: priced traffic under the cap keeps flowing (control)", async () => {
  await seedConnection("openai", { apiKey: "sk-openai-quota-priced" });
  const key = await keyWithMonthlyQuota(1);
  h.installRecordingFetch();

  for (let i = 0; i < 2; i++) {
    const r = await handleChat(buildRequest({ body: chatBody(PRICED_MODEL), authKey: key.key }));
    assert.equal(r.status, 200, await r.clone().text());
  }
  assert.deepEqual(h.providersSeen(), ["openai", "openai"]);
});

test("Q4: USAGE_LIMIT_IGNORE_UNPRICED=true keeps counting unpriced usage as $0", async () => {
  const previous = process.env.USAGE_LIMIT_IGNORE_UNPRICED;
  process.env.USAGE_LIMIT_IGNORE_UNPRICED = "true";
  try {
    await seedConnection("openai", { apiKey: "sk-openai-quota-opt-out" });
    const key = await keyWithMonthlyQuota(1);
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
