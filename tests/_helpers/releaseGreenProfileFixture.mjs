import { execFileSync } from "node:child_process";
import { copyFileSync, mkdirSync, mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";

const PROFILE_INPUTS = [
  "config/quality/release-green-static-profile.json",
  "package.json",
  ".github/workflows/ci.yml",
  ".github/workflows/quality.yml",
];

/** Keep real profile inputs, but give every test its own explicit Git topology. */
export function createReleaseGreenProfileFixture(t, sourceRoot, { withBase = true } = {}) {
  const root = mkdtempSync(join(tmpdir(), "release-green-profile-"));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  for (const path of PROFILE_INPUTS) {
    const destination = join(root, path);
    mkdirSync(dirname(destination), { recursive: true });
    copyFileSync(join(sourceRoot, path), destination);
  }
  // Do not inherit GIT_DIR, GIT_WORK_TREE, signing settings or the developer's config.
  const env = {
    PATH: process.env.PATH,
    HOME: root,
    XDG_CONFIG_HOME: root,
    GIT_CONFIG_NOSYSTEM: "1",
    GIT_CONFIG_GLOBAL: join(root, "missing-global-config"),
    GIT_AUTHOR_NAME: "Profile Fixture",
    GIT_AUTHOR_EMAIL: "profile-fixture@example.invalid",
    GIT_COMMITTER_NAME: "Profile Fixture",
    GIT_COMMITTER_EMAIL: "profile-fixture@example.invalid",
    GIT_AUTHOR_DATE: "2000-01-01T00:00:00+00:00",
    GIT_COMMITTER_DATE: "2000-01-01T00:00:00+00:00",
    LC_ALL: "C",
  };
  const git = (...args) =>
    execFileSync("git", args, { cwd: root, env, encoding: "utf8", timeout: 30000 }).trim();
  git("init", "--quiet", "--initial-branch=fixture");
  git("add", "--", ...PROFILE_INPUTS);
  const tree = git("write-tree");
  const baseSha = git("commit-tree", tree, "-m", "fixture base");
  const headSha = git("commit-tree", tree, "-p", baseSha, "-m", "fixture head");
  git("update-ref", "--no-deref", "HEAD", headSha);
  if (withBase) git("update-ref", "refs/remotes/origin/main", baseSha);
  return { root, baseSha, headSha };
}
