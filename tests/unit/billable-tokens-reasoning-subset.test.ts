// Per-key token limits: reasoning tokens are a SUBSET of completion tokens for every usage shape the
// extractors fold (OpenAI, Anthropic, Gemini). The billable total must not add them twice, and the live
// counter (computeBillableTokens) must agree with the history seed (seedWindowUsageFromHistory).
// Rule: reasoning inside completion is not added again; a reasoning count larger than completion can only
// come from a provider that reports separate buckets, and then both are billed - the same rule
// costCalculator uses (#15496).
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-billable-reasoning-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../src/lib/db/core.ts");
const tokenLimits = await import("../../src/lib/db/tokenLimits.ts");
const counter = await import("../../open-sse/services/tokenLimitCounter.ts");
const { computeBillableTokens } =
  await import("../../open-sse/handlers/chatCore/upstreamTimeouts.ts");

const NOW = Date.UTC(2026, 0, 15, 12, 0, 0);

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("reasoning inside completion is not added again (OpenAI shape: 100 in, 50 out incl. 40 reasoning)", () => {
  assert.equal(
    computeBillableTokens({
      prompt_tokens: 100,
      completion_tokens: 50,
      completion_tokens_details: { reasoning_tokens: 40 },
    }),
    150
  );
});

test("reasoning inside output is not added again (Responses shape)", () => {
  assert.equal(
    computeBillableTokens({
      input_tokens: 100,
      output_tokens: 50,
      output_tokens_details: { reasoning_tokens: 40 },
    }),
    150
  );
});

test("reasoning larger than completion is a separate bucket: output AND reasoning are billed (#15496 rule)", () => {
  assert.equal(
    computeBillableTokens({ prompt_tokens: 100, completion_tokens: 10, reasoning_tokens: 40 }),
    150
  );
});

test("no reasoning: billable is input + output", () => {
  assert.equal(computeBillableTokens({ prompt_tokens: 7, completion_tokens: 5 }), 12);
});

test("history seed matches the live total for a row with reasoning inside output", () => {
  const limit = tokenLimits.upsertTokenLimit({
    apiKeyId: "k-reason",
    scopeType: "model",
    scopeValue: "o-model",
    tokenLimit: 1_000_000,
    resetInterval: "monthly",
  });
  const db = core.getDbInstance();
  const insert = db.prepare(
    `INSERT INTO usage_history
       (provider, model, api_key_id, tokens_input, tokens_output,
        tokens_cache_read, tokens_cache_creation, tokens_reasoning, success, timestamp)
     VALUES ('openai', 'o-model', 'k-reason', ?, ?, 0, 0, ?, 1, ?)`
  );
  const ts = new Date(Date.UTC(2026, 0, 12)).toISOString();
  insert.run(100, 50, 40, ts); // reasoning inside output: 150
  insert.run(100, 10, 40, ts); // separate bucket: 100 + 10 + 40 = 150
  assert.equal(counter.seedWindowUsageFromHistory(limit, NOW), 300);
});
