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
  p?: string;
  choices?: Array<{ delta?: { content?: string } }>;
};

function dataEvents(sse: string): SseEvent[] {
  return sse
    .split("\n")
    .filter((l) => l.startsWith("data: ") && l.slice(6).trim().startsWith("{"))
    .map((l) => JSON.parse(l.slice(6)));
}

// Mistral attaches an anti token-length side-channel padding field "p" to every
// streamed chunk (Mistral changelog, 2025-08-27). Its value is a random-looking
// alphabet/digit run, never answer text.
const MISTRAL_STREAM = [
  `data: {"id":"c1","object":"chat.completion.chunk","model":"mistral-small-latest","choices":[{"index":0,"delta":{"role":"assistant","content":""},"finish_reason":null}],"p":""}\n\n`,
  `data: {"id":"c1","object":"chat.completion.chunk","model":"mistral-small-latest","choices":[{"index":0,"delta":{"content":"Ciao! Come posso"},"finish_reason":null}],"p":"abcdefghijklmnopqrstuvwxyz0123456789"}\n\n`,
  `data: {"id":"c1","object":"chat.completion.chunk","model":"mistral-small-latest","choices":[{"index":0,"delta":{"content":" aiutarti?"},"finish_reason":"stop"}],"p":"abcdefghijklmn"}\n\n`,
  `data: [DONE]\n\n`,
];

test("#19293 classifyField treats Mistral padding field p as non-content", () => {
  assert.equal(classifyField("p", ""), null);
});

test("#19293 credential SSE transform keeps Mistral padding out of the answer text", async () => {
  const out = await run(createCredentialSseTransform(), MISTRAL_STREAM);
  const events = dataEvents(out);
  const content = events.map((e) => e.choices?.[0]?.delta?.content ?? "").join("");
  assert.equal(content, "Ciao! Come posso aiutarti?", "assembled text must not contain padding");
  const padded = events.find((e) => e.p === "abcdefghijklmnopqrstuvwxyz0123456789");
  assert.ok(padded, "padding field itself passes through untouched");
});

test("#19293 secrets in content stay redacted when Mistral padding is present", async () => {
  const secret = "sk-ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuv";
  const chunks = [
    `data: {"id":"c1","object":"chat.completion.chunk","choices":[{"index":0,"delta":{"content":"the key is ${secret} ok"},"finish_reason":null}],"p":"abcdefghijklmnopqrstuvwxyz0123456789"}\n\n`,
    `data: {"id":"c1","object":"chat.completion.chunk","choices":[{"index":0,"delta":{"content":"done"},"finish_reason":"stop"}],"p":"abcdefghijklmn"}\n\n`,
    `data: [DONE]\n\n`,
  ];
  const out = await run(createCredentialSseTransform(), chunks);
  const events = dataEvents(out);
  const content = events.map((e) => e.choices?.[0]?.delta?.content ?? "").join("");
  assert.ok(!content.includes(secret), "secret must not survive in assembled text");
  assert.match(content, /\[REDACTED:openai\]/, "secret must be redacted, not merely dropped");
  assert.ok(
    !content.includes("abcdefghijklmnopqrstuvwxyz0123456789"),
    "padding must not be spliced into assembled text"
  );
});
