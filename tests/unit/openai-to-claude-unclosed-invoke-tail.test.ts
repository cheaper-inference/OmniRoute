import test from "node:test";
import assert from "node:assert/strict";

const { openaiToClaudeResponse } =
  await import("../../open-sse/translator/response/openai-to-claude.ts");

type ClaudeEvent = {
  type: string;
  delta?: { type?: string; text?: string };
};

function run(chunks: string[]): ClaudeEvent[] {
  const state = {
    provider: "openai",
    toolCalls: new Map(),
    _pendingXmlToolCalls: [],
    _xmlInvokeBuffer: "",
  };
  const events: ClaudeEvent[] = [];
  const push = (out: unknown) => {
    if (out) events.push(...(out as ClaudeEvent[]));
  };
  for (const content of chunks) {
    push(
      openaiToClaudeResponse(
        {
          id: "chatcmpl-invoke-tail",
          model: "gpt-test",
          choices: [{ index: 0, delta: { content }, finish_reason: null }],
        },
        state
      )
    );
  }
  push(
    openaiToClaudeResponse(
      {
        id: "chatcmpl-invoke-tail",
        model: "gpt-test",
        choices: [{ index: 0, delta: {}, finish_reason: "stop" }],
        usage: { prompt_tokens: 5, completion_tokens: 7, total_tokens: 12 },
      },
      state
    )
  );
  return events;
}

const textOf = (events: ClaudeEvent[]) =>
  events
    .filter((e) => e.type === "content_block_delta" && e.delta?.type === "text_delta")
    .map((e) => e.delta?.text ?? "")
    .join("");

test("an unclosed <invoke> in prose is released as text when the stream ends", () => {
  const prose = 'To call a tool, emit an <invoke name="X"> element and then close it. Done.';
  const events = run([prose]);
  assert.equal(textOf(events), prose);
});

test("an unclosed <tool_call> in prose is released as text when the stream ends", () => {
  const prose = "Wrap the JSON in <tool_call> tags, for example <tool_call>{ and so on";
  const events = run([prose]);
  assert.equal(textOf(events), prose);
});
