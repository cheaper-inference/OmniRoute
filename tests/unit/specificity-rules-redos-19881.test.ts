/**
 * Regression test for #19881 — Three specificity rules take quadratic time
 * on a long line and stall the server.
 *
 * Root cause: Unconstrained `.*` wildcards in the detection regexes
 * (`/import\s+.*from/gi`, `/SELECT\s+.*FROM/gi`, `/\$\{.*\}/g` and the `if … then`
 * reasoning pattern) retried their wildcard from every opening token on a line that lacked the
 * closing one, and an unbounded `\s+` before the wildcard backtracked across long whitespace
 * runs, stalling the Node event loop during Auto-Combo complexity scoring.
 *
 * Fix: the three code spans are counted by a linear scan that keeps the old greedy semantics
 * (no length cap, so long valid spans still score); the `if … then` pattern no longer lets its
 * whitespace runs overlap the bounded wildcard.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { performance } from "node:perf_hooks";

import {
  detectCodeComplexity,
  detectReasoningDepth,
} from "../../open-sse/services/specificityRules.ts";

// Wall-clock budget per scoring call. The pre-fix regexes take tens of seconds on these inputs
// (quadratic), so a 2 s budget still separates the two while not flaking on a loaded CI runner.
const BUDGET_MS = 2_000;

test("detectCodeComplexity processes 100k+ char line of 'import ' within the budget (no quadratic ReDoS)", () => {
  const content = "import ".repeat(20_000); // 140,000 characters on one line without "from"
  const start = performance.now();
  const score = detectCodeComplexity({ messages: [{ role: "user", content }] });
  const elapsedMs = performance.now() - start;

  assert.equal(typeof score, "number");
  assert.ok(
    elapsedMs < BUDGET_MS,
    `Scoring 140k chars took ${Math.round(elapsedMs)} ms, expected < ${BUDGET_MS} ms`
  );
});

test("detectCodeComplexity processes 100k+ char line of 'SELECT ' within the budget (no quadratic ReDoS)", () => {
  const content = "SELECT ".repeat(20_000); // 140,000 characters on one line without "FROM"
  const start = performance.now();
  const score = detectCodeComplexity({ messages: [{ role: "user", content }] });
  const elapsedMs = performance.now() - start;

  assert.equal(typeof score, "number");
  assert.ok(
    elapsedMs < BUDGET_MS,
    `Scoring 140k chars took ${Math.round(elapsedMs)} ms, expected < ${BUDGET_MS} ms`
  );
});

test("detectCodeComplexity processes 50k+ char line of '${' within the budget (no quadratic ReDoS)", () => {
  const content = "${".repeat(25_000); // 50,000 characters on one line without "}"
  const start = performance.now();
  const score = detectCodeComplexity({ messages: [{ role: "user", content }] });
  const elapsedMs = performance.now() - start;

  assert.equal(typeof score, "number");
  assert.ok(
    elapsedMs < BUDGET_MS,
    `Scoring 50k chars took ${Math.round(elapsedMs)} ms, expected < ${BUDGET_MS} ms`
  );
});

test("detectReasoningDepth processes 60k+ char line of 'if ' within the budget (no quadratic ReDoS)", () => {
  const content = "if ".repeat(20_000); // 60,000 characters on one line without "then"
  const start = performance.now();
  const score = detectReasoningDepth({ messages: [{ role: "user", content }] });
  const elapsedMs = performance.now() - start;

  assert.equal(typeof score, "number");
  assert.ok(
    elapsedMs < BUDGET_MS,
    `Scoring 60k chars took ${Math.round(elapsedMs)} ms, expected < ${BUDGET_MS} ms`
  );
});

function timed(label: string, run: () => number) {
  const start = performance.now();
  const score = run();
  const elapsedMs = performance.now() - start;
  assert.equal(typeof score, "number");
  assert.ok(
    elapsedMs < BUDGET_MS,
    `${label} took ${Math.round(elapsedMs)} ms, expected < ${BUDGET_MS} ms`
  );
}

test("an opening token followed by a long whitespace run scores within the budget", () => {
  const spaces = " ".repeat(140_000);
  for (const open of ["SELECT", "import"]) {
    timed(`${open} + 140k spaces`, () =>
      detectCodeComplexity({ messages: [{ role: "user", content: open + spaces }] })
    );
  }
  timed("if + 140k spaces", () =>
    detectReasoningDepth({ messages: [{ role: "user", content: "if" + spaces }] })
  );
  timed("if … then + 140k spaces", () =>
    detectReasoningDepth({ messages: [{ role: "user", content: "if x then" + spaces }] })
  );
});

function codeScore(content: string): number {
  return detectCodeComplexity({ messages: [{ role: "user", content }] });
}

// Each input carries exactly one language indicator (2 points) and no inline code, so another
// indicator cannot mask a span that stopped matching.
test("each span indicator scores on its own, at any length", () => {
  assert.equal(codeScore('import { a, b } from "module";'), 2);
  assert.equal(codeScore("SELECT col1, col2 FROM my_table;"), 2);
  assert.equal(codeScore("greeting = Hello ${user.name}"), 2);

  assert.equal(codeScore(`import { ${"name, ".repeat(60)}last } from "module";`), 2);
  assert.equal(codeScore(`SELECT ${"column_name, ".repeat(60)}last FROM my_table;`), 2);
  assert.equal(codeScore(`value = \${${"x".repeat(300)}}`), 2);
});

test("span indicators keep the old greedy, one-per-line counting", () => {
  // Two spans on one line were one greedy match, and spans never cross a line break.
  assert.equal(codeScore('import a from "a"; import b from "b";'), 2);
  assert.equal(codeScore('import a from "a";\nimport b from "b";'), 4);
  assert.equal(codeScore("SELECT a\nFROM t"), 0);
  assert.equal(codeScore("${a\n}"), 0);
  // The whitespace after the opening keyword may span lines, as `\s+` did.
  assert.equal(codeScore("SELECT\n  a FROM t"), 2);
  assert.equal(codeScore("import\n  x from y"), 2);
  // An opening token without its closing one on the line does not score.
  assert.equal(codeScore("import ".repeat(50)), 0);
  assert.equal(codeScore("select * where x = 1"), 0);
});

test("detectReasoningDepth still counts an if … then condition", () => {
  const score = (content: string) =>
    detectReasoningDepth({ messages: [{ role: "user", content }] });
  // 1 message → depth bonus 1; one reasoning indicator → 2 points.
  assert.equal(score("if the cache is cold then refill it"), 3);
  assert.equal(score("if the cache is cold"), 1);
});
