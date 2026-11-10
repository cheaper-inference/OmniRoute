// OpenRouter documents Anthropic-style `cache_control` breakpoints on content parts and
// tools of its OpenAI-style chat endpoint (4 explicit breakpoints at most). OpenRouter
// was in neither CACHING_PROVIDERS nor OPENAI_FORMAT_CACHE_CONTROL_PROVIDERS, so every
// Claude Code request to an anthropic/* model through OpenRouter lost all its
// breakpoints: no cache writes, full input price on every turn.
//
// The gate is per model family: only OpenRouter models under the `anthropic/` prefix keep
// their markers. Every other OpenRouter family (openai/, google/, qwen/, ...) stays stripped
// (#16384: strict upstreams reject unknown part fields).
import test, { describe } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-or-anthropic-cache-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { translateRequest } = await import("../../open-sse/translator/index.ts");
await import("../../open-sse/translator/bootstrap.ts");
const {
  providerSupportsCaching,
  providerUsesAutomaticPrefixCaching,
  providerHonorsOpenAIFormatCacheControl,
  shouldPreserveCacheControl,
} = await import("../../open-sse/utils/cacheControlPolicy.ts");
const { detectCachingContext, getCacheAwareStrategy } =
  await import("../../open-sse/services/compression/cachingAware.ts");
const { resolveCacheAwareConfig } =
  await import("../../open-sse/services/compression/strategySelector.ts");
const { prepareUpstreamBody } = await import("../../open-sse/handlers/chatCore/upstreamBody.ts");
const { handleChatCore, clearUpstreamProxyConfigCache } =
  await import("../../open-sse/handlers/chatCore.ts");
const { clearCache } = await import("../../src/lib/semanticCache.ts");
const { clearIdempotency } = await import("../../src/lib/idempotencyLayer.ts");
const { clearInflight } = await import("../../open-sse/services/requestDedup.ts");
const { resetAll: resetAccountSemaphores } =
  await import("../../open-sse/services/accountSemaphore.ts");
const { resetPayloadRulesConfigForTests } = await import("../../open-sse/services/payloadRules.ts");
const { waitForCallLogSaves } = await import("../../src/lib/usage/callLogs.ts");

const originalFetch = globalThis.fetch;

const ANTHROPIC_MODEL = "anthropic/claude-sonnet-4-6";
const OTHER_FAMILIES = [
  "openai/gpt-4o",
  "google/gemini-2.5-pro",
  "qwen/qwen3-coder",
  "deepseek/deepseek-v4-pro",
];
const CLAUDE_CODE_UA = "claude-cli/2.1.137 (external, sdk-cli)";
const EPHEMERAL = { type: "ephemeral" };

test.after(() => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

/** A Claude Code shaped request: marked system block, marked tool, marked message blocks. */
function claudeBody() {
  return {
    model: "client-model",
    max_tokens: 64,
    system: [
      { type: "text", text: "billing line" },
      { type: "text", text: "You are a coding assistant. ", cache_control: EPHEMERAL },
    ],
    tools: [
      { name: "Read", description: "read", input_schema: { type: "object", properties: {} } },
      {
        name: "Bash",
        description: "bash",
        input_schema: { type: "object", properties: {} },
        cache_control: EPHEMERAL,
      },
    ],
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: "first", cache_control: EPHEMERAL },
          { type: "text", text: "context" },
        ],
      },
      { role: "assistant", content: [{ type: "text", text: "ok" }] },
      // The last user turn of a Claude Code session is a single marked text block.
      {
        role: "user",
        content: [{ type: "text", text: "next", cache_control: { type: "ephemeral", ttl: "1h" } }],
      },
    ],
  };
}

type OpenAIOut = {
  messages: Array<{ role: string; content: unknown }>;
  tools?: Array<Record<string, unknown>>;
};

function translate(model: string, provider: string, preserve = true) {
  return translateRequest("claude", "openai", model, claudeBody(), false, null, provider, null, {
    preserveCacheControl: preserve,
  }) as OpenAIOut;
}

function countCacheControl(node: unknown): number {
  return (JSON.stringify(node).match(/"cache_control"/g) ?? []).length;
}

describe("policy: the gate is the anthropic/ prefix on openrouter, nothing else", () => {
  test("providerHonorsOpenAIFormatCacheControl: openrouter + anthropic/* only", () => {
    assert.equal(providerHonorsOpenAIFormatCacheControl("openrouter", null, ANTHROPIC_MODEL), true);
    assert.equal(
      providerHonorsOpenAIFormatCacheControl("OpenRouter", null, "Anthropic/Claude-Opus-5"),
      true
    );
    for (const model of OTHER_FAMILIES) {
      assert.equal(providerHonorsOpenAIFormatCacheControl("openrouter", null, model), false, model);
    }
    assert.equal(providerHonorsOpenAIFormatCacheControl("openrouter", null, undefined), false);
    assert.equal(providerHonorsOpenAIFormatCacheControl("openrouter"), false);
    // The prefix means something only on openrouter.
    assert.equal(providerHonorsOpenAIFormatCacheControl("openai", null, ANTHROPIC_MODEL), false);
    assert.equal(providerHonorsOpenAIFormatCacheControl("groq", null, ANTHROPIC_MODEL), false);
  });

  test("providerSupportsCaching: openrouter + anthropic/* only", () => {
    assert.equal(providerSupportsCaching("openrouter", "openai", null, ANTHROPIC_MODEL), true);
    for (const model of OTHER_FAMILIES) {
      assert.equal(providerSupportsCaching("openrouter", "openai", null, model), false, model);
    }
    assert.equal(providerSupportsCaching("openrouter", "openai"), false);
    assert.equal(providerSupportsCaching("groq", "openai", null, ANTHROPIC_MODEL), false);
  });

  test("the per-connection override still wins over the model gate", () => {
    assert.equal(
      providerHonorsOpenAIFormatCacheControl(
        "openrouter",
        { cacheControlPassthrough: "strip" },
        ANTHROPIC_MODEL
      ),
      false
    );
    assert.equal(
      providerSupportsCaching(
        "openrouter",
        "openai",
        { supportsPromptCaching: false },
        ANTHROPIC_MODEL
      ),
      false
    );
    assert.equal(
      providerHonorsOpenAIFormatCacheControl(
        "openrouter",
        { cacheControlPassthrough: "openai-format" },
        "openai/gpt-4o"
      ),
      true,
      "the existing opt-in for any OpenRouter model keeps working"
    );
  });

  test("shouldPreserveCacheControl: Claude Code + openrouter keeps markers for anthropic/* only", () => {
    const decide = (targetModel: string, alwaysPreserveClientCache?: "never" | "auto") =>
      shouldPreserveCacheControl({
        userAgent: CLAUDE_CODE_UA,
        isCombo: false,
        targetProvider: "openrouter",
        targetFormat: "openai",
        targetModel,
        settings: alwaysPreserveClientCache ? { alwaysPreserveClientCache } : undefined,
      });
    assert.equal(decide(ANTHROPIC_MODEL), true);
    assert.equal(decide(ANTHROPIC_MODEL, "never"), false, "the operator setting still wins");
    for (const model of OTHER_FAMILIES) assert.equal(decide(model), false, model);
  });
});

describe("translation: markers survive for openrouter + anthropic/*, and only there", () => {
  test("system block, message blocks and tools keep cache_control", () => {
    const out = translate(ANTHROPIC_MODEL, "openrouter");

    const system = out.messages.find((m) => m.role === "system");
    const systemBlocks = system?.content as Array<Record<string, unknown>>;
    assert.ok(Array.isArray(systemBlocks), "system keeps the block array");
    assert.deepEqual(systemBlocks[1].cache_control, EPHEMERAL);
    assert.equal(systemBlocks[0].cache_control, undefined, "unmarked block stays unmarked");

    const users = out.messages.filter((m) => m.role === "user");
    const firstUser = users[0].content as Array<Record<string, unknown>>;
    assert.deepEqual(firstUser[0].cache_control, EPHEMERAL);
    assert.equal(firstUser[1].cache_control, undefined);

    // A single marked text block must not collapse to a plain string: that drops the marker.
    const lastUser = users[1].content as Array<Record<string, unknown>>;
    assert.ok(Array.isArray(lastUser), "single marked block stays an array");
    assert.deepEqual(lastUser[0].cache_control, { type: "ephemeral", ttl: "1h" });

    assert.equal(out.tools?.[0].cache_control, undefined);
    assert.deepEqual(out.tools?.[1].cache_control, EPHEMERAL);
  });

  test("a single unmarked text block still collapses to a string (no change for plain turns)", () => {
    const body = claudeBody();
    body.messages[2] = { role: "user", content: [{ type: "text", text: "plain" }] } as never;
    const out = translateRequest(
      "claude",
      "openai",
      ANTHROPIC_MODEL,
      body,
      false,
      null,
      "openrouter",
      null,
      { preserveCacheControl: true }
    ) as OpenAIOut;
    assert.equal(out.messages.filter((m) => m.role === "user")[1].content, "plain");
  });

  test("openai/*, google/*, qwen/* and deepseek/* on openrouter are still stripped", () => {
    for (const model of OTHER_FAMILIES) {
      const out = translate(model, "openrouter");
      assert.equal(countCacheControl(out), 0, `${model} must not receive cache_control`);
    }
  });

  test("DashScope and Xiaomi keep their shape: no tool marker, no change to a lone marked block", () => {
    for (const [provider, model] of [
      ["alibaba", "alibaba/qwen3-coder-plus"],
      ["xiaomi-mimo", "xiaomi-mimo/mimo-v2"],
    ]) {
      const out = translate(model, provider);
      assert.equal(out.tools?.[1].cache_control, undefined, `${provider} tools stay clean`);
      const lastUser = out.messages.filter((m) => m.role === "user")[1];
      assert.equal(lastUser.content, "next", `${provider} lone marked block still collapses`);
    }
  });

  test("anthropic/* is stripped when preservation is off, and on any other provider", () => {
    assert.equal(countCacheControl(translate(ANTHROPIC_MODEL, "openrouter", false)), 0);
    assert.equal(countCacheControl(translate(ANTHROPIC_MODEL, "groq")), 0);
    assert.equal(countCacheControl(translate(ANTHROPIC_MODEL, "openai")), 0);
  });

  test("the 4-breakpoint cap holds after translation: the last four markers stay", () => {
    const body = claudeBody();
    body.system = [
      { type: "text", text: "s1", cache_control: EPHEMERAL },
      { type: "text", text: "s2", cache_control: EPHEMERAL },
    ];
    body.messages[1] = {
      role: "assistant",
      content: [{ type: "text", text: "ok", cache_control: EPHEMERAL }],
    } as never;
    // marked: tool Bash, s1, s2, user "first", assistant "ok", user "next" = 6
    const out = translateRequest(
      "claude",
      "openai",
      ANTHROPIC_MODEL,
      body,
      false,
      null,
      "openrouter",
      null,
      { preserveCacheControl: true }
    ) as OpenAIOut;

    assert.equal(countCacheControl(out), 4, "OpenRouter allows 4 explicit breakpoints");
    assert.equal(out.tools?.[1].cache_control, undefined, "the earliest marker is culled");
    const system = out.messages.find((m) => m.role === "system");
    const systemBlocks = system?.content as Array<Record<string, unknown>>;
    assert.equal(systemBlocks[0].cache_control, undefined, "the next earliest marker is culled");
    assert.deepEqual(systemBlocks[1].cache_control, EPHEMERAL);
  });
});

describe("what turning caching on changes for openrouter + anthropic/* (pinned)", () => {
  const body = (model: string) => ({
    model,
    messages: [
      { role: "system", content: "You are a meticulous coding assistant. ".repeat(80) },
      { role: "user", content: "Refactor this function." },
    ],
  });
  const ctxFor = (model: string) => ({ provider: "openrouter", targetFormat: "openai", model });
  const cfg = (preserveSystemPrompt: boolean) =>
    ({
      enabled: true,
      defaultMode: "aggressive",
      autoTriggerTokens: 0,
      cacheMinutes: 5,
      preserveSystemPrompt,
      comboOverrides: {},
    }) as never;

  test("the cache-aware compression guard protects the prefix of anthropic/* requests", () => {
    const ctx = detectCachingContext(body(ANTHROPIC_MODEL), ctxFor(ANTHROPIC_MODEL));
    assert.equal(ctx.isCachingProvider, true);
    assert.equal(
      ctx.usesAutomaticPrefixCaching,
      false,
      "explicit-breakpoint caching, not an automatic-prefix provider"
    );
    assert.deepEqual(getCacheAwareStrategy("aggressive", ctx), {
      strategy: "standard",
      skipSystemPrompt: true,
      deterministicOnly: true,
    });
    const resolved = resolveCacheAwareConfig(
      cfg(false),
      body(ANTHROPIC_MODEL),
      ctxFor(ANTHROPIC_MODEL)
    );
    assert.equal(resolved.preserveSystemPrompt, true, "the cacheable system prefix stays whole");
  });

  test("the guard does not engage for the other OpenRouter families", () => {
    for (const model of OTHER_FAMILIES) {
      const ctx = detectCachingContext(body(model), ctxFor(model));
      assert.equal(ctx.isCachingProvider, false, model);
      assert.deepEqual(getCacheAwareStrategy("aggressive", ctx), {
        strategy: "aggressive",
        skipSystemPrompt: false,
        deterministicOnly: false,
      });
      assert.equal(
        resolveCacheAwareConfig(cfg(false), body(model), ctxFor(model)).preserveSystemPrompt,
        false,
        model
      );
    }
    assert.equal(providerUsesAutomaticPrefixCaching("openrouter", null, ANTHROPIC_MODEL), false);
  });

  test("prompt_cache_key (OpenRouter's sticky-routing fallback) is added for anthropic/* only", async () => {
    const prepare = (model: string) =>
      prepareUpstreamBody({
        translatedBody: {
          model,
          messages: [
            { role: "system", content: "stable instructions" },
            { role: "user", content: "hello" },
          ],
        },
        modelToCall: model,
        provider: "openrouter",
        targetFormat: "openai",
        credentials: null,
      });
    const withKey = await prepare(ANTHROPIC_MODEL);
    assert.match(String(withKey.prompt_cache_key), /^omni-[0-9a-f]{32}$/);
    for (const model of OTHER_FAMILIES) {
      assert.equal((await prepare(model)).prompt_cache_key, undefined, model);
    }
  });
});

describe("end to end: handleChatCore sends the markers OpenRouter documents", () => {
  async function resetStorage() {
    await waitForCallLogSaves(10_000);
    clearUpstreamProxyConfigCache();
    resetPayloadRulesConfigForTests();
    clearCache();
    clearIdempotency();
    clearInflight();
    core.resetDbInstance();
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
    fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  }
  test.afterEach(async () => {
    globalThis.fetch = originalFetch;
    resetAccountSemaphores();
    await resetStorage();
  });

  async function send(model: string) {
    let captured: { url: string; body: Record<string, unknown> } | null = null;
    globalThis.fetch = (async (url: unknown, init: { body?: unknown } = {}) => {
      captured = { url: String(url), body: JSON.parse(String(init.body)) };
      return new Response(
        JSON.stringify({
          id: "chatcmpl-e2e",
          object: "chat.completion",
          model,
          choices: [
            { index: 0, message: { role: "assistant", content: "ok" }, finish_reason: "stop" },
          ],
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }) as typeof fetch;
    const requestBody = { ...claudeBody(), model, stream: false };
    const result = await handleChatCore({
      body: structuredClone(requestBody),
      modelInfo: { provider: "openrouter", model, extendedContext: false },
      credentials: { ["api" + "Key"]: "test-key", providerSpecificData: {} },
      log: { debug() {}, info() {}, warn() {}, error() {} },
      clientRawRequest: {
        endpoint: "/v1/messages",
        body: structuredClone(requestBody),
        headers: new Headers({ accept: "application/json" }),
      },
      connectionId: null,
      apiKeyInfo: null,
      userAgent: CLAUDE_CODE_UA,
      isCombo: false,
      comboStrategy: null,
      onCredentialsRefreshed: null,
      onRequestSuccess: null,
    } as never);
    assert.equal((result as { success?: boolean }).success, true);
    assert.ok(captured, "an upstream request was sent");
    return captured as { url: string; body: Record<string, unknown> };
  }

  test("Claude Code -> openrouter anthropic/claude-* keeps cache_control, within 4 breakpoints", async () => {
    const { url, body } = await send(ANTHROPIC_MODEL);
    assert.match(url, /openrouter\.ai/);
    assert.equal(body.model, ANTHROPIC_MODEL);
    const messages = body.messages as Array<{ role: string; content: unknown }>;
    const systemBlocks = messages.find((m) => m.role === "system")?.content as Array<
      Record<string, unknown>
    >;
    assert.deepEqual(systemBlocks[1].cache_control, EPHEMERAL);
    const lastUser = messages.filter((m) => m.role === "user").at(-1)?.content as Array<
      Record<string, unknown>
    >;
    assert.deepEqual(lastUser[0].cache_control, { type: "ephemeral", ttl: "1h" });
    assert.ok(countCacheControl(body) >= 3 && countCacheControl(body) <= 4);
    assert.match(String(body.prompt_cache_key), /^omni-[0-9a-f]{32}$/);
  });

  test("Claude Code -> openrouter openai/gpt-4o and google/* arrive without cache_control", async () => {
    for (const model of ["openai/gpt-4o", "google/gemini-2.5-pro"]) {
      const { body } = await send(model);
      assert.equal(countCacheControl(body), 0, model);
      assert.equal(body.prompt_cache_key, undefined, model);
    }
  });
});
