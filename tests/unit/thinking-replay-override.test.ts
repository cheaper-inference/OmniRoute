/**
 * thinkingReplay capability declaration (modelCompatOverrides entry field).
 *
 * A per-node declaration overrides the provider-prefix assumption about how
 * replayed thinking context must be shaped for an anthropic-compatible
 * upstream:
 *   - default (no declaration): previous behavior — a synthesized
 *     redacted_thinking precursor before tool_use when thinking is enabled
 *   - "none": synthesize nothing, leave replayed blocks untouched
 *   - "text": force the plain-text branch (no redacted blob)
 *   - null (unset): reverts to the default behavior
 */
import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { prepareClaudeRequest } from "../../open-sse/translator/helpers/claudeHelper.ts";
import { mergeModelCompatOverride } from "../../src/lib/db/models/compat.ts";

type Block = { type: string; [k: string]: unknown };
type Msg = { role: string; content?: Block[] };
type ToolLoopBody = {
  model: string;
  max_tokens: number;
  thinking: { type: string; budget_tokens: number };
  tools: unknown[];
  messages: Msg[];
};

const buildToolLoopBody = (model: string): ToolLoopBody => ({
  model,
  max_tokens: 2048,
  thinking: { type: "enabled", budget_tokens: 1024 },
  tools: [
    {
      name: "proxy_probe_tool",
      description: "t",
      input_schema: { type: "object", properties: { x: { type: "number" } } },
    },
  ],
  messages: [
    { role: "user", content: [{ type: "text", text: "call the tool" }] },
    {
      role: "assistant",
      content: [
        { type: "tool_use", id: "call_probe_01", name: "proxy_probe_tool", input: { x: 1 } },
      ],
    },
    {
      role: "user",
      content: [{ type: "tool_result", tool_use_id: "call_probe_01", content: "42" }],
    },
    { role: "user", content: [{ type: "text", text: "now reply ok" }] },
  ],
});

const assistantBlockTypes = (out: unknown): string[] => {
  const messages = (out as { messages?: Msg[] }).messages ?? [];
  const assistant = messages.find((m) => m.role === "assistant");
  return (assistant?.content ?? []).map((c) => c.type);
};

describe("thinkingReplay capability declaration (modelCompatOverrides)", () => {
  const MODEL = "test-replay-m3";

  test("default (no override): anthropic-compatible node still gets redacted_thinking precursor", () => {
    const provider = "anthropic-compatible-default-node";
    const out = prepareClaudeRequest(
      buildToolLoopBody(MODEL) as Parameters<typeof prepareClaudeRequest>[0],
      provider,
      false,
      MODEL
    );
    const types = assistantBlockTypes(out);
    assert.ok(types.includes("redacted_thinking"), `expected redacted precursor, got ${types}`);
  });

  test('"none": no synthesized precursor at all, history untouched', () => {
    const provider = "anthropic-compatible-none-node";
    mergeModelCompatOverride(provider, MODEL, { thinkingReplay: "none" });
    const out = prepareClaudeRequest(
      buildToolLoopBody(MODEL) as Parameters<typeof prepareClaudeRequest>[0],
      provider,
      false,
      MODEL
    );
    const types = assistantBlockTypes(out);
    assert.equal(
      types.includes("redacted_thinking"),
      false,
      `must not synthesize redacted: ${types}`
    );
    assert.equal(types.includes("thinking"), false, `must not synthesize placeholder: ${types}`);
    assert.deepEqual(types, ["tool_use"]);
  });

  test('"text": plain-text branch instead of redacted (placeholder ok)', () => {
    const provider = "anthropic-compatible-text-node";
    mergeModelCompatOverride(provider, MODEL, { thinkingReplay: "text" });
    const out = prepareClaudeRequest(
      buildToolLoopBody(MODEL) as Parameters<typeof prepareClaudeRequest>[0],
      provider,
      false,
      MODEL
    );
    const types = assistantBlockTypes(out);
    assert.equal(
      types.includes("redacted_thinking"),
      false,
      `redacted forbidden in text mode: ${types}`
    );
    assert.ok(types.includes("thinking"), `plain thinking expected: ${types}`);
  });

  test("unset (null) reverts to default redacted behavior", () => {
    const provider = "anthropic-compatible-unset-node";
    mergeModelCompatOverride(provider, MODEL, { thinkingReplay: "none" });
    mergeModelCompatOverride(provider, MODEL, { thinkingReplay: null });
    const out = prepareClaudeRequest(
      buildToolLoopBody(MODEL) as Parameters<typeof prepareClaudeRequest>[0],
      provider,
      false,
      MODEL
    );
    const types = assistantBlockTypes(out);
    assert.ok(types.includes("redacted_thinking"), `default restored: ${types}`);
  });
});
