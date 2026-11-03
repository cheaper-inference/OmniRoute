/**
 * tests/unit/17143-bedrock-tool-use-id-normalization.test.ts
 *
 * Issue #17143 — Bedrock Claude requests fail when tool history contains an
 * invalid tool_use.id:
 *
 *   messages.1.content.0.tool_use.id: String should match pattern
 *   '^[a-zA-Z0-9_-]+$'
 *
 * Bedrock validates tool-use ids against ^[a-zA-Z0-9_-]+$, but client
 * ecosystems (VS Code / IDE bridges) generate ids with dots, colons, slashes
 * and query characters that Anthropic accepts. OmniRoute's Bedrock executor
 * only trimmed the id, forwarding the invalid characters verbatim, so any
 * conversation replaying such history died with a 400.
 *
 * Contract:
 *   - every outgoing toolUse.toolUseId / toolResult.toolUseId matches the
 *     Bedrock pattern;
 *   - the request mapping reuses the ORIGINAL id, so a tool_use and its
 *     tool_result normalize to the SAME string (pairing preserved);
 *   - distinct originals stay distinct after the lossy character replacement;
 *   - already-valid ids pass through EXACTLY unchanged (no behavior change).
 *
 * TDD: the first test FAILS before the fix (invalid id forwarded verbatim).
 * See Hard Rule #18.
 */

import test from "node:test";
import assert from "node:assert/strict";

import { openAIToBedrockConverse } from "../../open-sse/executors/bedrock.ts";

const BEDROCK_TOOL_ID_RE = /^[a-zA-Z0-9_-]+$/;

/** Build a Converse payload for one assistant tool call + its tool result. */
function converseWithPair(rawId: string): ReturnType<typeof openAIToBedrockConverse> {
  return openAIToBedrockConverse("bedrock.claude-test", {
    messages: [
      { role: "user", content: "read the file" },
      {
        role: "assistant",
        content: "",
        tool_calls: [
          {
            id: rawId,
            type: "function",
            function: { name: "read_file", arguments: '{"path":"README.md"}' },
          },
        ],
      },
      { role: "tool", tool_call_id: rawId, content: "file contents" },
    ],
    tools: [
      {
        type: "function",
        function: {
          name: "read_file",
          parameters: { type: "object", properties: { path: { type: "string" } } },
        },
      },
    ],
  });
}

function collectIds(payload: ReturnType<typeof openAIToBedrockConverse>): {
  toolUseIds: string[];
  toolResultIds: string[];
} {
  const toolUseIds: string[] = [];
  const toolResultIds: string[] = [];
  for (const message of payload.messages ?? []) {
    for (const block of message?.content ?? []) {
      if (block?.toolUse?.toolUseId) toolUseIds.push(block.toolUse.toolUseId);
      if (block?.toolResult?.toolUseId) toolResultIds.push(block.toolResult.toolUseId);
    }
  }
  return { toolUseIds, toolResultIds };
}

test("#17143: invalid tool_use.id is normalized to Bedrock's pattern, pairing preserved", () => {
  const rawId = "vscode.call:file/1?x=2#frag";
  const payload = converseWithPair(rawId);
  const { toolUseIds, toolResultIds } = collectIds(payload);

  assert.equal(toolUseIds.length, 1, "assistant tool call must survive conversion");
  assert.equal(toolResultIds.length, 1, "tool result must survive conversion (pairing kept)");
  assert.match(
    toolUseIds[0],
    BEDROCK_TOOL_ID_RE,
    `toolUseId must match ^[a-zA-Z0-9_-]+$ — Bedrock 400s on anything else (got "${toolUseIds[0]}")`
  );
  assert.match(toolResultIds[0], BEDROCK_TOOL_ID_RE);
  assert.equal(
    toolUseIds[0],
    toolResultIds[0],
    "tool_use and tool_result must normalize to the same id within the request"
  );
});

test("#17143: distinct invalid originals stay distinct after normalization", () => {
  const a = collectIds(converseWithPair("a.b")).toolUseIds[0];
  const b = collectIds(converseWithPair("a:b")).toolUseIds[0];
  assert.match(a, BEDROCK_TOOL_ID_RE);
  assert.match(b, BEDROCK_TOOL_ID_RE);
  assert.notEqual(a, b, "lossy replacement must not collide distinct originals");
});

test("already-valid tool ids pass through exactly unchanged (behavior preserved)", () => {
  const rawId = "toolu_01ABC-xyz_9";
  const { toolUseIds, toolResultIds } = collectIds(converseWithPair(rawId));
  assert.equal(toolUseIds[0], rawId);
  assert.equal(toolResultIds[0], rawId);
});
