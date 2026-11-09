// Concurrency contract of scripts/dev/new-worktree.sh. Six parallel invocations in the
// 2026-10 campaign raced inside the shared .git: three died with exit 255 after `git branch`
// had already run, leaving a branch with no worktree that had to be cleaned by hand before
// a retry. The script now serialises itself on a lock in the common git dir (flock, with a
// mkdir fallback) and rolls the branch back when the worktree never came to exist.
// Every fixture is a throwaway repository; the real repo is never touched.
import { after, test } from "node:test";
import assert from "node:assert/strict";
import { spawn, spawnSync, type ChildProcess } from "node:child_process";
import {
  chmodSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  realpathSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const SCRIPT_PATH = fileURLToPath(new URL("../../scripts/dev/new-worktree.sh", import.meta.url));
const BASE = "release/v0.0.1";
const WAITING_RE = /another new-worktree\.sh is running — waiting/;

const ENV: NodeJS.ProcessEnv = {
  ...Object.fromEntries(Object.entries(process.env).filter(([key]) => !key.startsWith("GIT_"))),
  GIT_CONFIG_GLOBAL: "/dev/null",
  GIT_CONFIG_SYSTEM: "/dev/null",
  GIT_AUTHOR_NAME: "Fixture",
  GIT_AUTHOR_EMAIL: "fixture@example.com",
  GIT_COMMITTER_NAME: "Fixture",
  GIT_COMMITTER_EMAIL: "fixture@example.com",
};

const sandboxes: string[] = [];
after(() => {
  for (const dir of sandboxes) rmSync(dir, { recursive: true, force: true });
});

function git(cwd: string, ...args: string[]) {
  const r = spawnSync("git", args, { cwd, env: ENV, encoding: "utf8" });
  assert.equal(r.status, 0, `git ${args.join(" ")}: ${r.stderr}`);
  return r.stdout.trim();
}

function branchExists(cwd: string, branch: string) {
  const r = spawnSync("git", ["show-ref", "--verify", "--quiet", `refs/heads/${branch}`], {
    cwd,
    env: ENV,
  });
  return r.status === 0;
}

/** Same layout as new-worktree-hooks-path.test.ts: bare origin carrying BASE + a main checkout. */
function makeFixture() {
  const root = realpathSync(mkdtempSync(join(tmpdir(), "new-worktree-lock-")));
  sandboxes.push(root);
  const main = join(root, "main");
  git(root, "init", "--quiet", "--bare", "origin.git");
  git(root, "init", "--quiet", "main");
  mkdirSync(join(main, ".husky"));
  writeFileSync(join(main, ".husky", "pre-commit"), "exit 0\n");
  git(main, "add", ".husky");
  git(main, "commit", "--quiet", "-m", "base");
  git(main, "remote", "add", "origin", join(root, "origin.git"));
  git(main, "push", "--quiet", "origin", `HEAD:refs/heads/${BASE}`);
  mkdirSync(join(main, ".husky", "_"), { recursive: true });
  writeFileSync(join(main, ".husky", "_", "pre-commit"), "#!/bin/sh\nexit 0\n");
  chmodSync(join(main, ".husky", "_", "pre-commit"), 0o755);
  git(main, "config", "core.hooksPath", ".husky/_");
  const lock = join(main, ".git", "omniroute-new-worktree.lock");
  return { root, main, lock };
}

function runScript(main: string, branch: string, extraEnv: Record<string, string> = {}) {
  return spawnSync("bash", [SCRIPT_PATH, branch, BASE], {
    cwd: main,
    env: { ...ENV, ...extraEnv },
    encoding: "utf8",
  });
}

function runScriptAsync(main: string, branch: string) {
  return new Promise<{ status: number | null; stdout: string; stderr: string }>((resolve) => {
    const child = spawn("bash", [SCRIPT_PATH, branch, BASE], { cwd: main, env: ENV });
    let stdout = "";
    let stderr = "";
    child.stdout.on("data", (chunk) => (stdout += chunk));
    child.stderr.on("data", (chunk) => (stderr += chunk));
    child.on("close", (status) => resolve({ status, stdout, stderr }));
  });
}

/** Holds `lock` with flock for `seconds`, resolving once the holder has really acquired it. */
function holdLock(lock: string, seconds: number): ChildProcess {
  const holder = spawn("flock", [lock, "sleep", String(seconds)], { env: ENV });
  for (let i = 0; i < 100; i++) {
    const probe = spawnSync("flock", ["-n", lock, "true"], { env: ENV });
    if (probe.status !== 0) return holder; // contended: the holder owns it now
    spawnSync("sleep", ["0.05"]);
  }
  holder.kill();
  assert.fail("lock holder never acquired the lock");
}

function waitFor(child: ChildProcess) {
  return new Promise<void>((resolve) => child.on("close", () => resolve()));
}

test("waits for a running invocation (flock) instead of racing it", async () => {
  const { main, lock } = makeFixture();
  const holder = holdLock(lock, 1.5);
  const r = runScript(main, "fix/waits");
  await waitFor(holder);
  assert.equal(r.status, 0, `stdout:\n${r.stdout}\nstderr:\n${r.stderr}`);
  assert.match(r.stderr, WAITING_RE);
  assert.match(r.stdout, /hooks: ativos/);
  assert.ok(existsSync(join(main, ".claude", "worktrees", "waits")));
});

test("two concurrent invocations both succeed", async () => {
  const { main } = makeFixture();
  const [a, b] = await Promise.all([
    runScriptAsync(main, "fix/alpha"),
    runScriptAsync(main, "fix/beta"),
  ]);
  assert.equal(a.status, 0, `alpha stdout:\n${a.stdout}\nstderr:\n${a.stderr}`);
  assert.equal(b.status, 0, `beta stdout:\n${b.stdout}\nstderr:\n${b.stderr}`);
  const list = git(main, "worktree", "list", "--porcelain");
  assert.match(list, /\/\.claude\/worktrees\/alpha$/m);
  assert.match(list, /\/\.claude\/worktrees\/beta$/m);
  assert.ok(branchExists(main, "fix/alpha"));
  assert.ok(branchExists(main, "fix/beta"));
});

test("gives up with a clear error when the lock is never released within the wait", async () => {
  const { main, lock } = makeFixture();
  const holder = holdLock(lock, 3);
  const r = runScript(main, "fix/starved", { NEW_WORKTREE_LOCK_WAIT: "1" });
  holder.kill();
  await waitFor(holder);
  assert.equal(r.status, 1, `stdout:\n${r.stdout}\nstderr:\n${r.stderr}`);
  assert.match(r.stderr, WAITING_RE);
  assert.match(r.stderr, /lock/);
  assert.equal(branchExists(main, "fix/starved"), false);
});

test("falls back to a mkdir lock when flock is unavailable", async () => {
  const { main, lock } = makeFixture();
  const lockDir = `${lock}.d`;
  mkdirSync(lockDir);
  // Release the mkdir lock from outside after a second, as a finishing sibling would.
  const releaser = spawn("bash", ["-c", `sleep 1; rmdir "${lockDir}"`], { env: ENV });
  const r = runScript(main, "fix/mkdir-lock", { NEW_WORKTREE_NO_FLOCK: "1" });
  await waitFor(releaser);
  assert.equal(r.status, 0, `stdout:\n${r.stdout}\nstderr:\n${r.stderr}`);
  assert.match(r.stderr, WAITING_RE);
  assert.match(r.stdout, /hooks: ativos/);
  assert.equal(existsSync(lockDir), false, "mkdir lock not released on exit");
});

test("rolls the branch back when the worktree could not be created", () => {
  const { main } = makeFixture();
  // A regular file where the worktrees directory should be: `git worktree add -b` creates
  // the branch first, then fails to create the leading directories.
  mkdirSync(join(main, ".claude"));
  writeFileSync(join(main, ".claude", "worktrees"), "blocker\n");
  const r = runScript(main, "fix/orphan");
  assert.notEqual(r.status, 0);
  assert.match(r.stderr, /rollback/i);
  assert.equal(branchExists(main, "fix/orphan"), false, "branch left behind after failure");
});

test("never deletes a branch that already existed before the failed run", () => {
  const { main } = makeFixture();
  git(main, "branch", "fix/mine", `origin/${BASE}`);
  mkdirSync(join(main, ".claude"));
  writeFileSync(join(main, ".claude", "worktrees"), "blocker\n");
  const r = runScript(main, "fix/mine");
  assert.notEqual(r.status, 0);
  assert.ok(branchExists(main, "fix/mine"), "pre-existing branch must survive");
});
