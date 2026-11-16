import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import {
  baseRefCandidates,
  describeGateMode,
  detectGateMode,
  listChangedFiles,
  resolveGateMode,
  resolveGateModeInfo,
  resolveHeadBranch,
  resolvePrDiffBase,
} from "../../scripts/check/lib/gateMode.mjs";

const noArgs = ["node", "script"];

test("pull_request from a feature branch is pr mode", () => {
  const env = { GITHUB_EVENT_NAME: "pull_request", GITHUB_HEAD_REF: "feat/x" };
  assert.equal(resolveGateMode({ argv: noArgs, env }), "pr");
  assert.equal(
    resolveGateMode({ argv: noArgs, env: { ...env, GITHUB_EVENT_NAME: "pull_request_target" } }),
    "pr"
  );
});

test("the release PR (release/v* → main) is release mode", () => {
  const env = { GITHUB_EVENT_NAME: "pull_request", GITHUB_HEAD_REF: "release/v3.8.54" };
  assert.equal(resolveGateMode({ argv: noArgs, env }), "release");
});

test("queue batches are pr mode: merge_group and push to omni-queue/**", () => {
  assert.equal(detectGateMode({ GITHUB_EVENT_NAME: "merge_group" }).mode, "pr");
  assert.equal(
    detectGateMode({ GITHUB_EVENT_NAME: "push", GITHUB_REF_NAME: "omni-queue/release/v3.8.54/7" })
      .mode,
    "pr"
  );
});

test("push, schedule, dispatch and local runs stay strict (release)", () => {
  for (const env of [
    { GITHUB_EVENT_NAME: "push", GITHUB_REF_NAME: "main" },
    { GITHUB_EVENT_NAME: "push", GITHUB_REF_NAME: "release/v3.8.54" },
    { GITHUB_EVENT_NAME: "schedule" },
    { GITHUB_EVENT_NAME: "workflow_dispatch" },
    {},
  ]) {
    assert.equal(resolveGateMode({ argv: noArgs, env }), "release", JSON.stringify(env));
  }
});

test("--mode beats OMNIROUTE_GATE_MODE, which beats the event", () => {
  const env = {
    GITHUB_EVENT_NAME: "pull_request",
    GITHUB_HEAD_REF: "feat/x",
    OMNIROUTE_GATE_MODE: "release",
  };
  assert.deepEqual(resolveGateModeInfo({ argv: noArgs, env }).source, "env");
  assert.equal(resolveGateMode({ argv: noArgs, env }), "release");
  const info = resolveGateModeInfo({ argv: [...noArgs, "--mode=pr"], env });
  assert.equal(info.mode, "pr");
  assert.equal(info.source, "flag");
  assert.match(describeGateMode(info), /^mode=pr \(flag: --mode=pr\)$/);
});

test("an invalid mode is an error, never a silent default", () => {
  assert.throws(
    () => resolveGateMode({ argv: [...noArgs, "--mode=strict"], env: {} }),
    /invalid gate mode "strict"/
  );
  assert.throws(
    () => resolveGateMode({ argv: noArgs, env: { OMNIROUTE_GATE_MODE: "loose" } }),
    /OMNIROUTE_GATE_MODE/
  );
});

test("base candidates keep the documented order and drop duplicates", () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "gate-mode-pkg-"));
  try {
    fs.writeFileSync(path.join(dir, "package.json"), JSON.stringify({ version: "3.8.54" }));
    const env = {
      BASE_SHA: "abc",
      GITHUB_BASE_SHA: "abc",
      BASE_REF: "origin/x",
      GITHUB_BASE_REF: "release/v3.8.54",
    };
    assert.deepEqual(baseRefCandidates(env, dir), ["abc", "origin/x", "origin/release/v3.8.54"]);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

function gitIn(dir: string, ...args: string[]) {
  return execFileSync("git", args, {
    cwd: dir,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  }).trim();
}

test("merge base and changed files come from git, renames count on both sides", () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "gate-mode-git-"));
  try {
    gitIn(dir, "init", "-q", "-b", "base");
    gitIn(dir, "config", "user.email", "test@example.invalid");
    gitIn(dir, "config", "user.name", "test");
    gitIn(dir, "config", "commit.gpgsign", "false");
    fs.writeFileSync(path.join(dir, "a.txt"), "a\n");
    fs.writeFileSync(path.join(dir, "old.txt"), "old\n");
    gitIn(dir, "add", "-A");
    gitIn(dir, "commit", "-q", "-m", "base");
    const baseSha = gitIn(dir, "rev-parse", "HEAD");
    gitIn(dir, "checkout", "-q", "-b", "feat/x");
    fs.writeFileSync(path.join(dir, "a.txt"), "a2\n");
    gitIn(dir, "mv", "old.txt", "new.txt");
    gitIn(dir, "commit", "-q", "-am", "change");
    fs.writeFileSync(path.join(dir, "untracked.txt"), "u\n");

    const base = resolvePrDiffBase({ env: { BASE_REF: "base" }, cwd: dir });
    assert.deepEqual(base, { sha: baseSha, ref: "base" });
    assert.equal(resolvePrDiffBase({ env: { BASE_REF: "does-not-exist" }, cwd: dir }), null);
    assert.deepEqual(listChangedFiles(baseSha, { cwd: dir }), ["a.txt", "new.txt", "old.txt"]);
    assert.deepEqual(listChangedFiles(baseSha, { cwd: dir, includeWorktree: true }), [
      "a.txt",
      "new.txt",
      "old.txt",
      "untracked.txt",
    ]);
    assert.equal(resolveHeadBranch({ env: {}, cwd: dir }), "feat/x");
    assert.equal(resolveHeadBranch({ env: { GITHUB_HEAD_REF: "fix/y" }, cwd: dir }), "fix/y");
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});
