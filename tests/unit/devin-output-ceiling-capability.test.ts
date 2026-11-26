/**
 * A measured upstream output ceiling must be a routing capability, not only a
 * post-response warning.
 *
 * Repro (2026-11-16, live): the client asked for `max_completion_tokens: 16384`
 * for a context-compaction summary, the combo `omniroute-free-stack` (fill-first)
 * sent it to `devin-desktop/swe-2-flash-medium`, the account plan stopped the
 * reply at exactly 1024 completion tokens, and the client aborted with
 * "generation hit the token cap and the summary is incomplete".
 *
 * `filterTargetsByRequestCompatibility` can keep that request away from the
 * capped target — but only when `maxOutputTokens` is resolved. These tests pin
 * both halves: the resolved capability and the routed decision.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-devin-ceiling-cap-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { getResolvedModelCapabilitiesWithLimitSources } =
  await import("../../src/lib/modelCapabilities.ts");
const { filterTargetsByRequestCompatibility } = await import("../../open-sse/services/combo.ts");
const { getObservedOutputCeiling, OBSERVED_OUTPUT_CEILINGS } =
  await import("../../src/shared/constants/observedOutputCeilings.ts");

test.after(() => {
  core.resetDbInstance();
  if (ORIGINAL_DATA_DIR === undefined) {
    delete process.env.DATA_DIR;
  } else {
    process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  }
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function target(modelStr: string) {
  return {
    kind: "model" as const,
    stepId: modelStr,
    executionKey: modelStr,
    modelStr,
    provider: modelStr.includes("/") ? modelStr.split("/")[0] : modelStr,
    providerId: null,
    connectionId: null,
    weight: 1,
    label: null,
  };
}

const noopLog = { info() {}, warn() {}, error() {}, debug() {} };

test("the measured ceiling is the devin-desktop capability, not an optimistic catalog value", () => {
  const { capabilities, limitSources } = getResolvedModelCapabilitiesWithLimitSources({
    provider: "devin-desktop",
    model: "swe-2-flash-medium",
  });

  assert.equal(capabilities.maxOutputTokens, 1024);
  assert.equal(limitSources.maxOutputTokens, "observed:devin-desktop/swe-2-flash-medium");
});

test("the ceiling lookup ignores the provider prefix, case and noise", () => {
  assert.equal(getObservedOutputCeiling("devin-desktop", "swe-2-flash-medium"), 1024);
  assert.equal(getObservedOutputCeiling("Devin-Desktop", "SWE-2-Flash-Medium"), 1024);
  assert.equal(getObservedOutputCeiling("devin-desktop", "devin-desktop/swe-2-flash-medium"), 1024);
  assert.equal(getObservedOutputCeiling("devin-desktop", "swe-1-6-slow"), 1024);
  assert.equal(getObservedOutputCeiling("devin-desktop", "swe-2-pro"), null);
  assert.equal(getObservedOutputCeiling("", "swe-2-flash-medium"), null);
  assert.equal(getObservedOutputCeiling("devin-desktop", ""), null);
});

test("only measured rows are declared, and each carries evidence", () => {
  for (const row of OBSERVED_OUTPUT_CEILINGS) {
    assert.ok(row.provider.length > 0);
    assert.ok(row.model.length > 0);
    assert.ok(row.maxOutputTokens > 0);
    assert.ok(row.evidence.length > 30, `row ${row.provider}/${row.model} needs evidence`);
  }
});

test("a summary request asking for 16k output is not routed to the 1024-cap target", () => {
  const targets = [
    target("devin-desktop/swe-2-flash-medium"),
    target("grok-cli/grok-4.7-low"),
    target("agy/gemini-3.8-flash-low"),
  ];

  const out = filterTargetsByRequestCompatibility(
    targets,
    {
      messages: [
        { role: "system", content: "You are a context summarization assistant." },
        { role: "user", content: "<conversation>...</conversation>" },
      ],
      max_completion_tokens: 16_384,
      stream: true,
    },
    noopLog
  );

  const kept = out.map((entry) => entry.modelStr);
  assert.ok(
    !kept.includes("devin-desktop/swe-2-flash-medium"),
    `capped target must not receive a 16k-output request (kept: ${kept.join(", ")})`
  );
  assert.ok(kept.includes("grok-cli/grok-4.7-low"));
});

test("both Devin Desktop plans carry the 1024 ceiling", () => {
  const targets = [target("devin-desktop/swe-1-6-slow"), target("grok-cli/grok-4.7-low")];

  const out = filterTargetsByRequestCompatibility(
    targets,
    {
      messages: [{ role: "user", content: "<conversation>...</conversation>" }],
      max_completion_tokens: 16_384,
    },
    noopLog
  );

  const kept = out.map((entry) => entry.modelStr);
  assert.ok(
    !kept.includes("devin-desktop/swe-1-6-slow"),
    `swe-1-6-slow stopped at 1024 tokens on the live upstream too (kept: ${kept.join(", ")})`
  );
});

test("a short-output request still keeps the capped target in its strategy slot", () => {
  const targets = [target("devin-desktop/swe-2-flash-medium"), target("grok-cli/grok-4.7-low")];

  const out = filterTargetsByRequestCompatibility(
    targets,
    {
      messages: [{ role: "user", content: "Diga apenas: ok" }],
      max_tokens: 512,
      stream: false,
    },
    noopLog
  );

  assert.deepEqual(
    out.map((entry) => entry.modelStr),
    ["devin-desktop/swe-2-flash-medium", "grok-cli/grok-4.7-low"]
  );
});

test("the advisory opt-in keeps the capped target even for large-output requests", () => {
  const targets = [target("devin-desktop/swe-2-flash-medium")];

  const out = filterTargetsByRequestCompatibility(
    targets,
    { messages: [{ role: "user", content: "resuma" }], max_completion_tokens: 16_384 },
    noopLog,
    "unit-advisory-combo",
    { outputLimitAdvisory: true }
  );

  assert.deepEqual(
    out.map((entry) => entry.modelStr),
    ["devin-desktop/swe-2-flash-medium"]
  );
});
