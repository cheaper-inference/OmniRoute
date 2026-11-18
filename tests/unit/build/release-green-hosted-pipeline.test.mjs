import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { load } from "js-yaml";
import {
  foldHostedSuiteResults,
  parseHostedSuiteResult,
} from "../../../scripts/quality/validate-release-green.mjs";

const root = fileURLToPath(new URL("../../../", import.meta.url));
const workflow = load(
  readFileSync(join(root, ".github/workflows/nightly-release-green.yml"), "utf8")
);
const posix = { skip: process.platform === "win32" };
const sha = "1".repeat(40);

// Execute the actual workflow shell and real receipt writer. The tee double drains
// stdin before failing, so a producer SIGPIPE cannot make the failure accidentally pass.
// A nonempty partial log reproduces a real write failure that the old writer accepted.
function observe(t, job, options = {}) {
  const dir = mkdtempSync(join(tmpdir(), "omni-hosted-pipeline-"));
  t.after(() => rmSync(dir, { recursive: true, force: true }));
  const bin = join(dir, "bin");
  mkdirSync(bin);
  const executable = (name, body) =>
    writeFileSync(join(bin, name), "#!" + process.execPath + "\n" + body, { mode: 0o755 });
  executable(
    "npm",
    [
      'const fs = require("node:fs");',
      "const script = process.argv[3];",
      'fs.appendFileSync(process.env.FIXTURE_CALLS, script + "\\n");',
      'fs.writeFileSync(1, "first output line\\nsecond output line\\n");',
      'process.exitCode = script === "test:vitest:ui" ? Number(process.env.FIXTURE_UI_EXIT) : Number(process.env.FIXTURE_PRODUCER_EXIT);',
    ].join("\n")
  );
  executable(
    "tee",
    [
      'const fs = require("node:fs");',
      'const input = fs.readFileSync(0, "utf8");',
      "const failed = Number(process.env.FIXTURE_TEE_EXIT);",
      "const output = failed ? input.slice(0, 9) : input;",
      "fs.writeFileSync(process.argv[2], output);",
      "fs.writeFileSync(1, output);",
      'if (failed) fs.writeFileSync(2, "tee: simulated write failure after partial capture\\n");',
      "process.exitCode = failed;",
    ].join("\n")
  );
  executable("git", "console.log(process.env.FIXTURE_CANDIDATE);");
  executable(
    "node",
    [
      'const { spawnSync } = require("node:child_process");',
      'const path = require("node:path");',
      "const args = process.argv.slice(2);",
      'if (args[0] === "scripts/ci/release-green-suite.mjs") {',
      "  if (Number(process.env.FIXTURE_WRITER_EXIT)) process.exit(Number(process.env.FIXTURE_WRITER_EXIT));",
      "  args[0] = path.join(process.env.FIXTURE_ROOT, args[0]);",
      "}",
      'const result = spawnSync(process.execPath, args, { stdio: "inherit", env: process.env, timeout: 10000 });',
      "process.exitCode = result.status ?? 99;",
    ].join("\n")
  );
  writeFileSync(join(dir, "package-lock.json"), "{}\n");
  const calls = join(dir, "npm-calls");
  writeFileSync(calls, "");
  const name = options.name ?? "unit-1";
  const suite = name === "vitest" ? "test:vitest" : "test:unit:ci:shard";
  const step = workflow.jobs[job].steps.find((entry) =>
    entry.run?.includes("release-green-suite.mjs")
  );
  assert.ok(step, job + " must record the suite outcome");
  const result = spawnSync("/bin/bash", ["-euo", "pipefail", "-c", step.run], {
    cwd: dir,
    encoding: "utf8",
    timeout: 15000,
    env: {
      ...process.env,
      NODE_OPTIONS: "",
      PATH: bin + ":" + dirname(process.execPath) + ":/usr/bin:/bin",
      NAME: name,
      SUITE: suite,
      TEST_SHARD: name === "vitest" ? "" : "1/8",
      GITHUB_ACTIONS: "true",
      GITHUB_RUN_ID: "6101",
      GITHUB_RUN_ATTEMPT: "2",
      GITHUB_WORKFLOW_SHA: "3".repeat(40),
      GITHUB_JOB: job,
      FIXTURE_CANDIDATE: sha,
      FIXTURE_ROOT: root,
      FIXTURE_CALLS: calls,
      FIXTURE_PRODUCER_EXIT: String(options.producer ?? 0),
      FIXTURE_TEE_EXIT: String(options.tee ?? 0),
      FIXTURE_WRITER_EXIT: String(options.writer ?? 0),
      FIXTURE_UI_EXIT: String(options.ui ?? 0),
    },
  });
  assert.equal(result.error, undefined);
  const receiptPath = join(dir, "suite-results", name + ".json");
  return {
    status: result.status,
    output: result.stdout + result.stderr,
    receipt: existsSync(receiptPath) ? JSON.parse(readFileSync(receiptPath, "utf8")) : null,
    log: existsSync(join(dir, "suite.log")) ? readFileSync(join(dir, "suite.log"), "utf8") : "",
    calls: readFileSync(calls, "utf8").trim().split("\n"),
  };
}

for (const job of ["suites", "main-suites"]) {
  test(job + ": a partial tee write failure cannot certify a successful producer", posix, (t) => {
    const result = observe(t, job, { tee: 74 });
    assert.ok(result.log.length > 0, "the fixture must retain a nonempty partial log");
    assert.notEqual(result.status, 0, result.output);
    assert.ok(result.receipt, "retain an incomplete receipt with both pipeline statuses");
    assert.deepEqual(result.receipt.pipelineStatus, [0, 74]);
    assert.equal(result.receipt.evidenceState, "INCOMPLETE");
    assert.notEqual(result.receipt.code, 0);
  });

  test(
    job + ": concurrent producer and tee failures retain both component outcomes",
    posix,
    (t) => {
      const result = observe(t, job, { producer: 7, tee: 74 });
      assert.equal(result.status, 7, result.output);
      assert.deepEqual(result.receipt?.pipelineStatus, [7, 74]);
      assert.equal(result.receipt?.evidenceState, "INCOMPLETE");
    }
  );

  test(job + ": a measured producer failure retains its exit code", posix, (t) => {
    const result = observe(t, job, { producer: 7 });
    assert.equal(result.status, 7, result.output);
    assert.equal(result.receipt?.code, 7);
    assert.notEqual(result.receipt?.evidenceState, "INCOMPLETE");
  });

  test(job + ": a failed receipt writer stays nonzero", posix, (t) => {
    const result = observe(t, job, { writer: 23 });
    assert.equal(result.status, 23, result.output);
    assert.equal(result.receipt, null);
  });

  test(job + ": a complete producer and log remain successful", posix, (t) => {
    const result = observe(t, job);
    assert.equal(result.status, 0, result.output);
    assert.equal(result.receipt?.code, 0);
    assert.equal(result.receipt?.candidateSha, sha);
  });

  test(job + ": failure in the Vitest UI half remains a producer failure", posix, (t) => {
    const result = observe(t, job, { name: "vitest", ui: 9 });
    assert.deepEqual(result.calls, ["test:vitest", "test:vitest:ui"]);
    assert.equal(result.status, 9, result.output);
    assert.equal(result.receipt?.code, 9);
  });
}

test("hosted consumer rejects a code-zero receipt with incomplete pipeline evidence", () => {
  const result = parseHostedSuiteResult(
    JSON.stringify({
      name: "unit-1",
      code: 0,
      detail: "pass",
      pipelineStatus: [0, 74],
      evidenceState: "INCOMPLETE",
    })
  );
  assert.equal(result, null);
});

test("missing hosted execution evidence is INCOMPLETE rather than a measured code failure", () => {
  const result = foldHostedSuiteResults([], { unitShards: 1, integrationShards: 1 });
  for (const id of ["unit", "integration", "vitest"]) {
    const lane = result.find((entry) => entry.id === id);
    assert.equal(lane?.ok, false);
    assert.equal(lane?.evidenceState, "INCOMPLETE");
  }
});

test("a completeness label cannot hide inconsistent or malformed pipeline outcomes", () => {
  for (const pipelineStatus of [[0, 74], [7, 0], [0], [0, 0, 0], [0, "0"], [0, -1]]) {
    assert.equal(
      parseHostedSuiteResult(
        JSON.stringify({
          name: "unit-1",
          code: 0,
          detail: "pass",
          pipelineStatus,
          evidenceState: "COMPLETE",
        })
      ),
      null
    );
  }
});

test("an incomplete nonzero capture stays incomplete after folding the hosted lane", () => {
  const receipt = parseHostedSuiteResult(
    JSON.stringify({
      name: "unit-1",
      code: 74,
      detail: "partial capture",
      pipelineStatus: [0, 74],
      evidenceState: "INCOMPLETE",
    })
  );
  assert.ok(receipt);
  const unit = foldHostedSuiteResults(
    [
      receipt,
      { name: "integration-1", code: 0, detail: "pass" },
      { name: "vitest", code: 0, detail: "pass" },
    ],
    { unitShards: 1, integrationShards: 1 }
  ).find((entry) => entry.id === "unit");
  assert.equal(unit.ok, false);
  assert.equal(unit.evidenceState, "INCOMPLETE");
});

test("a producer failure with complete capture remains measured after folding", () => {
  const receipt = parseHostedSuiteResult(
    JSON.stringify({
      name: "unit-1",
      code: 7,
      detail: "failed assertion",
      pipelineStatus: [7, 0],
      evidenceState: "COMPLETE",
    })
  );
  assert.ok(receipt);
  const unit = foldHostedSuiteResults(
    [
      receipt,
      { name: "integration-1", code: 0, detail: "pass" },
      { name: "vitest", code: 0, detail: "pass" },
    ],
    { unitShards: 1, integrationShards: 1 }
  ).find((entry) => entry.id === "unit");
  assert.equal(unit.ok, false);
  assert.notEqual(unit.evidenceState, "INCOMPLETE");
  assert.match(unit.detail, /failed assertion/);
});
