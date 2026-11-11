/**
 * Coverage for the opt-in "one model per conversation" mode of Task-Aware Routing:
 * `detectionAnchor: "first-user"` reads the conversation's first human-written user message,
 * so every turn of an agent loop (which resends the whole history) gets the same decision and
 * the per-model prompt cache is never thrown away mid-conversation.
 *
 * In that mode only, `<system-reminder>` / `<environment_context>` blocks that agent CLIs inject
 * into user turns are ignored. The default mode ("latest-user") must detect exactly as before.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  applyTaskAwareRouting,
  detectTaskType,
  getDefaultTaskModelMap,
  getTaskRoutingConfig,
  hydrateTaskRoutingConfig,
  setTaskRoutingConfig,
  stripHarnessInjectedBlocks,
} from "../../open-sse/services/taskAwareRouter.ts";
import { updateTaskRoutingSchema } from "../../src/shared/validation/schemas/routing.ts";

const OPUS = "claude/claude-opus-5-5";
const SONNET = "claude/claude-sonnet-5-5";

function resetConfig(): void {
  setTaskRoutingConfig({
    enabled: false,
    taskModelMap: getDefaultTaskModelMap(),
    detectionEnabled: true,
    patternOverrides: undefined,
    detectionAnchor: "latest-user",
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

const REMINDER_THEN_SUMMARY = {
  messages: [
    {
      role: "user",
      content:
        "<system-reminder>implement features; write a function per file</system-reminder>please summarize this article",
    },
  ],
};

// ── default behavior stays unchanged ─────────────────────────────────────────

test("with routing off, a request keeps its model and nothing is detected", () => {
  resetConfig();
  setTaskRoutingConfig({ detectionAnchor: "first-user" });
  assert.deepEqual(applyTaskAwareRouting(OPUS, agentConversation("summarize this article", 3)), {
    model: OPUS,
    taskType: "chat",
    wasRouted: false,
  });
});

test("the default mode still lets injected reminder text drive detection, as before", () => {
  resetConfig();
  assert.equal(detectTaskType(REMINDER_THEN_SUMMARY), "coding");
});

test("the default mode still classifies by the newest user turn", () => {
  resetConfig();
  assert.equal(detectTaskType(agentConversation("please summarize this article", 3)), "coding");
});

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

test("first-user mode ignores injected reminder text", () => {
  resetConfig();
  setTaskRoutingConfig({ detectionAnchor: "first-user" });
  assert.equal(detectTaskType(REMINDER_THEN_SUMMARY), "summarization");
});

// ── detectionAnchor: "first-user" ───────────────────────────────────────────

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

test("first-user anchor skips Codex's environment_context message (Responses API input)", () => {
  resetConfig();
  setTaskRoutingConfig({ detectionAnchor: "first-user" });
  const text = (value: string) => [{ type: "input_text", text: value }];
  const body = {
    tools: [{ type: "function", name: "shell" }],
    input: [
      { type: "message", role: "developer", content: text("Follow the sandbox policy.") },
      {
        type: "message",
        role: "user",
        content: text(
          "<environment_context>\n  <cwd>/home/dev/repo</cwd>\n  <shell>zsh</shell>\n</environment_context>"
        ),
      },
      { type: "message", role: "user", content: text("summarize the open TODOs in this repo") },
      { type: "function_call", call_id: "c1", name: "shell", arguments: '{"cmd":["rg","TODO"]}' },
      { type: "function_call_output", call_id: "c1", output: "src/main.py: def main(): # TODO" },
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

// ── persistence + validation ─────────────────────────────────────────────────

test("detectionAnchor survives a restart via hydration", () => {
  resetConfig();
  const persisted = { enabled: true, detectionAnchor: "first-user" };
  assert.equal(hydrateTaskRoutingConfig({ taskRouting: JSON.stringify(persisted) }), true);
  assert.equal(getTaskRoutingConfig().detectionAnchor, "first-user");
});

test("an unknown persisted detectionAnchor falls back to the default mode", () => {
  resetConfig();
  hydrateTaskRoutingConfig({ taskRouting: JSON.stringify({ detectionAnchor: "middle" }) });
  assert.equal(detectTaskType(agentConversation("please summarize this article", 3)), "coding");
});

test("updateTaskRoutingSchema accepts detectionAnchor and rejects unknown values", () => {
  assert.equal(updateTaskRoutingSchema.safeParse({ detectionAnchor: "first-user" }).success, true);
  assert.equal(updateTaskRoutingSchema.safeParse({ detectionAnchor: "latest-user" }).success, true);
  assert.equal(updateTaskRoutingSchema.safeParse({ detectionAnchor: "middle" }).success, false);
});
