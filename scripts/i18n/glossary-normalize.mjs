/**
 * OmniRoute — shared glossary terminology normalization.
 *
 * Single implementation of the "canonical term" rules declared in
 * scripts/i18n/glossary/<locale>.json, shared by the docs and catalog
 * translation pipelines and the drift gate:
 *
 *   - scripts/i18n/run-translation.mjs        (active docs pipeline)
 *   - scripts/i18n/generate-multilang.mjs     (deprecated legacy generator)
 *   - scripts/i18n/lib/translate-backend.mjs  (UI and CLI catalogs via Google)
 *   - scripts/i18n/check-glossary-consistency.mjs (drift gate)
 *
 * Why `blockedPrefixes` exists: a synonym is matched as a plain substring, and
 * Chinese compounds have no word separators, so a synonym can appear inside an
 * unrelated term. 型別 ("type") sits across the character boundary of 模型別名
 * ("model alias") and is also the correct rendering of a programming data type
 * in 基本型別. Blocking on the preceding character keeps such a term enforced
 * instead of forcing it to be dropped from the glossary entirely.
 */

import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const GLOSSARY_DIR = path.join(SCRIPT_DIR, "glossary");

const cache = new Map();

/** @typedef {{synonym: string, canonical: string, blockedPrefixes?: string[], wholeWords?: boolean}} Replacement */

function isUnblockedMatch(text, at, length, blockedPrefixes, wholeWords) {
  const prev = text.slice(Math.max(0, at - 1), at);
  if (prev && blockedPrefixes.includes(prev)) return false;
  return (
    !wholeWords ||
    (!/[\p{L}\p{M}\p{N}_]$/u.test(text.slice(0, at)) &&
      !/^[\p{L}\p{M}\p{N}_]/u.test(text.slice(at + length)))
  );
}

/**
 * @param {string} haystack
 * @param {string} needle
 * @param {string[]} [blockedPrefixes]
 * @param {boolean} [wholeWords]
 * @returns {boolean} true when at least one occurrence satisfies the matching rules
 */
export function hasUnblockedOccurrence(haystack, needle, blockedPrefixes = [], wholeWords = false) {
  if (!haystack || !needle) return false;
  const blocked = Array.isArray(blockedPrefixes) ? blockedPrefixes.filter(Boolean) : [];
  let from = 0;
  for (;;) {
    const at = haystack.indexOf(needle, from);
    if (at === -1) return false;
    if (isUnblockedMatch(haystack, at, needle.length, blocked, wholeWords)) return true;
    from = at + 1;
  }
}

/**
 * Flatten a parsed glossary into applicable replacement rules. Concepts with an
 * empty `synonyms` array are documentation-only and produce no rule.
 *
 * @param {object} glossary - parsed scripts/i18n/glossary/<locale>.json
 * @returns {Replacement[]}
 */
export function buildReplacements(glossary) {
  const terms = glossary && glossary.terms ? glossary.terms : {};
  const wholeWords = glossary?.wholeWords === true;
  const replacements = [];
  for (const def of Object.values(terms)) {
    if (!def || !def.canonical) continue;
    const synonyms = Array.isArray(def.synonyms) ? def.synonyms : [];
    const blockedPrefixes = Array.isArray(def.blockedPrefixes) ? def.blockedPrefixes : [];
    for (const synonym of synonyms) {
      if (!synonym) continue;
      replacements.push({ synonym, canonical: def.canonical, blockedPrefixes, wholeWords });
    }
  }
  for (const [canonical, renderings] of Object.entries(
    glossary?.protectedTermMistranslations ?? {}
  )) {
    if (!Array.isArray(renderings)) continue;
    for (const synonym of renderings) {
      if (synonym) replacements.push({ synonym, canonical });
    }
  }
  return replacements;
}

/**
 * @param {string} locale
 * @returns {Replacement[]}
 */
export function loadReplacements(locale) {
  if (cache.has(locale)) return cache.get(locale);
  let replacements = [];
  try {
    const raw = readFileSync(path.join(GLOSSARY_DIR, `${locale}.json`), "utf8");
    replacements = buildReplacements(JSON.parse(raw));
  } catch {
    // No glossary for this locale (or unreadable) — normalization is optional.
    replacements = [];
  }
  cache.set(locale, replacements);
  return replacements;
}

/**
 * Apply one replacement rule, skipping blocked occurrences.
 *
 * @param {string} text
 * @param {Replacement} rule
 * @returns {string}
 */
export function applyReplacement(text, rule) {
  const { synonym, canonical, blockedPrefixes = [], wholeWords = false } = rule;
  if (!synonym || !text.includes(synonym)) return text;
  let out = "";
  let from = 0;
  for (;;) {
    const at = text.indexOf(synonym, from);
    if (at === -1) return out + text.slice(from);
    const matches = isUnblockedMatch(text, at, synonym.length, blockedPrefixes, wholeWords);
    out += text.slice(from, at) + (matches ? canonical : synonym);
    from = at + synonym.length;
  }
}

/**
 * Normalize a translated string to the locale's canonical terminology.
 * Returns the input unchanged when the locale has no glossary.
 *
 * @param {string} text
 * @param {string} locale
 * @returns {string}
 */
export function normalizeLocaleText(text, locale) {
  if (typeof text !== "string" || !text || !locale) return text;
  const replacements = loadReplacements(locale);
  if (replacements.length === 0) return text;
  let result = text;
  for (const rule of replacements) {
    result = applyReplacement(result, rule);
  }
  return result;
}
