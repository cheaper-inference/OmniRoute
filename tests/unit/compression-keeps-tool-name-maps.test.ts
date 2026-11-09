// The translators attach response-side tool-name ledgers (`_namespaceToolIdentityMap`,
// `_toolNameMap`) as NON-enumerable properties (translator/index.ts #9780, executors/base.ts).
// The post-translation compression stage rebuilds the body with a spread, which only
// copies enumerable keys, and its `_`-key restore loop iterates Object.entries — so a
// successful compression silently dropped both maps. Namespaced tool calls then came
// back flattened (`mcp__srv__tool`) and sanitized tool names were never restored.
import { test } from "node:test";
import assert from "node:assert/strict";

const { applyPostTranslationCompression } =
  await import("../../open-sse/handlers/chatCore/postTranslationCompression.ts");

const identity = () => new Map([["mcp__srv__run", { namespace: "mcp__srv", name: "run" }]]);

function bodyWithSideChannels() {
  const body: Record<string, unknown> = {
    model: "m",
    messages: [{ role: "user", content: "hi" }],
  };
  // Exactly how openai-responses.ts and translator/index.ts attach them.
  for (const key of ["_namespaceToolIdentityMap", "_toolNameMap"]) {
    Object.defineProperty(body, key, {
      value: identity(),
      enumerable: false,
      configurable: true,
      writable: true,
    });
  }
  return body;
}

function options(override: Partial<Parameters<typeof applyPostTranslationCompression>[1]> = {}) {
  return {
    runPostTranslationCompression: async (input: Record<string, unknown>) =>
      ({
        compressed: true,
        body: { ...input, messages: [{ role: "user", content: "h" }] },
        stats: null,
      }) as never,
    provider: "openai-compatible-x",
    effectiveModel: "m",
    effectiveServiceTier: undefined,
    comboName: null,
    skillRequestId: "r",
    sourceFormat: "openai-responses",
    targetFormat: "openai",
    log: null,
    ...override,
  } as Parameters<typeof applyPostTranslationCompression>[1];
}

test("a successful compression keeps the non-enumerable tool-name side channels", async () => {
  const state = {
    translatedBody: bodyWithSideChannels(),
    tokensCompressed: 0,
    compressionResponseMeta: null,
    compressionAnalyticsWritePromise: null,
  };
  await applyPostTranslationCompression(state, options());
  const out = state.translatedBody as Record<string, unknown>;
  assert.ok(out._namespaceToolIdentityMap instanceof Map, "namespace identity map lost");
  assert.ok(out._toolNameMap instanceof Map, "tool name map lost");
  // Non-enumerable on the way in, non-enumerable on the way out: they must never
  // reach the JSON wire body (the OmniGlyph wrapper would stringify them to {}).
  for (const key of ["_namespaceToolIdentityMap", "_toolNameMap"]) {
    assert.equal(
      Object.getOwnPropertyDescriptor(out, key)?.enumerable,
      false,
      `${key} restored as enumerable`
    );
    assert.equal(JSON.stringify(out).includes(key), false, `${key} leaked into JSON body`);
  }
});

test("the compressor never receives the side channels", async () => {
  const seen: string[] = [];
  const state = {
    translatedBody: bodyWithSideChannels(),
    tokensCompressed: 0,
    compressionResponseMeta: null,
    compressionAnalyticsWritePromise: null,
  };
  await applyPostTranslationCompression(
    state,
    options({
      runPostTranslationCompression: async (input: Record<string, unknown>) => {
        seen.push(...Object.keys(input));
        seen.push(...Object.getOwnPropertyNames(input));
        return { compressed: false } as never;
      },
    })
  );
  assert.equal(seen.includes("_namespaceToolIdentityMap"), false);
  assert.equal(seen.includes("_toolNameMap"), false);
});

test("an uncompressed result leaves the body object untouched", async () => {
  const body = bodyWithSideChannels();
  const state = {
    translatedBody: body,
    tokensCompressed: 0,
    compressionResponseMeta: null,
    compressionAnalyticsWritePromise: null,
  };
  await applyPostTranslationCompression(
    state,
    options({ runPostTranslationCompression: async () => ({ compressed: false }) as never })
  );
  assert.equal(state.translatedBody, body);
  assert.ok((body as Record<string, unknown>)._toolNameMap instanceof Map);
});
