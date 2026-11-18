import test from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { load as yamlLoad } from "js-yaml";

const REPO_ROOT = process.cwd();
const BRANCH = "chore/ui-kit-sync-latest";
const BOT_EMAIL = "41898282+github-actions[bot]@users.noreply.github.com";
const KIT_TOKEN = "kit-token-that-must-not-leak";

function tempDir(t: { after: (fn: () => void) => void }) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "ui-kit-sync-pr-"));
  t.after(() => fs.rmSync(dir, { recursive: true, force: true }));
  return dir;
}

/** Git hooks export GIT_DIR and friends; a fixture repo must not inherit them. */
function cleanEnv(extra: Record<string, string> = {}) {
  const env = Object.fromEntries(
    Object.entries(process.env).filter(([key]) => !key.startsWith("GIT_"))
  ) as Record<string, string>;
  return { ...env, ...extra };
}

function git(cwd: string, ...args: string[]) {
  const res = spawnSync("git", args, { cwd, encoding: "utf8", env: cleanEnv() });
  assert.equal(res.status, 0, `git ${args.join(" ")}: ${res.stderr}`);
  return res.stdout.trim();
}

function write(root: string, file: string, content: string) {
  fs.mkdirSync(path.dirname(path.join(root, file)), { recursive: true });
  fs.writeFileSync(path.join(root, file), content);
}

function commitAll(cwd: string, message: string, email = "someone@example.com") {
  git(cwd, "add", "-A");
  git(cwd, "-c", "user.name=Someone", "-c", `user.email=${email}`, "commit", "-qm", message);
  return git(cwd, "rev-parse", "HEAD");
}

function kitRelease(kit: string, version: string) {
  write(kit, "package.json", JSON.stringify({ version }));
  write(kit, "public/brand/lucide-license.txt", "ISC\n");
  write(kit, "src/button.ts", `export const version = "${version}";\n`);
  const commit = commitAll(kit, `release ${version}`);
  git(kit, "tag", `v${version}`);
  return commit;
}

type Fixture = {
  root: string;
  work: string;
  origin: string;
  kit: string;
  pinned: string;
  latest: string;
  ghLog: string;
  body: string;
  stubDir: string;
};

/** A real origin, a real kit repo and the real scripts. Only `gh` is stubbed. */
function setup(t: { after: (fn: () => void) => void }): Fixture {
  const root = tempDir(t);
  const kit = path.join(root, "kit");
  fs.mkdirSync(kit);
  git(kit, "init", "-q", "-b", "main");
  const pinned = kitRelease(kit, "0.0.1");
  const latest = kitRelease(kit, "0.0.2");

  const origin = path.join(root, "origin.git");
  git(root, "init", "-q", "--bare", "-b", "release/v1.0.0", origin);
  const work = path.join(root, "work");
  fs.mkdirSync(work);
  git(work, "init", "-q", "-b", "release/v1.0.0");
  git(work, "remote", "add", "origin", origin);
  for (const file of [
    "scripts/ci/ui-kit-sync-pr.sh",
    "scripts/dev/sync-ui-kit.sh",
    "scripts/check/check-ui-kit-snapshot.mjs",
  ]) {
    fs.mkdirSync(path.dirname(path.join(work, file)), { recursive: true });
    fs.copyFileSync(path.join(REPO_ROOT, file), path.join(work, file));
  }
  write(work, ".gitignore", "_references/\n");
  write(work, "changelog.d/maintenance/.gitkeep", "");
  write(
    work,
    "package-lock.json",
    '{\n  "packages": {\n    "packages/ui-kit": { "version": "0.0.1" }\n  }\n}\n'
  );
  write(work, "packages/ui-kit/package.json", '{\n  "version": "0.0.1"\n}\n');
  write(work, "packages/ui-kit/src/button.ts", 'export const version = "0.0.1";\n');
  write(work, "packages/ui-kit/UPSTREAM.md", `- commit: ${pinned}\n- version: 0.0.1\n`);
  commitAll(work, "base");
  git(work, "push", "-q", "origin", "release/v1.0.0");

  const stubDir = path.join(root, "stub");
  const bin = path.join(stubDir, "bin");
  fs.mkdirSync(bin, { recursive: true });
  const ghLog = path.join(stubDir, "gh.log");
  const body = path.join(stubDir, "body.md");
  write(stubDir, "open", "");
  write(stubDir, "closed.json", "[]");
  fs.writeFileSync(
    path.join(bin, "gh"),
    [
      "#!/usr/bin/env bash",
      `printf '%s\\n' "$*" >> ${JSON.stringify(ghLog)}`,
      `prev=""; for a in "$@"; do if [ "$prev" = "--body-file" ]; then cp "$a" ${JSON.stringify(body)}; fi; prev="$a"; done`,
      'if [ "$1 $2" = "pr create" ]; then echo https://example.test/pr/1; fi',
      'if [ "$1 $2" = "pr list" ]; then',
      '  case "$*" in',
      `    *"--state open"*) cat ${JSON.stringify(path.join(stubDir, "open"))} ;;`,
      `    *) cat ${JSON.stringify(path.join(stubDir, "closed.json"))} ;;`,
      "  esac",
      "fi",
    ].join("\n"),
    { mode: 0o755 }
  );
  return { root, work, origin, kit, pinned, latest, ghLog, body, stubDir };
}

function runScript(f: Fixture, env: Record<string, string> = {}) {
  const output = path.join(f.stubDir, "output");
  fs.writeFileSync(output, "");
  const res = spawnSync("bash", ["scripts/ci/ui-kit-sync-pr.sh"], {
    cwd: f.work,
    encoding: "utf8",
    env: cleanEnv({
      PATH: `${path.join(f.stubDir, "bin")}:${process.env.PATH}`,
      GH_TOKEN: "stub",
      GITHUB_OUTPUT: output,
      REPO: "cheaper-inference/OmniRoute",
      BASE: "release/v1.0.0",
      LATEST_VERSION: "0.0.2",
      LATEST_COMMIT: f.latest,
      PINNED_COMMIT: f.pinned,
      KIT_URL: f.kit,
      HAS_PR_TOKEN: "true",
      ...env,
    }),
  });
  const outputs = Object.fromEntries(
    fs
      .readFileSync(output, "utf8")
      .split("\n")
      .filter(Boolean)
      .map((line) => [line.slice(0, line.indexOf("=")), line.slice(line.indexOf("=") + 1)])
  );
  const gh = fs.existsSync(f.ghLog)
    ? fs.readFileSync(f.ghLog, "utf8").split("\n").filter(Boolean)
    : [];
  return { ...res, outputs, gh };
}

function remoteHead(f: Fixture) {
  return git(f.work, "ls-remote", "--heads", "origin", BRANCH).split("\t")[0] ?? "";
}

function showRemote(f: Fixture, file: string) {
  git(f.work, "fetch", "-q", "origin", BRANCH);
  return git(f.work, "show", `FETCH_HEAD:${file}`);
}

/** Puts the rolling branch on origin as a previous run of the script would have left it. */
function seedRemoteBranch(f: Fixture, version: string, email = BOT_EMAIL) {
  const seed = path.join(f.root, `seed-${version}`);
  git(f.root, "clone", "-q", "-b", "release/v1.0.0", f.origin, seed);
  git(seed, "switch", "-q", "-c", BRANCH);
  write(seed, "packages/ui-kit/UPSTREAM.md", `- commit: ${f.pinned}\n- version: ${version}\n`);
  write(seed, "packages/ui-kit/src/seed.ts", `// seeded at ${version}\n`);
  const sha = commitAll(seed, `seed ${version}`, email);
  git(seed, "push", "-q", "--force", "origin", `HEAD:refs/heads/${BRANCH}`);
  return sha;
}

test("no PR token: pushes the branch as the bot and opens no PR", (t) => {
  const f = setup(t);
  const run = runScript(f, { HAS_PR_TOKEN: "false" });
  assert.equal(run.status, 0, run.stderr);
  assert.equal(run.outputs.decision, "branch-only");
  assert.equal(run.outputs.pr_url, undefined);
  assert.ok(!run.gh.some((c) => c.startsWith("pr create")));

  assert.match(showRemote(f, "packages/ui-kit/UPSTREAM.md"), /- version: 0\.0\.2/);
  assert.match(showRemote(f, "packages/ui-kit/src/button.ts"), /0\.0\.2/);
  assert.match(showRemote(f, "packages/ui-kit/package.json"), /"version": "0\.0\.2"/);
  assert.match(showRemote(f, "package-lock.json"), /"version": "0\.0\.2"/);
  assert.match(showRemote(f, "changelog.d/maintenance/0000-ui-kit-0-0-2.md"), /0\.0\.2/);

  git(f.work, "fetch", "-q", "origin", BRANCH);
  const log = git(f.work, "log", "-1", "--format=%ae%n%s%n%b", "FETCH_HEAD");
  assert.equal(log.split("\n")[0], BOT_EMAIL);
  assert.match(log, /sync the vendored CI UI Kit to 0\.0\.2/);
  assert.doesNotMatch(log, /Co-Authored-By|Generated with/i);
});

test("with a PR token: opens one PR against the base, with the compare link and checklist", (t) => {
  const f = setup(t);
  const run = runScript(f);
  assert.equal(run.status, 0, run.stderr);
  assert.equal(run.outputs.decision, "opened");
  assert.equal(run.outputs.pr_url, "https://example.test/pr/1");
  const create = run.gh.find((c) => c.startsWith("pr create")) ?? "";
  assert.match(create, /--base release\/v1\.0\.0/);
  assert.match(create, new RegExp(`--head ${BRANCH}`));

  const body = fs.readFileSync(f.body, "utf8");
  assert.ok(body.includes(`compare/${f.pinned}...${f.latest}`));
  assert.match(body, /local VPS/);
  assert.doesNotMatch(body, /base-red inherited/);
  assert.doesNotMatch(body, /Generated with/i);
});

test("a red base is declared at the top of the PR body", (t) => {
  const f = setup(t);
  const run = runScript(f, { BASE_RED_ISSUE: "17219" });
  assert.equal(run.status, 0, run.stderr);
  assert.ok(fs.readFileSync(f.body, "utf8").startsWith("⚠️ base-red inherited: #17219\n"));
});

test("an open PR already at the newest release is left alone: no push and no body rewrite", (t) => {
  const f = setup(t);
  const sha = seedRemoteBranch(f, "0.0.2");
  write(f.stubDir, "open", "https://example.test/pr/7\n");
  const run = runScript(f);
  assert.equal(run.status, 0, run.stderr);
  assert.equal(run.outputs.decision, "current");
  assert.equal(run.outputs.pr_url, "https://example.test/pr/7");
  assert.equal(remoteHead(f), sha);
  assert.ok(!run.gh.some((c) => c.startsWith("pr edit") || c.startsWith("pr create")));
});

test("a newer release replaces the bot's branch and updates the open PR", (t) => {
  const f = setup(t);
  const old = seedRemoteBranch(f, "0.0.1");
  write(f.stubDir, "open", "https://example.test/pr/7\n");
  const run = runScript(f);
  assert.equal(run.status, 0, run.stderr);
  assert.equal(run.outputs.decision, "updated");
  assert.equal(run.outputs.pr_url, "https://example.test/pr/7");
  assert.notEqual(remoteHead(f), old);
  assert.match(showRemote(f, "packages/ui-kit/UPSTREAM.md"), /- version: 0\.0\.2/);
  const edit = run.gh.find((c) => c.startsWith("pr edit")) ?? "";
  assert.match(edit, /https:\/\/example\.test\/pr\/7/);
  assert.match(edit, /sync the vendored CI UI Kit to 0\.0\.2/);
});

test("an open PR with commits pushed by hand is never overwritten", (t) => {
  const f = setup(t);
  const sha = seedRemoteBranch(f, "0.0.1", "maintainer@example.com");
  write(f.stubDir, "open", "https://example.test/pr/7\n");
  const run = runScript(f);
  assert.equal(run.status, 0, run.stderr);
  assert.equal(run.outputs.decision, "hand-edited");
  assert.equal(remoteHead(f), sha);
  assert.ok(!run.gh.some((c) => c.startsWith("pr edit")));
});

test("a leftover branch with no open PR can be replaced, whoever pushed it", (t) => {
  const f = setup(t);
  seedRemoteBranch(f, "0.0.1", "maintainer@example.com");
  const run = runScript(f);
  assert.equal(run.status, 0, run.stderr);
  assert.equal(run.outputs.decision, "opened");
  assert.match(showRemote(f, "packages/ui-kit/UPSTREAM.md"), /- version: 0\.0\.2/);
});

test("a PR for this version closed without merging stays closed; a newer version may reopen", (t) => {
  const f = setup(t);
  const title = "chore(dashboard): sync the vendored CI UI Kit to 0.0.2";
  write(f.stubDir, "closed.json", JSON.stringify([{ title, mergedAt: null }]));
  const declined = runScript(f);
  assert.equal(declined.status, 0, declined.stderr);
  assert.equal(declined.outputs.decision, "declined");
  assert.equal(remoteHead(f), "");

  write(
    f.stubDir,
    "closed.json",
    JSON.stringify([{ title: title.replace("0.0.2", "0.0.1"), mergedAt: null }])
  );
  assert.equal(runScript(f).outputs.decision, "opened");
});

test("a merged PR with the same title does not count as declined", (t) => {
  const f = setup(t);
  const title = "chore(dashboard): sync the vendored CI UI Kit to 0.0.2";
  write(f.stubDir, "closed.json", JSON.stringify([{ title, mergedAt: "2026-11-01T00:00:00Z" }]));
  assert.equal(runScript(f).outputs.decision, "opened");
});

test("a tag whose package.json holds another version fails without pushing", (t) => {
  const f = setup(t);
  const run = runScript(f, { LATEST_VERSION: "0.0.9" });
  assert.notEqual(run.status, 0);
  assert.match(run.stderr, /holds version 0\.0\.2/);
  assert.equal(remoteHead(f), "");
  assert.ok(!run.gh.some((c) => c.startsWith("pr create")));
});

test("the kit token stays out of git config and stays scoped to the kit's URL", (t) => {
  const f = setup(t);
  const run = runScript(f, { KIT_TOKEN });
  assert.equal(run.status, 0, run.stderr);
  const encoded = Buffer.from(`x-access-token:${KIT_TOKEN}`).toString("base64");
  for (const config of [
    path.join(f.work, ".git/config"),
    path.join(f.work, "_references/cheaper-inference-ui-kit/.git/config"),
  ]) {
    const text = fs.readFileSync(config, "utf8");
    assert.ok(!text.includes(KIT_TOKEN) && !text.includes(encoded), `${config} holds the token`);
  }
  assert.ok(!run.stdout.includes(KIT_TOKEN));
  // Only the masked form is ever printed, and only so that the runner can hide it.
  assert.ok(run.stdout.includes(`::add-mask::${encoded}`));
});

type WorkflowStep = {
  id?: string;
  name?: string;
  uses?: string;
  if?: string;
  run?: string;
  env?: Record<string, string>;
  with?: Record<string, unknown>;
};
type Workflow = {
  on: { schedule: Array<{ cron: string }>; workflow_dispatch?: unknown };
  permissions: Record<string, string>;
  jobs: {
    watch: { if: string; permissions: Record<string, string>; steps: WorkflowStep[] };
  };
};

function workflow() {
  return yamlLoad(
    fs.readFileSync(path.join(REPO_ROOT, ".github/workflows/ui-kit-upstream-watch.yml"), "utf8")
  ) as Workflow;
}

function stepNamed(name: string) {
  const step = workflow().jobs.watch.steps.find((s) => s.name === name);
  assert.ok(step?.run, `workflow has a run step named "${name}"`);
  return step;
}

test("workflow: runs daily and on demand, least privilege, scheduled runs only in the canonical repo", () => {
  const wf = workflow();
  assert.equal(wf.on.schedule[0].cron, "17 9 * * *");
  assert.ok("workflow_dispatch" in wf.on);
  assert.deepEqual(wf.permissions, { contents: "read" });
  assert.deepEqual(wf.jobs.watch.permissions, {
    contents: "write",
    issues: "write",
    "pull-requests": "write",
  });
  assert.match(wf.jobs.watch.if, /github\.event_name != 'schedule'/);
  assert.match(wf.jobs.watch.if, /github\.repository == 'cheaper-inference\/OmniRoute'/);
});

test("workflow: checkout is SHA-pinned, keeps no credentials and uses the resolved release", () => {
  const checkout = workflow().jobs.watch.steps.find((s) => s.uses?.startsWith("actions/checkout@"));
  assert.match(checkout?.uses ?? "", /^actions\/checkout@[0-9a-f]{40}$/);
  assert.equal(checkout?.with?.["persist-credentials"], false);
  assert.equal(checkout?.with?.ref, "${{ steps.base.outputs.branch }}");
});

test("workflow: values reach the shell only through env", () => {
  for (const step of workflow().jobs.watch.steps) {
    assert.doesNotMatch(step.run ?? "", /\$\{\{/, `${step.name} interpolates into its script`);
  }
});

test("workflow: the sync only runs when behind on a release that isn't frozen", () => {
  const sync = stepNamed("Open or update the sync PR");
  assert.equal(
    sync.if,
    "${{ steps.check.outputs.state == 'behind' && steps.base.outputs.frozen == 'false' }}"
  );
  assert.equal(sync.env?.KIT_TOKEN, "${{ secrets.UI_KIT_READ_TOKEN }}");
  assert.equal(sync.env?.HAS_PR_TOKEN, "${{ secrets.UI_KIT_SYNC_PR_TOKEN != '' }}");
  assert.match(sync.run ?? "", /scripts\/ci\/ui-kit-sync-pr\.sh/);
  assert.doesNotMatch(sync.run ?? "", /gh pr merge/);
});

test("workflow: a failed check can't close the tracking issue", () => {
  const issue = stepNamed("Open, update or close the tracking issue");
  assert.equal(
    issue.if,
    "${{ !cancelled() && (steps.check.outputs.state == 'behind' || steps.check.outputs.state == 'up-to-date') }}"
  );
});

function runStep(
  t: { after: (fn: () => void) => void },
  name: string,
  opts: {
    env?: Record<string, string>;
    branches?: string[];
    freezes?: string[];
    red?: string;
    issues?: unknown[];
  }
) {
  const cwd = tempDir(t);
  const bin = path.join(cwd, "bin");
  fs.mkdirSync(bin);
  const calls = path.join(cwd, "calls.log");
  const bodies = path.join(cwd, "bodies.log");
  const output = path.join(cwd, "output");
  fs.writeFileSync(output, "");
  write(
    cwd,
    "ui-kit-upstream.json",
    JSON.stringify({ pinned: { version: "0.0.1" }, latest: { version: "0.0.2" } })
  );
  write(cwd, "issues.json", JSON.stringify(opts.issues ?? []));
  write(cwd, "branches", `${(opts.branches ?? []).join("\n")}\n`);
  write(cwd, "freezes", `${(opts.freezes ?? []).join("\n")}\n`);
  write(cwd, "red", `${opts.red ?? ""}\n`);
  fs.writeFileSync(
    path.join(bin, "gh"),
    [
      "#!/usr/bin/env bash",
      `printf '%s\\n' "$*" >> ${JSON.stringify(calls)}`,
      `prev=""; for a in "$@"; do if [ "$prev" = "--body-file" ]; then cat "$a" >> ${JSON.stringify(bodies)}; fi; prev="$a"; done`,
      'if [ "$1" = "api" ]; then cat branches; fi',
      'if [ "$1 $2" = "issue list" ]; then',
      '  case "$*" in',
      '    *"--label release-freeze"*) cat freezes ;;',
      '    *"Release branch not green"*) cat red ;;',
      "    *) cat issues.json ;;",
      "  esac",
      "fi",
    ].join("\n"),
    { mode: 0o755 }
  );
  const res = spawnSync("bash", ["-e", "-c", stepNamed(name).run ?? ""], {
    cwd,
    encoding: "utf8",
    env: {
      PATH: `${bin}:${process.env.PATH}`,
      GH_TOKEN: "stub",
      GITHUB_REPOSITORY: "cheaper-inference/OmniRoute",
      GITHUB_SERVER_URL: "https://github.com",
      GITHUB_RUN_ID: "123",
      GITHUB_OUTPUT: output,
      // Actions sets every declared env entry, to an empty string when the output doesn't exist.
      STATE: "",
      FROZEN: "",
      BASE: "",
      DECISION: "",
      BRANCH: "",
      PR_URL: "",
      ...opts.env,
    },
  });
  const read = (file: string) => (fs.existsSync(file) ? fs.readFileSync(file, "utf8") : "");
  return {
    status: res.status,
    stderr: res.stderr,
    output: read(output),
    body: read(bodies),
    calls: read(calls).split("\n").filter(Boolean),
  };
}

const RESOLVE = "Resolve the target release branch";
const TRACK = "Open, update or close the tracking issue";
const TRACKER = { number: 5, title: "UI kit: a newer upstream release is available" };
const trackWrites = (calls: string[]) => calls.filter((c) => !c.startsWith("issue list"));

test("workflow: the target is the highest release by version, not by text order", (t) => {
  const run = runStep(t, RESOLVE, {
    branches: ["main", "release/v3.8.9", "release/v3.8.53", "release/v3.8.100", "release/foo"],
  });
  assert.equal(run.status, 0, run.stderr);
  assert.match(run.output, /^branch=release\/v3\.8\.100$/m);
  assert.match(run.output, /^frozen=false$/m);
});

test("workflow: a freeze holds only the release it names", (t) => {
  const frozen = runStep(t, RESOLVE, {
    branches: ["release/v3.8.53"],
    freezes: ["🔒 release-freeze: v3.8.53 in progress"],
  });
  assert.match(frozen.output, /^frozen=true$/m);

  const endOfTitle = runStep(t, RESOLVE, {
    branches: ["release/v3.8.53"],
    freezes: ["release-freeze: v3.8.53"],
  });
  assert.match(endOfTitle.output, /^frozen=true$/m);

  const otherVersion = runStep(t, RESOLVE, {
    branches: ["release/v3.8.5"],
    freezes: ["🔒 release-freeze: v3.8.52 in progress", "🔒 release-freeze: v3.8.5.1 in progress"],
  });
  assert.match(otherVersion.output, /^frozen=false$/m);
});

test("workflow: an open base-red issue reaches the sync step", (t) => {
  const run = runStep(t, RESOLVE, { branches: ["release/v3.8.53"], red: "17219" });
  assert.match(run.output, /^red=17219$/m);
});

test("workflow: with a sync PR open the tracking issue closes and points at it", (t) => {
  const run = runStep(t, TRACK, {
    env: { STATE: "behind", PR_URL: "https://example.test/pr/1", DECISION: "opened" },
    issues: [TRACKER],
  });
  assert.equal(run.status, 0, run.stderr);
  const [write] = trackWrites(run.calls);
  assert.match(write, /^issue close 5 /);
  assert.match(write, /https:\/\/example\.test\/pr\/1/);
});

test("workflow: behind with a sync PR and no issue writes nothing", (t) => {
  const run = runStep(t, TRACK, {
    env: { STATE: "behind", PR_URL: "https://example.test/pr/1", DECISION: "current" },
  });
  assert.equal(run.status, 0, run.stderr);
  assert.deepEqual(trackWrites(run.calls), []);
});

test("workflow: without a PR the issue says why, and a daily run edits instead of commenting", (t) => {
  const cases: Array<[Record<string, string>, RegExp]> = [
    [{ FROZEN: "true", BASE: "release/v3.8.53" }, /`release\/v3\.8\.53` is frozen/],
    [{ DECISION: "branch-only", BRANCH }, /`UI_KIT_SYNC_PR_TOKEN` secret isn't set/],
    [{ DECISION: "hand-edited", BRANCH }, /commits pushed by hand/],
    [{ DECISION: "declined" }, /closed without merging/],
    [{}, /didn't finish.*actions\/runs\/123/],
  ];
  for (const [env, expected] of cases) {
    const created = runStep(t, TRACK, { env: { STATE: "behind", ...env } });
    assert.equal(created.status, 0, created.stderr);
    assert.match(trackWrites(created.calls)[0], /^issue create /);
    assert.match(created.body, expected);
    assert.match(created.body, /`0\.0\.1`.*`v0\.0\.2`/);

    const edited = runStep(t, TRACK, { env: { STATE: "behind", ...env }, issues: [TRACKER] });
    assert.equal(edited.status, 0, edited.stderr);
    assert.match(trackWrites(edited.calls)[0], /^issue edit 5 /);
    assert.ok(!edited.calls.some((c) => c.startsWith("issue comment")));
  }
});

test("workflow: up to date closes the tracking issue, and a look-alike title is left alone", (t) => {
  const closed = runStep(t, TRACK, { env: { STATE: "up-to-date" }, issues: [TRACKER] });
  assert.match(trackWrites(closed.calls)[0], /^issue close 5 /);

  const prefixed = runStep(t, TRACK, {
    env: { STATE: "up-to-date" },
    issues: [{ number: 6, title: `fix: ${TRACKER.title}` }],
  });
  assert.match(trackWrites(prefixed.calls)[0], /^issue close 6 /);

  const lookAlike = runStep(t, TRACK, {
    env: { STATE: "up-to-date" },
    issues: [{ number: 7, title: `${TRACKER.title} (old report)` }],
  });
  assert.deepEqual(trackWrites(lookAlike.calls), []);
});
