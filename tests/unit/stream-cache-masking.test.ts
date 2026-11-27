// A streamed answer must not enter the semantic cache when the response masking
// transforms (PII sanitization, credential redaction) run for that request: the
// cache stores the assembled raw body, while masking only rewrites the client's
// copy, so a later cache hit would replay the unmasked text.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_ROOT = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-stream-cache-masking-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_ROOT;

const core = await import("../../src/lib/db/core.ts");
const { clearCache } = await import("../../src/lib/semanticCache.ts");
const { clearIdempotency } = await import("../../src/lib/idempotencyLayer.ts");
const { clearInflight } = await import("../../open-sse/services/requestDedup.ts");
const { handleChatCore } = await import("../../open-sse/handlers/chatCore.ts");
const { isStreamMaskingActive } =
  await import("../../open-sse/handlers/chatCore/streamingPipeline.ts");

const originalFetch = globalThis.fetch;
const FLAG_KEYS = [
  "PII_RESPONSE_SANITIZATION",
  "PII_RESPONSE_SANITIZATION_MODE",
  "CREDENTIAL_REDACTION_ENABLED",
] as const;

const PLANTED_EMAIL = "leak.victim@example.com";
const PLANTED_KEY = "sk-" + "QwEr".repeat(12);

function noopLog() {
  return { debug() {}, info() {}, warn() {}, error() {} };
}

function sseResponse(text: string) {
  const chunk = {
    id: "chatcmpl-stream",
    object: "chat.completion.chunk",
    choices: [{ index: 0, delta: { role: "assistant", content: text } }],
  };
  const done = {
    id: "chatcmpl-stream",
    object: "chat.completion.chunk",
    choices: [{ index: 0, delta: {}, finish_reason: "stop" }],
    usage: { prompt_tokens: 4, completion_tokens: 6, total_tokens: 10 },
  };
  return new Response(
    `data: ${JSON.stringify(chunk)}\n\ndata: ${JSON.stringify(done)}\n\ndata: [DONE]\n\n`,
    { status: 200, headers: { "Content-Type": "text/event-stream" } }
  );
}

async function flush() {
  for (let i = 0; i < 5; i++) await new Promise((resolve) => setImmediate(resolve));
}

async function streamOnce(
  body: Record<string, unknown>,
  upstreamText: string,
  counter: { n: number }
) {
  globalThis.fetch = (async () => {
    counter.n += 1;
    return sseResponse(upstreamText);
  }) as typeof fetch;
  try {
    const result = await handleChatCore({
      body: structuredClone(body),
      modelInfo: { provider: "openai", model: "gpt-4o-mini", extendedContext: false },
      credentials: { apiKey: "sk-test", providerSpecificData: {} },
      log: noopLog(),
      clientRawRequest: {
        endpoint: "/v1/chat/completions",
        body: structuredClone(body),
        headers: new Headers({ accept: "text/event-stream" }),
      },
      connectionId: null,
      apiKeyInfo: null,
      userAgent: "unit-test",
    } as never);
    assert.equal(result.success, true);
    const text = await result.response.text();
    await flush();
    return { text, cacheHeader: result.response.headers.get("X-OmniRoute-Cache") };
  } finally {
    globalThis.fetch = originalFetch;
  }
}

async function withFlags(
  flags: Partial<Record<(typeof FLAG_KEYS)[number], string>>,
  fn: () => Promise<void>
) {
  const saved = Object.fromEntries(FLAG_KEYS.map((key) => [key, process.env[key]]));
  for (const key of FLAG_KEYS) delete process.env[key];
  Object.assign(process.env, flags);
  try {
    await fn();
  } finally {
    for (const key of FLAG_KEYS) {
      if (saved[key] === undefined) delete process.env[key];
      else process.env[key] = saved[key];
    }
  }
}

function resetState() {
  clearCache();
  clearIdempotency();
  clearInflight();
}

test.afterEach(() => {
  globalThis.fetch = originalFetch;
  resetState();
});

test.after(() => {
  globalThis.fetch = originalFetch;
  resetState();
  core.resetDbInstance();
  if (ORIGINAL_DATA_DIR === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  fs.rmSync(TEST_ROOT, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("PII response sanitization on: a streamed answer is not cached and never replayed unmasked", async () => {
  await withFlags(
    { PII_RESPONSE_SANITIZATION: "true", PII_RESPONSE_SANITIZATION_MODE: "redact" },
    async () => {
      const counter = { n: 0 };
      const body = {
        model: "gpt-4o-mini",
        stream: true,
        temperature: 0,
        messages: [{ role: "user", content: "stream-cache-masking-pii" }],
      };
      const upstreamText = `Reach me at ${PLANTED_EMAIL} today.`;

      const first = await streamOnce(body, upstreamText, counter);
      assert.ok(!first.text.includes(PLANTED_EMAIL), "the live stream is masked");

      const second = await streamOnce(body, upstreamText, counter);
      assert.ok(!second.text.includes(PLANTED_EMAIL), "the repeat must not carry the raw email");
      assert.notEqual(second.cacheHeader, "HIT", "a masked stream must not be served from cache");
      assert.equal(counter.n, 2, "both requests reach the upstream");
    }
  );
});

test("credential redaction on: a streamed answer is not cached and never replayed unmasked", async () => {
  await withFlags({ CREDENTIAL_REDACTION_ENABLED: "true" }, async () => {
    const counter = { n: 0 };
    const body = {
      model: "gpt-4o-mini",
      stream: true,
      temperature: 0,
      messages: [{ role: "user", content: "stream-cache-masking-credential" }],
    };
    const upstreamText = `Use key ${PLANTED_KEY} for the call.`;

    const first = await streamOnce(body, upstreamText, counter);
    assert.ok(!first.text.includes(PLANTED_KEY), "the live stream is redacted");

    const second = await streamOnce(body, upstreamText, counter);
    assert.ok(!second.text.includes(PLANTED_KEY), "the repeat must not carry the raw key");
    assert.notEqual(second.cacheHeader, "HIT", "a redacted stream must not be served from cache");
    assert.equal(counter.n, 2, "both requests reach the upstream");
  });
});

test("masking off: the streamed answer is cached and the repeat is a cache hit", async () => {
  await withFlags({}, async () => {
    const counter = { n: 0 };
    const body = {
      model: "gpt-4o-mini",
      stream: true,
      temperature: 0,
      messages: [{ role: "user", content: "stream-cache-masking-off" }],
    };

    await streamOnce(body, "plain cached answer", counter);
    const second = await streamOnce(body, "should-not-be-fetched", counter);
    assert.equal(second.cacheHeader, "HIT");
    assert.match(second.text, /plain cached answer/);
    assert.equal(counter.n, 1, "the upstream is called once");
  });
});

test("isStreamMaskingActive mirrors the pipeline's masking gates", () => {
  const flagOn = () => true;
  const flagOff = () => false;
  const none = { createPiiTransform: null };
  assert.equal(isStreamMaskingActive(none, flagOff), false);
  assert.equal(isStreamMaskingActive(none, flagOn), true);
  assert.equal(isStreamMaskingActive({ createPiiTransform: () => null }, flagOff), true);
  assert.equal(
    isStreamMaskingActive({ ...none, piiDisabledGuardrails: ["pii-masker"] }, flagOn),
    false,
    "per-request PII opt-out removes the PII transform"
  );
  assert.equal(isStreamMaskingActive({ ...none, credentialRedactionEnabled: true }, flagOff), true);
  assert.equal(
    isStreamMaskingActive(
      {
        ...none,
        credentialRedactionEnabled: true,
        credentialDisabledGuardrails: ["credential-masker"],
      },
      flagOff
    ),
    false,
    "per-request credential opt-out removes the credential transform"
  );
});
