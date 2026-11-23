import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-tool-addition-hoist-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { handleChatCore } = await import("../../open-sse/handlers/chatCore.ts");
const { translateRequest } = await import("../../open-sse/translator/index.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");
const { hoistToolAdditions, acceptsInlineToolAdditions } =
  await import("../../open-sse/translator/helpers/claudeDeferredTools.ts");

type Json = Record<string, unknown>;

const originalFetch = globalThis.fetch;

test.after(async () => {
  globalThis.fetch = originalFetch;
  for (let i = 0; i < 5; i++) await new Promise((resolve) => setImmediate(resolve));
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function addition(name: string): Json {
  return {
    type: "tool_addition",
    tool: {
      type: "tool_definition",
      definition: {
        name,
        description: "MCP tool",
        input_schema: { type: "object", properties: {} },
      },
    },
  };
}

function makeBody(): Json {
  return {
    model: "claude-sonnet-4-6",
    max_tokens: 64,
    messages: [
      { role: "user", content: [{ type: "text", text: "hello" }] },
      {
        role: "system",
        content: [{ type: "text", text: "context" }, addition("mcp_tool")],
      },
      { role: "user", content: [{ type: "text", text: "go" }] },
    ],
  };
}

function toolNames(tools: unknown): string[] {
  if (!Array.isArray(tools)) return [];
  return tools.map((tool: Json) => {
    const fn = tool.function as Json | undefined;
    return String(fn?.name ?? tool.name);
  });
}

test("hoistToolAdditions moves definitions into tools without duplicates and keeps the source", () => {
  const body = {
    tools: [{ name: "existing", input_schema: { type: "object" } }],
    messages: [
      {
        role: "system",
        content: [addition("new_tool"), addition("new_tool"), addition("existing")],
      },
      { role: "user", content: [{ type: "text", text: "run" }, addition("other_tool")] },
    ],
  };
  const snapshot = structuredClone(body);

  const result = hoistToolAdditions(body);

  assert.deepEqual(toolNames(result.tools), ["existing", "new_tool", "other_tool"]);
  assert.deepEqual(result.messages, [{ role: "user", content: [{ type: "text", text: "run" }] }]);
  assert.deepEqual(body, snapshot, "the input body must not be mutated");
});

test("hoistToolAdditions drops tool_reference additions and returns untouched bodies as-is", () => {
  const plain = makeBody();
  plain.messages = [{ role: "user", content: [{ type: "text", text: "hi" }] }];
  assert.equal(hoistToolAdditions(plain), plain);

  const withReference = {
    tools: [{ name: "advisor", input_schema: { type: "object" } }],
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: "hi" },
          { type: "tool_addition", tool: { type: "tool_reference", name: "advisor" } },
        ],
      },
    ],
  };
  const result = hoistToolAdditions(withReference);
  assert.deepEqual(toolNames(result.tools), ["advisor"]);
  assert.deepEqual(result.messages, [{ role: "user", content: [{ type: "text", text: "hi" }] }]);
});

test("hoistToolAdditions merges same-role neighbours left adjacent by a removed turn", () => {
  const body = {
    messages: [
      { role: "user", content: "first" },
      { role: "assistant", content: [addition("mcp_tool")] },
      { role: "user", content: [{ type: "text", text: "second" }] },
    ],
    system: [{ type: "text", text: "sys" }, addition("sys_tool")],
  };

  const result = hoistToolAdditions(body);

  assert.deepEqual(toolNames(result.tools), ["sys_tool", "mcp_tool"]);
  assert.deepEqual(result.system, [{ type: "text", text: "sys" }]);
  assert.deepEqual(result.messages, [
    {
      role: "user",
      content: [
        { type: "text", text: "first" },
        { type: "text", text: "second" },
      ],
    },
  ]);
});

test("acceptsInlineToolAdditions only for Anthropic-native targets", () => {
  for (const provider of ["claude", "anthropic", "anthropic-compatible-acme"]) {
    assert.equal(acceptsInlineToolAdditions(provider), true, provider);
  }
  for (const provider of ["kimi-coding", "zai", "deepseek", "vertex", "kimi", null]) {
    assert.equal(acceptsInlineToolAdditions(provider), false, String(provider));
  }
});

test("Claude -> OpenAI translation exposes the deferred MCP tool as a function", () => {
  const body = makeBody();
  const result = translateRequest(
    FORMATS.CLAUDE,
    FORMATS.OPENAI,
    "kimi-k2",
    body,
    true,
    null,
    "kimi"
  ) as Json;

  assert.ok(toolNames(result.tools).includes("mcp_tool"), "mcp_tool must reach tools[]");
  assert.ok(!JSON.stringify(result.messages).includes("tool_addition"));
  assert.ok(JSON.stringify(body.messages).includes("tool_addition"), "source body untouched");
});

test("Claude -> Claude translation hoists for third-party gateways only", () => {
  const kimi = translateRequest(
    FORMATS.CLAUDE,
    FORMATS.CLAUDE,
    "kimi-for-coding",
    makeBody(),
    true,
    null,
    "kimi-coding"
  ) as Json;
  assert.ok(toolNames(kimi.tools).includes("mcp_tool"));
  assert.ok(!JSON.stringify(kimi.messages).includes("tool_addition"));

  const claude = translateRequest(
    FORMATS.CLAUDE,
    FORMATS.CLAUDE,
    "claude-sonnet-4-6",
    makeBody(),
    true,
    null,
    "claude"
  ) as Json;
  assert.ok(JSON.stringify(claude.messages).includes("tool_addition"));
  assert.ok(!toolNames(claude.tools).includes("mcp_tool"));
});

test("claude passthrough to a third-party Claude gateway sends the MCP tool in tools[]", async () => {
  let captured: Json | null = null;
  globalThis.fetch = (async (_url: unknown, init: RequestInit = {}) => {
    captured = JSON.parse(String(init.body || "{}"));
    return new Response(
      JSON.stringify({
        id: "msg_test",
        type: "message",
        role: "assistant",
        model: "glm-5.3",
        content: [{ type: "text", text: "OK" }],
        stop_reason: "end_turn",
        usage: { input_tokens: 4, output_tokens: 1 },
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  }) as typeof fetch;

  const body = { ...makeBody(), model: "glm-5.3", stream: false };
  const result = await handleChatCore({
    body: structuredClone(body),
    modelInfo: { provider: "zai", model: "glm-5.3", extendedContext: false },
    credentials: { apiKey: "test-zai-key", providerSpecificData: {} },
    log: { debug() {}, info() {}, warn() {}, error() {} },
    clientRawRequest: {
      endpoint: "/v1/messages",
      body: structuredClone(body),
      headers: new Headers({
        accept: "application/json",
        "content-type": "application/json",
        "user-agent": "claude-code/2.1.284",
        "anthropic-beta": "claude-code-20250219,inline-tools-2026-09-15",
      }),
    },
    userAgent: "claude-code/2.1.284",
  });

  assert.equal(result.success, true);
  assert.ok(captured, "fetch was not called");
  const upstream = captured as Json;
  assert.ok(toolNames(upstream.tools).includes("mcp_tool"), "mcp_tool must reach tools[]");
  assert.ok(!JSON.stringify(upstream).includes("tool_addition"));
});
