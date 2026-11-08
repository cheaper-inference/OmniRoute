import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-learned-caps-lru-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const maxTokens = await import("../../open-sse/services/learnedMaxTokensCaps.ts");
const thinking = await import("../../open-sse/services/learnedThinkingCaps.ts");
const effort = await import("../../open-sse/services/learnedReasoningEffortCaps.ts");

test.after(() => {
  maxTokens.__test_resetLearnedMaxTokensCaps();
  thinking.__test_resetLearnedThinkingCaps();
  effort.__test_resetLearnedReasoningEffortCaps();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

// Model names come from client requests, so each map needs a cap (same 1,000 as the estimator).
const EXTRA_MODELS = 1000;

test("learned max_tokens caps evict the oldest model and keep the newest", () => {
  maxTokens.__test_resetLearnedMaxTokensCaps();
  maxTokens.recordLearnedMaxTokensCap("prov", "model-0", 4096);
  for (let n = 1; n <= EXTRA_MODELS; n++)
    maxTokens.recordLearnedMaxTokensCap("prov", `model-${n}`, 4096);
  assert.equal(maxTokens.getLearnedMaxTokensCap("prov", "model-0"), null);
  assert.equal(maxTokens.getLearnedMaxTokensCap("prov", `model-${EXTRA_MODELS}`), 4096);
});

test("learned thinking caps evict the oldest model and keep the newest", () => {
  thinking.__test_resetLearnedThinkingCaps();
  thinking.recordLearnedThinkingCap("prov", "model-0", 40000);
  for (let n = 1; n <= EXTRA_MODELS; n++)
    thinking.recordLearnedThinkingCap("prov", `model-${n}`, 40000);
  assert.equal(thinking.getLearnedThinkingCap("prov", "model-0"), null);
  assert.equal(thinking.getLearnedThinkingCap("prov", `model-${EXTRA_MODELS}`), 32768);
});

test("learned reasoning-effort caps evict the oldest model and keep the newest", () => {
  effort.__test_resetLearnedReasoningEffortCaps();
  effort.recordLearnedReasoningEffort("prov", "model-0", ["low", "medium"]);
  for (let n = 1; n <= EXTRA_MODELS; n++) {
    effort.recordLearnedReasoningEffort("prov", `model-${n}`, ["low", "medium"]);
  }
  assert.equal(effort.getLearnedReasoningEffort("prov", "model-0"), null);
  assert.deepEqual(
    [...(effort.getLearnedReasoningEffort("prov", `model-${EXTRA_MODELS}`) ?? [])],
    ["low", "medium"]
  );
});
