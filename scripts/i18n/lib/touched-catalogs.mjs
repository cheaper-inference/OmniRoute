// scripts/i18n/lib/touched-catalogs.mjs
// `pr` mode of the key-completeness gate for the PRs that DO edit locale catalogs.
//
// In `pr` mode a feature PR touches en.json only and the completeness gates skip (release-mode.mjs).
// The PRs that still edit a non-English catalog are the translation writers allowed by
// config/quality/derived-paths/translation.json — translation waves (docs/i18n-*, chore/i18n-*),
// the release refresh (chore/derived-*) and a translation-only PR. Skipping them too would let a
// wave that deletes a key or overwrites a translation pass until the release PR. So each locale
// catalog the PR changed is judged against itself at the merge base — never against the state of
// the base as a whole, which the PR did not make:
//
//   lost         a key the locale had at the merge base and en.json still has is gone
//   extra        the PR added a key en.json does not have
//   marker       a real translation became a `__MISSING__:` placeholder
//   identical    a real translation became the English text (outside untranslatable-keys.json)
//   placeholder  the PR changed the value of a key whose English it did not touch, and the new
//                value interpolates other names/tags than English while the old one matched
//
// A catalog the merge base does not have (a new locale) must carry exactly the key set of
// en.json — the absolute check, for that locale only.

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

import { listChangedFiles, resolvePrDiffBase } from "../../check/lib/gateMode.mjs";
import { sameIcuNames } from "./icu-names.mjs";

export const PLACEHOLDER_PREFIX = "__MISSING__:";

function isPlainObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

/** `{ "a.b": leaf }` as a Map; objects recurse, every other value is a leaf. */
export function flattenCatalog(node, prefix = "", out = new Map()) {
  if (!isPlainObject(node)) return out;
  for (const [key, value] of Object.entries(node)) {
    const dotted = prefix ? `${prefix}.${key}` : key;
    if (isPlainObject(value)) flattenCatalog(value, dotted, out);
    else out.set(dotted, value);
  }
  return out;
}

/** absent | marker | identical | translated — "identical" means equal to the English value. */
function classify(value, english, key, untranslatable) {
  if (value === undefined) return "absent";
  if (typeof value === "string" && value.startsWith(PLACEHOLDER_PREFIX)) return "marker";
  if (value === english && !untranslatable.has(key)) return "identical";
  return "translated";
}

/**
 * Pure core: what did the PR make worse in ONE locale catalog?
 *
 * @param {object} args
 * @param {object} args.baseEn       en.json at the merge base
 * @param {object} args.headEn       en.json in the working tree
 * @param {object | null} args.baseLocale  the locale at the merge base (null: new catalog)
 * @param {object} args.headLocale   the locale in the working tree
 * @param {Set<string>} [args.untranslatable]  keys that legitimately keep the English text
 * @returns {{ newCatalog: boolean, lost: string[], extra: string[], marker: string[],
 *   identical: string[], placeholder: string[] }}  sorted key lists
 */
export function findCatalogRegressions({
  baseEn,
  headEn,
  baseLocale,
  headLocale,
  untranslatable = new Set(),
}) {
  const headEnFlat = flattenCatalog(headEn);
  const headFlat = flattenCatalog(headLocale);
  const out = {
    newCatalog: false,
    lost: [],
    extra: [],
    marker: [],
    identical: [],
    placeholder: [],
  };

  if (!baseLocale) {
    out.newCatalog = true;
    for (const key of headEnFlat.keys()) if (!headFlat.has(key)) out.lost.push(key);
    for (const key of headFlat.keys()) if (!headEnFlat.has(key)) out.extra.push(key);
  } else {
    const baseEnFlat = flattenCatalog(baseEn);
    const baseFlat = flattenCatalog(baseLocale);
    for (const [key, english] of headEnFlat) {
      const before = baseFlat.get(key);
      const after = headFlat.get(key);
      if (before !== undefined && after === undefined) {
        out.lost.push(key);
        continue;
      }
      const wasTranslated =
        classify(before, baseEnFlat.get(key), key, untranslatable) === "translated";
      const now = classify(after, english, key, untranslatable);
      if (wasTranslated && now === "marker") out.marker.push(key);
      else if (wasTranslated && now === "identical") out.identical.push(key);
      else if (
        now === "translated" &&
        after !== before &&
        typeof after === "string" &&
        typeof english === "string" &&
        baseEnFlat.get(key) === english &&
        !sameIcuNames(english, after) &&
        (typeof before !== "string" ||
          before.startsWith(PLACEHOLDER_PREFIX) ||
          sameIcuNames(english, before))
      ) {
        out.placeholder.push(key);
      }
    }
    for (const key of headFlat.keys()) {
      if (!headEnFlat.has(key) && !baseFlat.has(key)) out.extra.push(key);
    }
  }
  for (const list of ["lost", "extra", "marker", "identical", "placeholder"]) out[list].sort();
  return out;
}

/** True when the regression report of one locale names nothing. */
export function isClean(report) {
  return ["lost", "extra", "marker", "identical", "placeholder"].every((k) => !report[k].length);
}

function readAtRef(root, sha, relPath) {
  try {
    return JSON.parse(
      execFileSync("git", ["show", `${sha}:${relPath}`], {
        cwd: root,
        encoding: "utf8",
        stdio: ["ignore", "pipe", "pipe"],
        maxBuffer: 256 * 1024 * 1024,
      })
    );
  } catch {
    return null;
  }
}

/**
 * The non-English catalogs of one family this PR changed (merge base…HEAD plus the working tree),
 * with what they looked like at the merge base.
 *
 * @param {object} args
 * @param {string} args.root        repository root
 * @param {string} args.catalogRel  e.g. "src/i18n/messages" or "bin/cli/locales"
 * @param {Record<string, string | undefined>} [args.env]
 * @returns {{ base: { sha: string, ref: string } | null, baseEn: object | null,
 *   touched: Array<{ locale: string, rel: string, baseLocale: object | null }> }}
 *   `base` is null when the merge base cannot be resolved (no base ref in a shallow clone);
 *   deleted catalogs are not listed.
 */
export function findTouchedCatalogs({ root, catalogRel, env = process.env }) {
  const base = resolvePrDiffBase({ env, cwd: root });
  if (!base) return { base: null, baseEn: null, touched: [] };
  const prefix = `${catalogRel}/`;
  const touched = [];
  for (const rel of listChangedFiles(base.sha, { cwd: root, includeWorktree: true })) {
    if (!rel.startsWith(prefix) || !rel.endsWith(".json")) continue;
    const name = rel.slice(prefix.length);
    if (name.includes("/") || name === "en.json") continue;
    if (!fs.existsSync(path.join(root, rel))) continue;
    touched.push({
      locale: name.slice(0, -".json".length),
      rel,
      baseLocale: readAtRef(root, base.sha, rel),
    });
  }
  return { base, baseEn: readAtRef(root, base.sha, `${catalogRel}/en.json`), touched };
}

const LABELS = {
  lost: "lost key(s) the merge base had",
  extra: "key(s) en.json does not have",
  marker: "translation(s) replaced by __MISSING__",
  identical: "translation(s) replaced by the English text",
  placeholder: "value(s) whose placeholders/tags no longer match English",
};

/** One report line per regressed locale, `sample` keys per kind. */
export function formatRegressions(reports, sample = 5) {
  const lines = [];
  for (const { locale, report } of reports) {
    const parts = [];
    for (const kind of Object.keys(LABELS)) {
      const keys = report[kind];
      if (!keys.length) continue;
      const shown = keys.slice(0, sample).join(", ") + (keys.length > sample ? ", …" : "");
      parts.push(`${keys.length} ${LABELS[kind]} (${shown})`);
    }
    lines.push(`  - ${locale}${report.newCatalog ? " (new catalog)" : ""}: ${parts.join("; ")}`);
  }
  return lines.join("\n");
}
