// #20086: callers outside the stream (cursor executor, finalizeStreamingUsage, estimateUsage)
// call estimateInputTokens() on the same request body more than once. The estimate is
// memoized per body object, so the body is serialized and tokenized only once.
import test from "node:test";
import assert from "node:assert/strict";

const { estimateInputTokens } = await import("../../open-sse/utils/usageEstimation.ts");
const { estimateUsage } = await import("../../open-sse/utils/usageTracking.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");

function bodyCountingMessageReads(content: string) {
  const counter = { reads: 0 };
  const messages = [{ role: "user", content }];
  const body: Record<string, unknown> = { model: "claude-opus-5-5" };
  Object.defineProperty(body, "messages", {
    enumerable: true,
    get() {
      counter.reads += 1;
      return messages;
    },
  });
  return { body, counter };
}

test("estimateInputTokens walks a request body only once across repeated calls (#20086)", () => {
  const { body, counter } = bodyCountingMessageReads(
    "Count how often the body is read. ".repeat(50)
  );

  const first = estimateInputTokens(body);
  assert.ok(first > 0, "a real body has a positive estimate");
  const readsAfterFirstCall = counter.reads;
  assert.ok(readsAfterFirstCall > 0, "the first call inspects the body");

  for (let i = 0; i < 50; i++) assert.equal(estimateInputTokens(body), first);
  assert.equal(counter.reads, readsAfterFirstCall, "later calls reuse the cached estimate");
});

test("estimateUsage reuses the cached input estimate for the same body (#20086)", () => {
  const { body, counter } = bodyCountingMessageReads(
    "Usage fallback for a non-stream call. ".repeat(50)
  );

  const first = estimateUsage(body, 120, FORMATS.OPENAI);
  const readsAfterFirstCall = counter.reads;
  assert.ok(readsAfterFirstCall > 0);

  for (let i = 0; i < 20; i++) {
    assert.deepEqual(estimateUsage(body, 120, FORMATS.OPENAI), first);
  }
  assert.equal(counter.reads, readsAfterFirstCall);
});

test("distinct bodies keep distinct estimates", () => {
  const short = { model: "m", messages: [{ role: "user", content: "short prompt" }] };
  const long = {
    model: "m",
    messages: [{ role: "user", content: "a much longer prompt ".repeat(200) }],
  };
  const shortEstimate = estimateInputTokens(short);
  const longEstimate = estimateInputTokens(long);
  assert.ok(longEstimate > shortEstimate);
  assert.equal(estimateInputTokens(short), shortEstimate);
  assert.equal(estimateInputTokens(long), longEstimate);
});

test("primitives and null bodies estimate to 0 without touching the cache", () => {
  assert.equal(estimateInputTokens(null), 0);
  assert.equal(estimateInputTokens(undefined), 0);
  assert.equal(estimateInputTokens("plain string"), 0);
  assert.equal(estimateInputTokens(42), 0);
});
