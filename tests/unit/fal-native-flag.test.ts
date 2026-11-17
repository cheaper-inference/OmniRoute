import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

process.env.DATA_DIR = mkdtempSync(join(tmpdir(), "fal-native-flag-"));
process.env.API_KEY_SECRET = "fal-native-flag-test-secret";
process.env.INITIAL_PASSWORD = "fal-native-flag-tests-only-password";
delete process.env.FAL_NATIVE_ENABLED;

const { FEATURE_FLAG_DEFINITIONS } =
  await import("../../src/shared/constants/featureFlagDefinitions.ts");
const { getFalCompatibilityPreparer, prepareFalCompatibility } =
  await import("../../src/lib/fal/compatibility.ts");
const { falImageEditBody, falImageEditMaxReferences, handleFalAIImageEdit, isFalImageEditModel } =
  await import("../../open-sse/handlers/imageGeneration/providers/fal.ts");
const { handleImageGeneration } = await import("../../open-sse/handlers/imageGeneration.ts");
const { handleFalVideoGeneration, handleFalMusicGeneration } =
  await import("../../open-sse/handlers/mediaGeneration/fal.ts");
const { falSelectionEndpoint } = await import("../../open-sse/config/falEndpoint.ts");
const { falCompatibilityInput } = await import("../../open-sse/handlers/fal/schema.ts");
const { FalError } = await import("../../open-sse/handlers/fal/client.ts");
const { parseOpenapi } = await import("../../src/lib/agentSkills/openapiParser.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");
const { waitForCallLogSaves } = await import("../../src/lib/usage/callLogs.ts");
const run = await import("../../src/app/api/v1/fal/run/route.ts");
const models = await import("../../src/app/api/v1/fal/models/route.ts");
const jobs = await import("../../src/app/api/v1/fal/jobs/[id]/route.ts");

test.after(async () => {
  await waitForCallLogSaves(10_000);
  resetDbInstance();
});

type Posted = { url: string; body: Record<string, unknown> };

/** Records dispatches, and fails the test on any schema discovery unless a catalog is given. */
async function withFal<T>(
  reply: (url: string) => Response,
  action: (posted: Posted[]) => Promise<T>,
  catalog?: unknown
): Promise<T> {
  const original = globalThis.fetch;
  const posted: Posted[] = [];
  globalThis.fetch = (async (url, init) => {
    const target = String(url);
    if (target.startsWith("https://api.fal.ai/")) {
      assert.ok(catalog, `unexpected schema discovery: ${target}`);
      return Response.json({ models: [catalog], has_more: false });
    }
    if (init?.method === "POST") {
      posted.push({ url: target, body: JSON.parse(String(init.body)) });
    }
    return reply(target);
  }) as typeof fetch;
  try {
    return await action(posted);
  } finally {
    globalThis.fetch = original;
  }
}

const imageReply = () => Response.json({ images: [{ url: "data:image/png;base64,AQID" }] });
const credentials = { apiKey: "test-only-key" };

function schemaFor(endpoint: string, properties: Record<string, unknown>) {
  return {
    endpoint_id: endpoint,
    openapi: {
      openapi: "3.0.0",
      paths: {
        [`/${endpoint}`]: {
          post: {
            requestBody: {
              content: { "application/json": { schema: { type: "object", properties } } },
            },
          },
        },
      },
    },
  };
}

test("FAL_NATIVE_ENABLED is defined off and the routes inject nothing until it is on", () => {
  const flag = FEATURE_FLAG_DEFINITIONS.find((entry) => entry.key === "FAL_NATIVE_ENABLED");
  assert.equal(flag?.defaultValue, "false");
  assert.equal(getFalCompatibilityPreparer(), null);
  process.env.FAL_NATIVE_ENABLED = "true";
  try {
    assert.equal(getFalCompatibilityPreparer(), prepareFalCompatibility);
  } finally {
    delete process.env.FAL_NATIVE_ENABLED;
  }
});

test("off: the native routes answer 404 before touching a request body", async () => {
  const context = { params: Promise.resolve({ id: "missing" }) };
  const local = "http://localhost/api/v1/fal";
  for (const response of [
    await run.POST(new Request(`${local}/run`, { method: "POST", body: "not json" })),
    await models.GET(new Request(`${local}/models`)),
    await jobs.GET(new Request(`${local}/jobs/missing`), context),
    await jobs.POST(new Request(`${local}/jobs/missing`, { method: "POST" }), context),
    await jobs.DELETE(new Request(`${local}/jobs/missing`, { method: "DELETE" }), context),
  ]) {
    assert.equal(response.status, 404);
  }
});

test("off: an unregistered first-party image selection reaches fal-ai with the built body", async () => {
  await withFal(imageReply, async (posted) => {
    const result = await handleImageGeneration({
      body: { model: "fal-ai/aura-flow", prompt: "cube", size: "1024x1024" },
      credentials,
      log: null,
    });
    assert.equal(result.success, true, JSON.stringify(result));
    assert.equal(posted[0].url, "https://fal.run/fal-ai/aura-flow");
    assert.equal(posted[0].body.aspect_ratio, "1:1");
  });
});

test("off: nano-banana keeps its aspect_ratio mapping and needs no schema", async () => {
  for (const model of ["fal-ai/nano-banana-pro", "fal-ai/nano-banana-2"]) {
    await withFal(imageReply, async (posted) => {
      await handleImageGeneration({
        body: { model, prompt: "cube", size: "1792x1024", quality: "hd" },
        credentials,
        log: null,
      });
      assert.equal(posted[0].url, `https://fal.run/${model}`);
      assert.equal(posted[0].body.aspect_ratio, "16:9");
    });
  }
});

test("off: an upstream image error keeps Fal's own text", async () => {
  const detail = '{"detail":"prompt rejected by the content checker"}';
  await withFal(
    () => new Response(detail, { status: 422 }),
    async () => {
      const result = await handleImageGeneration({
        body: { model: "fal-ai/flux-2-pro", prompt: "cube" },
        credentials,
        log: null,
      });
      assert.equal(result.status, 422);
      assert.match(String(result.error?.message ?? result.error), /content checker/);
    }
  );
});

test("off: only the three FLUX edit models take the edit path, capped at ten references", () => {
  for (const model of ["fal-ai/flux-2-flex", "fal-ai/flux-2-max", "fal-ai/flux-2-pro"]) {
    assert.equal(isFalImageEditModel(model), true, model);
    assert.equal(falImageEditMaxReferences(model), 10, model);
  }
  for (const model of ["flux/dev", "ideogram/v3", "openai/gpt-image-2.5/sunburst/edit", null]) {
    assert.equal(isFalImageEditModel(model), false, String(model));
  }
});

test("off: an edit body drops every forwarded option and forces one image", () => {
  assert.deepEqual(
    falImageEditBody(
      "fal-ai/flux-2-pro",
      false,
      { image_urls: ["evil"], output_format: "webp", n: 4 },
      { prompt: "cube", size: null, responseFormat: null }
    ),
    { prompt: "cube", size: undefined, response_format: undefined, n: 1 }
  );
});

test("off: a Fal edit posts the original body to <model>/edit", async () => {
  await withFal(imageReply, async (posted) => {
    await handleFalAIImageEdit({
      provider: "fal-ai",
      model: "fal-ai/flux-2-pro",
      providerConfig: { baseUrl: "https://fal.run" },
      body: { prompt: "cube", n: 1 },
      images: [{ bytes: Buffer.from([1]), mime: "image/png" }],
      credentials,
      log: null,
    });
    assert.equal(posted[0].url, "https://fal.run/fal-ai/flux-2-pro/edit");
    assert.equal(posted[0].body.num_images, 1);
    assert.equal(posted[0].body.output_format, "png");
  });
});

const queueArgs = {
  provider: "fal-ai",
  providerConfig: { baseUrl: "https://queue.fal.run" },
  credentials,
  log: null,
};

function queueReply(createPayload: Record<string, unknown>, seen: string[]) {
  return (url: string) => {
    seen.push(url);
    if (url.endsWith("/status")) return Response.json({ status: "COMPLETED" });
    if (url.includes("/requests/"))
      return Response.json({ video: { url: "https://x.test/v.mp4" } });
    return Response.json(createPayload);
  };
}

for (const prepareFalInput of [null, prepareFalCompatibility]) {
  const label = prepareFalInput ? "on" : "off";

  test(`${label}: a queue response without tracking URLs falls back to the queue path`, async () => {
    const seen: string[] = [];
    const endpoint = "fal-ai/kling-video/v2.1/pro/text-to-video";
    await withFal(
      queueReply({ request_id: "abc" }, seen),
      async (posted) => {
        const result = await handleFalVideoGeneration({
          ...queueArgs,
          model: "kling-video/v2.1/pro/text-to-video",
          body: { prompt: "cube" },
          prepareFalInput,
        });
        assert.equal(result.success, true, JSON.stringify(result));
        assert.equal(posted[0].url, `https://queue.fal.run/${endpoint}`);
      },
      schemaFor(endpoint, { prompt: { type: "string" } })
    );
    assert.deepEqual(seen.slice(1), [
      `https://queue.fal.run/${endpoint}/requests/abc/status`,
      `https://queue.fal.run/${endpoint}/requests/abc`,
    ]);
  });
}

test("off: video results and upstream tracking URLs stay as they were", async () => {
  const seen: string[] = [];
  await withFal(
    queueReply({ request_id: "abc", status_url: "custom/requests/abc/status" }, seen),
    async () => {
      const result = await handleFalVideoGeneration({
        ...queueArgs,
        model: "veo3.1/lite",
        body: { prompt: "cube" },
      });
      assert.equal(result.success, true, JSON.stringify(result));
      assert.equal(result.data.artifacts, undefined);
    }
  );
  assert.equal(seen[1], "https://queue.fal.run/custom/requests/abc/status");
});

test("on: music and video report a discovery failure with its own status", async () => {
  const prepareFalInput = async () => {
    throw new FalError("Fal endpoint was not discovered; register a schema override", 404);
  };
  for (const handler of [handleFalVideoGeneration, handleFalMusicGeneration]) {
    const result = await handler({
      ...queueArgs,
      model: "fal-ai/unknown-app",
      body: { prompt: "cube" },
      prepareFalInput,
    });
    assert.equal(result.status, 404);
  }
});

test("on: a selection keeps its first-party owner and vendors stay verbatim", () => {
  assert.equal(falSelectionEndpoint("aura-flow"), "fal-ai/aura-flow");
  assert.equal(
    falSelectionEndpoint("kling-video/v2.1/pro/text-to-video"),
    "fal-ai/kling-video/v2.1/pro/text-to-video"
  );
  assert.equal(falSelectionEndpoint("alibaba/wan-3.0/t2v"), "alibaba/wan-3.0/t2v");
  assert.equal(
    falSelectionEndpoint("openai/gpt-image-2.5/flare/edit"),
    "openai/gpt-image-2.5/flare/edit"
  );
  assert.equal(falSelectionEndpoint("nano-banana-pro"), "fal-ai/nano-banana-pro");
  assert.throws(() => falSelectionEndpoint("owner/../app"));
});

test("on: a bare first-party image selection is discovered and dispatched under fal-ai", async () => {
  const endpoint = "fal-ai/aura-flow";
  await withFal(
    imageReply,
    async (posted) => {
      const result = await handleImageGeneration({
        body: { model: endpoint, prompt: "cube" },
        credentials,
        log: null,
        prepareFalInput: prepareFalCompatibility,
      });
      assert.equal(result.success, true, JSON.stringify(result));
      assert.equal(posted[0].url, `https://fal.run/${endpoint}`);
    },
    schemaFor(endpoint, { prompt: { type: "string" } })
  );
});

test("on: an unusable endpoint is an error result, not a rejected promise", async () => {
  const result = await handleImageGeneration({
    body: { model: "fal-ai/-/.bad@", prompt: "cube" },
    credentials,
    log: null,
    prepareFalInput: prepareFalCompatibility,
  });
  assert.equal(result.success, false);
});

test("on: registered nano-banana models keep their mapping without a schema lookup", async () => {
  await withFal(imageReply, async (posted) => {
    const result = await handleImageGeneration({
      body: { model: "fal-ai/nano-banana-pro", prompt: "cube", size: "1792x1024", quality: "hd" },
      credentials,
      log: null,
      prepareFalInput: prepareFalCompatibility,
    });
    assert.equal(result.success, true, JSON.stringify(result));
    assert.equal(posted[0].url, "https://fal.run/fal-ai/nano-banana-pro");
    assert.equal(posted[0].body.aspect_ratio, "16:9");
  });
});

test("on: the adapter maps size to a documented aspect_ratio and skips undocumented controls", () => {
  const definition = schemaFor("fal-ai/custom", {
    prompt: { type: "string" },
    aspect_ratio: { type: "string" },
  });
  assert.deepEqual(
    falCompatibilityInput(
      { prompt: "cube", size: "1792x1024", quality: "hd", user: "someone" },
      definition
    ),
    { prompt: "cube", aspect_ratio: "16:9" }
  );
  assert.deepEqual(
    falCompatibilityInput({ prompt: "cube", size: "1024x1024", aspect_ratio: "4:3" }, definition),
    { prompt: "cube", aspect_ratio: "4:3" }
  );
  assert.throws(
    () => falCompatibilityInput({ prompt: "cube", fal_input: { quality: "hd" } }, definition),
    /Unsupported fal input: quality/
  );
  assert.throws(
    () => falCompatibilityInput({ prompt: "cube", guidance: 3 }, definition),
    /Unsupported fal input: guidance/
  );
});

test("on: image references reach the schema adapter instead of disappearing", async () => {
  const endpoint = "fal-ai/custom-editor";
  await withFal(
    imageReply,
    async (posted) => {
      await handleImageGeneration({
        body: { model: endpoint, prompt: "cube", image: "https://example.com/a.png" },
        credentials,
        log: null,
        prepareFalInput: prepareFalCompatibility,
      });
      assert.deepEqual(posted[0].body.image_urls, ["https://example.com/a.png"]);
    },
    schemaFor(endpoint, {
      prompt: { type: "string" },
      image_urls: { type: "array", items: { type: "string" } },
    })
  );
});

test("on: generation aliases stay off the edit path; schema endpoints may use it", () => {
  for (const model of ["flux/dev", "ideogram/v3", "fal-ai/nano-banana-pro"]) {
    assert.equal(isFalImageEditModel(model, true), false, model);
  }
  assert.equal(isFalImageEditModel("flux-2-pro", true), true);
  assert.equal(isFalImageEditModel("openai/gpt-image-2.5/sunburst/edit", true), true);
  assert.equal(falImageEditMaxReferences("flux-2-pro"), 10);
  assert.equal(
    falImageEditMaxReferences("openai/gpt-image-2.5/sunburst/edit"),
    Number.POSITIVE_INFINITY
  );
});

test("on: raw JSON keys cannot replace computed references or the forced legacy count", async () => {
  const fields = { prompt: "cube", size: null, responseFormat: null };
  const options = {
    model: "other",
    image: "raw",
    images: ["raw"],
    image_url: "raw",
    image_urls: ["raw"],
    output_format: "webp",
    guidance_scale: 3,
    n: 4,
    num_images: 4,
  };
  const body = falImageEditBody("fal-ai/flux-2-pro", true, options, fields);
  assert.equal(body.n, 1);
  for (const key of ["model", "image", "images", "image_url", "image_urls"]) {
    assert.equal(Object.hasOwn(body, key), false, key);
  }
  await withFal(imageReply, async (posted) => {
    await handleFalAIImageEdit({
      provider: "fal-ai",
      model: "fal-ai/flux-2-pro",
      providerConfig: { baseUrl: "https://fal.run" },
      body,
      images: [{ bytes: Buffer.from([1]), mime: "image/png" }],
      credentials,
      log: null,
      prepareFalInput: prepareFalCompatibility,
    });
    assert.equal(posted[0].url, "https://fal.run/fal-ai/flux-2-pro/edit");
    assert.deepEqual(posted[0].body.image_urls, ["data:image/png;base64,AQ=="]);
    assert.equal(posted[0].body.num_images, 1);
    assert.equal(posted[0].body.guidance_scale, 3);
  });
  const schemaBody = falImageEditBody("openai/gpt-image-2.5/flare/edit", true, options, fields);
  assert.equal(schemaBody.n, 4);
});

test("on: a schema edit keeps Fal's sanitized error text", async () => {
  await withFal(
    () => new Response('{"detail":"mask is too large"}', { status: 422 }),
    async () => {
      const result = await handleFalAIImageEdit({
        provider: "fal-ai",
        model: "fal-ai/flux-2-pro",
        providerConfig: { baseUrl: "https://fal.run" },
        body: { prompt: "cube", n: 1 },
        images: [{ bytes: Buffer.from([1]), mime: "image/png" }],
        credentials,
        log: null,
        prepareFalInput: prepareFalCompatibility,
      });
      assert.equal(result.status, 422);
      assert.match(String(result.error?.message ?? result.error), /mask is too large/);
    }
  );
});

test("the opt-in routes stay in the API reference but out of the generated agent skills", () => {
  const { paths } = parseOpenapi();
  assert.equal(paths.has("POST /api/v1/fal/run"), false);
  assert.equal(paths.has("GET /api/providers/{id}/fal"), false);
  assert.ok(paths.has("POST /api/v1/images/generations"));
});
