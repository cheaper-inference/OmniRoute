import test from "node:test";
import assert from "node:assert/strict";
import { buildSynthesizedTextStream } from "../../open-sse/utils/synthesizedTextStream.ts";
import { buildStreamingResponse } from "../../open-sse/executors/gitlabResponses.ts";

for (const content of ["", "Hello ä\nworld"]) {
  test(`synthesized stream preserves wire framing for ${JSON.stringify(content)}`, async () => {
    const response = buildSynthesizedTextStream(content, "model", "id", 123);
    assert.equal(response.status, 200);
    assert.equal(response.headers.get("content-type"), "text/event-stream");
    const deltas = [
      { delta: { role: "assistant" }, finish_reason: null },
      ...(content ? [{ delta: { content }, finish_reason: null }] : []),
      { delta: {}, finish_reason: "stop" },
    ];
    const expected =
      deltas
        .map(
          (choice) =>
            `data: ${JSON.stringify({
              id: "id",
              object: "chat.completion.chunk",
              created: 123,
              model: "model",
              choices: [{ index: 0, ...choice }],
            })}\n\n`
        )
        .join("") + "data: [DONE]\n\n";
    assert.equal(await response.text(), expected);
    assert.equal(await buildStreamingResponse(content, "model", "id", 123).text(), expected);
  });
}
