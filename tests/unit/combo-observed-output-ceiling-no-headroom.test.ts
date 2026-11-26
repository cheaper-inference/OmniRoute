import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// Live repro (2026-11-17, thread TothBoost, runs 31 and 32): the pi client sends
// `max_completion_tokens: 1024` on every turn. The combo routed a 42-message /
// 79-tool agentic turn to devin-desktop/swe-2-flash-medium, whose measured output
// ceiling is 1024 completion tokens INCLUDING reasoning. The model spent all
// 1024 tokens thinking and returned `finish_reason: "length"`, content = "",
// has_content = 0 — the client rendered an empty turn and stopped.
//
// `exceedsKnownOutputLimit` only rejects `maxOutputTokens < requested`, so asking
// for exactly the measured ceiling kept the target in its strategy slot with zero
// headroom for a visible answer. A measured ceiling is a hard plan cap, so
// equality demotes the target behind every member that has headroom — without
// removing it, because a combo made only of capped members must still answer and
// the capped target is also the #6238 last-resort tier.

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-outceil-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { filterTargetsByRequestCompatibility } =
  await import("../../open-sse/services/combo/comboStructure.ts");

test.after(() => {
  core.resetDbInstance();
  if (ORIGINAL_DATA_DIR === undefined) {
    delete process.env.DATA_DIR;
  } else {
    process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  }
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

const noopLog = { info() {}, warn() {}, error() {}, debug() {} };

function target(modelStr: string) {
  return {
    kind: "model" as const,
    stepId: modelStr,
    executionKey: modelStr,
    modelStr,
    provider: modelStr.split("/")[0],
    providerId: null,
    connectionId: null,
    weight: 1,
    label: null,
  };
}

const DEVIN = "devin-desktop/swe-2-flash-medium";
const SIBLING = "outceil-fit/flat-model";

function shortBody(maxCompletionTokens: number) {
  return {
    messages: [{ role: "user", content: "abrir a aba de servicos" }],
    max_completion_tokens: maxCompletionTokens,
  };
}

test("a request asking for the whole measured ceiling goes behind a target with headroom", () => {
  const kept = filterTargetsByRequestCompatibility(
    [target(DEVIN), target(SIBLING)],
    shortBody(1024),
    noopLog
  );

  assert.deepEqual(
    kept.map((entry) => entry.modelStr),
    [SIBLING, DEVIN],
    "devin-desktop/swe-2-flash-medium caps at 1024 completion tokens inclusive of " +
      "reasoning, so max_completion_tokens=1024 leaves no room for visible content"
  );
});

test("a combo made only of zero-headroom targets keeps answering", () => {
  const kept = filterTargetsByRequestCompatibility([target(DEVIN)], shortBody(1024), noopLog);

  assert.deepEqual(
    kept.map((entry) => entry.modelStr),
    [DEVIN],
    "demoting must never empty the pool (a 400/empty turn would be worse than a short answer)"
  );
});

test("a request below the measured ceiling keeps the strategy order", () => {
  const kept = filterTargetsByRequestCompatibility(
    [target(DEVIN), target(SIBLING)],
    shortBody(512),
    noopLog
  );

  assert.deepEqual(
    kept.map((entry) => entry.modelStr),
    [DEVIN, SIBLING],
    "512 requested tokens leave half the ceiling as headroom"
  );
});

test("requests above the measured ceiling are still hard-rejected", () => {
  const kept = filterTargetsByRequestCompatibility(
    [target(DEVIN), target(SIBLING)],
    shortBody(3000),
    noopLog
  );

  assert.deepEqual(
    kept.map((entry) => entry.modelStr),
    [SIBLING],
    "3000 > 1024 stays the pre-existing hard output_tokens rejection"
  );
});

test("every zero-headroom target moves behind every target with headroom", () => {
  const kept = filterTargetsByRequestCompatibility(
    [target(DEVIN), target(SIBLING), target("outceil-other/flat-model")],
    shortBody(1024),
    noopLog
  );

  assert.deepEqual(
    kept.map((entry) => entry.modelStr),
    [SIBLING, "outceil-other/flat-model", DEVIN],
    "the demotion is stable: relative order inside each tier is preserved"
  );
});
