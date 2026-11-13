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

const frame = (delta: Record<string, unknown>, finish: string | null = null) =>
  `data: ${JSON.stringify({
    id: "c1",
    object: "chat.completion.chunk",
    model: "m",
    choices: [{ index: 0, delta, finish_reason: finish }],
  })}\n\n`;

type Item = { type?: string; id?: string; summary?: Array<{ text?: string }> };
type Event = {
  event: string;
  data: {
    item?: Item;
    item_id?: string;
    output_index?: number;
    response?: { output?: Item[] };
  };
};
function events(out: string): Event[] {
  return [...out.matchAll(/event: (\S+)\ndata: (.*)\n/g)].map((m) => ({
    event: m[1],
    data: JSON.parse(m[2]),
  }));
}

const REASON_CONTENT_REASON = [
  frame({ reasoning_content: "first thought" }),
  frame({ content: "answer" }),
  frame({ reasoning_content: "second thought" }),
  frame({}, "stop"),
  "data: [DONE]\n\n",
];

test("no reasoning delta is sent for an item that is already done", async () => {
  const list = events(await run(REASON_CONTENT_REASON));
  const closed = new Set<string>();
  for (const e of list) {
    if (e.event === "response.output_item.done" && e.data.item?.type === "reasoning") {
      closed.add(String(e.data.item.id));
    }
    if (e.event === "response.reasoning_summary_text.delta") {
      assert.ok(!closed.has(String(e.data.item_id)), `delta after done for ${e.data.item_id}`);
    }
  }
});

test("the final output keeps the text of both reasoning items", async () => {
  const list = events(await run(REASON_CONTENT_REASON));
  const completed = list.find((e) => e.event === "response.completed");
  const texts = (completed?.data.response?.output ?? [])
    .filter((item) => item.type === "reasoning")
    .map((item) => item.summary?.[0]?.text);
  assert.deepEqual(texts, ["first thought", "second thought"]);
});

test("reasoning items and the message use distinct output indexes", async () => {
  const list = events(await run(REASON_CONTENT_REASON));
  const added = list
    .filter((e) => e.event === "response.output_item.added")
    .map((e) => e.data.output_index);
  assert.equal(new Set(added).size, added.length, `indexes ${JSON.stringify(added)}`);
});

test("continuous reasoning stays in one item", async () => {
  const list = events(
    await run([
      frame({ reasoning_content: "a" }),
      frame({ reasoning_content: "b" }),
      frame({ content: "x" }),
      frame({}, "stop"),
      "data: [DONE]\n\n",
    ])
  );
  const items = list.filter(
    (e) => e.event === "response.output_item.added" && e.data.item?.type === "reasoning"
  );
  assert.equal(items.length, 1);
});
