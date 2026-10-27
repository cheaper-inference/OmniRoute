import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-output-config-format-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { handleChatCore } = await import("../../open-sse/handlers/chatCore.ts");
const { stripOutputConfigFormatForCompat, FIRST_PARTY_ANTHROPIC_PROVIDERS } =
  await import("../../open-sse/handlers/chatCore/outputConfigFormatStrip.ts");

type Body = Record<string, unknown>;

const originalFetch = globalThis.fetch;

function noopLog() {
  return { debug() {}, info() {}, warn() {}, error() {} };
}

async function flushAsyncSideEffects() {
  for (let i = 0; i < 5; i++) await new Promise((resolve) => setImmediate(resolve));
}

test.afterEach(async () => {
  globalThis.fetch = originalFetch;
  await flushAsyncSideEffects();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
});

test.after(() => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

const TITLE_SCHEMA = {
  type: "json_schema",
  schema: {
    type: "object",
    properties: { title: { type: "string" } },
    required: ["title"],
  },
};

function titleGenBody(): Body {
  return {
    model: "claude-sonnet-4-6",
    max_tokens: 64,
    stream: false,
    system: [{ type: "text", text: "sys" }],
    messages: [{ role: "user", content: [{ type: "text", text: "name this session" }] }],
    output_config: { effort: "high", format: structuredClone(TITLE_SCHEMA) },
  };
}

test("first-party Anthropic ids are claude (OAuth) and anthropic (API key)", () => {
  assert.deepEqual([...FIRST_PARTY_ANTHROPIC_PROVIDERS].sort(), ["anthropic", "claude"]);
});

test("official anthropic API-key provider keeps output_config.format", () => {
  const body = titleGenBody();
  stripOutputConfigFormatForCompat(body, "anthropic");
  assert.deepEqual(body.output_config, { effort: "high", format: TITLE_SCHEMA });
});

test("claude OAuth provider keeps output_config.format (control)", () => {
  const body = titleGenBody();
  stripOutputConfigFormatForCompat(body, "claude");
  assert.deepEqual(body.output_config, { effort: "high", format: TITLE_SCHEMA });
});

test("Claude-compatible gateway strips format and keeps effort", () => {
  const body = titleGenBody();
  stripOutputConfigFormatForCompat(body, "anthropic-compatible-xyz");
  assert.deepEqual(body.output_config, { effort: "high" });
  assert.ok(!JSON.stringify(body).includes("json_schema"));
});

test("Claude-compatible gateway drops output_config entirely when format was the only field", () => {
  const body = titleGenBody();
  delete (body.output_config as Body).effort;
  stripOutputConfigFormatForCompat(body, "anthropic-compatible-xyz");
  assert.equal("output_config" in body, false);
});

test("missing or non-object output_config is left untouched", () => {
  const noConfig: Body = { model: "x" };
  stripOutputConfigFormatForCompat(noConfig, "anthropic-compatible-xyz");
  assert.deepEqual(noConfig, { model: "x" });

  const nullConfig: Body = { model: "x", output_config: null };
  stripOutputConfigFormatForCompat(nullConfig, "anthropic-compatible-xyz");
  assert.deepEqual(nullConfig, { model: "x", output_config: null });
});

test("Claude passthrough to the anthropic API-key provider forwards output_config.format upstream", async () => {
  let captured: { url: string; body: Body } | null = null;

  globalThis.fetch = (async (url: string | URL | Request, init: RequestInit = {}) => {
    captured = { url: String(url), body: JSON.parse(String(init.body || "{}")) };
    return new Response(
      JSON.stringify({
        id: "msg_test",
        type: "message",
        role: "assistant",
        model: "claude-sonnet-4-6",
        content: [{ type: "text", text: '{"title":"t"}' }],
        usage: { input_tokens: 4, output_tokens: 1 },
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  }) as typeof fetch;

  const body = titleGenBody();
  const result = await handleChatCore({
    body: structuredClone(body),
    modelInfo: { provider: "anthropic", model: "claude-sonnet-4-6", extendedContext: false },
    credentials: { apiKey: "test-anthropic-key", providerSpecificData: {} },
    log: noopLog(),
    clientRawRequest: {
      endpoint: "/v1/messages",
      body: structuredClone(body),
      headers: new Headers({
        accept: "application/json",
        "content-type": "application/json",
        "user-agent": "claude-code/2.1.154",
      }),
    },
    userAgent: "claude-code/2.1.154",
  } as Parameters<typeof handleChatCore>[0]);

  assert.ok(captured, "fetch was not called");
  const sent = captured as { url: string; body: Body };
  assert.ok(sent.url.startsWith("https://api.anthropic.com/v1/messages"));
  assert.equal(result.success, true);
  const outputConfig = sent.body.output_config as Body | undefined;
  assert.ok(outputConfig, "output_config was stripped for the first-party anthropic provider");
  assert.deepEqual(outputConfig.format, TITLE_SCHEMA);
});
