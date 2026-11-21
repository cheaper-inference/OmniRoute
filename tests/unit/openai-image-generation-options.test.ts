import assert from "node:assert/strict";
import test from "node:test";
import { handleImageGeneration } from "../../open-sse/handlers/imageGeneration.ts";

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
  assert.equal(result.success, true);
  assert.ok(sent, "the Images endpoint must receive the request");
  return { result, sent };
}

test("forwards OpenAI planning and moderation options and passes GIF bytes through", async (t) => {
  const { result, sent } = await generate(t, {
    output_format: " GIF ",
    complexity: "low",
    moderation: "auto",
    output_compression: 50,
  });
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
    const { sent } = await generate(t, { output_format: format, output_compression: compression });
    assert.equal(sent.output_format, format.trim().toLowerCase());
    assert.equal(sent.output_compression, compression);
  });
}

for (const format of ["png", "svg", undefined]) {
  test(`omits compression for ${format ?? "the default container"}`, async (t) => {
    const { sent } = await generate(t, { output_format: format, output_compression: 70 });
    assert.equal("output_compression" in sent, false);
  });
}
