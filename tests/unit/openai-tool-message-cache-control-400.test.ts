import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { filterToOpenAIFormat } from "../../open-sse/translator/helpers/openaiHelper.ts";
import { openaiToClaudeRequest } from "../../open-sse/translator/request/openai-to-claude.ts";
import "../../open-sse/translator/bootstrap.ts";

// Regression for the live 2026-10-19 incident on
// openai-compatible-chat-a6dbb196… / claude-opus-5 (best-reasoning-paid):
//
//   [400]: messages.N.content.0.tool_result.content.0.cache_control:
//   cache_control may not be specified within `tool_result.content`.
//   Instead, place it directly on `tool_result`
//
// The client sent OpenAI-format `role:"tool"` messages whose content blocks
// carried `cache_control` (a downstream gateway then re-translates to the
// Anthropic protocol). filterToOpenAIFormat() returned tool messages AS-IS,
// so the markers survived and nested into tool_result.content[] on the
// Claude leg. The openai-compatible path never runs prepareClaudeRequest
// (targetFormat is "openai", not "claude"), so the existing
// claudeHelper's body-level hoistToolResultCacheControl guard could not intercept them.

function buildToolBody() {
  return {
    model: "claude-opus-5",
    messages: [
      { role: "system", content: [{ type: "text", text: "sys" }] },
      { role: "user", content: "list the files" },
      {
        role: "assistant",
        content: null,
        tool_calls: [
          {
            id: "call_TEST1",
            type: "function",
            function: { name: "list_files", arguments: "{}" },
          },
        ],
      },
      {
        role: "tool",
        tool_call_id: "call_TEST1",
        content: [
          {
            type: "text",
            text: "file contents",
            cache_control: { type: "ephemeral" },
          },
        ],
      },
    ],
    tools: [
      { type: "function", function: { name: "list_files", description: "ls", parameters: {} } },
    ],
  };
}

describe("OpenAI tool-message cache_control (tool_result.content 400)", () => {
  test("strip mode: markers are removed from tool message content blocks", () => {
    const out = filterToOpenAIFormat(buildToolBody(), { preserveCacheControl: false });
    const toolMsg = out.messages.find((m) => m.role === "tool");
    assert.ok(toolMsg, "tool message survived");
    assert.equal(JSON.stringify(toolMsg).includes("cache_control"), false);
    assert.equal(JSON.stringify(out).includes("cache_control"), false);
  });

  test("preserve mode: marker is hoisted onto the tool MESSAGE, not its content blocks", () => {
    const out = filterToOpenAIFormat(buildToolBody(), { preserveCacheControl: true });
    const toolMsg = out.messages.find((m) => m.role === "tool");
    assert.ok(toolMsg);
    // Marker no longer nested inside content[]
    assert.equal(
      toolMsg.content.some((c) => c && c.cache_control !== undefined),
      false
    );
    // ...it lives on the message itself
    assert.deepEqual(toolMsg.cache_control, { type: "ephemeral" });
  });

  test("preserve mode: openai→claude emits block-level cache_control on tool_result", () => {
    const openai = filterToOpenAIFormat(buildToolBody(), { preserveCacheControl: true });
    const claude = openaiToClaudeRequest("claude-opus-5", openai, false, null);
    const msgs = claude.messages;
    const toolResultMsg = msgs.find(
      (m) => Array.isArray(m.content) && m.content.some((b) => b.type === "tool_result")
    );
    assert.ok(toolResultMsg, "tool_result block exists");
    const toolResult = toolResultMsg.content.find((b) => b.type === "tool_result");
    // Block-level marker: valid Anthropic placement
    assert.deepEqual(toolResult.cache_control, { type: "ephemeral" });
    // No marker nested inside tool_result.content
    assert.equal(JSON.stringify(toolResult.content).includes("cache_control"), false);
  });

  test("strip mode: openai→claude emits no NESTED tool_result.content marker", () => {
    const openai = filterToOpenAIFormat(buildToolBody(), { preserveCacheControl: false });
    const claude = openaiToClaudeRequest("claude-opus-5", openai, false, null);
    for (const msg of claude.messages) {
      if (!Array.isArray(msg.content)) continue;
      for (const block of msg.content) {
        if (block.type !== "tool_result") continue;
        // The defect this suite guards: a marker nested INSIDE tool_result.content
        assert.equal(
          JSON.stringify(block.content).includes("cache_control"),
          false,
          `nested marker inside tool_result.content: ${JSON.stringify(block).slice(0, 200)}`
        );
      }
    }
  });

  test("string tool content is untouched in both modes", () => {
    for (const preserveCacheControl of [false, true]) {
      const body = buildToolBody();
      body.messages[3].content = "plain tool output";
      const out = filterToOpenAIFormat(body, { preserveCacheControl });
      const toolMsg = out.messages.find((m) => m.role === "tool");
      assert.equal(toolMsg.content, "plain tool output");
    }
  });

  // --- Direct openai→claude leg (no filterToOpenAIFormat in front) ---------
  // A client translating straight to the Anthropic protocol never passes
  // through filterToOpenAIFormat, so openai-to-claude must hoist on its own.
  // Verified against the captured 157-message live body: without this the
  // direct leg still emitted 2 nested markers.

  test("direct openai→claude hoists a nested marker off role:'tool' content", () => {
    const claude = openaiToClaudeRequest("claude-opus-5", buildToolBody(), false, null);
    const toolResult = claude.messages
      .flatMap((m) => (Array.isArray(m.content) ? m.content : []))
      .find((b) => b.type === "tool_result");
    assert.ok(toolResult, "tool_result block exists");
    assert.deepEqual(toolResult.cache_control, { type: "ephemeral" });
    assert.equal(JSON.stringify(toolResult.content).includes("cache_control"), false);
  });

  test("direct openai→claude hoists a marker nested in a user-turn tool_result part", () => {
    const body = {
      model: "claude-opus-5",
      messages: [
        { role: "user", content: "list the files" },
        {
          role: "assistant",
          content: null,
          tool_calls: [
            {
              id: "call_TEST2",
              type: "function",
              function: { name: "list_files", arguments: "{}" },
            },
          ],
        },
        {
          role: "user",
          content: [
            {
              type: "tool_result",
              tool_use_id: "call_TEST2",
              content: [
                { type: "text", text: "nested result", cache_control: { type: "ephemeral" } },
              ],
            },
          ],
        },
      ],
    };
    const claude = openaiToClaudeRequest("claude-opus-5", body, false, null);
    const toolResult = claude.messages
      .flatMap((m) => (Array.isArray(m.content) ? m.content : []))
      .find((b) => b.type === "tool_result");
    assert.ok(toolResult, "tool_result block exists");
    assert.deepEqual(toolResult.cache_control, { type: "ephemeral" });
    assert.equal(JSON.stringify(toolResult.content).includes("cache_control"), false);
  });

  test("an explicit block-level marker wins over a nested one", () => {
    const body = buildToolBody();
    body.messages[3].cache_control = { type: "ephemeral", ttl: "1h" };
    const claude = openaiToClaudeRequest("claude-opus-5", body, false, null);
    const toolResult = claude.messages
      .flatMap((m) => (Array.isArray(m.content) ? m.content : []))
      .find((b) => b.type === "tool_result");
    assert.deepEqual(toolResult.cache_control, { type: "ephemeral", ttl: "1h" });
    assert.equal(JSON.stringify(toolResult.content).includes("cache_control"), false);
  });

  test("tool_result without any marker gains no cache_control key", () => {
    const body = buildToolBody();
    delete body.messages[3].content[0].cache_control;
    const claude = openaiToClaudeRequest("claude-opus-5", body, false, null);
    const toolResult = claude.messages
      .flatMap((m) => (Array.isArray(m.content) ? m.content : []))
      .find((b) => b.type === "tool_result");
    assert.ok(toolResult);
    assert.equal("cache_control" in toolResult, false);
  });
});
