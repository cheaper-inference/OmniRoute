// #20086: a stream whose chunks all carry usage must not serialize and re-tokenize the
// whole request body once per chunk. The usage guard's body size and input estimate are
// computed once per request and reused for every event.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-usage-basis-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { createSSEStream } = await import("../../open-sse/utils/stream.ts");
const { createRequestUsageBasis, estimateInputTokens, sanitizeUsagePayloadForRequest } =
  await import("../../open-sse/utils/usageTracking.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");

const encoder = new TextEncoder();

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function makeBody() {
  return {
    model: "deepseek-v4.1-flash",
    messages: [{ role: "user", content: "Explain why the build fails on CI. ".repeat(400) }],
  };
}

// OpenAI-compatible upstream that repeats usage (with 0 prompt tokens) on every chunk.
function usageChunks(count: number) {
  const events: string[] = [];
  for (let i = 0; i < count; i++) {
    events.push(
      `data: ${JSON.stringify({
        id: "chatcmpl-1",
        object: "chat.completion.chunk",
        created: 1,
        model: "deepseek-v4.1-flash",
        choices: [{ index: 0, delta: { content: `part${i} ` }, finish_reason: null }],
        usage: { prompt_tokens: 0, completion_tokens: i + 1, total_tokens: i + 1 },
      })}\n\n`
    );
  }
  events.push("data: [DONE]\n\n");
  return events;
}

async function streamCountingBodySerializations(chunkCount: number, mode: string) {
  const body = makeBody();
  const options =
    mode === "translate"
      ? {
          mode: "translate",
          targetFormat: FORMATS.OPENAI,
          sourceFormat: FORMATS.CLAUDE,
          provider: "cloudflare-ai",
          model: "deepseek-v4.1-flash",
          body,
        }
      : {
          mode: "passthrough",
          provider: "cloudflare-ai",
          model: "deepseek-v4.1-flash",
          body,
          clientResponseFormat: FORMATS.OPENAI,
        };
  const source = new ReadableStream({
    start(controller) {
      for (const event of usageChunks(chunkCount)) controller.enqueue(encoder.encode(event));
      controller.close();
    },
  });

  const originalStringify = JSON.stringify;
  let serializations = 0;
  JSON.stringify = function (value: unknown, ...rest: unknown[]) {
    if (value === body) serializations++;
    return Reflect.apply(originalStringify, JSON, [value, ...rest]);
  } as typeof JSON.stringify;
  try {
    const text = await new Response(source.pipeThrough(createSSEStream(options))).text();
    return { serializations, text, body };
  } finally {
    JSON.stringify = originalStringify;
  }
}

for (const mode of ["passthrough", "translate"]) {
  test(`${mode}: per-chunk usage does not re-serialize the request body per chunk`, async () => {
    const one = await streamCountingBodySerializations(1, mode);
    const many = await streamCountingBodySerializations(40, mode);
    assert.equal(
      many.serializations,
      one.serializations,
      `body serialized ${many.serializations} times for 40 chunks vs ${one.serializations} for 1`
    );
  });
}

test("passthrough: every chunk still gets the repaired input estimate", async () => {
  const { text, body } = await streamCountingBodySerializations(5, "passthrough");
  const expected = estimateInputTokens(body);
  const usages = text
    .split("\n")
    .filter((line) => line.startsWith("data: {"))
    .map((line) => JSON.parse(line.slice(6)).usage)
    .filter(Boolean);
  assert.ok(usages.length >= 5);
  for (const usage of usages) assert.equal(usage.prompt_tokens, expected);
});

test("a shared basis sanitizes exactly like a per-call one", () => {
  const body = makeBody();
  const payloads = [
    { choices: [], usage: { prompt_tokens: 0, completion_tokens: 3, total_tokens: 3 } },
    { choices: [], usage: { prompt_tokens: 50_000_000, completion_tokens: 3, total_tokens: 3 } },
    { choices: [], usage: { prompt_tokens: 1200, completion_tokens: 3, total_tokens: 1203 } },
    { type: "message_start", message: { usage: { input_tokens: 0, output_tokens: 1 } } },
    { type: "response.completed", response: { usage: { input_tokens: 0, output_tokens: 2 } } },
    { usageMetadata: { promptTokenCount: 0, candidatesTokenCount: 4, totalTokenCount: 4 } },
  ];
  const basis = createRequestUsageBasis(body);
  for (const payload of payloads) {
    const withBasis = structuredClone(payload);
    const withoutBasis = structuredClone(payload);
    const changedWithBasis = sanitizeUsagePayloadForRequest(withBasis, body, FORMATS.OPENAI, basis);
    const changedWithoutBasis = sanitizeUsagePayloadForRequest(withoutBasis, body, FORMATS.OPENAI);
    assert.equal(changedWithBasis, changedWithoutBasis, JSON.stringify(payload));
    assert.deepEqual(withBasis, withoutBasis, JSON.stringify(payload));
  }
});

test("a reported 0 with no request body stays 0 with a shared basis", () => {
  const basis = createRequestUsageBasis(undefined);
  const payload = { usage: { prompt_tokens: 0, completion_tokens: 1, total_tokens: 1 } };
  assert.equal(sanitizeUsagePayloadForRequest(payload, undefined, FORMATS.OPENAI, basis), false);
  assert.equal(payload.usage.prompt_tokens, 0);
});
