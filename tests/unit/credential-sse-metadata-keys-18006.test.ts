import test from "node:test";
import assert from "node:assert/strict";
import { createCredentialSseTransform } from "../../src/lib/streamingCredentialTransform.ts";
import { classifyField } from "../../src/lib/sseTextTransform.ts";

async function run(transform: TransformStream, chunks: string[]): Promise<string> {
  const writer = transform.writable.getWriter();
  const reader = transform.readable.getReader();
  const w = (async () => {
    for (const c of chunks) await writer.write(new TextEncoder().encode(c));
    await writer.close();
  })();
  const out: string[] = [];
  let r = await reader.read();
  while (!r.done) {
    out.push(new TextDecoder().decode(r.value));
    r = await reader.read();
  }
  await w;
  return out.join("");
}

type SseEvent = {
  type?: string;
  request_id?: string;
  message?: { usage: Record<string, string> };
  delta?: { type?: string; text?: string; signature?: string };
  choices?: Array<{ delta?: { content?: string } }>;
};

function dataEvents(sse: string): SseEvent[] {
  return sse
    .split("\n")
    .filter((l) => l.startsWith("data: ") && l.slice(6).trim().startsWith("{"))
    .map((l) => JSON.parse(l.slice(6)));
}

const ANTHROPIC_STREAM = [
  `event: message_start\ndata: {"type":"message_start","message":{"id":"msg_1","type":"message","role":"assistant","model":"claude-opus-5-5","content":[],"usage":{"input_tokens":5,"output_tokens":1,"service_tier":"standard","inference_geo":"global","speed":"standard"}}}\n\n`,
  `event: content_block_start\ndata: {"type":"content_block_start","index":0,"content_block":{"type":"thinking","thinking":""}}\n\n`,
  `event: content_block_delta\ndata: {"type":"content_block_delta","index":0,"delta":{"type":"signature_delta","signature":"EqQBCkYIARgCKkAbc123SIG"}}\n\n`,
  `event: content_block_stop\ndata: {"type":"content_block_stop","index":0}\n\n`,
  `event: content_block_start\ndata: {"type":"content_block_start","index":1,"content_block":{"type":"text","text":""}}\n\n`,
  `event: content_block_delta\ndata: {"type":"content_block_delta","index":1,"delta":{"type":"text_delta","text":"OK"}}\n\n`,
  `event: content_block_stop\ndata: {"type":"content_block_stop","index":1}\n\n`,
  `event: message_delta\ndata: {"type":"message_delta","delta":{"stop_reason":"end_turn","stop_sequence":null},"usage":{"output_tokens":3,"inference_geo":"global","speed":"standard"}}\n\n`,
  `event: message_stop\ndata: {"type":"message_stop"}\n\n`,
];

test("#18006 classifyField treats Anthropic usage/signature metadata as non-content", () => {
  assert.equal(classifyField("inference_geo", "usage"), null);
  assert.equal(classifyField("speed", "usage"), null);
  assert.equal(classifyField("signature", "delta"), null);
});

test("#18006 credential SSE transform leaves Anthropic metadata untouched and text clean", async () => {
  const out = await run(createCredentialSseTransform(), ANTHROPIC_STREAM);
  const events = dataEvents(out);
  const start = events.find((e) => e.type === "message_start");
  assert.equal(start!.message!.usage.inference_geo, "global", "message_start inference_geo");
  assert.equal(start!.message!.usage.speed, "standard", "message_start speed");
  const sig = events.find((e) => e.delta?.type === "signature_delta");
  assert.equal(sig!.delta!.signature, "EqQBCkYIARgCKkAbc123SIG", "signature_delta preserved");
  const text = events
    .filter((e) => e.delta?.type === "text_delta")
    .map((e) => e.delta?.text ?? "")
    .join("");
  assert.equal(text, "OK", "text deltas contain only model text");
});

test("#18006 comment: request_id on OpenAI chunks stays out of content", async () => {
  assert.equal(classifyField("request_id", ""), null);
  const chunks = [
    `data: {"id":"c1","request_id":"req-abc123","object":"chat.completion.chunk","choices":[{"index":0,"delta":{"content":"你好"}}]}\n\n`,
    `data: {"id":"c1","request_id":"req-abc123","object":"chat.completion.chunk","choices":[{"index":0,"delta":{},"finish_reason":"stop"}]}\n\n`,
    `data: [DONE]\n\n`,
  ];
  const out = await run(createCredentialSseTransform(), chunks);
  const events = dataEvents(out);
  const content = events.map((e) => e.choices?.[0]?.delta?.content ?? "").join("");
  assert.equal(content, "你好");
  assert.equal(events[0].request_id, "req-abc123");
});
