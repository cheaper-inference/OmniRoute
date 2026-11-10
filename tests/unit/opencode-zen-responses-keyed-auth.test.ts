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

function transformThinking(
  provider: string,
  model: string,
  requestFormat: string,
  body: Record<string, unknown>
) {
  const executor = new OpencodeExecutor(provider);
  executor._requestFormat = requestFormat;
  return executor.transformRequest(model, { model, ...body }, false, {
    apiKey: "sk-test",
  }) as Record<string, unknown>;
}

const THINKING = { type: "enabled", budget_tokens: 2048 };

test("Issue #19315: chat-format thinking on opencode-zen folds into reasoning_effort", () => {
  const out = transformThinking("opencode-zen", "qwen3.8-flash", "openai", { thinking: THINKING });

  assert.equal(out.thinking, undefined);
  assert.equal(out.reasoning_effort, "medium");
});

test("Issue #19315: a client reasoning control is not overridden when thinking is dropped", () => {
  const out = transformThinking("opencode-zen", "gpt-5.6-luna", "openai-responses", {
    thinking: THINKING,
    reasoning: { effort: "high" },
  });

  assert.equal(out.thinking, undefined);
  assert.equal((out.reasoning as Record<string, unknown>).effort, "high");
});

test("Issue #19315: the model-suffix effort wins over the thinking fallback", () => {
  const out = transformThinking("opencode-zen", "deepseek-v4-pro-high", "openai", {
    thinking: THINKING,
  });

  assert.equal(out.model, "deepseek-v4-pro");
  assert.equal(out.reasoning_effort, "high");
  assert.equal(out.thinking, undefined);
});

test("Issue #19315: thinking is left alone off the Zen host", () => {
  for (const format of ["openai", "openai-responses"]) {
    const out = transformThinking("opencode-go", "kimi-k3", format, { thinking: THINKING });

    assert.deepEqual(out.thinking, THINKING, `${format} keeps thinking on opencode-go`);
    assert.equal(out.reasoning_effort, undefined);
    assert.equal(out.reasoning, undefined);
  }
});

test("Issue #19315: non-OpenAI lanes on opencode-zen keep their own thinking contract", () => {
  for (const format of ["claude", "gemini"]) {
    const out = transformThinking("opencode-zen", "some-model", format, { thinking: THINKING });

    assert.deepEqual(out.thinking, THINKING, `${format} keeps thinking`);
    assert.equal(out.reasoning_effort, undefined);
  }
});
