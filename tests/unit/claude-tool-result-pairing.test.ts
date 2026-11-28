import { describe, test } from "node:test";
import assert from "node:assert/strict";

import { FORMATS } from "../../open-sse/translator/formats.ts";
import { translateRequest } from "../../open-sse/translator/index.ts";
import { prepareClaudeRequest } from "../../open-sse/translator/helpers/claudeHelper.ts";
import { resetDbInstance } from "../../src/lib/db/core.ts";

test.after(() => resetDbInstance());

function translate(body: Record<string, unknown>) {
  return translateRequest(
    FORMATS.OPENAI,
    FORMATS.CLAUDE,
    "claude-fable-5",
    body,
    true,
    null,
    "github"
  ) as { messages: Array<{ role: string; content: Array<Record<string, unknown>> }> };
}

describe("Claude tool result pairing", () => {
  test("salvages orphaned results and fills missing parallel results", () => {
    const out = translate({
      messages: [
        { role: "user", content: "run" },
        {
          role: "assistant",
          content: null,
          tool_calls: [
            {
              id: "call-valid",
              type: "function",
              function: { name: "exec", arguments: "{}" },
            },
            {
              id: "call-missing",
              type: "function",
              function: { name: "read", arguments: "{}" },
            },
          ],
        },
        { role: "tool", tool_call_id: "call-valid", content: "valid output" },
        { role: "tool", tool_call_id: "call-orphan", content: "orphan output" },
        { role: "user", content: "continue" },
      ],
    });

    const assistantIndex = out.messages.findIndex(
      (message) =>
        message.role === "assistant" &&
        message.content.some((block) => block.type === "tool_use" && block.id === "call-valid")
    );
    const resultMessage = out.messages[assistantIndex + 1];
    assert.ok(resultMessage, "expected a user result message after the tool-use turn");
    const structuredResults = resultMessage.content.filter((block) => block.type === "tool_result");

    assert.deepEqual(
      structuredResults.map((block) => block.tool_use_id),
      ["call-valid", "call-missing"]
    );
    assert.equal(structuredResults[1].content, "");
    assert.match(JSON.stringify(resultMessage.content), /valid output/);
    assert.match(JSON.stringify(resultMessage.content), /orphan output/);
  });

  test("salvages an orphaned result when it is the only message", () => {
    const out = prepareClaudeRequest(
      {
        model: "claude-fable-5",
        messages: [
          {
            role: "user",
            content: [{ type: "tool_result", tool_use_id: "call-orphan", content: "only output" }],
          },
        ],
      },
      "github"
    );

    assert.equal(
      out.messages?.[0]?.content instanceof Array &&
        out.messages[0].content.some((block) => block.type === "tool_result"),
      false
    );
    assert.match(JSON.stringify(out.messages?.[0]?.content), /only output/);
  });

  test("keeps orphaned text in order and leaves paired results structured", () => {
    const image = {
      type: "image",
      source: { type: "base64", media_type: "image/png", data: "aW1hZ2U=" },
    };
    const resultBlocks = [
      { type: "text", text: "first output" },
      image,
      { type: "text", text: "second output" },
    ];
    const pairedResult = { type: "tool_result", tool_use_id: "call-valid", content: resultBlocks };
    const expectedPairedResult = structuredClone(pairedResult);
    const out = prepareClaudeRequest(
      {
        messages: [
          {
            role: "assistant",
            content: [{ type: "tool_use", id: "call-valid", name: "capture", input: {} }],
          },
          {
            role: "user",
            content: [
              { type: "tool_result", tool_use_id: "call-orphan", content: resultBlocks },
              pairedResult,
              { type: "tool_result", tool_use_id: "call-image-only", content: [image] },
            ],
          },
        ],
      },
      "github"
    );

    assert.deepEqual(out.messages?.[1]?.content, [
      expectedPairedResult,
      { type: "text", text: "[Unpaired tool result call-orphan]\nfirst output\nsecond output" },
      { type: "text", text: "[Unpaired tool result call-image-only]" },
    ]);
  });

  test("keeps only text from an unmatched OpenAI tool message when translating to Claude", () => {
    const out = translate({
      messages: [
        {
          role: "tool",
          tool_call_id: "call-orphan",
          content: [
            { type: "text", text: "first output" },
            { type: "image_url", image_url: { url: "data:image/png;base64,aW1hZ2U=" } },
            { type: "text", text: "second output" },
          ],
        },
      ],
    });

    assert.deepEqual(out.messages, [
      {
        role: "user",
        content: [
          { type: "text", text: "[Unpaired tool result call-orphan]\nfirst output\nsecond output" },
        ],
      },
    ]);
  });
});
