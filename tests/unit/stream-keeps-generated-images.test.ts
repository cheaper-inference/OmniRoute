import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// Generated images reach OpenAI-format clients as a standalone chunk whose delta carries only
// `images` (open-sse/translator/response/gemini-to-openai.ts, inlineData branch). Both the
// streaming sanitizer (sanitizeStreamingChunk) and the empty-chunk filter (hasValuableContent)
// must let that chunk through, otherwise the client receives an empty assistant message.

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-stream-images-"));
process.env.DATA_DIR = TEST_DATA_DIR;
const core = await import("../../src/lib/db/core.ts");

const { hasValuableContent } = await import("../../open-sse/utils/streamHelpers.ts");
const { sanitizeStreamingChunk } = await import("../../open-sse/handlers/responseSanitizer.ts");
const { createSSEStream, createSSETransformStreamWithLogger } =
  await import("../../open-sse/utils/stream.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");

const IMAGE_DATA = "iVBORw0KGgo=";
const IMAGE_URL = `data:image/png;base64,${IMAGE_DATA}`;

const imageChunk = () => ({
  id: "chatcmpl-img",
  object: "chat.completion.chunk",
  created: 1,
  model: "gemini-2.5-flash-image",
  choices: [
    {
      index: 0,
      delta: { images: [{ type: "image_url", image_url: { url: IMAGE_URL } }] },
      finish_reason: null,
    },
  ],
});

const textEncoder = new TextEncoder();

async function pipe(chunks: string[], transform: TransformStream): Promise<string> {
  const source = new ReadableStream({
    start(controller) {
      for (const chunk of chunks) controller.enqueue(textEncoder.encode(chunk));
      controller.close();
    },
  });
  return new Response(source.pipeThrough(transform)).text();
}

function imageUrlsFromSse(text: string): string[] {
  const urls: string[] = [];
  for (const line of text.split("\n")) {
    if (!line.startsWith("data: ") || line === "data: [DONE]") continue;
    let parsed: {
      choices?: Array<{ delta?: { images?: Array<{ image_url?: { url?: string } }> } }>;
    };
    try {
      parsed = JSON.parse(line.slice(6));
    } catch {
      continue;
    }
    for (const image of parsed.choices?.[0]?.delta?.images ?? []) {
      if (typeof image?.image_url?.url === "string") urls.push(image.image_url.url);
    }
  }
  return urls;
}

test.after(() => {
  core.resetDbInstance();
  if (fs.existsSync(TEST_DATA_DIR)) {
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});

test("hasValuableContent keeps an OpenAI chunk carrying only a generated image", () => {
  assert.equal(hasValuableContent(imageChunk(), FORMATS.OPENAI), true);
});

test("hasValuableContent still drops a chunk whose images array is empty", () => {
  const chunk = { choices: [{ index: 0, delta: { images: [] }, finish_reason: null }] };
  assert.equal(hasValuableContent(chunk, FORMATS.OPENAI), false);
});

test("sanitizeStreamingChunk preserves delta.images", () => {
  const sanitized = sanitizeStreamingChunk(imageChunk()) as ReturnType<typeof imageChunk>;
  assert.deepEqual(sanitized.choices[0].delta.images, [
    { type: "image_url", image_url: { url: IMAGE_URL } },
  ]);
});

test("translate stream (Gemini → OpenAI) forwards the inlineData image to the client", async () => {
  const geminiChunks = [
    `data: ${JSON.stringify({
      candidates: [
        {
          content: {
            role: "model",
            parts: [{ inlineData: { mimeType: "image/png", data: IMAGE_DATA } }],
          },
        },
      ],
    })}\n\n`,
    `data: ${JSON.stringify({
      candidates: [{ content: { role: "model", parts: [{ text: "" }] }, finishReason: "STOP" }],
      usageMetadata: { promptTokenCount: 3, candidatesTokenCount: 5, totalTokenCount: 8 },
    })}\n\n`,
  ];
  const text = await pipe(
    geminiChunks,
    createSSETransformStreamWithLogger(
      FORMATS.GEMINI,
      FORMATS.OPENAI,
      "gemini",
      null,
      null,
      "gemini-2.5-flash-image"
    )
  );
  assert.deepEqual(imageUrlsFromSse(text), [IMAGE_URL]);
});

test("passthrough stream forwards an images-only OpenAI chunk", async () => {
  const text = await pipe(
    [
      `data: ${JSON.stringify(imageChunk())}\n\n`,
      `data: ${JSON.stringify({
        id: "chatcmpl-img",
        object: "chat.completion.chunk",
        created: 1,
        model: "gemini-2.5-flash-image",
        choices: [{ index: 0, delta: {}, finish_reason: "stop" }],
      })}\n\n`,
      "data: [DONE]\n\n",
    ],
    createSSEStream({
      mode: "passthrough",
      sourceFormat: FORMATS.OPENAI,
      provider: "openai",
      model: "gemini-2.5-flash-image",
    })
  );
  assert.deepEqual(imageUrlsFromSse(text), [IMAGE_URL]);
});
