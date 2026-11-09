import test from "node:test";
import assert from "node:assert/strict";
import { OpencodeExecutor } from "../../open-sse/executors/opencode.ts";

test("Issue #19315: keyed openai-responses models on opencode-zen send Authorization Bearer", () => {
  const executor = new OpencodeExecutor("opencode-zen");
  executor._requestFormat = "openai-responses";
  const headers = executor.buildHeaders(
    { apiKey: "sk-zen-console-key" },
    true,
    null,
    "gpt-5.6-luna"
  );

  assert.equal(headers["Authorization"], "Bearer sk-zen-console-key");
  assert.equal(headers["x-api-key"], "sk-zen-console-key");
});

test("Issue #19315: gated free-tier responses models on opencode-zen still send x-api-key without Authorization", () => {
  const executor = new OpencodeExecutor("opencode-zen");
  executor._requestFormat = "openai-responses";
  const headers = executor.buildHeaders(
    { apiKey: "sk-zen-console-key" },
    true,
    null,
    "muse-spark-1.2-contributor-free"
  );

  assert.equal(headers["x-api-key"], "public");
  assert.equal(headers["Authorization"], undefined);
});

test("Issue #19315: execute translates adaptive thinking to reasoning for openai-responses format", async () => {
  const executor = new OpencodeExecutor("opencode-zen");
  executor._requestFormat = "openai-responses";

  let capturedBody: Record<string, unknown> | null = null;
  const originalFetch = globalThis.fetch;
  globalThis.fetch = (async (_url: unknown, init?: RequestInit) => {
    capturedBody = JSON.parse(String(init?.body || "{}"));
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }) as typeof fetch;

  try {
    await executor.execute({
      model: "gpt-5.6-luna",
      stream: false,
      credentials: { apiKey: "sk-zen-test" },
      body: {
        model: "gpt-5.6-luna",
        messages: [{ role: "user", content: "hello" }],
        thinking: { type: "enabled", budget_tokens: 2048 },
      },
    });

    assert.ok(capturedBody);
    assert.equal(capturedBody.thinking, undefined, "raw thinking field must be stripped");
    assert.deepEqual(capturedBody.reasoning, { effort: "medium", summary: "auto" });
  } finally {
    globalThis.fetch = originalFetch;
  }
});
