import test from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { load as yamlLoad } from "js-yaml";

const m = await import("../../scripts/check/check-ui-kit-upstream.mjs");

test("latestTag picks the highest vX.Y.Z and the peeled commit of annotated tags", () => {
  const out = [
    "1111111111111111111111111111111111111111\trefs/tags/v0.0.9",
    "2222222222222222222222222222222222222222\trefs/tags/v0.0.76",
    "3333333333333333333333333333333333333333\trefs/tags/v0.0.76^{}",
    "4444444444444444444444444444444444444444\trefs/tags/v0.0.66",
    "5555555555555555555555555555555555555555\trefs/tags/not-a-release",
  ].join("\n");
  assert.deepEqual(m.latestTag(out), {
    version: "0.0.76",
    commit: "3333333333333333333333333333333333333333",
  });
  assert.equal(m.latestTag(""), null);
});

test("compareVersions orders numerically, not lexically", () => {
  assert.equal(m.compareVersions("0.0.76", "0.0.9"), 1);
  assert.equal(m.compareVersions("0.0.66", "0.0.76"), -1);
  assert.equal(m.compareVersions("0.1.0", "0.1.0"), 0);
});

test("pinnedVersion reads UPSTREAM.md, and the vendored kit is not behind the pin it records", async () => {
  const md = fs.readFileSync("packages/ui-kit/UPSTREAM.md", "utf8");
  const pinned = m.pinnedVersion(md);
  assert.match(pinned.version, /^\d+\.\d+\.\d+$/);
  assert.match(pinned.commit, /^[0-9a-f]{40}$/);
  const pkg = JSON.parse(fs.readFileSync("packages/ui-kit/package.json", "utf8"));
  assert.equal(pkg.version, pinned.version);
});

// ---- unknown state: why, and what the workflow does about it -------------------------------
// The workflow step is run for real (bash + the script text from the YAML) against a stub `gh`,
// so these cover the shell itself, not a re-implementation of it. Only GitHub is stubbed.

const EXACT_TITLE = "UI Kit upstream watch can't run: UI_KIT_READ_TOKEN isn't set";
const NEUTRAL_TITLE = "UI Kit upstream watch can't read upstream";
const STEP_NAME = "Warn about and track an unreadable upstream";

function tempDir(t: { after: (fn: () => void) => void }) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "ui-kit-watch-"));
  t.after(() => fs.rmSync(dir, { recursive: true, force: true }));
  return dir;
}

function stub(dir: string, name: string, body: string) {
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, name), `#!/usr/bin/env bash\n${body}\n`, { mode: 0o755 });
}

function workflowSteps() {
  const wf = yamlLoad(fs.readFileSync(".github/workflows/ui-kit-upstream-watch.yml", "utf8")) as {
    jobs: { watch: { steps: Array<{ name?: string; if?: string; run?: string }> } };
  };
  return wf.jobs.watch.steps;
}

type StepRun = {
  status: number | null;
  stdout: string;
  summary: string;
  calls: string[];
  bodies: string[];
};

/** Runs the real step. `openIssues` is what the stubbed `gh issue list` returns. */
function runStep(
  t: { after: (fn: () => void) => void },
  opts: {
    state: string;
    reason?: string;
    detail?: string;
    openIssues?: Array<{ number: number; title: string }>;
    listFails?: boolean;
  }
): StepRun {
  const step = workflowSteps().find((s) => s.name === STEP_NAME);
  assert.ok(step?.run, `workflow has a run step named "${STEP_NAME}"`);
  const cwd = tempDir(t);
  const bin = path.join(cwd, "bin");
  const calls = path.join(cwd, "gh-calls.log");
  const bodies = path.join(cwd, "gh-bodies.log");
  const summary = path.join(cwd, "summary.md");
  fs.writeFileSync(summary, "");
  fs.writeFileSync(
    path.join(cwd, "ui-kit-upstream.json"),
    JSON.stringify({
      state: opts.state,
      repo: "keak-ai/cheaper-inference-ui-kit",
      reason: opts.reason,
      detail: opts.detail,
    })
  );
  fs.writeFileSync(path.join(cwd, "issues.json"), JSON.stringify(opts.openIssues ?? []));
  stub(
    bin,
    "gh",
    [
      `printf '%s\\n' "$*" >> ${JSON.stringify(calls)}`,
      `prev=""; for a in "$@"; do if [ "$prev" = "--body-file" ]; then cat "$a" >> ${JSON.stringify(bodies)}; fi; prev="$a"; done`,
      'if [ "$1 $2" = "issue list" ]; then',
      opts.listFails ? "  exit 1" : `  cat ${JSON.stringify(path.join(cwd, "issues.json"))}`,
      "fi",
    ].join("\n")
  );
  const res = spawnSync("bash", ["-e", "-c", step.run], {
    cwd,
    encoding: "utf8",
    env: {
      PATH: `${bin}:${process.env.PATH}`,
      HOME: cwd,
      STATE: opts.state,
      GH_TOKEN: "stub",
      GITHUB_REPOSITORY: "cheaper-inference/OmniRoute",
      GITHUB_SERVER_URL: "https://github.com",
      GITHUB_RUN_ID: "123",
      GITHUB_STEP_SUMMARY: summary,
    },
  });
  const read = (f: string) => (fs.existsSync(f) ? fs.readFileSync(f, "utf8") : "");
  return {
    status: res.status,
    stdout: res.stdout,
    summary: read(summary),
    calls: read(calls).split("\n").filter(Boolean),
    bodies: read(bodies) ? [read(bodies)] : [],
  };
}

const writes = (run: StepRun) => run.calls.filter((c) => !c.startsWith("issue list"));
const NO_TOKEN = m.describeUnknown({ tokenSet: false, listingFailed: true });
const LISTING_FAILED = m.describeUnknown({ tokenSet: true, listingFailed: true });
const NO_TAGS = m.describeUnknown({ tokenSet: true, listingFailed: false });

test("describeUnknown only blames a missing token when the token really is missing", () => {
  assert.equal(NO_TOKEN.reason, "no-token");
  assert.match(NO_TOKEN.detail, /UI_KIT_READ_TOKEN isn't set/);

  assert.equal(LISTING_FAILED.reason, "listing-failed");
  assert.doesNotMatch(LISTING_FAILED.detail, /isn't set|missing/);
  assert.match(LISTING_FAILED.detail, /invalid/);
  assert.match(LISTING_FAILED.detail, /unreachable/);

  // The listing worked, so neither the token nor the network is at fault, with or without a token.
  for (const tokenSet of [true, false]) {
    const noTags = m.describeUnknown({ tokenSet, listingFailed: false });
    assert.equal(noTags.reason, "no-release-tags");
    assert.doesNotMatch(noTags.detail, /token/i);
  }
});

test("the script reports the right reason for each way of ending up unknown", (t) => {
  const bin = path.join(tempDir(t), "bin");
  const run = (gitBody: string, token: string | undefined) => {
    stub(bin, "git", gitBody);
    const env: NodeJS.ProcessEnv = { ...process.env, PATH: `${bin}:${process.env.PATH}` };
    delete env.UI_KIT_READ_TOKEN;
    if (token !== undefined) env.UI_KIT_READ_TOKEN = token;
    const res = spawnSync(process.execPath, ["scripts/check/check-ui-kit-upstream.mjs", "--json"], {
      encoding: "utf8",
      env,
    });
    assert.equal(res.status, 0, "an unknown state never fails the check");
    return JSON.parse(res.stdout);
  };

  // The workflow passes an unset secret as an empty string, so that has to count as unset.
  for (const token of [undefined, ""]) {
    const report = run("exit 128", token);
    assert.equal(report.state, "unknown");
    assert.equal(report.reason, "no-token");
  }
  const rejected = run("exit 128", "ghp_not_a_real_token");
  assert.equal(rejected.state, "unknown");
  assert.equal(rejected.reason, "listing-failed");
  assert.ok(
    !JSON.stringify(rejected).includes("ghp_not_a_real_token"),
    "token stays out of the report"
  );

  const noTags = run("exit 0", "ghp_not_a_real_token");
  assert.equal(noTags.state, "unknown");
  assert.equal(noTags.reason, "no-release-tags");

  // A readable upstream carries no reason, so nothing downstream can mistake it for a failure.
  const tags = `echo "${"a".repeat(40)}\trefs/tags/v0.0.0"`;
  const known = run(tags, "ghp_not_a_real_token");
  assert.equal(known.state, "up-to-date");
  assert.equal(known.reason, undefined);
  assert.equal(known.detail, undefined);
});

test("workflow: unknown with no issue open warns and opens one, titled for the real reason", (t) => {
  const run = runStep(t, { state: "unknown", ...NO_TOKEN });
  assert.equal(run.status, 0, "the run stays green; the signal is the warning and the issue");
  assert.match(run.stdout, new RegExp(`^::warning .*::${NO_TOKEN.detail}$`, "m"));
  assert.ok(run.summary.includes(NO_TOKEN.detail), "the step summary has the same explanation");
  assert.equal(writes(run).length, 1);
  assert.ok(writes(run)[0].startsWith("issue create"));
  assert.ok(writes(run)[0].includes(`--title ${EXACT_TITLE} `), writes(run)[0]);
  assert.ok(run.bodies[0].includes(NO_TOKEN.detail));
  assert.match(
    run.bodies[0],
    /^Run: https:\/\/github\.com\/cheaper-inference\/OmniRoute\/actions\/runs\/123$/m
  );
});

test("workflow: a token that doesn't work never produces a 'token isn't set' issue or warning", (t) => {
  for (const cause of [LISTING_FAILED, NO_TAGS]) {
    const run = runStep(t, { state: "unknown", ...cause });
    assert.equal(run.status, 0);
    assert.ok(writes(run)[0].includes(`--title ${NEUTRAL_TITLE} `), writes(run)[0]);
    for (const text of [run.stdout, run.summary, run.bodies[0], writes(run)[0]]) {
      assert.doesNotMatch(text, /isn't set/);
    }
  }
});

test("workflow: an issue already open means warning only, with no comment or second issue", (t) => {
  // #18700's title as it is today: it gained a "fix: " prefix after it was opened.
  for (const title of [EXACT_TITLE, `fix: ${EXACT_TITLE}`, NEUTRAL_TITLE]) {
    for (const cause of [NO_TOKEN, LISTING_FAILED]) {
      const run = runStep(t, {
        state: "unknown",
        ...cause,
        openIssues: [{ number: 18700, title }],
      });
      assert.equal(run.status, 0);
      assert.deepEqual(writes(run), [], `no write for "${title}"`);
      assert.match(run.stdout, new RegExp(`^::warning .*::${cause.detail}$`, "m"));
      assert.ok(run.summary.includes("#18700"), "the summary points at the open issue");
    }
  }
});

test("workflow: once upstream is readable the issue closes with a comment, in either known state", (t) => {
  for (const state of ["up-to-date", "behind"]) {
    for (const title of [EXACT_TITLE, `fix: ${EXACT_TITLE}`, NEUTRAL_TITLE]) {
      const run = runStep(t, { state, openIssues: [{ number: 18700, title }] });
      assert.equal(run.status, 0);
      assert.equal(writes(run).length, 1);
      assert.match(writes(run)[0], /^issue close 18700 /);
      assert.match(writes(run)[0], /--comment /);
      assert.doesNotMatch(run.stdout, /::warning/);
      assert.equal(run.summary, "");
    }
  }
});

test("workflow: a known state with nothing open does nothing", (t) => {
  const run = runStep(t, { state: "up-to-date" });
  assert.equal(run.status, 0);
  assert.deepEqual(writes(run), []);
  assert.doesNotMatch(run.stdout, /::warning/);
});

test("workflow: issues that merely resemble the title are neither closed nor treated as the tracker", (t) => {
  const openIssues = [
    { number: 1, title: `${EXACT_TITLE} on forks` },
    { number: 2, title: "UI Kit upstream watch can't parse pre-release tags" },
  ];
  const known = runStep(t, { state: "up-to-date", openIssues });
  assert.deepEqual(writes(known), []);

  const unknown = runStep(t, { state: "unknown", ...NO_TOKEN, openIssues });
  assert.equal(writes(unknown).length, 1);
  assert.ok(writes(unknown)[0].startsWith("issue create"));
});

test("workflow: a failed issue lookup fails the step instead of opening a duplicate", (t) => {
  const run = runStep(t, { state: "unknown", ...NO_TOKEN, listFails: true });
  assert.notEqual(run.status, 0);
  assert.deepEqual(writes(run), []);
  // The warning is written before the lookup, so the run still says why upstream is unreadable.
  assert.match(run.stdout, /^::warning /m);
});

test("workflow: the behind/up-to-date step still skips unknown, and this step runs for every state", () => {
  const steps = workflowSteps();
  const behind = steps.find((s) => s.name === "Open, update or close the tracking issue");
  assert.equal(
    behind?.if,
    "${{ !cancelled() && (steps.check.outputs.state == 'behind' || steps.check.outputs.state == 'up-to-date') }}"
  );
  const access = steps.find((s) => s.name === STEP_NAME);
  assert.equal(access?.if, undefined);
  assert.ok(
    steps.indexOf(access!) < steps.indexOf(behind!),
    "runs first, so a failure in the behind step can't suppress the warning or the close"
  );
  assert.ok(!access!.run!.includes("${{"), "values reach the shell through env, not interpolation");
});
