import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { execFileSync, spawnSync } from "node:child_process";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { load as loadYaml } from "js-yaml";
import { evaluateAdmission } from "../../scripts/quality/admission-verdict.mjs";

const policy = JSON.parse(
  readFileSync(new URL("../../config/quality/admission-policy.json", import.meta.url))
);
const context = {
  event: "pull_request",
  sha: "a".repeat(40),
  runId: "123",
  runAttempt: "1",
  draft: false,
};
const queueContext = {
  ...context,
  draft: true,
  headRef: "mergify/merge-queue/5cff6771d5",
  author: { id: 37929162, login: "mergify[bot]", type: "Bot" },
  repositoryId: 1157102282,
  headRepositoryId: 1157102282,
  baseRepositoryId: 1157102282,
};
function needsFor(
  profile,
  outputs = { code: "true", docs: "true", i18n: "true", workflow: "true", testsOnly: "false" }
) {
  return Object.fromEntries(
    Object.keys(policy.profiles[profile].jobs).map((id) => [
      id,
      {
        result: "success",
        ...(id === "changes" ? { outputs } : {}),
      },
    ])
  );
}
const run = (needs, ctx = context, profile = "ci", candidatePolicy = policy) =>
  evaluateAdmission(candidatePolicy, profile, ctx, needs);

test("real CLI binds receipts to checkout SHA/run/attempt and preserves rejection exits", () => {
  const root = mkdtempSync(join(tmpdir(), "omniroute-admission-cli-"));
  const script = fileURLToPath(
    new URL("../../scripts/quality/admission-verdict.mjs", import.meta.url)
  );
  try {
    execFileSync("git", ["init", "--quiet"], { cwd: root });
    execFileSync(
      "git",
      [
        "-c",
        "user.name=Admission Test",
        "-c",
        "user.email=admission@example.invalid",
        "commit",
        "--quiet",
        "--allow-empty",
        "-m",
        "candidate",
      ],
      { cwd: root }
    );
    const sha = execFileSync("git", ["rev-parse", "HEAD"], { cwd: root, encoding: "utf8" }).trim();
    mkdirSync(join(root, "config/quality"), { recursive: true });
    writeFileSync(join(root, "config/quality/admission-policy.json"), JSON.stringify(policy));
    const eventPath = join(root, "event.json");
    writeFileSync(eventPath, JSON.stringify({ pull_request: { draft: false } }));
    const env = {
      ...process.env,
      GITHUB_SHA: sha,
      GITHUB_EVENT_PATH: eventPath,
      GITHUB_EVENT_NAME: "pull_request",
      GITHUB_RUN_ID: "456",
      GITHUB_RUN_ATTEMPT: "2",
      GITHUB_STEP_SUMMARY: join(root, "summary.md"),
      NEEDS_JSON: JSON.stringify(needsFor("ci")),
    };
    const invoke = (patch = {}) =>
      spawnSync(process.execPath, [script, "ci"], {
        cwd: root,
        env: { ...env, ...patch },
        encoding: "utf8",
        timeout: 15_000,
      });
    let result = invoke();
    assert.equal(result.status, 0, result.stderr);
    const receipt = JSON.parse(readFileSync(join(root, ".artifacts/ci-admission.json"), "utf8"));
    assert.equal(receipt.sha, sha);
    assert.equal(receipt.runId, "456");
    assert.equal(receipt.runAttempt, "2");
    assert.equal(invoke({ GITHUB_SHA: "b".repeat(40) }).status, 1);
    assert.equal(invoke({ NEEDS_JSON: "not json" }).status, 1);
    const failed = needsFor("ci");
    failed["test-vitest"].result = "failure";
    result = invoke({ NEEDS_JSON: JSON.stringify(failed) });
    assert.equal(result.status, 1);
    assert.equal(
      JSON.parse(readFileSync(join(root, ".artifacts/ci-admission.json"), "utf8")).verdict,
      "FAIL"
    );
    const queueEvent = {
      repository: { id: queueContext.repositoryId },
      pull_request: {
        draft: true,
        user: queueContext.author,
        head: { ref: queueContext.headRef, repo: { id: queueContext.headRepositoryId } },
        base: { repo: { id: queueContext.baseRepositoryId } },
      },
    };
    writeFileSync(eventPath, JSON.stringify(queueEvent));
    assert.equal(invoke().status, 0, "a complete official queue candidate must pass the CLI");
    assert.equal(invoke({ NEEDS_JSON: JSON.stringify(failed) }).status, 1);
    queueEvent.pull_request.user = { id: 1, login: "contributor", type: "User" };
    writeFileSync(eventPath, JSON.stringify(queueEvent));
    assert.equal(invoke().status, 1, "a forged branch prefix must not grant draft admission");
    writeFileSync(eventPath, JSON.stringify({ merge_group: { head_sha: "c".repeat(40) } }));
    assert.equal(invoke({ GITHUB_EVENT_NAME: "merge_group" }).status, 1);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

for (const profile of ["ci", "quality"]) {
  test(`${profile}: official same-repository Mergify drafts require every applicable result`, () => {
    const needs = needsFor(profile);
    assert.equal(run(needs, queueContext, profile).verdict, "PASS");
    for (const [id, rule] of Object.entries(policy.profiles[profile].jobs)) {
      if (rule.disposition !== "required") continue;
      for (const status of ["failure", "cancelled", "skipped", "pending"]) {
        const changed = structuredClone(needs);
        changed[id].result = status;
        assert.equal(run(changed, queueContext, profile).verdict, "FAIL", `${id}: ${status}`);
      }
      const missing = structuredClone(needs);
      delete missing[id];
      assert.equal(run(missing, queueContext, profile).verdict, "FAIL", `${id}: missing`);
    }
  });
  test(`${profile}: ordinary drafts and forged queue identities stay rejected`, () => {
    for (const patch of [
      { headRef: "release/v3.8.52" },
      { headRef: "mergify/merge-queue" },
      { author: { id: 1, login: "mergify[bot]", type: "Bot" } },
      { author: { id: 37929162, login: "contributor", type: "Bot" } },
      { author: { id: 37929162, login: "mergify[bot]", type: "User" } },
      { headRepositoryId: 42 },
      { baseRepositoryId: 42 },
      { repositoryId: undefined },
      { author: undefined },
      { draft: undefined },
    ]) {
      assert.equal(run(needsFor(profile), { ...queueContext, ...patch }, profile).verdict, "FAIL");
    }
  });
}

for (const profile of ["ci", "quality"]) {
  test(`${profile}: complete applicable job results pass`, () => {
    const result = run(needsFor(profile), context, profile);
    assert.equal(result.verdict, "PASS");
    assert.equal(result.sha, context.sha);
    assert.equal(result.runAttempt, "1");
  });
  for (const status of ["failure", "cancelled", "skipped", "pending", "unknown"]) {
    test(`${profile}: an applicable required job cannot pass as ${status}`, () => {
      const needs = needsFor(profile);
      const id = profile === "ci" ? "test-vitest" : "fast-gates";
      needs[id].result = status;
      assert.notEqual(run(needs, context, profile).verdict, "PASS");
    });
  }
  test(`${profile}: missing and unknown jobs fail closed`, () => {
    const needs = needsFor(profile);
    delete needs.changes;
    assert.notEqual(run(needs, context, profile).verdict, "PASS");
    needs.unmapped = { result: "success" };
    assert.notEqual(run(needs, context, profile).verdict, "PASS");
  });
}

test("docs-only can skip code lanes, but not the applicable docs gate", () => {
  const needs = needsFor("ci", {
    code: "false",
    docs: "true",
    i18n: "false",
    workflow: "false",
    testsOnly: "false",
  });
  for (const [id, job] of Object.entries(policy.profiles.ci.jobs)) {
    if (["code", "code-e2e", "code-or-i18n", "i18n"].includes(job.when))
      needs[id].result = "skipped";
  }
  assert.equal(run(needs).verdict, "PASS");
  needs["docs-sync-strict"].result = "skipped";
  assert.notEqual(run(needs).verdict, "PASS");
});

test("catalog-only still requires i18n validation", () => {
  const needs = needsFor("ci", {
    code: "false",
    docs: "false",
    i18n: "true",
    workflow: "false",
    testsOnly: "false",
  });
  for (const [id, job] of Object.entries(policy.profiles.ci.jobs)) {
    if (["code", "code-e2e", "code-or-docs", "docs"].includes(job.when))
      needs[id].result = "skipped";
  }
  assert.equal(run(needs).verdict, "PASS");
  needs["i18n-ui-coverage"].result = "failure";
  assert.notEqual(run(needs).verdict, "PASS");
});

test("tests-only skips browser E2E, never Vitest or Node", () => {
  const needs = needsFor("ci");
  needs.changes.outputs.testsOnly = "true";
  needs["test-e2e"].result = "skipped";
  assert.equal(run(needs).verdict, "PASS");
  needs["test-unit"].result = "skipped";
  assert.notEqual(run(needs).verdict, "PASS");
});

for (const event of ["push", "workflow_dispatch", "merge_group"]) {
  test(`${event}: full validation cannot inherit a docs-only shortcut`, () => {
    const needs = needsFor("ci", {
      code: "false",
      docs: "true",
      i18n: "false",
      workflow: "false",
      testsOnly: "true",
    });
    needs["pr-test-policy"].result = "skipped";
    assert.equal(run(needs, { ...context, event }).verdict, "PASS");
    needs["test-vitest"].result = "skipped";
    assert.notEqual(run(needs, { ...context, event }).verdict, "PASS");
  });
}

test("draft, bad identity, unsupported event and malformed classifier do not pass", () => {
  for (const patch of [
    { draft: true },
    { sha: "main" },
    { runId: "" },
    { runAttempt: "0" },
    { event: "pull_request_target" },
  ]) {
    assert.notEqual(run(needsFor("ci"), { ...context, ...patch }).verdict, "PASS");
  }
  for (const outputs of [
    {},
    { code: "maybe" },
    { ...needsFor("ci").changes.outputs, code: "false", workflow: "true" },
  ]) {
    const needs = needsFor("ci", outputs);
    assert.notEqual(run(needs).verdict, "PASS");
  }
});

test("forks and hotfix labels do not waive an applicable required result", () => {
  const needs = needsFor("ci");
  needs["test-coverage"].result = "skipped";
  assert.notEqual(run(needs, { ...context, fork: true, labels: ["hotfix"] }).verdict, "PASS");
});

test("only explicitly advisory jobs can fail without blocking", () => {
  const needs = needsFor("ci");
  needs["test-protocols-e2e"].result = "failure";
  const result = run(needs);
  assert.equal(result.verdict, "PASS");
  assert.ok(
    result.jobs.some(
      (job) =>
        job.id === "test-protocols-e2e" &&
        job.result === "failure" &&
        job.disposition === "advisory"
    )
  );
  needs["test-vitest"].result = "failure";
  assert.notEqual(run(needs).verdict, "PASS");
});

test("invalid or weakened policy shape is rejected", () => {
  const candidatePolicy = structuredClone(policy);
  candidatePolicy.profiles.ci.jobs["test-unit"].when = "sometimes";
  assert.notEqual(run(needsFor("ci"), context, "ci", candidatePolicy).verdict, "PASS");
  assert.notEqual(run(needsFor("ci"), context, "absent").verdict, "PASS");
});

// A self-hosted runner must never execute fork code. A runs-on expression satisfies that either by
// admitting a pull request only from this repository, or by keeping every pull_request off the
// self-hosted branch altogether — a pure conjunction (no `||`) that includes the exclusion, so no
// other clause can re-admit the event (ci.yml `Build`, 2026-10-18).
function keepsForkCodeOffSelfHosted(runsOn) {
  if (runsOn.includes("github.event.pull_request.head.repo.full_name == github.repository")) {
    return true;
  }
  const gate = runsOn.split(" && fromJSON(")[0];
  return gate.includes("github.event_name != 'pull_request'") && !gate.includes("||");
}

for (const profile of ["ci", "quality"]) {
  test(`${profile}: workflow jobs and dependencies match the versioned admission policy`, () => {
    const workflow = loadYaml(
      readFileSync(new URL(`../../.github/workflows/${profile}.yml`, import.meta.url), "utf8")
    );
    const verdict = workflow.jobs["admission-verdict"];
    const ids = Object.keys(policy.profiles[profile].jobs).sort();
    assert.deepEqual([...verdict.needs].sort(), ids);
    assert.deepEqual(
      Object.keys(workflow.jobs)
        .filter((id) => !["ci-summary", "admission-verdict"].includes(id))
        .sort(),
      ids
    );
    assert.equal(verdict.name, policy.profiles[profile].checkName);
    assert.equal(verdict.if, "${{ always() }}");
    assert.deepEqual(workflow.on.pull_request.branches, ["main", "release/**"]);
    // Push runs only for main since 2026-10-18: each change already ran the matrix on its
    // PR and Release-Green validates the merged combination on release/** (the per-push
    // runs there were cancelled by the next merge, 24 of 24 in a day, while holding up to
    // 30 hosted slots). See tests/unit/build/push-storm-diet.test.ts.
    assert.deepEqual(workflow.on.push.branches, ["main"]);
    assert.ok(workflow.on.merge_group.types.includes("checks_requested"));
    for (const [id, job] of Object.entries(workflow.jobs)) {
      assert.ok(!String(job.if).includes("'hotfix'"), "a label cannot waive candidate evidence");
      if (String(job["runs-on"]).includes("self-hosted")) {
        assert.ok(job["runs-on"].includes("github.event_name != 'merge_group'"));
        assert.ok(
          keepsForkCodeOffSelfHosted(job["runs-on"]),
          `${profile}:${id} must never run fork pull-request code on a self-hosted runner`
        );
      }
    }
    for (const id of ["lint-guard", "merge-integrity"]) {
      if (workflow.jobs[id]) assert.equal(workflow.jobs[id]["continue-on-error"], undefined);
    }
    const evaluator = verdict.steps.find((step) =>
      step.run?.startsWith("node scripts/quality/admission-verdict.mjs")
    );
    assert.equal(evaluator.env.NEEDS_JSON, "${{ toJSON(needs) }}");
    assert.equal(verdict.steps[0].with.ref, "${{ github.sha }}");
    assert.equal(verdict.steps[0].with["persist-credentials"], false);
    assert.equal(verdict.steps.at(-1).with["if-no-files-found"], "error");
  });
}

// Full-matrix lane (2026-10-27): E2E, Electron, package, integration, ecosystem, protocol
// clients and Bun run on push / dispatch / merge_group and on the Mergify queue candidate,
// not on every push to an ordinary PR (the org's Free plan caps hosted runners at 20 jobs).
const FULL_LANE = Object.entries(policy.profiles.ci.jobs)
  .filter(([, job]) => job.when.startsWith("full-"))
  .map(([id]) => id);

test("full-matrix lanes cover the heavy jobs and nothing the fast lane needs", () => {
  for (const id of ["test-e2e", "electron-package-smoke", "package-artifact", "test-integration"])
    assert.ok(FULL_LANE.includes(id), `${id} belongs to the full-matrix lane`);
  for (const id of ["lint", "build", "test-unit", "test-vitest", "test-coverage", "test-security"])
    assert.ok(!FULL_LANE.includes(id), `${id} must keep running on every code PR`);
});

test("an ordinary code PR may skip the full-matrix lanes; the queue candidate and push may not", () => {
  const needs = needsFor("ci");
  for (const id of FULL_LANE) needs[id].result = "skipped";
  assert.equal(run(needs).verdict, "PASS");
  assert.notEqual(run(needs, queueContext).verdict, "PASS");
  assert.notEqual(run(needs, { ...context, event: "push" }).verdict, "PASS");
  assert.notEqual(run(needs, { ...context, event: "workflow_dispatch" }).verdict, "PASS");
});

test("a full-matrix lane that ran and failed still fails an ordinary PR", () => {
  const needs = needsFor("ci");
  for (const id of FULL_LANE) needs[id].result = "skipped";
  needs["test-integration"].result = "failure";
  assert.notEqual(run(needs).verdict, "PASS");
});

test("tests-only queue candidates still skip browser E2E", () => {
  const needs = needsFor("ci");
  needs.changes.outputs.testsOnly = "true";
  needs["test-e2e"].result = "skipped";
  assert.equal(run(needs, queueContext).verdict, "PASS");
});

test("ci.yml gates every full-matrix job on the queue candidate, not on PR readiness", () => {
  const workflow = loadYaml(
    readFileSync(new URL("../../.github/workflows/ci.yml", import.meta.url), "utf8")
  );
  for (const id of FULL_LANE) {
    const cond = String(workflow.jobs[id].if ?? "");
    assert.ok(
      cond.includes("github.event_name != 'pull_request'") &&
        cond.includes("needs.changes.outputs.queueCandidate == 'true'"),
      `${id}: if must admit non-PR events and the queue candidate only`
    );
    assert.ok(!cond.includes("draft == false"), `${id}: a ready PR alone must not start it`);
    const needs = [workflow.jobs[id].needs].flat();
    assert.ok(needs.includes("changes"), `${id} must depend on changes to read queueCandidate`);
  }
});
