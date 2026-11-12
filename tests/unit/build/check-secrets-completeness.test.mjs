import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const script = fileURLToPath(new URL("../../../scripts/check/check-secrets.mjs", import.meta.url));
const finding = { RuleID: "fixture-rule", File: "src/fixture.ts", Secret: "REDACTED" };

function runGate(t, options = {}) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "qg-secret-completeness-"));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  const tools = path.join(root, "tools");
  fs.mkdirSync(tools);
  if (options.source !== false) fs.mkdirSync(path.join(root, "src"));
  if (options.baseline !== "missing") {
    fs.mkdirSync(path.join(root, "config/quality"), { recursive: true });
    fs.writeFileSync(
      path.join(root, "config/quality/quality-baseline.json"),
      JSON.stringify({ metrics: { secretFindings: { value: options.baseline ?? 0 } } })
    );
  }
  if (options.tool !== false) {
    fs.writeFileSync(
      path.join(tools, "gitleaks"),
      `#!${process.execPath}\n` +
        `if (process.argv[2] === "version") process.exit(0);\n` +
        `process.stdout.write(${JSON.stringify(options.report ?? "[]")});\n` +
        `process.stderr.write(${JSON.stringify(options.stderr ?? "")});\n` +
        `process.exit(${options.status ?? 0});\n`,
      { mode: 0o755 }
    );
  }
  const result = spawnSync(process.execPath, [script, ...(options.args ?? ["--ratchet"])], {
    cwd: root,
    env: { ...process.env, PATH: tools },
    encoding: "utf8",
    timeout: 10000,
  });
  assert.equal(result.error, undefined);
  return result;
}

for (const [name, options] of [
  ["missing scanner", { tool: false }],
  ["missing baseline", { baseline: "missing" }],
  ["negative baseline", { baseline: -1 }],
  ["fractional baseline", { baseline: 0.5 }],
  ["no source directories", { source: false }],
  ["empty report", { report: "" }],
  ["object report", { report: "{}" }],
  ["primitive report", { report: "42" }],
  ["invalid finding entry", { report: "[null]" }],
  ["missing finding fields", { report: "[{}]" }],
  ["unexpected scanner exit with valid stdout", { status: 2, report: "[]" }],
  ["findings exit without findings", { status: 1, report: "[]" }],
]) {
  test(`required secret scan rejects ${name}`, (t) => {
    const result = runGate(t, options);
    assert.equal(result.status, 2);
    assert.match(result.stdout, /secretFindings=INCOMPLETE reason=/);
    assert.doesNotMatch(result.stdout, /secretFindings=0(?:\s|$)/);
  });
}

test("malformed scanner output is incomplete without leaking its contents", (t) => {
  const result = runGate(t, {
    report: "FIXTURE_SENSITIVE_MARKER",
    stderr: "FIXTURE_STDERR_MARKER",
  });
  assert.equal(result.status, 2);
  assert.match(result.stdout, /secretFindings=INCOMPLETE/);
  assert.doesNotMatch(result.stdout + result.stderr, /FIXTURE_(?:SENSITIVE|STDERR)_MARKER/);
});

for (const report of ["[]", "null"]) {
  test(`valid clean report ${report} is a measured zero`, (t) => {
    const result = runGate(t, { report });
    assert.equal(result.status, 0);
    assert.match(result.stdout, /secretFindings=0/);
  });
}

test("findings within the frozen baseline pass", (t) => {
  const result = runGate(t, { status: 1, report: JSON.stringify([finding]), baseline: 1 });
  assert.equal(result.status, 0);
  assert.match(result.stdout, /secretFindings=1/);
});

test("new findings fail the ratchet", (t) => {
  const result = runGate(t, { status: 1, report: JSON.stringify([finding]) });
  assert.equal(result.status, 1);
  assert.match(result.stdout, /secretFindings=1/);
});

test("JSON output cannot bypass an explicitly required ratchet", (t) => {
  const result = runGate(t, {
    status: 1,
    report: JSON.stringify([finding]),
    args: ["--json", "--ratchet"],
  });
  assert.equal(result.status, 1);
  assert.deepEqual(JSON.parse(result.stdout), [finding]);
});

test("an optional scan still reports missing tools as SKIP", (t) => {
  const result = runGate(t, { tool: false, args: [] });
  assert.equal(result.status, 0);
  assert.match(result.stdout, /secretFindings=SKIP reason=binary-absent/);
});
