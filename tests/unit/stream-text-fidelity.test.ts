import assert from "node:assert/strict";
import test from "node:test";
import { sanitizeStreamingChunk } from "../../open-sse/handlers/responseSanitizer.ts";

test("chat streaming preserves meaningful blank lines regardless of upstream delta boundaries", () => {
  const text = '\n\n\nevent: error\ndata: [DONE]\n{"type":"message_stop"}\ne\u0301🙂工具\n\n\n';
  const layouts = [
    [text],
    [text.slice(0, 1), text.slice(1)],
    [text.slice(0, 2), text.slice(2)],
    [...text],
  ];
  for (const deltas of layouts) {
    const output = deltas
      .map((content) => {
        const packet = sanitizeStreamingChunk({
          id: "whitespace-fidelity",
          object: "chat.completion.chunk",
          choices: [{ index: 0, delta: { content }, finish_reason: null }],
        }) as { choices: { delta: { content: string } }[] };
        return packet.choices[0].delta.content;
      })
      .join("");
    assert.equal(
      output,
      text,
      "response sanitization is not permission to rewrite model whitespace"
    );
  }
});
