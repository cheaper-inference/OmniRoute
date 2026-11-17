import test from "node:test";
import assert from "node:assert/strict";

const { parseDotsToolCalls, hasDotsToolCalls, stripDotsToolCallBlocks } =
  await import("../../open-sse/utils/dotsToolCalls.ts");

test("hasDotsToolCalls: detects <dots_function_call>", () => {
  assert.equal(
    hasDotsToolCalls('<dots_function_call>{"name":"x","arguments":{}}</dots_function_call>'),
    true
  );
  assert.equal(hasDotsToolCalls("hello world"), false);
});

test("parseDotsToolCalls: pure JSON fallback becomes tool call", () => {
  const content =
    '<dots_function_call>{"name":"search","arguments":{"query":"tables"}}</dots_function_call>';
  const result = parseDotsToolCalls(content);
  assert.equal(result.toolCalls.length, 1);
  assert.equal(result.toolCalls[0].function.name, "search");
  assert.deepEqual(JSON.parse(result.toolCalls[0].function.arguments), { query: "tables" });
  assert.equal(result.content.trim(), "");
});

test("parseDotsToolCalls: structured invoke with parameters", () => {
  const content = `<dots_function_call>
  <invoke name="get_current_weather">
    <parameter name="city">Boston</parameter>
    <parameter name="unit">celsius</parameter>
  </invoke>
</dots_function_call>`;
  const result = parseDotsToolCalls(content);
  assert.equal(result.toolCalls.length, 1);
  assert.equal(result.toolCalls[0].function.name, "get_current_weather");
  assert.deepEqual(JSON.parse(result.toolCalls[0].function.arguments), {
    city: "Boston",
    unit: "celsius",
  });
  assert.equal(result.content.trim(), "");
});

test("parseDotsToolCalls: multiple calls in order", () => {
  const content =
    '<dots_function_call>{"name":"a","arguments":{"x":1}}</dots_function_call>' +
    '<dots_function_call>{"name":"b","arguments":{"y":2}}</dots_function_call>';
  const result = parseDotsToolCalls(content);
  assert.equal(result.toolCalls.length, 2);
  assert.equal(result.toolCalls[0].function.name, "a");
  assert.equal(result.toolCalls[1].function.name, "b");
});

test("parseDotsToolCalls: unknown tool name stays as content", () => {
  const content = '<dots_function_call>{"name":"unknown_tool","arguments":{}}</dots_function_call>';
  const result = parseDotsToolCalls(content, { tools: [{ function: { name: "known_tool" } }] });
  assert.equal(result.toolCalls.length, 0);
  assert.ok(result.content.includes("unknown_tool"));
});

test("parseDotsToolCalls: malformed/unclosed kept as text", () => {
  const content = '<dots_function_call>{"name":"broken"';
  const result = parseDotsToolCalls(content);
  assert.equal(result.toolCalls.length, 0);
  assert.equal(result.holdback, content);
  assert.equal(result.content.trim(), "");
});

test("parseDotsToolCalls: best-effort typing without schemas keeps scalars raw", () => {
  const content =
    '<dots_function_call>{"name":"test","arguments":{"count":3,"active":true}}</dots_function_call>';
  const result = parseDotsToolCalls(content);
  assert.equal(result.toolCalls.length, 1);
  const args = JSON.parse(result.toolCalls[0].function.arguments);
  // Without schemas, we should still do best-effort parsing
  assert.equal(args.count, 3);
  assert.equal(args.active, true);
});

test("stripDotsToolCallBlocks: removes blocks", () => {
  const content =
    'hello <dots_function_call>{"name":"x","arguments":{}}</dots_function_call> world';
  const result = stripDotsToolCallBlocks(content);
  assert.equal(result.includes("dots_function_call"), false);
  assert.ok(result.includes("hello"));
  assert.ok(result.includes("world"));
});

const JSON_BLOCK =
  '<dots_function_call>{"name":"search","arguments":{"query":"tables"}}</dots_function_call>';
const INVOKE_BLOCK = `<dots_function_call><invoke name="get_weather"><parameter name="city">Boston</parameter></invoke></dots_function_call>`;

test("parseDotsToolCalls: Anthropic-shaped tools (name/input_schema) are declared tools", () => {
  const result = parseDotsToolCalls(INVOKE_BLOCK, {
    tools: [
      {
        name: "get_weather",
        input_schema: { type: "object", properties: { city: { type: "string" } } },
      },
    ],
  });
  assert.equal(result.toolCalls.length, 1);
  assert.equal(result.toolCalls[0].function.name, "get_weather");
  assert.deepEqual(JSON.parse(result.toolCalls[0].function.arguments), { city: "Boston" });
  assert.equal(result.content, "");
});

test("parseDotsToolCalls: a declared tool without any schema still parses", () => {
  for (const tool of [{ name: "search" }, { type: "function", function: { name: "search" } }]) {
    const result = parseDotsToolCalls(JSON_BLOCK, { tools: [tool] });
    assert.equal(result.toolCalls.length, 1, JSON.stringify(tool));
    assert.equal(result.content, "");
  }
});

test("parseDotsToolCalls: tool name resolves to the declared spelling", () => {
  const result = parseDotsToolCalls(JSON_BLOCK, { tools: [{ name: "Search" }] });
  assert.equal(result.toolCalls[0].function.name, "Search");
});

test("parseDotsToolCalls: Anthropic input_schema types coerce parameters", () => {
  const block = `<dots_function_call><invoke name="count"><parameter name="n">7</parameter><parameter name="on">true</parameter></invoke></dots_function_call>`;
  const result = parseDotsToolCalls(block, {
    tools: [
      {
        name: "count",
        input_schema: {
          type: "object",
          properties: { n: { type: "integer" }, on: { type: "boolean" } },
        },
      },
    ],
  });
  assert.deepEqual(JSON.parse(result.toolCalls[0].function.arguments), { n: 7, on: true });
});

test("parseDotsToolCalls: unknown tool is kept verbatim for Anthropic-shaped tools too", () => {
  const result = parseDotsToolCalls(JSON_BLOCK, { tools: [{ name: "other" }] });
  assert.equal(result.toolCalls.length, 0);
  assert.equal(result.content, JSON_BLOCK);
});

test("parseDotsToolCalls: a trailing partial opener is held back, not returned as content", () => {
  for (const partial of ["<", "<dots_func", "<dots_function_call", '<dots_function_call id="1"']) {
    const result = parseDotsToolCalls(`Hi ${partial}`);
    assert.equal(result.content, "Hi ", `content for ${partial}`);
    assert.equal(result.holdback, partial, `holdback for ${partial}`);
    assert.equal(result.toolCalls.length, 0);
  }
});

test("parseDotsToolCalls: text that cannot start an opener is not held back", () => {
  for (const text of ["a < b", "<div>", "Hi <dots_functions>", "x <dotsy"]) {
    const result = parseDotsToolCalls(text);
    assert.equal(result.content, text);
    assert.equal(result.holdback, "");
  }
});

test("parseDotsToolCalls: final parse keeps an unclosed block and a partial opener as content", () => {
  for (const text of ["Use <dots_function_call> to call tools.", "Hi <dots_func"]) {
    const result = parseDotsToolCalls(text, { final: true });
    assert.equal(result.content, text);
    assert.equal(result.holdback, "");
  }
});
