// Regression: devin-desktop renders an empty assistant reply when a tool-call turn
// ships `content: null` (production log: "[STREAM] Empty assistant response after
// tool_calls completion (devin-desktop:swe-2-flash-medium)", 495 occurrences in 7 days).
//
// The OpenAI schema permits null there, but a tool-call turn loses nothing by
// carrying an empty string, and strict OpenAI-compatible clients need one. The
// passthrough summary is the path devin-desktop (OpenAI upstream, OpenAI client)
// takes; the translate-mode summary applies the same invariant.
import test from "node:test";
import assert from "node:assert/strict";

import { createSSEStream } from "../../open-sse/utils/stream.ts";
import { FORMATS } from "../../open-sse/translator/formats.ts";

const encoder = new TextEncoder();

function chunk(delta: Record<string, unknown>, finishReason?: string): string {
  return `data: ${JSON.stringify({
    id: "chatcmpl_devin_empty",
    object: "chat.completion.chunk",
    created: 1,
    model: "swe-2-flash-medium",
    choices: [
      {
        index: 0,
        delta,
        ...(finishReason !== undefined ? { finish_reason: finishReason } : {}),
      },
    ],
  })}\n\n`;
}

type CompletePayload = {
  responseBody: {
    choices: Array<{
      message: { content: string | null; tool_calls?: unknown[] };
      finish_reason: string;
    }>;
  };
};

async function runStream(chunks: string[]): Promise<CompletePayload> {
  let captured: CompletePayload | null = null;
  const source = new ReadableStream<Uint8Array>({
    start(controller) {
      for (const line of chunks) controller.enqueue(encoder.encode(line));
      controller.close();
    },
  });

  await new Response(
    source.pipeThrough(
      createSSEStream({
        mode: "passthrough",
        sourceFormat: FORMATS.OPENAI,
        provider: "devin-desktop",
        model: "swe-2-flash-medium",
        body: { messages: [{ role: "user", content: "run the tests" }] },
        onComplete(payload: unknown) {
          captured = payload as CompletePayload;
        },
      }) as TransformStream<Uint8Array, Uint8Array>
    )
  ).text();

  assert.ok(captured, "the stream must report its completion");
  return captured as CompletePayload;
}

// Exactly what a tool-only turn looks like on the wire: no text delta at all.
const toolOnlyTurn = [
  chunk({ role: "assistant", content: null }),
  chunk({
    tool_calls: [
      { index: 0, id: "call_1", type: "function", function: { name: "shell", arguments: "" } },
    ],
  }),
  chunk(
    { tool_calls: [{ index: 0, function: { arguments: '{"cmd":"npm test"}' } }] },
    "tool_calls"
  ),
  "data: [DONE]\n\n",
];

test("tool-call turn carries content as a string, never null", async () => {
  const payload = await runStream(toolOnlyTurn);
  const choice = payload.responseBody.choices[0];

  assert.equal(choice.message.content, "", 'content must be "" so clients never read null');
  assert.equal(choice.finish_reason, "tool_calls");
  assert.equal(
    (choice.message.tool_calls as unknown[] | undefined)?.length,
    1,
    "the tool call itself must survive the fix"
  );
});

test("a normal text turn keeps its content untouched", async () => {
  const payload = await runStream([
    chunk({ role: "assistant", content: "All tests passed." }),
    chunk({}, "stop"),
    "data: [DONE]\n\n",
  ]);

  assert.equal(payload.responseBody.choices[0].message.content, "All tests passed.");
});
