import { test } from "node:test";
import assert from "node:assert/strict";
import { applyRtkCompression } from "../../../open-sse/services/compression/engines/rtk/index.ts";

// Same text as the sibling rtk-anthropic-tool-result.test.ts (known to be compressible).
const GIT_STATUS = [
  "On branch main",
  "Your branch is up to date with 'origin/main'.",
  "",
  "Changes not staged for commit:",
  '  (use "git add <file>..." to update what will be committed)',
  '  (use "git restore <file>..." to discard changes in working directory)',
  "\tmodified:   src/app.ts",
  "\tmodified:   src/index.ts",
  "",
  "Untracked files:",
  '  (use "git add <file>..." to include in what will be committed)',
  "\tsrc/new.ts",
  "",
  'no changes added to commit (use "git add" and/or "git commit -a")',
].join("\n");
const RTK_ON = { config: { enabled: true, applyToToolResults: true } };
type Block = Record<string, unknown>;

function anthropicBody(results: Block[]): Record<string, unknown> {
  return {
    model: "anthropic/claude-sonnet-4",
    messages: [
      { role: "user", content: "run git status" },
      {
        role: "assistant",
        content: results.map((r) => ({
          type: "tool_use",
          id: r.tool_use_id,
          name: "bash",
          input: { command: "git status" },
        })),
      },
      { role: "user", content: results },
    ],
  };
}
const resultBlocks = (body: Record<string, unknown>): Block[] =>
  (body.messages as Array<{ content: Block[] }>)[2].content;

test("RTK leaves a tool_result with is_error: true untouched (string content)", () => {
  const body = anthropicBody([
    { type: "tool_result", tool_use_id: "toolu_1", is_error: true, content: GIT_STATUS },
  ]);
  const res = applyRtkCompression(body, RTK_ON);
  assert.equal(res.compressed, false);
  assert.equal(res.stats, null);
  assert.equal(res.body, body); // same reference: nothing was rewritten
});

test("RTK leaves a tool_result with is_error: true untouched (text-block content)", () => {
  const body = anthropicBody([
    {
      type: "tool_result",
      tool_use_id: "toolu_1",
      is_error: true,
      content: [{ type: "text", text: GIT_STATUS }],
    },
  ]);
  const res = applyRtkCompression(body, RTK_ON);
  assert.equal(res.compressed, false);
  assert.equal(res.body, body);
});

test("in the same message, the error block stays intact and the non-error sibling is compressed", () => {
  const failed = {
    type: "tool_result",
    tool_use_id: "toolu_1",
    is_error: true,
    content: GIT_STATUS,
  };
  const ok = { type: "tool_result", tool_use_id: "toolu_2", content: GIT_STATUS };
  const res = applyRtkCompression(anthropicBody([failed, ok]), RTK_ON);
  const out = resultBlocks(res.body as Record<string, unknown>);
  assert.equal(res.compressed, true);
  assert.equal(JSON.stringify(out[0]), JSON.stringify(failed));
  assert.ok((out[1].content as string).length < GIT_STATUS.length);
  assert.doesNotMatch(out[1].content as string, /\(use "git add/);
});

test("is_error: false and a missing is_error are still compressed", () => {
  for (const extra of [{ is_error: false }, {}]) {
    const res = applyRtkCompression(
      anthropicBody([
        { type: "tool_result", tool_use_id: "toolu_1", content: GIT_STATUS, ...extra },
      ]),
      RTK_ON
    );
    assert.equal(res.compressed, true);
  }
});

test('only the boolean true protects: is_error: "true" (string) is not an error', () => {
  const res = applyRtkCompression(
    anthropicBody([
      { type: "tool_result", tool_use_id: "toolu_1", is_error: "true", content: GIT_STATUS },
    ]),
    RTK_ON
  );
  assert.equal(res.compressed, true);
});

test('role:"tool" (OpenAI chat) has no error field and is still compressed', () => {
  const res = applyRtkCompression(
    {
      messages: [
        { role: "user", content: "run git status" },
        {
          role: "assistant",
          content: null,
          tool_calls: [
            {
              id: "call_1",
              type: "function",
              function: { name: "bash", arguments: '{"command":"git status"}' },
            },
          ],
        },
        { role: "tool", tool_call_id: "call_1", content: GIT_STATUS },
      ],
    },
    RTK_ON
  );
  assert.equal(res.compressed, true);
});
