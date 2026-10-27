// #18254 — OpenAI explicit prompt caching (GPT-5.6+) marks the end of each cached prefix
// with `prompt_cache_breakpoint` on a content part. Since the #16384 field
// allowlist, `filterToOpenAIFormat` dropped it on the OpenAI→OpenAI passthrough
// while `prompt_cache_options: { mode: "explicit" }` went through, so the upstream
// received explicit mode with no breakpoints and cached nothing.
import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { translateRequest } from "../../open-sse/translator/index.ts";
import "../../open-sse/translator/bootstrap.ts";
import { filterToOpenAIFormat } from "../../open-sse/translator/helpers/openaiHelper.ts";
import { providerAcceptsPromptCacheBreakpoint } from "../../open-sse/utils/cacheControlPolicy.ts";

const BREAKPOINT = { mode: "explicit", ttl: "12h" };

function buildChatBody() {
  return {
    model: "openai/gpt-6-luna",
    prompt_cache_options: { mode: "explicit" },
    messages: [
      {
        role: "system",
        content: [
          {
            type: "text",
            text: "You are a coding assistant. ".repeat(60),
            prompt_cache_breakpoint: BREAKPOINT,
          },
        ],
      },
      {
        role: "user",
        content: [
          { type: "text", text: "hello", prompt_cache_breakpoint: {}, message_id: "msg_1" },
        ],
      },
    ],
  };
}

function translateFor(provider: string) {
  return translateRequest(
    "openai",
    "openai",
    "openai/gpt-6-luna",
    buildChatBody(),
    false,
    null,
    provider,
    null,
    {}
  ) as {
    messages: Array<{ content: Array<Record<string, unknown>> }>;
    prompt_cache_options?: unknown;
  };
}

describe("OpenAI prompt_cache_breakpoint passthrough", () => {
  test("openai and openrouter keep the breakpoint on content parts", () => {
    for (const provider of ["openai", "openrouter"]) {
      const out = translateFor(provider);
      assert.deepEqual(out.messages[0].content[0].prompt_cache_breakpoint, BREAKPOINT, provider);
      assert.deepEqual(out.messages[1].content[0].prompt_cache_breakpoint, {}, provider);
      assert.deepEqual(out.prompt_cache_options, { mode: "explicit" }, provider);
    }
  });

  test("other fields stay stripped (#16384 contract)", () => {
    const out = translateFor("openai");
    assert.deepEqual(out.messages[1].content[0], {
      type: "text",
      text: "hello",
      prompt_cache_breakpoint: {},
    });
  });

  test("strict OpenAI-compatible providers do not receive the field", () => {
    for (const provider of ["groq", "cerebras", "mistral", "alibaba"]) {
      const out = translateFor(provider);
      assert.equal(
        JSON.stringify(out.messages).includes("prompt_cache_breakpoint"),
        false,
        provider
      );
    }
  });

  test("filterToOpenAIFormat strips the field unless asked to keep it", () => {
    const stripped = filterToOpenAIFormat(buildChatBody());
    assert.equal(JSON.stringify(stripped.messages).includes("prompt_cache_breakpoint"), false);
    const kept = filterToOpenAIFormat(buildChatBody(), { preservePromptCacheBreakpoint: true });
    assert.deepEqual(kept.messages[0].content[0].prompt_cache_breakpoint, BREAKPOINT);
  });

  test("provider predicate is narrow", () => {
    assert.equal(providerAcceptsPromptCacheBreakpoint("openai"), true);
    assert.equal(providerAcceptsPromptCacheBreakpoint("OpenRouter"), true);
    assert.equal(providerAcceptsPromptCacheBreakpoint("azure"), false);
    assert.equal(providerAcceptsPromptCacheBreakpoint("groq"), false);
    assert.equal(providerAcceptsPromptCacheBreakpoint(null), false);
  });
});
