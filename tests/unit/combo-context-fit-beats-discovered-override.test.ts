import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// Live repro (2026-11-17): a combo ["devin-desktop/swe-2-flash-medium" (262.144,
// auto-discovered override), "github/auto" (unknown), "grok-cli/grok-4.7-low"
// (500.000 catalog), "agy/gemini-3.8-flash-low" (1.048.576 catalog),
// "nvidia/deepseek-ai/deepseek-v4.1-flash" (1.048.576)] received a 465.833-token
// request. filterTargetsByRequestCompatibility ordered it
//   nvidia -> devin -> grok -> agy -> github
// so after nvidia's dead catalog entry returned 400, the 465k request landed on
// the 262k devin target: 1.78x over its window, inside OVERRIDE_REJECT_TRUST_MARGIN
// (5x) because the override was auto-discovered. chatCore then compacted
// 465.730 -> 158.429 message tokens with purify_history, silently dropping 66% of
// the conversation. Config-only workarounds do not exist (the compat filter
// reorders ahead of the declared combo order), so the routing rule itself is the
// fix: only an operator-declared (manual) override earns the trust margin.

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-ctxfit-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { saveModelsDevCapabilities, clearModelsDevCapabilities } =
  await import("../../src/lib/modelsDevSync.ts");
const { filterTargetsByRequestCompatibility } = await import("../../open-sse/services/combo.ts");
const { estimateTokens } = await import("../../open-sse/services/contextManager.ts");
const { setModelContextOverride, removeModelContextOverride } =
  await import("../../src/lib/db/modelContextOverrides.ts");

test.after(() => {
  core.resetDbInstance();
  if (ORIGINAL_DATA_DIR === undefined) {
    delete process.env.DATA_DIR;
  } else {
    process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  }
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test.beforeEach(() => {
  clearModelsDevCapabilities();
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

function capabilityEntry(limitContext: number | null) {
  return {
    tool_call: true,
    reasoning: false,
    attachment: false,
    structured_output: true,
    temperature: true,
    modalities_input: JSON.stringify(["text"]),
    modalities_output: JSON.stringify(["text"]),
    knowledge_cutoff: null,
    release_date: null,
    last_updated: null,
    status: null,
    family: null,
    open_weights: false,
    limit_context: limitContext,
    limit_input: limitContext,
    limit_output: 65_536,
    interleaved_field: null,
  };
}

function repetitiveAgentBody() {
  const toolResultChunk =
    '{"tool_call_id":"call_abc123","role":"tool","content":"' +
    "line of repeated structured tool output ".repeat(160) +
    '"}';
  const messages = [];
  for (let i = 0; i < 400; i++) {
    messages.push({ role: i % 2 === 0 ? "assistant" : "tool", content: toolResultChunk });
  }
  return { messages, max_tokens: 32000 };
}

test("a request that FITS a sibling is not routed to a smaller auto-discovered-override target", () => {
  saveModelsDevCapabilities({
    "ctxfit-small": { model: capabilityEntry(null) },
    "ctxfit-fit": { model: capabilityEntry(900_000) },
  });
  // Machine-discovered window, exactly like devin-desktop/swe-2-flash-medium.
  setModelContextOverride("ctxfit-small", "model", 262_144, "auto:discovery");

  try {
    const body = repetitiveAgentBody();
    const estimated = estimateTokens({ messages: body.messages });
    assert.ok(
      estimated + 32_000 > 262_144,
      `expected the estimate to exceed the discovered window; got ${estimated}`
    );
    assert.ok(
      estimated + 32_000 < 900_000,
      `expected the estimate to fit the 900k sibling; got ${estimated}`
    );

    const targets = [target("ctxfit-small/model"), target("ctxfit-fit/model")];
    const out = filterTargetsByRequestCompatibility(targets, body, noopLog);

    assert.equal(
      out[0].modelStr,
      "ctxfit-fit/model",
      `a target known to FIT must win over a smaller discovered-override target â€” ` +
        `routing there forces purify_history to drop most of the conversation`
    );
    assert.equal(out.length, 2, "the smaller target must stay reachable as a fallback");
    assert.equal(out[1].modelStr, "ctxfit-small/model");
  } finally {
    removeModelContextOverride("ctxfit-small", "model");
  }
});

test("an operator-declared (manual) override keeps its #13870 priority", () => {
  saveModelsDevCapabilities({
    "ctxfit-manual": { model: capabilityEntry(null) },
    "ctxfit-emergency": { model: capabilityEntry(899_153) },
  });
  setModelContextOverride("ctxfit-manual", "model", 250_000, "manual");

  try {
    const body = repetitiveAgentBody();
    const targets = [target("ctxfit-manual/model"), target("ctxfit-emergency/model")];
    const out = filterTargetsByRequestCompatibility(targets, body, noopLog);

    assert.equal(
      out[0].modelStr,
      "ctxfit-manual/model",
      "a manual override is still trusted over a catalog-only emergency member (#13870)"
    );
  } finally {
    removeModelContextOverride("ctxfit-manual", "model");
  }
});
