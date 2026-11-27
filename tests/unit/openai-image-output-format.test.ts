import test, { after } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

process.env.DATA_DIR = mkdtempSync(join(tmpdir(), "omniroute-openai-image-format-"));

const { handleImageGeneration } = await import("../../open-sse/handlers/imageGeneration.ts");
const { shutdownDbInstance } = await import("../../src/lib/db/core.ts");
const { closeCallLogSaves } = await import("../../src/lib/usage/callLogs.ts");

after(async () => {
  await closeCallLogSaves();
  await shutdownDbInstance();
});

const PNG = Buffer.from("89504e470d0a1a0a00000000", "hex").toString("base64");
const GIF = Buffer.from("GIF89a\x01\x00\x01\x00").toString("base64");

async function generate(
  fields: Record<string, unknown>,
  response: Record<string, unknown> = { data: [{ b64_json: GIF }] },
  status = 200
) {
  const original = globalThis.fetch;
  let sent: Record<string, unknown> | undefined;
  const warnings: string[] = [];
  globalThis.fetch = async (_url, options) => {
    sent = JSON.parse(String(options?.body));
    return Response.json(response, { status });
  };
  try {
    const result = await handleImageGeneration({
      body: { model: "openai/gpt-image-2.6-sunburst", prompt: "an animated bird", ...fields },
      credentials: { apiKey: "test-key" },
      log: {
        info() {},
        error() {},
        warn(_scope: string, message: string) {
          warnings.push(message);
        },
      },
    });
    return { result, sent, warnings };
  } finally {
    globalThis.fetch = original;
  }
}

test("forwards GIF output and animation controls to the OpenAI image endpoint", async () => {
  const { sent, result } = await generate({
    output_format: "gif",
    frame_count: 8,
    frame_duration_ms: 120,
    background: "opaque",
  });
  assert.equal(sent?.output_format, "gif");
  assert.equal(sent?.frame_count, 8);
  assert.equal(sent?.frame_duration_ms, 120);
  assert.equal(sent?.background, "opaque");
  assert.equal(result.success, true);
  assert.equal(result.data.output_format, "gif");
  assert.equal(result.data.data[0].mime_type, "image/gif");
  assert.equal(
    Buffer.from(result.data.data[0].b64_json, "base64").toString("ascii", 0, 6),
    "GIF89a"
  );
});

for (const [format, hex, mime] of [
  ["png", "89504e470d0a1a0a00000000", "image/png"],
  ["jpeg", "ffd8ff0000", "image/jpeg"],
  ["webp", "524946460400000057454250", "image/webp"],
  ["gif", "47494638376101000100", "image/gif"],
  [
    "svg",
    Buffer.from('<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg"/>').toString("hex"),
    "image/svg+xml",
  ],
]) {
  test(`normalizes ${format} and reports its actual container`, async () => {
    const bytes = Buffer.from(hex, "hex").toString("base64");
    const { sent, result } = await generate(
      { output_format: ` ${format.toUpperCase()} ` },
      { data: [{ b64_json: bytes }] }
    );
    assert.equal(sent?.output_format, format);
    assert.equal(result.data.output_format, format);
    assert.equal(result.data.data[0].mime_type, mime);
    assert.equal(result.data.data[0].b64_json, bytes);
  });
}

test("reports actual PNG bytes and warns instead of relabelling them as requested GIF", async () => {
  const { result, warnings } = await generate(
    { output_format: "gif" },
    {
      output_format: "gif",
      data: [{ b64_json: PNG, mime_type: "image/gif" }],
    }
  );
  assert.equal(result.data.output_format, "png");
  assert.equal(result.data.data[0].mime_type, "image/png");
  assert.ok(warnings.some((message) => message.includes("gif") && message.includes("png")));
});

for (const [name, prefix] of [
  ["leading comment", "<!-- generated -->"],
  ["XML declaration and comments", '<?xml version="1.0"?>\n<!-- first --> <!-- second -->\n'],
  [
    "interleaved processing instructions",
    '\uFEFF<?xml version="1.0"?>\n<!-- generated --><?style test?>\n',
  ],
]) {
  test(`detects SVG after ${name} despite conflicting upstream metadata`, async () => {
    const bytes = Buffer.from(`${prefix}<svg xmlns="http://www.w3.org/2000/svg"/>`).toString(
      "base64"
    );
    const { result, warnings } = await generate(
      { output_format: "png" },
      { output_format: "png", data: [{ b64_json: bytes, mime_type: "image/png" }] }
    );
    assert.equal(result.data.output_format, "svg");
    assert.equal(result.data.data[0].mime_type, "image/svg+xml");
    assert.equal(result.data.data[0].b64_json, bytes);
    assert.ok(warnings.some((message) => message.includes("png") && message.includes("svg")));
  });
}

for (const [name, text] of [
  ["an unclosed comment", '<!-- generated <svg xmlns="http://www.w3.org/2000/svg"/>'],
  ["an unclosed processing instruction", '<?style <svg xmlns="http://www.w3.org/2000/svg"/>'],
  [
    "a nested SVG in another root",
    '<!-- generated --><html><svg xmlns="http://www.w3.org/2000/svg"/></html>',
  ],
  [
    "an SVG beyond the bounded prefix",
    `<!-- ${"x".repeat(1600)} --><svg xmlns="http://www.w3.org/2000/svg"/>`,
  ],
]) {
  test(`does not label ${name} as SVG`, async () => {
    const bytes = Buffer.from(text).toString("base64");
    const { result, warnings } = await generate(
      { output_format: "svg" },
      { data: [{ b64_json: bytes }] }
    );
    assert.equal(result.data.output_format, undefined);
    assert.equal(result.data.data[0].mime_type, undefined);
    assert.equal(result.data.data[0].b64_json, bytes);
    assert.deepEqual(warnings, []);
  });
}

for (const fields of [
  { output_format: "bmp" },
  { output_format: 42 },
  { output_format: "gif", frame_count: 1 },
  { output_format: "gif", frame_count: 17 },
  { output_format: "gif", frame_count: "8" },
  { output_format: "gif", frame_count: 2.5 },
  { output_format: "gif", frame_duration_ms: 19 },
  { output_format: "gif", frame_duration_ms: "100" },
  { output_format: "png", frame_count: 8 },
  { output_format: "gif", stream: true },
  { output_format: "gif", partial_images: 1 },
  { output_format: "gif", partial_images: { toString: 42 } },
  { output_format: "gif", partial_images: "0" },
  { output_format: "gif", stream: "true" },
  { output_format: " GIF ", output_compression: 80 },
]) {
  test(`rejects invalid format controls before inference: ${JSON.stringify(fields)}`, async () => {
    const { result, sent } = await generate(fields);
    assert.equal(result.success, false);
    assert.equal(result.status, 400);
    assert.equal(sent, undefined);
  });
}

test("preserves omitted options and leaves unrecognized bytes unlabelled", async () => {
  const { result, sent } = await generate(
    { output_format: "png" },
    { data: [{ b64_json: "unknown" }] }
  );
  for (const field of ["frame_count", "frame_duration_ms", "background"]) {
    assert.equal(Object.hasOwn(sent!, field), false);
  }
  assert.equal(result.data.output_format, undefined);
  assert.equal(result.data.data[0].mime_type, undefined);
});

test("without output_format the request and response are exactly as before", async () => {
  // Animation/background controls alone never activated anything and still do not.
  const { result, sent, warnings } = await generate(
    { frame_count: 1, frame_duration_ms: "x", background: "neon" },
    { output_format: "gif", data: [{ b64_json: GIF }] }
  );
  assert.equal(result.success, true);
  for (const field of ["output_format", "frame_count", "frame_duration_ms", "background"]) {
    assert.equal(Object.hasOwn(sent!, field), false, `${field} must not be forwarded`);
  }
  assert.deepEqual(Object.keys(result.data).sort(), ["created", "data"]);
  assert.deepEqual(result.data.data, [{ b64_json: GIF }]);
  assert.deepEqual(warnings, []);
});

test("preserves URL responses and upstream format without fetching the URL", async () => {
  const { result, sent, warnings } = await generate(
    { output_format: "gif", response_format: "url" },
    {
      output_format: "png",
      data: [{ url: "https://example.test/output?signature=kept" }],
    }
  );
  assert.equal(sent?.response_format, "url");
  assert.equal(result.data.output_format, "png");
  assert.equal(result.data.data[0].url, "https://example.test/output?signature=kept");
  assert.ok(warnings.length);
});

test("preserves upstream model-specific unsupported-format errors", async () => {
  const { result, sent } = await generate(
    { output_format: "svg" },
    {
      error: { message: "The selected model does not support svg" },
    },
    400
  );
  assert.equal(sent?.output_format, "svg");
  assert.equal(result.success, false);
  assert.equal(result.status, 400);
});
