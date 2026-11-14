import test from "node:test";
import assert from "node:assert/strict";
import { withClientReasoningMetadata } from "../../src/app/api/v1/models/catalogHelpers.ts";

const thinking = (effort_tiers: string[]) => ({ supportsThinking: true, effort_tiers });

test("bare reasoning model advertises its selectable ladder and an unprefixed name", () => {
  const [row] = withClientReasoningMetadata([
    {
      id: "cc/claude-opus-5-5",
      name: "cc/Claude Opus 5.5",
      capabilities: thinking(["low", "medium", "high"]),
    },
  ]);
  assert.deepEqual(row.metadata, {
    display_name: "Claude Opus 5.5",
    supported_reasoning_levels: ["low", "medium", "high"],
    default_reasoning_level: "medium",
  });
});

test("-{effort} variant is pinned to its tier and named after its stem", () => {
  const tiers = ["none", "low", "medium", "high", "xhigh", "max"];
  const rows = withClientReasoningMetadata([
    { id: "cx/gpt-6.1-sol", name: "cx/GPT 6.1 Sol", capabilities: thinking(tiers) },
    { id: "cx/gpt-6.1-sol-xhigh", name: "cx/gpt-6.1-sol (xhigh)", capabilities: thinking(tiers) },
    { id: "agy/gemini-4-argon-high", name: "Gemini 4 Argon (High)", capabilities: thinking(tiers) },
  ]);
  assert.deepEqual(rows[1].metadata, {
    display_name: "GPT 6.1 Sol XHigh",
    supported_reasoning_levels: ["xhigh"],
    default_reasoning_level: "xhigh",
    reasoning_required: true,
  });
  assert.equal(rows[2].metadata.display_name, "Gemini 4 Argon High");
  assert.deepEqual(rows[2].metadata.supported_reasoning_levels, ["high"]);
});

test("-max without a listed stem is a model name, and non-thinking rows declare no reasoning", () => {
  const [qwen, flash] = withClientReasoningMetadata([
    { id: "qw/qwen3-max", name: "Qwen3 Max", capabilities: thinking(["low", "high"]) },
    {
      id: "agy/gemini-3.6-flash-low",
      name: "Gemini 3.6 Flash Low",
      capabilities: { supportsThinking: false },
    },
  ]);
  assert.equal(qwen.metadata.display_name, "Qwen3 Max");
  assert.deepEqual(qwen.metadata.supported_reasoning_levels, ["low", "high"]);
  assert.deepEqual(flash.metadata, { display_name: "Gemini 3.6 Flash Low", reasoning: false });
});

test("a row with no name gets no display_name, so names stay off when the flag strips them", () => {
  const [bare, pinned] = withClientReasoningMetadata([
    { id: "cc/claude-opus-5-5", capabilities: thinking(["low", "medium"]) },
    { id: "cc/claude-opus-5-5-high", capabilities: thinking(["low", "medium"]) },
  ]);
  assert.deepEqual(bare.metadata, {
    supported_reasoning_levels: ["low", "medium"],
    default_reasoning_level: "medium",
  });
  assert.deepEqual(pinned.metadata, {
    supported_reasoning_levels: ["high"],
    default_reasoning_level: "high",
    reasoning_required: true,
  });
});

test("a row with nothing to advertise is returned as is, and existing metadata survives", () => {
  const silent = { id: "x/plain", capabilities: {} };
  const [row, merged] = withClientReasoningMetadata([
    silent,
    { id: "x/named", name: "Named", metadata: { family: "x" }, capabilities: {} },
  ]);
  assert.equal(row, silent);
  assert.deepEqual(merged.metadata, { family: "x", display_name: "Named" });
});
