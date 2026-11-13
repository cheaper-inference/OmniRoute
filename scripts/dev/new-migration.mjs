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
// never overwritten. The resulting name is validated with the same rules the
// `check:migration-numbering` gate applies (scripts/check/lib/migrationNaming.mjs).
//
// Options (mostly for tests):
//   --dir <path>      target directory (default: src/lib/db/migrations of this repo,
//                     resolved from the script location, not from the cwd)
//   --now <ISO-8601>  clock override, e.g. 2026-11-13T12:00:00Z
//   --dry-run         print the path that would be created without writing it
//   --help            usage
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import {
  classifyMigrationFilename,
  formatMigrationTimestamp,
  LEGACY_MIGRATION_MAX,
  normalizeMigrationDescription,
} from "../check/lib/migrationNaming.mjs";

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const DEFAULT_DIR = path.join(REPO_ROOT, "src", "lib", "db", "migrations");

/** Upper bound for the "one second forward" collision loop. */
const MAX_COLLISION_STEPS = 600;

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
    `--     dependency on a newer file breaks fresh databases. Regenerate this file instead.`,
    `--   * Before opening the PR run: npm run test:migrations:fresh`,
    `--     and npm run check:migration-numbering`,
    ``,
  ].join("\n");
}

/**
 * Pick a unique `<timestamp>_<description>.sql` name inside `dir`.
 *
 * @param {{ dir: string, description: string, now: Date }} input
 * @returns {{ filename: string, version: string, steps: number }}
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
      return { filename: `${version}_${description}.sql`, version, steps };
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

  let picked;
  try {
    picked = pickMigrationFilename({ dir: args.dir, description, now: args.now });
  } catch (err) {
    console.error(`[db:new-migration] ${err.message}`);
    return 1;
  }
  const { filename, version } = picked;

  // Same rules as the gate: refuse anything check:migration-numbering would reject
  // (e.g. a --now before the 2026-11-13 cut-over).
  const verdict = classifyMigrationFilename(filename, { now: args.now });
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

  fs.mkdirSync(args.dir, { recursive: true });
  try {
    // "wx" fails instead of overwriting if the file appeared in the meantime.
    fs.writeFileSync(target, renderMigrationTemplate(description, version), { flag: "wx" });
  } catch (err) {
    console.error(`[db:new-migration] não foi possível criar ${target}: ${err.message}`);
    return 1;
  }
  console.log(target);
  return 0;
}

if (import.meta.url === pathToFileURL(process.argv[1] || "").href) {
  process.exitCode = main();
}
