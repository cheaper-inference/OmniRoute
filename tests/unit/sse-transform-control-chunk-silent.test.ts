import test from "node:test";
import assert from "node:assert/strict";
import { createSseTextTransform } from "../../src/lib/sseTextTransform.ts";

async function run(chunks: string[]): Promise<string> {
  const t = createSseTextTransform((text) => text);
  const w = t.writable.getWriter();
  const r = t.readable.getReader();
  const wp = (async () => {
    for (const c of chunks) await w.write(new TextEncoder().encode(c));
    await w.close();
  })();
  let out = "";
  let res = await r.read();
  while (!res.done) {
    out += new TextDecoder().decode(res.value);
    res = await r.read();
  }
  await wp;
  return out;
}

function captureWarn() {
  const calls: string[] = [];
  const orig = console.warn;
  console.warn = (...a: unknown[]) => {
    calls.push(a.map(String).join(" "));
  };
  return { calls, restore: () => (console.warn = orig) };
}

const CLOSING =
  'data: {"id":"chatcmpl-1","object":"chat.completion.chunk","created":1,"model":"gpt-x","choices":[{"index":0,"delta":{},"finish_reason":"stop"}]}\n\n';
const USAGE =
  'data: {"id":"chatcmpl-1","object":"chat.completion.chunk","created":1,"model":"gpt-x","choices":[],"usage":{"prompt_tokens":1,"completion_tokens":2,"total_tokens":3}}\n\n';
const CONTENT =
  'data: {"id":"chatcmpl-1","object":"chat.completion.chunk","created":1,"model":"gpt-x","choices":[{"index":0,"delta":{"content":"hi"}}]}\n\n';

test("closing frame (metadata-only) does not warn", async () => {
  const cap = captureWarn();
  try {
    const out = await run([CLOSING]);
    assert.ok(out.includes('"finish_reason":"stop"'));
    assert.deepEqual(cap.calls, []);
  } finally {
    cap.restore();
  }
});

test("usage frame (metadata-only) does not warn", async () => {
  const cap = captureWarn();
  try {
    await run([USAGE]);
    assert.deepEqual(cap.calls, []);
  } finally {
    cap.restore();
  }
});

test("content frame stays silent", async () => {
  const cap = captureWarn();
  try {
    await run([CONTENT]);
    assert.deepEqual(cap.calls, []);
  } finally {
    cap.restore();
  }
});

test("malformed JSON still warns (real fault stays at warn)", async () => {
  const cap = captureWarn();
  try {
    await run(['data: {"id": broken\n\n']);
    assert.equal(cap.calls.length, 1);
    assert.match(cap.calls[0], /malformed JSON/);
  } finally {
    cap.restore();
  }
});
