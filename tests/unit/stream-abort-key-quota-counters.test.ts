// A client abort (499) or mid-stream failure ends the stream before the SSE
// transform's flush() resolves `usage`. The failure finalizer still reports the
// tokens the provider already generated via `partialUsage`, but
// recordStreamingUsageStats dropped non-200 streams and null usage entirely, so
// the per-key rpm/tpm counters never advanced — a key that aborts every stream
// after the first token is invisible to the apiKeyPolicy quota gate.
import { test } from "node:test";
import assert from "node:assert/strict";

// Default grace is 10s: the abort finalizer waits for it before recording. 0 keeps
// the test fast; the finalization order is unchanged.
process.env.STREAM_DISCONNECT_GRACE_PERIOD_MS = "0";

const { createChatPipelineHarness } = await import("../integration/_chatPipelineHarness.ts");
const { recordStreamingUsageStats } =
  await import("../../open-sse/handlers/chatCore/streamingUsageStats.ts");
const { getKeyQuotaCounters } = await import("../../src/lib/db/keyQuota.ts");

const h = await createChatPipelineHarness("stream-abort-quota");

test("aborted stream (status 499, partial usage) still advances rpm/tpm counters", () => {
  // Real shape from streamFailureFinalization: usage null, tokens in partialUsage.
  recordStreamingUsageStats(null, {
    partialUsage: { prompt_tokens: 97, completion_tokens: 4, total_tokens: 101, estimated: true },
    provider: "openai",
    model: "gpt-4o-mini",
    streamStatus: 499,
    startTime: Date.now(),
    ttft: 100,
    streamErrorCode: "client_disconnected",
    connectionId: "conn-1",
    apiKeyInfo: { id: "key-abort", name: "k" },
    effectiveServiceTier: undefined,
    isCombo: false,
    comboStrategy: null,
    endpoint: "/v1/chat/completions",
  });
  const c = getKeyQuotaCounters("key-abort");
  assert.equal(c.rpmUsed, 1, `rpmUsed=${c.rpmUsed}`);
  assert.equal(c.tpmUsed, 101, `tpmUsed=${c.tpmUsed}`);
});

test("failed stream with no usage object at all: rpm still advances", () => {
  recordStreamingUsageStats(null, {
    provider: "openai",
    model: "gpt-4o-mini",
    streamStatus: 502,
    startTime: Date.now(),
    ttft: 0,
    streamErrorCode: "upstream_error",
    connectionId: "conn-1",
    apiKeyInfo: { id: "key-no-usage", name: "k" },
    effectiveServiceTier: undefined,
    isCombo: false,
    comboStrategy: null,
  });
  const c = getKeyQuotaCounters("key-no-usage");
  assert.equal(c.rpmUsed, 1, `rpmUsed=${c.rpmUsed}`);
  assert.equal(c.tpmUsed, 0);
});

test("200 stream with real usage is unchanged", () => {
  recordStreamingUsageStats(
    { prompt_tokens: 5000, completion_tokens: 20, total_tokens: 5020 },
    {
      provider: "openai",
      model: "gpt-4o-mini",
      streamStatus: 200,
      startTime: Date.now(),
      ttft: 100,
      streamErrorCode: null,
      connectionId: "conn-1",
      apiKeyInfo: { id: "key-ok", name: "k" },
      effectiveServiceTier: undefined,
      isCombo: false,
      comboStrategy: null,
    }
  );
  const c = getKeyQuotaCounters("key-ok");
  assert.equal(c.rpmUsed, 1);
  assert.equal(c.tpmUsed, 5020);
});

// End-to-end: the real pipeline, a stubbed upstream (no network), a client that
// aborts after the first token. The completed-stream control proves the counters
// move at all in this harness.
const enc = new TextEncoder();
const frame = (o: unknown) => enc.encode(`data: ${JSON.stringify(o)}\n\n`);
const base = { id: "c1", object: "chat.completion.chunk", created: 1, model: "gpt-4o-mini" };

function upstream(slowTail: boolean): Response {
  return new Response(
    new ReadableStream({
      async start(c) {
        c.enqueue(
          frame({
            ...base,
            choices: [
              {
                index: 0,
                delta: { role: "assistant", content: "hello world" },
                finish_reason: null,
              },
            ],
          })
        );
        await new Promise((r) => setTimeout(r, slowTail ? 2500 : 20));
        try {
          c.enqueue(frame({ ...base, choices: [{ index: 0, delta: {}, finish_reason: "stop" }] }));
          c.enqueue(
            frame({
              ...base,
              choices: [],
              usage: { prompt_tokens: 5000, completion_tokens: 20, total_tokens: 5020 },
            })
          );
          c.enqueue(enc.encode("data: [DONE]\n\n"));
          c.close();
        } catch {}
      },
    }),
    { headers: { "Content-Type": "text/event-stream" } }
  );
}

async function runPipeline(abortAfterFirstChunk: boolean, keyId: string, keyHash: string) {
  await h.resetStorage();
  await h.seedConnection("openai", { name: "stream-abort-quota", apiKey: "test-key" });
  globalThis.fetch = (async () => upstream(abortAfterFirstChunk)) as typeof fetch;
  const ac = new AbortController();
  const req = new Request("http://localhost/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${keyHash}` },
    body: JSON.stringify({
      model: "openai/gpt-4o-mini",
      stream: true,
      messages: [{ role: "user", content: `q ${crypto.randomUUID()}` }],
    }),
    signal: ac.signal,
  });
  const res = await h.handleChat(req);
  const reader = res.body!.getReader();
  const dec = new TextDecoder();
  let seen = "";
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    seen += dec.decode(value, { stream: true });
    if (abortAfterFirstChunk && seen.includes("hello world")) {
      ac.abort();
      await reader.cancel("client gone").catch(() => {});
      break;
    }
  }
  await new Promise((r) => setTimeout(r, 300));
  return getKeyQuotaCounters(keyId);
}

test("pipeline: completed stream is counted (control)", async () => {
  const key = await h.seedApiKey({});
  const c = await runPipeline(false, key.id, key.key);
  assert.ok(c.rpmUsed >= 1 && c.tpmUsed >= 5000, `rpm=${c.rpmUsed} tpm=${c.tpmUsed}`);
});

test("pipeline: client abort after first token still reaches rpm/tpm counters", async () => {
  const key = await h.seedApiKey({});
  const c = await runPipeline(true, key.id, key.key);
  assert.ok(c.rpmUsed >= 1, `rpm=${c.rpmUsed} tpm=${c.tpmUsed}`);
  assert.ok(c.tpmUsed >= 1, `rpm=${c.rpmUsed} tpm=${c.tpmUsed}`);
});

test.after(() => h.cleanup());
