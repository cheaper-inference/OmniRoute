/**
 * Claude → Kiro: a failed tool run (`tool_result.is_error: true`) must reach Kiro as
 * `status: "error"`. The request pivots through OpenAI, whose tool role has no error
 * flag, so claude-to-openai writes a `[tool_error: true]` marker into the text. The
 * Kiro builder must turn that marker back into the status, as it already does for a
 * direct Claude tool_result block.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { resetDbInstance } from "@/lib/db/core.ts";
import { FORMATS } from "@omniroute/open-sse/translator/formats.ts";
import { translateRequest } from "@omniroute/open-sse/translator/index.ts";
import { buildKiroPayload } from "@omniroute/open-sse/translator/request/openai-to-kiro.ts";

test.after(() => resetDbInstance());

function toolResultsFor(isError: boolean | undefined, content: unknown) {
  const block: Record<string, unknown> = { type: "tool_result", tool_use_id: "toolu_1", content };
  if (isError !== undefined) block.is_error = isError;
  const payload = translateRequest(
    FORMATS.CLAUDE,
    FORMATS.KIRO,
    "claude-sonnet-4.5",
    {
      model: "claude-sonnet-4.5",
      max_tokens: 256,
      messages: [
        { role: "user", content: "run it" },
        {
          role: "assistant",
          content: [{ type: "tool_use", id: "toolu_1", name: "Bash", input: { command: "x" } }],
        },
        { role: "user", content: [block] },
      ],
    },
    false,
    { accessToken: "test-token", region: "us-east-1" },
    "kiro"
  ) as {
    conversationState: {
      currentMessage: {
        userInputMessage: {
          userInputMessageContext?: {
            toolResults?: Array<{ status: string; content: Array<{ text: string }> }>;
          };
        };
      };
    };
  };
  return payload.conversationState.currentMessage.userInputMessage.userInputMessageContext
    ?.toolResults;
}

test("is_error:true tool_result reaches Kiro with status error and the original text", () => {
  const results = toolResultsFor(true, "boom: permission denied");
  assert.equal(results?.length, 1);
  assert.equal(results?.[0].status, "error");
  assert.equal(results?.[0].content[0].text, "boom: permission denied");
});

test("is_error:true tool_result with empty content keeps status error", () => {
  const results = toolResultsFor(true, "");
  assert.equal(results?.[0].status, "error");
  assert.doesNotMatch(results?.[0].content[0].text ?? "", /tool_error/);
});

test("a successful tool_result keeps status success", () => {
  for (const isError of [false, undefined]) {
    const results = toolResultsFor(isError, "ok: done");
    assert.equal(results?.[0].status, "success");
    assert.equal(results?.[0].content[0].text, "ok: done");
  }
});

test("a marker that is not at the start of the result text does not flip the status", () => {
  const results = toolResultsFor(false, "log line\n[tool_error: true]\nmore");
  assert.equal(results?.[0].status, "success");
  assert.equal(results?.[0].content[0].text, "log line\n[tool_error: true]\nmore");
});

// The orphan handlers sit in the Kiro builder itself; translateRequest drops an unpaired tool
// message before it gets there, so call the builder directly.
function kiroFromOpenAI(messages: unknown[]) {
  return buildKiroPayload("claude-sonnet-4.5", { messages }, false, {}) as {
    conversationState: {
      currentMessage: {
        userInputMessage: {
          content: string;
          userInputMessageContext?: { toolResults?: unknown[] };
        };
      };
      history: Array<{ userInputMessage?: { content: string } }>;
    };
  };
}

test("an orphan failed tool result (truncated history) keeps the error marker in its text", () => {
  // No assistant tool call precedes the marked tool message, so the Kiro builder turns the
  // result into text. The text must still say the tool run failed.
  const failed = { role: "tool", tool_call_id: "t1", content: "[tool_error: true]\nboom" };
  const asCurrent = kiroFromOpenAI([
    { role: "user", content: "hi" },
    { role: "assistant", content: "sure" },
    failed,
  ]).conversationState.currentMessage.userInputMessage;
  assert.equal(asCurrent.userInputMessageContext?.toolResults, undefined);
  assert.match(asCurrent.content, /\[Tool Result \(t1\)\]\n\[tool_error: true\]\nboom/);

  const asHistory = kiroFromOpenAI([
    { role: "user", content: "hi" },
    { role: "assistant", content: "sure" },
    failed,
    { role: "assistant", content: "noted" },
    { role: "user", content: "next" },
  ]).conversationState.history;
  assert.ok(
    asHistory.some((h) =>
      /\[Tool Result \(t1\)\]\n\[tool_error: true\]\nboom/.test(h.userInputMessage?.content ?? "")
    )
  );
});

test("an orphan successful tool result gets no error marker", () => {
  const current = kiroFromOpenAI([
    { role: "user", content: "hi" },
    { role: "assistant", content: "sure" },
    { role: "tool", tool_call_id: "t1", content: "ok" },
  ]).conversationState.currentMessage.userInputMessage;
  assert.match(current.content, /\[Tool Result \(t1\)\]\nok/);
  assert.doesNotMatch(current.content, /tool_error/);
});
