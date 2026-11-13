#!/usr/bin/env node
// scripts/dev/new-migration.mjs
// Creates a new date-and-time migration file:
//
//   npm run db:new-migration -- <description>
//   → src/lib/db/migrations/<YYYYMMDDHHMMSS>_<description_in_snake_case>.sql
//
// The timestamp is the current UTC time (creation order, not merge order). Parallel PRs
// therefore never fight over the same number. If a file with the same timestamp already
// exists, the timestamp moves forward one second until it is unique; an existing file is
// never overwritten. Generators running at the same time in one directory are safe too:
// after the exclusive ("wx") write the directory is read again, and if another file took
// the same timestamp this one is removed and retried one second later. The resulting name
// is validated with the same rules the `check:migration-numbering` gate applies
// (scripts/check/lib/migrationNaming.mjs), against the REAL clock even when --now is given.
//
// Options (mostly for tests):
//   --dir <path>      target directory (default: src/lib/db/migrations of this repo,
//                     resolved from the script location, not from the cwd)
//   --now <ISO-8601>  clock override, e.g. 2026-11-13T12:00:00Z (never ahead of the real
//                     clock by more than the gate's tolerance)
//   --dry-run         print the path that would be created without writing it
//   --help            usage
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import {
  classifyMigrationFilename,
  formatMigrationTimestamp,
  LEGACY_MIGRATION_MAX,
  MIGRATION_TIMESTAMP_FUTURE_TOLERANCE_MS,
  normalizeMigrationDescription,
} from "../check/lib/migrationNaming.mjs";

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const DEFAULT_DIR = path.join(REPO_ROOT, "src", "lib", "db", "migrations");

/** Upper bound for the "one second forward" collision loop. */
const MAX_COLLISION_STEPS = 600;

/** Upper bound for a random pause before retrying after a lost race (milliseconds). */
const RACE_RETRY_JITTER_MS = 25;

function sleepSync(ms) {
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
}

const pad3 = (n) => String(n).padStart(3, "0");

const USAGE =
  "Uso: npm run db:new-migration -- <descricao> [--dir <caminho>] [--now <ISO-8601>] [--dry-run]";

/**
 * @param {string[]} argv
 * @returns {{ words: string[], dir: string, now: Date, dryRun: boolean, help: boolean }}
 */
export function parseArgs(argv) {
  const words = [];
  let dir = DEFAULT_DIR;
  let nowRaw;
  let dryRun = false;
  let help = false;

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    const takeValue = (flag) => {
      const eq = arg.indexOf("=");
      if (eq !== -1) return arg.slice(eq + 1);
      const value = argv[i + 1];
      if (value === undefined || value.startsWith("--")) {
        throw new Error(`${flag} precisa de um valor`);
      }
      i += 1;
      return value;
    };
    if (arg === "--") {
      // End of options: everything after it is description text, even if it starts with "--".
      words.push(...argv.slice(i + 1));
      break;
    }
    if (arg === "--help" || arg === "-h") help = true;
    else if (arg === "--dry-run") dryRun = true;
    else if (arg === "--dir" || arg.startsWith("--dir=")) dir = path.resolve(takeValue("--dir"));
    else if (arg === "--now" || arg.startsWith("--now=")) nowRaw = takeValue("--now");
    else if (arg.startsWith("--")) throw new Error(`opção desconhecida ${arg}`);
    else words.push(arg);
  }

  let now = new Date();
  if (nowRaw !== undefined) {
    now = new Date(nowRaw);
    if (Number.isNaN(now.getTime())) throw new Error(`--now não é uma data válida: ${nowRaw}`);
  }
  return { words, dir, now, dryRun, help };
}

/**
 * @param {string} description normalized snake_case description
 * @param {string} version     YYYYMMDDHHMMSS
 */
export function renderMigrationTemplate(description, version) {
  return [
    `-- Migration: ${description}`,
    `-- Version:   ${version} (UTC YYYYMMDDHHMMSS; creation order, not merge order)`,
    `-- Created by \`npm run db:new-migration\`. Guide: docs/ops/DATABASE_GUIDE.md`,
    `--`,
    `-- Rules:`,
    `--   * Idempotent DDL: CREATE TABLE IF NOT EXISTS, CREATE INDEX IF NOT EXISTS,`,
    `--     DROP ... IF EXISTS, INSERT OR IGNORE. The runner wraps the file in a transaction.`,
    `--   * Do not depend on a migration with a NEWER timestamp: files apply in timestamp`,
    `--     order (old 001-${pad3(LEGACY_MIGRATION_MAX)} first, then date-named ones, then ee- ones), so a`,
    `--     dependency on a newer file breaks fresh databases.`,
    `--   * Regenerate the name only while the migration is not merged. Once merged,`,
    `--     never rename or delete it (databases that applied it would run it again):`,
    `--     create a new migration instead.`,
    `--   * Before opening the PR run: npm run test:migrations:fresh`,
    `--     and npm run check:migration-numbering`,
    ``,
  ].join("\n");
}

/**
 * Pick a unique `<timestamp>_<description>.sql` name inside `dir`.
 *
 * @param {{ dir: string, description: string, now: Date }} input
 * @returns {{ filename: string, version: string, steps: number, date: Date }}
 */
export function pickMigrationFilename({ dir, description, now }) {
  const taken = new Set();
  if (fs.existsSync(dir)) {
    for (const entry of fs.readdirSync(dir)) {
      const match = entry.match(/^(\d{14})_/);
      if (match) taken.add(match[1]);
    }
  }
  let current = new Date(Math.floor(now.getTime() / 1000) * 1000);
  for (let steps = 0; steps <= MAX_COLLISION_STEPS; steps++) {
    const version = formatMigrationTimestamp(current);
    if (!taken.has(version)) {
      return { filename: `${version}_${description}.sql`, version, steps, date: current };
    }
    current = new Date(current.getTime() + 1000);
  }
  throw new Error(
    `nenhum carimbo livre em ${MAX_COLLISION_STEPS} s a partir de ${now.toISOString()}`
  );
}

/**
 * @param {string[]} argv
 * @returns {number} exit code
 */
export function main(argv = process.argv.slice(2)) {
  let args;
  try {
    args = parseArgs(argv);
  } catch (err) {
    console.error(`[db:new-migration] ${err.message}\n${USAGE}`);
    return 1;
  }
  if (args.help) {
    console.log(USAGE);
    return 0;
  }

  let description;
  try {
    description = normalizeMigrationDescription(args.words.join(" "));
  } catch (err) {
    console.error(`[db:new-migration] ${err.message}\n${USAGE}`);
    return 1;
  }

  // --now is a test/override knob, not a way around the gate: the gate checks "not in the
  // future" against the real clock, so the generator does too (R3-7 / R4-03).
  const realNow = Date.now();
  if (args.now.getTime() > realNow + MIGRATION_TIMESTAMP_FUTURE_TOLERANCE_MS) {
    console.error(
      `[db:new-migration] --now ${args.now.toISOString()} está no futuro (relógio real ` +
        `${new Date(realNow).toISOString()}, tolerância ` +
        `${MIGRATION_TIMESTAMP_FUTURE_TOLERANCE_MS / 60000} min): o gate recusaria o carimbo`
    );
    return 1;
  }

  let start = args.now;
  for (let attempt = 0; attempt <= MAX_COLLISION_STEPS; attempt++) {
    let picked;
    try {
      picked = pickMigrationFilename({ dir: args.dir, description, now: start });
    } catch (err) {
      console.error(`[db:new-migration] ${err.message}`);
      return 1;
    }
    const { filename, version } = picked;

    // Same rules as the gate, with the real clock: refuse anything check:migration-numbering
    // would reject (e.g. a --now before the 2026-11-13 cut-over, or a stamp pushed into the
    // future by many collisions).
    const verdict = classifyMigrationFilename(filename);
    if (verdict.kind !== "timestamp") {
      const reason = verdict.kind === "invalid" ? verdict.reason : "nome antigo inesperado";
      console.error(`[db:new-migration] recusado ${filename}: ${reason}`);
      return 1;
    }

    const target = path.join(args.dir, filename);
    if (args.dryRun) {
      console.log(target);
      return 0;
    }

    const nextSecond = new Date(picked.date.getTime() + 1000);
    fs.mkdirSync(args.dir, { recursive: true });
    try {
      // "wx" fails instead of overwriting if the file appeared in the meantime.
      fs.writeFileSync(target, renderMigrationTemplate(description, version), { flag: "wx" });
    } catch (err) {
      if (err && err.code === "EEXIST") {
        start = nextSecond;
        continue;
      }
      console.error(`[db:new-migration] não foi possível criar ${target}: ${err.message}`);
      return 1;
    }

    // "wx" only protects an identical name. Another generator may have written a different
    // description with the same timestamp between our readdir and our write: re-read and,
    // if so, give the timestamp up and retry one second later. Whoever re-reads after both
    // writes sees the other file, so two files never keep the same timestamp.
    const rivals = fs
      .readdirSync(args.dir)
      .filter((entry) => entry !== filename && entry.startsWith(`${version}_`));
    if (rivals.length === 0) {
      console.log(target);
      return 0;
    }
    fs.rmSync(target, { force: true });
    sleepSync(Math.floor(Math.random() * RACE_RETRY_JITTER_MS));
    start = nextSecond;
  }
  console.error(
    `[db:new-migration] nenhum carimbo livre em ${MAX_COLLISION_STEPS} tentativas a partir de ` +
      `${args.now.toISOString()}`
  );
  return 1;
}

if (import.meta.url === pathToFileURL(process.argv[1] || "").href) {
  process.exitCode = main();
}
