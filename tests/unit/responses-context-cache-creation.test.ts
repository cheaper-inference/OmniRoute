import test from "node:test";
import assert from "node:assert/strict";

import {
  sanitizeResponsesApiResponse,
  sanitizeStreamingChunk,
} from "../../open-sse/handlers/responseSanitizer.ts";
import { openaiToOpenAIResponsesResponse } from "../../open-sse/translator/response/openai-responses.ts";
import { createResponsesApiTransformStream } from "../../open-sse/transformer/responsesTransformer.ts";

import { getLoggedInputTokens } from "../../src/lib/usage/tokenAccounting.ts";

type Usage = Record<string, unknown>;

const cases = [
  {
    name: "cold Claude cache reports the whole context to Responses clients",
    usage: {
      prompt_tokens: 769,
      completion_tokens: 1120,
      total_tokens: 1889,
      prompt_tokens_details: { cache_creation_tokens: 170215, cache_creation_in_prompt: false },
    },
    input: 170984,
    total: 172104,
  },
  {
    name: "mixed cache reads and writes include the write exactly once",
    usage: {
      prompt_tokens: 110,
      completion_tokens: 7,
      total_tokens: 117,
      prompt_tokens_details: {
        cached_tokens: 100,
        cache_creation_tokens: 20,
        cache_creation_in_prompt: false,
      },
    },
    input: 130,
    total: 137,
  },
  {
    name: "warm cache totals already include cached input",
    usage: {
      prompt_tokens: 170984,
      completion_tokens: 211,
      total_tokens: 171195,
      prompt_tokens_details: { cached_tokens: 170215 },
    },
    input: 170984,
    total: 171195,
  },
  {
    name: "inclusive cache writes are not counted twice",
    usage: {
      prompt_tokens: 130,
      completion_tokens: 7,
      total_tokens: 137,
      prompt_tokens_details: { cache_creation_tokens: 20, cache_creation_in_prompt: true },
    },
    input: 130,
    total: 137,
  },
  {
    name: "unmarked cache writes keep the upstream inclusion contract",
    usage: {
      prompt_tokens: 130,
      completion_tokens: 7,
      total_tokens: 137,
      prompt_tokens_details: { cache_creation_tokens: 20 },
    },
    input: 130,
    total: 137,
  },
];

function assertUsage(actual: Usage, input: number, total: number, source: Usage) {
  assert.equal(actual.input_tokens, input);
  assert.equal(actual.total_tokens, total);
  const originalDetails = source.prompt_tokens_details as Record<string, unknown>;
  const details = actual.input_tokens_details as Record<string, unknown>;
  assert.equal(details?.cache_creation_tokens, originalDetails.cache_creation_tokens);
  if (originalDetails.cache_creation_in_prompt === false) {
    assert.equal(details.cache_creation_in_prompt, true);
  }
}

for (const fixture of cases) {
  test(`native Responses SSE: ${fixture.name}`, () => {
    const source = structuredClone(fixture.usage);
    const event = sanitizeStreamingChunk({
      type: "response.completed",
      response: {
        id: "resp-native",
        object: "response",
        status: "completed",
        output: [],
        usage: {
          input_tokens: source.prompt_tokens,
          output_tokens: source.completion_tokens,
          total_tokens: source.total_tokens,
          input_tokens_details: source.prompt_tokens_details,
        },
      },
    }) as { response: { usage: Usage } };
    assertUsage(event.response.usage, fixture.input, fixture.total, fixture.usage);
    assert.deepEqual(source, fixture.usage);
  });

  test(`non-streaming: ${fixture.name}`, () => {
    const source = structuredClone(fixture.usage);
    const response = sanitizeResponsesApiResponse({
      id: "chatcmpl-context",
      choices: [{ index: 0, message: { role: "assistant", content: "OK" }, finish_reason: "stop" }],
      usage: source,
    }) as { usage: Usage };
    assertUsage(response.usage, fixture.input, fixture.total, fixture.usage);
    assert.deepEqual(source, fixture.usage);
    const twice = sanitizeResponsesApiResponse(response) as { usage: Usage };
    assert.deepEqual(
      twice.usage,
      response.usage,
      "a second boundary must not add cache writes again"
    );
  });

  test(`live SSE: ${fixture.name}`, () => {
    const state: Record<string, unknown> = {
      seq: 0,
      responseId: "resp-context",
      created: 1,
      started: false,
      msgTextBuf: {},
      msgItemAdded: {},
      msgContentAdded: {},
      msgItemDone: {},
      reasoningId: "",
      reasoningIndex: -1,
      reasoningBuf: "",
      reasoningPartAdded: false,
      reasoningDone: false,
      inThinking: false,
      funcArgsBuf: {},
      funcArgsEscapeState: {},
      funcNames: {},
      funcCallIds: {},
      funcArgsDone: {},
      funcItemAdded: {},
      funcItemDone: {},
      completedOutputItems: [],
      completedSent: false,
    };
    const source = structuredClone(fixture.usage);
    const first = openaiToOpenAIResponsesResponse(
      {
        id: "chatcmpl-context",
        choices: [{ index: 0, delta: { content: "OK" }, finish_reason: "stop" }],
        usage: source,
      },
      state
    );
    const events = [...(first || []), ...(openaiToOpenAIResponsesResponse(null, state) || [])];
    const completed = events.find((event) => event.event === "response.completed");
    assert.ok(completed);
    assertUsage(completed.data.response.usage, fixture.input, fixture.total, fixture.usage);
    assert.equal(
      getLoggedInputTokens(state.usage),
      fixture.usage.prompt_tokens,
      "internal accounting keeps upstream units"
    );
    assert.deepEqual(source, fixture.usage);
  });

  test(`legacy SSE: ${fixture.name}`, async () => {
    const chunk = {
      id: "chatcmpl-context",
      choices: [{ index: 0, delta: { content: "OK" }, finish_reason: "stop" }],
      usage: structuredClone(fixture.usage),
    };
    const stream = new ReadableStream<Uint8Array>({
      start(controller) {
        controller.enqueue(
          new TextEncoder().encode(`data: ${JSON.stringify(chunk)}\n\ndata: [DONE]\n\n`)
        );
        controller.close();
      },
    }).pipeThrough(createResponsesApiTransformStream());
    const text = await new Response(stream).text();
    const events = text
      .split("\n")
      .filter((line) => line.startsWith("data: ") && line !== "data: [DONE]")
      .map((line) => JSON.parse(line.slice(6)));
    const completed = events.find((event) => event.type === "response.completed");
    assert.ok(completed);
    assertUsage(completed.response.usage, fixture.input, fixture.total, fixture.usage);
  });
}

for (const update of [
  {
    name: "fresh input without repeated cache details",
    usage: { prompt_tokens: 10, completion_tokens: 5, total_tokens: 15 },
  },
  { name: "output-only usage update", usage: { completion_tokens: 5 } },
  {
    name: "repeated raw cache details",
    usage: {
      prompt_tokens: 10,
      completion_tokens: 5,
      total_tokens: 15,
      prompt_tokens_details: { cache_creation_tokens: 100, cache_creation_in_prompt: false },
    },
  },
]) {
  test(`legacy SSE preserves cache provenance across ${update.name}`, async () => {
    const chunks = [
      {
        id: "chatcmpl-context",
        choices: [{ index: 0, delta: { content: "OK" }, finish_reason: null }],
        usage: {
          prompt_tokens: 10,
          completion_tokens: 0,
          total_tokens: 10,
          prompt_tokens_details: { cache_creation_tokens: 100, cache_creation_in_prompt: false },
        },
      },
      { choices: [{ index: 0, delta: {}, finish_reason: "stop" }], usage: update.usage },
    ];
    const stream = new ReadableStream<Uint8Array>({
      start(controller) {
        controller.enqueue(
          new TextEncoder().encode(
            chunks.map((chunk) => `data: ${JSON.stringify(chunk)}\n\n`).join("") +
              "data: [DONE]\n\n"
          )
        );
        controller.close();
      },
    }).pipeThrough(createResponsesApiTransformStream());
    const text = await new Response(stream).text();
    const events = text
      .split("\n")
      .filter((line) => line.startsWith("data: ") && line !== "data: [DONE]")
      .map((line) => JSON.parse(line.slice(6)));
    const completed = events.find((event) => event.type === "response.completed");
    assert.ok(completed);
    assert.equal(completed.response.usage.input_tokens, 110);
    assert.equal(completed.response.usage.output_tokens, 5);
    assert.equal(completed.response.usage.total_tokens, 115);
    assert.equal(completed.response.usage.input_tokens_details.cache_creation_in_prompt, true);
  });
}
