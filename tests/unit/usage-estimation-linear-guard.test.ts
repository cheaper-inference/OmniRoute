import test from "node:test";
import assert from "node:assert/strict";

import { estimateInputTokens, estimateOutputTokens } from "../../open-sse/utils/usageEstimation.ts";

function countingBody() {
  const counter = { serializations: 0 };
  const body = {
    messages: [{ role: "user", content: "Hello world" }],
    // JSON.stringify invokes toJSON each time the request body is serialized.
    metadata: {
      toJSON() {
        counter.serializations += 1;
        return {};
      },
    },
  };
  return { body, counter };
}

/** Run `fn` and count String.prototype.split calls on strings over 32 KB. */
function countLargeSplits<T>(fn: () => T): { result: T; largeSplits: number } {
  const originalSplit = String.prototype.split;
  let largeSplits = 0;
  String.prototype.split = function (this: string, ...args: unknown[]) {
    if (this.length > 32 * 1024) largeSplits += 1;
    return (originalSplit as (...splitArgs: unknown[]) => string[]).apply(this, args);
  } as unknown as typeof originalSplit;
  try {
    const result = fn();
    return { result, largeSplits };
  } finally {
    String.prototype.split = originalSplit;
  }
}

test("estimateInputTokens serializes the same request body only once", () => {
  const { body, counter } = countingBody();
  const first = estimateInputTokens(body);
  assert.ok(first > 0);
  assert.equal(estimateInputTokens(body), first);
  assert.equal(estimateInputTokens(body), first);
  assert.equal(
    counter.serializations,
    1,
    `body serialized ${counter.serializations} times for 3 estimates of the same object`
  );
});

test("estimateInputTokens does not regex-split a request body over 32 KB", () => {
  const largeText = "const value = computeSomething(alpha, beta);\n".repeat(26_000); // ~1.2 MB
  const body = { messages: [{ role: "user", content: largeText }] };

  // The sub-word split allocates one string per token: on a ~1 MB body that is hundreds of
  // thousands of strings and tens of milliseconds of blocking CPU for every call.
  const { result: tokens, largeSplits } = countLargeSplits(() => estimateInputTokens(body));

  assert.ok(tokens > 250_000, `expected >250k tokens, got ${tokens}`);
  assert.equal(largeSplits, 0, `split ran ${largeSplits} time(s) on a string over 32 KB`);
});

test("the linear estimate still counts each CJK ideograph as a token", () => {
  // 42,000 ideographs, 2,000 of them outside the BMP (surrogate pairs), in a body over 32 KB:
  // the linear estimate must count each one as a token. A plain characters-per-token ratio
  // reports about a quarter of that.
  const content = "\u6f22\u5b57".repeat(20_000) + "\u{20000}".repeat(2_000);
  const body = { messages: [{ role: "user", content }] };
  const { result: tokens, largeSplits } = countLargeSplits(() => estimateInputTokens(body));

  assert.equal(largeSplits, 0, `split ran ${largeSplits} time(s) on a string over 32 KB`);
  assert.ok(tokens >= 42_000, `expected >=42,000 tokens for 42,000 ideographs, got ${tokens}`);
});

test("estimateInputTokens accounts for tool definitions separately", () => {
  const bodyWithTools = {
    messages: [{ role: "user", content: "run tool" }],
    tools: [
      {
        name: "test_tool",
        description: "a test tool",
        parameters: { type: "object", properties: { x: { type: "string" } } },
      },
    ],
  };

  const tokens = estimateInputTokens(bodyWithTools);
  assert.ok(tokens > 10, "must count both messages and tools");
});

test("estimateOutputTokens returns proportional count", () => {
  assert.equal(estimateOutputTokens(0), 0);
  assert.equal(estimateOutputTokens(undefined), 0);
  assert.equal(estimateOutputTokens(35), 10);
});
