// Unit tests for scripts/check/check-test-tla-order.mjs (#18045).
import assert from "node:assert/strict";
import test from "node:test";

import { evaluate, findTlaAfterTest } from "../../scripts/check/check-test-tla-order.mjs";

test("flags test -> top-level await -> test and reports the three lines", () => {
  const src = [
    'test("a", () => {});',
    'const mod = await import("./x.ts");',
    'test("b", () => {});',
  ].join("\n");
  assert.deepEqual(findTlaAfterTest(src), { firstTestLine: 1, awaitLine: 2, laterTestLine: 3 });
});

test("accepts top-level awaits that all come before the first test", () => {
  const src = [
    "const { a } =",
    '  await import("./a.ts");',
    'describe("d", () => { it("x", async () => { await a(); }); });',
    'test("b", () => {});',
  ].join("\n");
  assert.equal(findTlaAfterTest(src), null);
});

test("ignores awaits inside function bodies and inside strings", () => {
  const src = [
    'test("a", () => {});',
    "async function helper() { await Promise.resolve(); }",
    "const run = async () => { await helper(); };",
    "const CHILD = `await import('./child.ts')`;",
    'test("b", () => {});',
  ].join("\n");
  assert.equal(findTlaAfterTest(src), null);
});

test("hooks are not test registrations", () => {
  const src = [
    'test("a", () => {});',
    "await Promise.resolve();",
    "test.beforeEach(() => {});",
    "after(() => {});",
  ].join("\n");
  assert.equal(findTlaAfterTest(src), null);
});

test("counts only/skip/todo modifiers and describe/suite/it", () => {
  for (const later of ['test.only("b", () => {});', 'it.skip("b");', 'suite("s", () => {});']) {
    const src = ['describe("a", () => {});', "await Promise.resolve();", later].join("\n");
    assert.notEqual(findTlaAfterTest(src), null, later);
  }
});

test("flags consecutive `await test(...)` calls", () => {
  const src = ['await test("a", async () => {});', 'await test("b", async () => {});'].join("\n");
  assert.deepEqual(findTlaAfterTest(src), { firstTestLine: 1, awaitLine: 1, laterTestLine: 2 });
});

test("a single trailing `await test(...)` is fine", () => {
  assert.equal(findTlaAfterTest('test("a", () => {});\nawait test("b", async () => {});'), null);
});

test("flags a loop whose body registers tests and awaits", () => {
  const src = [
    "for (const lane of lanes) {",
    "  const mod = await load(lane);",
    "  test(lane, () => mod.check());",
    "}",
  ].join("\n");
  assert.notEqual(findTlaAfterTest(src), null);
  assert.equal(findTlaAfterTest("for (const l of lanes) test(l, () => {});"), null);
});

test("parses .tsx and .mjs sources", () => {
  const tsx = 'test("a", () => <div />);\nawait Promise.resolve();\ntest("b", () => {});';
  assert.notEqual(findTlaAfterTest(tsx, "x.test.tsx"), null);
  const mjs = 'test("a", () => {});\nawait 0;\ntest("b", () => {});';
  assert.notEqual(findTlaAfterTest(mjs, "x.test.mjs"), null);
});

test("allowlist is delete-only: new offenders and fixed entries both fail", () => {
  const offenders = new Map([
    ["tests/unit/old.test.ts", {}],
    ["tests/unit/new.test.ts", {}],
  ]);
  const result = evaluate(offenders, ["tests/unit/old.test.ts", "tests/unit/fixed.test.ts"]);
  assert.deepEqual(result.newOffenders, ["tests/unit/new.test.ts"]);
  assert.deepEqual(result.staleEntries, ["tests/unit/fixed.test.ts"]);
  assert.deepEqual(evaluate(new Map([["a", {}]]), ["a", "a"]).duplicates, ["a"]);
});
