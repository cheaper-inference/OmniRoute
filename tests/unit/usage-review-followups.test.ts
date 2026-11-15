import assert from "node:assert/strict";
import test from "node:test";
import { finalizeStreamingUsage } from "../../open-sse/utils/finalizeStreamingUsage.ts";
import { createNativeClaudeUsageTracker } from "../../open-sse/utils/nativeClaudeUsage.ts";
import { resolvePartialStreamUsage } from "../../open-sse/utils/streamPartialUsage.ts";
import { deriveUsageEvidence } from "../../open-sse/utils/usageEvidence.ts";
import {
  extractUsage,
  normalizeUsage,
  type UsageLike,
} from "../../open-sse/utils/usageTracking.ts";
import { readCacheWriteUsage } from "../../open-sse/utils/cacheWriteUsage.ts";
import { getPromptCacheReadTokensOrNull } from "../../src/lib/usage/tokenAccounting.ts";
import { resetDbInstance } from "../../src/lib/db/core.ts";

test.after(() => resetDbInstance());
const body = { messages: [{ role: "user", content: "Synthetic request" }] };

test("observed-character output estimates refresh after more content", () => {
  const initial = finalizeStreamingUsage({ prompt_tokens: 80 }, body, 35);
  assert.equal(initial.completion_tokens, 10);
  const final = finalizeStreamingUsage(initial, body, 350);
  assert.equal(final.completion_tokens, 100);
  assert.deepEqual(final.usage_evidence?.output, {
    source: "estimated",
    method: "observed_characters",
  });
  assert.equal(initial.completion_tokens, 10);
  assert.equal(finalizeStreamingUsage(initial, body, 0).completion_tokens, 10);
});

test("positive reported output and other estimation methods are not overwritten", () => {
  const reported = { prompt_tokens: 80, completion_tokens: 9 };
  assert.equal(finalizeStreamingUsage(reported, body, 350).completion_tokens, 9);
  const legacy = { ...reported, estimated: true };
  assert.equal(finalizeStreamingUsage(legacy, body, 350).completion_tokens, 9);
});

for (const final of [false, true]) {
  test(`native positive initial output stays provisional, final=${final}`, () => {
    const tracker = createNativeClaudeUsageTracker(body);
    tracker.observe({
      type: "message_start",
      message: { usage: { input_tokens: 80, output_tokens: 1 } },
    });
    assert.equal(tracker.getUsage(0)?.usage_evidence?.output.source, "unknown");
    if (final) tracker.observe({ type: "message_delta", usage: { output_tokens: 9 } });
    const receipt = tracker.getUsage(350)!;
    assert.equal(receipt.completion_tokens, final ? 9 : 100);
    assert.equal(receipt.usage_evidence?.output.source, final ? "reported" : "estimated");
    assert.equal(receipt.total_tokens, 80 + (final ? 9 : 100));
  });
}

for (const cached of [0, 30]) {
  test(`Gemini partial cache alias preserves reported ${cached}`, () => {
    const receipt = resolvePartialStreamUsage({
      reported: { promptTokenCount: 80, candidatesTokenCount: 9, cachedContentTokenCount: cached },
      contentLength: 350,
      body,
    });
    assert.equal(receipt?.cache_read_input_tokens, cached);
    assert.equal(receipt?.usage_evidence?.cacheRead.source, "reported");
  });
}

test("canonical cache read zero takes precedence over Gemini alias", () => {
  const receipt = resolvePartialStreamUsage({
    reported: {
      promptTokenCount: 80,
      candidatesTokenCount: 9,
      cached_tokens: 0,
      cachedContentTokenCount: 30,
    },
    contentLength: 0,
    body,
  });
  assert.equal(receipt?.cache_read_input_tokens, 0);
});

for (const value of ["12", " 12 ", "0"]) {
  test(`supported numeric-string cache write preserves evidence: ${JSON.stringify(value)}`, () => {
    const normalized = normalizeUsage({
      cache_creation_input_tokens: value,
    } as unknown as UsageLike);
    assert.equal(readCacheWriteUsage(normalized).total, Number(value));
    assert.equal(normalized?.usage_evidence?.cacheCreation.source, "reported");
  });
}
for (const value of ["", " ", "invalid", "-1", "Infinity", null, true]) {
  test(`invalid cache-write counter has no reported evidence: ${JSON.stringify(value)}`, () => {
    assert.equal(
      deriveUsageEvidence({ cache_creation_input_tokens: value }).cacheCreation.source,
      "unknown"
    );
  });
}

test("prompt cache hit alias remains known through extraction and accounting", () => {
  for (const cached of [0, 3584]) {
    const receipt = extractUsage({
      usage: { prompt_tokens: 4000, completion_tokens: 1, prompt_cache_hit_tokens: cached },
    });
    assert.equal(receipt?.cached_tokens, cached);
    assert.equal(receipt?.usage_evidence?.cacheRead.source, "reported");
    assert.equal(getPromptCacheReadTokensOrNull(receipt), cached);
  }
});

test("passthrough request accounting is not recomputed for each content frame", async () => {
  const { createSSEStream } = await import("../../open-sse/utils/stream.ts");
  async function serializations(frameCount: number) {
    let count = 0;
    const request = {
      ...body,
      toJSON() {
        count++;
        return body;
      },
    };
    const stream = createSSEStream({
      mode: "passthrough",
      targetFormat: "openai",
      sourceFormat: "openai",
      clientResponseFormat: "openai",
      provider: "openai",
      body: request,
    });
    const frame = { choices: [{ index: 0, delta: { content: "answer" }, finish_reason: null }] };
    const wire = `data: ${JSON.stringify(frame)}\n\n`.repeat(frameCount) + "data: [DONE]\n\n";
    await new Response(new Response(wire).body!.pipeThrough(stream)).text();
    return count;
  }
  assert.equal(await serializations(25), await serializations(1));
});

for (const normalize of [false, true]) {
  test(`refresh calculated totals without overwriting reported totals, normalize=${normalize}`, () => {
    for (const reportedTotal of [undefined, 90, 109]) {
      const first = finalizeStreamingUsage(
        { prompt_tokens: 80, total_tokens: reportedTotal },
        body,
        35
      );
      const next = finalizeStreamingUsage(normalize ? normalizeUsage(first) : first, body, 350);
      assert.equal(next.completion_tokens, 100);
      assert.equal(next.total_tokens, reportedTotal ?? 180);
    }
  });
}

test("Gemini calculated totals survive alias normalization and refresh", () => {
  const first = finalizeStreamingUsage({ promptTokenCount: 80 }, body, 35, "gemini");
  const next = resolvePartialStreamUsage({ reported: first, contentLength: 350, body });
  assert.equal(next?.total_tokens, 180);
  assert.equal(next?.completion_tokens, 100);
});

test("Gemini cache-only alias survives alongside canonical input and output", () => {
  const receipt = resolvePartialStreamUsage({
    reported: { prompt_tokens: 80, completion_tokens: 9, cachedContentTokenCount: 30 },
    contentLength: 350,
    body,
  });
  assert.equal(receipt?.cache_read_input_tokens, 30);
});

test("supported numeric-string evidence never accompanies fabricated zero counts", () => {
  const receipt = finalizeStreamingUsage(
    { prompt_tokens: "80", completion_tokens: "9" } as unknown as UsageLike,
    body,
    0
  );
  assert.equal(receipt.prompt_tokens, 80);
  assert.equal(receipt.completion_tokens, 9);
});

test("a late reported total replaces equal-valued calculated total provenance", async () => {
  const { createSSEStream } = await import("../../open-sse/utils/stream.ts");
  let receipt: UsageLike = {};
  const firstTotal = finalizeStreamingUsage(null, body, 35).total_tokens;
  const stream = createSSEStream({
    mode: "translate",
    targetFormat: "openai",
    sourceFormat: "openai",
    provider: "openai",
    body,
    onComplete(value) {
      receipt = value.usage as UsageLike;
    },
  });
  const frames = [
    { choices: [{ index: 0, delta: { content: "x".repeat(35) }, finish_reason: "stop" }] },
    { choices: [], usage: { prompt_tokens: 80, total_tokens: firstTotal } },
    { choices: [{ index: 0, delta: { content: "y".repeat(315) }, finish_reason: null }] },
  ];
  await new Response(
    new Response(
      frames.map((frame) => `data: ${JSON.stringify(frame)}\n\n`).join("") + "data: [DONE]\n\n"
    ).body!.pipeThrough(stream)
  ).text();
  assert.equal(receipt.completion_tokens, 100);
  assert.equal(receipt.total_tokens, firstTotal);
});

test("full local estimates retain computed totals through normalization", async () => {
  const { estimateUsage } = await import("../../open-sse/utils/usageTracking.ts");
  const first = estimateUsage(body, 35);
  const next = finalizeStreamingUsage(normalizeUsage(first), body, 350);
  assert.equal(next.total_tokens, next.prompt_tokens! + 100);
});

test("cache-only trailing merges preserve computed totals for later refresh", async () => {
  const { resolveTrailingUsageSummary } =
    await import("../../open-sse/utils/passthroughTrailingUsage.ts");
  const { mergeUsageSnapshot } = await import("../../open-sse/utils/streamUsageMerge.ts");
  const first = finalizeStreamingUsage({ prompt_tokens: 80 }, body, 35);
  for (const merged of [
    resolveTrailingUsageSummary({ cached_tokens: 30 }, first, body, 35, "openai"),
    mergeUsageSnapshot(first, { cached_tokens: 30 }),
  ]) {
    const next = finalizeStreamingUsage(merged, body, 350);
    assert.equal(next.total_tokens, 180);
  }
});

test("copying a reported total clears local provenance even if the numeric value is unchanged", async () => {
  const { carryComputedUsageTotals } = await import("../../open-sse/utils/computedUsageTotals.ts");
  const computed = finalizeStreamingUsage({ prompt_tokens: 80 }, body, 35);
  carryComputedUsageTotals({ total_tokens: 90 }, computed);
  assert.equal(finalizeStreamingUsage(computed, body, 350).total_tokens, 90);
});

test("translated Gemini input-only receipt calculates total after estimating output", async () => {
  const { createSSEStream } = await import("../../open-sse/utils/stream.ts");
  let receipt: UsageLike = {};
  const stream = createSSEStream({
    mode: "translate",
    targetFormat: "gemini",
    sourceFormat: "openai",
    provider: "gemini",
    body,
    onComplete(value) {
      receipt = value.usage as UsageLike;
    },
  });
  const frame = {
    candidates: [
      {
        index: 0,
        content: { role: "model", parts: [{ text: "x".repeat(350) }] },
        finishReason: "STOP",
      },
    ],
    usageMetadata: { promptTokenCount: 80 },
  };
  await new Response(
    new Response(`data: ${JSON.stringify(frame)}\n\n`).body!.pipeThrough(stream)
  ).text();
  assert.equal(receipt.prompt_tokens, 80);
  assert.equal(receipt.completion_tokens, 100);
  assert.equal(receipt.total_tokens, 180);
});
