import test from "node:test";
import assert from "node:assert/strict";

/**
 * Responses → Claude streaming: a reasoning summary must reach the Claude client once,
 * and never as a visible text block on a tool-call turn.
 *
 * Two bugs combined on GitHub Copilot (gpt-6*-sol via the Responses API):
 *   1. Copilot rotates the encrypted reasoning item id between events, so the id-keyed
 *      dedupe in openai-responses.ts missed and `output_item.done` re-emitted the summary.
 *   2. FIX B in openai-to-claude.ts (reasoning-only reply → synthesize a text block for
 *      Claude Code's autocompact parser) also fired on tool-call turns, so the doubled
 *      summary leaked into the transcript as assistant text.
 */

const { translateResponse, initState } = await import("../../open-sse/translator/index.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");

const REASONING_ID = "rs_1";
const ROTATED_REASONING_ID = "rs_1_rotated";
const CALL_ITEM_ID = "fc_1";
const SUMMARY = "**Planning the next step**\n\nI need to read both files first.";
const MARKER = "Planning the next step";
const ARGS = '{"file_path":"/x"}';

function buildEvents({ doneId, withTool = true, withDeltas = true }) {
  const summaryEvents = withDeltas
    ? [
        {
          type: "response.reasoning_summary_part.added",
          item_id: REASONING_ID,
          output_index: 0,
          summary_index: 0,
          part: { type: "summary_text", text: "" },
        },
        {
          type: "response.reasoning_summary_text.delta",
          item_id: REASONING_ID,
          output_index: 0,
          summary_index: 0,
          delta: SUMMARY.slice(0, 30),
        },
        {
          type: "response.reasoning_summary_text.delta",
          item_id: REASONING_ID,
          output_index: 0,
          summary_index: 0,
          delta: SUMMARY.slice(30),
        },
        {
          type: "response.reasoning_summary_text.done",
          item_id: REASONING_ID,
          output_index: 0,
          summary_index: 0,
          text: SUMMARY,
        },
        {
          type: "response.reasoning_summary_part.done",
          item_id: REASONING_ID,
          output_index: 0,
          summary_index: 0,
          part: { type: "summary_text", text: SUMMARY },
        },
      ]
    : [];
  const toolEvents = withTool
    ? [
        {
          type: "response.output_item.added",
          output_index: 1,
          item: {
            id: CALL_ITEM_ID,
            type: "function_call",
            call_id: "call_1",
            name: "Read",
            arguments: "",
          },
        },
        {
          type: "response.function_call_arguments.delta",
          item_id: CALL_ITEM_ID,
          output_index: 1,
          delta: ARGS,
        },
        {
          type: "response.function_call_arguments.done",
          item_id: CALL_ITEM_ID,
          output_index: 1,
          arguments: ARGS,
        },
        {
          type: "response.output_item.done",
          output_index: 1,
          item: {
            id: CALL_ITEM_ID,
            type: "function_call",
            call_id: "call_1",
            name: "Read",
            arguments: ARGS,
            status: "completed",
          },
        },
      ]
    : [];
  const completedOutput = [
    { id: REASONING_ID, type: "reasoning", summary: [{ type: "summary_text", text: SUMMARY }] },
    ...(withTool
      ? [
          {
            id: CALL_ITEM_ID,
            type: "function_call",
            call_id: "call_1",
            name: "Read",
            arguments: ARGS,
          },
        ]
      : []),
  ];
  return [
    { type: "response.created", response: { id: "resp_1", model: "gpt-test", output: [] } },
    {
      type: "response.output_item.added",
      output_index: 0,
      item: { id: REASONING_ID, type: "reasoning", summary: [] },
    },
    ...summaryEvents,
    {
      type: "response.output_item.done",
      output_index: 0,
      item: {
        id: doneId,
        type: "reasoning",
        summary: [{ type: "summary_text", text: SUMMARY }],
        encrypted_content: "enc",
      },
    },
    ...toolEvents,
    {
      type: "response.completed",
      response: {
        id: "resp_1",
        model: "gpt-test",
        status: "completed",
        output: completedOutput,
        usage: { input_tokens: 10, output_tokens: 5 },
      },
    },
  ];
}

function translateToClaudeBlocks(events, requestedThinking) {
  const state = { ...initState(FORMATS.CLAUDE), requestedThinking };
  const out = [];
  for (const event of events) {
    out.push(...(translateResponse(FORMATS.OPENAI_RESPONSES, FORMATS.CLAUDE, event, state) || []));
  }
  out.push(...(translateResponse(FORMATS.OPENAI_RESPONSES, FORMATS.CLAUDE, null, state) || []));

  const blocks = new Map();
  for (const chunk of out) {
    if (chunk?.type === "content_block_start") {
      const block = chunk.content_block;
      blocks.set(chunk.index, { type: block.type, text: block.text || block.thinking || "" });
    }
    if (chunk?.type === "content_block_delta") {
      const delta = chunk.delta;
      blocks.get(chunk.index).text += delta.text ?? delta.thinking ?? delta.partial_json ?? "";
    }
  }
  return [...blocks.values()];
}

const copies = (text) => text.split(MARKER).length - 1;
const ofType = (blocks, type) => blocks.filter((b) => b.type === type);

for (const [label, doneId] of [
  ["rotated", ROTATED_REASONING_ID],
  ["stable", REASONING_ID],
]) {
  test(`tool-call turn, thinking not requested, ${label} id: reasoning is not leaked as text`, () => {
    const blocks = translateToClaudeBlocks(buildEvents({ doneId }), false);
    assert.deepEqual(ofType(blocks, "text"), []);
    assert.equal(ofType(blocks, "tool_use").length, 1);
  });
}

for (const requestedThinking of [undefined, true]) {
  test(`tool-call turn, requestedThinking=${requestedThinking}, rotated id: one thinking copy`, () => {
    const blocks = translateToClaudeBlocks(
      buildEvents({ doneId: ROTATED_REASONING_ID }),
      requestedThinking
    );
    const thinking = ofType(blocks, "thinking");
    assert.equal(thinking.length, 1);
    assert.equal(copies(thinking[0].text), 1);
    assert.deepEqual(ofType(blocks, "text"), []);
  });

  test(`reasoning-only reply, requestedThinking=${requestedThinking}, rotated id: one thinking copy`, () => {
    const blocks = translateToClaudeBlocks(
      buildEvents({ doneId: ROTATED_REASONING_ID, withTool: false }),
      requestedThinking
    );
    const thinking = ofType(blocks, "thinking");
    assert.equal(thinking.length, 1);
    assert.equal(copies(thinking[0].text), 1);
  });
}

test("reasoning-only reply, thinking not requested, rotated id: FIX B text block holds one copy", () => {
  const blocks = translateToClaudeBlocks(
    buildEvents({ doneId: ROTATED_REASONING_ID, withTool: false }),
    false
  );
  const text = ofType(blocks, "text");
  assert.equal(text.length, 1);
  assert.equal(copies(text[0].text), 1);
});

test("reasoning only in output_item.done (no deltas), tool-call turn: still synthesized once", () => {
  const blocks = translateToClaudeBlocks(
    buildEvents({ doneId: ROTATED_REASONING_ID, withDeltas: false }),
    true
  );
  const thinking = ofType(blocks, "thinking");
  assert.equal(thinking.length, 1);
  assert.equal(copies(thinking[0].text), 1);
});
