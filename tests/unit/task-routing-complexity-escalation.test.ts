/**
 * Coverage for the opt-in complexity escalation of Task-Aware Routing: `complexityRouting`
 * scores the anchor prompt with the existing specificity detector and sends agent turns
 * (requests with tools) whose score reaches `minScore` to a stronger model.
 *
 * Off by default; with routing off, or escalation off, results must be exactly as before.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  applyTaskAwareRouting,
  getDefaultTaskModelMap,
  getTaskRoutingConfig,
  hydrateTaskRoutingConfig,
  resolveComplexityEscalation,
  setTaskRoutingConfig,
  DEFAULT_COMPLEXITY_MIN_SCORE,
} from "../../open-sse/services/taskAwareRouter.ts";
import { analyzeSpecificity } from "../../open-sse/services/specificityDetector.ts";
import { updateTaskRoutingSchema } from "../../src/shared/validation/schemas/routing.ts";

const OPUS = "claude/claude-opus-5-5";
const SONNET = "claude/claude-sonnet-5-5";

const HARD_PROMPT =
  "We need to redesign the auth flow. First, analyze how sessions are stored today; then " +
  "propose a migration to JWT with refresh tokens, because the current approach breaks " +
  "across regions. Step by step: 1. audit 2. design 3. migrate 4. rollback plan.";
const EASY_PROMPT = "rename getUser to fetchUser in src/api.ts";

const ESCALATE_TO_OPUS = { enabled: true, minScore: DEFAULT_COMPLEXITY_MIN_SCORE, model: OPUS };

function resetConfig(): void {
  setTaskRoutingConfig({
    enabled: false,
    taskModelMap: getDefaultTaskModelMap(),
    detectionEnabled: true,
    patternOverrides: undefined,
    detectionAnchor: "latest-user",
    complexityRouting: { enabled: false, minScore: DEFAULT_COMPLEXITY_MIN_SCORE, model: "" },
  });
}

/** A Claude-Code-shaped agent conversation after `turns` tool round-trips. */
function agentConversation(request: string, turns: number) {
  const messages: Array<Record<string, unknown>> = [
    {
      role: "user",
      content: [
        { type: "text", text: "<system-reminder>Project rules: write tests.</system-reminder>" },
        { type: "text", text: request },
      ],
    },
  ];
  for (let i = 0; i < turns; i++) {
    messages.push({
      role: "assistant",
      content: [{ type: "tool_use", id: `t${i}`, name: "Bash", input: { command: "ls" } }],
    });
    messages.push({
      role: "user",
      content: [{ type: "tool_result", tool_use_id: `t${i}`, content: "def main():\n  pass" }],
    });
  }
  return { model: OPUS, tools: [{ name: "Bash" }, { name: "Read" }], messages };
}

// ── off by default ───────────────────────────────────────────────────────────

test("with routing off, an escalation setup changes nothing", () => {
  resetConfig();
  setTaskRoutingConfig({ detectionAnchor: "first-user", complexityRouting: ESCALATE_TO_OPUS });
  assert.deepEqual(applyTaskAwareRouting(SONNET, agentConversation(HARD_PROMPT, 2)), {
    model: SONNET,
    taskType: "chat",
    wasRouted: false,
  });
});

test("complexity escalation is off by default and reports nothing", () => {
  resetConfig();
  assert.equal(resolveComplexityEscalation("coding", agentConversation(HARD_PROMPT, 1)), null);
  setTaskRoutingConfig({ enabled: true });
  const result = applyTaskAwareRouting(OPUS, agentConversation(HARD_PROMPT, 1));
  assert.equal(result.escalated, undefined);
  assert.equal(result.complexityScore, undefined);
});

// ── escalation ───────────────────────────────────────────────────────────────

test("a hard first prompt escalates; an easy one keeps the task-type mapping", () => {
  resetConfig();
  setTaskRoutingConfig({
    enabled: true,
    detectionAnchor: "first-user",
    taskModelMap: { ...getDefaultTaskModelMap(), chat: SONNET, coding: SONNET },
    complexityRouting: ESCALATE_TO_OPUS,
  });

  const hard = applyTaskAwareRouting(SONNET, agentConversation(HARD_PROMPT, 2));
  assert.equal(hard.model, OPUS);
  assert.equal(hard.escalated, true);
  assert.ok((hard.complexityScore ?? 0) >= DEFAULT_COMPLEXITY_MIN_SCORE);

  const easy = applyTaskAwareRouting(OPUS, agentConversation(EASY_PROMPT, 2));
  assert.equal(easy.model, SONNET);
  assert.equal(easy.escalated, false);
  assert.ok((easy.complexityScore ?? 99) < DEFAULT_COMPLEXITY_MIN_SCORE);
});

test("complexity is scored on the anchor prompt only, not tools or history", () => {
  resetConfig();
  setTaskRoutingConfig({ detectionAnchor: "first-user", complexityRouting: ESCALATE_TO_OPUS });
  const short = resolveComplexityEscalation("coding", agentConversation(EASY_PROMPT, 0));
  const long = resolveComplexityEscalation("coding", agentConversation(EASY_PROMPT, 40));
  assert.ok(short && long);
  assert.equal(long.score, short.score);
  assert.equal(long.model, null);
});

test("harness blocks never count toward the score, in either detection mode", () => {
  const body = (reminder: string) => ({
    tools: [{ name: "Bash" }],
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: `<system-reminder>${reminder}</system-reminder>` },
          { type: "text", text: EASY_PROMPT },
        ],
      },
    ],
  });
  for (const detectionAnchor of ["latest-user", "first-user"] as const) {
    resetConfig();
    setTaskRoutingConfig({ detectionAnchor, complexityRouting: ESCALATE_TO_OPUS });
    assert.equal(resolveComplexityEscalation("coding", body(HARD_PROMPT))?.model, null);
  }
});

test("background and vision requests never escalate", () => {
  resetConfig();
  setTaskRoutingConfig({ complexityRouting: { enabled: true, minScore: 0, model: OPUS } });
  const body = agentConversation(HARD_PROMPT, 0);
  assert.equal(resolveComplexityEscalation("background", body)?.model, null);
  assert.equal(resolveComplexityEscalation("vision", body)?.model, null);
  assert.equal(resolveComplexityEscalation("coding", body)?.model, OPUS);
});

test("requests without tools never escalate, however complex their prompt", () => {
  resetConfig();
  setTaskRoutingConfig({ detectionAnchor: "first-user", complexityRouting: ESCALATE_TO_OPUS });
  const agentTurn = agentConversation(HARD_PROMPT, 0);
  for (const tools of [undefined, []]) {
    const result = resolveComplexityEscalation("coding", { ...agentTurn, tools });
    assert.ok(result && result.score >= DEFAULT_COMPLEXITY_MIN_SCORE, JSON.stringify(result));
    assert.equal(result.model, null);
  }
  assert.equal(resolveComplexityEscalation("coding", agentTurn)?.model, OPUS);
});

test("a long first prompt is scored on its first 20,000 characters only", () => {
  resetConfig();
  setTaskRoutingConfig({ detectionAnchor: "first-user", complexityRouting: ESCALATE_TO_OPUS });
  const filler = "note ".repeat(4_000);
  const body = {
    tools: [{ name: "Bash" }],
    messages: [{ role: "user", content: filler + HARD_PROMPT }],
  };
  const firstPart = analyzeSpecificity({ messages: [{ role: "user", content: filler }] }).score;
  const result = resolveComplexityEscalation("coding", body);
  assert.equal(result?.score, firstPart);
  assert.equal(result?.model, null);
});

test("a malformed persisted complexityRouting block is ignored, not thrown on", () => {
  // null / "" / false must not coerce to a threshold of 0 and escalate every agent turn.
  for (const minScore of ["lots", null, "", false]) {
    resetConfig();
    assert.equal(
      hydrateTaskRoutingConfig({
        taskRouting: JSON.stringify({
          enabled: true,
          complexityRouting: { enabled: true, minScore, model: OPUS },
        }),
      }),
      true
    );
    assert.equal(
      resolveComplexityEscalation("coding", agentConversation(HARD_PROMPT, 0)),
      null,
      JSON.stringify(minScore)
    );
    assert.doesNotThrow(() => applyTaskAwareRouting(OPUS, agentConversation(HARD_PROMPT, 0)));
  }
});

// ── persistence + validation ─────────────────────────────────────────────────

test("complexityRouting survives a restart via hydration", () => {
  resetConfig();
  const persisted = {
    enabled: true,
    complexityRouting: { enabled: true, minScore: 8, model: OPUS },
  };
  assert.equal(hydrateTaskRoutingConfig({ taskRouting: JSON.stringify(persisted) }), true);
  assert.deepEqual(getTaskRoutingConfig().complexityRouting, persisted.complexityRouting);
});

test("getTaskRoutingConfig returns a copy of complexityRouting", () => {
  resetConfig();
  const copy = getTaskRoutingConfig();
  copy.complexityRouting!.model = "mutated";
  assert.equal(getTaskRoutingConfig().complexityRouting!.model, "");
});

test("updateTaskRoutingSchema accepts complexityRouting on its own", () => {
  for (const complexityRouting of [ESCALATE_TO_OPUS, { enabled: false, minScore: 6, model: "" }]) {
    assert.equal(updateTaskRoutingSchema.safeParse({ complexityRouting }).success, true);
  }
});

test("updateTaskRoutingSchema rejects a malformed complexityRouting block", () => {
  const bad = [
    { enabled: true, minScore: 6, model: "" },
    { enabled: true, minScore: 101, model: OPUS },
    { enabled: true, minScore: 2.5, model: OPUS },
    { enabled: true, model: OPUS },
    { enabled: true, minScore: 6, model: OPUS, extra: 1 },
  ];
  for (const complexityRouting of bad) {
    assert.equal(
      updateTaskRoutingSchema.safeParse({ complexityRouting }).success,
      false,
      JSON.stringify(complexityRouting)
    );
  }
});
