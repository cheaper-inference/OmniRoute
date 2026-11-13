import assert from "node:assert/strict";
import test from "node:test";
import { resolveTrailingUsageSummary } from "../../open-sse/utils/passthroughTrailingUsage.ts";
import { resolvePartialStreamUsage } from "../../open-sse/utils/streamPartialUsage.ts";
import { createGeneratedContentTracker } from "../../open-sse/utils/streamGeneratedContent.ts";
import { createSSEStream } from "../../open-sse/utils/stream.ts";
import { FORMATS } from "../../open-sse/translator/formats.ts";
import { computeBillableTokens } from "../../open-sse/handlers/chatCore/upstreamTimeouts.ts";
import { recordStreamingUsageStats } from "../../open-sse/handlers/chatCore/streamingUsageStats.ts";
import { getKeyQuotaStatus } from "../../src/lib/db/keyQuota.ts";
import { resetDbInstance } from "../../src/lib/db/core.ts";

test.after(() => resetDbInstance());
const body = { messages: [{ role: "user", content: "Synthetic short prompt" }] };

test("input repair preserves an independently reported trailing total", () => {
  const summary = { prompt_tokens: 0, completion_tokens: 19, total_tokens: 109 };
  const usage = resolveTrailingUsageSummary(summary, null, body, 70, FORMATS.OPENAI);
  assert.equal(usage.total_tokens, 109);
  assert.equal(summary.total_tokens, 109);
});
for (const contentLength of [0, 100]) {
  test(`Gemini partial counters remain reported with ${contentLength} observed characters`, () => {
    const result = resolvePartialStreamUsage({
      reported: { promptTokenCount: 80, candidatesTokenCount: 9 },
      contentLength,
      body,
    });
    assert.equal(result?.prompt_tokens, 80);
    assert.equal(result?.completion_tokens, 9);
    assert.equal(result?.total_tokens, 89);
    assert.equal(result?.usage_evidence?.input.source, "reported");
    assert.equal(result?.usage_evidence?.output.source, "reported");
  });
}
test("canonical partial counters take precedence over Gemini aliases", () => {
  const result = resolvePartialStreamUsage({
    reported: {
      prompt_tokens: 4,
      completion_tokens: 2,
      promptTokenCount: 80,
      candidatesTokenCount: 9,
    },
    contentLength: 0,
    body,
  });
  assert.equal(result?.prompt_tokens, 4);
  assert.equal(result?.completion_tokens, 2);
});
for (const includeDelta of [false, true]) {
  test(`Responses reasoning snapshot counted once, delta=${includeDelta}`, () => {
    const tracker = createGeneratedContentTracker();
    const item = {
      id: "reasoning_fixture",
      type: "reasoning",
      content: [{ type: "reasoning_text", text: "visible reasoning" }],
      encrypted_content: "opaque",
    };
    if (includeDelta)
      tracker.observe({
        type: "response.reasoning_text.delta",
        item_id: item.id,
        content_index: 0,
        delta: "visible reasoning",
      });
    tracker.observe({ type: "response.output_item.done", item });
    tracker.observe({ type: "response.completed", response: { output: [item] } });
    assert.equal(tracker.getLength(), "visible reasoning".length);
  });
}
for (const reported of [false, true]) {
  test(`Gemini translated completion and actual TPM consume canonical counts, reported=${reported}`, async () => {
    let complete: Record<string, unknown> = {};
    const stream = createSSEStream({
      mode: "translate",
      targetFormat: FORMATS.GEMINI,
      sourceFormat: FORMATS.OPENAI,
      provider: "gemini",
      body,
      onComplete(value) {
        complete = value as unknown as Record<string, unknown>;
      },
    });
    const event = {
      candidates: [
        {
          index: 0,
          content: {
            role: "model",
            parts: reported ? [] : [{ text: "synthetic generated answer" }],
          },
          finishReason: "STOP",
        },
      ],
      ...(reported
        ? { usageMetadata: { promptTokenCount: 80, candidatesTokenCount: 9, totalTokenCount: 89 } }
        : {}),
    };
    await new Response(
      new Response(`data: ${JSON.stringify(event)}\n\n`).body!.pipeThrough(stream)
    ).text();
    const usage = complete.usage as Record<string, unknown>;
    const responseBody = complete.responseBody as { usage: Record<string, unknown> };
    assert.ok(Number(usage.prompt_tokens) > 0);
    assert.ok(Number(usage.completion_tokens) > 0);
    assert.equal(responseBody.usage.prompt_tokens, usage.prompt_tokens);
    assert.equal(responseBody.usage.completion_tokens, usage.completion_tokens);
    const expected = Number(usage.prompt_tokens) + Number(usage.completion_tokens);
    assert.equal(computeBillableTokens(usage), expected);
    const key = `truthful-gemini-${reported}`;
    recordStreamingUsageStats(usage, {
      provider: "gemini",
      model: "synthetic",
      streamStatus: 200,
      startTime: Date.now(),
      ttft: 1,
      streamErrorCode: null,
      connectionId: null,
      apiKeyInfo: { id: key },
      effectiveServiceTier: "standard",
      isCombo: false,
      comboStrategy: null,
    });
    assert.equal(getKeyQuotaStatus(key).counters.tpmUsed, expected);
    assert.equal(getKeyQuotaStatus(key).counters.rpmUsed, 1);
    await new Promise((resolve) => setTimeout(resolve, 50));
  });
}
