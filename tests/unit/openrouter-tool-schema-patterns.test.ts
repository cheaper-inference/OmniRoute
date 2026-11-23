// OpenRouter → Cohere rejects a whole agent request with
// `invalid 'parameters' provided: pattern must be a valid regex` when ONE of
// its (often ~50) function tools carries a malformed `pattern` constraint.
// Drop only the malformed constraints, only for openrouter, before dispatch.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-or-tool-patterns-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { clearCache } = await import("../../src/lib/semanticCache.ts");
const { clearIdempotency } = await import("../../src/lib/idempotencyLayer.ts");
const { clearInflight } = await import("../../open-sse/services/requestDedup.ts");
const { resetAll: resetAccountSemaphores } =
  await import("../../open-sse/services/accountSemaphore.ts");
const { handleChatCore, clearUpstreamProxyConfigCache } =
  await import("../../open-sse/handlers/chatCore.ts");
const { resetPayloadRulesConfigForTests } = await import("../../open-sse/services/payloadRules.ts");
const { normalizeToolSchemasForProvider } =
  await import("../../open-sse/handlers/chatCore/openrouterToolSchemas.ts");
const { stripInvalidRegexPatterns, stripUnsupportedRegexPatterns } =
  await import("../../open-sse/translator/helpers/schemaCoercion.ts");

type JsonRecord = Record<string, unknown>;
type DebugCall = [string, string];

const originalFetch = globalThis.fetch;

function recordingLog(calls: DebugCall[]) {
  return {
    debug: (tag: string, message: string) => calls.push([tag, message]),
    info() {},
    warn() {},
    error() {},
  };
}

function findFilesTool(): JsonRecord {
  return {
    type: "function",
    function: {
      name: "find_files",
      parameters: {
        type: "object",
        properties: {
          pattern: { type: "string", pattern: "^[a-z]+$" },
          properties: { type: "string", pattern: "(" },
          nested: {
            type: "object",
            properties: { value: { type: "string", pattern: "[" } },
          },
        },
        required: ["pattern", "properties"],
      },
    },
  };
}

function paramsOf(tool: unknown): JsonRecord {
  return ((tool as JsonRecord).function as JsonRecord).parameters as JsonRecord;
}

function propsOf(schema: JsonRecord): JsonRecord {
  return schema.properties as JsonRecord;
}

test("openrouter: malformed pattern removed, valid pattern kept", () => {
  const normalized = normalizeToolSchemasForProvider("openrouter", [findFilesTool()]);
  const params = paramsOf(normalized[0]);
  const props = propsOf(params);

  assert.deepEqual(props.pattern, { type: "string", pattern: "^[a-z]+$" });
  assert.deepEqual(propsOf(props.nested as JsonRecord).value, { type: "string" });
});

test("openrouter: properties literally named pattern/properties stay properties", () => {
  const normalized = normalizeToolSchemasForProvider("openrouter", [findFilesTool()]);
  const params = paramsOf(normalized[0]);
  const props = propsOf(params);

  assert.deepEqual(Object.keys(props), ["pattern", "properties", "nested"]);
  assert.deepEqual(props.properties, { type: "string" });
  assert.deepEqual(params.required, ["pattern", "properties"]);
  assert.equal(params.type, "object");
});

test("openrouter: items/anyOf/$defs invalid patterns removed without mutating input", () => {
  const tools = [
    {
      type: "function",
      function: {
        name: "search",
        parameters: {
          type: "object",
          properties: {
            filters: { type: "array", items: { type: "string", pattern: "[" } },
            alternatives: {
              anyOf: [
                { type: "string", pattern: "^ok$" },
                { type: "string", pattern: "(" },
              ],
            },
            ref: { $ref: "#/$defs/id" },
          },
          $defs: { id: { type: "string", pattern: "a{2,1}" } },
        },
      },
    },
  ];
  const snapshot = structuredClone(tools);

  const normalized = normalizeToolSchemasForProvider("openrouter", tools);
  const params = paramsOf(normalized[0]);
  const props = propsOf(params);

  assert.deepEqual((props.filters as JsonRecord).items, { type: "string" });
  assert.deepEqual((props.alternatives as JsonRecord).anyOf, [
    { type: "string", pattern: "^ok$" },
    { type: "string" },
  ]);
  assert.deepEqual((params.$defs as JsonRecord).id, { type: "string" });
  assert.deepEqual(tools, snapshot, "input tools must not be mutated");
  assert.notEqual(normalized, tools);
});

test("openrouter: flat Responses-shaped function tool parameters are normalized too", () => {
  const tools = [
    {
      type: "function",
      name: "flat",
      parameters: { type: "object", properties: { q: { type: "string", pattern: "[" } } },
    },
  ];
  const normalized = normalizeToolSchemasForProvider("openrouter", tools);
  const params = (normalized[0] as JsonRecord).parameters as JsonRecord;
  assert.deepEqual(propsOf(params).q, { type: "string" });
});

test("non-openrouter provider returns the identical array reference", () => {
  const tools = [findFilesTool()];
  assert.equal(normalizeToolSchemasForProvider("groq", tools), tools);
  assert.equal(normalizeToolSchemasForProvider(undefined, tools), tools);
  assert.deepEqual(tools, [findFilesTool()], "non-openrouter tools must stay byte-identical");
});

test("openrouter with nothing to strip returns the identical array reference", () => {
  const tools = [
    {
      type: "function",
      function: {
        name: "ok",
        parameters: { type: "object", properties: { a: { type: "string", pattern: "^a+$" } } },
      },
    },
  ];
  assert.equal(normalizeToolSchemasForProvider("openrouter", tools), tools);
  assert.equal(normalizeToolSchemasForProvider("openrouter", undefined), undefined);
});

test("debug log fires once with a redacted count; silent when nothing removed", () => {
  const calls: DebugCall[] = [];
  normalizeToolSchemasForProvider("openrouter", [findFilesTool()], recordingLog(calls));
  assert.equal(calls.length, 1);
  assert.equal(calls[0][0], "TOOLSCHEMA");
  assert.match(calls[0][1], /openrouter \| stripped 2 invalid pattern constraints/);
  assert.equal(calls[0][1].includes("["), false, "log must not leak schema content");
  assert.equal(calls[0][1].includes("find_files"), false, "log must not leak tool names");

  const silent: DebugCall[] = [];
  normalizeToolSchemasForProvider(
    "openrouter",
    [{ type: "function", function: { name: "x", parameters: { type: "object" } } }],
    recordingLog(silent)
  );
  assert.equal(silent.length, 0);
});

test("stripInvalidRegexPatterns counts removals and leaves non-string patterns alone", () => {
  const stats = { removed: 0 };
  const schema = {
    type: "object",
    properties: {
      a: { type: "string", pattern: "[" },
      b: { type: "string", pattern: "\\d+" },
      c: { type: "string", pattern: 42 },
    },
  };
  const out = stripInvalidRegexPatterns(schema, stats) as JsonRecord;
  assert.equal(stats.removed, 1);
  assert.deepEqual(propsOf(out).a, { type: "string" });
  assert.deepEqual(propsOf(out).b, { type: "string", pattern: "\\d+" });
  assert.deepEqual(propsOf(out).c, { type: "string", pattern: 42 });
});

test("stripInvalidRegexPatterns leaves oversized patterns untouched (bounded validation)", () => {
  const huge = "a".repeat(5000) + "[";
  const stats = { removed: 0 };
  const out = stripInvalidRegexPatterns({ type: "string", pattern: huge }, stats) as JsonRecord;
  assert.equal(out.pattern, huge);
  assert.equal(stats.removed, 0);
});

test("stripUnsupportedRegexPatterns (codex lookaround strip) behavior is unchanged", () => {
  const out = stripUnsupportedRegexPatterns({
    type: "object",
    properties: {
      look: { type: "string", pattern: "^(?=.*@).+$" },
      broken: { type: "string", pattern: "[" },
    },
  }) as JsonRecord;
  assert.deepEqual(propsOf(out).look, { type: "string" });
  assert.deepEqual(propsOf(out).broken, { type: "string", pattern: "[" });
});

// ── Wiring: the strip runs in handleChatCore before the upstream dispatch ──

async function invoke(provider: string, model: string): Promise<JsonRecord | null> {
  let captured: JsonRecord | null = null;
  globalThis.fetch = (async (_url: unknown, init: { body?: unknown } = {}) => {
    captured = init.body ? (JSON.parse(String(init.body)) as JsonRecord) : null;
    return new Response(
      JSON.stringify({
        id: "chatcmpl-1",
        object: "chat.completion",
        model,
        choices: [
          { index: 0, message: { role: "assistant", content: "ok" }, finish_reason: "stop" },
        ],
        usage: { prompt_tokens: 4, completion_tokens: 2, total_tokens: 6 },
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  }) as typeof fetch;
  const body = {
    model,
    messages: [{ role: "user", content: "hi" }],
    tools: [findFilesTool()],
    stream: false,
  };
  try {
    await handleChatCore({
      body: structuredClone(body),
      modelInfo: { provider, model, extendedContext: false },
      credentials: { ["api" + "Key"]: "test-key", providerSpecificData: {} },
      log: recordingLog([]),
      clientRawRequest: {
        endpoint: "/v1/chat/completions",
        body,
        headers: new Headers({ accept: "application/json" }),
      },
      connectionId: null,
      apiKeyInfo: null,
      userAgent: "unit-test",
      isCombo: false,
      comboStrategy: null,
      onCredentialsRefreshed: null,
      onRequestSuccess: null,
    });
    return captured;
  } finally {
    globalThis.fetch = originalFetch;
  }
}

async function resetStorage() {
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

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("chatCore strips malformed tool patterns on the openrouter wire body", async () => {
  const sent = await invoke("openrouter", "cohere/command-a");
  assert.ok(sent, "upstream request was captured");
  const tools = sent.tools as unknown[];
  assert.equal(Array.isArray(tools), true);
  const props = propsOf(paramsOf(tools[0]));
  assert.deepEqual(props.pattern, { type: "string", pattern: "^[a-z]+$" });
  assert.deepEqual(props.properties, { type: "string" });
  assert.deepEqual(propsOf(props.nested as JsonRecord).value, { type: "string" });
});

test("chatCore leaves tool patterns untouched for a non-openrouter provider", async () => {
  const sent = await invoke("groq", "llama-3.3-70b-versatile");
  assert.ok(sent, "upstream request was captured");
  const props = propsOf(paramsOf((sent.tools as unknown[])[0]));
  assert.deepEqual(props.properties, { type: "string", pattern: "(" });
  assert.deepEqual(propsOf(props.nested as JsonRecord).value, { type: "string", pattern: "[" });
});
