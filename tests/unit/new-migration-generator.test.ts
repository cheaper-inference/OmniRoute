/**
 * tests/unit/new-migration-generator.test.ts
 *
 * `npm run db:new-migration -- <description>` (scripts/dev/new-migration.mjs) creates
 * `<YYYYMMDDHHMMSS>_<snake_case>.sql` with the current UTC timestamp. Runs the real script
 * with spawnSync against a temporary directory (`--dir`) and a fixed clock (`--now`).
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { findMigrationAnomalies } from "../../scripts/check/check-migration-numbering.mjs";

const ROOT = path.resolve(import.meta.dirname, "../..");
const SCRIPT = path.join(ROOT, "scripts/dev/new-migration.mjs");
const REAL_MIGRATIONS_DIR = path.join(ROOT, "src/lib/db/migrations");
const NOW = "2026-11-13T12:00:00Z";

const tmpRoot = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-new-migration-"));
let counter = 0;

test.after(() => {
  fs.rmSync(tmpRoot, { recursive: true, force: true });
});

function freshDir(): string {
  counter += 1;
  const dir = path.join(tmpRoot, `case-${counter}`);
  fs.mkdirSync(dir, { recursive: true });
  return dir;
}

function run(args: string[], cwd: string = tmpRoot) {
  return spawnSync(process.execPath, [SCRIPT, ...args], { cwd, encoding: "utf-8" });
}

function realSqlFiles(): string[] {
  return fs.readdirSync(REAL_MIGRATIONS_DIR).filter((f) => f.endsWith(".sql"));
}

test("creates <timestamp>_<description>.sql with the header and prints its path", () => {
  const dir = freshDir();
  const r = run(["add_usage_index", "--dir", dir, "--now", NOW]);
  assert.equal(r.status, 0, r.stderr);
  const expected = path.join(dir, "20261113120000_add_usage_index.sql");
  assert.equal(r.stdout.trim(), expected);
  assert.deepEqual(fs.readdirSync(dir), ["20261113120000_add_usage_index.sql"]);

  const content = fs.readFileSync(expected, "utf-8");
  assert.match(content, /^-- Migration: add_usage_index$/m);
  assert.match(content, /^-- Version: +20261113120000 /m);
  assert.match(content, /IF NOT EXISTS/);
  assert.match(content, /npm run test:migrations:fresh/);
  assert.match(content, /npm run check:migration-numbering/);
  // Template is comments only: no executable SQL in a freshly generated file.
  const executable = content
    .split("\n")
    .filter((line) => line.trim().length > 0 && !line.trim().startsWith("--"));
  assert.deepEqual(executable, []);
});

test("a timestamp collision moves forward one second and never overwrites", () => {
  const dir = freshDir();
  const existing = path.join(dir, "20261113120000_other_change.sql");
  fs.writeFileSync(existing, "-- keep me\n");
  fs.writeFileSync(path.join(dir, "20261113120001_third.sql"), "-- keep me too\n");

  const r = run(["my change", "--dir", dir, "--now", NOW]);
  assert.equal(r.status, 0, r.stderr);
  assert.equal(r.stdout.trim(), path.join(dir, "20261113120002_my_change.sql"));
  assert.equal(fs.readFileSync(existing, "utf-8"), "-- keep me\n");

  // Same description and same clock again: still a new, unique file.
  const again = run(["my change", "--dir", dir, "--now", NOW]);
  assert.equal(again.status, 0, again.stderr);
  assert.equal(again.stdout.trim(), path.join(dir, "20261113120003_my_change.sql"));
  assert.equal(fs.readdirSync(dir).length, 4);
});

test("sub-second clocks truncate to the second", () => {
  const dir = freshDir();
  const r = run(["x", "--dir", dir, "--now", "2026-11-13T12:00:00.999Z"]);
  assert.equal(r.status, 0, r.stderr);
  assert.equal(path.basename(r.stdout.trim()), "20261113120000_x.sql");
});

test("free text is normalized to lowercase snake_case (multiple words, accents, symbols)", () => {
  const dir = freshDir();
  const r = run(["Add", "Usage", "índice!", "--dir", dir, "--now", NOW]);
  assert.equal(r.status, 0, r.stderr);
  assert.equal(path.basename(r.stdout.trim()), "20261113120000_add_usage_indice.sql");

  // `--` ends the options: what follows is description text even if it starts with "--".
  const dashed = run(["--dir", dir, "--now", NOW, "--", "--Call-Logs  Pending"]);
  assert.equal(dashed.status, 0, dashed.stderr);
  assert.equal(path.basename(dashed.stdout.trim()), "20261113120001_call_logs_pending.sql");
});

test("an empty or symbol-only description exits 1 without creating a file", () => {
  for (const args of [[], [""], ["  "], ["!!!"]]) {
    const dir = freshDir();
    const r = run([...args, "--dir", dir, "--now", NOW]);
    assert.equal(r.status, 1, `args=${JSON.stringify(args)} stdout=${r.stdout}`);
    assert.match(r.stderr, /vazia/);
    assert.deepEqual(fs.readdirSync(dir), []);
  }
});

test("a description starting with a digit exits 1", () => {
  const dir = freshDir();
  const r = run(["2fa", "table", "--dir", dir, "--now", NOW]);
  assert.equal(r.status, 1);
  assert.match(r.stderr, /começar com letra/);
  assert.deepEqual(fs.readdirSync(dir), []);
});

test("a clock before the 2026-11-13 cut-over is refused with the gate's reason", () => {
  const dir = freshDir();
  const r = run(["x", "--dir", dir, "--now", "2026-11-12T23:59:59Z"]);
  assert.equal(r.status, 1);
  assert.match(r.stderr, /anterior ao corte/);
  assert.deepEqual(fs.readdirSync(dir), []);
});

test("invalid options exit 1", () => {
  const dir = freshDir();
  assert.equal(run(["x", "--dir", dir, "--now", "not-a-date"]).status, 1);
  assert.equal(run(["x", "--dir", dir, "--bogus"]).status, 1);
  assert.equal(run(["x", "--dir"]).status, 1);
  assert.deepEqual(fs.readdirSync(dir), []);
});

test("--dry-run prints the path and writes nothing", () => {
  const dir = freshDir();
  const r = run(["x", "--dir", dir, "--now", NOW, "--dry-run"]);
  assert.equal(r.status, 0, r.stderr);
  assert.equal(r.stdout.trim(), path.join(dir, "20261113120000_x.sql"));
  assert.deepEqual(fs.readdirSync(dir), []);
});

test("without --dir the default target is the repo's migrations dir, independent of cwd", () => {
  const before = realSqlFiles();
  const r = run(["x", "--now", NOW, "--dry-run"], os.tmpdir());
  assert.equal(r.status, 0, r.stderr);
  assert.equal(r.stdout.trim(), path.join(REAL_MIGRATIONS_DIR, "20261113120000_x.sql"));
  assert.deepEqual(realSqlFiles(), before);
});

test("the generated name passes the numbering gate next to the real migrations", () => {
  const dir = freshDir();
  const r = run(["add usage index", "--dir", dir, "--now", NOW]);
  assert.equal(r.status, 0, r.stderr);
  const generated = path.basename(r.stdout.trim());
  const second = run(["add usage index", "--dir", dir, "--now", NOW]);
  const generatedSecond = path.basename(second.stdout.trim());

  const result = (
    findMigrationAnomalies as (
      f: string[],
      d: Set<string>,
      g: Set<string>,
      o?: { now?: Date }
    ) => {
      badNames: string[];
      duplicates: unknown[];
      gaps: string[];
      missingLegacyTop: string[];
      timestampCount: number;
    }
  )([...realSqlFiles(), generated, generatedSecond], new Set(), new Set(["026", "055", "121"]), {
    now: new Date(NOW),
  });
  assert.deepEqual(result.badNames, []);
  assert.deepEqual(result.duplicates, []);
  assert.deepEqual(result.gaps, []);
  assert.deepEqual(result.missingLegacyTop, []);
  assert.ok(result.timestampCount >= 2);
});

test("the current clock produces a name the gate accepts right now", () => {
  const dir = freshDir();
  const r = run(["now check", "--dir", dir]);
  assert.equal(r.status, 0, r.stderr);
  const generated = path.basename(r.stdout.trim());
  assert.match(generated, /^\d{14}_now_check\.sql$/);
  const result = (
    findMigrationAnomalies as (
      f: string[],
      d: Set<string>,
      g: Set<string>
    ) => { badNames: string[] }
  )(["239_x.sql", generated], new Set(), new Set());
  assert.deepEqual(result.badNames, []);
});
