/**
 * Pure judgeJev tests for the jev combo strategy (#15276).
 */
import test from "node:test";
import assert from "node:assert/strict";

import {
  JEV_CONFIDENCE_FLOOR,
  JEV_MAX_ADMITTED,
  JEV_PROBABILITY_FLOOR,
  buildJevCriteria,
  judgeJev,
  orderTargetsByJevVerdicts,
  type JevCandidate,
} from "../../open-sse/services/combo/jevStrategy.ts";
import {
  promoteSuccessfulComboModel,
  promoteModelToFront,
} from "../../src/lib/combos/autoPromote.ts";
import {
  COMBO_SKIP_REASONS,
  createInvocationId,
  getComboTrace,
  recordComboDecision,
  resetComboTraceStore,
  startComboTrace,
} from "../../open-sse/services/combo/decisionTrace.ts";
import { ROUTING_STRATEGY_VALUES } from "../../src/shared/constants/routingStrategies.ts";
import { HANDLED_COMBO_STRATEGIES } from "../../open-sse/services/combo/strategyDispatch.ts";
import {
  extractPromptForJevState,
  orderJevComboTargets,
} from "../../open-sse/services/combo/jevOrdering.ts";
import { partitionJevTargets } from "../../open-sse/services/combo/jevEligibility.ts";
import type { ResolvedComboTarget } from "../../open-sse/services/combo/types.ts";
import type { ComboSkipReason } from "../../open-sse/services/combo/decisionTrace.ts";

const CANDIDATES: JevCandidate[] = [
  { id: "opus", userRank: 0, label: "Claude Opus" },
  { id: "gpt", userRank: 1, label: "GPT mid" },
  { id: "glm", userRank: 2, label: "GLM small" },
];

test.afterEach(() => {
  resetComboTraceStore();
});

test("judgeJev: winner first with a second option above the floor as user-ordered failover", () => {
  const result = judgeJev(CANDIDATES, {
    choice: "glm",
    probabilities: { opus: 0.08, gpt: 0.2, glm: 0.72 },
    confidence: 0.84,
  });
  assert.equal(result.fellOpen, false);
  assert.deepEqual(
    result.admitted.map((r) => r.id),
    ["glm", "gpt"]
  );
  assert.equal(result.admitted[0].probability, 0.72);
  assert.equal(result.held.length, 1);
  assert.equal(result.held[0].id, "opus");
  assert.equal(result.held[0].reason, "below_probability_floor");
  assert.ok(0.08 < JEV_PROBABILITY_FLOOR);
  assert.ok(0.2 >= JEV_PROBABILITY_FLOOR);
});

test("judgeJev: a single option above the floor admits only the winner", () => {
  const result = judgeJev(CANDIDATES, {
    choice: "opus",
    probabilities: { opus: 0.81, gpt: 0.1, glm: 0.09 },
    confidence: 0.9,
  });
  assert.deepEqual(
    result.admitted.map((r) => r.id),
    ["opus"]
  );
  assert.equal(result.held.length, 2);
  assert.ok(result.held.every((h) => h.reason === "below_probability_floor"));
});

test("judgeJev: confidence below floor falls open to full user order", () => {
  const confidence = JEV_CONFIDENCE_FLOOR - 0.01;
  const result = judgeJev(CANDIDATES, {
    choice: "glm",
    probabilities: { opus: 0.1, gpt: 0.1, glm: 0.8 },
    confidence,
  });
  assert.equal(result.fellOpen, true);
  assert.equal(result.fallbackReason, "low_confidence");
  assert.deepEqual(
    result.admitted.map((r) => r.id),
    ["opus", "gpt", "glm"]
  );
  assert.equal(result.held.length, 0);
});

test("judgeJev: a bad winner id falls open as jev_unavailable", () => {
  const result = judgeJev(CANDIDATES, {
    choice: "not-in-list",
    probabilities: { opus: 0.5, gpt: 0.3, glm: 0.2 },
    confidence: 0.9,
  });
  assert.equal(result.fellOpen, true);
  assert.equal(result.fallbackReason, "jev_unavailable");
  assert.deepEqual(
    result.admitted.map((r) => r.id),
    ["opus", "gpt", "glm"]
  );
});

test("judgeJev: null answer falls open as jev_unavailable", () => {
  const result = judgeJev(CANDIDATES, null);
  assert.equal(result.fellOpen, true);
  assert.equal(result.fallbackReason, "jev_unavailable");
  assert.equal(result.admitted.length, 3);
});

test("judgeJev: 4-admit cap keeps the winner plus the user's next qualifiers", () => {
  const many: JevCandidate[] = Array.from({ length: 6 }, (_, i) => ({
    id: `m${i}`,
    userRank: i,
    label: `Model ${i}`,
  }));
  const probabilities = Object.fromEntries(many.map((c) => [c.id, 0.2]));
  // Winner is the last preference — still admitted first.
  probabilities.m5 = 0.5;
  const result = judgeJev(many, {
    choice: "m5",
    probabilities,
    confidence: 0.9,
  });
  assert.equal(result.admitted.length, JEV_MAX_ADMITTED);
  assert.equal(result.admitted[0].id, "m5");
  // Remaining admitted slots filled by lowest userRank among qualifiers.
  assert.deepEqual(
    result.admitted.slice(1).map((r) => r.id),
    ["m0", "m1", "m2"]
  );
  assert.ok(result.held.some((h) => h.reason === "dominated"));
});

test("judgeJev: blocked targets never enter the choice set (caller filters first)", () => {
  // Simulates the caller having already dropped a blocked Opus target.
  const eligible = CANDIDATES.filter((c) => c.id !== "opus");
  const result = judgeJev(eligible, {
    choice: "gpt",
    probabilities: { gpt: 0.7, glm: 0.3 },
    confidence: 0.88,
  });
  assert.ok(!result.admitted.some((r) => r.id === "opus"));
  assert.ok(!result.held.some((r) => r.id === "opus"));
  assert.deepEqual(Object.keys(buildJevCriteria(eligible)).sort(), ["glm", "gpt"]);
});

test("orderTargetsByJevVerdicts puts the winner first then user order", () => {
  const targets = [
    { stepId: "opus", modelStr: "cc/opus" },
    { stepId: "gpt", modelStr: "cx/gpt" },
    { stepId: "glm", modelStr: "glm/glm" },
  ];
  const judged = judgeJev(CANDIDATES, {
    choice: "glm",
    probabilities: { opus: 0.05, gpt: 0.25, glm: 0.7 },
    confidence: 0.9,
  });
  const ordered = orderTargetsByJevVerdicts(targets, judged.admitted);
  assert.deepEqual(
    ordered.map((t) => t.stepId),
    ["glm", "gpt"]
  );
});

test("promoteSuccessfulComboModel skips jev strategy even when auto-promote is on", async () => {
  let updated: unknown = null;
  const models = [
    { kind: "model", model: "a/1" },
    { kind: "model", model: "b/2" },
  ];
  // Baseline: promote would move b/2 to front.
  assert.ok(promoteModelToFront(models, "b/2"));

  const ok = await promoteSuccessfulComboModel(
    { id: "combo-1", name: "stack", models, strategy: "jev" },
    "b/2",
    { comboAutoPromoteEnabled: true },
    {
      updateCombo: async (_id, data) => {
        updated = data;
        return data;
      },
    }
  );
  assert.equal(ok, false);
  assert.equal(updated, null);
});

test("jev skip reasons are on the decision-trace allowlist", () => {
  for (const reason of [
    "below_probability_floor",
    "dominated",
    "low_confidence",
    "jev_unavailable",
  ] as const) {
    assert.ok((COMBO_SKIP_REASONS as readonly string[]).includes(reason), reason);
  }
});

test("decision trace records jev holds without prompt text", () => {
  const id = createInvocationId();
  startComboTrace(id, { strategy: "jev", comboName: "stack" });
  recordComboDecision(id, {
    step: "opus",
    target: "cc/opus",
    decision: "skipped_before_dispatch",
    reason: "below_probability_floor",
    detail: "p=0.08",
  });
  const trace = getComboTrace(id);
  assert.ok(trace);
  assert.equal(trace!.decisions[0].reason, "below_probability_floor");
  const serialized = JSON.stringify(trace);
  assert.doesNotMatch(serialized, /rewrite this email|Authorization|Bearer /i);
});

test("jev is registered in ROUTING_STRATEGY_VALUES and HANDLED_COMBO_STRATEGIES", () => {
  assert.ok((ROUTING_STRATEGY_VALUES as readonly string[]).includes("jev"));
  assert.ok((HANDLED_COMBO_STRATEGIES as readonly string[]).includes("jev"));
});

function modelTarget(
  executionKey: string,
  modelStr: string,
  stepId = "shared"
): ResolvedComboTarget {
  return {
    kind: "model",
    stepId,
    executionKey,
    modelStr,
    provider: "p",
    providerId: null,
    connectionId: null,
    weight: 1,
    label: null,
  };
}

test("orderJevComboTargets skips ask when a session pin owns the request", async () => {
  let asked = false;
  const targets = [modelTarget("a", "cc/opus"), modelTarget("b", "glm/glm")];
  const outcome = await orderJevComboTargets(targets, "continue the edit", {
    sessionPinned: true,
    ask: async () => {
      asked = true;
      return { ok: false, reason: "unavailable" };
    },
  });
  assert.equal(asked, false);
  assert.equal(outcome.protectHead, false);
  assert.deepEqual(
    outcome.targets.map((target) => target.executionKey),
    ["a", "b"]
  );
});

test("orderJevComboTargets keeps accounts distinct when step ids collide", async () => {
  const targets = [modelTarget("acct-1", "glm/glm"), modelTarget("acct-2", "glm/glm")];
  const outcome = await orderJevComboTargets(targets, "write a parser", {
    sessionPinned: false,
    ask: async ({ criteria }) => {
      const optionIds = Object.keys(criteria);
      assert.equal(optionIds.length, 2);
      assert.ok(optionIds.every((id) => !id.includes("acct-")));
      const winner = optionIds[1];
      return {
        ok: true,
        answer: {
          choice: winner,
          probabilities: { [optionIds[0]]: 0.2, [winner]: 0.8 },
          confidence: 0.9,
        },
      };
    },
  });
  assert.equal(outcome.protectHead, true);
  assert.deepEqual(
    outcome.targets.map((target) => target.executionKey),
    ["acct-2", "acct-1"]
  );
  assert.equal(outcome.holds.length, 0);
  assert.ok(outcome.admitted[0].detail.includes("verdict=admitted"));
  assert.ok(outcome.admitted[0].detail.includes("rank="));
});

test("orderJevComboTargets falls open when ask throws and records holds by execution key", async () => {
  const targets = [
    modelTarget("a", "cc/opus"),
    modelTarget("b", "glm/glm"),
    modelTarget("c", "local/small"),
  ];
  const thrown = await orderJevComboTargets(targets, "hi", {
    sessionPinned: false,
    ask: async () => {
      throw new Error("socket hang up with Bearer secret");
    },
  });
  assert.deepEqual(
    thrown.targets.map((target) => target.executionKey),
    ["a", "b", "c"]
  );
  assert.equal(thrown.holds.length, 0);
  assert.equal(thrown.fellOpen, true);
  assert.equal(thrown.fallbackReason, "jev_unavailable");

  const held = await orderJevComboTargets(targets, "hi", {
    sessionPinned: false,
    ask: async () => ({
      ok: true,
      answer: {
        choice: "jev-option-2",
        probabilities: { "jev-option-1": 0.04, "jev-option-2": 0.9, "jev-option-3": 0.06 },
        confidence: 0.92,
      },
    }),
  });
  assert.deepEqual(
    held.targets.map((target) => target.modelStr),
    ["glm/glm"]
  );
  assert.deepEqual(
    held.holds.map((hold) => hold.executionKey),
    ["a", "c"]
  );
  assert.ok(held.holds[0].detail?.includes("p=0.04"));
  assert.doesNotMatch(JSON.stringify(held), /Bearer secret/);
});

test("orderJevComboTargets marks missing TypeSafe key as Jev is not configured", async () => {
  const targets = [modelTarget("a", "cc/opus"), modelTarget("b", "glm/glm")];
  const outcome = await orderJevComboTargets(targets, "hi", {
    sessionPinned: false,
    ask: async () => ({ ok: false, reason: "missing_api_key" }),
  });
  assert.equal(outcome.fellOpen, true);
  assert.equal(outcome.missingApiKey, true);
  assert.ok(outcome.admitted.every((row) => row.detail.includes("Jev is not configured")));
  assert.doesNotMatch(JSON.stringify(outcome), /Bearer |sk-/);
});

test("extractPromptForJevState uses only the latest user text from Responses input", () => {
  const state = extractPromptForJevState({
    input: [
      { role: "system", content: "you are a router" },
      { role: "user", content: "first question" },
      { role: "assistant", content: "first answer" },
      { role: "user", content: "rewrite this email" },
      { type: "function_call_output", output: "tool blob with secrets" },
    ],
  });
  assert.equal(state, "rewrite this email");
  assert.doesNotMatch(state, /tool blob|you are a router|first answer/);
});

test("extractPromptForJevState skips Anthropic tool-result user turns", () => {
  const state = extractPromptForJevState({
    messages: [
      { role: "user", content: "Summarize the file without exposing credentials." },
      { role: "assistant", content: [{ type: "tool_use", id: "read-1", name: "read_file" }] },
      {
        role: "user",
        content: [{ type: "tool_result", tool_use_id: "read-1", content: "API_KEY=secret" }],
      },
    ],
  });
  assert.equal(state, "Summarize the file without exposing credentials.");
  assert.doesNotMatch(state, /API_KEY|secret|read_file/);
});

test("partitionJevTargets drops breaker, lockout, and quota before the ask", async () => {
  const cases: Array<{ reason: ComboSkipReason; blockedKey: string }> = [
    { reason: "circuit_open", blockedKey: "broken" },
    { reason: "model_lockout", blockedKey: "locked" },
    { reason: "quota_cutoff", blockedKey: "exhausted" },
  ];

  for (const { reason, blockedKey } of cases) {
    const targets = [
      modelTarget(blockedKey, "bad/model"),
      modelTarget("healthy-a", "cc/opus"),
      modelTarget("healthy-b", "glm/glm"),
    ];
    const partition = await partitionJevTargets(targets, async (target) =>
      target.executionKey === blockedKey ? reason : null
    );
    assert.deepEqual(
      partition.blocked.map((row) => ({ key: row.target.executionKey, reason: row.reason })),
      [{ key: blockedKey, reason }]
    );
    assert.deepEqual(
      partition.eligible.map((target) => target.executionKey),
      ["healthy-a", "healthy-b"]
    );

    let askedKeys: string[] = [];
    const outcome = await orderJevComboTargets(partition.eligible, "route me", {
      sessionPinned: false,
      ask: async ({ criteria }) => {
        askedKeys = Object.keys(criteria);
        const winner = askedKeys[1];
        return {
          ok: true,
          answer: {
            choice: winner,
            probabilities: { [askedKeys[0]]: 0.2, [winner]: 0.8 },
            confidence: 0.9,
          },
        };
      },
    });
    assert.deepEqual(askedKeys, ["jev-option-1", "jev-option-2"]);
    assert.ok(!askedKeys.includes(blockedKey));
    assert.ok(!outcome.targets.some((target) => target.executionKey === blockedKey));
    assert.deepEqual(
      outcome.targets.map((target) => target.executionKey),
      ["healthy-b", "healthy-a"]
    );
  }
});

test("buildJevComboTestSummary returns structured eligible/blocked without calling TypeSafe", async () => {
  const { buildJevComboTestSummary } =
    await import("../../open-sse/services/combo/jevTestSummary.ts");
  const { resolveResilienceSettings } = await import("../../src/lib/resilience/settings.ts");
  const targets = [modelTarget("a", "cc/opus"), modelTarget("b", "glm/glm")];
  const summary = await buildJevComboTestSummary({
    targets,
    comboName: "stack",
    resilienceSettings: resolveResilienceSettings(null),
    hasTypesafeKey: false,
  });
  assert.deepEqual(
    summary.eligible.map((row) => row.model),
    ["cc/opus", "glm/glm"]
  );
  assert.equal(summary.blocked.length, 0);
  assert.equal(summary.configurationNote, "Jev is not configured");
});

test("buildJevComboTestSummary blocks an unavailable dynamic-account probe", async () => {
  const { buildJevComboTestSummary } =
    await import("../../open-sse/services/combo/jevTestSummary.ts");
  const { resolveResilienceSettings } = await import("../../src/lib/resilience/settings.ts");
  const target = modelTarget("dynamic-unavailable", "openai/gpt-4.1-nano");
  assert.equal(target.connectionId, null);
  const summary = await buildJevComboTestSummary({
    targets: [target],
    comboName: "stack",
    resilienceSettings: resolveResilienceSettings(null),
    hasTypesafeKey: true,
    isModelAvailable: async () => false,
  });
  assert.equal(summary.eligible.length, 0);
  assert.deepEqual(
    summary.blocked.map((row) => ({ key: row.executionKey, reason: row.reason })),
    [{ key: target.executionKey, reason: "availability" }]
  );
});
