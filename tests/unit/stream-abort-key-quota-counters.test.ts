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

type QuotaCounters = ReturnType<typeof getKeyQuotaCounters>;

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

// A combo reads each target's stream and fails over from a rejected one, so that attempt
// finishes here too. The client sent one request: only the target that answered counts it.
function recordComboAttempt(
  keyId: string,
  usage: unknown,
  attempt: { streamStatus: number; emittedOutput: boolean; partialUsage?: unknown }
) {
  recordStreamingUsageStats(usage, {
    provider: "openai",
    model: "gpt-4o-mini",
    startTime: Date.now(),
    ttft: 0,
    streamErrorCode: null,
    connectionId: "conn-1",
    apiKeyInfo: { id: keyId, name: "k" },
    effectiveServiceTier: undefined,
    isCombo: true,
    comboStrategy: "priority",
    ...attempt,
  });
  return getKeyQuotaCounters(keyId);
}

test("combo attempt rejected before any output is not a request", () => {
  const failed = recordComboAttempt("key-combo-502", null, {
    streamStatus: 502,
    emittedOutput: false,
  });
  assert.deepEqual([failed.rpmUsed, failed.tpmUsed], [0, 0]);

  // A truncated target finishes its stream as 200 with no usage.
  const truncated = recordComboAttempt("key-combo-200", null, {
    streamStatus: 200,
    emittedOutput: false,
  });
  assert.deepEqual([truncated.rpmUsed, truncated.tpmUsed], [0, 0]);

  // An early usage frame leaves partial usage, but the attempt is still discarded.
  const withUsageFrame = recordComboAttempt("key-combo-usage", null, {
    streamStatus: 502,
    emittedOutput: false,
    partialUsage: { prompt_tokens: 40, completion_tokens: 0, total_tokens: 40 },
  });
  assert.deepEqual([withUsageFrame.rpmUsed, withUsageFrame.tpmUsed], [0, 0]);
});

test("combo attempt that sent output and then ended early is counted", () => {
  const c = recordComboAttempt("key-combo-abort", null, {
    streamStatus: 499,
    emittedOutput: true,
    partialUsage: { prompt_tokens: 97, completion_tokens: 4, total_tokens: 101, estimated: true },
  });
  assert.deepEqual([c.rpmUsed, c.tpmUsed], [1, 101]);
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

/** Reset first: seeding the key afterwards keeps it alive for the whole run. */
async function seedKey(...providers: string[]) {
  await h.resetStorage();
  for (const provider of providers) {
    await h.seedConnection(provider, { name: "stream-abort-quota", apiKey: "test-key" });
  }
  return h.seedApiKey({});
}

/** Polls until the counters pass `ready`, then returns them either way. */
async function settledCounters(keyId: string, ready: (c: QuotaCounters) => boolean) {
  await h.waitFor(() => ready(getKeyQuotaCounters(keyId)), 5000);
  return getKeyQuotaCounters(keyId);
}

async function runPipeline(
  abortAfterFirstChunk: boolean,
  keyId: string,
  keyHash: string,
  model = "openai/gpt-4o-mini"
) {
  const ac = new AbortController();
  const req = new Request("http://localhost/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${keyHash}` },
    body: JSON.stringify({
      model,
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
  return settledCounters(keyId, (c) => c.rpmUsed >= 1 && c.tpmUsed >= 1);
}

test("pipeline: completed stream is counted (control)", async () => {
  const key = await seedKey("openai");
  globalThis.fetch = (async () => upstream(false)) as typeof fetch;
  const c = await runPipeline(false, key.id, key.key);
  assert.ok(c.rpmUsed >= 1 && c.tpmUsed >= 5000, `rpm=${c.rpmUsed} tpm=${c.tpmUsed}`);
});

test("pipeline: client abort after first token still reaches rpm/tpm counters", async () => {
  const key = await seedKey("openai");
  globalThis.fetch = (async () => upstream(true)) as typeof fetch;
  const c = await runPipeline(true, key.id, key.key);
  assert.ok(c.rpmUsed >= 1, `rpm=${c.rpmUsed} tpm=${c.tpmUsed}`);
  assert.ok(c.tpmUsed >= 1, `rpm=${c.rpmUsed} tpm=${c.tpmUsed}`);
});

// Combo failover: the first target passes stream readiness, then the combo rejects it.
const roleFrame = frame({
  ...base,
  choices: [{ index: 0, delta: { role: "assistant" }, finish_reason: null }],
});
const errorFrame = frame({ error: { message: "upstream boom", type: "server_error" } });

function sse(frames: Uint8Array[]): Response {
  return new Response(
    new ReadableStream({
      async start(c) {
        for (const f of frames) {
          c.enqueue(f);
          await new Promise((r) => setTimeout(r, 5));
        }
        c.close();
      },
    }),
    { headers: { "Content-Type": "text/event-stream" } }
  );
}

async function seedFailoverCombo(first: () => Response, second: () => Response) {
  const key = await seedKey("openai", "groq");
  const name = `quota-combo-${crypto.randomUUID().slice(0, 8)}`;
  await h.combosDb.createCombo({
    name,
    strategy: "priority",
    config: { maxRetries: 0, retryDelayMs: 0, fallbackDelayMs: 0 },
    models: ["openai/gpt-4o-mini", "groq/llama-3.3-70b-versatile"],
  });
  const calls: string[] = [];
  globalThis.fetch = (async (url: string | URL | Request) => {
    const host = new URL(String(url)).host;
    calls.push(host);
    return host === "api.openai.com" ? first() : second();
  }) as typeof fetch;
  return { key, name, calls };
}

for (const [label, rejected] of [
  ["upstream error", [roleFrame, errorFrame]],
  ["truncated stream", [roleFrame]],
] as const) {
  test(`pipeline: combo failover after ${label} counts one request`, async () => {
    const { key, name, calls } = await seedFailoverCombo(
      () => sse([...rejected]),
      () => upstream(false)
    );
    const c = await runPipeline(false, key.id, key.key, name);
    assert.deepEqual(calls, ["api.openai.com", "api.groq.com"]);
    assert.equal(c.rpmUsed, 1, `rpm=${c.rpmUsed} tpm=${c.tpmUsed}`);
    assert.equal(c.tpmUsed, 5020, `rpm=${c.rpmUsed} tpm=${c.tpmUsed}`);
  });
}

test("pipeline: client abort on a combo target still reaches rpm/tpm counters", async () => {
  const { key, name } = await seedFailoverCombo(
    () => upstream(true),
    () => upstream(false)
  );
  const c = await runPipeline(true, key.id, key.key, name);
  assert.equal(c.rpmUsed, 1, `rpm=${c.rpmUsed} tpm=${c.tpmUsed}`);
  assert.ok(c.tpmUsed >= 1, `rpm=${c.rpmUsed} tpm=${c.tpmUsed}`);
});

test.after(() => h.cleanup());
