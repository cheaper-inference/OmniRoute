import assert from "node:assert/strict";
import { execFileSync, spawnSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { parse } from "yaml";

type Step = {
  id?: string;
  name?: string;
  uses?: string;
  with?: { ref?: string };
  run?: string;
  env?: Record<string, string>;
};
type Job = { outputs?: Record<string, string>; steps: Step[] };
const root = new URL("../../../", import.meta.url);
const { jobs } = parse(
  readFileSync(new URL(".github/workflows/nightly-compat.yml", root), "utf8")
) as { jobs: Record<string, Job> };
const resolveStep = jobs["resolve-branch"].steps.find((step) => step.id === "branch")!;
const reportStep = jobs.report.steps.find((step) => step.name === "Open or update issue")!;
const fixtureEnv = { ...process.env };
for (const name of execFileSync("git", ["rev-parse", "--local-env-vars"], { encoding: "utf8" })
  .trim()
  .split("\n")) {
  delete fixtureEnv[name];
}

function git(cwd: string, ...args: string[]): string {
  return execFileSync("git", args, { cwd, env: fixtureEnv, encoding: "utf8" }).trim();
}

function runStep(step: Step, cwd: string, env: Record<string, string>, setup = "") {
  assert.ok(step.run);
  const result = spawnSync("bash", ["-c", `${setup}\n${step.run}`], {
    cwd,
    env: { ...fixtureEnv, ...env },
    encoding: "utf8",
  });
  assert.equal(result.error, undefined);
  return result;
}

test("the nightly picks one canonical release commit and pins every checkout to it", (context) => {
  const dir = mkdtempSync(join(tmpdir(), "omni-nightly-compat-ref-"));
  context.after(() => rmSync(dir, { recursive: true, force: true }));
  git(dir, "init", "--quiet");
  function commit(message: string): string {
    git(
      dir,
      "-c",
      "user.name=Fixture",
      "-c",
      "user.email=fixture@example.invalid",
      "-c",
      "commit.gpgsign=false",
      "commit",
      "--quiet",
      "--allow-empty",
      "-m",
      message
    );
    return git(dir, "rev-parse", "HEAD");
  }
  const older = commit("older release");
  const selected = commit("selected release");
  const advanced = commit("new release tip");
  git(dir, "update-ref", "refs/remotes/origin/release/v3.8.9", older);
  git(dir, "update-ref", "refs/remotes/origin/release/v3.8.55", selected);
  git(dir, "update-ref", "refs/remotes/origin/release/v9.0.0-scratch", advanced);

  const outputs = join(dir, "outputs");
  function resolve(input: string) {
    writeFileSync(outputs, "");
    const result = runStep(resolveStep, dir, { INPUT_BRANCH: input, GITHUB_OUTPUT: outputs });
    return { result, outputs: readFileSync(outputs, "utf8") };
  }

  const scheduled = resolve("");
  assert.equal(scheduled.result.status, 0, scheduled.result.stderr);
  assert.equal(scheduled.outputs, `target=release/v3.8.55\nsha=${selected}\n`);

  git(dir, "update-ref", "refs/remotes/origin/release/v3.8.55", advanced);
  assert.equal(git(dir, "rev-parse", `${selected}^{commit}`), selected);
  assert.equal(git(dir, "rev-parse", "refs/remotes/origin/release/v3.8.55"), advanced);
  assert.equal(jobs["resolve-branch"].outputs?.sha, "${{ steps.branch.outputs.sha }}");
  for (const name of ["compat-build-26", "compat-tests"]) {
    const checkout = jobs[name].steps.find((step) => step.uses?.startsWith("actions/checkout@"));
    assert.equal(checkout?.with?.ref, "${{ needs.resolve-branch.outputs.sha }}");
  }

  const explicit = resolve("release/v3.8.9");
  assert.equal(explicit.result.status, 0, explicit.result.stderr);
  assert.equal(explicit.outputs, `target=release/v3.8.9\nsha=${older}\n`);
  for (const ref of ["release/v9.0.0-scratch", "release/v9.0.0", "main"]) {
    const invalid = resolve(ref);
    assert.notEqual(invalid.result.status, 0, ref);
    assert.equal(invalid.outputs, "", ref);
  }
});

const ghFixture = `
gh() {
  if [[ "$1 $2" == "issue list" ]]; then
    : > "$FIXTURE_LISTED"
    printf "%s\\n" "$FIXTURE_EXISTING"
  elif [[ "$1" == "api" ]]; then
    [[ "$2" == "repos/$GITHUB_REPOSITORY/git/ref/heads/$TARGET" ]] || return 90
    [[ "$FIXTURE_READ_FAIL" == "0" ]] || return 91
    if [[ -f "$FIXTURE_LISTED" ]]; then
      printf "%s\\n" "$FIXTURE_CURRENT"
    else
      printf "%s\\n" "$VALIDATED_SHA"
    fi
  elif [[ "$1 $2" == "issue create" || "$1 $2" == "issue comment" ]]; then
    printf "%s\\0" "$@" >> "$FIXTURE_WRITES"
  else
    return 92
  fi
}
`;

test("the nightly records the tested SHA only while it still matches the release tip", (context) => {
  assert.equal(reportStep.env?.VALIDATED_SHA, "${{ needs.resolve-branch.outputs.sha }}");
  const dir = mkdtempSync(join(tmpdir(), "omni-nightly-compat-report-"));
  context.after(() => rmSync(dir, { recursive: true, force: true }));
  const tested = "a".repeat(40);
  const target = "release/v3.8.55";
  const repo = "fixture/repo";
  const runUrl = "https://example.invalid/runs/1";
  const title = `🌙 nightly-compat: Node 24/26 failures on ${target}`;
  const body =
    `Nightly Node-compat run failed on \`${target}\` at \`${tested}\`: ${runUrl} — ` +
    "triage which Node version/shard broke (fail-fast off, all versions reported).";
  const scenarios = [
    { current: "b".repeat(40), failure: "0", existing: "123", write: null },
    { current: tested, failure: "1", existing: "123", write: null },
    { current: "", failure: "0", existing: "123", write: null },
    { current: "null", failure: "0", existing: "", write: null },
    {
      current: tested,
      failure: "0",
      existing: "123",
      write: ["issue", "comment", "123", "--repo", repo, "--body"],
    },
    {
      current: tested,
      failure: "0",
      existing: "",
      write: ["issue", "create", "--repo", repo, "--title", title, "--body"],
    },
  ];
  for (const [index, scenario] of scenarios.entries()) {
    const writes = join(dir, `writes-${index}`);
    writeFileSync(writes, "");
    const result = runStep(
      reportStep,
      dir,
      {
        TARGET: target,
        VALIDATED_SHA: tested,
        GITHUB_REPOSITORY: repo,
        RUN_URL: runUrl,
        FIXTURE_WRITES: writes,
        FIXTURE_LISTED: join(dir, `listed-${index}`),
        FIXTURE_READ_FAIL: scenario.failure,
        FIXTURE_EXISTING: scenario.existing,
        FIXTURE_CURRENT: scenario.current,
      },
      ghFixture
    );
    assert.equal(result.status, 0, result.stderr);
    const mutation = readFileSync(writes, "utf8");
    if (!scenario.write) {
      assert.equal(mutation, "", `scenario ${index} must not write a tracking issue`);
      continue;
    }
    const args = mutation.split("\0");
    assert.equal(args.pop(), "", `scenario ${index} terminates its last argument`);
    const reportedBody = args.pop();
    assert.deepEqual(args, scenario.write, `scenario ${index} issue command`);
    assert.equal(reportedBody, body, `scenario ${index} issue body`);
  }
});
