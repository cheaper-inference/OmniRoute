/**
 * A bare model id that several active providers serve fails over between them.
 *
 * Without a combo of that exact name, provider inference used to pick the first active
 * provider and drop the rest: one provider's 429, 402 or 5xx failed the request even
 * though another connected provider serves the same model. The request is now retried
 * as the same direct request pinned to the next active provider. Client errors never
 * move on, a stored same-name combo still decides, a single candidate behaves exactly
 * as before, and an alternate the key does not admit is never called.
 */

import assert from "node:assert/strict";
import test from "node:test";

import { createChatPipelineHarness } from "../integration/_chatPipelineHarness.ts";

const harness = await createChatPipelineHarness("bare-model-provider-failover");
const { clearAllModelLockouts } = await import("../../open-sse/services/accountFallback.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const {
  BaseExecutor,
  apiKeysDb,
  buildRequest,
  combosDb,
  handleChat,
  resetStorage,
  seedConnection,
} = harness;
const { settingsDb } = harness;

// Served by both fireworks and cerebras in the static catalogs, and by nobody else.
const MODEL = "gpt-oss-120b";
type Upstream = "fireworks" | "cerebras" | "nvidia";
const calls: Upstream[] = [];
// Providers in the order they were first called (the executor's own same-provider
// retries repeat a provider; this asserts which providers were tried, in order).
const tried = () => [...new Set(calls)];

function upstreamOf(url: unknown): Upstream | null {
  const target = String(url);
  if (target.includes("fireworks")) return "fireworks";
  if (target.includes("cerebras")) return "cerebras";
  if (target.includes("nvidia")) return "nvidia"; // the emergency fallback provider
  return null;
}

const served = (upstream: Upstream) =>
  Response.json({
    id: `chatcmpl-${upstream}`,
    object: "chat.completion",
    choices: [
      { index: 0, message: { role: "assistant", content: upstream }, finish_reason: "stop" },
    ],
    usage: { prompt_tokens: 1, completion_tokens: 1, total_tokens: 2 },
  });
const rateLimited = () =>
  Response.json(
    { error: { message: "Rate limit exceeded", type: "rate_limit_error" } },
    { status: 429 }
  );
const unavailable = () =>
  Response.json(
    { error: { message: "Service unavailable", type: "server_error" } },
    { status: 503 }
  );

const streamed = (upstream: Upstream) =>
  new Response(
    [
      `data: ${JSON.stringify({ id: `chatcmpl-${upstream}`, object: "chat.completion.chunk", choices: [{ index: 0, delta: { role: "assistant", content: upstream }, finish_reason: null }] })}`,
      `data: ${JSON.stringify({ id: `chatcmpl-${upstream}`, object: "chat.completion.chunk", choices: [{ index: 0, delta: {}, finish_reason: "stop" }] })}`,
      "data: [DONE]",
      "",
    ].join("\n\n"),
    { status: 200, headers: { "Content-Type": "text/event-stream" } }
  );

function stubUpstreams(failing: Partial<Record<Upstream, () => Response>>) {
  calls.length = 0;
  globalThis.fetch = (async (url: unknown, init?: RequestInit) => {
    const upstream = upstreamOf(url);
    if (!upstream) return Response.json({ data: [] });
    calls.push(upstream);
    const failure = failing[upstream];
    if (failure) return failure();
    const wantsStream = typeof init?.body === "string" && JSON.parse(init.body).stream === true;
    return wantsStream ? streamed(upstream) : served(upstream);
  }) as typeof fetch;
}

function bareRequest(
  apiKey?: string,
  headers: Record<string, string> = {},
  stream = false,
  extraBody: Record<string, unknown> = {}
) {
  return buildRequest({
    authKey: apiKey,
    headers,
    body: {
      model: MODEL,
      messages: [{ role: "user", content: `Reply with OK only. ${crypto.randomUUID()}` }],
      max_tokens: 16,
      stream,
      ...extraBody,
    } as Record<string, unknown>,
  });
}

async function contentOf(response: Response) {
  const text = await response.text();
  try {
    return JSON.parse(text).choices?.[0]?.message?.content ?? text;
  } catch {
    return text;
  }
}

test.beforeEach(async () => {
  BaseExecutor.RETRY_CONFIG.delayMs = 0;
  await resetStorage();
  clearAllModelLockouts();
  // Measure routing, not waiting: no same-target cooldown restart.
  await settingsDb.updateSettings({ requestRetry: 0 });
});

test.afterEach(async () => {
  BaseExecutor.RETRY_CONFIG.delayMs = harness.originalRetryDelayMs;
  await resetStorage();
});

test.after(async () => {
  await harness.cleanup();
});

// Inference ranks the candidates; the test does not depend on which one comes first.
async function firstChoice(): Promise<Upstream> {
  stubUpstreams({});
  const response = await handleChat(bareRequest());
  assert.equal(response.status, 200, await response.clone().text());
  return calls[0];
}

for (const [label, failure] of [
  ["is rate limited", rateLimited],
  ["is unavailable", unavailable],
] as const) {
  test(`the first provider ${label}: the other active provider serves the bare id`, async () => {
    await seedConnection("fireworks");
    await seedConnection("cerebras");
    const first = await firstChoice();
    const other: Upstream = first === "fireworks" ? "cerebras" : "fireworks";

    stubUpstreams({ [first]: failure });
    const response = await handleChat(bareRequest());
    const content = await contentOf(response);
    assert.equal(response.status, 200, String(content));
    assert.equal(content, other);
    assert.deepEqual(tried(), [first, other]);
    assert.equal(response.headers.get("x-omniroute-fallback-attempts"), "1");
  });
}

test("a streaming request fails over before its first byte and streams from the other provider", async () => {
  await seedConnection("fireworks");
  await seedConnection("cerebras");
  const first = await firstChoice();
  const other: Upstream = first === "fireworks" ? "cerebras" : "fireworks";

  stubUpstreams({ [first]: rateLimited });
  const response = await handleChat(bareRequest(undefined, {}, true));
  const text = await response.text();
  assert.equal(response.status, 200, text);
  assert.match(response.headers.get("content-type") ?? "", /text\/event-stream/);
  assert.match(text, new RegExp(`"content":"${other}"`));
  assert.deepEqual(tried(), [first, other]);
});

test("both providers failing still answers with the upstream error", async () => {
  await seedConnection("fireworks");
  await seedConnection("cerebras");
  stubUpstreams({ fireworks: rateLimited, cerebras: rateLimited });
  const response = await handleChat(bareRequest());
  await response.text();
  assert.equal(response.status, 429);
  assert.deepEqual([...tried()].sort(), ["cerebras", "fireworks"]);
});

test("a single active provider behaves exactly as before", async () => {
  await seedConnection("fireworks");
  stubUpstreams({ fireworks: rateLimited });
  const response = await handleChat(bareRequest());
  await response.text();
  assert.equal(response.status, 429);
  assert.deepEqual(tried(), ["fireworks"]);
});

test("a stored combo named like the bare id still decides the route", async () => {
  await seedConnection("fireworks");
  await seedConnection("cerebras");
  await combosDb.createCombo({ name: MODEL, strategy: "priority", models: [`cerebras/${MODEL}`] });
  stubUpstreams({ cerebras: rateLimited });
  const response = await handleChat(bareRequest());
  await response.text();
  assert.equal(response.status, 429);
  assert.deepEqual(tried(), ["cerebras"]);
});

for (const [status, message] of [
  [400, "Invalid request: unsupported parameter"],
  [401, "Invalid API key"],
] as const) {
  test(`a ${status} from the first provider is answered, not failed over`, async () => {
    await seedConnection("fireworks");
    await seedConnection("cerebras");
    const first = await firstChoice();
    stubUpstreams({
      [first]: () =>
        Response.json({ error: { message, type: "invalid_request_error" } }, { status }),
    });
    const response = await handleChat(bareRequest());
    await response.text();
    assert.notEqual(response.status, 200);
    assert.deepEqual(tried(), [first]);
  });
}

test("out of credit (402) fails over to the same model before any emergency model swap", async () => {
  await seedConnection("fireworks");
  await seedConnection("cerebras");
  // The emergency fallback's provider is connected, so a premature model swap would be served.
  await seedConnection("nvidia");
  const first = await firstChoice();
  const other: Upstream = first === "fireworks" ? "cerebras" : "fireworks";
  stubUpstreams({
    [first]: () =>
      Response.json(
        { error: { message: "Insufficient credits", type: "insufficient_quota" } },
        { status: 402 }
      ),
  });
  const response = await handleChat(bareRequest());
  const content = await contentOf(response);
  assert.equal(response.status, 200, String(content));
  assert.equal(content, other);
  assert.equal(response.headers.get("x-omniroute-emergency-fallback"), null);
  assert.deepEqual(tried(), [first, other]);
});

test("the emergency model swap still applies once every provider of the model is out of credit", async () => {
  await seedConnection("fireworks");
  await seedConnection("cerebras");
  await seedConnection("nvidia");
  const outOfCredit = () =>
    Response.json(
      { error: { message: "Insufficient credits", type: "insufficient_quota" } },
      { status: 402 }
    );
  stubUpstreams({ fireworks: outOfCredit, cerebras: outOfCredit });
  const response = await handleChat(bareRequest());
  const content = await contentOf(response);
  assert.equal(response.status, 200, String(content));
  assert.equal(content, "nvidia");
  assert.deepEqual([...tried()].slice(0, 2).sort(), ["cerebras", "fireworks"]);
  assert.equal(tried().at(-1), "nvidia");
});

test("a key that allows exactly the bare id fails over across its providers", async () => {
  await seedConnection("fireworks");
  await seedConnection("cerebras");
  const first = await firstChoice();
  const other: Upstream = first === "fireworks" ? "cerebras" : "fireworks";
  const key = await apiKeysDb.createApiKey("bare failover allow bare", "machine-bare-allow");
  await apiKeysDb.updateApiKeyPermissions(key.id, { allowedModels: [MODEL] });

  stubUpstreams({ [first]: rateLimited });
  const response = await handleChat(bareRequest(key.key));
  const content = await contentOf(response);
  assert.equal(response.status, 200, String(content));
  assert.equal(content, other);
});

test("a request pinned to a connection never leaves it", async () => {
  await seedConnection("fireworks");
  await seedConnection("cerebras");
  const first = await firstChoice();
  const [pinned] = (await providersDb.getProviderConnections({ provider: first })) as {
    id: string;
  }[];

  stubUpstreams({ [first]: rateLimited });
  const response = await handleChat(
    bareRequest(undefined, { "x-omniroute-connection": pinned.id })
  );
  await response.text();
  assert.equal(response.status, 429);
  assert.deepEqual(tried(), [first]);
});

test("a combo grant naming the bare id does not lift blockedModels from an alternate", async () => {
  // `allowedCombos` naming a combo switches its targets past blockedModels. No stored
  // combo has this name, so the failover alternates must not inherit that grant.
  await seedConnection("fireworks");
  await seedConnection("cerebras");
  const first = await firstChoice();
  const other: Upstream = first === "fireworks" ? "cerebras" : "fireworks";
  const key = await apiKeysDb.createApiKey("bare failover combo grant", "machine-bare-grant");
  await apiKeysDb.updateApiKeyPermissions(key.id, {
    allowedModels: [MODEL],
    allowedCombos: [MODEL],
    blockedModels: [`${other}/${MODEL}`],
  });

  stubUpstreams({ [first]: rateLimited });
  const response = await handleChat(bareRequest(key.key));
  const body = await response.text();
  assert.deepEqual(tried(), [first], `blocked alternate was dispatched: ${calls}`);
  assert.equal(response.status, 429, body);
});

// A continuation belongs to the provider session that served it. Replaying opaque
// reasoning or a response id on another provider would move provider-bound state.
for (const [label, extra] of [
  ["a response id", { previous_response_id: "resp_previous" }],
  [
    "opaque reasoning",
    {
      input: [
        { type: "message", role: "user", content: "earlier turn" },
        { type: "reasoning", encrypted_content: "gAAAA-opaque-reasoning" },
      ],
    },
  ],
] as const) {
  test(`a body carrying ${label} never fails over to another provider`, async () => {
    await seedConnection("fireworks");
    await seedConnection("cerebras");
    const first = await firstChoice();
    stubUpstreams({
      [first]: () =>
        Response.json(
          { error: { message: "upstream boom", type: "server_error" } },
          { status: 500 }
        ),
    });
    const response = await handleChat(bareRequest(undefined, {}, false, extra));
    await response.text();
    assert.equal(response.status, 500);
    assert.deepEqual(tried(), [first], `continuation moved provider: ${calls}`);
  });
}

test("an alternate the key blocks is skipped: the client gets the real upstream error", async () => {
  await seedConnection("fireworks");
  await seedConnection("cerebras");
  const first = await firstChoice();
  const other: Upstream = first === "fireworks" ? "cerebras" : "fireworks";
  const key = await apiKeysDb.createApiKey("bare failover key", "machine-bare-failover");
  await apiKeysDb.updateApiKeyPermissions(key.id, { blockedModels: [`${other}/${MODEL}`] });

  stubUpstreams({ [first]: rateLimited });
  const response = await handleChat(bareRequest(key.key));
  const body = await response.text();
  assert.deepEqual(tried(), [first], `blocked alternate was dispatched: ${calls}`);
  // Not the policy's 403 for a target the client never asked for.
  assert.equal(response.status, 429, body);
});
