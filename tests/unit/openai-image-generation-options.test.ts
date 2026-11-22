import assert from "node:assert/strict";
import test, { after } from "node:test";
import { handleImageGeneration } from "../../open-sse/handlers/imageGeneration.ts";
import { shutdownDbInstance } from "../../src/lib/db/core.ts";
import { closeCallLogSaves } from "../../src/lib/usage/callLogs.ts";

after(async () => {
  await closeCallLogSaves();
  await shutdownDbInstance();
});

const GIF = Buffer.from("GIF89a\x01\x00\x01\x00").toString("base64");

async function generate(t: test.TestContext, options: Record<string, unknown>) {
  let sent: Record<string, unknown> | undefined;
  t.mock.method(globalThis, "fetch", async (_url: string, init: RequestInit) => {
    sent = JSON.parse(String(init.body));
    return Response.json({ data: [{ b64_json: GIF }] });
  });
  const result = await handleImageGeneration({
    body: { model: "openai/gpt-image-2.6-flare", prompt: "An animated bird", ...options },
    credentials: { apiKey: "fixture-only-image-key" },
  });
  return { result, sent };
}

test("forwards OpenAI planning and moderation options and passes GIF bytes through", async (t) => {
  const { result, sent } = await generate(t, {
    output_format: "gif",
    complexity: "low",
    moderation: "auto",
  });
  assert.equal(result.success, true);
  assert.ok(sent);
  assert.equal(sent.complexity, "low");
  assert.equal(sent.moderation, "auto");
  assert.equal("output_compression" in sent, false);
  assert.equal(result.data.data[0].b64_json, GIF);
});

for (const [format, compression] of [
  [" JPEG ", 0],
  ["webp", 72],
] as const) {
  test(`forwards compression with the ${format.trim()} container`, async (t) => {
    const { result, sent } = await generate(t, {
      output_format: format,
      output_compression: compression,
    });
    assert.equal(result.success, true);
    assert.ok(sent);
    assert.equal(sent.output_format, format.trim().toLowerCase());
    assert.equal(sent.output_compression, compression);
  });
}

for (const format of ["png", "svg", undefined]) {
  test(`omits compression for ${format ?? "the default container"}`, async (t) => {
    const { result, sent } = await generate(t, { output_format: format, output_compression: 70 });
    assert.equal(result.success, true);
    assert.ok(sent);
    assert.equal("output_compression" in sent, false);
  });
}

test("rejects GIF compression before contacting the Images endpoint", async (t) => {
  const { result, sent } = await generate(t, { output_format: "gif", output_compression: 50 });
  assert.equal(result.success, false);
  assert.equal(result.status, 400);
  assert.equal(sent, undefined);
});

for (const [label, compression] of [
  ["null", null],
  ["numeric string", "50"],
  ["non-finite number", Infinity],
] as const) {
  test(`omits ${label} compression for JPEG`, async (t) => {
    const { result, sent } = await generate(t, {
      output_format: "jpeg",
      output_compression: compression,
    });
    assert.equal(result.success, true);
    assert.ok(sent);
    assert.equal("output_compression" in sent, false);
  });
}
