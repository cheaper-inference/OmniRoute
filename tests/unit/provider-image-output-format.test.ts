import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

process.env.DATA_DIR = mkdtempSync(join(tmpdir(), "omniroute-provider-image-format-"));

const { handleImageGeneration } = await import("../../open-sse/handlers/imageGeneration.ts");
const { prepareFalCompatibility } = await import("../../open-sse/handlers/fal/compatibility.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");
const { waitForCallLogSaves } = await import("../../src/lib/usage/callLogs.ts");

const ANIMATION = "fal-ai/custom-animation";
const GIF = Buffer.from("GIF89a\x01\x00\x01\x00").toString("base64");
const PNG = Buffer.from("89504e470d0a1a0a00000000", "hex").toString("base64");
const SVG = Buffer.from('<svg xmlns="http://www.w3.org/2000/svg"/>').toString("base64");

test.after(async () => {
  await waitForCallLogSaves(10_000);
  resetDbInstance();
});

async function generate(
  model: string,
  fields: Record<string, unknown>,
  payload: Record<string, unknown> = { images: [{ b64_json: GIF }] },
  definition?: Record<string, unknown>,
  status = 200
) {
  const original = globalThis.fetch;
  const sent: Array<{ url: string; body: Record<string, unknown> }> = [];
  const warnings: string[] = [];
  globalThis.fetch = async (url, init) => {
    const target = String(url);
    if (target.startsWith("https://api.fal.ai/")) {
      assert.ok(definition, "legacy requests must not discover a schema");
      return Response.json({ models: [definition], has_more: false });
    }
    assert.equal(init?.method, "POST", "never download a URL just to identify its format");
    sent.push({
      url: target,
      body:
        init?.body instanceof FormData
          ? Object.fromEntries(init.body)
          : JSON.parse(String(init?.body)),
    });
    return Response.json(payload, { status });
  };
  try {
    const result = await handleImageGeneration({
      body: { model, prompt: "an animated bird", ...fields },
      credentials: { apiKey: "test-key" },
      log: {
        info() {},
        error() {},
        warn(_scope: string, message: string) {
          warnings.push(message);
        },
      },
      prepareFalInput: definition ? prepareFalCompatibility : null,
    });
    return { result, sent, warnings };
  } finally {
    globalThis.fetch = original;
  }
}

test("legacy Fal sends OpenAI publisher IDs to the qualified endpoint without an output format", async () => {
  const endpoint = "openai/gpt-image-2.6/sunburst/text-to-image";
  const { result, sent } = await generate(
    `fal-ai/${endpoint}`,
    {},
    { images: [{ b64_json: PNG }] }
  );

  assert.equal(result.success, true);
  assert.deepEqual(sent, [
    {
      url: `https://fal.run/${endpoint}`,
      body: {
        prompt: "an animated bird",
        sync_mode: true,
        output_format: "png",
        aspect_ratio: "1:1",
      },
    },
  ]);
  assert.deepEqual(Object.keys(result.data).sort(), ["created", "data"]);
  assert.equal(result.data.data[0].b64_json, PNG);
});

test("legacy Fal preserves a requested GIF and its animation controls", async () => {
  const { result, sent } = await generate(ANIMATION, {
    output_format: "gif",
    frame_count: 9,
    frame_duration_ms: 205,
  });
  assert.equal(result.success, true);
  assert.equal(sent[0].url, `https://fal.run/${ANIMATION}`);
  assert.equal(sent[0].body.output_format, "gif");
  assert.equal(sent[0].body.frame_count, 9);
  assert.equal(sent[0].body.frame_duration_ms, 205, "the provider owns rounding");
  assert.equal(result.data.output_format, "gif");
  assert.equal(result.data.data[0].mime_type, "image/gif");
  assert.equal(result.data.data[0].b64_json, GIF);
});

test("legacy Fal preserves SVG and normalizes actual response metadata", async () => {
  const { result, sent } = await generate(
    ANIMATION,
    { output_format: " SVG " },
    { output_format: "png", images: [{ b64_json: SVG }] }
  );
  assert.equal(sent[0].body.output_format, "svg");
  assert.equal(result.data.output_format, "svg");
  assert.equal(result.data.data[0].mime_type, "image/svg+xml");
  assert.equal(result.data.data[0].b64_json, SVG);
});

test("Fal reports a PNG response instead of labelling it as the requested GIF", async () => {
  const { result, warnings } = await generate(
    ANIMATION,
    { output_format: "gif" },
    { images: [{ b64_json: PNG }] }
  );
  assert.equal(result.data.output_format, "png");
  assert.equal(result.data.data[0].mime_type, "image/png");
  assert.ok(warnings.some((value) => value.includes("gif") && value.includes("png")));
});

test("legacy Fal leaves model-specific unsupported-format errors to the endpoint", async () => {
  const { result, sent } = await generate(
    "fal-ai/flux/schnell",
    { output_format: "gif" },
    { detail: "output_format must be jpeg or png" },
    undefined,
    422
  );
  assert.equal(sent[0].body.output_format, "gif");
  assert.equal(result.status, 422);
  assert.match(String(result.error), /jpeg or png/);
});

test("legacy Fal does not cap frame controls for the endpoint", async () => {
  const { result, sent } = await generate(ANIMATION, {
    output_format: "gif",
    frame_count: 24,
    frame_duration_ms: 4000,
  });
  assert.equal(result.success, true);
  assert.equal(sent[0].body.frame_count, 24);
  assert.equal(sent[0].body.frame_duration_ms, 4000);
});

for (const fields of [
  { output_format: "gif", frame_duration_ms: "200" },
  { output_format: "gif", frame_count: "9" },
  { output_format: "gif", frame_count: 0 },
  { output_format: "gif", frame_count: 2.5 },
  { output_format: "svg", frame_count: 9 },
]) {
  test(`legacy Fal rejects malformed animation controls before inference: ${JSON.stringify(fields)}`, async () => {
    const { result, sent } = await generate(ANIMATION, fields);
    assert.equal(result.success, false);
    assert.equal(result.status, 400);
    assert.equal(sent.length, 0);
  });
}

test("legacy Fal without output_format is exactly as before (PNG, no frames, no labels)", async () => {
  const omitted = await generate("fal-ai/flux-2-flex", { frame_count: 9, frame_duration_ms: "x" });
  assert.equal(omitted.result.success, true);
  assert.equal(omitted.sent[0].body.output_format, "png");
  assert.equal(Object.hasOwn(omitted.sent[0].body, "frame_count"), false);
  assert.equal(Object.hasOwn(omitted.sent[0].body, "frame_duration_ms"), false);
  assert.deepEqual(Object.keys(omitted.result.data).sort(), ["created", "data"]);
  assert.equal(omitted.result.data.data[0].mime_type, undefined);
  assert.deepEqual(omitted.warnings, []);
});

for (const [fields, expected] of [
  [{ response_format: "GIF" }, "png"],
  [{ response_format: "webp" }, "webp"],
  [{ output_format: "bmp" }, "png"],
  [{ output_format: "JPEG" }, "jpeg"],
  [{ output_format: "png", frame_count: 9 }, "png"],
] as const) {
  test(`legacy Fal keeps the historical mapping for ${JSON.stringify(fields)}`, async () => {
    const { result, sent } = await generate("fal-ai/flux-2-flex", fields);
    assert.equal(result.success, true);
    assert.equal(sent[0].body.output_format, expected);
    assert.equal(Object.hasOwn(sent[0].body, "frame_count"), false);
  });
}

const nativeEndpoint = "fal-ai/schema-controlled-animation";
const nativeDefinition = {
  endpoint_id: nativeEndpoint,
  openapi: {
    openapi: "3.0.0",
    paths: {
      [`/${nativeEndpoint}`]: {
        post: {
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    prompt: { type: "string" },
                    output_format: { type: "string", enum: ["png", "gif"] },
                    frame_count: { type: "integer", minimum: 2, maximum: 32 },
                    frame_duration_ms: { type: "integer", minimum: 20, maximum: 5000 },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

test("native Fal keeps endpoint bounds and fal_input overrides authoritative", async () => {
  const { result, sent, warnings } = await generate(
    `fal-ai/${nativeEndpoint}`,
    {
      output_format: "svg",
      fal_input: { output_format: "gif", frame_count: 24, frame_duration_ms: 4000 },
    },
    undefined,
    nativeDefinition
  );
  assert.equal(result.success, true);
  assert.equal(sent[0].body.output_format, "gif");
  assert.equal(sent[0].body.frame_count, 24);
  assert.equal(sent[0].body.frame_duration_ms, 4000);
  assert.equal(result.data.output_format, "gif");
  assert.deepEqual(warnings, []);
});

test("native Fal rejects a format absent from its schema before inference", async () => {
  const { result, sent } = await generate(
    `fal-ai/${nativeEndpoint}`,
    { output_format: "svg" },
    undefined,
    nativeDefinition
  );
  assert.equal(result.status, 400);
  assert.equal(sent.length, 0);
});

test("native Fal preserves URL responses without inferring their container", async () => {
  const url = "https://example.test/result.gif?signature=unchanged";
  const { result, sent } = await generate(
    `fal-ai/${nativeEndpoint}`,
    { output_format: "gif", response_format: "url" },
    { images: [{ url }] },
    nativeDefinition
  );
  assert.equal(result.data.data[0].url, url);
  assert.equal(result.data.output_format, undefined);
  assert.equal(result.data.data[0].mime_type, undefined);
  assert.equal(sent.length, 1);
});

// Stability keeps its current contract: unsupported formats still fall back to PNG (no local
// 400), frame controls are ignored and the response is not relabelled.
for (const [model, fields, format] of [
  ["stable-image-core", { output_format: "gif" }, "png"],
  ["stable-image-ultra", { output_format: "svg" }, "png"],
  ["remove-background", { output_format: "jpeg" }, "png"],
  ["stable-image-core", { response_format: "gif" }, "png"],
  ["stable-image-core", { output_format: "gif", frame_count: 9 }, "png"],
  ["stable-image-core", { frame_duration_ms: 200 }, "png"],
  ["stable-image-core", { output_format: "JPEG" }, "jpeg"],
  ["remove-background", { output_format: "webp" }, "webp"],
] as const) {
  test(`Stability keeps its current output handling: ${model}/${JSON.stringify(fields)}`, async () => {
    const { result, sent } = await generate(`stability-ai/${model}`, fields, { image: PNG });
    assert.equal(result.success, true);
    assert.equal(sent.length, 1);
    assert.equal(sent[0].body.output_format, format);
    assert.equal(Object.hasOwn(sent[0].body, "frame_count"), false);
    assert.equal(Object.hasOwn(sent[0].body, "frame_duration_ms"), false);
    assert.equal(result.data.output_format, undefined);
    assert.equal(result.data.data[0].mime_type, undefined);
  });
}
