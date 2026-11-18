import test from "node:test";
import assert from "node:assert/strict";

const { getSpecificityBreakdown, getEnhancedSpecificityBreakdown, stripHarnessWrappers } =
  await import("../../open-sse/services/specificityRules.ts");
const { handlePipelineCombo } = await import("../../open-sse/services/autoCombo/pipelineRouter.ts");

// Coding harnesses (Claude Code, Codex) put protocol wrappers into user text. The wrappers are
// full of code words, so they pushed plain questions into the code intent and a higher tier.
const REMINDER =
  "<system-reminder>\nUse the function and class names. import const async await debug refactor " +
  "typescript. See ```code``` and `npm run build`.\n</system-reminder>";
const QUESTION = "Name three mammals that live in the ocean.";

test("a system-reminder block adds nothing to the code score", () => {
  const plain = getSpecificityBreakdown({ messages: [{ role: "user", content: QUESTION }] });
  const wrapped = getSpecificityBreakdown({
    messages: [{ role: "user", content: `${REMINDER}\n${QUESTION}` }],
  });
  assert.equal(wrapped.codeComplexity, plain.codeComplexity);
  assert.equal(wrapped.reasoningDepth, plain.reasoningDepth);
});

test("the enhanced breakdown strips wrappers too", () => {
  const wrapped = getEnhancedSpecificityBreakdown({
    messages: [{ role: "user", content: `${REMINDER}\n${QUESTION}` }],
  });
  assert.equal(wrapped.codeComplexity, 0);
});

test("wrapper text still counts toward context size", () => {
  const big = `<system-reminder>${"a".repeat(20_000)}</system-reminder>\n${QUESTION}`;
  const breakdown = getSpecificityBreakdown({ messages: [{ role: "user", content: big }] });
  assert.ok(breakdown.contextSize > 0, "the model still reads the wrapper tokens");
});

test("stripHarnessWrappers removes known pairs and keeps everything else", () => {
  const codex = "# AGENTS.md instructions for /repo\nuse functions\n</INSTRUCTIONS>";
  const cases: Array<[string, string]> = [
    [`${REMINDER}\n${QUESTION}`, QUESTION],
    [`<local-command-stdout>ls</local-command-stdout>${QUESTION}`, QUESTION],
    [`<codex_internal_context v="1">x</codex_internal_context>${QUESTION}`, QUESTION],
    [`${codex}\n${QUESTION}`, QUESTION],
    // Unknown tags, unclosed tags and near-miss names are the user's own text.
    ["<note>function foo() {}</note>", "<note>function foo() {}</note>"],
    ["<system-reminder>no closing tag", "<system-reminder>no closing tag"],
    ["<system-reminders>x</system-reminders>", "<system-reminders>x</system-reminders>"],
  ];
  for (const [input, expected] of cases) {
    assert.equal(stripHarnessWrappers(input).trim(), expected);
  }
});

test("stripHarnessWrappers stays linear on many unclosed tags", () => {
  const hostile = "<system-reminder>".repeat(200_000);
  const start = Date.now();
  assert.equal(stripHarnessWrappers(hostile), hostile);
  assert.ok(Date.now() - start < 1000, "no quadratic scan");
});

test("stripHarnessWrappers stays linear on many closed pairs", () => {
  const many = "<system-reminder>x</system-reminder>".repeat(100_000) + QUESTION;
  const start = Date.now();
  assert.equal(stripHarnessWrappers(many), QUESTION);
  assert.ok(Date.now() - start < 1000, "no quadratic copy");
});

function makeLog() {
  const msgs: string[] = [];
  const push = (...args: unknown[]) => msgs.push(args.map(String).join(" "));
  return { info: push, warn: push, error: push, msgs };
}

test("pipeline intent ignores harness wrappers in the last user message", async () => {
  const log = makeLog();
  const body = {
    model: "gpt-4o",
    stream: false,
    messages: [{ role: "user", content: `${REMINDER}\n${QUESTION}` }],
  };
  await handlePipelineCombo({
    body,
    combo: { name: "c", models: ["gpt-4o"], config: { pipeline_enabled: true } },
    handleChatCore: async () =>
      new Response(JSON.stringify({ choices: [{ message: { content: "ok" } }] }), {
        status: 200,
        headers: { "content-type": "application/json" },
      }),
    log,
    settings: { pipeline_enabled: true, skip_pipeline_for_tokens_under: 10 },
  });
  const line = log.msgs.find((m) => m.includes("Intent:")) ?? "";
  assert.match(line, /Intent: medium/, line);
});
