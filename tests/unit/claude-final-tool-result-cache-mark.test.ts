/**
 * In an agent tool loop the request ends with the results of the last tool calls, after
 * the last assistant breakpoint. They are billed as fresh input. When the 4-marker
 * budget has room, a 5m breakpoint on that final user turn lets the next request read
 * them from cache.
 */
import assert from "node:assert/strict";
import { test } from "node:test";

import { FORMATS } from "../../open-sse/translator/formats.ts";
import { translateRequest } from "../../open-sse/translator/index.ts";

type Block = { type: string; cache_control?: { type: string; ttl?: string } };
type Msg = { role: string; content: Block[] };

function translate(withSystem: boolean) {
  const messages: unknown[] = [
    { role: "user", content: "first" },
    {
      role: "assistant",
      content: "ok",
      tool_calls: [
        { id: "call_0", type: "function", function: { name: "search", arguments: "{}" } },
      ],
    },
    { role: "tool", tool_call_id: "call_0", content: "r0" },
    {
      role: "assistant",
      content: "more",
      tool_calls: [
        { id: "call_1", type: "function", function: { name: "search", arguments: "{}" } },
      ],
    },
    { role: "tool", tool_call_id: "call_1", content: "r1" },
  ];
  if (withSystem) messages.unshift({ role: "system", content: "sys" });
  return translateRequest(
    FORMATS.OPENAI,
    FORMATS.CLAUDE,
    "claude-sonnet-4-5",
    {
      model: "claude-sonnet-4-5",
      max_tokens: 4096,
      tools: [
        {
          type: "function",
          function: { name: "search", parameters: { type: "object", properties: {} } },
        },
      ],
      messages,
    },
    false,
    {},
    "claude"
  ) as { messages: Msg[]; system?: Block[]; tools?: Block[] };
}

const count = (body: ReturnType<typeof translate>) =>
  [
    ...(body.system ?? []),
    ...(body.tools ?? []),
    ...body.messages.flatMap((m) => m.content),
  ].filter((b) => b.cache_control).length;

test("the final tool-result turn gets a 5m breakpoint when the budget has room", () => {
  const body = translate(false);
  const last = body.messages[body.messages.length - 1];
  assert.equal(last.role, "user");
  assert.deepEqual(last.content[last.content.length - 1].cache_control, { type: "ephemeral" });
  assert.ok(count(body) <= 4);
});

test("no fifth breakpoint when system, tools and both tail markers already use the budget", () => {
  const body = translate(true);
  const last = body.messages[body.messages.length - 1];
  assert.equal(last.content[last.content.length - 1].cache_control, undefined);
  assert.equal(count(body), 4);
});
