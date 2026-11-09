import test from "node:test";
import assert from "node:assert/strict";

const {
  buildComboTestRequestBody,
  extractComboTestResponseText,
  extractComboTestStreamResult,
  extractComboTestStreamText,
} = await import("../../src/lib/combos/testHealth.ts");

test("combo test helper builds a short smoke payload", () => {
  const body = buildComboTestRequestBody("openrouter/openai/gpt-5.4");

  assert.equal(body.model, "openrouter/openai/gpt-5.4");
  assert.equal(body.messages[0].content, "Reply with exactly: pong");
  assert.equal(body.max_tokens, 64);
  assert.equal("temperature" in body, false);
  assert.equal(body.stream, false);
  assert.equal("reasoning_effort" in body, false);
});

test("combo test helper turns off thinking for Gemini 3.8 flash-high probes", () => {
  const body = buildComboTestRequestBody("agy/gemini-3.8-flash-high");

  assert.equal(body.messages[0].content, "Reply with exactly: pong");
  assert.equal(body.max_tokens, 64);
  assert.equal(body.reasoning_effort, "none");
});

test("combo test helper builds a small streaming model probe", () => {
  const body = buildComboTestRequestBody("nvidia/z-ai/glm-5.2", false, { stream: true });
  assert.equal(body.stream, true);
  assert.equal(body.max_tokens, 64);
});

test("combo test helper ignores keepalives and extracts streamed model content", () => {
  const text = extractComboTestStreamText(
    ': keepalive\n\ndata: {"choices":[{"delta":{"content":"O"}}]}\n\n' +
      'data: {"choices":[{"delta":{"content":"K"}}]}\n\ndata: [DONE]\n\n'
  );
  assert.equal(text, "OK");
});

function streamDeltas(...deltas: Record<string, unknown>[]) {
  return (
    deltas.map((delta) => `data: ${JSON.stringify({ choices: [{ delta }] })}\n\n`).join("") +
    "data: [DONE]\n\n"
  );
}

for (const [name, reasoning] of [
  ["reasoning_content", { reasoning_content: "thinking" }],
  ["reasoning", { reasoning: "thinking" }],
  ["reasoning_text", { reasoning_text: "thinking" }],
  ["reasoning_details", { reasoning_details: [{ type: "reasoning.text", text: "thinking" }] }],
] as const) {
  test(`streamed ${name} is excluded when a final answer follows`, () => {
    assert.equal(extractComboTestStreamText(streamDeltas(reasoning, { content: "2" })), "2");
  });
}

test("streamed reasoning after final content is excluded", () => {
  assert.equal(
    extractComboTestStreamText(streamDeltas({ content: "2" }, { reasoning_content: "thinking" })),
    "2"
  );
});

test("a mixed reasoning and final content chunk returns only final content", () => {
  assert.equal(
    extractComboTestStreamText(streamDeltas({ content: "2", reasoning_content: "thinking" })),
    "2"
  );
});

test("streamed final content preserves whitespace between chunks", () => {
  assert.equal(
    extractComboTestStreamText(
      streamDeltas({ content: "Hello" }, { content: " " }, { content: " world" }, { content: "!" })
    ),
    "Hello  world!"
  );
});

test("streamed content blocks preserve whitespace between blocks and chunks", () => {
  assert.equal(
    extractComboTestStreamText(
      streamDeltas(
        {
          content: [
            { type: "text", text: "Hello" },
            { type: "text", text: " " },
          ],
        },
        { content: [{ type: "output_text", text: "world" }] }
      )
    ),
    "Hello world"
  );
});

test("empty and whitespace-only content do not suppress the reasoning-only fallback", () => {
  assert.equal(
    extractComboTestStreamText(
      streamDeltas({ content: "" }, { content: "  " }, { reasoning_content: "thinking" })
    ),
    "thinking"
  );
});

test("reasoning-only streams remain a healthy signal", () => {
  assert.equal(extractComboTestStreamText(streamDeltas({ reasoning: "thinking" })), "thinking");
});

test("empty content and reasoning do not appear around a final answer", () => {
  assert.equal(
    extractComboTestStreamText(
      streamDeltas({ content: " " }, { reasoning: "thinking" }, { content: "2" }, { content: "" })
    ),
    "2"
  );
});

test("non-streaming final content is preferred over reasoning", () => {
  assert.equal(
    extractComboTestResponseText({
      choices: [{ message: { content: "2", reasoning_content: "thinking" } }],
    }),
    "2"
  );
});

test("combo test helper preserves streamed upstream errors", () => {
  const result = extractComboTestStreamResult(
    'data: {"error":{"message":"Rate limit exceeded","code":"429"}}\n\n'
  );
  assert.deepEqual(result, {
    text: "",
    error: { message: "Rate limit exceeded", statusCode: 429 },
  });
});

test("combo test helper extracts text from chat-completions responses", () => {
  const text = extractComboTestResponseText({
    choices: [
      {
        message: {
          role: "assistant",
          content: "OK",
        },
      },
    ],
  });

  assert.equal(text, "OK");
});

test("combo test helper extracts text from block-based responses", () => {
  const text = extractComboTestResponseText({
    choices: [
      {
        message: {
          role: "assistant",
          content: [
            { type: "text", text: "OK" },
            { type: "output_text", text: "Confirmed." },
          ],
        },
      },
    ],
  });

  assert.equal(text, "OK\nConfirmed.");
});

test("combo test helper extracts reasoning content when visible text is absent", () => {
  const text = extractComboTestResponseText({
    choices: [
      {
        message: {
          role: "assistant",
          content: null,
          reasoning_content: "Working through the request.\nOK",
        },
      },
    ],
  });

  assert.equal(text, "Working through the request.\nOK");
});

test("combo test helper extracts reasoning_text aliases from GitHub-style responses", () => {
  const text = extractComboTestResponseText({
    choices: [
      {
        message: {
          role: "assistant",
          content: "",
          reasoning_text: "Reasoning trace",
        },
      },
    ],
  });

  assert.equal(text, "Reasoning trace");
});

test("combo test helper treats reasoning-only completions as a healthy signal", () => {
  const text = extractComboTestResponseText({
    choices: [
      {
        finish_reason: "length",
        message: {
          role: "assistant",
          content: "",
        },
      },
    ],
    usage: {
      prompt_tokens: 6,
      completion_tokens: 12,
      total_tokens: 18,
      completion_tokens_details: {
        reasoning_tokens: 12,
      },
    },
  });

  assert.equal(text, "[reasoning-only completion]");
});

test("combo test helper returns empty string when no text content exists", () => {
  const text = extractComboTestResponseText({
    choices: [
      {
        message: {
          role: "assistant",
          content: [{ type: "tool_call", id: "call_1" }],
        },
      },
    ],
  });

  assert.equal(text, "");
});
