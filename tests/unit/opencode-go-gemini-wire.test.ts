import { afterEach, beforeEach, describe, it } from "node:test";
import assert from "node:assert/strict";

const { OpencodeExecutor } = await import("../../open-sse/executors/opencode.ts");
const { getModelTargetFormat } = await import("../../open-sse/config/providerModels.ts");

// OpenCode Go serves gemini-4-argon only over the Google Generative AI wire,
// on its own inference host (not the `/zen/go/v1` chat host) and keyed by `x-goog-api-key`.
const GO_GEMINI_BASE = "https://opencode.ai/inference/go/v1";
const ARGON = "gemini-4-argon";

describe("OpenCode Go Gemini wire", () => {
  let originalFetch: typeof globalThis.fetch;
  let originalSynthesize: string | undefined;
  let fetchCalls: Array<{ url: string; headers: Record<string, string> }>;

  beforeEach(() => {
    originalFetch = globalThis.fetch;
    originalSynthesize = process.env.OPENCODE_SYNTHESIZE_CLI_HEADERS;
    process.env.OPENCODE_SYNTHESIZE_CLI_HEADERS = "false";
    fetchCalls = [];
    globalThis.fetch = (async (url: string | URL, options?: RequestInit) => {
      fetchCalls.push({
        url: String(url),
        headers: (options?.headers ?? {}) as Record<string, string>,
      });
      return new Response(JSON.stringify({ candidates: [] }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }) as typeof globalThis.fetch;
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
    if (originalSynthesize === undefined) delete process.env.OPENCODE_SYNTHESIZE_CLI_HEADERS;
    else process.env.OPENCODE_SYNTHESIZE_CLI_HEADERS = originalSynthesize;
  });

  it("declares gemini-4-argon with the gemini target format", () => {
    assert.equal(getModelTargetFormat("opencode-go", ARGON), "gemini");
  });

  it("builds the Go inference URL for streaming and non-streaming gemini requests", () => {
    const go = new OpencodeExecutor("opencode-go");
    go._requestFormat = "gemini";
    assert.equal(
      go.buildUrl(ARGON, true),
      `${GO_GEMINI_BASE}/models/${ARGON}:streamGenerateContent?alt=sse`
    );
    assert.equal(go.buildUrl(ARGON, false), `${GO_GEMINI_BASE}/models/${ARGON}:generateContent`);
  });

  it("authenticates the Go gemini wire with x-goog-api-key, never Bearer", () => {
    const go = new OpencodeExecutor("opencode-go");
    go._requestFormat = "gemini";
    const headers = go.buildHeaders({ apiKey: "k" }, true, {}, ARGON);
    assert.equal(headers["x-goog-api-key"], "k");
    assert.equal(headers["Authorization"], undefined);
    assert.equal(headers["x-api-key"], undefined);
  });

  it("keeps the other Go lanes on the /zen/go/v1 host with Bearer auth", () => {
    const go = new OpencodeExecutor("opencode-go");
    go._requestFormat = "openai";
    assert.equal(go.buildUrl("glm-5.2", true), "https://opencode.ai/zen/go/v1/chat/completions");
    const headers = go.buildHeaders({ apiKey: "k" }, true, {}, "glm-5.2");
    assert.equal(headers["Authorization"], "Bearer k");
    assert.equal(headers["x-goog-api-key"], undefined);
  });

  it("leaves the Zen gemini lane unchanged", () => {
    const zen = new OpencodeExecutor("opencode-zen");
    zen._requestFormat = "gemini";
    assert.equal(
      zen.buildUrl("gemini-2.5-pro", true),
      "https://opencode.ai/zen/v1/models/gemini-2.5-pro:streamGenerateContent?alt=sse"
    );
    const headers = zen.buildHeaders({ apiKey: "k" }, true, {}, "gemini-2.5-pro");
    assert.equal(headers["Authorization"], "Bearer k");
    assert.equal(headers["x-goog-api-key"], undefined);
  });

  it("dispatches an execute() for the argon model to the Go gemini endpoint", async () => {
    const go = new OpencodeExecutor("opencode-go");
    const result = await go.execute({
      model: ARGON,
      stream: true,
      credentials: { apiKey: "go-key" },
      body: { contents: [{ role: "user", parts: [{ text: "hello" }] }] },
    } as never);

    const expectedUrl = `${GO_GEMINI_BASE}/models/${ARGON}:streamGenerateContent?alt=sse`;
    assert.equal((result as { url: string }).url, expectedUrl);
    assert.equal(fetchCalls.length, 1);
    assert.equal(fetchCalls[0].url, expectedUrl);
    assert.equal(fetchCalls[0].headers["x-goog-api-key"], "go-key");
    assert.equal(fetchCalls[0].headers["Authorization"], undefined);
  });
});
