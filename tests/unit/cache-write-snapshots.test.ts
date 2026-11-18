import assert from "node:assert/strict";
import { test } from "node:test";
import { claudeToOpenAIResponse } from "../../open-sse/translator/response/claude-to-openai.ts";
import { openaiToClaudeResponse } from "../../open-sse/translator/response/openai-to-claude.ts";
import {
  openaiResponsesToOpenAIResponse,
  openaiToOpenAIResponsesResponse,
} from "../../open-sse/translator/response/openai-responses.ts";
import { createResponsesApiTransformStream } from "../../open-sse/transformer/responsesTransformer.ts";
import { resolveTrailingUsageSummary } from "../../open-sse/utils/passthroughTrailingUsage.ts";
import { createSSEStream } from "../../open-sse/utils/stream.ts";
import { FORMATS } from "../../open-sse/translator/formats.ts";
import { readCacheWriteUsage } from "../../open-sse/utils/cacheWriteUsage.ts";
import { resetDbInstance } from "../../src/lib/db/core.ts";
import { estimateApiEquivalentCacheWrite } from "../../src/lib/usage/cacheWriteEstimate.ts";

test.after(() => resetDbInstance());
type Usage = Record<string, unknown>;
const tiers = { ephemeral_5m_input_tokens: 30, ephemeral_1h_input_tokens: 70 };
const start: Usage = {
  input_tokens: 10,
  output_tokens: 0,
  cache_creation_input_tokens: 100,
  cache_creation: { ...tiers, provider_field: "retained" },
};
const rows = [
  { name: "empty final object", fragments: [{ cache_creation: {} }] },
  { name: "missing tiers", fragments: [{}] },
  { name: "null tiers", fragments: [{ cache_creation: null }] },
  {
    name: "partial later snapshot",
    fragments: [{ cache_creation: { ephemeral_5m_input_tokens: 30 } }],
  },
  {
    name: "successive partial snapshots",
    fragments: [
      { cache_creation: { ephemeral_5m_input_tokens: 40 } },
      { cache_creation: { ephemeral_1h_input_tokens: 60 } },
    ],
    five: 40,
    hour: 60,
    status: "inconsistent",
  },
  { name: "repeated cumulative snapshot", fragments: [start, start] },
  {
    name: "valid zero snapshot",
    fragments: [
      {
        cache_creation_input_tokens: 0,
        cache_creation: {
          ephemeral_5m_input_tokens: 0,
          ephemeral_1h_input_tokens: 0,
        },
      },
    ],
    five: 0,
    hour: 0,
    total: 0,
  },
  {
    name: "invalid later bucket remains invalid after empty fragment",
    fragments: [{ cache_creation: { ephemeral_5m_input_tokens: -1 } }, { cache_creation: {} }],
    status: "invalid",
  },
  {
    name: "malformed tier object remains invalid",
    fragments: [{ cache_creation: "malformed" }, {}],
    status: "invalid",
  },
  {
    name: "inconsistent later total remains inconsistent",
    fragments: [{ cache_creation_input_tokens: 10, cache_creation: tiers }, {}],
    total: 10,
    status: "inconsistent",
  },
  {
    name: "status-only inconsistent evidence",
    fragments: [{ cache_creation_tier_status: "inconsistent" }, {}],
    status: "inconsistent",
  },
] as const;

function message(usage: Usage) {
  return { id: "msg_synthetic", model: "synthetic-model", type: "message", usage };
}
function chatUsage(usage: Usage): Usage {
  return { prompt_tokens: 110, completion_tokens: 2, ...usage };
}
async function transformText(events: Usage[], transform: TransformStream, suffix = "\n\n") {
  const bytes = events
    .map(
      (event, index) =>
        `data: ${JSON.stringify(event)}${index === events.length - 1 ? suffix : "\n\n"}`
    )
    .join("");
  const upstream = new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(new TextEncoder().encode(bytes));
      controller.close();
    },
  });
  return new Response(upstream.pipeThrough(transform)).text();
}

type Adapter = { name: string; run: (fragments: Usage[]) => unknown | Promise<unknown> };
const adapters: Adapter[] = [
  {
    name: "Claude translator",
    run(fragments) {
      const state = { toolCalls: new Map(), usage: undefined as unknown };
      claudeToOpenAIResponse({ type: "message_start", message: message(start) }, state);
      for (const fragment of fragments) {
        claudeToOpenAIResponse(
          { type: "message_delta", usage: { output_tokens: 2, ...fragment } },
          state
        );
      }
      return state.usage;
    },
  },
  {
    name: "OpenAI to Claude translator",
    run(fragments) {
      const state = { toolCalls: new Map(), usage: undefined as unknown };
      for (const fragment of [start, ...fragments]) {
        openaiToClaudeResponse({ choices: [], usage: chatUsage(fragment) }, state);
      }
      return state.usage;
    },
  },
  {
    name: "OpenAI to Responses translator",
    run(fragments) {
      const state = { toolCalls: new Map(), usage: undefined as unknown };
      for (const fragment of [start, ...fragments]) {
        openaiToOpenAIResponsesResponse({ choices: [], usage: chatUsage(fragment) }, state);
      }
      return state.usage;
    },
  },
  {
    name: "Responses to OpenAI translator",
    run(fragments) {
      // The terminal closes this translator. Earlier usage is harvested into
      // the same request state by stream accounting, not a second terminal.
      const state = { toolCalls: new Map(), usage: start as unknown };
      for (const fragment of fragments.slice(0, -1)) {
        claudeToOpenAIResponse({ type: "message_delta", usage: fragment }, state);
      }
      openaiResponsesToOpenAIResponse(
        {
          type: "response.completed",
          response: {
            usage: { input_tokens: 110, output_tokens: 2, ...fragments.at(-1) },
            output: [],
          },
        },
        state
      );
      return state.usage;
    },
  },
  {
    name: "trailing OpenAI summary",
    run(fragments) {
      let current: unknown = chatUsage(start);
      for (const fragment of fragments) {
        current = resolveTrailingUsageSummary(chatUsage(fragment), current, {}, 0, FORMATS.OPENAI);
      }
      return current;
    },
  },
  {
    name: "Responses TransformStream",
    async run(fragments) {
      const events = [start, ...fragments].map((usage) => ({
        choices: [{ index: 0, delta: { content: "ok" }, finish_reason: null }],
        usage: chatUsage(usage),
      }));
      const text = await transformText(events, createResponsesApiTransformStream());
      const completed = text
        .split("\n")
        .filter((line) => line.startsWith("data: {"))
        .map((line) => JSON.parse(line.slice(6)))
        .findLast((event) => event.type === "response.completed");
      assert.ok(completed, text);
      return completed.response.usage;
    },
  },
];

for (const source of [FORMATS.CLAUDE, FORMATS.OPENAI, FORMATS.OPENAI_RESPONSES]) {
  for (const suffix of ["\n\n", "\n", ""]) {
    adapters.push({
      name: `Claude SSE to ${source} EOF=${JSON.stringify(suffix)}`,
      run: (fragments) => runSSE(FORMATS.CLAUDE, source, fragments, suffix),
    });
  }
}
for (const target of [FORMATS.OPENAI, FORMATS.OPENAI_RESPONSES]) {
  for (const suffix of ["\n\n", "\n", ""]) {
    adapters.push({
      name: `${target} passthrough EOF=${JSON.stringify(suffix)}`,
      run: (fragments) => runSSE(target, target, fragments, suffix),
    });
  }
}

async function runSSE(target: string, source: string, fragments: Usage[], suffix: string) {
  let completed: unknown;
  const transform = createSSEStream({
    mode: target === source ? "passthrough" : "translate",
    sourceFormat: source,
    targetFormat: target,
    clientResponseFormat: source,
    provider: "anthropic",
    model: "claude-synthetic",
    body: { messages: [{ role: "user", content: "synthetic" }] },
    onComplete(payload) {
      completed = payload.usage;
    },
  });
  let events: Usage[];
  if (target === FORMATS.CLAUDE) {
    events = [
      { type: "message_start", message: message(start) },
      { type: "content_block_start", index: 0, content_block: { type: "text", text: "" } },
      { type: "content_block_delta", index: 0, delta: { type: "text_delta", text: "ok" } },
      { type: "content_block_stop", index: 0 },
      ...fragments.map((fragment, index) => ({
        type: "message_delta",
        usage: { output_tokens: 2, ...fragment },
        delta: index === fragments.length - 1 ? { stop_reason: "end_turn" } : {},
      })),
    ];
  } else if (target === FORMATS.OPENAI) {
    events = [start, ...fragments].map((fragment, index) => ({
      id: "chatcmpl-synthetic",
      choices:
        index < fragments.length
          ? [{ index: 0, delta: { content: "ok" }, finish_reason: null }]
          : [],
      usage: chatUsage(fragment),
    }));
  } else {
    events = [start, ...fragments].map((fragment) => ({
      type: "response.completed",
      response: {
        id: "resp_synthetic",
        output: [],
        usage: { input_tokens: 110, output_tokens: 2, ...fragment },
      },
    }));
  }
  await transformText(events, transform, suffix);
  return completed;
}

for (const adapter of adapters) {
  for (const row of rows) {
    test(`${adapter.name}: ${row.name}`, async () => {
      const result = await adapter.run([...row.fragments]);
      const expected = {
        total: "total" in row ? row.total : 100,
        fiveMinute: "five" in row ? row.five : 30,
        oneHour: "hour" in row ? row.hour : 70,
        unknown: "status" in row ? ("total" in row ? row.total : 100) : 0,
        status: "status" in row ? row.status : "reported",
      };
      assert.deepEqual(readCacheWriteUsage(result), expected);
      const record = result as Usage;
      const detail = (record.cache_creation ??
        (record.input_tokens_details as Usage)?.cache_creation) as Usage;
      assert.equal(detail.provider_field, "retained");
    });
  }
}

test("long-context diagnostic uses the input rate, never the threshold as a price", () => {
  const usage = readCacheWriteUsage({
    cache_creation_input_tokens: 100,
    cache_creation: {
      ephemeral_5m_input_tokens: 100,
      ephemeral_1h_input_tokens: 0,
    },
  });
  const pricing = { input: 3, long_context: { threshold: 200_000, inclusive: true, input: 6 } };
  const estimate = estimateApiEquivalentCacheWrite(pricing, usage, {
    provider: "anthropic",
    model: "claude-opus",
    inputTokens: 200_000,
  });
  assert.equal(estimate.knownTierCostUsd, 0.00075);
  assert.equal(estimate.pricedTokens, 100);
  assert.equal(
    estimateApiEquivalentCacheWrite(pricing, usage, {
      provider: "xai",
      model: "grok-synthetic",
      inputTokens: 200_000,
    }).knownTierCostUsd,
    null
  );
});
