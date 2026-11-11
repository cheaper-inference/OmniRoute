/**
 * Regression test for #19881 — Three specificity rules take quadratic time
 * on a long line and stall the server.
 *
 * Root cause: Unconstrained `.*` wildcards in code detection regexes:
 * - `/import\s+.*from/gi`
 * - `/SELECT\s+.*FROM/gi`
 * - `/\$\{.*\}/g`
 * caused catastrophic backtracking / quadratic O(N^2) time on long lines
 * missing the closing token, stalling the Node event loop during Auto-Combo
 * complexity scoring.
 *
 * Fix: Bounded repeats:
 * - `/import\s+.{0,200}?from/gi`
 * - `/SELECT\s+.{0,500}?FROM/gi`
 * - `/\$\{.{0,200}?\}/g`
 */
import test from "node:test";
import assert from "node:assert/strict";
import { performance } from "node:perf_hooks";

import {
  detectCodeComplexity,
  detectReasoningDepth,
} from "../../open-sse/services/specificityRules.ts";

test("detectCodeComplexity processes 100k+ char line of 'import ' in < 250ms (no quadratic ReDoS)", () => {
  const content = "import ".repeat(20_000); // 140,000 characters on one line without "from"
  const start = performance.now();
  const score = detectCodeComplexity({ messages: [{ role: "user", content }] });
  const elapsedMs = performance.now() - start;

  assert.equal(typeof score, "number");
  assert.ok(
    elapsedMs < 250,
    `Scoring 140k chars took ${Math.round(elapsedMs)} ms, expected < 250 ms`
  );
});

test("detectCodeComplexity processes 100k+ char line of 'SELECT ' in < 250ms (no quadratic ReDoS)", () => {
  const content = "SELECT ".repeat(20_000); // 140,000 characters on one line without "FROM"
  const start = performance.now();
  const score = detectCodeComplexity({ messages: [{ role: "user", content }] });
  const elapsedMs = performance.now() - start;

  assert.equal(typeof score, "number");
  assert.ok(
    elapsedMs < 250,
    `Scoring 140k chars took ${Math.round(elapsedMs)} ms, expected < 250 ms`
  );
});

test("detectCodeComplexity processes 50k+ char line of '${' in < 250ms (no quadratic ReDoS)", () => {
  const content = "${".repeat(25_000); // 50,000 characters on one line without "}"
  const start = performance.now();
  const score = detectCodeComplexity({ messages: [{ role: "user", content }] });
  const elapsedMs = performance.now() - start;

  assert.equal(typeof score, "number");
  assert.ok(
    elapsedMs < 250,
    `Scoring 50k chars took ${Math.round(elapsedMs)} ms, expected < 250 ms`
  );
});

test("detectReasoningDepth processes 60k+ char line of 'if ' in < 250ms (no quadratic ReDoS)", () => {
  const content = "if ".repeat(20_000); // 60,000 characters on one line without "then"
  const start = performance.now();
  const score = detectReasoningDepth({ messages: [{ role: "user", content }] });
  const elapsedMs = performance.now() - start;

  assert.equal(typeof score, "number");
  assert.ok(
    elapsedMs < 250,
    `Scoring 60k chars took ${Math.round(elapsedMs)} ms, expected < 250 ms`
  );
});

test("detectCodeComplexity accurately matches legitimate import, SQL, and template expressions", () => {
  const content = `
    import { a, b } from "module";
    SELECT col1, col2 FROM my_table;
    const greeting = \`Hello \${user.name}\`;
  `;
  const score = detectCodeComplexity({ messages: [{ role: "user", content }] });
  assert.ok(score > 0, `Expected positive score for legitimate code indicators, got ${score}`);
});
