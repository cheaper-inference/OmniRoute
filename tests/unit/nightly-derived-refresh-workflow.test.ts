// Static guards for the CI wiring of plan "derived numbers and texts resolved only at release"
// (2026-11-13): the nightly derived-refresh PR and the pr-mode diff base of the docs jobs.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { load as parseYaml } from "js-yaml";

type Step = {
  name?: string;
  uses?: string;
  if?: string;
  run?: string;
  env?: Record<string, string>;
  with?: Record<string, unknown>;
};
type Job = {
  if?: string;
  permissions?: Record<string, string>;
  env?: Record<string, string>;
  steps: Step[];
};
type Workflow = {
  on: Record<string, unknown>;
  permissions?: Record<string, string>;
  concurrency?: { group: string; "cancel-in-progress": boolean };
  jobs: Record<string, Job>;
};

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const WORKFLOWS = path.join(ROOT, ".github/workflows");
const read = (name: string) => fs.readFileSync(path.join(WORKFLOWS, name), "utf8");
const load = (name: string) => parseYaml(read(name)) as Workflow;

const NIGHTLY = "nightly-derived-refresh.yml";
const nightly = load(NIGHTLY);
const job = nightly.jobs.refresh;
const steps = job.steps;
const stepRunning = (needle: string) => steps.find((s) => (s.run ?? "").includes(needle));
const publish = steps.find((s) => s.name === "Commit, push and open or update the refresh PR");

test("nightly refresh: daily schedule on a cron slot no other workflow uses, plus manual dispatch", () => {
  const schedule = nightly.on.schedule as { cron: string }[];
  assert.equal(schedule.length, 1);
  assert.match(schedule[0].cron, /^\d+ \d+ \* \* \*$/, "daily");
  assert.ok("workflow_dispatch" in nightly.on);
  for (const other of fs
    .readdirSync(WORKFLOWS)
    .filter((f) => /\.ya?ml$/.test(f) && f !== NIGHTLY)) {
    assert.ok(
      !read(other).includes(`cron: "${schedule[0].cron}"`),
      `${other} already runs at ${schedule[0].cron}`
    );
  }
  assert.equal(nightly.concurrency?.["cancel-in-progress"], false);
});

test("nightly refresh: least privilege and no persisted checkout credentials", () => {
  assert.deepEqual(nightly.permissions, { contents: "read" });
  assert.deepEqual(job.permissions, {
    contents: "write",
    "pull-requests": "write",
    issues: "read",
  });
  assert.match(job.if ?? "", /github\.repository == 'cheaper-inference\/OmniRoute'/);
  const checkout = steps.find((s) => (s.uses ?? "").startsWith("actions/checkout@"));
  assert.ok(checkout);
  assert.equal(checkout.with?.["persist-credentials"], false);
  assert.match(checkout.uses ?? "", /@[0-9a-f]{40}$/, "pinned by SHA");
  assert.equal(checkout.with?.ref, "${{ steps.base.outputs.branch }}");
});

test("nightly refresh: targets the highest release/vX.Y.Z and skips a frozen one", () => {
  const resolve = steps.find((s) => s.name?.startsWith("Resolve the active release branch"));
  assert.ok(resolve?.run);
  assert.match(
    resolve.run,
    /grep -E '\^release\/v\[0-9\]\+\\\.\[0-9\]\+\\\.\[0-9\]\+\$' \| sort -V \| tail -1/
  );
  assert.match(resolve.run, /--label release-freeze --state open/);
  for (const s of steps.slice(1)) {
    assert.equal(
      s.if,
      "steps.base.outputs.skip == 'false'",
      `${s.name ?? s.uses} must skip a frozen base`
    );
  }
});

test("nightly refresh: installs with the retrying npm ci and runs the nightly profile", () => {
  assert.ok(steps.some((s) => s.uses === "./.github/actions/npm-ci-retry"));
  assert.ok(stepRunning("npm run release:refresh-derived -- --profile=nightly"));
});

test("nightly refresh: one robot branch, lease-protected push, ONE PR, never a merge", () => {
  assert.equal(job.env?.REFRESH_BRANCH, "chore/derived-refresh");
  assert.equal(job.env?.BOT_EMAIL, "41898282+github-actions[bot]@users.noreply.github.com");
  assert.ok(publish?.run);
  const run = publish.run;
  assert.match(run, /git push -q --force-with-lease="\$\{REFRESH_BRANCH\}:\$\{REMOTE_SHA\}"/);
  assert.doesNotMatch(run, /git push[^\n]*--force(?!-with-lease)/, "plain --force is never used");
  assert.match(
    run,
    /gh pr list --repo "\$GITHUB_REPOSITORY" --head "\$REFRESH_BRANCH" --state open/
  );
  assert.match(run, /gh pr create /);
  assert.match(run, /gh pr edit "\$NUM"/);
  assert.match(run, /commits pushed by hand; not overwriting them/);
  // retarget is verified, Hard Rule #21
  assert.match(run, /--json baseRefName --jq \.baseRefName/);
  const all = read(NIGHTLY);
  assert.doesNotMatch(all, /gh pr merge|--admin|--no-verify/);
  const scripts = steps
    .map((s) => s.run ?? "")
    .join("\n")
    .split("\n")
    .filter((line) => !line.trim().startsWith("#"))
    .join("\n");
  assert.doesNotMatch(
    scripts,
    /Co-Authored-By|Generated with/i,
    "no AI attribution in bot commits/PRs"
  );
});

test("nightly refresh: the PR token is a dedicated secret with a documented GITHUB_TOKEN fallback", () => {
  assert.equal(publish?.env?.GH_TOKEN, "${{ secrets.DERIVED_REFRESH_PR_TOKEN || github.token }}");
  assert.equal(publish?.env?.HAS_PR_TOKEN, "${{ secrets.DERIVED_REFRESH_PR_TOKEN != '' }}");
  assert.match(read(NIGHTLY), /does not trigger CI/);
  assert.match(publish?.run ?? "", /DERIVED_REFRESH_PR_TOKEN\\` secret isn't set/);
});

test("nightly refresh: no expression is interpolated into a run script", () => {
  for (const s of steps) {
    assert.doesNotMatch(s.run ?? "", /\$\{\{/, `${s.name ?? s.uses}: pass values through env:`);
  }
});

test("the refresh branch is a writer branch for the counts gate", async () => {
  const { isDerivedWriterBranch } =
    (await import("../../scripts/check/lib/derivedClaimsDiff.mjs")) as {
      isDerivedWriterBranch: (b: string) => boolean;
    };
  assert.equal(isDerivedWriterBranch(job.env?.REFRESH_BRANCH ?? ""), true);
  assert.equal(isDerivedWriterBranch("feat/chore-derived-refresh"), false);
});

// --- the docs jobs that run the counts gate in pr mode -------------------------------------

const BASE_SHA = "${{ github.event.pull_request.base.sha || github.event.merge_group.base_sha }}";

function assertPrDiffWiring(workflow: Workflow, jobId: string, stepMatch: (s: Step) => boolean) {
  const target = workflow.jobs[jobId];
  assert.ok(target, `${jobId} missing`);
  const checkout = target.steps.find((s) => (s.uses ?? "").startsWith("actions/checkout@"));
  assert.equal(checkout?.with?.["fetch-depth"], 2, `${jobId}: merge commit + its parents`);
  assert.equal(checkout?.with?.["persist-credentials"], false);
  const docs = target.steps.find(stepMatch);
  assert.ok(docs, `${jobId}: no check:docs-all step`);
  assert.equal(docs.run?.trim(), "npm run check:docs-all");
  assert.equal(docs.env?.BASE_SHA, BASE_SHA);
  // A manual dispatch on a feature branch has no PR to diff and a base behind the code by
  // design: pr mode (content invariants only). main and release/v* stay strict.
  assert.equal(docs.env?.OMNIROUTE_GATE_MODE, DISPATCH_FEATURE_PR_MODE);
}

const DISPATCH_FEATURE_PR_MODE =
  "${{ github.event_name == 'workflow_dispatch' && github.ref_name != 'main' && " +
  "!startsWith(github.ref_name, 'release/v') && 'pr' || '' }}";

test("ci.yml docs-sync-strict: depth-2 checkout and BASE_SHA on check:docs-all", () => {
  assertPrDiffWiring(
    load("ci.yml"),
    "docs-sync-strict",
    (s) => s.run?.trim() === "npm run check:docs-all"
  );
});

test("quality.yml docs-gates: depth-2 checkout and BASE_SHA on Docs accuracy", () => {
  assertPrDiffWiring(load("quality.yml"), "docs-gates", (s) =>
    (s.name ?? "").startsWith("Docs accuracy")
  );
});

test("nightly refresh: a run with no diff closes the robot's stale refresh PR, never a hand-pushed one", () => {
  assert.ok(publish?.run);
  const run = publish.run;
  const noDiff = run.slice(
    run.indexOf("if git diff --cached --quiet; then"),
    run.indexOf("CHANGED=")
  );
  assert.match(
    noDiff,
    /gh pr list --repo "\$GITHUB_REPOSITORY" --head "\$REFRESH_BRANCH" --state open/
  );
  assert.match(noDiff, /\[ "\$\(git log -1 --format=%ae FETCH_HEAD\)" = "\$BOT_EMAIL" \]/);
  assert.match(noDiff, /gh pr close "\$STALE"/);
  assert.match(noDiff, /has commits pushed by hand; left open/);
  assert.doesNotMatch(noDiff, /--delete-branch/, "the robot branch is rebuilt on the next diff");
});
