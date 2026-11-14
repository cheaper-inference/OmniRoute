/**
 * tests/unit/check-migration-numbering-base-diff.test.ts
 *
 * Base comparison mode of `check:migration-numbering` (scripts/check/check-migration-numbering.mjs
 * + scripts/check/lib/migrationBaseDiff.mjs):
 *   - a migration that exists on the base and is gone from disk (deleted OR renamed) fails,
 *     whether or not it is in a release tag, unless it is a rename covered by a
 *     RENAMED_MIGRATION_COMPATIBILITY entry with identical content (warning); such a rename
 *     always runs the commutation checker, whatever its new timestamp;
 *   - a base migration whose content changed warns and runs the commutation checker;
 *   - a date-named migration added with a timestamp <= the newest one on the base runs the
 *     commutation checker (scripts/check/migration-commutation.ts, swapped for a fake here
 *     through MIGRATION_COMMUTATION_SCRIPT, real in the "real checker" cases): exit 0
 *     passes, exit 1 fails with the diff;
 *   - an old-format file added below the base's newest old-format one fails;
 *   - out-of-order or edited files with DML warn;
 *   - `--base-latest-tag` compares with the newest release tag in HEAD's history.
 *
 * The end-to-end cases build a throwaway git repository with `git init` under os.tmpdir()
 * (never a clone of this repository) and run the real gate with cwd there.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "../..");
const GATE = path.join(ROOT, "scripts/check/check-migration-numbering.mjs");
const LIB = path.join(ROOT, "scripts/check/lib/migrationBaseDiff.mjs");
// The guard in tests/unit/db/migration-version-ordering.test.ts re-runs this file against a
// copy of the real directory that already holds a timestamped migration.
const REAL_DIR = path.resolve(
  process.env.OMNIROUTE_TEST_MIGRATIONS_SOURCE_DIR || path.join(ROOT, "src/lib/db/migrations")
);
const MIG = "src/lib/db/migrations";

// Past stamps on the cut-over day: always valid (>= cut-over, never in the future).
const BASE_STAMP_FILE = "20261113000100_base_feature.sql";

const tmpRoot = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-mig-basediff-"));
test.after(() => {
  fs.rmSync(tmpRoot, { recursive: true, force: true });
});

type BaseDiff = {
  removed: Array<{ name: string; renamedTo?: string }>;
  modified: string[];
  addedOutOfOrder: string[];
  baseMaxTimestamp: string | null;
};
type FindBaseDiff = (input: {
  baseFiles: Map<string, string>;
  headFiles: Map<string, string>;
}) => BaseDiff;

async function loadPure(): Promise<FindBaseDiff> {
  const mod = (await import(LIB)) as { findBaseDiffAnomalies: FindBaseDiff };
  return mod.findBaseDiffAnomalies;
}

const map = (entries: Array<[string, string]>) => new Map<string, string>(entries);

// --- Pure function --------------------------------------------------------------------

test("pure: identical base and head have no anomalies", async () => {
  const find = await loadPure();
  const files = map([
    ["239_a.sql", "b1"],
    ["20261113000100_x.sql", "b2"],
  ]);
  const r = find({ baseFiles: files, headFiles: new Map(files) });
  assert.deepEqual(r.removed, []);
  assert.deepEqual(r.modified, []);
  assert.deepEqual(r.addedOutOfOrder, []);
  assert.equal(r.baseMaxTimestamp, "20261113000100");
});

test("pure: a deleted base migration is reported as removed", async () => {
  const find = await loadPure();
  const r = find({
    baseFiles: map([
      ["239_a.sql", "b1"],
      ["20261113000100_x.sql", "b2"],
    ]),
    headFiles: map([["239_a.sql", "b1"]]),
  });
  assert.deepEqual(r.removed, [{ name: "20261113000100_x.sql" }]);
  assert.deepEqual(r.addedOutOfOrder, []);
});

test("pure: a renamed base migration is removed and points to its new name", async () => {
  const find = await loadPure();
  const byContent = find({
    baseFiles: map([["20261113000100_x.sql", "b2"]]),
    headFiles: map([["20261113000200_other_name.sql", "b2"]]),
  });
  assert.deepEqual(byContent.removed, [
    { name: "20261113000100_x.sql", renamedTo: "20261113000200_other_name.sql" },
  ]);
  const byDescription = find({
    baseFiles: map([["20261113000100_x.sql", "b2"]]),
    headFiles: map([["20261113000200_x.sql", "b3"]]),
  });
  assert.deepEqual(byDescription.removed, [
    { name: "20261113000100_x.sql", renamedTo: "20261113000200_x.sql" },
  ]);
  // The renamed copy is newer than the base: it is not "out of order".
  assert.deepEqual(byDescription.addedOutOfOrder, []);
});

test("pure: a base migration with different content is modified, not removed", async () => {
  const find = await loadPure();
  const r = find({
    baseFiles: map([["239_a.sql", "b1"]]),
    headFiles: map([["239_a.sql", "b9"]]),
  });
  assert.deepEqual(r.removed, []);
  assert.deepEqual(r.modified, ["239_a.sql"]);
});

test("pure: added date-named migrations newer than the base are in order", async () => {
  const find = await loadPure();
  const r = find({
    baseFiles: map([["20261113000100_x.sql", "b2"]]),
    headFiles: map([
      ["20261113000100_x.sql", "b2"],
      ["20261113000500_y.sql", "b3"],
    ]),
  });
  assert.deepEqual(r.addedOutOfOrder, []);
});

test("pure: an added date-named migration not newer than the base is out of order", async () => {
  const find = await loadPure();
  const r = find({
    baseFiles: map([["20261113000100_x.sql", "b2"]]),
    headFiles: map([
      ["20261113000100_x.sql", "b2"],
      ["20261113000050_older.sql", "b3"],
      ["20261113000100_same_second.sql", "b4"],
      ["20261113000500_newer.sql", "b5"],
    ]),
  });
  assert.deepEqual(r.addedOutOfOrder, [
    "20261113000050_older.sql",
    "20261113000100_same_second.sql",
  ]);
});

test("pure: a base without any date-named migration never yields out-of-order files", async () => {
  const find = await loadPure();
  const r = find({
    baseFiles: map([["239_a.sql", "b1"]]),
    headFiles: map([
      ["239_a.sql", "b1"],
      ["20261113000050_first.sql", "b3"],
    ]),
  });
  assert.equal(r.baseMaxTimestamp, null);
  assert.deepEqual(r.addedOutOfOrder, []);
});

// --- End-to-end against a throwaway git repository ----------------------------------------

/**
 * The real legacy (NNN_) migrations only. The synthetic stamps below (20261113000xxx) must stay
 * the newest of every synthetic base: a real timestamped migration is always dated later, and
 * copying it in would turn "newer than the base" into "out of order" (V2-1 of the final review).
 */
const realNames = () =>
  fs
    .readdirSync(REAL_DIR)
    .filter((f) => f.endsWith(".sql"))
    .filter((f) => /^\d{3}_/.test(f));

/** Environment for the gate: no inherited CI/GitHub/base variables from the test runner. */
function cleanEnv(extra: Record<string, string> = {}): NodeJS.ProcessEnv {
  const env: NodeJS.ProcessEnv = { ...process.env };
  for (const key of Object.keys(env)) {
    if (key.startsWith("GITHUB_") || key === "CI" || key.startsWith("MIGRATION_")) delete env[key];
  }
  return { ...env, ...extra };
}

function git(cwd: string, args: string[]) {
  const r = spawnSync(
    "git",
    ["-c", "core.hooksPath=/dev/null", "-c", "commit.gpgsign=false", ...args],
    {
      cwd,
      encoding: "utf-8",
      env: {
        ...cleanEnv(),
        GIT_AUTHOR_NAME: "Migration Gate Test",
        GIT_AUTHOR_EMAIL: "gate-test@example.invalid",
        GIT_COMMITTER_NAME: "Migration Gate Test",
        GIT_COMMITTER_EMAIL: "gate-test@example.invalid",
      },
    }
  );
  assert.equal(r.status, 0, `git ${args.join(" ")}: ${r.stderr}`);
  return r.stdout.trim();
}

let repoCounter = 0;

/**
 * New repo with the real old-format names + one date-named file, committed. The old-format
 * files hold a distinct comment each, or their real SQL with `realContent` (needed when the
 * real commutation checker boots them).
 */
function makeRepo(options: { realContent?: boolean } = {}): {
  dir: string;
  mig: string;
  base: string;
} {
  repoCounter += 1;
  const dir = path.join(tmpRoot, `repo-${repoCounter}`);
  const mig = path.join(dir, MIG);
  fs.mkdirSync(mig, { recursive: true });
  for (const name of realNames()) {
    if (options.realContent) fs.copyFileSync(path.join(REAL_DIR, name), path.join(mig, name));
    else fs.writeFileSync(path.join(mig, name), `-- ${name}\n`);
  }
  fs.writeFileSync(path.join(mig, BASE_STAMP_FILE), "CREATE TABLE IF NOT EXISTS base_t (id);\n");
  git(dir, ["init", "-q", "-b", "main"]);
  git(dir, ["add", "-A"]);
  git(dir, ["commit", "-q", "-m", "base"]);
  return { dir, mig, base: git(dir, ["rev-parse", "HEAD"]) };
}

function writeFake(): string {
  const file = path.join(tmpRoot, "fake-commutation.mjs");
  if (!fs.existsSync(file)) {
    fs.writeFileSync(
      file,
      [
        'import fs from "node:fs";',
        'import path from "node:path";',
        "const args = process.argv.slice(2);",
        "const get = (flag) => args[args.indexOf(flag) + 1];",
        "if (process.env.FAKE_RECORD) {",
        '  const baseDir = get("--base-dir");',
        '  const headDir = get("--head-dir");',
        "  fs.writeFileSync(process.env.FAKE_RECORD, JSON.stringify({",
        "    argv: args,",
        "    base: fs.readdirSync(baseDir).sort(),",
        "    head: fs.readdirSync(headDir).sort(),",
        '    baseStamp: fs.readFileSync(path.join(baseDir, "' + BASE_STAMP_FILE + '"), "utf-8"),',
        "  }));",
        "}",
        "if (process.env.FAKE_OUTPUT) console.log(process.env.FAKE_OUTPUT);",
        'process.exit(Number(process.env.FAKE_EXIT ?? "0"));',
        "",
      ].join("\n")
    );
  }
  return file;
}

function gate(cwd: string, args: string[], env: Record<string, string> = {}) {
  return spawnSync(process.execPath, [GATE, ...args], {
    cwd,
    encoding: "utf-8",
    env: cleanEnv({ MIGRATION_COMMUTATION_SCRIPT: writeFake(), FAKE_EXIT: "1", ...env }),
  });
}

test("e2e: without a base outside CI the comparison is skipped with one line", () => {
  const { dir } = makeRepo();
  const r = gate(dir, []);
  assert.equal(r.status, 0, r.stderr);
  assert.match(r.stdout, /comparação com a base: pulada \(sem --base\)/);
});

test("e2e: deleting a merged date-named migration fails against the base", () => {
  const { dir, mig, base } = makeRepo();
  fs.rmSync(path.join(mig, BASE_STAMP_FILE));
  const r = gate(dir, ["--base", base]);
  assert.equal(r.status, 1, r.stdout);
  assert.match(r.stderr, new RegExp(BASE_STAMP_FILE.replace(".", "\\.")));
  assert.match(r.stderr, /já mesclada não pode ser apagada nem renomeada/);
  assert.match(r.stderr, /npm run db:new-migration/);
});

test("e2e: renaming a merged migration fails and names the new file", () => {
  const { dir, mig, base } = makeRepo();
  fs.renameSync(path.join(mig, BASE_STAMP_FILE), path.join(mig, "20261113000200_base_feature.sql"));
  const r = gate(dir, ["--base", base]);
  assert.equal(r.status, 1, r.stdout);
  assert.match(r.stderr, /já mesclada não pode ser apagada nem renomeada/);
  assert.match(r.stderr, /renomeada para 20261113000200_base_feature\.sql/);
});

test("e2e: deleting a merged old-format migration fails against the base too", () => {
  const { dir, mig, base } = makeRepo();
  const victim = realNames().find((f) => f.startsWith("120_"))!;
  fs.rmSync(path.join(mig, victim));
  const r = gate(dir, ["--base", base]);
  assert.equal(r.status, 1);
  assert.match(r.stderr, new RegExp(`${victim.replace(".", "\\.")}.*já mesclada`));
});

test("e2e: editing a merged migration is a non-blocking warning (annotation in Actions)", () => {
  const { dir, mig, base } = makeRepo();
  fs.appendFileSync(path.join(mig, BASE_STAMP_FILE), "-- fix\n");
  // An edited base migration now runs the commutation checker (V1-3); a harmless edit is one
  // the checker reports as equal (FAKE_EXIT=0), and then only the warning remains.
  const record = path.join(tmpRoot, `record-edit-${repoCounter}.json`);
  const local = gate(dir, ["--base", base], { FAKE_EXIT: "0", FAKE_RECORD: record });
  assert.equal(local.status, 0, local.stderr);
  assert.equal(fs.existsSync(record), true, "the commutation checker must run for an edit");
  assert.match(
    local.stdout,
    /conteúdo alterado.*20261113000100_base_feature\.sql|20261113000100_base_feature\.sql.*conteúdo alterado/
  );
  const actions = gate(dir, ["--base", base], { GITHUB_ACTIONS: "true", FAKE_EXIT: "0" });
  assert.equal(actions.status, 0, actions.stderr);
  assert.match(
    actions.stdout,
    /::warning file=src\/lib\/db\/migrations\/20261113000100_base_feature\.sql::/
  );
});

test("e2e: an added migration newer than the base never calls the commutation checker", () => {
  const { dir, mig, base } = makeRepo();
  fs.writeFileSync(path.join(mig, "20261113000500_newer.sql"), "SELECT 1;\n");
  const record = path.join(tmpRoot, `record-${repoCounter}.json`);
  // FAKE_EXIT=1: if the checker ran, the gate would fail.
  const r = gate(dir, ["--base", base], { FAKE_RECORD: record });
  assert.equal(r.status, 0, r.stderr);
  assert.equal(fs.existsSync(record), false);
});

test("e2e: an out-of-order migration that commutes passes with a note", () => {
  const { dir, mig, base } = makeRepo();
  fs.writeFileSync(path.join(mig, "20261113000050_older.sql"), "SELECT 1;\n");
  const record = path.join(tmpRoot, `record-${repoCounter}.json`);
  const r = gate(dir, ["--base", base], { FAKE_EXIT: "0", FAKE_RECORD: record });
  assert.equal(r.status, 0, r.stderr);
  assert.match(r.stdout, /20261113000050_older\.sql.*fora de ordem, mas comuta/);
  // Contract: base-dir holds the base files (content from git), head-dir the disk copy.
  const seen = JSON.parse(fs.readFileSync(record, "utf-8"));
  assert.equal(seen.base.includes("20261113000050_older.sql"), false);
  assert.equal(seen.base.includes(BASE_STAMP_FILE), true);
  assert.equal(seen.head.includes("20261113000050_older.sql"), true);
  assert.equal(seen.base.length + 1, seen.head.length);
  assert.equal(seen.baseStamp, "CREATE TABLE IF NOT EXISTS base_t (id);\n");
});

test("e2e: an out-of-order migration that does not commute fails with the diff", () => {
  const { dir, mig, base } = makeRepo();
  fs.writeFileSync(path.join(mig, "20261113000050_older.sql"), "SELECT 1;\n");
  const r = gate(dir, ["--base", base], {
    FAKE_EXIT: "1",
    FAKE_OUTPUT: "tabela older_t: só no caminho novo",
  });
  assert.equal(r.status, 1, r.stdout);
  assert.match(r.stderr, /tabela older_t: só no caminho novo/);
  assert.match(r.stderr, /regere o nome com npm run db:new-migration/);
});

test("e2e: a broken commutation checker fails in CI and only warns outside CI", () => {
  const { dir, mig, base } = makeRepo();
  fs.writeFileSync(path.join(mig, "20261113000050_older.sql"), "SELECT 1;\n");
  const local = gate(dir, ["--base", base], { FAKE_EXIT: "2" });
  assert.equal(local.status, 0, local.stderr);
  assert.match(local.stdout + local.stderr, /comutação/);
  const ci = gate(dir, ["--base", base], { FAKE_EXIT: "2", CI: "true" });
  assert.equal(ci.status, 1, ci.stdout);
  assert.match(ci.stderr, /comutação/);
  const missing = gate(dir, ["--base", base], {
    CI: "true",
    MIGRATION_COMMUTATION_SCRIPT: path.join(tmpRoot, "does-not-exist.mjs"),
  });
  assert.equal(missing.status, 1, missing.stdout);
});

test("e2e: pull_request on a merge ref uses the merge's first parent as the base", () => {
  const { dir, mig } = makeRepo();
  git(dir, ["checkout", "-q", "-b", "pr"]);
  fs.rmSync(path.join(mig, BASE_STAMP_FILE));
  git(dir, ["commit", "-q", "-am", "pr: drop a merged migration"]);
  git(dir, ["checkout", "-q", "main"]);
  fs.writeFileSync(path.join(dir, "unrelated.txt"), "base moved\n");
  git(dir, ["add", "unrelated.txt"]);
  git(dir, ["commit", "-q", "-m", "base moves"]);
  git(dir, ["merge", "-q", "--no-ff", "-m", "merge ref", "pr"]);

  const skipped = gate(dir, []);
  assert.equal(skipped.status, 0, skipped.stderr);
  const pr = gate(dir, [], { GITHUB_EVENT_NAME: "pull_request", GITHUB_ACTIONS: "true" });
  assert.equal(pr.status, 1, pr.stdout);
  assert.match(pr.stderr, /já mesclada não pode ser apagada nem renomeada/);
});

test("e2e: pull_request without a merge commit uses merge-base with origin/<base>", () => {
  const { dir, mig, base } = makeRepo();
  git(dir, ["update-ref", "refs/remotes/origin/main", base]);
  git(dir, ["checkout", "-q", "-b", "pr"]);
  fs.rmSync(path.join(mig, BASE_STAMP_FILE));
  git(dir, ["commit", "-q", "-am", "pr: drop a merged migration"]);
  const r = gate(dir, [], {
    GITHUB_EVENT_NAME: "pull_request",
    GITHUB_ACTIONS: "true",
    GITHUB_BASE_REF: "main",
  });
  assert.equal(r.status, 1, r.stdout);
  assert.match(r.stderr, /já mesclada/);
});

test("e2e: merge_group reads merge_group.base_sha from the event payload", () => {
  const { dir, mig, base } = makeRepo();
  fs.rmSync(path.join(mig, BASE_STAMP_FILE));
  git(dir, ["commit", "-q", "-am", "queue candidate"]);
  const payload = path.join(tmpRoot, `event-${repoCounter}.json`);
  fs.writeFileSync(payload, JSON.stringify({ merge_group: { base_sha: base } }));
  const r = gate(dir, [], {
    GITHUB_EVENT_NAME: "merge_group",
    GITHUB_ACTIONS: "true",
    GITHUB_EVENT_PATH: payload,
  });
  assert.equal(r.status, 1, r.stdout);
  assert.match(r.stderr, /já mesclada/);
});

test("e2e: a PR event without a resolvable base fails closed", () => {
  const { dir } = makeRepo();
  const r = gate(dir, [], { GITHUB_EVENT_NAME: "pull_request", GITHUB_ACTIONS: "true" });
  assert.equal(r.status, 1, r.stdout);
  assert.match(r.stderr, /base não resolvida/);
});

test("e2e: MIGRATION_BASE_REF selects the base and an unknown --base ref fails", () => {
  const { dir, mig, base } = makeRepo();
  fs.rmSync(path.join(mig, BASE_STAMP_FILE));
  const byEnv = gate(dir, [], { MIGRATION_BASE_REF: base });
  assert.equal(byEnv.status, 1, byEnv.stdout);
  assert.match(byEnv.stderr, /já mesclada/);
  const unknown = gate(dir, ["--base", "no-such-ref"]);
  assert.equal(unknown.status, 1, unknown.stdout);
  assert.match(unknown.stderr, /no-such-ref/);
});

// --- Removals and renames: compatibility entries and release tags (V1-1) -------------------

const FEAT_FILE = "20261113120000_feat_x.sql";

/** Adds `name` with `sql` on top of the current HEAD and returns the new commit. */
function commitFile(dir: string, name: string, sql: string, message = `add ${name}`) {
  fs.writeFileSync(path.join(dir, MIG, name), sql);
  git(dir, ["add", "-A"]);
  git(dir, ["commit", "-q", "-m", message]);
  return git(dir, ["rev-parse", "HEAD"]);
}

type CompatEntry = { fromVersion: string; fromName: string; toVersion: string; toName: string };

/** Writes src/lib/db/migrationRunner/constants.ts with comments, mixed key order, trailing commas. */
function writeCompat(dir: string, entries: CompatEntry[]) {
  const file = path.join(dir, "src/lib/db/migrationRunner/constants.ts");
  fs.mkdirSync(path.dirname(file), { recursive: true });
  const body = entries
    .map(
      (e, i) =>
        `  {\n    // entry ${i}: "quoted", { braces } and a ] in a comment\n` +
        `    toName: "${e.toName}",\n    fromVersion: '${e.fromVersion}',\n` +
        `    /* block */ toVersion: "${e.toVersion}",\n    fromName: "${e.fromName}",\n  },`
    )
    .join("\n");
  fs.writeFileSync(
    file,
    `/** header */\nexport const RENAMED_MIGRATION_COMPATIBILITY = [\n${body}\n] as const;\n\n` +
      `export const LEGACY_VERSION_SLOT_MIGRATIONS = [{ version: "999", name: "x" }];\n`
  );
}

/** The strict removal message: why the file cannot go, and the revert and rename recipes. */
function assertStrictRemovalMessage(stderr: string, name: string) {
  assert.match(
    stderr,
    new RegExp(
      `${name.replace(/\./g, "\\.")}: migration já mesclada não pode ser apagada nem renomeada`
    )
  );
  assert.match(stderr, /homologação, Docker :next, VPS, sync do Enterprise/);
  assert.match(stderr, /npm run db:new-migration -- <descrição>/);
  assert.match(stderr, /DROP \.\.\. IF EXISTS/);
  assert.match(stderr, /RENAMED_MIGRATION_COMPATIBILITY/);
}

test("e2e: reverting a merged migration fails even if it never reached a release tag", () => {
  const { dir, mig } = makeRepo();
  git(dir, ["tag", "v1.0.0"]); // the release does NOT contain FEAT_FILE
  const base = commitFile(dir, FEAT_FILE, "CREATE TABLE IF NOT EXISTS feat_x (id);\n");
  fs.rmSync(path.join(mig, FEAT_FILE)); // the PR is the revert

  // Release-branch builds (homolog, Docker :next, VPS, Enterprise sync) already ran it.
  const reverted = gate(dir, ["--base", base], { GITHUB_ACTIONS: "true" });
  assert.equal(reverted.status, 1, reverted.stdout);
  assertStrictRemovalMessage(reverted.stderr, FEAT_FILE);
  assert.doesNotMatch(reverted.stdout, /::warning file=src\/lib\/db\/migrations\/20261113120000/);

  git(dir, ["tag", "v1.2.3", base]); // published: same verdict
  const published = gate(dir, ["--base", base], { GITHUB_ACTIONS: "true" });
  assert.equal(published.status, 1, published.stdout);
  assertStrictRemovalMessage(published.stderr, FEAT_FILE);
});

test("e2e: a removal fails without consulting tags (no release tag at all)", () => {
  const { dir, mig, base } = makeRepo();
  git(dir, ["tag", "v1.2.3-nightly.20260915.21a0ee1"]);
  fs.rmSync(path.join(mig, BASE_STAMP_FILE));
  const r = gate(dir, ["--base", base]);
  assert.equal(r.status, 1, r.stdout);
  assertStrictRemovalMessage(r.stderr, BASE_STAMP_FILE);
  assert.doesNotMatch(r.stderr, /git fetch --tags/);
});

test("e2e: a published migration renamed with an entry and then deleted fails (B-2)", () => {
  const { dir, mig } = makeRepo();
  git(dir, ["tag", "v1.0.0"]);
  const base = git(dir, ["rev-parse", "HEAD"]);
  // The entry points at a target that is not on disk: nothing covers the removal.
  fs.rmSync(path.join(mig, BASE_STAMP_FILE));
  writeCompat(dir, [
    {
      fromVersion: "20261113000100",
      fromName: "base_feature",
      toVersion: "20261113000200",
      toName: "base_feature",
    },
  ]);
  const r = gate(dir, ["--base", base], { GITHUB_ACTIONS: "true" });
  assert.equal(r.status, 1, r.stdout);
  assertStrictRemovalMessage(r.stderr, BASE_STAMP_FILE);
});

test("e2e: a rename covered by a compatibility entry with identical content passes", () => {
  const { dir, mig } = makeRepo();
  git(dir, ["tag", "v1.0.0"]); // the base file is published: only the entry can cover it
  const base = git(dir, ["rev-parse", "HEAD"]);
  const renamed = "20261113000200_base_feature.sql";
  fs.renameSync(path.join(mig, BASE_STAMP_FILE), path.join(mig, renamed));
  writeCompat(dir, [
    { fromVersion: "001", fromName: "unrelated", toVersion: "002", toName: "unrelated" },
    {
      fromVersion: "20261113000100",
      fromName: "base_feature",
      toVersion: "20261113000200",
      toName: "base_feature",
    },
  ]);
  // The rename moves the file in fresh installs: the commutation checker must agree (B-1).
  const record = path.join(tmpRoot, `record-rename-ok-${repoCounter}.json`);
  const r = gate(dir, ["--base", base], {
    GITHUB_ACTIONS: "true",
    FAKE_EXIT: "0",
    FAKE_RECORD: record,
  });
  assert.equal(r.status, 0, r.stderr);
  assert.equal(fs.existsSync(record), true, "a covered rename must run the commutation checker");
  assert.match(
    r.stdout,
    /::warning file=src\/lib\/db\/migrations\/20261113000100_base_feature\.sql::.*20261113000200_base_feature\.sql.*RENAMED_MIGRATION_COMPATIBILITY/
  );
});

test("e2e: a covered rename to a stamp newer than the base runs the commutation check (B-1)", () => {
  const { dir, mig } = makeRepo();
  const base = git(dir, ["rev-parse", "HEAD"]);
  const renamed = "20261113000200_base_feature.sql";
  fs.renameSync(path.join(mig, BASE_STAMP_FILE), path.join(mig, renamed));
  writeCompat(dir, [
    {
      fromVersion: "20261113000100",
      fromName: "base_feature",
      toVersion: "20261113000200",
      toName: "base_feature",
    },
  ]);
  const record = path.join(tmpRoot, `record-rename-${repoCounter}.json`);
  const r = gate(dir, ["--base", base], {
    FAKE_EXIT: "1",
    FAKE_RECORD: record,
    FAKE_OUTPUT: "tabela base_t: só no caminho novo",
  });
  assert.equal(r.status, 1, r.stdout);
  assert.equal(fs.existsSync(record), true, "a covered rename must run the commutation checker");
  // The upgraded path keeps the old file (the runner relocates its ledger row).
  const seen = JSON.parse(fs.readFileSync(record, "utf-8"));
  assert.equal(seen.base.includes(BASE_STAMP_FILE), true);
  assert.equal(seen.base.includes(renamed), false);
  assert.equal(seen.head.includes(renamed), true);
  assert.equal(seen.head.includes(BASE_STAMP_FILE), false);
  assert.match(r.stderr, /tabela base_t: só no caminho novo/);
  assert.match(
    r.stderr,
    /renomeadas: 20261113000100_base_feature\.sql → 20261113000200_base_feature\.sql/
  );
  assert.match(r.stderr, /desfaça a renomeação/);
  assert.doesNotMatch(r.stderr, /mantenha o carimbo antigo/);
  assert.doesNotMatch(r.stderr, /regere o nome/);
});

test("e2e: a covered rename whose content changed fails", () => {
  const { dir, mig } = makeRepo();
  const base = git(dir, ["rev-parse", "HEAD"]);
  const renamed = "20261113000200_base_feature.sql";
  fs.rmSync(path.join(mig, BASE_STAMP_FILE));
  fs.writeFileSync(path.join(mig, renamed), "CREATE TABLE IF NOT EXISTS base_t (id, extra);\n");
  writeCompat(dir, [
    {
      fromVersion: "20261113000100",
      fromName: "base_feature",
      toVersion: "20261113000200",
      toName: "base_feature",
    },
  ]);
  const r = gate(dir, ["--base", base]);
  assert.equal(r.status, 1, r.stdout);
  assert.match(r.stderr, /20261113000100_base_feature\.sql.*conteúdo/);
  assert.match(r.stderr, /migration nova/);
});

test("e2e: a rename without an entry fails and points at the compatibility table", () => {
  const { dir, mig } = makeRepo();
  git(dir, ["tag", "v1.0.0"]);
  const base = git(dir, ["rev-parse", "HEAD"]);
  fs.renameSync(path.join(mig, BASE_STAMP_FILE), path.join(mig, "20261113000200_base_feature.sql"));
  const r = gate(dir, ["--base", base]);
  assert.equal(r.status, 1, r.stdout);
  assert.match(r.stderr, /renomeada para 20261113000200_base_feature\.sql/);
  assertStrictRemovalMessage(r.stderr, BASE_STAMP_FILE);
});

test("e2e: a decoy declaration inside a string does not cover a rename (B-4)", () => {
  const { dir, mig, base } = makeRepo();
  fs.renameSync(path.join(mig, BASE_STAMP_FILE), path.join(mig, "20261113000200_base_feature.sql"));
  const file = path.join(dir, "src/lib/db/migrationRunner/constants.ts");
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(
    file,
    "const NOTE = `export const RENAMED_MIGRATION_COMPATIBILITY = [{ fromVersion: " +
      '"20261113000100", fromName: "base_feature", toVersion: "20261113000200", toName: ' +
      '"base_feature" }]`;\nexport const RENAMED_MIGRATION_COMPATIBILITY = [];\n'
  );
  const r = gate(dir, ["--base", base], { FAKE_EXIT: "0" });
  assert.equal(r.status, 1, r.stdout);
  assertStrictRemovalMessage(r.stderr, BASE_STAMP_FILE);
});

test("e2e: two RENAMED_MIGRATION_COMPATIBILITY declarations fail closed (B-4)", () => {
  const { dir, mig, base } = makeRepo();
  fs.renameSync(path.join(mig, BASE_STAMP_FILE), path.join(mig, "20261113000200_base_feature.sql"));
  const file = path.join(dir, "src/lib/db/migrationRunner/constants.ts");
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(
    file,
    'export const RENAMED_MIGRATION_COMPATIBILITY = [{ fromVersion: "20261113000100", ' +
      'fromName: "base_feature", toVersion: "20261113000200", toName: "base_feature" }];\n' +
      "export const RENAMED_MIGRATION_COMPATIBILITY = [];\n"
  );
  const r = gate(dir, ["--base", base], { FAKE_EXIT: "0" });
  assert.equal(r.status, 1, r.stdout);
  assert.match(r.stderr, /RENAMED_MIGRATION_COMPATIBILITY.*2 declarações/);
});

test("parser: RENAMED_MIGRATION_COMPATIBILITY text parse equals the real TS array", async () => {
  const lib = (await import(LIB)) as {
    parseRenamedMigrationCompatibility: (source: string) => CompatEntry[];
  };
  const constantsFile = path.join(ROOT, "src/lib/db/migrationRunner/constants.ts");
  const real = (await import(constantsFile)) as {
    RENAMED_MIGRATION_COMPATIBILITY: ReadonlyArray<CompatEntry>;
  };
  const expected = real.RENAMED_MIGRATION_COMPATIBILITY.map((e) => ({
    fromVersion: e.fromVersion,
    fromName: e.fromName,
    toVersion: e.toVersion,
    toName: e.toName,
  }));
  assert.ok(expected.length > 100, "the real array has 100+ entries");
  assert.deepEqual(
    lib.parseRenamedMigrationCompatibility(fs.readFileSync(constantsFile, "utf-8")),
    expected
  );
});

test("parser: any key order, comments, single quotes and trailing commas", async () => {
  const lib = (await import(LIB)) as {
    parseRenamedMigrationCompatibility: (source: string) => CompatEntry[];
  };
  const dir = path.join(tmpRoot, "parser-only");
  const entries = [
    { fromVersion: "139", fromName: "job_registry", toVersion: "146", toName: "job_registry" },
    { fromVersion: "20261113000100", fromName: "a", toVersion: "20261113000200", toName: "a" },
  ];
  writeCompat(dir, entries);
  const source = fs.readFileSync(
    path.join(dir, "src/lib/db/migrationRunner/constants.ts"),
    "utf-8"
  );
  assert.deepEqual(lib.parseRenamedMigrationCompatibility(source), entries);
  assert.deepEqual(
    lib.parseRenamedMigrationCompatibility("export const RENAMED_MIGRATION_COMPATIBILITY = [];"),
    []
  );
  assert.throws(() => lib.parseRenamedMigrationCompatibility("export const OTHER = [];"));
  assert.throws(() =>
    lib.parseRenamedMigrationCompatibility(
      'export const RENAMED_MIGRATION_COMPATIBILITY = [{ fromVersion: "1", fromName: "a" }];'
    )
  );
});

test("parser: declarations inside string literals are ignored; zero or two real ones throw", async () => {
  const lib = (await import(LIB)) as {
    parseRenamedMigrationCompatibility: (source: string) => CompatEntry[];
  };
  const fake =
    'export const RENAMED_MIGRATION_COMPATIBILITY = [{ fromVersion: "239", fromName: "x", ' +
    'toVersion: "20261113000200", toName: "x" }]';
  const real = "export const RENAMED_MIGRATION_COMPATIBILITY = [];";
  for (const decoy of [
    `const NOTE = \`${fake}\`;`,
    `const NOTE = '${fake.replace(/"/g, "\\'")}';`,
    `const NOTE = "${fake.replace(/"/g, '\\"')}";`,
  ]) {
    assert.deepEqual(lib.parseRenamedMigrationCompatibility(`${decoy}\n${real}\n`), [], decoy);
  }
  // Only the decoy: there is no real declaration.
  assert.throws(
    () => lib.parseRenamedMigrationCompatibility(`const NOTE = \`${fake}\`;\n`),
    /não encontrado/
  );
  // Not at the start of a line.
  assert.throws(
    () => lib.parseRenamedMigrationCompatibility(`void 0; ${real}\n`),
    /não encontrado/
  );
  assert.throws(
    () => lib.parseRenamedMigrationCompatibility(`${fake};\n${real}\n`),
    /2 declarações/
  );
});

// --- Edited base migrations run the commutation check (V1-3) --------------------------------

/** Gate with the REAL commutation checker; DATA_DIR/HOME point at a throwaway directory. */
function gateReal(cwd: string, args: string[], env: Record<string, string> = {}) {
  const sandbox = fs.mkdtempSync(path.join(tmpRoot, "real-"));
  return spawnSync(process.execPath, [GATE, ...args], {
    cwd,
    encoding: "utf-8",
    env: cleanEnv({
      DATA_DIR: path.join(sandbox, "data"),
      DISABLE_SQLITE_AUTO_BACKUP: "true",
      ...env,
    }),
  });
}

test("e2e (real checker): emptying a merged migration fails because the schemas diverge", () => {
  const { dir, mig } = makeRepo({ realContent: true });
  const v1 = "20261113120000_v1_t1.sql";
  const base = commitFile(dir, v1, "CREATE TABLE v1_t1 (id INTEGER PRIMARY KEY, label TEXT);\n");
  fs.writeFileSync(path.join(mig, v1), "");
  const r = gateReal(dir, ["--base", base], { GITHUB_ACTIONS: "true" });
  assert.equal(r.status, 1, `${r.stdout}\n${r.stderr}`);
  assert.match(r.stderr, /v1_t1/);
  assert.match(r.stderr, /não reaplicam/);
  assert.match(r.stderr, /migration nova/);
});

test("e2e (real checker): a harmless edit of a merged migration only warns", () => {
  const { dir, mig } = makeRepo({ realContent: true });
  const v1 = "20261113120000_v1_t1.sql";
  const base = commitFile(dir, v1, "CREATE TABLE v1_t1 (id INTEGER PRIMARY KEY, label TEXT);\n");
  fs.writeFileSync(
    path.join(mig, v1),
    "-- made idempotent\nCREATE TABLE IF NOT EXISTS v1_t1 (id INTEGER PRIMARY KEY, label TEXT);\n"
  );
  const r = gateReal(dir, ["--base", base], { GITHUB_ACTIONS: "true" });
  assert.equal(r.status, 0, `${r.stdout}\n${r.stderr}`);
  assert.match(r.stdout, /::warning file=src\/lib\/db\/migrations\/20261113120000_v1_t1\.sql::/);
});

/**
 * Repository that runs its OWN gate, commutation checker and migration runner: the code that
 * boots the databases is copied from this checkout (node_modules is a symlink), so an entry
 * added to its RENAMED_MIGRATION_COMPATIBILITY reaches the runner the real checker boots, as
 * in CI, where the gate and the runner come from the same checkout. Only the migrations are
 * committed.
 */
function makeSelfContainedRepo(): { dir: string; mig: string; gatePath: string } {
  repoCounter += 1;
  const dir = path.join(tmpRoot, `repo-${repoCounter}`);
  const mig = path.join(dir, MIG);
  const skipped = new Set(
    ["src/app", "src/i18n", MIG, "open-sse/node_modules"].map((rel) => path.join(ROOT, rel))
  );
  for (const rel of [
    "src",
    "open-sse",
    "config",
    "scripts/check",
    "package.json",
    "tsconfig.json",
  ]) {
    // dereference: a symlinked directory under ROOT is copied as real files. Copied as a link,
    // the writes below (constants.ts) would land in the linked checkout instead of the copy.
    fs.cpSync(path.join(ROOT, rel), path.join(dir, rel), {
      recursive: true,
      dereference: true,
      filter: (source) => !skipped.has(source),
    });
  }
  fs.symlinkSync(path.join(ROOT, "node_modules"), path.join(dir, "node_modules"), "dir");
  fs.mkdirSync(mig, { recursive: true });
  for (const name of realNames()) fs.copyFileSync(path.join(REAL_DIR, name), path.join(mig, name));
  git(dir, ["init", "-q", "-b", "main"]);
  return { dir, mig, gatePath: path.join(dir, "scripts/check/check-migration-numbering.mjs") };
}

function commitMigrations(dir: string, message: string) {
  git(dir, ["add", "-A", "--", MIG]);
  git(dir, ["commit", "-q", "-m", message]);
  return git(dir, ["rev-parse", "HEAD"]);
}

test("e2e (real checker): a covered rename to a newer stamp that changes the schema fails (B-1)", () => {
  const { dir, mig, gatePath } = makeSelfContainedRepo();
  const created = "20261113000050_feat_index.sql";
  const renamed = "20261113000200_feat_index.sql";
  fs.writeFileSync(
    path.join(mig, created),
    "CREATE INDEX IF NOT EXISTS idx_feat ON call_logs(id);\n"
  );
  fs.writeFileSync(
    path.join(mig, "20261113000150_drop_feat_index.sql"),
    "DROP INDEX IF EXISTS idx_feat;\n"
  );
  const base = commitMigrations(dir, "base");

  git(dir, ["mv", `${MIG}/${created}`, `${MIG}/${renamed}`]);
  // The entry goes into the copied runner constants (a copy, never this checkout's file).
  const constants = path.join(dir, "src/lib/db/migrationRunner/constants.ts");
  const source = fs.readFileSync(constants, "utf-8");
  const declaration = "export const RENAMED_MIGRATION_COMPATIBILITY = [\n";
  assert.ok(source.includes(declaration));
  fs.writeFileSync(
    constants,
    source.replace(
      declaration,
      declaration +
        '  {\n    fromVersion: "20261113000050",\n    fromName: "feat_index",\n' +
        '    toVersion: "20261113000200",\n    toName: "feat_index",\n  },\n'
    )
  );

  const sandbox = fs.mkdtempSync(path.join(tmpRoot, "real-"));
  const r = spawnSync(process.execPath, [gatePath, "--base", base], {
    cwd: dir,
    encoding: "utf-8",
    env: cleanEnv({
      DATA_DIR: path.join(sandbox, "data"),
      DISABLE_SQLITE_AUTO_BACKUP: "true",
      GITHUB_ACTIONS: "true",
    }),
  });
  assert.equal(r.status, 1, `${r.stdout}\n${r.stderr}`);
  assert.match(r.stderr, /idx_feat/);
  // The gate's own hints (lines "    → …"); the checker's indented output has its own text.
  const gateHints = r.stderr
    .split("\n")
    .filter((line) => line.startsWith("    → "))
    .join("\n");
  assert.match(gateHints, /desfaça a renomeação/);
  assert.doesNotMatch(gateHints, /mantenha o carimbo antigo/);
  assert.doesNotMatch(r.stderr, /regere o nome/);
});

// --- Renames that keep the version, and renames the runner would run again (R2B-1, R2B-2) ----

const SAME_SLOT_MESSAGE =
  "o runner trata a mesma versão com outro nome como migration nova e a aplicaria de novo nos " +
  "bancos que já a rodaram; use outro carimbo + entrada de compatibilidade, ou mantenha o nome";

const escapeRe = (text: string) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

test("pure: classifyRemovals puts a rename that keeps the version in its own bucket", async () => {
  const lib = (await import(LIB)) as {
    classifyRemovals: (input: {
      removed: Array<{ name: string; renamedTo?: string }>;
      baseFiles: Map<string, string>;
      headFiles: Map<string, string>;
      compat: CompatEntry[];
    }) => {
      renamedCovered: Array<{ name: string; to: string }>;
      renamedChanged: Array<{ name: string; to: string }>;
      renamedSameVersion: Array<{ name: string; to: string; covered: boolean }>;
      forbidden: Array<{ name: string; renamedTo?: string }>;
    };
  };
  const baseFiles = map([["20261113000100_seed_a.sql", "b1"]]);
  const headFiles = map([["20261113000100_seed_b.sql", "b1"]]);
  const removed = [{ name: "20261113000100_seed_a.sql", renamedTo: "20261113000100_seed_b.sql" }];
  const entry = {
    fromVersion: "20261113000100",
    fromName: "seed_a",
    toVersion: "20261113000100",
    toName: "seed_b",
  };
  const covered = lib.classifyRemovals({ removed, baseFiles, headFiles, compat: [entry] });
  assert.deepEqual(covered.renamedSameVersion, [
    { name: "20261113000100_seed_a.sql", to: "20261113000100_seed_b.sql", covered: true },
  ]);
  assert.deepEqual(covered.renamedCovered, []);
  assert.deepEqual(covered.forbidden, []);
  // Without the entry, and with a different content (no content or description match).
  const bare = lib.classifyRemovals({
    removed: [{ name: "20261113000100_seed_a.sql" }],
    baseFiles,
    headFiles: map([["20261113000100_other.sql", "b2"]]),
    compat: [],
  });
  assert.deepEqual(bare.renamedSameVersion, [
    { name: "20261113000100_seed_a.sql", to: "20261113000100_other.sql", covered: false },
  ]);
  assert.deepEqual(bare.forbidden, []);
});

test("e2e: a rename that keeps the timestamp fails even with a compatibility entry (R2B-1)", () => {
  const { dir, mig, base } = makeRepo();
  const sameSlot = "20261113000100_base_feature_renamed.sql";
  fs.renameSync(path.join(mig, BASE_STAMP_FILE), path.join(mig, sameSlot));
  writeCompat(dir, [
    {
      fromVersion: "20261113000100",
      fromName: "base_feature",
      toVersion: "20261113000100",
      toName: "base_feature_renamed",
    },
  ]);
  const record = path.join(tmpRoot, `record-same-slot-${repoCounter}.json`);
  // FAKE_EXIT=0: the commutation checker would accept it; the gate must fail on its own.
  const r = gate(dir, ["--base", base], {
    GITHUB_ACTIONS: "true",
    FAKE_EXIT: "0",
    FAKE_RECORD: record,
  });
  assert.equal(r.status, 1, r.stdout);
  assert.match(
    r.stderr,
    new RegExp(
      `✗ ${escapeRe(BASE_STAMP_FILE)}: renomeada para ${escapeRe(sameSlot)} mantendo a versão ` +
        `20261113000100`
    )
  );
  assert.match(r.stderr, new RegExp(escapeRe(SAME_SLOT_MESSAGE)));
  assert.doesNotMatch(r.stdout, /coberta pela entrada/);
  assert.equal(fs.existsSync(record), false, "the gate fails before the commutation check");
});

test("e2e: a rename that keeps the timestamp without an entry fails with the same-version message", () => {
  const { dir, mig, base } = makeRepo();
  const sameSlot = "20261113000100_base_feature_renamed.sql";
  fs.renameSync(path.join(mig, BASE_STAMP_FILE), path.join(mig, sameSlot));
  const r = gate(dir, ["--base", base], { FAKE_EXIT: "0" });
  assert.equal(r.status, 1, r.stdout);
  assert.match(r.stderr, new RegExp(escapeRe(SAME_SLOT_MESSAGE)));
  // Without an entry the runner skips it by version and flags the renumbering on every boot.
  assert.match(r.stderr, /Sem entrada, o runner a pula pela versão/);
});

test("e2e: the removal hint asks for a new timestamp, never the same one", () => {
  const { dir, mig, base } = makeRepo();
  fs.rmSync(path.join(mig, BASE_STAMP_FILE));
  const r = gate(dir, ["--base", base]);
  assert.equal(r.status, 1, r.stdout);
  assert.match(r.stderr, /use um carimbo novo, diferente do antigo/);
  assert.doesNotMatch(r.stderr, /use um carimbo vizinho do antigo/);
});

test("e2e: a covered rename passes --must-not-apply <target> to the commutation checker (C2)", () => {
  const { dir, mig, base } = makeRepo();
  const renamed = "20261113000200_base_feature.sql";
  fs.renameSync(path.join(mig, BASE_STAMP_FILE), path.join(mig, renamed));
  writeCompat(dir, [
    {
      fromVersion: "20261113000100",
      fromName: "base_feature",
      toVersion: "20261113000200",
      toName: "base_feature",
    },
  ]);
  const record = path.join(tmpRoot, `record-must-not-apply-${repoCounter}.json`);
  const r = gate(dir, ["--base", base], { FAKE_EXIT: "0", FAKE_RECORD: record });
  assert.equal(r.status, 0, r.stderr);
  const seen = JSON.parse(fs.readFileSync(record, "utf-8")) as { argv: string[] };
  const at = seen.argv.indexOf("--must-not-apply");
  assert.notEqual(at, -1, `argv: ${seen.argv.join(" ")}`);
  assert.equal(seen.argv[at + 1], renamed);
  assert.equal(seen.argv.filter((arg) => arg === "--must-not-apply").length, 1);
});

test("e2e: an out-of-order file alone passes no --must-not-apply", () => {
  const { dir, mig, base } = makeRepo();
  fs.writeFileSync(path.join(mig, "20261113000050_older.sql"), "SELECT 1;\n");
  const record = path.join(tmpRoot, `record-no-must-not-apply-${repoCounter}.json`);
  const r = gate(dir, ["--base", base], { FAKE_EXIT: "0", FAKE_RECORD: record });
  assert.equal(r.status, 0, r.stderr);
  const seen = JSON.parse(fs.readFileSync(record, "utf-8")) as { argv: string[] };
  assert.equal(seen.argv.includes("--must-not-apply"), false);
});

test("e2e: a renamed migration the checker saw applied again gets its own title and hint (C2)", () => {
  const { dir, mig, base } = makeRepo();
  const renamed = "20261113000200_base_feature.sql";
  fs.renameSync(path.join(mig, BASE_STAMP_FILE), path.join(mig, renamed));
  writeCompat(dir, [
    {
      fromVersion: "20261113000100",
      fromName: "base_feature",
      toVersion: "20261113000200",
      toName: "base_feature",
    },
  ]);
  const r = gate(dir, ["--base", base], {
    FAKE_EXIT: "1",
    FAKE_OUTPUT: `migration ${renamed}: aplicada de novo no banco atualizado`,
  });
  assert.equal(r.status, 1, r.stdout);
  assert.match(
    r.stderr,
    /✗ migration renomeada rodaria de novo \(renomeadas: 20261113000100_base_feature\.sql → 20261113000200_base_feature\.sql\)/
  );
  assert.match(r.stderr, /aplicada de novo no banco atualizado/);
  assert.match(
    r.stderr,
    /o runner não reconhece a renomeação; confira a entrada em RENAMED_MIGRATION_COMPATIBILITY \(versão e nome antigos e novos\)/
  );
  assert.doesNotMatch(r.stderr, /banco atualizado e banco novo divergem/);
  assert.doesNotMatch(r.stderr, /regere o nome/);
});

// R3B-2: the applied-again check does not depend on the checker's exit code. A schema that ends
// up equal does not make a re-applied migration safe (a repeated INSERT changes no schema).
test("e2e: the applied-again phrase fails the gate even when the checker exits 0 (C2)", () => {
  const { dir, mig, base } = makeRepo();
  const renamed = "20261113000200_base_feature.sql";
  fs.renameSync(path.join(mig, BASE_STAMP_FILE), path.join(mig, renamed));
  writeCompat(dir, [
    {
      fromVersion: "20261113000100",
      fromName: "base_feature",
      toVersion: "20261113000200",
      toName: "base_feature",
    },
  ]);
  const r = gate(dir, ["--base", base], {
    FAKE_EXIT: "0",
    FAKE_OUTPUT: `migration ${renamed}: aplicada de novo no banco atualizado`,
  });
  assert.equal(r.status, 1, r.stdout);
  assert.match(r.stderr, /✗ migration renomeada rodaria de novo/);
  assert.doesNotMatch(r.stdout, /mesmo schema/);
  assert.doesNotMatch(r.stdout, /\[check-migration-numbering\] OK/);
});

// R3B-1: every covered rename reaches the checker, not only the first one, and an out-of-order
// file that is not a rename target is not listed.
test("e2e: several covered renames pass every target to --must-not-apply, sorted, once each", () => {
  const { dir, mig } = makeRepo();
  const second = "20261113000300_second_feature.sql";
  fs.writeFileSync(path.join(mig, second), "CREATE TABLE IF NOT EXISTS second_t (id);\n");
  git(dir, ["add", "-A"]);
  git(dir, ["commit", "-q", "-m", "second base migration"]);
  const base = git(dir, ["rev-parse", "HEAD"]);
  const laterTarget = "20261113000600_base_feature.sql";
  const earlierTarget = "20261113000200_second_renamed.sql";
  const outOfOrder = "20261113000050_older.sql";
  fs.renameSync(path.join(mig, BASE_STAMP_FILE), path.join(mig, laterTarget));
  fs.renameSync(path.join(mig, second), path.join(mig, earlierTarget));
  fs.writeFileSync(path.join(mig, outOfOrder), "SELECT 1;\n");
  writeCompat(dir, [
    {
      fromVersion: "20261113000100",
      fromName: "base_feature",
      toVersion: "20261113000600",
      toName: "base_feature",
    },
    {
      fromVersion: "20261113000300",
      fromName: "second_feature",
      toVersion: "20261113000200",
      toName: "second_renamed",
    },
  ]);
  const record = path.join(tmpRoot, `record-two-renames-${repoCounter}.json`);
  const r = gate(dir, ["--base", base], { FAKE_EXIT: "0", FAKE_RECORD: record });
  assert.equal(r.status, 0, `${r.stdout}\n${r.stderr}`);
  const seen = JSON.parse(fs.readFileSync(record, "utf-8")) as { argv: string[] };
  const targets = seen.argv.flatMap((arg, index) =>
    arg === "--must-not-apply" ? [seen.argv[index + 1]] : []
  );
  assert.deepEqual(targets, [earlierTarget, laterTarget]);
  assert.equal(targets.includes(outOfOrder), false);
});

test("e2e (real checker): a rename covered only by an entry the parser misreads fails (R2B-2)", () => {
  const { dir, mig, gatePath } = makeSelfContainedRepo();
  const created = "20261113000100_decoy_x.sql";
  const renamed = "20261113000200_decoy_x.sql";
  // Idempotent SQL: running it again leaves the same schema, so only C2 can catch it.
  fs.writeFileSync(path.join(mig, created), "CREATE TABLE IF NOT EXISTS decoy_t (id INTEGER);\n");
  const base = commitMigrations(dir, "base");
  git(dir, ["mv", `${MIG}/${created}`, `${MIG}/${renamed}`]);

  // The reviewer's regexDesync: a quote inside a regex desyncs the text scanner, which then
  // masks the real declaration and unmasks a decoy inside a template literal. TypeScript (and
  // the runner) only sees the real array, which has no entry for decoy_x.
  const constants = path.join(dir, "src/lib/db/migrationRunner/constants.ts");
  const source = fs.readFileSync(constants, "utf-8");
  const declaration = "export const RENAMED_MIGRATION_COMPATIBILITY = [\n";
  assert.ok(source.includes(declaration));
  const tampered =
    source.replace(declaration, `export const QUOTE_RE = /"/;\n${declaration}`) +
    '\nexport const NOTE = `"\nexport const RENAMED_MIGRATION_COMPATIBILITY = [\n' +
    "  { fromVersion: '20261113000100', fromName: 'decoy_x', toVersion: '20261113000200', " +
    "toName: 'decoy_x' },\n];\n`;\n";
  fs.writeFileSync(constants, tampered);

  const sandbox = fs.mkdtempSync(path.join(tmpRoot, "real-"));
  const r = spawnSync(process.execPath, [gatePath, "--base", base], {
    cwd: dir,
    encoding: "utf-8",
    env: cleanEnv({
      DATA_DIR: path.join(sandbox, "data"),
      DISABLE_SQLITE_AUTO_BACKUP: "true",
      GITHUB_ACTIONS: "true",
    }),
  });
  // Precondition: the text parser reads the decoy as a covering entry.
  assert.match(r.stdout, /coberta pela entrada de RENAMED_MIGRATION_COMPATIBILITY/);
  assert.equal(r.status, 1, `${r.stdout}\n${r.stderr}`);
  assert.match(r.stderr, /aplicada de novo no banco atualizado/);
  assert.match(r.stderr, new RegExp(escapeRe(renamed)));
  assert.match(r.stderr, /✗ migration renomeada rodaria de novo/);
});

// --- A PR migration that does not apply after the base (A2-R1, R2B-3) ------------------------

const NOT_AFTER_BASE = "não aplica depois de todas as migrations da base";

test("e2e: a PR migration that fails only on the upgraded path gets the neutral SQL hint (C1)", () => {
  const { dir, mig, base } = makeRepo();
  fs.writeFileSync(path.join(mig, "20261113000050_older.sql"), "CREATE INDEX i ON gone_t(id);\n");
  const r = gate(dir, ["--base", base], {
    FAKE_EXIT: "1",
    FAKE_OUTPUT: `migration 20261113000050_older.sql: ${NOT_AFTER_BASE} (no such table: gone_t)`,
  });
  assert.equal(r.status, 1, r.stdout);
  assert.match(
    r.stderr,
    /✗ migration do PR não aplica \(fora de ordem: 20261113000050_older\.sql\)/
  );
  assert.match(
    r.stderr,
    /corrija o SQL contra o schema atual da base; se ela depende de outra migration do PR com carimbo maior, regere o nome com npm run db:new-migration/
  );
  assert.doesNotMatch(r.stderr, /renomear é seguro/);
  assert.doesNotMatch(r.stderr, /mudar o nome ou a ordem não resolve/);
  assert.doesNotMatch(r.stderr, /banco atualizado e banco novo divergem/);
});

// --- Old-format files added into the frozen series (V1-6) ------------------------------------

test("pure: an old-format file added below the newest old one on the base is flagged", async () => {
  const mod = (await import(LIB)) as {
    findBaseDiffAnomalies: (input: {
      baseFiles: Map<string, string>;
      headFiles: Map<string, string>;
    }) => BaseDiff & { addedLegacyBelowBase: string[] };
  };
  const baseFiles = map([
    ["120_a.sql", "b1"],
    ["225_b.sql", "b2"],
  ]);
  const below = mod.findBaseDiffAnomalies({
    baseFiles,
    headFiles: map([...baseFiles, ["121_gap_filler.sql", "b3"]]),
  });
  assert.deepEqual(below.addedLegacyBelowBase, ["121_gap_filler.sql"]);
  // release/vX -> main brings old-format files above main's newest one: legitimate.
  const above = mod.findBaseDiffAnomalies({
    baseFiles,
    headFiles: map([...baseFiles, ["226_c.sql", "b4"], ["239_d.sql", "b5"]]),
  });
  assert.deepEqual(above.addedLegacyBelowBase, []);
});

test("e2e: an old-format file in a known gap fails against the base", () => {
  const { dir, mig, base } = makeRepo();
  fs.writeFileSync(path.join(mig, "121_sneaky.sql"), "SELECT 1;\n");
  const r = gate(dir, ["--base", base]);
  assert.equal(r.status, 1, r.stdout);
  assert.match(r.stderr, /121_sneaky\.sql.*série antiga está congelada/);
  assert.match(r.stderr, /npm run db:new-migration/);
});

// --- DML warning (V1-8) ------------------------------------------------------------------------

test("pure: sqlHasDml finds statements, not comments, literals or trigger bodies", async () => {
  const { sqlHasDml } = (await import(LIB)) as { sqlHasDml: (sql: string) => boolean };
  assert.equal(sqlHasDml("INSERT INTO t VALUES (1);"), true);
  assert.equal(sqlHasDml("CREATE TABLE t (id);\n  update t SET id = 2;"), true);
  assert.equal(sqlHasDml("-- just a comment\nDELETE FROM t"), true);
  assert.equal(sqlHasDml("REPLACE INTO t VALUES (1);"), true);
  assert.equal(sqlHasDml("CREATE TABLE t (id); -- INSERT INTO t VALUES (1);"), false);
  assert.equal(sqlHasDml("/* UPDATE t SET x = 1; */ CREATE INDEX i ON t(id);"), false);
  assert.equal(sqlHasDml("CREATE TABLE t (note TEXT DEFAULT 'x; DELETE FROM t');"), false);
  assert.equal(
    sqlHasDml(
      "CREATE TRIGGER tr AFTER INSERT ON t BEGIN\n  INSERT INTO log VALUES (1);\n  UPDATE t SET id = 1;\nEND;\nCREATE INDEX i ON t(id);"
    ),
    false
  );
});

test("pure: sqlHasDml sees DML after a WITH prefix and ends a trigger only at its own END", async () => {
  const { sqlHasDml } = (await import(LIB)) as { sqlHasDml: (sql: string) => boolean };
  assert.equal(sqlHasDml("WITH s AS (SELECT 1 AS a) INSERT INTO t SELECT a FROM s;"), true);
  assert.equal(
    sqlHasDml(
      "WITH RECURSIVE n(x) AS (SELECT 1 UNION ALL SELECT x + 1 FROM n WHERE x < 3) DELETE FROM t WHERE id IN (SELECT x FROM n);"
    ),
    true
  );
  assert.equal(sqlHasDml("WITH s AS (SELECT 1 AS a) SELECT replace(a, 1, 2) FROM s;"), false);
  assert.equal(
    sqlHasDml(
      "CREATE TRIGGER tr AFTER INSERT ON t BEGIN UPDATE t SET a = CASE WHEN 1 THEN 2 END; DELETE FROM u; END;"
    ),
    false
  );
  assert.equal(
    sqlHasDml(
      "CREATE TRIGGER tr AFTER INSERT ON t WHEN CASE WHEN 1 THEN 1 END BEGIN UPDATE t SET a = (CASE WHEN 1 THEN 2 ELSE 3 END); END;\nCREATE INDEX i ON t(a);"
    ),
    false
  );
  assert.equal(
    sqlHasDml(
      "CREATE TRIGGER tr AFTER INSERT ON t BEGIN UPDATE t SET a = CASE WHEN 1 THEN 2 END; END;\nUPDATE t SET a = 1;"
    ),
    true
  );
  const real020 = fs.readFileSync(path.join(REAL_DIR, "020_combo_sort_order.sql"), "utf-8");
  assert.equal(sqlHasDml(real020), true);
});

test("e2e: a PR migration that fails on both paths is reported as broken SQL, not order (A-R3)", () => {
  const { dir, mig, base } = makeRepo();
  fs.writeFileSync(path.join(mig, "20261113000050_older.sql"), "CREATE TABLE broken (;\n");
  // C1: a failure on the upgraded path always carries this phrase, here with both paths failing.
  const r = gate(dir, ["--base", base], {
    FAKE_EXIT: "1",
    FAKE_OUTPUT:
      "migration 20261113000050_older.sql: não aplica depois de todas as migrations da base\n" +
      "migration 20261113000050_older.sql: não aplica em nenhum dos dois caminhos (syntax error)",
  });
  assert.equal(r.status, 1, r.stdout);
  assert.match(
    r.stderr,
    /✗ migration do PR não aplica \(fora de ordem: 20261113000050_older\.sql\)/
  );
  assert.match(r.stderr, /não aplica em nenhum dos dois caminhos \(syntax error\)/);
  assert.match(r.stderr, /corrija o SQL contra o schema atual da base/);
  assert.doesNotMatch(r.stderr, /renomear é seguro/);
  assert.doesNotMatch(r.stderr, /mudar o nome ou a ordem não resolve/);
  assert.doesNotMatch(r.stderr, /banco atualizado e banco novo divergem/);
});

test("e2e: an out-of-order migration with DML gets a warning", () => {
  const { dir, mig, base } = makeRepo();
  fs.writeFileSync(
    path.join(mig, "20261113000050_older.sql"),
    "-- seed\nINSERT INTO base_t (id) VALUES (1);\n"
  );
  const r = gate(dir, ["--base", base], { FAKE_EXIT: "0", GITHUB_ACTIONS: "true" });
  assert.equal(r.status, 0, r.stderr);
  assert.match(
    r.stdout,
    /::warning file=src\/lib\/db\/migrations\/20261113000050_older\.sql::.*DML.*não compara dados/
  );
});

// --- --base-latest-tag (V1-4) ------------------------------------------------------------------

test("e2e: --base-latest-tag picks the highest semver release tag in HEAD's history", () => {
  const { dir } = makeRepo();
  git(dir, ["tag", "v1.2.3"]);
  const nine = commitFile(dir, "20261113000200_nine.sql", "SELECT 1;\n");
  git(dir, ["tag", "v1.9.9"]);
  const ten = commitFile(dir, "20261113000300_ten.sql", "SELECT 1;\n");
  git(dir, ["tag", "v1.10.0"]);
  commitFile(dir, "20261113000400_eleven.sql", "SELECT 1;\n");
  git(dir, ["tag", "v1.11.0-nightly.20261113.abc"]);
  // A higher tag outside HEAD's history (stray local tag) is ignored.
  git(dir, ["checkout", "-q", "-b", "stray", nine]);
  commitFile(dir, "20261113000500_stray.sql", "SELECT 1;\n");
  git(dir, ["tag", "v9.0.0"]);
  git(dir, ["checkout", "-q", "main"]);

  const r = gate(dir, ["--base-latest-tag"]);
  assert.equal(r.status, 0, r.stderr);
  assert.match(
    r.stdout,
    new RegExp(`comparação com a base ${ten.slice(0, 12)} \\(tag v1\\.10\\.0\\)`)
  );
});

test("e2e: --base-latest-tag compares like --base (a removal since the tag fails)", () => {
  const { dir, mig } = makeRepo();
  git(dir, ["tag", "v2.0.0"]);
  fs.rmSync(path.join(mig, BASE_STAMP_FILE));
  git(dir, ["commit", "-q", "-am", "drop a published migration"]);
  const r = gate(dir, ["--base-latest-tag"]);
  assert.equal(r.status, 1, r.stdout);
  assert.match(r.stderr, /já mesclada não pode ser apagada/);
  assert.match(r.stdout, /\(tag v2\.0\.0\)/);
});

// V3-3 of the final review: the Enterprise repository never receives the CE tags, only its own
// vX.Y.Z-ee.N ones. Pure vX.Y.Z tags still win whenever there is one.
test("e2e: --base-latest-tag falls back to the highest vX.Y.Z-ee.N tag (Enterprise)", () => {
  const { dir } = makeRepo();
  git(dir, ["tag", "v3.8.53-ee.2"]);
  const ee = commitFile(dir, "20261113000200_ee_one.sql", "SELECT 1;\n");
  git(dir, ["tag", "v3.8.54-ee.1"]);
  commitFile(dir, "20261113000300_ee_two.sql", "SELECT 1;\n");
  git(dir, ["tag", "v3.8.54-ee.1-rc"]); // not a release tag
  const r = gate(dir, ["--base-latest-tag"]);
  assert.equal(r.status, 0, r.stderr);
  assert.match(
    r.stdout,
    new RegExp(`comparação com a base ${ee.slice(0, 12)} \\(tag v3\\.8\\.54-ee\\.1\\)`)
  );

  const pure = commitFile(dir, "20261113000400_pure.sql", "SELECT 1;\n");
  git(dir, ["tag", "v1.0.0"]);
  const withPure = gate(dir, ["--base-latest-tag"]);
  assert.equal(withPure.status, 0, withPure.stderr);
  assert.match(
    withPure.stdout,
    new RegExp(`comparação com a base ${pure.slice(0, 12)} \\(tag v1\\.0\\.0\\)`)
  );
});

// V3-2 of the final review: against a release tag every file since the tag is already merged
// on the branch, so "regenerate the name, renaming is safe" would be wrong advice.
test("e2e: --base-latest-tag tells a divergence to fix forward, never to rename", () => {
  const { dir } = makeRepo();
  git(dir, ["tag", "v1.0.0"]);
  // Merged after the tag with a stamp older than the newest file in the tag: out of order.
  commitFile(dir, "20261113000050_merged_older.sql", "SELECT 1;\n");
  const record = path.join(tmpRoot, `record-tag-mode-${repoCounter}.json`);
  const r = gate(dir, ["--base-latest-tag"], {
    FAKE_EXIT: "1",
    FAKE_OUTPUT: "tabela t: coluna x só existe no caminho atualizado",
    FAKE_RECORD: record,
  });
  assert.equal(r.status, 1, r.stdout);
  assert.match(r.stderr, /comparação com a tag v1\.0\.0: esses arquivos já estão mesclados/);
  assert.match(r.stderr, /corrija para frente com uma migration nova/);
  assert.doesNotMatch(r.stderr, /renomear é seguro/);
  assert.doesNotMatch(r.stderr, /regere o nome/);
  const seen = JSON.parse(fs.readFileSync(record, "utf-8")) as { argv: string[] };
  assert.ok(seen.argv.includes("--merged-base"), `argv: ${seen.argv.join(" ")}`);

  // A PR base keeps the PR advice and does not pass --merged-base.
  const prRecord = path.join(tmpRoot, `record-pr-mode-${repoCounter}.json`);
  const pr = gate(dir, ["--base", "v1.0.0"], {
    FAKE_EXIT: "1",
    FAKE_OUTPUT: "tabela t: coluna x só existe no caminho atualizado",
    FAKE_RECORD: prRecord,
  });
  assert.equal(pr.status, 1, pr.stdout);
  assert.match(pr.stderr, /regere o nome com npm run db:new-migration/);
  const prSeen = JSON.parse(fs.readFileSync(prRecord, "utf-8")) as { argv: string[] };
  assert.equal(prSeen.argv.includes("--merged-base"), false);
});

test("e2e: --base-latest-tag without any release tag fails closed", () => {
  const { dir } = makeRepo();
  git(dir, ["tag", "v1.2.3-nightly.x"]);
  const r = gate(dir, ["--base-latest-tag"]);
  assert.equal(r.status, 1, r.stdout);
  assert.match(r.stderr, /--base-latest-tag/);
  assert.match(r.stderr, /nenhuma tag de release/);
  const both = gate(dir, ["--base-latest-tag", "--base", "HEAD"]);
  assert.equal(both.status, 1, both.stdout);
});
