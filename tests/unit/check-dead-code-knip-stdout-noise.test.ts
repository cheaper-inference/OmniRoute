import { test } from "node:test";
import assert from "node:assert";
import { classifyKnipFailure, parseKnipStdout } from "../../scripts/check/check-dead-code.mjs";

// knip >= 6.44 loads `next.config.mjs` to read Turbopack loaders. Our config calls
// `createMDX()` from fumadocs-mdx, which prints "[MDX] generated files in …ms" to
// stdout before knip's JSON report. The gate used to JSON.parse the whole stdout and
// died with exit 2 ("Unexpected token 'M'") on every run. The report itself is intact,
// so the gate must read it past the leading log lines.

const REPORT = { issues: [{ file: "src/a.ts", exports: [{ name: "x" }], types: [] }] };
const NOISY = `[MDX] generated files in 205.02ms\n${JSON.stringify(REPORT)}\n`;

test("parseKnipStdout reads a clean JSON report", () => {
  assert.deepStrictEqual(parseKnipStdout(JSON.stringify(REPORT)), REPORT);
});

test("parseKnipStdout skips log lines printed before the JSON report", () => {
  assert.deepStrictEqual(parseKnipStdout(NOISY), REPORT);
});

test("parseKnipStdout still rejects output that holds no JSON report", () => {
  assert.throws(() => parseKnipStdout("[MDX] generated files in 1ms\nnot json\n"), SyntaxError);
  assert.throws(() => parseKnipStdout(""), SyntaxError);
});

test("classifyKnipFailure counts a non-zero exit with a noisy JSON report as a measurement", () => {
  const err = Object.assign(new Error("Command failed"), { status: 1 });
  const out = classifyKnipFailure(err, NOISY);
  assert.strictEqual(out.kind, "ok");
  assert.strictEqual(out.exitCode, 0);
});
