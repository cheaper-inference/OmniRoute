import test from "node:test";
import assert from "node:assert/strict";

import { createResponsesApiTransformStream } from "../../open-sse/transformer/responsesTransformer.ts";

async function run(chunks: string[]): Promise<string> {
  const stream = createResponsesApiTransformStream(null, 3_600_000);
  const writer = stream.writable.getWriter();
  const reader = stream.readable.getReader();
  const decoder = new TextDecoder();
  const read = (async () => {
    let text = "";
    for (;;) {
      const { value, done } = await reader.read();
      if (done) return text;
      text += decoder.decode(value);
    }
  })();
  for (const chunk of chunks) await writer.write(new TextEncoder().encode(chunk));
  await writer.close();
  return read;
}

const frame = (delta: Record<string, unknown>, finish: string | null, eol: string) =>
  `data: ${JSON.stringify({
    id: "c1",
    object: "chat.completion.chunk",
    model: "m",
    choices: [{ index: 0, delta, finish_reason: finish }],
  })}${eol}`;

for (const [name, eol] of [
  ["LF", "\n\n"],
  ["CRLF", "\r\n\r\n"],
] as const) {
  test(`every ${name}-framed chunk reaches the output`, async () => {
    const out = await run([
      frame({ content: "AAA" }, null, eol),
      frame({ content: "BBB" }, null, eol),
      frame({}, "stop", eol),
      `data: [DONE]${eol}`,
    ]);
    assert.ok(out.includes("AAA"), "first text chunk");
    assert.ok(out.includes("BBB"), "second text chunk");
    assert.match(out, /response\.completed/);
  });
}

test("a CRLF frame split across two writes is joined", async () => {
  const whole = frame({ content: "AAA" }, null, "\r\n\r\n");
  const cut = whole.indexOf("\r\n\r\n") + 1;
  const out = await run([whole.slice(0, cut), whole.slice(cut), frame({}, "stop", "\r\n\r\n")]);
  assert.ok(out.includes("AAA"));
});
