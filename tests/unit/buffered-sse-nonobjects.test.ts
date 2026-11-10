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

for (const ignored of [null, [], "keepalive", 42, false]) {
  test(`non-object SSE event ${JSON.stringify(ignored)} does not replace completion metadata`, async () => {
    const sse =
      event(ignored) +
      event({
        id: "chatcmpl-valid",
        model: "actual-model",
        created: 123,
        choices: [{ index: 0, delta: { content: "hello" }, finish_reason: "stop" }],
      });
    const result = await parseBody(sse);
    assert.equal(result.kind, "ok");
    if (result.kind !== "ok") return;
    assert.equal(result.responseBody.id, "chatcmpl-valid");
    assert.equal(result.responseBody.choices[0].message.content, "hello");
    const parsed = parseSSEToOpenAIResponse(sse, "fallback-model");
    assert.ok(parsed);
    assert.equal(parsed.id, "chatcmpl-valid");
    assert.equal(parsed.model, "actual-model");
    assert.equal(parsed.created, 123);
  });
}

test("non-object SSE events alone remain invalid rather than producing a completion", async () => {
  const sse = event(null) + event(false) + event([]);
  assert.equal(parseSSEToOpenAIResponse(sse, "fallback-model"), null);
  assert.equal((await parseBody(sse)).kind, "invalid_sse");
});

test("usage-only object events still contribute token counts", () => {
  const usage = { prompt_tokens: 2, completion_tokens: 3, total_tokens: 5 };
  const sse =
    event({ id: "usage", choices: [{ delta: { content: "ok" }, finish_reason: "stop" }] }) +
    event({ choices: [], usage });
  assert.deepEqual(parseSSEToOpenAIResponse(sse, "m")?.usage, usage);
});
