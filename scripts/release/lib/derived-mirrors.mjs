// scripts/release/lib/derived-mirrors.mjs
//
// Carries a derived-number rewrite of a source document (README.md, llm.txt, docs/…) to its
// translated mirrors under docs/i18n/<locale>/<same path>, and keeps .i18n-state.json honest.
// Used by scripts/release/refresh-derived.mjs, step "numbers".
//
// Same technique and the same state rule as scripts/release/bump-version-claims.mjs:
//   • version claims go through its claim detector (rewriteVersionClaims), which is
//     language-independent ("OmniRoute v3.8.54", "**v3.8.20 → v3.8.54**", `v3.8.54+`);
//   • a source whose recorded source_hash still matched the file BEFORE the rewrite (its mirrors
//     were in sync) gets its hashes refreshed — top-level source_hash plus each rewritten
//     mirror's source_hash/target_hash; an already drifted source is left to the i18n wave, and
//     section_hashes are never touched.
//
// Mirrors translate the prose around a number but keep the digits, so a number moves to a
// mirror only when that is provably the same claim. The rule is deliberately conservative:
// every occurrence of the old literal in the source must be one the plan rewrites, and the
// mirror must carry exactly as many occurrences as the source did. Anything else (an extra
// "393" in the mirror, a mirror that dropped the sentence, two different targets for one old
// value, a non-numeric change) is returned as `manual` and the mirror is left untouched for
// that value — refreshing a translation by guesswork would certify text nobody checked.

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { findVersionClaims, rewriteVersionClaims } from "../bump-version-claims.mjs";

export const SEMVER_RE = /^\d+\.\d+\.\d+$/;
const NUMBER_RE = /^\d+(?:[.,]\d+)?$/;

export const sha256 = (text) => crypto.createHash("sha256").update(text).digest("hex");

/** Mirrors that exist on disk for `rel` (`docs/i18n/<locale>/<rel>`), sorted by locale. */
export function mirrorsOf(root, rel, exists = (p) => fs.existsSync(p)) {
  const base = path.join(root, "docs", "i18n");
  if (!fs.existsSync(base)) return [];
  return fs
    .readdirSync(base, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .sort()
    .map((locale) => ({ locale, rel: path.posix.join("docs/i18n", locale, rel) }))
    .filter((m) => exists(path.join(root, m.rel)));
}

const isDigit = (ch) => ch !== undefined && ch >= "0" && ch <= "9";
const isWordish = (ch) => ch !== undefined && /[0-9A-Za-z_]/.test(ch);

/**
 * PURE. Start offsets of `literal` (a plain number such as "393" or "1.62") where it stands as a
 * whole number: not glued to a letter/digit before it, not the tail of "3.8.54" or "1,393", and
 * not the head of a longer number ("3930", "393.5"). A unit letter after it ("1.62B") is fine.
 */
export function findNumberOccurrences(text, literal) {
  const out = [];
  if (!literal) return out;
  let at = text.indexOf(literal);
  while (at !== -1) {
    const before = text[at - 1];
    const after = text[at + literal.length];
    const glueBefore =
      isWordish(before) || ((before === "." || before === ",") && isDigit(text[at - 2]));
    const glueAfter =
      isDigit(after) ||
      after === "_" ||
      ((after === "." || after === ",") && isDigit(text[at + literal.length + 1]));
    if (!glueBefore && !glueAfter) out.push(at);
    at = text.indexOf(literal, at + 1);
  }
  return out;
}

// Mirrors may spell a number in their own digits (Persian ۲۳۶, Arabic-Indic ٢٣٦); the plan keeps
// them, so a change the plan applied to a mirror is matched to the source change by value.
const LOCAL_DIGITS = /[\u0660-\u0669\u06F0-\u06F9]/g;
export const asciiDigits = (text) =>
  String(text).replace(LOCAL_DIGITS, (d) => {
    const code = d.charCodeAt(0);
    return String(code >= 0x06f0 ? code - 0x06f0 : code - 0x0660);
  });

/**
 * PURE. Applies the plan's changes for ONE source file to ONE mirror.
 *
 * `alreadyApplied`: the changes the gate's own plan already made to this mirror (its claim
 * extractors cover some mirrors directly, e.g. the README mirrors' database row). `mirrorText`
 * then holds the plan's result, and each such change counts as one occurrence of the matching
 * source change already carried — so the remaining occurrences are carried, not double-counted.
 *
 * @param {{ sourceBefore: string, changes: Array<{label:string, from:string, to:string}>, mirrorText: string, alreadyApplied?: Array<{from:string, to:string}> }} args
 * @returns {{ content: string, replaced: number, manual: Array<{ label: string, detail: string }> }}
 */
export function propagateChangesToMirror({
  sourceBefore,
  changes,
  mirrorText,
  alreadyApplied = [],
}) {
  const manual = [];
  const covered = new Map(); // "from→to" (ASCII digits) → occurrences the plan already rewrote
  for (const c of alreadyApplied) {
    const key = `${asciiDigits(c.from)}\u2192${asciiDigits(c.to)}`;
    covered.set(key, (covered.get(key) ?? 0) + 1);
  }
  const groups = new Map();
  for (const c of changes) {
    const from = String(c.from);
    const to = String(c.to);
    if (from === to) continue;
    if (!groups.has(from)) groups.set(from, { from, tos: new Set(), labels: new Set(), n: 0 });
    const g = groups.get(from);
    g.tos.add(to);
    g.labels.add(c.label);
    g.n++;
  }

  const spans = []; // { start, end, to }
  let versionPass = null; // version rewrites go through the claim detector, applied last
  for (const g of groups.values()) {
    const label = [...g.labels].join(" / ");
    if (g.tos.size !== 1) {
      manual.push({
        label,
        detail: `"${g.from}" maps to several values (${[...g.tos].join(", ")}) — not carried to the mirror`,
      });
      continue;
    }
    const to = [...g.tos][0];
    if (SEMVER_RE.test(g.from) && SEMVER_RE.test(to)) {
      const inSource = findVersionClaims(sourceBefore).filter((c) => c.value === g.from).length;
      const inMirror = findVersionClaims(mirrorText).filter((c) => c.value === g.from).length;
      if (inSource !== g.n || inMirror !== inSource) {
        manual.push({
          label,
          detail:
            `version claim ${g.from} → ${to}: source carries ${inSource} claim(s), the plan ` +
            `rewrites ${g.n}, the mirror carries ${inMirror} — not carried to the mirror`,
        });
        continue;
      }
      versionPass = { from: g.from, to, n: inMirror };
      continue;
    }
    if (!NUMBER_RE.test(g.from)) {
      manual.push({
        label,
        detail: `"${g.from}" → "${to}" is not a plain number — not carried to the mirror`,
      });
      continue;
    }
    const inSource = findNumberOccurrences(sourceBefore, g.from);
    const inMirror = findNumberOccurrences(mirrorText, g.from);
    const done = covered.get(`${g.from}\u2192${to}`) ?? 0;
    if (inSource.length !== g.n || inMirror.length + done !== inSource.length) {
      manual.push({
        label,
        detail:
          `"${g.from}" → "${to}": source has ${inSource.length} occurrence(s), the plan rewrites ` +
          `${g.n}, the mirror has ${inMirror.length}` +
          (done ? ` (+${done} already rewritten by the plan)` : "") +
          ` — not carried to the mirror`,
      });
      continue;
    }
    for (const start of inMirror) spans.push({ start, end: start + g.from.length, to });
  }

  spans.sort((a, b) => b.start - a.start);
  let content = mirrorText;
  for (const s of spans) content = content.slice(0, s.start) + s.to + content.slice(s.end);
  let replaced = spans.length;
  if (versionPass) {
    const r = rewriteVersionClaims(content, versionPass.from, versionPass.to);
    content = r.content;
    replaced += r.replaced;
  }
  return { content, replaced, manual };
}

/**
 * Mutates `state` (.i18n-state.json) for one source file the refresh rewrote. Returns
 * "refreshed" | "drifted" | "untracked". Only a source that was in sync BEFORE the rewrite is
 * refreshed. A rewritten mirror gets the new source_hash and its own target_hash only when its
 * locale was itself in sync (recorded source_hash = the source hash before the rewrite): a locale
 * that was already behind keeps its old source_hash, so the i18n wave still sees it as stale —
 * refreshing it would certify a translation of an older source as current. Callers pass only the
 * mirrors that received EVERY change of the source.
 */
export function refreshI18nStateEntry(state, rel, { sourceBefore, sourceAfter, mirrors, now }) {
  const entry = state?.sources?.[rel];
  if (!entry) return "untracked";
  const oldHash = sha256(sourceBefore);
  if (entry.source_hash !== oldHash) return "drifted";
  const newHash = sha256(sourceAfter);
  entry.source_hash = newHash;
  for (const m of mirrors) {
    const info = entry.locales?.[m.locale];
    if (!info) continue;
    if (info.source_hash && info.source_hash !== oldHash) {
      // Already stale before this refresh: record the mirror's new content, keep it stale.
      entry.locales[m.locale] = { ...info, target_hash: sha256(m.content), updated_at: now };
      continue;
    }
    entry.locales[m.locale] = {
      ...info,
      source_hash: newHash,
      target_hash: sha256(m.content),
      updated_at: now,
    };
  }
  return "refreshed";
}

/**
 * Mutates `state` for a mirror the refresh rewrote while its source needed no change (the plan
 * aligned the mirror's own claim). The translation still corresponds to the same source, so only
 * the target hash moves, and only for a locale that was in sync with the current source.
 * Returns true when the state changed.
 */
export function refreshI18nTargetHash(state, rel, locale, content, now) {
  const entry = state?.sources?.[rel];
  const info = entry?.locales?.[locale];
  if (!entry || !info) return false;
  if (info.source_hash !== entry.source_hash) return false;
  entry.locales[locale] = { ...info, target_hash: sha256(content), updated_at: now };
  return true;
}
