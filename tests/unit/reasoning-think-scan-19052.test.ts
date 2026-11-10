/**
 * #19052 — no-log attempts run the reasoning observation on the live response,
 * not on a clone capped at CHAT_LOG_TEXT_LIMIT, and they run it synchronously
 * inside persistAttemptLogs. The <think> scan must stay linear on upstream text
 * of any length: a single lazy regex retries from every unclosed `<think>`.
 */

import test from "node:test";
import assert from "node:assert/strict";
import { getObservedReasoning } from "../../src/lib/usage/tokenAccounting.ts";

// The pattern the scanner replaced, kept as the behavioral reference.
const referenceThinkChars = (text: string): number => {
  let chars = 0;
  for (const match of text.matchAll(/<think>([\s\S]*?)<\/think>/gi)) {
    chars += match[1].length;
  }
  return chars;
};

test("think scan matches the reference pattern on tag edge cases", () => {
  const cases = [
    "<think>abc</think>",
    "before<think>abc</think>after",
    "<THINK>abc</Think>",
    "<think></think>",
    "<think></think><think>ab</think>",
    "<think>a</think>mid<think>bc</think>tail",
    "<think><think>nested</think>rest</think>",
    "</think><think>abc</think>",
    "<think>unclosed",
    "<think>a</think><think>unclosed",
    "<think>line one\nline two</think>",
    "<think>İ unicode \u{1F600}</think>",
    "İİ<THINK>x</THINK>",
    "<thin>k</think>",
    "plain answer",
  ];
  for (const content of cases) {
    const expected = referenceThinkChars(content);
    const observed = getObservedReasoning({ content });
    assert.equal(observed.chars, expected, content);
    assert.equal(observed.source, expected > 0 ? "think" : null, content);
  }
});

test("think scan stays linear on repeated unclosed tags in string and block content", () => {
  // Quadratic on this input: about 17 s at 400 KB. Linear: a few milliseconds.
  const hostile = "<think>".repeat(60_000);
  for (const message of [{ content: hostile }, { content: [{ type: "text", text: hostile }] }]) {
    const startedAt = performance.now();
    const observed = getObservedReasoning(message);
    const elapsedMs = performance.now() - startedAt;
    assert.equal(observed.chars, 0);
    assert.ok(elapsedMs < 2_000, `scan took ${Math.round(elapsedMs)} ms`);
  }
});
