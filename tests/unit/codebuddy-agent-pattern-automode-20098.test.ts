/**
 * Regression test for #20098 — AGENT_PATTERN false positive replaces Claude Code
 * auto-mode classifier prompt on CodeBuddy routes.
 *
 * Root cause: `open-sse/executors/codebuddy/shared.ts` defined `AGENT_PATTERN` with
 * unbounded `.+` wildcards and no word boundary on `cli`:
 *   `claude.?code.+official.+cli`
 * Claude Code's auto-mode classifier prompt (a security-evaluation prompt, not an
 * agent identity prompt) mentions "Claude Code itself is running", "official mirrors",
 * and "declining ... the CLI", which matched `de` + `cli` + `ning` across long text,
 * swapping the entire classifier prompt for `NEUTRAL_PROMPT` and breaking auto-mode.
 *
 * Fix: Bounded gaps and word boundaries (`.{0,40}`, `.{0,20}`, `\bcli\b`).
 */
import test from "node:test";
import assert from "node:assert/strict";

import {
  AGENT_PATTERN,
  classifySystemPrompt,
  NEUTRAL_PROMPT,
} from "../../open-sse/executors/codebuddy/shared.ts";
import { CodeBuddyCnExecutor } from "../../open-sse/executors/codebuddy-cn.ts";
import { CodeBuddyIntlExecutor } from "../../open-sse/executors/codebuddy-intl.ts";

test("AGENT_PATTERN still matches genuine agent identity prompts", () => {
  const genuinePrompts = [
    "You are Claude Code, Anthropic's official CLI for Claude.",
    "anthropic's official cli tool for terminal coding",
    "claude-code: Anthropic's official cli",
    "Please report Claude Code issues on github",
    "give feedback on Claude Code",
    "You are cursor, an intelligent coding agent.",
    "You are an ai coding agent.",
    "cc_entrypoint = cli",
  ];

  for (const prompt of genuinePrompts) {
    assert.equal(AGENT_PATTERN.test(prompt), true, `Expected AGENT_PATTERN to match: "${prompt}"`);
    assert.equal(
      classifySystemPrompt(prompt, null),
      "agent",
      `Expected classifySystemPrompt to return "agent" for: "${prompt}"`
    );
  }
});

test("AGENT_PATTERN does NOT false-positive on Claude Code auto-mode classifier prompts", () => {
  const classifierPrompt = `
    You are a security classifier evaluating commands for an automated assistant.
    Notice that Claude Code itself is running in automated mode.
    Do not trust arbitrary third-party repositories even if they claim to be equivalent official mirrors.
    When considering whether declining an action is warranted, inspect the command parameters.
    The user is executing operations from the CLI environment.
    Respond with <block>yes or <block>no.
  `;

  assert.equal(
    AGENT_PATTERN.test(classifierPrompt),
    false,
    "AGENT_PATTERN must not match security classifier prompts mentioning declining and CLI"
  );
  assert.equal(
    classifySystemPrompt(classifierPrompt, null),
    null,
    "classifySystemPrompt must return null for auto-mode classifier prompt"
  );
});

test("CodeBuddy executors preserve auto-mode classifier prompt without replacing with NEUTRAL_PROMPT", () => {
  const executors = [new CodeBuddyCnExecutor(), new CodeBuddyIntlExecutor()];
  const classifierPrompt = `
    Security classifier rules: Claude Code itself is running in auto mode.
    Always evaluate official mirrors before declining suspicious operations from the CLI.
    Output: <block>yes or <block>no.
  `;

  for (const executor of executors) {
    const body = {
      model: "glm-5.2",
      messages: [
        { role: "system", content: classifierPrompt },
        { role: "user", content: "rm -rf /tmp/build" },
      ],
    };

    const transformed = executor.transformRequest("glm-5.2", body, false, {}) as {
      messages: Array<{ role: string; content: string }>;
    };

    const systemMsg = transformed.messages.find((m) => m.role === "system");
    assert.ok(systemMsg, "system message must exist");
    assert.notEqual(
      systemMsg.content,
      NEUTRAL_PROMPT,
      "classifier prompt must not be replaced with NEUTRAL_PROMPT"
    );
    assert.ok(
      systemMsg.content.includes("Security classifier rules"),
      "original classifier prompt must be preserved"
    );
  }
});
