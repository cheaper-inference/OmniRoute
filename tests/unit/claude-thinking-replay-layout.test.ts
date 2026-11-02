/** Synthetic regression for server-restored signatures rewritten during request preparation. */
import test from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import {
  storeClaudeThinkingFromResponse,
  clearClaudeThinkingStore,
} from "../../open-sse/services/claudeThinkingStore.ts";
import { translateRequest } from "../../open-sse/translator/index.ts";
import { FORMATS } from "../../open-sse/translator/formats.ts";

const digest = (value: unknown) => createHash("sha256").update(JSON.stringify(value)).digest("hex");

test("request preparation keeps restored signed blocks throughout the active tool cycle", () => {
  clearClaudeThinkingStore();
  const model = "claude-sonnet-4-5";
  const first = { type: "thinking", thinking: "SYNTHETIC_A", signature: "SYNTHETIC_SIG_A" };
  const second = { type: "redacted_thinking", data: "SYNTHETIC_OPAQUE_B" };
  for (const [block, id] of [
    [first, "toolu_SYNTHETIC_A"],
    [second, "toolu_SYNTHETIC_B"],
  ] as const) {
    assert.equal(
      storeClaudeThinkingFromResponse(
        { model, content: [block, { type: "tool_use", id, name: "read", input: {} }] },
        { provider: "claude", model, connectionId: "conn-layout" }
      ),
      true
    );
  }
  const result = translateRequest(
    FORMATS.OPENAI,
    FORMATS.CLAUDE,
    model,
    {
      reasoning_effort: "high",
      messages: [
        { role: "user", content: "Synthetic task" },
        {
          role: "assistant",
          content: null,
          tool_calls: [
            {
              id: "toolu_SYNTHETIC_A",
              type: "function",
              function: { name: "read", arguments: "{}" },
            },
          ],
        },
        { role: "tool", tool_call_id: "toolu_SYNTHETIC_A", content: "Synthetic A" },
        {
          role: "assistant",
          content: null,
          tool_calls: [
            {
              id: "toolu_SYNTHETIC_B",
              type: "function",
              function: { name: "read", arguments: "{}" },
            },
          ],
        },
        { role: "tool", tool_call_id: "toolu_SYNTHETIC_B", content: "Synthetic B" },
      ],
      tools: [{ type: "function", function: { name: "read", parameters: { type: "object" } } }],
    },
    false,
    {},
    "claude",
    null,
    { signatureNamespace: "conn-layout" }
  ) as { messages: Array<{ role: string; content: Array<Record<string, unknown>> }> };
  const turns = result.messages.filter((m) => m.role === "assistant");
  assert.equal(turns.length, 2);
  const signed = turns.map((m) =>
    m.content
      .filter((b) => b.type === "thinking" || b.type === "redacted_thinking")
      .map(({ cache_control: _cache, ...b }) => b)
  );
  assert.deepEqual(
    signed.map(digest),
    [[first], [second]].map(digest),
    "signed block hashes must survive the complete translator pipeline"
  );
  assert.deepEqual(
    turns.map((m) => m.content.map((b) => b.type)),
    [
      ["thinking", "tool_use"],
      ["redacted_thinking", "tool_use"],
    ]
  );
  clearClaudeThinkingStore();
});

import { prepareClaudeRequest } from "../../open-sse/translator/helpers/claudeHelper.ts";
import {
  restoreClaudeThinkingBlocks,
  isRestoredClaudeThinkingBlock,
} from "../../open-sse/services/claudeThinkingStore.ts";

for (const completed of [false, true]) {
  test(`restored block scope: completed history=${completed}`, () => {
    clearClaudeThinkingStore();
    const model = "claude-opus-5-5";
    const block = {
      type: "thinking",
      thinking: "SYNTHETIC_SCOPE",
      signature: "SYNTHETIC_SCOPE_SIG",
    };
    storeClaudeThinkingFromResponse(
      { model, content: [block, { type: "tool_use", id: "toolu_scope", name: "read", input: {} }] },
      { provider: "claude", model, connectionId: "conn-scope" }
    );
    const restored = restoreClaudeThinkingBlocks({
      toolUseIds: ["toolu_scope"],
      provider: "claude",
      model,
      connectionId: "conn-scope",
    })!;
    assert.equal(isRestoredClaudeThinkingBlock(restored[0]), true);
    assert.equal(
      isRestoredClaudeThinkingBlock({ ...restored[0] }),
      false,
      "matching bytes alone do not establish provenance"
    );
    const body = {
      thinking: { type: "adaptive" },
      messages: [
        { role: "user", content: [{ type: "text", text: "Synthetic task" }] },
        {
          role: "assistant",
          content: [
            ...restored,
            { type: "tool_use", id: "toolu_scope", name: "read", input: { path: "current" } },
          ],
        },
        {
          role: "user",
          content: [
            { type: "tool_result", tool_use_id: "toolu_scope", content: "Synthetic result" },
          ],
        },
        ...(completed
          ? [{ role: "user", content: [{ type: "text", text: "Synthetic new user task" }] }]
          : []),
        {
          role: "assistant",
          content: [
            { type: "thinking", thinking: "SYNTHETIC_LATEST", signature: "SYNTHETIC_LATEST_SIG" },
            { type: "tool_use", id: "toolu_latest", name: "read", input: {} },
          ],
        },
        {
          role: "user",
          content: [
            {
              type: "tool_result",
              tool_use_id: "toolu_latest",
              content: "Synthetic latest result",
            },
          ],
        },
      ],
    };
    const result = prepareClaudeRequest(body, "claude");
    const first = result.messages![1].content as Array<Record<string, unknown>>;
    assert.equal(first[0].type, completed ? "redacted_thinking" : "thinking");
    if (!completed)
      assert.equal(digest(first[0]), digest(block), "restored active signed bytes remain exact");
    assert.deepEqual(
      first[1].input,
      { path: "current" },
      "never replace tool arguments from a stored response"
    );
    clearClaudeThinkingStore();
  });
}
