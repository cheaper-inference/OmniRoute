import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dir = fs.mkdtempSync(path.join(os.tmpdir(), "buyer-cost-failure-"));
process.env.DATA_DIR = dir;
const { createSSEStream } = await import("../../../open-sse/utils/stream.ts");
const costReaders = await import("../../../open-sse/utils/buyerCostMicro.ts");
const { createStreamFailureFinalizers } =
  await import("../../../open-sse/utils/streamFailureFinalization.ts");
const { saveCallLog } = await import("../../../src/lib/usage/callLogs.ts");
const { getDbInstance, resetDbInstance } = await import("../../../src/lib/db/core.ts");

test.after(() => {
  resetDbInstance();
  fs.rmSync(dir, { recursive: true, force: true });
});
async function storedCost(payload: Record<string, unknown>) {
  const id = crypto.randomUUID();
  await saveCallLog({
    id,
    method: "POST",
    path: "/v1/chat/completions",
    provider: "fixture",
    model: "fixture",
    duration: 1,
    ...payload,
  });
  return (
    getDbInstance().prepare("SELECT buyer_cost_micro FROM call_logs WHERE id = ?").get(id) as {
      buyer_cost_micro: number | null;
    }
  ).buyer_cost_micro;
}

for (const tail of ["", "\n", "\n\n"]) {
  test(`translated terminal failure captures the last charge before abort, tail ${JSON.stringify(tail)}`, async () => {
    let completion: Record<string, unknown> | undefined;
    const stream = createSSEStream({
      mode: "translate",
      targetFormat: "openai-responses",
      sourceFormat: "openai",
      model: "fixture",
      onComplete(payload) {
        completion = payload as unknown as Record<string, unknown>;
      },
    });
    const failed = {
      type: "response.failed",
      response: {
        id: "resp_cost",
        status: "failed",
        error: { code: "server_error", message: "fixture failure" },
        usage: { input_tokens: 3, output_tokens: 2, buyer_cost_micro: 17 },
      },
    };
    const prefix = [
      { type: "response.created", response: { id: "resp_cost", usage: { buyer_cost_micro: 7 } } },
      {
        type: "response.output_text.delta",
        item_id: "msg_cost",
        output_index: 0,
        content_index: 0,
        delta: "answer",
      },
    ]
      .map((event) => `data: ${JSON.stringify(event)}\n\n`)
      .join("");
    const wire = await new Response(
      new Response(`${prefix}data: ${JSON.stringify(failed)}${tail}`).body!.pipeThrough(stream)
    ).text();
    assert.ok(completion);
    assert.equal(completion.buyerCostMicro, 17);
    assert.equal(await storedCost(completion), 17);
    assert.ok(wire.includes("answer"));
    assert.ok(!wire.includes("buyer_cost_micro"));
  });
}

for (const charge of [0, 17]) {
  test(`disconnect finalization persists observed charge ${charge} without flushing the stream`, async () => {
    const stream = createSSEStream({
      mode: "passthrough",
      clientResponseFormat: "openai",
      model: "fixture",
    });
    const writer = stream.writable.getWriter();
    const reader = stream.readable.getReader();
    const drain = (async () => {
      try {
        while (!(await reader.read()).done) {}
      } catch {}
    })();
    try {
      const frame = {
        id: "cost_partial",
        choices: [{ index: 0, delta: { content: "answer" }, finish_reason: null }],
        usage: { prompt_tokens: 3, completion_tokens: 2, buyer_cost_micro: charge },
      };
      await writer.write(new TextEncoder().encode(`data: ${JSON.stringify(frame)}\n\n`));
      let completion: Record<string, unknown> | undefined;
      const finalizers = createStreamFailureFinalizers({
        isFailureCompletionRecorded: () => Boolean(completion),
        onStreamComplete(payload) {
          completion = payload as unknown as Record<string, unknown>;
        },
        persistFailureUsage() {},
        readBuyerCostMicro: () => costReaders.readStreamBuyerCost(stream),
      });
      finalizers.handleStreamFailure({
        status: 499,
        message: "Client disconnected",
        code: "client_disconnected",
      });
      assert.ok(completion);
      assert.equal(completion.buyerCostMicro, charge);
      assert.equal(await storedCost(completion), charge);
      assert.equal(completion.usage, null);
    } finally {
      await reader.cancel("fixture done").catch(() => {});
      await writer.abort("fixture done").catch(() => {});
      await drain;
    }
  });
}

test("replayed nonterminal Responses events cannot overwrite the newest charge", async () => {
  let completion: Record<string, unknown> | undefined;
  const stream = createSSEStream({
    mode: "translate",
    targetFormat: "openai-responses",
    sourceFormat: "openai",
    model: "fixture",
    onComplete(payload) {
      completion = payload as unknown as Record<string, unknown>;
    },
  });
  const frames = [
    {
      type: "response.created",
      sequence_number: 2,
      response: { id: "resp_replay", usage: { buyer_cost_micro: 17 } },
    },
    {
      type: "response.created",
      sequence_number: 1,
      response: { id: "resp_replay", usage: { buyer_cost_micro: 7 } },
    },
    {
      type: "response.output_text.delta",
      sequence_number: 3,
      item_id: "msg_replay",
      output_index: 0,
      content_index: 0,
      delta: "answer",
    },
    {
      type: "response.failed",
      sequence_number: 4,
      response: {
        id: "resp_replay",
        status: "failed",
        error: { code: "server_error", message: "fixture failure" },
      },
    },
  ];
  await new Response(
    new Response(
      frames.map((frame) => `data: ${JSON.stringify(frame)}\n\n`).join("")
    ).body!.pipeThrough(stream)
  ).text();
  assert.ok(completion);
  assert.equal(completion.buyerCostMicro, 17);
  assert.equal(await storedCost(completion), 17);
});
