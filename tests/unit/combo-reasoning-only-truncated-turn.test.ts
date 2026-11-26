// 2026-11-20 incident: a model that spends its whole output budget thinking
// closes with `finish_reason: "length"` and `content: ""`. The combo peek used
// to accept that on the FIRST reasoning chunk (`reasoning_content` counted as
// value), so the target was never failed over and the caller ended the turn with
// an empty assistant message. The peek now keeps reading past reasoning and only
// rejects the turn when it closed at the output ceiling with no usable output.
import test from "node:test";
import assert from "node:assert/strict";

import { validateResponseQuality } from "../../open-sse/services/combo/validateQuality.ts";

const noopLog = { warn: () => undefined };

function sseResponse(frames: string[]): Response {
  const encoder = new TextEncoder();
  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      for (const frame of frames) controller.enqueue(encoder.encode(`data: ${frame}\n\n`));
      controller.close();
    },
  });
  return new Response(stream, {
    status: 200,
    headers: { "content-type": "text/event-stream" },
  });
}

function reasoningChunk(text: string) {
  return JSON.stringify({
    choices: [{ index: 0, delta: { reasoning_content: text } }],
  });
}

function contentChunk(text: string) {
  return JSON.stringify({
    choices: [{ index: 0, delta: { content: text } }],
  });
}

function terminalChunk(finishReason: string) {
  return JSON.stringify({
    choices: [{ index: 0, delta: {}, finish_reason: finishReason }],
  });
}

test("reasoning-only turn truncated at the ceiling fails over instead of passing", async () => {
  const out = await validateResponseQuality(
    sseResponse([
      reasoningChunk("vou analisar o pedido..."),
      reasoningChunk("continuo pensando e o orcamento acaba"),
      terminalChunk("length"),
    ]),
    true,
    noopLog
  );
  assert.equal(out.valid, false);
  assert.match(String(out.reason), /reasoning-only/i);
});

test("max_tokens truncation is rejected the same way", async () => {
  const out = await validateResponseQuality(
    sseResponse([reasoningChunk("pensando"), terminalChunk("max_tokens")]),
    true,
    noopLog
  );
  assert.equal(out.valid, false);
  assert.match(String(out.reason), /reasoning-only/i);
});

test("reasoning followed by real content still passes", async () => {
  const out = await validateResponseQuality(
    sseResponse([
      reasoningChunk("vou responder"),
      contentChunk("Resposta final."),
      terminalChunk("stop"),
    ]),
    true,
    noopLog
  );
  assert.equal(out.valid, true);
  assert.ok(out.clonedResponse, "the peeked prefix must be replayed to the client");
});

test("a reasoning-only turn that stopped normally keeps its previous pass-through", async () => {
  const out = await validateResponseQuality(
    sseResponse([reasoningChunk("pensando"), terminalChunk("stop")]),
    true,
    noopLog
  );
  assert.equal(out.valid, true);
});

test("a tool-call turn is never treated as reasoning-only", async () => {
  const out = await validateResponseQuality(
    sseResponse([
      JSON.stringify({
        choices: [
          {
            index: 0,
            delta: { tool_calls: [{ index: 0, id: "call_1", function: { name: "x" } }] },
          },
        ],
      }),
      terminalChunk("tool_calls"),
    ]),
    true,
    noopLog
  );
  assert.equal(out.valid, true);
});
