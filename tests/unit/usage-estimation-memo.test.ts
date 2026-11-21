import assert from "node:assert/strict";
import { test } from "node:test";
import { estimateInputTokens } from "../../open-sse/utils/usageEstimation.ts";

test("re-estimating the same large body per stream chunk stays cheap", () => {
  // ~290k-token conversation: the size that stalled the event loop for minutes in production.
  const text = "const value = computeSomething(alpha, beta); // explanation of the code ".repeat(60_000);
  const body = { model: "m", messages: [{ role: "user", content: text }], tools: [{ name: "t" }] };
  const first = estimateInputTokens(body);
  assert.ok(first > 100_000);
  const started = performance.now();
  for (let chunk = 0; chunk < 500; chunk++) assert.equal(estimateInputTokens(body), first);
  assert.ok(performance.now() - started < 200, "per-chunk estimate must not rescan the body");
});

test("different bodies still get their own estimate", () => {
  const small = estimateInputTokens({ messages: [{ role: "user", content: "hi" }] });
  const large = estimateInputTokens({ messages: [{ role: "user", content: "word ".repeat(1_000) }] });
  assert.ok(large > small);
});
