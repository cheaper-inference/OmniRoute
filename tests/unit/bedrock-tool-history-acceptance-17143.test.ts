import assert from "node:assert/strict";
import test from "node:test";

import { openAIToBedrockConverse } from "../../open-sse/executors/bedrock.ts";

type Format = "openai" | "claude";
type Message = Record<string, unknown>;

function history(format: Format, ids: string[]): Message[] {
  if (format === "claude") {
    return [
      {
        role: "assistant",
        content: ids.map((id, index) => ({
          type: "tool_use",
          id,
          name: `tool_${index}`,
          input: { index },
        })),
      },
      {
        role: "user",
        content: ids.map((id, index) => ({
          type: "tool_result",
          tool_use_id: id,
          content: `result_${index}`,
        })),
      },
    ];
  }
  return [
    {
      role: "assistant",
      content: "",
      tool_calls: ids.map((id, index) => ({
        id,
        type: "function",
        function: { name: `tool_${index}`, arguments: JSON.stringify({ index }) },
      })),
    },
    ...ids.map((id, index) => ({
      role: "tool",
      tool_call_id: id,
      content: `result_${index}`,
    })),
  ];
}

function convert(messages: Message[]) {
  const payload = openAIToBedrockConverse("bedrock.claude-test", { messages });
  const blocks = payload.messages.flatMap((message) => message.content);
  return {
    uses: blocks.flatMap((block) => (block.toolUse ? [block.toolUse] : [])),
    results: blocks.flatMap((block) => (block.toolResult ? [block.toolResult] : [])),
  };
}

function assertPairs(output: ReturnType<typeof convert>, count: number) {
  assert.equal(output.uses.length, count, "all distinct calls survive conversion");
  assert.equal(output.results.length, count, "all corresponding results survive conversion");
  for (let index = 0; index < count; index++) {
    assert.match(output.uses[index].toolUseId, /^[a-zA-Z0-9_-]+$/);
    assert.equal(output.results[index].toolUseId, output.uses[index].toolUseId);
    assert.equal(output.uses[index].name, `tool_${index}`);
    assert.equal(output.results[index].content[0].text, `result_${index}`);
  }
}

for (const format of ["openai", "claude"] as const) {
  test(`${format}: invalid IDs with the same sanitized prefix retain both pairs`, () => {
    const output = convert(history(format, ["a.b", "a:b"]));
    assertPairs(output, 2);
    assert.notEqual(output.uses[0].toolUseId, output.uses[1].toolUseId);
  });

  test(`${format}: an already-valid ID cannot steal another call's normalized ID`, () => {
    // Obtain the collision through the public converter, without duplicating its hash algorithm.
    const normalized = convert(history("openai", ["a.b"])).uses[0].toolUseId;
    for (const ids of [
      ["a.b", normalized],
      [normalized, "a.b"],
    ]) {
      const output = convert(history(format, ids));
      assertPairs(output, 2);
      assert.notEqual(output.uses[0].toolUseId, output.uses[1].toolUseId);
      assert.equal(output.uses[ids.indexOf(normalized)].toolUseId, normalized);
    }
  });

  test(`${format}: repeated collisions reserve suffixed IDs without leaking across requests`, () => {
    const rawId = `${"long".repeat(20)}.call`;
    const first = convert(history("openai", [rawId])).uses[0].toolUseId;
    const ids = [rawId, first, `${first}_1`, `${first}_2`];
    const output = convert(history(format, ids));
    assertPairs(output, 4);
    assert.equal(new Set(output.uses.map((use) => use.toolUseId)).size, 4);
    assert.deepEqual(
      output.uses.slice(1).map((use) => use.toolUseId),
      ids.slice(1)
    );
    for (const use of output.uses) assert.ok(use.toolUseId.length <= 64);
    assert.deepEqual(convert(history(format, ids)), output, "same history maps deterministically");
    assert.equal(convert(history(format, [rawId])).uses[0].toolUseId, first);
  });

  test(`${format}: replaying an ID in separate answered turns preserves both pairs`, () => {
    const output = convert([
      ...history(format, ["repeat.call"]),
      ...history(format, ["repeat.call"]),
    ]);
    assert.equal(output.uses.length, 2);
    assert.equal(output.results.length, 2);
    assert.match(output.uses[0].toolUseId, /^[a-zA-Z0-9_-]+$/);
    assert.equal(output.uses[0].toolUseId, output.uses[1].toolUseId);
    assert.deepEqual(
      output.results.map((result) => result.toolUseId),
      output.uses.map((use) => use.toolUseId)
    );
  });

  test(`${format}: empty IDs are pruned without invalid or unmatched result blocks`, () => {
    for (const id of ["", "   "]) {
      const output = convert(history(format, [id]));
      assert.equal(output.uses.length, 0);
      assert.equal(output.results.length, 0);
    }
  });

  test(`${format}: valid IDs and the input history remain unchanged`, () => {
    const messages = history(format, ["toolu_Valid-123"]);
    const before = structuredClone(messages);
    const output = convert(messages);
    assertPairs(output, 1);
    assert.equal(output.uses[0].toolUseId, "toolu_Valid-123");
    assert.deepEqual(messages, before);
  });
}
