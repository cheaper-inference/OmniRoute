// @ts-nocheck
// litellm-11: the router adds stream_options.include_usage upstream so it can bill the call. A chat
// client that did NOT ask for usage must not receive the extra trailing `choices: []` usage chunk
// (strict parsers read choices[0]); a client that asked for it still gets the chunk.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-unrequested-usage-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { handleChatCore } = await import("../../open-sse/handlers/chatCore.ts");

const originalFetch = globalThis.fetch;
const noopLog = () => ({ debug() {}, info() {}, warn() {}, error() {} });

const frame = (obj) => `data: ${JSON.stringify(obj)}\n\n`;
const base = { id: "c1", object: "chat.completion.chunk", created: 1, model: "gpt-4o-mini" };

let silentUpstream = false;
function upstreamSse() {
  const text = [
    frame({ ...base, choices: [{ index: 0, delta: { role: "assistant", content: "Hello" } }] }),
    frame({ ...base, choices: [{ index: 0, delta: {}, finish_reason: "stop" }] }),
    silentUpstream
      ? ""
      : frame({
          ...base,
          choices: [],
          usage: { prompt_tokens: 5, completion_tokens: 1, total_tokens: 6 },
        }),
    "data: [DONE]\n\n",
  ].join("");
  return new Response(text, { status: 200, headers: { "Content-Type": "text/event-stream" } });
}

async function run(clientBody) {
  let upstreamBody = null;
  globalThis.fetch = async (_url, init) => {
    upstreamBody = JSON.parse(String(init.body));
    return upstreamSse();
  };
  const body = {
    model: "gpt-4o-mini",
    stream: true,
    messages: [{ role: "user", content: "hi" }],
    ...clientBody,
  };
  const completes = [];
  const result = await handleChatCore({
    body: structuredClone(body),
    modelInfo: { provider: "openai", model: "gpt-4o-mini", extendedContext: false },
    credentials: { apiKey: "test-key", providerSpecificData: {} },
    log: noopLog(),
    clientRawRequest: {
      endpoint: "/v1/chat/completions",
      body: structuredClone(body),
      headers: new Headers({ accept: "text/event-stream" }),
    },
    connectionId: "openai-conn",
    onStreamComplete: (p) => completes.push(p),
  });
  assert.equal(result.success, true, JSON.stringify(result.error ?? result.status));
  const text = await result.response.text();
  const chunks = text
    .split("\n\n")
    .map((b) => b.replace(/^data: /, "").trim())
    .filter((d) => d && d !== "[DONE]")
    .map((d) => JSON.parse(d));
  return { upstreamBody, chunks };
}

const usageOnly = (chunks) =>
  chunks.filter((c) => Array.isArray(c.choices) && c.choices.length === 0);

test.after(() => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("client without stream_options gets no usage-only chunk, upstream still asked for usage", async () => {
  const { upstreamBody, chunks } = await run({});
  assert.equal(upstreamBody.stream_options?.include_usage, true);
  assert.equal(usageOnly(chunks).length, 0, JSON.stringify(chunks));
  assert.equal(chunks.length, 2);
});

test("client with include_usage:false gets no usage-only chunk", async () => {
  const { chunks } = await run({ stream_options: { include_usage: false } });
  assert.equal(usageOnly(chunks).length, 0, JSON.stringify(chunks));
});

test("client with include_usage:true still gets the usage-only chunk", async () => {
  const { chunks } = await run({ stream_options: { include_usage: true } });
  const extra = usageOnly(chunks);
  assert.equal(extra.length, 1, JSON.stringify(chunks));
  assert.equal(extra[0].usage.prompt_tokens, 5);
});

test("silent upstream: the estimated usage chunk is sent only to a client that asked for usage", async () => {
  silentUpstream = true;
  try {
    const plain = await run({});
    assert.equal(usageOnly(plain.chunks).length, 0, JSON.stringify(plain.chunks));
    const asked = await run({ stream_options: { include_usage: true } });
    assert.equal(usageOnly(asked.chunks).length, 1, JSON.stringify(asked.chunks));
  } finally {
    silentUpstream = false;
  }
});
