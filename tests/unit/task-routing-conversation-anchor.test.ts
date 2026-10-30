/**
 * Coverage for the two opt-in Task-Aware Routing refinements for agent traffic:
 *
 *  - `detectionAnchor: "first-user"` — detection reads the conversation's first human-written
 *    user message, so every turn of an agent loop (which resends the whole history) gets the
 *    same decision and the per-model prompt cache is never thrown away mid-conversation.
 *  - `complexityRouting` — escalates prompts whose specificity score reaches `minScore`.
 *
 * Plus the harness-block fix that applies to both anchors: `<system-reminder>` blocks that
 * agent CLIs inject into user turns are not the user's request and must not drive detection.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  applyTaskAwareRouting,
  detectTaskType,
  getDefaultTaskModelMap,
  getTaskRoutingConfig,
  hydrateTaskRoutingConfig,
  resolveComplexityEscalation,
  setTaskRoutingConfig,
  stripHarnessInjectedBlocks,
  DEFAULT_COMPLEXITY_MIN_SCORE,
} from "../../open-sse/services/taskAwareRouter.ts";
import { updateTaskRoutingSchema } from "../../src/shared/validation/schemas/routing.ts";

const OPUS = "claude/claude-opus-5-5";
const SONNET = "claude/claude-sonnet-5-5";

const HARD_PROMPT =
  "We need to redesign the auth flow. First, analyze how sessions are stored today; then " +
  "propose a migration to JWT with refresh tokens, because the current approach breaks " +
  "across regions. Step by step: 1. audit 2. design 3. migrate 4. rollback plan.";
const EASY_PROMPT = "rename getUser to fetchUser in src/api.ts";

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

/** A Claude-Code-shaped first user turn: injected reminders, then the human request. */
function agentFirstTurn(request: string) {
  return {
    role: "user",
    content: [
      {
        type: "text",
        text: "<system-reminder>Project rules: implement features with tests. ```ts\nconst x = 1;\n```</system-reminder>",
      },
      { type: "text", text: request },
    ],
  };
}

/** The same conversation after `turns` tool round-trips — what the agent resends each turn. */
function agentConversation(request: string, turns: number) {
  const messages: Array<Record<string, unknown>> = [agentFirstTurn(request)];
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
  // A later human turn that, on its own, reads as a different task type.
  messages.push({ role: "user", content: "now write a function that parses the config" });
  return { model: OPUS, tools: [{ name: "Bash" }, { name: "Read" }], messages };
}

// ── harness-injected blocks ──────────────────────────────────────────────────

test("stripHarnessInjectedBlocks removes complete blocks and keeps the surrounding text", () => {
  assert.equal(
    stripHarnessInjectedBlocks(
      "a<system-reminder>x</system-reminder>b<system-reminder>y</system-reminder>c"
    ),
    "abc"
  );
});

test("stripHarnessInjectedBlocks keeps an unterminated opening tag and what follows it", () => {
  const text = "please <system-reminder> is a literal tag here";
  assert.equal(stripHarnessInjectedBlocks(text), text);
});

test("injected reminder text no longer drives detection (default latest-user anchor)", () => {
  resetConfig();
  const body = {
    messages: [
      {
        role: "user",
        content:
          "<system-reminder>implement features; write a function per file</system-reminder>please summarize this article",
      },
    ],
  };
  assert.equal(detectTaskType(body), "summarization");
});

// ── detectionAnchor ──────────────────────────────────────────────────────────

test("default latest-user anchor keeps the original behavior: the newest user turn decides", () => {
  resetConfig();
  assert.equal(detectTaskType(agentConversation("please summarize this article", 3)), "coding");
});

test("first-user anchor classifies by the first human-written request", () => {
  resetConfig();
  setTaskRoutingConfig({ detectionAnchor: "first-user" });
  assert.equal(
    detectTaskType(agentConversation("please summarize this article", 3)),
    "summarization"
  );
});

test("first-user anchor gives every turn of a conversation the same model", () => {
  resetConfig();
  setTaskRoutingConfig({
    enabled: true,
    detectionAnchor: "first-user",
    taskModelMap: { ...getDefaultTaskModelMap(), summarization: SONNET, coding: OPUS },
  });
  const models = new Set<string>();
  for (let turns = 0; turns <= 6; turns++) {
    models.add(
      applyTaskAwareRouting(OPUS, agentConversation("summarize this article", turns)).model
    );
  }
  assert.deepEqual([...models], [SONNET]);
});

test("first-user anchor skips leading user turns that carry no human text", () => {
  resetConfig();
  setTaskRoutingConfig({ detectionAnchor: "first-user" });
  const body = {
    messages: [
      { role: "user", content: "<system-reminder>context only</system-reminder>" },
      { role: "user", content: "summarize the meeting notes" },
      { role: "user", content: "write a function" },
    ],
  };
  assert.equal(detectTaskType(body), "summarization");
});

test("first-user anchor only treats images in the anchor message as vision", () => {
  resetConfig();
  setTaskRoutingConfig({ detectionAnchor: "first-user" });
  const body = agentConversation("summarize this article", 1);
  body.messages.push({
    role: "user",
    content: [{ type: "image", source: { type: "base64", media_type: "image/png", data: "x" } }],
  });
  assert.equal(detectTaskType(body), "summarization");

  setTaskRoutingConfig({ detectionAnchor: "latest-user" });
  assert.equal(detectTaskType(body), "vision");
});

// ── complexityRouting ────────────────────────────────────────────────────────

test("complexity escalation is off by default and reports nothing", () => {
  resetConfig();
  assert.equal(resolveComplexityEscalation("coding", agentConversation(HARD_PROMPT, 1)), null);
  setTaskRoutingConfig({ enabled: true });
  const result = applyTaskAwareRouting(OPUS, agentConversation(HARD_PROMPT, 1));
  assert.equal(result.escalated, undefined);
  assert.equal(result.complexityScore, undefined);
});

test("a hard first prompt escalates; an easy one keeps the task-type mapping", () => {
  resetConfig();
  setTaskRoutingConfig({
    enabled: true,
    detectionAnchor: "first-user",
    taskModelMap: { ...getDefaultTaskModelMap(), chat: SONNET, coding: SONNET },
    complexityRouting: { enabled: true, minScore: DEFAULT_COMPLEXITY_MIN_SCORE, model: OPUS },
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

test("complexity is scored on the anchor prompt only, not tools, reminders or history", () => {
  resetConfig();
  setTaskRoutingConfig({
    detectionAnchor: "first-user",
    complexityRouting: { enabled: true, minScore: DEFAULT_COMPLEXITY_MIN_SCORE, model: OPUS },
  });
  const short = resolveComplexityEscalation("coding", agentConversation(EASY_PROMPT, 0));
  const long = resolveComplexityEscalation("coding", agentConversation(EASY_PROMPT, 40));
  assert.ok(short && long);
  assert.equal(long.score, short.score);
  assert.equal(long.model, null);
});

test("background and vision requests never escalate", () => {
  resetConfig();
  setTaskRoutingConfig({
    complexityRouting: { enabled: true, minScore: 0, model: OPUS },
  });
  const body = agentConversation(HARD_PROMPT, 0);
  assert.equal(resolveComplexityEscalation("background", body)?.model, null);
  assert.equal(resolveComplexityEscalation("vision", body)?.model, null);
  assert.equal(resolveComplexityEscalation("coding", body)?.model, OPUS);
});

test("a malformed persisted complexityRouting block is ignored, not thrown on", () => {
  resetConfig();
  assert.equal(
    hydrateTaskRoutingConfig({
      taskRouting: JSON.stringify({
        enabled: true,
        complexityRouting: { enabled: true, minScore: "lots", model: OPUS },
      }),
    }),
    true
  );
  assert.equal(resolveComplexityEscalation("coding", agentConversation(HARD_PROMPT, 0)), null);
  assert.doesNotThrow(() => applyTaskAwareRouting(OPUS, agentConversation(HARD_PROMPT, 0)));
});

// ── persistence + validation ─────────────────────────────────────────────────

test("detectionAnchor and complexityRouting survive a restart via hydration", () => {
  resetConfig();
  const persisted = {
    enabled: true,
    detectionAnchor: "first-user",
    complexityRouting: { enabled: true, minScore: 8, model: OPUS },
  };
  assert.equal(hydrateTaskRoutingConfig({ taskRouting: JSON.stringify(persisted) }), true);
  const config = getTaskRoutingConfig();
  assert.equal(config.detectionAnchor, "first-user");
  assert.deepEqual(config.complexityRouting, persisted.complexityRouting);
});

test("getTaskRoutingConfig returns a copy of complexityRouting", () => {
  resetConfig();
  const copy = getTaskRoutingConfig();
  copy.complexityRouting!.model = "mutated";
  assert.equal(getTaskRoutingConfig().complexityRouting!.model, "");
});

test("updateTaskRoutingSchema accepts each new field on its own", () => {
  assert.equal(updateTaskRoutingSchema.safeParse({ detectionAnchor: "first-user" }).success, true);
  assert.equal(
    updateTaskRoutingSchema.safeParse({
      complexityRouting: { enabled: true, minScore: 6, model: OPUS },
    }).success,
    true
  );
  assert.equal(
    updateTaskRoutingSchema.safeParse({
      complexityRouting: { enabled: false, minScore: 6, model: "" },
    }).success,
    true
  );
});

test("updateTaskRoutingSchema rejects malformed new fields", () => {
  const bad = [
    { detectionAnchor: "middle" },
    { complexityRouting: { enabled: true, minScore: 6, model: "" } },
    { complexityRouting: { enabled: true, minScore: 101, model: OPUS } },
    { complexityRouting: { enabled: true, minScore: 2.5, model: OPUS } },
    { complexityRouting: { enabled: true, model: OPUS } },
    { complexityRouting: { enabled: true, minScore: 6, model: OPUS, extra: 1 } },
  ];
  for (const payload of bad) {
    assert.equal(
      updateTaskRoutingSchema.safeParse(payload).success,
      false,
      JSON.stringify(payload)
    );
  }
});
