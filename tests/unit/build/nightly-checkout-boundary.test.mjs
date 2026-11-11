import assert from "node:assert/strict";
import { mkdtempSync, readFileSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import test from "node:test";
import { load } from "js-yaml";

const readWorkflow = (name) =>
  load(readFileSync(new URL(`../../../.github/workflows/${name}.yml`, import.meta.url), "utf8"));
const compat = readWorkflow("nightly-compat");
const release = readWorkflow("nightly-release-green");
const sha = "a".repeat(40);
function execute(step, overrides = {}) {
  const dir = mkdtempSync(join(tmpdir(), "nightly-ref-"));
  try {
    writeFileSync(join(dir, "gh"), '#!/bin/sh\nprintf "%s\\n" release/v3.8.53 release/v3.8.54\n', {
      mode: 0o700,
    });
    writeFileSync(
      join(dir, "git"),
      '#!/bin/sh\nif [ "$1" = rev-parse ]; then printf "%s\\n" "$FIXTURE_HEAD"; else printf "%s\\n" origin/release/v3.8.53 origin/release/v3.8.54; fi\n',
      { mode: 0o700 }
    );
    const output = join(dir, "output");
    writeFileSync(output, "");
    const result = spawnSync("/bin/bash", ["-euo", "pipefail", "-c", step?.run || "exit 99"], {
      encoding: "utf8",
      timeout: 5000,
      env: {
        PATH: `${dir}:/usr/bin:/bin`,
        GITHUB_REPOSITORY: "cheaper-inference/OmniRoute",
        GITHUB_REF_TYPE: "branch",
        GITHUB_REF_NAME: "release/v3.8.54",
        GITHUB_SHA: sha,
        GITHUB_OUTPUT: output,
        INPUT_BRANCH: "",
        FIXTURE_HEAD: sha,
        EXPECTED_SHA: sha,
        ...overrides,
      },
    });
    return { status: result.status, stderr: result.stderr, output: readFileSync(output, "utf8") };
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}
for (const [name, workflow, id] of [
  ["compat", compat, "resolve-branch"],
  ["release", release, "resolve-target"],
]) {
  const step = workflow.jobs[id].steps.find(
    (entry) => entry.id === (name === "compat" ? "branch" : "resolve")
  );
  test(`${name}: the selected branch must be the workflow's own branch`, () => {
    const valid = execute(step);
    assert.equal(valid.status, 0, valid.stderr);
    assert.match(valid.output, /target=release\/v3\.8\.54/);
    assert.notEqual(execute(step, { INPUT_BRANCH: "release/v3.8.53" }).status, 0);
    assert.notEqual(execute(step, { GITHUB_REF_NAME: "main" }).status, 0);
    assert.notEqual(execute(step, { GITHUB_REF_TYPE: "tag" }).status, 0);
    assert.notEqual(
      execute(step, {
        INPUT_BRANCH: "release/v3.8.54-suffix",
        GITHUB_REF_NAME: "release/v3.8.54-suffix",
      }).status,
      0
    );
  });
}
test("release: resolve the event's immutable SHA, not a later branch tip", () => {
  const step = release.jobs["resolve-target"].steps.find((entry) => entry.id === "resolve");
  assert.match(execute(step).output, new RegExp(`sha=${sha}`));
  assert.notEqual(execute(step, { GITHUB_SHA: "not-a-sha" }).status, 0);
});
test("release and compatibility code execute from the event SHA in its cache scope", () => {
  for (const job of [
    compat.jobs["compat-build-26"],
    compat.jobs["compat-tests"],
    release.jobs.suites,
  ]) {
    const checkout = job.steps.find((step) => step.uses?.startsWith("actions/checkout@"));
    assert.equal(checkout.with.ref, "${{ github.sha }}");
    assert.equal(checkout.with["persist-credentials"], false);
  }
});
test("main suites checkout trusted main and reject drift before installing or executing code", () => {
  const steps = release.jobs["main-suites"].steps;
  assert.equal(steps.find((step) => step.uses?.startsWith("actions/checkout@")).with.ref, "main");
  const verifyIndex = steps.findIndex((step) => step.name === "Verify resolved main commit");
  assert.ok(
    verifyIndex > 0 &&
      verifyIndex < steps.findIndex((step) => step.uses === "./.github/actions/npm-ci-retry")
  );
  const verify = steps[verifyIndex];
  assert.equal(verify.env.EXPECTED_SHA, "${{ needs.resolve-main.outputs.sha }}");
  assert.equal(execute(verify).status, 0);
  assert.notEqual(execute(verify, { FIXTURE_HEAD: "b".repeat(40) }).status, 0);
  assert.notEqual(execute(verify, { EXPECTED_SHA: "" }).status, 0);
});
