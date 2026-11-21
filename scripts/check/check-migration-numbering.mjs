#!/usr/bin/env node
// scripts/check/check-migration-numbering.mjs
// Migration numbering gate: protects src/lib/db/migrations/ against numbering
// regressions. WHY: a destructive incident happened TWICE — a `git rm` of
// a duplicate migration during a merge deleted a REAL migration from the release
// (094/095 in #3365/#3371). This gate creates a CI link between the disk and the
// anomalies already known in migrationRunner.ts, failing on ANY:
//   - file name outside the two accepted formats — legacy `NNN_*.sql` (exactly
//     3 digits, 001 up to LEGACY_MIGRATION_MAX=241, frozen at the format change) or new
//     `YYYYMMDDHHMMSS_descricao.sql` (valid UTC timestamp, ≥ cutoff, not in the future, lowercase
//     snake_case description) — with the reason and the hint `npm run db:new-migration`;
//   - DUPLICATE version prefix on disk (except known legacy duplicates;
//     two files with the same timestamp are always duplicates);
//   - NEW unexplained gap in the LEGACY range (known gaps 026/055/121 are frozen),
//     including at the top: dropping 241 (or any number up to it) also fails — and a
//     truncated top or base is NEVER released by KNOWN_GAPS;
//   - directory entry that is not a regular file with an exactly valid name
//     (directory, symlink, `.SQL`, `x.sql `, `.sql.bak`, hidden): the runner would ignore it or
//     would break at boot.
// Date-based migrations are not sequential: they create no gap and do not enter the legacy range.
// So the gate also COMPARES WITH THE BASE (scripts/check/lib/migrationBaseDiff.mjs):
//   - migration deleted or renamed from the base → fail, whether or not it shipped in a tag (builds
//     on the release branch already ran it), except a rename covered by
//     RENAMED_MIGRATION_COMPATIBILITY entry with identical content (warning + commutation check,
//     whatever the new timestamp, with --must-not-apply <target>: fails if the real runner
//     reapplying the target to an updated database); a rename that keeps the version (only the
//     description changes) always fails, with or without an entry;
//   - edited → warning + commutation check (fails if the final schema diverges);
//   - date-based added with timestamp ≤ the largest in the base → commutation check
//     (scripts/check/migration-commutation.ts); out of order, edited or renamed with DML
//     → warning; a PR migration that does not apply after all base ones → fail with hint
//     to fix the SQL;
//   - legacy format added below the largest legacy number in the base → fail.
// Base: `--base <ref>`, `--base-latest-tag` (largest vX.Y.Z tag in history; Release-Green),
// env MIGRATION_BASE_REF or, in GitHub PR/queue, the 1st parent of the merge ref /
// merge_group.base_sha / merge-base with origin/$GITHUB_BASE_REF (fails closed without a base).
// Outside CI and with no base, the comparison is skipped.
// Name rules shared with the generator: scripts/check/lib/migrationNaming.mjs.
// Known anomalies are derived from the lists in migrationRunner.ts
// (LEGACY_VERSION_SLOT_MIGRATIONS / SUPERSEDED_DUPLICATE_MIGRATIONS) + the audit
// of sequence gaps. Do NOT add new items without justification — that is the point.
// Stale-enforcement (6A.3): a KNOWN_GAPS / KNOWN_DUPLICATE_VERSIONS entry that
// suppresses no real anomaly → gate fails with removal instructions.
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { assertNoStale } from "./lib/allowlist.mjs";
import {
  APPLIED_AGAIN_PHRASE,
  classifyRemovals,
  findBaseDiffAnomalies,
  listBaseMigrations,
  listHeadMigrations,
  MIGRATIONS_REL_DIR,
  NOT_AFTER_BASE_PHRASE,
  parseGateArgs,
  readRenamedMigrationCompatibility,
  resolveBaseRef,
  runCommutationCheck,
  sqlHasDml,
} from "./lib/migrationBaseDiff.mjs";
import {
  classifyMigrationFilename,
  LEGACY_MIGRATION_MAX,
  LEGACY_MIGRATION_MIN,
  NEW_MIGRATION_HINT,
} from "./lib/migrationNaming.mjs";

export { LEGACY_MIGRATION_MAX };

const cwd = process.cwd();
const MIGRATIONS_DIR = path.join(cwd, "src/lib/db/migrations");

// ---------------------------------------------------------------------------
// ALLOWLIST 1 — KNOWN duplicate versions.
// Source: src/lib/db/migrationRunner.ts → SUPERSEDED_DUPLICATE_MIGRATIONS (~L188).
// The runner already accepts these reused version slots (the "renamed"
// migration was promoted to a new number, and the old slot is tolerated). Add here
// ONLY if there is a physically duplicated file on disk (stale-enforcement 6A.3
// detects entries with no live physical duplicate and forces removal).
// ---------------------------------------------------------------------------
export const KNOWN_DUPLICATE_VERSIONS = new Set([
  // "041" was removed: 041_session_account_affinity.sql no longer exists on disk
  // (only 041_compression_receipts.sql remains), so no physical duplicate is present.
  // The SUPERSEDED_DUPLICATE_MIGRATIONS entry in migrationRunner.ts handles the runner
  // compatibility at runtime without needing an allowlist here. (#6A.3 stale cleanup)
]);

// ---------------------------------------------------------------------------
// ALLOWLIST 2 — KNOWN sequence gaps.
// Source: disk audit (src/lib/db/migrations/). Besides the legacy slots,
// Radar migrations 144–145, migration 143 and 147 have already landed.
// registry was promoted from 139 to 146 by the
// RENAMED_MIGRATION_COMPATIBILITY table. The 148 landed in this branch
// (148_provider_quota_state.sql) and the 149 landed along with #10066
// (149_api_key_combo_access.sql) — neither is a gap anymore. The
// stale-enforcement requires that each reservation be removed when the corresponding
// files land in a release.
// #15564 landed 197 and 198. 199 (#15314), 200, and 201 (#15354) also exist.
// None of 197–201 is a gap.
// ---------------------------------------------------------------------------
export const KNOWN_GAPS = new Set(["026", "055", "121"]); // 121: burned number in the v3.8.47 cycle — 122 (#6909) merged first and 121 never landed (e2e validation 2026-07-12); 144/145 landed in the release (radar offers/intel cache), 148/149 landed (provider_quota_state, api_key_combo_access); 197–201 exist on disk and are not gaps

function pad3(n) {
  return String(n).padStart(3, "0");
}

/**
 * Pure function — forbidden KNOWN_GAPS entries: the first (001) and last (241)
 * legacy migration. Releasing them would hide exactly the incident the gate exists to
 * catch (a migration accidentally deleted at the top or base of the series).
 *
 * @param {Set<string>} knownGaps
 * @returns {string[]}
 */
export function findForbiddenKnownGaps(knownGaps) {
  const forbidden = new Set([pad3(LEGACY_MIGRATION_MIN), pad3(LEGACY_MIGRATION_MAX)]);
  return [...knownGaps].filter((gap) => forbidden.has(gap)).sort();
}

/**
 * Pure function — splits the entries of the migrations directory: regular files go
 * to name checking; a directory, symlink or anything else is rejected.
 *
 * @param {Array<{ name: string, isFile: boolean, isSymbolicLink: boolean, isDirectory: boolean }>} entries
 * @returns {{ regularNames: string[], invalidEntries: Array<{ filename: string, code: string, reason: string }> }}
 */
export function classifyDirectoryEntries(entries) {
  const regularNames = [];
  const invalidEntries = [];
  for (const entry of entries) {
    if (entry.isSymbolicLink) {
      invalidEntries.push({
        filename: entry.name,
        code: "not-regular",
        reason:
          "is a symbolic link: migrations must be versioned regular files " +
          "(the runner would read the link target)",
      });
    } else if (entry.isDirectory) {
      invalidEntries.push({
        filename: entry.name,
        code: "not-regular",
        reason: "is a directory: the runner would try to read it as SQL and boot would break (EISDIR)",
      });
    } else if (!entry.isFile) {
      invalidEntries.push({
        filename: entry.name,
        code: "not-regular",
        reason: "is not a regular file",
      });
    } else {
      regularNames.push(entry.name);
    }
  }
  return { regularNames, invalidEntries };
}

/**
 * Pure function — detects migration numbering anomalies.
 *
 * Classification of each `.sql` (rules in scripts/check/lib/migrationNaming.mjs):
 *   - legacy (3 digits, ≤ legacyMax): duplicate (unless knownDuplicates) and gap (unless
 *     knownGaps) count ONLY in that range — including the top: if `legacyMax` (241) or any
 *     number between the largest legacy present and `legacyMax` is missing, it goes to `missingLegacyTop`;
 *     and the base: dropping `legacyMin` (001) or any number below the smallest present goes
 *     to `missingLegacyBottom`;
 *   - date-based (14 digits, valid UTC timestamp, ≥ cutoff, not in the future): unique version; does not
 *     create a gap nor enter the min/max of the legacy range;
 *   - anything else — including a name not ending in lowercase `.sql`, hidden or
 *     with a space: invalid name (`badNames` + reason and `code` in `invalidNames`).
 *   Truncated top/base (`missingLegacyTop`/`missingLegacyBottom`) IGNORE `knownGaps`:
 *   deleting 001 or 241 is never releasable.
 *
 * @param {string[]} filenames    file names (basename) in src/lib/db/migrations/
 * @param {Set<string>} knownDuplicates  legacy versions with a known duplicate (e.g. "041")
 * @param {Set<string>} knownGaps        known sequence gaps (e.g. "026")
 * @param {{ now?: Date | number, legacyMax?: number, legacyMin?: number }} [options]
 *   clock and legacy range limits injectable (tests)
 * @returns {{
 *   duplicates: Array<{version:string,names:string[]}>,
 *   gaps: string[],
 *   badNames: string[],
 *   invalidNames: Array<{filename:string,code:string,reason:string}>,
 *   missingLegacyTop: string[],
 *   missingLegacyBottom: string[],
 *   legacyCount: number,
 *   timestampCount: number,
 * }}
 */
export function findMigrationAnomalies(filenames, knownDuplicates, knownGaps, options = {}) {
  const dups = knownDuplicates || new Set();
  const gapsAllow = knownGaps || new Set();
  const legacyMax = options.legacyMax ?? LEGACY_MIGRATION_MAX;
  const legacyMin = options.legacyMin ?? LEGACY_MIGRATION_MIN;
  const classifyOptions = { now: options.now, legacyMax };

  const badNames = [];
  const invalidNames = [];
  const byVersion = new Map();
  const legacyVersions = new Set();
  let legacyCount = 0;
  let timestampCount = 0;

  for (const filename of filenames) {
    const parsed = classifyMigrationFilename(filename, classifyOptions);
    if (parsed.kind === "invalid") {
      badNames.push(filename);
      invalidNames.push({ filename, code: parsed.code, reason: parsed.reason });
      continue;
    }
    if (parsed.kind === "legacy") {
      legacyCount += 1;
      legacyVersions.add(parsed.version);
    } else {
      timestampCount += 1;
    }
    if (!byVersion.has(parsed.version)) byVersion.set(parsed.version, []);
    byVersion.get(parsed.version).push(filename);
  }

  // Duplicates: two physical files with the same prefix. The allowlist applies only to the
  // legacy range — two files with the same timestamp are always duplicates.
  const duplicates = [];
  for (const [version, names] of byVersion.entries()) {
    if (names.length <= 1) continue;
    if (legacyVersions.has(version) && dups.has(version)) continue;
    duplicates.push({ version, names: [...names].sort() });
  }
  duplicates.sort((a, b) => a.version.localeCompare(b.version));

  // Gaps: holes in the LEGACY range min..max that are not in the allowlist. Date-based migrations
  // do not enter here (the timestamp is not sequential).
  const versions = [...legacyVersions].map((v) => parseInt(v, 10)).sort((a, b) => a - b);
  const gaps = [];
  const missingLegacyTop = [];
  const missingLegacyBottom = [];
  if (versions.length > 0) {
    const min = versions[0];
    const max = versions[versions.length - 1];
    const present = new Set(versions);
    for (let n = min + 1; n < max; n++) {
      if (present.has(n)) continue;
      const padded = pad3(n);
      if (gapsAllow.has(padded)) continue;
      gaps.push(padded);
    }
    // Fixed top: the legacy range goes up to legacyMax. Without this, deleting the LAST migration
    // would go unnoticed (the gap was only computed between the min and max present). The
    // allowlist does NOT apply here: a truncated top is always a deleted migration (R3-8).
    for (let n = max + 1; n <= legacyMax; n++) missingLegacyTop.push(pad3(n));
    // Fixed base: likewise for the FIRST migration (001).
    for (let n = legacyMin; n < min; n++) missingLegacyBottom.push(pad3(n));
  }

  return {
    duplicates,
    gaps,
    badNames,
    invalidNames,
    missingLegacyTop,
    missingLegacyBottom,
    legacyCount,
    timestampCount,
  };
}

function listMigrationEntries() {
  if (!fs.existsSync(MIGRATIONS_DIR)) return [];
  return fs.readdirSync(MIGRATIONS_DIR, { withFileTypes: true }).map((entry) => ({
    name: entry.name,
    isFile: entry.isFile(),
    isSymbolicLink: entry.isSymbolicLink(),
    isDirectory: entry.isDirectory(),
  }));
}

const isCi = (env) => env.GITHUB_ACTIONS === "true" || Boolean(env.CI && env.CI !== "false");

/** Hint by class of invalid name (the reason already comes from migrationNaming.mjs). */
function hintForInvalid(code) {
  if (code === "future") {
    return "check the clock (NTP/timedatectl) and regenerate with " + NEW_MIGRATION_HINT;
  }
  if (code === "not-regular" || code === "not-sql") {
    return (
      "src/lib/db/migrations/ only accepts regular .sql files: remove the entry or generate with " +
      NEW_MIGRATION_HINT
    );
  }
  return "generate with: " + NEW_MIGRATION_HINT;
}

const RESTORE_HINT = (version) =>
  `restore with git checkout <base> -- ${MIGRATIONS_REL_DIR}/${version}_*.sql; never release in the allowlist`;

/**
 * Reason for a version-preserving rename (only the description changes): with the
 * compatibility, reconcileRenumberedMigrations (src/lib/db/migrationRunner/schemaState.ts,
 * when isSameSlotReplacement) deletes the ledger line and applies the file again.
 */
const SAME_VERSION_RENAME_REASON =
  "the runner treats the same version under a different name as a new migration and would apply it again in " +
  "databases that already ran it; use another timestamp + compatibility entry, or keep the name";

/** Non-blocking warning: annotation on GitHub Actions, ⚠ line outside it. */
function warn(env, name, message) {
  if (env.GITHUB_ACTIONS === "true") {
    console.log(`::warning file=${MIGRATIONS_REL_DIR}/${name}::${message}`);
  } else {
    console.log(`  ⚠ ${name}: ${message}`);
  }
}

const indent = (text) =>
  text
    .split("\n")
    .map((line) => `      ${line}`)
    .join("\n");

/**
 * Base files that disappeared from disk. Strict rule: always fail, except a rename
 * covered by a RENAMED_MIGRATION_COMPATIBILITY entry with identical content (warning). A
 * release tag changes nothing: every push on a release/v* branch already ran the migration in
 * real databases (homologation, Docker :next, VPS, Enterprise sync). Returns the failures and the
 * covered renames, which always go through the commutation check.
 *
 * @returns {{ problems: string[], renamed: Array<{ name: string, to: string }> }}
 */
function checkRemovals({ env, removed, baseFiles, headFiles }) {
  if (removed.length === 0) return { problems: [], renamed: [] };
  const compat = readRenamedMigrationCompatibility(cwd);
  const verdict = classifyRemovals({ removed, baseFiles, headFiles, compat });

  const problems = [];
  for (const { name, to, covered } of verdict.renamedSameVersion) {
    const version = name.slice(0, name.indexOf("_"));
    problems.push(
      `  ✗ ${name}: renamed to ${to} while keeping version ${version}` +
        `${covered ? " (with entry in RENAMED_MIGRATION_COMPATIBILITY)" : ""}. ` +
        (covered
          ? SAME_VERSION_RENAME_REASON
          : `Without an entry, the runner skips it by version in databases that already ran it (new ` +
            `content never runs there) and flags the renumbering on every boot; with an entry in ` +
            `same timestamp, ${SAME_VERSION_RENAME_REASON}`) +
        `\n    → restore with git checkout <base> -- ${MIGRATIONS_REL_DIR}/${name}`
    );
  }
  for (const { name, to } of verdict.renamedCovered) {
    warn(
      env,
      name,
      `renamed to ${to}, covered by a RENAMED_MIGRATION_COMPATIBILITY entry ` +
        `(identical content): databases that already applied it only have the ledger line moved and do ` +
        `not run it again. The commutation check verifies the new position and that the runner does ` +
        `run it again on an updated database.`
    );
  }
  for (const { name, to } of verdict.renamedChanged) {
    problems.push(
      `  ✗ ${name}: renamed to ${to} with a RENAMED_MIGRATION_COMPATIBILITY entry, but the ` +
        `content changed; databases that already applied it only have the ledger line moved and never ` +
        `run the new content. Keep the content identical on rename and make the change ` +
        `in a new migration (npm run db:new-migration)`
    );
  }
  for (const { name, renamedTo } of verdict.forbidden) {
    problems.push(
      `  ✗ ${name}: a merged migration cannot be deleted or renamed` +
        `${renamedTo ? ` (renamed to ${renamedTo}?)` : ""}. Builds on the release ` +
        `release (homologation, Docker :next, VPS, Enterprise sync) already ran it, even without ` +
        `a tag: deleting leaves new installations without it, renaming runs it again in databases ` +
        `that already applied it.\n` +
        `    → restore with git checkout <base> -- ${MIGRATIONS_REL_DIR}/${name}\n` +
        `    → to revert, keep the file and undo the schema in a new migration: npm ` +
        `run db:new-migration -- <description>, with DROP ... IF EXISTS\n` +
        `    → to rename (e.g. timestamp collision), keep the content identical, add ` +
        `an entry in RENAMED_MIGRATION_COMPATIBILITY (src/lib/db/migrationRunner/` +
        `constants.ts) and use a new timestamp, different from the old one and close to it (the same ` +
        `timestamp under a different name is rejected: the runner would run it again): the ` +
        `commutation check verifies the new position and that the updated database does not run it again`
    );
  }
  return { problems, renamed: verdict.renamedCovered };
}

/**
 * Comparison with the base. Returns problem lines (failures) and prints warnings and notes.
 *
 * @param {{ argvBase: string | null, baseLatestTag: boolean, regularNames: string[],
 *   staticProblems: number }} input
 * @returns {string[]}
 */
function compareWithBase({ argvBase, baseLatestTag, regularNames, staticProblems }) {
  const env = process.env;
  const base = resolveBaseRef({ cwd, cliBase: argvBase, latestTag: baseLatestTag, env });
  if (base.status === "skipped") {
    console.log("[check-migration-numbering] comparison with the base: skipped (no --base)");
    return [];
  }
  if (base.status === "error") return [`  ✗ comparison with the base: ${base.message}`];

  let baseFiles;
  let headFiles;
  try {
    baseFiles = listBaseMigrations(cwd, base.sha);
    headFiles = listHeadMigrations(cwd, regularNames);
  } catch (err) {
    return [`  ✗ comparison with the base: ${err instanceof Error ? err.message : String(err)}`];
  }
  const { removed, modified, addedOutOfOrder, addedLegacyBelowBase, baseMaxTimestamp } =
    findBaseDiffAnomalies({ baseFiles, headFiles });
  console.log(
    `[check-migration-numbering] comparison with the base ${base.sha.slice(0, 12)} (${base.label}): ` +
      `${baseFiles.size} migration(s) in the base`
  );

  const problems = [];
  let renamed = [];
  try {
    const removals = checkRemovals({ env, removed, baseFiles, headFiles });
    problems.push(...removals.problems);
    renamed = removals.renamed;
  } catch (err) {
    problems.push(
      `  ✗ comparison with the base (removals): ${err instanceof Error ? err.message : String(err)}`
    );
  }

  for (const name of addedLegacyBelowBase) {
    problems.push(
      `  ✗ ${name}: the legacy series is frozen (the number stays below the largest migration ` +
        `legacy of the base); new migrations use a timestamp: npm run db:new-migration`
    );
  }

  for (const name of modified) {
    warn(
      env,
      name,
        `changed content of already merged migration ${name}: databases that already applied it do NOT ` +
        `run the new version. Only fix it this way if the change is harmless to them (e.g. ` +
        `making it idempotent); otherwise create a new one with npm run db:new-migration. The ` +
        `commutation check verifies that the final schema does not change.`
    );
  }

  // A covered rename always commutes, whatever its new stamp: fresh installs apply it at the
  // new position, upgraded databases only get the ledger row moved (B-1). A rename target
  // with an old stamp is not "out of order" for the hints: it was merged under its old name.
  const renamedTargets = new Set(renamed.map((item) => item.to));
  const outOfOrder = addedOutOfOrder.filter((name) => !renamedTargets.has(name));
  const toCommute = [...new Set([...outOfOrder, ...modified, ...renamedTargets])].sort();
  for (const name of toCommute) {
    let sql;
    try {
      sql = fs.readFileSync(path.join(MIGRATIONS_DIR, name), "utf-8");
    } catch {
      continue;
    }
    if (sqlHasDml(sql)) {
      warn(
        env,
        name,
        `has DML (INSERT/UPDATE/DELETE/REPLACE) and is out of order, was edited or ` +
        `renamed: the commutation check does not compare data. Review whether the order in which ` +
          `updated and new databases apply it changes the result.`
      );
    }
  }

  if (toCommute.length === 0) return problems;
  const renamedList = renamed.map(({ name, to }) => `${name} → ${to}`).join(", ");
  const scope = [
    outOfOrder.length > 0 ? `out of order: ${outOfOrder.join(", ")}` : null,
    modified.length > 0 ? `edited: ${modified.join(", ")}` : null,
    renamed.length > 0 ? `renamed: ${renamedList}` : null,
  ]
    .filter(Boolean)
    .join("; ");
  if (problems.length > 0 || staticProblems > 0) {
    console.log(`  ℹ commutation check skipped until the anomalies above are fixed (${scope})`);
    return problems;
  }

  // The upgraded path keeps every base file, renamed ones under their OLD name: the runner
  // relocates their ledger row through the RENAMED_MIGRATION_COMPATIBILITY entry. Each rename
  // target goes in --must-not-apply (C2): the checker fails if the real runner applies it
  // again on the upgraded database, which also catches an entry the text parser misread.
  // Against a release tag (Release-Green) every file since the tag is already merged on the
  // branch: renaming or editing it is not a fix there, only a new migration is.
  const mergedBase = base.kind === "tag";
  const fixForward =
    `    → comparison with the ${base.label}: these files are already merged in the branch ` +
    `(homologation, Docker :next and the Enterprise sync already ran them), so do not rename or ` +
    `edit: fix forward with a new migration (npm run db:new-migration) that brings the ` +
    `updated database and new installation to the same schema`;
  const result = runCommutationCheck({
    cwd,
    baseFiles,
    migrationsDir: MIGRATIONS_DIR,
    headNames: regularNames,
    mustNotApply: [...renamedTargets],
    mergedBase,
    env,
  });
  if (result.status !== "error" && result.output.includes(APPLIED_AGAIN_PHRASE)) {
    // Checked before "equal": a rename target applied again is a failure even if the final
    // schema matches (idempotent SQL, or DML the schema comparison does not see).
    problems.push(
      `  ✗ renamed migration would run again (${scope}):\n` +
        indent(result.output) +
        `\n    → the runner does not recognize the rename; check the entry in ` +
        `RENAMED_MIGRATION_COMPATIBILITY (old and new version and name)`
    );
  } else if (result.status === "equal") {
    for (const name of outOfOrder) {
      console.log(
        `  ℹ ${name}: out of order, but commutes (timestamp ≤ ${baseMaxTimestamp}, the largest of the ` +
          `base; updated database and new database end with the same schema)`
      );
    }
    for (const name of modified) {
      console.log(
        `  ℹ ${name}: edited, but the updated database and the new database end with the same schema`
      );
    }
    for (const { name, to } of renamed) {
      console.log(
        `  ℹ ${to}: renamed from ${name}, but the updated database and the new database end with the ` +
          `same schema`
      );
    }
  } else if (result.status === "different" && result.output.includes(NOT_AFTER_BASE_PHRASE)) {
    // C1: a PR migration fails on the upgraded path (on its own or on both paths). Renaming
    // is not the fix by default; it only helps when the file depends on another PR migration
    // with a later stamp.
    problems.push(
      `  ✗ PR migration does not apply (${scope}):\n` +
        indent(result.output) +
        (mergedBase
          ? `\n${fixForward}`
          : `\n    → fix the SQL against the current schema of the base; if it depends on another ` +
            `PR migration with a larger timestamp, regenerate the name with npm run db:new-migration`)
    );
  } else if (result.status === "different") {
    const hints = [];
    if (mergedBase) {
      hints.push(fixForward);
    } else if (outOfOrder.length > 0) {
      hints.push(
        `    → out of order (${outOfOrder.join(", ")}; timestamp ≤ ${baseMaxTimestamp}, the ` +
          `largest in the base): regenerate the name with npm run db:new-migration (renaming is safe: the ` +
          `file has not been merged yet)`
      );
    }
    if (!mergedBase && modified.length > 0) {
      hints.push(
        `    → edited (${modified.join(", ")}): updated databases do not reapply the edited ` +
          `migration (it is already in the ledger); restore the base content and make the change in a ` +
          `new migration (npm run db:new-migration)`
      );
    }
    if (!mergedBase && renamed.length > 0) {
      hints.push(
        `    → renamed (${renamedList}): the rename changes the migration position in ` +
          `new installations, but not in updated databases (the runner only moves the ledger ` +
          `line); undo the rename (back to the old name) or choose another new timestamp, ` +
          `close to the old one, where it commutes; never the same timestamp with a different name`
      );
    }
    problems.push(
      `  ✗ commutation check (${scope}): updated database and new database diverge:\n` +
        indent(result.output) +
        `\n${hints.join("\n")}`
    );
  } else {
    const message = `commutation check did not run (${scope}): ${result.output}`;
    if (isCi(env)) problems.push(`  ✗ ${message}`);
    else console.log(`  ⚠ ${message} (outside CI: warning only)`);
  }
  return problems;
}

function main() {
  let args;
  try {
    args = parseGateArgs(process.argv.slice(2));
  } catch (err) {
    console.error(`[check-migration-numbering] ${err instanceof Error ? err.message : err}`);
    process.exitCode = 1;
    return;
  }

  const { regularNames, invalidEntries } = classifyDirectoryEntries(listMigrationEntries());
  const filenames = regularNames;

  // Compute raw anomalies WITHOUT allowlists — needed for stale-enforcement (6A.3). Only
  // interior gaps can be allowlisted; a truncated top/bottom never is.
  const raw = findMigrationAnomalies(filenames, new Set(), new Set());
  const liveDupVersions = raw.duplicates.map((d) => d.version);
  assertNoStale(KNOWN_GAPS, raw.gaps, "check-migration-numbering:gaps");
  assertNoStale(KNOWN_DUPLICATE_VERSIONS, liveDupVersions, "check-migration-numbering:duplicates");

  const {
    duplicates,
    gaps,
    invalidNames,
    missingLegacyTop,
    missingLegacyBottom,
    legacyCount,
    timestampCount,
  } = findMigrationAnomalies(filenames, KNOWN_DUPLICATE_VERSIONS, KNOWN_GAPS);

  const problems = [];
  for (const gap of findForbiddenKnownGaps(KNOWN_GAPS)) {
    problems.push(
      `  ✗ KNOWN_GAPS contains ${gap}: the first and last legacy migrations never enter the ` +
        `allowlist; ${RESTORE_HINT(gap)}`
    );
  }
  for (const { filename, code, reason } of [...invalidEntries, ...invalidNames]) {
    problems.push(`  ✗ invalid name: ${filename} — ${reason}\n    → ${hintForInvalid(code)}`);
  }
  for (const d of duplicates) {
    problems.push(
      `  ✗ duplicate version prefix ${d.version}: [${d.names.join(", ")}]\n` +
        `    → regenerate the name of the file that has NOT YET been merged with npm run ` +
        `db:new-migration; never rename what is already in the base`
    );
  }
  for (const g of gaps) {
    problems.push(
      `  ✗ unexplained gap in the sequence: missing ${g}\n    → migration accidentally deleted? ` +
        `restore with git checkout <base> -- ${MIGRATIONS_REL_DIR}/${g}_*.sql; only a number ` +
        `that NEVER existed enters KNOWN_GAPS, with traceable justification`
    );
  }
  for (const b of missingLegacyBottom) {
    problems.push(
      `  ✗ truncated legacy range: missing ${b} (the legacy series starts at ` +
        `${pad3(LEGACY_MIGRATION_MIN)}; migration accidentally deleted?)\n    → ${RESTORE_HINT(b)}`
    );
  }
  for (const t of missingLegacyTop) {
    problems.push(
      `  ✗ truncated legacy range: missing ${t} (the legacy series goes up to ` +
        `${LEGACY_MIGRATION_MAX}; migration accidentally deleted?)\n    → ${RESTORE_HINT(t)}`
    );
  }

  const staticProblems = problems.length;
  problems.push(
    ...compareWithBase({
      argvBase: args.base,
      baseLatestTag: args.baseLatestTag,
      regularNames: filenames,
      staticProblems,
    })
  );

  if (problems.length > 0) {
    console.error(
      `[check-migration-numbering] ${problems.length} migration anomaly(s):\n` +
        problems.join("\n")
    );
    process.exitCode = 1;
  }

  if (!process.exitCode) {
    console.log(
      `[check-migration-numbering] OK (${filenames.length} migrations: ` +
        `${legacyCount} legacy(s) 001–${LEGACY_MIGRATION_MAX}, ${timestampCount} date-based; ` +
        `${KNOWN_GAPS.size} gap(s) conhecido(s), ${KNOWN_DUPLICATE_VERSIONS.size} duplicata(s) conhecida(s))`
    );
  }
}

if (import.meta.url === pathToFileURL(process.argv[1] || "").href) main();
