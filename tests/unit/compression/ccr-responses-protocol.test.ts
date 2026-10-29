/**
 * CCR on Responses-API bodies: the compressed block keeps its retrieve marker, so the
 * injected [CCR protocol] instruction must survive the Responses adapter round-trip.
 * Run: node --import tsx/esm --test tests/unit/compression/ccr-responses-protocol.test.ts
 */
import { describe, it } from "node:test";
import assert from "node:assert/strict";

import { applyCompression } from "../../../open-sse/services/compression/strategySelector.ts";

const BIG = "The quick brown fox jumps over the lazy dog. ".repeat(80);

function compress(input: unknown) {
  return applyCompression(
    {
      model: "gpt-5",
      input,
      tools: [{ type: "function", name: "omniroute_ccr_retrieve", parameters: { type: "object" } }],
    },
    "stacked",
    {
      config: {
        enabled: true,
        defaultMode: "stacked",
        preserveSystemPrompt: true,
        stackedPipeline: [{ engine: "ccr" }],
        ccr: { enabled: true, minChars: 100 },
      },
    } as never
  );
}

describe("ccr on Responses bodies", () => {
  it("keeps the protocol instruction when compressing string input items", () => {
    const result = compress([
      { role: "developer", content: BIG },
      { role: "user", content: BIG },
    ]);
    const body = result.body as { input: Array<Record<string, unknown>> };

    assert.equal(result.compressed, true);
    assert.match(JSON.stringify(body), /\[CCR retrieve hash=/);

    const instruction = body.input[0];
    assert.equal(instruction.role, "system");
    assert.match(String(instruction.content), /\[CCR protocol\]/);
    assert.equal(body.input[1].role, "developer");
    assert.equal(body.input.length, 3);
  });

  it("turns a string input into an item array when the protocol instruction is injected", () => {
    const result = compress(BIG);
    const body = result.body as { input: Array<Record<string, unknown>> };

    assert.equal(result.compressed, true);
    assert.ok(Array.isArray(body.input));
    assert.equal(body.input[0].role, "system");
    assert.match(String(body.input[0].content), /\[CCR protocol\]/);
    assert.equal(body.input[1].role, "user");
    assert.match(String(body.input[1].content), /\[CCR retrieve hash=/);
    assert.equal(body.input.length, 2);
  });
});
