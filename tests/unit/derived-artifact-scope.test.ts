import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import {
  pathTouches,
  prModeSkipLine,
  releaseOnlyUnlessTouched,
  resolveDerivedScope,
} from "../../scripts/check/lib/derivedArtifactScope.mjs";

const noArgs = ["node", "script"];
const PR_ENV = { GITHUB_EVENT_NAME: "pull_request", GITHUB_HEAD_REF: "feat/x" };
const HERO = "docs/diagrams/readme-hero.svg";
const BUDGET = "docs/diagrams/free-tier-budget.svg";

test("pathTouches: exact files, and directories given with a trailing slash", () => {
  assert.equal(pathTouches([HERO], HERO), true);
  assert.equal(pathTouches(["docs/diagrams/readme-hero.svg.bak"], HERO), false);
  assert.equal(pathTouches(["skills/omni-mcp/SKILL.md"], "skills/omni-mcp/"), true);
  assert.equal(pathTouches(["skills/omni-mcpx/SKILL.md"], "skills/omni-mcp/"), false);
  assert.equal(pathTouches([], HERO), false);
});

test("release mode is strict on every artifact and never asks git", () => {
  const scope = resolveDerivedScope({
    artifacts: [HERO, BUDGET],
    argv: noArgs,
    env: {},
    cwd: "/nonexistent-dir-never-read",
  });
  assert.equal(scope.info.mode, "release");
  assert.deepEqual(scope.strict, [HERO, BUDGET]);
  assert.deepEqual(scope.skipped, []);
  assert.equal(scope.reason, null);
});

test("pr mode is strict only on the artifacts the change touched", () => {
  const scope = resolveDerivedScope({
    artifacts: [HERO, BUDGET],
    argv: noArgs,
    env: PR_ENV,
    changedFiles: ["src/shared/constants/providers.ts", BUDGET],
  });
  assert.equal(scope.info.mode, "pr");
  assert.deepEqual(scope.strict, [BUDGET]);
  assert.deepEqual(scope.skipped, [HERO]);
  assert.equal(scope.reason, "pr-mode");
});

test("pr mode without a resolvable base skips (same rule as the other diff-aware gates)", () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "derived-scope-"));
  try {
    const scope = resolveDerivedScope({
      artifacts: [HERO],
      argv: noArgs,
      env: { ...PR_ENV, BASE_SHA: "deadbeef" },
      cwd: dir,
    });
    assert.deepEqual(scope.strict, []);
    assert.deepEqual(scope.skipped, [HERO]);
    assert.equal(scope.reason, "base-unresolved");
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test("pr mode without a resolvable base can fail closed (onUnresolved: strict)", () => {
  // The dedicated full-history check (check:generated-artifacts) must never pass an artifact
  // it could not attribute: no base → every artifact is judged.
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "derived-scope-closed-"));
  try {
    const scope = resolveDerivedScope({
      artifacts: [HERO, BUDGET],
      argv: noArgs,
      env: { ...PR_ENV, BASE_SHA: "deadbeef" },
      cwd: dir,
      onUnresolved: "strict",
    });
    assert.equal(scope.info.mode, "pr");
    assert.deepEqual(scope.strict, [HERO, BUDGET]);
    assert.deepEqual(scope.skipped, []);
    assert.equal(scope.reason, "base-unresolved");
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test("pr mode reads the change list from git when none is given", () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "derived-scope-git-"));
  const git = (...args: string[]) =>
    execFileSync("git", args, { cwd: dir, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] });
  try {
    git("init", "-q", "-b", "main");
    git("config", "user.email", "test@example.invalid");
    git("config", "user.name", "test");
    fs.mkdirSync(path.join(dir, "docs/diagrams"), { recursive: true });
    fs.writeFileSync(path.join(dir, HERO), "<svg/>");
    fs.writeFileSync(path.join(dir, BUDGET), "<svg/>");
    git("add", ".");
    git("commit", "-q", "-m", "base");
    const base = git("rev-parse", "HEAD").trim();
    fs.writeFileSync(path.join(dir, BUDGET), "<svg>changed</svg>");
    git("commit", "-q", "-am", "touch budget");

    const scope = resolveDerivedScope({
      artifacts: [HERO, BUDGET],
      argv: noArgs,
      env: { ...PR_ENV, BASE_SHA: base, CI: "true" },
      cwd: dir,
    });
    assert.deepEqual(scope.strict, [BUDGET]);
    assert.deepEqual(scope.skipped, [HERO]);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test("releaseOnlyUnlessTouched: false (run) in release mode or when touched, a reason otherwise", () => {
  assert.equal(releaseOnlyUnlessTouched(HERO, { argv: noArgs, env: {} }), false);
  assert.equal(
    releaseOnlyUnlessTouched(HERO, { argv: noArgs, env: PR_ENV, changedFiles: [HERO] }),
    false
  );
  const reason = releaseOnlyUnlessTouched(HERO, {
    argv: noArgs,
    env: PR_ENV,
    changedFiles: ["README.md"],
  });
  assert.equal(typeof reason, "string");
  assert.match(String(reason), /^SKIP reason=pr-mode — /);
  assert.match(String(reason), /docs\/diagrams\/readme-hero\.svg/);
  assert.match(String(reason), /the strict check runs in release mode/);
});

test("prModeSkipLine follows the shared SKIP wording", () => {
  assert.equal(
    prModeSkipLine("[x]", "pr-mode", "nothing to judge"),
    "[x] SKIP reason=pr-mode — nothing to judge; the strict check runs in release mode (release PR, Release-Green, nightly)"
  );
  assert.equal(
    prModeSkipLine("", "base-unresolved", "no base"),
    "SKIP reason=base-unresolved — no base; the strict check runs in release mode (release PR, Release-Green, nightly)"
  );
});

test("releaseOnlyUnlessTouched without a base names the full-history check that judges the edit", () => {
  // test-unit checks out a shallow merge ref (no base): the test skips, and says where the
  // edited-artifact comparison runs instead.
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "derived-scope-why-"));
  try {
    const reason = releaseOnlyUnlessTouched(HERO, {
      argv: noArgs,
      env: { ...PR_ENV, BASE_SHA: "deadbeef" },
      cwd: dir,
    });
    assert.match(String(reason), /^SKIP reason=base-unresolved — /);
    assert.match(String(reason), /npm run check:generated-artifacts/);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});
