import test from "node:test";
import assert from "node:assert/strict";

import { normalizeHeaders } from "../../open-sse/utils/headers.ts";
import { createChatPipelineHarness } from "../integration/_chatPipelineHarness.ts";

// A provider that answers 200 with malformed tool-call arguments is reachable and
// healthy at the transport level; only that response is unusable. The non-streaming
// translator rejects it strictly, and that rejection must stay request-scoped:
// a structured 502 for the client, no provider-breaker failure, no connection cooldown,
// and combo fallback to the next target without counting a provider failure.

const harness = await createChatPipelineHarness("malformed-tool-args");
const { BaseExecutor, buildClaudeResponse, combosDb, getLatestCallLog, resetStorage, settingsDb } =
  harness;
const providersDb = await import("../../src/lib/db/providers.ts");
const { getCircuitBreaker, STATE } = await import("../../src/shared/utils/circuitBreaker.ts");
const { getAllModelLockouts } = await import("../../open-sse/services/accountFallback.ts");
const { invalidateDbCache } = await import("../../src/lib/db/readCache.ts");
const { translateNonStreamingResponse } =
  await import("../../open-sse/handlers/responseTranslator.ts");
const { extractToolSchemaMap } =
  await import("../../open-sse/translator/response/openai-responses/toolSchemas.ts");
const messagesRoute = await import("../../src/app/api/v1/messages/route.ts");
const { recentRoutingEvents } = await import("../../open-sse/services/routing/index.ts");

const CODE = "malformed_tool_call_arguments";
const MARKER = "ARG_CONTENT_MARKER";
const OPENAI_KEY = "sk-openai-malformed-tool-args";
const CLAUDE_KEY = "sk-claude-malformed-tool-args";
const FAILURE_THRESHOLD = 3;
const originalFetch = globalThis.fetch;

const clientTools = [
  {
    name: "Read",
    description: "read a file",
    input_schema: {
      type: "object",
      properties: { file_path: { type: "string" } },
      required: ["file_path"],
    },
  },
  {
    name: "Bash",
    description: "run a command",
    input_schema: {
      type: "object",
      properties: { command: { type: "string" } },
      required: ["command"],
    },
  },
];

const toolCallCompletion = (calls: Array<{ name: string; args: unknown }>) => ({
  id: "chatcmpl-malformed",
  object: "chat.completion",
  model: "o3-mini",
  choices: [
    {
      index: 0,
      message: {
        role: "assistant",
        content: null,
        tool_calls: calls.map((call, i) => ({
          id: `call_${i}`,
          type: "function",
          function: { name: call.name, arguments: call.args },
        })),
      },
      finish_reason: "tool_calls",
    },
  ],
  usage: { prompt_tokens: 10, completion_tokens: 5 },
});

const translate = (calls: Array<{ name: string; args: unknown }>, withSchemas = false) =>
  translateNonStreamingResponse(
    toolCallCompletion(calls),
    "openai",
    "claude",
    null,
    withSchemas ? extractToolSchemaMap({ tools: clientTools }) : null,
    undefined,
    withSchemas ? clientTools : undefined
  ) as { content: Array<{ type: string; name?: string; input?: unknown }>; stop_reason: string };

const isMalformedToolArgsError = (err: unknown) =>
  err instanceof SyntaxError &&
  err.message === "Tool-call arguments must be a JSON object" &&
  (err as { code?: unknown }).code === CODE;

const jsonResponse = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });

type UpstreamMode = "malformed" | "valid" | "transport" | "outage";
const calls = { openai: 0, claude: 0 };

function mockUpstream(mode: () => UpstreamMode) {
  globalThis.fetch = async (input, init: RequestInit = {}) => {
    if (String(input).includes("/__omniroute_event")) return new Response(null, { status: 204 });
    const headers = normalizeHeaders(init.headers);
    const auth = headers.authorization ?? headers.Authorization;
    const apiKey = headers["x-api-key"] ?? headers["X-Api-Key"];
    if (auth === `Bearer ${OPENAI_KEY}`) {
      calls.openai++;
      const current = mode();
      if (current === "transport") throw new TypeError("fetch failed");
      if (current === "outage") return jsonResponse({ error: { message: "overloaded" } }, 503);
      if (current === "valid")
        return jsonResponse(toolCallCompletion([{ name: "Bash", args: '{"command":"ls"}' }]));
      return jsonResponse(
        toolCallCompletion([{ name: "Bash", args: `{"command":"rm -rf ${MARKER}` }])
      );
    }
    if (apiKey === CLAUDE_KEY || auth === `Bearer ${CLAUDE_KEY}`) {
      calls.claude++;
      return buildClaudeResponse("fallback target answered");
    }
    throw new Error(`unexpected upstream ${String(input)}`);
  };
}

const postMessages = (model: string, content = "use a tool") =>
  messagesRoute.POST(
    new Request("http://localhost/v1/messages", {
      method: "POST",
      headers: { "content-type": "application/json", "x-omniroute-no-cache": "true" },
      body: JSON.stringify({
        model,
        max_tokens: 100,
        stream: false,
        messages: [{ role: "user", content }],
        tools: clientTools,
      }),
    })
  );

async function seedOpenAI() {
  await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "openai-malformed",
    apiKey: OPENAI_KEY,
    isActive: true,
    testStatus: "active",
  });
}

async function seedClaude() {
  await providersDb.createProviderConnection({
    provider: "claude",
    authType: "apikey",
    name: "claude-fallback",
    apiKey: CLAUDE_KEY,
    isActive: true,
    testStatus: "active",
  });
}

async function createFallbackCombo(name: string) {
  await combosDb.createCombo({
    name,
    strategy: "priority",
    config: { maxRetries: 0, retryDelayMs: 0 },
    models: ["openai/o3-mini", "claude/claude-sonnet-4.6"],
  });
}

const openAIModelLockouts = async () => {
  const connectionId = (await openAIConnection()).id;
  return getAllModelLockouts().filter(
    (lock) => lock.provider === "openai" && lock.connectionId === connectionId
  );
};

async function openAIConnection() {
  const [row] = (await providersDb.getProviderConnections({ provider: "openai" })) as Array<
    Record<string, unknown>
  >;
  return row;
}

test.beforeEach(async () => {
  BaseExecutor.RETRY_CONFIG.maxAttempts = 1;
  BaseExecutor.RETRY_CONFIG.delayMs = 0;
  await resetStorage();
  await settingsDb.updateSettings({
    requestRetry: 0,
    maxRetryIntervalSec: 0,
    resilienceSettings: {
      providerBreaker: {
        apikey: {
          failureThreshold: FAILURE_THRESHOLD,
          degradationThreshold: 2,
          resetTimeoutMs: 600_000,
        },
      },
    },
  });
  getCircuitBreaker("openai").reset();
  getCircuitBreaker("claude").reset();
  calls.openai = 0;
  calls.claude = 0;
});
test.afterEach(() => {
  globalThis.fetch = originalFetch;
});
test.after(async () => {
  await harness.cleanup();
});

for (const [label, args] of [
  ['the literal "null"', "null"],
  ["a JSON number", "42"],
  ["a JSON boolean", "true"],
  ["a JSON string", '"ls"'],
  ["an empty JSON array", "[]"],
  ["a JSON array", '[{"command":"ls"}]'],
  ["whitespace only", " \n\t"],
  ["unparseable text", "{not json"],
  ["a truncated object", '{"command":"ls'],
  ["a non-string array", [{ command: "ls" }]],
  ["a non-string number", 5],
  ["a non-string true", true],
] as const) {
  test(`tool arguments that are ${label} are rejected with ${CODE}`, () => {
    assert.throws(() => translate([{ name: "Bash", args }]), isMalformedToolArgsError);
  });
}

for (const [label, args, expected] of [
  ["a JSON object string", '{"command":"ls"}', { command: "ls" }],
  ["a non-string object", { command: "ls" }, { command: "ls" }],
  ["a non-string 0", 0, {}],
  ["a non-string false", false, {}],
] as const) {
  test(`tool arguments that are ${label} still translate to a tool_use input`, () => {
    const out = translate([{ name: "Bash", args }]);
    const toolUse = out.content.find((block) => block.type === "tool_use");
    assert.deepEqual(toolUse?.input, expected);
    assert.equal(out.stop_reason, "tool_use");
  });
}

test("one malformed call rejects the whole response, in either position", () => {
  const valid = { name: "Read", args: '{"file_path":"/a"}' };
  const malformed = { name: "Bash", args: "[1]" };
  assert.throws(() => translate([valid, malformed]), isMalformedToolArgsError);
  assert.throws(() => translate([malformed, valid]), isMalformedToolArgsError);
});

test("several valid tool calls keep their order, inputs and tool_use stop reason", () => {
  const out = translate([
    { name: "Bash", args: '{"command":"ls"}' },
    { name: "Read", args: '{"file_path":"/a"}' },
  ]);
  assert.deepEqual(
    out.content.filter((block) => block.type === "tool_use").map((b) => [b.name, b.input]),
    [
      ["Bash", { command: "ls" }],
      ["Read", { file_path: "/a" }],
    ]
  );
  assert.equal(out.stop_reason, "tool_use");
});

test("the Read shim still normalizes a valid call and never runs on a malformed one", () => {
  const alias = translate([{ name: "Read", args: '{"path":"/tmp/a.txt"}' }], true);
  assert.deepEqual(alias.content.find((block) => block.type === "tool_use")?.input, {
    file_path: "/tmp/a.txt",
  });
  for (const args of ['{"file_path":"/tmp/a', "[]", "null"]) {
    assert.throws(() => translate([{ name: "Read", args }], true), isMalformedToolArgsError);
  }
});

test("a malformed tool call returns a structured, content-free 502", async () => {
  await seedOpenAI();
  mockUpstream(() => "malformed");

  const response = await postMessages("openai/o3-mini");
  const text = await response.text();

  assert.equal(response.status, 502);
  assert.match(response.headers.get("content-type") ?? "", /application\/json/);
  const body = JSON.parse(text);
  assert.equal(body.error.code, CODE);
  assert.equal(body.error.type, "upstream_response_error");
  assert.equal(typeof body.error.message, "string");
  assert.equal(calls.openai, 1, "the answered call must not be replayed on the same account");
  assert.ok(!text.includes(MARKER), "the response must not echo tool-call argument content");
  assert.ok(!text.includes("rm -rf"), "the response must not echo tool-call argument content");

  const log = (await getLatestCallLog()) as Record<string, unknown> | null;
  assert.equal(log?.status, 502);
  assert.ok(!String(log?.error ?? "").includes(MARKER));

  const event = recentRoutingEvents(50).find(
    (e) => e.provider === "openai" && e.outcome === "malformed" && e.status === 502
  );
  assert.ok(event, "a malformed routing event must be recorded for the model");
});

test("repeated malformed responses neither open the breaker nor cool the connection", async () => {
  await seedOpenAI();
  let mode: UpstreamMode = "malformed";
  mockUpstream(() => mode);
  const breaker = getCircuitBreaker("openai");

  for (let i = 0; i < FAILURE_THRESHOLD + 1; i++) {
    const response = await postMessages("openai/o3-mini", `attempt ${i}`);
    assert.equal(response.status, 502);
    await response.arrayBuffer();
  }
  assert.equal(breaker.failureCount, 0);
  assert.equal(breaker.state, STATE.CLOSED);
  const connection = await openAIConnection();
  assert.equal(connection.testStatus, "active");
  assert.equal(connection.rateLimitedUntil ?? null, null);

  mode = "valid";
  const callsBefore = calls.openai;
  const healthy = await postMessages("openai/o3-mini", "healthy now");
  const body = (await healthy.json()) as {
    content: Array<{ type: string; input?: unknown }>;
    stop_reason: string;
  };
  assert.equal(healthy.status, 200);
  assert.equal(calls.openai, callsBefore + 1, "the valid request must reach the provider");
  assert.deepEqual(body.content.find((block) => block.type === "tool_use")?.input, {
    command: "ls",
  });
  assert.equal(body.stop_reason, "tool_use");
});

for (const [mode, status] of [
  ["transport", 502],
  ["outage", 503],
] as const) {
  test(`a genuine ${mode} failure still counts on the breaker and cools the connection`, async () => {
    await seedOpenAI();
    mockUpstream(() => mode);

    const response = await postMessages("openai/o3-mini");
    const body = (await response.json()) as { error?: { code?: string } };

    assert.equal(response.status, status);
    assert.notEqual(body.error?.code, CODE);
    assert.equal(getCircuitBreaker("openai").failureCount, 1);
    const connection = await openAIConnection();
    assert.equal(connection.testStatus, "unavailable");
    assert.ok(connection.rateLimitedUntil, "a genuine failure keeps its cooldown");
  });
}

test("a combo falls back past a malformed response without counting a provider failure", async () => {
  await seedOpenAI();
  await seedClaude();
  await createFallbackCombo("malformed-tool-args-combo");
  mockUpstream(() => "malformed");

  for (let i = 0; i < FAILURE_THRESHOLD; i++) {
    const response = await postMessages("malformed-tool-args-combo", `combo ${i}`);
    const body = (await response.json()) as { content?: Array<{ text?: string }> };
    assert.equal(response.status, 200);
    assert.equal(body.content?.[0]?.text, "fallback target answered");
  }
  assert.equal(calls.openai, FAILURE_THRESHOLD, "the malformed target stays eligible");
  assert.equal(calls.claude, FAILURE_THRESHOLD);
  assert.equal(getCircuitBreaker("openai").failureCount, 0);
  assert.equal(getCircuitBreaker("openai").state, STATE.CLOSED);
  assert.equal((await openAIConnection()).testStatus, "active");
});

test("a combo leaves no model lockout behind for a malformed target", async () => {
  await seedOpenAI();
  await seedClaude();
  await createFallbackCombo("malformed-tool-args-lockout-combo");
  mockUpstream(() => "malformed");

  for (let i = 0; i < 2; i++) {
    const response = await postMessages("malformed-tool-args-lockout-combo", `lockout ${i}`);
    assert.equal(response.status, 200);
    await response.arrayBuffer();
  }
  assert.equal(calls.openai, 2, "the second request must try the malformed target again");
  assert.deepEqual(await openAIModelLockouts(), []);
});

for (const [mode, status] of [
  ["transport", 502],
  ["outage", 503],
] as const) {
  test(`a combo still treats a genuine ${mode} failure as a provider failure`, async () => {
    await seedOpenAI();
    await seedClaude();
    await createFallbackCombo(`genuine-${mode}-combo`);
    mockUpstream(() => mode);

    const first = await postMessages(`genuine-${mode}-combo`, "first");
    const firstBody = (await first.json()) as { content?: Array<{ text?: string }> };
    assert.equal(first.status, 200, `fallback must answer after the ${status}`);
    assert.equal(firstBody.content?.[0]?.text, "fallback target answered");
    assert.ok(calls.openai >= 1);
    assert.equal(getCircuitBreaker("openai").failureCount, 1);
    const connection = await openAIConnection();
    assert.equal(connection.testStatus, "unavailable");
    assert.ok(connection.rateLimitedUntil, "a genuine failure keeps its cooldown");

    const openAICallsBefore = calls.openai;
    const second = await postMessages(`genuine-${mode}-combo`, "second");
    assert.equal(second.status, 200);
    await second.arrayBuffer();
    assert.equal(calls.openai, openAICallsBefore);
  });
}

test("a malformed response to a HALF_OPEN probe neither reopens the breaker nor counts", async () => {
  const resetTimeoutMs = 1000;
  await settingsDb.updateSettings({
    resilienceSettings: {
      providerBreaker: {
        apikey: { failureThreshold: FAILURE_THRESHOLD, degradationThreshold: 2, resetTimeoutMs },
      },
    },
  });
  invalidateDbCache();
  await seedOpenAI();
  let mode: UpstreamMode = "malformed";
  mockUpstream(() => mode);

  const warmup = await postMessages("openai/o3-mini", "warm up");
  assert.equal(warmup.status, 502);
  await warmup.arrayBuffer();
  const breaker = getCircuitBreaker("openai");
  for (let i = 0; i < FAILURE_THRESHOLD; i++) breaker._onFailure();
  assert.equal(breaker.state, STATE.OPEN);
  const failuresWhenOpened = breaker.failureCount;
  await new Promise((resolve) => setTimeout(resolve, resetTimeoutMs + 50));

  const probe = await postMessages("openai/o3-mini", "probe");
  await probe.arrayBuffer();
  assert.equal(probe.status, 502, "the probe reached the provider and got a malformed reply");
  assert.equal(calls.openai, 2);
  assert.notEqual(breaker.state, STATE.OPEN, "a malformed probe reply must not reopen the breaker");
  assert.equal(breaker.failureCount, failuresWhenOpened);

  mode = "valid";
  await new Promise((resolve) => setTimeout(resolve, resetTimeoutMs + 50));
  const healthy = await postMessages("openai/o3-mini", "healthy probe");
  await healthy.arrayBuffer();
  assert.equal(healthy.status, 200);
  assert.equal(breaker.state, STATE.CLOSED);
});
