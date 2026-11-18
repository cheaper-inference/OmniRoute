import assert from "node:assert/strict";
import test from "node:test";
import { FORMATS } from "../../open-sse/translator/formats.ts";
import { finalizeStreamingUsage } from "../../open-sse/utils/finalizeStreamingUsage.ts";

function countedBody(content: string) {
  let serializations = 0;
  return {
    body: {
      toJSON() {
        serializations++;
        return { input: [{ role: "user", content }] };
      },
    },
    count: () => serializations,
  };
}

test("streaming updates estimate a request once while output usage keeps increasing", () => {
  const request = countedBody("Synthetic diagnostic context. ".repeat(20));
  const first = finalizeStreamingUsage(null, request.body, 0, FORMATS.OPENAI_RESPONSES);
  assert.ok(first.input_tokens! > 0);

  for (let i = 1; i <= 1000; i++) {
    const usage = finalizeStreamingUsage(null, request.body, i * 7, FORMATS.OPENAI_RESPONSES);
    assert.equal(usage.input_tokens, first.input_tokens);
    assert.equal(usage.output_tokens, i * 2);
    assert.equal(usage.usage_evidence?.input.source, "estimated");
    assert.equal(usage.usage_evidence?.output.source, "estimated");
  }
  assert.equal(request.count(), 1, "streaming deltas must not rescan the request body");
});

test("separate request bodies receive independent input estimates", () => {
  const short = countedBody("Short request.");
  const long = countedBody("A different, longer request. ".repeat(100));
  const shortUsage = finalizeStreamingUsage(null, short.body, 35);
  const longUsage = finalizeStreamingUsage(null, long.body, 35);
  assert.ok(longUsage.prompt_tokens! > shortUsage.prompt_tokens!);
  assert.equal(
    finalizeStreamingUsage(null, short.body, 70).prompt_tokens,
    shortUsage.prompt_tokens
  );
  assert.equal(short.count(), 1);
  assert.equal(long.count(), 1);
});

test("reported upstream usage supersedes cached estimates and skips new estimation", () => {
  const request = countedBody("Synthetic request.");
  finalizeStreamingUsage(null, request.body, 35);
  const reported = { input_tokens: 123, output_tokens: 7 };
  const usage = finalizeStreamingUsage(reported, request.body, 350, FORMATS.OPENAI_RESPONSES);
  assert.equal(usage.input_tokens, 123);
  assert.equal(usage.output_tokens, 7);
  assert.equal(usage.usage_evidence?.input.source, "reported");
  assert.equal(usage.estimated, undefined);
  assert.equal(request.count(), 1);

  const fresh = countedBody("This body should not need estimation.");
  finalizeStreamingUsage(reported, fresh.body, 350, FORMATS.OPENAI_RESPONSES);
  assert.equal(fresh.count(), 0);
});

test("zero estimates are cached without suppressing output estimates", () => {
  let serializations = 0;
  const body = {
    toJSON() {
      serializations++;
      throw new Error("Request cannot be serialized");
    },
  };
  for (const chars of [35, 70]) {
    const usage = finalizeStreamingUsage(null, body, chars);
    assert.equal(usage.prompt_tokens, 0);
    assert.equal(usage.completion_tokens, chars / 3.5);
    assert.equal(usage.usage_evidence?.input.source, "unknown");
  }
  assert.equal(serializations, 1);
});

test("missing and primitive request bodies retain their zero-input fallback", () => {
  for (const body of [null, undefined, "request", 0]) {
    const usage = finalizeStreamingUsage(null, body, 35);
    assert.equal(usage.prompt_tokens, 0);
    assert.equal(usage.completion_tokens, 10);
  }
});
