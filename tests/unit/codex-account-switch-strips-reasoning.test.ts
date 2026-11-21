// @ts-nocheck
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-chatcore-codex-pool-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const { handleChatCore } = await import("../../open-sse/handlers/chatCore.ts");

const originalFetch = globalThis.fetch;

function noopLog() {
  return {
    debug() {},
    info() {},
    warn() {},
    error() {},
  };
}

function toPlainHeaders(headers) {
  if (!headers) return {};
  if (headers instanceof Headers) return Object.fromEntries(headers.entries());
  return Object.fromEntries(
    Object.entries(headers).map(([key, value]) => [key, value == null ? "" : String(value)])
  );
}

function buildResponsesResponse(text = "ok") {
  return new Response(
    JSON.stringify({
      id: "resp_123",
      object: "response",
      status: "completed",
      model: "gpt-5.1-codex",
      output: [
        {
          id: "msg_123",
          type: "message",
          role: "assistant",
          content: [{ type: "output_text", text, annotations: [] }],
        },
      ],
      usage: {
        input_tokens: 4,
        output_tokens: 2,
        total_tokens: 6,
      },
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

// Wait on the call-log writer's own queue, not on a clock.
async function waitForAsyncSideEffects() {
  await new Promise((resolve) => setImmediate(resolve));
  await (await import("../../src/lib/usage/callLogs.ts")).closeCallLogSaves(5000);
}

async function invokeChatCore({
  body,
  provider = "codex",
  model,
  endpoint = "/v1/responses",
  credentials,
  responseFactory,
  connectionId = null,
  isCombo = false,
}: {
  body: unknown;
  provider?: string;
  model: string;
  endpoint?: string;
  credentials: Record<string, unknown>;
  responseFactory: (captured: unknown, calls: unknown[]) => Response;
  connectionId?: string | null;
  isCombo?: boolean;
}) {
  const calls: unknown[] = [];
  globalThis.fetch = async (url, init = {}) => {
    const headers = toPlainHeaders(init.headers);
    const captured = {
      url: String(url),
      method: init.method || "GET",
      headers,
      body: init.body ? JSON.parse(String(init.body)) : null,
    };
    calls.push(captured);
    return responseFactory(captured, calls);
  };

  try {
    const result = await handleChatCore({
      body: structuredClone(body),
      modelInfo: { provider, model, extendedContext: false },
      credentials,
      log: noopLog(),
      clientRawRequest: {
        endpoint,
        body: structuredClone(body),
        headers: new Headers({ accept: "application/json" }),
      },
      connectionId,
      userAgent: "unit-test",
      isCombo,
    });
    await waitForAsyncSideEffects();
    return { calls, result };
  } finally {
    globalThis.fetch = originalFetch;
  }
}

test.afterEach(async () => {
  globalThis.fetch = originalFetch;
  await waitForAsyncSideEffects();
  await resetStorage();
});

test.after(async () => {
  globalThis.fetch = originalFetch;
  await waitForAsyncSideEffects();
  await resetStorage();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

const REASONING_ITEM = {
  type: "reasoning",
  id: "rs_fixture_1",
  encrypted_content: "ciphertext-bound-to-account-one",
  summary: [{ type: "summary_text", text: "kept summary" }],
};
const history = () => [
  { type: "message", role: "user", content: [{ type: "input_text", text: "hello" }] },
  structuredClone(REASONING_ITEM),
  { type: "message", role: "user", content: [{ type: "input_text", text: "again" }] },
];

async function twoAccounts(tag: string) {
  const first = await providersDb.createProviderConnection({
    provider: "codex",
    authType: "oauth",
    email: `${tag}-first@example.com`,
    accessToken: `${tag}-first`,
    isActive: true,
    providerSpecificData: {},
  });
  const second = await providersDb.createProviderConnection({
    provider: "codex",
    authType: "oauth",
    email: `${tag}-second@example.com`,
    accessToken: `${tag}-second`,
    isActive: true,
    providerSpecificData: {},
  });
  return { first, second };
}

function sentReasoning(call: unknown) {
  const input = (call as { body: { input: Array<Record<string, unknown>> } }).body.input;
  return input.find((item) => item.type === "reasoning");
}

test("after a Codex account switch the reasoning ciphertext is not sent to the new account", async () => {
  const { first } = await twoAccounts("switch-strip");
  const { result, calls } = await invokeChatCore({
    provider: "codex",
    model: "gpt-5.3-codex-spark",
    connectionId: first.id,
    isCombo: true,
    credentials: {
      accessToken: "switch-strip-first",
      connectionId: first.id,
      providerSpecificData: {},
    },
    body: { model: "gpt-5.3-codex-spark", input: history(), stream: false },
    responseFactory(captured: unknown) {
      const headers = (captured as { headers: Record<string, string> }).headers;
      const auth = headers.authorization ?? headers.Authorization ?? "";
      if (auth.includes("switch-strip-first")) {
        return new Response(JSON.stringify({ error: { message: "Codex quota exceeded" } }), {
          status: 429,
          headers: { "Content-Type": "application/json", "Retry-After": "60" },
        });
      }
      return buildResponsesResponse("second account answered");
    },
  });

  assert.equal(result.success, true);
  assert.equal(calls.length, 2, "one send per account");
  assert.equal(
    sentReasoning(calls[0])?.encrypted_content,
    REASONING_ITEM.encrypted_content,
    "the first account gets the ciphertext it produced"
  );
  const wire = JSON.stringify((calls[1] as { body: unknown }).body);
  assert.equal(
    wire.includes(REASONING_ITEM.encrypted_content),
    false,
    "the ciphertext never reaches the new account"
  );
  assert.equal(wire.includes(REASONING_ITEM.id), false, "nor the server id that pointed at it");
  assert.equal(wire.includes("hello") && wire.includes("again"), true, "the messages stay");
});

test("without an account switch the reasoning ciphertext is left alone", async () => {
  const { first } = await twoAccounts("no-switch");
  const { result, calls } = await invokeChatCore({
    provider: "codex",
    model: "gpt-5.3-codex-spark",
    connectionId: first.id,
    credentials: {
      accessToken: "no-switch-first",
      connectionId: first.id,
      providerSpecificData: {},
    },
    body: { model: "gpt-5.3-codex-spark", input: history(), stream: false },
    responseFactory: () => buildResponsesResponse("same account answered"),
  });

  assert.equal(result.success, true);
  assert.equal(calls.length, 1);
  assert.equal(sentReasoning(calls[0])?.encrypted_content, REASONING_ITEM.encrypted_content);
});

test("a switch with no reasoning item in the history changes nothing in the body", async () => {
  const { first } = await twoAccounts("plain-switch");
  const plain = [{ type: "message", role: "user", content: [{ type: "input_text", text: "hi" }] }];
  const { result, calls } = await invokeChatCore({
    provider: "codex",
    model: "gpt-5.3-codex-spark",
    connectionId: first.id,
    isCombo: true,
    credentials: {
      accessToken: "plain-switch-first",
      connectionId: first.id,
      providerSpecificData: {},
    },
    body: { model: "gpt-5.3-codex-spark", input: plain, stream: false },
    responseFactory(captured: unknown) {
      const headers = (captured as { headers: Record<string, string> }).headers;
      const auth = headers.authorization ?? headers.Authorization ?? "";
      return auth.includes("plain-switch-first")
        ? new Response(JSON.stringify({ error: { message: "Codex quota exceeded" } }), {
            status: 429,
            headers: { "Content-Type": "application/json", "Retry-After": "60" },
          })
        : buildResponsesResponse("ok");
    },
  });
  assert.equal(result.success, true);
  assert.deepEqual(
    (calls[1] as { body: { input: unknown } }).body.input,
    (calls[0] as { body: { input: unknown } }).body.input
  );
});
