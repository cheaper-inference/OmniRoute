import test from "node:test";
import assert from "node:assert/strict";
import { execFileSync, spawnSync } from "node:child_process";
import { mkdtempSync, mkdirSync, writeFileSync, rmSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { load } from "js-yaml";
import { resolveOpenapiBaseline } from "../../../scripts/check/openapiBaseline.mjs";

const attributionGate = fileURLToPath(
  new URL("../../../scripts/check/check-ai-attribution.mjs", import.meta.url)
);

function fixture(t) {
  const cwd = mkdtempSync(join(tmpdir(), "pr-comparison-"));
  t.after(() => rmSync(cwd, { recursive: true, force: true }));
  const env = {
    ...process.env,
    GIT_AUTHOR_NAME: "Gate test",
    GIT_AUTHOR_EMAIL: "gate@example.invalid",
    GIT_COMMITTER_NAME: "Gate test",
    GIT_COMMITTER_EMAIL: "gate@example.invalid",
    GIT_CONFIG_GLOBAL: "/dev/null",
    GIT_CONFIG_NOSYSTEM: "1",
  };
  const git = (...args) =>
    execFileSync("git", args, { cwd, env, encoding: "utf8", stdio: "pipe" }).trim();
  const commit = (message) => {
    git("add", ".");
    git("-c", "core.hooksPath=/dev/null", "commit", "-qm", message);
    return git("rev-parse", "HEAD");
  };
  git("init", "-q", "--initial-branch=base");
  mkdirSync(join(cwd, "docs"));
  writeFileSync(join(cwd, "docs/openapi.yaml"), "stable spec\n");
  const original = commit("root");
  git("checkout", "-qb", "feature");
  writeFileSync(join(cwd, "feature.txt"), "contribution\n");
  const head = commit("feat: contribution");
  git("checkout", "-q", "base");
  writeFileSync(join(cwd, "docs/openapi.yaml"), "upstream spec\n");
  const advanced = commit("upstream change\n\nGenerated with Claude Code");
  const merge = (feature = head) => {
    git("checkout", "-q", "base");
    git("-c", "core.hooksPath=/dev/null", "merge", "--no-ff", "-qm", "candidate", feature);
    return git("rev-parse", "HEAD");
  };
  const candidate = merge();
  const eventPath = join(cwd, "event.json");
  const event = {
    pull_request: { base: { sha: original }, head: { sha: head }, title: "Feature", body: "" },
  };
  const eventEnv = {
    ...env,
    GITHUB_EVENT_NAME: "pull_request",
    GITHUB_EVENT_PATH: eventPath,
    GITHUB_SHA: candidate,
  };
  const writeEvent = () => writeFileSync(eventPath, JSON.stringify(event));
  writeEvent();
  const runAttribution = (args = []) => {
    writeEvent();
    return spawnSync(process.execPath, [attributionGate, ...args], {
      cwd,
      env: eventEnv,
      encoding: "utf8",
      timeout: 30000,
    });
  };
  const resolve = () => {
    writeEvent();
    return resolveOpenapiBaseline({ cwd, env: eventEnv });
  };
  return {
    cwd,
    git,
    commit,
    original,
    advanced,
    head,
    candidate,
    event,
    eventEnv,
    resolve,
    runAttribution,
  };
}

test("OpenAPI compares a stale-base synthetic merge against its verified first parent", (t) => {
  const f = fixture(t);
  const comparison = f.resolve();
  assert.equal(comparison.baseSha, f.advanced);
  assert.equal(comparison.baseTipSha, f.advanced);
  assert.equal(comparison.candidateSha, f.candidate);
  assert.equal(
    f.git("show", `${comparison.baseSha}:docs/openapi.yaml`),
    f.git("show", "HEAD:docs/openapi.yaml")
  );
});

test("AI event scan excludes newer upstream commits, but explicit ranges remain authoritative", (t) => {
  const f = fixture(t);
  const result = f.runAttribution();
  assert.equal(result.status, 0, result.stdout + result.stderr);
  const explicit = f.runAttribution(["--range", `${f.original}..${f.candidate}`]);
  assert.equal(explicit.status, 1, explicit.stdout + explicit.stderr);
  assert.match(explicit.stderr, /upstream change/);
});

test("AI event scan still rejects contributor metadata and PR title/body violations", (t) => {
  const f = fixture(t);
  f.git("checkout", "-q", "feature");
  f.git(
    "-c",
    "core.hooksPath=/dev/null",
    "commit",
    "--allow-empty",
    "-qm",
    "feature\n\nGenerated with Claude Code"
  );
  f.event.pull_request.head.sha = f.git("rev-parse", "HEAD");
  f.git("checkout", "-q", "base");
  f.git("-c", "core.hooksPath=/dev/null", "merge", "--no-ff", "-qm", "candidate", "feature");
  f.eventEnv.GITHUB_SHA = f.git("rev-parse", "HEAD");
  const result = f.runAttribution();
  assert.equal(result.status, 1, result.stdout + result.stderr);
  assert.match(result.stderr, /feature/);
  assert.doesNotMatch(result.stderr, /upstream change/);
  f.event.pull_request.title = "Generated with Claude Code";
  f.event.pull_request.body = "Made with Copilot";
  const metadata = f.runAttribution();
  assert.match(metadata.stderr, /PR title/);
  assert.match(metadata.stderr, /PR body/);
});

for (const boundary of ["PR head", "PR ancestor"]) {
  test(`a shallow ${boundary} cannot hide earlier prohibited contributor metadata`, (t) => {
    const f = fixture(t);
    f.git("checkout", "-q", "feature");
    f.git(
      "-c",
      "core.hooksPath=/dev/null",
      "commit",
      "--allow-empty",
      "-qm",
      "earlier contributor change\n\nGenerated with Claude Code"
    );
    f.git("-c", "core.hooksPath=/dev/null", "commit", "--allow-empty", "-qm", "clean boundary");
    const ancestor = f.git("rev-parse", "HEAD");
    f.git("-c", "core.hooksPath=/dev/null", "commit", "--allow-empty", "-qm", "clean tip");
    const head = f.git("rev-parse", "HEAD");
    f.event.pull_request.head.sha = head;
    f.git("checkout", "-q", "base");
    f.git("-c", "core.hooksPath=/dev/null", "merge", "--no-ff", "-qm", "candidate", head);
    f.eventEnv.GITHUB_SHA = f.git("rev-parse", "HEAD");
    const complete = f.runAttribution();
    assert.equal(complete.status, 1, complete.stdout + complete.stderr);
    assert.match(complete.stderr, /earlier contributor change/);
    writeFileSync(join(f.cwd, ".git/shallow"), `${boundary === "PR head" ? head : ancestor}\n`);
    assert.throws(f.resolve, /Shallow PR history/);
    const incomplete = f.runAttribution();
    assert.equal(incomplete.status, 2, incomplete.stdout + incomplete.stderr);
    assert.match(incomplete.stderr, /INCOMPLETE.*Shallow PR history/);
    assert.doesNotMatch(incomplete.stdout, /OK/);
  });
}

test("a direct PR-head checkout retains merge-base semantics even if the head is a merge", (t) => {
  const f = fixture(t);
  f.event.pull_request.head.sha = f.candidate;
  assert.equal(f.resolve().baseSha, f.original);
});

for (const mode of [
  "wrong head",
  "wrong checkout",
  "unrelated base",
  "missing base",
  "missing head",
  "missing candidate identity",
  "shallow candidate",
  "unavailable base",
  "octopus",
  "reversed parents",
]) {
  test(`comparison fails closed for ${mode}`, (t) => {
    const f = fixture(t);
    if (mode === "wrong head") f.event.pull_request.head.sha = f.original;
    if (mode === "wrong checkout") f.eventEnv.GITHUB_SHA = f.original;
    if (mode === "missing base") delete f.event.pull_request.base.sha;
    if (mode === "missing head") delete f.event.pull_request.head.sha;
    if (mode === "missing candidate identity") delete f.eventEnv.GITHUB_SHA;
    if (mode === "shallow candidate")
      writeFileSync(join(f.cwd, ".git/shallow"), `${f.candidate}\n`);
    if (mode === "unavailable base") f.event.pull_request.base.sha = "a".repeat(40);
    if (mode === "unrelated base") f.event.pull_request.base.sha = f.head;
    if (mode === "octopus" || mode === "reversed parents") {
      const parents = mode === "octopus" ? [f.advanced, f.head, f.original] : [f.head, f.advanced];
      const candidate = f.git(
        "commit-tree",
        "HEAD^{tree}",
        ...parents.flatMap((p) => ["-p", p]),
        "-m",
        "invalid candidate"
      );
      f.git("checkout", "-q", "--detach", candidate);
      f.eventEnv.GITHUB_SHA = candidate;
    }
    assert.throws(f.resolve);
    const result = f.runAttribution();
    assert.equal(result.status, 2, result.stdout + result.stderr);
    assert.match(result.stderr, /INCOMPLETE/);
  });
}

test("CI invokes the event-aware AI gate instead of constructing a stale range", () => {
  const ci = readFileSync(new URL("../../../.github/workflows/ci.yml", import.meta.url), "utf8");
  const steps = load(ci).jobs.lint.steps.filter((step) =>
    step.name?.startsWith("AI attribution in commit / PR metadata")
  );
  assert.equal(steps.length, 1, "exactly one PR attribution step");
  const [step] = steps;
  assert.equal(step.if, "github.event_name == 'pull_request'");
  assert.equal(step.run, "npm run check:ai-attribution");
  assert.equal(step.env, undefined, "PR metadata comes from the verified event payload");
});
