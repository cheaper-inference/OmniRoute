import test from "node:test";
import assert from "node:assert/strict";

const { openaiResponsesToOpenAIResponse } =
  await import("../../open-sse/translator/response/openai-responses.ts");

type Chunk = Record<string, unknown> & {
  choices?: Array<{ finish_reason?: string | null }>;
  usage?: Record<string, unknown>;
};

function run(events: Array<Record<string, unknown>>) {
  const state: Record<string, unknown> = {};
  const out: Chunk[] = [];
  for (const ev of [...events, null]) {
    const r = openaiResponsesToOpenAIResponse(ev as never, state);
    if (Array.isArray(r)) out.push(...(r as Chunk[]));
    else if (r) out.push(r as Chunk);
  }
  return { state, out };
}

const finishReasons = (chunks: Chunk[]) =>
  chunks.map((c) => c.choices?.[0]?.finish_reason).filter(Boolean);

const textTurn = [
  {
    type: "response.created",
    response: { id: "resp_1", model: "gpt-5.6-sol", status: "in_progress" },
  },
  { type: "response.output_text.delta", item_id: "msg_1", output_index: 0, delta: "Hello" },
];

test("response.done(failed) surfaces an upstream error instead of a successful stop", () => {
  const { state, out } = run([
    ...textTurn,
    {
      type: "response.done",
      response: {
        id: "resp_1",
        status: "failed",
        error: { code: "server_error", message: "upstream exploded" },
      },
    },
  ]);
  const upstreamError = state.upstreamError as Record<string, unknown> | undefined;
  assert.ok(upstreamError, "response.done(failed) must set state.upstreamError");
  assert.equal(upstreamError.status, 502);
  assert.equal(upstreamError.message, "upstream exploded");
  assert.deepEqual(finishReasons(out), [], "no finish_reason chunk may be emitted on failure");
});

test("response.done(cancelled) without an error body still fails the stream", () => {
  const { state, out } = run([
    ...textTurn,
    { type: "response.done", response: { id: "resp_1", status: "cancelled" } },
  ]);
  const upstreamError = state.upstreamError as Record<string, unknown> | undefined;
  assert.ok(upstreamError, "response.done(cancelled) must set state.upstreamError");
  assert.equal(upstreamError.message, "Upstream failure");
  assert.deepEqual(finishReasons(out), []);
});

test("response.done(incomplete, max_output_tokens) maps to finish_reason length", () => {
  const { state, out } = run([
    ...textTurn,
    {
      type: "response.done",
      response: {
        id: "resp_1",
        status: "incomplete",
        incomplete_details: { reason: "max_output_tokens" },
      },
    },
  ]);
  assert.equal(state.upstreamError, undefined);
  assert.deepEqual(finishReasons(out), ["length"]);
});

test("response.done(completed) extracts usage onto the final chunk", () => {
  const { out } = run([
    ...textTurn,
    {
      type: "response.done",
      response: {
        id: "resp_1",
        status: "completed",
        usage: { input_tokens: 10, output_tokens: 5 },
      },
    },
  ]);
  assert.deepEqual(finishReasons(out), ["stop"]);
  const usage = out.find((c) => c.usage)?.usage;
  assert.equal(usage?.prompt_tokens, 10);
  assert.equal(usage?.completion_tokens, 5);
  assert.equal(usage?.total_tokens, 15);
});

test("response.failed followed by response.done(failed) keeps the first error only", () => {
  const { state, out } = run([
    ...textTurn,
    {
      type: "response.failed",
      response: {
        id: "resp_1",
        status: "failed",
        error: { code: "rate_limit_exceeded", message: "slow down" },
      },
    },
    { type: "response.done", response: { id: "resp_1", status: "failed" } },
  ]);
  const upstreamError = state.upstreamError as Record<string, unknown> | undefined;
  assert.ok(upstreamError);
  assert.equal(upstreamError.status, 429);
  assert.equal(upstreamError.message, "slow down");
  assert.deepEqual(finishReasons(out), []);
});

test("response.completed followed by response.done emits a single final chunk", () => {
  const { out } = run([
    ...textTurn,
    {
      type: "response.completed",
      response: { id: "resp_1", status: "completed", usage: { input_tokens: 3, output_tokens: 2 } },
    },
    {
      type: "response.done",
      response: { id: "resp_1", status: "completed", usage: { input_tokens: 3, output_tokens: 2 } },
    },
  ]);
  assert.deepEqual(finishReasons(out), ["stop"]);
});
