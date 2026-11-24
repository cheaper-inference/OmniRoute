import assert from "node:assert/strict";
import test from "node:test";
import { FORMATS } from "../../open-sse/translator/formats.ts";
import { initState } from "../../open-sse/translator/index.ts";
import { openaiResponsesToOpenAIResponse } from "../../open-sse/translator/response/openai-responses.ts";
import { openaiToClaudeResponse } from "../../open-sse/translator/response/openai-to-claude.ts";
import { normalizeUsage, type UsageLike } from "../../open-sse/utils/usageTracking.ts";
import { resetDbInstance } from "../../src/lib/db/core.ts";
import { computeCostFromPricing } from "../../src/lib/usage/costCalculator.ts";

test.after(() => resetDbInstance());

function responsesToChatCompletion(usage: UsageLike): { usage: UsageLike } {
  const chunk = openaiResponsesToOpenAIResponse(
    {
      type: "response.completed",
      response: { id: "synthetic-response", model: "synthetic-model", output: [], usage },
    },
    initState(FORMATS.OPENAI)
  );
  assert.ok(chunk && !Array.isArray(chunk));
  return chunk as { usage: UsageLike };
}

function claudeTerminalUsage(usage: UsageLike): unknown {
  const events = openaiToClaudeResponse(
    { choices: [{ index: 0, delta: { content: "ok" }, finish_reason: "stop" }], usage },
    initState(FORMATS.CLAUDE)
  );
  assert.ok(events);
  return events.find((event) => event.type === "message_delta")?.usage;
}

for (const details of ["input_tokens_details", "prompt_tokens_details"] as const) {
  test(`Responses accounts for ${details}.cache_write_tokens`, () => {
    const { usage } = responsesToChatCompletion({
      input_tokens: 1000,
      output_tokens: 10,
      [details]: { cached_tokens: 100, cache_write_tokens: 200 },
    });
    assert.equal(usage.prompt_tokens, 1000);
    assert.equal(usage.prompt_tokens_details?.cache_creation_tokens, 200);
    const normalized = normalizeUsage(usage);
    assert.equal(normalized?.cache_creation_input_tokens, 200);
    const price = { input: 2, output: 10, cached: 0.2, cache_creation: 2.5 };
    assert.ok(Math.abs(computeCostFromPricing(price, normalized) - 0.00202) < 1e-12);
    assert.deepEqual(claudeTerminalUsage(usage), {
      input_tokens: 700,
      output_tokens: 10,
      cache_read_input_tokens: 100,
      cache_creation_input_tokens: 200,
    });
  });

  test(`Claude usage projects ${details}.cache_write_tokens`, () => {
    assert.deepEqual(
      claudeTerminalUsage({
        prompt_tokens: 1000,
        completion_tokens: 10,
        [details]: { cached_tokens: 100, cache_write_tokens: 200 },
      }),
      {
        input_tokens: 700,
        output_tokens: 10,
        cache_read_input_tokens: 100,
        cache_creation_input_tokens: 200,
      }
    );
  });
}

test("a reported zero takes precedence over a nested positive cache write", () => {
  const { usage } = responsesToChatCompletion({
    input_tokens: 1000,
    output_tokens: 10,
    cache_creation_input_tokens: 0,
    input_tokens_details: { cached_tokens: 100, cache_write_tokens: 200 },
  });
  assert.equal(usage.cache_creation_input_tokens, 0);
  assert.deepEqual(claudeTerminalUsage(usage), {
    input_tokens: 900,
    output_tokens: 10,
    cache_read_input_tokens: 100,
    cache_creation_input_tokens: 0,
  });
});

test("a nested cache write outside the prompt is retained without subtraction", () => {
  const { usage } = responsesToChatCompletion({
    input_tokens: 1000,
    output_tokens: 10,
    input_tokens_details: {
      cached_tokens: 100,
      cache_write_tokens: 200,
      cache_creation_in_prompt: false,
    },
  });
  assert.equal(usage.prompt_tokens_details?.cache_creation_in_prompt, false);
  assert.deepEqual(claudeTerminalUsage(usage), {
    input_tokens: 900,
    output_tokens: 10,
    cache_read_input_tokens: 100,
    cache_creation_input_tokens: 200,
  });
});

test("Claude honors the cache-write marker with read and write details in different containers", () => {
  assert.deepEqual(
    claudeTerminalUsage({
      prompt_tokens: 1000,
      completion_tokens: 10,
      prompt_tokens_details: { cached_tokens: 100 },
      input_tokens_details: { cache_write_tokens: 200, cache_creation_in_prompt: false },
    }),
    {
      input_tokens: 900,
      output_tokens: 10,
      cache_read_input_tokens: 100,
      cache_creation_input_tokens: 200,
    }
  );
});

test("an unmarked top-level cache_write_tokens alias does not change fresh input", () => {
  const { usage } = responsesToChatCompletion({
    input_tokens: 1000,
    output_tokens: 10,
    cache_write_tokens: 200,
    input_tokens_details: { cached_tokens: 100 },
  });
  assert.equal(usage.cache_creation_input_tokens, undefined);
  assert.deepEqual(claudeTerminalUsage({ ...usage, cache_write_tokens: 200 }), {
    input_tokens: 900,
    output_tokens: 10,
    cache_read_input_tokens: 100,
  });
});

test("a nested inclusive cache write is counted once alongside a flat cache read", () => {
  const { usage } = responsesToChatCompletion({
    input_tokens: 1000,
    output_tokens: 10,
    cache_read_input_tokens: 100,
    input_tokens_details: { cache_write_tokens: 200 },
  });
  assert.equal(usage.prompt_tokens, 1100);
  assert.deepEqual(claudeTerminalUsage(usage), {
    input_tokens: 800,
    output_tokens: 10,
    cache_read_input_tokens: 100,
    cache_creation_input_tokens: 200,
  });
});

test("flat Claude counts still add external cache reads and writes to the Chat prompt", () => {
  const { usage } = responsesToChatCompletion({
    input_tokens: 1000,
    output_tokens: 10,
    cache_read_input_tokens: 100,
    cache_creation_input_tokens: 200,
  });
  assert.equal(usage.prompt_tokens, 1300);
  assert.deepEqual(claudeTerminalUsage(usage), {
    input_tokens: 1000,
    output_tokens: 10,
    cache_read_input_tokens: 100,
    cache_creation_input_tokens: 200,
  });
});
