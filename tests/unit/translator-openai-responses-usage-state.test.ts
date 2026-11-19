import test from "node:test";
import assert from "node:assert/strict";

const { openaiToOpenAIResponsesResponse } =
  await import("../../open-sse/translator/response/openai-responses.ts");
const { initState } = await import("../../open-sse/translator/index.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");
const { extractUsage } = await import("../../open-sse/utils/usageTracking.ts");

const mk = (delta, finish = null, usage = undefined) => ({
  id: "chatcmpl-usage",
  model: "test-model",
  choices: [{ index: 0, delta, finish_reason: finish }],
  ...(usage ? { usage } : {}),
});

// stream.ts runs extractUsage() into state.usage before it calls the translator.
function translate(state, chunk) {
  const extracted = chunk ? extractUsage(chunk) : null;
  if (extracted && !state.usage) state.usage = extracted;
  return openaiToOpenAIResponsesResponse(chunk, state) || [];
}

const completedUsage = (events) =>
  events.find((e) => e.event === "response.completed")?.data.response.usage;

test("the translator does not overwrite the shared state.usage that billing reads", () => {
  const state = initState(FORMATS.OPENAI_RESPONSES);
  const chunk = mk({}, "stop", {
    prompt_tokens: 10,
    completion_tokens: 5,
    total_tokens: 15,
    cost: 0.0123,
    completion_tokens_details: { reasoning_tokens: 3 },
  });
  const events = translate(state, chunk);
  assert.equal(state.usage.cost_usd, 0.0123, JSON.stringify(state.usage));
  assert.equal(state.usage.reasoning_tokens, 3, JSON.stringify(state.usage));
  assert.equal(completedUsage(events).input_tokens, 10);
  assert.equal(completedUsage(events).output_tokens_details.reasoning_tokens, 3);
});

test("flat cache and reasoning counters reach response.completed usage", () => {
  for (const flat of [
    { prompt_cache_hit_tokens: 80 },
    { cache_read_input_tokens: 80 },
    { cached_tokens: 80 },
  ]) {
    const state = initState(FORMATS.OPENAI_RESPONSES);
    const events = translate(
      state,
      mk({}, "stop", { prompt_tokens: 100, completion_tokens: 5, reasoning_tokens: 2, ...flat })
    );
    const usage = completedUsage(events);
    assert.equal(usage?.input_tokens_details.cached_tokens, 80, JSON.stringify({ flat, usage }));
    assert.equal(usage.output_tokens_details.reasoning_tokens, 2, JSON.stringify({ flat, usage }));
  }
});

test("a zero or empty usage placeholder waits for the trailing real usage", () => {
  for (const placeholder of [{ prompt_tokens: 0, completion_tokens: 0, total_tokens: 0 }, {}]) {
    const state = initState(FORMATS.OPENAI_RESPONSES);
    const events = [
      ...translate(state, mk({ content: "hi" }, null, placeholder)),
      ...translate(state, mk({}, "stop", placeholder)),
      ...translate(state, {
        id: "chatcmpl-usage",
        model: "test-model",
        choices: [],
        usage: { prompt_tokens: 100, completion_tokens: 7, total_tokens: 107 },
      }),
      ...translate(state, null),
    ];
    assert.equal(events.filter((e) => e.event === "response.completed").length, 1);
    const usage = completedUsage(events);
    assert.equal(usage?.input_tokens, 100, JSON.stringify({ placeholder, usage }));
    assert.equal(usage.output_tokens, 7);
  }
});
