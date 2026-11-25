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
  const fetchMock = t.mock.method(globalThis, "fetch", async (_url: string, init: RequestInit) => {
    sent = JSON.parse(String(init.body));
    return Response.json({ data: [{ b64_json: GIF }] });
  });
  const result = await handleImageGeneration({
    body: { model: "openai/gpt-image-2.6-flare", prompt: "An animated bird", ...options },
    credentials: { apiKey: "fixture-only-image-key" },
  });
  return { result, sent, upstreamCalls: fetchMock.mock.callCount() };
}

test("forwards OpenAI planning and moderation options and passes GIF bytes through", async (t) => {
  const { result, sent } = await generate(t, {
    output_format: "gif",
    complexity: "low",
    moderation: "auto",
  });
  assert.equal(result.success, true);
  assert.ok(sent);
  assert.equal(sent.output_format, "gif");
  assert.equal(sent.complexity, "low");
  assert.equal(sent.moderation, "auto");
  assert.equal("output_compression" in sent, false);
  assert.equal(result.data.data[0].b64_json, GIF);
});

for (const [format, compression] of [
  [" JPEG ", 0],
  ["webp", 72],
  ["webp", 100],
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

test("uses the shared GIF animation controls with the OpenAI options", async (t) => {
  const { result, sent } = await generate(t, {
    output_format: " GIF ",
    frame_count: 8,
    frame_duration_ms: 120,
    complexity: "high",
    moderation: "low",
    output_compression: null,
  });
  assert.equal(result.success, true);
  assert.ok(sent);
  assert.equal(sent.output_format, "gif");
  assert.equal(sent.frame_count, 8);
  assert.equal(sent.frame_duration_ms, 120);
  assert.equal(sent.complexity, "high");
  assert.equal(sent.moderation, "low");
  assert.equal("output_compression" in sent, false);
});

test("forwards medium complexity without an explicit output format", async (t) => {
  const { result, sent } = await generate(t, { complexity: "medium" });
  assert.equal(result.success, true);
  assert.ok(sent);
  assert.equal(sent.complexity, "medium");
  assert.equal("moderation" in sent, false);
  assert.equal("output_compression" in sent, false);
  assert.equal("output_format" in sent, false);
});

test("preserves null planning and moderation and omits null compression for JPEG", async (t) => {
  const { result, sent } = await generate(t, {
    output_format: " JPEG ",
    complexity: null,
    moderation: null,
    output_compression: null,
  });
  assert.equal(result.success, true);
  assert.ok(sent);
  assert.equal(sent.output_format, "jpeg");
  assert.equal(sent.complexity, null);
  assert.equal(sent.moderation, null);
  assert.equal("output_compression" in sent, false);
});

for (const [label, options, message] of [
  ["GIF compression", { output_format: " GIF ", output_compression: 50 }, /GIF output/],
  ["GIF streaming", { output_format: "gif", stream: true }, /GIF output/],
  ["negative compression", { output_format: "jpeg", output_compression: -1 }, /output_compression/],
  [
    "compression above 100",
    { output_format: "webp", output_compression: 101 },
    /output_compression/,
  ],
  [
    "fractional compression",
    { output_format: "webp", output_compression: 0.5 },
    /output_compression/,
  ],
  [
    "numeric string compression",
    { output_format: "jpeg", output_compression: "50" },
    /output_compression/,
  ],
  [
    "non-finite compression",
    { output_format: "jpeg", output_compression: Infinity },
    /output_compression/,
  ],
  ["invalid compression without a format", { output_compression: false }, /output_compression/],
  ["unknown complexity", { complexity: "auto" }, /complexity/],
  ["non-string complexity", { complexity: 1 }, /complexity/],
  ["unknown moderation", { moderation: "high" }, /moderation/],
  ["non-string moderation", { moderation: true }, /moderation/],
] as const) {
  test(`rejects ${label} before contacting the Images endpoint`, async (t) => {
    const { result, upstreamCalls } = await generate(t, options);
    assert.equal(result.status, 400, `upstream calls: ${upstreamCalls}`);
    assert.equal(result.success, false);
    assert.match(result.error, message);
    assert.equal(upstreamCalls, 0);
  });
}
