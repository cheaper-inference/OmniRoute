// hoistLeadingTextSystemMessages lifts leading system turns into the top-level `system`. The
// sibling extractSystemRoleMessages keeps the block's cache_control and the message-level
// output_config; the leading hoist rebuilt plain text blocks and dropped both, without a log.
import test from "node:test";
import assert from "node:assert/strict";

import { hoistLeadingTextSystemMessages } from "../../open-sse/handlers/chatCore/claudeSystemRole.ts";

type Body = Record<string, unknown> & { system?: Array<Record<string, unknown>> };

test("a hoisted block keeps its cache_control marker", () => {
  const payload: Body = {
    system: [{ type: "text", text: "S" }],
    messages: [
      {
        role: "system",
        content: [{ type: "text", text: "style", cache_control: { type: "ephemeral" } }],
      },
      { role: "user", content: [{ type: "text", text: "hi" }] },
    ],
  };
  hoistLeadingTextSystemMessages(payload);
  // Nothing precedes the leading run, so the marker stays on the hoisted system block.
  const marked = (payload.system ?? []).filter((b) => b.cache_control);
  assert.equal(marked.length, 1, JSON.stringify(payload.system));
  assert.deepEqual(marked[0].cache_control, { type: "ephemeral" });
  assert.equal(marked[0].text, "style");
});

test("a message-level output_config is folded into the top level", () => {
  const payload: Body = {
    messages: [
      {
        role: "system",
        content: [{ type: "text", text: "style" }],
        output_config: { effort: "high" },
      },
      { role: "user", content: [{ type: "text", text: "hi" }] },
    ],
  };
  hoistLeadingTextSystemMessages(payload);
  assert.deepEqual(payload.output_config, { effort: "high" });
});

test("an explicit top-level output_config wins over the message-level one", () => {
  const payload: Body = {
    output_config: { effort: "low" },
    messages: [
      { role: "system", content: [{ type: "text", text: "s" }], output_config: { effort: "high" } },
      { role: "user", content: [{ type: "text", text: "hi" }] },
    ],
  };
  hoistLeadingTextSystemMessages(payload);
  assert.deepEqual(payload.output_config, { effort: "low" });
});

test("guard: a directive-only message (no text) stays in place with its output_config", () => {
  const payload: Body = {
    messages: [
      { role: "system", content: [], output_config: { effort: "high" } },
      { role: "user", content: [{ type: "text", text: "hi" }] },
    ],
  };
  hoistLeadingTextSystemMessages(payload);
  assert.equal((payload.messages as unknown[]).length, 2);
  assert.equal(payload.output_config, undefined);
});

test("guard: plain string and text blocks without markers hoist as before", () => {
  const payload: Body = {
    messages: [
      { role: "system", content: "one" },
      { role: "system", content: [{ type: "text", text: "two" }] },
      { role: "user", content: [{ type: "text", text: "hi" }] },
    ],
  };
  hoistLeadingTextSystemMessages(payload);
  assert.deepEqual(
    (payload.system ?? []).map((b) => b.text),
    ["one", "two"]
  );
  assert.equal((payload.messages as unknown[]).length, 1);
});
