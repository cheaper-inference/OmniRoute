// #20086 / #20480: the per-stream usage guard builds one request basis and only rebuilds the
// accounting receipt for Claude message_delta events.
import test from "node:test";
import assert from "node:assert/strict";

const { createUsageGuard } = await import("../../open-sse/utils/streamUsageGuard.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");

const body = {
  model: "claude-opus-5-5",
  messages: [{ role: "user", content: "Explain the failing build. ".repeat(100) }],
};

test("the receipt is rebuilt only for message_delta events", () => {
  let receiptCalls = 0;
  const guard = createUsageGuard(
    body,
    FORMATS.CLAUDE,
    () => null,
    () => {
      receiptCalls++;
      return { input_tokens: 321, output_tokens: 7 };
    }
  );

  for (let i = 0; i < 20; i++) {
    guard.sanitizePassthrough({
      type: "content_block_delta",
      index: 0,
      delta: { type: "text_delta", text: "x" },
    });
  }
  assert.equal(receiptCalls, 0, "text deltas must not rebuild the accounting receipt");

  const finalDelta = {
    type: "message_delta",
    delta: { stop_reason: "end_turn" },
    usage: { output_tokens: 7 },
  };
  guard.sanitizePassthrough(finalDelta);
  assert.equal(receiptCalls, 1);
});

test("a reported 0 input is repaired from the shared basis on every usage chunk", () => {
  const guard = createUsageGuard(
    body,
    FORMATS.OPENAI,
    () => null,
    () => null
  );
  const expected = guard.basis.inputEstimate();
  assert.ok(expected > 0);
  for (let i = 0; i < 5; i++) {
    const chunk = {
      choices: [{ index: 0, delta: { content: "x" } }],
      usage: { prompt_tokens: 0, completion_tokens: i + 1, total_tokens: i + 1 },
    };
    assert.equal(guard.sanitizePassthrough(chunk), true);
    assert.equal(chunk.usage.prompt_tokens, expected);
  }
});

test("a trailing usage-only chunk keeps the earlier known input untouched", () => {
  const guard = createUsageGuard(
    body,
    FORMATS.OPENAI,
    () => ({ prompt_tokens: 900, completion_tokens: 3 }),
    () => null
  );
  const trailing = { choices: [], usage: { completion_tokens: 3, total_tokens: 3 } };
  assert.equal(guard.sanitizePassthrough(trailing), false);
  assert.deepEqual(trailing.usage, { completion_tokens: 3, total_tokens: 3 });
});
