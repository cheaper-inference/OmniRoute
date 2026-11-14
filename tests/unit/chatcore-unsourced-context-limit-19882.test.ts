// Regression for #19882: a custom model on the direct single-model path with
// no context metadata resolves only to the generic 128000 catch-all
// (`resolveTokenLimit(provider, model)` -> `{ limit: 128000, specific: false }`).
// That unsourced fallback must not hard-reject large prompts locally before
// reaching the upstream provider, while sourced limits (manual overrides, env
// overrides, cataloged windows, or explicit input caps) keep their guard teeth.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-unsourced-19882-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const contexts = await import("../../src/lib/db/modelContextOverrides.ts");
const { enforceFinalOutputTokenBudget } =
  await import("../../open-sse/handlers/chatCore/finalOutputBudget.ts");
const { handleChatCore } = await import("../../open-sse/handlers/chatCore.ts");
const { resolveTokenLimit } = await import("../../open-sse/services/contextManager.ts");

const CUSTOM_PROVIDER = "bailian-coding-plan-19882";
const CUSTOM_MODEL = "qwen4-max-preview-19882";

const originalFetch = globalThis.fetch;
let fetchCalls: Array<{ url: string; body: Record<string, unknown> | null }> = [];

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

function buildDirectRequest(content: string) {
  return {
    body: {
      model: CUSTOM_MODEL,
      messages: [{ role: "user", content }],
      max_tokens: 16,
      stream: false,
    },
    modelInfo: {
      provider: CUSTOM_PROVIDER,
      model: CUSTOM_MODEL,
      extendedContext: false,
    },
    credentials: {
      apiKey: "sk-test",
      providerSpecificData: { baseUrl: "https://bcp19882.example.test/v1" },
    },
    clientRawRequest: {
      endpoint: "/v1/chat/completions",
      body: {
        model: CUSTOM_MODEL,
        messages: [{ role: "user", content }],
        max_tokens: 16,
        stream: false,
      },
      headers: new Headers({ accept: "application/json" }),
    },
    userAgent: "unit-test",
    isCombo: false,
    comboName: null,
    log: {
      debug() {},
      info() {},
      warn() {},
      error() {},
    },
  };
}

test.before(async () => {
  await resetStorage();
  globalThis.fetch = async (input, init) => {
    const url =
      typeof input === "string" ? input : input instanceof URL ? input.toString() : input.url;
    const rawBody = typeof init?.body === "string" ? init.body : null;
    fetchCalls.push({
      url,
      body: rawBody ? (JSON.parse(rawBody) as Record<string, unknown>) : null,
    });
    return new Response(
      JSON.stringify({
        id: "chatcmpl-19882",
        object: "chat.completion",
        choices: [{ index: 0, message: { role: "assistant", content: "stub ok" } }],
        usage: { prompt_tokens: 150029, completion_tokens: 4, total_tokens: 150033 },
      }),
      {
        status: 200,
        headers: { "content-type": "application/json" },
      }
    );
  };
});

test.after(() => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("#19882: enforceFinalOutputTokenBudget skips the context-window hard reject when contextLimitSpecific is false", () => {
  const unsourcedResult = enforceFinalOutputTokenBudget({
    body: { messages: [{ role: "user", content: "hi" }], max_tokens: 16 },
    finalEstimatedInputTokens: 168_763,
    finalContextLimit: 128_000,
    contextLimitSpecific: false,
    contextWindowChecksDisabled: false,
    modelOutputCap: null,
    effectiveInputCap: null,
    provider: CUSTOM_PROVIDER,
    effectiveModel: CUSTOM_MODEL,
    sourceFormat: "openai",
    targetFormat: "openai",
  });
  assert.equal(unsourcedResult.ok, true);
  if (unsourcedResult.ok) {
    assert.equal(unsourcedResult.body.max_tokens, 16);
  }

  const inputCappedResult = enforceFinalOutputTokenBudget({
    body: { messages: [{ role: "user", content: "hi" }], max_tokens: 16 },
    finalEstimatedInputTokens: 168_763,
    finalContextLimit: 128_000,
    contextLimitSpecific: false,
    contextWindowChecksDisabled: false,
    modelOutputCap: null,
    effectiveInputCap: 100_000,
    provider: CUSTOM_PROVIDER,
    effectiveModel: CUSTOM_MODEL,
    sourceFormat: "openai",
    targetFormat: "openai",
  });
  assert.equal(inputCappedResult.ok, false);
  if (!inputCappedResult.ok) {
    assert.match(inputCappedResult.message, /max input 100000/);
  }
});

test("#19882 A: direct single-model request with unsourced 128000 fallback is not hard-rejected locally", async () => {
  fetchCalls = [];
  contexts.removeModelContextOverride(CUSTOM_PROVIDER, CUSTOM_MODEL);
  assert.deepEqual(resolveTokenLimit(CUSTOM_PROVIDER, CUSTOM_MODEL), {
    limit: 128_000,
    specific: false,
  });

  // 600k chars -> ~150k estimated tokens: above the unsourced 128000 fallback.
  const content = "x".repeat(600_000);
  const result = await handleChatCore(buildDirectRequest(content));
  assert.equal(
    result.success,
    true,
    `direct custom model with specific=false must reach upstream and succeed; got: ${
      result.success
        ? ""
        : ((result as { rawMessage?: string; error: string }).rawMessage ??
          (result as { error: string }).error)
    }`
  );
  assert.equal(fetchCalls.length, 1, "expected request to reach upstream fetch mock");
  assert.match(fetchCalls[0].url, /bcp19882\.example\.test/);
  assert.equal(fetchCalls[0].body?.model, CUSTOM_MODEL);
});

test("#19882 B: direct single-model request with a sourced manual override still enforces the configured limit", async () => {
  fetchCalls = [];
  contexts.setModelContextOverride(CUSTOM_PROVIDER, CUSTOM_MODEL, 100_000, "manual");
  try {
    assert.deepEqual(resolveTokenLimit(CUSTOM_PROVIDER, CUSTOM_MODEL), {
      limit: 100_000,
      specific: true,
    });

    const content = "x".repeat(600_000);
    const result = await handleChatCore(buildDirectRequest(content));
    assert.equal(
      result.success,
      false,
      "expected sourced manual override to reject oversized input"
    );
    assert.equal(fetchCalls.length, 0, "expected local guard to reject before upstream fetch");
    const failure = result as { success: false; error: string; rawMessage?: string };
    const message = failure.rawMessage ?? failure.error;
    assert.match(
      message,
      /(limit|max input) 100000\b/,
      `expected rejection at limit 100000; got: ${message}`
    );
  } finally {
    contexts.removeModelContextOverride(CUSTOM_PROVIDER, CUSTOM_MODEL);
  }
});
