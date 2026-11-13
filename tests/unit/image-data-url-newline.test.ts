import test from "node:test";
import assert from "node:assert/strict";

import { urlToClaudeImageBlock } from "../../open-sse/translator/request/openai-to-claude/imageBlocks.ts";
import { openaiToClaudeRequest } from "../../open-sse/translator/request/openai-to-claude.ts";

test("a wrapped base64 data URL becomes a base64 image block without the line breaks", () => {
  const block = urlToClaudeImageBlock("data:image/png;base64,AAAA\nBBBB\r\nCCCC");
  assert.deepEqual(block, {
    type: "image",
    source: { type: "base64", media_type: "image/png", data: "AAAABBBBCCCC" },
  });
});

test("a plain data URL and an https URL keep their old blocks", () => {
  assert.deepEqual(urlToClaudeImageBlock("data:image/png;base64,AAAA"), {
    type: "image",
    source: { type: "base64", media_type: "image/png", data: "AAAA" },
  });
  assert.deepEqual(urlToClaudeImageBlock("https://example.test/a.png"), {
    type: "image",
    source: { type: "url", url: "https://example.test/a.png" },
  });
});

test("a wrapped base64 file part is attached, not dropped", () => {
  const out = openaiToClaudeRequest(
    "claude-sonnet-4-5",
    {
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: "see" },
            {
              type: "file",
              file: { filename: "a.pdf", file_data: "data:application/pdf;base64,JVBE\nRi0x" },
            },
          ],
        },
      ],
    },
    false
  ) as { messages: Array<{ content: Array<{ type?: string; source?: { data?: string } }> }> };
  const doc = out.messages[0].content.find((block) => block.type === "document");
  assert.ok(doc, "the document block must exist");
  assert.equal(doc.source?.data, "JVBERi0x");
});
