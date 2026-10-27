import test from "node:test";
import assert from "node:assert/strict";

const { openaiToClaudeResponse } =
  await import("../../open-sse/translator/response/openai-to-claude.ts");

type ClaudeEvent = {
  type: string;
  index?: number;
  content_block?: { type: string };
  delta?: { type?: string; text?: string; thinking?: string; stop_reason?: string };
};

function createState(provider: string, requestedThinking?: boolean) {
  return {
    provider,
    requestedThinking,
    toolCalls: new Map(),
    _pendingXmlToolCalls: [],
    _xmlInvokeBuffer: "",
  };
}

function runStream(
  state: ReturnType<typeof createState>,
  model: string,
  deltas: Array<Record<string, unknown>>
): ClaudeEvent[] {
  const events: ClaudeEvent[] = [];
  for (const delta of deltas) {
    const out = openaiToClaudeResponse(
      { id: "chatcmpl-inline-think", model, choices: [{ index: 0, delta, finish_reason: null }] },
      state
    );
    if (out) events.push(...(out as ClaudeEvent[]));
  }
  const final = openaiToClaudeResponse(
    {
      id: "chatcmpl-inline-think",
      model,
      choices: [{ index: 0, delta: {}, finish_reason: "stop" }],
      usage: { prompt_tokens: 5, completion_tokens: 7, total_tokens: 12 },
    },
    state
  );
  if (final) events.push(...(final as ClaudeEvent[]));
  return events;
}

function textOf(events: ClaudeEvent[]): string {
  return events
    .filter((e) => e.type === "content_block_delta" && e.delta?.type === "text_delta")
    .map((e) => e.delta?.text ?? "")
    .join("");
}

function thinkingOf(events: ClaudeEvent[]): string {
  return events
    .filter((e) => e.type === "content_block_delta" && e.delta?.type === "thinking_delta")
    .map((e) => e.delta?.thinking ?? "")
    .join("");
}

function blockStarts(events: ClaudeEvent[]) {
  return events
    .filter((e) => e.type === "content_block_start")
    .map((e) => ({ index: e.index, type: e.content_block?.type }));
}

test("allowlisted route: inline <think> split across chunks becomes a Claude thinking block", () => {
  const state = createState("opencode", true);
  const events = runStream(state, "minimax-m3", [
    { content: "<thi" },
    { content: "nk>step 1" },
    { content: "</think>Answer" },
  ]);

  assert.equal(thinkingOf(events), "step 1");
  assert.equal(textOf(events), "Answer");
  for (const e of events) {
    if (e.delta?.type === "text_delta") {
      assert.ok(!e.delta.text?.includes("<think>"), "no <think> open tag in text");
      assert.ok(!e.delta.text?.includes("</think>"), "no </think> close tag in text");
    }
  }

  assert.deepEqual(blockStarts(events), [
    { index: 0, type: "thinking" },
    { index: 1, type: "text" },
  ]);

  // The thinking block must be closed before the text block opens.
  const thinkingStop = events.findIndex((e) => e.type === "content_block_stop" && e.index === 0);
  const textStart = events.findIndex((e) => e.type === "content_block_start" && e.index === 1);
  assert.ok(thinkingStop !== -1 && textStart !== -1 && thinkingStop < textStart);
  assert.equal(events.at(-1)?.type, "message_stop");
});

test("allowlisted route: stream ending inside an unclosed <think> flushes it as thinking", () => {
  const state = createState("opencode", true);
  const events = runStream(state, "minimax-m3", [
    { content: "<think>partial reas" },
    { content: "oning tail" },
  ]);

  assert.equal(thinkingOf(events), "partial reasoning tail");
  assert.equal(textOf(events), "");
  assert.ok(!blockStarts(events).some((b) => b.type === "text"));
});

test("allowlisted route: native reasoning_content still relays alongside inline parsing", () => {
  const state = createState("opencode", true);
  const events = runStream(state, "minimax-m3", [
    { reasoning_content: "native " },
    { content: "<think>inline</think>Done" },
  ]);

  assert.equal(thinkingOf(events), "native inline");
  assert.equal(textOf(events), "Done");
});

test("non-allowlisted route: literal <think> content passes through as text unchanged", () => {
  const state = createState("openai", true);
  const events = runStream(state, "gpt-5", [{ content: "<think>x</think> is literal" }]);

  assert.equal(textOf(events), "<think>x</think> is literal");
  assert.equal(thinkingOf(events), "");
  assert.ok(!blockStarts(events).some((b) => b.type === "thinking"));
});

test("antigravity route stays excluded from inline <think> parsing", () => {
  const state = createState("antigravity", true);
  const events = runStream(state, "deepseek-r1", [{ content: "<think>x</think>y" }]);

  assert.equal(textOf(events), "<think>x</think>y");
  assert.equal(thinkingOf(events), "");
});

test("requestedThinking === false: inline reasoning is not emitted as a thinking block", () => {
  const state = createState("opencode", false);
  const events = runStream(state, "minimax-m3", [{ content: "<think>hidden</think>Answer" }]);

  assert.equal(thinkingOf(events), "");
  assert.ok(!blockStarts(events).some((b) => b.type === "thinking"));
  assert.equal(textOf(events), "Answer");
});
