import test from "node:test";
import assert from "node:assert/strict";

const { claudeToOpenAIResponse } =
  await import("../../open-sse/translator/response/claude-to-openai.ts");
const { initState } = await import("../../open-sse/translator/index.ts");

type Chunk = {
  choices?: Array<{
    delta?: { content?: string; tool_calls?: Array<{ function?: { arguments?: string } }> };
    finish_reason?: string | null;
  }>;
  usage?: {
    prompt_tokens: number;
    prompt_tokens_details?: { cached_tokens?: number };
  };
};

// A real stream serializes each chunk at once; snapshot so later state changes cannot alias it.
function run(events: unknown[]): Chunk[] {
  const state = initState("claude");
  return events.flatMap((event) => {
    const out = claudeToOpenAIResponse(event, state) as Chunk[] | null;
    return out ? (JSON.parse(JSON.stringify(out)) as Chunk[]) : [];
  });
}

const start = (usage: Record<string, number>) => ({
  type: "message_start",
  message: { id: "msg_1", model: "claude-test", usage },
});

test("message_delta that repeats input_tokens without cache fields keeps the cache read in prompt_tokens", () => {
  const out = run([
    start({ input_tokens: 10, cache_read_input_tokens: 1000, output_tokens: 1 }),
    {
      type: "message_delta",
      delta: { stop_reason: "end_turn" },
      usage: { input_tokens: 10, output_tokens: 50 },
    },
  ]);
  const usage = out.at(-1)?.usage;
  assert.equal(usage?.prompt_tokens_details?.cached_tokens, 1000);
  assert.equal(usage?.prompt_tokens, 1010);
});

test("a refusal explanation from stop_details reaches the client as content", () => {
  const out = run([
    start({ input_tokens: 5, output_tokens: 0 }),
    {
      type: "message_delta",
      delta: { stop_reason: "refusal", stop_details: { explanation: "Blocked by policy X" } },
      usage: { output_tokens: 0 },
    },
  ]);
  const text = out.map((chunk) => chunk.choices?.[0]?.delta?.content ?? "").join("");
  assert.equal(text, "Blocked by policy X");
  assert.equal(out.at(-1)?.choices?.[0]?.finish_reason, "content_filter");
});

test("a refusal without an explanation adds no content", () => {
  const out = run([
    start({ input_tokens: 5, output_tokens: 0 }),
    { type: "message_delta", delta: { stop_reason: "refusal" }, usage: { output_tokens: 0 } },
  ]);
  assert.equal(out.filter((chunk) => chunk.choices?.[0]?.delta?.content).length, 0);
});

test("a tool call without input ends with valid JSON arguments", () => {
  const out = run([
    start({ input_tokens: 5, output_tokens: 0 }),
    {
      type: "content_block_start",
      index: 0,
      content_block: { type: "tool_use", id: "toolu_1", name: "get_time", input: {} },
    },
    {
      type: "content_block_delta",
      index: 0,
      delta: { type: "input_json_delta", partial_json: "" },
    },
    { type: "content_block_stop", index: 0 },
    { type: "message_delta", delta: { stop_reason: "tool_use" }, usage: { output_tokens: 3 } },
  ]);
  const args = out
    .flatMap((chunk) => chunk.choices?.[0]?.delta?.tool_calls ?? [])
    .map((call) => call.function?.arguments ?? "")
    .join("");
  assert.deepEqual(JSON.parse(args), {});
});

test("a tool call with streamed input is not changed by the empty-arguments rule", () => {
  const out = run([
    start({ input_tokens: 5, output_tokens: 0 }),
    {
      type: "content_block_start",
      index: 0,
      content_block: { type: "tool_use", id: "toolu_2", name: "get_weather", input: {} },
    },
    {
      type: "content_block_delta",
      index: 0,
      delta: { type: "input_json_delta", partial_json: '{"city":"Oslo"}' },
    },
    { type: "content_block_stop", index: 0 },
  ]);
  const args = out
    .flatMap((chunk) => chunk.choices?.[0]?.delta?.tool_calls ?? [])
    .map((call) => call.function?.arguments ?? "")
    .join("");
  assert.deepEqual(JSON.parse(args), { city: "Oslo" });
});
