import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { load as parseYaml } from "js-yaml";

const root = fileURLToPath(new URL("../../../", import.meta.url));
const report = [{ filePath: "/repo/source.ts", errorCount: 0, warningCount: 2 }];

function fixture(run) {
  mkdirSync(join(root, "_artifacts"), { recursive: true });
  const dir = mkdtempSync(join(root, "_artifacts/eslint-measurement space ; $-"));
  try {
    for (const path of [
      "config/quality",
      "scripts/quality",
      "bin",
      ".artifacts",
      "node_modules/.bin",
      "node_modules/eslint/bin",
    ])
      mkdirSync(join(dir, path), { recursive: true });
    for (const name of [
      "collect-metrics.mjs",
      "validate-release-green.mjs",
      "gate-process.mjs",
      "release-green-static-profile.mjs",
      "eslint-measurement.mjs",
    ]) {
      const source = join(root, "scripts/quality", name);
      if (existsSync(source)) copyFileSync(source, join(dir, "scripts/quality", name));
    }
    const lookup = join(root, "scripts/i18n/message-lookup.mjs");
    if (existsSync(lookup)) {
      mkdirSync(join(dir, "scripts/i18n"), { recursive: true });
      copyFileSync(lookup, join(dir, "scripts/i18n/message-lookup.mjs"));
    }
    writeFileSync(join(dir, "package.json"), JSON.stringify({ type: "commonjs" }));
    const executable = (name, body) =>
      writeFileSync(join(dir, name), `#!${process.execPath}\n${body}`, { mode: 0o755 });
    const execute = (script, args = [], extraEnv = {}) =>
      spawnSync(process.execPath, [join(dir, "scripts/quality", script), ...args], {
        cwd: dir,
        encoding: "utf8",
        timeout: 30000,
        env: { ...process.env, ESLINT_RESULTS_JSON: "", ...extraEnv },
      });
    return run({ dir, executable, execute });
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

test("an explicitly missing lint receipt cannot fall back to a new scan", () =>
  fixture(({ dir, executable, execute }) => {
    executable(
      "node_modules/.bin/eslint",
      `console.log(${JSON.stringify(JSON.stringify(report))});`
    );
    const result = execute("collect-metrics.mjs", [], {
      ESLINT_RESULTS_JSON: join(dir, "missing.json"),
    });
    assert.notEqual(result.status, 0, result.stdout + result.stderr);
    assert.equal(existsSync(join(dir, "config/quality/quality-metrics.json")), false);
  }));

test("an absent ESLint binary cannot be reported as zero warnings and errors", () =>
  fixture(({ dir, execute }) => {
    const result = execute("collect-metrics.mjs");
    assert.notEqual(result.status, 0, result.stdout + result.stderr);
    assert.equal(existsSync(join(dir, "config/quality/quality-metrics.json")), false);
  }));

test("standalone collection ignores an unselected old report and uses the lint suppression policy", () =>
  fixture(({ dir, executable, execute }) => {
    writeFileSync(
      join(dir, ".artifacts/eslint-results.json"),
      JSON.stringify([{ ...report[0], warningCount: 999 }])
    );
    writeFileSync(join(dir, "config/quality/eslint-suppressions.json"), "{}");
    executable(
      "node_modules/.bin/eslint",
      `
      if(!process.argv.includes("--pass-on-unpruned-suppressions")) process.exit(2);
      console.log(${JSON.stringify(JSON.stringify(report))});
    `
    );
    const result = execute("collect-metrics.mjs");
    assert.equal(result.status, 0, result.stdout + result.stderr);
    const metrics = JSON.parse(readFileSync(join(dir, "config/quality/quality-metrics.json")));
    assert.equal(metrics.eslintWarnings, 2);
  }));

test("CI explicitly selects the same-run lint artifact and cannot ignore its failed download", () => {
  const workflow = parseYaml(readFileSync(join(root, ".github/workflows/ci.yml"), "utf8"));
  const steps = workflow.jobs["quality-gate"].steps;
  const collect = steps.find((step) => step.run === "npm run quality:collect");
  const download = steps.find((step) => step.name === "Download ESLint results");
  assert.equal(collect.env?.ESLINT_RESULTS_JSON, ".artifacts/eslint-results.json");
  assert.notEqual(download["continue-on-error"], true);
});

// quality-gate still runs when the lint job failed (its `if:` accepts needs.lint.result ==
// 'failure'), and its ESLint download is strict. So the lint job must produce the artifact even
// when a step before the JSON report failed (check:node-runtime, audit:deps): otherwise the
// download fails and the complexity / duplication / dead-code ratchets never run.
test("the lint job produces the ESLint artifact even after an earlier lint step failed", () => {
  const workflow = parseYaml(readFileSync(join(root, ".github/workflows/ci.yml"), "utf8"));
  assert.match(workflow.jobs["quality-gate"].if, /needs\.lint\.result == 'failure'/);
  const steps = workflow.jobs.lint.steps;
  const runsAfterFailure = (step) => /!cancelled\(\)|always\(\)/.test(String(step.if ?? ""));
  const report = steps.findIndex((step) => step.run === "npm run lint:json");
  const upload = steps.findIndex((step) => step.name === "Upload ESLint results");
  assert.ok(report > 0 && upload > report);
  const failable = steps
    .slice(0, report)
    .filter((step) => step.run && !runsAfterFailure(step))
    .map((step) => step.run);
  assert.ok(failable.length > 0, "the report really follows failable lint steps");
  assert.ok(runsAfterFailure(steps[report]), "ESLint (JSON report) runs after a failed step");
  assert.ok(runsAfterFailure(steps[upload]), "the upload runs after a failed step");
  const cache = steps.find((step) => step.name === "Restore ESLint file cache");
  assert.ok(runsAfterFailure(cache), "the report keeps its cache after a failed step");
  assert.match(cache.if, /github\.event_name == 'pull_request'/);
});

for (const invalid of [
  [],
  {},
  [{ filePath: "/repo/a.ts" }],
  [{ ...report[0], warningCount: -1 }],
]) {
  test(`incomplete lint measurement is rejected: ${JSON.stringify(invalid)}`, () =>
    fixture(({ dir, execute }) => {
      const file = join(dir, "report.json");
      writeFileSync(file, JSON.stringify(invalid));
      const result = execute("collect-metrics.mjs", [], { ESLINT_RESULTS_JSON: file });
      assert.notEqual(result.status, 0, result.stdout + result.stderr);
      assert.equal(existsSync(join(dir, "config/quality/quality-metrics.json")), false);
    }));
}

test("a completed exit-one lint scan keeps its measured violations", () =>
  fixture(({ dir, executable, execute }) => {
    const errors = [{ ...report[0], errorCount: 3 }];
    executable(
      "node_modules/.bin/eslint",
      `console.log(${JSON.stringify(JSON.stringify(errors))}); process.exit(1);`
    );
    const result = execute("collect-metrics.mjs");
    assert.equal(result.status, 0, result.stdout + result.stderr);
    const metrics = JSON.parse(readFileSync(join(dir, "config/quality/quality-metrics.json")));
    assert.equal(metrics.eslintErrors, 3);
    assert.equal(metrics.eslintWarnings, 2);
  }));

test("an abnormal lint exit cannot hide behind valid-looking JSON", () =>
  fixture(({ executable, execute }) => {
    executable(
      "node_modules/.bin/eslint",
      `console.log(${JSON.stringify(JSON.stringify(report))}); process.exit(2);`
    );
    const result = execute("collect-metrics.mjs");
    assert.notEqual(result.status, 0, result.stdout + result.stderr);
  }));

function observe(lintOutput, lintCode = 0, collectionCode = 0, options = {}) {
  return fixture(({ dir, executable, execute }) => {
    mkdirSync(join(dir, ".github/workflows"), { recursive: true });
    const aliases = ["quality:collect", "quality:ratchet", "check:fixture-a", "check:fixture-b"];
    const scripts = Object.fromEntries(aliases.map((alias) => [alias, "node fixture.mjs"]));
    writeFileSync(join(dir, "package.json"), JSON.stringify({ type: "commonjs", scripts }));
    writeFileSync(
      join(dir, "config/quality/quality-baseline.json"),
      JSON.stringify({
        metrics: { cognitiveComplexity: { value: 0 }, eslintWarnings: { value: 2 } },
      })
    );
    writeFileSync(
      join(dir, "config/quality/release-green-static-profile.json"),
      JSON.stringify({
        schemaVersion: 1,
        sourceJobs: [],
        exclusions: [],
        gates: aliases.map((id) => ({
          id,
          job: "fixture",
          args: ["run", id],
          kind: "hard",
          command: scripts[id],
        })),
      })
    );
    writeFileSync(join(dir, ".github/workflows/ci.yml"), "jobs: {}\n");
    writeFileSync(
      join(dir, ".github/workflows/quality.yml"),
      `jobs:
  fixture:
    steps:
      - run: |
          gates=(
            fixture-a
          )
          ratchet_gates=(
            fixture-b
          )
`
    );
    const stalePath = join(dir, ".artifacts/eslint-results.json");
    writeFileSync(stalePath, JSON.stringify([{ ...report[0], warningCount: 999 }]));
    executable("bin/git", `console.log("${"1".repeat(40)}");`);
    const lintCommand = `
      const fs = require("node:fs");
      const index = process.argv.indexOf("--output-file");
      const output = ${JSON.stringify(lintOutput)};
      const diagnostic = ${JSON.stringify(options.diagnostic ?? "")};
      if(${JSON.stringify(options.stdout ?? "")}) console.log(${JSON.stringify(options.stdout ?? "")});
      if(diagnostic) {
        console.log("[stdout diagnostic] " + diagnostic);
        console.error("[stderr diagnostic] " + diagnostic);
      }
      if(index >= 0) fs.writeFileSync(process.argv[index + 1], output);
      else if(output) console.log(output);
      process.exit(${lintCode});
    `;
    executable("bin/npx", options.forbidNpx ? "process.exit(91);" : lintCommand);
    if (!options.missingLocalBinary) {
      executable("node_modules/eslint/bin/eslint.js", lintCommand);
    }
    executable(
      "bin/npm",
      `
      const fs = require("node:fs");
      const script = process.argv[3];
      if(script === "check:complexity-ratchets") console.log("complexity=0\\ncognitiveComplexity=0\\n[complexity] OK — 0 violações (baseline 0)\\n[cognitive-complexity] OK — 0 violações (baseline 0)");
      if(script === "check:workflows") console.log("workflowAuditState=MEASURED\\nworkflowFindings=0\\nprovenanceRunnerFindings=0\\nscheduledGuardFindings=0");
      if(script === "quality:collect") {
        fs.writeFileSync("collector-invoked", "yes");
        const path = process.env.ESLINT_RESULTS_JSON;
        if(!path || path === ${JSON.stringify(stalePath)}) process.exit(31);
        const measured = JSON.parse(fs.readFileSync(path));
        if(measured[0].warningCount !== 2) process.exit(32);
        fs.writeFileSync("collected-path", path);
        process.exit(${collectionCode});
      }
      if(script === "quality:ratchet") fs.writeFileSync("ratchet-invoked", "yes");
    `
    );
    const result = execute("validate-release-green.mjs", ["--quick", "--full-ci", "--json"], {
      PATH: join(dir, "bin"),
      ESLINT_RESULTS_JSON: stalePath,
    });
    assert.equal(result.error, undefined);
    return {
      status: result.status,
      report: JSON.parse(result.stdout),
      invoked: existsSync(join(dir, "collector-invoked")),
      ratchetInvoked: existsSync(join(dir, "ratchet-invoked")),
      stderr: result.stderr,
    };
  });
}

test("the observer gives metrics its own completed lint report, overriding stale ambient input", () => {
  const result = observe(JSON.stringify(report));
  assert.equal(result.status, 0, result.stderr);
  assert.equal(result.invoked, true);
  assert.equal(result.ratchetInvoked, true);
  assert.equal(result.report.checks.find((check) => check.id === "quality:collect").ok, true);
});

test("observer console diagnostics cannot corrupt its separate ESLint measurement", () => {
  const result = observe(JSON.stringify(report), 0, 0, { diagnostic: "formatter startup notice" });
  assert.equal(result.status, 0, result.stderr);
  assert.equal(result.invoked, true);
  assert.equal(result.ratchetInvoked, true);
  assert.equal(result.report.checks.find((check) => check.id === "lint-errors").ok, true);
});

test("valid-looking stdout cannot replace an empty observer ESLint report", () => {
  const result = observe("", 0, 0, { stdout: JSON.stringify(report) });
  assert.equal(result.status, 1);
  assert.equal(result.invoked, false, "console JSON must not substitute the selected report");
  assert.equal(result.ratchetInvoked, false, "stale metrics cannot validate the current ratchet");
  assert.equal(result.report.checks.find((check) => check.id === "quality:collect").ok, false);
});

test("the observer runs installed ESLint without npx in a path containing shell characters", () => {
  const result = observe(JSON.stringify(report), 0, 0, { forbidNpx: true });
  assert.equal(result.status, 0, result.stderr);
  assert.equal(result.invoked, true);
  assert.equal(result.report.checks.find((check) => check.id === "lint-errors").ok, true);
});

test("a missing installed ESLint binary cannot fall back to an available npx", () => {
  const result = observe(JSON.stringify(report), 0, 0, { missingLocalBinary: true });
  assert.equal(result.status, 1);
  assert.equal(result.invoked, false);
  assert.equal(result.ratchetInvoked, false);
  assert.equal(result.report.checks.find((check) => check.id === "quality:collect").ok, false);
});

for (const [output, code] of [
  ["", 0],
  ["[]", 0],
  [JSON.stringify(report), 2],
]) {
  test(`an incomplete observer lint measurement prevents collection (exit ${code}, ${output})`, () => {
    const result = observe(output, code);
    assert.equal(result.status, 1);
    assert.equal(result.invoked, false, "must not reuse stale evidence or launch a second scan");
    assert.equal(result.ratchetInvoked, false, "old metrics cannot validate the current ratchet");
    assert.equal(result.report.checks.find((check) => check.id === "quality:collect").ok, false);
  });
}

test("a failed metrics collection cannot feed old values into the ratchet", () => {
  const result = observe(JSON.stringify(report), 0, 9);
  assert.equal(result.status, 1);
  assert.equal(result.invoked, true);
  assert.equal(result.ratchetInvoked, false);
  assert.equal(result.report.checks.find((check) => check.id === "quality:ratchet").ok, false);
});
