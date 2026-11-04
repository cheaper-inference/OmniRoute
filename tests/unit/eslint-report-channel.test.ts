import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtempSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { readEslintMeasurement } from "../../scripts/quality/eslint-measurement.mjs";
import {
  computeVerdict,
  evaluateEslintRun,
} from "../../scripts/quality/validate-release-green.mjs";

const measurement = [{ filePath: "src/example.ts", errorCount: 0, warningCount: 2 }];

test("the dedicated file retains the full lint measurement", (t) => {
  const directory = mkdtempSync(join(tmpdir(), "eslint-measurement-"));
  t.after(() => rmSync(directory, { recursive: true, force: true }));
  const file = join(directory, "current.json");
  writeFileSync(file, JSON.stringify(measurement));
  assert.deepEqual(readEslintMeasurement(file), measurement);
});

test("missing, empty, truncated and invalid reports stay blocking", (t) => {
  const directory = mkdtempSync(join(tmpdir(), "eslint-measurement-invalid-"));
  t.after(() => rmSync(directory, { recursive: true, force: true }));
  const file = join(directory, "current.json");
  assert.throws(() => readEslintMeasurement(file), /incomplete or invalid/);
  for (const source of ["", "[", "[]", "{}", '[{"filePath":"src/x.ts"}]']) {
    writeFileSync(file, source);
    assert.throws(() => readEslintMeasurement(file), /incomplete or invalid/);
  }
});

test("a report must be a regular file rather than a directory or symbolic link", (t) => {
  const directory = mkdtempSync(join(tmpdir(), "eslint-measurement-type-"));
  t.after(() => rmSync(directory, { recursive: true, force: true }));
  const file = join(directory, "current.json");
  writeFileSync(file, JSON.stringify(measurement));
  const link = join(directory, "linked.json");
  symlinkSync(file, link);
  assert.throws(() => readEslintMeasurement(directory), /incomplete or invalid/);
  assert.throws(() => readEslintMeasurement(link), /incomplete or invalid/);
});

test("the real ESLint CLI writes a usable report independently of console diagnostics", (t) => {
  const directory = mkdtempSync(join(tmpdir(), "eslint-measurement-cli-"));
  t.after(() => rmSync(directory, { recursive: true, force: true }));
  const input = join(directory, "example.js");
  const report = join(directory, "current.json");
  writeFileSync(input, "const unused = 1;\n");
  writeFileSync(report, "", { flag: "wx", mode: 0o600 });
  const cli = fileURLToPath(new URL("../../node_modules/eslint/bin/eslint.js", import.meta.url));
  const result = spawnSync(
    process.execPath,
    [
      cli,
      "--no-config-lookup",
      "--rule",
      "no-unused-vars:warn",
      "--format",
      "json",
      "--output-file",
      report,
      input,
    ],
    { cwd: directory, encoding: "utf8", timeout: 30000, maxBuffer: 65536 }
  );
  assert.equal(result.error, undefined);
  assert.equal(result.signal, null);
  assert.equal(result.status, 0);
  const measured = readEslintMeasurement(report);
  assert.equal(measured.length, 1);
  assert.equal(measured[0].errorCount, 0);
  assert.equal(measured[0].warningCount, 1);
  const checks = evaluateEslintRun(
    {
      code: result.status,
      out: "[dependency-diagnostic] refresh recommended\n",
      measurement: measured,
    },
    1
  );
  assert.equal(computeVerdict(checks).releaseGreen, true);
});

test("a complete ESLint measurement is independent of bracketed process diagnostics", () => {
  const diagnostics = "[dependency-diagnostic] refresh recommended\n";
  const results = evaluateEslintRun({ code: 0, out: diagnostics, measurement }, 2);

  assert.equal(computeVerdict(results).releaseGreen, true);
  assert.equal(results.find((result) => result.id === "lint-errors")?.detail, "0 error(s)");
  assert.equal(results.find((result) => result.id === "eslint-warnings")?.ok, true);
});

test("an explicitly invalid report cannot fall back to valid-looking process output", () => {
  for (const invalid of [null, [], {}, [{ filePath: "src/example.ts", warningCount: 0 }]]) {
    const results = evaluateEslintRun(
      { code: 0, out: JSON.stringify(measurement), measurement: invalid },
      2
    );
    assert.equal(computeVerdict(results).releaseGreen, false);
    assert.equal(results[0].id, "lint");
  }
});

test("a valid separate report does not hide a process failure or warning regression", () => {
  for (const code of [1, 42, 124]) {
    const results = evaluateEslintRun({ code, out: "process failed", measurement }, 2);
    assert.equal(computeVerdict(results).releaseGreen, false);
  }
  const results = evaluateEslintRun({ code: 0, out: "", measurement }, 1);
  assert.equal(results.find((result) => result.id === "eslint-warnings")?.ok, false);
});
