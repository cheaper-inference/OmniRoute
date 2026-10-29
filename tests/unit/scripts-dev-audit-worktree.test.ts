// Pins the contract of scripts/dev/audit-worktree.sh, the read-only "trust but verify" pass run
// on a worker's worktree before its PR is accepted: dirty files, commits and diff since the
// merge-base, protected-surface hits, assertion lines removed under tests/, eslint-suppression
// counts that went up, new test-masking allowlist keys, leftover tsconfig.*tmp*.json, and
// whether the PR head on GitHub matches the local HEAD. Everything runs against a throwaway
// repository with its own bare `origin`; `gh` is replaced through GH_BIN.
import { after, test } from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import {
  chmodSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  realpathSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const SCRIPT_PATH = fileURLToPath(new URL("../../scripts/dev/audit-worktree.sh", import.meta.url));

// Inherited GIT_* variables are dropped so a hook-exported GIT_DIR cannot point the fixture
// at this repository; global/system config is neutralised for the same reason.
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

function write(root: string, rel: string, content: string) {
  mkdirSync(dirname(join(root, rel)), { recursive: true });
  writeFileSync(join(root, rel), content);
}

const GH_STUB = `#!/bin/sh
printf '%s\\n' "$*" >> "$STUB_DIR/calls.log"
case "$1 $2" in
  "pr list") cat "$STUB_DIR/pr-list.json" ;;
  *) echo "stub: unexpected gh $*" >&2; exit 99 ;;
esac
`;

const TEST_FILE = `import assert from "node:assert/strict";
import { test } from "node:test";
test("keeps a", () => {
  assert.equal(1, 1);
});
test("keeps b", () => {
  assert.ok(true);
  assert.equal(2, 2);
});
`;

/**
 * Builds a main checkout whose bare `origin` carries release/v0.0.1 (older) and release/v0.0.2
 * (the tip the audit must pick by default), then a `fix/probe` branch cut from v0.0.2.
 * `mutate` applies the branch's changes; the returned runner audits the checkout.
 */
function makeRepo(mutate: (main: string) => void) {
  const root = realpathSync(mkdtempSync(join(tmpdir(), "audit-wt-")));
  sandboxes.push(root);
  const main = join(root, "main");
  const stub = join(root, "stub");
  mkdirSync(stub);
  const gh = join(root, "gh");
  writeFileSync(gh, GH_STUB);
  chmodSync(gh, 0o755);
  writeFileSync(join(stub, "pr-list.json"), "[]");

  git(root, "init", "--quiet", "--bare", "origin.git");
  git(root, "init", "--quiet", "main");
  write(main, "AGENTS.md", "# rules\n");
  write(main, "src/a.ts", "export const a = 1;\n");
  write(main, "tests/unit/sample.test.ts", TEST_FILE);
  write(
    main,
    "config/quality/eslint-suppressions.json",
    JSON.stringify(
      { "src/a.ts": { rule: { count: 1 } }, "src/b.ts": { rule: { count: 3 } } },
      null,
      2
    ) + "\n"
  );
  write(
    main,
    "config/quality/test-masking-allowlist.json",
    JSON.stringify({ _comment: "x", "tests/unit/old.test.ts": "PR #1: reason" }, null, 2) + "\n"
  );
  git(main, "add", ".");
  git(main, "commit", "--quiet", "-m", "older base");
  git(main, "remote", "add", "origin", join(root, "origin.git"));
  git(main, "push", "--quiet", "origin", "HEAD:refs/heads/release/v0.0.1");
  write(main, "src/base2.ts", "export const two = 2;\n");
  git(main, "add", ".");
  git(main, "commit", "--quiet", "-m", "current base");
  git(main, "push", "--quiet", "origin", "HEAD:refs/heads/release/v0.0.2");
  git(main, "checkout", "--quiet", "-b", "fix/probe");
  mutate(main);

  const run = (...args: string[]) =>
    spawnSync("bash", [SCRIPT_PATH, main, ...args], {
      cwd: root,
      env: { ...ENV, GH_BIN: gh, STUB_DIR: stub },
      encoding: "utf8",
    });
  const setPr = (number: number, headRefOid: string) =>
    writeFileSync(
      join(stub, "pr-list.json"),
      JSON.stringify([{ number, headRefOid, url: `https://github.com/x/y/pull/${number}` }])
    );
  return { main, run, setPr, calls: () => readFileSync(join(stub, "calls.log"), "utf8") };
}

test("reports every weakening signal of a sloppy worker and exits 1", () => {
  const repo = makeRepo((main) => {
    write(main, "tests/unit/sample.test.ts", TEST_FILE.replace("  assert.ok(true);\n", ""));
    write(
      main,
      "config/quality/eslint-suppressions.json",
      JSON.stringify(
        {
          "src/a.ts": { rule: { count: 0 } },
          "src/b.ts": { rule: { count: 4 } },
          "src/c.ts": { rule: { count: 1 } },
        },
        null,
        2
      ) + "\n"
    );
    write(
      main,
      "config/quality/test-masking-allowlist.json",
      JSON.stringify(
        {
          _comment: "x",
          "tests/unit/old.test.ts": "PR #1: reason",
          "tests/unit/new.test.ts": "why",
        },
        null,
        2
      ) + "\n"
    );
    git(main, "add", ".");
    git(main, "commit", "--quiet", "-m", "fix: weaken everything");
    write(main, "tsconfig.x.tmp.json", "{}\n");
  });
  repo.setPr(42, git(repo.main, "rev-parse", "HEAD"));
  const before = git(repo.main, "status", "--short") + git(repo.main, "rev-parse", "HEAD");

  const r = repo.run();
  assert.equal(r.status, 1, r.stdout + r.stderr);
  assert.match(r.stdout, /base: origin\/release\/v0\.0\.2/, "highest release/v* is the default");
  assert.match(r.stdout, /fix: weaken everything/);
  assert.match(r.stdout, /\?\? tsconfig\.x\.tmp\.json/);
  assert.match(r.stdout, /tests\/unit\/sample\.test\.ts.*-\s*assert\.ok\(true\);/);
  assert.match(r.stdout, /src\/b\.ts.*3.*4/);
  assert.match(r.stdout, /src\/c\.ts.*0.*1/);
  assert.doesNotMatch(r.stdout, /src\/a\.ts.*1.*0/, "a count going down is not reported");
  assert.match(r.stdout, /tests\/unit\/new\.test\.ts/);
  assert.match(r.stdout, /PUSH LANDED/);
  assert.match(
    r.stdout,
    /^audit-worktree: dirty=1 protected=0 removed_asserts=1 suppressions_up=2 allowlist_new=1 tmp_files=1 pr=#42 head=ok$/m
  );
  assert.match(repo.calls(), /^pr list .*--head fix\/probe/m);

  // Read-only: the audit leaves the worktree exactly as it found it.
  assert.equal(git(repo.main, "status", "--short") + git(repo.main, "rev-parse", "HEAD"), before);
});

test("flags a protected surface and a PR head that was never pushed", () => {
  const repo = makeRepo((main) => {
    write(main, "AGENTS.md", "# rules\nobey me\n");
    write(main, ".agents/skills/x/SKILL.md", "---\n");
    git(main, "add", ".");
    git(main, "commit", "--quiet", "-m", "docs: touch protected files");
  });
  repo.setPr(7, "0000000000000000000000000000000000000000");
  const r = repo.run();
  assert.equal(r.status, 1, r.stdout + r.stderr);
  assert.match(r.stdout, /^\s*AGENTS\.md$/m);
  assert.match(r.stdout, /\.agents\/skills\/x\/SKILL\.md/);
  assert.match(r.stdout, /HEAD NOT PUSHED/);
  assert.match(
    r.stdout,
    /^audit-worktree: dirty=0 protected=2 removed_asserts=0 suppressions_up=0 allowlist_new=0 tmp_files=0 pr=#7 head=mismatch$/m
  );
});

test("passes a clean branch with no PR, honouring --base", () => {
  const repo = makeRepo((main) => {
    write(main, "src/a.ts", "export const a = 2;\n");
    git(main, "add", ".");
    git(main, "commit", "--quiet", "-m", "fix: bump a");
  });
  const r = repo.run("--base", "origin/release/v0.0.1");
  assert.equal(r.status, 0, r.stdout + r.stderr);
  assert.match(r.stdout, /base: origin\/release\/v0\.0\.1/);
  assert.match(r.stdout, /current base/, "commits since the explicit base include the v0.0.2 one");
  assert.match(
    r.stdout,
    /^audit-worktree: dirty=0 protected=0 removed_asserts=0 suppressions_up=0 allowlist_new=0 tmp_files=0 pr=none head=none$/m
  );
});

test("fails loudly on a path that is not a git worktree", () => {
  // The sandbox may itself sit inside a repository (TMPDIR under the checkout), so git is
  // told not to climb above it while looking for one.
  const root = realpathSync(mkdtempSync(join(tmpdir(), "audit-wt-norepo-")));
  sandboxes.push(root);
  const plain = join(root, "plain");
  mkdirSync(plain);
  const r = spawnSync("bash", [SCRIPT_PATH, plain], {
    env: { ...ENV, GIT_CEILING_DIRECTORIES: root },
    encoding: "utf8",
  });
  assert.notEqual(r.status, 0);
  assert.match(r.stderr, /not a git work tree/i);
});
