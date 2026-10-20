import test from "node:test";
import assert from "node:assert/strict";

const {
  executeWithAnthropicThinkingSignatureRecovery,
  isAnthropicThinkingModifiedError,
  stripLatestAssistantThinkingForModifiedRecovery,
} = await import("@omniroute/open-sse/handlers/chatCore/passthroughHelpers.ts");
const { recoverAnthropicThinkingSignature } = await import(
  "@omniroute/open-sse/handlers/chatCore/thinkingSignatureRecovery.ts"
);
const { storeClaudeThinkingBlocks, clearClaudeThinkingStore } = await import(
  "@omniroute/open-sse/services/claudeThinkingStore.ts"
);

const CANNOT_BE_MODIFIED_MESSAGE =
  "messages.5.content.23: `thinking` or `redacted_thinking` blocks in the latest " +
  "assistant message cannot be modified. These blocks must remain as they were " +
  "in the original response.";

function makeHistory() {
  return {
    model: "claude-opus-5-5",
    messages: [
      { role: "user", content: [{ type: "text", text: "start" }] },
      {
        role: "assistant",
        content: [
          { type: "thinking", thinking: "old", signature: "HISTORICAL" },
          { type: "text", text: "old answer" },
        ],
      },
      { role: "user", content: [{ type: "text", text: "now do the heavy turn" }] },
      {
        role: "assistant",
        content: [
          { type: "thinking", thinking: "truncated by content_filter", signature: "STALE" },
          { type: "text", text: "partial answer" },
        ],
      },
    ],
  };
}

test("Anthropic thinking-modified recovery contract", async (t) => {
  await t.test("matches only the exact 'cannot be modified' 400", () => {
    assert.equal(
      isAnthropicThinkingModifiedError({
        provider: "claude",
        status: 400,
        message: CANNOT_BE_MODIFIED_MESSAGE,
      }),
      true
    );
    assert.equal(
      isAnthropicThinkingModifiedError({
        provider: "openrouter",
        status: 400,
        message: CANNOT_BE_MODIFIED_MESSAGE,
      }),
      false,
      "non-Anthropic providers are out of scope"
    );
    assert.equal(
      isAnthropicThinkingModifiedError({
        provider: "claude",
        status: 400,
        message: "messages.1.content.0: Invalid `signature` in `thinking` block",
      }),
      false,
      "the separate signature-rejection error is not this error"
    );
    assert.equal(
      isAnthropicThinkingModifiedError({
        provider: "claude",
        status: 429,
        message: CANNOT_BE_MODIFIED_MESSAGE,
      }),
      false,
      "only a 400 counts"
    );
  });

  await t.test(
    "strips only the latest assistant message's thinking, leaves earlier turns untouched",
    () => {
      const body = makeHistory();
      const snapshot = structuredClone(body);
      const recovered = stripLatestAssistantThinkingForModifiedRecovery(body);

      assert.notEqual(recovered, body);
      assert.deepEqual(body, snapshot, "input must not be mutated");
      assert.deepEqual(
        recovered.messages[1].content,
        body.messages[1].content,
        "the historical turn keeps its thinking block untouched"
      );
      assert.deepEqual(
        recovered.messages[3].content.map((block: { type: string }) => block.type),
        ["text"],
        "the latest assistant message's thinking block is dropped"
      );
    }
  );

  await t.test(
    "keeps a structurally valid placeholder ahead of tool_use in the latest message",
    () => {
      const body = {
        messages: [
          { role: "user", content: [{ type: "text", text: "go" }] },
          {
            role: "assistant",
            content: [
              { type: "thinking", thinking: "cut off", signature: "STALE" },
              { type: "tool_use", id: "toolu_1", name: "Bash", input: {} },
            ],
          },
        ],
      };

      const recovered = stripLatestAssistantThinkingForModifiedRecovery(body);
      assert.notEqual(recovered, body);
      const types = recovered.messages[1].content.map((block: { type: string }) => block.type);
      assert.deepEqual(types, ["redacted_thinking", "tool_use"]);
      assert.deepEqual(
        recovered.messages[1].content[1],
        body.messages[1].content[1],
        "the tool_use block itself is untouched"
      );
    }
  );

  await t.test("a store-restored block in the latest message is downgraded, not just dropped", () => {
    clearClaudeThinkingStore();
    const stored = storeClaudeThinkingBlocks({
      toolUseIds: ["toolu_restored"],
      blocks: [{ type: "thinking", thinking: "server-restored", signature: "RESTORED_SIG" }],
      provider: "claude",
      model: "claude-opus-5-5",
    });
    assert.equal(stored, true);

    const body = {
      messages: [
        { role: "user", content: [{ type: "text", text: "go" }] },
        {
          role: "assistant",
          content: [
            { type: "thinking", thinking: "server-restored", signature: "RESTORED_SIG" },
            { type: "tool_use", id: "toolu_restored", name: "Bash", input: {} },
          ],
        },
      ],
    };

    const recovered = stripLatestAssistantThinkingForModifiedRecovery(body);
    assert.notEqual(recovered, body);
    assert.deepEqual(
      recovered.messages[1].content.map((block: { type: string }) => block.type),
      ["redacted_thinking", "tool_use"]
    );
    clearClaudeThinkingStore();
  });

  await t.test("returns the original body reference when there is nothing to recover", () => {
    const body = {
      messages: [
        { role: "user", content: [{ type: "text", text: "go" }] },
        { role: "assistant", content: [{ type: "text", text: "no thinking here" }] },
      ],
    };
    assert.equal(stripLatestAssistantThinkingForModifiedRecovery(body), body);
  });

  await t.test(
    "executeWithAnthropicThinkingSignatureRecovery retries once on the 'cannot be modified' 400",
    async () => {
      const body = makeHistory();
      const snapshot = structuredClone(body);
      const calls: Array<ReturnType<typeof makeHistory>> = [];

      const out = await executeWithAnthropicThinkingSignatureRecovery({
        provider: "claude",
        body,
        execute: async (requestBody) => {
          calls.push(requestBody as ReturnType<typeof makeHistory>);
          return calls.length === 1
            ? { status: 400, message: CANNOT_BE_MODIFIED_MESSAGE }
            : { status: 200, message: "ok" };
        },
        getError: (result) => (result.status >= 400 ? result : null),
      });

      assert.equal(out.retried, true);
      assert.equal(calls.length, 2, "recovery is bounded to one retry");
      assert.equal(calls[0], body);
      assert.deepEqual(body, snapshot, "recovery must not mutate the caller body");
      assert.deepEqual(
        calls[1].messages[1].content,
        body.messages[1].content,
        "the historical turn is untouched by this recovery path"
      );
      assert.deepEqual(
        calls[1].messages[3].content.map((block: { type: string }) => block.type),
        ["text"],
        "only the latest assistant message's thinking is stripped"
      );
    }
  );

  await t.test("chatCore wrapper also recovers the 'cannot be modified' 400", async () => {
    const body = makeHistory();
    let executions = 0;
    const out = await recoverAnthropicThinkingSignature({
      provider: "claude",
      statusCode: 400,
      message: CANNOT_BE_MODIFIED_MESSAGE,
      body,
      execute: async (recoveryBody) => {
        executions += 1;
        assert.notEqual(recoveryBody, body);
        return {
          response: new Response(JSON.stringify({ type: "message" }), { status: 200 }),
          url: "https://api.anthropic.com/v1/messages",
          transformedBody: recoveryBody,
        };
      },
      parseError: async () => {
        throw new Error("successful recovery must not be parsed as an error");
      },
    });

    assert.equal(out.attempted, true);
    assert.equal(out.succeeded, true);
    assert.equal(executions, 1);
  });
});
