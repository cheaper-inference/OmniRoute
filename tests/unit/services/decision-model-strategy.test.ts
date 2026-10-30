import assert from "node:assert/strict";
import test from "node:test";
import {
  DecisionModelStrategyImpl,
  resolveDecisionModelRoutingConfig,
} from "../../../open-sse/services/autoCombo/decisionModelStrategy.ts";
import { NadirStrategyImpl } from "../../../open-sse/services/autoCombo/nadirStrategy.ts";
import {
  getStrategy,
  listStrategies,
} from "../../../open-sse/services/autoCombo/routerStrategy.ts";
import type { ProviderCandidate } from "../../../open-sse/services/autoCombo/scoring.ts";

const pool = [
  { provider: "p", model: "cheap", circuitBreakerState: "CLOSED", costPer1MTokens: 1 },
  { provider: "q", model: "capable", circuitBreakerState: "CLOSED", costPer1MTokens: 5 },
] as ProviderCandidate[];
const context = {
  taskType: "general",
  messages: [{ role: "user", content: "Explain this code" }],
  decisionModel: {
    baseUrl: "https://decision.invalid/proxy/",
    model: "decision-model",
    apiKey: "secret",
    timeoutMs: 900,
  },
};
const fallback = {
  name: "rules",
  description: "fallback",
  select: (items: ProviderCandidate[]) => ({
    provider: items[0].provider,
    model: items[0].model,
    strategy: "rules",
    reason: "rules",
    candidatesConsidered: items.length,
    finalScore: 1,
  }),
};

test("single unique model falls back without network and preserves connection selection", async () => {
  const singleModelPool = [
    { ...pool[0], provider: "p", connectionId: "account-a" },
    { ...pool[0], provider: "q", connectionId: "account-b" },
  ] as ProviderCandidate[];
  for (const format of ["openai", "systemone"] as const) {
    let calls = 0;
    let fallbackPool: ProviderCandidate[] = [];
    const connectionFallback = {
      ...fallback,
      select: (items: ProviderCandidate[]) => {
        fallbackPool = items;
        return {
          provider: items[1].provider,
          model: items[1].model,
          connectionId: items[1].connectionId,
          strategy: "rules",
          reason: "rules selected account-b",
          candidatesConsidered: items.length,
          finalScore: 1,
        };
      },
    };
    const strategy = new DecisionModelStrategyImpl(
      {
        fallback: connectionFallback,
        transport: async () => {
          calls += 1;
          return Response.json({});
        },
      },
      format
    );

    const result = await strategy.selectAsync(singleModelPool, context);
    assert.equal(calls, 0, `${format} must skip decision-service I/O for a one-model pool`);
    assert.deepEqual(fallbackPool, singleModelPool);
    assert.equal(result.provider, "q");
    assert.equal(result.connectionId, "account-b");
    assert.match(result.reason, /one unique model/i);
  }
});

test("menu cap never truncates eligible connections or fallback candidates", async () => {
  const manyConnections = Array.from({ length: 51 }, (_, index) => ({
    ...pool[0],
    provider: `provider-${index}`,
    connectionId: `account-${index}`,
  }));
  const secondModel = {
    ...pool[1],
    provider: "last-provider",
    model: "second-model",
    connectionId: "last-account",
  };
  const largePool = [...manyConnections, secondModel] as ProviderCandidate[];
  let capturedMenu: string[] = [];
  let fallbackPool: ProviderCandidate[] = [];
  const connectionFallback = {
    ...fallback,
    select: (items: ProviderCandidate[]) => {
      fallbackPool = items;
      return {
        provider: items[0].provider,
        model: items[0].model,
        connectionId: items[0].connectionId,
        strategy: "rules",
        reason: "rules selected matching connection",
        candidatesConsidered: items.length,
        finalScore: 1,
      };
    },
  };
  const strategy = new DecisionModelStrategyImpl(
    {
      fallback: connectionFallback,
      transport: async (_url, init) => {
        const body = JSON.parse(init.body);
        capturedMenu = body.questions[0].choices.map((choice: { value: string }) => choice.value);
        return Response.json({
          answers: [{ type: "choice", name: "route_model", choice: "second-model" }],
        });
      },
    },
    "openai"
  );

  const result = await strategy.selectAsync(largePool, context);
  assert.deepEqual(capturedMenu, ["cheap", "second-model"]);
  assert.equal(fallbackPool.length, 1);
  assert.equal(fallbackPool[0].connectionId, "last-account");
  assert.equal(result.provider, "last-provider");
  assert.equal(result.connectionId, "last-account");
  assert.equal(result.candidatesConsidered, largePool.length);
});

test("OpenAI decisions request uses one documented choice and forwards all config", async () => {
  let captured:
    | {
        url: string;
        init: {
          headers: Record<string, string>;
          timeoutMs: number;
          body: string;
          signal: AbortSignal;
        };
      }
    | undefined;
  const strategy = new DecisionModelStrategyImpl(
    {
      fallback,
      transport: async (url, init) => {
        captured = { url, init };
        return Response.json({
          model: "backend-model",
          answers: [{ type: "choice", name: "route_model", choice: "capable" }],
        });
      },
    },
    "openai"
  );
  const result = await strategy.selectAsync(pool, {
    ...context,
    decisionModel: { ...context.decisionModel, apiKey: "test-decision-key" },
  });
  assert.equal(result.model, "capable");
  assert.equal(captured?.url, "https://decision.invalid/proxy/v1/decisions");
  assert.equal(captured?.init.timeoutMs, 900);
  assert.equal(captured?.init.headers.Authorization, "Bearer test-decision-key");
  const body = JSON.parse(captured!.init.body);
  assert.equal(body.model, "decision-model");
  assert.deepEqual(body.input[0], {
    type: "message",
    role: "user",
    content: [{ type: "input_text", text: "Explain this code" }],
  });
  assert.deepEqual(
    body.questions[0].choices.map((choice: { value: string }) => choice.value),
    ["cheap", "capable"]
  );
  assert.match(body.questions[0].instructions, /cheapest model tier/i);
});

test("format-specific timeout defaults, overrides, invalid values, and cap are independent", async () => {
  const original = process.env.OMNIROUTE_OPENAI_DECISION_TIMEOUT_MS;
  const systemOriginal = process.env.OMNIROUTE_SYSTEM_ONE_DECISION_TIMEOUT_MS;
  const captured: number[] = [];
  const systemOneCaptured: number[] = [];
  const strategy = new DecisionModelStrategyImpl(
    {
      fallback,
      transport: async (_url, init) => {
        captured.push(init.timeoutMs);
        return Response.json({
          model: "backend-model",
          answers: [{ type: "choice", name: "route_model", choice: "cheap" }],
        });
      },
    },
    "openai"
  );
  try {
    delete process.env.OMNIROUTE_OPENAI_DECISION_TIMEOUT_MS;
    process.env.OMNIROUTE_SYSTEM_ONE_DECISION_TIMEOUT_MS = "1800";
    await strategy.selectAsync(pool, {
      ...context,
      decisionModel: { baseUrl: "https://decision.invalid/first", model: "decision-model" },
    });
    const systemOneStrategy = new DecisionModelStrategyImpl(
      {
        fallback,
        transport: async (_url, init) => {
          systemOneCaptured.push(init.timeoutMs);
          return Response.json({
            model: "backend-model",
            answers: [{ type: "choice", name: "route_model", choice: "cheap" }],
          });
        },
      },
      "systemone"
    );
    await systemOneStrategy.selectAsync(pool, {
      ...context,
      decisionModel: { baseUrl: "https://decision.invalid/systemone", model: "decision-model" },
    });
    process.env.OMNIROUTE_OPENAI_DECISION_TIMEOUT_MS = "7500";
    await strategy.selectAsync(pool, {
      ...context,
      decisionModel: { baseUrl: "https://decision.invalid/second", model: "decision-model" },
    });
    process.env.OMNIROUTE_OPENAI_DECISION_TIMEOUT_MS = "60000";
    await strategy.selectAsync(pool, {
      ...context,
      decisionModel: { baseUrl: "https://decision.invalid/third", model: "decision-model" },
    });
    process.env.OMNIROUTE_OPENAI_DECISION_TIMEOUT_MS = "invalid";
    await strategy.selectAsync(pool, {
      ...context,
      decisionModel: { baseUrl: "https://decision.invalid/fourth", model: "decision-model" },
    });
  } finally {
    if (original === undefined) delete process.env.OMNIROUTE_OPENAI_DECISION_TIMEOUT_MS;
    else process.env.OMNIROUTE_OPENAI_DECISION_TIMEOUT_MS = original;
    if (systemOriginal === undefined) delete process.env.OMNIROUTE_SYSTEM_ONE_DECISION_TIMEOUT_MS;
    else process.env.OMNIROUTE_SYSTEM_ONE_DECISION_TIMEOUT_MS = systemOriginal;
  }
  assert.deepEqual(captured, [2_000, 7_500, 30_000, 2_000]);
  assert.deepEqual(systemOneCaptured, [1_800]);
});

test("combo timeout takes precedence over format-specific environment", async () => {
  const original = process.env.OMNIROUTE_OPENAI_DECISION_TIMEOUT_MS;
  let captured = 0;
  process.env.OMNIROUTE_OPENAI_DECISION_TIMEOUT_MS = "7500";
  try {
    const strategy = new DecisionModelStrategyImpl(
      {
        fallback,
        transport: async (_url, init) => {
          captured = init.timeoutMs;
          return Response.json({
            model: "backend-model",
            answers: [{ type: "choice", name: "route_model", choice: "cheap" }],
          });
        },
      },
      "openai"
    );
    await strategy.selectAsync(pool, context);
  } finally {
    if (original === undefined) delete process.env.OMNIROUTE_OPENAI_DECISION_TIMEOUT_MS;
    else process.env.OMNIROUTE_OPENAI_DECISION_TIMEOUT_MS = original;
  }
  assert.equal(captured, 900);
});

test("System One request and keyed choice response follow documented format", async () => {
  let captured = "";
  const strategy = new DecisionModelStrategyImpl(
    {
      fallback,
      transport: async (_url, init) => {
        captured = init.body;
        return Response.json({
          model: "backend-model",
          answers: { route_model: { type: "choice", choice: "cheap" } },
        });
      },
    },
    "systemone"
  );
  assert.equal((await strategy.selectAsync(pool, context)).model, "cheap");
  const body = JSON.parse(captured);
  assert.equal(body.model, "decision-model");
  assert.equal(body.state, "Explain this code");
  assert.equal(body.questions.route_model.type, "choice");
  assert.deepEqual(Object.keys(body.questions.route_model.criteria), ["cheap", "capable"]);
});

test("requires explicit config, rejects invalid URLs and safely falls back", async () => {
  let calls = 0;
  const strategy = new DecisionModelStrategyImpl(
    {
      fallback,
      transport: async () => {
        calls += 1;
        return Response.json({});
      },
    },
    "openai"
  );
  await strategy.selectAsync(pool, { ...context, decisionModel: {} });
  await strategy.selectAsync(pool, {
    ...context,
    decisionModel: { baseUrl: "https://u:p@x.test", model: "d" },
  });
  assert.equal(calls, 0);
});

test("malformed and out-of-menu answers fail open; errors are redacted and cooled down", async () => {
  let calls = 0;
  let now = 1;
  const strategy = new DecisionModelStrategyImpl(
    {
      now: () => now,
      transport: async () => {
        calls += 1;
        return Response.json({
          answers: [{ type: "choice", name: "route_model", choice: "not-in-pool" }],
        });
      },
      fallback,
    },
    "openai"
  );
  const result = await strategy.selectAsync(pool, context);
  assert.equal(result.strategy, "rules");
  assert.equal(result.model, "cheap");
  assert.equal(calls, 1);
  const httpFailure = new DecisionModelStrategyImpl(
    { transport: async () => new Response("private error", { status: 503 }), fallback },
    "openai"
  );
  assert.equal((await httpFailure.selectAsync(pool, context)).strategy, "rules");
  const malformed = new DecisionModelStrategyImpl(
    { transport: async () => Response.json({ answers: "refusal" }), fallback },
    "systemone"
  );
  assert.equal((await malformed.selectAsync(pool, context)).strategy, "rules");
  const broken = new DecisionModelStrategyImpl(
    {
      now: () => now,
      transport: async () => {
        calls += 1;
        throw new Error("secret url and prompt");
      },
      fallback,
    },
    "openai"
  );
  const failed = await broken.selectAsync(pool, context);
  assert.doesNotMatch(failed.reason, /secret|prompt|https:/i);
  await broken.selectAsync(pool, context);
  assert.equal(calls, 2);
  now += 31_000;
  await broken.selectAsync(pool, context);
  assert.equal(calls, 3);
});

test("timeout aborts pending transport and response-body parsing", async () => {
  for (const stage of ["transport", "body"] as const) {
    let signal: AbortSignal | undefined;
    const strategy = new DecisionModelStrategyImpl(
      {
        fallback,
        transport: async (_url, init) => {
          signal = init.signal;
          if (stage === "transport") return new Promise<Response>(() => undefined);
          return {
            ok: true,
            status: 200,
            json: () => new Promise<never>(() => undefined),
          } as Response;
        },
      },
      "openai"
    );
    const result = await strategy.selectAsync(pool, {
      ...context,
      decisionModel: { baseUrl: "https://decision.invalid", model: "decision", timeoutMs: 100 },
    });
    assert.equal(result.strategy, "rules");
    assert.equal(signal?.aborted, true, `${stage} should receive cancellation`);
  }
});

test("registry exposes both DecisionModel strategies and Nadir remains registered", async () => {
  for (const name of ["decision-openai", "decision-systemone", "nadir"]) {
    assert.equal(
      listStrategies().some((item) => item.name === name),
      true
    );
  }
  assert.equal(getStrategy("nadir").name, "nadir");
  assert.equal(getStrategy("decision-openai").name, "decision-openai");
  const nadir = new NadirStrategyImpl({
    fallback,
    transport: async () => Response.json({ selected_model: "capable", confidence: 0.9 }),
  });
  const nadirResult = await nadir.selectAsync(pool, {
    taskType: "general",
    messages: [{ role: "user", content: "Explain this code" }],
    nadir: { baseUrl: "https://nadir.invalid" },
  });
  assert.equal(nadirResult.strategy, "nadir");
  assert.equal(nadirResult.model, "capable");
});

test("resolveDecisionModelRoutingConfig normalizes raw combo config", () => {
  for (const raw of [undefined, null, "x", 5, ["https://decision.invalid"]])
    assert.equal(resolveDecisionModelRoutingConfig(raw), undefined);
  assert.deepEqual(
    resolveDecisionModelRoutingConfig({
      baseUrl: "  https://decision.invalid/proxy  ",
      model: " decision-model ",
      apiKey: "   ",
      timeoutMs: "1500",
      extra: "ignored",
    }),
    {
      apiKey: undefined,
      baseUrl: "https://decision.invalid/proxy",
      model: "decision-model",
      timeoutMs: 1500,
      descriptions: undefined,
    }
  );
  assert.deepEqual(resolveDecisionModelRoutingConfig({ model: 42, timeoutMs: -1 }), {
    apiKey: undefined,
    baseUrl: undefined,
    model: undefined,
    timeoutMs: undefined,
    descriptions: undefined,
  });
  assert.deepEqual(
    resolveDecisionModelRoutingConfig({
      descriptions: { " cheap ": " Fast and cheap ", capable: "   ", "": "x", other: 3 },
    })?.descriptions,
    { cheap: "Fast and cheap" }
  );
  assert.equal(
    resolveDecisionModelRoutingConfig({ descriptions: ["cheap"] })?.descriptions,
    undefined
  );
});

const answerFor = (format: "openai" | "systemone", choice: string) =>
  format === "openai"
    ? Response.json({ answers: [{ type: "choice", name: "route_model", choice }] })
    : Response.json({ answers: { route_model: { type: "choice", choice } } });

const sentDescriptions = (format: "openai" | "systemone", body: string) => {
  const parsed = JSON.parse(body);
  return format === "openai"
    ? Object.fromEntries(
        parsed.questions[0].choices.map((choice: { value: string; description: string }) => [
          choice.value,
          choice.description,
        ])
      )
    : parsed.questions.route_model.criteria;
};

test("generated descriptions rank distinct pool costs and stay plain when costs tie", async () => {
  const pricedPool = [
    ...pool,
    { provider: "r", model: "capable", circuitBreakerState: "CLOSED", costPer1MTokens: 2.5 },
    { provider: "s", model: "premium", circuitBreakerState: "CLOSED", costPer1MTokens: 15 },
  ] as ProviderCandidate[];
  for (const format of ["openai", "systemone"] as const) {
    const bodies: string[] = [];
    const strategy = new DecisionModelStrategyImpl(
      {
        fallback,
        transport: async (_url, init) => {
          bodies.push(init.body);
          return answerFor(format, "cheap");
        },
      },
      format
    );
    await strategy.selectAsync(pricedPool, context);
    assert.deepEqual(sentDescriptions(format, bodies[0]), {
      cheap: "Model cheap; estimated cost $1 per 1M tokens (cost rank 1 of 3, 1 = cheapest)",
      capable: "Model capable; estimated cost $2.5 per 1M tokens (cost rank 2 of 3, 1 = cheapest)",
      premium: "Model premium; estimated cost $15 per 1M tokens (cost rank 3 of 3, 1 = cheapest)",
    });
    const tiedPool = pool.map((item) => ({ ...item, costPer1MTokens: 1 }));
    await strategy.selectAsync(tiedPool, context);
    assert.deepEqual(sentDescriptions(format, bodies[1]), {
      cheap: "Model cheap",
      capable: "Model capable",
    });
  }
});

test("operator descriptions by model ID or provider/model replace generated text", async () => {
  for (const format of ["openai", "systemone"] as const) {
    let body = "";
    const strategy = new DecisionModelStrategyImpl(
      {
        fallback,
        transport: async (_url, init) => {
          body = init.body;
          return answerFor(format, "capable");
        },
      },
      format
    );
    await strategy.selectAsync(pool, {
      ...context,
      decisionModel: {
        ...context.decisionModel,
        descriptions: { cheap: "Small, fast model", "q/capable": "Strong reasoning and math" },
      },
    });
    assert.deepEqual(sentDescriptions(format, body), {
      cheap: "Small, fast model",
      capable: "Strong reasoning and math",
    });
  }
});

test("reasons name the choice, menu size and failure cause without leaking secrets", async () => {
  const selected = await new DecisionModelStrategyImpl(
    { fallback, transport: async () => answerFor("openai", "capable") },
    "openai"
  ).selectAsync(pool, context);
  assert.match(selected.reason, /^decision-openai: selected capable from 2 options \(rules\)$/);

  const outOfPool = await new DecisionModelStrategyImpl(
    { fallback, transport: async () => answerFor("systemone", "x".repeat(500)) },
    "systemone"
  ).selectAsync(pool, context);
  assert.match(outOfPool.reason, /fallback \(out-of-pool choice "x{100}" from 2 options\)/);

  const noChoice = await new DecisionModelStrategyImpl(
    { fallback, transport: async () => Response.json({ answers: [] }) },
    "openai"
  ).selectAsync(pool, context);
  assert.match(noChoice.reason, /fallback \(response carries no valid route_model choice\)/);

  const failures: Array<[string, () => Promise<Response>, RegExp]> = [
    ["http", async () => new Response("secret upstream body", { status: 503 }), /HTTP 503/],
    ["json", async () => new Response("not json", { status: 200 }), /invalid JSON response/],
    [
      "network",
      async () => {
        throw new Error("secret https://decision.invalid prompt");
      },
      /network error/,
    ],
    ["timeout", () => new Promise<Response>(() => undefined), /timeout after 900ms/],
  ];
  for (const [label, transport, cause] of failures) {
    let now = 1_000;
    const strategy = new DecisionModelStrategyImpl(
      { fallback, transport, now: () => now },
      "openai"
    );
    const failed = await strategy.selectAsync(pool, context);
    assert.match(failed.reason, cause, label);
    assert.match(failed.reason, /cooling down for 30s/, label);
    assert.doesNotMatch(failed.reason, /secret|prompt|https:|Explain this code/i, label);
    now += 12_500;
    const cooled = await strategy.selectAsync(pool, context);
    assert.match(cooled.reason, /cooling down for 18s; not called/, label);
  }
});

test("combo schema accepts descriptions and caps them at 50 entries", async () => {
  const { comboRuntimeConfigSchema } =
    await import("../../../src/shared/validation/schemas/combo.ts");
  const ok = comboRuntimeConfigSchema.safeParse({
    decisionModel: { descriptions: { "p/cheap": "Fast", capable: "Strong" } },
  });
  assert.equal(ok.success, true);
  const tooMany = Object.fromEntries(
    Array.from({ length: 51 }, (_, index) => [`model-${index}`, "text"])
  );
  assert.equal(
    comboRuntimeConfigSchema.safeParse({ decisionModel: { descriptions: tooMany } }).success,
    false
  );
  assert.equal(
    comboRuntimeConfigSchema.safeParse({ decisionModel: { descriptions: { cheap: "" } } }).success,
    false
  );
});

test("documented response details (confidence, choice probability, backend model) reach the reason", async () => {
  const openai = await new DecisionModelStrategyImpl(
    {
      fallback,
      transport: async () =>
        Response.json({
          model: "gpt-6-luna",
          answers: [
            {
              type: "choice",
              name: "route_model",
              choice: "capable",
              probabilities: [
                { value: "cheap", probability: 0.01 },
                { value: "capable", probability: 0.99 },
              ],
              confidence: 0.98,
            },
          ],
          usage: { input_tokens: 401, output_tokens: 0, total_tokens: 401 },
        }),
    },
    "openai"
  ).selectAsync(pool, context);
  assert.equal(openai.model, "capable");
  assert.equal(
    openai.reason,
    'decision-openai: selected capable from 2 options; confidence 0.98, p=0.99, decision model "gpt-6-luna" (rules)'
  );

  const systemOne = await new DecisionModelStrategyImpl(
    {
      fallback,
      transport: async () =>
        Response.json({
          model: "jev-1.13.0",
          answers: {
            route_model: {
              type: "choice",
              choice: "cheap",
              confidence: 0.86,
              probabilities: { cheap: 0.91234, capable: 0.08766 },
            },
          },
          usage: { input_tokens: 391, output_tokens: 67 },
        }),
    },
    "systemone"
  ).selectAsync(pool, context);
  assert.equal(systemOne.model, "cheap");
  assert.match(
    systemOne.reason,
    /selected cheap from 2 options; confidence 0\.86, p=0\.9123, decision model "jev-1\.13\.0"/
  );

  const refused = await new DecisionModelStrategyImpl(
    {
      fallback,
      transport: async () =>
        Response.json({
          model: "gpt-6-luna",
          answers: [{ type: "refusal", name: "route_model" }],
        }),
    },
    "openai"
  ).selectAsync(pool, context);
  assert.equal(refused.strategy, "rules");
  assert.match(
    refused.reason,
    /fallback \(decision model refused route_model; decision model "gpt-6-luna"\)/
  );

  const outOfPool = await new DecisionModelStrategyImpl(
    {
      fallback,
      transport: async () =>
        Response.json({
          model: "jev-1.13.0",
          answers: { route_model: { type: "choice", choice: "elsewhere", confidence: 0.5 } },
        }),
    },
    "systemone"
  ).selectAsync(pool, context);
  assert.match(
    outOfPool.reason,
    /out-of-pool choice "elsewhere" from 2 options; confidence 0\.5, decision model "jev-1\.13\.0"/
  );
});

test("parseDecisionAnswer normalizes both formats' probabilities and scores", async () => {
  const { parseDecisionAnswer } =
    await import("../../../open-sse/services/autoCombo/decisionModelStrategy.ts");
  assert.deepEqual(
    parseDecisionAnswer("openai", {
      model: "backend",
      answers: [
        {
          type: "choice",
          name: "route_model",
          choice: "cheap",
          confidence: 0.9,
          probabilities: [
            { value: "cheap", probability: 0.8 },
            { value: "capable", probability: 0.2 },
            { value: "bad", probability: "x" },
            null,
          ],
        },
      ],
    }),
    {
      choice: "cheap",
      refused: false,
      confidence: 0.9,
      probabilities: { cheap: 0.8, capable: 0.2 },
      backendModel: "backend",
    }
  );
  assert.deepEqual(
    parseDecisionAnswer("systemone", {
      answers: { route_model: { type: "refusal", probabilities: { cheap: 0.4, capable: 0.6 } } },
    }),
    {
      choice: undefined,
      refused: true,
      confidence: undefined,
      probabilities: { cheap: 0.4, capable: 0.6 },
      backendModel: undefined,
    }
  );
  for (const data of [null, [], "x"])
    assert.deepEqual(parseDecisionAnswer("openai", data), { refused: false, probabilities: {} });
  const malformed = parseDecisionAnswer("openai", { answers: "x" });
  assert.equal(malformed.choice, undefined);
  assert.deepEqual(malformed.probabilities, {});
});

test("resolveDecisionEndpoint prefers combo config over format env and reports gaps", async () => {
  const { resolveDecisionEndpoint } =
    await import("../../../open-sse/services/autoCombo/decisionModelStrategy.ts");
  const keys = [
    "OMNIROUTE_SYSTEM_ONE_DECISION_BASE_URL",
    "OMNIROUTE_SYSTEM_ONE_DECISION_MODEL",
    "OMNIROUTE_SYSTEM_ONE_DECISION_API_KEY",
    "OMNIROUTE_SYSTEM_ONE_DECISION_TIMEOUT_MS",
  ];
  const saved = keys.map((key) => process.env[key]);
  try {
    for (const key of keys) delete process.env[key];
    assert.deepEqual(resolveDecisionEndpoint("systemone", undefined), {
      error: "decision API base URL or decision model is not configured",
    });
    assert.deepEqual(
      resolveDecisionEndpoint("systemone", { baseUrl: "ftp://x.invalid", model: "m" }),
      { error: "invalid decision API base URL" }
    );
    process.env.OMNIROUTE_SYSTEM_ONE_DECISION_BASE_URL = "https://env.invalid/";
    process.env.OMNIROUTE_SYSTEM_ONE_DECISION_MODEL = "env-model";
    process.env.OMNIROUTE_SYSTEM_ONE_DECISION_API_KEY = "env-key";
    process.env.OMNIROUTE_SYSTEM_ONE_DECISION_TIMEOUT_MS = "1200";
    assert.deepEqual(resolveDecisionEndpoint("systemone", undefined), {
      url: "https://env.invalid/v1/systemone",
      model: "env-model",
      apiKey: "env-key",
      timeoutMs: 1200,
    });
    assert.deepEqual(
      resolveDecisionEndpoint("systemone", {
        baseUrl: "https://combo.invalid/p",
        model: "combo-model",
        apiKey: "combo-key",
        timeoutMs: 700,
      }),
      {
        url: "https://combo.invalid/p/v1/systemone",
        model: "combo-model",
        apiKey: "combo-key",
        timeoutMs: 700,
      }
    );
  } finally {
    keys.forEach((key, index) => {
      if (saved[index] === undefined) delete process.env[key];
      else process.env[key] = saved[index];
    });
  }
});

test("decision preview schema accepts builder payloads and rejects unknown strategies", async () => {
  const { decisionPreviewSchema } = await import("../../../src/shared/validation/schemas/combo.ts");
  assert.equal(
    decisionPreviewSchema.safeParse({
      strategy: "decision-openai",
      models: ["p/cheap", "q/capable"],
      decisionModel: { model: "m", descriptions: { cheap: "Fast" } },
      prompt: "Hi",
    }).success,
    true
  );
  assert.equal(decisionPreviewSchema.safeParse({ strategy: "rules", models: [] }).success, false);
  assert.equal(
    decisionPreviewSchema.safeParse({
      strategy: "decision-systemone",
      models: [],
      decisionModel: { unknown: true },
    }).success,
    false
  );
});
