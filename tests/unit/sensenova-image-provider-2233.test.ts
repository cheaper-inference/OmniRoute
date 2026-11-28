import test from "node:test";
import assert from "node:assert/strict";

// 9router#2233: complete the SenseNova (商汤日日新) provider for its free Token Plan.
// The chat provider already existed but was missing the `deepseek-v4-flash` chat model
// and — the core ask — the Text-to-Image model `sensenova-u1-fast`, which cannot work
// through the chat path: it must be registered as an IMAGE provider so requests route
// to `/v1/images/generations` via the OpenAI-compatible image handler.

const { sensenovaProvider } =
  await import("../../open-sse/config/providers/registry/sensenova/index.ts");
const { getImageProvider } = await import("../../open-sse/config/imageRegistry.ts");
const { handleImageGeneration } = await import("../../open-sse/handlers/imageGeneration.ts");

test("SenseNova chat registry includes the deepseek-v4-flash chat model", () => {
  const ids = sensenovaProvider.models.map((m) => m.id);
  assert.ok(
    ids.includes("deepseek-v4-flash"),
    `expected deepseek-v4-flash in SenseNova chat models, got: ${ids.join(", ")}`
  );
});

test("SenseNova chat registry does NOT carry the image model (image goes to the image registry)", () => {
  const ids = sensenovaProvider.models.map((m) => m.id.toLowerCase());
  assert.ok(
    !ids.includes("sensenova-u1-fast"),
    "the text-to-image model must live in the image registry, not the chat registry"
  );
});

test("SenseNova is registered as an OpenAI-compatible image provider", () => {
  const cfg = getImageProvider("sensenova");
  assert.ok(cfg, "expected an IMAGE_PROVIDERS entry for sensenova");
  assert.equal(cfg.id, "sensenova");
  assert.equal(cfg.format, "openai", "must use the generic OpenAI-compatible image handler");
  assert.equal(cfg.authType, "apikey");
  assert.equal(cfg.authHeader, "bearer");
  assert.match(
    cfg.baseUrl,
    /\/v1\/images\/generations$/,
    "image baseUrl must target the OpenAI-compatible /v1/images/generations endpoint"
  );
});

test("SenseNova image provider exposes the sensenova-u1-fast text-to-image model", () => {
  const cfg = getImageProvider("sensenova");
  const ids = (cfg?.models || []).map((m) => m.id);
  assert.ok(
    ids.includes("sensenova-u1-fast"),
    `expected sensenova-u1-fast in SenseNova image models, got: ${ids.join(", ")}`
  );
  assert.ok(
    Array.isArray(cfg?.supportedSizes) && cfg.supportedSizes.length > 0,
    "image provider must declare at least one supported size"
  );
});

// SenseNova U1.5 Lite joined the Token Plan (SenseTime news page, 2026-09-11): model id
// `sensenova-u1.5-lite`, POST https://token.sensenova.cn/v1/images/generations with the
// extra body fields output_format, watermark and prompt_extend.

test("SenseNova image provider exposes sensenova-u1.5-lite on the Token Plan host", () => {
  const cfg = getImageProvider("sensenova");
  const ids = (cfg?.models || []).map((m) => m.id);
  assert.ok(ids.includes("sensenova-u1.5-lite"), `got: ${ids.join(", ")}`);
  assert.equal(cfg?.baseUrl, "https://token.sensenova.cn/v1/images/generations");
});

test("SenseNova image requests forward watermark, prompt_extend and output_format only when sent", async () => {
  const originalFetch = globalThis.fetch;
  const bodies: Record<string, unknown>[] = [];
  globalThis.fetch = (async (_url: unknown, options: { body?: unknown } = {}) => {
    bodies.push(JSON.parse(String(options.body || "{}")));
    return new Response(
      JSON.stringify({ created: 1, data: [{ url: "https://cdn.example.com/a.png" }] }),
      {
        status: 200,
        headers: { "content-type": "application/json" },
      }
    );
  }) as typeof fetch;

  const extras = { watermark: false, prompt_extend: true, output_format: "png" };
  try {
    const sense = await handleImageGeneration({
      body: { model: "sensenova/sensenova-u1.5-lite", prompt: "an otter", ...extras },
      credentials: { apiKey: "sense-key" },
      log: null,
    });
    assert.equal(sense.success, true);
    assert.deepEqual(
      { w: bodies[0].watermark, p: bodies[0].prompt_extend, o: bodies[0].output_format },
      { w: false, p: true, o: "png" },
      "the three vendor fields must reach the upstream JSON"
    );

    // A SenseNova request that does not send them stays byte-identical to today.
    await handleImageGeneration({
      body: { model: "sensenova/sensenova-u1.5-lite", prompt: "an otter" },
      credentials: { apiKey: "sense-key" },
      log: null,
    });
    assert.deepEqual(Object.keys(bodies[1]).sort(), ["model", "prompt"]);

    // Another OpenAI-compatible provider with the same fields must not gain them.
    await handleImageGeneration({
      body: { model: "openai/gpt-image-1", prompt: "an otter", ...extras },
      credentials: { apiKey: "openai-key" },
      log: null,
    });
    assert.deepEqual(Object.keys(bodies[2]).sort(), ["model", "prompt"]);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
