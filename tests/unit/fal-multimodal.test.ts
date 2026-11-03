import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { canonicalFalEndpoint, falEditEndpoint } from "../../open-sse/config/falEndpoint.ts";
import { IMAGE_PROVIDERS } from "../../open-sse/config/imageRegistryData.ts";
import { parseImageModel } from "../../open-sse/config/imageRegistry.ts";
import { VIDEO_PROVIDERS, parseVideoModel } from "../../open-sse/config/videoRegistry.ts";
import { MUSIC_PROVIDERS, parseMusicModel } from "../../open-sse/config/musicRegistry.ts";
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
const { handleFalVideoGeneration, handleFalMusicGeneration } =
  await import("../../open-sse/handlers/mediaGeneration/fal.ts");
test.after(async () => {
  await waitForCallLogSaves(10_000);
  resetDbInstance();
});

test("every retained registry selection resolves, discovers the native schema and dispatches the exact endpoint", async () => {
  const aliases: Record<string, string> = {
    "flux-2-max": "fal-ai/flux-2-max",
    "flux-2-pro": "fal-ai/flux-2-pro",
    "flux-2-flex": "fal-ai/flux-2-flex",
    "bria/text-to-image/3.2": "fal-ai/bria/text-to-image/3.2",
    "bytedance/seedream/v4.5/text-to-image": "fal-ai/bytedance/seedream/v4.5/text-to-image",
    "bytedance/dreamina/v3.1/text-to-image": "fal-ai/bytedance/dreamina/v3.1/text-to-image",
    "ideogram/v3": "fal-ai/ideogram/v3",
    "stable-diffusion-v35-medium": "fal-ai/stable-diffusion-v35-medium",
    "recraft/v4/pro/text-to-image": "fal-ai/recraft/v4/pro/text-to-image",
    "recraft/v4/text-to-image": "fal-ai/recraft/v4/text-to-image",
    "veo3.1/lite": "fal-ai/veo3.1/lite",
    "ace-step": "fal-ai/ace-step",
  };
  const original = globalThis.fetch;
  try {
    for (const [kind, registry, parse] of [
      ["image", IMAGE_PROVIDERS, parseImageModel],
      ["video", VIDEO_PROVIDERS, parseVideoModel],
      ["music", MUSIC_PROVIDERS, parseMusicModel],
    ] as const) {
      for (const entry of registry["fal-ai"].models) {
        const expected = aliases[entry.id] ?? entry.id;
        assert.equal(canonicalFalEndpoint(expected), expected);
        // Native IDs go directly to FalClient; provider-qualified selections go through provider resolution.
        const client = new FalClient("test-key", async (url) => {
          assert.equal(url, `https://fal.run/${expected}`);
          return Response.json({});
        });
        await client.execute(expected, { prompt: "test" }, "direct");
        const selections = [
          `fal-ai/${entry.id}`,
          ...(expected.startsWith("fal-ai/") ? [expected] : []),
        ];
        for (const selection of selections) {
          const selected = parse(selection);
          assert.equal(selected.provider, "fal-ai", selection);
          assert.equal(canonicalFalEndpoint(selected.model!), expected, selection);
          let discoveries = 0;
          let generations = 0;
          globalThis.fetch = async (url, init) => {
            if (String(url).startsWith("https://api.fal.ai/")) {
              discoveries++;
              assert.equal(new URL(String(url)).searchParams.get("endpoint_id"), expected);
              return Response.json({
                models: [
                  {
                    endpoint_id: expected,
                    openapi: {
                      openapi: "3.0.0",
                      paths: {
                        [`/${expected}`]: {
                          post: {
                            requestBody: {
                              content: {
                                "application/json": {
                                  schema: {
                                    type: "object",
                                    properties: { prompt: { type: "string" } },
                                    required: ["prompt"],
                                  },
                                },
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                ],
                has_more: false,
              });
            }
            generations++;
            assert.equal(
              String(url),
              `https://${kind === "image" ? "fal.run" : "queue.fal.run"}/${expected}`
            );
            assert.equal(init?.method, "POST");
            assert.deepEqual(JSON.parse(String(init?.body)), { prompt: "test" });
            return Response.json({
              images: [{ url: "data:image/png;base64,AQID" }],
              video: { url: "https://example.com/video.mp4" },
              audio: { url: "https://example.com/audio.wav" },
            });
          };
          const body = { prompt: "test", fal_input: {} };
          const args = {
            model: selected.model!,
            provider: "fal-ai",
            providerConfig: { baseUrl: "https://queue.fal.run" },
            body,
            credentials: { apiKey: "test-key" },
            log: null,
          };
          const result =
            kind === "image"
              ? await handleImageGeneration({
                  body: { ...body, model: selection },
                  credentials: args.credentials,
                  log: null,
                })
              : kind === "video"
                ? await handleFalVideoGeneration(args)
                : await handleFalMusicGeneration(args);
          assert.equal(result.success, true, `${selection}: ${JSON.stringify(result)}`);
          assert.equal(discoveries, 1, selection);
          assert.equal(generations, 1, selection);
        }
      }
    }
  } finally {
    globalThis.fetch = original;
  }
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
  for (const legacy of [
    "bytedance/seedream/v4.5/text-to-image",
    "bytedance/dreamina/v3.1/text-to-image",
    "bria/text-to-image/3.2",
    "recraft/v4/pro/text-to-image",
    "recraft/v4/text-to-image",
  ]) {
    assert.equal(canonicalFalEndpoint(legacy), `fal-ai/${legacy}`);
    assert.equal(canonicalFalEndpoint(canonicalFalEndpoint(legacy)), `fal-ai/${legacy}`);
  }
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
