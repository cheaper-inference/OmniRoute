// Which translated mirrors (docs/i18n/<locale>/<source>) a mirror-content test asserts.
//
// Plan "derived numbers and texts resolved only at release" (2026-11-13): a feature PR edits only
// the English source; the mirrors are rewritten in one step by the translation wave (i18n-waves,
// the scheduled `i18n mirror refresh`, or the release). A test that pins a contract in every
// mirror would otherwise force the PR that changes the English contract to ship 66 translations.
//
//   release mode — every mirror is asserted, exactly as these tests always did.
//   pr mode      — only mirrors that are current with the English source are asserted; a stale
//                  mirror is skipped with its reason. Stale mirrors stay covered by the docs drift
//                  gate (scripts/i18n/check-translation-drift.mjs), strict outside PRs.
//
// "Current" is read from .i18n-state.json, the same record run-translation.mjs writes:
//   - the locale record's source_hash equals the SHA-256 of the English source on disk; or
//   - the test names anchors (text or a RegExp in the English source) and every `## ` section
//     that holds an anchor still hashes to one of the record's section_hashes, i.e. the mirror's
//     section was translated from exactly the text the test pins. When any anchor is absent from
//     the English source (a PR reworded it), the whole-file comparison decides: never looser,
//     and never a failure of its own — the tests that pin the English source assert it.
// Granularity is the `## ` section run-translation hashes. A long section (QUALITY_GATES.md's
// gate inventory is ~half the file) means any edit in it leaves the anchored mirrors stale, so
// their PR-mode assertions skip until the next wave.
// A mirror with no record is "untracked": nothing proves it stale, so it is asserted.
//
// The mode comes from scripts/check/lib/gateMode.mjs (pull_request from a non-release head,
// merge_group and omni-queue pushes = pr; everything else, including a local run, = release).

import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";

import { describeGateMode, resolveGateModeInfo } from "../../scripts/check/lib/gateMode.mjs";
import {
  sectionHashes,
  splitSections,
  stripTopHeading,
} from "../../scripts/i18n/run-translation.mjs";

export type MirrorAnchor = string | RegExp;

export interface TranslationRecord {
  source_hash?: string;
  target_hash?: string;
  section_hashes?: string[];
  updated_at?: string;
}

export interface TranslationState {
  sources: Record<string, { source_hash?: string; locales?: Record<string, TranslationRecord> }>;
}

export type MirrorStatus = "fresh" | "stale" | "untracked";

export interface MirrorVerdict {
  status: MirrorStatus;
  reason: string;
}

export interface MirrorPlan {
  mode: "pr" | "release";
  modeLabel: string;
  source: string;
  /** Locales whose mirror the test must assert. */
  assert: string[];
  /** PR mode only: stale mirrors left to the translation wave. */
  skipped: { locale: string; reason: string }[];
}

/** The subset of node:test's TestContext the announcer needs (kept narrow for unit tests). */
export interface MirrorPlanReporter {
  diagnostic(message: string): void;
  skip(message?: string): void;
}

const sha256 = (text: string) => createHash("sha256").update(text, "utf8").digest("hex");

function anchorMatches(section: string, anchor: MirrorAnchor): boolean {
  if (typeof anchor === "string") return section.includes(anchor);
  return new RegExp(anchor.source, anchor.flags.replace("g", "")).test(section);
}

/** What a mirror is compared against, computed once per source (ENVIRONMENT.md is ~700 KB). */
export interface SourceAnalysis {
  hash: string;
  /** run-translation section index → section hash, for every section holding an anchor. */
  anchored: { index: number; hash: string }[];
  /** Anchors absent from the source; when non-empty, `anchored` is empty (whole-file check). */
  missing: string[];
}

/** Hashes the source and the sections holding the anchors. Never throws on a missing anchor. */
export function analyzeSource(sourceText: string, anchors: MirrorAnchor[] = []): SourceAnalysis {
  const analysis: SourceAnalysis = { hash: sha256(sourceText), anchored: [], missing: [] };
  if (anchors.length === 0) return analysis;
  const sections = splitSections(stripTopHeading(sourceText));
  const hashes = sectionHashes(sections);
  const indexes = new Set<number>();
  for (const anchor of anchors) {
    const hits = sections.flatMap((section, i) => (anchorMatches(section, anchor) ? [i] : []));
    if (hits.length === 0) analysis.missing.push(String(anchor));
    for (const i of hits) indexes.add(i);
  }
  if (analysis.missing.length > 0) return analysis;
  analysis.anchored = [...indexes]
    .sort((a, b) => a - b)
    .map((index) => ({
      index,
      hash: hashes[index],
    }));
  return analysis;
}

/**
 * Pure. Is the mirror described by `record` current with the English source? Pass either the
 * source text (+ anchors) or a precomputed `analysis` of it.
 */
export function classifyMirror({
  sourceText,
  record,
  anchors = [],
  analysis,
}: {
  sourceText?: string;
  record: TranslationRecord | undefined;
  anchors?: MirrorAnchor[];
  analysis?: SourceAnalysis;
}): MirrorVerdict {
  if (!record || !record.source_hash) {
    return { status: "untracked", reason: "no translation record in .i18n-state.json" };
  }
  const source = analysis ?? analyzeSource(sourceText ?? "", anchors);
  if (record.source_hash === source.hash) {
    return { status: "fresh", reason: "source unchanged since this mirror was translated" };
  }
  if (source.anchored.length > 0 && Array.isArray(record.section_hashes)) {
    const recorded = new Set(record.section_hashes);
    const changed = source.anchored.filter((s) => !recorded.has(s.hash)).map((s) => s.index);
    if (changed.length === 0) {
      return {
        status: "fresh",
        reason: "the anchored source sections are unchanged since this mirror was translated",
      };
    }
    return {
      status: "stale",
      reason: `source section(s) ${changed.join(", ")} changed since this mirror was translated`,
    };
  }
  if (source.missing.length > 0) {
    return {
      status: "stale",
      reason: `source changed since this mirror was translated; anchor(s) not found in the source: ${source.missing.join(", ")}`,
    };
  }
  return { status: "stale", reason: "source changed since this mirror was translated" };
}

export function loadTranslationState(root: string): TranslationState {
  return JSON.parse(fs.readFileSync(path.join(root, ".i18n-state.json"), "utf8"));
}

/**
 * Splits the mirrors of `source` into the ones to assert and (PR mode only) the stale ones to
 * skip. `locales` defaults to the locales recorded for the source in .i18n-state.json.
 */
export function planMirrorAssertions({
  root,
  source,
  locales,
  anchors = [],
  state,
  env = process.env,
  argv = [],
}: {
  root: string;
  source: string;
  locales?: string[];
  anchors?: MirrorAnchor[];
  state?: TranslationState;
  env?: Record<string, string | undefined>;
  argv?: string[];
}): MirrorPlan {
  const info = resolveGateModeInfo({ argv, env });
  const sourceText = fs.readFileSync(path.join(root, source), "utf8");
  const analysis = analyzeSource(sourceText, anchors);
  const records = (state ?? loadTranslationState(root)).sources?.[source]?.locales ?? {};
  const targets = locales ?? Object.keys(records);
  const plan: MirrorPlan = {
    mode: info.mode,
    modeLabel: describeGateMode(info),
    source,
    assert: [],
    skipped: [],
  };
  for (const locale of targets) {
    if (info.mode === "release") {
      plan.assert.push(locale);
      continue;
    }
    const verdict = classifyMirror({ record: records[locale], analysis });
    if (verdict.status === "stale") plan.skipped.push({ locale, reason: verdict.reason });
    else plan.assert.push(locale);
  }
  return plan;
}

function skipLine(plan: MirrorPlan): string {
  const sample = plan.skipped
    .slice(0, 5)
    .map((s) => s.locale)
    .join(", ");
  const more = plan.skipped.length > 5 ? ` (+${plan.skipped.length - 5} more)` : "";
  return (
    `SKIP reason=pr-mode — ${plan.skipped.length} mirror(s) of ${plan.source} are stale ` +
    `(${plan.skipped[0].reason}): ${sample}${more}; the translation wave refreshes them and ` +
    `the strict check runs in release mode (the release PR, pushes to main, local runs) [${plan.modeLabel}]`
  );
}

/**
 * Reports the skipped mirrors of each plan as test diagnostics, and marks the test skipped when
 * no plan has anything left to assert (so a vacuous pass never reads as a real one).
 */
export function announceMirrorPlan(t: MirrorPlanReporter, ...plans: MirrorPlan[]): void {
  const withSkips = plans.filter((plan) => plan.skipped.length > 0);
  for (const plan of withSkips) t.diagnostic(skipLine(plan));
  if (withSkips.length > 0 && plans.every((plan) => plan.assert.length === 0)) {
    t.skip(skipLine(withSkips[0]));
  }
}
