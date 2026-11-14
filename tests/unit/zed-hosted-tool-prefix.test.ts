import test from "node:test";
import assert from "node:assert/strict";

const { __test__ } = await import("../../open-sse/executors/zed-hosted.ts");
const { wrapZedCompletionStream } = __test__;

function buildZedAnthropicToolCallNdjson(toolName = "proxy_glob"): string {
  const lines = [
    { event: { type: "message_start", message: { id: "msg_zed", model: "claude-test" } } },
    {
      event: {
        type: "content_block_start",
        index: 0,
        content_block: {
          type: "tool_use",
          id: "toolu_123",
          name: toolName,
        },
      },
    },
    {
      event: {
        type: "content_block_delta",
        index: 0,
        delta: { type: "input_json_delta", partial_json: '{"pattern":"*.txt"}' },
      },
    },
    { event: { type: "content_block_stop", index: 0 } },
    {
      event: {
        type: "message_delta",
        delta: { stop_reason: "tool_use" },
        usage: { output_tokens: 15 },
      },
    },
    { event: { type: "message_stop" } },
  ];
  return lines.map((l) => JSON.stringify(l)).join("\n") + "\n";
}

async function readAll(stream: ReadableStream<Uint8Array>): Promise<string> {
  const reader = stream.getReader();
  const decoder = new TextDecoder();
  let out = "";
  for (;;) {
    const { value, done } = await reader.read();
    if (done) break;
    out += decoder.decode(value, { stream: true });
  }
  return out;
}

test("zed anthropic stream restores tool name from toolNameMap", async () => {
  const response = new Response(buildZedAnthropicToolCallNdjson("proxy_glob"), { status: 200 });
  const toolNameMap = new Map([["proxy_glob", "glob"]]);
  const wrapped = wrapZedCompletionStream(response, "anthropic", "claude-test", { toolNameMap });
  const out = await readAll(wrapped.body as ReadableStream<Uint8Array>);

  assert.ok(out.includes('"name":"glob"'), `expected "glob" tool name in output, got: ${out}`);
  assert.ok(!out.includes('"name":"proxy_glob"'), `proxy_glob must be un-prefixed in output, got: ${out}`);
});

test("zed anthropic stream falls back to stripping proxy_ prefix when toolNameMap has no entry", async () => {
  const response = new Response(buildZedAnthropicToolCallNdjson("proxy_read"), { status: 200 });
  const wrapped = wrapZedCompletionStream(response, "anthropic", "claude-test");
  const out = await readAll(wrapped.body as ReadableStream<Uint8Array>);

  assert.ok(out.includes('"name":"read"'), `expected "read" tool name in output, got: ${out}`);
  assert.ok(!out.includes('"name":"proxy_read"'), `proxy_read must be un-prefixed in output, got: ${out}`);
});
