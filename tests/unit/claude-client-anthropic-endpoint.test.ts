// Opt-in CLAUDE_CLIENT_ANTHROPIC_ENDPOINT: a Claude-format client reaches a provider through the
// provider's declared Anthropic endpoint (its "claude" alternate format), so fields the OpenAI
// hub would drop survive. The URL, auth header and body format must switch together. Default off.
import test from "node:test";
import assert from "node:assert/strict";

import {
  applyClientProtocolAlternate,
  resolveChatCoreTargetFormat,
} from "../../open-sse/handlers/chatCore/targetFormat.ts";
import { DefaultExecutor } from "../../open-sse/executors/default.ts";
import { FORMATS } from "../../open-sse/translator/formats.ts";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omni-claude-client-endpoint-"));
process.env.DATA_DIR = dataDir;
const core = await import("../../src/lib/db/core.ts");
const { handleChatCore } = await import("../../open-sse/handlers/chatCore.ts");
const originalFetch = globalThis.fetch;
const quietLog = { debug() {}, info() {}, warn() {}, error() {} };

const FLAG = "CLAUDE_CLIENT_ANTHROPIC_ENDPOINT";
// DeepSeek declares an Anthropic-compatible alternate in its registry entry.
const PROVIDER = "deepseek";
const MODEL = "deepseek-v4-flash";

test.afterEach(() => {
  delete process.env[FLAG];
  globalThis.fetch = originalFetch;
});
test.after(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

/** One Claude-format request through the real chat handler; returns what went on the wire. */
async function claudeRequestThroughChatCore(credentials: Record<string, unknown>) {
  let wire: { url: string; headers: Headers; body: Record<string, unknown> } | null = null;
  globalThis.fetch = (async (url: string, init: RequestInit = {}) => {
    wire = {
      url: String(url),
      headers: new Headers(init.headers),
      body: JSON.parse(String(init.body || "{}")),
    };
    return new Response(
      JSON.stringify({
        id: "msg_1",
        type: "message",
        role: "assistant",
        model: MODEL,
        content: [{ type: "text", text: "OK" }],
        stop_reason: "end_turn",
        usage: { input_tokens: 3, output_tokens: 1 },
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  }) as typeof fetch;
  const body = {
    model: `${PROVIDER}/${MODEL}`,
    system: "Be brief.",
    messages: [{ role: "user", content: [{ type: "text", text: "Reply OK" }] }],
    max_tokens: 16,
    stream: false,
  };
  const result = await handleChatCore({
    body: structuredClone(body),
    modelInfo: { provider: PROVIDER, model: MODEL, extendedContext: false },
    credentials,
    log: quietLog,
    clientRawRequest: {
      endpoint: "/v1/messages",
      body: structuredClone(body),
      headers: new Headers({ accept: "application/json" }),
    },
    userAgent: "claude-cli/2.1.19",
  });
  return { result, wire: wire as typeof wire };
}

function pick(over: Record<string, unknown> = {}) {
  const input = {
    provider: PROVIDER,
    resolvedModel: MODEL,
    sourceFormat: FORMATS.CLAUDE,
    customModelTargetFormat: undefined,
    providerSpecificData: undefined as unknown,
    ...over,
  };
  const providerSpecificData = applyClientProtocolAlternate(input);
  const { targetFormat } = resolveChatCoreTargetFormat({
    ...input,
    apiFormat: undefined,
    providerSpecificData,
  });
  return { providerSpecificData, targetFormat };
}

test("a Claude client gets the Anthropic alternate: body format and URL switch together", () => {
  process.env[FLAG] = "1";
  const { providerSpecificData, targetFormat } = pick();
  assert.equal(targetFormat, FORMATS.CLAUDE);
  const url = new DefaultExecutor(PROVIDER).buildUrl(MODEL, false, 0, {
    apiKey: "k",
    providerSpecificData,
  } as never);
  assert.equal(url, "https://api.deepseek.com/anthropic/v1/messages");
});

test("the Anthropic alternate sends the key in x-api-key, not as a bearer token", () => {
  process.env[FLAG] = "1";
  const { providerSpecificData } = pick();
  const headers = new DefaultExecutor(PROVIDER).buildHeaders(
    { apiKey: "k", providerSpecificData } as never,
    false
  ) as Record<string, string>;
  assert.equal(headers["x-api-key"], "k");
  assert.equal(headers.Authorization, undefined);
});

test("keeps the other connection data and does not change the original object", () => {
  process.env[FLAG] = "1";
  const original = { region: "eu", extraApiKeys: ["a"] };
  const { providerSpecificData } = pick({ providerSpecificData: original });
  assert.deepEqual(providerSpecificData, { ...original, targetFormat: FORMATS.CLAUDE });
  assert.deepEqual(original, { region: "eu", extraApiKeys: ["a"] });
});

test("is off by default", () => {
  const { providerSpecificData, targetFormat } = pick();
  assert.equal(providerSpecificData, undefined);
  assert.notEqual(targetFormat, FORMATS.CLAUDE);
});

test("an explicit connection targetFormat wins", () => {
  process.env[FLAG] = "1";
  const psd = { targetFormat: FORMATS.OPENAI_RESPONSES };
  const { providerSpecificData } = pick({ providerSpecificData: psd });
  assert.equal(providerSpecificData, psd);
});

test("only Claude-format clients are moved", () => {
  process.env[FLAG] = "1";
  for (const sourceFormat of [FORMATS.OPENAI, FORMATS.OPENAI_RESPONSES]) {
    assert.equal(pick({ sourceFormat }).providerSpecificData, undefined, sourceFormat);
  }
});

test("a provider without an Anthropic alternate is left alone", () => {
  process.env[FLAG] = "1";
  assert.equal(
    pick({ provider: "openai", resolvedModel: "gpt-4o" }).providerSpecificData,
    undefined
  );
});

test("a model-level or custom-model target format wins over the client protocol", () => {
  process.env[FLAG] = "1";
  assert.equal(
    pick({ customModelTargetFormat: FORMATS.OPENAI_RESPONSES }).providerSpecificData,
    undefined
  );
});

test("through the chat handler: a Claude client reaches the Anthropic endpoint, natively", async () => {
  process.env[FLAG] = "1";
  const { result, wire } = await claudeRequestThroughChatCore({
    apiKey: "k",
    providerSpecificData: {},
  });
  assert.equal(result.success, true);
  assert.equal(wire?.url, "https://api.deepseek.com/anthropic/v1/messages");
  assert.equal(wire?.headers.get("x-api-key"), "k");
  assert.equal(wire?.headers.get("authorization"), null);
  assert.equal(wire?.body.system !== undefined, true, "Claude-shaped body keeps `system`");
  assert.equal("messages" in (wire?.body ?? {}), true);
});

test("through the chat handler: off by default, the same request goes through the OpenAI hub", async () => {
  const { wire } = await claudeRequestThroughChatCore({ apiKey: "k", providerSpecificData: {} });
  assert.notEqual(wire?.url, "https://api.deepseek.com/anthropic/v1/messages");
  assert.match(String(wire?.headers.get("authorization")), /^Bearer /);
});
