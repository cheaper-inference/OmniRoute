import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { canonicalFalEndpoint, falEditEndpoint } from "../../open-sse/config/falEndpoint.ts";
import {
  compileFalInput,
  falCapabilities,
  falCompatibilityInput,
  type FalDefinition,
} from "../../open-sse/handlers/fal/schema.ts";
import {
  FalClient,
  falTrackingUrl,
  normalizeFalOutput,
} from "../../open-sse/handlers/fal/client.ts";

process.env.DATA_DIR = mkdtempSync(join(tmpdir(), "fal-multimodal-"));
const { handleImageGeneration } = await import("../../open-sse/handlers/imageGeneration.ts");
const { handleFalAIImageEdit } =
  await import("../../open-sse/handlers/imageGeneration/providers/fal.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");
const { waitForCallLogSaves } = await import("../../src/lib/usage/callLogs.ts");
test.after(async () => {
  await waitForCallLogSaves(10_000);
  resetDbInstance();
});

function fixture(id: string): FalDefinition {
  return JSON.parse(
    readFileSync(
      new URL(`../fixtures/fal/${id.replaceAll("/", "_")}.json`, import.meta.url),
      "utf8"
    )
  );
}
const imageIds = [
  "openai/gpt-image-2.5/sunburst/text-to-image",
  "openai/gpt-image-2.5/sunburst/edit",
  "openai/gpt-image-2.5/flare/text-to-image",
  "openai/gpt-image-2.5/flare/edit",
];

test("qualified endpoint IDs and nested publishers remain opaque, with explicit legacy aliases", () => {
  for (const id of [...imageIds, "new-publisher/app/variant/edit"])
    assert.equal(canonicalFalEndpoint(id), id);
  assert.equal(canonicalFalEndpoint("veo3.1/lite"), "fal-ai/veo3.1/lite");
  assert.equal(canonicalFalEndpoint("flux-2-flex"), "fal-ai/flux-2-flex");
  assert.equal(falEditEndpoint(imageIds[1]), imageIds[1]);
  assert.equal(falEditEndpoint(imageIds[0]), imageIds[1]);
  for (const id of [
    "https://evil.test/app",
    "owner/../app",
    "owner/app?x=1",
    "owner/app%2f..",
    "owner//app",
  ]) {
    assert.throws(() => canonicalFalEndpoint(id));
  }
});

for (const endpoint of imageIds) {
  test(`official schema and compatibility adapter: ${endpoint}`, async () => {
    const definition = fixture(endpoint);
    const isEdit = endpoint.endsWith("/edit");
    const native = {
      prompt: "a blue cube",
      quality: "max",
      image_size: { width: 1536, height: 1024 },
      num_images: 1,
      ...(isEdit
        ? {
            image_urls: ["https://example.com/one.png", "https://example.com/two.png"],
            mask_url: "https://example.com/mask.png",
          }
        : {}),
    };
    assert.deepEqual(compileFalInput(definition)(native), native);
    assert.deepEqual(falCapabilities(definition).reasoning, {});
    assert.throws(
      () => compileFalInput(definition)({ ...native, enable_thinking: true }),
      /Unsupported/
    );
    const original = globalThis.fetch;
    let posted: Record<string, unknown> = {};
    let postedUrl = "";
    globalThis.fetch = async (url, init) => {
      if (String(url).startsWith("https://api.fal.ai/"))
        return Response.json({ models: [definition], has_more: false, next_cursor: null });
      postedUrl = String(url);
      posted = JSON.parse(String(init?.body));
      return Response.json({ images: [{ url: "data:image/png;base64,CAkK" }] });
    };
    try {
      const body = {
        prompt: "a blue cube",
        quality: "max",
        size: "1536x1024",
        response_format: "url",
        n: 1,
        ...(isEdit ? { mask: "data:image/png;base64,BAUG" } : {}),
      };
      const result = isEdit
        ? await handleFalAIImageEdit({
            model: endpoint,
            provider: "fal-ai",
            providerConfig: { baseUrl: "https://fal.run" },
            body,
            images: [
              { bytes: Buffer.from([1, 2]), mime: "image/png" },
              { bytes: Buffer.from([3, 4]), mime: "image/png" },
            ],
            credentials: { apiKey: "test-only-key" },
            log: null,
          })
        : await handleImageGeneration({
            body: { ...body, model: `fal-ai/${endpoint}` },
            credentials: { apiKey: "test-only-key" },
            log: null,
          });
      assert.equal(postedUrl, `https://fal.run/${endpoint}`);
      assert.equal(result.success, true, JSON.stringify(result));
      assert.equal(posted.quality, "max");
      assert.deepEqual(posted.image_size, { width: 1536, height: 1024 });
      assert.equal(posted.enable_thinking, undefined);
      if (isEdit) {
        assert.equal((posted.image_urls as string[]).length, 2);
        assert.equal(posted.mask_url, "data:image/png;base64,BAUG");
      }
    } finally {
      globalThis.fetch = original;
    }
  });
}

test("Wan thinking booleans, ordered multimodal references and native nested input survive", () => {
  const definition = fixture("alibaba/wan-3.0/reference-to-video");
  for (const enable_thinking of [true, false]) {
    const input = {
      prompt: "walk",
      enable_thinking,
      seed: 0,
      reference_image_urls: ["https://example.com/1", "https://example.com/2"],
      reference_video_urls: ["https://example.com/video"],
      reference_audio_urls: ["https://example.com/audio"],
    };
    assert.deepEqual(compileFalInput(definition)(input), input);
  }
  assert.deepEqual(
    falCompatibilityInput(
      {
        prompt: "walk",
        enable_thinking: false,
        image_urls: ["https://example.com/1", "https://example.com/2"],
        video_urls: ["https://example.com/video"],
        audio_urls: ["https://example.com/audio"],
      },
      definition
    ),
    {
      prompt: "walk",
      enable_thinking: false,
      reference_image_urls: ["https://example.com/1", "https://example.com/2"],
      reference_video_urls: ["https://example.com/video"],
      reference_audio_urls: ["https://example.com/audio"],
    }
  );
  const custom: FalDefinition = {
    endpoint_id: "publisher/custom",
    openapi: {
      openapi: "3.0.0",
      paths: {
        "/publisher/custom": {
          post: {
            requestBody: {
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: { options: { type: "object" } },
                    required: ["options"],
                  },
                },
              },
            },
          },
        },
      },
    },
  };
  const input = { options: { enabled: false, count: 0, data: null, refs: ["b", "a"] } };
  assert.deepEqual(falCompatibilityInput({ fal_input: input }, custom), input);
});

test("music, speech, transcription, 3D and reasoning use their distinct official schemas", () => {
  const cases: Array<[string, Record<string, unknown>]> = [
    ["fal-ai/ace-step", { tags: "jazz" }],
    ["fal-ai/whisper", { audio_url: "https://example.com/speech.wav" }],
    ["fal-ai/kokoro/american-english", { prompt: "hello" }],
    ["fal-ai/hunyuan3d-v21", { input_image_url: "https://example.com/object.png" }],
    ["fal-ai/any-llm", { prompt: "describe", reasoning: true }],
  ];
  for (const [id, input] of cases) assert.deepEqual(compileFalInput(fixture(id))(input), input, id);
  assert.throws(() => compileFalInput(fixture("fal-ai/whisper"))({ tags: "jazz" }));
  const output = {
    output: "answer",
    reasoning: "upstream reasoning",
    partial: false,
    mesh: {
      url: "https://example.com/a.glb",
      content_type: "model/gltf-binary",
      file_name: "a.glb",
    },
    textures: [{ url: "https://example.com/a.png", width: 1024 }],
    preview_url: "https://example.com/p.jpg",
  };
  assert.deepEqual(normalizeFalOutput(output).output, output);
  assert.equal(normalizeFalOutput(output).artifacts.length, 3);
});

test("tracking URLs require the trusted host and upstream request ID", () => {
  assert.equal(
    falTrackingUrl("https://queue.fal.run/owner/app/requests/abc/status", "abc"),
    "https://queue.fal.run/owner/app/requests/abc/status"
  );
  for (const url of [
    "https://evil.test/requests/abc",
    "https://queue.fal.run@evil.test/requests/abc",
    "https://queue.fal.run/requests/other",
    "http://queue.fal.run/requests/abc",
  ])
    assert.throws(() => falTrackingUrl(url, "abc"));
});

test("uncertain queue submissions are sent once and never retried", async () => {
  let calls = 0;
  const client = new FalClient("test-only-key", async (_url, init) => {
    calls++;
    assert.equal(new Headers(init?.headers).get("authorization"), "Key test-only-key");
    throw new Error("connection lost");
  });
  await assert.rejects(client.execute("publisher/app/nested", { enabled: false }, "queue"));
  assert.equal(calls, 1);
});
