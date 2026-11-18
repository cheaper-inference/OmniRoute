// Git sandbox for omni-queue integration tests: a bare "origin" (playing GitHub), a working
// clone to seed commits, and PRs published the way GitHub exposes them (refs/pull/<n>/head).
//
// Everything lives under one os.tmpdir() directory removed by cleanup(). Commit identities come
// from the environment of each git process (GIT_AUTHOR_*/GIT_COMMITTER_*); the user's global
// and system git config are never read nor written (GIT_CONFIG_GLOBAL → empty file).

import { spawnSync } from "node:child_process";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";

import { createGit } from "../../../../../scripts/merge-queue/gitexec.mjs";

export const BOT = Object.freeze({
  name: "omni-queue-test[bot]",
  email: "1+omni-queue-test[bot]@users.noreply.github.com",
});
export const DEV = Object.freeze({ name: "Sandbox Dev", email: "dev@example.invalid" });

/**
 * @param {{base?: string}} [options]
 */
export function createSandbox({ base = "release/v1.0.0" } = {}) {
  const root = mkdtempSync(join(tmpdir(), "omni-queue-wp2-"));
  const originDir = join(root, "origin.git");
  const workDir = join(root, "work");
  const emptyConfig = join(root, "empty-gitconfig");
  writeFileSync(emptyConfig, "");

  /** Isolation env shared by the helper and by createGit in the tests. */
  const isolationEnv = {
    GIT_CONFIG_NOSYSTEM: "1",
    GIT_CONFIG_GLOBAL: emptyConfig,
    HOME: root,
    GIT_TERMINAL_PROMPT: "0",
    LC_ALL: "C",
  };

  const baseEnv = { ...process.env };
  for (const key of Object.keys(baseEnv)) {
    if (key.startsWith("GIT_")) delete baseEnv[key];
  }
  const devEnv = {
    ...baseEnv,
    ...isolationEnv,
    GIT_AUTHOR_NAME: DEV.name,
    GIT_AUTHOR_EMAIL: DEV.email,
    GIT_COMMITTER_NAME: DEV.name,
    GIT_COMMITTER_EMAIL: DEV.email,
  };

  /** Run git in `cwd` as the sandbox developer; throws with stderr on failure. */
  function git(cwd, args, { input, allowFail = false } = {}) {
    const res = spawnSync("git", args, { cwd, env: devEnv, input, encoding: "utf8" });
    if (res.error) throw res.error;
    if (!allowFail && res.status !== 0) {
      throw new Error(`git ${args.join(" ")} (in ${cwd}) failed: ${res.stderr}`);
    }
    return { code: res.status, stdout: res.stdout.trim(), stderr: res.stderr };
  }
  const work = (args, opts) => git(workDir, args, opts);
  const origin = (args, opts) => git(originDir, args, opts);

  mkdirSync(originDir, { recursive: true });
  origin(["init", "--bare", "--quiet", "--initial-branch=main"]);
  // GitHub serves reachable commits by SHA (a later tick on a fresh runner fetches the candidate).
  origin(["config", "uploadpack.allowReachableSHA1InWant", "true"]);
  git(root, ["clone", "--quiet", originDir, workDir]);

  function writeFiles(files) {
    for (const [path, content] of Object.entries(files)) {
      const full = join(workDir, path);
      mkdirSync(dirname(full), { recursive: true });
      writeFileSync(full, content);
    }
  }

  /** Commit `files` on top of `from` (detached) and return the new commit SHA. */
  function commitOn(from, files, message) {
    if (from) work(["checkout", "--quiet", "--detach", from]);
    writeFiles(files);
    work(["add", "--all"]);
    work(["commit", "--quiet", "-m", message]);
    return work(["rev-parse", "HEAD"]).stdout;
  }

  // Seed the base branch.
  work(["checkout", "--quiet", "--orphan", "seed"]);
  const seedSha = commitOn(
    null,
    { "README.md": "sandbox\n", "shared.txt": "line 1\nline 2\nline 3\n" },
    "seed"
  );
  work(["push", "--quiet", "origin", `${seedSha}:refs/heads/${base}`]);

  const sandbox = {
    root,
    originDir,
    workDir,
    base,
    isolationEnv,
    /** Remote URL of origin for prepareRepo (a local path; never a partial clone). */
    remoteUrl: originDir,
    /** Current tip of a branch on origin, or null. */
    branchSha(branch) {
      const res = origin(["rev-parse", "--verify", "--quiet", `refs/heads/${branch}`], {
        allowFail: true,
      });
      return res.code === 0 ? res.stdout : null;
    },
    baseSha() {
      return sandbox.branchSha(base);
    },
    /** Commit on top of the current base tip and advance the base on origin (a manual merge). */
    advanceBase(files, message = "base moves") {
      const sha = commitOn(sandbox.baseSha(), files, message);
      work(["push", "--quiet", "origin", `${sha}:refs/heads/${base}`]);
      return sha;
    },
    /**
     * Publish PR #n: commit `files` on top of `from` (default: base tip) and expose it as
     * refs/pull/<n>/head on origin. Re-publishing the same n with `from` = previous head moves
     * the PR head forward (a new push by the contributor).
     */
    publishPr(n, files, { from, message } = {}) {
      const sha = commitOn(from ?? sandbox.baseSha(), files, message ?? `pr ${n}`);
      work(["push", "--quiet", "origin", `${sha}:refs/pull/${n}/head`]);
      return sha;
    },
    /** Publish a PR whose history is unrelated to the base (orphan root commit). */
    publishUnrelatedPr(n, files) {
      work(["checkout", "--quiet", "--orphan", `orphan-${n}`]);
      work(["rm", "-r", "-f", "--quiet", "--ignore-unmatch", "."]);
      const sha = commitOn(null, files, `unrelated pr ${n}`);
      work(["push", "--quiet", "origin", `${sha}:refs/pull/${n}/head`]);
      return sha;
    },
    /** Install an executable hook in origin (e.g. pre-receive to simulate a protected branch). */
    installOriginHook(name, script) {
      const path = join(originDir, "hooks", name);
      writeFileSync(path, script, { mode: 0o755 });
    },
    /** Run git in origin (read-only inspection in asserts). */
    origin,
    /** Run git in the working clone. */
    work,
    /** A fresh empty directory under the sandbox root (for a scratch repository). */
    newDir(name) {
      const dir = join(root, name);
      mkdirSync(dir, { recursive: true });
      return dir;
    },
    /**
     * createGit for a scratch repository, committing as the bot. createGit inherits process.env,
     * so every GIT_* variable the test process carries (e.g. GIT_INDEX_FILE or
     * GIT_OBJECT_DIRECTORY when the suite runs inside a git hook) is cleared here: Node's spawn
     * drops `undefined` entries. The bot identity and the token's auth config are kept.
     */
    scratchGit(dir, extra = {}) {
      return createGit({
        cwd: dir,
        identity: BOT,
        env: { ...inheritedGitEnvCleared({ keepAuth: Boolean(extra.token) }), ...isolationEnv },
        ...extra,
      });
    },
    cleanup() {
      rmSync(root, { recursive: true, force: true });
    },
  };
  return sandbox;
}

/**
 * Every GIT_* key of the current process.env mapped to undefined, except the identity variables
 * createGit sets from `identity` and, with keepAuth, the GIT_CONFIG_* entries it sets for a token.
 * @param {{keepAuth?: boolean}} [options]
 */
export function inheritedGitEnvCleared({ keepAuth = false } = {}) {
  const keep = (key) =>
    /^GIT_(AUTHOR|COMMITTER)_(NAME|EMAIL)$/.test(key) ||
    (keepAuth && /^GIT_CONFIG_(COUNT|KEY_\d+|VALUE_\d+)$/.test(key));
  return Object.fromEntries(
    Object.keys(process.env)
      .filter((key) => key.startsWith("GIT_") && !keep(key))
      .map((key) => [key, undefined])
  );
}

/**
 * PrRef as the tick would record it.
 * @param {number} n @param {string} head @param {object} [extra]
 */
export function prRef(n, head, extra = {}) {
  return {
    n,
    head,
    title: `PR ${n}`,
    author: `dev${n}`,
    labeledAt: "2026-11-13T12:00:00.000Z",
    ...extra,
  };
}
