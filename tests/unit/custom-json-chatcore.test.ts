// End-to-end through handleChatCore: a custom JSON API node answers OpenAI Chat
// Completions (JSON and SSE) and Anthropic Messages clients from one business JSON reply,
// with exactly one upstream call carrying the filled template.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_ROOT = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-custom-json-chatcore-"));
process.env.DATA_DIR = path.join(TEST_ROOT, "data");
process.env.OMNIROUTE_PLUGINS_DIR = path.join(TEST_ROOT, "plugins");
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
fs.mkdirSync(process.env.DATA_DIR, { recursive: true });
fs.mkdirSync(process.env.OMNIROUTE_PLUGINS_DIR, { recursive: true });

const core = await import("../../src/lib/db/core.ts");
const { waitForCallLogSaves } = await import("../../src/lib/usage/callLogs.ts");
const { handleChatCore } = await import("../../open-sse/handlers/chatCore.ts");

const originalFetch = globalThis.fetch;
const provider = "openai-compatible-custom-json-e2e";
const endpoint = "https://business.example.com/api/answer";
const credentials = {
  apiKey: "biz-key",
  connectionId: "conn-custom-json-e2e",
  providerSpecificData: {
    apiType: "custom-json",
    baseUrl: endpoint,
    customJson: {
      authType: "api-key",
      authHeader: "X-Service-Key",
      requestTemplate: { question: "{{prompt}}", model: "{{model}}", tenant: "demo" },
      responsePath: "data.answer",
    },
  },
};
const log = { debug() {}, info() {}, warn() {}, error() {} };

type Captured = { url: string; method?: string; headers: Record<string, string>; body: unknown };

async function invoke(body: Record<string, unknown>, endpointPath: string, accept: string) {
  const calls: Captured[] = [];
  globalThis.fetch = (async (url: string | URL, init: RequestInit = {}) => {
    calls.push({
      url: String(url),
      method: init.method,
      headers: Object.fromEntries(new Headers(init.headers).entries()),
      body: init.body ? JSON.parse(String(init.body)) : null,
    });
    return Response.json({ data: { answer: "Business says hi" } });
  }) as typeof fetch;
  try {
    const result = (await handleChatCore({
      body: structuredClone(body),
      modelInfo: { provider, model: "assistant-v1", extendedContext: false },
      credentials: structuredClone(credentials),
      log,
      clientRawRequest: {
        endpoint: endpointPath,
        body: structuredClone(body),
        headers: new Headers({ accept }),
      },
      connectionId: credentials.connectionId,
      userAgent: "unit-test",
    } as Parameters<typeof handleChatCore>[0])) as { success: boolean; response: Response };
    return { result, calls };
  } finally {
    globalThis.fetch = originalFetch;
  }
}

test.after(async () => {
  globalThis.fetch = originalFetch;
  await waitForCallLogSaves(60_000).catch(() => {});
  core.resetDbInstance();
  fs.rmSync(TEST_ROOT, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function assertSingleBusinessCall(calls: Captured[]) {
  assert.equal(calls.length, 1);
  assert.equal(calls[0].url, endpoint);
  assert.equal(calls[0].method, "POST");
  assert.equal(calls[0].headers["x-service-key"], "biz-key");
  assert.deepEqual(calls[0].body, {
    question: "Hello there",
    model: "assistant-v1",
    tenant: "demo",
  });
}

test("OpenAI chat client, non-streaming: one business call, OpenAI JSON back", async () => {
  const { result, calls } = await invoke(
    {
      model: "biz/assistant-v1",
      messages: [{ role: "user", content: "Hello there" }],
      stream: false,
    },
    "/v1/chat/completions",
    "application/json"
  );
  assertSingleBusinessCall(calls);
  assert.equal(result.success, true);
  const json = (await result.response.json()) as {
    choices: Array<{ message: { content: string } }>;
  };
  assert.equal(json.choices[0].message.content, "Business says hi");
});

test("OpenAI chat client, streaming: one business call, SSE with the reply and [DONE]", async () => {
  const { result, calls } = await invoke(
    {
      model: "biz/assistant-v1",
      messages: [{ role: "user", content: "Hello there" }],
      stream: true,
    },
    "/v1/chat/completions",
    "text/event-stream"
  );
  assertSingleBusinessCall(calls);
  const raw = await result.response.text();
  assert.match(raw, /Business says hi/);
  assert.match(raw, /data: \[DONE\]/);
});

test("Anthropic Messages client: the reply is translated to a Claude message", async () => {
  const { result, calls } = await invoke(
    {
      model: "biz/assistant-v1",
      max_tokens: 64,
      messages: [{ role: "user", content: "Hello there" }],
      stream: false,
    },
    "/v1/messages",
    "application/json"
  );
  assertSingleBusinessCall(calls);
  const json = (await result.response.json()) as {
    type: string;
    content: Array<{ type: string; text: string }>;
  };
  assert.equal(json.type, "message");
  assert.equal(json.content.find((part) => part.type === "text")?.text, "Business says hi");
});
