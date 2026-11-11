// F-C2-04: buildClaudePassthroughBody works on a SHALLOW copy of the caller's
// body ({ ...body }). output_config is shared by reference, and the compat strip
// (Fix #1719) deleted `format` from that shared object. In a combo (minimax ->
// claude), leg 1 stripped the field and leg 2 — first-party claude, which needs
// it — silently sent no JSON schema.
// F-C2-05: the non-Claude-Code passthrough ran normalizeClaudeUpstreamMessages
// against a real Anthropic upstream with an allow-list that drops every unknown
// user block type (search_result, container_upload, future types) with only a
// debug log. The model answered without the documents.
import { test } from "node:test";
import assert from "node:assert/strict";

const { buildClaudePassthroughBody } =
  await import("../../open-sse/handlers/chatCore/claudePassthroughBody.ts");
const { normalizeClaudeUpstreamMessages } =
  await import("../../open-sse/handlers/chatCore/claudeUpstreamMessages.ts");
const { stripOutputConfigFormatForCompat } =
  await import("../../open-sse/handlers/chatCore/outputConfigFormatStrip.ts");

const build = (
  body: unknown,
  provider: string,
  // chatCore binds the routed provider into every normalize call; do the same here.
  normalize: (p: never, o: never) => void = (p: unknown, o: unknown) =>
    normalizeClaudeUpstreamMessages(
      p as Record<string, unknown>,
      { ...(o as { preserveToolResultBlocks?: boolean }), provider } as {
        preserveToolResultBlocks?: boolean;
      }
    )
) =>
  buildClaudePassthroughBody({
    body,
    provider,
    clientHeaders: {},
    isClaudeCodeSemanticPassthrough: false,
    effectiveModel: "claude-sonnet-4-5",
    targetFormat: "claude",
    preserveCacheControl: true,
    normalizeClaudeUpstreamMessages: normalize as never,
    applyReasoningRuleDirective: (b: unknown) => b,
  });

test("combo: leg 1 (minimax) strips format only from its own copy; leg 2 (claude) keeps it", () => {
  // executeTargetAttempt does `attemptBody = { ...deps.body }` per leg: a shallow
  // copy, so output_config is shared between legs.
  const shared = {
    model: "x",
    max_tokens: 64,
    messages: [{ role: "user", content: [{ type: "text", text: "give json" }] }],
    output_config: {
      format: { type: "json_schema", schema: { type: "object" } },
      effort: "high",
    },
  };
  const leg1 = build({ ...shared }, "minimax", () => {}) as Record<string, unknown>;
  assert.equal(leg1.output_config?.format, undefined, "leg 1 strips format for minimax");
  assert.equal(leg1.output_config?.effort, "high", "leg 1 keeps effort");

  const leg2 = build({ ...shared }, "claude", () => {}) as Record<string, unknown>;
  assert.ok(
    leg2.output_config?.format,
    `leg 2 (first-party claude) must still carry output_config.format; got ${JSON.stringify(
      leg2.output_config
    )}`
  );
  // The caller's own body object must be untouched too.
  assert.ok((shared.output_config as Record<string, unknown>).format, "shared body mutated");
});

test("legacy output_format migration does not write into the caller's output_config", () => {
  const shared = {
    model: "x",
    max_tokens: 64,
    messages: [{ role: "user", content: "hi" }],
    output_config: { effort: "high" },
    output_format: { type: "json_schema", schema: { type: "object" } },
  };
  const out = build({ ...shared }, "claude", () => {}) as Record<string, unknown>;
  assert.equal(out.output_config?.format?.type, "json_schema");
  assert.equal(
    (shared.output_config as Record<string, unknown>).format,
    undefined,
    "caller's output_config mutated"
  );
  // The top-level output_format delete happens on the passthrough's working copy
  // only, so the per-leg body is free to migrate it again on a later leg.
});

test("stripOutputConfigFormatForCompat never mutates the given output_config object", () => {
  const oc = { format: { type: "json_schema" }, effort: "high" };
  const body = { output_config: oc };
  stripOutputConfigFormatForCompat(body, "minimax");
  assert.deepEqual(body.output_config, { effort: "high" }, "rest kept");
  assert.deepEqual(oc, { format: { type: "json_schema" }, effort: "high" }, "input object mutated");
  const onlyFormat = { format: { type: "json_schema" } };
  const body2 = { output_config: onlyFormat };
  stripOutputConfigFormatForCompat(body2, "minimax");
  assert.equal(body2.output_config, undefined, "empty rest removed");
});

test("passthrough to a real Anthropic target keeps native user blocks (search_result)", () => {
  const body = {
    model: "claude-sonnet-4-5",
    max_tokens: 10,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "search_result",
            source: "https://x",
            title: "T",
            content: [{ type: "text", text: "doc body" }],
            citations: { enabled: true },
          },
          { type: "text", text: "summarise" },
        ],
      },
    ],
  };
  const out = build(body, "claude") as Record<string, unknown>;
  const types = out.messages[0].content.map((b: Record<string, unknown>) => b.type);
  assert.deepEqual(
    types,
    ["search_result", "text"],
    `blocks sent upstream: ${JSON.stringify(types)}`
  );
});

test("non-Anthropic target (preserveToolResultBlocks=false) still converts/drops unknown blocks", () => {
  const payload = {
    messages: [
      {
        role: "user",
        content: [
          { type: "search_result", source: "https://x" },
          { type: "text", text: "summarise" },
        ],
      },
    ],
  };
  normalizeClaudeUpstreamMessages(payload, { preserveToolResultBlocks: false });
  const types = (payload.messages as Array<Record<string, unknown>>)[0].content.map(
    (b: Record<string, unknown>) => b.type
  );
  assert.deepEqual(types, ["text"]);
});

// A Claude-format route to a non-Anthropic backend (for example DeepSeek's
// Anthropic-compatible alternate) reaches the same builder. It does not support
// search_result, so the unknown block must still be dropped there, while the
// tool_result block (which it does support) must still pass through.
test("passthrough to a non-Anthropic Claude-format route drops unknown blocks, keeps tool_result", () => {
  const body = {
    model: "deepseek-v4-pro",
    max_tokens: 10,
    messages: [
      {
        role: "user",
        content: [
          { type: "tool_result", tool_use_id: "toolu_1", content: "ok" },
          { type: "search_result", source: "https://x", title: "T", content: [] },
          { type: "text", text: "summarise" },
        ],
      },
    ],
  };
  const out = build(body, "deepseek") as Record<string, unknown>;
  const types = out.messages[0].content.map((b: Record<string, unknown>) => b.type);
  assert.deepEqual(
    types,
    ["tool_result", "text"],
    `blocks sent upstream: ${JSON.stringify(types)}`
  );
});

test("passthrough to the anthropic API-key provider keeps native user blocks", () => {
  const body = {
    model: "claude-sonnet-4-5",
    max_tokens: 10,
    messages: [
      {
        role: "user",
        content: [
          { type: "search_result", source: "https://x", title: "T", content: [] },
          { type: "text", text: "summarise" },
        ],
      },
    ],
  };
  const out = build(body, "anthropic") as Record<string, unknown>;
  const types = out.messages[0].content.map((b: Record<string, unknown>) => b.type);
  assert.deepEqual(types, ["search_result", "text"]);
});
