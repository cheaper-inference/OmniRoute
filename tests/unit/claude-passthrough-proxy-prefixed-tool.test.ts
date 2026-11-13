import test from "node:test";
import assert from "node:assert/strict";

import {
  buildClaudePassthroughToolNameMap,
  restoreClaudePassthroughToolNames,
} from "../../open-sse/handlers/chatCore/passthroughToolNames.ts";
import { restoreClaudePassthroughToolUseName } from "../../open-sse/utils/stream.ts";
import { stripProxyToolPrefix } from "../../open-sse/executors/claudeIdentity.ts";

// The native Claude executor strips a leading `proxy_` from every tool name before dispatch,
// so a client tool that is literally named `proxy_search` goes upstream as `search`.
// The reply must come back under the name the client declared.
function wireToolName(clientBody: Record<string, unknown>): string {
  const wire = structuredClone(clientBody) as { tools: Array<{ name: string }> };
  stripProxyToolPrefix(wire);
  return wire.tools[0].name;
}

const clientBody = { tools: [{ name: "proxy_search", input_schema: { type: "object" } }] };

test("non-stream: a tool the client named proxy_search is restored after the executor stripped it", () => {
  const ledger = buildClaudePassthroughToolNameMap(clientBody);
  const reply = { content: [{ type: "tool_use", id: "t1", name: wireToolName(clientBody) }] };
  const restored = restoreClaudePassthroughToolNames(reply, ledger) as typeof reply;
  assert.equal(restored.content[0].name, "proxy_search");
});

test("stream: a tool the client named proxy_search is restored after the executor stripped it", () => {
  const ledger = buildClaudePassthroughToolNameMap(clientBody);
  const event = {
    type: "content_block_start",
    index: 0,
    content_block: { type: "tool_use", id: "t1", name: wireToolName(clientBody), input: {} },
  };
  restoreClaudePassthroughToolUseName(event, ledger, clientBody.tools);
  assert.equal(event.content_block.name, "proxy_search");
});

test("a tool without the prefix still restores a prefixed echo and adds no extra entry", () => {
  const ledger = buildClaudePassthroughToolNameMap({ tools: [{ name: "get_weather" }] });
  assert.deepEqual([...(ledger ?? [])], [["proxy_get_weather", "get_weather"]]);
});

test("a client that declares both search and proxy_search keeps search as search", () => {
  const ledger = buildClaudePassthroughToolNameMap({
    tools: [{ name: "search" }, { name: "proxy_search" }],
  });
  const reply = { content: [{ type: "tool_use", id: "t1", name: "search" }] };
  const restored = restoreClaudePassthroughToolNames(reply, ledger) as typeof reply;
  assert.equal(restored.content[0].name, "search");
});
