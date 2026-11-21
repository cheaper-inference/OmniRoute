import test from "node:test";
import assert from "node:assert/strict";
import { handleImageGeneration } from "../../open-sse/handlers/imageGeneration.ts";
import { prepareFalCompatibility } from "../../open-sse/handlers/fal/compatibility.ts";
import { resetDbInstance } from "../../src/lib/db/core.ts";
import { waitForCallLogSaves } from "../../src/lib/usage/callLogs.ts";

const SUNBURST = "openai/gpt-image-2.6/sunburst/text-to-image";
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

test("legacy Fal preserves GIF controls and the qualified OpenAI endpoint", async () => {
  const { result, sent } = await generate(`fal-ai/${SUNBURST}`, {
    output_format: "gif",
    frame_count: 9,
    frame_duration_ms: 205,
  });
  assert.equal(result.success, true);
  assert.equal(sent[0].body.output_format, "gif");
  assert.equal(sent[0].body.frame_count, 9);
  assert.equal(sent[0].body.frame_duration_ms, 205, "the provider owns rounding");
  assert.equal(sent[0].url, `https://fal.run/${SUNBURST}`);
  assert.equal(result.data.output_format, "gif");
  assert.equal(result.data.data[0].mime_type, "image/gif");
  assert.equal(result.data.data[0].b64_json, GIF);
});

test("legacy Fal preserves SVG and normalizes actual response metadata", async () => {
  const { result, sent } = await generate(
    `fal-ai/${SUNBURST}`,
    { output_format: "svg" },
    { output_format: "png", images: [{ b64_json: SVG }] }
  );
  assert.equal(sent[0].body.output_format, "svg");
  assert.equal(result.data.output_format, "svg");
  assert.equal(result.data.data[0].mime_type, "image/svg+xml");
  assert.equal(result.data.data[0].b64_json, SVG);
});

test("Fal reports a PNG response instead of labelling it as the requested GIF", async () => {
  const { result, warnings } = await generate(
    `fal-ai/${SUNBURST}`,
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

test("legacy Fal keeps PNG defaults and its response_format container alias", async () => {
  const omitted = await generate("fal-ai/flux-2-flex", {});
  assert.equal(omitted.sent[0].body.output_format, "png");
  assert.equal(Object.hasOwn(omitted.sent[0].body, "frame_count"), false);
  assert.equal(Object.hasOwn(omitted.sent[0].body, "frame_duration_ms"), false);
  const alias = await generate(`fal-ai/${SUNBURST}`, { response_format: "GIF" });
  assert.equal(alias.sent[0].body.output_format, "gif");
});

test("legacy Fal does not apply GPT Image limits to other endpoints", async () => {
  const { result, sent } = await generate("fal-ai/custom-animation", {
    output_format: "gif",
    frame_count: 24,
    frame_duration_ms: 4000,
  });
  assert.equal(result.success, true);
  assert.equal(sent[0].body.frame_count, 24);
  assert.equal(sent[0].body.frame_duration_ms, 4000);
});

test("legacy Fal rejects malformed frame controls for other endpoints", async () => {
  const { result, sent } = await generate("fal-ai/custom-animation", {
    output_format: "gif",
    frame_duration_ms: "200",
  });
  assert.equal(result.status, 400);
  assert.equal(sent.length, 0);
});

test("legacy Fal Flare also enforces its documented frame-duration ceiling", async () => {
  const { result, sent } = await generate("fal-ai/openai/gpt-image-2.6/flare/text-to-image", {
    output_format: "gif",
    frame_duration_ms: 2001,
  });
  assert.equal(result.status, 400);
  assert.equal(sent.length, 0);
});

for (const [count, duration] of [
  [2, 20],
  [16, 2000],
]) {
  test(`legacy Fal Sunburst accepts frame bounds ${count}/${duration}`, async () => {
    const { result, sent } = await generate(`fal-ai/${SUNBURST}`, {
      output_format: "gif",
      frame_count: count,
      frame_duration_ms: duration,
    });
    assert.equal(result.success, true);
    assert.equal(sent[0].body.frame_count, count);
    assert.equal(sent[0].body.frame_duration_ms, duration);
  });
}

for (const fields of [
  { output_format: "bmp" },
  { output_format: 42 },
  { output_format: "gif", frame_count: 1 },
  { output_format: "gif", frame_count: 17 },
  { output_format: "gif", frame_count: "9" },
  { output_format: "gif", frame_duration_ms: 19 },
  { output_format: "gif", frame_duration_ms: 2001 },
  { output_format: "gif", frame_duration_ms: "200" },
  { output_format: "png", frame_count: 9 },
]) {
  test(`legacy Fal Sunburst rejects invalid controls before inference: ${JSON.stringify(fields)}`, async () => {
    const { result, sent } = await generate(`fal-ai/${SUNBURST}`, fields);
    assert.equal(result.success, false);
    assert.equal(result.status, 400);
    assert.equal(sent.length, 0);
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

for (const [model, fields] of [
  ["stable-image-core", { output_format: "gif" }],
  ["stable-image-ultra", { output_format: "svg" }],
  ["remove-background", { output_format: "jpeg" }],
  ["stable-image-core", { response_format: "gif" }],
  ["stable-image-core", { frame_count: 9 }],
  ["stable-image-core", { frame_duration_ms: 200 }],
] as const) {
  test(`Stability rejects unsupported output controls before inference: ${model}/${JSON.stringify(fields)}`, async () => {
    const { result, sent } = await generate(`stability-ai/${model}`, fields, { image: PNG });
    assert.equal(result.success, false);
    assert.equal(result.status, 400);
    assert.match(String(result.error), /Stability AI/);
    assert.equal(sent.length, 0);
  });
}

test("Stability preserves supported output and reports the detected response container", async () => {
  const { result, sent } = await generate(
    "stability-ai/stable-image-core",
    { output_format: "png" },
    { image: PNG }
  );
  assert.equal(result.success, true);
  assert.equal(sent[0].body.output_format, "png");
  assert.equal(result.data.output_format, "png");
  assert.equal(result.data.data[0].mime_type, "image/png");
  assert.equal(result.data.data[0].b64_json, PNG);
});

for (const [model, fields, format] of [
  ["stable-image-core", {}, "png"],
  ["stable-image-core", { output_format: "JPEG" }, "jpeg"],
  ["stable-image-core", { response_format: "webp" }, "webp"],
  ["remove-background", { output_format: "png" }, "png"],
  ["remove-background", { output_format: "webp" }, "webp"],
] as const) {
  test(`Stability forwards supported ${format} on ${model}`, async () => {
    const { result, sent } = await generate(`stability-ai/${model}`, fields, { image: PNG });
    assert.equal(result.success, true);
    assert.equal(sent[0].body.output_format, format);
    assert.equal(result.data.output_format, "png", "bytes take precedence over the request");
  });
}
