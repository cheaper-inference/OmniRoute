import test from "node:test";
import assert from "node:assert/strict";
import { extractXmlInvokeBlocks } from "../../open-sse/translator/helpers/xmlToolCalls.ts";

test("complete mixed tool formats preserve text and tool order", () => {
  const result = extractXmlInvokeBlocks(
    'before<invoke name="first"><parameter name="x"> value </parameter></invoke>' +
      '<tool_call>{"tool_name":"second","parameters":{"count":2}}</tool_call>' +
      'TOOL_CALL third: {"nested":{"text":"brace } and \\"quote\\""}}after',
    {}
  );
  assert.equal(result.cleaned, "beforeafter");
  assert.deepEqual(
    result.toolCalls.map(({ name, args }) => ({ name, args })),
    [
      { name: "first", args: { x: "value" } },
      { name: "second", args: { count: 2 } },
      { name: "third", args: { nested: { text: 'brace } and "quote"' } } },
    ]
  );
  assert.match(result.toolCalls[0].id, /^toolu_xml_\d+_0$/);
  assert.match(result.toolCalls[2].id, /^toolu_txt_\d+_2$/);
});

test("incomplete bodies are buffered and consumed once on the next chunk", () => {
  for (const [first, second] of [
    ['<invoke name="tool"><parameter name="x">', "v</parameter></invoke>tail"],
    ['<tool_call>{"name":"tool","arguments":', '{"x":"v"}}</tool_call>tail'],
    ['TOOL_CALL tool: {"x":', '"v"}tail'],
  ]) {
    const state: { _xmlInvokeBuffer?: string } = {};
    assert.deepEqual(extractXmlInvokeBlocks("prefix" + first, state), {
      cleaned: "prefix",
      toolCalls: [],
    });
    assert.equal(state._xmlInvokeBuffer, first);
    const result = extractXmlInvokeBlocks(second, state);
    assert.equal(result.cleaned, "tail");
    assert.equal(result.toolCalls.length, 1);
    assert.deepEqual(result.toolCalls[0].args, { x: "v" });
    assert.equal(state._xmlInvokeBuffer, "");
  }
});

test("malformed complete JSON remains visible and string arguments are decoded", () => {
  const malformed = "<tool_call>{bad}</tool_call> TOOL_CALL bad: {bad}";
  assert.deepEqual(extractXmlInvokeBlocks(malformed, {}), { cleaned: malformed, toolCalls: [] });
  const payload = JSON.stringify({ name: "tool", arguments: JSON.stringify({ flag: true }) });
  const result = extractXmlInvokeBlocks(`<tool_call>${payload}</tool_call>`, {});
  assert.deepEqual(result.toolCalls[0].args, { flag: true });
});
