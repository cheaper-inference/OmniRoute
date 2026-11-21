import { test } from "node:test";
import assert from "node:assert/strict";
import { resolveAlternateFormat } from "../../open-sse/config/providers/alternateFormats.ts";
import type { RegistryEntry } from "../../open-sse/config/providers/shared.ts";
import { getTargetFormat } from "../../open-sse/services/provider.ts";
import { DefaultExecutor } from "../../open-sse/executors/default.ts";
import { FORMATS } from "../../open-sse/translator/formats.ts";
import { translateRequest } from "../../open-sse/translator/index.ts";
import { getAlternateFormats } from "../../src/app/(dashboard)/dashboard/providers/[id]/providerPageHelpers.ts";

const ENTRY: RegistryEntry = {
  id: "demo",
  format: "openai",
  executor: "default",
  authType: "apikey",
  authHeader: "bearer",
  baseUrl: "https://example.com/v1",
  models: [],
  alternateFormats: [
    {
      format: "claude",
      baseUrl: "https://example.com/anthropic/v1/messages",
      authHeader: "x-api-key",
      headers: { "Anthropic-Version": "2023-06-01" },
      label: "Anthropic-compatible",
    },
  ],
};

test("returns the alternative when targetFormat of the home connection", () => {
  const alt = resolveAlternateFormat(ENTRY, { targetFormat: "claude" });
  assert.equal(alt?.format, "claude");
  assert.equal(alt?.authHeader, "x-api-key");
});

test("returns null when targetFormat does not match any alternative", () => {
  assert.equal(resolveAlternateFormat(ENTRY, { targetFormat: "gemini" }), null);
});

test("returns null when the connection does not have targetFormat", () => {
  assert.equal(resolveAlternateFormat(ENTRY, {}), null);
  assert.equal(resolveAlternateFormat(ENTRY, null), null);
  assert.equal(resolveAlternateFormat(ENTRY, undefined), null);
});

test("returns null when the entry does not declare alternatives", () => {
  assert.equal(
    resolveAlternateFormat({ ...ENTRY, alternateFormats: undefined }, { targetFormat: "claude" }),
    null
  );
  assert.equal(resolveAlternateFormat(null, { targetFormat: "claude" }), null);
});

test("ignores targetFormat which is not a non-empty string", () => {
  assert.equal(resolveAlternateFormat(ENTRY, { targetFormat: 42 }), null);
  assert.equal(resolveAlternateFormat(ENTRY, { targetFormat: "" }), null);
});

// Task 2: getTargetFormat honors the connection override.
test("getTargetFormat: without connection override uses the registry's default format", () => {
  assert.equal(getTargetFormat("xiaomi-mimo", null), "openai");
});

test("getTargetFormat: connection override changes the format when declared", () => {
  assert.equal(getTargetFormat("xiaomi-mimo", { targetFormat: "claude" }), "claude");
});

test("getTargetFormat: unknown override falls into default format", () => {
  assert.equal(getTargetFormat("xiaomi-mimo", { targetFormat: "gemini" }), "openai");
});

// Task 3: base URL resolution honors the alternative.
//
// Reproduces the precedence implemented in BaseExecutor.resolveBaseUrl. No
// we instantiate the real executor here because getRegistryEntry() le do registry
// estatico de providers (chaveado por provider id) e nenhuma entry real
// still declare alternateFormats (this is Task 5) — there is no way to inject one
// entry fake no registry sem sair do escopo desta task. O contrato de
// precedence (manual > alternative > default) and the same applied in
// production; tests/unit/refactor-resolveBaseUrl.test.ts already covers the path
// real (instantiating BaseExecutor) for cases with no alternative, and
// remains green after changing this task.
function precedence(psd: unknown, entry: unknown, configBaseUrl: string) {
  const psdBaseUrl = (psd as { baseUrl?: unknown } | null)?.baseUrl;
  if (typeof psdBaseUrl === "string" && psdBaseUrl) return psdBaseUrl;
  const alt = resolveAlternateFormat(entry as never, psd);
  if (alt?.baseUrl) return alt.baseUrl;
  return configBaseUrl;
}

const ENTRY_WITH_ALT = {
  alternateFormats: [
    {
      format: "claude",
      baseUrl: "https://alt.example.com/anthropic/v1/messages",
      label: "Anthropic",
    },
  ],
} as never;

test("resolveBaseUrl: manual baseUrl of the connection wins over the alternative", () => {
  const url = precedence(
    { baseUrl: "https://manual.example.com/v1", targetFormat: "claude" },
    ENTRY_WITH_ALT,
    "https://default.example.com/v1"
  );
  assert.equal(url, "https://manual.example.com/v1");
});

test("resolveBaseUrl: alternative beats the default baseUrl", () => {
  const url = precedence(
    { targetFormat: "claude" },
    ENTRY_WITH_ALT,
    "https://default.example.com/v1"
  );
  assert.equal(url, "https://alt.example.com/anthropic/v1/messages");
});

test("resolveBaseUrl: without override uses the default baseUrl", () => {
  const url = precedence({}, ENTRY_WITH_ALT, "https://default.example.com/v1");
  assert.equal(url, "https://default.example.com/v1");
});

// Task 4: auth header and extra headers honor the alternative.
//
// Mesma limitacao da Task 3: nenhuma entry real do registry declara
// alternateFormats still, so we reproduce the choice of authHeader
// implementada em DefaultExecutor.buildHeaders (default.ts) sem instanciar o
// entire executor. The regression test below (via real DefaultExecutor)
// covers the path with no alternative to ensure that the new call to
// resolveAlternateFormat did not change the existing default behavior.
function pickAuthHeader(entry: unknown, psd: unknown) {
  const alt = resolveAlternateFormat(entry as never, psd);
  return alt?.authHeader || (entry as { authHeader?: string } | null)?.authHeader || "bearer";
}

const ENTRY_AUTH = {
  authHeader: "bearer",
  alternateFormats: [
    {
      format: "claude",
      baseUrl: "https://alt.example.com/anthropic/v1/messages",
      authHeader: "x-api-key",
      headers: { "Anthropic-Version": "2023-06-01" },
      label: "Anthropic",
    },
  ],
} as never;

test("authHeader: alternative format replaces bearer with x-api-key", () => {
  assert.equal(pickAuthHeader(ENTRY_AUTH, { targetFormat: "claude" }), "x-api-key");
});

test("authHeader: sem override mantem o header da entry", () => {
  assert.equal(pickAuthHeader(ENTRY_AUTH, {}), "bearer");
});

test("alternative loads extra protocol headers", () => {
  const alt = resolveAlternateFormat(ENTRY_AUTH, { targetFormat: "claude" });
  assert.equal(alt?.headers?.["Anthropic-Version"], "2023-06-01");
});

// Regression via real production: with a targetFormat that DOES NOT match any
// alternative declared, buildHeaders falls into the default authHeader "bearer"
// entry, proving that the new call to resolveAlternateFormat did not regress the
// default path. (Until Task 5, xiaomi-mimo did not declare alternateFormats
// none — now declares the "claude" variant, see
// tests/unit/xiaomi-providers-registry.test.ts para a cobertura end-to-end
// of the alternative COM path, including the "claude" case that this test
// covered before.)
test("DefaultExecutor.buildHeaders: targetFormat that does not match maintains the default authHeader", () => {
  const executor = new DefaultExecutor("xiaomi-mimo");
  const headers = executor.buildHeaders(
    {
      apiKey: "sk-test",
      providerSpecificData: { targetFormat: "gemini" },
    } as never,
    true
  ) as Record<string, string>;
  assert.equal(headers["Authorization"], "Bearer sk-test");
  assert.equal(headers["x-api-key"], undefined);
});

test("getAlternateFormats: provider with alternatives returns the list", () => {
  const list = getAlternateFormats("xiaomi-mimo");
  assert.equal(list.length, 1);
  assert.equal(list[0].format, "claude");
});

test("getAlternateFormats: provider without alternatives returns empty list", () => {
  assert.deepEqual(getAlternateFormats("xai"), []);
  assert.deepEqual(getAlternateFormats(null), []);
  assert.deepEqual(getAlternateFormats(undefined), []);
});

test("DeepSeek defaults to OpenAI Chat Completions and exposes Responses + Anthropic as alternates", () => {
  assert.equal(getTargetFormat("deepseek", null), "openai");
  assert.equal(getTargetFormat("deepseek", { targetFormat: "claude" }), "claude");

  const defaultExecutor = new DefaultExecutor("deepseek");
  assert.equal(
    defaultExecutor.buildUrl("deepseek-v4-pro", true, 0, { apiKey: "sk-test" } as never),
    "https://api.deepseek.com/chat/completions"
  );
  const defaultHeaders = defaultExecutor.buildHeaders({ apiKey: "sk-test" } as never, true);
  assert.equal(defaultHeaders.Authorization, "Bearer sk-test");

  const anthropicCredentials = {
    apiKey: "sk-test",
    providerSpecificData: { targetFormat: "claude" },
  } as never;
  assert.equal(
    defaultExecutor.buildUrl("deepseek-v4-pro", true, 0, anthropicCredentials),
    "https://api.deepseek.com/anthropic/v1/messages"
  );
  const anthropicHeaders = defaultExecutor.buildHeaders(anthropicCredentials, true);
  assert.equal(anthropicHeaders["x-api-key"], "sk-test");
  assert.equal(typeof anthropicHeaders["Anthropic-Version"], "string");

  const alternates = getAlternateFormats("deepseek");
  assert.equal(alternates.length, 2);
  assert.equal(alternates[0].format, "openai-responses");
  assert.equal(alternates[1].format, "claude");
});

test("DeepSeek reuses the generic Chat-to-Responses and Responses-to-Anthropic translators", () => {
  const responsesBody = translateRequest(
    FORMATS.OPENAI,
    FORMATS.OPENAI_RESPONSES,
    "deepseek-v4-pro",
    {
      model: "deepseek-v4-pro",
      messages: [{ role: "user", content: "hello" }],
      max_tokens: 123,
      stream: true,
    },
    true,
    {},
    "deepseek"
  ) as Record<string, unknown>;
  assert.equal(responsesBody.messages, undefined);
  assert.equal(responsesBody.max_output_tokens, 123);
  assert.deepEqual(responsesBody.input, [
    {
      type: "message",
      role: "user",
      content: [{ type: "input_text", text: "hello" }],
      status: "completed",
    },
  ]);

  const anthropicBody = translateRequest(
    FORMATS.OPENAI_RESPONSES,
    FORMATS.CLAUDE,
    "deepseek-v4-pro",
    {
      model: "deepseek-v4-pro",
      input: [{ role: "user", content: [{ type: "input_text", text: "hello" }] }],
      stream: true,
    },
    true,
    {},
    "deepseek"
  ) as Record<string, unknown>;
  assert.equal(anthropicBody.input, undefined);
  assert.deepEqual(anthropicBody.messages, [
    { role: "user", content: [{ type: "text", text: "hello" }] },
  ]);
});
