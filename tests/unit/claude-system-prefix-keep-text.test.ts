import test from "node:test";
import assert from "node:assert/strict";

import { stripClaudeSystemPrefixBlocks } from "../../open-sse/executors/claudeIdentity.ts";

const SENTINEL = "You are Claude Code, Anthropic's official CLI for Claude.";

test("client instructions in the same block as the sentinel survive", () => {
  const blocks = [{ type: "text", text: `${SENTINEL}\n\nAlways answer in French.` }];
  stripClaudeSystemPrefixBlocks(blocks, SENTINEL);
  assert.deepEqual(blocks, [{ type: "text", text: "Always answer in French." }]);
});

test("a block that is only the sentinel is removed", () => {
  const blocks = [
    { type: "text", text: SENTINEL },
    { type: "text", text: "keep me" },
  ];
  stripClaudeSystemPrefixBlocks(blocks, SENTINEL);
  assert.deepEqual(blocks, [{ type: "text", text: "keep me" }]);
});

test("a sentinel followed only by white space is removed", () => {
  const blocks = [{ type: "text", text: `${SENTINEL}\n\n  ` }];
  stripClaudeSystemPrefixBlocks(blocks, SENTINEL);
  assert.deepEqual(blocks, []);
});

test("the billing header block is removed whole", () => {
  const blocks = [
    {
      type: "text",
      text: "x-anthropic-billing-header: cc_version=2.1.1; cc_entrypoint=cli; cch=00000;",
    },
    { type: "text", text: "client prompt" },
  ];
  stripClaudeSystemPrefixBlocks(blocks, SENTINEL);
  assert.deepEqual(blocks, [{ type: "text", text: "client prompt" }]);
});

test("other block fields are kept when the text is trimmed", () => {
  const blocks = [
    { type: "text", text: `${SENTINEL}\n\nRules.`, cache_control: { type: "ephemeral" } },
  ];
  stripClaudeSystemPrefixBlocks(blocks, SENTINEL);
  assert.deepEqual(blocks, [
    { type: "text", text: "Rules.", cache_control: { type: "ephemeral" } },
  ]);
});
