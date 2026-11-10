import assert from "node:assert/strict";
import test from "node:test";
import { openaiResponsesToOpenAIResponse } from "../../open-sse/translator/response/openai-responses.ts";
import { openaiToClaudeResponse } from "../../open-sse/translator/response/openai-to-claude.ts";
import { normalizeUsage } from "../../open-sse/utils/usageTracking.ts";
import { computeCostFromPricing } from "../../src/lib/usage/costCalculator.ts";
import { resetDbInstance } from "../../src/lib/db/core.ts";
test.after(() => resetDbInstance());
for (const details of ["input_tokens_details", "prompt_tokens_details"]) {
  test(`${details}.cache_write_tokens survives Responses-to-Chat-to-Claude without double accounting`, () => {
    const state: Record<string, unknown> = { usage: {} };
    const chunk = openaiResponsesToOpenAIResponse(
      {
        type: "response.completed",
        response: {
          id: "synthetic-response",
          usage: {
            input_tokens: 1000,
            output_tokens: 10,
            [details]: { cached_tokens: 100, cache_write_tokens: 200 },
          },
        },
      },
      state
    );
    const usage = state.usage as Record<string, unknown>;
    assert.equal(usage.prompt_tokens, 1000);
    assert.equal(
      (usage.prompt_tokens_details as Record<string, unknown>)?.cache_creation_tokens,
      200
    );
    const claude: Record<string, unknown> = { usage: {} };
    openaiToClaudeResponse({ choices: [], usage }, claude);
    assert.equal((claude.usage as Record<string, unknown>).input_tokens, 700);
    assert.equal((claude.usage as Record<string, unknown>).cache_creation_input_tokens, 200);
    const normalized = normalizeUsage(usage);
    assert.equal(normalized.cache_creation_input_tokens, 200);
    assert.ok(chunk);
    const price = { input: 2, output: 10, cached: 0.2, cache_creation: 2.5 };
    const expected = (700 * 2 + 100 * 0.2 + 200 * 2.5 + 10 * 10) / 1000000;
    assert.ok(Math.abs(computeCostFromPricing(price, normalized) - expected) < 1e-12);
  });
}
test("flat explicit zero wins over a nested positive cache-write alias", () => {
  const state: Record<string, unknown> = { usage: {} };
  openaiResponsesToOpenAIResponse(
    {
      type: "response.completed",
      response: {
        usage: {
          input_tokens: 1000,
          output_tokens: 1,
          cache_creation_input_tokens: 0,
          input_tokens_details: { cache_write_tokens: 200 },
        },
      },
    },
    state
  );
  assert.equal((state.usage as Record<string, unknown>).cache_creation_input_tokens, 0);
});
