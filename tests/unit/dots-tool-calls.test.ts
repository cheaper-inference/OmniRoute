import test from "node:test";
import assert from "node:assert/strict";

const { parseDotsToolCalls, hasDotsToolCalls, stripDotsToolCallBlocks } = await import(
  "../../open-sse/utils/dotsToolCalls.ts"
);

test("hasDotsToolCalls: detects <dots_function_call>", () => {
  assert.equal(hasDotsToolCalls('<dots_function_call>{"name":"x","arguments":{}}</dots_function_call>'), true);
  assert.equal(hasDotsToolCalls("hello world"), false);
});

test("parseDotsToolCalls: pure JSON fallback becomes tool call", () => {
  const content = '<dots_function_call>{"name":"search","arguments":{"query":"tables"}}</dots_function_call>';
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
  const content = '<dots_function_call>{"name":"test","arguments":{"count":3,"active":true}}</dots_function_call>';
  const result = parseDotsToolCalls(content);
  assert.equal(result.toolCalls.length, 1);
  const args = JSON.parse(result.toolCalls[0].function.arguments);
  // Without schemas, we should still do best-effort parsing
  assert.equal(args.count, 3);
  assert.equal(args.active, true);
});

test("stripDotsToolCallBlocks: removes blocks", () => {
  const content = 'hello <dots_function_call>{"name":"x","arguments":{}}</dots_function_call> world';
  const result = stripDotsToolCallBlocks(content);
  assert.equal(result.includes("dots_function_call"), false);
  assert.ok(result.includes("hello"));
  assert.ok(result.includes("world"));
});
