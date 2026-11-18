/**
 * thinkingReplay capability declaration (modelCompatOverrides entry field).
 *
 * A per-node declaration overrides the provider-prefix assumption about how
 * replayed thinking context must be shaped for an anthropic-compatible
 * upstream:
 *   - default (no declaration): Anthropic-native handling since #18036 — nothing is
 *     synthesized, unsigned thinking is dropped, and manual thinking is disabled when
 *     the final tool turn carries no genuine thinking block
 *   - "none": synthesize nothing, drop nothing, keep thinking enabled
 *   - "text": force the plain-text branch (plain `thinking`, never `redacted_thinking`)
 *   - null (unset): reverts to the default behavior
 */
import { after, describe, test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-thinking-replay-18739-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { prepareClaudeRequest } = await import("../../open-sse/translator/helpers/claudeHelper.ts");
const { getThinkingReplayOverride } =
  await import("../../open-sse/translator/helpers/thinkingReplayMode.ts");
const { mergeModelCompatOverride, getModelCompatOverrides, writeCompatList } =
  await import("../../src/lib/db/models/compat.ts");

after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

type Block = { type: string; [k: string]: unknown };
type Msg = { role: string; content?: Block[] };
type ToolLoopBody = {
  model: string;
  max_tokens: number;
  thinking?: { type: string; budget_tokens: number };
  tools: unknown[];
  messages: Msg[];
};

const buildToolLoopBody = (model: string, assistantPrefix: Block[] = []): ToolLoopBody => ({
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
        ...assistantPrefix,
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

const run = (provider: string, model: string, assistantPrefix: Block[] = []) =>
  prepareClaudeRequest(
    buildToolLoopBody(model, assistantPrefix) as Parameters<typeof prepareClaudeRequest>[0],
    provider,
    false,
    model
  ) as unknown as ToolLoopBody;

const assistantBlocks = (out: ToolLoopBody): Block[] =>
  out.messages.find((m) => m.role === "assistant")?.content ?? [];

const assistantBlockTypes = (out: ToolLoopBody): string[] =>
  assistantBlocks(out).map((c) => c.type);

// A client-replayed thinking block Anthropic cannot have issued (no signature).
const UNSIGNED_THINKING: Block = { type: "thinking", thinking: "earlier reasoning" };

describe("thinkingReplay capability declaration (modelCompatOverrides)", () => {
  const MODEL = "test-replay-m3";

  test("default (no override): nothing synthesized, manual thinking disabled", () => {
    const out = run("anthropic-compatible-default-node", MODEL);
    assert.deepEqual(assistantBlockTypes(out), ["tool_use"]);
    assert.equal(out.thinking, undefined, "default drops manual thinking without a final block");
  });

  test("default (no override): an unsigned replayed thinking block is dropped", () => {
    const out = run("anthropic-compatible-default-unsigned-node", MODEL, [
      { ...UNSIGNED_THINKING },
    ]);
    assert.deepEqual(assistantBlockTypes(out), ["tool_use"]);
  });

  test('"none": no synthesized precursor, thinking stays enabled', () => {
    const provider = "anthropic-compatible-none-node";
    mergeModelCompatOverride(provider, MODEL, { thinkingReplay: "none" });
    const out = run(provider, MODEL);
    assert.deepEqual(assistantBlockTypes(out), ["tool_use"]);
    assert.equal(out.thinking?.type, "enabled");
  });

  test('"none": a replayed thinking block reaches the upstream untouched', () => {
    const provider = "anthropic-compatible-none-untouched-node";
    mergeModelCompatOverride(provider, MODEL, { thinkingReplay: "none" });
    const out = run(provider, MODEL, [{ ...UNSIGNED_THINKING }]);
    assert.deepEqual(assistantBlocks(out)[0], UNSIGNED_THINKING);
    assert.deepEqual(assistantBlockTypes(out), ["thinking", "tool_use"]);
    assert.equal(out.thinking?.type, "enabled");
  });

  test('"text": plain thinking precursor, never redacted_thinking', () => {
    const provider = "anthropic-compatible-text-node";
    mergeModelCompatOverride(provider, MODEL, { thinkingReplay: "text" });
    const out = run(provider, MODEL);
    const blocks = assistantBlocks(out);
    assert.deepEqual(
      blocks.map((b) => b.type),
      ["thinking", "tool_use"]
    );
    assert.equal(typeof blocks[0].thinking, "string");
    assert.ok((blocks[0].thinking as string).length > 0, "plain thinking text must be non-empty");
    assert.equal(out.thinking?.type, "enabled");
  });

  test('"text": a replayed redacted_thinking block becomes plain thinking', () => {
    const provider = "anthropic-compatible-text-convert-node";
    mergeModelCompatOverride(provider, MODEL, { thinkingReplay: "text" });
    const out = run(provider, MODEL, [{ type: "redacted_thinking", data: "opaque-blob" }]);
    const blocks = assistantBlocks(out);
    assert.equal(blocks[0].type, "thinking");
    assert.equal(blocks[0].data, undefined);
    assert.equal(
      assistantBlockTypes(out).includes("redacted_thinking"),
      false,
      `redacted forbidden in text mode: ${assistantBlockTypes(out)}`
    );
  });

  test("unset (null) reverts to the default behavior", () => {
    const provider = "anthropic-compatible-unset-node";
    mergeModelCompatOverride(provider, MODEL, { thinkingReplay: "none" });
    mergeModelCompatOverride(provider, MODEL, { thinkingReplay: null });
    assert.equal(
      getModelCompatOverrides(provider).some((e) => e.id === MODEL),
      false,
      "an entry carrying only thinkingReplay is removed once unset"
    );
    const out = run(provider, MODEL);
    assert.deepEqual(assistantBlockTypes(out), ["tool_use"]);
    assert.equal(out.thinking, undefined);
  });
});

describe("getThinkingReplayOverride", () => {
  test("matches the exact model id and its leaf after a routing prefix", () => {
    const provider = "anthropic-compatible-reader-node";
    mergeModelCompatOverride(provider, "leaf-model", { thinkingReplay: "text" });
    assert.equal(getThinkingReplayOverride(provider, "leaf-model"), "text");
    assert.equal(getThinkingReplayOverride(provider, "vendor/leaf-model"), "text");
    assert.equal(getThinkingReplayOverride(provider, "other-model"), null);
  });

  test("ignores an invalid persisted value and a missing provider/model", () => {
    const provider = "anthropic-compatible-reader-invalid-node";
    mergeModelCompatOverride(provider, "m", {
      thinkingReplay: "bogus" as unknown as "none",
      supportsVision: true,
    });
    assert.equal(getModelCompatOverrides(provider)[0]?.thinkingReplay, undefined);
    // A hand-written key_value row with an unknown mode is ignored by the reader.
    const planted = "anthropic-compatible-reader-planted-node";
    writeCompatList(planted, [{ id: "m", thinkingReplay: "bogus" as unknown as "none" }]);
    assert.equal(getThinkingReplayOverride(planted, "m"), null);
    assert.equal(getThinkingReplayOverride(provider, "m"), null);
    assert.equal(getThinkingReplayOverride(null, "m"), null);
    assert.equal(getThinkingReplayOverride(provider, ""), null);
  });
});
