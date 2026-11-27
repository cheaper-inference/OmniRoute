/**
 * Decision routing, step 5: the `http` decider — an operator URL that speaks the System One
 * wire (#18555) or the OpenAI chat-completions wire (#15641). URL validation, the 30 s
 * per-endpoint cooldown, out-of-menu and refusal handling, self-gateway refusal.
 */
import test from "node:test";
import assert from "node:assert/strict";

import { createHttpDecider } from "../../../open-sse/services/decision/httpDecider.ts";
import {
  DECISION_FAILURE_COOLDOWN_MS,
  createDecisionCooldown,
  normalizeDecisionBaseUrl,
} from "../../../open-sse/services/decision/config.ts";
import {
  OPENAI_DECISION_SYSTEM_PROMPT,
  extractJsonObject,
  resolveChatCompletionsUrl,
} from "../../../open-sse/services/decision/wires.ts";
import type { DecisionTransport } from "../../../open-sse/services/decision/transport.ts";

const request = {
  state: "write a sorting function",
  options: { cheap: "Model cheap", capable: "Model capable" },
  instructions: "pick a tier",
};

function recorder(respond: (url: string, body: Record<string, unknown>) => Response) {
  const calls: Array<{
    url: string;
    body: Record<string, unknown>;
    headers: Record<string, string>;
  }> = [];
  const transport: DecisionTransport = async (url, init) => {
    const body = JSON.parse(init.body);
    calls.push({ url, body, headers: init.headers });
    return respond(url, body);
  };
  return { calls, transport };
}

const systemOneAnswer = (choice: string) =>
  Response.json({
    model: "clef-flash",
    answers: {
      route: { type: "choice", choice, probabilities: { [choice]: 0.9 }, confidence: 0.9 },
    },
  });

test("base URL: http(s) only, no credentials, query or hash; trailing slashes dropped", () => {
  assert.equal(normalizeDecisionBaseUrl("https://d.invalid/proxy/"), "https://d.invalid/proxy");
  assert.equal(normalizeDecisionBaseUrl("ftp://d.invalid"), undefined);
  assert.equal(normalizeDecisionBaseUrl("https://user:pw@d.invalid"), undefined);
  assert.equal(normalizeDecisionBaseUrl("https://d.invalid/?k=1"), undefined);
  assert.equal(normalizeDecisionBaseUrl("https://d.invalid/#x"), undefined);
  assert.equal(normalizeDecisionBaseUrl("not a url"), undefined);
});

test("systemone wire: posts state + menu to <base>/v1/systemone with the referenced key", async () => {
  const { calls, transport } = recorder(() => systemOneAnswer("capable"));
  const decide = createHttpDecider({
    baseUrl: "https://decider.invalid/prefix/",
    wire: "systemone",
    model: "clef-flash",
    timeoutMs: 900,
    resolveApiKey: async () => "dk_live",
    transport,
    cooldown: createDecisionCooldown(),
  });
  const result = await decide(request);
  assert.equal(calls[0].url, "https://decider.invalid/prefix/v1/systemone");
  assert.equal(calls[0].headers.Authorization, "Bearer dk_live");
  assert.equal(calls[0].body.model, "clef-flash");
  assert.equal(calls[0].body.state, request.state);
  assert.deepEqual(calls[0].body.questions, {
    route: { type: "choice", instructions: "pick a tier", criteria: request.options },
  });
  assert.equal(result.ok, true);
  if (!result.ok) return;
  assert.equal(result.choice, "capable");
  assert.equal(result.backendModel, "clef-flash");
});

test("openai-chat wire: strict JSON prompt, temperature 0, no stream/tools, parsed answer", async () => {
  const { calls, transport } = recorder(() =>
    Response.json({
      model: "local-classifier",
      choices: [
        {
          message: {
            content:
              'Sure:\n```json\n{"answers":{"route":{"choice":"cheap","confidence":0.7,"probabilities":{"cheap":0.7,"capable":0.3}}}}\n```',
          },
        },
      ],
    })
  );
  const decide = createHttpDecider({
    baseUrl: "http://classifier.lan:8080/v1",
    wire: "openai-chat",
    model: "qwen-small",
    timeoutMs: 900,
    resolveApiKey: async () => null,
    transport,
    cooldown: createDecisionCooldown(),
  });
  const result = await decide(request);
  assert.equal(calls[0].url, "http://classifier.lan:8080/v1/chat/completions");
  assert.equal(calls[0].headers.Authorization, undefined, "keyless endpoints get no auth header");
  const body = calls[0].body as {
    model: string;
    temperature: number;
    stream: boolean;
    max_tokens: number;
    tools?: unknown;
    messages: Array<{ role: string; content: string }>;
  };
  assert.equal(body.model, "qwen-small");
  assert.equal(body.temperature, 0);
  assert.equal(body.stream, false);
  assert.ok(body.max_tokens > 0 && body.max_tokens <= 512);
  assert.equal(body.tools, undefined);
  assert.equal(body.messages[0].role, "system");
  assert.equal(body.messages[0].content, OPENAI_DECISION_SYSTEM_PROMPT);
  assert.match(body.messages[1].content, /write a sorting function/);
  assert.match(body.messages[1].content, /"cheap"/);
  assert.equal(result.ok, true);
  if (!result.ok) return;
  assert.equal(result.choice, "cheap");
  assert.equal(result.confidence, 0.7);
  assert.deepEqual(result.probabilities, { cheap: 0.7, capable: 0.3 });
});

test("a missing confidence is 0, never 1 (fail-safe for minConfidence, #15641)", async () => {
  const { transport } = recorder(() =>
    Response.json({
      choices: [{ message: { content: '{"answers":{"route":{"choice":"cheap"}}}' } }],
    })
  );
  const decide = createHttpDecider({
    baseUrl: "https://d.invalid",
    wire: "openai-chat",
    model: "m",
    timeoutMs: 500,
    resolveApiKey: async () => null,
    transport,
    cooldown: createDecisionCooldown(),
  });
  const result = await decide(request);
  assert.equal(result.ok && result.confidence, 0);
});

test("out-of-menu choices and refusals are failures, not routing decisions", async () => {
  const outside = createHttpDecider({
    baseUrl: "https://d.invalid",
    wire: "systemone",
    model: "m",
    timeoutMs: 500,
    resolveApiKey: async () => null,
    transport: async () => systemOneAnswer("gpt-9-unlisted"),
    cooldown: createDecisionCooldown(),
    now: () => 0,
  });
  assert.deepEqual(await outside(request), { ok: false, reason: "out_of_menu", latencyMs: 0 });

  const refused = createHttpDecider({
    baseUrl: "https://d.invalid",
    wire: "systemone",
    model: "m",
    timeoutMs: 500,
    resolveApiKey: async () => null,
    transport: async () => Response.json({ answers: { route: { type: "refusal" } } }),
    cooldown: createDecisionCooldown(),
    now: () => 0,
  });
  const result = await refused(request);
  assert.equal(!result.ok && result.reason, "refused");
});

test("missing URL/model and a self-gateway URL never call out", async () => {
  let calls = 0;
  const transport: DecisionTransport = async () => {
    calls += 1;
    return systemOneAnswer("cheap");
  };
  const common = {
    wire: "systemone" as const,
    timeoutMs: 500,
    resolveApiKey: async () => null,
    transport,
    cooldown: createDecisionCooldown(),
  };
  const noUrl = await createHttpDecider({ ...common, model: "m" })(request);
  assert.equal(!noUrl.ok && noUrl.reason, "not_configured");
  const badUrl = await createHttpDecider({ ...common, baseUrl: "ftp://x", model: "m" })(request);
  assert.equal(!badUrl.ok && badUrl.reason, "not_configured");
  const noModel = await createHttpDecider({ ...common, baseUrl: "https://d.invalid" })(request);
  assert.equal(!noModel.ok && noModel.reason, "not_configured");
  const previousPort = process.env.PORT;
  process.env.PORT = "20128";
  try {
    const self = await createHttpDecider({
      ...common,
      baseUrl: "http://127.0.0.1:20128/v1",
      model: "m",
    })(request);
    assert.equal(!self.ok && self.reason, "recursion");
  } finally {
    if (previousPort === undefined) delete process.env.PORT;
    else process.env.PORT = previousPort;
  }
  assert.equal(calls, 0);
});

test("a referenced connection without a key is missing_credential, without a call", async () => {
  let calls = 0;
  const decide = createHttpDecider({
    baseUrl: "https://d.invalid",
    wire: "systemone",
    model: "m",
    connectionId: "conn-x",
    timeoutMs: 500,
    resolveApiKey: async () => null,
    transport: async () => {
      calls += 1;
      return systemOneAnswer("cheap");
    },
    cooldown: createDecisionCooldown(),
  });
  assert.equal((await decide(request)).ok, false);
  assert.equal(calls, 0);
});

test("a failed call cools the endpoint down for 30 s; the next call is skipped", async () => {
  let clock = 1_000;
  let calls = 0;
  const cooldown = createDecisionCooldown(() => clock);
  const make = () =>
    createHttpDecider({
      baseUrl: "https://flaky.invalid",
      wire: "systemone",
      model: "m",
      timeoutMs: 500,
      resolveApiKey: async () => null,
      transport: async () => {
        calls += 1;
        return new Response("down", { status: 503 });
      },
      cooldown,
      now: () => clock,
    });
  const first = await make()(request);
  assert.deepEqual(first, { ok: false, reason: "http_error", status: 503, latencyMs: 0 });
  const second = await make()(request);
  assert.equal(!second.ok && second.reason, "cooldown");
  assert.equal(calls, 1);
  clock += DECISION_FAILURE_COOLDOWN_MS + 1;
  await make()(request);
  assert.equal(calls, 2, "the endpoint is called again once the cooldown expired");
});

test("extractJsonObject and the chat-completions URL helper (#15641)", () => {
  assert.deepEqual(extractJsonObject('prose {"a":1} tail'), { a: 1 });
  assert.equal(extractJsonObject("no json"), null);
  assert.equal(
    resolveChatCompletionsUrl("https://x.invalid"),
    "https://x.invalid/v1/chat/completions"
  );
  assert.equal(
    resolveChatCompletionsUrl("https://x.invalid/v1/chat/completions"),
    "https://x.invalid/v1/chat/completions"
  );
});
