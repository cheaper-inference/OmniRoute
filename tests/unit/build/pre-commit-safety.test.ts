import test from "node:test";
import assert from "node:assert/strict";
import { cpSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const repoRoot = fileURLToPath(new URL("../../../", import.meta.url));
const hook = readFileSync(join(repoRoot, ".husky/pre-commit"), "utf8");

const MIGRATION_GATE = "scripts/check/check-migration-numbering.mjs";
const STAGED_MIGRATIONS_CMD =
  "git diff --cached --name-only --diff-filter=ACMRD -- src/lib/db/migrations/";

function runHook(extra: Record<string, string> = {}, cwd = repoRoot) {
  // Execute the checked-in hook. Only the external tools are fixtures; no real
  // stash, index mutation or dependency installation is permitted by the probe.
  // MOCK_REAL_GIT=1 / MOCK_REAL_MIGRATION_GATE=1 let the end-to-end cases run the
  // real git and the real migration gate inside a throwaway repository.
  const tools = `
command() { if [ "$1 $2" = "-v npx" ] && [ "$MOCK_NPX_MISSING" = "1" ]; then return 1; fi; builtin command "$@"; }
npx() { printf 'NPX:%s\\n' "$*"; return "$MOCK_LINT_EXIT"; }
git() {
  if [ "$MOCK_REAL_GIT" = "1" ]; then builtin command git "$@"; return; fi
  printf 'GIT:%s\\n' "$*" >&2; printf '%s' "$MOCK_STAGED_MIGRATIONS"; return "$MOCK_GIT_EXIT"
}
node() {
  if [ "$1" = "${MIGRATION_GATE}" ]; then
    printf 'GATE:%s event=[%s] base=[%s]\\n' "$*" "\${GITHUB_EVENT_NAME-unset}" "\${MIGRATION_BASE_REF-unset}"
    if [ "$MOCK_REAL_MIGRATION_GATE" = "1" ]; then "$REAL_NODE" "$@"; return; fi
    return "$MOCK_MIGRATION_GATE_EXIT"
  fi
  printf 'NODE:%s\\n' "$*"
}
npm() { printf 'NPM:%s\\n' "$*"; }
sh() { printf 'SH:%s\\n' "$*"; }
`;
  return spawnSync("bash", ["-c", `${tools}\n${hook}`], {
    cwd,
    encoding: "utf8",
    env: {
      ...process.env,
      MOCK_NPX_MISSING: "0",
      MOCK_LINT_EXIT: "0",
      MOCK_REAL_GIT: "0",
      MOCK_STAGED_MIGRATIONS: "",
      MOCK_GIT_EXIT: "0",
      MOCK_REAL_MIGRATION_GATE: "0",
      MOCK_MIGRATION_GATE_EXIT: "0",
      REAL_NODE: process.execPath,
      ...extra,
    },
  });
}

test("hook never stashes and never downloads a missing lint-staged", () => {
  const result = runHook();
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /NPX:--no-install lint-staged --no-stash/);
  assert.match(result.stdout, /NODE:scripts\/check\/check-tracked-artifacts.mjs/);
});

test("missing npx blocks the commit instead of silently skipping all checks", () => {
  const result = runHook({ MOCK_NPX_MISSING: "1" });
  assert.notEqual(result.status, 0);
  assert.doesNotMatch(result.stdout, /NODE:|NPM:|GATE:/);
});

test("failed lint-staged preserves its exit even when the hook is executed directly", () => {
  const result = runHook({ MOCK_LINT_EXIT: "42" });
  assert.equal(result.status, 42);
  assert.doesNotMatch(result.stdout, /NODE:|NPM:/);
});

// #20578 — the migration-numbering gate runs locally, but only when the commit touches
// src/lib/db/migrations/, and before the slow steps.
test("hook wires the migration gate on staged migrations, before lint-staged", () => {
  const listAt = hook.indexOf(STAGED_MIGRATIONS_CMD);
  const gateAt = hook.indexOf(`node ${MIGRATION_GATE}`);
  const lintStagedAt = hook.indexOf("npx --no-install lint-staged");
  assert.ok(listAt > 0, "the hook lists the staged migrations");
  assert.ok(gateAt > listAt, "the hook runs the migration gate after listing them");
  assert.ok(gateAt < lintStagedAt, "the migration gate runs before lint-staged");
  // lint-staged appends file names, which parseGateArgs rejects: never route it there.
  const { "lint-staged": lintStaged } = JSON.parse(
    readFileSync(join(repoRoot, "package.json"), "utf8")
  );
  assert.doesNotMatch(JSON.stringify(lintStaged), /check-migration-numbering/);
});

test("a commit without staged migrations never runs the migration gate", () => {
  const result = runHook();
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stderr, new RegExp(`GIT:${STAGED_MIGRATIONS_CMD.slice(4)}`));
  assert.doesNotMatch(result.stdout, /GATE:/);
});

test("a staged migration runs the gate (names only) before lint-staged", () => {
  const result = runHook({ MOCK_STAGED_MIGRATIONS: "src/lib/db/migrations/242_x.sql\n" });
  assert.equal(result.status, 0, result.stderr);
  const gateLine = result.stdout.indexOf(`GATE:${MIGRATION_GATE} event=[] base=[]`);
  assert.ok(gateLine >= 0, result.stdout);
  assert.ok(gateLine < result.stdout.indexOf("NPX:--no-install lint-staged"), result.stdout);
});

test("a failing migration gate blocks the commit before lint-staged", () => {
  const result = runHook({
    MOCK_STAGED_MIGRATIONS: "src/lib/db/migrations/242_x.sql\n",
    MOCK_MIGRATION_GATE_EXIT: "1",
  });
  assert.equal(result.status, 1);
  assert.match(result.stdout, /GATE:/);
  assert.doesNotMatch(result.stdout, /NPX:|NODE:|NPM:/);
});

test("a failing staged-file listing blocks the commit instead of skipping the gate", () => {
  const result = runHook({ MOCK_GIT_EXIT: "128" });
  assert.notEqual(result.status, 0);
  assert.doesNotMatch(result.stdout, /NPX:|NODE:|NPM:|GATE:/);
});

// End to end: the real hook text, real git and the real gate, in a throwaway repository in
// the OS temp dir with a copy of the gate and of the migrations directory.
function makeScratchRepo() {
  const root = mkdtempSync(join(tmpdir(), "pre-commit-migration-gate-"));
  for (const rel of [
    MIGRATION_GATE,
    "scripts/check/lib/allowlist.mjs",
    "scripts/check/lib/migrationBaseDiff.mjs",
    "scripts/check/lib/migrationNaming.mjs",
    "scripts/lib/is-main-module.mjs",
  ]) {
    mkdirSync(dirname(join(root, rel)), { recursive: true });
    cpSync(join(repoRoot, rel), join(root, rel));
  }
  cpSync(join(repoRoot, "src/lib/db/migrations"), join(root, "src/lib/db/migrations"), {
    recursive: true,
  });
  writeFileSync(join(root, "README.md"), "scratch\n");
  const git = (...args: string[]) => {
    const r = spawnSync("git", args, { cwd: root, encoding: "utf8" });
    assert.equal(r.status, 0, `git ${args.join(" ")}: ${r.stderr}`);
  };
  git("init", "-q");
  git("add", "-A");
  git(
    "-c",
    "user.name=scratch",
    "-c",
    "user.email=scratch@example.invalid",
    "-c",
    "commit.gpgsign=false",
    "commit",
    "-q",
    "-m",
    "base"
  );
  const stage = (rel: string, content: string) => {
    writeFileSync(join(root, rel), content);
    git("add", "--", rel);
  };
  return { root, stage };
}

function runHookEndToEnd(root: string) {
  // A CI-like environment must not turn the local run into a base comparison.
  return runHook(
    {
      MOCK_REAL_GIT: "1",
      MOCK_REAL_MIGRATION_GATE: "1",
      GITHUB_EVENT_NAME: "pull_request",
      MIGRATION_BASE_REF: "refs/heads/does-not-exist",
    },
    root
  );
}

test("end to end: a hand-numbered migration fails the commit with the gate's message", () => {
  const { root, stage } = makeScratchRepo();
  try {
    stage("src/lib/db/migrations/242_x.sql", "SELECT 1;\n");
    const result = runHookEndToEnd(root);
    assert.equal(result.status, 1, result.stdout + result.stderr);
    assert.match(result.stderr, /nome inválido: 242_x\.sql/);
    assert.match(result.stderr, /npm run db:new-migration -- <descricao>/);
    assert.doesNotMatch(result.stdout, /NPX:/);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("end to end: a correctly named migration passes the gate", () => {
  const { root, stage } = makeScratchRepo();
  try {
    stage("src/lib/db/migrations/20261120000000_scratch_probe.sql", "SELECT 1;\n");
    const result = runHookEndToEnd(root);
    assert.equal(result.status, 0, result.stdout + result.stderr);
    assert.match(result.stdout, /\[check-migration-numbering\] comparação com a base: pulada/);
    assert.match(result.stdout, /\[check-migration-numbering\] OK/);
    assert.match(result.stdout, /NPX:--no-install lint-staged --no-stash/);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("end to end: a commit without migrations does not run the gate", () => {
  const { root, stage } = makeScratchRepo();
  try {
    stage("README.md", "changed\n");
    const result = runHookEndToEnd(root);
    assert.equal(result.status, 0, result.stdout + result.stderr);
    assert.doesNotMatch(result.stdout + result.stderr, /GATE:|check-migration-numbering/);
    assert.match(result.stdout, /NPX:--no-install lint-staged --no-stash/);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});
