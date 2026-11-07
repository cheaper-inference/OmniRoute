import { test, after } from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import {
  classifyKnipFailure,
  parseKnipMetrics,
  parseKnipReport as parseKnipReportRaw,
} from "../../scripts/check/check-dead-code.mjs";

// knip 6.44 loads the fumadocs-mdx config, and that plugin logs to stdout before the JSON
// reporter runs. The gate parsed all of stdout as JSON, so every run ended in exit 2 with
// "Unexpected token 'M', "[MDX] gener"... is not valid JSON" (CI job 126504497028, #18943).
// The line below is the real first line of `knip --reporter json` on that version.

const PREAMBLE = "[MDX] generated files in 85.3992930000004ms";
const REPORT = JSON.stringify({
  issues: [{ file: "src/a.ts", files: [], exports: [{ name: "dead" }], types: [] }],
});

const parseKnipReport = parseKnipReportRaw as (stdout: unknown) => { issues?: unknown[] } | null;
const classify = classifyKnipFailure as (
  execError: { code?: string; message?: string; status?: number } | null,
  stdout: string
) => { kind: string; exitCode: number };

test("a report with no preamble still parses", () => {
  assert.deepEqual(parseKnipReport(`${REPORT}\n`), JSON.parse(REPORT));
});

test("a log preamble before the report does not hide the dead symbols", () => {
  const report = parseKnipReport(`${PREAMBLE}\n${REPORT}\n`);
  assert.equal(parseKnipMetrics(report).deadTotal, 1);
});

test("a log line after the report does not hide the dead symbols", () => {
  const report = parseKnipReport(`${PREAMBLE}\n${REPORT}\ndone\n`);
  assert.equal(parseKnipMetrics(report).deadTotal, 1);
});

test("a stray log line alone is not a report", () => {
  assert.equal(parseKnipReport(`${PREAMBLE}\n`), null);
  assert.equal(parseKnipReport(""), null);
  assert.equal(parseKnipReport(undefined), null);
});

test("a JSON log line without an issues array cannot pass as zero dead code", () => {
  // parseKnipMetrics reads anything without `issues` as zero, so this line would turn a
  // broken run into a clean bill of health.
  assert.equal(parseKnipReport(`${PREAMBLE}\n{"level":"info","msg":"ready"}\n`), null);
  assert.equal(parseKnipReport(`${PREAMBLE}\n{"issues":"none"}\n`), null);
});

test("a non-zero knip exit with a preamble and a report is a measurement", () => {
  const r = classify({ status: 1, message: "knip exited 1" }, `${PREAMBLE}\n${REPORT}\n`);
  assert.equal(r.kind, "ok");
  assert.equal(r.exitCode, 0);
});

test("a non-zero knip exit with only a preamble stays unparseable", () => {
  const r = classify({ status: 2, message: "knip crashed" }, `${PREAMBLE}\n`);
  assert.equal(r.kind, "unparseable");
  assert.equal(r.exitCode, 2);
});

// The gate end to end, against a stub knip on the same relative path the script resolves.

const script = path.resolve("scripts/check/check-dead-code.mjs");
const sandboxes: string[] = [];

after(() => {
  for (const dir of sandboxes) fs.rmSync(dir, { recursive: true, force: true });
});

function runGate(knipStdout: string) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "dead-code-gate-"));
  sandboxes.push(dir);
  fs.mkdirSync(path.join(dir, "node_modules/.bin"), { recursive: true });
  fs.mkdirSync(path.join(dir, "config/quality"), { recursive: true });
  fs.writeFileSync(path.join(dir, "knip-stdout.txt"), knipStdout);
  fs.writeFileSync(path.join(dir, "node_modules/.bin/knip"), "#!/bin/sh\ncat knip-stdout.txt\n", {
    mode: 0o755,
  });
  fs.writeFileSync(
    path.join(dir, "config/quality/quality-baseline.json"),
    JSON.stringify({ metrics: { deadExports: { value: 5 } } })
  );
  return spawnSync(process.execPath, [script, "--quiet"], { cwd: dir, encoding: "utf8" });
}

const posixOnly = { skip: process.platform === "win32" };

test("the gate measures a report that follows a preamble", posixOnly, () => {
  const r = runGate(`${PREAMBLE}\n${REPORT}\n`);
  assert.equal(r.status, 0, r.stderr);
  assert.match(r.stdout, /DEAD_TOTAL=1\b/);
});

test("the gate exits 2 when stdout holds only a preamble", posixOnly, () => {
  const r = runGate(`${PREAMBLE}\n`);
  assert.equal(r.status, 2);
  assert.doesNotMatch(r.stdout, /DEAD_TOTAL/);
});

test("the gate exits 2 on a JSON log line instead of reporting zero", posixOnly, () => {
  const r = runGate(`${PREAMBLE}\n{"level":"info"}\n`);
  assert.equal(r.status, 2);
  assert.doesNotMatch(r.stdout, /DEAD_TOTAL/);
});
