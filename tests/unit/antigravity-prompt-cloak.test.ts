/**
 * Full-parity tests for the magpie `cloak.mjs` port
 * (open-sse/services/antigravityPromptCloak.ts).
 *
 * Antigravity answers a bare 429 "Resource has been exhausted" to a system
 * prompt holding any TURNED_AWAY line, whatever quota is left, and lets the
 * same prompt through reworded. These tests pin the 12 signatures, the
 * invisible-character evasion (a line Google reads past anyway), the
 * user-turn subset, the REWORDED paragraphs, idempotence, and that
 * non-string / clean input is returned untouched.
 */
import { test } from "node:test";
import assert from "node:assert/strict";

import {
  TURNED_AWAY,
  USER_TURNED_AWAY,
  REWORDED,
  cloak,
  cloakUser,
  outgoing,
  reword,
  hint,
  turnsAway,
} from "../../open-sse/services/antigravityPromptCloak.ts";

const INVISIBLE_CHARS = [
  "\u00ad",
  "\u180e",
  "\u200b",
  "\u200c",
  "\u200d",
  "\u200e",
  "\u200f",
  "\u2060",
  "\u2061",
  "\u2062",
  "\u2063",
  "\u2064",
  "\ufeff",
];

test("TURNED_AWAY holds the 12 verified signatures", () => {
  assert.equal(TURNED_AWAY.length, 12);
  assert.ok(TURNED_AWAY.includes("x-anthropic-billing-header:"));
  assert.ok(TURNED_AWAY.includes("you are claude code, anthropic's official cli for claude"));
  assert.ok(TURNED_AWAY.includes("you are an ai agent powered by deepseek harness"));
  assert.ok(TURNED_AWAY.includes("a coding assistant running inside pi"));
});

test("USER_TURNED_AWAY is exactly the two Codex GPT-5 lines", () => {
  assert.deepEqual(USER_TURNED_AWAY, [
    "you are codex, an agent based on gpt-5",
    "you are codex, a coding agent based on gpt-5",
  ]);
});

test("turnsAway detects every signature case-insensitively", () => {
  for (const line of TURNED_AWAY) {
    assert.equal(turnsAway(line.toUpperCase()), true, `uppercase: ${line}`);
    assert.equal(turnsAway(`prefix text\n${line}\nsuffix text`), true, `embedded: ${line}`);
  }
  assert.equal(turnsAway("You are a helpful assistant."), false);
});

test("turnsAway reads past invisible characters inside each word", () => {
  // A copy someone broke up with a zero-width space after every character —
  // Google's check reads it as the line itself (5 of 5 on a real account).
  for (const invisible of INVISIBLE_CHARS) {
    const broken = [..."You are OpenCode"].map((c) => (c === " " ? " " : c + invisible)).join("");
    assert.equal(turnsAway(broken), true, `invisible U+${invisible.codePointAt(0).toString(16)}`);
  }
});

test("turnsAway tolerates any run of white space between words", () => {
  assert.equal(turnsAway("You   are\tOpenCode"), true);
  assert.equal(turnsAway("You\nare\u00a0OpenCode"), true);
  assert.equal(turnsAway("You  are\n\tOpenCode"), true);
});

test("cloak rewrites each signature to the verified SAID_AS wording", () => {
  const cases: Array<[string, string]> = [
    [
      "You are Hermes Agent, built by Nous Research.",
      "You're Hermes Agent, built by Nous Research.",
    ],
    [
      // The signature is the "an intelligent…" clause, not the whole sentence,
      // so only "created by" is rewritten (cloak.mjs says so explicitly: the
      // earlier Hermes persona goes through as "built by" 3 of 3 while
      // "You are Hermes Agent" is the line that must go "You're").
      "You are an intelligent AI assistant created by Nous Research.",
      "You are an intelligent AI assistant built by Nous Research.",
    ],
    [
      "You are OpenCode, a coding agent that helps users.",
      "You're OpenCode, a coding agent that helps users.",
    ],
    [
      "You are a coding agent running in the Codex CLI.",
      "You're a coding agent running in the Codex CLI.",
    ],
    [
      "You are a coding assistant running inside pi, a coding agent harness.",
      "You are a coding assistant running within pi, a coding agent harness.",
    ],
    [
      "You are an AI agent powered by DeepSeek Harness.",
      "You're an AI agent powered by DeepSeek Harness.",
    ],
    [
      "You are Claude Code, Anthropic's official CLI for Claude.",
      "You're Claude Code, Anthropic's official CLI for Claude.",
    ],
    ["You are Codex, an agent based on GPT-5.", "You are Codex, an agent built on GPT-5."],
    [
      "You are Codex, a coding agent based on GPT-5.",
      "You are Codex, a coding agent built on GPT-5.",
    ],
    ["built on Anthropic's Claude Agent SDK", "built on the Claude Agent SDK by Anthropic"],
    [
      "RFC 2119 keywords: MUST, REQUIRED, SHOULD, RECOMMENDED, MAY, OPTIONAL.",
      "RFC 2119 key words: MUST, REQUIRED, SHOULD, RECOMMENDED, MAY, OPTIONAL.",
    ],
  ];
  for (const [from, to] of cases) {
    assert.equal(cloak(from), to, `cloak: ${from}`);
  }
});

test("cloak drops Claude Code's billing line whole, including its tail", () => {
  const billing =
    "x-anthropic-billing-header: cc_version=2.1.325; cc_entrypoint=cli; cch=abc123\nYou are a helpful assistant.";
  const out = cloak(billing);
  assert.equal(out.includes("x-anthropic-billing-header"), false);
  assert.equal(out, "You are a helpful assistant.");
});

test("cloak is idempotent — a cloaked prompt is no longer turned away", () => {
  for (const line of TURNED_AWAY) {
    const once = cloak(line);
    assert.equal(turnsAway(once), false, `still turned away after cloak: ${once}`);
    assert.equal(cloak(once), once, `not idempotent: ${line}`);
  }
});

test("cloak strips invisible characters from the rewritten span", () => {
  const broken = [..."You are OpenCode"].map((c) => (c === " " ? " " : c + "\u200b")).join("");
  const out = cloak(broken);
  // Every invisible inside the matched line is gone; the rewording is the
  // verified one. (cloak.mjs cleans only the span it rewrites: an invisible
  // character the match never covered is left where the client put it.)
  for (const invisible of INVISIBLE_CHARS) {
    assert.equal(out.slice(0, "You're OpenCode".length).includes(invisible), false);
  }
  assert.equal(out.startsWith("You're OpenCode"), true);
  assert.equal(turnsAway(out), false);
});

test("cloak leaves a clean prompt byte-identical", () => {
  const clean = "You are a careful reviewer.\nFollow the repository conventions.";
  assert.equal(cloak(clean), clean);
  assert.equal(outgoing(clean), clean);
});

test("cloak returns non-strings untouched", () => {
  for (const value of [undefined, null, 42, {}, []]) {
    assert.equal(cloak(value), value);
    assert.equal(reword(value), value);
  }
});

test("cloakUser rewords only the Codex GPT-5 lines", () => {
  // Hermes' persona goes through as written in a user's turn (3 of 3), so it
  // must survive cloakUser, while Codex's GPT-5 line does not.
  const userTurn =
    "You are Hermes Agent, built by Nous Research.\nYou are Codex, an agent based on GPT-5.";
  const out = cloakUser(userTurn);
  assert.equal(out.includes("You are Hermes Agent, built by Nous Research."), true);
  assert.equal(out.includes("You are Codex, an agent built on GPT-5."), true);
});

test("cloak's only filter restricts rewrites to the named subset", () => {
  const prompt = "You are OpenCode.\nYou are Codex, an agent based on GPT-5.";
  const onlyCodex = cloak(prompt, USER_TURNED_AWAY);
  assert.equal(onlyCodex.includes("You are OpenCode."), true);
  assert.equal(onlyCodex.includes("built on GPT-5"), true);
});

test("reword replaces the DeepSeek Harness @-path paragraph", () => {
  const [from, to] = REWORDED[0];
  const prompt = `Intro line.\n${from}\nOutro line.`;
  const out = reword(prompt);
  assert.equal(out.includes(to), true);
  assert.equal(out.includes(from), false);
  assert.equal(out.startsWith("Intro line."), true);
  assert.equal(out.endsWith("Outro line."), true);
});

test("outgoing applies both the rewording and the paragraph rewrite", () => {
  const prompt = `You are OpenCode.\n${REWORDED[0][0]}`;
  const out = outgoing(prompt);
  assert.equal(out.includes("You're OpenCode."), true);
  assert.equal(out.includes(REWORDED[0][1]), true);
});

test("hint names the harness whose prompt was turned away", () => {
  assert.match(hint("You are OpenCode, an interactive CLI tool."), /OpenCode/);
  assert.match(hint("You are Hermes Agent, built by Nous Research."), /Hermes Agent/);
  assert.match(hint("You are an AI agent powered by DeepSeek Harness."), /DeepSeek Harness/);
  assert.match(hint("You are a coding agent running in the Codex CLI."), /Codex/);
  assert.match(hint("You are Codex, an agent based on GPT-5."), /Codex/);
  assert.match(hint("a coding assistant running inside pi"), /pi/);
  assert.match(
    hint("RFC 2119 keywords: MUST, REQUIRED, SHOULD, RECOMMENDED, MAY, OPTIONAL."),
    /oh-my-pi/
  );
  // The generic Claude Code / Agent SDK hint is the fallback.
  assert.match(hint("built on Anthropic's Claude Agent SDK"), /Claude Agent SDK/);
  assert.match(hint(""), /Claude Code/);
});

test("hint detects a prompt broken up with invisible characters", () => {
  const broken = [..."You are OpenCode"].map((c) => (c === " " ? " " : c + "\u200b")).join("");
  assert.match(hint(broken), /OpenCode/);
});
