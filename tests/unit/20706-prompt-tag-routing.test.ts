import assert from "node:assert/strict";
import { test } from "node:test";

import {
  applyPromptTagRouting,
  findPromptTag,
  isIdentifierTag,
  readPromptTag,
  requestNamesExplicitModel,
  resolvePromptTagCombo,
  stripPromptTag,
} from "../../open-sse/services/promptTagRouting.ts";

const COMBOS = ["coding-fast", "audit-pro", "opencode-go"];

test("reads a leading tag and tolerates leading whitespace", () => {
  assert.deepEqual(readPromptTag("[audit] проверь проект"), { tag: "audit", length: 7 });
  assert.deepEqual(readPromptTag("  \n[cf] дальше"), { tag: "cf", length: 7 });
  assert.equal(readPromptTag("без тега [audit]"), null);
  assert.equal(readPromptTag(""), null);
});

test("finds the tag on the newest tagged user message, not on the last message", () => {
  const body = {
    messages: [
      { role: "user", content: "[audit] проверь секреты" },
      { role: "assistant", content: null, tool_calls: [{ id: "call_a", type: "function" }] },
      { role: "tool", tool_call_id: "call_a", content: "ok" },
      { role: "user", content: "продолжай" },
    ],
  };
  const hit = findPromptTag(body);
  assert.equal(hit?.tag, "audit");
});

test("supports content parts and the responses input shape", () => {
  const parts = { messages: [{ role: "user", content: [{ type: "text", text: "[og] привет" }] }] };
  assert.equal(findPromptTag(parts)?.tag, "og");

  const responses = { input: [{ role: "user", content: "[fast] hello" }] };
  assert.equal(findPromptTag(responses)?.tag, "fast");

  assert.equal(findPromptTag({ input: "[cf] hi" })?.tag, "cf");
});

test("strips the tag from the message text", () => {
  const body = { messages: [{ role: "user", content: "[audit]   проверь" }] };
  const hit = findPromptTag(body);
  assert.ok(hit);
  assert.equal(stripPromptTag(hit), "проверь");
  assert.equal((body.messages[0] as { content: string }).content, "проверь");
});

test("resolves combo names, combo/<name> and aliases", () => {
  assert.equal(resolvePromptTagCombo("audit-pro", { combos: COMBOS }).combo, "audit-pro");
  assert.equal(resolvePromptTagCombo("combo/audit-pro", { combos: COMBOS }).combo, "audit-pro");
  assert.equal(
    resolvePromptTagCombo("audit", { combos: COMBOS, aliases: { audit: "audit-pro" } }).combo,
    "audit-pro"
  );
  assert.deepEqual(resolvePromptTagCombo("nope", { combos: COMBOS }), {
    combo: null,
    reason: "unknown",
  });
});

test("a tag never widens API key permissions", () => {
  const restricted = { combos: COMBOS, allowedCombos: ["coding-fast"] };
  assert.deepEqual(resolvePromptTagCombo("audit-pro", restricted), {
    combo: null,
    reason: "forbidden",
  });
  assert.equal(
    resolvePromptTagCombo("audit-pro", { combos: COMBOS, allowedCombos: ["combo/audit-pro"] }).combo,
    "audit-pro"
  );
  assert.equal(resolvePromptTagCombo("audit-pro", { combos: COMBOS, allowedCombos: ["*"] }).combo, "audit-pro");
});

test("an explicit model in the request outranks the tag", () => {
  assert.equal(requestNamesExplicitModel("ttc/claude-sonnet-5-5", COMBOS), true);
  assert.equal(requestNamesExplicitModel("combo/coding-fast", COMBOS), false);
  assert.equal(requestNamesExplicitModel("coding-fast", COMBOS), false);
  assert.equal(requestNamesExplicitModel("auto/best-fast", COMBOS), false);

  const body = { model: "ttc/claude-sonnet-5-5", messages: [{ role: "user", content: "[audit] привет" }] };
  const verdict = applyPromptTagRouting(body, { combos: COMBOS });
  assert.equal(verdict.combo, null);
  assert.equal(verdict.combo === null && verdict.reason, "explicit-model");
  assert.equal((body.messages[0] as { content: string }).content, "[audit] привет");
});

test("applies routing and strips the tag in the returned body only", () => {
  const viaAlias = { model: "combo/coding-fast", messages: [{ role: "user", content: "[audit] привет" }] };
  const aliasVerdict = applyPromptTagRouting(viaAlias, {
    combos: COMBOS,
    aliases: { audit: "audit-pro" },
  });
  assert.equal(aliasVerdict.combo, "audit-pro");
  assert.ok(aliasVerdict.combo);
  // The caller's body keeps the tag: it is the history persisted for continuation turns.
  assert.equal((viaAlias.messages[0] as { content: string }).content, "[audit] привет");
  const sent = (aliasVerdict.body.messages as Array<{ content: string }>)[0];
  assert.equal(sent.content, "привет");
  // ...and the original message object is not the one sent upstream.
  assert.notEqual(sent, viaAlias.messages[0]);

  const exact = { model: "combo/coding-fast", messages: [{ role: "user", content: "[audit-pro] привет" }] };
  assert.equal(applyPromptTagRouting(exact, { combos: COMBOS }).combo, "audit-pro");
});

test("prose in brackets is not treated as a routing tag", () => {
  const body = { model: "combo/coding-fast", messages: [{ role: "user", content: "[see the docs] как?" }] };
  const verdict = applyPromptTagRouting(body, { combos: COMBOS });
  assert.equal(verdict.combo, null);
  assert.equal(isIdentifierTag("see the docs"), false);
  assert.equal(isIdentifierTag("audit"), true);
});

test("ambiguous case-insensitive combo names are not guessed", () => {
  const mixed = ["Audit", "audit", "coding-fast"];
  assert.equal(resolvePromptTagCombo("audit", { combos: mixed }).combo, "audit");
  assert.deepEqual(resolvePromptTagCombo("AUDIT", { combos: mixed }), { combo: null, reason: "unknown" });
});

test("eligibility is decided on the model the client admitted, not the rewritten one", () => {
  // Task-aware routing rewrote body.model to a combo, but the client asked for a concrete model.
  const body = {
    model: "combo/coding-fast",
    messages: [{ role: "user", content: "[audit] привет" }],
  };
  const verdict = applyPromptTagRouting(body, {
    combos: COMBOS,
    eligibleModel: "ttc/claude-sonnet-5-5",
  });
  assert.equal(verdict.combo, null);
  assert.equal(verdict.combo === null && verdict.reason, "explicit-model");
});

test("strips the tag from content parts without touching the caller's parts", () => {
  const body = { messages: [{ role: "user", content: [{ type: "text", text: "[og] привет" }] }] };
  const verdict = applyPromptTagRouting(body, { combos: COMBOS, aliases: { og: "opencode-go" } });
  assert.equal(verdict.combo, "opencode-go");
  assert.ok(verdict.combo);
  const originalParts = body.messages[0].content as Array<{ text: string }>;
  assert.equal(originalParts[0].text, "[og] привет");
  const sentParts = (verdict.body.messages as Array<{ content: Array<{ text: string }> }>)[0].content;
  assert.equal(sentParts[0].text, "привет");
});
