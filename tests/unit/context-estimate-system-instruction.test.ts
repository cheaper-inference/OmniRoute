import test from "node:test";
import assert from "node:assert/strict";

import { estimateFinalInputTokenBreakdown } from "../../open-sse/handlers/chatCore/contextEstimation.ts";

const messages = [{ role: "user", content: "hi" }];
const big = { parts: [{ text: "x".repeat(40_000) }] };

test("a top-level systemInstruction counts as system tokens", () => {
  const plain = estimateFinalInputTokenBreakdown({ messages });
  const withSystem = estimateFinalInputTokenBreakdown({ messages, systemInstruction: big });
  assert.ok(withSystem.system > 5_000, `system = ${withSystem.system}`);
  assert.equal(withSystem.total - plain.total, withSystem.system);
});

test("system_instruction (snake case) counts too", () => {
  const out = estimateFinalInputTokenBreakdown({ messages, system_instruction: big });
  assert.ok(out.system > 5_000, `system = ${out.system}`);
});

test("a nested request.systemInstruction and request.tools count", () => {
  const out = estimateFinalInputTokenBreakdown({
    request: {
      contents: [{ role: "user", parts: [{ text: "hi" }] }],
      systemInstruction: big,
      tools: [{ functionDeclarations: [{ name: "t", description: "d".repeat(4_000) }] }],
    },
  });
  assert.ok(out.system > 5_000, `system = ${out.system}`);
  assert.ok(out.tools > 500, `tools = ${out.tools}`);
});

test("a body that carries both system and systemInstruction counts each once", () => {
  const out = estimateFinalInputTokenBreakdown({
    messages,
    system: "s".repeat(4_000),
    systemInstruction: { parts: [{ text: "g".repeat(4_000) }] },
  });
  assert.ok(out.system > 1_900 && out.system < 2_200, `system = ${out.system}`);
});

test("a plain body keeps its old estimate", () => {
  const out = estimateFinalInputTokenBreakdown({ messages, system: "abcd".repeat(100) });
  assert.equal(out.system, 100);
  assert.equal(out.total, out.messages + out.tools + out.system + out.instructions);
});
