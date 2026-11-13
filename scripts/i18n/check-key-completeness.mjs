#!/usr/bin/env node
/**
 * OmniRoute — i18n key COMPLETENESS gate (CI gate, blocking).
 *
 * Every `src/i18n/messages/<locale>.json` must carry exactly the key set of `en.json`:
 * no leaf absent, no leaf the source no longer has. A `__MISSING__:` placeholder counts as
 * present (the ratio gate judges its content); an ABSENT key is the defect this gate names.
 *
 * Why the two sibling gates cannot see it (the incident it encodes, 2026-09-15):
 *   - `check-ui-keys-coverage.mjs` enforces an 80 % floor per locale — 43 absent keys out of
 *     ~13,000 still reads 99.7 %.
 *   - `check-new-key-coverage.mjs` judges only the keys a PR ADDS to en.json. A locale batch
 *     is generated from the en.json of the moment the branch is cut; while its translation
 *     runs for days the base keeps adding keys, and the batch PR adds none itself — so the
 *     nine batch-1 catalogs (#13044) landed 43 keys short and the eight batch-2 catalogs
 *     (#13660) 10 keys short. The home widget test was the first thing that noticed.
 *
 * This gate is absolute, not diff-based: it compares the tree as it is.
 *
 * Two modes (plan "derived numbers and texts resolved only at release", 2026-11-13; mode from
 * scripts/check/lib/gateMode.mjs):
 *   - `release` — the release PR, pushes to main, local runs: exactly the absolute gate above.
 *   - `pr` — a feature PR adds keys to en.json and touches no other locale; the release refresh
 *     completes the catalogs (`syncUiKeys` in sync-ui-keys.mjs, called by
 *     `release:refresh-derived`). With no locale catalog changed the gate prints
 *     `SKIP reason=pr-mode` and exits 0. A PR that DOES change locale catalogs (a translation
 *     wave, the release refresh, a translation-only PR) has each changed catalog judged against
 *     itself at the merge base (lib/touched-catalogs.mjs): no key or translation it had may be
 *     lost, no key en.json lacks may appear, no placeholder of an unchanged English value may
 *     break. A catalog new in the PR must carry exactly the key set of en.json.
 *
 * Usage:
 *   node scripts/i18n/check-key-completeness.mjs               # blocking (dashboard catalogs)
 *   node scripts/i18n/check-key-completeness.mjs --warn        # report only, exit 0
 *   node scripts/i18n/check-key-completeness.mjs --catalog=cli # same gate over bin/cli/locales
 *   node scripts/i18n/check-key-completeness.mjs --mode=pr     # what a PR sees (SKIP, or the
 *                                                               # changed catalogs vs merge base)
 *   npm run i18n:check-keys
 *   npm run i18n:check-keys:cli
 */

import { promises as fs } from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath, pathToFileURL } from "node:url";

import { describeGateMode, resolveGateModeInfo } from "../check/lib/gateMode.mjs";
import { prModeSkipLine } from "./lib/release-mode.mjs";
import {
  findCatalogRegressions,
  findTouchedCatalogs,
  formatRegressions,
  isClean,
} from "./lib/touched-catalogs.mjs";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(SCRIPT_DIR, "..", "..");
const CATALOG_DIRS = {
  ui: path.join(ROOT, "src", "i18n", "messages"),
  cli: path.join(ROOT, "bin", "cli", "locales"),
};
const SOURCE_LOCALE = "en";
const UNTRANSLATABLE_PATH = path.join(SCRIPT_DIR, "untranslatable-keys.json");
const PR_MODE_MOTIVE =
  "a feature PR adds keys to en.json only; the other locales are completed by the release refresh (syncUiKeys in scripts/i18n/sync-ui-keys.mjs)";

/** Absolute directory of a flat-JSON catalog family: the dashboard (`ui`) or the CLI (`cli`). */
export function catalogDir(name = "ui") {
  const dir = CATALOG_DIRS[name];
  if (!dir) throw new Error(`unknown catalog "${name}" (expected ui or cli)`);
  return dir;
}

function isPlainObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

/** Dotted leaf paths of a catalog tree (objects recurse, everything else is a leaf). */
export function leafPaths(node, prefix = "", out = new Set()) {
  if (!isPlainObject(node)) return out;
  for (const [key, value] of Object.entries(node)) {
    const dotted = prefix ? `${prefix}.${key}` : key;
    if (isPlainObject(value)) leafPaths(value, dotted, out);
    else out.add(dotted);
  }
  return out;
}

/**
 * Pure core. `en` is the source catalog, `locales` maps locale code → catalog. Returns one
 * entry per locale whose key set differs from the source, sorted by locale, with sorted
 * `missing` (in en, absent in the locale) and `extra` (in the locale, gone from en) lists.
 * Locales with an identical key set are not listed.
 */
export function findIncompleteLocales({ en, locales }) {
  const source = leafPaths(en);
  const gaps = [];
  for (const locale of Object.keys(locales).sort()) {
    const target = leafPaths(locales[locale]);
    const missing = [...source].filter((k) => !target.has(k)).sort();
    const extra = [...target].filter((k) => !source.has(k)).sort();
    if (missing.length || extra.length) gaps.push({ locale, missing, extra });
  }
  return gaps;
}

async function readCatalogs(dir) {
  const files = (await fs.readdir(dir)).filter((f) => f.endsWith(".json")).sort();
  const locales = {};
  let en = null;
  for (const file of files) {
    const code = file.slice(0, -".json".length);
    const parsed = JSON.parse(await fs.readFile(path.join(dir, file), "utf8"));
    if (code === SOURCE_LOCALE) en = parsed;
    else locales[code] = parsed;
  }
  if (!en) throw new Error(`${SOURCE_LOCALE}.json not found in ${dir}`);
  return { en, locales };
}

function formatReport(gaps, sample = 5) {
  const lines = [];
  for (const { locale, missing, extra } of gaps) {
    const parts = [];
    if (missing.length) {
      parts.push(
        `${missing.length} missing (${missing.slice(0, sample).join(", ")}${missing.length > sample ? ", …" : ""})`
      );
    }
    if (extra.length) {
      parts.push(
        `${extra.length} extra (${extra.slice(0, sample).join(", ")}${extra.length > sample ? ", …" : ""})`
      );
    }
    lines.push(`  - ${locale}: ${parts.join("; ")}`);
  }
  return lines.join("\n");
}

async function loadUntranslatable(catalog) {
  if (catalog !== "ui") return new Set();
  try {
    return new Set(JSON.parse(await fs.readFile(UNTRANSLATABLE_PATH, "utf8")).keys ?? []);
  } catch {
    return new Set();
  }
}

/**
 * `pr` mode: SKIP when the PR changed no locale catalog of this family (a feature PR); otherwise
 * judge each changed catalog against itself at the merge base (lib/touched-catalogs.mjs).
 */
async function judgeChangedCatalogs({ dir, catalog, tag, warnOnly, modeInfo }) {
  const catalogRel = path.relative(ROOT, dir).split(path.sep).join("/");
  const { base, baseEn, touched } = findTouchedCatalogs({ root: ROOT, catalogRel });
  if (!touched.length) {
    const why = base
      ? PR_MODE_MOTIVE
      : `${PR_MODE_MOTIVE}; the merge base is unresolved (no base ref), so no changed locale catalog could be judged`;
    console.log(prModeSkipLine(tag, modeInfo, why));
    return;
  }
  const headEn = JSON.parse(await fs.readFile(path.join(dir, `${SOURCE_LOCALE}.json`), "utf8"));
  const untranslatable = await loadUntranslatable(catalog);
  const codes = touched.map((t) => t.locale).join(", ");
  console.log(
    `${tag} ${describeGateMode(modeInfo)} — judging the ${touched.length} locale catalog(s) this PR changed against the merge base ${base.ref} (${base.sha.slice(0, 8)}): ${codes}`
  );
  const regressed = [];
  for (const { locale, rel, baseLocale } of touched) {
    const headLocale = JSON.parse(await fs.readFile(path.join(ROOT, rel), "utf8"));
    const report = findCatalogRegressions({
      baseEn: baseEn ?? headEn,
      headEn,
      baseLocale,
      headLocale,
      untranslatable,
    });
    if (!isClean(report)) regressed.push({ locale, report });
  }
  if (!regressed.length) {
    console.log(
      `${tag} OK — the ${touched.length} changed locale catalog(s) kept every key and translation they had at the merge base; completeness against en.json is judged in release mode.`
    );
    return;
  }
  console.error(
    `${tag} ${warnOnly ? "WARN" : "FAIL"} — ${regressed.length}/${touched.length} changed locale catalog(s) regressed against the merge base:`
  );
  console.error(formatRegressions(regressed));
  console.error(
    `${tag} Fix: restore what the PR dropped (git show ${base.sha.slice(0, 8)}:${catalogRel}/<locale>.json); a key en.json lacks is added to en.json first; a placeholder must keep the English names. Completing the catalogs against en.json is the release refresh's job (syncUiKeys), not this PR's.`
  );
  if (!warnOnly) process.exitCode = 1;
}

async function main() {
  const warnOnly = process.argv.includes("--warn");
  const catalogArg = process.argv.find((a) => a.startsWith("--catalog="));
  const catalog = catalogArg ? catalogArg.slice(10) : "ui";
  const dir = catalogDir(catalog);
  const tag = `[i18n-keys:${catalog}]`;
  const modeInfo = resolveGateModeInfo({ argv: process.argv, env: process.env });
  if (modeInfo.mode === "pr") {
    await judgeChangedCatalogs({ dir, catalog, tag, warnOnly, modeInfo });
    return;
  }
  const { en, locales } = await readCatalogs(dir);
  const gaps = findIncompleteLocales({ en, locales });
  const total = leafPaths(en).size;
  const count = Object.keys(locales).length;
  if (gaps.length === 0) {
    console.log(`${tag} OK — ${count} locales carry all ${total} keys of en.json, none extra.`);
    return;
  }
  const missingTotal = gaps.reduce((s, g) => s + g.missing.length, 0);
  const extraTotal = gaps.reduce((s, g) => s + g.extra.length, 0);
  console.error(
    `${tag} ${warnOnly ? "WARN" : "FAIL"} — ${gaps.length}/${count} locales differ from en.json (${missingTotal} missing, ${extraTotal} extra leaves):`
  );
  console.error(formatReport(gaps));
  console.error(
    `${tag} Fix: node scripts/i18n/sync-ui-keys.mjs --catalog=${catalog} --locale=<codes> --translate-markers (adds the missing keys and translates them); extra keys mean the source dropped them — remove them from the locale.`
  );
  if (!warnOnly) process.exitCode = 1;
}

const isDirectRun = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
if (isDirectRun) {
  main().catch((err) => {
    console.error(`[i18n-keys] ${err.message}`);
    process.exitCode = 1;
  });
}
