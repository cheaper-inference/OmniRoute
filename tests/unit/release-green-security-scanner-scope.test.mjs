import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { copyFileSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { load } from "js-yaml";

const root = fileURLToPath(new URL("../../", import.meta.url));
const workflow = load(
  readFileSync(join(root, ".github/workflows/nightly-release-green.yml"), "utf8")
);
const sha = "4".repeat(40);
const pair = "scripts/ci/install-workflow-scanners.sh";
const full = "scripts/ci/install-quality-scanners.sh";
const posix = { skip: process.platform === "win32" };

// Run the actual job's preparation step against an older checkout with no
// installers. Only the immutable Git objects and network installers are fixtures.
function prepare(job, event, { missingFull = false, installerExit = 0 } = {}) {
  const dir = mkdtempSync(join(tmpdir(), "release-green-security-scope-"));
  try {
    const bin = join(dir, "bin");
    mkdirSync(bin);
    const calls = join(dir, "git-calls");
    const executions = join(dir, "executions");
    writeFileSync(calls, "");
    writeFileSync(executions, "");
    const sources = {
      [pair]: '#!/bin/bash\nprintf "pair\\n" >> "$QG_EXECUTIONS"\n',
      [full]:
        '#!/bin/bash\ntest -f "$(dirname "$0")/install-workflow-scanners.sh" || exit 77\nprintf "full\\n" >> "$QG_EXECUTIONS"\nexit "$QG_INSTALLER_EXIT"\n',
    };
    writeFileSync(
      join(bin, "git"),
      `#!${process.execPath}\n` +
        'const fs = require("node:fs");\n' +
        `const sources = ${JSON.stringify(sources)};\n` +
        "const [command, object] = process.argv.slice(2);\n" +
        'if(command !== "show" || !object?.startsWith(process.env.WORKFLOW_SHA + ":")) process.exit(8);\n' +
        "const path = object.slice(process.env.WORKFLOW_SHA.length + 1);\n" +
        'fs.appendFileSync(process.env.QG_CALLS, path + "\\n");\n' +
        `if(!sources[path] || (path === ${JSON.stringify(full)} && process.env.QG_MISSING_FULL === "1")) process.exit(9);\n` +
        "process.stdout.write(sources[path]);\n",
      { mode: 0o755 }
    );
    const steps = workflow.jobs[job].steps;
    const setup = steps.find((step) => step.id === "workflow_scanners");
    assert.ok(setup);
    assert.ok(steps.indexOf(setup) < steps.findIndex((step) => step.id === "validate"));
    assert.notEqual(setup["continue-on-error"], true);
    const env = {
      ...process.env,
      PATH: `${bin}:${dirname(process.execPath)}:/usr/bin:/bin`,
      WORKFLOW_SHA: sha,
      EVENT_NAME: event,
      RUNNER_TEMP: dir,
      GITHUB_PATH: join(dir, "github-path"),
      GH_TOKEN: "fixture-public-assets-token",
      QG_CALLS: calls,
      QG_EXECUTIONS: executions,
      QG_MISSING_FULL: missingFull ? "1" : "0",
      QG_INSTALLER_EXIT: String(installerExit),
    };
    const result = spawnSync("/bin/bash", ["-euo", "pipefail", "-c", setup.run], {
      cwd: dir,
      env,
      encoding: "utf8",
      timeout: 10_000,
    });
    assert.equal(result.error, undefined);
    let verdict = null;
    if (result.status !== 0) {
      mkdirSync(join(dir, "scripts/ci"), { recursive: true });
      copyFileSync(
        join(root, "scripts/ci/release-green-result.mjs"),
        join(dir, "scripts/ci/release-green-result.mjs")
      );
      const enforce = steps.find((step) => step.name === "Enforce validation verdict");
      assert.equal(enforce.if, "always()");
      const final = spawnSync("/bin/bash", ["-euo", "pipefail", "-c", enforce.run], {
        cwd: dir,
        encoding: "utf8",
        timeout: 10_000,
        env: { ...env, VALIDATION_EXIT: "", VALIDATED_SHA: sha, GITHUB_OUTPUT: "" },
      });
      assert.equal(final.status, 1, final.stdout + final.stderr);
      verdict = JSON.parse(final.stdout);
    }
    return {
      status: result.status,
      output: result.stdout + result.stderr,
      calls: readFileSync(calls, "utf8").trim().split("\n"),
      executions: readFileSync(executions, "utf8").trim(),
      verdict,
    };
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

for (const job of ["release-green", "main-green"]) {
  test(`${job}: push installs only the workflow pair`, posix, () => {
    const result = prepare(job, "push");
    assert.equal(result.status, 0, result.output);
    assert.deepEqual(result.calls, [pair]);
    assert.equal(result.executions, "pair");
  });

  for (const event of ["schedule", "workflow_dispatch"]) {
    test(
      `${job}: ${event} prepares every required scanner from one workflow revision`,
      posix,
      () => {
        const result = prepare(job, event);
        assert.equal(result.status, 0, result.output);
        assert.deepEqual(result.calls, [pair, full]);
        assert.equal(result.executions, "full");
      }
    );
  }

  for (const options of [{ missingFull: true }, { installerExit: 23 }]) {
    test(
      `${job}: unavailable full tooling remains INCOMPLETE (${JSON.stringify(options)})`,
      posix,
      () => {
        const result = prepare(job, "schedule", options);
        assert.notEqual(result.status, 0);
        assert.equal(result.verdict.evidenceState, "INCOMPLETE");
        assert.equal(result.verdict.verdict, "UNKNOWN");
      }
    );
  }
}

test("both observer preparations receive their event and read token explicitly", () => {
  for (const job of ["release-green", "main-green"]) {
    const setup = workflow.jobs[job].steps.find((step) => step.id === "workflow_scanners");
    assert.equal(setup.env.EVENT_NAME, "${{ github.event_name }}");
    assert.equal(setup.env.GH_TOKEN, "${{ github.token }}");
  }
});
