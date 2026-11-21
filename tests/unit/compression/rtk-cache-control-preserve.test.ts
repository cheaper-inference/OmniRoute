import { test } from "node:test";
import assert from "node:assert/strict";
import { applyRtkCompression } from "../../../open-sse/services/compression/engines/rtk/index.ts";

// Regression (#3936, revisited): `cache_control` is provider METADATA, not content. Claude Code
// moves its breakpoint to a newer message on every request (rolling marker), so the block that
// carried yesterday's breakpoint is unmarked today. While RTK skipped marked blocks, that block
// flipped "preserved raw -> compressed" one turn later — rewriting exactly the last block covered
// by the previous cache entry, so the provider could no longer match the prefix and re-billed the
// whole history (measured on a live gateway: read collapses to the system breakpoint only).
// The invariant that keeps a cached prefix stable is: the transformed bytes must be a pure
// function of the content, independent of where the marker sits. Markers are carried through.

const GIT_STATUS = `On branch main
Your branch is up to date with 'origin/main'.

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   src/app.ts
        modified:   src/lib/util.ts

Untracked files:
  (use "git add <file>..." to include in what will be committed)
        src/new.ts

no changes added to commit (use "git add" and/or "git commit -a")`;

function toolResult(content: string, extra: Record<string, unknown> = {}) {
  return { type: "tool_result", tool_use_id: "toolu_1", content, ...extra };
}

function anthropicBody(toolResultBlock: Record<string, unknown>) {
  return {
    model: "anthropic/claude-sonnet-4",
    messages: [
      { role: "user", content: "run git status" },
      {
        role: "assistant",
        content: [
          { type: "tool_use", id: "toolu_1", name: "bash", input: { command: "git status" } },
        ],
      },
      { role: "user", content: [toolResultBlock] },
    ],
  } as Record<string, unknown>;
}

// Pull the single tool_result block out of message[2].content[0] with a typed shape (no `any`).
function toolResultBlock(body: Record<string, unknown>): Record<string, unknown> {
  const messages = body.messages as Array<{ content: Array<Record<string, unknown>> }>;
  return messages[2].content[0];
}

/** Two-turn Claude Code body: `markerAt` is the message index carrying the breakpoint. */
function rollingBody(markerAt: number) {
  const messages: Array<Record<string, unknown>> = [
    { role: "user", content: "run git status twice" },
    {
      role: "assistant",
      content: [
        { type: "tool_use", id: "toolu_1", name: "bash", input: { command: "git status" } },
      ],
    },
    { role: "user", content: [toolResult(GIT_STATUS)] },
    {
      role: "assistant",
      content: [
        { type: "tool_use", id: "toolu_2", name: "bash", input: { command: "git status" } },
      ],
    },
    { role: "user", content: [toolResult(`${GIT_STATUS}\n`)] },
  ];
  const block = (messages[markerAt].content as Array<Record<string, unknown>>)[0];
  block.cache_control = { type: "ephemeral" };
  return { model: "anthropic/claude-sonnet-4", messages } as Record<string, unknown>;
}

function compress(body: Record<string, unknown>) {
  return applyRtkCompression(body, { config: { enabled: true, applyToToolResults: true } });
}

test("a cache_control marker does not change the compressed text", () => {
  const marked = compress(
    anthropicBody(toolResult(GIT_STATUS, { cache_control: { type: "ephemeral" } }))
  );
  const plain = compress(anthropicBody(toolResult(GIT_STATUS)));

  const markedBlock = toolResultBlock(marked.body as Record<string, unknown>);
  const plainBlock = toolResultBlock(plain.body as Record<string, unknown>);

  assert.equal(marked.compressed, true, "a marked block must still be compressed");
  assert.equal(
    markedBlock.content,
    plainBlock.content,
    "the marker must not change the compressed text"
  );
  assert.deepEqual(
    markedBlock.cache_control,
    { type: "ephemeral" },
    "the marker must be carried through"
  );
});

test("an inner text sub-block keeps its marker and is compressed identically", () => {
  const marked = compress(
    anthropicBody({
      type: "tool_result",
      tool_use_id: "toolu_1",
      content: [{ type: "text", text: GIT_STATUS, cache_control: { type: "ephemeral" } }],
    })
  );
  const plain = compress(
    anthropicBody({
      type: "tool_result",
      tool_use_id: "toolu_1",
      content: [{ type: "text", text: GIT_STATUS }],
    })
  );

  const inner = (body: Record<string, unknown>) =>
    (toolResultBlock(body).content as Array<Record<string, unknown>>)[0];
  const markedInner = inner(marked.body as Record<string, unknown>);
  const plainInner = inner(plain.body as Record<string, unknown>);

  assert.equal(markedInner.text, plainInner.text, "the marker must not change the compressed text");
  assert.deepEqual(
    markedInner.cache_control,
    { type: "ephemeral" },
    "the marker must be carried through"
  );
});

test("the transformed prefix is stable when the rolling breakpoint moves", () => {
  // Turn 1: breakpoint on message 2 (the tool result just produced).
  const turnA = compress(rollingBody(2));
  // Turn 2: breakpoint rolled to message 4 — message 2 is no longer marked. Same content.
  const turnB = compress(rollingBody(4));

  const contentOf = (body: Record<string, unknown>, index: number) =>
    JSON.stringify(
      (body.messages as Array<Record<string, unknown>>)[index].content,
      (key, value) => (key === "cache_control" ? undefined : value)
    );

  for (const index of [0, 1, 2]) {
    assert.equal(
      contentOf(turnA.body as Record<string, unknown>, index),
      contentOf(turnB.body as Record<string, unknown>, index),
      `message #${index} changed when the breakpoint moved — the cached prefix would be invalidated`
    );
  }
});

test("RTK still compresses tool_result blocks WITHOUT cache_control (no over-protection)", () => {
  const res = compress(anthropicBody(toolResult(GIT_STATUS)));
  const after = toolResultBlock(res.body as Record<string, unknown>).content as string;

  assert.equal(res.compressed, true, "unmarked tool_result should still compress");
  assert.ok(!after.includes('(use "git add'), "hint lines should be dropped");
});
