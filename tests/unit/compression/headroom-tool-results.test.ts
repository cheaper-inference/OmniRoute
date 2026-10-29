/**
 * SmartCrusher must compact Anthropic `tool_result` content, not only top-level
 * `text` blocks. The engine advertises `tool_results` as a target, so a
 * tool_result carrying a JSON array (the common MCP/tool-output shape) is in
 * scope for lossless tabular compaction.
 */

import { describe, it, before } from "node:test";
import assert from "node:assert/strict";

type HeadroomModule =
  typeof import("../../../open-sse/services/compression/engines/headroom/index.ts");
type SmartcrusherModule =
  typeof import("../../../open-sse/services/compression/engines/headroom/smartcrusher.ts");

let headroomEngine: HeadroomModule["headroomEngine"];
let reconstructHeadroom: HeadroomModule["reconstructHeadroom"];
let collectCompactableArrays: SmartcrusherModule["collectCompactableArrays"];

before(async () => {
  const mod = await import("../../../open-sse/services/compression/engines/headroom/index.ts");
  headroomEngine = mod.headroomEngine;
  reconstructHeadroom = mod.reconstructHeadroom;
  const scMod =
    await import("../../../open-sse/services/compression/engines/headroom/smartcrusher.ts");
  collectCompactableArrays = scMod.collectCompactableArrays;
});

function makeRows(n: number): Record<string, unknown>[] {
  return Array.from({ length: n }, (_, i) => ({
    id: i + 1,
    name: `item-${i + 1}`,
    value: (i + 1) * 10,
    active: i % 2 === 0,
  }));
}

function makeBody(toolContent: unknown): Record<string, unknown> {
  return {
    model: "test-model",
    messages: [
      { role: "assistant", content: [{ type: "tool_use", id: "t1", name: "fetch", input: {} }] },
      {
        role: "user",
        content: [{ type: "tool_result", tool_use_id: "t1", content: toolContent }],
      },
    ],
  };
}

function firstToolResult(body: Record<string, unknown>): Record<string, unknown> {
  const messages = body["messages"] as Array<{ content: Array<Record<string, unknown>> }>;
  return messages[1].content[0];
}

describe("headroom engine — Anthropic tool_result content", () => {
  it("compacts a tool_result whose content is a JSON array string", async () => {
    const json = JSON.stringify(makeRows(8));
    const body = makeBody(json);

    const result = headroomEngine.apply(body);

    assert.equal(result.compressed, true);
    const compressed = firstToolResult(result.body)["content"] as string;
    assert.notEqual(compressed, json);
    assert.deepEqual(reconstructHeadroom(result.body), body);
  });

  it("compacts a nested text block inside an array-form tool_result content", async () => {
    const json = JSON.stringify(makeRows(8));
    const body = makeBody([
      { type: "text", text: "tool output:" },
      { type: "text", text: json },
    ]);

    const result = headroomEngine.apply(body);

    assert.equal(result.compressed, true);
    const blocks = firstToolResult(result.body)["content"] as Array<Record<string, unknown>>;
    assert.equal(blocks[0]["text"], "tool output:");
    assert.notEqual(blocks[1]["text"], json);
    assert.deepEqual(reconstructHeadroom(result.body), body);
  });

  it("leaves a tool_result array below minRows untouched", async () => {
    const json = JSON.stringify(makeRows(7));
    const body = makeBody([{ type: "text", text: json }]);

    const result = headroomEngine.apply(body);

    assert.equal(result.compressed, false);
    assert.equal(result.body, body);
  });

  it("leaves tool_result blocks inside a system message untouched", async () => {
    const json = JSON.stringify(makeRows(8));
    const body = {
      model: "test-model",
      messages: [
        {
          role: "system",
          content: [{ type: "tool_result", tool_use_id: "t1", content: json }],
        },
      ],
    };

    const result = headroomEngine.apply(body);

    assert.equal(result.compressed, false);
    assert.equal(result.body, body);
  });

  it("still skips non-JSON tool_result content", async () => {
    const body = makeBody("plain text output, nothing to compact");

    const result = headroomEngine.apply(body);

    assert.equal(result.compressed, false);
  });

  it("still compacts OpenAI-style tool role string content", async () => {
    const json = JSON.stringify(makeRows(8));
    const body = {
      model: "test-model",
      messages: [{ role: "tool", content: json }],
    };

    const result = headroomEngine.apply(body);

    assert.equal(result.compressed, true);
    assert.notEqual((result.body["messages"] as Array<{ content: string }>)[0].content, json);
  });

  it("collectCompactableArrays sees arrays inside tool_result content", () => {
    const rows = makeRows(8);
    const body = makeBody(JSON.stringify(rows));

    const arrays = collectCompactableArrays(body["messages"] as never[]);

    assert.equal(arrays.length, 1);
    assert.deepEqual(arrays[0], rows);
  });
});
