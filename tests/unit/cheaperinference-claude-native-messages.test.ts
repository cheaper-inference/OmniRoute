import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { setTimeout as delay } from "node:timers/promises";
import { CALL_LOG_SETTLE_TIMEOUT_MS } from "../helpers/callLogSettle.ts";

const testRoot = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-cinf-messages-"));
const originalDataDir = process.env.DATA_DIR;
const originalPluginsDir = process.env.OMNIROUTE_PLUGINS_DIR;
process.env.DATA_DIR = path.join(testRoot, "data");
process.env.OMNIROUTE_PLUGINS_DIR = path.join(testRoot, "plugins");
fs.mkdirSync(process.env.DATA_DIR);
fs.mkdirSync(process.env.OMNIROUTE_PLUGINS_DIR);

const { resetDbInstance } = await import("../../src/lib/db/core.ts");
const { waitForCallLogSaves } = await import("../../src/lib/usage/callLogs.ts");
const { handleChatCore } = await import("../../open-sse/handlers/chatCore.ts");
const { getModelTargetFormat } = await import("../../open-sse/config/providerModels.ts");
const { CHEAPERINFERENCE_MODELS } =
  await import("../../open-sse/config/providers/registry/cheaperinference/index.ts");
const { CheaperInferenceExecutor } = await import("../../open-sse/executors/cheaperinference.ts");

const CLAUDE_MODEL = "claude-sonnet-4.5";
const CUSTOM_CLAUDE_MODEL = "claude-custom";
const CHAT_MODEL = "deepseek-v4-flash";
const RESPONSES_MODEL = "gpt-5.5";
const CREDENTIALS = { apiKey: "cinf-test-key" };
const CACHE_CONTROL = { type: "ephemeral" };
const USER_AGENT = "claude-cli/2.1.0 (external, cli)";

function billingLine(cch: string) {
  return `x-anthropic-billing-header: cc_version=2.1.0; cc_entrypoint=cli; cch=${cch};`;
}

function claudeBody(cch = "abc12") {
  return {
    model: CLAUDE_MODEL,
    max_tokens: 64,
    stream: false,
    system: [
      { type: "text", text: billingLine(cch) },
      { type: "text", text: "You are Claude Code", cache_control: CACHE_CONTROL },
    ],
    tools: [
      {
        name: "lookup",
        description: "Look up a record",
        input_schema: { type: "object", properties: {} },
        cache_control: CACHE_CONTROL,
      },
    ],
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: "Background context" },
          { type: "text", text: "Look up the record", cache_control: CACHE_CONTROL },
        ],
      },
    ],
  };
}

test.after(async () => {
  try {
    await waitForCallLogSaves(CALL_LOG_SETTLE_TIMEOUT_MS);
  } finally {
    resetDbInstance();
    if (originalDataDir === undefined) delete process.env.DATA_DIR;
    else process.env.DATA_DIR = originalDataDir;
    if (originalPluginsDir === undefined) delete process.env.OMNIROUTE_PLUGINS_DIR;
    else process.env.OMNIROUTE_PLUGINS_DIR = originalPluginsDir;
    fs.rmSync(testRoot, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});

test("all catalog Claude models use the native Claude format", () => {
  const claudeModels = CHEAPERINFERENCE_MODELS.filter(({ id }) => id.startsWith("claude-"));
  assert.ok(claudeModels.length > 0);
  for (const { id } of claudeModels) {
    assert.equal(getModelTargetFormat("cinf", id), "claude", id);
  }
});

test("non-Claude catalog models keep their Chat and Responses formats", () => {
  assert.equal(getModelTargetFormat("cinf", CHAT_MODEL), null);
  assert.equal(getModelTargetFormat("cinf", RESPONSES_MODEL), "openai-responses");
});

test("executor routes to Messages, Chat or Responses using the model format", () => {
  const executor = new CheaperInferenceExecutor();
  assert.match(executor.buildUrl(CLAUDE_MODEL, true), /\/v1\/messages$/);
  assert.match(executor.buildUrl(CHAT_MODEL, true), /\/v1\/chat\/completions$/);
  assert.match(executor.buildUrl(CUSTOM_CLAUDE_MODEL, true), /\/v1\/chat\/completions$/);
  assert.match(executor.buildUrl(RESPONSES_MODEL, true), /\/v1\/responses$/);
});

test("executor applies a string format override to URL, headers and body", () => {
  const executor = new CheaperInferenceExecutor();
  const messages = { ...CREDENTIALS, providerSpecificData: { targetFormat: "claude" } };
  const chat = { ...CREDENTIALS, providerSpecificData: { targetFormat: "openai" } };
  const responses = { ...CREDENTIALS, providerSpecificData: { targetFormat: "openai-responses" } };
  const body = { ...claudeBody(), model: CUSTOM_CLAUDE_MODEL };
  assert.match(executor.buildUrl(CUSTOM_CLAUDE_MODEL, false, 0, messages), /\/v1\/messages$/);
  assert.equal(
    executor.buildHeaders(messages, false, null, CUSTOM_CLAUDE_MODEL)["anthropic-version"],
    "2023-06-01"
  );
  assert.deepEqual(executor.transformRequest(CUSTOM_CLAUDE_MODEL, body, false, messages), {
    ...body,
    system: body.system.slice(1),
  });
  assert.match(executor.buildUrl(CLAUDE_MODEL, false, 0, chat), /\/v1\/chat\/completions$/);
  assert.equal(
    executor.buildHeaders(chat, false, null, CLAUDE_MODEL)["anthropic-version"],
    undefined
  );
  assert.match(executor.buildUrl(CLAUDE_MODEL, false, 0, responses), /\/v1\/responses$/);
  assert.deepEqual(executor.transformRequest(CLAUDE_MODEL, { input: "hello" }, false, responses), {
    input: "hello",
    store: false,
  });
});

test("native Claude requests drop the billing block and retain the rest of the payload", () => {
  const body = claudeBody();
  const original = structuredClone(body);
  const transformed = new CheaperInferenceExecutor().transformRequest(
    CLAUDE_MODEL,
    body,
    false,
    CREDENTIALS
  );

  assert.deepEqual(transformed, { ...original, system: original.system.slice(1) });
  assert.deepEqual(body, original);
});

test("native Claude requests strip the billing line from string and block system prompts", () => {
  const executor = new CheaperInferenceExecutor();
  const text = "You are Claude Code";
  const system = `${billingLine("abc12")}\r\n${text}`;
  const block = { type: "text", text: system, cache_control: CACHE_CONTROL };
  assert.deepEqual(executor.transformRequest(CLAUDE_MODEL, { system }, false, CREDENTIALS), {
    system: text,
  });
  assert.deepEqual(
    executor.transformRequest(CLAUDE_MODEL, { system: [block] }, false, CREDENTIALS),
    { system: [{ ...block, text }] }
  );
  assert.deepEqual(
    executor.transformRequest(CLAUDE_MODEL, { system: billingLine("abc12") }, false, CREDENTIALS),
    {}
  );
});

test("rotating the Claude Code billing hash leaves system and tools byte-identical", () => {
  const executor = new CheaperInferenceExecutor();
  const first = executor.transformRequest(
    CLAUDE_MODEL,
    claudeBody("abc12"),
    false,
    CREDENTIALS
  ) as ReturnType<typeof claudeBody>;
  const second = executor.transformRequest(
    CLAUDE_MODEL,
    claudeBody("def34"),
    false,
    CREDENTIALS
  ) as ReturnType<typeof claudeBody>;
  assert.equal(JSON.stringify(first.system), JSON.stringify(second.system));
  assert.equal(JSON.stringify(first.tools), JSON.stringify(second.tools));
});

test("chatCore sends Claude Code breakpoints to the native Messages endpoint", async (t) => {
  const calls: { url: string; headers: Headers; body: string }[] = [];
  t.mock.method(globalThis, "fetch", async (url: URL | string, init?: RequestInit) => {
    calls.push({ url: String(url), headers: new Headers(init?.headers), body: String(init?.body) });
    return Response.json({
      id: "msg_cinf",
      type: "message",
      role: "assistant",
      model: CLAUDE_MODEL,
      content: [{ type: "text", text: "ok" }],
      stop_reason: "end_turn",
      usage: { input_tokens: 12, output_tokens: 3 },
    });
  });
  const body = claudeBody();
  const result = await handleChatCore({
    body: structuredClone(body),
    modelInfo: { provider: "cheaperinference", model: CLAUDE_MODEL, extendedContext: false },
    credentials: { ...CREDENTIALS, providerSpecificData: {} },
    log: { debug() {}, info() {}, warn() {}, error() {} },
    clientRawRequest: {
      endpoint: "/v1/messages",
      body,
      headers: new Headers({ accept: "application/json", "user-agent": USER_AGENT }),
    },
    userAgent: USER_AGENT,
  } as Parameters<typeof handleChatCore>[0]);

  assert.equal(calls.length, 1);
  const [call] = calls;
  const markerCount = call.body.match(/"cache_control":/g)?.length ?? 0;
  assert.match(call.url, /\/v1\/messages$/, `upstream=${call.url}, cache_control=${markerCount}`);
  assert.ok(result.success);
  assert.equal(call.headers.get("authorization"), `Bearer ${CREDENTIALS.apiKey}`);
  assert.equal(call.headers.get("anthropic-version"), "2023-06-01");
  assert.equal(call.headers.get("content-encoding"), null);
  assert.doesNotMatch(call.body, /x-anthropic-billing-header/i);
  assert.ok(markerCount > 0);

  const sent = JSON.parse(call.body) as ReturnType<typeof claudeBody>;
  assert.ok(!("choices" in sent));
  assert.ok(!("store" in sent));
  assert.ok(sent.messages.every(({ role }) => role !== "system"));
  assert.equal(sent.system[0].text, "You are Claude Code");
  assert.deepEqual(sent.system[0].cache_control, CACHE_CONTROL);
  assert.deepEqual(sent.tools[0].cache_control, CACHE_CONTROL);
  const lastUser = sent.messages.findLast(({ role }) => role === "user");
  assert.deepEqual(lastUser?.content.at(-1)?.cache_control, CACHE_CONTROL);
});

test("chatCore sends the resolved Claude payload to Messages despite a conflicting connection format", async (t) => {
  const calls: { url: string; headers: Headers; body: string }[] = [];
  t.mock.method(globalThis, "fetch", async (url: URL | string, init?: RequestInit) => {
    calls.push({ url: String(url), headers: new Headers(init?.headers), body: String(init?.body) });
    return Response.json({
      id: "msg_cinf",
      type: "message",
      role: "assistant",
      model: CLAUDE_MODEL,
      content: [{ type: "text", text: "ok" }],
      stop_reason: "end_turn",
      usage: { input_tokens: 12, output_tokens: 3 },
    });
  });
  const credentials = { ...CREDENTIALS, providerSpecificData: { targetFormat: "openai" } };
  const result = await handleChatCore({
    body: {
      model: CLAUDE_MODEL,
      stream: false,
      messages: [
        { role: "system", content: "System prompt" },
        { role: "user", content: "Hello" },
      ],
    },
    modelInfo: { provider: "cheaperinference", model: CLAUDE_MODEL, extendedContext: false },
    credentials,
    log: { debug() {}, info() {}, warn() {}, error() {} },
  } as Parameters<typeof handleChatCore>[0]);

  assert.equal(calls.length, 1);
  const [call] = calls;
  assert.match(call.url, /\/v1\/messages$/);
  assert.equal(call.headers.get("anthropic-version"), "2023-06-01");
  const sent = JSON.parse(call.body);
  assert.equal(sent.messages.length, 1);
  assert.match(JSON.stringify(sent.system), /System prompt/);
  assert.equal(credentials.providerSpecificData.targetFormat, "openai");
  assert.ok(result.success);
});

test(
  "chatCore keeps explicit reasoning opt-out separate from an overlapping inferred effort",
  { timeout: 60_000 },
  async (t) => {
    const model = "claude-sonnet-4.6";
    const firstDispatched = Promise.withResolvers<void>();
    const secondDispatched = new AbortController();
    const sent: Record<string, unknown>[] = [];
    t.mock.method(globalThis, "fetch", async (_url: URL | string, init?: RequestInit) => {
      sent.push(JSON.parse(String(init?.body)));
      if (sent.length === 1) {
        firstDispatched.resolve();
        // Keep the first request in flight until the second takes its own upstream slot.
        await delay(8000, undefined, { signal: secondDispatched.signal }).catch((error) => {
          if (error.name !== "AbortError") throw error;
        });
      } else {
        secondDispatched.abort();
      }
      return Response.json({
        id: "msg_cinf",
        type: "message",
        role: "assistant",
        model,
        content: [{ type: "text", text: "ok" }],
        stop_reason: "end_turn",
        usage: { input_tokens: 12, output_tokens: 3 },
      });
    });
    const modelInfo = {
      provider: "cheaperinference",
      model,
      resolvedThinkingEffort: "high",
      extendedContext: false,
    };
    const send = (reasoning: { reasoning_effort?: string }) => {
      const body = {
        model,
        stream: false,
        temperature: 0,
        max_tokens: 2000,
        messages: [{ role: "user", content: "Compare concurrent reasoning choices" }],
        ...reasoning,
      };
      return handleChatCore({
        body,
        modelInfo,
        credentials: CREDENTIALS,
        clientRawRequest: { endpoint: "/v1/chat/completions", body, headers: new Headers() },
        log: { debug() {}, info() {}, warn() {}, error() {} },
      } as Parameters<typeof handleChatCore>[0]);
    };
    const first = send({});
    await Promise.race([firstDispatched.promise, first]);
    const results = await Promise.all([first, send({ reasoning_effort: "none" })]);

    assert.ok(results.every((result) => result.success));
    assert.equal(sent.length, 2);
    assert.ok(sent.some(({ thinking }) => thinking === undefined));
    assert.ok(
      sent.some(({ thinking }) => (thinking as { budget_tokens?: number })?.budget_tokens === 62000)
    );
  }
);
