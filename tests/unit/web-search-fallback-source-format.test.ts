import test from "node:test";
import assert from "node:assert/strict";
import {
  prepareWebSearchFallbackBody,
  OMNIROUTE_WEB_SEARCH_FALLBACK_TOOL_NAME as name,
} from "../../open-sse/services/webSearchFallback.ts";
import { translateRequest } from "../../open-sse/translator/index.ts";
import { FORMATS } from "../../open-sse/translator/formats.ts";

test("Claude forced native search remains a Claude tool until translation to Cursor", () => {
  const original = {
    model: "claude-opus-5",
    messages: [{ role: "user", content: "Search Python history" }],
    tools: [{ type: "web_search_20250305", name: "web_search" }],
    tool_choice: { type: "tool", name: "web_search" },
  };
  const { body, fallback } = prepareWebSearchFallbackBody(original, {
    provider: "cursor",
    sourceFormat: FORMATS.CLAUDE,
    targetFormat: FORMATS.OPENAI,
    nativeCodexPassthrough: false,
  });
  assert.equal(fallback.enabled, true);
  assert.equal(body.tools[0].name, name);
  assert.ok((body.tools[0] as Record<string, unknown>).input_schema);
  assert.deepEqual(body.tool_choice, { type: "tool", name });
  const translated = translateRequest(
    FORMATS.CLAUDE,
    FORMATS.OPENAI,
    "claude-opus-5",
    body,
    false,
    {},
    "cursor"
  );
  const tools = translated.tools as { function: { name: string; parameters: unknown } }[];
  assert.equal(tools[0].function.name, name);
  assert.ok(tools[0].function.parameters);
  assert.deepEqual(translated.tool_choice, { type: "function", function: { name } });
  assert.equal(original.tools[0].name, "web_search");
  assert.equal(original.tool_choice.name, "web_search");
});

for (const [sourceFormat, targetFormat, choice, expected] of [
  [
    FORMATS.OPENAI_RESPONSES,
    FORMATS.OPENAI,
    { type: "function", name: "web_search" },
    { type: "function", name },
  ],
  [
    FORMATS.OPENAI,
    FORMATS.OPENAI_RESPONSES,
    { type: "function", function: { name: "web_search" } },
    { type: "function", function: { name } },
  ],
  [FORMATS.CLAUDE, FORMATS.OPENAI, { type: "web_search_20250305" }, { type: "tool", name }],
] as const) {
  test(`search choice uses source format ${sourceFormat} before translation to ${targetFormat}`, () => {
    const { body } = prepareWebSearchFallbackBody(
      { tools: [{ type: "web_search" }], tool_choice: choice },
      {
        sourceFormat,
        targetFormat,
        nativeCodexPassthrough: false,
      }
    );
    assert.deepEqual(body.tool_choice, expected);
  });
}

test("a custom function named web_search is not mistaken for the native search", () => {
  for (const choice of [
    { type: "tool", name: "web_search" },
    { type: "function", name: "web_search" },
    { type: "function", function: { name: "web_search" } },
    "auto",
    "none",
  ]) {
    const { body } = prepareWebSearchFallbackBody(
      {
        tools: [
          { type: "web_search_20250305" },
          { name: "web_search", input_schema: { type: "object" } },
        ],
        tool_choice: choice,
      },
      { sourceFormat: FORMATS.CLAUDE, targetFormat: FORMATS.OPENAI, nativeCodexPassthrough: false }
    );
    assert.deepEqual(body.tool_choice, choice);
  }
});
