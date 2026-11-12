import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import ts from "typescript";
import { writeReleaseGreenEslintFixture } from "../../_helpers/writeReleaseGreenEslintFixture.mjs";
import { readEslintMeasurement } from "../../../scripts/quality/eslint-measurement.mjs";
import {
  computeVerdict,
  evaluateEslintRun,
} from "../../../scripts/quality/validate-release-green.mjs";

// Take the current observer command, not a second hand-written argument fixture.
// A new dynamic command shape requires an explicit fixture-contract review.
function currentObserverArguments(report) {
  const source = ts.createSourceFile(
    "validate-release-green.mjs",
    readFileSync(
      new URL("../../../scripts/quality/validate-release-green.mjs", import.meta.url),
      "utf8"
    ),
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.JS
  );
  assert.equal(source.parseDiagnostics.length, 0);
  const commands = [];
  function visit(node) {
    if (
      ts.isCallExpression(node) &&
      ts.isIdentifier(node.expression) &&
      node.expression.text === "run" &&
      node.arguments.length >= 2 &&
      ts.isPropertyAccessExpression(node.arguments[0]) &&
      node.arguments[0].getText(source) === "process.execPath"
    ) {
      assert.ok(ts.isArrayLiteralExpression(node.arguments[1]));
      assert.equal(
        node.arguments[1].elements[0].getText(source),
        'join(ROOT, "node_modules", "eslint", "bin", "eslint.js")'
      );
      commands.push(
        node.arguments[1].elements.slice(1).map((entry) => {
          if (ts.isStringLiteral(entry)) return entry.text;
          assert.ok(ts.isIdentifier(entry) && entry.text === "lintReportPath");
          return report;
        })
      );
    }
    ts.forEachChild(node, visit);
  }
  visit(source);
  assert.equal(commands.length, 1);
  return commands[0];
}

function fixture(t, options = {}) {
  const directory = mkdtempSync(join(tmpdir(), "observer-eslint-command-"));
  t.after(() => rmSync(directory, { recursive: true, force: true }));
  writeFileSync(join(directory, "package.json"), '{"type":"commonjs"}');
  const bin = join(directory, "bin");
  mkdirSync(bin);
  const command = writeReleaseGreenEslintFixture(bin, options);
  const report = join(directory, "current.json");
  writeFileSync(report, "", { flag: "wx", mode: 0o600 });
  const execute = (args = currentObserverArguments(report)) => {
    const result = spawnSync(process.execPath, [command, ...args], {
      cwd: directory,
      encoding: "utf8",
      timeout: 10000,
      maxBuffer: 65536,
      env: { NODE_ENV: "test" },
    });
    assert.equal(result.error, undefined);
    assert.equal(result.signal, null);
    return result;
  };
  return { report, execute };
}

test("the shared fixture satisfies the current observer report channel despite console noise", (t) => {
  const { report, execute } = fixture(t, { diagnosticText: "[synthetic] console diagnostics" });
  const result = execute();
  assert.equal(result.status, 0);
  const measurement = readEslintMeasurement(report);
  assert.deepEqual(measurement, [{ filePath: "fixture.ts", errorCount: 0, warningCount: 0 }]);
  assert.equal(
    computeVerdict(evaluateEslintRun({ code: result.status, out: result.stdout, measurement }, 0))
      .releaseGreen,
    true
  );
});

test("a missing output-file contract fails instead of silently returning stdout JSON", (t) => {
  const { report, execute } = fixture(t);
  const result = execute([".", "--format", "json"]);
  assert.equal(result.status, 33);
  assert.equal(readFileSync(report, "utf8"), "");
  assert.throws(() => readEslintMeasurement(report), /incomplete or invalid/);
});

test("valid-looking diagnostics cannot replace an empty report", (t) => {
  const { report, execute } = fixture(t, {
    measurementText: "",
    diagnosticText: '[{"filePath":"fixture.ts","errorCount":0,"warningCount":0}]',
  });
  const result = execute();
  assert.equal(result.status, 0);
  assert.throws(() => readEslintMeasurement(report), /incomplete or invalid/);
  const checks = evaluateEslintRun(
    { code: result.status, out: result.stdout, measurement: null },
    0
  );
  assert.equal(checks[0].id, "lint");
  assert.equal(computeVerdict(checks).releaseGreen, false);
});

test("a fixture process failure remains blocking with a complete report", (t) => {
  const { report, execute } = fixture(t, { exitCode: 2 });
  const result = execute();
  assert.equal(result.status, 2);
  const measurement = readEslintMeasurement(report);
  assert.equal(
    computeVerdict(evaluateEslintRun({ code: result.status, out: result.stdout, measurement }, 0))
      .releaseGreen,
    false
  );
});
