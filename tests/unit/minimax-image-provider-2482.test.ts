import test from "node:test";
import assert from "node:assert/strict";

// 9router#2482: MiniMax Text-to-Image returns "404 page not found".
// MiniMax already has entries in musicRegistry.ts/audioRegistry.ts/videoRegistry.ts,
// but no entry at all in imageRegistry.ts (nor a dedicated provider handler under
// open-sse/handlers/imageGeneration/providers/), so a MiniMax image-model request
// falls through the format dispatch in imageGeneration.ts to a 400/unmatched-format
// path instead of reaching MiniMax's image_generation endpoint.
//
// handleImageGeneration is imported statically (not dynamically inside a test) so
// its transitive imports (e.g. the proxy-aware fetch dispatcher) finish installing
// their own globalThis.fetch wrapper before any test reassigns it for mocking —
// a dynamic import after the mock assignment would let that wrapper silently
// clobber the test's mock and hit the real network.
const { getImageProvider } = await import("../../open-sse/config/imageRegistry.ts");
const { handleImageGeneration } = await import("../../open-sse/handlers/imageGeneration.ts");

test("MiniMax is registered as an image provider with a dedicated minimax-image format", () => {
  const cfg = getImageProvider("minimax");
  assert.ok(cfg, "expected an IMAGE_PROVIDERS entry for minimax");
  assert.equal(cfg.id, "minimax");
  assert.equal(
    cfg.format,
    "minimax-image",
    "MiniMax image_generation is not OpenAI-compatible, must use its own format"
  );
  assert.equal(cfg.authType, "apikey");
  assert.equal(cfg.authHeader, "bearer");
  assert.match(
    cfg.baseUrl,
    /api\.minimax\.io\/v1\/image_generation$/,
    "image baseUrl must target MiniMax's image_generation endpoint"
  );
});

test("MiniMax image provider exposes at least one text-to-image model", () => {
  const cfg = getImageProvider("minimax");
  const ids = (cfg?.models || []).map((m) => m.id);
  assert.ok(ids.length > 0, `expected at least one MiniMax image model, got: ${ids.join(", ")}`);
  assert.ok(
    Array.isArray(cfg?.supportedSizes) && cfg.supportedSizes.length > 0,
    "image provider must declare at least one supported size"
  );
});

test("handleImageGeneration dispatches minimax-image format to the MiniMax handler and normalizes the response", async () => {
  const originalFetch = globalThis.fetch;
  try {
    let fetchCalled = false;
    globalThis.fetch = (async (url: string) => {
      fetchCalled = true;
      assert.match(String(url), /api\.minimax\.io\/v1\/image_generation$/);
      return {
        ok: true,
        status: 200,
        json: async () => ({
          id: "abc123",
          data: { image_urls: ["https://cdn.minimax.io/generated/one.png"] },
          base_resp: { status_code: 0, status_msg: "success" },
        }),
      } as unknown as Response;
    }) as typeof fetch;

    const result = await handleImageGeneration({
      body: { model: "minimax/image-01", prompt: "a red panda in the snow", n: 1 },
      credentials: { apiKey: "test-key" },
      log: null,
    });

    assert.equal(fetchCalled, true, "expected the MiniMax handler to call fetch");
    assert.equal(result.success, true, `expected success, got: ${JSON.stringify(result)}`);
    assert.ok(Array.isArray(result.data?.data) && result.data.data.length === 1);
    assert.equal(result.data.data[0].url, "https://cdn.minimax.io/generated/one.png");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleImageGeneration surfaces MiniMax upstream errors without a network 404", async () => {
  const originalFetch = globalThis.fetch;
  try {
    globalThis.fetch = (async () => {
      return {
        ok: false,
        status: 401,
        text: async () => "login fail: invalid API key",
      } as unknown as Response;
    }) as typeof fetch;

    const result = await handleImageGeneration({
      body: { model: "minimax/image-01", prompt: "a red panda in the snow", n: 1 },
      credentials: { apiKey: "bad-key" },
      log: null,
    });

    assert.equal(result.success, false);
    assert.equal(result.status, 401);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("H3 image generation uses both regional catalogs and preserves partial success", async (t) => {
  const payload = (format: string) => ({
    created: 123,
    data: [
      {
        [format]: format === "url" ? "https://example.com/tree.webp" : "aGVsbG8=",
        size: "2720x1536",
        revised_prompt: "a sunlit tree",
      },
      { error: { code: "1027", message: "image blocked" } },
    ],
    output_format: "webp",
    usage: { generated_images: 1 },
  });
  const stub = t.mock.method(globalThis, "fetch", async (_url, init) =>
    Response.json(payload(JSON.parse(String(init?.body)).response_format))
  );
  for (const [provider, region, model, format] of [
    ["minimax", "io", "MiniMax-H3-Image", "url"],
    ["minimax-cn", "cn", "MiniMax-H3-Image-Highspeed", "b64_json"],
  ]) {
    const models = getImageProvider(provider)?.models.map((entry) => entry.id);
    assert.ok(models?.includes("MiniMax-H3-Image"));
    assert.ok(models.includes("MiniMax-H3-Image-Highspeed"));
    const result = await handleImageGeneration({
      body: {
        model: provider + "/" + model,
        prompt: "a tree",
        n: 2,
        size: "16:9",
        area: "2K",
        output_format: "webp",
        response_format: format,
        output_compression: 75,
        disable_prompt_enhanced: true,
      },
      credentials: { apiKey: "test-key" },
      log: null,
    });
    const [url, init] = stub.mock.calls.at(-1)!.arguments as [string, RequestInit];
    assert.equal(url, `https://api.minimax.${region}/v1/images/generations`);
    assert.equal(new Headers(init.headers).get("authorization"), "Bearer test-key");
    assert.deepEqual(JSON.parse(String(init.body)), {
      model,
      prompt: "a tree",
      n: 2,
      aspect_ratio: "16:9",
      area: "2K",
      response_format: format,
      output_format: "webp",
      output_compression: 75,
      disable_prompt_enhanced: true,
    });
    assert.equal(result.success, true);
    assert.deepEqual(result.data, payload(format));
  }
  assert.equal(stub.mock.callCount(), 2);
});

test("H3 passes pixel dimensions and surfaces a failed image batch", async (t) => {
  const stub = t.mock.method(globalThis, "fetch", async (_url, init) => {
    const body = JSON.parse(init.body);
    assert.equal(body.size, "1024x1024");
    assert.equal(body.aspect_ratio, undefined);
    return Response.json({ data: [{ error: { code: "1027", message: "image blocked" } }] });
  });
  const args = {
    body: { model: "minimax/MiniMax-H3-Image", prompt: "a tree", size: "1024x1024" },
    credentials: { apiKey: "test-key" },
    log: null,
  };
  const result = await handleImageGeneration(args);
  assert.equal(result.success, false);
  assert.equal(result.error, "image blocked");
  const streaming = await handleImageGeneration({ ...args, body: { ...args.body, stream: true } });
  assert.equal(streaming.status, 400);
  assert.equal(stub.mock.callCount(), 1);
});
