import assert from "node:assert/strict";
import test from "node:test";
import { createNativeClaudeUsageTracker } from "../../open-sse/utils/nativeClaudeUsage.ts";
import { isEstimatedUsage } from "../../open-sse/utils/usageTracking.ts";
import { resetDbInstance } from "../../src/lib/db/core.ts";

test.after(() => resetDbInstance());

function start(usage: unknown) {
  return { type: "message_start", message: { usage } };
}
function delta(usage: unknown) {
  return { type: "message_delta", usage };
}

test("native usage is not inferred from an absent or malformed receipt", () => {
  const tracker = createNativeClaudeUsageTracker(null);
  for (const payload of [
    null,
    [],
    {},
    start(null),
    start([]),
    start({}),
    delta({ output_tokens: "4" }),
    { type: "content_block_delta", usage: { input_tokens: 20 } },
    { choices: [], usage: { prompt_tokens: 10, completion_tokens: 4 } },
  ])
    tracker.observe(payload);
  assert.equal(tracker.getUsage(), null);
});

test("canonical accounting includes cache creation while retaining individual cache counters", () => {
  const tracker = createNativeClaudeUsageTracker(null);
  tracker.observe(
    start({
      input_tokens: 5,
      cache_read_input_tokens: 3,
      cache_creation_input_tokens: 2,
      output_tokens: 1,
    })
  );
  tracker.observe(delta({ output_tokens: 4 }));
  assert.deepEqual(tracker.getUsage(), {
    prompt_tokens: 10,
    completion_tokens: 4,
    total_tokens: 14,
    usage_evidence: {
      input: { source: "reported" },
      output: { source: "reported" },
      cacheRead: { source: "reported" },
      cacheCreation: { source: "reported" },
    },
    cache_read_input_tokens: 3,
    cache_creation_input_tokens: 2,
    prompt_tokens_details: {
      cached_tokens: 3,
      cache_creation_tokens: 2,
      cache_creation_in_prompt: true,
    },
  });
});

test("explicit zero replaces cumulative usage, omitted fields do not reset it", () => {
  const tracker = createNativeClaudeUsageTracker(null);
  tracker.observe(start({ input_tokens: 5, output_tokens: 7, cache_read_input_tokens: 3 }));
  tracker.observe(delta({ output_tokens: 0 }));
  tracker.observe(delta({ cache_read_input_tokens: 0 }));
  assert.equal(tracker.getUsage()?.prompt_tokens, 5);
  assert.equal(tracker.getUsage()?.completion_tokens, 0);
  assert.equal(tracker.getUsage()?.usage_evidence?.output.source, "reported");
  assert.equal(tracker.getUsage()?.cache_read_input_tokens, 0);
});

test("a positive start count remains provisional without a cumulative delta count", () => {
  const tracker = createNativeClaudeUsageTracker(null);
  tracker.observe(start({ input_tokens: 80, output_tokens: 1 }));
  tracker.observe(delta({ input_tokens: 81 }));
  assert.equal(tracker.hasFinalUsage(), false);
  assert.equal(tracker.getUsage()?.completion_tokens, 0);
  assert.equal(tracker.getUsage()?.total_tokens, 81);
  assert.equal(tracker.getUsage()?.usage_evidence?.output.source, "unknown");

  const withContent = tracker.getUsage(350);
  assert.equal(withContent?.completion_tokens, 100);
  assert.equal(withContent?.total_tokens, 181);
  assert.deepEqual(withContent?.usage_evidence?.output, {
    source: "estimated",
    method: "observed_characters",
  });

  tracker.observe(delta({ output_tokens: 9 }));
  assert.equal(tracker.hasFinalUsage(), true);
  assert.equal(tracker.getUsage(350)?.completion_tokens, 9);
  assert.equal(tracker.getUsage(350)?.total_tokens, 90);
  assert.equal(tracker.getUsage(350)?.usage_evidence?.output.source, "reported");
});

test("nonfinite and negative counters cannot replace a valid native receipt", () => {
  const tracker = createNativeClaudeUsageTracker(null);
  tracker.observe(start({ input_tokens: 5, output_tokens: 1 }));
  tracker.observe(delta({ output_tokens: 4 }));
  for (const value of [NaN, Infinity, -1, "9", undefined, null]) {
    tracker.observe(delta({ input_tokens: value, output_tokens: value }));
  }
  assert.equal(tracker.getUsage()?.prompt_tokens, 5);
  assert.equal(tracker.getUsage()?.completion_tokens, 4);
});

test("raw metering copies primitive counters before client normalization mutates the event", () => {
  const tracker = createNativeClaudeUsageTracker(null);
  const usage = { input_tokens: 5, output_tokens: 1 };
  tracker.observe(start(usage));
  usage.input_tokens = 999;
  const previous = tracker.getUsage();
  tracker.observe(delta({ output_tokens: 4 }));
  assert.equal(previous?.prompt_tokens, 5);
  assert.equal(tracker.getUsage()?.prompt_tokens, 5);
  assert.equal(tracker.getUsage()?.completion_tokens, 4);
});

test("the existing implausible-input guard still applies to internal raw metering", () => {
  const tracker = createNativeClaudeUsageTracker({
    messages: [{ role: "user", content: "hello" }],
  });
  tracker.observe(start({ input_tokens: 2, cache_read_input_tokens: 300_000, output_tokens: 1 }));
  tracker.observe(delta({ output_tokens: 4 }));
  const receipt = tracker.getUsage();
  assert.ok(receipt && receipt.prompt_tokens! < 300_000);
  assert.equal(receipt.completion_tokens, 4);
  assert.equal(receipt.cache_read_input_tokens, undefined);
  assert.equal(receipt.usage_evidence?.cacheRead.source, "unknown");
  assert.equal(isEstimatedUsage(receipt), true, "a repaired input count is a local estimate");
});

test("an explicitly estimated upstream object is not promoted to a raw receipt", () => {
  const tracker = createNativeClaudeUsageTracker(null);
  tracker.observe(start({ input_tokens: 10, output_tokens: 4, estimated: true }));
  assert.equal(tracker.getUsage(), null);
});
