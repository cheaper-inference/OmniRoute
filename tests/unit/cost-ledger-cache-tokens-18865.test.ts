/**
 * tests/unit/cost-ledger-cache-tokens-18865.test.ts
 *
 * #18865: recordLedgerFromCost never passed the prompt-cache token counts, so
 * request_cost_ledger.tokens_cache_read / tokens_cache_creation were always 0
 * while usage_history stored the real values for the same request.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-ledger-cache-18865-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const costLedger = await import("../../src/lib/db/costLedger.ts");
const recorder = await import("../../src/lib/usage/costLedgerRecorder.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("ledger keeps cache-read tokens from OpenAI-shaped usage", async () => {
  await recorder.recordLedgerFromCost({
    apiKeyId: "key-openai-shape",
    provider: "openrouter",
    model: "deepseek/deepseek-chat",
    tokens: {
      prompt_tokens: 153841,
      completion_tokens: 120,
      prompt_tokens_details: { cached_tokens: 152960, cache_write_tokens: 400 },
    },
    amountUsd: 0.01,
  });

  const [row] = costLedger.listLedgerEntries("key-openai-shape");
  assert.ok(row, "ledger row was written");
  assert.equal(row.tokensCacheRead, 152960);
  assert.equal(row.tokensCacheCreation, 400);
});

test("ledger keeps cache-read and cache-creation tokens from Claude-shaped usage", async () => {
  await recorder.recordLedgerFromCost({
    apiKeyId: "key-claude-shape",
    provider: "anthropic",
    model: "claude-sonnet-4-5",
    tokens: {
      input_tokens: 50,
      output_tokens: 10,
      cache_read_input_tokens: 9000,
      cache_creation_input_tokens: 1200,
    },
    amountUsd: 0.02,
  });

  const [row] = costLedger.listLedgerEntries("key-claude-shape");
  assert.ok(row, "ledger row was written");
  assert.equal(row.tokensCacheRead, 9000);
  assert.equal(row.tokensCacheCreation, 1200);
});

test("ledger records 0 cache tokens when the provider reports none", async () => {
  await recorder.recordLedgerFromCost({
    apiKeyId: "key-no-cache",
    provider: "openai",
    model: "gpt-4o",
    tokens: { prompt_tokens: 10, completion_tokens: 5 },
    amountUsd: 0.001,
  });

  const [row] = costLedger.listLedgerEntries("key-no-cache");
  assert.ok(row, "ledger row was written");
  assert.equal(row.tokensCacheRead, 0);
  assert.equal(row.tokensCacheCreation, 0);
});
