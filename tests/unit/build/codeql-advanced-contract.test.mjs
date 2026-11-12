import assert from "node:assert/strict";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import test from "node:test";
import { parse } from "yaml";
import { assertCodeqlTarget } from "../../../scripts/quality/codeql-producer-evidence.mjs";
import {
  assertCodeqlSetup,
  assertCurrentContext,
  evaluateCodeqlCandidate,
  resolveCodeqlContext,
} from "../../../scripts/quality/codeql-admission.mjs";

const root = fileURLToPath(new URL("../../../", import.meta.url));
const policy = JSON.parse(
  fs.readFileSync(path.join(root, "config/quality/codeql-admission-policy.json"), "utf8")
);
const workflow = parse(fs.readFileSync(path.join(root, ".github/workflows/codeql.yml"), "utf8"));
// Administrative onboarding is explicit: main can still publish the previous version.
// Advancing package.json alone must not silently authorize a new scanner target.
const activeRelease = "release/v3.8.54";
const env = {
  GITHUB_REPOSITORY: "cheaper-inference/OmniRoute",
  GITHUB_SHA: "a".repeat(40),
  GITHUB_REF: "refs/pull/42/merge",
  GITHUB_EVENT_NAME: "pull_request",
};
const pr = {
  number: 42,
  head: { sha: "b".repeat(40), repo: { full_name: "contributor/OmniRoute" } },
  base: { sha: "c".repeat(40), repo: { full_name: env.GITHUB_REPOSITORY } },
};

test("the reusable scan preserves four languages and finite activation targets", () => {
  assert.deepEqual(Object.keys(workflow.on), ["workflow_call"]);
  assert.deepEqual(policy.targetBranches, ["main", activeRelease]);
  assert.deepEqual(workflow.jobs.analyze.strategy.matrix.language, [
    "actions",
    "c-cpp",
    "javascript-typescript",
    "python",
  ]);
  assert.equal(workflow.jobs.analyze.strategy["fail-fast"], false);
  assert.equal(workflow.on.pull_request_target, undefined);
  assert.equal(workflow.on.workflow_dispatch, undefined);
});

for (const target of ["main", activeRelease]) {
  test(`the current finite CodeQL targets admit PR, push and merge-group events for ${target}`, () => {
    assert.doesNotThrow(() =>
      assertCodeqlTarget(
        { GITHUB_EVENT_NAME: "pull_request" },
        { pull_request: { base: { ref: target } } },
        policy
      )
    );
    assert.doesNotThrow(() =>
      assertCodeqlTarget(
        { GITHUB_EVENT_NAME: "push", GITHUB_REF: `refs/heads/${target}` },
        {},
        policy
      )
    );
    assert.doesNotThrow(() =>
      assertCodeqlTarget(
        { GITHUB_EVENT_NAME: "merge_group" },
        { merge_group: { base_ref: `refs/heads/${target}` } },
        policy
      )
    );
  });
}

test("onboarding the active release does not admit arbitrary release or feature branches", () => {
  for (const target of ["release/v0.0.0", "release/v999.0.0", "feat/unreviewed"]) {
    assert.throws(
      () =>
        assertCodeqlTarget(
          { GITHUB_EVENT_NAME: "pull_request" },
          { pull_request: { base: { ref: target } } },
          policy
        ),
      /SCAN_BRANCH_NOT_ONBOARDED/
    );
  }
});

test("fork extraction uses a hosted runner with no project build or inherited secrets", () => {
  const job = workflow.jobs.analyze;
  assert.equal(job["runs-on"], "ubuntu-latest");
  assert.deepEqual(job.strategy.matrix["build-mode"], ["none"]);
  assert.deepEqual(job.permissions, {
    contents: "read",
    actions: "read",
    "security-events": "write",
  });
  assert.equal(
    job.steps.some((step) => /npm |build:|\bnext build\b/.test(step.run ?? "")),
    false
  );
  assert.equal(
    job.steps.some((step) => JSON.stringify(step).includes("secrets.")),
    false
  );
  assert.equal(job.steps[0].with["persist-credentials"], false);
  for (const step of job.steps.filter((step) => step.uses))
    assert.match(step.uses, /@[a-f0-9]{40}$/);
  const preflight = job.steps.findIndex((step) => step.run?.endsWith("producer.mjs preflight"));
  const init = job.steps.findIndex((step) => step.uses?.startsWith("github/codeql-action/init@"));
  assert.ok(preflight >= 0 && preflight < init);
});

test("Default fork HOLD and Advanced fork identity are distinct contracts", () => {
  assert.throws(() => resolveCodeqlContext(env, { pull_request: pr }), /SCAN_FORK_UNSUPPORTED/);
  const context = resolveCodeqlContext(env, { pull_request: pr }, { allowForks: true });
  assert.equal(context.headRepository, "contributor/OmniRoute");
  const live = { ...pr, state: "open", merge_commit_sha: env.GITHUB_SHA };
  assert.doesNotThrow(() => assertCurrentContext(context, live));
  assert.throws(
    () =>
      assertCurrentContext(context, {
        ...live,
        head: { ...pr.head, repo: { full_name: "other/repo" } },
      }),
    /CONTEXT_REPOSITORY_MOVED/
  );
});

test("a pending fixture cannot approve a candidate regardless of the installed policy state", () => {
  const pending = structuredClone(policy);
  pending.activationStatus = "PENDING_DEFAULT_SETUP_TRANSITION";
  pending.reviewedSetup.updated_at = null;
  pending.reviewedSetup.observedAt = null;
  assert.throws(
    () => assertCodeqlSetup(pending.reviewedSetup, pending),
    /SCAN_SETUP_TRANSITION_PENDING/
  );
});

test("the installed policy is either an explicitly pending proposal or a complete activation record", () => {
  assert.equal(policy.setup, "advanced");
  assert.ok(
    ["PENDING_DEFAULT_SETUP_TRANSITION", "READY_AFTER_ADMIN_READBACK"].includes(
      policy.activationStatus
    )
  );
  if (policy.activationStatus === "PENDING_DEFAULT_SETUP_TRANSITION") {
    assert.throws(
      () => assertCodeqlSetup(policy.reviewedSetup, policy),
      /SCAN_SETUP_TRANSITION_PENDING/
    );
  } else {
    assert.ok(Number.isFinite(Date.parse(policy.reviewedSetup.observedAt)));
    assert.doesNotThrow(() => assertCodeqlSetup(policy.reviewedSetup, policy));
  }
});

test("an activation label without readback data and an unknown state remain closed", () => {
  const missingDate = structuredClone(policy);
  missingDate.activationStatus = "READY_AFTER_ADMIN_READBACK";
  missingDate.reviewedSetup.updated_at = null;
  missingDate.reviewedSetup.observedAt = null;
  assert.throws(
    () => assertCodeqlSetup(missingDate.reviewedSetup, missingDate),
    /SCAN_SETUP_READBACK_INVALID/
  );
  const unknown = { ...policy, activationStatus: "UNREVIEWED" };
  assert.throws(
    () => assertCodeqlSetup(unknown.reviewedSetup, unknown),
    /SCAN_SETUP_TRANSITION_PENDING/
  );
});

test("the workflow matrix supplies exactly the fields expected in the upload environment", () => {
  const matrix = workflow.jobs.analyze.strategy.matrix;
  assert.deepEqual(
    matrix.include,
    matrix.language.map((language) => ({ language, category: `/language:${language}` }))
  );
  const init = workflow.jobs.analyze.steps.find((step) =>
    step.uses?.startsWith("github/codeql-action/init@")
  );
  const analyze = workflow.jobs.analyze.steps.find((step) => step.id === "analyze");
  assert.equal(init.with.languages, "${{ matrix.language }}");
  assert.equal(init.with["build-mode"], "${{ matrix.build-mode }}");
  assert.equal(analyze.with.category, "${{ matrix.category }}");
  assert.equal(analyze.with["wait-for-processing"], true);
});

test("an activated Advanced fixture requires exact merge analyses and all categories", () => {
  const active = structuredClone(policy);
  active.activationStatus = "READY_AFTER_ADMIN_READBACK";
  active.reviewedSetup.updated_at = "2026-10-30T18:00:00Z";
  active.reviewedSetup.observedAt = "2026-10-30T18:00:00Z";
  const context = resolveCodeqlContext(env, { pull_request: pr }, { allowForks: true });
  const analyses = active.languages.map((language, i) => ({
    id: i + 1,
    ref: context.ref,
    commit_sha: context.sha,
    category: `/language:${language}`,
    analysis_key: active.analysisKey,
    created_at: "2026-10-30T18:05:00Z",
    error: "",
    warning: "",
    rules_count: active.minimumRules[language],
    results_count: 0,
    tool: { name: "CodeQL", version: "2.27.3" },
    environment: JSON.stringify({
      language,
      category: `/language:${language}`,
      "build-mode": "none",
    }),
  }));
  const sarifs = Object.fromEntries(
    analyses.map((analysis) => [
      analysis.id,
      {
        version: "2.1.0",
        runs: [
          {
            tool: { driver: { name: "CodeQL", semanticVersion: "2.27.3" } },
            automationDetails: { id: `${analysis.category}/` },
            versionControlProvenance: [
              {
                repositoryUri: `https://github.com/${context.repository}`,
                branch: context.ref,
                revisionId: context.sha,
              },
            ],
            results: [],
          },
        ],
      },
    ])
  );
  const data = {
    context,
    policy: active,
    setup: active.reviewedSetup,
    analyses,
    sarifs,
    alerts: [],
    baseline: 6,
  };
  assert.equal(evaluateCodeqlCandidate(data).verdict, "PASS");
  data.analyses[0].analysis_key = "dynamic/github-code-scanning/codeql:analyze";
  assert.throws(() => evaluateCodeqlCandidate(data), /SCAN_ANALYSIS_ORIGIN_CHANGED/);
});

test("merge-group identity must match the queue commit, not the preceding PR", () => {
  const mergeEnv = {
    ...env,
    GITHUB_EVENT_NAME: "merge_group",
    GITHUB_REF: "refs/heads/gh-readonly-queue/main/pr-42",
  };
  const event = { merge_group: { head_sha: env.GITHUB_SHA, base_sha: pr.base.sha } };
  assert.equal(resolveCodeqlContext(mergeEnv, event).sha, env.GITHUB_SHA);
  assert.throws(
    () =>
      resolveCodeqlContext(mergeEnv, {
        merge_group: { ...event.merge_group, head_sha: pr.head.sha },
      }),
    /CONTEXT_MERGE_GROUP_INVALID/
  );
});
