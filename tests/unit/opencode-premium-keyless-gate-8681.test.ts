import { after, before, describe, it } from "node:test";
import assert from "node:assert/strict";

const { OpencodeExecutor } = await import("../../open-sse/executors/opencode.ts");
const { _setOpencodeFreeModelsForTests } =
  await import("../../open-sse/executors/opencodeFreeTierContract.ts");

/**
 * The free set is now derived from the synced catalog (available ∩ models.dev cost 0 ∧
 * not deprecated), which a unit test has no DB to populate. Pin it through the seam the
 * way discovery would: these are the ids the live `/zen/v1/models` catalog serves free.
 */
const FREE_MODELS = [
  "big-pickle",
  "deepseek-v4-flash-free",
  "mimo-v2.5-free",
  "nemotron-3-ultra-free",
  "north-mini-code-free",
  "hy3-free",
] as const;

function createInput(model, stream = true, credentials = null) {
  return {
    model,
    stream,
    credentials,
    body: {
      model,
      stream,
      messages: [{ role: "user", content: "hello" }],
    },
  };
}

function createMockResponse() {
  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

describe("OpencodeExecutor — premium model keyless gate (#8681)", () => {
  let originalFetch: typeof globalThis.fetch;

  before(() => {
    originalFetch = globalThis.fetch;
    globalThis.fetch = (async (_url: string, _options?: RequestInit) => {
      return createMockResponse();
    }) as typeof globalThis.fetch;
  });

  after(() => {
    globalThis.fetch = originalFetch;
  });

  describe("isPremiumModel", () => {
    before(() => _setOpencodeFreeModelsForTests(FREE_MODELS));
    after(() => _setOpencodeFreeModelsForTests(null));

    it("returns false for the ids the synced catalog serves free on opencode-zen", () => {
      assert.equal(OpencodeExecutor.isPremiumModel("big-pickle", "opencode-zen"), false);
      assert.equal(
        OpencodeExecutor.isPremiumModel("deepseek-v4-flash-free", "opencode-zen"),
        false
      );
      assert.equal(OpencodeExecutor.isPremiumModel("mimo-v2.5-free", "opencode-zen"), false);
    });

    it("returns false for free models regardless of the -free suffix", () => {
      // `big-pickle` is free without a suffix; the classification comes from the catalog,
      // not the model name.
      assert.equal(OpencodeExecutor.isPremiumModel("big-pickle", "opencode-zen"), false);
      assert.equal(OpencodeExecutor.isPremiumModel("nemotron-3-ultra-free", "opencode-zen"), false);
      assert.equal(OpencodeExecutor.isPremiumModel("north-mini-code-free", "opencode-zen"), false);
      assert.equal(OpencodeExecutor.isPremiumModel("hy3-free", "opencode-zen"), false);
    });

    it("treats an unlisted free-suffixed model as premium when the catalog omits it", () => {
      // No suffix rule anymore: a `-free` id absent from the synced catalog is premium
      // (the upstream delisted it — the failure the old static table caused).
      assert.equal(
        OpencodeExecutor.isPremiumModel("some-delisted-model-free", "opencode-zen"),
        true
      );
    });

    it("returns true for premium models on opencode-zen", () => {
      assert.equal(OpencodeExecutor.isPremiumModel("gpt-5", "opencode-zen"), true);
      assert.equal(OpencodeExecutor.isPremiumModel("gpt-5-nano", "opencode-zen"), true);
      assert.equal(OpencodeExecutor.isPremiumModel("claude-sonnet-4-5", "opencode-zen"), true);
      assert.equal(OpencodeExecutor.isPremiumModel("gemini-3-flash", "opencode-zen"), true);
      assert.equal(OpencodeExecutor.isPremiumModel("kimi-k2.6", "opencode-zen"), true);
      assert.equal(OpencodeExecutor.isPremiumModel("glm-5", "opencode-zen"), true);
    });

    it("returns true for ALL models on opencode-go (no free tier)", () => {
      assert.equal(OpencodeExecutor.isPremiumModel("deepseek-v4-pro", "opencode-go"), true);
      assert.equal(OpencodeExecutor.isPremiumModel("kimi-k2.7-code", "opencode-go"), true);
      assert.equal(OpencodeExecutor.isPremiumModel("glm-5.2", "opencode-go"), true);
      assert.equal(OpencodeExecutor.isPremiumModel("deepseek-v4-flash-free", "opencode-go"), true);
      assert.equal(OpencodeExecutor.isPremiumModel("big-pickle", "opencode-go"), true);
      assert.equal(OpencodeExecutor.isPremiumModel("mimo-v2.5-free", "opencode-go"), true);
    });

    it("returns false for free models on the opencode (noauth) provider", () => {
      assert.equal(OpencodeExecutor.isPremiumModel("deepseek-v4-flash-free", "opencode"), false);
      assert.equal(OpencodeExecutor.isPremiumModel("big-pickle", "opencode"), false);
      assert.equal(OpencodeExecutor.isPremiumModel("hy3-free", "opencode"), false);
    });

    it("returns true for premium models on the opencode (noauth) provider", () => {
      assert.equal(OpencodeExecutor.isPremiumModel("gpt-5", "opencode"), true);
      assert.equal(OpencodeExecutor.isPremiumModel("claude-sonnet-4-5", "opencode"), true);
    });

    it("returns true for unknown models on any opencode provider", () => {
      assert.equal(OpencodeExecutor.isPremiumModel("unknown-random-model", "opencode-zen"), true);
    });
  });

  describe("execute with keyless credentials", () => {
    const zenExecutor = new OpencodeExecutor("opencode-zen");

    before(() => _setOpencodeFreeModelsForTests(FREE_MODELS));
    after(() => _setOpencodeFreeModelsForTests(null));

    it("returns 402 for premium model gpt-5 with keyless credentials", async () => {
      const result = await zenExecutor.execute(createInput("gpt-5", true, null));
      const response = result instanceof Response ? result : result.response;
      const body = (await response.json()) as { error: { message: string } };
      assert.equal(response.status, 402);
      assert.ok(
        body.error.message.includes("API key"),
        `Expected message to mention "API key" — got: ${body.error.message}`
      );
      assert.ok(
        !body.error.message.includes("Missing API key"),
        "Should NOT be the raw upstream 'Missing API key' message"
      );
    });

    it("returns 402 for premium model claude-sonnet-4-5 with keyless credentials", async () => {
      const result = await zenExecutor.execute(createInput("claude-sonnet-4-5", true, null));
      const response = result instanceof Response ? result : result.response;
      assert.equal(response.status, 402);
    });

    it("allows free model deepseek-v4-flash-free with keyless credentials", async () => {
      // Should reach the upstream fetch (mock returns 200)
      const result = await zenExecutor.execute(createInput("deepseek-v4-flash-free", true, null));
      const response = result instanceof Response ? result : result.response;
      // Should NOT be 402 (the premium gate); should reach the mock fetch
      assert.notEqual(response.status, 402);
    });

    it("allows free model big-pickle with keyless credentials", async () => {
      const result = await zenExecutor.execute(createInput("big-pickle", true, null));
      const response = result instanceof Response ? result : result.response;
      assert.notEqual(response.status, 402);
    });
  });

  describe("execute with valid key credentials", () => {
    const zenExecutor = new OpencodeExecutor("opencode-zen");

    it("allows premium model gpt-5 with a valid API key", async () => {
      // Should reach the upstream fetch (mock returns 200)
      const result = await zenExecutor.execute(createInput("gpt-5", true, { apiKey: "valid-key" }));
      const response = result instanceof Response ? result : result.response;
      assert.notEqual(response.status, 402);
    });

    it("allows premium model claude-sonnet-4-5 with a valid API key", async () => {
      const result = await zenExecutor.execute(
        createInput("claude-sonnet-4-5", true, { apiKey: "valid-key" })
      );
      const response = result instanceof Response ? result : result.response;
      assert.notEqual(response.status, 402);
    });
  });

  describe("execute with keyless credentials on opencode-go", () => {
    const goExecutor = new OpencodeExecutor("opencode-go");

    it("returns 402 for ANY model with keyless credentials (opencode-go has no free tier)", async () => {
      const result = await goExecutor.execute(createInput("deepseek-v4-pro", true, null));
      const response = result instanceof Response ? result : result.response;
      assert.equal(response.status, 402);
    });
  });

  describe("execute with valid key on opencode-go", () => {
    const goExecutor = new OpencodeExecutor("opencode-go");

    it("allows deepseek-v4-pro with a valid API key", async () => {
      const result = await goExecutor.execute(
        createInput("deepseek-v4-pro", true, { apiKey: "valid-key" })
      );
      const response = result instanceof Response ? result : result.response;
      assert.notEqual(response.status, 402);
    });
  });
});
