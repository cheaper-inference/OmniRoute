import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import * as syncWorktree from "../../scripts/release/sync-next-cycle.mjs";

const { finishSyncWorktree, prepareSyncWorktree, publishSyncWorktree } = syncWorktree;

const hookBody = '#!/bin/sh\nset -eu\nnode_modules/.bin/sentinel > "$QG_HOOK_SENTINEL"\n';
const sentinelBody = "#!/bin/sh\nprintf '%s\\n' 'HARDLINK_EXECUTABLE_SENTINEL'\n";

function git(args, cwd, delta = {}) {
  return execFileSync("git", args, {
    cwd,
    env: {
      ...process.env,
      GIT_CONFIG_NOSYSTEM: "1",
      GIT_CONFIG_GLOBAL: "/dev/null",
      ...delta,
    },
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  }).trim();
}

function fixture(t, { dependencies = true, existingHooks = true } = {}) {
  const base = fs.mkdtempSync(path.join(os.tmpdir(), "sync hardlink $fixture-"));
  t.after(() => fs.rmSync(base, { recursive: true, force: true }));
  const root = path.join(base, "source");
  const worktree = path.join(base, "worktree");
  const template = path.join(base, "empty-template");
  for (const directory of [root, template]) fs.mkdirSync(directory);
  const source = path.join(root, "node_modules");
  const destination = path.join(worktree, "node_modules");
  const sourceHooks = path.join(root, ".husky", "_");
  const hooks = path.join(worktree, ".husky", "_");
  fs.mkdirSync(sourceHooks, { recursive: true });
  fs.writeFileSync(path.join(sourceHooks, "pre-commit"), hookBody, { mode: 0o755 });
  if (dependencies) {
    fs.mkdirSync(path.join(source, ".bin"), { recursive: true });
    fs.writeFileSync(path.join(source, "sentinel.txt"), "DEPENDENCY_SENTINEL\n");
    fs.writeFileSync(path.join(source, ".bin", "sentinel"), sentinelBody, { mode: 0o755 });
  }
  // Every valid case uses an actually registered worktree of its own synthetic repository.
  git(["init", "--quiet", "--initial-branch=fixture-base", `--template=${template}`], root);
  fs.writeFileSync(path.join(root, ".gitignore"), "node_modules/\n.husky/_/\n");
  fs.writeFileSync(path.join(root, ".husky", ".gitkeep"), "");
  git(["add", ".gitignore", ".husky/.gitkeep"], root);
  git(
    [
      "-c",
      "user.name=Fixture",
      "-c",
      "user.email=fixture@example.invalid",
      "commit",
      "-m",
      "fixture seed",
    ],
    root
  );
  git(["config", "core.hooksPath", ".husky/_"], root);
  const branch = "fixture-sync";
  git(["worktree", "add", "--quiet", "-b", branch, worktree, "HEAD"], root);
  if (existingHooks) {
    fs.mkdirSync(hooks);
    fs.writeFileSync(path.join(hooks, "pre-commit"), hookBody, { mode: 0o755 });
    fs.writeFileSync(path.join(hooks, "existing-marker"), "EXISTING_HOOK_SENTINEL\n");
  }
  return { base, root, worktree, source, destination, sourceHooks, hooks, template, branch };
}

function linkedFixture(t) {
  const f = fixture(t, { existingHooks: false });
  return {
    ...f,
    ownership: {
      createdWorktreeThisRun: true,
      identity: fs.lstatSync(f.worktree),
      branch: f.branch,
      publishedHead: git(["rev-parse", "HEAD"], f.worktree),
    },
  };
}

function fakeCopy(f, body, run) {
  const bin = path.join(f.base, "copy-failure-bin");
  fs.mkdirSync(bin);
  fs.writeFileSync(path.join(bin, "cp"), `#!/bin/sh\n${body}\n`, { mode: 0o755 });
  const previous = process.env.PATH;
  try {
    process.env.PATH = `${bin}${path.delimiter}${previous || ""}`;
    return run();
  } finally {
    if (previous === undefined) delete process.env.PATH;
    else process.env.PATH = previous;
  }
}

test("fresh dependencies are physical hard links with a working executable", (t) => {
  const f = fixture(t);
  const before = fs.statSync(path.join(f.source, "sentinel.txt"));
  const existingHook = fs.statSync(path.join(f.hooks, "pre-commit"));
  prepareSyncWorktree(f.root, f.worktree, f.branch);
  assert.equal(fs.lstatSync(f.destination).isSymbolicLink(), false);
  assert.equal(fs.lstatSync(f.destination).isDirectory(), true);
  const copy = fs.statSync(path.join(f.destination, "sentinel.txt"));
  assert.equal(copy.dev, before.dev);
  assert.equal(copy.ino, before.ino);
  assert.ok(copy.nlink >= 2);
  const binary = path.join(f.destination, ".bin", "sentinel");
  const binarySource = fs.statSync(path.join(f.source, ".bin", "sentinel"));
  assert.equal(fs.lstatSync(binary).isSymbolicLink(), false);
  assert.equal(fs.statSync(binary).ino, binarySource.ino);
  assert.equal(fs.statSync(binary).dev, binarySource.dev);
  assert.equal(execFileSync(binary, [], { encoding: "utf8" }), "HARDLINK_EXECUTABLE_SENTINEL\n");
  assert.equal(
    fs.readFileSync(path.join(f.source, "sentinel.txt"), "utf8"),
    "DEPENDENCY_SENTINEL\n"
  );
  assert.equal(fs.statSync(path.join(f.hooks, "pre-commit")).ino, existingHook.ino);
});

test("existing physical dependencies and hooks are reused without source copies", (t) => {
  const f = fixture(t, { dependencies: false });
  fs.mkdirSync(f.destination);
  fs.writeFileSync(path.join(f.destination, "existing-marker"), "EXISTING_DEPENDENCY\n");
  fs.rmSync(f.sourceHooks, { recursive: true });
  const before = fs.statSync(f.destination);
  const hookBefore = fs.statSync(f.hooks);
  prepareSyncWorktree(f.root, f.worktree, f.branch);
  assert.equal(fs.statSync(f.destination).ino, before.ino);
  assert.equal(fs.statSync(f.hooks).ino, hookBefore.ino);
  assert.equal(
    fs.readFileSync(path.join(f.destination, "existing-marker"), "utf8"),
    "EXISTING_DEPENDENCY\n"
  );
  assert.equal(
    fs.readFileSync(path.join(f.hooks, "existing-marker"), "utf8"),
    "EXISTING_HOOK_SENTINEL\n"
  );
  assert.equal(fs.existsSync(f.source), false);
});

test("existing live or broken dependency symlinks are rejected and preserved", (t) => {
  const f = fixture(t);
  for (const target of [f.source, path.join(f.base, "missing")]) {
    fs.symlinkSync(target, f.destination, "dir");
    assert.throws(
      () => prepareSyncWorktree(f.root, f.worktree, f.branch),
      /existing node_modules must be a physical directory/
    );
    assert.equal(fs.lstatSync(f.destination).isSymbolicLink(), true);
    fs.unlinkSync(f.destination);
  }
  assert.equal(
    fs.readFileSync(path.join(f.source, "sentinel.txt"), "utf8"),
    "DEPENDENCY_SENTINEL\n"
  );
});

test("an existing non-directory dependency destination is preserved and rejected", (t) => {
  const f = fixture(t);
  fs.writeFileSync(f.destination, "DO_NOT_REPLACE\n");
  assert.throws(
    () => prepareSyncWorktree(f.root, f.worktree, f.branch),
    /existing node_modules must be a physical directory/
  );
  assert.equal(fs.readFileSync(f.destination, "utf8"), "DO_NOT_REPLACE\n");
});

test("missing or symlinked dependency sources cannot create a destination", (t) => {
  const f = fixture(t, { dependencies: false });
  assert.throws(() => prepareSyncWorktree(f.root, f.worktree, f.branch), { code: "ENOENT" });
  assert.equal(fs.existsSync(f.destination), false);
  const actual = path.join(f.base, "actual-dependencies");
  fs.mkdirSync(actual);
  fs.symlinkSync(actual, f.source, "dir");
  assert.throws(
    () => prepareSyncWorktree(f.root, f.worktree, f.branch),
    /source node_modules must be a physical directory/
  );
  assert.equal(fs.existsSync(f.destination), false);
});

test("a failed copy removes only its partial directory and preserves existing hooks", (t) => {
  const f = fixture(t);
  const before = fs.statSync(f.hooks);
  fakeCopy(f, 'printf partial > "$4/partial-copy"\nexit 73', () => {
    assert.throws(
      () => prepareSyncWorktree(f.root, f.worktree, f.branch),
      (error) => error.status === 73
    );
  });
  assert.equal(fs.existsSync(f.destination), false);
  assert.equal(fs.statSync(f.hooks).ino, before.ino);
  assert.equal(
    fs.readFileSync(path.join(f.hooks, "existing-marker"), "utf8"),
    "EXISTING_HOOK_SENTINEL\n"
  );
  assert.equal(
    fs.readFileSync(path.join(f.source, "sentinel.txt"), "utf8"),
    "DEPENDENCY_SENTINEL\n"
  );
});

test("invalid newly copied hooks roll back both owned copies without changing sources", (t) => {
  const f = fixture(t, { existingHooks: false });
  fs.chmodSync(path.join(f.sourceHooks, "pre-commit"), 0o644);
  assert.throws(
    () => prepareSyncWorktree(f.root, f.worktree, f.branch),
    /pre-commit must be a regular executable file/
  );
  assert.equal(fs.existsSync(f.destination), false);
  assert.equal(fs.existsSync(f.hooks), false);
  assert.equal(fs.readFileSync(path.join(f.sourceHooks, "pre-commit"), "utf8"), hookBody);
  assert.equal(fs.statSync(path.join(f.sourceHooks, "pre-commit")).mode & 0o777, 0o644);
});

test("rollback rejects a replaced owned directory without deleting its replacement", (t) => {
  const f = fixture(t);
  fakeCopy(
    f,
    'mv -- "$4" "$4.parked"\nmkdir -- "$4"\nprintf keep > "$4/replacement"\nexit 73',
    () => {
      assert.throws(
        () => prepareSyncWorktree(f.root, f.worktree, f.branch),
        /rollback is incomplete/
      );
    }
  );
  assert.equal(fs.readFileSync(path.join(f.destination, "replacement"), "utf8"), "keep");
  assert.equal(fs.lstatSync(`${f.destination}.parked`).isDirectory(), true);
  assert.equal(
    fs.readFileSync(path.join(f.source, "sentinel.txt"), "utf8"),
    "DEPENDENCY_SENTINEL\n"
  );
});

test("new physical hooks run the dependency binary during a real fixture commit", (t) => {
  const f = fixture(t, { existingHooks: false });
  const sourceBefore = fs.statSync(path.join(f.sourceHooks, "pre-commit"));
  prepareSyncWorktree(f.root, f.worktree, f.branch);
  assert.equal(fs.existsSync(f.hooks), true);
  assert.equal(fs.lstatSync(f.hooks).isSymbolicLink(), false);
  const installed = fs.lstatSync(path.join(f.hooks, "pre-commit"));
  assert.equal(installed.isFile(), true);
  assert.notEqual(installed.ino, sourceBefore.ino);
  assert.notEqual(installed.mode & 0o111, 0);
  const sentinel = path.join(f.base, "hook-executed");
  git(
    [
      "-c",
      "user.name=Fixture",
      "-c",
      "user.email=fixture@example.invalid",
      "commit",
      "--allow-empty",
      "-m",
      "fixture hook proof",
    ],
    f.worktree,
    { QG_HOOK_SENTINEL: sentinel }
  );
  assert.equal(fs.readFileSync(sentinel, "utf8"), "HARDLINK_EXECUTABLE_SENTINEL\n");
  assert.equal(fs.readFileSync(path.join(f.sourceHooks, "pre-commit"), "utf8"), hookBody);
});

test("preexisting incomplete hooks fail without replacement or deletion", (t) => {
  const f = fixture(t);
  fs.unlinkSync(path.join(f.hooks, "pre-commit"));
  const before = fs.statSync(f.hooks);
  assert.throws(() => prepareSyncWorktree(f.root, f.worktree, f.branch), { code: "ENOENT" });
  assert.equal(fs.statSync(f.hooks).ino, before.ino);
  assert.equal(
    fs.readFileSync(path.join(f.hooks, "existing-marker"), "utf8"),
    "EXISTING_HOOK_SENTINEL\n"
  );
  assert.equal(fs.existsSync(path.join(f.hooks, "pre-commit")), false);
  assert.equal(fs.existsSync(f.destination), false);
});

test("an inactive configured hook path fails while preserving existing directories", (t) => {
  const f = fixture(t);
  fs.mkdirSync(f.destination);
  fs.writeFileSync(path.join(f.destination, "existing-marker"), "EXISTING_DEPENDENCY\n");
  git(["config", "core.hooksPath", "other-hooks"], f.worktree);
  const before = fs.statSync(f.hooks);
  assert.throws(
    () => prepareSyncWorktree(f.root, f.worktree, f.branch),
    /core.hooksPath must activate/
  );
  assert.equal(git(["config", "--get", "core.hooksPath"], f.worktree), "other-hooks");
  assert.equal(fs.statSync(f.hooks).ino, before.ino);
  assert.equal(
    fs.readFileSync(path.join(f.destination, "existing-marker"), "utf8"),
    "EXISTING_DEPENDENCY\n"
  );
});

test("existing hook symlinks and non-executable hooks fail without replacement", (t) => {
  const f = fixture(t);
  const preCommit = path.join(f.hooks, "pre-commit");
  fs.chmodSync(preCommit, 0o644);
  assert.throws(
    () => prepareSyncWorktree(f.root, f.worktree, f.branch),
    /pre-commit must be a regular executable file/
  );
  assert.equal(fs.statSync(preCommit).mode & 0o777, 0o644);
  fs.unlinkSync(preCommit);
  fs.symlinkSync(path.join(f.sourceHooks, "pre-commit"), preCommit);
  assert.throws(
    () => prepareSyncWorktree(f.root, f.worktree, f.branch),
    /pre-commit must be a regular executable file/
  );
  assert.equal(fs.lstatSync(preCommit).isSymbolicLink(), true);
  fs.rmSync(f.hooks, { recursive: true });
  fs.symlinkSync(f.sourceHooks, f.hooks, "dir");
  assert.throws(
    () => prepareSyncWorktree(f.root, f.worktree, f.branch),
    /existing .husky\/\_ must be a physical directory/
  );
  assert.equal(fs.lstatSync(f.hooks).isSymbolicLink(), true);
  assert.equal(fs.existsSync(f.destination), false);
});

test("a reused registered worktree is preserved after successful sync", (t) => {
  const f = linkedFixture(t);
  const before = fs.lstatSync(f.worktree);
  const removed = finishSyncWorktree(f.root, f.worktree, {
    ...f.ownership,
    createdWorktreeThisRun: false,
  });
  assert.equal(removed, false);
  assert.equal(fs.lstatSync(f.worktree).ino, before.ino);
  assert.equal(git(["symbolic-ref", "--short", "HEAD"], f.worktree), "fixture-sync");
});

test("a clean worktree created by this invocation is removed without force", (t) => {
  const f = linkedFixture(t);
  prepareSyncWorktree(f.root, f.worktree, f.branch);
  assert.equal(fs.lstatSync(f.destination).isSymbolicLink(), false);
  assert.equal(finishSyncWorktree(f.root, f.worktree, f.ownership), true);
  assert.equal(fs.existsSync(f.worktree), false);
  assert.equal(
    fs.readFileSync(path.join(f.source, "sentinel.txt"), "utf8"),
    "DEPENDENCY_SENTINEL\n"
  );
  assert.equal(
    git(["show-ref", "--verify", "--hash", "refs/heads/fixture-sync"], f.root).length,
    40
  );
});

test("teardown rejects a mismatched worktree identity before removing it", (t) => {
  const f = linkedFixture(t);
  assert.throws(
    () =>
      finishSyncWorktree(f.root, f.worktree, {
        ...f.ownership,
        identity: { dev: f.ownership.identity.dev, ino: f.ownership.identity.ino + 1 },
      }),
    /worktree identity changed/
  );
  assert.equal(fs.lstatSync(f.worktree).ino, f.ownership.identity.ino);
});

test("teardown preserves a worktree with new work or a different branch", (t) => {
  const f = linkedFixture(t);
  const sentinel = path.join(f.worktree, "incoming-work");
  fs.writeFileSync(sentinel, "PRESERVE_NEW_WORK\n");
  assert.throws(() => finishSyncWorktree(f.root, f.worktree, f.ownership), /clean state changed/);
  assert.equal(fs.readFileSync(sentinel, "utf8"), "PRESERVE_NEW_WORK\n");
  fs.unlinkSync(sentinel);
  assert.throws(
    () =>
      finishSyncWorktree(f.root, f.worktree, {
        ...f.ownership,
        branch: "another-branch",
      }),
    /repository or branch mismatch/
  );
  assert.equal(fs.existsSync(f.worktree), true);
});

test("a registered worktree returns the verified repository and branch identity", (t) => {
  const f = linkedFixture(t);
  const identity = prepareSyncWorktree(f.root, f.worktree, f.branch);
  assert.deepEqual(identity, {
    dev: f.ownership.identity.dev,
    ino: f.ownership.identity.ino,
    head: f.ownership.publishedHead,
  });
  assert.equal(fs.lstatSync(f.destination).isSymbolicLink(), false);
  assert.equal(fs.lstatSync(f.hooks).isDirectory(), true);
});

test("a foreign repository is rejected before dependency or hook copies", (t) => {
  const f = fixture(t, { existingHooks: false });
  const foreign = path.join(f.base, "foreign");
  fs.mkdirSync(foreign);
  fs.mkdirSync(path.join(foreign, ".husky"));
  git(["init", "--quiet", `--initial-branch=${f.branch}`, `--template=${f.template}`], foreign);
  git(["config", "core.hooksPath", ".husky/_"], foreign);
  git(
    [
      "-c",
      "user.name=Fixture",
      "-c",
      "user.email=fixture@example.invalid",
      "commit",
      "--allow-empty",
      "-m",
      "foreign fixture seed",
    ],
    foreign
  );
  const before = fs.readdirSync(foreign).sort();
  const beforeHead = git(["rev-parse", "HEAD"], foreign);
  assert.throws(
    () => prepareSyncWorktree(f.root, foreign, f.branch),
    /repository or branch mismatch/
  );
  assert.deepEqual(fs.readdirSync(foreign).sort(), before);
  assert.equal(git(["rev-parse", "HEAD"], foreign), beforeHead);
  assert.equal(fs.existsSync(path.join(foreign, "node_modules")), false);
  assert.equal(fs.existsSync(path.join(foreign, ".husky", "_")), false);
});

test("a registered worktree on the wrong branch is rejected before copies", (t) => {
  const f = fixture(t, { existingHooks: false });
  const before = fs.readdirSync(f.worktree).sort();
  const beforeHead = git(["rev-parse", "HEAD"], f.worktree);
  assert.throws(
    () => prepareSyncWorktree(f.root, f.worktree, "another-branch"),
    /repository or branch mismatch/
  );
  assert.deepEqual(fs.readdirSync(f.worktree).sort(), before);
  assert.equal(git(["rev-parse", "HEAD"], f.worktree), beforeHead);
  assert.equal(git(["symbolic-ref", "--short", "HEAD"], f.worktree), f.branch);
  assert.equal(fs.existsSync(f.destination), false);
  assert.equal(fs.existsSync(f.hooks), false);
});

test("an unregistered directory with a copied git pointer is rejected before copies", (t) => {
  const f = fixture(t, { existingHooks: false });
  const impostor = path.join(f.base, "unregistered");
  fs.mkdirSync(impostor);
  fs.mkdirSync(path.join(impostor, ".husky"));
  const pointer = fs.readFileSync(path.join(f.worktree, ".git"));
  fs.writeFileSync(path.join(impostor, ".git"), pointer);
  const before = fs.readdirSync(impostor).sort();
  assert.throws(
    () => prepareSyncWorktree(f.root, impostor, f.branch),
    /worktree (registration|repository or branch) mismatch/
  );
  assert.deepEqual(fs.readdirSync(impostor).sort(), before);
  assert.deepEqual(fs.readFileSync(path.join(impostor, ".git")), pointer);
  assert.equal(fs.existsSync(path.join(impostor, "node_modules")), false);
  assert.equal(fs.existsSync(path.join(impostor, ".husky", "_")), false);
  assert.equal(fs.existsSync(f.worktree), true);
});

test("a new clean HEAD after publication is preserved instead of being removed", (t) => {
  const f = linkedFixture(t);
  prepareSyncWorktree(f.root, f.worktree, f.branch);
  const publishedHead = git(["rev-parse", "HEAD"], f.worktree);
  const hookSentinel = path.join(f.base, "later-commit-hook");
  git(
    [
      "-c",
      "user.name=Fixture",
      "-c",
      "user.email=fixture@example.invalid",
      "commit",
      "--allow-empty",
      "-m",
      "later session fixture commit",
    ],
    f.worktree,
    { QG_HOOK_SENTINEL: hookSentinel }
  );
  const newerHead = git(["rev-parse", "HEAD"], f.worktree);
  assert.notEqual(newerHead, publishedHead);
  assert.equal(git(["status", "--porcelain", "--untracked-files=normal"], f.worktree), "");
  assert.throws(
    () =>
      finishSyncWorktree(f.root, f.worktree, {
        ...f.ownership,
        publishedHead,
      }),
    /HEAD changed since publication/
  );
  assert.equal(git(["rev-parse", "HEAD"], f.worktree), newerHead);
  assert.equal(fs.readFileSync(hookSentinel, "utf8"), "HARDLINK_EXECUTABLE_SENTINEL\n");
});

function privateOrigin(f) {
  const origin = path.join(f.base, "private-origin.git");
  git(["init", "--bare", "--quiet", `--template=${f.template}`, origin], f.root);
  git(["remote", "add", "origin", origin], f.root);
  return origin;
}

function withFixtureEnvironment(delta, run) {
  const previous = new Map(Object.keys(delta).map((key) => [key, process.env[key]]));
  try {
    Object.assign(process.env, delta);
    return run();
  } finally {
    for (const [key, value] of previous) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  }
}

test("publication confirms the exact pinned SHA on a private bare origin", (t) => {
  const f = linkedFixture(t);
  const origin = privateOrigin(f);
  prepareSyncWorktree(f.root, f.worktree, f.branch);
  const expectedHead = git(["rev-parse", "HEAD"], f.worktree);
  const publication = publishSyncWorktree(f.worktree, f.branch, expectedHead);
  assert.deepEqual(publication, { expectedHead, confirmedHead: expectedHead });
  assert.equal(
    git(["show-ref", "--verify", "--hash", `refs/heads/${f.branch}`], origin),
    expectedHead
  );
  assert.equal(
    finishSyncWorktree(f.root, f.worktree, {
      ...f.ownership,
      publishedHead: publication.confirmedHead,
    }),
    true
  );
  assert.equal(fs.existsSync(f.worktree), false);
});

test("a pre-push HEAD advance cannot change the pinned publication or allow cleanup", (t) => {
  const f = linkedFixture(t);
  const origin = privateOrigin(f);
  prepareSyncWorktree(f.root, f.worktree, f.branch);
  const expectedHead = git(["rev-parse", "HEAD"], f.worktree);
  fs.writeFileSync(
    path.join(f.hooks, "pre-push"),
    '#!/bin/sh\nset -eu\ngit -c user.name=Fixture -c user.email=fixture@example.invalid commit --allow-empty -m "concurrent fixture advance"\n',
    { mode: 0o755 }
  );
  const sentinel = path.join(f.base, "pre-push-commit-hook");
  withFixtureEnvironment({ QG_HOOK_SENTINEL: sentinel }, () => {
    assert.throws(
      () => publishSyncWorktree(f.worktree, f.branch, expectedHead),
      /HEAD changed during publication/
    );
  });
  const newerHead = git(["rev-parse", "HEAD"], f.worktree);
  assert.notEqual(newerHead, expectedHead);
  assert.equal(
    git(["show-ref", "--verify", "--hash", `refs/heads/${f.branch}`], origin),
    expectedHead
  );
  assert.equal(fs.readFileSync(sentinel, "utf8"), "HARDLINK_EXECUTABLE_SENTINEL\n");
  assert.equal(fs.existsSync(f.worktree), true);
});

test("a divergent private remote readback blocks publication acceptance and preserves the worktree", (t) => {
  const f = linkedFixture(t);
  const origin = privateOrigin(f);
  prepareSyncWorktree(f.root, f.worktree, f.branch);
  const replacement = git(["rev-parse", "HEAD"], f.worktree);
  const sentinel = path.join(f.base, "publication-commit-hook");
  git(
    [
      "-c",
      "user.name=Fixture",
      "-c",
      "user.email=fixture@example.invalid",
      "commit",
      "--allow-empty",
      "-m",
      "fixture publish candidate",
    ],
    f.worktree,
    { QG_HOOK_SENTINEL: sentinel }
  );
  const candidate = git(["rev-parse", "HEAD"], f.worktree);
  fs.mkdirSync(path.join(origin, "hooks"), { recursive: true });
  fs.writeFileSync(
    path.join(origin, "hooks", "post-receive"),
    '#!/bin/sh\nset -eu\ngit update-ref "refs/heads/$QG_REMOTE_BRANCH" "$QG_REMOTE_REPLACEMENT"\n',
    { mode: 0o755 }
  );
  withFixtureEnvironment({ QG_REMOTE_BRANCH: f.branch, QG_REMOTE_REPLACEMENT: replacement }, () => {
    assert.throws(
      () => publishSyncWorktree(f.worktree, f.branch, candidate),
      /remote publication readback mismatch/
    );
  });
  assert.equal(
    git(["show-ref", "--verify", "--hash", `refs/heads/${f.branch}`], origin),
    replacement
  );
  assert.equal(git(["rev-parse", "HEAD"], f.worktree), candidate);
  assert.equal(fs.existsSync(f.worktree), true);
});

test("a local HEAD change before publication is retained without pushing it", (t) => {
  const f = linkedFixture(t);
  const origin = privateOrigin(f);
  prepareSyncWorktree(f.root, f.worktree, f.branch);
  const expectedHead = git(["rev-parse", "HEAD"], f.worktree);
  const sentinel = path.join(f.base, "before-push-commit-hook");
  git(
    [
      "-c",
      "user.name=Fixture",
      "-c",
      "user.email=fixture@example.invalid",
      "commit",
      "--allow-empty",
      "-m",
      "fixture advance before publication",
    ],
    f.worktree,
    { QG_HOOK_SENTINEL: sentinel }
  );
  const newerHead = git(["rev-parse", "HEAD"], f.worktree);
  assert.notEqual(newerHead, expectedHead);
  assert.throws(
    () => publishSyncWorktree(f.worktree, f.branch, expectedHead),
    /HEAD changed before publication/
  );
  assert.equal(
    git(["for-each-ref", "--format=%(objectname)", `refs/heads/${f.branch}`], origin),
    ""
  );
  assert.equal(git(["rev-parse", "HEAD"], f.worktree), newerHead);
  assert.equal(fs.existsSync(f.worktree), true);
});
