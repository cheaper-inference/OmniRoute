import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const previousDataDir = process.env.DATA_DIR;
const testDataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-buffered-sse-"));
process.env.DATA_DIR = testDataDir;
const { resetDbInstance } = await import("../../src/lib/db/core.ts");
const { parseSSEToOpenAIResponse } = await import("@omniroute/open-sse/handlers/sseParser.ts");
const { parseNonStreamingResponseBody } =
  await import("@omniroute/open-sse/handlers/chatCore/nonStreamingResponseParse.ts");

test.after(() => {
  resetDbInstance();
  fs.rmSync(testDataDir, { recursive: true, force: true });
  if (previousDataDir === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = previousDataDir;
});

const event = (value: unknown) => `data: ${JSON.stringify(value)}\n\n`;
async function parseBody(sse: string) {
  return parseNonStreamingResponseBody({
    upstreamStream: false,
    providerHeaders: null,
    finalBody: null,
    targetFormat: "openai",
    model: "fallback-model",
    providerResponse: new Response(sse, { headers: { "content-type": "text/event-stream" } }),
  });
}

for (const content of [undefined, "Partial answer"]) {
  test(`buffered refusal deltas survive${content ? " alongside content" : " alone"}`, async () => {
    const usage = { prompt_tokens: 3, completion_tokens: 2, total_tokens: 5 };
    const sse =
      event({ id: "refused", choices: [{ delta: { refusal: " I cannot ", content } }] }) +
      event({
        choices: [{ delta: { refusal: "help with that. " }, finish_reason: "content_filter" }],
        usage,
      });
    const result = await parseBody(sse);
    assert.equal(result.kind, "ok");
    if (result.kind !== "ok") return;
    assert.equal(result.responseBody.choices[0].message.refusal, " I cannot help with that. ");
    const parsed = parseSSEToOpenAIResponse(sse, "m");
    assert.ok(parsed);
    assert.equal(parsed.choices[0].message.refusal, " I cannot help with that. ");
    assert.equal(parsed.choices[0].message.content, content ?? "");
    assert.equal(parsed.choices[0].finish_reason, "content_filter");
    assert.deepEqual(parsed.usage, usage);
  });
}

test("ordinary content does not acquire a refusal field", () => {
  const parsed = parseSSEToOpenAIResponse(
    event({ choices: [{ delta: { content: "hello", refusal: null } }] }),
    "m"
  );
  assert.ok(parsed);
  assert.equal(Object.hasOwn(parsed.choices[0].message, "refusal"), false);
});
