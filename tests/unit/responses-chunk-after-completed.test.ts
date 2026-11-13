import test from "node:test";
import assert from "node:assert/strict";

import { initState } from "../../open-sse/translator/index.ts";
import { openaiToOpenAIResponsesResponse } from "../../open-sse/translator/response/openai-responses.ts";

type Chunk = Record<string, unknown>;
const chunk = (delta: Chunk, finish: string | null = null, extra: Chunk = {}): Chunk => ({
  id: "c1",
  object: "chat.completion.chunk",
  model: "m",
  choices: [{ index: 0, delta, finish_reason: finish }],
  ...extra,
});
const usage = { prompt_tokens: 1, completion_tokens: 1, total_tokens: 2 };

function feed(state: Record<string, unknown>, c: Chunk): string[] {
  const out = (openaiToOpenAIResponsesResponse(c, state) ?? []) as Array<{ event: string }>;
  return out.map((e) => e.event);
}

test("a content chunk after response.completed emits no events", () => {
  const state = initState("openai-responses") as Record<string, unknown>;
  feed(state, chunk({ content: "hi" }));
  const done = feed(state, chunk({}, "stop", { usage }));
  assert.ok(done.includes("response.completed"), "the stream completes on the finish chunk");
  assert.deepEqual(feed(state, chunk({ content: "late" })), []);
});

test("a tool-call chunk after response.completed emits no events", () => {
  const state = initState("openai-responses") as Record<string, unknown>;
  feed(state, chunk({ content: "hi" }));
  feed(state, chunk({}, "stop", { usage }));
  const late = feed(
    state,
    chunk({ tool_calls: [{ index: 0, id: "t1", function: { name: "f", arguments: "{}" } }] })
  );
  assert.deepEqual(late, []);
});

test("the normal order (content, finish, trailing usage) is unchanged", () => {
  const state = initState("openai-responses") as Record<string, unknown>;
  const events = [
    ...feed(state, chunk({ content: "hi" })),
    ...feed(state, chunk({}, "stop")),
    ...feed(state, { id: "c1", object: "chat.completion.chunk", model: "m", choices: [], usage }),
  ];
  assert.equal(events.filter((e) => e === "response.completed").length, 1);
  assert.equal(events.at(-1), "response.completed");
});
