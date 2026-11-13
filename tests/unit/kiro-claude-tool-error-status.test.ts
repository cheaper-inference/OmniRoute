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
