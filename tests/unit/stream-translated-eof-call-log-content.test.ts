import test from "node:test";
import assert from "node:assert/strict";
import { createSSEStream } from "../../open-sse/utils/stream.ts";

const body = { messages: [{ role: "user", content: "synthetic" }] };

for (const format of ["claude", "gemini", "openai-responses"]) {
  for (const ending of ["", "\n", "\n\n"]) {
    test(`${format} translated tail accumulates once, ending=${JSON.stringify(ending)}`, async () => {
      let responseBody: unknown;
      const frame = (text: string) =>
        format === "claude"
          ? { type: "content_block_delta", index: 0, delta: { type: "text_delta", text } }
          : format === "gemini"
            ? { candidates: [{ index: 0, content: { role: "model", parts: [{ text }] } }] }
            : {
                type: "response.output_text.delta",
                item_id: "msg_synthetic",
                output_index: 0,
                content_index: 0,
                delta: text,
              };
      const stream = createSSEStream({
        mode: "translate",
        targetFormat: format,
        sourceFormat: "openai",
        provider: format,
        body,
        onComplete(value) {
          responseBody = value.responseBody;
        },
      });
      const wire = await new Response(
        new Response(
          `data: ${JSON.stringify(frame("Hello "))}\n\ndata: ${JSON.stringify(frame("world"))}${ending}`
        ).body!.pipeThrough(stream)
      ).text();
      assert.ok(wire.includes("world"));
      assert.equal(
        (responseBody as { choices: Array<{ message: { content: string } }> }).choices[0].message
          .content,
        "Hello world"
      );
    });
  }
}
