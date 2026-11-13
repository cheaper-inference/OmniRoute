// A combo gives each leg a shallow copy of the client body ({ ...body }), so the message
// objects and their content blocks are shared between legs. The Claude request builders must
// edit copies: an edit in leg 1 (a rewritten file block, a dropped audio part, a cache
// breakpoint) must not show in leg 2.
import test from "node:test";
import assert from "node:assert/strict";

import {
  extractSystemRoleMessages,
  hoistLeadingTextSystemMessages,
} from "../../open-sse/handlers/chatCore/claudeSystemRole.ts";
import { normalizeClaudeUpstreamMessages } from "../../open-sse/handlers/chatCore/claudeUpstreamMessages.ts";
import { buildClaudePassthroughBody } from "../../open-sse/handlers/chatCore/claudePassthroughBody.ts";

const mk = () => ({
  model: "claude-sonnet-4-5",
  messages: [
    {
      role: "user",
      content: [
        { type: "text", text: "hello" },
        { type: "text", text: "" },
        { type: "file", file: { name: "a.txt", content: "FILEBODY" } },
      ],
    },
    {
      role: "system",
      content: [{ type: "text", text: "late-sys", cache_control: { type: "ephemeral" } }],
    },
    { role: "assistant", content: [{ type: "text", text: "ok" }] },
  ],
});

const markers = (payload: unknown) => JSON.stringify(payload).split("cache_control").length - 1;

test("extractSystemRoleMessages leaves the caller's messages unchanged", () => {
  const original = mk();
  const before = JSON.stringify(original);
  extractSystemRoleMessages({ ...original });
  assert.equal(JSON.stringify(original), before);
});

test("a retry on a fresh copy of the same body gets the same number of cache breakpoints", () => {
  const original = mk();
  const first: Record<string, unknown> = { ...original };
  extractSystemRoleMessages(first);
  const second: Record<string, unknown> = { ...original };
  extractSystemRoleMessages(second);
  assert.equal(markers(second), markers(first));
});

test("normalizeClaudeUpstreamMessages leaves the caller's messages unchanged", () => {
  const original = mk();
  const before = JSON.stringify(original.messages[0]);
  normalizeClaudeUpstreamMessages({ ...original }, { preserveToolResultBlocks: true });
  assert.equal(JSON.stringify(original.messages[0]), before);
});

test("an audio part dropped for a Claude leg is still there for the next leg", () => {
  const shared = {
    model: "m",
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: "transcribe" },
          { type: "input_audio", input_audio: { data: "AAA", format: "wav" } },
        ],
      },
    ],
  };
  normalizeClaudeUpstreamMessages({ ...shared });
  assert.equal(shared.messages[0].content.length, 2);
});

test("hoistLeadingTextSystemMessages leaves the caller's messages unchanged", () => {
  const original = {
    system: [{ type: "text", text: "S" }],
    messages: [
      { role: "system", content: [{ type: "text", text: "style" }] },
      { role: "user", content: [{ type: "text", text: "hi" }] },
    ],
  };
  const before = JSON.stringify(original);
  hoistLeadingTextSystemMessages({ ...original });
  assert.equal(JSON.stringify(original), before);
});

test("buildClaudePassthroughBody does not add cache_control to the caller's last user block", () => {
  const original = {
    model: "claude-sonnet-4-5",
    messages: [{ role: "user", content: [{ type: "text", text: "q" }] }],
  };
  buildClaudePassthroughBody({
    body: original,
    provider: "claude",
    clientHeaders: {},
    isClaudeCodeSemanticPassthrough: true,
    effectiveModel: "claude-sonnet-4-5",
    targetFormat: "claude",
    preserveCacheControl: true,
    normalizeClaudeUpstreamMessages: () => {},
    applyReasoningRuleDirective: (b: unknown) => b,
  } as unknown as Parameters<typeof buildClaudePassthroughBody>[0]);
  assert.equal(
    (original.messages[0].content[0] as Record<string, unknown>).cache_control,
    undefined
  );
});

test("guard: the built body still carries the lifted system block and the cache breakpoint", () => {
  const original = mk();
  const built = buildClaudePassthroughBody({
    body: original,
    provider: "claude",
    clientHeaders: {},
    isClaudeCodeSemanticPassthrough: true,
    effectiveModel: "claude-sonnet-4-5",
    targetFormat: "claude",
    preserveCacheControl: true,
    normalizeClaudeUpstreamMessages: () => {},
    applyReasoningRuleDirective: (b: unknown) => b,
  } as unknown as Parameters<typeof buildClaudePassthroughBody>[0]);
  const system = built.system as Array<{ text: string }>;
  assert.equal(system.at(-1)?.text, "late-sys");
  assert.ok(markers(built) >= 1);
});

test("guard: signed thinking blocks keep their exact fields through the copy", () => {
  const thinking = { type: "thinking", thinking: "t", signature: "sig-123" };
  const body = {
    model: "m",
    messages: [
      { role: "user", content: [{ type: "text", text: "q" }] },
      { role: "assistant", content: [thinking, { type: "text", text: "a" }] },
    ],
  };
  const payload: Record<string, unknown> = { ...body };
  normalizeClaudeUpstreamMessages(payload, { preserveToolResultBlocks: true });
  const out = (payload.messages as Array<{ content: unknown[] }>)[1].content[0];
  assert.deepEqual(out, thinking);
});
