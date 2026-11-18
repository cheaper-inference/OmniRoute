import test from "node:test";
import assert from "node:assert/strict";
import {
  prepareWebFetchFallbackBody,
  OMNIROUTE_WEB_FETCH_FALLBACK_TOOL_NAME as name,
} from "../../open-sse/services/webFetchInterception.ts";
import { translateRequest } from "../../open-sse/translator/index.ts";
import { FORMATS } from "../../open-sse/translator/formats.ts";

// #18421: chatCore runs the web_fetch interception before translateRequest, so the
// injected tool and tool_choice must be in the client's (source) format.

function claudeFetchBody(toolChoice?: Record<string, unknown>) {
  return {
    model: "claude-sonnet-5-5",
    max_tokens: 500,
    messages: [{ role: "user", content: "Fetch https://example.com" }],
    tools: [{ type: "web_fetch_20250910", name: "web_fetch", max_uses: 1 }],
    ...(toolChoice ? { tool_choice: toolChoice } : {}),
  };
}

function prepare(
  body: Record<string, unknown>,
  sourceFormat: string | null,
  targetFormat: string,
  provider = "claude"
) {
  return prepareWebFetchFallbackBody(body, {
    provider,
    sourceFormat,
    targetFormat,
    nativeCodexPassthrough: false,
    interceptFetchOverride: true,
  });
}

type AnyTool = Record<string, unknown> & { function?: Record<string, unknown> };

test("Claude client to Claude target: injected tool is an Anthropic tool, not a function tool", () => {
  const { body, fallback } = prepare(
    claudeFetchBody({ type: "tool", name: "web_fetch" }),
    FORMATS.CLAUDE,
    FORMATS.CLAUDE
  );
  assert.equal(fallback.enabled, true);
  assert.equal(fallback.convertedToolCount, 1);
  const tools = body.tools as AnyTool[];
  assert.equal(tools.length, 1);
  assert.equal(tools[0].name, name);
  assert.equal(tools[0].type, undefined);
  assert.equal(tools[0].function, undefined);
  assert.deepEqual((tools[0].input_schema as { required: string[] }).required, ["url"]);
  assert.equal(typeof tools[0].description, "string");
  assert.deepEqual(body.tool_choice, { type: "tool", name });
});

test("Claude client to OpenAI target: the tool survives translation", () => {
  const { body } = prepare(
    claudeFetchBody({ type: "tool", name: "web_fetch" }),
    FORMATS.CLAUDE,
    FORMATS.OPENAI,
    "nous-research"
  );
  const translated = translateRequest(
    FORMATS.CLAUDE,
    FORMATS.OPENAI,
    "ornith-1.5-122b",
    body,
    false,
    {},
    "nous-research"
  );
  const tools = translated.tools as { function: { name: string; parameters: unknown } }[];
  const fetchTool = tools.find((tool) => tool.function?.name === name);
  assert.ok(fetchTool, "omniroute_web_fetch must reach the OpenAI-format provider");
  assert.deepEqual((fetchTool.function.parameters as { required: string[] }).required, ["url"]);
  assert.deepEqual(translated.tool_choice, { type: "function", function: { name } });
});

test("OpenAI client to Responses target: the translated tool keeps its name", () => {
  const { body } = prepare(
    {
      model: "gpt-5",
      messages: [{ role: "user", content: "Fetch https://example.com" }],
      tools: [{ type: "web_fetch" }],
    },
    FORMATS.OPENAI,
    FORMATS.OPENAI_RESPONSES,
    "openai"
  );
  const translated = translateRequest(
    FORMATS.OPENAI,
    FORMATS.OPENAI_RESPONSES,
    "gpt-5",
    body,
    false,
    {},
    "openai"
  );
  const tools = translated.tools as { name: string; parameters?: { required?: string[] } }[];
  assert.equal(tools[0].name, name);
  assert.deepEqual(tools[0].parameters?.required, ["url"]);
});

test("Claude client without a forced choice keeps tool_choice untouched", () => {
  const { body } = prepare(claudeFetchBody({ type: "auto" }), FORMATS.CLAUDE, FORMATS.CLAUDE);
  assert.deepEqual(body.tool_choice, { type: "auto" });
});

test("a client function named web_fetch keeps its explicit tool_choice", () => {
  const input = {
    tools: [
      { type: "web_fetch_20250910", name: "web_fetch" },
      { name: "web_fetch", description: "client tool", input_schema: { type: "object" } },
    ],
    tool_choice: { type: "tool", name: "web_fetch" },
  };
  const { body } = prepare(input, FORMATS.CLAUDE, FORMATS.CLAUDE);
  assert.deepEqual(body.tool_choice, { type: "tool", name: "web_fetch" });
});

test("an OpenAI choice that names web_fetch is pointed at the injected tool", () => {
  const { body } = prepare(
    {
      tools: [{ type: "web_fetch" }],
      tool_choice: { type: "function", function: { name: "web_fetch" } },
    },
    FORMATS.OPENAI,
    FORMATS.OPENAI,
    "openai"
  );
  assert.deepEqual(body.tool_choice, { type: "function", function: { name } });
});

for (const [sourceFormat, targetFormat, expectedTool, expectedChoice] of [
  [FORMATS.OPENAI, FORMATS.OPENAI_RESPONSES, "nested", { type: "function", function: { name } }],
  [FORMATS.OPENAI_RESPONSES, FORMATS.OPENAI, "flat", { type: "function", name }],
  [null, FORMATS.OPENAI_RESPONSES, "flat", { type: "function", name }],
  [null, FORMATS.CLAUDE, "claude", { type: "tool", name }],
] as const) {
  test(`source ${sourceFormat ?? "(none)"} to target ${targetFormat}: ${expectedTool} tool`, () => {
    const { body } = prepare(
      { tools: [{ type: "web_fetch" }], tool_choice: { type: "web_fetch" } },
      sourceFormat,
      targetFormat,
      "openai"
    );
    const tool = (body.tools as AnyTool[])[0];
    if (expectedTool === "nested") {
      assert.equal(tool.type, "function");
      assert.equal(tool.function?.name, name);
      assert.equal(tool.name, undefined);
    } else if (expectedTool === "flat") {
      assert.equal(tool.type, "function");
      assert.equal(tool.name, name);
      assert.equal(tool.function, undefined);
    } else {
      assert.equal(tool.name, name);
      assert.ok(tool.input_schema);
      assert.equal(tool.type, undefined);
    }
    assert.deepEqual(body.tool_choice, expectedChoice);
  });
}
