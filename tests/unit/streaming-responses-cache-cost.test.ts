import assert from "node:assert/strict";
import test from "node:test";
import { createSSEStream } from "../../open-sse/utils/stream.ts";
import { FORMATS } from "../../open-sse/translator/formats.ts";
import {
  normalizeUsage,
  sanitizeProviderUsageForRequest,
} from "../../open-sse/utils/usageTracking.ts";
import { recordStreamingCost } from "../../open-sse/handlers/chatCore/streamingCost.ts";
import { recordStreamingConsumption } from "../../src/lib/quota/spendRecorder.ts";
import { computeCostFromPricing } from "../../src/lib/usage/costCalculator.ts";
import { resetDbInstance } from "../../src/lib/db/core.ts";

type Usage = Record<string, unknown>;
type CostUsage = Parameters<typeof computeCostFromPricing>[1];
const PRICING = { input: 2, cached: 0.2, output: 10, reasoning: 20, cache_creation: 2.5 };
const UPSTREAM_USAGE = {
  input_tokens: 100_000,
  input_tokens_details: { cached_tokens: 95_000 },
  output_tokens: 100,
  output_tokens_details: { reasoning_tokens: 0 },
  total_tokens: 100_100,
};
// The prompt must be large enough for the real input-plausibility guard.
const BODY = {
  model: "gpt-6-sol",
  messages: [{ role: "user", content: "synthetic token ".repeat(30_000) }],
  stream: true,
  stream_options: { include_usage: true },
};

function assertCost(actual: number, expected: number): void {
  assert.ok(Math.abs(actual - expected) < 1e-12, `actual=${actual}, expected=${expected}`);
}

async function replay(
  mode: "translate" | "passthrough",
  upstreamUsage: Usage = UPSTREAM_USAGE,
  direction: "responses-to-chat" | "chat-to-responses" = "responses-to-chat",
  modelOverride?: string
) {
  const reverse = direction === "chat-to-responses";
  const provider = reverse ? "alibaba" : "codex";
  const model = modelOverride ?? (reverse ? "deepseek-v4-pro" : BODY.model);
  const body = reverse ? { model, input: BODY.messages, stream: true } : BODY;
  let usage: Usage | undefined;
  let callbackCount = 0;
  let ledgerCost: number | undefined;
  let quotaCost: number | undefined;
  let quotaTokens: number | undefined;
  let quotaCompletion: Promise<void> | undefined;
  let resolverCalls = 0;
  const calculateCost: Parameters<typeof recordStreamingCost>[0]["calculateCost"] = async (
    provider,
    model,
    tokens,
    options
  ) => {
    assert.equal(tokens, usage, "each cost consumer receives the exact callback usage");
    resolverCalls++;
    return computeCostFromPricing(PRICING, tokens, { provider, model, ...options });
  };
  const stream = createSSEStream({
    mode,
    sourceFormat: mode === "passthrough" || reverse ? FORMATS.OPENAI_RESPONSES : FORMATS.OPENAI,
    targetFormat: reverse ? FORMATS.OPENAI : FORMATS.OPENAI_RESPONSES,
    clientResponseFormat:
      mode === "passthrough" || reverse ? FORMATS.OPENAI_RESPONSES : FORMATS.OPENAI,
    provider,
    model,
    body,
    onComplete(payload) {
      callbackCount++;
      assert.equal(payload.status, 200);
      assert.ok(payload.usage && typeof payload.usage === "object");
      usage = payload.usage as Usage;
      recordStreamingCost({
        apiKeyId: "cache-cost-key",
        provider,
        model,
        streamUsage: usage as Record<string, number>,
        calculateCost,
        recordCost(apiKeyId, amount, details) {
          assert.equal(apiKeyId, "cache-cost-key");
          assert.equal(details?.tokens, usage, "ledger retains the raw usage receipt");
          ledgerCost = amount;
        },
        ledger: { success: true, requestId: "cache-cost-stream" },
      });
      quotaCompletion = recordStreamingConsumption(
        {
          apiKeyId: "cache-cost-key",
          connectionId: "cache-cost-connection",
          provider,
          model,
          streamUsage: usage,
          streamStatus: payload.status,
        },
        {
          calculateCost,
          schedule(input) {
            quotaCost = input.cost.usd;
            quotaTokens = input.cost.tokens;
          },
        }
      );
    },
  });
  const response = { id: "resp-cache-cost", object: "response", model };
  const chat = { id: "chatcmpl-cache-cost", object: "chat.completion.chunk", created: 1, model };
  const events: Record<string, unknown>[] = reverse
    ? [
        { ...chat, choices: [{ index: 0, delta: { role: "assistant" }, finish_reason: null }] },
        { ...chat, choices: [{ index: 0, delta: { content: "Hello" }, finish_reason: null }] },
        {
          ...chat,
          choices: [{ index: 0, delta: {}, finish_reason: "stop" }],
          usage: upstreamUsage,
        },
      ]
    : [
        {
          type: "response.created",
          sequence_number: 0,
          response: { ...response, status: "in_progress", output: [] },
        },
        {
          type: "response.output_text.delta",
          sequence_number: 1,
          item_id: "msg-cache-cost",
          output_index: 0,
          content_index: 0,
          delta: "Hello",
        },
        {
          type: "response.completed",
          sequence_number: 2,
          response: {
            ...response,
            status: "completed",
            output: [
              {
                id: "msg-cache-cost",
                type: "message",
                role: "assistant",
                status: "completed",
                content: [{ type: "output_text", text: "Hello", annotations: [] }],
              },
            ],
            usage: upstreamUsage,
          },
        },
      ];
  const writer = stream.writable.getWriter();
  const reading = new Response(stream.readable).text();
  for (const event of events) {
    const eventLine = event.type ? `event: ${event.type}\n` : "";
    await writer.write(new TextEncoder().encode(`${eventLine}data: ${JSON.stringify(event)}\n\n`));
  }
  await writer.write(new TextEncoder().encode("data: [DONE]\n\n"));
  await writer.close();
  const clientWire = await reading;
  assert.equal(callbackCount, 1);
  assert.ok(quotaCompletion, "quota consumer must run");
  await quotaCompletion;
  assert.ok(usage);
  assert.equal(resolverCalls, 2);
  assert.equal(typeof ledgerCost, "number");
  assert.equal(typeof quotaCost, "number");
  const directCost = computeCostFromPricing(PRICING, usage as CostUsage);
  console.log(
    JSON.stringify({ mode, direction, provider, model, usage, directCost, ledgerCost, quotaCost })
  );
  return { usage, directCost, ledgerCost, quotaCost, quotaTokens, clientWire };
}

test.after(() => resetDbInstance());

test("translated Responses streams discount cached input in the ledger and shared quota", async () => {
  const result = await replay("translate");
  assert.equal(result.usage.prompt_tokens, 100_000);
  assert.equal(result.usage.completion_tokens, 100);
  assert.deepEqual(result.usage.prompt_tokens_details, { cached_tokens: 95_000 });
  assert.equal(result.usage.cached_tokens, undefined);
  assert.match(result.clientWire, /"cached_tokens":95000/);
  // (5000 * 2 + 95000 * 0.2 + 100 * 10) / 1e6 = 0.03.
  assertCost(result.ledgerCost, 0.03);
  assertCost(result.quotaCost, 0.03);
  assertCost(result.directCost, 0.03);
  assert.equal(result.quotaTokens, 100_100);
});

for (const model of ["deepseek-v4-pro", "kimi-k3"]) {
  test(`translated Chat streams discount cached input for a Responses client (${model})`, async () => {
    const result = await replay(
      "translate",
      {
        prompt_tokens: 100_000,
        completion_tokens: 100,
        total_tokens: 100_100,
        prompt_tokens_details: { cached_tokens: 95_000 },
      },
      "chat-to-responses",
      model
    );
    assert.equal(result.usage.prompt_tokens ?? result.usage.input_tokens, 100_000);
    assert.equal(result.usage.completion_tokens ?? result.usage.output_tokens, 100);
    const details = (result.usage.input_tokens_details ??
      result.usage.prompt_tokens_details) as Usage;
    assert.equal(details.cached_tokens, 95_000);
    assert.equal(result.usage.cached_tokens, undefined);
    assert.match(result.clientWire, /"cached_tokens":95000/);
    assertCost(result.ledgerCost, 0.03);
    assertCost(result.quotaCost, 0.03);
    assertCost(result.directCost, 0.03);
  });
}

test("Responses passthrough retains its discounted streaming cost", async () => {
  const result = await replay("passthrough");
  assert.equal(result.usage.cached_tokens, 95_000);
  assertCost(result.ledgerCost, 0.03);
  assertCost(result.quotaCost, 0.03);
});

test("non-streaming normalized Responses usage retains its discounted cost", () => {
  const normalized = normalizeUsage(UPSTREAM_USAGE);
  assert.equal(normalized?.cached_tokens, 95_000);
  assertCost(computeCostFromPricing(PRICING, normalized), 0.03);
});

test("translated cache creation is subtracted once from an inclusive prompt", async () => {
  const result = await replay("translate", {
    ...UPSTREAM_USAGE,
    cache_creation_input_tokens: 4_000,
  });
  assert.equal(result.usage.prompt_tokens, 100_000);
  assert.deepEqual(result.usage.prompt_tokens_details, {
    cached_tokens: 95_000,
    cache_creation_tokens: 4_000,
    cache_creation_in_prompt: true,
  });
  // (1000 * 2 + 95000 * 0.2 + 4000 * 2.5 + 100 * 10) / 1e6 = 0.032.
  assertCost(result.ledgerCost, 0.032);
  assertCost(result.quotaCost, 0.032);
});

test("translated cache creation outside the prompt does not subtract uncached input", async () => {
  const result = await replay("translate", {
    ...UPSTREAM_USAGE,
    input_tokens: 96_000,
    total_tokens: 96_100,
    cache_creation_input_tokens: 4_000,
    input_tokens_details: { cached_tokens: 95_000, cache_creation_in_prompt: false },
  });
  assert.equal(result.usage.prompt_tokens, 96_000);
  assert.deepEqual(result.usage.prompt_tokens_details, {
    cached_tokens: 95_000,
    cache_creation_tokens: 4_000,
    cache_creation_in_prompt: false,
  });
  assertCost(result.ledgerCost, 0.032);
  assertCost(result.quotaCost, 0.032);
});

test("translated reasoning retains the output premium in both cost consumers", async () => {
  const result = await replay("translate", {
    ...UPSTREAM_USAGE,
    output_tokens_details: { reasoning_tokens: 40 },
  });
  assertCost(result.ledgerCost, 0.0304);
  assertCost(result.quotaCost, 0.0304);
});

for (const detailsKey of ["prompt_tokens_details", "input_tokens_details"]) {
  test(`${detailsKey} cache reads respect flat precedence and explicit zero`, () => {
    const usage = {
      prompt_tokens: 100_000,
      completion_tokens: 100,
      [detailsKey]: { cached_tokens: 95_000 },
    };
    assertCost(computeCostFromPricing(PRICING, usage as CostUsage), 0.03);
    for (const key of ["cacheRead", "cached_tokens", "cache_read_input_tokens"]) {
      assertCost(computeCostFromPricing(PRICING, { ...usage, [key]: 0 } as CostUsage), 0.201);
      assertCost(computeCostFromPricing(PRICING, { ...usage, [key]: 50_000 } as CostUsage), 0.111);
    }
  });

  for (const included of [false, true]) {
    test(`${detailsKey} cache creation honors cache_creation_in_prompt ${included}`, () => {
      const usage = {
        prompt_tokens: included ? 100_000 : 96_000,
        completion_tokens: 100,
        [detailsKey]: {
          cached_tokens: 95_000,
          cache_creation_tokens: 4_000,
          cache_creation_in_prompt: included,
        },
      };
      assertCost(computeCostFromPricing(PRICING, usage as CostUsage), 0.032);
    });
  }
}

test("cache detail aliases and explicit zeros retain their precedence", () => {
  const usage = {
    prompt_tokens: 100_000,
    completion_tokens: 100,
    cached_tokens: 95_000,
    prompt_tokens_details: { cache_write_tokens: 4_000 },
  };
  assertCost(computeCostFromPricing(PRICING, usage as CostUsage), 0.032);
  for (const key of ["cacheCreation", "cache_creation_input_tokens"]) {
    assertCost(computeCostFromPricing(PRICING, { ...usage, [key]: 0 } as CostUsage), 0.03);
  }
  assertCost(
    computeCostFromPricing(PRICING, {
      ...usage,
      prompt_tokens_details: { cache_creation_tokens: 0, cache_write_tokens: 4_000 },
    } as CostUsage),
    0.03
  );
  assertCost(
    computeCostFromPricing(PRICING, {
      prompt_tokens: 100_000,
      completion_tokens: 100,
      prompt_tokens_details: { cached_tokens: 0 },
      input_tokens_details: { cached_tokens: 95_000 },
    } as CostUsage),
    0.201
  );
  assertCost(
    computeCostFromPricing(
      PRICING,
      normalizeUsage({
        ...UPSTREAM_USAGE,
        cache_creation_input_tokens: 4_000,
      })
    ),
    0.032
  );
});

test("flat cache counters preserve precedence over nested details", () => {
  const usage = {
    input: 100_000,
    prompt_tokens: 200_000,
    output: 100,
    completion_tokens: 200,
    cacheRead: 95_000,
    cached_tokens: 90_000,
    cache_read_input_tokens: 80_000,
    cacheCreation: 4_000,
    cache_creation_input_tokens: 3_000,
    reasoning: 0,
    reasoning_tokens: 100,
    prompt_tokens_details: { cached_tokens: 1, cache_creation_tokens: 1 },
    completion_tokens_details: { reasoning_tokens: 100 },
  };
  assertCost(computeCostFromPricing(PRICING, usage as CostUsage), 0.032);
});

test("nested reasoning bills only the premium within inclusive output", () => {
  for (const key of ["completion_tokens_details", "output_tokens_details"]) {
    const usage = { ...UPSTREAM_USAGE, [key]: { reasoning_tokens: 40 } };
    assertCost(computeCostFromPricing(PRICING, usage as CostUsage), 0.0304);
    assertCost(
      computeCostFromPricing(PRICING, { ...usage, reasoning_tokens: 0 } as CostUsage),
      0.03
    );
  }
});

test("exact cost, flat-rate display and Codex service-tier semantics are unchanged", () => {
  const usage = UPSTREAM_USAGE as unknown as CostUsage;
  assertCost(computeCostFromPricing(null, { ...usage, cost_in_usd_ticks: 300_000_000 }), 0.03);
  assert.equal(
    computeCostFromPricing(
      PRICING,
      { ...usage, cost_in_usd_ticks: 0 },
      { provider: "codex", serviceTier: "priority" }
    ),
    0
  );
  assert.equal(
    computeCostFromPricing(PRICING, usage, { provider: "glm", flatRateAsZero: true }),
    0
  );
  assertCost(
    computeCostFromPricing(PRICING, usage, {
      provider: "codex",
      model: BODY.model,
      serviceTier: "priority",
    }),
    0.075
  );
  assertCost(
    computeCostFromPricing(PRICING, usage, {
      provider: "cx",
      model: BODY.model,
      serviceTier: "flex",
    }),
    0.015
  );
});

test("implausible provider cache details remain cleared before pricing", () => {
  const sanitized = sanitizeProviderUsageForRequest(
    UPSTREAM_USAGE,
    { messages: [{ role: "user", content: "hello" }] },
    FORMATS.OPENAI_RESPONSES
  );
  assert.equal(sanitized?.cache_read_input_tokens, 0);
  assert.deepEqual(sanitized?.input_tokens_details, { cached_tokens: 0 });
  const expected = ((sanitized?.input_tokens ?? 0) * 2 + 100 * 10) / 1_000_000;
  assertCost(computeCostFromPricing(PRICING, sanitized as CostUsage), expected);
});
