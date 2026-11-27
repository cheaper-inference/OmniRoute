import test from "node:test";
import assert from "node:assert/strict";
import { createChatPipelineHarness } from "../../integration/_chatPipelineHarness.ts";

const harness = await createChatPipelineHarness("buyer-cost-micro");
const { getDbInstance } = await import("../../../src/lib/db/core.ts");
const { ensureCallLogsColumns } = await import("../../../src/lib/db/schemaColumns.ts");
const { saveCallLog, waitForCallLogSaves } = await import("../../../src/lib/usage/callLogs.ts");
const { createSSEStream } = await import("../../../open-sse/utils/stream.ts");
const { normalizeUsage } = await import("../../../open-sse/utils/usageTracking.ts");
const originalFetch = globalThis.fetch;

function row() {
  return getDbInstance()
    .prepare(
      "SELECT buyer_cost_micro, tokens_in, tokens_out FROM call_logs ORDER BY rowid DESC LIMIT 1"
    )
    .get() as Record<string, unknown>;
}
async function save(buyerCostMicro?: unknown) {
  await saveCallLog({
    method: "POST",
    path: "/v1/chat/completions",
    status: 200,
    model: "fixture",
    provider: "openai",
    duration: 1,
    buyerCostMicro,
  });
  await waitForCallLogSaves(5000);
  return row();
}
test.beforeEach(async () => {
  await harness.resetStorage();
  await harness.settingsDb.updateSettings({
    requestRetry: 0,
    maxRetryIntervalSec: 0,
    hideAutoCombos: true,
    blockedProviders: ["aihorde"],
  });
});
test.afterEach(() => {
  globalThis.fetch = originalFetch;
});
test.after(async () => {
  globalThis.fetch = originalFetch;
  await harness.cleanup();
});

for (const value of [undefined, null, "17155", -1, NaN, Infinity, -Infinity]) {
  test(`invalid buyer cost ${String(value)} persists NULL`, async () => {
    assert.equal((await save(value)).buyer_cost_micro, null);
  });
}
for (const value of [0, 17155]) {
  test(`valid buyer cost ${value} persists exactly`, async () => {
    assert.equal((await save(value)).buyer_cost_micro, value);
  });
}
test("missing schema column is reconciled idempotently", async () => {
  getDbInstance().exec("ALTER TABLE call_logs DROP COLUMN buyer_cost_micro");
  ensureCallLogsColumns(getDbInstance());
  ensureCallLogsColumns(getDbInstance());
  assert.equal((await save(17155)).buyer_cost_micro, 17155);
});
test("normalization neither forwards money nor adds it to tokens", () => {
  const usage = { prompt_tokens: 5, input_tokens: 5, completion_tokens: 3, total_tokens: 8 };
  assert.deepEqual(normalizeUsage({ ...usage, buyer_cost_micro: 17155 }), normalizeUsage(usage));
});

for (const stream of [false, true]) {
  // The OpenAI-shaped client response already omits the field; this pins that it stays so.
  test(`real chat ${stream ? "stream" : "JSON"} persists provider charge without forwarding it`, async () => {
    await harness.seedConnection("openai");
    const requestBodies: unknown[] = [];
    let cost: number | undefined;
    globalThis.fetch = async (_url, init) => {
      requestBodies.push(JSON.parse(String(init?.body)));
      const usage = {
        prompt_tokens: 10,
        completion_tokens: 3,
        total_tokens: 13,
        ...(cost === undefined ? {} : { buyer_cost_micro: cost }),
      };
      if (!stream)
        return Response.json({
          id: "cost-fixture",
          object: "chat.completion",
          model: "gpt-4o",
          choices: [
            { index: 0, message: { role: "assistant", content: "ok" }, finish_reason: "stop" },
          ],
          usage,
        });
      return new Response(
        `data: ${JSON.stringify({ id: "cost-fixture", choices: [{ index: 0, delta: { role: "assistant", content: "ok" }, finish_reason: null }] })}\n\ndata: ${JSON.stringify({ id: "cost-fixture", choices: [{ index: 0, delta: {}, finish_reason: "stop" }], usage })}\n\ndata: [DONE]\n\n`,
        { headers: { "content-type": "text/event-stream" } }
      );
    };
    const outputs: string[] = [];
    const rows: Record<string, unknown>[] = [];
    for (cost of [undefined, 17155]) {
      const response = await harness.handleChat(
        harness.buildRequest({
          body: {
            model: "openai/gpt-4o",
            stream,
            messages: [{ role: "user", content: "offline buyer cost" }],
          },
        })
      );
      assert.equal(response.status, 200);
      outputs.push(await response.text());
      await waitForCallLogSaves(10000);
      rows.push(row());
    }
    assert.equal(rows[0].buyer_cost_micro, null);
    assert.equal(rows[1].buyer_cost_micro, 17155);
    assert.equal(rows[0].tokens_in, rows[1].tokens_in);
    assert.equal(rows[0].tokens_out, rows[1].tokens_out);
    assert.ok(outputs.every((value) => !value.includes("buyer_cost_micro")));
    assert.deepEqual(requestBodies[0], requestBodies[1]);
  });
}
for (const mode of ["translate", "passthrough"] as const) {
  for (const tail of ["", "\n", "\n\n"]) {
    test(`Claude ${mode} charge survives repaired input and tail ${JSON.stringify(tail)}`, async () => {
      const body = { model: "fixture", messages: [{ role: "user", content: "hello" }] };
      const before = JSON.stringify(body);
      let receipt: Record<string, unknown> | undefined;
      const events = [
        {
          type: "message_start",
          message: {
            id: "msg-cost",
            type: "message",
            role: "assistant",
            model: "fixture",
            content: [],
            usage: { input_tokens: 2, output_tokens: 0 },
          },
        },
        { type: "content_block_start", index: 0, content_block: { type: "text", text: "" } },
        { type: "content_block_delta", index: 0, delta: { type: "text_delta", text: "answer" } },
        { type: "content_block_stop", index: 0 },
        {
          type: "message_delta",
          delta: { stop_reason: "end_turn" },
          usage: { input_tokens: 119465, output_tokens: 663, buyer_cost_micro: 17155 },
        },
      ];
      const transform = createSSEStream({
        mode,
        targetFormat: "claude",
        sourceFormat: "openai",
        clientResponseFormat: "claude",
        provider: "anthropic",
        model: "fixture",
        body,
        onComplete(result) {
          receipt = result as unknown as Record<string, unknown>;
        },
      });
      const wire = await new Response(
        new Response(
          events.map((event) => `data: ${JSON.stringify(event)}`).join("\n\n") + tail
        ).body!.pipeThrough(transform)
      ).text();
      assert.ok(receipt);
      assert.equal(receipt.buyerCostMicro, 17155);
      assert.ok(Number((receipt.usage as Record<string, unknown>).prompt_tokens) < 119465);
      assert.equal((await save(receipt.buyerCostMicro)).buyer_cost_micro, 17155);
      // Recording the charge leaves the client wire as it was: a native Claude
      // passthrough keeps relaying the provider's usage field, and translation
      // never emitted it.
      if (mode === "passthrough") assert.ok(wire.includes('"buyer_cost_micro":17155'));
      else assert.ok(!wire.includes("buyer_cost_micro"));
      assert.equal(JSON.stringify(body), before);
    });
  }
}

test("provider error responses retain their charge in the actual call log", async () => {
  await harness.seedConnection("openai");
  globalThis.fetch = async () =>
    Response.json(
      {
        error: { message: "fixture rejection", type: "invalid_request_error" },
        usage: { prompt_tokens: 5, completion_tokens: 0, buyer_cost_micro: 17155 },
      },
      { status: 400 }
    );
  const response = await harness.handleChat(
    harness.buildRequest({
      body: {
        model: "openai/gpt-4o",
        stream: false,
        messages: [{ role: "user", content: "offline cost error" }],
      },
    })
  );
  assert.equal(response.status, 400);
  assert.ok(!(await response.text()).includes("buyer_cost_micro"));
  await waitForCallLogSaves(10000);
  assert.equal(row().buyer_cost_micro, 17155);
});

for (const status of [200, 400]) {
  test(`provider leg ${status} carries charge in the tool-loop receipt`, async () => {
    const { runNonStreamingProviderLeg } =
      await import("../../../open-sse/handlers/chatCore/nonStreamingProviderLeg.ts");
    const { baseInput, makeExecutorResult } =
      await import("../_helpers/nonStreamingProviderLegFixtures.ts");
    const result = await runNonStreamingProviderLeg(
      baseInput({
        executeProviderRequest: async () =>
          makeExecutorResult(
            {
              id: "cost-fixture",
              choices: [{ message: { role: "assistant", content: "ok" }, finish_reason: "stop" }],
              error: status === 400 ? { message: "fixture rejection" } : undefined,
              usage: {
                prompt_tokens: 10,
                completion_tokens: 3,
                total_tokens: 13,
                buyer_cost_micro: 17155,
              },
            },
            status
          ),
      })
    );
    assert.equal((result.receipt as unknown as Record<string, unknown>).buyerCostMicro, 17155);
  });
}

test("multi-leg charges never invent missing or imprecise totals", async () => {
  const { sumBuyerCostMicro } = await import("../../../open-sse/utils/buyerCostMicro.ts");
  assert.equal(
    sumBuyerCostMicro([{ buyerCostMicro: Number.MAX_SAFE_INTEGER }, { buyerCostMicro: 1 }]),
    null
  );
  assert.equal(sumBuyerCostMicro([{ buyerCostMicro: 0.5 }]), null);
  assert.equal(sumBuyerCostMicro([]), null);
  const repeated = { buyerCostMicro: 5 };
  assert.equal(sumBuyerCostMicro([repeated, repeated]), null);
});
