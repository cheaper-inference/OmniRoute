import test from "node:test";
import assert from "node:assert/strict";
import {
  isAnthropicThinkingModifiedError,
  stripLatestAssistantThinkingForModifiedRecovery,
  executeWithAnthropicThinkingSignatureRecovery,
} from "../../open-sse/handlers/chatCore/passthroughHelpers.ts";
import { DEFAULT_THINKING_CLAUDE_SIGNATURE } from "../../open-sse/config/defaultThinkingSignature.ts";

const modified =
  "`thinking` or `redacted_thinking` blocks in the latest assistant message cannot be modified";

test("thinking-only content keeps the original error without an unsafe retry", async () => {
  const body = {
    messages: [
      { role: "user", content: [{ type: "text", text: "start" }] },
      {
        role: "assistant",
        content: [{ type: "thinking", thinking: "cut off", signature: "truncated" }],
      },
      { role: "user", content: [{ type: "text", text: "continue" }] },
    ],
  };
  const snapshot = structuredClone(body);
  const recovered = stripLatestAssistantThinkingForModifiedRecovery(body);
  assert.deepEqual(body, snapshot);
  assert.equal(recovered, body, "no safe recovery body can be built from thinking alone");
  assert.ok(
    recovered.messages.every(
      (message) => message.role !== "assistant" || message.content.length > 0
    ),
    "retry body must not contain assistant.content=[]"
  );
  const failure = { status: 400, message: modified };
  let calls = 0;
  const out = await executeWithAnthropicThinkingSignatureRecovery({
    provider: "claude",
    body,
    execute: async () => {
      calls++;
      return failure;
    },
    getError: (result) => result,
  });
  assert.equal(out.retried, false);
  assert.equal(out.result, failure, "the original upstream failure is preserved");
  assert.equal(calls, 1);
});

test("latest-message errors allow quoting, line breaks and compatible providers", () => {
  for (const quote of ["", "`", "'", '"']) {
    assert.equal(
      isAnthropicThinkingModifiedError({
        provider: "anthropic-compatible-test",
        status: 400,
        message: `${quote}thinking${quote} or ${quote}redacted_thinking${quote} blocks in the latest\nassistant message cannot be modified`,
      }),
      true
    );
  }
});

test("matcher excludes errors explicitly referring to a historical assistant message", () => {
  assert.equal(
    isAnthropicThinkingModifiedError({
      provider: "claude",
      status: 400,
      message:
        "`thinking` or `redacted_thinking` blocks in a historical assistant message cannot be modified",
    }),
    false
  );
});

test("an already rejected placeholder must not trigger an identical retry", async () => {
  const body = {
    messages: [
      { role: "user", content: [{ type: "text", text: "start" }] },
      {
        role: "assistant",
        content: [
          { type: "redacted_thinking", data: DEFAULT_THINKING_CLAUDE_SIGNATURE },
          { type: "tool_use", id: "toolu_test", name: "test", input: {} },
        ],
      },
      {
        role: "user",
        content: [{ type: "tool_result", tool_use_id: "toolu_test", content: "ok" }],
      },
    ],
  };
  let calls = 0;
  const out = await executeWithAnthropicThinkingSignatureRecovery({
    provider: "claude",
    body,
    execute: async () => {
      calls++;
      return { status: 400, message: modified };
    },
    getError: (result) => result,
  });
  assert.equal(
    out.retried,
    false,
    "replacing a placeholder with the identical placeholder is not recovery"
  );
  assert.equal(calls, 1);
});
