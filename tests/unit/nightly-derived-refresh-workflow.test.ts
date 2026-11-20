// Static guards for the CI wiring of plan "derived numbers and texts resolved only at release"
// (2026-11-13): the nightly derived-refresh PR and the pr-mode diff base of the docs jobs.
import test from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
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

test("nightly refresh: the PR token is a robot secret (dedicated, else the i18n refresh one) with a documented GITHUB_TOKEN fallback", () => {
  assert.equal(
    publish?.env?.GH_TOKEN,
    "${{ secrets.DERIVED_REFRESH_PR_TOKEN || secrets.I18N_REFRESH_TOKEN || github.token }}"
  );
  assert.equal(
    publish?.env?.HAS_PR_TOKEN,
    "${{ secrets.DERIVED_REFRESH_PR_TOKEN != '' || secrets.I18N_REFRESH_TOKEN != '' }}"
  );
  assert.match(read(NIGHTLY), /does not trigger CI/);
  assert.match(
    publish?.run ?? "",
    /neither \\`DERIVED_REFRESH_PR_TOKEN\\` nor \\`I18N_REFRESH_TOKEN\\` is set/
  );
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
  // The robot's tip: authored AND committed by the bot (an amend by hand changes the committer).
  assert.match(
    run,
    /\[ "\$\(git log -1 --format='%ae %ce' FETCH_HEAD\)" = "\$BOT_EMAIL \$BOT_EMAIL" \]/
  );
  assert.match(noDiff, /if robot_tip; then\n\s+gh pr close "\$STALE"/);
  assert.match(noDiff, /gh pr close "\$STALE"/);
  assert.match(noDiff, /has commits pushed by hand; left open/);
  assert.doesNotMatch(noDiff, /--delete-branch/, "the robot branch is rebuilt on the next diff");
});

// --- behavior of the step scripts, run for real with a fake `gh` ---------------------------

const BOT_EMAIL = "41898282+github-actions[bot]@users.noreply.github.com";

function sh(cwd: string, cmd: string, args: string[], env: NodeJS.ProcessEnv = {}) {
  const res = spawnSync(cmd, args, { cwd, encoding: "utf8", env: { ...process.env, ...env } });
  assert.equal(res.status, 0, `${cmd} ${args.join(" ")}: ${res.stderr}`);
  return res.stdout.trim();
}

/** Writes an executable fake `gh` into `bin` that runs `body` (bash) and logs its argv. */
function fakeGh(bin: string, body: string) {
  fs.mkdirSync(bin, { recursive: true });
  const gh = path.join(bin, "gh");
  fs.writeFileSync(gh, `#!/usr/bin/env bash\necho "$*" >> "$GH_LOG"\n${body}\n`);
  fs.chmodSync(gh, 0o755);
}

function runStep(script: string, cwd: string, dir: string, env: Record<string, string>) {
  const files = {
    GITHUB_OUTPUT: path.join(dir, "output"),
    GITHUB_STEP_SUMMARY: path.join(dir, "summary"),
    GH_LOG: path.join(dir, "gh.log"),
  };
  for (const f of Object.values(files)) fs.writeFileSync(f, "");
  const res = spawnSync("bash", ["-e", "-c", script], {
    cwd,
    encoding: "utf8",
    env: {
      PATH: `${path.join(dir, "bin")}:${process.env.PATH}`,
      HOME: dir,
      GIT_CONFIG_NOSYSTEM: "1",
      GITHUB_REPOSITORY: "cheaper-inference/OmniRoute",
      RUNNER_TEMP: dir,
      ...files,
      ...env,
    },
  });
  const read = (f: string) => fs.readFileSync(f, "utf8");
  return {
    status: res.status,
    stderr: res.stderr,
    output: read(files.GITHUB_OUTPUT),
    summary: read(files.GITHUB_STEP_SUMMARY),
    gh: read(files.GH_LOG),
  };
}

const resolveStep = steps.find((s) => s.name?.startsWith("Resolve the active release branch"));

function runResolve(freeze: { fail?: boolean; out?: string }) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "derived-refresh-resolve-"));
  try {
    fakeGh(
      path.join(dir, "bin"),
      [
        'if [ "$1" = api ]; then printf "main\\nrelease/v3.8.53\\nrelease/v3.8.54\\n"; exit 0; fi',
        'if [ "$1 $2" = "issue list" ] && printf "%s\\n" "$@" | grep -qx release-freeze; then',
        `  ${freeze.fail ? "exit 1" : `printf ${JSON.stringify(freeze.out ?? "")}`}`,
        "fi",
      ].join("\n")
    );
    return runStep(resolveStep?.run ?? "", dir, dir, { GH_TOKEN: "x" });
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

test("nightly refresh: a failed release-freeze lookup stops the run instead of reading 'not frozen'", () => {
  const failed = runResolve({ fail: true });
  assert.notEqual(failed.status, 0, "the lookup failure must fail the step");
  assert.doesNotMatch(failed.output, /skip=false/);

  const frozen = runResolve({ out: "12\t🔒 release-freeze: v3.8.54 in progress\n" });
  assert.equal(frozen.status, 0, frozen.stderr);
  assert.match(frozen.output, /^skip=true$/m);
  const other = runResolve({ out: "13\t🔒 release-freeze: v3.8.5 in progress\n" });
  assert.match(other.output, /^skip=false$/m, "v3.8.5 does not freeze v3.8.54");
  const none = runResolve({ out: "" });
  assert.equal(none.status, 0, none.stderr);
  assert.match(none.output, /^skip=false$/m);
  assert.match(none.output, /^branch=release\/v3\.8\.54$/m);
});

/**
 * An origin with release/v1.0.0 and the robot branch on top of it. `tip` decides who made the
 * robot branch's tip: the bot alone, or a maintainer who ran `git commit --amend --no-edit` on
 * the bot commit (Git keeps the bot as author and records the maintainer as committer). Then the
 * publish step runs in a checkout of the release branch, with or without a refreshed file.
 */
function runPublish({ tip, diff }: { tip: "bot" | "amended"; diff: boolean }) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "derived-refresh-publish-"));
  try {
    const origin = path.join(dir, "origin.git");
    const seed = path.join(dir, "seed");
    const work = path.join(dir, "work");
    sh(dir, "git", ["init", "-q", "--bare", origin]);
    sh(dir, "git", ["init", "-q", "-b", "release/v1.0.0", seed]);
    const bot = ["-c", "user.name=github-actions[bot]", "-c", `user.email=${BOT_EMAIL}`];
    const human = ["-c", "user.name=Maintainer", "-c", "user.email=maintainer@example.com"];
    fs.writeFileSync(path.join(seed, "facts.md"), "providers: 1\n");
    sh(seed, "git", ["add", "-A"]);
    sh(seed, "git", [...human, "commit", "-q", "-m", "release"]);
    sh(seed, "git", ["push", "-q", origin, "release/v1.0.0"]);
    sh(seed, "git", ["switch", "-q", "-c", "chore/derived-refresh"]);
    fs.writeFileSync(path.join(seed, "facts.md"), "providers: 2\n");
    sh(seed, "git", ["add", "-A"]);
    sh(seed, "git", [...bot, "commit", "-q", "-m", "chore(docs): refresh derived numbers"]);
    if (tip === "amended") {
      fs.writeFileSync(path.join(seed, "facts.md"), "providers: 2 (hand fix)\n");
      sh(seed, "git", ["add", "-A"]);
      sh(seed, "git", [...human, "commit", "-q", "--amend", "--no-edit"]);
      assert.equal(sh(seed, "git", ["log", "-1", "--format=%ae"]), BOT_EMAIL);
    }
    sh(seed, "git", ["push", "-q", origin, "chore/derived-refresh"]);
    const before = sh(dir, "git", ["--git-dir", origin, "rev-parse", "chore/derived-refresh"]);

    sh(dir, "git", ["clone", "-q", "-b", "release/v1.0.0", `file://${origin}`, work]);
    if (diff) fs.writeFileSync(path.join(work, "facts.md"), "providers: 3\n");

    fakeGh(
      path.join(dir, "bin"),
      [
        'case "$1 $2" in',
        '  "auth setup-git") exit 0 ;;',
        '  "pr list") if printf "%s\\n" "$@" | grep -q baseRefName; then echo "7 release/v1.0.0"; else echo 7; fi ;;',
        "esac",
      ].join("\n")
    );
    const result = runStep(publish?.run ?? "", work, dir, {
      GH_TOKEN: "x",
      HAS_PR_TOKEN: "true",
      BASE: "release/v1.0.0",
      BASE_RED_ISSUE: "",
      RUN_URL: "https://example.invalid/run/1",
      REFRESH_BRANCH: "chore/derived-refresh",
      BOT_NAME: "github-actions[bot]",
      BOT_EMAIL,
    });
    const after = sh(dir, "git", ["--git-dir", origin, "rev-parse", "chore/derived-refresh"]);
    return { ...result, pushed: before !== after };
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

test("nightly refresh: a hand fix amended onto the bot commit is never overwritten", () => {
  const amended = runPublish({ tip: "amended", diff: true });
  assert.equal(amended.status, 0, amended.stderr);
  assert.equal(amended.pushed, false, "the amended tip keeps its hand fix");
  assert.match(amended.summary, /commits pushed by hand; not overwriting them/);
  assert.doesNotMatch(amended.gh, /^pr (edit|create)/m);

  const robot = runPublish({ tip: "bot", diff: true });
  assert.equal(robot.status, 0, robot.stderr);
  assert.equal(robot.pushed, true, "the robot's own tip is rebuilt");
  assert.match(robot.gh, /^pr edit 7 /m);
});

test("nightly refresh: a stale refresh PR whose bot commit was amended by hand is not closed", () => {
  const amended = runPublish({ tip: "amended", diff: false });
  assert.equal(amended.status, 0, amended.stderr);
  assert.doesNotMatch(amended.gh, /^pr close/m);
  assert.match(amended.summary, /has commits pushed by hand; left open/);

  const robot = runPublish({ tip: "bot", diff: false });
  assert.equal(robot.status, 0, robot.stderr);
  assert.match(robot.gh, /^pr close 7 /m);
});

test("nightly refresh: the refresh step gets a translation engine, so it never writes __MISSING__ markers", () => {
  const refresh = stepRunning("npm run release:refresh-derived -- --profile=nightly") as {
    env?: Record<string, string>;
    run: string;
  };
  assert.ok(refresh, "the refresh step exists");
  for (const key of [
    "OMNIROUTE_TRANSLATION_API_KEY",
    "OMNIROUTE_TRANSLATION_API_URL",
    "OMNIROUTE_TRANSLATION_MODEL",
  ]) {
    assert.ok(refresh.env?.[key], `${key} is passed to the refresh`);
  }
  // LLM chain when fully configured, else the Google engine (no endpoint needed on a hosted runner).
  assert.match(refresh.run, /OMNIROUTE_TRANSLATION_ENGINE="llm"/);
  assert.match(refresh.run, /OMNIROUTE_TRANSLATION_ENGINE="google"/);
  assert.ok(
    refresh.run.indexOf("OMNIROUTE_TRANSLATION_ENGINE") <
      refresh.run.indexOf("release:refresh-derived"),
    "the engine is chosen before the refresh runs"
  );
});
