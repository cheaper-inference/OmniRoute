// RC06: run the workflow's actual CHANGELOG step against an unchanged candidate
// before and after its remote-tracking base advances. No network or install is needed.
import assert from "node:assert/strict";
import { execFileSync, spawnSync } from "node:child_process";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { delimiter, dirname, join } from "node:path";
import { test, type TestContext } from "node:test";
import { load } from "js-yaml";
import { resolveChangelogComparisonBase } from "../../scripts/quality/changelog-comparison-base.mjs";

const ROOT = new URL("../../", import.meta.url);
const CHECKER = "scripts/check/check-changelog-integrity.mjs";
const RESOLVER = "scripts/quality/changelog-comparison-base.mjs";
const BASE_BRANCH = "release/v3.8.55";
const ORIGINAL = "# Changelog\n- retained original bullet\n- retained second bullet\n";
const CANDIDATE = `${ORIGINAL}- candidate addition\n`;
const ADVANCED = `${ORIGINAL}- sibling merged after the event\n`;

type WorkflowStep = { name?: string; run?: string; env?: Record<string, string> };
type Workflow = { jobs: Record<string, { steps: WorkflowStep[] }> };

function workflowStep() {
  const workflow = load(
    readFileSync(new URL(".github/workflows/quality.yml", ROOT), "utf8")
  ) as Workflow;
  const steps = workflow.jobs["merge-integrity"].steps.filter((step) =>
    step.run?.includes("npm run check:changelog-integrity")
  );
  assert.equal(steps.length, 1, "exercise exactly the real merge-integrity CHANGELOG step");
  return steps[0];
}

function fixtureEnv(root: string): NodeJS.ProcessEnv {
  const env = { ...process.env };
  for (const key of Object.keys(env)) {
    if (/^(?:GIT_|GITHUB_|CHANGELOG_|ALLOW_CHANGELOG_REMOVALS$)/.test(key)) delete env[key];
  }
  const config = join(root, "empty-gitconfig");
  writeFileSync(config, "");
  return {
    ...env,
    GIT_CONFIG_NOSYSTEM: "1",
    GIT_CONFIG_GLOBAL: config,
    GIT_TERMINAL_PROMPT: "0",
    GIT_AUTHOR_NAME: "Changelog Base Test",
    GIT_AUTHOR_EMAIL: "changelog-base@example.invalid",
    GIT_COMMITTER_NAME: "Changelog Base Test",
    GIT_COMMITTER_EMAIL: "changelog-base@example.invalid",
    PATH: `${dirname(process.execPath)}${delimiter}${process.env.PATH || ""}`,
    CHANGELOG_TEST_NODE: process.execPath,
  };
}

function runWorkflowStep(
  root: string,
  env: NodeJS.ProcessEnv,
  candidateSha: string,
  baseSha: string,
  eventFields: Record<string, string> = {}
) {
  const step = workflowStep();
  const fields: Record<string, string> = {
    "github.event_name": "pull_request",
    "github.sha": candidateSha,
    "github.ref": "refs/pull/1/merge",
    "github.event.pull_request.base.sha": baseSha,
    "github.event.merge_group.base_sha": "",
    "github.event.before": "",
    "steps.candidate.outputs.BASE_SHA": "",
    ...eventFields,
  };
  const stepEnv: NodeJS.ProcessEnv = {
    ...env,
    GITHUB_EVENT_NAME: fields["github.event_name"],
    GITHUB_SHA: candidateSha,
    GITHUB_REF: fields["github.ref"],
    GITHUB_BASE_REF: BASE_BRANCH,
  };
  for (const [name, expression] of Object.entries(step.env || {})) {
    const field = /^\$\{\{\s*([\w.]+)\s*\}\}$/.exec(expression);
    assert.ok(field, `the fixture renders direct GitHub fields, not code: ${expression}`);
    assert.ok(Object.hasOwn(fields, field[1]), `model the actual event field ${field[1]}`);
    stepEnv[name] = fields[field[1]];
  }
  const command = "npm run check:changelog-integrity";
  assert.equal(step.run?.split(command).length, 2);
  // Execute the checker itself instead of starting npm: npm's package script is
  // exactly this entrypoint. The workflow's base-selection shell stays unchanged.
  const run = step.run!.replace(command, '"$CHANGELOG_TEST_NODE" ' + CHECKER);
  return spawnSync("bash", ["-euo", "pipefail", "-c", run], {
    cwd: root,
    env: stepEnv,
    encoding: "utf8",
    timeout: 10000,
  });
}

function makeRepo(t: TestContext, baseText = ORIGINAL) {
  const root = mkdtempSync(join(tmpdir(), "changelog-event-base-"));
  t.after(() => rmSync(root, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 }));
  const env = fixtureEnv(root);
  const git = (...args: string[]) =>
    execFileSync("git", args, { cwd: root, env, encoding: "utf8", timeout: 10000 }).trim();
  const commit = (text: string, message: string) => {
    writeFileSync(join(root, "CHANGELOG.md"), text);
    git("add", ".");
    git("commit", "--quiet", "-m", message);
    return git("rev-parse", "HEAD");
  };
  for (const path of [CHECKER, RESOLVER]) {
    mkdirSync(dirname(join(root, path)), { recursive: true });
    writeFileSync(join(root, path), readFileSync(new URL(path, ROOT)));
  }
  mkdirSync(join(root, "config/release"), { recursive: true });
  writeFileSync(
    join(root, "config/release/changelog-reconciliations.json"),
    JSON.stringify({ schemaVersion: 1, reconciliations: [] }) + "\n"
  );
  const pkg = JSON.parse(readFileSync(new URL("package.json", ROOT), "utf8"));
  assert.equal(pkg.scripts["check:changelog-integrity"], `node ${CHECKER}`);
  git("init", "--quiet", "--initial-branch=fixture-base");
  const baseSha = commit(baseText, "original base");
  git("update-ref", `refs/remotes/origin/${BASE_BRANCH}`, baseSha);
  return { root, env, git, commit, baseSha };
}

test("an unchanged PR candidate remains green after its base branch advances", (t) => {
  const { root, env, git, commit, baseSha } = makeRepo(t);
  git("switch", "--quiet", "-c", "fixture-candidate");
  const candidateSha = commit(CANDIDATE, "candidate addition");
  const firstRun = runWorkflowStep(root, env, candidateSha, baseSha);
  assert.equal(firstRun.status, 0, `${firstRun.stdout}\n${firstRun.stderr}`);

  git("switch", "--quiet", "-c", "fixture-sibling", baseSha);
  const advancedSha = commit(ADVANCED, "sibling merged after candidate creation");
  git("update-ref", `refs/remotes/origin/${BASE_BRANCH}`, advancedSha);
  git("switch", "--quiet", "--detach", candidateSha);
  assert.equal(git("rev-parse", "HEAD"), candidateSha);
  assert.equal(readFileSync(join(root, "CHANGELOG.md"), "utf8"), CANDIDATE);
  assert.equal(git("rev-parse", `origin/${BASE_BRANCH}`), advancedSha);

  const pinned = spawnSync(process.execPath, [CHECKER], {
    cwd: root,
    env: { ...env, CHANGELOG_BASE_REF: baseSha },
    encoding: "utf8",
    timeout: 10000,
  });
  assert.equal(pinned.status, 0, `the captured base has no lost bullet\n${pinned.stderr}`);
  const rerun = runWorkflowStep(root, env, candidateSha, baseSha);
  assert.equal(
    rerun.status,
    0,
    `an unchanged candidate must use its captured event base\n${rerun.stdout}\n${rerun.stderr}`
  );
  assert.match(rerun.stdout, new RegExp(`OK.*${baseSha}`));

  const newEvent = runWorkflowStep(root, env, candidateSha, advancedSha);
  assert.equal(newEvent.status, 1, `${newEvent.stdout}\n${newEvent.stderr}`);
  assert.match(newEvent.stderr, /sibling merged after the event/);
});

test("captured bases still reject original and duplicate bullet losses", (t) => {
  const repeated = "- repeated bullet\n";
  const baseText = ORIGINAL + repeated + repeated;
  const { root, env, baseSha } = makeRepo(t, baseText);
  for (const changed of [baseText.replace("- retained second bullet\n", ""), ORIGINAL + repeated]) {
    writeFileSync(join(root, "CHANGELOG.md"), changed);
    const result = runWorkflowStep(root, env, baseSha, baseSha);
    assert.equal(result.status, 1, `${result.stdout}\n${result.stderr}`);
    assert.match(result.stderr, /1 bullet\(s\).*MISSING/s);
  }
  writeFileSync(join(root, "CHANGELOG.md"), baseText + "- additive change\n");
  const additive = runWorkflowStep(root, env, baseSha, baseSha);
  assert.equal(additive.status, 0, `${additive.stdout}\n${additive.stderr}`);
});

test("the workflow transports merge-group, push and manual comparison bases", (t) => {
  const { root, env, commit, baseSha } = makeRepo(t);
  const candidateSha = commit(CANDIDATE, "candidate addition");
  const foreignBase = "f".repeat(40);
  for (const [eventName, eventFields, expected] of [
    ["merge_group", { "github.event.merge_group.base_sha": baseSha }, baseSha],
    ["push", { "github.event.before": baseSha }, baseSha],
    ["workflow_dispatch", {}, `${candidateSha}^1`],
  ] as const) {
    const result = runWorkflowStep(root, env, candidateSha, foreignBase, {
      "github.event_name": eventName,
      "github.ref": "refs/heads/main",
      ...eventFields,
    });
    assert.equal(result.status, 0, `${eventName}: ${result.stdout}\n${result.stderr}`);
    assert.ok(result.stdout.includes(`vs ${expected}.`), result.stdout);
  }
});

test("queue push and dispatch retain batch bases and base-check self-comparison", (t) => {
  const { root, env, commit, baseSha } = makeRepo(t);
  const candidateSha = commit(CANDIDATE, "candidate addition");
  for (const eventName of ["push", "workflow_dispatch"]) {
    for (const [ref, queueBase] of [
      [`refs/heads/omni-queue/release-v3.8.55/b1-${candidateSha.slice(0, 12)}`, baseSha],
      [
        `refs/heads/omni-queue/release-v3.8.55/basecheck-${candidateSha.slice(0, 12)}`,
        candidateSha,
      ],
    ]) {
      const result = runWorkflowStep(root, env, candidateSha, "", {
        "github.event_name": eventName,
        "github.ref": ref,
        "github.event.before": "0".repeat(40),
        "steps.candidate.outputs.BASE_SHA": queueBase,
      });
      assert.equal(result.status, 0, `${eventName}: ${result.stdout}\n${result.stderr}`);
      assert.ok(result.stdout.includes(`vs ${queueBase}.`), result.stdout);
    }
  }
  const pr = runWorkflowStep(root, env, candidateSha, baseSha, {
    "steps.candidate.outputs.BASE_SHA": "f".repeat(40),
  });
  assert.equal(pr.status, 0, `${pr.stdout}\n${pr.stderr}`);
  assert.ok(pr.stdout.includes(`vs ${baseSha}.`), pr.stdout);
});

test("missing event bases and unreadable commits stop before any local fallback", (t) => {
  const { root, env, baseSha } = makeRepo(t);
  for (const [eventName, eventRef, error] of [
    ["pull_request", "refs/pull/1/merge", /pull-request base SHA/],
    ["merge_group", "refs/heads/main", /merge-group base SHA/],
    ["push", "refs/heads/main", /push before SHA/],
    ["push", "refs/heads/omni-queue/release-v3.8.55/b1", /omni-queue candidate base SHA/],
    [
      "workflow_dispatch",
      "refs/heads/omni-queue/release-v3.8.55/b1",
      /omni-queue candidate base SHA/,
    ],
  ] as const) {
    const result = runWorkflowStep(root, env, baseSha, "", {
      "github.event_name": eventName,
      "github.ref": eventRef,
      "github.event.before": eventName === "push" && eventRef === "refs/heads/main" ? "" : baseSha,
    });
    assert.equal(result.status, 1, `${eventName}: ${result.stdout}\n${result.stderr}`);
    assert.match(result.stderr, /\[changelog-comparison\] Missing or invalid immutable/);
    assert.match(result.stderr, error);
    assert.doesNotMatch(result.stdout, /\[changelog-integrity\]/);
  }
  for (const fields of [
    { "github.event.pull_request.base.sha": "f".repeat(40) },
    { "github.event_name": "workflow_dispatch", "github.ref": "refs/heads/main" },
  ]) {
    const result = runWorkflowStep(root, env, baseSha, baseSha, fields);
    assert.equal(result.status, 1, `${result.stdout}\n${result.stderr}`);
    assert.match(result.stderr, /not readable at explicit base/);
    assert.doesNotMatch(result.stdout, /SKIP/);
  }
});

test("invalid candidate and event SHAs cannot select a branch or revision expression", () => {
  const candidateSha = "c".repeat(40);
  for (const invalid of [
    undefined,
    "",
    "0".repeat(40),
    "1234567",
    "A".repeat(40),
    "origin/main",
    `${candidateSha}^1`,
    ` ${candidateSha}`,
  ]) {
    assert.throws(
      () =>
        resolveChangelogComparisonBase({ eventName: "workflow_dispatch", candidateSha: invalid }),
      /Missing or invalid immutable candidate SHA/
    );
    for (const [eventName, field] of [
      ["pull_request", "pullRequestBaseSha"],
      ["merge_group", "mergeGroupBaseSha"],
      ["push", "pushBeforeSha"],
    ]) {
      assert.throws(
        () => resolveChangelogComparisonBase({ eventName, candidateSha, [field]: invalid }),
        /Missing or invalid immutable/
      );
    }
    for (const eventName of ["push", "workflow_dispatch"]) {
      assert.throws(
        () =>
          resolveChangelogComparisonBase({
            eventName,
            candidateSha,
            eventRef: "refs/heads/omni-queue/release-v3.8.55/b1",
            queueCandidateBaseSha: invalid,
            pushBeforeSha: "b".repeat(40),
          }),
        /Missing or invalid immutable omni-queue candidate base SHA/
      );
    }
  }
});

test("unsupported events cannot select a comparison base", () => {
  for (const eventName of ["schedule", "pull_request_target", ""]) {
    assert.throws(
      () => resolveChangelogComparisonBase({ eventName, candidateSha: "c".repeat(40) }),
      /Unsupported CHANGELOG comparison event/
    );
  }
});

test("workflow binds the captured event fields and aborts when resolution fails", () => {
  const step = workflowStep();
  assert.deepEqual(step.env, {
    CHANGELOG_BASE_REF: "${{ steps.candidate.outputs.BASE_SHA }}",
    CHANGELOG_EVENT_NAME: "${{ github.event_name }}",
    CHANGELOG_CANDIDATE_SHA: "${{ github.sha }}",
    CHANGELOG_EVENT_REF: "${{ github.ref }}",
    CHANGELOG_PR_BASE_SHA: "${{ github.event.pull_request.base.sha }}",
    CHANGELOG_MERGE_GROUP_BASE_SHA: "${{ github.event.merge_group.base_sha }}",
    CHANGELOG_PUSH_BEFORE_SHA: "${{ github.event.before }}",
  });
  assert.match(step.run!, /^set -euo pipefail\n/);
  assert.match(
    step.run!,
    /CHANGELOG_BASE_REF="\$\(node scripts\/quality\/changelog-comparison-base\.mjs\)"\nexport CHANGELOG_BASE_REF\nnpm run check:changelog-integrity/
  );
  assert.doesNotMatch(step.run!, /\|\|\s*(?:true|:)|origin\/|GITHUB_BASE_REF/);
});
