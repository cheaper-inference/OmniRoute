// Claude Code's message-threads beta sends a delta body with a top-level `thread` object. Only
// Anthropic holds the thread state. A translated route would drop the task, the system prompt
// and the earlier turns, so it answers 400 invalid_request_error and the client resends the
// full conversation. Native Anthropic targets keep the field.
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-claude-thread-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { handleChatCore } = await import("../../open-sse/handlers/chatCore.ts");
const { translateRequest } = await import("../../open-sse/translator/index.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");

type Json = Record<string, unknown>;

const originalFetch = globalThis.fetch;

test.after(async () => {
  globalThis.fetch = originalFetch;
  for (let i = 0; i < 5; i++) await new Promise((resolve) => setImmediate(resolve));
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function threadBody(thread: unknown = { type: "continue", previous_message_id: "msg_1" }): Json {
  return {
    model: "gpt-4o",
    max_tokens: 64,
    stream: false,
    thread,
    messages: [{ role: "user", content: "and then?" }],
  };
}

function translate(target: string, provider: string, body: Json) {
  return translateRequest(FORMATS.CLAUDE, target, "gpt-4o", body, false, null, provider) as Json;
}

test("Claude -> OpenAI translation rejects a message-thread request with a 400", () => {
  assert.throws(
    () => translate(FORMATS.OPENAI, "openai", threadBody()),
    (error: Error & { statusCode?: number; errorType?: string; details?: Json }) => {
      assert.equal(error.statusCode, 400);
      assert.equal(error.errorType, "invalid_request_error");
      assert.equal(error.details?.error_code, "thread_unsupported_request");
      return true;
    }
  );
});

test("Claude -> Claude gateway that is not Anthropic rejects a message-thread request too", () => {
  assert.throws(
    () => translate(FORMATS.CLAUDE, "kimi-coding", threadBody()),
    (error: Error & { statusCode?: number }) => error.statusCode === 400
  );
});

test("a native Anthropic target does not reject a message-thread request", () => {
  for (const provider of ["claude", "anthropic", "anthropic-compatible-acme"]) {
    assert.doesNotThrow(() => translate(FORMATS.CLAUDE, provider, threadBody()), provider);
  }
});

test("a body without a thread object is translated as before", () => {
  for (const thread of [undefined, null, "continue", ["continue"]]) {
    const body = threadBody(thread);
    if (thread === undefined) delete body.thread;
    assert.doesNotThrow(() => translate(FORMATS.OPENAI, "openai", body), String(thread));
  }
});

test("only a Claude source is checked: an OpenAI body with a thread field is left alone", () => {
  assert.doesNotThrow(() =>
    translateRequest(FORMATS.OPENAI, FORMATS.CLAUDE, "claude-sonnet-4-6", threadBody(), false)
  );
});

test("handleChatCore answers 400 and never calls the upstream for a thread request", async () => {
  let fetchCalls = 0;
  globalThis.fetch = (async () => {
    fetchCalls++;
    return new Response("{}", { status: 200, headers: { "Content-Type": "application/json" } });
  }) as typeof fetch;

  const body = threadBody();
  const result = (await handleChatCore({
    body: structuredClone(body),
    modelInfo: { provider: "openai", model: "gpt-4o", extendedContext: false },
    credentials: { apiKey: "test-key", providerSpecificData: {} },
    log: { debug() {}, info() {}, warn() {}, error() {} },
    clientRawRequest: {
      endpoint: "/v1/messages",
      body: structuredClone(body),
      headers: new Headers({
        accept: "application/json",
        "content-type": "application/json",
        "anthropic-beta": "message-threads-2026-08-12",
      }),
    },
    userAgent: "claude-code/2.1.291",
  })) as { success: boolean; status?: number; response?: Response };

  assert.equal(result.success, false);
  assert.equal(result.status, 400);
  const payload = (await result.response!.json()) as { error?: { type?: string } };
  assert.equal(payload.error?.type, "invalid_request_error");
  assert.equal(fetchCalls, 0, "the upstream must not receive a history-less delta");
});
