import test from "node:test";
import assert from "node:assert/strict";

const { openaiResponsesToOpenAIResponse } =
  await import("../../open-sse/translator/response/openai-responses.ts");
const { initState } = await import("../../open-sse/translator/index.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");
const { createSSEStream } = await import("../../open-sse/utils/stream.ts");

const encoder = new TextEncoder();

const delta = {
  type: "response.output_text.delta",
  item_id: "m1",
  output_index: 0,
  content_index: 0,
  delta: "hel",
};

test("translator: a flush with no terminal event and no [DONE] is an early EOF", () => {
  const state = initState(FORMATS.OPENAI) as {
    upstreamError?: { status: number; code: string };
    doneMarkerSeen?: boolean;
  };
  openaiResponsesToOpenAIResponse(delta, state);
  openaiResponsesToOpenAIResponse(null, state);
  assert.equal(state.upstreamError?.status, 502);
  assert.equal(state.upstreamError?.code, "stream_early_eof");
});

test("translator: a flush after [DONE] is not an early EOF", () => {
  const state = initState(FORMATS.OPENAI) as {
    upstreamError?: { status: number; code: string };
    doneMarkerSeen?: boolean;
  };
  openaiResponsesToOpenAIResponse(delta, state);
  state.doneMarkerSeen = true;
  openaiResponsesToOpenAIResponse(null, state);
  assert.equal(state.upstreamError, undefined);
});

test("translator: a flush after response.completed is not an early EOF", () => {
  const state = initState(FORMATS.OPENAI) as {
    upstreamError?: { status: number; code: string };
    doneMarkerSeen?: boolean;
  };
  openaiResponsesToOpenAIResponse(delta, state);
  openaiResponsesToOpenAIResponse(
    {
      type: "response.completed",
      response: { status: "completed", output: [], usage: { input_tokens: 1, output_tokens: 1 } },
    },
    state
  );
  openaiResponsesToOpenAIResponse(null, state);
  assert.equal(state.upstreamError, undefined);
});

// Chat client over a Responses upstream: the translator flushes at the end of the upstream stream.
async function runStream(lines: string[]): Promise<{ text: string; failures: unknown[] }> {
  const failures: unknown[] = [];
  const stream = createSSEStream({
    mode: "translate" as const,
    targetFormat: FORMATS.OPENAI_RESPONSES,
    sourceFormat: FORMATS.OPENAI,
    provider: "testprov",
    model: "m",
    body: { model: "m", messages: [{ role: "user", content: "hello world" }] },
    onFailure: (failure: unknown) => failures.push(failure),
  });
  const source = new ReadableStream<Uint8Array>({
    start(controller) {
      for (const line of lines) controller.enqueue(encoder.encode(line));
      controller.close();
    },
  });
  const text = await new Response(source.pipeThrough(stream)).text();
  return { text, failures };
}

const frame = (payload: unknown) => `data: ${JSON.stringify(payload)}\n\n`;

test("stream: output followed by a clean [DONE] ends normally, with no failure", async () => {
  const { text, failures } = await runStream([frame(delta), "data: [DONE]\n\n"]);
  assert.equal(failures.length, 0);
  assert.ok(text.includes("data: [DONE]"), text.slice(-200));
});

test("stream: output with no terminal event and no [DONE] is reported as a failure", async () => {
  const { failures } = await runStream([frame(delta)]);
  assert.equal(failures.length, 1);
  assert.equal((failures[0] as { code?: string }).code, "stream_early_eof");
});
