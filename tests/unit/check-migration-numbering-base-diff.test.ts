/**
 * tests/unit/check-migration-numbering-base-diff.test.ts
 *
 * Base comparison mode of `check:migration-numbering` (scripts/check/check-migration-numbering.mjs
 * + scripts/check/lib/migrationBaseDiff.mjs):
 *   - a migration that exists on the base and is gone from disk (deleted OR renamed) fails;
 *   - a base migration whose content changed is a non-blocking warning;
 *   - a date-named migration added with a timestamp <= the newest one on the base runs the
 *     commutation checker (scripts/check/migration-commutation.ts, swapped for a fake here
 *     through MIGRATION_COMMUTATION_SCRIPT): exit 0 passes, exit 1 fails with the diff.
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
const REAL_DIR = path.join(ROOT, "src/lib/db/migrations");
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

const realNames = () => fs.readdirSync(REAL_DIR).filter((f) => f.endsWith(".sql"));

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

/** New repo with the real old-format names (distinct content) + one date-named file, committed. */
function makeRepo(): { dir: string; mig: string; base: string } {
  repoCounter += 1;
  const dir = path.join(tmpRoot, `repo-${repoCounter}`);
  const mig = path.join(dir, MIG);
  fs.mkdirSync(mig, { recursive: true });
  for (const name of realNames()) fs.writeFileSync(path.join(mig, name), `-- ${name}\n`);
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
  const local = gate(dir, ["--base", base]);
  assert.equal(local.status, 0, local.stderr);
  assert.match(
    local.stdout,
    /conteúdo alterado.*20261113000100_base_feature\.sql|20261113000100_base_feature\.sql.*conteúdo alterado/
  );
  const actions = gate(dir, ["--base", base], { GITHUB_ACTIONS: "true" });
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
